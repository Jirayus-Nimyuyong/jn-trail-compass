SSM Parameter Store

• Secure storage for configuration and secrets
• Optional Seamless Encryption using KMS
• Serverless, scalable, durable, easy SDK
• Version tracking of configurations / secrets
• Security through IAM
• Notifications with Amazon EventBridge
• Integration with CloudFormation

---

SSM Parameter Store Hierarchy

• /my-department/
• my-app/
• dev/
• db-url
• db-password
• prod/
• db-url
• db-password
• other-app/
GetParameters or
GetParametersByPath API
Dev Lambda
Function
Prod Lambda
Function
• /other-department/
• /aws/reference/secretsmanager/secret_ID_in_Secrets_Manager
• /aws/service/ami-amazon-linux-latest/amzn2-ami-hvm-x86_64-gp2 (public)

---

Standard and advanced parameter tiers

---

Parameters Policies (for advanced parameters)

• Allow to assign a TTL to a parameter (expiration date) to force
updating or deleting sensitive data such as passwords
• Can assign multiple policies at a time

---

SSM Parameter Store Overview
Introduction to SSM Parameter Store
SSM Parameter Store is a secure storage solution for your configuration and secrets. Optionally, you can choose to encrypt these configurations, thereby making them secrets, by using the KMS service.

SSM Parameter Store is serverless, scalable, and durable. The SDK is very easy to use. Additionally, when you update your parameters, version tracking is available.

Security is provided through IAM, and you receive notifications via Amazon EventBridge in certain cases. There is full integration with CloudFormation, which means CloudFormation can leverage parameters from Parameter Store as input parameters for your stacks.

Example Usage
Consider an application that uses the SSM Parameter Store. You can store plain text configuration in this way. The IAM permissions of your applications are checked, for example, your EC2 instance role.

Alternatively, you can have encrypted configuration. In that case, the SSM Parameter Store encrypts it with KMS. The KMS service is used for encryption and decryption. It is essential to ensure that your applications have access to the underlying KMS key to perform encryption and decryption.

Parameter Hierarchy
You can store parameters in the Parameter Store with a hierarchy. For example, you can define a path such as /my/department/My-app/Dev/Dev-DB-URL and /my/department/My-app/Dev/DB-password within that folder.

This means your parameters go all the way down into the hierarchy. You can go one level up and store parameters for the production environment, such as /my/department/My-app/Prod/Prod-DB-URL and /my/department/My-app/Prod/Prod-DB-password. You can also organize parameters for another app or department similarly.

This hierarchical organization allows you to structure your parameters as you want. It simplifies your IAM policies by allowing applications to have access to an entire department, an entire app, or just an app department environment-specific path.

Accessing Secrets and Public Parameters
You also have the opportunity to access Secrets Manager secrets through the Parameter Store by using a specific reference syntax. This is a useful trick that not many people know.

There are also Public Parameters issued by AWS that you can use. For example, you can find the latest Amazon Linux 2 AMI for your specific region. This is available within the Parameter Store as an API call.

For example, a development Lambda function can have an IAM role that allows it to access the DB-URL and DB-password within the development path of your app. Similarly, a production Lambda function, with a different IAM policy and possibly environment variables, can access the production DB-URL and DB-password from another path.

Parameter Tiers
Within Systems Manager, there are two kinds of parameter tiers: standard and advanced. The main differences are around size limits and the availability of parameter policies.

The standard tier supports parameters up to 4 KB, while the advanced tier supports up to 8 KB. Parameter policies are not available for standard parameters but are available for advanced parameters.

The advanced parameters incur a cost of $0.05 per month, whereas the standard parameters are free.

Parameter Policies
Parameter policies are available only for advanced parameters. They allow you to assign a time to live (TTL) to a parameter, which means an expiration date. This forces users to update or delete sensitive data such as passwords.

You can assign multiple policies at a time. For example, an expiration policy can specify that a parameter must be deleted at a certain timestamp.

Through EventBridge integration, you receive notifications related to these policies. For instance, 15 days before a parameter expires, EventBridge will notify you, giving you enough time to update it and prevent deletion due to TTL.

You can also set up no-change notifications. For example, if a parameter has not been updated for 20 days, you will be notified. This allows for creative management of parameters using the Parameter Store.

Conclusion
This overview provides a clear understanding of the SSM Parameter Store's capabilities and features. It is a powerful tool for managing configuration and secrets securely and efficiently.

Key Takeaways
SSM Parameter Store provides secure, scalable, and durable storage for configuration and secrets.
It supports encryption using KMS and integrates with IAM for security and EventBridge for notifications.
Parameters can be organized hierarchically to simplify access control and management.
Advanced parameters offer features like parameter policies for expiration and change notifications.