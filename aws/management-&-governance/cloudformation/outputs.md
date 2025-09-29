CloudFormation – Outputs
• The Outputs section declares optional outputs values
that we can import into other stacks (if you export
them first)!
• You can also view the outputs in the AWS Console
or in using the AWS CLI
• They’re very useful for example if you define a
network CloudFormation, and output the variables
such as VPC ID and your Subnet IDs
• It’s the best way to perform some collaboration cross
stack, as you let expert handle their own part of the
stack
• Creating a SSH Security Group as part of one template
• We create an output that references that security group

---

CloudFormation – Outputs Cross-Stack
Reference
• We then create a second template that leverages that security group
• For this, we use the Fn::Impor tValue function
• You can’t delete the underlying stack until all the references are deleted

---

CloudFormation - Outputs & Exports
Introduction to Outputs in CloudFormation
The output section in CloudFormation is optional. It declares optional output values that can be imported into other stacks. This feature enables linking different stacks together.

For example, a network stack can export its VPC ID as an output value. Another application stack can then reference this exported VPC ID. This approach is very handy for reusing resources across stacks.

Outputs can be viewed in the AWS Management Console or by using the AWS Command Line Interface (CLI). Having outputs defined is especially helpful when you create a network CloudFormation stack and want to output VPC IDs and Subnet IDs for reuse elsewhere.

This method promotes collaboration across stacks, allowing experts to manage their own stacks while enabling integration through exported outputs.

Sample Output Example
Consider a template that creates an SSH security group. This template includes an output section referencing the security group. The output also contains an export block that exports the value with a unique name, such as SSHSecurityGroup.

The export name must be unique across all exports in a specific AWS region. This uniqueness ensures that the exported value can be reliably referenced by other stacks.

Through this exported output, you can access the security group ID for the SSH Security Group within your organization.

Reusing Exported Outputs
Another CloudFormation template can leverage the previously exported security group by using the ImportValue function. This function imports the value of the exported output into the new stack.

For example, when creating an EC2 instance, the security group can be assigned by importing the security group ID from the other stack. This linking of two different CloudFormation templates enables resource sharing.

Because the stacks are linked through exported and imported values, it is impossible to delete the first stack that exports a value while other stacks still reference it. This dependency ensures consistency and prevents accidental deletion of shared resources.

Conclusion
In summary, outputs in CloudFormation provide a powerful mechanism to share resource information across stacks, enabling modular and collaborative infrastructure management.

Key Takeaways
The output section in CloudFormation is optional but allows declaring output values that can be imported into other stacks.
Outputs enable linking stacks, such as referencing a VPC ID from a network stack in an application stack.
Exported output names must be unique within a region to avoid conflicts.
Linked stacks prevent deletion of an exported stack until all references to its outputs are removed.