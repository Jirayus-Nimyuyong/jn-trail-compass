AWS AppSync - Overview

• AppSync is a managed service that uses GraphQL
• GraphQL makes it easy for applications to get exactly the data they need.
• This includes combining data from one or more sources
• NoSQL data stores, Relational databases, HTTP APIs…
• Integrates with DynamoDB, Aurora, OpenSearch & others
• Custom sources with AWS Lambda
• Retrieve data in real-time with WebSocket or MQTT on WebSocket
• For mobile apps: local data access & data synchronization
• It all starts with uploading one GraphQL schema

---

GraphQL Example

---

AppSync Diagram

---

AppSync – Security

---

• There are four ways you can authorize applications to interact with your
AWS AppSync GraphQL API:
• API_KEY
• AWS_IAM: IAM users / roles / cross-account access
• OPENID_CONNECT: OpenID Connect provider / JSON Web Token
• AMAZON_COGNITO_USER_POOLS
• For custom domain & HTTPS, use CloudFront in front of AppSync

---

AppSync Overview
Introduction to AWS AppSync
AWS AppSync is a managed service designed to build GraphQL APIs on AWS. It enables applications to request exactly the data they need, making data retrieval efficient and flexible.

GraphQL is a new style of API that allows clients to specify the exact fields they want. This means applications receive only the data they request, avoiding over-fetching.

Data Integration with GraphQL in AppSync
GraphQL combines data from multiple sources into a single graph. These data sources can include NoSQL data stores, relational databases, and HTTP APIs.

AppSync provides direct integrations with DynamoDB, Aurora, OpenSearch, and other sources. Additionally, Lambda functions can be used to extend data retrieval from any source.

Real-Time Data and WebSockets
AppSync supports real-time applications through WebSockets or MQTT over WebSockets. This is useful for applications that require live data feeds.

While alternatives like Application Load Balancer or API Gateway exist for real-time data, AppSync is a viable option for WebSocket integration.

Offline Data Access and Synchronization
For mobile applications requiring local data access and synchronization, AppSync serves as a modern replacement for the outdated AWS Cognito Sync service.

Getting Started with AppSync
To begin using AppSync, you upload a GraphQL schema. This schema defines the structure of the API and the data that clients can query.

In a typical setup, AppSync sits in the middle between clients and data sources. Clients send queries specifying the data they want, and AppSync resolves these queries using resolvers.

Example Query
A client might request the name of a human, the movies they appear in, and the starships associated with them. AppSync uses resolvers to fetch this data, for example, from DynamoDB.

AppSync automatically returns the data in JSON format, matching exactly the fields requested in the query. This flexibility is a key feature of GraphQL APIs.

High-Level Overview
AppSync integrates with web and mobile applications using GraphQL. It supports real-time dashboards and offline data synchronization, making it suitable for a variety of application types.

At its core, AppSync requires a GraphQL schema and resolvers that define how to fetch data. Supported data sources include DynamoDB, Aurora, OpenSearch, Lambda functions, and public HTTP endpoints.

Monitoring and Logging
AppSync integrates with CloudWatch Metrics and CloudWatch Logs, allowing you to monitor API activity and troubleshoot issues effectively.

Security and Authorization
There are four main ways to authorize access to your AppSync GraphQL API:

API_KEY: Generate API keys similar to API Gateway and distribute them to users.
AWS_IAM: Use IAM users, roles, or cross-account access to secure the API.
OPENID_CONNECT: Integrate with an OpenID Connect provider using JSON Web Tokens.
AMAZON_COGNITO_USER_POOL: Use Cognito User Pools for authentication, enabling federation with social login providers.
For HTTPS security with a custom domain, the recommended approach is to use CloudFront in front of AppSync.

Summary
This concludes the theoretical overview of AWS AppSync. Hands-on practice will help solidify understanding and demonstrate how to implement these concepts.

Key Takeaways
AWS AppSync is a managed service that uses GraphQL to build flexible APIs.
GraphQL allows clients to request exactly the data they need from multiple data sources.
AppSync integrates directly with DynamoDB, Aurora, OpenSearch, Lambda, and HTTP APIs.
AppSync supports real-time data with WebSockets and offline data synchronization for mobile apps.