DynamoDB – Security & Other Features

• Security
• VPC Endpoints available to access DynamoDB without using the Internet
• Access fully controlled by IAM
• Encryption at rest using AWS KMS and in-transit using SSL/TLS
• Backup and Restore feature available
• Point-in-time Recovery (PITR) like RDS
• No performance impact
• Global Tables
• Multi-region, multi-active, fully replicated, high performance
• DynamoDB Local
• Develop and test apps locally without accessing the DynamoDB web service (without Internet)
• AWS Database Migration Service (AWS DMS) can be used to migrate to
DynamoDB (from MongoDB, Oracle, MySQL, S3, …)

---

DynamoDB – Users Interact with DynamoDB Directly

---

DynamoDB – Fine-Grained Access Control

• Using Web Identity Federation or
Cognito Identity Pools, each user
gets AWS credentials
• You can assign an IAM Role to
these users with a Condition to
limit their API access to
DynamoDB
• LeadingKeys – limit row-level
access for users on the Primary
Key
• Attributes – limit specific
attributes the user can see

---
DynamoDB Security & Other Features
DynamoDB Security and Features
Let's discuss DynamoDB security and some additional features.

VPC Endpoints
VPC endpoints are available to access DynamoDB without using the public internet, keeping all traffic within your VPC.

Access Control
Access to DynamoDB is fully controlled by IAM, which makes it a great database choice in AWS.

Encryption
DynamoDB supports encryption at rest using AWS KMS and encryption in transit using SSL and TLS.

Backup and Restore
There are two backup and restore features:

Point-in-time recovery (PITR), similar to RDS, with no performance impact.
Standard backup and restore functionality.
Global Tables
Global tables provide multi-region, multi-active, fully replicated, high-performance tables in DynamoDB.

To enable global tables, you first need to enable DynamoDB streams.

DynamoDB Local
Although DynamoDB is a cloud service, you can simulate it locally on your computer using DynamoDB Local. This local database allows you to develop and test your applications without using the DynamoDB web service, which is very convenient.

Data Migration
For migrating data to and from DynamoDB, the AWS Database Migration Service is an excellent choice. For example, you can migrate from MongoDB to DynamoDB, or from Oracle, MySQL, S3, and so on.

Fine-Grained Access Control
When clients and applications, such as web or mobile apps, need to access DynamoDB tables directly, it is inefficient and insecure to grant them IAM permissions or roles directly. Instead, we use an identity provider.

Identity Providers
Identity providers can include Amazon Cognito User Pools, Google login, Facebook login, OpenID Connect, SAML, or others. Users log in with these providers and can exchange their credentials for temporary AWS credentials.

Temporary Credentials
Because these credentials are temporary, they are more secure. They can be associated with an IAM role, which must be restricted to ensure clients and applications can only perform operations on the data they own.

Implementing Fine-Grain Access Control
This is achieved by federated login to obtain temporary credentials, then creating an IAM role with conditions that restrict what the user can do.

Sample IAM Policy
The policy allows actions such as GetItem, BatchGetItem, Query, PutItem, UpdateItem, DeleteItem, and BatchWriteItem on a specific table. However, there is a condition that limits access based on the leading key corresponding to the DynamoDB and connector identity pseudo variables, which are replaced at runtime by the specific user.

Row-Level Access
Effectively, this condition limits row-level access for users based on the primary key value, ensuring users can only modify and access their own data.

Attribute-Level Access
You can also specify conditions on attributes to limit the specific attributes a user can see in your DynamoDB table.

Summary
To summarize, fine-grain access control is implemented by using federated login and specifying conditions on leading keys to limit access at the row level or on attributes to limit access at the column level.

This concludes the lecture on DynamoDB security and other features.

Key Takeaways
DynamoDB security includes VPC endpoints, IAM control, and encryption at rest and in transit.
Backup and restore features include point-in-time recovery and standard backups without performance impact.
Global tables enable multi-region, multi-active fully replicated high-performance tables.
Fine-grained access control is achieved using federated login with temporary AWS credentials and IAM role conditions limiting access by primary key or attributes.