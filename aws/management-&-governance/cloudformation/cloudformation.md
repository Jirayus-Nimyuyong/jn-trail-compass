AWS CloudFormation

• CloudFormation is a declarative way of outlining your AWS
Infrastructure, for any resources (most of them are supported)
• For example, within a CloudFormation template, you say:
• I want a security group
• I want two EC2 instances using this security group
• I want two Elastic IPs for these EC2 instances
• I want an S3 bucket
• I want a load balancer (ELB) in front of these EC2 instances

• Then CloudFormation creates those for you, in the right order, with the
exact configuration that you specify

---
CloudFormation – Template Example

---

Benefits of AWS CloudFormation

• Infrastructure as code
• No resources are manually created, which is excellent for control
• The code can be version controlled for example using Git
• Changes to the infrastructure are reviewed through code

• Cost
• Each resources within the stack is tagged with an identifier so you can easily see how
much a stack costs you
• You can estimate the costs of your resources using the CloudFormation template
• Savings strategy: In Dev, you could automation deletion of templates at 5 PM and
recreated at 8 AM, safely

• Productivity
• Ability to destroy and re-create an infrastructure on the cloud on the fly
• Automated generation of Diagram for your templates!
• Declarative programming (no need to figure out ordering and orchestration)
• Separation of concern: create many stacks for many apps, and many layers. Ex:
• VPC stacks
• Network stacks
• App stacks
• Don’t re-invent the wheel
• Leverage existing templates on the web!
• Leverage the documentation
---

How CloudFormation Works
• Templates must be uploaded in S3 and then referenced in
CloudFormation
• To update a template, we can’t edit previous ones. We have to re-
upload a new version of the template to AWS
• Stacks are identified by a name
• Deleting a stack deletes every single artifact that was created by
CloudFormation.

---
Deploying CloudFormation Templates
• Manual way
• Editing templates in Infrastructure Composer or code editor
• Using the console to input parameters, etc…
• We’ll mostly do this way in the course for learning
purposes
• Automated way
• Editing templates in a YAML file
• Using the AWS CLI (Command Line Interface) to deploy
the templates, or using a Continuous Delivery (CD) tool
• Recommended way when you fully want to automate
your flow
---

CloudFormation – Building Blocks
• Template’s Components
• AWSTemplateFormatVersion – identifies the capabilities of the template “2010-09-09”
• Description – comments about the template
• Resources (MANDATORY) – your AWS resources declared in the template
• Parameters – the dynamic inputs for your template
• Mappings – the static variables for your template
• Outputs – references to what has been created
• Conditionals – list of conditions to perform resource creation
• Template’s Helpers
• References
• Functions

---
Introductory Example
• We’re going to create a simple EC2 instance
• And we’re going to add security group to it
• For now, forget about the code syntax
• We’ll look at the structure of the files later

• We’ll see how in no-time, we are able to get started
with CloudFormation!
---

CloudFormation - Overview
Introduction to AWS CloudFormation
AWS CloudFormation is one of my personal favorite services in AWS. It allows you to outline your AWS infrastructure and resources using just code.

For example, in a CloudFormation template, you specify that you want a security group, two EC2 instances using that security group, Elastic IPs for these EC2 instances, an S3 bucket, and a load balancer in front of the EC2 instances. By declaring these resources and their relationships, CloudFormation automatically creates them in the correct order with the exact configuration you specify.

This approach removes the need for manual configuration and manual work, as all resources are provisioned through CloudFormation.

CloudFormation Templates
A CloudFormation template is code that declaratively defines what you want your infrastructure to be composed of. You can visualize this infrastructure using Infrastructure Composer to see how components relate to each other within CloudFormation.

Why Use AWS CloudFormation?
Infrastructure as Code: No resources are created manually, which improves control.
Version Control: All CloudFormation template code can be version controlled using tools like Git.
Change Management: Infrastructure changes are reviewed through code changes.
Cost Management: All resources within a CloudFormation stack are tagged with an identifier, allowing easy cost tracking and estimation.
Saving Strategy: For example, in development environments, you can automate deletion of templates at 5:00 PM and recreate them at 8:00 AM safely because everything is automated.
Productivity: You can destroy and recreate infrastructure on the cloud on the fly, leveraging the cloud's pay-as-you-go model.
Automated Diagrams: CloudFormation automatically generates architecture diagrams for your templates.
Declarative Programming: You do not need to figure out the order of resource creation or orchestration; CloudFormation handles it.
Separation of Concerns: You can create multiple CloudFormation stacks for different applications or layers, such as separate stacks for networks and VPCs, and for applications.
Reuse: You can leverage existing templates and documentation available on the web to quickly write your own CloudFormation templates.
How Does CloudFormation Work?
Your templates must be uploaded to Amazon S3 and then referenced from CloudFormation. Once referenced, a stack will be created. A CloudFormation stack is composed of AWS resources, which can be any resources you can create on AWS.

If you want to update a template, you cannot edit the previous one directly. Instead, you re-upload a new version of the template to AWS and then update your stack.

Stacks are identified by a name within the region. If you delete a CloudFormation stack, every single artifact and resource created by CloudFormation will be deleted.

Deploying CloudFormation Templates
There are two main ways to deploy CloudFormation templates:

Manual Way: Using Infrastructure Composer or a code editor to create templates, then using the AWS console to input parameters and deploy. This method is mostly used for learning purposes.

Automated Way: Editing templates in YAML files and deploying them using the AWS CLI or continuous delivery tools. This method is recommended for fully automating your deployment flow.

Building Blocks of CloudFormation Templates
CloudFormation templates consist of several components:

AWSTemplateFormatVersion: Defines the version of how to read the templates; used internally by AWS.
Description: Comments about the template.
Resources: The only mandatory section, defining all AWS resources declared in the template.
Parameters: Dynamic inputs for your templates.
Mappings: Static variables for your templates.
Outputs: References to what has been created in your templates.
Conditionals: A list of conditions to control resource creation.
Template Helpers: Such as references and functions.
We will explore all these components and provide code examples in this section.

Conclusion
This concludes the introduction to AWS CloudFormation. I hope you found it helpful, and I look forward to seeing you in the next lecture.

Key Takeaways
AWS CloudFormation allows you to define and provision AWS infrastructure using code.
CloudFormation templates are declarative and automate resource creation and orchestration.
Infrastructure as code enables version control, cost tracking, and automation.
CloudFormation templates consist of components like resources, parameters, mappings, outputs, and conditionals.