AWS Cloud Development Kit (CDK)

• Define your cloud infrastructure using a
familiar language:
• JavaScript/TypeScript, Python, Java, and .NET
• Contains high level components called
constructs
• The code is “compiled” into a
CloudFormation template (JSON/YAML)
• You can therefore deploy infrastructure
and application runtime code together
• Great for Lambda functions
• Great for Docker containers in ECS / EKS

---

CDK in a diagram

---
|
CDK vs SAM
• SAM:
• Serverless focused
• Write your template declaratively in JSON or YAML
• Great for quickly getting started with Lambda
• Leverages CloudFormation
• CDK:
• All AWS services
• Write infra in a programming language JavaScript/TypeScript, Python, Java, and
.NET
• Leverages CloudFormation

---

CDK + SAM

• You can use SAM CLI to locally test your CDK apps
• You must first run cdk synth

---

CDK Overview
Introduction to AWS Cloud Development Kit (CDK)
The AWS Cloud Development Kit, or CDK, allows you to define your cloud infrastructure in a familiar programming language such as JavaScript, TypeScript, Python, Java, and .NET.

You might be wondering how CDK relates to CloudFormation, since CloudFormation lets you define cloud infrastructure using YAML. CDK supersedes CloudFormation by enabling infrastructure definition using programming languages.

Defining Infrastructure with CDK
For example, using TypeScript, you can define constructs such as a VPC, ECS cluster, and an application load-balanced Fargate service. These constructs are high-level components provided by CDK.

Create a new VPC with a name and three availability zones.
Define an ECS cluster named MyCluster linked to the VPC.
Define a Fargate service with an Application Load Balancer linked to the cluster, specifying CPU, number of tasks, task image options, memory limits, and public ALB configuration.
All of this is defined using a programming language, which means if the code does not compile, it will produce an error and the CloudFormation template cannot be generated. If the code compiles successfully, it is compiled into a CloudFormation template in JSON or YAML format.

Therefore, CDK is used to define CloudFormation templates in the backend, providing greater flexibility by using programming languages. This also allows deploying infrastructure and application runtime code together, which is beneficial for Lambda functions and Docker containers in ECS or EKS.

Advantages of CDK over CloudFormation
CloudFormation templates are YAML-based and not type-safe, so errors may only be discovered at deployment time. CDK allows defining infrastructure using constructs and programming languages, enabling type safety and earlier error detection.

CDK Architecture and Workflow
Application constructs include Lambda functions, DynamoDB, Amazon S3, ECS, Step Functions, and more.
Supported programming languages include Python, TypeScript, Java, and .NET.
You write your CDK code and then synthesize it using the CDK CLI into a CloudFormation template.
This template is applied via CloudFormation to define your infrastructure.
Thus, CDK acts as a layer above CloudFormation, simplifying infrastructure management.

Comparing CDK and AWS SAM
AWS SAM focuses on serverless applications, using declarative JSON or YAML templates, ideal for quickly starting with Lambda functions.
SAM leverages CloudFormation in the backend.
CDK is a superset of CloudFormation supporting all AWS services.
CDK uses familiar programming languages for infrastructure definition.
Both generate CloudFormation templates under the hood.
Combining CDK and SAM
You can combine CDK and SAM frameworks effectively. For example, you can use the SAM CLI to locally test CDK applications by:

Running cdk synth to generate a CloudFormation template from the CDK application.
Using the SAM CLI to locally invoke Lambda functions by referencing the synthesized CloudFormation template.
This integration allows leveraging the strengths of both tools.

Upcoming Hands-On CDK Example
In the next lecture, we will deploy an application using CDK that:

Creates an S3 bucket where users can upload images.
Triggers a Lambda function upon image upload.
The Lambda function calls Amazon Rekognition to analyze the image.
Saves the analysis results to Amazon DynamoDB.
All of this will be defined within a CDK script.

Key Takeaways
The AWS Cloud Development Kit (CDK) enables defining cloud infrastructure using familiar programming languages like TypeScript, Python, Java, and .NET.
CDK compiles code into CloudFormation templates, providing type safety and early error detection compared to raw YAML templates.
CDK supports all AWS services and allows deploying infrastructure and application runtime code together.
CDK and AWS SAM can be combined, with CDK synthesizing CloudFormation templates that SAM CLI can invoke locally for Lambda functions.