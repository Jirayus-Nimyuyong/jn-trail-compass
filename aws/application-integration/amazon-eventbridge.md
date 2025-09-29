Amazon EventBridge
(formerly CloudWatch Events)

• Schedule: Cron jobs (scheduled scripts)
Schedule Every hour
Trigger script on Lambda funceon
• Event Pattern: Event rules to react to a service doing something
IAM Root User Sign in Event
SNS Topic with Email Notification
• Trigger Lambda functions, send SQS/SNS messages…

---

Amazon EventBridge Rules

---

Amazon EventBridge
• Event buses can be accessed by other AWS accounts using Resource-based Policies
• You can archive events (all/filter) sent to an event bus (indefinitely or set period)
• Ability to replay archived events

---

Amazon EventBridge – Schema Registry

• EventBridge can analyze the events in
your bus and infer the schema
• The Schema Registry allows you to
generate code for your application, that
will know in advance how data is
structured in the event bus
• Schema can be versioned

---

Amazon EventBridge – Resource-based Policy

• Manage permissions for a specific Event Bus
• Example: allow/deny events from another AWS account or AWS region
• Use case: aggregate all events from your AWS Organization in a single AWS
account or AWS region

---

EventBridge – Multi-account Aggregation

---

Amazon EventBridge
Introduction to Amazon EventBridge
Amazon EventBridge, formerly known as CloudWatch Events, is a service that allows you to schedule and react to events within AWS. Although the name has changed, you may still encounter CloudWatch Events in older AWS experiences or documentation.

With EventBridge, you can schedule cron jobs in the cloud. For example, you can configure it to trigger a Lambda function every hour, which then runs a script. These events are generated periodically, hence the name Amazon EventBridge.

Beyond scheduled events, EventBridge can also react to event patterns. Event rules can respond to specific service actions, such as an IAM root user signing into the AWS console.

For instance, when the root user signs in, you might want to send a message to an SNS topic to receive an email notification. This is a valuable security feature to monitor root account usage.

EventBridge supports multiple destinations for events, including triggering Lambda functions, sending SNS or SQS messages, among others.

Event Sources and Event Flow
EventBridge acts as a central hub where various sources send events. Examples include:

EC2 instances starting, stopping, or terminating
CodeBuild build failures
S3 object uploads
Trusted Advisor security findings
Additionally, by combining EventBridge with CloudTrail, you can intercept any API call made within your AWS accounts, which is a powerful monitoring capability.

You can also schedule events using cron expressions, such as every four hours or on the first Monday of the month at 8:00 am.

These events are sent into Amazon EventBridge, where you can apply filters. For example, you might filter events to only those related to a specific S3 bucket.

EventBridge generates a JSON document representing the event details, including instance IDs, timestamps, IP addresses, and more.

Event Destinations and Integrations
Once events are processed, they can be sent to various destinations, enabling powerful integrations. Some examples include:

Triggering Lambda functions
Scheduling AWS Batch jobs
Launching Amazon ECS tasks
Sending messages to SQS or SNS
Streaming data to Kinesis Data Streams
Starting Step Functions
Initiating CodePipeline or CodeBuild processes
Executing SSM automation or EC2 actions such as starting, stopping, or restarting instances
The possibilities are extensive and depend on your specific use case.

Event Buses in Amazon EventBridge
Amazon EventBridge provides different types of event buses:

Default Event Bus: Receives events from AWS services.
Partner Event Bus: Integrates with software-as-a-service (SaaS) partners like Zendesk, Datadog, and Auth0, allowing their events to be sent directly into your AWS account.
Custom Event Bus: Allows you to create your own event buses for your applications to send custom events.
These event buses enable you to route events to different destinations using EventBridge rules.

Cross-Account Access and Event Archiving
EventBridge supports cross-account event bus access through resource-based policies. This allows, for example, a central event bus within an AWS organization to aggregate events from multiple accounts. By adding resource-based policies, you can permit other accounts to send events to this central bus.

Additionally, EventBridge can archive events, either indefinitely or for a set retention period. Archived events can be replayed, which is useful for debugging, troubleshooting, and fixing production issues. For example, if a Lambda function has a bug, you can fix it and then replay archived events to retest.

Schema Registry
EventBridge includes a Schema Registry feature that analyzes events on your event bus and infers their schema. This allows you to generate code for your applications that understands the data structure of events in advance.

Schemas can be versioned, enabling you to iterate on your application's event structure over time. For example, a schema for a specific CodePipeline event can be downloaded and used directly in your application code.

Summary
To summarize, Amazon EventBridge enables you to react to events happening within your AWS accounts using the default event bus, partner events from SaaS providers, and your own custom events via custom buses. It offers powerful features such as the Schema Registry, resource-based policies for cross-account access, and event archiving with replay capabilities.

This flexibility allows you to build complex event-driven architectures tailored to your needs.

Key Takeaways
Amazon EventBridge, formerly known as CloudWatch Events, enables scheduling and reacting to events within AWS.
EventBridge supports multiple event buses: default, partner, and custom, facilitating diverse event sources and integrations.
Events can trigger various AWS services such as Lambda, SNS, SQS, ECS, Step Functions, CodePipeline, and more.
Features include Schema Registry for event structure inference, resource-based policies for cross-account access, and event archiving with replay capabilities.

---

Amazon EventBridge - Multi-Account Aggregation
Multi-Account Event Aggregation with AWS EventBridge
This lecture explains how to perform multi-account event aggregation using AWS EventBridge. The goal is to centrally manage events from multiple AWS accounts within a single central account event bus.

For example, if you launch EC2 instances across multiple AWS accounts, you may want to capture all these events in a central account. The question is: how can this be achieved?

The approach involves defining an event pattern in each individual account. Then, you create an event rule that captures all state changes of resources, such as EC2 instances, in that account. This event rule will send events to a target.

Importantly, the target of an event rule in one AWS account can be an event bus in another AWS account. This allows events from multiple accounts to be aggregated into a central event bus.

To enable this cross-account event delivery, you must create a resource policy on the event bus in the central account. This policy grants permission to accept events from other AWS accounts.

By applying this pattern to multiple accounts — for example, accounts A, B, C, and D — all EC2 instance state change events from these accounts will be sent to the central account's event bus.

Once the events are aggregated in the central event bus, you can create event rules on this bus to trigger various targets such as SNS notifications, Lambda functions, or other AWS services according to your requirements.

This architecture enables centralized monitoring and management of events across multiple AWS accounts efficiently.

I hope this explanation was helpful. Thank you for your attention, and I look forward to seeing you in the next lecture.

Key Takeaways
Multi-account event aggregation in AWS EventBridge allows centralized event management.
Event rules in one account can target event buses in another account.
A resource policy on the central event bus is required to accept events from other accounts.
Centralized event buses enable triggering actions like SNS notifications or Lambda functions based on aggregated events.