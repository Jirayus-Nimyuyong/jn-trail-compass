AWS Elastic Beanstalk

---
Developer problems on AWS
• Managing infrastructure
• Deploying Code
• Configuring all the databases, load balancers, etc
• Scaling concerns

• Most web apps have the same architecture (ALB + ASG)
• All the developers want is for their code to run!
• Possibly, consistently across different applications and environments

---

Elastic Beanstalk – Overview
• Elastic Beanstalk is a developer centric view of deploying an application
on AWS
• It uses all the component’s we’ve seen before: EC2, ASG, ELB, RDS, …
• Managed service
• Automatically handles capacity provisioning, load balancing, scaling, application
health monitoring, instance configuration, …
• Just the application code is the responsibility of the developer
• We still have full control over the configuration
• Beanstalk is free but you pay for the underlying instances

---

Elastic Beanstalk – Components
• Application: collection of Elastic Beanstalk components (environments,
versions, configurations, …)
• Application Version: an iteration of your application code
• Environment
• Collection of AWS resources running an application version (only one application
version at a time)
• Tiers: Web Server Environment Tier & Worker Environment Tier
• You can create multiple environments (dev, test, prod, …)

---

Elastic Beanstalk – Supported Platforms
• Go
• Java SE
• Java with Tomcat
• .NET Core on Linux
• .NET on Windows Server
• Node.js
• PHP
• Python
• Ruby
• Packer Builder
• Single Container Docker
• Multi-container Docker
• Preconfigured Docker

---
Web Server Tier vs. Worker Tier
• Scale based on the number of SQS messages
• Can push messages to SQS queue from
another Web Server Tier

---
Elastic Beanstalk Deployment Modes
Single Instance
Great for dev

High Availability with Load Balancer
Great for prod
---

AWS Elastic Beanstalk - Section Introduction
So now, we know all the fundamentals, and we know how to programmatically access AWS.

How about we start deploying the applications, the right way?

You may have noticed, there was a lot of manual work going on in the past sections, but in this section, we're going to learn Elastic Beanstalk.

Elastic Beanstalk will allow us to deploy our applications easily, in a skeletal way, and in a safe way.

This is actually one of the most difficult exam sections, and I want to do it right now, because I think you will be strongly empowered by knowing it right away.

So, let's get started, and learn how to deploy an application, the right way.

Key Takeaways
Elastic Beanstalk simplifies application deployment on AWS.
It provides a skeletal and safe way to deploy applications.
This section focuses on mastering Elastic Beanstalk, a challenging but empowering topic.
Learning Elastic Beanstalk enables efficient and correct deployment practices.

---

Elastic Beanstalk Overview (High level)
Introduction to Elastic Beanstalk
So far in this course, when deploying an application, we have followed the same architecture. We have a load balancer that receives all requests from users, followed by an auto scaling group with multiple availability zones. In each availability zone, there are EC2 instances deployed. In the backend, we might have data subnets with an RDS database handling reads and writes, possibly with replicas. For caching, we consider ElastiCache.

If there are many applications to deploy following this architecture, recreating it each time can be tedious. As developers, managing infrastructure and deploying code can be complicated. We do not want to configure databases, load balancers, and other components repeatedly. Moreover, we want everything to scale automatically.

Most web applications share this architecture with a load balancer and an auto scaling group. As developers, our primary concern is to have our code run without worrying about the underlying infrastructure. Additionally, when developing in different programming languages and environments, having a single deployment method is desirable. This is where Elastic Beanstalk comes into play.

Elastic Beanstalk provides a developer-centric view of deploying applications on AWS. From a single interface, it reuses components such as EC2, auto scaling groups, load balancers, and RDS. It is a managed service that deploys these components for you, handling capacity provisioning, load balancer configuration, scaling, application health monitoring, and instance configuration.

Your only responsibility as a developer is the application code. You still retain full control over each component's configuration, but these come bundled as one interface in Elastic Beanstalk. Additionally, Beanstalk offers a convenient way to update applications. The Beanstalk service itself is free, but you pay for the underlying resources such as EC2 instances, auto scaling groups, and load balancers.

Components of Elastic Beanstalk
Application: A collection of Beanstalk components including environments, versions, and configurations.
Application Version: An iteration of your application code, such as version one, two, or three.
Environment: A collection of resources running a specific application version. Only one application version runs in an environment at a time, but you can update the environment to a new version.
Tiers: There are two tiers in Beanstalk: the web server environment tier and the worker environment tier.
Multiple Environments: You can create multiple environments such as development, testing, and production.
The typical process is to create an application, upload a version, launch an environment, and manage the environment lifecycle. To iterate, you upload a new version and deploy it to update the application stack.

Supported Programming Languages
Elastic Beanstalk supports many programming languages and platforms, including:

Go
Java SE
Java with Tomcat
.NET Core on Linux
.NET on Windows Server
Node.js
PHP
Python
Ruby
Packer Builder
Single Docker Container
Multi Docker Container
Pre-configured Docker
The goal is to enable deployment of almost any application on Beanstalk.

Web Server and Worker Environment Tiers
The web server environment tier follows the traditional architecture with a load balancer sending traffic to an auto scaling group of EC2 instances acting as web servers.

The worker environment tier differs in that clients do not access EC2 instances directly. Instead, messages are sent to an SQS queue. EC2 instances act as workers, pulling messages from the queue to process them. The worker environment scales based on the number of messages in the SQS queue.

You can combine the web and worker environments by having the web environment push messages into the SQS queue of the worker environment.

Deployment Modes
Elastic Beanstalk offers two deployment modes:

Single Instance: Suitable for development purposes. This mode uses one EC2 instance with an Elastic IP, and can optionally launch an RDS database. It is simple but not highly available.

High Availability: Suitable for production environments. This mode uses a load balancer distributing traffic across multiple EC2 instances managed by an auto scaling group across multiple availability zones. It can also include a multi-AZ RDS database with a master and standby instance.

That concludes the overview of Elastic Beanstalk. I hope you found it informative, and I look forward to seeing you in the next lecture.

Key Takeaways
Elastic Beanstalk simplifies application deployment by managing infrastructure components like EC2, load balancers, and auto scaling groups.
Developers focus solely on their code while Beanstalk handles capacity provisioning, scaling, and health monitoring.
Beanstalk supports multiple programming languages and deployment environments, including web server and worker tiers.
Two deployment modes exist: single instance for development and high availability with load balancers for production.