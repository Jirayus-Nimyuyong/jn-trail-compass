CloudFormation – Stack Policies

• During a CloudFormation Stack update, all
update actions are allowed on all resources
(default)
• A Stack Policy is a JSON document that
defines the update actions that are allowed
on specific resources during Stack updates
• Protect resources from unintentional updates
• When you set a Stack Policy, all resources in
the Stack are protected by default
• Specify an explicit ALLOW for the resources
you want to be allowed to be updated

---

CloudFormation - Stack Policy
Introduction to CloudFormation Stack Policies
In this lecture, we will discuss CloudFormation Stack policies. When you perform a CloudFormation Stack update, by default, any action is allowed on all resources. This means you can change your stack as you wish.

Purpose of Stack Policies
Sometimes, you may want to protect your stack or part of your stack against updates. This is where Stack policies come into play. Stack policies are JSON documents that define what update actions are allowed on specific resources during stack updates.

Example Stack Policy
Consider the following example:

The first statement allows updates on everything, meaning all resources in your CloudFormation Stack can be updated.
The second statement denies updates on the resource named "Production Database".
This means that the resource named "Production Database" in your CloudFormation Stack is protected against any kind of updates, ensuring your production database remains safe.

Goal of Stack Policies
The primary goal of Stack policies is to protect resources against unintentional updates. When you set a Stack policy, by default, all resources are protected. Therefore, you need to explicitly allow updates for the resources that you want to be updated.

Summary
That concludes the lecture on CloudFormation Stack policies. You should now have enough understanding to answer related questions on the exam.

Key Takeaways
CloudFormation Stack policies are JSON documents that define allowed update actions on specific resources during stack updates.
By default, all resources in a CloudFormation Stack can be updated unless restricted by a stack policy.
Stack policies protect resources, such as a production database, from unintentional updates by denying update actions.
When a stack policy is set, all resources are protected by default, requiring explicit "allow" statements for resources that can be updated.