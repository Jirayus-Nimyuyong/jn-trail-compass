CloudFormation – Resources

• Resources are the core of your CloudFormation template (MANDATORY)
• They represent the different AWS Components that will be created and
configured
• Resources are declared and can reference each other
• AWS figures out creation, updates and deletes of resources for us
• There are over 700 types of resources (!)
• Resource types identifiers are of the form:
service-provider::service-name::data-type-name

---

How do I find Resources documentation?
• I can’t teach you all the 700+ resources, but I can teach you how to
learn how to use them
• All the resources can be found here:
https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/a
ws-template-resource-type-ref.html
• Then, we just read the docs J
• Example here (for an EC2 instance):
https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/a
ws-resource-ec2-instance.html

---

Analysis of CloudFormation Template
• Going back to the example of the introductory lecture, let’s learn why it
was written this way.
• Relevant documentation can be found here:
• https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-
resource-ec2-instance.html
• https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-
resource-ec2-securitygroup.html
• http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-
resource-ec2-eip.html

---

CloudFormation – Resources FAQ

• Can I create a dynamic number of resources?
ØYes, you can by using CloudFormation Macros and Transform
ØIt is not in the scope of this course
• Is every AWS Service supported?
ØAlmost. Only a select few niches are not there yet
ØYou can work around that using CloudFormation Custom Resources

---
CloudFormation - Resources
Introduction to CloudFormation Resources
Resources are the core of your CloudFormation templates and constitute the only mandatory section in the entire template. These resources represent the different AWS components that will be created and configured as part of your templates. They are declared within the template and can reference each other. AWS manages the creation, updates, and deletion of these resources automatically.

There are numerous types of resources, and their number is continuously increasing. Currently, there are over 700 resource types available. While it is not feasible to cover all of them, it is essential to learn how to read and understand the documentation to effectively use them.

Resource type identifiers follow the format:

service-provider::service-name::data-type-name

Accessing Resource Documentation
To find the documentation for CloudFormation resources, there is a dedicated page listing all available resource types. By consulting this page and the knowledge acquired in this course, you can effectively work with any resource.

For example, the documentation page lists all resource types, and you can select a specific service such as Amazon Kinesis, which has two resource types. Similarly, Amazon EC2 has many resource types listed.

Example: AWS::EC2::Instance
The documentation for the AWS::EC2::Instance resource type provides the syntax in both JSON and YAML formats. YAML is generally easier to read. The resource type is EC2::Instance, and it includes a list of properties represented as key-value pairs.

Each property is documented with details on its usage. For example, the IamInstanceProfile property specifies the name of an IAM instance profile. The documentation explains how to create an instance profile and indicates whether the property is required or optional. In this case, it is not mandatory to specify this property when creating an EC2 instance.

The documentation also specifies the data type for each property, such as String for IamInstanceProfile. It indicates whether updating the property requires interruption of the resource. For instance, adding or modifying IamInstanceProfile does not interrupt the EC2 instance, whereas changing the ImageId (AMI ID) requires replacement of the instance.

The documentation provides comprehensive details on all properties, return values, and examples in both YAML and JSON formats. This resource is invaluable for understanding how to configure resources properly.

Working with EC2 Instances in Templates
In your CloudFormation stack, you might define an EC2 instance with properties such as AvailabilityZone, ImageId, and InstanceType. Additionally, you can specify security groups as a list under the SecurityGroups property.

Consulting the documentation for SecurityGroups reveals that it is an array of strings representing the names of the security groups. This helps in understanding how to properly specify this property in your template.

References within the template can be used to link resources and properties effectively. The documentation assists in understanding these references and how to use them.

Elastic IP Resource Example
Elastic IPs have their own documentation page. To find it, you can search for "elastic IP cloudformation" which will direct you to the correct documentation page. This page explains how to declare an Elastic IP resource and provides examples.

The examples include how to create an Elastic IP and associate it with security groups such as SSHSecurityGroup. Again, consulting the documentation is essential to understand how these components work together.

Power and Flexibility of Resources
Resources provide powerful capabilities in CloudFormation. Knowing how to create resources and find the appropriate documentation enables you to fill in the necessary properties correctly. There are numerous properties available for many resources, often mirroring what can be specified in the AWS Management Console.

Frequently Asked Questions about Resources
Can I create a dynamic number of resources?

Yes, but this requires using CloudFormation Macros and Transforms, which are beyond the scope of this course. In this course, the template defines exactly what is created, and dynamic resource creation is not supported.

Is every AWS Service supported?

Almost all services are supported. A few exceptions exist, and the recommended workaround is to use CloudFormation Custom Resources. This approach will be discussed later in the course.

Conclusion
This concludes the discussion on resources. Understanding resources and their documentation is fundamental to working effectively with CloudFormation templates.

Key Takeaways
Resources are the core and only mandatory section in CloudFormation templates, representing AWS components to be created and configured.
Resource type identifiers follow the format: service-provider::service-name::data-type-name.
AWS provides extensive documentation for over 700 resource types, accessible online, detailing syntax, properties, and examples.
Dynamic resource creation requires CloudFormation Macros and Transforms, which are beyond the scope of this course; unsupported services can be handled via Custom Resources.
