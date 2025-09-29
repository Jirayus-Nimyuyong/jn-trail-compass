Directory Service

What is Microsoft Active Directory (AD)?

• Found on any Windows Server
with AD Domain Services
• Database of objects: User
Accounts, Computers, Printers,
File Shares, Security Groups
• Centralized security
management, create account,
assign permissions
• Objects are organized in trees
• A group of trees is a forest

AWS Directory Services

• AWS Managed Microsoft AD
• Create your own AD in AWS, manage users
locally, supports MFA
• Establish “trust” connections with your on-
premise AD

• AD Connector
• Directory Gateway (proxy) to redirect to on-
premise AD, supports MFA
• Users are managed on the on-premise AD

• Simple AD
• AD-compatible managed directory on AWS
• Cannot be joined with on-premise AD

---

AWS Directory Services
Introduction to Microsoft Active Directory and AWS Directory Services
Microsoft Active Directory (AD) is software found on any Windows Server with Active Directory Domain Services. It functions as a database of objects, which can include user accounts, computers, printers, file shares, and security groups. All users within your entire Microsoft ecosystem on-premise are managed by Microsoft Active Directory. This provides centralized security management, allowing you to create accounts, assign permissions, and organize all objects into a hierarchical tree structure. A group of such trees is called a forest.

Example of Active Directory Usage
Consider a domain controller where you create an account with the username "John" and the password "password". All other Windows machines within your network connect to this domain controller. When you use John's password on any machine, the machine checks with the domain controller to verify the login credentials. If the credentials are valid, you are allowed to log in. This setup ensures that users can access any machine within the network using their centralized credentials.

AWS Directory Services Overview
AWS Directory Services provides a way to create and manage Active Directory environments within AWS. There are three main flavors of AWS Directory Services, each with distinct features and use cases:

AWS Managed Microsoft AD
AD Connector
Simple AD
AWS Managed Microsoft AD
This service allows you to create your own Active Directory within AWS. You can manage users locally and it supports multifactor authentication (MFA). With this standalone Active Directory, you can establish a trust relationship with your on-premise AD. This means that your AWS AD and on-premise AD trust each other, allowing users to authenticate across both environments. For example, a user managed in on-premise AD can access AWS resources, and vice versa, through this trust relationship.

AD Connector
AD Connector acts as a direct gateway proxy that redirects authentication requests to your on-premise Active Directory. It supports MFA and all users are managed solely in the on-premise AD. Essentially, AD Connector does not store any user information but proxies authentication requests back to your existing directory. This is useful when you want to integrate AWS resources with your existing on-premise AD without replicating user accounts in AWS.

Simple AD
Simple AD is an Active Directory-compatible managed directory on AWS that does not use Microsoft Active Directory. It cannot be joined with an on-premise Active Directory. This option is suitable if you do not have an on-premise AD and need a standalone Active Directory for your AWS cloud environment. It allows you to create Windows instances that can join the domain and share logins and credentials within AWS.

Use Cases and Exam Tips
If you want to proxy users to your on-premise AD, you should use AD Connector.
If you want to manage users in the cloud with MFA support, use AWS Managed Microsoft AD.
If you do not have an on-premise AD and need a simple standalone directory, use Simple AD.
These distinctions are important for AWS certification exams and practical implementations.

AWS Directory Service Options in the Console
In the AWS Management Console, under Directory Service, you will find four options:

AWS Managed Microsoft AD: Integrated with AWS cloud and supports trust relationships with on-premise AD. Available in Standard Edition (up to 30,000 objects) and Enterprise Edition (up to 500,000 objects).
Simple AD: Standalone managed directory with Active Directory-compatible API, but no on-premise integration.
AD Connector: Proxy service redirecting directory requests to your existing on-premise Microsoft Active Directory. Available in two sizes: up to 500 users and up to 5,000 users.
Amazon Cognito User Pool: Redirects to the Cognito service and is not considered part of Directory Services.
Remember, AWS Managed Microsoft AD supports MFA, Simple AD is standalone, and AD Connector acts as a proxy.

Summary
AWS Directory Services offers flexible options to integrate or create Active Directory environments in the cloud. Understanding the differences between AWS Managed Microsoft AD, AD Connector, and Simple AD is essential for managing user authentication and directory services effectively in AWS.

Key Takeaways
Microsoft Active Directory (AD) is a centralized database for managing user accounts, computers, and security groups within a Windows ecosystem.
AWS Directory Services offers three main options: AWS Managed Microsoft AD, AD Connector, and Simple AD, each serving different integration and management needs.
AWS Managed Microsoft AD allows creating a standalone AD in AWS with support for trust relationships to on-premise AD and multifactor authentication (MFA).
AD Connector acts as a proxy to redirect authentication requests to an on-premise AD, while Simple AD is a standalone, AD-compatible directory without on-premise integration.

