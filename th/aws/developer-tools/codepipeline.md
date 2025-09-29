AWS CodePipeline

• Visual Workflow to orchestrate your CICD
• Source – CodeCommit, ECR, S3, Bitbucket, GitHub
• Build – CodeBuild, Jenkins, CloudBees, TeamCity
• Test – CodeBuild, AWS Device Farm, 3rd party tools, …
• Deploy – CodeDeploy, Elastic Beanstalk, CloudFormation, ECS, S3, …
• Invoke – Lambda, Step Functions
• Consists of stages:
• Each stage can have sequential actions and/or parallel actions
• Example: Build è Test è Deploy è Load Testing è …
• Manual approval can be defined at any stage

---

Technology Stack for CICD

---

CodePipeline – Artifacts

• Each pipeline stage can create ar tifacts
• Artifacts stored in an S3 bucket and passed on to the next stage

---

CodePipeline – Troubleshooting

• For CodePipeline Pipeline/Action/Stage Execution State Changes
• Use CloudWatch Events (Amazon EventBridge). Example:
• You can create events for failed pipelines
• You can create events for cancelled stages
• If CodePipeline fails a stage, your pipeline stops, and you can get
information in the console
• If pipeline can’t perform an action, make sure the “IAM Service Role”
attached does have enough IAM permissions (IAM Policy)
• AWS CloudTrail can be used to audit AWS API calls

---

CodePipeline Overview
Introduction to CodePipeline
CodePipeline is a visual workflow tool that allows you to orchestrate your Continuous Integration and Continuous Delivery (CI/CD) processes within AWS.

Supported Source Providers
With CodePipeline, you can specify sources such as:

CodeCommit repositories
Docker images stored in Amazon Elastic Container Registry (ECR)
Code stored in Amazon S3
External tools such as Bitbucket or GitHub
Build Phase Options
After obtaining the source code, you can proceed to the build phase. Supported build tools include:

AWS CodeBuild
Jenkins
CloudBees
TeamCity
Testing Phase
Following the build, you can include a test phase to validate your code. Testing options include:

AWS CodeBuild
AWS Device Farm (for mobile apps such as iOS and Android)
Any third-party testing tools you prefer
Deployment Phase
Once testing is complete, deployment can be handled by various services such as:

AWS CodeDeploy
AWS Elastic Beanstalk
AWS CloudFormation
Amazon ECS
Amazon S3
Additionally, you can invoke AWS Lambda functions or Step Functions as part of deployment.

Pipeline Stages and Actions
You can construct pipelines with multiple stages, each containing sequential and/or parallel actions. For example:

Build
Test
Deploy to staging
Load testing on staging
Deploy to production
Manual approval steps can be inserted at any stage, allowing human review before proceeding, such as before deploying to production.

How CodePipeline Works Internally
Consider a pipeline with three phases: source, build, and deploy.

Source: CodeCommit
Build: CodeBuild
Deploy: CodeDeploy
Each pipeline stage produces artifacts that are stored in Amazon S3 buckets. These artifacts are passed to the subsequent stages to perform their tasks.

Concrete Example
A developer pushes code to CodeCommit.
CodePipeline extracts the code and creates an artifact stored in an S3 bucket.
CodeBuild is invoked with the artifact as input; it does not access CodeCommit directly.
CodeBuild builds the code and produces deployment artifacts.
These artifacts are stored again in the S3 bucket by CodePipeline.
CodeDeploy receives the artifacts and deploys them accordingly.
This interaction between stages is facilitated through Amazon S3 artifacts.

Troubleshooting CodePipeline
Use Amazon CloudWatch Events and EventBridge to monitor pipeline actions and stage execution state changes.
Set up notifications for failed pipelines or cancelled stages, such as email alerts.
Visualize failures in the CodePipeline console for detailed information.
Verify the IAM service role of CodePipeline to ensure it has the necessary permissions to perform actions like invoking CodeBuild or accessing CodeCommit.
Use AWS CloudTrail to audit API calls and detect any denied requests within your infrastructure.
Conclusion
Understanding CodePipeline's components and workflow is essential for orchestrating efficient CI/CD pipelines in AWS. Hands-on practice will further solidify these concepts.

Key Takeaways
AWS CodePipeline is a visual workflow tool for orchestrating CI/CD pipelines.
It supports multiple source providers, build tools, test phases, and deployment options.
Artifacts generated at each stage are stored in Amazon S3 and passed between stages.
Troubleshooting can be done using CloudWatch Events, EventBridge, IAM roles, and CloudTrail.
