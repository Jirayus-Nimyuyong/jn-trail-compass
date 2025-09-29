IAM Policies

IAM Policies inheritance

IAM Introduction: Users, Groups, Policies
Welcome to the first deep dive on an AWS service. The first one is called IAM.

IAM Policies Structure
Consists of
• Version: policy language version, always include “2012-10-
17”
• Id: an identifier for the policy (optional)
• Statement: one or more individual statements (required)
• Statements consists of
• Sid: an identifier for the statement (optional)
• Effect: whether the statement allows or denies access
(Allow, Deny)
• Principal: account/user/role to which this policy applied to
• Action: list of actions this policy allows or denies
• Resource: list of resources to which the actions applied to
• Condition: conditions for when this policy is in effect
(optional)

--- 

Introduction to IAM Policies
Let's discuss IAM policies in depth. Imagine we have a group of developers: Alice, Bob, and Charles. When a policy is attached at the group level, it applies to every member of the group. Therefore, Alice, Bob, and Charles will all inherit this policy.

Now, if there is a second group for operations with a different policy, members like David and Edward will have a different policy than the developers' group. Additionally, a user such as Fred might not belong to any group. For such users, we can create an inline policy that is attached only to that user. This means a user can have inline policies regardless of group membership.

Furthermore, if Charles and David both belong to an audit team, and a policy is attached to the audit team, they will inherit that policy as well. In this case, Charles has policies from both the developers group and the audit team, while David has policies from the audit team and the operations team. This layered policy inheritance will become clearer during hands-on practice.

IAM Policy Structure
At a high level, it is important to understand the structure and naming conventions of IAM policies, as you will encounter them frequently in AWS. IAM policies are JSON documents consisting of several key elements.

An IAM policy includes:

Version: The policy language version, usually "2012-10-17".
Id: An optional identifier for the policy.
Statement: One or more statements defining permissions.
Each statement contains important parts:

Sid: Statement ID, an optional identifier for the statement.
Effect: Specifies whether the statement allows or denies access to certain APIs. Common values are "Allow" or "Deny".
Principal: Defines the accounts, users, or roles to which the policy applies. For example, it can specify the root account of your AWS account.
Action: A list of API calls that are allowed or denied based on the effect.
Resource: Specifies the resources to which the actions apply, such as an S3 bucket.
Condition: Optional conditions that specify when the statement applies.
For example, a statement might allow certain actions on a specific bucket resource for the root account. Conditions can further restrict when the statement applies, but they are optional and not shown in this example.

Exam Preparation Tips
For the exam, it is crucial to understand the key elements of IAM policies: the effect, principal, action, and resource. Throughout the course, you will encounter these concepts repeatedly, so you should feel confident with them by the end.

This concludes the lecture on IAM policies. I hope you found it helpful, and I look forward to seeing you in the next lecture.

Key Takeaways
IAM policies can be attached at different levels: groups, users (inline policies), and multiple groups.
Users inherit policies from all groups they belong to, combining permissions.
IAM policy structure includes version, ID, statements with effect, principal, action, resource, and optional conditions.
Understanding the effect, principal, action, and resource elements is essential for AWS IAM policy management and exams.