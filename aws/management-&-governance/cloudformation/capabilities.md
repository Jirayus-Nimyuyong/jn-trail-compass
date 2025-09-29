CloudFormation Capabilities

• CAPABILITY_NAMED_IAM and CAPABILITY_IAM
• Necessary to enable when you CloudFormation template is creating or updating IAM
resources (IAM User, Role, Group, Policy, Access Keys, Instance Profile…)
• Specify CAPABILITY_NAMED_IAM if the resources are named
• CAPABILITY_AUTO_EXPAND
• Necessary when your CloudFormation template includes Macros or Nested Stacks
(stacks within stacks) to perform dynamic transformations
• You’re acknowledging that your template may change before deploying
• InsufficientCapabilitiesException
• Exception that will be thrown by CloudFormation if the capabilities haven’t been
acknowledged when deploying a template (security measure)

---

CloudFormation - Capabilities
CloudFormation Capabilities
In this lecture, we will discuss CloudFormation capabilities. These capabilities are necessary to explicitly acknowledge when your CloudFormation template will create or update IAM resources.

There are two main capabilities related to IAM resources:

CAPABILITY_NAMED_IAM
CAPABILITY_IAM
You need to provide these capabilities to CloudFormation whenever your template creates or updates IAM resources such as IAM users, roles, groups, policies, and so on.

Use CAPABILITY_NAMED_IAM if the IAM resources you create have custom names. Otherwise, use CAPABILITY_IAM.

This explicit acknowledgment is required because CloudFormation is creating IAM resources, which have security implications.

Another capability is CAPABILITY_AUTO_EXPAND. This is necessary when your CloudFormation template includes macros or nested stacks — that is, stacks within stacks — to perform dynamic transformations. By specifying this capability, you acknowledge that the template may change before deployment.

If you encounter an InsufficientCapabilitiesException while launching a template, it means the template requires certain capabilities that you have not acknowledged. As a security measure, you must re-upload and launch the template with the appropriate capabilities specified. This is done by adding an extra argument in your API call or by ticking a box in the AWS console.

Example: Creating an IAM Role with a Named Role
Consider a CloudFormation template named 3_capabilities.yaml that creates an IAM role with a custom name, MyCustomRoleName. This role uses the managed policy AmazonEC2FullAccess.

Since this template creates a named IAM role, you must specify the CAPABILITY_NAMED_IAM capability when creating the stack.

When creating the stack in the AWS console, after uploading the capabilities.yaml template and naming the stack DemoIAM, you will see an acknowledgment checkbox. This checkbox confirms that you understand CloudFormation might create IAM resources with custom names.

You must check this box to allow the stack creation to proceed. If you do not, the submission will fail.

By acknowledging this capability, you confirm that you understand the risks and implications of creating IAM resources through CloudFormation templates.

This concludes the lecture on CloudFormation capabilities. In the next lecture, we will continue exploring related topics.

Key Takeaways
CloudFormation requires explicit capabilities to create or update IAM resources.
Use CAPABILITY_NAMED_IAM when creating IAM resources with custom names.
Use CAPABILITY_IAM for unnamed IAM resources.
CAPABILITY_AUTO_EXPAND is needed for templates with macros or nested stacks.
Failure to acknowledge required capabilities results in InsufficientCapabilitiesException.
Acknowledging capabilities is a security measure to confirm awareness of IAM resource creation.