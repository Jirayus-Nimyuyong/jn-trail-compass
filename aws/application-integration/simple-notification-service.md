Amazon SNS

• The “event producer” only sends message to one SNS topic
• As many “event receivers” (subscriptions) as we want to listen to the SNS topic notifications
• Each subscriber to the topic will get all the messages (note: new feature to filter messages)
• Up to 12,500,000 subscriptions per topic
• 100,000 topics limit

SNS integrates with a lot of AWS services

• Many AWS services can send data directly to SNS for notifications

Amazon SNS – How to publish

• Topic Publish (using the SDK)
• Create a topic
• Create a subscription (or many)
• Publish to the topic

• Direct Publish (for mobile apps SDK)
• Create a platform application
• Create a platform endpoint
• Publish to the platform endpoint
• Works with Google GCM, Apple APNS, Amazon ADM…

Amazon SNS – Security

• Encryption:
• In-flight encryption using HTTPS API
• At-rest encryption using KMS keys
• Client-side encryption if the client wants to perform encryption/decryption itself
• Access Controls: IAM policies to regulate access to the SNS API
• SNS Access Policies (similar to S3 bucket policies)
• Useful for cross-account access to SNS topics
• Useful for allowing other services ( S3…) to write to an SNS topic

SNS + SQS: Fan Out

• Push once in SNS, receive in all SQS queues that are subscribers
• Fully decoupled, no data loss
• SQS allows for: data persistence, delayed processing and retries of work
• Ability to add more SQS subscribers over time
• Make sure your SQS queue access policy allows for SNS to write
• Cross-Region Delivery: works with SQS Queues in other regions

Application: S3 Events to multiple queues
• For the same combination of: event type (e.g. object create) and prefix
(e.g. images/) you can only have one S3 Event rule
• If you want to send the same S3 event to many SQS queues, use fan-out

Application: SNS to Amazon S3 through
Kinesis Data Firehose

• SNS can send to Kinesis and therefore we can have the following
solutions architecture:

---

Amazon SNS – FIFO Topic

• FIFO = First In First Out (ordering of messages in the topic)

• Similar features as SQS FIFO:
• Ordering by Message Group ID (all messages in the same group are ordered)
• Deduplication using a Deduplication ID or Content Based Deduplication
• Can have SQS Standard and FIFO queues as subscribers
• Limited throughput (same throughput as SQS FIFO)

SNS FIFO + SQS FIFO: Fan Out

• In case you need fan out + ordering + deduplication

SNS – Message Filtering

• JSON policy used to filter messages sent to SNS topic’s subscriptions
• If a subscription doesn’t have a filter policy, it receives every message

---

Amazon SNS
Introduction to Amazon SNS
Now let's talk about Amazon SNS.

The Challenge of Sending Messages to Multiple Receivers
What if you want to send one message and have many, many different receivers? You could have a direct integration where, for example, a buying service application sends an email notification, then sends a message to a fraud service, sends a message to a shipping service, and maybe even sends a message into an SQS Queue. This approach is cumbersome because every time you add a new receiving service, you need to create and write that integration.

Publish-Subscribe Pattern with SNS
Instead, what you may want to do is use a Pub/Sub or Publish-subscribe pattern. The idea is that the buying service will send a message into an SNS topic, which is publishing a message into a topic. That topic will have many subscribers, and each subscriber will be able to receive that message from the SNS topic and have it for their own. This is another type of pattern called the Pub/Sub pattern.

In Amazon SNS, the event producer only sends messages to one specific SNS topic. The event receivers, or the subscriptions, want to listen to the SNS topic notifications. Therefore, each subscriber in your SNS topic will get all the messages sent to the topic, except if you use a feature to filter messages, which is also possible.

SNS Scalability Limits
How many subscribers can you get per topic? You can have up to 12,000,000 plus subscriptions per topic, which is quite a lot. The number can change over time. In your account, you can get up to 100,000 topics, and you can increase that limit as well. These limits may change, but this gives you an idea of the scale SNS can handle. You are never tested on limits themselves for SNS.

Types of SNS Subscribers
For SNS, you publish your messages to subscribers. What can they be? You can directly send emails from SNS. You can send SMS and mobile notifications. You can also send data directly into specified HTTP or HTTPS endpoints. SNS also has integrations with specific AWS services such as SQS, to send your message directly into a queue; Lambda, to have a function execute code after the message is received; or Kinesis Data Firehose, to send data into services like Amazon S3 or Redshift.

SNS Integration with AWS Services
On top of that, SNS receives data from many AWS services. They directly send notifications into SNS. Examples include CloudWatch Alarms, Auto Scaling Group notifications, CloudFormation state changes, Budgets, S3 buckets, DMS, Lambda, DynamoDB, RDS events, and so on. You do not have to remember all of them, but as soon as there is some sort of notification within AWS, services will send a notification into a specified SNS topic.

How SNS Works
To publish a message into SNS, you use the topic publish SDK. First, you create a topic. Then you create one or many subscriptions. You publish to the SNS topic, and that's it. All the subscribers will automatically retrieve that message.

There is also something called direct publish for mobile apps using the SDK. You need to create a platform application and a platform endpoint. You publish into the platform endpoint, and it works in terms of subscribers for Google GCM, Apple APNS, or Amazon ADM, which are different ways for your mobile application to receive notifications.

Security in Amazon SNS
In terms of security, Amazon SNS has the same kind of security as SQS. It has in-flight encryption by default, at-rest encryption using KMS keys, and client-side encryption if your client wants to send some encrypted message into SNS. However, it is up to your client to handle the encryption and decryption.

IAM policies are central to security because all SNS APIs are regulated by IAM policies. You can define SNS access policies, which are very similar to S3 bucket policies. These are very helpful when you want to have cross-account access to SNS topics or to allow other services, such as your S3 events, to write into your SNS topics.

Conclusion
That's it. I hope you liked it, and I will see you in the next lecture.

Key Takeaways
Amazon SNS enables a publish-subscribe messaging pattern allowing one message to be sent to many receivers.
SNS supports multiple subscriber types including email, SMS, HTTP(S) endpoints, and AWS services like SQS, Lambda, and Kinesis Data Firehose.
SNS integrates with various AWS services to receive notifications automatically.
Security in SNS includes in-flight and at-rest encryption, client-side encryption, and access control via IAM and SNS access policies.

---

Amazon SNS and SQS - Fan-Out Pattern
Introduction to SNS plus SQS Fan-Out Pattern
The SNS plus SQS fan-out pattern is designed to send a message to multiple SQS queues efficiently. Instead of sending messages individually to every SQS queue, which can lead to issues such as application crashes, delivery failures, or difficulties when adding more queues, the fan-out pattern provides a robust solution.

The core idea is to push a message once to an SNS topic. Multiple SQS queues can then subscribe to this SNS topic as subscribers, ensuring that all subscribed queues receive the messages sent to SNS.

For example, a buying service that needs to send messages to two SQS queues will send one message into an SNS topic. The fraud service and the shipping service each have their own SQS queues subscribed to this SNS topic, allowing them to read all messages independently.

This model is fully decoupled and ensures no data loss. SQS provides data persistence, delayed processing, and retries of work. Additionally, more SQS queues can be added as subscribers to the SNS topic over time.

To enable this, the SQS queue access policy must allow the SNS topic to write to the SQS queue. This is another use case for queue access policies. Moreover, cross-region delivery is possible, allowing an SNS topic in one region to send messages to SQS queues in other regions if security permissions allow.

Applying Fan-Out Pattern to S3 Events
S3 event rules have limitations; for example, for a combination of event type and prefix, only one S3 event rule can exist. To send the same S3 event notification to multiple SQS queues, the fan-out pattern is used.

When an S3 object is created, the event is sent to an SNS topic. Multiple SQS queues subscribe to this SNS topic, allowing the event message to be delivered to many destinations. Other types of applications, such as email or Lambda functions, can also subscribe to the SNS topic.

Integration with Kinesis Data Firehose
SNS integrates directly with Kinesis Data Firehose (KDF). This allows a buying service to send data into an SNS topic, which KDF receives and then delivers to destinations such as Amazon S3 buckets or any other supported KDF destination. This integration provides extensibility in persisting messages from SNS topics.

Fan-Out Pattern with FIFO Topics and Queues
Amazon SNS supports FIFO (First-In-First-Out) topics, which maintain message ordering. Producers send messages in order, such as one, two, three, four, and subscribers, which must be SQS FIFO queues, receive messages in the same order.

SNS FIFO topics provide features like ordering by message group ID and deduplication using a deduplication ID or content-based deduplication. Both SQS standard and FIFO queues can be subscribers, but throughput is limited to that of the SQS FIFO queue.

This pattern is useful when fan-out, ordering, and deduplication are required. For example, a buying service sends data into an SNS FIFO topic, which fans out to two SQS FIFO queues. The fraud service and shipping service then read from these FIFO queues.

Message Filtering in SNS
SNS supports message filtering, which uses a JSON policy to filter messages sent to SNS topic subscriptions. If a subscription does not have a filter policy, it receives every message by default.

For example, a buying service sends transactions into an SNS topic. Each transaction includes fields such as order number, product (e.g., pencil), quantity, and state (e.g., placed). To create an SQS queue that only receives placed orders, the queue subscribes to the SNS topic with a filter policy specifying that the state must equal "Placed." Only messages matching this policy are delivered to that SQS queue.

Similarly, another SQS queue can be created for canceled orders with its own filter policy. These queues will not receive the same messages. Additionally, an email subscription can be created for canceled orders using the same filter policy. Other filter policies can be created for declined orders or other states. An SQS queue without a filter policy will receive all messages from the SNS topic.

Using fan-out patterns, message filtering, FIFO queues, and FIFO topics provides many possibilities for message distribution and processing. These concepts are important for understanding AWS messaging services and are commonly tested in exams.

Key Takeaways
The SNS plus SQS fan-out pattern enables sending a single message to multiple SQS queues reliably and decoupled.
SNS topics can have multiple SQS queues subscribed, allowing for scalable message distribution with data persistence and retries.
Fan-out pattern supports cross-region delivery and integration with other AWS services like S3 events and Kinesis Data Firehose.
SNS FIFO topics combined with SQS FIFO queues provide ordered, deduplicated message delivery with filtering capabilities for selective message processing.