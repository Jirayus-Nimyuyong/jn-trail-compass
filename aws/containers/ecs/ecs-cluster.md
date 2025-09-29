Creating ECS Cluster - Hands On
Creating an ECS Cluster - Hands On
In this session, we will practice using Amazon ECS by navigating to the ECS console service and enabling the new ECS experience from the top left corner.

Next, we proceed to the Clusters section to create our first cluster. We will name this cluster DemoCluster and keep the default namespace unchanged.

Infrastructure Options
There are three infrastructure options available:

AWS Fargate: This option allows us to provide containers to AWS, and AWS runs these containers on demand. It is a serverless option where AWS manages the compute resources, which are not visible to us.

Amazon EC2 Instances: Here, we provide our own Amazon EC2 instances to run containers.

External Instances (ECS Anywhere): This option enables running ECS containers on your own data center or external infrastructure.

For this demo, we will enable both Fargate and Amazon EC2 instances. We will create a new auto scaling group for the EC2 instances.

EC2 Instance Configuration
Operating System: Amazon Linux 2 (or Amazon Linux 2023 as an alternative).
EC2 Instance Type: t2.micro, which is eligible for the free tier.
Desired Capacity: Minimum 0, Maximum 5.
SSH Key Pair: None configured.
Root EBS Volume Size: Default settings retained.
Network Settings
VPC: Default VPC.
Subnets: The three available subnets.
Security Group: Existing default security group.
Auto-assign Public IP: Default subnet setting.
We will not modify monitoring or tags for this setup.

After specifying these configurations, we click Create to initiate the cluster creation process.

Monitoring Auto Scaling Group Creation
While the cluster is being created, we can observe the auto scaling group in the AWS console under Auto Scaling Groups. An auto scaling group named Infra-ECS-Cluster is created with:

Desired Capacity: 0
Minimum Capacity: 0
Maximum Capacity: 5
This group spans three availability zones, ensuring ECS tasks can be launched across them.

Once the cluster creation completes, we can explore the DemoCluster. Initially, there are zero services and zero tasks since nothing has been launched yet.

ECS Cluster Infrastructure
Within the cluster, under the infrastructure section, we find three capacity providers:

FARGATE: Allows launching Fargate tasks on the ECS cluster.
FARGATE_SPOT: Enables launching Fargate tasks using spot instances.
ASGProvider: Allows launching EC2 instances directly through the auto scaling group (ASG).
Currently, the ASGProvider has a managed scaling size of zero, which can be adjusted.

To demonstrate, we can edit the desired capacity of the ASGProvider to one. This action will create an EC2 instance that registers itself with the DemoCluster as a container instance.

Once the EC2 instance is running and registered, it appears under container instances in the cluster. This instance can then run ECS tasks launched on it.

Currently, the instance is a t2.micro with 1,024 CPU units and 982 MB of memory available. Tasks can be launched on this instance until its capacity is fully utilized.

Summary
We have successfully created an ECS cluster with multiple capacity providers and registered EC2 container instances. This setup allows launching ECS tasks either on Fargate or on EC2 instances managed by the auto scaling group.

In the next session, we will proceed to run our first ECS service.