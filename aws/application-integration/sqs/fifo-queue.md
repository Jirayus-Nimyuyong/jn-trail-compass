Amazon SQS – FIFO Queue
• FIFO = First In First Out (ordering of messages in the queue)
• Limited throughput: 300 msg/s without batching, 3000 msg/s with
• Exactly-once send capability (by removing duplicates using Deduplication ID)
• Messages are processed in order by the consumer
• Ordering by Message Group ID (all messages in the same group are
ordered) – mandatory parameter

---

SQS FIFO – Deduplication
• De-duplication interval is 5 minutes
• Two de-duplication methods:
• Content-based deduplication: will do a SHA-256 hash of the message body
• Explicitly provide a Message Deduplication ID

SQS FIFO – Message Grouping

• If you specify the same value of MessageGroupID in an SQS FIFO queue,
you can only have one consumer, and all the messages are in order
• To get ordering at the level of a subset of messages, specify different values
for MessageGroupID
• Messages that share a common Message Group ID will be in order within the group
• Each Group ID can have a different consumer (parallel processing!)
• Ordering across groups is not guaranteed

---

SQS - FIFO Queues
Introduction to Amazon SQS FIFO Queues
Amazon's SQS FIFO queues provide a first-in, first-out ordering of messages in the queue. This means that when a producer sends messages in a specific order, such as one, two, three, four, the consumer polling messages from the SQS FIFO queue will receive these messages in the same order. This ordering guarantee is a key feature of FIFO queues, unlike regular SQS queues where messages can be received out of order.

Throughput Limits and Exactly-Once Delivery
Due to the ordering guarantee, FIFO queues have throughput limits: approximately 300 messages per second without batching, and up to 3,000 messages per second with batching. Additionally, FIFO queues support exactly-once message delivery by removing duplicates at the queue level. To enable this, each message must include a deduplication ID. If the same deduplication ID is seen twice within a five-minute window, duplicates are removed.

Message Group ID and Ordering Guarantee
Messages are processed in order by the consumer, with the ordering guarantee applying at the message group ID level. Every message sent to an Amazon SQS FIFO queue must include a message group ID. All messages with the same group ID are guaranteed to be processed in order.

Creating a FIFO Queue in the Console
To create a FIFO queue in the AWS console, you must name the queue ending with the suffix .fifo. This suffix is required to enable FIFO queue features. The configuration options are similar to standard queues, with an additional setting called content-based deduplication. This setting allows the queue to deduplicate messages if the same message is sent twice within a five-minute window. Other settings such as access policy and encryption remain the same.

Sending Messages to the FIFO Queue
When sending messages, you must specify a message group ID. In this demonstration, the message group ID used is demo. Each message also requires a deduplication ID to enable duplicate detection. For example, messages are sent with bodies "Hello World 1", "Hello World 2", "Hello World 3", and "Hello World 4", each with the same message group ID demo and unique deduplication IDs 1, 2, 3, and 4 respectively.

Receiving Messages and Order Verification
After sending, the messages are available to be received. When pulling four messages from the queue, the messages are received in the exact order they were sent, confirming the FIFO ordering guarantee. The first message received is "Hello World 1", followed by "Hello World 2", "Hello World 3", and "Hello World 4". After processing, the messages can be deleted from the queue.

Conclusion
Amazon SQS FIFO queues ensure ordered message processing and exactly-once delivery within message groups, making them suitable for applications requiring strict message ordering and deduplication.

Key Takeaways
Amazon SQS FIFO queues guarantee first-in-first-out message ordering.
FIFO queues support exactly-once message delivery using deduplication IDs.
Message ordering is maintained within each message group ID.
FIFO queues have throughput limits: 300 messages per second without batching and 3,000 with batching.

---

SQS - FIFO Queues Advanced
Advanced Concepts for SQS FIFO
Let's explore some advanced concepts related to Amazon SQS FIFO queues.

Deduplication Interval
SQS FIFO queues have a deduplication interval of five minutes. This means that if the same message is sent twice within five minutes, the second message will be rejected.

Deduplication Methods
There are two methods for deduplication:

Content-based deduplication: When a message is sent to SQS, a SHA-256 hash is calculated from the message body. If the same message body is sent again, it produces the same hash, causing the second message to be rejected.
Explicit deduplication ID: You can provide a message deduplication ID explicitly when sending a message. If the same deduplication ID is used twice, the second message will be rejected.
Example of Content-Based Deduplication
Consider an SQS FIFO queue where we send a "hello world" message with content-based deduplication enabled. The queue generates a SHA-256 hash of the message, for example:

f572d396fae9206628714fb2ce00f72e94f2258f

If the producer sends the exact same message again, it will have the same hash, and the queue will reject the duplicate message.

Message Grouping
Message grouping is another important concept in SQS FIFO queues. When sending a message, specifying a message group ID is mandatory. Messages with the same group ID are processed in order by a single consumer.

If you want ordering only within subsets of messages, specify different message group IDs. Each group ID can have a different consumer, enabling parallel processing. However, ordering across different groups is not guaranteed.

Example of Message Grouping
Suppose we have three message groups: A, B, and C.

Group A has messages: A1, A2, A3, consumed by one consumer.
Group B has messages: B1, B2, B3, B4, consumed by another consumer.
Group C has messages: C1, C2, consumed by a third consumer.
Ordering is guaranteed within each group but not across groups.

Use Case for Message Grouping
If you want to maintain ordering for messages related to a specific customer, you can use the customer ID as the message group ID. This allows you to have as many consumers as users in your application, with messages ordered per user thanks to the SQS FIFO queue guarantees.

Demonstration of Deduplication and Grouping
Let's configure our FIFO queue to enable content-based deduplication. This means the deduplication ID will be computed as the SHA-256 hash of the message body.

When sending a message "hello world" with message group ID "demo", the deduplication ID is optional because content-based deduplication is enabled.

Sending the same message multiple times will result in only one message being available in the queue due to deduplication.

Sending a different message, such as "hello world two", will add a second message to the queue.

Explicit Deduplication ID Example
If you send a message with your own deduplication ID, for example "1-2-3", and send the same message again with the same deduplication ID, only one message will appear in the queue due to deduplication.

Message Group ID Example
If a user buys an apple, banana, and strawberries, and all these messages share the same message group ID "user123", the messages will be processed in order for that user.

If another user "user234" buys a green apple with a different message group ID, those messages will be ordered for that user separately.

This allows multiple consumers to process messages concurrently, each consuming from different message group IDs.

Conclusion
When finished, you can pull messages from the queue and process them accordingly. You may also delete messages after processing.

This concludes the advanced concepts for SQS FIFO queues.

Key Takeaways
SQS FIFO queues have a five-minute deduplication interval to prevent duplicate messages.
Content-based deduplication uses SHA-256 hashing of the message body to identify duplicates.
Message deduplication ID can be explicitly provided to control deduplication.
Message grouping with message group IDs enables ordered processing per group and parallelism across groups.
