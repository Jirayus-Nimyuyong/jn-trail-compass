<!-- CloudFormation – Parameters

• Parameters are a way to provide inputs to your
AWS CloudFormation template
• They’re important to know about if:
• You want to reuse your templates across the company
• Some inputs can not be determined ahead of time
• Parameters are extremely powerful, controlled,
and can prevent errors from happening in your
templates, thanks to types

---

When should you use a Parameter?
• Ask yourself this:
• Is this CloudFormation resource configuration likely to change in the future?
• If so, make it a parameter
• You won’t have to re-upload a template to change its content 

---

CloudFormation – Parameters Settings
• Parameters can be controlled by all these settings:
• Type:
• String
• Number
• CommaDelimitedList
• List<Number>
• AWS-Specific Parameter (to help catch invalid values – match against existing values in the AWS account)
• List<AWS-Specific Parameter>
• SSM Parameter (get parameter value from SSM Parameter store)
• Description
• ConstraintDescription (String)
• Min/MaxLength
• Min/MaxValue
• Default
• AllowedValues (array)
• AllowedPattern (regex)
• NoEcho (Boolean)

---

How to Reference a Parameter?
• The Fn::Ref function can be leveraged to reference parameters
• Parameters can be used anywhere in a template
• The shorthand for this in YAML is !Ref
• The function can also reference other elements within the template

---

CloudFormation – Pseudo Parameters

• AWS offers us Pseudo Parameters in any CloudFormation template
• These can be used at any time and are enabled by default
• Important pseudo parameters:

---
CloudFormation - Parameters
Introduction to CloudFormation Parameters
CloudFormation parameters are a way for you to provide inputs into your CloudFormation templates. When you have a CloudFormation template, you want your user to provide parameter values. These parameters are defined as part of the CloudFormation templates. We have actually used them before when giving a security group a description. They are extremely important to know about if you want to reuse your templates across the company so that many people can provide many parameters. This is especially useful because the inputs cannot be determined ahead of time.

Parameters are extremely powerful and controlled. They can also prevent errors from happening in your templates thanks to the types, which we will examine shortly.

When to Use Parameters
Consider the SecurityGroupDescription parameter we used previously. The key question when defining whether something should or should not be a parameter is: Is this CloudFormation resource configuration likely to change in the future? If so, make it a parameter. This way, whenever you want to update that value, you will not have to re-upload the template to change its contents. Also, if the value cannot be determined ahead of time, it should be a parameter.

Parameter Settings and Types
Parameters have multiple settings. The first one is Type. It could be a String, a Number, a CommaDelimitedList, or a List of numbers. It could also be an AWS-specific parameter, for example, to help you catch invalid values or a list of those. Additionally, it could be an SSM Parameter.

Parameters can have a Description, a ConstraintDescription if you have a constraint, a Min and Max Length, a Min and Max Value, a Default value, a list of AllowedValues, a regex for an AllowedPattern, and NoEcho. There may be other settings not represented here.

You do not have to remember all of these, but it is important to remember that parameters are not just strings. You can have constraints and validation, allowing you to make sure they are safe to use.

Important Parameter Examples
Two important examples to know for the exam are AllowedValues and NoEcho.

AllowedValues
Consider a parameter called InstanceType of Type: String. We define AllowedValues as t2.micro, t2.small, or t2.medium, with a Default of t2.micro. This parameter is reused in the EC2Instance resource. Thanks to this, the user will have a dropdown and can only select one of these three values, giving them choice while maintaining control.

NoEcho
For example, if we want a parameter to input a database password, it is important to keep it secret. We set NoEcho: true so that the password is not displayed anywhere, such as in logs.

Using Parameters with the !Ref Function
To use these parameters, we use the !Ref function, which you may have seen before in CloudFormation templates. This function can reference parameters and can be used anywhere in the templates.

In YAML, there is a shorthand version called !Ref, which is easier to use and read. This function allows you to reference parameters, but also other elements within the template.

Example Template Usage
In the example template, one parameter is defined with the name SecurityGroupDescription, a description, and Type: String. It is a simple parameter without constraints.

This SecurityGroupDescription represents the description of a security group. Its usage is found under the second EC2 SecurityGroup resource, where under properties GroupDescription, there is a !Ref pointing to SecurityGroupDescription, which matches the parameter name above. This shows how the !Ref function references a parameter within the template.

The !Ref function is also used to reference resources. For example, under the SecurityGroups property of an EC2::Instance resource, there is a !Ref for SSHSecurityGroup. SSHSecurityGroup is the exact name of a resource defined in the template. Thus, !Ref is used the same way to reference resources and parameters. This is why you need to ensure that your resources do not have the same name as your parameters to avoid conflicts.

Pseudo Parameters
AWS offers pseudo parameters in any CloudFormation template. These are predefined values that exist even if you do not create them, and they can be used at any time as they are enabled by default.

Some important pseudo parameters include:

AWS::AccountId: Returns your actual AWS account ID.
AWS::Region: Returns the AWS region in which the stack is deployed.
AWS::StackId: Returns the stack ID.
AWS::StackName: Returns the stack name.
AWS::NotificationARNs: Returns notification ARNs.
AWS::NoValue: Returns no value.
These pseudo parameters are very handy. For example, you do not need the user to specify the region such as us-east-1; the template knows it automatically through pseudo parameters.

Conclusion
This concludes the lecture on CloudFormation parameters. Understanding parameters and pseudo parameters is essential for creating flexible, reusable, and secure CloudFormation templates.

Key Takeaways
CloudFormation parameters allow users to provide inputs to templates, enabling reuse and flexibility.
Parameters support various types and constraints, such as AllowedValues and NoEcho for sensitive data.
The !Ref function is used to reference parameters and resources within templates.
Pseudo parameters provide built-in values like AWS Account ID and region, simplifying template configuration. -->