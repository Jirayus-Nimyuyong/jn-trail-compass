Principal Options in IAM Policies

• AWS Account and Root User

• IAM Roles

• IAM Role Sessions

• IAM Users

• Federated User Sessions

• AWS Services

• All Principals

---

KMS Key Policies & IAM Principals
Introduction to KMS Key Policies
In this lecture, we will discuss KMS Key Policies and provide several examples. A Key Policy is used to define who has access to your KMS Key.

The default KMS Key Policy created through the AWS Console allows anyone within your account to access your KMS Key, provided they have the proper IAM permissions. This is a special case.

Explicit Authorization of Specific Users
If you want to explicitly authorize a specific user, it could be any user, such as an IAM user, an IAM role, or a federated user. For example, as shown in the example on the right-hand side, you can specify which KMS actions you want to allow, such as encrypt, decrypt, and others.

You explicitly outline the principal in the policy. In the example, the federated user does not need an additional IAM policy to use your KMS key because it has been explicitly allowed in the KMS Key Policy.

Types of Principals Allowed in KMS Key Policies and IAM
What kinds of principals can we explicitly allow in KMS Key Policies or in any IAM policy? The following are common principal types:

Account and Root User: You can define a principal using the AWS account number and the root user. For example, specifying the principal as AWS and the account number with root allows every principal within that account. IAM policies then apply accordingly.
Specific IAM Role: You can authorize a specific IAM role by specifying the role's ARN directly in the principal statement.
IAM Role Sessions: This applies when you have an assumed role or an assumed identity through federation, such as Cognito Identity or SAML.
IAM Users: You can specify a particular IAM user within your account or other accounts.
Federated User Sessions: When you have user federation in AWS, you can specify a particular federated user.
AWS Services: You can specify a service principal to allow specific AWS services to use your KMS key.
Allowing All Principals
If you want to allow all principals and all actions, you can use a wildcard "" or "AWS:" as the principal.

This concludes the lecture on KMS Key Policies. I hope you found it helpful, and I will see you in the next lecture.

Key Takeaways
KMS Key Policies define who has access to your KMS Key.
The default KMS Key Policy allows anyone within your AWS account with proper IAM permissions to access the key.
You can explicitly authorize specific principals such as IAM users, roles, federated users, or services in the KMS Key Policy.
Principals can include account root users, IAM roles, federated user sessions, and AWS services.
