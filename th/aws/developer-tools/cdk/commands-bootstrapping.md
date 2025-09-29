CDK – Important Commands to know

---

CDK – Bootstrapping

• The process of provisioning resources for CDK
before you can deploy CDK apps into an
AWS environment
• AWS Environment = account & region
• CloudFormation Stack called CDKToolkit is created
and contains:
• S3 Bucket – to store files
• IAM Roles – to grant permissions to perform
deployments
• You must run the following command for each new
environment:
• cdk bootstrap aws://<aws_account>/<aws_region>
• Otherwise, you will get an error “Policy contains a
statement with one or more invalid principal”

---

CDK - Commands & Bootstrapping
Introduction to Important CDK Commands
In this lecture, we will explore the important commands you need to know for the AWS Cloud Development Kit (CDK). These commands will help you manage your CDK applications effectively.

The first command is to install the CDK CLI and libraries, which allows you to start writing your CDK stack.
The second command, cdk init, initializes an app from a specified template. You can choose from languages such as Python, JavaScript, and others.
The cdk synth command synthesizes and prints the CloudFormation template. This command transforms your CDK stack written as code into a CloudFormation template.
The cdk bootstrap command will be discussed in detail in the next section.
The cdk deploy command deploys the stack. Once you have a CloudFormation template, you use this command to deploy it.
The cdk diff command allows you to view the differences between your local CDK code and what is currently deployed on CloudFormation.
Finally, the cdk destroy command is used to destroy the deployed stacks.
Understanding CDK Bootstrapping
Bootstrapping in CDK is the process of provisioning necessary resources before you can deploy CDK applications into an AWS environment.

What is an AWS Environment in CDK?
In the context of CDK, an environment is the combination of an AWS account and a region. Before deploying to a specific account and region, you must perform bootstrapping for that environment.

What Happens During Bootstrapping?
When you run the cdk bootstrap command with the target environment specified as aws://aws_account/aws_region, the following occurs:

A CloudFormation stack named CDKToolkit is created in the specified environment.
This stack provisions an S3 bucket and an IAM role.
These resources are prerequisites required to deploy any CDK stack into that environment.
Importance of Bootstrapping
If you attempt to deploy a CDK stack without bootstrapping the environment first, you will encounter an error indicating that the policy contains a statement with one or more invalid principals. This error occurs because the necessary IAM role is missing.

Therefore, bootstrapping is essential to ensure that the deployment process has the required permissions and resources.

Summary
To summarize, the CDK CLI commands provide a workflow for developing and managing CDK applications. Bootstrapping is a critical step that prepares your AWS environment by provisioning necessary resources such as an S3 bucket and IAM role. Always ensure you bootstrap your target environment before deploying your CDK stacks to avoid deployment errors.

Key Takeaways
The CDK CLI provides essential commands such as cdk init, cdk synth, cdk deploy, cdk diff, cdk destroy, and cdk bootstrap for managing CDK applications.
cdk init initializes a new CDK app from a specified template, supporting languages like Python and JavaScript.
cdk synth synthesizes the CDK stack into a CloudFormation template.
Bootstrapping (cdk bootstrap) provisions necessary resources like an S3 bucket and IAM role in the target AWS environment before deployment.
Deploying without bootstrapping results in errors due to missing IAM roles, emphasizing the importance of the bootstrapping step.

