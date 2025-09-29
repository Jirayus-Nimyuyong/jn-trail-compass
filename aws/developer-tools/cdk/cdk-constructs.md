CDK Constructs

• CDK Construct is a component that encapsulates everything CDK
needs to create the final CloudFormation stack
• Can represent a single AWS resource (e.g., S3 bucket) or multiple
related resources (e.g., worker queue with compute)
• AWS Construct Library
• A collection of Constructs included in AWS CDK which contains Constructs for
every AWS resource
• Contains 3 different levels of Constructs available (L1, L2, L3)
• Construct Hub – contains additional Constructs from AWS, 3rd parties,
and open-source CDK community

---

CDK Constructs – Layer 1 Constructs (L1)
• Can be called CFN Resources which represents all resources directly
available in CloudFormation
• Constructs are periodically generated from CloudFormation Resource
Specification
• Construct names start with Cfn (e.g., CfnBucket)
• You must explicitly configure all resource proper ties

---

CDK Constructs – Layer 2 Constructs (L2)
• Represents AWS resources but with a higher level (intent-based API)
• Similar functionality as L1 but with convenient defaults and boilerplate
• You don’t need to know all the details about the resource properties
• Provide methods that make it simpler to work with the resource
(e.g., bucket.addLifeCycleRule())

---

CDK Constructs – Layer 3 Constructs (L3)
• Can be called Patterns, which represents multiple related resources
• Helps you complete common tasks in AWS
• Examples:
• aws-apigateway.LambdaRestApi represents an API Gateway backed by a Lambda
function
• aws-ecs-patterns.ApplicationLoadBalancerFargateService which represents a

---

CDK Constructs Overview
Introduction to Constructs in CDK
Constructs in CDK are very important. They are components that encapsulate everything CDK needs to create the final CloudFormation stack. A Construct can be a single AWS resource, such as an S3 bucket, or it can be a combination of multiple related resources. For example, an SQS worker queue with some compute resources.

Obtaining Constructs
How do we get these Constructs? There is a Construct Library, which is a collection of Constructs included in the CDK. It contains Constructs for every AWS resource. There are three levels of Constructs: Level 1, Level 2, and Level 3. We will explore them in the next sections.

Additionally, there is the Construct Hub, which includes Constructs from AWS, third parties, and the open-source CDK community. This hub allows you to create your CDK stacks faster and better.

Level 1 Constructs: CFN Resources
Level 1 Constructs are called CFN Resources because they represent all the resources available within CloudFormation. For example, to create a bucket, you use new s3.CfnBucket. You define the exact same properties as specified in the CloudFormation Resource Specifications.

You recognize Level 1 Constructs because their names start with Cfn. A CFN bucket must have all the required resource properties, such as the bucket name. You can configure all properties individually.

If you want to migrate from CloudFormation to CDK one resource at a time, you can use CFN bucket, CFN SQS queue, and so on. This approach uses Layer 1 of CDK, which is quite basic.

Level 2 Constructs: Higher-Level AWS Resources
Level 2 Constructs represent AWS resources at a higher level of abstraction. They focus on intent rather than raw resource properties. For example, s3.Bucket is a Level 2 Construct.

Unlike Level 1, Level 2 Constructs do not start with Cfn. They provide convenient defaults and boilerplate code, so you do not need to know every resource property.

For instance, you can specify versioned: true and encryption: s3.BucketEncryption.KMS. The Construct automatically knows how to configure these settings.

Level 2 Constructs also provide additional methods, such as bucket.addLifecycleRule(), which simplifies adding lifecycle rules that might be more complicated in raw CloudFormation.

Level 3 Constructs: Patterns
Level 3 Constructs are called Patterns because they represent multiple related resources combined to perform common tasks.

For example, a Lambda REST API Pattern allows you to add resources and HTTP integrations easily. Instead of configuring every single resource behind the scenes, you have a simpler API where you define the API, resources, methods, and Lambda functions with ease.

Another example is an ECS Pattern that creates an Application Load Balancer with a Fargate Service. Writing this as raw CloudFormation can be extremely complicated. With CDK, you just fill in the blanks, and the ALB and Fargate Service are automatically connected with the correct ports, security groups, and listeners.

Summary
Understanding the differences between the layers in CDK Constructs reveals the power of CDK. Level 1 provides direct CloudFormation resource access, Level 2 offers higher-level abstractions with convenient defaults and methods, and Level 3 combines multiple resources into Patterns for common AWS tasks.

This layered approach helps you create AWS infrastructure faster and with less complexity.

Key Takeaways
Constructs in CDK encapsulate everything needed to create the final CloudFormation stack.
There are three levels of Constructs: Level 1 (CFN Resources), Level 2 (higher-level AWS resources), and Level 3 (Patterns combining multiple resources).
Level 1 Constructs map directly to CloudFormation resources with exact properties.
Level 2 Constructs provide convenient defaults, added methods, and simplify resource configuration.
Level 3 Constructs (Patterns) represent multiple related resources to simplify common AWS tasks like creating APIs or ECS services.