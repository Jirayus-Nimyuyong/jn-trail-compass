<!-- Advanced IAM
Introduction to Advanced IAM Concepts
This lecture focuses on advanced Identity and Access Management (IAM) concepts essential for exam preparation. We will explore several key topics that are often assumed but benefit greatly from clear diagrams and explanations.

Authorization Model and Policy Evaluation
The authorization model in IAM evaluates policies in a simplified manner, though the actual process is more complex. The evaluation follows these rules:

If there is an explicit deny in any policy, the final decision is deny.
If there is an explicit allow and no deny, the final decision is allow.
Otherwise, the default decision is deny.
For example, if a user attempts to create a DynamoDB table, the decision process begins with a default deny. All policies attached to the user are evaluated:

If any policy explicitly denies the action, such as "Users cannot create DynamoDB tables," the final decision is deny.
If no explicit deny is found, the evaluation checks for an explicit allow.
If an allow exists, the final decision is allow; otherwise, it remains deny.
Notably, if both explicit deny and allow exist, the explicit deny takes precedence.

Interaction Between IAM Policies and S3 Bucket Policies
IAM policies are attached to users, roles, and groups, whereas S3 bucket policies are attached directly to buckets. Both define permissions for actions on the bucket.

When evaluating permissions for an IAM principal performing an action on an S3 bucket, the effective permissions are the union of the IAM policy and the S3 bucket policy. This combined evaluation determines the total security posture.

This means that if an EC2 instance's IAM policy does not grant S3 permissions, but the S3 bucket policy authorizes the EC2 instance, the instance can still perform actions on the bucket. Understanding this union is critical for managing access correctly.

Examples of IAM and S3 Bucket Policy Combinations
IAM Role with Read/Write Permissions, No S3 Bucket Policy:

The EC2 instance can read and write to the bucket because the IAM role grants these permissions.
IAM Role with Read/Write Permissions, S3 Bucket Policy with Explicit Deny:

The EC2 instance is denied access due to the explicit deny in the bucket policy, which overrides the IAM allow.
IAM Role Without S3 Permissions, S3 Bucket Policy with Read/Write Allow:

The EC2 instance can read and write to the bucket because the bucket policy grants access.
IAM Role with Explicit Deny, S3 Bucket Policy Allows Access:

The EC2 instance is denied access due to the explicit deny in the IAM role.
Dynamic Policies in IAM
Dynamic policies allow scalable permission management by using policy variables. For example, to assign each user access to their own folder in an S3 bucket (e.g., /home/{username}), you can use the {aws:username} variable in a single policy attached to all users.

This approach eliminates the need to create individual policies per user, as the variable is replaced at runtime with the actual AWS username, enabling customized access control dynamically.

Types of IAM Policies
AWS provides three types of policies:

AWS Managed Policies: Maintained by AWS, these policies are updated automatically to include new services and APIs. They are suitable for common roles like administrators or power users.

Customer Managed Policies: Created and managed by you, these policies offer granular control, reusability across principals, version control, and auditability. AWS recommends these as best practice.

Inline Policies: Embedded directly within a single principal (user, group, or role), these policies have a strict one-to-one relationship, lack version control, and are deleted if the principal is deleted. They have size limitations and are less manageable.

IAM Console Demonstration
In the AWS IAM console, you can view all policies:

Filtering by AWS managed policies shows predefined policies like AlexaForBusinessFullAccess or DynamoDBFullAccess.
Customer managed policies created during the course are also visible and include policies for services like CodeBuild, CodePipeline, and Lambda.
Inline policies are not listed here; instead, they are found within individual users or roles. For example, you can add an inline policy to a user directly through the console, but these policies have a maximum size limit of two kilobytes, which can restrict complex permissions.

Summary
This lecture covered advanced IAM concepts including policy evaluation order, the union of IAM and S3 bucket policies, dynamic policy variables for scalable access control, and the distinctions among AWS managed, customer managed, and inline policies. Understanding these concepts is crucial for effective and secure AWS access management.

Key Takeaways
IAM policy evaluation prioritizes explicit deny over allow, defaulting to deny if no allow is found.
IAM policies and S3 bucket policies combine in union to determine effective permissions.
Dynamic policies using variables like {aws:username} enable scalable, per-user access control.
AWS offers three policy types: AWS managed, customer managed, and inline, each with distinct management and usage characteristics.

---

IAM Best Practices – General
• Never use Root Credentials, enable MFA for Root Account
• Grant Least Privilege
• Each Group / User / Role should only have the minimum level of permission it
needs
• Never grant a policy with “*” access to a service
• Monitor API calls made by a user in CloudTrail (especially Denied ones)
• Never ever ever store IAM key credentials on any machine but a
personal computer or on-premise server
• On premise server best practice is to call STS to obtain temporary
security credentials

---

IAM Best Practices – IAM Roles
• EC2 machines should have their own roles
• Lambda functions should have their own roles
• ECS Tasks should have their own roles
(ECS_ENABLE_TASK_IAM_ROLE=true)
• CodeBuild should have its own service role
• Create a least-privileged role for any service that requires it
• Create a role per application / lambda function (do not reuse roles)

---

IAM Best Practices – Cross Account Access

• Define an IAM Role for another
account to access
• Define which accounts can access
this IAM Role
• Use AWS STS (Security Token
Service) to retrieve credentials and
impersonate the IAM Role you
have access to (AssumeRole API)
• Temporary credentials can be valid
between 15 minutes to 1 hour

---
Advanced IAM - Authorization Model
Evaluation of Policies, simplified
1. If there’s an explicit DENY, end decision and DENY
2. If there’s an ALLOW, end decision with ALLOW
3. Else DENY

---

IAM Policies & S3 Bucket Policies
• IAM Policies are attached to users, roles, groups
• S3 Bucket Policies are attached to buckets
• When evaluating if an IAM Principal can perform an operation X on a
bucket, the union of its assigned IAM Policies and S3 Bucket Policies will
be evaluated.

---

Example 1

• IAM Role attached to EC2 instance, authorizes RW to “my_bucket”
• No S3 Bucket Policy attached
• => EC2 instance can read and write to “my_bucket”

---

Example 2

• IAM Role attached to EC2 instance, authorizes RW to “my_bucket”
• S3 Bucket Policy attached, explicit deny to the IAM Role
• => EC2 instance cannot read and write to “my_bucket”

---

Example 3

• IAM Role attached to EC2 instance, no S3 bucket permissions
• S3 Bucket Policy attached, explicit RW allow to the IAM Role
• => EC2 instance can read and write to “my_bucket”

---

Example 4

• IAM Role attached to EC2 instance, explicit deny S3 bucket permissions
• S3 Bucket Policy attached, explicit RW allow to the IAM Role
• => EC2 instance cannot read and write to “my_bucket”

---

Dynamic Policies with IAM
• How do you assign each user a /home/<user> folder in an S3 bucket?
• Option 1:
• Create an IAM policy allowing georges to have access to /home/georges
• Create an IAM policy allowing sarah to have access to /home/sarah
• Create an IAM policy allowing matt to have access to /home/matt
• … One policy per user!
• This doesn’t scale
• Option 2:
• Create one dynamic policy with IAM
• Leverage the special policy variable ${aws:username}

---

Inline vs Managed Policies

• AWS Managed Policy
• Maintained by AWS
• Good for power users and administrators
• Updated in case of new services / new APIs
• Customer Managed Policy
• Best Practice, re-usable, can be applied to many principals
• Version Controlled + rollback, central change management
• Inline
• Strict one-to-one relationship between policy and principal
• Policy is deleted if you delete the IAM principal

---
 -->
