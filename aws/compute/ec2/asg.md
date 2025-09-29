What’s an Auto Scaling Group?

• In real-life, the load on your websites and application can change
• In the cloud, you can create and get rid of servers very quickly
• The goal of an Auto Scaling Group (ASG) is to:
• Scale out (add EC2 instances) to match an increased load
• Scale in (remove EC2 instances) to match a decreased load
• Ensure we have a minimum and a maximum number of EC2 instances running
• Automatically register new instances to a load balancer
• Re-create an EC2 instance in case a previous one is terminated (ex: if unhealthy)
• ASG are free (you only pay for the underlying EC2 instances)

Auto Scaling Group in AWS

Auto Scaling Group in AWS With Load Balancer

Auto Scaling Group Attributes
• A Launch Template (older “Launch Configurations” are deprecated)
• AMI + Instance Type
• EC2 User Data
• EBS Volumes
• Security Groups
• SSH Key Pair
• IAM Roles for your EC2 Instances
• Network + Subnets Information
• Load Balancer Information
• Min Size / Max Size / Initial Capacity
• Scaling Policies

Auto Scaling - CloudWatch Alarms & Scaling
• It is possible to scale an ASG based on CloudWatch alarms
• An alarm monitors a metric (such as Average CPU, or a custom metric)
• Metrics such as Average CPU are computed for the overall ASG instances
• Based on the alarm:
• We can create scale-out policies (increase the number of instances)
• We can create scale-in policies (decrease the number of instances)

Auto Scaling Groups – Scaling Policies 
• Dynamic Scaling
• Target Tracking Scaling
• Simple to set-up
• Example: I want the average ASG CPU to stay at around 40%
• Simple / Step Scaling
• When a CloudWatch alarm is triggered (example CPU > 70%), then add 2 units
• When a CloudWatch alarm is triggered (example CPU < 30%), then remove 1
• Scheduled Scaling
• Anticipate a scaling based on known usage patterns
• Example: increase the min capacity to 10 at 5 pm on Fridays
Predictive scaling: continuously forecast load and schedule scaling ahead

Good metrics to scale on
• CPUUtilization: Average CPU
utilization across your instances
• RequestCountPerTarget: to make sure
the number of requests per EC2
instances is stable
• Average Network In / Out (if you’re
application is network bound)
• Any custom metric (that you push
using CloudWatch)

Auto Scaling Groups - Scaling Cooldowns
• After a scaling activity happens, you are in
the cooldown period (default 300
seconds)
• During the cooldown period, the ASG will
not launch or terminate additional
instances (to allow for metrics to stabilize)
• Advice: Use a ready-to-use AMI to reduce
configuration time in order to be serving
request fasters and reduce the cooldown
period

Auto Scaling – Instance Refresh
• Goal: update launch template
and then re-creating all EC2
instances
• For this we can use the native
feature of Instance Refresh
• Setting of minimum healthy
percentage
• Specify warm-up time (how long
until the instance is ready to use)

--- 
Auto Scaling Groups (ASG) Overview
Introduction to Auto Scaling Groups (ASG)
When deploying a website or an application, the load can change over time because more users may visit the website. In AWS, it is possible to create and remove servers quickly using the EC2 instance creation API call. To automate this process, we can create an Auto Scaling Group (ASG).

The goal of an ASG is to scale out, which means adding EC2 instances to match an increased load, or to scale in, which means removing EC2 instances to match a decreased load. Therefore, the size of the ASG varies over time. We can define parameters to ensure a minimum and maximum number of EC2 instances are running at any time within the ASG.

ASGs have additional capabilities when paired with a load balancer. Any EC2 instances that are part of the ASG will be linked to the load balancer. If an instance is deemed unhealthy, it is terminated and replaced by a new EC2 instance automatically. Auto Scaling Groups themselves are free; you only pay for the resources created underneath, such as the EC2 instances.

ASG Capacity Settings
In AWS, when configuring an ASG, you set a minimum capacity, which is the minimum number of instances you want in your ASG (for example, two). You also set a desired capacity (for example, four), which is the target number of instances, and a maximum capacity (for example, seven), which is the maximum number of instances allowed in the ASG.

If you increase the desired capacity but keep it below the maximum capacity, the ASG will scale out by adding EC2 instances as needed, allowing the ASG to grow larger.

Integration with Load Balancers
The ASG works with a load balancer such as an Elastic Load Balancer (ELB). For example, if there are four instances registered in the ASG, the ELB distributes traffic to all these instances immediately, enabling users to access a load-balanced website.

The ELB also performs health checks on EC2 instances. These health checks can be passed on to the ASG, which can terminate instances deemed unhealthy by the load balancer. When scaling out by adding EC2 instances, the ELB will send traffic to the new instances as well, spreading the load evenly. This combination of load balancer and ASG is very effective.

Launch Templates and ASG Attributes
To create an ASG, you need to create a launch template. Previously, launch configurations were used but are now deprecated. A launch template contains information on how to launch EC2 instances within your ASG, including:

Amazon Machine Image (AMI)
Instance type
EC2 user data
EBS volumes
Security groups
SSH key pair
IAM roles for EC2 instances
Network and subnet information
Load balancer information
These parameters are similar to those specified when creating an EC2 instance.

Additionally, the ASG requires defining a minimum size, maximum size, initial capacity, and scaling policies.

Scaling Policies and CloudWatch Alarms
ASGs can scale in and out based on CloudWatch alarms. Although CloudWatch has not been covered yet, it is important to know that it monitors metrics and triggers alarms.

For example, consider an ASG with three EC2 instances. If an alarm is triggered, a scale-out activity occurs. The alarm can be based on metrics such as the average CPU utilization of the ASG. If the average CPU is too high, the alarm triggers, causing the ASG to add EC2 instances automatically. This automatic scaling is why it is called an Auto Scaling Group.

Based on alarms, you can create scale-out policies to increase the number of instances or scale-in policies to decrease the number of instances. These components together compose the ASG functionality.

Summary
Auto Scaling Groups provide a powerful way to automatically adjust the number of EC2 instances in response to changing load, ensuring application availability and efficient resource usage.

Key Takeaways
Auto Scaling Groups (ASGs) automatically adjust the number of EC2 instances to match changing load.
ASGs support scaling out (adding instances) and scaling in (removing instances) within defined minimum and maximum capacities.
ASGs integrate with load balancers to distribute traffic and perform health checks, replacing unhealthy instances automatically.
Scaling policies can be triggered by CloudWatch alarms based on metrics like average CPU utilization, enabling automatic scaling.

Auto Scaling Groups - Scaling Policies
Auto Scaling Group Scaling Policies
There are several scaling policies available for Auto Scaling Groups (ASGs). The first category is dynamic scaling, which includes target tracking scaling. This method is very simple to set up. The idea is that you define a metric for your ASG, for example, CPU utilization, and you specify a target value, such as 40. Automatically, the ASG will scale out or in to maintain this metric around the target value.

Within dynamic scaling, there is also simple or step scaling. In this approach, you define CloudWatch alarms that trigger when you want to add or remove units of capacity to your ASG.

Another scaling policy is scheduled scaling. This is used when you anticipate scaling based on a known usage pattern. For example, you might know that every Friday at 5:00 PM, new users will arrive, so you want to increase the minimum capacity to 10 at that time.

Predictive scaling continuously forecasts load and schedules scaling actions ahead of time. This is particularly useful when you have repeating patterns. The ASG analyzes historical load data, generates a forecast, and schedules scaling actions based on that forecast, which is handy for cyclical data.

Metrics for Scaling
Choosing good metrics to scale on depends on your application's behavior. Common metrics include:

CPU Utilization: Instances use CPU when processing requests. Monitoring average CPU utilization across instances helps determine when to scale.
RequestCountPerTarget: This application-specific metric measures the number of requests per target. For example, if your EC2 instances operate optimally at 1,000 requests per target, you can set this as your scaling target.
For example, if your ASG has three EC2 instances and your Application Load Balancer (ALB) distributes requests evenly, the RequestCountPerTarget metric might be three, indicating each instance has three outstanding requests on average.

If your application is network-bound, such as handling many uploads and downloads, network bandwidth can become a bottleneck. In this case, you might scale based on average network in or out metrics to ensure capacity meets demand.

Additionally, you can push custom metrics to CloudWatch that are specific to your application and use those for scaling policies.

Scaling Cooldown
A key concept in scaling policies is the scaling cooldown period. After a scaling activity, such as adding or removing instances, the ASG enters a cooldown period, which by default lasts five minutes (300 seconds). During this cooldown, the ASG will not launch or terminate additional instances. This allows metrics to stabilize and new instances to become effective before further scaling actions occur.

When a scaling action is triggered, the ASG checks if a cooldown is in effect. If yes, it ignores the action; if no, it proceeds with launching or terminating instances.

To improve scaling responsiveness, it is advisable to use ready-to-use Amazon Machine Images (AMIs) to reduce instance configuration time. This allows instances to serve requests faster, enabling a shorter cooldown period and more dynamic scaling.

Also, enabling detailed monitoring for your ASG provides metrics updates every one minute, ensuring timely data for scaling decisions.

This concludes the lecture on Auto Scaling Group scaling policies.

Key Takeaways
Auto Scaling Groups (ASGs) support various scaling policies: dynamic scaling (including target tracking and step scaling), scheduled scaling, and predictive scaling.
Target tracking scaling maintains a specified metric, such as CPU utilization, at a target value by automatically scaling out or in.
Step scaling uses CloudWatch alarms to trigger capacity changes based on defined thresholds.
Scheduled scaling anticipates scaling actions based on known usage patterns, while predictive scaling forecasts load using historical data to schedule scaling ahead of time.
Common metrics for scaling include CPU utilization, RequestCountPerTarget, network in/out, and custom application-specific metrics.
Scaling cooldown periods prevent rapid scaling actions by enforcing a wait time after each scaling event, typically five minutes.
Using ready-to-use AMIs and enabling detailed monitoring can reduce instance startup time and improve scaling responsiveness.

Auto Scaling Groups - Instance Refresh
Introduction to Instance Refresh
Instance Refresh is a very handy feature of Auto Scaling groups. It enables you to update an entire Auto Scaling group by applying a new launch template that you have created.

Instead of manually terminating an instance and waiting for it to come back, you can use the native feature of Auto Scaling groups called Instance Refresh to automate this process.

Example Scenario
Suppose you have an Auto Scaling group where the EC2 instances were launched using an old launch template. For example, you updated the underlying Amazon Machine Image (AMI) of your EC2 instances and created a new launch template.

You then invoke the API call named Start Instance Refresh to begin the update process.

How Instance Refresh Works
When you start an Instance Refresh, you specify a minimum healthy percentage, for example, 60%. This setting tells the Auto Scaling group how many instances can be deleted over time during the refresh process.

As instances are terminated, new ones are launched using the new launch template. This process continues until all instances with the old launch template are replaced by new instances.

This is why the feature is called EC2 Instance Refresh: instances are being terminated and new ones come up with updated configurations.

Warm-up Time
To ensure that your EC2 instances have enough time to be ready and serve traffic, you can specify a warm-up time. This is the duration to wait until the new EC2 instance is assumed to be ready for use.

Conclusion
That concludes this lecture on Instance Refresh in Auto Scaling groups. This feature simplifies updating EC2 instances with new launch templates while maintaining availability.

Key Takeaways
Instance Refresh is a feature of Auto Scaling groups that allows updating all EC2 instances using a new launch template.
Instead of manually terminating instances and waiting for replacements, Instance Refresh automates the process of terminating old instances and launching new ones.
You can set a minimum healthy percentage to control how many instances can be replaced at a time during the refresh.
A warm-up time can be specified to ensure new instances have enough time to become ready before serving traffic.