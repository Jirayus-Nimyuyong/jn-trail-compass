CloudFormation – StackSets
Create, update, or delete stacks across
multiple accounts and regions with a
single operation/template
• Target accounts to create, update, delete
stack instances from StackSets
• When you update a stack
set, all associated stack instances are
updated throughout all accounts and
regions
• Can be applied into all accounts of an
AWS Organization
• Only Administrator account (or Delegated
Administrator) can create StackSets

---
CloudFormation - StackSets
Introduction to CloudFormation StackSets
CloudFormation StackSets allow you to create, update, or delete stacks across multiple accounts and regions, all within a single operation or template.

From an administrative account, you take a template and create a StackSet out of it. This StackSet enables you to deploy your stack across multiple accounts in multiple regions, which is why it is called a StackSet.

When you update a StackSet, all the stack instances in all the target accounts and regions are updated simultaneously, allowing for an all-at-once operation.

You can apply StackSets to accounts you choose, but one of the most common use cases is applying them to all accounts within an AWS Organization, which is a group of accounts managed in AWS.

Within an AWS Organization, only an administrator account or someone designated as an administrator can create StackSets. This restriction is essential to prevent chaos and security risks.

That concludes the high-level overview of the StackSet concept.

I hope you found this explanation helpful, and I look forward to seeing you in the next lecture.

Key Takeaways
CloudFormation StackSets enable creating, updating, or deleting stacks across multiple AWS accounts and regions in a single operation.
StackSets are created from a template in an administrative account and deployed across multiple accounts and regions.
Updating a StackSet simultaneously updates all stack instances in the target accounts and regions.
StackSets can be applied to selected accounts or all accounts within an AWS Organization, with creation restricted to administrator accounts to maintain security.