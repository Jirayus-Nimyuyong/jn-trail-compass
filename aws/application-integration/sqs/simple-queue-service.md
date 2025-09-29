Amazon SQS What’s a queue?

---

Amazon SQS – Standard Queue
• Oldest offering (over 10 years old)
• Fully managed service, used to decouple applications
• Attributes:
• Unlimited throughput, unlimited number of messages in queue
• Default retention of messages: 4 days, maximum of 14 days
• Low latency (<10 ms on publish and receive)
• Limitation of 256KB per message sent
• Can have duplicate messages (at least once delivery, occasionally)
• Can have out of order messages (best effort ordering)

---

SQS – Producing Messages
• Produced to SQS using the SDK (SendMessage API)
• The message is persisted in SQS until a consumer deletes it
• Message retention: default 4 days, up to 14 days
• Example: send an order to be processed
• Order id
• Customer id
• Any attributes you want
• SQS standard: unlimited throughput

---

SQS – Consuming Messages
• Consumers (running on EC2 instances, servers, or AWS Lambda)…
• Poll SQS for messages (receive up to 10 messages at a time)
• Process the messages (example: insert the message into an RDS database)
• Delete the messages using the DeleteMessage API

---

SQS – Multiple EC2 Instances Consumers
• Consumers receive and process
messages in parallel
• At least once delivery
• Best-effort message ordering
• Consumers delete messages
after processing them
• We can scale consumers
horizontally to improve
throughput of processing

---

SQS with Auto Scaling Group (ASG)

---

SQS to decouple between application tiers

---

Amazon SQS - Security

• Encryption:
• In-flight encryption using HTTPS API
• At-rest encryption using KMS keys
• Client-side encryption if the client wants to perform encryption/decryption itself
• Access Controls: IAM policies to regulate access to the SQS API
• SQS Access Policies (similar to S3 bucket policies)
• Useful for cross-account access to SQS queues
• Useful for allowing other services (SNS, S3…) to write to an SQS queue

---

Amazon SQS - Standard Queues Overview
Introduction to Amazon SQS
At the core of Amazon SQS is a queue because SQS is a simple queuing service. We have an SQS queue that contains messages. To contain messages, something needs to send messages into our SQS queue, and whatever sends a message into our SQS queue is called a producer. It is possible to have one producer or multiple producers sending many messages into an SQS queue. The message could be anything, for example, "process this order" or "process this video." Whatever message you create goes into the queue.

Then something needs to process the messages from the queue and receive them; this is called a consumer. Consumers poll messages from the queue, meaning they ask the queue, "Do you have any message for me?" The queue responds, "Yes, here it is." The consumer polls these messages, obtains the information, processes it, and then deletes the message from the queue. Multiple consumers can consume messages from an SQS queue. A queuing service acts as a buffer to decouple producers and consumers.

Overview of Amazon SQS Standard Queues
Amazon SQS is a complicated service, but the first offering is called Amazon SQS for standard queues. Historically, SQS is one of the oldest services on AWS, over 10 years old, and is fully managed. It is used to decouple applications. Whenever you see application decoupling in your exam, think about Amazon SQS.

Key Features of SQS Standard Queues
Unlimited throughput: You can send as many messages per second as you want, and the queue can hold unlimited messages.
Message retention: Messages are short-lived; by default, they stay in the queue for 4 days, with a maximum retention period of 14 days.
Low latency: Publishing and receiving messages typically respond in less than 10 milliseconds.
Message size limit: Messages must be less than 256 kilobytes.
At-least-once delivery: Messages can be delivered more than once, so applications must handle duplicates.
Best-effort ordering: Messages may arrive out of order; ordering is not guaranteed.
Message Producers
Messages up to 256 kilobytes are sent into SQS by producers using SDKs (Software Development Kits). The API to send a message to SQS is called SendMessage. The message is persisted in the SQS queue until a consumer reads and deletes it, signifying that the message has been processed. For example, to process an order, a producer might send a message containing the order ID, customer ID, and other attributes such as the address.

Message Consumers
Consumers are applications that you write to process messages. These applications can run on EC2 instances (virtual servers on AWS), on-premises servers, or AWS Lambda functions. Consumers poll the SQS queue by asking if there are messages available. They may receive up to 10 messages at a time. After processing messages, such as inserting orders into an Amazon RDS database, consumers delete the messages from the queue using the DeleteMessage API to ensure they are not processed again.

Multiple consumers can process messages in parallel. If a message is not processed quickly enough by one consumer, it may be received by others, which is why SQS provides at-least-once delivery and best-effort ordering. Consumers must delete messages after processing to prevent other consumers from seeing them again.

Scaling Consumers with Auto Scaling Groups
To increase throughput when there are more messages, you can add more consumers and scale horizontally. Consumers can run on EC2 instances inside an Auto Scaling group (ASG). The ASG can scale based on metrics such as the queue length, known as ApproximateNumberOfMessages, which is a CloudWatch metric available for any SQS queue. You can set up a CloudWatch alarm to increase the ASG capacity when the queue length exceeds a threshold. This integration ensures that more EC2 instances are launched to process messages during surges, such as increased orders on a website.

Application Decoupling Use Case
Consider an application that processes videos. Instead of a single front-end application handling video processing—which can be time-consuming and slow down the website—you can decouple the application into two tiers. The front-end sends a message to an SQS queue when a video needs processing. A back-end processing application, running in its own Auto Scaling group, receives messages from the queue, processes the videos, and stores them in an S3 bucket. This architecture allows independent scaling of front-end and back-end tiers, leveraging SQS's unlimited throughput and message capacity for robustness and scalability.

SQS Security Features
Encryption in transit: Messages are sent and received using HTTPS API to ensure encryption in-flight.
Encryption at rest: SQS supports encryption at rest using AWS KMS keys.
Client-side encryption: Clients can perform encryption and decryption themselves, though this is not supported natively by SQS.
Access control: IAM policies regulate access to the SQS API, and SQS access policies (similar to S3 bucket policies) enable cross-account access or allow other AWS services, such as SNS or S3, to write to an SQS queue.
This concludes the overview of Amazon SQS standard queues. The service is essential for decoupling applications and building scalable, robust architectures. We will explore more in the next lecture with practical examples.

Key Takeaways
Amazon SQS is a fully managed queuing service designed to decouple producers and consumers with unlimited throughput.
Messages in SQS standard queues are short-lived, with a default retention of 4 days and a maximum of 14 days.
SQS provides at-least-once delivery with best-effort ordering, allowing for possible duplicate and out-of-order messages.
Integration with Auto Scaling groups enables dynamic scaling of consumers based on queue length metrics for efficient message processing.