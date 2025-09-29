Lambda – Asynchronous Invocations

• S3, SNS, CloudWatch Events…
• The events are placed in an Event Queue
• Lambda attempts to retry on errors
• 3 tries total
• 1 minute wait after 1st , then 2 minutes wait
• Make sure the processing is idempotent (in
case of retries)
• If the function is retried, you will see duplicate
logs entries in CloudWatch Logs
• Can define a DLQ (dead-letter queue) – SNS
or SQS – for failed processing (need correct
IAM permissions)
• Asynchronous invocations allow you to speed
up the processing if you don’t need to wait for
the result (ex: you need 1000 files processed)

---

Lambda - Asynchronous Invocations - Services

• Amazon Simple Storage Service (S3)
• Amazon Simple Notification Service (SNS)
• Amazon CloudWatch Events / EventBridge
• AWS CodeCommit (CodeCommit Trigger: new branch, new tag, new push)
• AWS CodePipeline (invoke a Lambda function during the pipeline, Lambda must callback)
----- other -----
• Amazon CloudWatch Logs (log processing)
• Amazon Simple Email Service
• AWS CloudFormation
• AWS Config
• AWS IoT
• AWS IoT Events

---

Lambda Asynchronous Invocations & Dead-Letter Queues
Introduction to Asynchronous Lambda Invocations
Having explored synchronous invocations, we will now delve into asynchronous invocation. These are used by services that invoke other functions behind the scenes, such as Amazon S3, SNS topics, CloudWatch Events, and others.

Example: S3 Event Notification
Consider an S3 bucket configured with an event notification for new files. When a new file is added, this event is sent to the Lambda Service. Because it is asynchronous, the events are placed into an internal Event Queue. Your Lambda function reads from this Event Queue to process the events.

Retry Mechanism
The Lambda function attempts to process these events. If something goes wrong, it automatically retries up to three times in total:

The first attempt happens immediately.
The second attempt occurs one minute after the first.
The third attempt happens two minutes after the second.
Thus, the Lambda function retries three times in total.

Idempotency Importance
Because retries may cause the Lambda function to process the same events multiple times, it is crucial that your Lambda function is idempotent. Idempotency means that repeated executions with the same input produce the same result. Without idempotency, duplicate processing could cause significant problems.

Duplicate Logs
In the case of retries, you will observe duplicate log entries in CloudWatch Logs, as the Lambda function attempts processing repeatedly.

Dead-Letter Queue (DLQ)
A Dead-Letter Queue (DLQ) can be defined to handle events that fail processing after all retries. If the Lambda function cannot successfully process an event after the retries, it can send the event to an SQS queue or SNS topic for further processing later.

Summary of Asynchronous Invocation
This mechanism of placing events in a queue, retrying processing, and optionally forwarding failed events to a DLQ forms the core of asynchronous invocations.

When to Use Asynchronous vs Synchronous Invocation
You might ask, why use asynchronous invocation instead of synchronous?

Some services require asynchronous invocation, so there is no choice.
Asynchronous invocation allows speeding up processing by starting many tasks in parallel without waiting for each to complete individually. For example, you can start processing 1000 files simultaneously and wait for all to finish, which reduces overall processing time.
AWS Services Using Asynchronous Invocation
Services that invoke Lambda functions asynchronously include:

Amazon S3 (via Event Notifications)
SNS (Simple Notification Service)
CloudWatch Events or EventBridge
Other services, less commonly encountered in hands-on labs, include:

CodeCommit (triggering Lambda on new branches, tags, or pushes)
CodePipeline (invoking Lambda during pipeline execution with callbacks)
CloudWatch Logs (for log processing)
SES (Simple Email Service for sending emails)
CloudFormation
Config
IoT and IoT Events
Certification Focus
For certification purposes, it is important to understand how Lambda works with Amazon S3, SNS, and CloudWatch Events or EventBridge in the context of asynchronous invocation.

Next Steps
Let us proceed to learn about asynchronous invocation through hands-on exercises in the next lecture.

Key Takeaways
Asynchronous Lambda invocations place events in an internal event queue for processing.
Lambda functions automatically retry failed asynchronous invocations up to three times with increasing delays.
Lambda functions should be idempotent to handle potential duplicate event processing due to retries.
Dead-letter queues (DLQ) can be configured to capture events that fail processing after all retries.
Certain AWS services invoke Lambda functions asynchronously, including Amazon S3, SNS, and CloudWatch Events/EventBridge.