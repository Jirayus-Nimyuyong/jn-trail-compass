CloudTrailAWS CloudTrail

• Provides governance, compliance and audit for your AWS Account
• CloudTrail is enabled by default!
• Get an history of events / API calls made within your AWS Account by:
• Console
• SDK
• CLI
• AWS Services
• Can put logs from CloudTrail into CloudWatch Logs or S3
• A trail can be applied to All Regions (default) or a single Region.
• If a resource is deleted in AWS, investigate CloudTrail first!

---
|
CloudTrail Events
• Management Events:
• Operations that are performed on resources in your AWS account
• Examples:
• Configuring security (IAM AttachRolePolicy)
• Configuring rules for routing data (Amazon EC2 CreateSubnet)
• Setting up logging (AWS CloudTrail CreateTrail)
• By default, trails are configured to log management events.
• Can separate Read Events (that don’t modify resources) from Write Events (that may modify resources)
• Data Events:
• By default, data events are not logged (because high volume operations)
• Amazon S3 object-level activity (ex: GetObject, DeleteObject, PutObject): can separate Read and Write Events
• AWS Lambda function execution activity (the Invoke API)
• CloudTrail Insights Events:

---

CloudTrail Insights

• Enable CloudTrail Insights to detect unusual activity in your account:
• inaccurate resource provisioning
• hitting service limits
• Bursts of AWS IAM actions
• Gaps in periodic maintenance activity
• CloudTrail Insights analyzes normal management events to create a baseline
• And then continuously analyzes write events to detect unusual patterns
• Anomalies appear in the CloudTrail console
• Event is sent to Amazon S3
• An EventBridge event is generated (for automation needs)

---

CloudTrail Events Retention

• Events are stored for 90 days in CloudTrail
• To keep events beyond this period, log them to S3 and use Athena

---

CloudTrail
Now let's talk about CloudTrail.

Overview of CloudTrail
CloudTrail is a service that provides governance, compliance, and auditing for your AWS accounts. It is enabled by default, allowing you to obtain a history of all events and API calls made within your AWS accounts. These calls can originate from the AWS Management Console, SDKs, CLI, or other AWS services, and all such logs appear in CloudTrail.

You can configure CloudTrail to send these logs to CloudWatch Logs or Amazon S3. Additionally, you can create a trail that applies to all AWS regions or a single region, enabling you to accumulate event history across all regions into a specific S3 bucket.

For example, if someone deletes an EC2 instance and you want to find out who performed this action, CloudTrail records the API call associated with that event. This allows you to investigate and understand who did what and when.

CloudTrail as a Central Audit Tool
CloudTrail sits in the middle of actions performed via the SDK, CLI, console, IAM users, IAM roles, or other services. All these actions are recorded in the CloudTrail console, where you can inspect and audit what happened. If you want to retain events for more than 90 days, you can send them to CloudWatch Logs or an S3 bucket.

Let's dive deeper into CloudTrail and the types of events it records.

Types of CloudTrail Events
There are three kinds of events you can see in CloudTrail:

Management Events
These represent operations performed on resources in your AWS accounts. For example, configuring security by calling the IAM AttachRolePolicy API, creating a subnet, or setting up logging will all appear in CloudTrail. By default, trails are configured to log Management Events.

Management Events can be separated into:

Read Events: These do not modify resources, such as listing all IAM users or EC2 instances.
Write Events: These modify resources, such as deleting a DynamoDB table. Write Events are generally more critical because they can cause damage to your AWS infrastructure, whereas Read Events are informational but still important.
Data Events
Data Events are separate and are not logged by default because they involve high-volume operations. Examples include Amazon S3 object-level activities such as GetObject, DeleteObject, and PutObject. These events can occur frequently on an S3 bucket.

Similar to Management Events, Data Events can be separated into Read and Write Events:

Read Event: GetObject
Write Events: DeleteObject, PutObject
AWS Lambda Execution Events
CloudTrail also records AWS Lambda function execution activities. Whenever someone invokes a Lambda function using the Invoke API, CloudTrail logs this event. Since Lambda functions can be executed frequently, these events can also be high volume.

CloudTrail Insights Events
CloudTrail Insights is a feature that analyzes Management Events to detect unusual activity in your AWS accounts. It must be enabled and incurs additional cost. Insights can detect anomalies such as inaccurate resource provisioning, hitting service limits, bursts of IAM actions, or gaps in periodic maintenance activity.

How CloudTrail Insights Works
CloudTrail analyzes what normal management activities look like to create a baseline. It then continuously analyzes incoming Management Events to detect unusual patterns or changes. When an anomaly is detected, CloudTrail generates an Insights Event.

These Insights Events appear in the CloudTrail console and can also be sent to Amazon EventBridge. This allows you to automate responses, such as sending an email notification when an anomaly is detected.

CloudTrail Event Retention
By default, CloudTrail stores events for 90 days, after which they are deleted. If you want to retain events for longer periods, for example, for auditing purposes a year later, you must log them to an S3 bucket.

Once stored in S3, you can use Amazon Athena, a serverless query service, to analyze the events. This allows you to query your Management Events, Data Events, and Insights Events for long-term retention and analysis.

I hope you found this lecture helpful. See you in the next lecture.

Key Takeaways
CloudTrail provides governance, compliance, and auditing for AWS accounts by logging API calls and events.
There are three types of CloudTrail events: Management Events, Data Events, and CloudTrail Insights Events.
CloudTrail Insights detects unusual activity by analyzing management events and generating anomaly events.
Events are retained in CloudTrail for 90 days by default; longer retention requires logging to S3 and querying with Athena.
