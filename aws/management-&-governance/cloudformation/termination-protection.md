CloudFormation – Termination Protection
• To prevent accidental deletes of CloudFormation Stacks, use
TerminationProtection

---

CloudFormation - Termination Protection
Introduction to Termination Protection
To prevent accidental deletion of your CloudFormation stacks, you must use Termination Protection. This feature acts as a safeguard against unintended stack deletions.

Enabling Termination Protection via Console
Let's demonstrate how to enable Termination Protection in the AWS Management Console. First, create a new stack by uploading any template file. For example, name the stack EC2-demo.

After naming the stack, proceed by clicking Next twice to reach the stack creation page. Then, upload your template file to create the stack.

Activating Termination Protection
Once the stack is created, you can edit the Termination Protection setting. Initially, it is deactivated. Activate Termination Protection to enable the safeguard.

After activation, the change is successful. Now, if you attempt to delete the stack, the system will prevent it. A message will indicate that Termination Protection is enabled and must be disabled before deletion can proceed.

Disabling Termination Protection and Deleting the Stack
If you have the necessary permissions, you can deactivate Termination Protection. Once deactivated, you can delete the CloudFormation stack as usual.

Conclusion
Termination Protection is a valuable safety feature to prevent accidental deletes of CloudFormation stacks. Always ensure it is enabled when you want to protect critical stacks, and remember to disable it before deletion when necessary.

Key Takeaways
Termination Protection in CloudFormation prevents accidental deletion of stacks.
It can be enabled or disabled through the AWS Management Console.
When enabled, deletion attempts are blocked until Termination Protection is disabled.
Proper permissions are required to modify Termination Protection settings.
