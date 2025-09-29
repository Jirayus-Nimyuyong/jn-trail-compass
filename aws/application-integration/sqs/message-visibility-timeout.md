SQS – Message Visibility Timeout

• After a message is polled by a consumer, it becomes invisible to other consumers
• By default, the “message visibility timeout” is 30 seconds
• That means the message has 30 seconds to be processed
• After the message visibility timeout is over, the message is “visible” in SQS

---

• If a message is not processed within the visibility timeout, it will be processed twice
• A consumer could call the ChangeMessageVisibility API to get more time
• If visibility timeout is high (hours), and consumer crashes, re-processing will take time
• If visibility timeout is too low (seconds), we may get duplicates

---

SQS - Message Visibility Timeout
Message Visibility Timeout in Amazon SQS
Let's discuss an important concept called the message visibility timeout.

When a message is polled by a consumer, it becomes invisible to other consumers.

Consider the timeline moving from left to right. A consumer performs a ReceiveMessage request, and a message is returned from the queue. At this point, the visibility timeout begins.

By default, the message visibility timeout is 30 seconds. This means that during these 30 seconds, the message must be processed.

If the same or other consumers perform a message request API call during this timeout window, the message will not be returned. Effectively, during the visibility timeout, the message is invisible to other consumers.

After the visibility timeout elapses, if the message has not been deleted, it is "put back" into the queue. Therefore, another consumer or the same consumer performing a ReceiveMessage API call will receive the same message again.

This concept is crucial to understand. While a message is received, it becomes invisible during the visibility timeout period.

If a message is not processed within the visibility timeout window, it may be processed twice — either by two different consumers or twice by the same consumer.

If a consumer is actively processing a message but requires more time beyond the visibility timeout, there is an API called ChangeMessageVisibility.

The consumer should call the ChangeMessageVisibility API to inform SQS not to make the message visible yet, effectively extending the visibility timeout.

Setting the visibility timeout too high, for example to hours, can cause delays if the consumer crashes, as the message will not reappear until the timeout expires.

Conversely, setting it too low, such as a few seconds, may cause the message to be read multiple times by different consumers, leading to duplicate processing.

Therefore, the visibility timeout should be set to a reasonable value for your application. Consumers should be programmed to call ChangeMessageVisibility if they need more time to process a message.

Understanding this concept is important for exam scenarios involving SQS message processing.

Demonstration in the AWS Console
Let's see how this works in practice by opening two windows: one for sending messages and one for receiving messages.

In the first window, we send a "hello world" message into the queue. Remember, the queue has a default visibility timeout of 30 seconds.

We have two consumers: the first window and the second window. Polling for messages in the first window returns the message.

Polling in the second window does not return the message because it is still within the visibility timeout period.

If we stop polling and do not delete the message, after the visibility timeout expires, the message becomes visible again and can be received by the second consumer.

If we then delete the message, it is fully processed. Note that the message was received twice, as indicated by the receive count of two.

This demonstration illustrates how the visibility timeout works.

Changing the Visibility Timeout
To change the default visibility timeout, go to the queue's Edit settings. You can set the visibility timeout between zero seconds (not recommended) and up to 12 hours.

While 30 seconds is a reasonable default, if a consumer needs more time to process a message, it should call the ChangeMessageVisibility API to extend the visibility timeout for that message.

This prevents other consumers from seeing the message and allows the first consumer enough time to process it accordingly.

This concludes the lecture on message visibility timeout.

Key Takeaways
The message visibility timeout makes a message invisible to other consumers once it is polled.
The default visibility timeout is 30 seconds, during which the message must be processed and deleted.
If the message is not deleted before the timeout, it becomes visible again and can be received multiple times.
The ChangeMessageVisibility API allows extending the visibility timeout if more processing time is needed.
