CloudFormation – Custom Resources
• Used to
• define resources not yet supported by CloudFormation
• define custom provisioning logic for resources can that be outside of
CloudFormation (on-premises resources, 3rd party resources…)
• have custom scripts run during create / update / delete through Lambda
functions (running a Lambda function to empty an S3 bucket before being
deleted)
• Defined in the template using
AWS::CloudFormation::CustomResource or
Custom::MyCustomResourceTypeName (recommended)
• Backed by a Lambda function (most common) or an SNS topic

---

How to define a Custom Resource?
• ServiceToken specifies where CloudFormation sends requests to, such
as Lambda ARN or SNS ARN (required & must be in the same region)
• Input data parameters (optional)

---
Use Case – Delete content from an S3 bucket
• You can’t delete a non-empty
S3 bucket
• To delete a non-empty S3
bucket, you must first delete all
the objects inside it
• We can use a custom resource
to empty an S3 bucket before
it gets deleted by
CloudFormation

---

CloudFormation - Custom Resources
Introduction to CloudFormation Custom Resources
CloudFormation supports many resources natively. However, custom resources allow you to define resources that are not yet supported by CloudFormation or to implement custom provisioning logic for resources outside of CloudFormation's direct management.

These custom resources can represent your own on-premises resources, third-party resources, or enable running custom scripts during the create, update, and delete phases of your CloudFormation stack through Lambda functions.

One practical example is running a Lambda function to empty an S3 bucket before it is deleted. This is a common exam question and a typical use case for custom resources.

Defining a Custom Resource
To define a custom resource in your CloudFormation template, you specify the resource type as Custom::MyCustomResourceTypeName. This resource is backed either by a Lambda function or an SNS topic.

The most common backing is a Lambda function. For example, you define a custom resource of type Custom::MyLambdaResource. In the properties, you specify a ServiceToken, which is either the ARN of your Lambda function or your SNS topic. Both must be in the same AWS region.

This Lambda function contains the logic to provision your custom resource or perform any required actions. Additionally, you can provide input parameters to the Lambda function through the custom resource's properties.

Use Case: Emptying an S3 Bucket Before Deletion
CloudFormation cannot delete a non-empty S3 bucket directly. Therefore, you must first delete all objects within the bucket before deleting the bucket itself.

To achieve this, you use a custom resource backed by a Lambda function. When the custom resource is deleted, the Lambda function runs API calls to empty the S3 bucket. Only after the bucket is emptied does CloudFormation proceed to delete the bucket successfully.

This process ensures that when you run Delete Stack on CloudFormation, the custom resource triggers the Lambda function to empty the bucket before CloudFormation attempts to delete it.

Summary
Custom resources provide a powerful mechanism to extend CloudFormation's capabilities by allowing you to define resources and provisioning logic beyond the native support. Lambda-backed custom resources are the most common implementation, enabling custom actions during stack lifecycle events.

Key Takeaways
CloudFormation custom resources allow defining resources not natively supported by CloudFormation.
Custom resources are typically backed by Lambda functions or SNS topics within the same region.
Custom resources enable custom provisioning logic, such as running scripts during stack lifecycle events.
A common use case is using a Lambda-backed custom resource to empty an S3 bucket before deletion, which CloudFormation cannot do by default.