AWS Identity & Access
Management (AWS IAM)

IAM: Users & Groups

IAM = Identity and Access Management, Global service
• Root account created by default, shouldn’t be used or shared
• Users are people within your organization, and can be grouped
• Groups only contain users, not other groups
• Users don’t have to belong to a group, and user can belong to multiple groups

IAM: Permissions
Users or Groups can be
assigned JSON documents
called policies
• These policies define the
permissions of the users
• In AWS you apply the least
privilege principle: don’t give
more permissions than a user
needs
---

Introduction to IAM
IAM stands for Identity and Access Management. It is a global service because in IAM, we create users and assign them to groups.

We have already used IAM without knowing it when we created an AWS account. At that time, a root account was created by default. This root user is the primary user of our account.

The root user should only be used to set up your account, as we will do now. After setup, you should not use or share the root account anymore.

Instead, you should create individual users in IAM. Each user represents one person within your organization.

Users can be grouped together if it makes sense. For example, consider an organization with six people: Alice, Bob, Charles, David, Edward, and Fred.

Alice, Bob, and Charles work together as developers. We can create a group called "developers" that includes Alice, Bob, and Charles.

Similarly, David and Edward work together in operations. We can create an "operations" group for them.

Now we have two groups within IAM: developers and operations. It is important to note that groups can only contain users, not other groups.

Some users do not have to belong to a group. For example, Fred is alone and does not correspond to any group. Although this is not best practice, AWS allows it.

Also, a user can belong to multiple groups. For instance, if Charles and David work together as part of an audit team, you can create a third group with Charles and David.

In this example, Charles and David are part of two different groups. This flexibility allows various configurations in IAM.

Purpose of Users and Groups
Why do we create users and groups? Because we want to allow them to use our AWS accounts. To do so, we must give them permissions.

Users or groups can be assigned a JSON document called a policy. This is known as an IAM policy.

An IAM policy looks like a JSON document. You do not have to be a programmer to understand it. It describes in plain English what a user or group is allowed to do.

For example, a policy might allow users to use the EC2 service and perform describe actions on it, use the Elastic Load Balancing service and describe it, and use CloudWatch.

We will see what EC2, Elastic Load Balancing, and CloudWatch mean later. Through this JSON document, we allow our users to use specific AWS services.

These policies help us define the permissions of our users. In AWS, you do not allow everyone to do everything, as that would be catastrophic.

A new user could launch many services, which could cost a lot of money or cause security issues.

AWS applies the principle of least privilege. This means you do not give more permissions than a user needs.

If a user only needs access to three services, create permissions only for those services.

Now that we have seen an overview of IAM, let's proceed to the next lecture to practice creating users and groups.

Key Takeaways
IAM stands for Identity and Access Management, a global AWS service for managing users and groups.
The root user is created by default and should only be used for initial account setup, not for daily use.
Users represent individual people and can be grouped logically; groups contain only users, not other groups.
Permissions are assigned via IAM policies in JSON format, following the principle of least privilege to enhance security and control costs.