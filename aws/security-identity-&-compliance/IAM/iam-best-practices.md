IAM Best Practices

• Don’t use the root account except for AWS account setup
• One physical user = One AWS user
• Assign users to groups and assign permissions to groups
• Create a strong password policy
• Use and enforce the use of Multi Factor Authentication (MFA)
• Create and use Roles for giving permissions to AWS services
• Use Access Keys for Programmatic Access (CLI / SDK)
• Audit permissions of your account using IAM Credentials Report & IAM
Access Advisor
• Never share IAM users & Access Keys

IAM Best Practices Overview
Here are some general guidelines on IAM and best practices because I do not want you to make mistakes when using AWS.

Do not use the root account except when you set up your AWS account. By now, you should have two accounts: a root account and your own personal accounts.

Remember, one AWS user corresponds to one physical user. If a friend of yours wants to use AWS, do not give them your credentials. Instead, create another user for them.

You can assign users to groups and assign permissions to groups to ensure that security is managed at the group level. Additionally, you should create a strong password policy.

Also, if possible, use and enforce the use of multi-factor authentication (MFA) to guarantee that your account is safer from hackers.

You should create and use roles whenever you are giving permissions to AWS services, including EC2 instances, which are virtual servers.

If you use AWS programmatically or via the CLI or SDK, you must generate access keys. These access keys are like passwords and are very secret, so keep them for yourself.

To edit the permissions of your account, you can use the IAM credentials reports or the IAM Access Advisor feature.

Finally, never, ever share your IAM users and access keys. This is very important.

We are nearing the end of this section. You now know everything about IAM. I will see you in the next lecture.

Key Takeaways
Avoid using the root account except during initial AWS account setup.
Create individual AWS users for each physical user instead of sharing credentials.
Manage security by assigning users to groups and applying permissions at the group level.
Enforce strong password policies and use multi-factor authentication (MFA) to enhance account security.
Use roles when granting permissions to AWS services, including EC2 instances.
Keep access keys secret and never share IAM users or access keys with others.