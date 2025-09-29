Developer Tools

---

CICD – Introduction

• We have learned how to:
• Create AWS resources, manually (fundamentals)
• Interact with AWS programmatically (AWS CLI)
• Deploy code to AWS using Elastic Beanstalk
• All these manual steps make it very likely for us to do mistakes!

---

• We would like our code “in a repository” and have it deployed onto AWS
• Automatically
• The right way
• Making sure it’s tested before being deployed
• With possibility to go into different stages (dev, test, staging, prod)
• With manual approval where needed
• To be a proper AWS developer… we need to learn AWS CICD

• This section is all about automating the deployment we’ve done so far
while adding increased safety

• We’ll learn about:
• AWS CodeCommit – storing our code
• AWS CodePipeline – automating our pipeline from code to Elastic Beanstalk
• AWS CodeBuild – building and testing our code
• AWS CodeDeploy – deploying the code to EC2 instances (not Elastic Beanstalk)
• AWS CodeStar – manage software development activities in one place
• AWS CodeAr tifact – store, publish, and share software packages
• AWS CodeGuru – automated code reviews using Machine Learning

---

Continuous Integration (CI)

• Developers push the code to a code
repository often (e.g., GitHub, CodeCommit,
Bitbucket…)
• A testing / build server checks the code as
soon as it’s pushed (CodeBuild, Jenkins CI, …)
• The developer gets feedback about the tests
and checks that have passed / failed
• Find bugs early, then fix bugs
• Deliver faster as the code is tested
• Deploy often
• Happier developers, as they’re unblocked

---

Continuous Delivery (CD)

• Ensures that the software can be released reliably whenever needed
• Ensures deployments happen often and are quick
• Shift away from “one release every 3 months” to ”5 releases a day”
• That usually means automated deployment (e.g., CodeDeploy, Jenkins CD,
Spinnaker, …)

---

Technology Stack for CICD

---

Introduction to CICD in AWS
Introduction to CICD in AWS
Welcome to one of my favorite sections on AWS, which is the CICD section. CICD is extremely important for developers and is a key topic for the exam. Throughout this course, we have learned how to create AWS resources manually and understand the fundamentals. We also learned how to interact with AWS programmatically using the CLI and how to deploy code to AWS using Elastic Beanstalk. However, all these steps were very manual, and manual processes are prone to errors.

At the end of the day, what we want is to push our code into a target repository, and then have it deployed automatically onto AWS. This deployment should be done the right way, ensuring that all code is tested before deployment. We want the possibility to deploy to different stages, such as development, test, staging (pre-production), and production environments. Sometimes, manual approvals are required before deploying to production. All these steps need to be automated, which is why learning AWS CICD is crucial. Automating these steps adds safety and speed to our development process.

We will learn about the following AWS services:

CodeCommit: to store code repositories.
CodePipeline: to automate pipelines from code to platforms like Elastic Beanstalk.
CodeBuild: to build and automatically test our code.
CodeDeploy: to deploy code to EC2 instances and other environments without using Elastic Beanstalk.
CodeStar: a unified tool to manage software development activities, integrating CodeCommit, CodePipeline, CodeBuild, and CodeDeploy.
CodeArtifact: to store, publish, and share software packages.
CodeGuru: to perform automated code reviews using machine learning.
We will explore each of these services in detail throughout this course.

What is CICD?
CICD stands for Continuous Integration and Continuous Delivery. Continuous Integration means developers frequently push their code into a central code repository. This repository could be GitHub (a third-party service), AWS CodeCommit, or Bitbucket (another third-party service). Once the code is pushed, a build or test server automatically checks if the code is correct and working. This server could be AWS CodeBuild or an open-source tool like Jenkins.

The build server fetches the code and runs tests. Developers receive feedback on whether the tests passed or failed. This process saves time by finding and fixing bugs early, as the code is tested immediately after being pushed. Developers do not need to test the code on their own machines; they can push the code and continue with other tasks while the build server runs tests. This leads to faster code delivery and more frequent deployments, resulting in happier developers with a healthier development cycle.

Continuous Delivery
Continuous Delivery means that once the code passes all tests, it is automatically deployed to application servers. For example, if we have application servers running version one of our application, pushing new code to the repository will trigger deployment of version two to these servers.

The process is as follows:

Developer pushes code to the repository.
The build server tests the code (Continuous Integration).
After successful tests, a deployment server deploys the application to the servers.
Continuous Delivery ensures deployments happen often and quickly, moving away from infrequent releases (e.g., once every three months) to multiple releases per day. This automation reduces errors and accelerates delivery. Tools for automated deployment include AWS CodeDeploy, Jenkins CD, Spinnaker, and others.

AWS CICD Tech Stack
The AWS CICD tech stack consists of:

Code Repository: CodeCommit, GitHub, Bitbucket, or any third-party repository.
Build and Test Phase: CodeBuild on AWS or Jenkins CI as an open-source alternative.
Deploy Phase: CodeDeploy, which can deploy to EC2 instances, on-premises servers, Lambda functions, and ECS.
Infrastructure Provisioning: Elastic Beanstalk can be used as an alternative to CodeDeploy to provision infrastructure and deploy applications.
Orchestration: AWS CodePipeline orchestrates the entire CICD process, defining what happens at each stage.
This overview sets the context for the detailed exploration of each service in the following lectures.

Summary
In this section, we introduced the concept of CICD and its importance in automating code deployment on AWS. We discussed the key AWS services involved in CICD pipelines and the benefits of continuous integration and continuous delivery. The upcoming lectures will provide a deep dive into each of these services to help you build robust CICD pipelines.

Key Takeaways
CICD automates code deployment to AWS, ensuring faster and safer releases.
Continuous Integration involves frequent code pushes to a central repository with automated testing.
Continuous Delivery automates deployment to environments after successful testing, enabling rapid releases.
AWS provides a suite of tools including CodeCommit, CodeBuild, CodeDeploy, and CodePipeline to implement CICD pipelines effectively.