What’s serverless?

• Serverless is a new paradigm in which the developers don’t have to
manage servers anymore…
• They just deploy code
• They just deploy… functions !
• Initially... Serverless == FaaS (Function as a Service)
• Serverless was pioneered by AWS Lambda but now also includes
anything that’s managed: “databases, messaging, storage, etc.”
• Serverless does not mean there are no servers…
it means you just don’t manage / provision / see them

---

Serverless in AWS
• AWS Lambda
• DynamoDB
• AWS Cognito
• AWS API Gateway
• Amazon S3
• AWS SNS & SQS
• AWS Kinesis Data Firehose
• Aurora Serverless
• Step Functions
• Fargate

---
Serverless Introduction
Introduction to Serverless
Serverless is a relatively new concept in cloud computing. When developers use serverless services, they no longer have to manage servers directly. This does not mean that servers no longer exist; rather, the management of servers is abstracted away from the developer. Instead, developers simply deploy code, often in the form of functions.

Initially, serverless referred specifically to Function as a Service (FaaS).

AWS Lambda

Serverless was pioneered by AWS Lambda, which we will explore in detail in this section. However, the concept of serverless has expanded to include any remotely managed services where you do not provision servers yourself. This includes databases, messaging systems, and storage services.

What Serverless Means
You do not provision or manage servers.
Servers still exist but are invisible to the developer.
Services scale automatically based on demand.
You pay only for what you use.
AWS Serverless Architecture Example
Consider a typical AWS serverless application architecture:

Users access static content hosted on Amazon S3 buckets.
Content delivery is enhanced using Amazon CloudFront.
User authentication and identity management is handled by Amazon Cognito.
Users invoke REST APIs through Amazon API Gateway.
API Gateway triggers AWS Lambda functions.
Lambda functions interact with Amazon DynamoDB to store and retrieve data.
This architecture demonstrates how various AWS services integrate to provide a fully serverless application.

This section will cover Lambda, DynamoDB, API Gateway, Cognito, and other related services in detail.

Additional AWS Serverless Services
Beyond Lambda and DynamoDB, AWS offers several other serverless services:

Amazon S3: Object storage service for static content.
Amazon SNS and SQS: Messaging services that scale automatically without server management.
Amazon Kinesis Data Firehose: Data streaming service that scales based on throughput.
Amazon Aurora Serverless: A serverless relational database that scales on demand.
AWS Step Functions: Orchestration service for serverless workflows.
AWS Fargate: Serverless compute engine for containers, eliminating the need to provision infrastructure for Docker containers.
All these services allow developers to focus on application logic without managing underlying servers.

Summary
This introduction provides a concise overview of serverless computing and AWS serverless services. The next lecture will delve deeper into AWS Lambda, which is a core component of serverless architectures. Understanding serverless concepts is essential, as it is heavily tested in certification exams.

Key Takeaways
Serverless means developers do not manage servers, though servers still exist.
Initially, serverless referred to Function as a Service (FaaS), pioneered by AWS Lambda.
Serverless now includes managed services like databases, messaging, and storage without provisioning servers.
AWS serverless architecture includes Lambda, DynamoDB, API Gateway, Cognito, S3, SNS, SQS, Kinesis Data Firehose, Aurora Serverless, Step Functions, and Fargate.