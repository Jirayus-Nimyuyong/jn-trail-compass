S3 Events Notifications

• S3:ObjectCreated, S3:ObjectRemoved,
S3:ObjectRestore, S3:Replication…
• Object name filtering possible (*.jpg)
• Use case: generate thumbnails of images
uploaded to S3
• S3 event notifications typically deliver events
in seconds but can sometimes take a minute
or longer
• If two writes are made to a single non-
versioned object at the same time, it is
possible that only a single event notification
will be sent
• If you want to ensure that an event
notification is sent for every successful write,
you can enable versioning on your bucket.

---

Simple S3 Event Pattern – Metadata Sync

---

Lambda & S3 Event Notifications
Integrating S3 Event Notifications with Lambda
Let's explore how to integrate S3 event notifications with AWS Lambda.

Overview of S3 Event Notifications
S3 event notifications provide a way to get notified whenever an object is created, removed, restored, or when replication occurs in an S3 bucket. You can filter these notifications by prefix and suffix to target specific objects.

A classic use case is generating thumbnail images for every image uploaded to Amazon S3.

Destinations for S3 Event Notifications
S3 can send event notifications to three destinations:

SNS (Simple Notification Service): From an SNS topic, you can implement a fan-out pattern to send notifications to multiple SQS queues.
SQS (Simple Queue Service): Notifications can be sent directly to an SQS queue, which a Lambda function can poll and process.
Lambda Function: S3 event notifications can directly invoke a Lambda function asynchronously.
Handling Failures with Dead-Letter Queues
If the Lambda function encounters errors processing the event, you can configure a dead-letter queue, such as an SQS queue, to capture failed events for later analysis or reprocessing.

Event Delivery Timing and Versioning
S3 event notifications typically deliver events within seconds, but sometimes it can take a minute or longer. To ensure no event notifications are lost, it is important to enable versioning on your S3 bucket. Without versioning, if two writes occur on the same object simultaneously, you might receive only one notification instead of two. This is a critical detail to consider when designing your event-driven architecture.

Simple Event Processing Pattern
A common pattern involves an S3 bucket triggering a Lambda function upon a new file event. The Lambda function can then process the file and insert data into a DynamoDB table or even a relational database such as RDS.

This pattern is straightforward and effective for many serverless data processing workflows.

Hands-On Demonstration
Let's proceed to a hands-on demonstration to see how to implement this integration practically.

Key Takeaways
S3 event notifications allow you to get notified when objects are created, removed, restored, or replicated.
Notifications can be filtered by prefix and suffix to target specific objects.
S3 event notifications can send events to SNS, SQS, or directly invoke Lambda functions asynchronously.
To avoid losing event notifications, enable versioning on your S3 bucket, especially when multiple writes occur simultaneously.
