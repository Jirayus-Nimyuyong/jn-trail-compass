CloudFormation – Service Role
• IAM role that allows CloudFormation to
create/update/delete stack resources on your
behalf
• Give ability to users to create/update/delete the
stack resources even if they don’t have
permissions to work with the resources in the
stack
• Use cases:
• You want to achieve the least privilege principle
• But you don’t want to give the user all the required
permissions to create the stack resources
• User must have iam:PassRole permissions
---
CloudFormation - Service Role
Introduction to CloudFormation Service Roles
CloudFormation can use service roles. These are IAM roles that you create and dedicate to CloudFormation. They allow CloudFormation to create, update, and delete stack resources on your behalf.

If you want to give users the ability to create, update, and delete stack resources but they do not have permissions to directly work with those resources, you can use a service role. For example, you define a CloudFormation template, and your IAM user permissions allow you to perform actions on CloudFormation, including the iam:PassRole permission. You also create a service role dedicated to CloudFormation, which has permissions such as full access to S3 buckets to create, update, and delete them. CloudFormation will then be able to create the S3 bucket using its service role because the user was able to pass that role to CloudFormation.

Use Cases for Security
This approach supports the principle of least privilege. You do not give users all permissions to create stack resources directly; instead, you only grant them permission to invoke a service role on CloudFormation. For this to work, the user must have the iam:PassRole permission, which is necessary to delegate a role to a specific AWS service.

Creating an IAM Role for CloudFormation
To create a service role for CloudFormation, go to the IAM console and navigate to the Roles section. Create a new role for an AWS service, selecting CloudFormation as the service. For permission policies, assign the necessary permissions, such as full access to Amazon S3, to allow CloudFormation to manage S3 resources. Name the role appropriately, for example, DemoRole for CFN with S3 capabilities. This role allows CloudFormation to perform any action on Amazon S3.

Using the Service Role in CloudFormation Stack Creation
When creating a CloudFormation stack, you can specify the IAM role to use under the permissions section. This is optional. If you do not specify a role, CloudFormation uses your personal permissions. However, if you specify a service role, such as DemoRole for CFN with S3 capabilities, CloudFormation will use that role for all stack operations instead of your personal permissions.

Note that if the service role does not have permissions for all resources in your stack, such as EC2 instances, the stack creation will fail. Therefore, the permissions defined in the service role determine what CloudFormation can do during stack operations.

Summary
Service roles in CloudFormation provide a secure way to delegate permissions for stack operations, allowing users to manage stacks without needing direct permissions on all underlying resources. The key requirement is that users must have the iam:PassRole permission to delegate the service role to CloudFormation.

Key Takeaways
CloudFormation service roles are IAM roles dedicated to CloudFormation to manage stack resources on behalf of users.
Users can create, update, and delete stack resources without having direct permissions on the resources by using service roles.
The user must have the iam:PassRole permission to delegate a service role to CloudFormation.
Specifying a service role in CloudFormation stack operations overrides the user's personal permissions for those operations.