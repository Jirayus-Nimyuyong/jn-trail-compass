CloudFormation – Conditions

• Conditions are used to control the creation of
resources or outputs based on a condition

• Conditions can be whatever you want them to
be, but common ones are:
• Environment (dev / test / prod)
• AWS Region
• Any parameter value

• Each condition can reference another condition,
parameter value or mapping

---
How to define a Condition
• The logical ID is for you to choose. It’s how you name condition
• The intrinsic function (logical) can be any of the following:
• Fn::And
• Fn::Equals
• Fn::If
• Fn::Not
• Fn::Or

---
How to use a Condition

• Conditions can be applied to resources / outputs / etc…

---
CloudFormation - Conditions
Introduction to Conditions
Conditions, as the name indicates, allow you to control the creation of a resource or outputs based on a specific condition.

For example, you could have some resources created only in a development environment, such as the Dev Stack, and others only in the production environment, such as the Prod Stack.

The difference between these environments could be that one has an EBS volume attached and the other does not. You can define conditions to be whatever you want them to be.

Commonly, conditions are based on the environment you are in, such as dev, test, and prod, or the region you are in, or a parameter value. Each condition can reference other conditions, parameter values, or mappings.

Example of a Condition Definition
Here is an example where we define a condition named CreateProdResources. This condition checks if the environment type parameter Env is equal to prod. If it is equal to prod, then this condition evaluates to true.

To create a condition, you can use functions such as And, Equals, If, Not, and Or. These functions help you build logical expressions for your conditions.

Using Conditions
You can apply a condition to a resource, an output, or other elements in your CloudFormation template. For example, a resource of type EC2 VolumeAttachment named MountPoint can have a condition CreateProdResources applied to it.

If the condition evaluates to true, the resource MountPoint will be created. If the condition is false, the resource will not be created.

Note: From an exam perspective, you do not need to know how to write conditions as it is considered advanced. However, you should be aware that conditions exist and can be used if needed.

This concludes the lecture on conditions. Thank you for your attention, and I will see you in the next lecture.

Key Takeaways
Conditions in CloudFormation allow control over resource or output creation based on specific criteria.
Common conditions include environment types like dev, test, and prod, region, or parameter values.
Conditions can reference each other, parameter values, or mappings.
Conditions are applied to resources or outputs to determine their creation based on the condition's truth value.
