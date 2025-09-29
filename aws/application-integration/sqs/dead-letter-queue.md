Amazon SQS – Dead Letter Queue (DLQ)
• If a consumer fails to process a message within the
Visibility Timeout…
the message goes back to the queue!
• We can set a threshold of how many times a message can
go back to the queue
• After the MaximumReceives threshold is exceeded, the
message goes into a Dead Letter Queue (DLQ)
• Useful for debugging!
• DLQ of a FIFO queue must also be a FIFO queue
• DLQ of a Standard queue must also be a Standard
queue
• Make sure to process the messages in the DLQ before
they expire:
• Good to set a retention of 14 days in the DLQ

SQS DLQ – Redrive to Source
• Feature to help consume
messages in the DLQ to
understand what is wrong with
them
• When our code is fixed, we can
redrive the messages from the
DLQ back into the source
queue (or any other queue) in
batches without writing custom
code

---

SQS - Dead Letter Queues
Introduction to Dead Letter Queues in SQS
Now let us talk about Dead Letter Queues in SQS.

Scenario of Message Processing Failure
Consider a scenario where a consumer fails to process a message within the visibility timeout period. In such a case, the message automatically returns to the queue. The consumer reads the message, but perhaps there is a failure or insufficient time to process it. Consequently, the message goes back into the queue.

Repeated Failures and Their Impact
If this situation happens frequently, it can become problematic. For example, the message is read again, but there might be something wrong with it. Perhaps the consumer does not understand or cannot process the message. The message will then return to the queue repeatedly. It will be read again from SQS and sent back into the queue once more.

Setting a MaximumReceives Threshold
To manage this failure loop, we can set a threshold for how many times this can happen. This failure loop can be a significant problem, but by setting a MaximumReceives threshold, we can control it. If that threshold is exceeded, we can instruct SQS to treat the message as problematic, indicating that it is being processed too many times without success.

Moving Messages to a Dead Letter Queue
Therefore, the message can be sent into a Dead Letter Queue. The Dead Letter Queue will contain that message for later processing. The message will be removed from the original queue and sent into the Dead Letter Queue.

Purpose and Characteristics of Dead Letter Queues
Why Use Dead Letter Queues?
Dead Letter Queues are very useful for debugging. When a message goes into a Dead Letter Queue, it is still an SQS queue that requires processing. However, it provides time to understand what is happening with the problematic message.

Queue Type Consistency
It is important to note that the Dead Letter Queue of a FIFO queue must also be a FIFO queue. Similarly, the Dead Letter Queue of a Standard queue must also be a Standard queue.

Message Retention in Dead Letter Queues
Because messages are stored in a Dead Letter Queue, you need to ensure that they are processed before they expire from the queue. It is advisable to set a long retention period, for example, 14 days, within the Dead Letter Queue.

Managing Dead Letter Queues with Re-drive to Source Feature
The next feature for managing your Dead Letter Queues is the re-drive to source feature. This feature helps you consume messages in the Dead Letter Queue to understand what is wrong with them.

Manual Inspection and Debugging
You have your messages in the Dead Letter Queue because they have not been processed in the source queue. You can perform manual inspection and debugging of these messages. Then, you can fix your consumer code to understand why the message was not processed, assuming the message itself was correct.

Re-driving Messages Back to the Source Queue
After resolving the issues, you can re-drive the message from the Dead Letter Queue back into the source SQS queue. This allows the consumer to reprocess the message without being aware that it had previously gone into the Dead Letter Queue. The message processing then proceeds as normal.

Demonstration of Dead Letter Queue Feature
Now let us go into the console so I can show you the Dead Letter Queue feature.

Key Takeaways
Dead Letter Queues (DLQs) in SQS help manage messages that fail to process after multiple attempts.
The MaximumReceives threshold determines when a message is moved to a DLQ to prevent infinite processing loops.
DLQs are useful for debugging and require appropriate retention periods to allow message inspection.
The re-drive feature allows messages from the DLQ to be sent back to the source queue after issues are resolved.