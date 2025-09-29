ECS Service Auto Scaling
• Automatically increase/decrease the desired number of ECS tasks
• Amazon ECS Auto Scaling uses AWS Application Auto Scaling
• ECS Service Average CPU Utilization
• ECS Service Average Memory Utilization - Scale on RAM
• ALB Request Count Per Target – metric coming from the ALB
• Target Tracking – scale based on target value for a specific CloudWatch metric
• Step Scaling – scale based on a specified CloudWatch Alarm
• Scheduled Scaling – scale based on a specified date/time (predictable changes)
• ECS Service Auto Scaling (task level) ≠ EC2 Auto Scaling (EC2 instance level)
• Fargate Auto Scaling is much easier to setup (because Serverless)

---
EC2 Launch Type – Auto Scaling EC2 Instances
• Accommodate ECS Service Scaling by adding underlying EC2 Instances
• Auto Scaling Group Scaling
• Scale your ASG based on CPU Utilization
• Add EC2 instances over time
• ECS Cluster Capacity Provider
• Used to automatically provision and scale the infrastructure for your ECS Tasks
• Capacity Provider paired with an Auto Scaling Group
• Add EC2 Instances when you’re missing capacity (CPU, RAM…)

---
Amazon ECS - Auto Scaling
Introduction to ECS Service Auto Scaling
We can manually increase the number of ECS tasks in our service. However, it is also possible to automatically increase or decrease the number of tasks. To achieve this, we leverage the AWS Application Auto Scaling service.

Metrics for Auto Scaling
There are three metrics on which we can scale using this service:

CPU Utilization of the ECS Service.
Memory Utilization, which refers to the RAM usage of the ECS Service.
ALB Request Count Per Target, a metric coming from the Application Load Balancer (ALB).
These are the only metrics you need to remember for setting up auto scaling.

Types of Auto Scaling
You can configure different types of auto scaling:

Target Tracking: Tracks a specific target for any of the three metrics mentioned above.
Step Scaling: Adjusts scaling in steps based on metric thresholds.
Scheduled Scaling: Scales your ECS Service ahead of time based on predictable changes.
Distinction Between Service and Cluster Scaling
Scaling your ECS Service at the task level is not the same as scaling your cluster of EC2 instances if you are using the EC2 launch type. Therefore, when you do not have EC2 instances in the backend, such as when using Fargate, service auto scaling is much easier to set up because everything is serverless. This is one reason why Fargate is preferred and heavily promoted in the exam.

Scaling EC2 Instances in the Backend
For the EC2 launch type, there are multiple ways to scale the EC2 instances in the backend:

Auto Scaling Group (ASG) Scaling: You can scale your ASG based on CPU Utilization. For example, if the CPU usage skyrockets, you can add EC2 instances over time.

ECS Cluster Capacity Provider: This is a newer and more advanced feature. The Capacity Provider is very smart; as soon as you lack capacity to launch new tasks, it automatically scales your ASG. The Capacity Provider is paired with an Auto Scaling Group, and when you are missing RAM or CPU, EC2 instances are created automatically.

The second option is the smarter way of doing things. If you have to choose between Auto Scaling Group Scaling and ECS Cluster Capacity Provider, please use ECS Cluster Capacity Provider for your EC2 launch type.

Example of ECS Service Auto Scaling
Consider a Service A with two tasks and some CPU usage. This service is auto scaled by the AWS Application Auto Scaling. If there are more users and the CPU usage increases significantly, the CloudWatch metric monitoring the CPU usage at the ECS service level will trigger a CloudWatch Alarm. This alarm will trigger a scaling activity in your Auto Scaling for your ECS service. Consequently, the desired capacity will increase for your ECS Service, and a new task will be created.

Optionally, if this service is running on the EC2 launch type, the ECS Capacity Providers can help you scale your ECS cluster backed by EC2 instances.

Key Takeaways
ECS Service Auto Scaling can be configured to automatically adjust the number of tasks based on specific metrics.
The three primary metrics for scaling are CPU Utilization, Memory Utilization, and ALB Request Count Per Target.
Auto Scaling methods include Target Tracking, Step Scaling, and Scheduled Scaling.
For EC2 launch type, ECS Cluster Capacity Provider is the recommended and smarter way to scale EC2 instances automatically.