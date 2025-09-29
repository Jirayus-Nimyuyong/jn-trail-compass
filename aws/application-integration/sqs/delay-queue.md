Amazon SQS – Delay Queue

• Delay a message (consumers don’t see it immediately) up to 15 minutes
• Default is 0 seconds (message is available right away)
• Can set a default at queue level
• Can override the default on send using the DelaySeconds parameter

---
SQS - Delay Queues
Introduction to Delay Queues
Now let's talk about a delay queue. A delay queue is designed to delay messages so that consumers do not see them immediately. This delay can be up to 15 minutes.

By default, the delay parameter is zero seconds. This means that as soon as you send the message into an SQS queue, the message will be available right away to be read. However, you can set a default delay at the queue level to specify that all messages should be delayed by a certain number of seconds. Alternatively, you can set a per-message delay using the DelaySeconds parameter when sending each message.

How Delay Queues Work
Consider a queue where the producer sends a message. The queue may have a default delay value, for example, 30 seconds. After this delay, when a consumer polls for messages, it will see and successfully receive that message.

Demonstration in AWS Console
Let's go into the AWS SQS console to see how delay queues work in practice. We will create a new queue named DelayQueue. In the settings, there is a new option called Delivery Delay. By default, it is set to zero seconds, but it can be configured up to 15 minutes.

For this demonstration, we will set the delivery delay to 10 seconds. This means messages will wait 10 seconds before being available to consumers. The rest of the queue settings will remain standard. After configuring, we click on Create queue.

Sending and Receiving Messages
After creating the delay queue, we send a message with some random content. The console shows the delivery delay is set to 10 seconds. This can be overridden per message to values such as 30 seconds or zero seconds, but we will keep the default of 10 seconds.

We start polling for messages immediately, but no messages are received because of the delay. After sending a message, we wait for 10 seconds. Once the delay period elapses, the message appears in the consumer's queue.

Summary
As demonstrated, there is a delay between sending the message and its actual delivery to the consumer. This delay queue functionality can be useful for certain use cases where delayed message processing is desired. As a certified AWS professional, it is important to be aware that this feature exists.

That concludes this short demo on delay queues. I hope it was helpful. See you in the next lecture.

Key Takeaways
A delay queue in SQS postpones message visibility to consumers by up to 15 minutes.
The default delay is zero seconds, meaning messages are immediately available upon sending.
Delay can be set at the queue level or per individual message using the DelaySeconds parameter.
Delay queues are useful for scenarios where delayed message processing is desired.