Lambda – Event Source Mapping
• Kinesis Data Streams
• SQS & SQS FIFO queue
• DynamoDB Streams

• Common denominator:
records need to be polled
from the source
• Your Lambda function is
invoked synchronously

---
Streams & Lambda (Kinesis & DynamoDB)

• An event source mapping creates an iterator for each shard, processes items in order
• Start with new items, from the beginning or from timestamp
• Processed items aren't removed from the stream (other consumers can read them)
• Low traffic: use batch window to accumulate records before processing
• You can process multiple batches in parallel
• up to 10 batches per shard
• in-order processing is still guaranteed for each partition key,

---

Streams & Lambda – Error Handling

• By default, if your function returns an error, the entire batch is
reprocessed until the function succeeds, or the items in the batch
expire.
• To ensure in-order processing, processing for the affected shard is
paused until the error is resolved
• You can configure the event source mapping to:
• discard old events
• restrict the number of retries
• split the batch on error (to work around Lambda timeout issues)
• Discarded events can go to a Destination

---

Lambda – Event Source Mapping
SQS & SQS FIFO

• Event Source Mapping will
poll SQS (Long Polling)
• Specify batch size (1-10
messages)
• Recommended: Set the
queue visibility timeout to
6x the timeout of your
Lambda function
• To use a DLQ
• set-up on the SQS queue,
not Lambda (DLQ for
Lambda is only for async
invocations)
• Or use a Lambda destination
for failures

---
Queues & Lambda

• Lambda also supports in-order processing for FIFO (first-in, first-out) queues,
scaling up to the number of active message groups.
• For standard queues, items aren't necessarily processed in order.
• Lambda scales up to process a standard queue as quickly as possible.
• When an error occurs, batches are returned to the queue as individual items
and might be processed in a different grouping than the original batch.
• Occasionally, the event source mapping might receive the same item from
the queue twice, even if no function error occurred.
• Lambda deletes items from the queue after they're processed successfully.
• You can configure the source queue to send items to a dead-letter queue if
they can't be processed.

---

Lambda Event Mapper Scaling

• Kinesis Data Streams & DynamoDB Streams:
• One Lambda invocation per stream shard
• If you use parallelization, up to 10 batches processed per shard simultaneously
• SQS Standard:
• Lambda adds 60 more instances per minute to scale up
• Up to 1000 batches of messages processed simultaneously
• SQS FIFO:
• Messages with the same GroupID will be processed in order
• The Lambda function scales to the number of active message groups

---

Lambda Event Source Mapping
Introduction to Lambda Event Source Mapping
We have previously explored asynchronous and synchronous processing. Now, we will examine Event Source Mapping, which is the final category of how Lambda can process events in AWS. This mechanism applies to Kinesis Data Streams, SQS and SQS FIFO queues, and DynamoDB Streams. The common characteristic of these services is that records need to be polled from the source. Lambda must request records from these services, which then return the records. Therefore, Lambda performs polling from these services.

In this setup, the Lambda function is invoked synchronously.

Event Source Mapping with Kinesis
Consider Kinesis and the Lambda service. When Lambda is configured to read from Kinesis, an Event Source Mapping is created internally. This mapping is responsible for polling Kinesis and retrieving records. Kinesis returns a batch of records. Once the Event Source Mapping has data for Lambda to process, it invokes the Lambda function synchronously with an event batch. This is the core mechanism of Event Source Mapping.

Categories of Event Source Mapping
There are two categories of Event Source Mapping: streams and queues. Streams include Kinesis Data Streams and DynamoDB Streams. We will discuss DynamoDB Streams shortly. For streams, an Event Source Mapping creates an iterator for each shard, whether it is a Kinesis shard or a DynamoDB Stream shard. Items are processed in order at the shard level. You can configure where to start reading from: either only new items, from the beginning of the shard, or from a specific timestamp.

Importantly, when an item is processed from a shard, it is not removed from the stream. This allows multiple consumers to read the data from Kinesis or DynamoDB, which is fundamental to how these services operate.

Use Cases and Parallel Processing for Streams
Event Source Mapping supports both low and high traffic streams. For low traffic streams, you can use a batch window to accumulate records before processing, ensuring efficient invocation of Lambda functions. For high throughput streams, Lambda can be configured to process multiple batches in parallel at the shard level.

AWS allows up to 10 batch processors per shard. Each batch is processed in order at the partition key level. This means that while the entire shard may not be processed in strict order, each partition key within the shard is processed sequentially. This setup enables parallelized processing of Lambda functions with streams.

Error Handling in Stream Processing
By default, if a Lambda function returns an error, the entire batch is reprocessed until the function succeeds or the items in the batch expire. This behavior is critical because an error in a batch can block processing. To maintain in-order processing, processing for the affected shard is paused until the error is resolved.

You can manage errors by configuring the Event Source Mapping to discard old events, restrict the number of retries, or split the batch on errors. For example, if the Lambda function times out and cannot process the entire batch, it might process only part of the batch. In such cases, you can discard old events and send them to a destination, which will be covered in subsequent lectures.

Event Source Mapping with Queues
For queues, Event Source Mapping applies to SQS and SQS FIFO queues. The SQS queue is polled by a Lambda Event Source Mapping. When a batch is returned, the Lambda function is invoked synchronously with the event batch.

In the case of SQS, the Event Source Mapping polls the queue using long polling, which is efficient. You can specify the batch size from one to ten messages. The configuration involves setting the batch size and the SQS queue.

AWS recommends setting the queue visibility timeout to six times the Lambda function timeout, which is configurable. If you want to use a dead-letter queue (DLQ) to handle messages that cannot be processed, you set up the DLQ on the SQS queue, not on Lambda. This is because the DLQ for Lambda only works for asynchronous invocations, whereas this is a synchronous invocation. Alternatively, Lambda destinations for failures can be used, which will be discussed in later lectures.

Processing Order and Scaling with SQS
Lambda supports in-order processing if you use a FIFO queue (First-In, First-Out). The number of Lambda functions scaling to process your queue equals the number of active message groups, which are defined by the group ID setting.

For standard queues, items are not processed in order. Lambda scales as fast as possible to read all messages in the standard queue. If an error occurs, batches are returned to the queue as individual items and may be processed in different groupings than the original batch. Occasionally, the Event Source Mapping might receive the same item twice from the queue, even if no function error occurred. Therefore, it is essential to implement idempotent processing in your Lambda function.

Once processed by Lambda, items are deleted from the queue and will not be seen again. You can configure the source queue to send unprocessable items to a dead-letter queue.

Scaling Summary for Event Source Mapping
To summarize scaling behavior:

For Kinesis Data Streams and DynamoDB Streams, you get one Lambda invocation per stream shard. With parallelization, up to 10 batches can be processed simultaneously per shard.
For SQS Standard queues, Lambda scales quickly, adding approximately 16 more instances per minute, with a maximum of 1000 batches processed per second simultaneously.
For SQS FIFO queues, messages with the same group ID are processed in order. Lambda scales up to the number of active message groups, as defined by the group ID.
This concludes the overview of Lambda Event Source Mapping. Although this theory lecture may seem lengthy, it will become clearer during the hands-on session. Reviewing this material before your exam is recommended, as detailed questions about Event Source Mappings may appear.

Key Takeaways
Lambda Event Source Mapping enables synchronous invocation of Lambda functions by polling services like Kinesis Data Streams, DynamoDB Streams, and SQS queues.
For streams, Lambda processes records in order per shard, supports configurable starting positions, and allows parallel batch processing up to 10 batches per shard.
Errors in batch processing cause retries and can pause processing for the affected shard until resolved; configurations exist to manage retries and failures.
For SQS queues, Lambda polls messages using long polling, supports batch sizes of 1 to 10, and scales based on queue type and message groups, with dead-letter queues configured on SQS, not Lambda.
