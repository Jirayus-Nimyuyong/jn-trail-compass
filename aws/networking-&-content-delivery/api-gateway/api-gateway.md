Example: Building a Serverless API

---

AWS API Gateway

• AWS Lambda + API Gateway: No infrastructure to manage
• Support for the WebSocket Protocol
• Handle API versioning (v1, v2…)
• Handle different environments (dev, test, prod…)
• Handle security (Authentication and Authorization)
• Create API keys, handle request throttling
• Swagger / Open API import to quickly define APIs
• Transform and validate requests and responses
• Generate SDK and API specifications
• Cache API responses

---

API Gateway – Integrations High Level

• Lambda Function
• Invoke Lambda function
• Easy way to expose REST API backed by AWS Lambda
• HTTP
• Expose HTTP endpoints in the backend
• Example: internal HTTP API on premise, Application Load Balancer…
• Why? Add rate limiting, caching, user authentications, API keys, etc…
• AWS Service
• Expose any AWS API through the API Gateway
• Example: start an AWS Step Function workflow, post a message to SQS
• Why? Add authentication, deploy publicly, rate control…

---

API Gateway – AWS Service Integration
Kinesis Data Streams example

---

API Gateway - Endpoint Types

• Edge-Optimized (default): For global clients
• Requests are routed through the CloudFront Edge locations (improves latency)
• The API Gateway still lives in only one region
• Regional:
• For clients within the same region
• Could manually combine with CloudFront (more control over the caching
strategies and the distribution)
• Private:
• Can only be accessed from your VPC using an interface VPC endpoint (ENI)
• Use a resource policy to define access

---

API Gateway – Security

• User Authentication through
• IAM Roles (useful for internal applications)
• Cognito (identity for external users – example mobile users)
• Custom Authorizer (your own logic)
• Custom Domain Name HTTPS security through integration with AWS
Certificate Manager (ACM)
• If using Edge-Optimized endpoint, then the certificate must be in us-east-1
• If using Regional endpoint, the certificate must be in the API Gateway region
• Must setup CNAME or A-alias record in Route 53


---

API Gateway - Section Introduction
Introduction to API Gateway
Now, let us continue our serverless journey. We already know how to store data in DynamoDB. But what if we want to expose our functions to the world? What if we want people to access our application using a REST API?

We do not want to manage servers. For this purpose, we have API Gateway. API Gateway enables us to expose our application as a REST API on top of it.

We will also see how to perform user authentication using Amazon services. This section will truly bring things together and complete the way for you to deploy an API to the cloud.

Let's get started.

Key Takeaways
API Gateway allows exposing serverless functions as REST APIs without managing servers.
It enables secure user authentication integration with Amazon services.
This section completes the process of deploying an API to the cloud.
The journey continues from storing data in DynamoDB to making the application accessible globally.

---

API Gateway Overview
Introduction to API Gateway
So far in our serverless journey, we have seen how to create Lambda functions and how to use DynamoDB. The Lambda functions can use DynamoDB as a database for our API, allowing us to perform create, read, update, and delete operations on our tables. However, we want our clients to be able to invoke these Lambda functions in some way.

There are multiple ways to enable client invocation. One way is to have the client directly invoke the Lambda function, but this requires the client to have IAM permissions. Another way is to use an application load balancer between the client and the Lambda function, which exposes the Lambda function as an HTTP endpoint.

What is API Gateway?
There is one last option called the API Gateway. This is a serverless offering from AWS that allows us to create REST APIs which are public and accessible to our clients. The client communicates with the API Gateway, which then proxies the request to our Lambda functions.

We use API Gateway because it provides more than just an HTTP endpoint. It offers many features such as authentication, usage plans, development stages, and more. Integrating API Gateway with Lambda gives us a full serverless application with no infrastructure to manage.

Features of API Gateway
Support for the WebSocket protocol enabling real-time streaming in two different ways.
API versioning to move from version one to two and three without breaking clients.
Handling multiple environments including development, testing, and production.
Extensive security options for authentication and authorization.
Ability to create API keys and perform request throttling to control client usage.
Support for common standards such as Swagger and OpenAPI 3.0 to import and export API definitions.
Transformation and validation of requests and responses at the API Gateway level to ensure correct invocation.
Generation of SDKs and API specifications.
Caching of API responses to improve performance.
These features are not necessarily included when using simpler options like an application load balancer.

API Gateway Integrations
API Gateway can integrate with several backend types:

Lambda functions: This is the most common and easiest way to expose REST APIs backed by Lambda functions, enabling full serverless applications.
HTTP endpoints: You can expose any HTTP backend, such as on-premises HTTP APIs or application load balancers in your cloud environment. Using API Gateway adds features like rate limiting, caching, user authentication, and API keys on top of your HTTP endpoints.
AWS services: API Gateway can expose AWS services directly. For example, you can start a Step Functions workflow or post messages to SQS directly from an API Gateway API. This allows adding authentication and rate control to AWS services without exposing AWS credentials to clients.
Example: API Gateway with Kinesis Data Streams
Suppose you want clients to send data securely into a Kinesis Data Stream without giving them AWS credentials. You can place API Gateway between the clients and the Kinesis Data Stream. Clients send HTTP requests to the API Gateway, which is configured to forward messages into the Kinesis Data Stream. From there, records can be sent to Kinesis Data Firehose and eventually stored in an Amazon S3 bucket in JSON format.

This example demonstrates the power of API Gateway to expose any AWS service securely to external clients.

API Gateway Endpoint Types
There are three ways to deploy your API Gateway, known as endpoint types:

Edge-Optimized (default): Designed for global clients. Requests are routed through CloudFront Edge locations to improve latency. The API Gateway itself is in one region but accessible efficiently worldwide.
Regional: Used when all users are within the same region as the API Gateway. Does not use CloudFront Edge locations. You can create your own CloudFront distribution for more control over location strategies.
Private: Not public; accessible only within your VPC using interface VPC endpoints for ENIs. Access is controlled via resource policies.
Security Options for API Gateway
You can identify and authorize users accessing API Gateway in multiple ways:

IAM roles: Useful for internal applications, such as EC2 instances accessing APIs.
Amazon Cognito: Suitable for external users like mobile or web applications.
Custom authorizers: Lambda functions implementing custom authentication logic.
Additionally, you can secure your API Gateway with HTTPS using custom domain names integrated with AWS Certificate Manager (ACM). Certificates for Edge-Optimized endpoints must be in the us-east-1 region, while regional endpoints require certificates in the same region as the API Gateway stage.

Finally, you must configure DNS records (CNAME or A-alias) in Route 53 to point your domain to the API Gateway endpoint.

Conclusion
This concludes the overview of API Gateway. It is a powerful serverless service that enables you to create secure, scalable, and feature-rich APIs integrated with Lambda, HTTP backends, and AWS services without managing infrastructure.

Key Takeaways
API Gateway provides a serverless way to create public REST APIs that proxy requests to Lambda functions.
It offers advanced features like authentication, usage plans, API versioning, and request throttling.
API Gateway can integrate with Lambda, HTTP endpoints, and AWS services such as Kinesis and Step Functions.
There are three API Gateway endpoint types: Edge-Optimized, Regional, and Private, each suited for different use cases and access scopes.
