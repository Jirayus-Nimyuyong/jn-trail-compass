AWS Serverless Application Model (SAM)

• SAM = Serverless Application Model
• Framework for developing and deploying serverless applications
• All the configuration is YAML code
• Generate complex CloudFormation from simple SAM YAML file
• Supports anything from CloudFormation: Outputs, Mappings,
Parameters, Resources…
• SAM can use CodeDeploy to deploy Lambda functions
• SAM can help you to run Lambda, API Gateway, DynamoDB locally
© Stephane Maarek
NOT FOR DISTRIBUTION © Stephane Maarek www.datacumulus.com

---

AWS SAM – Recipe

• Transform Header indicates it’s SAM template:
• Transform: 'AWS::Serverless-2016-10-31'
• Write Code
• AWS::Serverless::Function
• AWS::Serverless::Api
• AWS::Serverless::SimpleTable
• Package & Deploy: sam deploy (optionally preceded by “sam package”)
• Quickly sync local changes to AWS Lambda (SAM Accelerate): sam sync --watch

---

Deep Dive into SAM Deployment

---

SAM Accelerate (sam sync)

• SAM Accelerate is a set of features to reduce latency while deploying
resources to AWS
• sam sync
• Synchronizes your project declared in SAM templates to AWS
• Synchronizes code changes to AWS without updating infrastructure (uses
service APIs & bypass CloudFormation)

---

SAM Accelerate (sam sync) – Examples

• sam sync (no options)
• Synchronize code and infrastructure
• sam sync --code
• Synchronize code changes without updating infrastructure (bypass CloudFormation, update
in seconds)
• sam sync --code --resource AWS::Serverless::Function
• Synchronize only all Lambda functions and their dependencies
• sam sync --code --resource-id HelloWorldLambdaFunction
• Synchronize only a specific resource by its ID
• sam sync --watch
• Monitor for file changes and automatically synchronize when changes are detected
• If changes include configuration, it uses sam sync
• If changes are code only, it uses sam sync --code

---

SAM Policy Templates

• List of templates to apply permissions to
your Lambda Functions
• Full list available here:
https://docs.aws.amazon.com/serverless-
application-
model/latest/developerguide/serverless-
policy-templates.html#serverless-policy-
template-table
• Important examples:
• S3ReadPolicy: Gives read only permissions to
objects in S3
• SQSPollerPolicy: Allows to poll an SQS queue
• DynamoDBCrudPolicy: CRUD = create read
update delete

---

SAM and CodeDeploy

• SAM framework natively uses
CodeDeploy to update Lambda
functions
• Traffic Shifting feature
• Pre and Post traffic hooks
features to validate deployment
(before the traffic shift starts and
after it ends)
• Easy & automated rollback using
CloudWatch Alarms

• AutoPublishAlias
• Detects when new code is being
deployed
• Creates and publishes an updated
version of that function with the latest
code
• Points the alias to the updated version
of the Lambda function
• DeploymentPreference
• Canary, Linear, AllAtOnce
• Alarms
• Alarms that can trigger a rollback
• Hooks
• Pre and post traffic shifting Lambda
functions to test your deployment

---

SAM – Local Capabilities

Locally star t AWS Lambda
• sam local start-lambda
• Starts a local endpoint that emulates AWS Lambda
• Can run automated tests against this local endpoint
Client (Local)
sam local start-lambda
Lambda
(local endpoint)
• Locally Invoke Lambda Function
• sam local invoke
• Invoke Lambda function with payload once and quit
after invocation completes
• Helpful for generating test cases
• If the function make API calls to AWS, make sure
you are using the correct --profile option

• Locally Star t an API Gateway Endpoint
• sam local start-api
• Starts a local HTTP server that hosts all your functions
• Changes to functions are automatically reloaded
• Generate AWS Events for Lambda Functions
• sam local generate-event
• Generate sample payloads for event sources
• S3, API Gateway, SNS, Kinesis, DynamoDB…

---

SAM – Multiple Environments

---

SAM Overview
Introduction to AWS SAM
AWS SAM, which stands for Serverless Application Model, is a framework designed to develop and deploy serverless applications. The name SAM also refers to a little squirrel, but in this context, it represents the framework.

With SAM, you write your application code and define your infrastructure using a configuration file in YAML format. This YAML file complies with the SAM framework specifications. SAM then automatically generates complex CloudFormation templates from these simple SAM YAML files.

SAM fully supports CloudFormation features, allowing you to use outputs, mappings, parameters, resources, and more within your SAM YAML code. This means you can leverage the full power of CloudFormation while benefiting from SAM's simplified syntax.

Behind the scenes, SAM can utilize CodeDeploy to deploy Lambda functions. It also provides capabilities to run Lambda, API Gateway, and DynamoDB locally, facilitating local debugging and testing of serverless applications.

SAM is specifically focused on serverless applications, enabling you to debug them locally and deploy them quickly to the AWS cloud using CloudFormation.

SAM Template Structure
At the top of your SAM template, you include a Transform header to indicate that it is a SAM template. This header instructs CloudFormation to transform the SAM template into a standard CloudFormation template.

Instead of using standard CloudFormation constructs, you use SAM-specific constructs such as:

Serverless Function: Represents a Lambda function.
Serverless API: Represents an API Gateway.
Serverless SimpleTable: Represents a DynamoDB table.
These constructs simplify the process of writing serverless applications.

Deployment Workflow
To package and deploy your application to AWS, you use the sam deploy command. Previously, deployment involved two commands: sam package followed by sam deploy. Now, sam deploy handles both packaging and deployment in a single step.

SAM also offers a feature called SAM Accelerate, which allows you to synchronize your changes to AWS Lambda very quickly using the sam sync command with the --watch option. This feature will be discussed in more detail later.

SAM Deployment Process
Your application consists of your code and a SAM template in YAML format. You first build the application locally using sam build, which transforms your SAM template into a CloudFormation template and prepares your application code.

After building, you deploy the application using sam deploy. This command zips and uploads your code and artifacts to an S3 bucket, then executes a ChangeSet against CloudFormation to create or update your stack.

Your CloudFormation stack can include various serverless components such as Lambda functions, API Gateway APIs, and DynamoDB tables.

SAM Accelerate
SAM Accelerate is a set of features designed to reduce deployment latency when deploying resources to AWS. The goal is to deploy as quickly as possible.

The command to use SAM Accelerate is sam sync. This command declares your project and SAM template to AWS and can bypass CloudFormation if you only make code changes without updating infrastructure. It uses the service API for very fast deployments.

If you have your SAM template and application code deployed, running sam sync will automatically synchronize your code changes with your Lambda function. This makes testing Lambda functions in the cloud very quick and easy.

You can run sam sync to synchronize both code and infrastructure, or use sam sync --code to synchronize only the code, skipping CloudFormation updates. This allows updates to be done in seconds.

Additionally, you can specify a particular resource to update, such as a specific Lambda function and its dependencies, by using the resource ID.

The --watch option allows SAM to monitor file changes and automatically synchronize any detected changes in the background.

In summary, if your changes include configuration updates, use sam sync. If you are only updating code, use sam sync --code for faster deployment.

Conclusion
This lecture provided an overview of AWS SAM, its template structure, deployment workflow, and the SAM Accelerate feature for rapid deployments. Hands-on practice will help solidify understanding of how SAM works.

Key Takeaways
AWS SAM is a framework for developing and deploying serverless applications using simplified YAML configuration.
SAM transforms simple YAML templates into complex CloudFormation files, supporting all CloudFormation features.
SAM Accelerate enables rapid deployment by synchronizing code changes directly to AWS Lambda, bypassing CloudFormation when infrastructure is unchanged.
The deployment workflow involves building locally with sam build and deploying with sam deploy, which packages and uploads code to S3 and executes CloudFormation ChangeSets.

---

SAM Policy Templates
SAM Policy Templates
Let's discuss SAM policy templates, also known as serverless application model policy templates, which are important for managing permissions in AWS Lambda functions. These templates may appear in exams and are essential for simplifying permission assignments.

SAM policy templates are simple predefined permission sets that you can apply to your Lambda functions. They allow you to reason more easily about what your Lambda function can do based on these templates that group a set of permissions.

There is a comprehensive list of all available SAM policy templates at the official AWS documentation link. While there are many templates, we will focus on three important examples to illustrate their usage.

Examples of SAM Policy Templates
S3ReadPolicy: This template grants read-only permissions to objects in Amazon S3. It is straightforward and self-explanatory.

SQSPollerPolicy: This template allows your Lambda function to poll an Amazon SQS queue.

DynamoDBCrudPolicy: The acronym CRUD stands for Create, Read, Update, and Delete. This template enables your Lambda function to perform all these operations on a DynamoDB table.

Overall, these templates are quite self-explanatory once you see them. Understanding how they are defined helps clarify their purpose.

Defining a Lambda Function with a SAM Policy Template
For example, suppose we define a Lambda function running Python 2.7, and we want it to read from an SQS queue. Instead of manually attaching an IAM role, we can specify the SQSPollerPolicy in the SAM template.

In the SAM template, we create a policy named SQSPollerPolicy and specify the queue name. When the SAM framework processes this template, it automatically transforms the policy template into an IAM policy attached to the Lambda function.

The key advantage of SAM policy templates is that they simplify writing permissions for your function. They prevent you from worrying about the details of provisioning IAM roles manually.

That concludes the essential information you need to know about SAM policy templates. Make sure to review how they look and understand their names, as these usually clearly indicate their purpose.

Key Takeaways
SAM policy templates simplify permission management for Lambda functions by grouping related permissions.
Examples include S3ReadPolicy for read-only S3 access, SQSPollerPolicy for polling SQS queues, and DynamoDBCrudPolicy for full CRUD operations on DynamoDB.
Using SAM policy templates abstracts away manual IAM role provisioning, making permission assignment easier and less error-prone.
Familiarity with the names and purposes of these templates helps in quickly understanding their effects on Lambda permissions.

---

SAM with CodeDeploy
Introduction to SAM and CodeDeploy Integration
In this lecture, we explore how CodeDeploy integrates with the Serverless Application Model (SAM) framework. SAM uses CodeDeploy to update Lambda functions by leveraging the traffic shifting feature through aliases. This integration allows defining pre-traffic and post-traffic hooks as Lambda functions to validate deployments. Additionally, automated rollbacks can be configured using CloudWatch alarms.

Deployment Workflow Diagram
The deployment process involves a Lambda alias pointing to version 1 of a Lambda function. When a deployment is triggered via CodeDeploy, either through a CI/CD pipeline or the SAM framework, the alias is updated to point to version 2. CodeDeploy optionally runs a pre-traffic hook Lambda function to test the deployment. Then, traffic shifting occurs according to the chosen strategy. A CloudWatch alarm monitors the deployment to ensure stability. After traffic shifting completes, a post-traffic hook Lambda function can run additional tests. If successful, version 1 and the alias are removed, leaving only version 2 active.

SAM Template YAML Configuration for CodeDeploy
An example SAM template YAML file includes the following key elements:

AutoPublishAlias: Enables SAM to detect new code deployments. A new Lambda function version is created with the latest code, and the alias automatically updates to point to this version.
DeploymentPreference: Controls the speed and method of deployment. Options include Canary, Linear, and AllAtOnce types, which correspond to CodeDeploy settings. For example, Canary10Percent10Minutes shifts 10% of traffic for 10 minutes before completing the deployment.
Alarms: A list of CloudWatch alarms to monitor during deployment that can trigger automatic rollbacks if thresholds are breached.
Hooks: Lambda functions that run before or after traffic shifting to validate the deployment and run custom code if necessary.
Practical Demonstration: Creating and Deploying a SAM Application with CodeDeploy
We will now practice deploying a Lambda function using SAM and CodeDeploy.

Create a new directory named sam-codedeploy and navigate into it.
Initialize a new SAM application using Python 3.7 with the Hello World example template.
Navigate into the newly created sam-app directory.
Build the SAM application using the sam build command.
Review the simple HelloWorldFunction code, which returns a body with "hello world."
Examine the template.yaml file to understand the resources created, including the Lambda function and API Gateway.
Add CodeDeploy integration YAML configuration to the SAM template, ensuring AutoPublishAlias aligns with the function's events.
Rebuild the SAM application to apply changes.
Deploy the application using sam deploy --guided to simplify the deployment steps.
Confirm the creation of necessary resources, including the CodeDeploy service role.
Verifying Deployment and Lambda Function Behavior
After deployment:

Access the AWS Management Console and navigate to the Lambda service.
Locate the deployed Lambda function, typically named with a HelloWorld prefix.
Check the function's Qualifiers tab to verify the live alias points to version 1.
Test the function by creating a test event and invoking it. The response should be "hello world."
This confirms the initial deployment and alias setup.

Updating the Lambda Function and Deploying with CodeDeploy
To update the Lambda function:

Edit the app.py file in the hello_world directory to change the response to "hello world v2."
Rebuild the SAM application using sam build to package the updated code.
Deploy the updated application using sam deploy --guided.
Confirm deployment parameters such as stack name, region, and permission prompts by answering "yes".
Observe the deployment process, including the creation of a changeset and modification of the alias and function version.
Approve the deployment to apply changes via CloudFormation.
This deployment triggers CodeDeploy to perform a canary deployment with traffic shifting.

Monitoring Deployment Progress in CodeDeploy
During deployment:

Refresh the Lambda function's alias page to observe traffic weights shifting between versions 1 and 2 (e.g., 90% to version 1 and 10% to version 2).
Navigate to the CodeDeploy console and view the deployment details.
Confirm that pre-deployment validation succeeded (if any hooks were configured).
Monitor the traffic shifting progress, which follows the Canary10Percent10Minutes configuration, taking approximately 10 minutes.
After traffic shifting completes, post-deployment validation runs (if configured).
Once successful, the alias points entirely to version 2, completing the canary deployment.
Conclusion
This demonstration showed how to perform a canary deployment of a Lambda function using CodeDeploy integrated with the SAM framework. The process includes automatic versioning, alias management, traffic shifting, and optional deployment validation hooks. This approach enables safer and controlled Lambda function updates with rollback capabilities.

Key Takeaways
SAM integrates with CodeDeploy to enable Lambda function updates using traffic shifting with aliases.
Pre-traffic and post-traffic Lambda hooks can be defined for deployment validation.
Automated rollbacks can be triggered by CloudWatch alarms during deployment.
Deployment preferences like Canary10Percent10Minutes control traffic shifting speed and strategy.
SAM CLI commands simplify building and deploying Lambda applications with CodeDeploy integration.

---

SAM - Local Capabilities
Local Capabilities of the SAM Framework
The SAM framework provides powerful local capabilities for AWS Lambda development. By using SAM, you can start Lambda functions locally on your computer, emulating the Lambda environment for testing and development.

To start a Lambda function locally, you use the command sam local start-lambda. This command makes your Lambda function available as a local endpoint on your machine, emulating the Lambda framework.

This local endpoint enables you to run automated tests against your Lambda functions without deploying them to AWS. It facilitates efficient development and debugging cycles.

You can also invoke a Lambda function locally using the command sam local invoke. This command executes the Lambda function with a specified payload and then exits after the invocation completes.

This invocation method is particularly helpful for generating test cases. If your Lambda function interacts with AWS services, such as making API calls to DynamoDB to fetch data, you should specify the correct AWS profile using the --profile option. This ensures that the function runs against the intended AWS environment.

SAM also allows you to start a local API Gateway endpoint using the command sam local start-api. This starts a local HTTP server that hosts all your APIs and Lambda functions.

When you update your Lambda function code, the local server automatically reloads the functions and updates the API accordingly, enabling rapid development and testing.

Finally, you can generate sample event payloads for Lambda functions using the command sam local generate-event. For example, you can generate an event for an Amazon S3 bucket put operation at a specific key, and pipe this event into sam local invoke to test your function with realistic event data.

This feature supports generating events for a variety of Lambda event sources, including Amazon S3, API Gateway, SNS, Kinesis, DynamoDB, and many others.

In summary, the SAM framework's local capabilities enable efficient Lambda function development by providing local endpoints, invocation methods, API hosting, and event generation tools.

Key Takeaways
The SAM framework allows you to locally start AWS Lambda functions as endpoints on your computer.
You can invoke Lambda functions locally with payloads for testing purposes using sam local invoke.
SAM supports starting a local API Gateway endpoint that hosts all your APIs and functions with automatic reload on code changes.
You can generate sample event payloads for various Lambda event sources using sam local generate-event.

---

SAM - Multiple Environments
Managing Multiple Environments with SAM
SAM allows you to easily manage multiple environments within your development stack.

Imagine deploying your SAM templates into a development environment at times, and into a production environment at other times. As a developer, you have your SAM templates, but you are also going to create another file named samconfig.toml.

The samconfig.toml File
This file is in the TOML format, and you can have different parameters for different stacks. For example, there is a dev stack where you define the deploy parameter. You specify the stack name, S3 bucket, prefix, region, capabilities, and parameter overrides to indicate the environment is development. You can also set the sync parameters in the same way.

Similarly, you can set the prod deploy parameters by starting with prod.deploy.parameters, and again define the stack name, S3 bucket, region, and so on. For the parameter overrides, you specify that the environment is production. Sync parameters can also be specified.

Example samconfig.toml Structure
toml Code Sample
[dev.deploy.parameters]
stack_name = "dev-stack"
s3_bucket = "dev-bucket"
prefix = "dev-prefix"
region = "us-east-1"
capabilities = "CAPABILITY_IAM"
parameter_overrides = "Environment=development"

[dev.sync.parameters]
# sync parameters for dev

[prod.deploy.parameters]
stack_name = "prod-stack"
s3_bucket = "prod-bucket"
region = "us-east-1"
parameter_overrides = "Environment=production"

[prod.sync.parameters]
# sync parameters for prod
Deploying to Specific Environments
Once this initial setup is done in your TOML file, you can run the following command to deploy:

bash Code Sample
sam deploy --config-env dev
The SAM CLI will look into your samconfig.toml file, pick up the correct parameters, and automatically deploy resources to the correct environment and locations.

You can change your command to deploy to production as follows:

bash Code Sample
sam deploy --config-env prod
You can define as many environments as you need using this approach.

Conclusion
This is a feature that can come up in the exam.

Key Takeaways
SAM allows easy management of multiple environments within your development stack.
The "samconfig.toml" file in TOML format enables configuration for different stacks, such as dev and prod.
Deployments can be targeted to specific environments using the --config-env flag with the SAM CLI.
This setup automates resource deployment to the correct environment and can be extended to as many environments as needed.