S3 Event Notifications
• S3:ObjectCreated, S3:ObjectRemoved,
S3:ObjectRestore, S3:Replication…
• Object name filtering possible (*.jpg)
• Use case: generate thumbnails of images
uploaded to S3
• Can create as many “S3 events” as desired

• S3 event notifications typically deliver events
in seconds but can sometimes take a minute
or longer

S3 Event Notifications – IAM Permissions

S3 Event Notifications
with Amazon EventBridge
• Advanced filtering options with JSON rules (metadata, object size,
name...)
• Multiple Destinations – ex Step Functions, Kinesis Streams / Firehose…
• EventBridge Capabilities – Archive, Replay Events, Reliable delivery

---
S3 Event Notifications
Introduction to S3 Event Notifications
Amazon S3 Event Notifications enable you to automatically react to specific events occurring within your S3 buckets. These events include actions such as when an object is created, removed, restored, or replicated.

Event Filtering
You can filter these events to focus on particular objects. For example, you might choose to only consider objects that end with the .JPEG extension. This filtering capability allows precise targeting of notifications based on object characteristics.

Use Case Example
A common use case for Event Notifications is to automatically generate thumbnails for all images uploaded to Amazon S3. By creating an Event Notification, you can trigger downstream processes whenever relevant events occur.

Notification Destinations
Event Notifications can be sent to several destinations:

SNS Topic
SQS Queue
Lambda Function
If you are unfamiliar with these services, they will be covered in subsequent lectures.

You can create as many S3 Event Notifications as desired and send them to any combination of these targets. Typically, events are delivered within seconds to these destinations, although delivery can sometimes take a minute or longer.

IAM Permissions and Resource Access Policies
For Event Notifications to function correctly, appropriate permissions must be configured. Specifically, Amazon S3 requires permission to send data to the destination services.

SNS Resource Access Policy
When sending notifications to an SNS topic, you must attach an SNS resource access policy. This IAM policy grants the S3 bucket permission to send messages directly to the SNS topic.

SQS Resource Access Policy
Similarly, if you use an SQS queue as the destination, you must create an SQS resource access policy. This policy authorizes the S3 service to send data into your SQS queue.

Lambda Resource Policy
For Lambda functions, a Lambda resource policy must be attached to your function. This policy ensures that Amazon S3 has the right to invoke your Lambda function.

Summary of Permissions
Unlike using IAM roles for Amazon S3, Event Notifications rely on resource access policies attached directly to the SNS topic, SQS queue, or Lambda function. These policies function similarly to S3 bucket policies.

Remember that SNS, SQS, and Lambda functions are the primary Event Notification targets within Amazon S3.

Amazon EventBridge Integration
There is a fourth integration to be aware of: all events occurring in your Amazon S3 buckets are sent to Amazon EventBridge by default.

From EventBridge, you can set up rules to route these events to over 18 different AWS services as destinations. This greatly enhances the capabilities of S3 Event Notifications.

EventBridge offers advanced filtering options beyond those available directly in S3. You can filter events by metadata, object size, and object name. Additionally, you can send events to multiple destinations simultaneously, such as Step Functions, Kinesis Data Streams, or Firehose.

EventBridge also provides features such as event archiving, replay capabilities, and more reliable delivery mechanisms.

Conclusion
In summary, Amazon S3 Event Notifications allow you to react to events happening in your S3 buckets by sending notifications to SNS, SQS, Lambda, or Amazon EventBridge. This enables automated workflows and integrations across AWS services.

Key Takeaways
Amazon S3 Event Notifications allow automatic reactions to events such as object creation, removal, or replication.
Event Notifications can be filtered, for example, to only consider objects with specific suffixes like JPEG.
Notifications can be sent to SNS topics, SQS queues, Lambda functions, or Amazon EventBridge.
Resource access policies must be configured on SNS, SQS, and Lambda to authorize S3 to send or invoke events.
Amazon EventBridge provides advanced filtering, multiple destinations, event archiving, replay, and more reliable delivery.