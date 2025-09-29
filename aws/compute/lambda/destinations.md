Lambda – Destinations

• Nov 2019: Can configure to send result to a
destination
• Asynchronous invocations - can define destinations
for successful and failed event:
Amazon SQS
Amazon SNS
AWS Lambda
Amazon EventBridge bus
h\ps://docs.aws.amazon.com/lambda/latest/dg/invoca]on-async.html
• Note: AWS recommends you use destinations instead of
DLQ now (but both can be used at the same time)
• Event Source mapping: for discarded event batches
• Amazon SQS
• Amazon SNS
• Note: you can send events to a DLQ directly from SQS

---

Lambda Destinations
Introduction to Lambda Destinations
From November 2019, a very useful feature called Lambda Destinations was introduced. This feature addresses the challenge of monitoring asynchronous invocations or event mappers, where it was previously difficult to determine if an invocation had failed or succeeded, and to retrieve the associated data.

Purpose of Lambda Destinations
The core idea behind destinations is to send the result of an asynchronous invocation or the failure of an event mapper to a specified target destination. This allows better tracking and handling of both successful and failed events.

Destinations for Asynchronous Invocations
For asynchronous invocations, you can define destinations for both successful and failed events. Here, "successful" and "failed" refer to the processing outcome of the event.

The supported destination targets include:

Amazon Simple Queue Service (SQS)
Amazon Simple Notification Service (SNS)
AWS Lambda functions
Amazon EventBridge bus (formerly CloudWatch Events)
How Lambda Destinations Work
For example, when a Lambda function is invoked asynchronously, such as through an S3 event, the function's result can be sent to a successful event destination if it succeeds. Conversely, if the function fails, the failure information can be sent to a failed event destination.

Comparison with Dead Letter Queues (DLQ)
You might notice that this functionality resembles the Dead Letter Queue (DLQ) setting for asynchronous invocations. The current recommendation is to use destinations instead of DLQs, although both can be used simultaneously.

The reasons for preferring destinations include:

Destinations are a newer feature.
They allow more target types.
DLQs only support sending failures to SQS and SNS.
Destinations support sending both successes and failures to SQS, SNS, Lambda, and EventBridge.
Destinations for Event Source Mappings
For Event Source Mappings, destinations are used when an event batch is discarded because it cannot be processed. Instead of blocking the entire processing of the stream, the discarded event batch can be sent to a failed event destination such as Amazon SQS or Amazon SNS.

Example Scenario
Consider reading from a Kinesis Data Stream with an Event Source Mapping. If processing fails for a batch, rather than blocking the stream processing, the discarded batch can be sent to a failed event destination to handle the failure gracefully.

Options for SQS Event Source Mappings
If you have an Event Source Mapping reading from SQS, you can choose to either set a failed destination or configure a DLQ directly on your SQS queue. The choice depends on your specific use case and preferences.

Next Steps
In the next lecture, we will explore Lambda Destinations further with hands-on examples and practical exercises to deepen understanding of this feature.

Key Takeaways
Lambda Destinations enable routing of asynchronous invocation results and failures to various targets.
Destinations support both success and failure events, unlike DLQs which only handle failures.
Supported destination targets include SQS, SNS, Lambda, and Amazon EventBridge.
Event Source Mappings can send discarded event batches to failed event destinations to avoid blocking stream processing.