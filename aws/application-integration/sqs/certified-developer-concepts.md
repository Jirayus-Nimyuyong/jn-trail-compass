Amazon SQS - Long Polling
• When a consumer requests messages from the
queue, it can optionally “wait” for messages to
arrive if there are none in the queue
• This is called Long Polling
• LongPolling decreases the number of API calls
made to SQS while increasing the efficiency
and decreasing the latency of your application.
• The wait time can be between 1 sec to 20 sec
(20 sec preferable)
• Long Polling is preferable to Short Polling
• Long polling can be enabled at the queue level
or at the API level using
ReceiveMessageWaitTimeSeconds

---

SQS Extended Client

• Message size limit is 256KB, how to send large messages, e.g. 1GB?
• Using the SQS Extended Client (Java Library)

---

SQS – Must know API
• CreateQueue (MessageRetentionPeriod), DeleteQueue
• PurgeQueue: delete all the messages in queue
• SendMessage (DelaySeconds), ReceiveMessage, DeleteMessage
• MaxNumberOfMessages: default 1, max 10 (for ReceiveMessage API)
• ReceiveMessageWaitTimeSeconds: Long Polling
• ChangeMessageVisibility: change the message timeout
• Batch APIs for SendMessage, DeleteMessage, ChangeMessageVisibility
helps decrease your costs

---

SQS - Certified Developer Concepts
Introduction to Developer-Level SQS Concepts
Now let's discuss some additional concepts you need to know for SQS, focusing more on the developer level.

Long Polling in SQS
The first concept is called long polling. When a consumer requests a message from SQS, it has the option to "wait" for messages to arrive if the queue is empty. This waiting mechanism is known as long polling.

For example, suppose we have an SQS queue that is currently empty, and the consumer sends a poll request to the queue. We have the option to wait during this request, which is acceptable because there are no messages available at that moment.

If, during the waiting period, a message arrives in the SQS queue, the message will be immediately received by the consumer.

Benefits of Long Polling
Why do we use long polling? There are several benefits:

It reduces the number of API calls made to the SQS queue.
It increases efficiency by using fewer CPU cycles.
It decreases latency because as soon as a message arrives in the queue, it is sent to the consumer immediately.
Long polling can be set between 1 second and 20 seconds, with 20 seconds being the preferred setting. Overall, it is recommended to use long polling instead of short polling in your applications.

In exam scenarios, you might encounter questions indicating that a consumer is making too many calls to the SQS queue, resulting in increased costs, CPU usage, and latency. In such cases, enabling long polling is the appropriate solution.

Long polling can be enabled either at the queue level or at the API call level. At the API call level, you use the ReceiveMessageWaitTimeSeconds parameter when the consumer makes a polling request to the SQS queue.

SQS Extended Client for Large Messages
The next concept is the SQS Extended Client. As you know, the maximum message size in SQS is 256 kilobytes. So how can you send larger messages, for example, messages of one gigabyte?

To handle this, there is a Java library called the SQS Extended Client. It implements a simple pattern that can be replicated in other languages. The idea is to use Amazon S3 buckets as a repository for large data.

For instance, when a producer wants to send a large message to SQS, the actual large message is first stored in Amazon S3. Then, a small metadata message containing a pointer to the large message in S3 is sent to the SQS queue.

Thus, the SQS queue contains small messages with pointers, while the Amazon S3 bucket holds the large objects.

When the consumer reads from the SQS queue using the SQS Extended Client library, it consumes the small metadata message, which instructs the consumer to retrieve the larger message from Amazon S3.

A typical use case for this pattern is processing video files. Instead of sending the entire video file through SQS, you upload the video to Amazon S3 and send a small message with a pointer to the video file in the SQS queue. This approach allows you to accommodate any message size effectively.

Overview of Important SQS API Calls
Finally, let's review some common API calls you should understand:

CreateQueue: Creates a new queue. You can specify the MessageRetentionPeriod parameter to set how long messages are retained before being discarded.
DeleteQueue: Deletes a queue along with all its messages.
PurgeQueue: Deletes all messages in a queue without deleting the queue itself.
SendMessage: Sends a message to the queue. You can use the DelaySeconds parameter to delay the message delivery.
ReceiveMessage: Polls the queue to receive messages.
DeleteMessage: Deletes a message after it has been processed by a consumer.
ChangeMessageVisibility: Changes the visibility timeout of a message if more processing time is needed.
By default, the MaxNumberOfMessages parameter in ReceiveMessage is set to 1, meaning one message is received at a time. However, you can set this parameter up to 10 to receive a batch of messages in a single call.

The ReceiveMessageWaitTimeSeconds parameter controls how long the consumer waits before receiving a response from the queue, effectively enabling long polling.

Batch API calls are also available for SendMessage, DeleteMessage, and ChangeMessageVisibility. Using batch calls reduces the number of API requests, which helps decrease costs.

Demonstration of Long Polling in AWS Console
Let's look at how long polling works in AWS. In the demo queue settings, the Receive message wait time is initially set to zero, which corresponds to short polling. You can set this value anywhere between 0 and 20 seconds.

Setting it to 1 second or more enables long polling. We will set it to 20 seconds, meaning the consumer will wait up to 20 seconds to receive a message if the queue is empty. After applying the setting, the queue configuration is saved.

In the Send and Receive Messages section, we start a consumer that is operating in long polling mode because the setting was applied at the queue level. This means only one API call is active, and it waits for messages from the SQS queue.

When we send a message, such as "hello world," the consumer immediately receives it with very low latency due to long polling being enabled via the ReceiveMessageWaitTimeSeconds setting.

This simple demonstration illustrates the benefits of long polling in reducing latency and API calls. That concludes this lecture.

Key Takeaways
Long polling in SQS allows consumers to wait for messages, reducing API calls and latency.
The SQS Extended Client enables sending large messages by storing them in Amazon S3 and sending pointers via SQS.
Important SQS API calls include CreateQueue, DeleteQueue, PurgeQueue, SendMessage, ReceiveMessage, DeleteMessage, and ChangeMessageVisibility.
Batch API calls reduce the number of API requests, lowering costs and improving efficiency.