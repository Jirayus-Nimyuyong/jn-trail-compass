Elastic Beanstalk Deployment

Blue / Green
• Not a “direct feature” of Elastic Beanstalk
• Zero downtime and release facility
• Create a new “stage” environment and
deploy v2 there
• The new environment (green) can be
validated independently and roll back if
issues
• Route 53 can be setup using weighted
policies to redirect a little bit of traffic to
the stage environment
• Using Beanstalk, “swap URLs” when done
with the environment test

Elastic Beanstalk - Traffic Splitting
• Canary Testing
• New application version is deployed to a
temporary ASG with the same capacity
• A small % of traffic is sent to the
temporary ASG for a configurable amount
of time
• Deployment health is monitored
• If there’s a deployment failure, this triggers
an automated rollback (very quick)
• No application downtime
• New instances are migrated from the
temporary to the original ASG
• Old application version is then terminated

Elastic Beanstalk Deployment Summary
from AWS Doc
• https://docs.aws.amazon.com/elasticbeanstalk/latest/dg/using-
features.deploy-existing-version.html

---

Beanstalk Deployment Modes
Overview of Elastic Beanstalk Deployment Options
When updating your application on Elastic Beanstalk, you have several deployment options. Each will be described with diagrams in the following sections, but here is an overview of the main types:

All at once: Deploy all instances simultaneously. This is the fastest method but causes downtime as instances are unavailable during the update.
Rolling: Update a few instances at a time, called a bucket, moving to the next batch only after the previous is healthy.
Rolling with additional batch: Similar to rolling, but spins up new instances to maintain full capacity during the update.
Immutable: Deploy new instances with the new version in a temporary Auto Scaling Group (ASG), then replace the old instances once healthy.
Blue/Green: Create an entirely new environment with the new version and switch traffic over when ready.
Traffic splitting: Used for canary testing by sending a small percentage of traffic to a new deployment.
You will learn about diagrams and details for each of these in the next sections.

All At Once Deployment
Consider four EC2 instances running version 1 (blue) of your application. When performing an all at once deployment to version 2:

Elastic Beanstalk stops the application on all instances simultaneously, rendering them unavailable (shown as gray).
It then deploys version 2 to all instances.
This method is very quick but causes downtime since no instances serve traffic during the update. It is suitable for quick iterations or development environments where downtime is acceptable. Additionally, there is no extra cost involved.

Rolling Deployment
In rolling deployments, you update instances in batches called buckets. For example, with four instances and a bucket size of two:

The application on the first two instances is stopped and updated to version 2.
Meanwhile, the other two instances continue running version 1, so the application runs below full capacity.
Once the first batch is healthy, the next batch is updated similarly.
At some point, the application runs both versions simultaneously. There is no additional cost since the total number of instances remains the same. However, a small bucket size with many instances can make the deployment take a long time.

Rolling with Additional Batch
This mode maintains full capacity during deployment by adding temporary instances:

Starting with four version 1 instances, Elastic Beanstalk adds two new instances running version 2.
The first batch of original instances stops the application and updates to version 2.
The process repeats for the remaining instances.
After deployment, the additional batch is terminated.
This approach avoids running below capacity but incurs a small additional cost due to the temporary extra instances. It is suitable for production environments requiring zero downtime.

Immutable Deployment
Immutable deployments provide zero downtime by deploying the new version to new instances in a temporary Auto Scaling Group (ASG):

A temporary ASG is created, and one instance is launched to verify health.
If healthy, the remaining instances are launched.
Once all new instances are ready, they are merged into the current ASG, doubling capacity temporarily.
The old version instances are terminated, and the temporary ASG is removed.
This method doubles capacity during deployment, resulting in higher cost and longer deployment time. However, it allows quick rollback by terminating the new ASG if issues arise, making it ideal for production.

Blue/Green Deployment
Blue/green deployment is not a direct Elastic Beanstalk feature but can be implemented manually:

Deploy a new environment (green) alongside the existing one (blue).
The green environment runs version 2 independently and can be validated and tested.
Using Route 53, traffic can be split between blue and green environments with weighted policies (e.g., 90% to blue, 10% to green).
After testing, swap URLs to make green the main environment and shut down blue.
This method allows zero downtime and thorough testing but requires manual setup and management.

Traffic Splitting for Canary Testing
Traffic splitting supports canary testing by directing a small portion of traffic to a new deployment:

Deploy the new version to a temporary ASG with the same capacity as the main ASG.
For example, with three instances in each ASG, total capacity doubles temporarily.
Configure the Application Load Balancer (ALB) to send a configurable percentage of traffic (e.g., 10%) to the temporary ASG.
Deployment health is monitored automatically.
If issues occur, an automated rollback stops sending traffic to the temporary ASG, avoiding downtime.
Once stable, new instances are migrated to the main ASG, and old versions are terminated.
This method automates canary testing and rollback, improving upon blue/green deployments.

Summary and Recommendations
Elastic Beanstalk documentation provides a comparison table of deployment methods detailing:

Impact of failed deployments
Deployment time
Whether zero downtime is achieved
DNS changes
Rollback processes
Deployment targets
Understanding these deployment options and their trade-offs helps select the appropriate strategy based on your application's requirements and constraints. The exam may present scenario questions testing your knowledge of these deployment mechanisms.

Key Takeaways
Elastic Beanstalk offers multiple deployment options including all at once, rolling, rolling with additional batch, immutable, blue/green, and traffic splitting.
All at once deployment is the fastest but causes downtime as all instances update simultaneously.
Rolling deployments update instances in batches, reducing downtime but running below capacity during updates.
Rolling with additional batch maintains full capacity by adding temporary instances, incurring a small additional cost.
Immutable deployments create a new Auto Scaling Group with the new version, providing zero downtime and quick rollback but at higher cost.
Blue/green deployments involve creating a separate environment for the new version and switching traffic when ready, allowing thorough testing.
Traffic splitting supports canary testing by directing a small percentage of traffic to new instances, enabling automated rollback on failure.
Understanding deployment methods helps select the best strategy based on downtime tolerance, cost, and rollback needs.