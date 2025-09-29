AWS CodeDeploy

• Deployment service that automates
application deployment
• Deploy new applications versions to EC2
Instances, On-premises servers, Lambda
functions, ECS Services
• Automated Rollback capability in case of
failed deployments, or trigger CloudWatch
Alarm
• Gradual deployment control
• A file named appspec.yml defines how the
deployment happens

---

CodeDeploy – EC2/On-premises Platform

• Can deploy to EC2 Instances & on-premises servers
• Perform in-place deployments or blue/green deployments
• Must run the CodeDeploy Agent on the target instances
• Define deployment speed
• AllAtOnce: most downtime
• HalfAtATime: reduced capacity by 50%
• OneAtATime: slowest, lowest availability impact
• Custom: define your %

---

CodeDeploy – In-Place Deployment

---

CodeDeploy – Blue-Green Deployment

---

CodeDeploy Agent

• The CodeDeploy Agent must be
running on the EC2 instances as a pre-
requisites
• It can be installed and updated
automatically if you’re using Systems
Manager
• The EC2 Instances must have sufficient
permissions to access Amazon S3 to get
deployment bundles

---

CodeDeploy – Lambda Platform

• CodeDeploy can help you automate
traffic shift for Lambda aliases
• Feature is integrated within the SAM
framework
• Linear : grow traffic every N minutes
until 100%
• LambdaLinear10PercentEvery3Minutes
• LambdaLinear10PercentEvery10Minutes
• Canary: try X percent then 100%
• LambdaCanary10Percent5Minutes
• LambdaCanary10Percent30Minutes
• AllAtOnce: immediate

---

CodeDeploy – ECS Platform

• CodeDeploy can help you automate
the deployment of a new ECS Task
Definition
• Only Blue/Green Deployments
• Linear : grow traffic every N minutes
until 100%
• ECSLinear10PercentEvery3Minutes
• ECSLinear10PercentEvery10Minutes
• Canary: try X percent then 100%
• ECSCanary10Percent5Minutes
• ECSCanary10Percent30Minutes
• AllAtOnce: immediate

---
CodeDeploy – Deployment to EC2

• Define how to deploy the
application using
appspec.yml +
Deployment Strategy
• Will do In-place update to
your fleet of EC2 instances
• Can use hooks to verify the
deployment after each
deployment phase

---

CodeDeploy – Deploy to an ASG

• In-place Deployment
• Updates existing EC2 instances
• Newly created EC2 instances by an
ASG will also get automated
deployments
• Blue/Green Deployment
• A new Auto-Scaling Group is created
(settings are copied)
• Choose how long to keep the old
EC2 instances (old ASG)
• Must be using an ELB

---

CodeDeploy – Redeploy & Rollbacks

• Rollback = redeploy a previously deployed revision of your application
• Deployments can be rolled back:
• Automatically – rollback when a deployment fails or rollback when a
CloudWatch Alarm thresholds are met
• Manually
• Disable Rollbacks — do not perform rollbacks for this deployment
• If a roll back happens, CodeDeploy redeploys the last known good
revision as a new deployment (not a restored version)

---

CodeDeploy Overview
Introduction to AWS CodeDeploy
AWS CodeDeploy is a deployment service that automates application deployment. This means you can upgrade your application from version one to version two seamlessly.

Deployment Targets
You can deploy application versions to the following targets:

EC2 instances
On-premises servers
Lambda functions
ECS services
Note that EC2 instances and on-premises servers share the same deployment methodology.

Deployment Features
CodeDeploy allows you to update applications and also supports automatic rollback. If a deployment fails or an alarm is triggered, CodeDeploy can automatically initiate a rollback, ensuring safe automated deployments.

Additionally, you can control the deployment speed, choosing to deploy to one instance at a time, all at once, half at a time, or using blue/green deployment strategies.

The deployment process is controlled by a file named appspec.yml, which defines how the deployment occurs.

EC2 and On-Premises Deployment Platform
This platform allows deployment to EC2 instances and on-premises servers. You can perform two types of deployments:

In-place deployments
Blue/green deployments
To enable deployments, the CodeDeploy agent must be installed on the target instances. This agent performs the updates on the instances.

Deployment Speed Options
You can define the deployment speed as follows:

AllAtOnce: Updates all instances simultaneously, resulting in the most downtime.
HalfAtATime: Updates half the instances at a time, reducing downtime.
OneAtATime: Updates one instance at a time, minimizing availability impact but slower.
Custom deployment speeds can also be defined.
In-Place Deployment Example: HalfAtATime
Consider version one running on four EC2 instances. Using the HalfAtATime setting for in-place deployment:

Two instances are taken down for maintenance.
The CodeDeploy agent stops the application on these instances and upgrades them to version two.
Once complete, the other two instances are taken down and upgraded similarly.
This process ensures gradual deployment with controlled downtime.

Blue/Green Deployment
Blue/green deployment involves running two versions in parallel:

An Application Load Balancer points to version one instances in an Auto Scaling group.
A new Auto Scaling group is created for version two instances, either manually or automatically by CodeDeploy.
The load balancer shifts traffic from the version one group (blue) to the version two group (green).
After traffic is shifted, the old version one instances are terminated.
This strategy allows zero downtime deployments by running both versions simultaneously during the transition.

CodeDeploy Agent Installation
The CodeDeploy agent must be installed on EC2 instances as a prerequisite. This can be done:

Manually using Linux commands.
Automatically using AWS Systems Manager if your instances are managed by it.
The EC2 instance with the CodeDeploy agent requires sufficient IAM permissions to access Amazon S3, where the application revisions are stored. The agent downloads the application revision from the S3 bucket during deployment.

CodeDeploy with Lambda Platform
CodeDeploy automates traffic shifting for Lambda aliases, allowing you to shift traffic from version one to version two under a production alias.

This feature is fully integrated with the AWS Serverless Application Model (SAM) framework, enabling seamless use of CodeDeploy within SAM deployments.

Traffic Shifting in Lambda
Consider a PROD alias with:

Version one deployed previously.
Version two deployed subsequently.
CodeDeploy gradually shifts traffic from version one to version two by adjusting a variable X from 0 to 100:

When X is 0, all traffic points to version one.
X increases gradually until it reaches 100, at which point all traffic points to version two.
Several traffic shifting strategies exist:

Linear: Traffic increases by a fixed percentage every N minutes (e.g., 10% every 3 minutes).
Canary: A small amount of traffic is shifted initially (e.g., 10% for 5 minutes), then all traffic is shifted if successful.
AllAtOnce: Immediate shift from version one to version two without gradual testing.
CodeDeploy with ECS Platform
CodeDeploy automates deployment of new ECS task definitions using blue/green deployments only.

Example setup:

An Application Load Balancer routes traffic to a target group where ECS tasks run in a cluster.
CodeDeploy creates a new target group for the new version (green) alongside the existing one (blue).
The new ECS task definition runs with the same capacity as before.
CodeDeploy shifts traffic from the blue target group to the green target group using strategies similar to Lambda (linear, canary, or AllAtOnce).
Conclusion
This overview covered AWS CodeDeploy's capabilities across EC2/on-premises, Lambda, and ECS platforms, including deployment strategies, traffic shifting, and agent requirements.

CodeDeploy provides safe, automated, and configurable deployment processes to help manage application updates efficiently.

Key Takeaways
AWS CodeDeploy automates application deployment across EC2 instances, on-premises servers, Lambda functions, and ECS services.
It supports in-place and blue/green deployment strategies with configurable deployment speeds such as AllAtOnce, HalfAtATime, and OneAtATime.
CodeDeploy enables safe deployments by allowing automatic rollbacks if failures or alarms occur.
Traffic shifting for Lambda and ECS deployments can be managed with linear, canary, or immediate (AllAtOnce) strategies.

---

CodeDeploy for EC2 and ASG
Introduction to CodeDeploy Concepts
Let's explore some additional concepts related to CodeDeploy. When deploying to an EC2 instance, you will have an appspec.yml file located at the root of your code repository. This file defines the deployment strategy and hooks that are used to verify deployments after each phase.

In-Place Deployment Strategy
One common deployment strategy is the in-place update to your fleet of EC2 instances. For example, you can configure a half-at-a-time deployment where half of the instances are taken down and upgraded to version two, followed by the other half being updated similarly. This approach updates the existing EC2 instances directly.

Deployments with Auto Scaling Groups (ASG)
Deployments involving Auto Scaling Groups are slightly more complex. There are two main options:

In-place deployments: This is similar to the EC2 in-place update, where existing instances are updated.
Blue/Green deployments: A new Auto Scaling Group is created with copied settings, and you can choose how long to keep the old ASG. The Elastic Load Balancer (ELB) redirects traffic from the old target group to the new one.
In-Place Deployment with ASG
In the case of in-place deployments with ASGs, if new EC2 instances are created automatically within your ASG, CodeDeploy will automatically deploy the application to those new instances. This feature adds significant power and flexibility to your deployment process.

Blue/Green Deployment Workflow
Consider the blue/green deployment scenario:

Initially, your ELB routes traffic to EC2 instances launched with version 1 (V1) within the ASG.
CodeDeploy deploys the V1 application to these instances.
When upgrading to version 2 (V2), new instances are created using launch template V2.
CodeDeploy deploys the application to these new instances.
The ELB then routes traffic to both V1 and V2 instances for a period.
If everything is healthy, the V1 instances are terminated, completing the blue/green deployment.
Redeploys and Rollbacks
A rollback is the process of redeploying a previously deployed revision of your application to revert to a known good state. Rollbacks can occur in two ways:

Automatically: Triggered by deployment failures or CloudWatch Alarms indicating a problem.
Manually: Initiated by the user.
If rollbacks are disabled, no rollback will be performed for the deployment.

How Rollbacks Work in CodeDeploy
When a rollback occurs, CodeDeploy does not restore a previous deployment in place. Instead, it performs a new deployment using the last known good revision. This means the rollback is effectively a new deployment of a stable version, not a restoration of a previous state. This distinction is important and may be tested in certification exams.

Conclusion
This lecture covered theoretical aspects of CodeDeploy deployment strategies, including in-place and blue/green deployments for EC2 and Auto Scaling Groups, as well as the rollback mechanism. Understanding these concepts is essential for managing deployments effectively and preparing for certification exams.

Key Takeaways
CodeDeploy uses an appspec.yml file at the root of your code to define deployment strategies and hooks.
In-place deployments update existing EC2 instances, while blue/green deployments create new Auto Scaling Groups (ASGs) and switch traffic via ELB.
Auto Scaling Groups automatically receive deployments for new EC2 instances created within them.
Rollbacks redeploy the last known good revision as a new deployment, either automatically on failure or manually if enabled.
