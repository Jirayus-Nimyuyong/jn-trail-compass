AWS Secrets Manager

• Newer service, meant for storing secrets
• Capability to force rotation of secrets every X days
• Automate generation of secrets on rotation (uses Lambda)
• Integration with Amazon RDS (MySQL, PostgreSQL, Aurora)
• Secrets are encrypted using KMS
• Mostly meant for RDS integration

---

AWS Secrets Manager – Multi-Region Secrets

• Replicate Secrets across multiple AWS Regions
• Secrets Manager keeps read replicas in sync with the primary Secret
• Ability to promote a read replica Secret to a standalone Secret
• Use cases: multi-region apps, disaster recovery strategies, multi-region DB…

---

SSM Parameter Store vs Secrets Manager
• Secrets Manager ($$$):
• Automatic rotation of secrets with AWS Lambda
• Lambda function is provided for RDS, Redshift, DocumentDB
• KMS encryption is mandatory
• Can integration with CloudFormation
• SSM Parameter Store ($):
• Simple API
• No secret rotation (can enable rotation using Lambda triggered by EventBridge)
• KMS encryption is optional
• Can integration with CloudFormation
• Can pull a Secrets Manager secret using the SSM Parameter Store API

---

SSM Parameter Store vs. Secrets Manager
Rotation

---

Secrets Manager - Overview
Introduction to AWS Secrets Manager
AWS Secrets Manager is a relatively new service designed for securely storing secrets. It differs from the Systems Manager (SSM) Parameter Store by offering enhanced capabilities for secret management.

One key feature of Secrets Manager is the ability to enforce the rotation of secrets every specified number of days. This allows for a better secret management schedule, ensuring credentials are regularly updated.

Additionally, Secrets Manager can automate the generation of new secrets during rotation. To achieve this, you must define a Lambda function that generates the new secrets as part of the rotation process.

Integration with AWS Services
Secrets Manager is well integrated with various AWS services. For example, it integrates seamlessly with Amazon RDS databases such as MySQL, PostgreSQL, SQL Server, and Aurora.

This integration means that the username and password required to access your database are stored directly in Secrets Manager. These credentials can be rotated automatically, enhancing security and reducing manual management.

Secrets stored in Secrets Manager can be encrypted using the AWS Key Management Service (KMS), ensuring that sensitive information remains protected.

Whenever you encounter references to Secrets or integration with RDS or Aurora in AWS exams, it is important to think of Secrets Manager as the relevant service.

Multi-Region Secrets
Secrets Manager supports the concept of multi-region secrets. This feature allows you to replicate your secrets across multiple AWS regions.

The Secrets Manager service keeps the replicated secrets synchronized with the primary secret. For example, if you create a secret in a primary region, it is automatically replicated to a secondary region as the same secret.

Benefits of Multi-Region Secrets
Disaster Recovery: In case of an issue with the primary region (e.g., US East 1), you can promote a replica secret in the secondary region to be a standalone secret.
Multi-Region Applications: You can build applications that operate across multiple regions using the replicated secrets.
Consistent Access: If you have an RDS database replicated across regions, you can use the same secret to access the corresponding database in each region.
Conclusion
AWS Secrets Manager provides a robust and integrated solution for managing secrets securely, with features such as automated rotation, encryption with KMS, and multi-region replication to support high availability and disaster recovery strategies.

Key Takeaways
AWS Secrets Manager is a service designed for storing and managing secrets with automated rotation capabilities.
Secrets Manager supports forced rotation of secrets every specified number of days, improving secret management schedules.
Integration with AWS services like Amazon RDS allows storing database credentials securely and rotating them automatically.
Secrets can be encrypted using AWS KMS, and Secrets Manager supports multi-region replication for disaster recovery and multi-region applications.

---

SSM Parameter Store vs Secrets Manager
Differences Between SSM Parameter Store and Secrets Manager
Let's discuss the differences between the SSM Parameter Store and Secrets Manager.

Secrets Manager is more expensive, and it provides automation for rotating secrets using Lambda functions. Some of these Lambda functions are provided out of the box. For example, there are built-in Lambda functions for RDS, Redshift, or DocumentDB, which have strong integrations with Secrets Manager. This saves you some time in managing secret rotations.

KMS encryption is mandatory for your secrets in Secrets Manager, and you can integrate Secrets Manager with CloudFormation.

On the other hand, the Parameter Store has a wider range of use cases and is less expensive. It has a simple API. However, there is no native secret rotation feature. Although, as I will show you in the next slide, you can enable rotation on your own using a Lambda function triggered by EventBridge.

KMS encryption is optional in Parameter Store because you can store either secrets or just parameters. It also integrates with CloudFormation. Additionally, it is possible to retrieve a secret from Secrets Manager using the SSM Parameter Store API.

Secret Rotation: Parameter Store vs Secrets Manager
Let's examine secret rotation between Parameter Store and Secrets Manager.

For Secrets Manager, suppose we want to rotate the password of an Amazon RDS database. We can configure Secrets Manager to automatically invoke a Lambda function every 30 days. This Lambda function, for example for RDS, is provided by AWS and deployed in your account by AWS. You just need to use it through Secrets Manager.

This Lambda function will change the password of your Amazon RDS database. This is a native functionality of Secrets Manager. In case you have a random secret that is not deeply integrated with Secrets Manager, you will need to write your own Lambda function. However, AWS provides documentation to assist you.

For the SSM Parameter Store, there is no native secret rotation feature. However, if you store an RDS database password in the Parameter Store, you can create an Amazon EventBridge rule that triggers every 30 days. This rule will invoke a Lambda function that you write yourself to change the password of your Amazon RDS database and update the value stored in the Parameter Store accordingly.

Hopefully, this clarifies the differences between Secrets Manager and the SSM Parameter Store.

Key Takeaways
Secrets Manager is more expensive but offers automated secret rotation using Lambda functions.
Parameter Store is less expensive, supports a wider range of use cases, but does not have native secret rotation.
Secrets Manager requires mandatory KMS encryption, while Parameter Store encryption is optional.
Secret rotation in Parameter Store can be implemented manually using EventBridge and Lambda.

