Lambda & CodeDeploy

• CodeDeploy can help you automate
traffic shift for Lambda aliases
• Feature is integrated within the SAM
framework
• Linear: grow traffic every N minutes until
100%
• Linear10PercentEvery3Minutes
• Linear10PercentEvery10Minutes
• Canary: try X percent then 100%
• Canary10Percent5Minutes
• Canary10Percent30Minutes
• AllAtOnce: immediate
• Can create Pre & Post Traffic hooks to
check the health of the Lambda function

---
AppSpec.yml

Name (required) – the name of the Lambda
function to deploy
• Alias (required) – the name of the alias to
the Lambda function
• CurrentVersion (required) – the version of
the Lambda function traffic currently points to
• TargetVersion (required) – the version of
the Lambda function traffic is shifted to

---

Lambda and CodeDeploy
Lambda and CodeDeploy Integration
CodeDeploy integrates with AWS Lambda to help automate the traffic shift for Lambda aliases. This integration builds upon Lambda versions and aliases to enable controlled deployments.

Although we will not perform this in the hands-on section of this lecture, the CodeDeploy feature is integrated within the Serverless Application Model (SAM) framework. When we explore the SAM framework, we will practice deploying Lambda functions using CodeDeploy.

Traffic Shifting Example
Consider a production alias (PROD Alias) currently pointing to Lambda function Version 1. We want to upgrade it to Version 2 by shifting traffic gradually from Version 1 to Version 2. CodeDeploy manages this traffic shift by varying the percentage of traffic directed to Version 2 over time until it reaches 100%.

For example, CodeDeploy might start by routing 10% of traffic to Version 2 and 90% to Version 1. Then it might increase to 50% traffic on each version, and finally shift all traffic to Version 2 with 0% on Version 1.

CodeDeploy Traffic Shifting Strategies
CodeDeploy offers several strategies for shifting traffic:

Linear: Traffic grows by a fixed percentage every N minutes until it reaches 100%. Examples include:

Linear10PercentEvery3Minutes
Linear10PercentEvery10Minutes
Canary: Traffic shifts to a small percentage for a set time, then immediately shifts to 100%. Examples include:

Canary10Percent5Minutes (10% traffic for 5 minutes, then 100%)
Canary10PercentEvery30Minutes
AllAtOnce: Immediate traffic shift from Version 1 to Version 2. This is the quickest but riskiest strategy because if Version 2 is untested, failures can occur.

Rollback Mechanisms
To ensure reliability, you can create pre-traffic and post-traffic hooks to check the health of your Lambda function during deployment. If any issues arise, such as failing traffic hooks or CloudWatch alarms, CodeDeploy detects the problem and performs a rollback, shifting all traffic back to the previous stable version (Version 1).

AppSpec.yml Parameters for Lambda Deployment
When deploying Lambda functions with CodeDeploy using the AppSpec.yml file, several important parameters must be specified:

Name: The name of the Lambda function to deploy.
Alias: The alias name of the Lambda function (required).
CurrentVersion: The version of the Lambda function that the traffic currently points to.
TargetVersion: The version of the Lambda function to which traffic will be shifted.
CodeDeploy updates the alias from the CurrentVersion to the TargetVersion over time according to the chosen traffic shifting strategy.

Summary
This lecture covered the integration between Lambda and CodeDeploy for automated traffic shifting and deployment strategies. While we will not practice this integration in this lecture, it will be explored in detail in the SAM framework section.

Key Takeaways
CodeDeploy integrates with Lambda to automate traffic shifting for Lambda aliases.
Traffic shifting strategies include Linear, Canary, and AllAtOnce, each with different timing and risk profiles.
Pre and post traffic hooks, along with CloudWatch alarms, enable health checks and automatic rollback if issues arise.
The AppSpec.yml file configures deployment parameters such as function name, alias, current version, and target version for controlled updates.