Creating ECS Service - Hands On
Creating an ECS Service
To begin, we need to create an ECS service. However, before doing so, it is necessary to create a task definition.

I will create a new task definition from the task definition panel and assign it a name. The name chosen is nginxdemos-hello.

This task definition uses a Docker image called nginxdemohello from Docker Hub, which will be used in our demo. Hence, the task definition is named accordingly.

Next, we select the infrastructure requirements. We decide whether to launch on Fargate or Amazon EC2 instances. Fargate is a serverless compute option, so we will leave it enabled.

Enabling Fargate allows launching this task and service on serverless compute. For simplicity, we will use AWS Fargate to launch our containers in serverless mode.

We then choose the operating system and architecture. Linux is selected. Next, we specify the task size for our Fargate container. For example, we can select 0.5 or 1 vCPU, up to 16 vCPUs, and adjust memory accordingly.

To keep costs low and the setup simple, we choose 0.5 vCPU and 1 gigabyte of memory.

Next is the task role, which is an IAM role assigned to the task if it needs to make API requests to AWS services. Since this is not required now, we do not specify a task role. However, this is important if containers need AWS access.

The task execution role is left as default. If the ECS task execution role does not exist, it will be created automatically by the ECS service.

Now, we configure the container. The container name is nginxdemos-hello, and the image URL is nginxdemoshello/hello. This image will be pulled automatically from Docker Hub.

We configure port mappings to map port 80 of the container to port 80 on the host, which is the default for nginx. Additional port mappings, resource limits, environment variables, and logging options are left as default.

Fargate provides ephemeral storage, which is set to the default 21 gigabytes. We leave this unchanged and proceed to create the task definition.

After creation, the task definition version appears as 2 for this example, but for new users, it will be version 1.

Launching the ECS Service
Next, we launch this task definition as a service. Navigate to the clusters section, select the demo cluster, and under services, create a new service.

Specify the service details by selecting the task definition family nginxdemoshello and the latest revision, which is 2 in this case. The service name can be kept or changed as desired.

For compute configuration, use the default capacity provider strategy with Fargate to launch services and tasks. The platform version is left as latest.

Set the deployment configuration to have one desired task for now. More tasks can be selected if needed, for example, four tasks for scaling, but one is chosen here to minimize cost.

Leave availability zone rebalancing and deployment options as default. For networking, select the appropriate subnets and create a new security group allowing HTTP traffic from anywhere to access port 80 of the nginx service.

Enable public IP assignment. For load balancing, enable it and create an Application Load Balancer named DemoALBForECS with a listener on port 80. Create a new target group nginxdemosTG on port 80.

Do not configure VPC Lattice or service auto scaling at this point. No volumes are set up. Proceed to create the service.

The service is deployed successfully. Viewing the service shows one desired task running with active status. The service is linked to the target group and the Application Load Balancer.

The target group shows one registered IP address, which is the private IP of the container. The load balancer is active, and its DNS name can be used to access the nginx welcome page, confirming the service is working.

Within the service, viewing tasks shows one running container. Task details include configuration, revision, launch location, private IP, and container logs.

The service events indicate that the task started, registered in the target group, completed deployment, and reached a steady state. Accessing the service with different URIs confirms nginx is functioning as expected.

Scaling the ECS Service
To scale the service, update the desired number of tasks to three, for example, one per availability zone. Keep the task definition and compute configuration unchanged.

After updating, ECS provisions two additional tasks on Fargate automatically. The tasks transition from pending to activating and then running quickly.

Refreshing the service page shows the IP addresses changing with each refresh, indicating the Application Load Balancer is distributing load among all containers.

This demonstrates the power of ECS and Fargate in scaling services seamlessly.

Scaling Down and Cost Management
To save costs, update the service to have zero desired tasks. The service configuration remains, but no containers run.

Also, set the desired capacity of the auto scaling group to zero to ensure no EC2 instances run for ECS.

Verify that all tasks have stopped and review service events to understand ECS actions during the update.

Conclusion
In this session, we created an ECS cluster, defined a task, launched an ECS service on Fargate, scaled the service up and down, and verified load balancing and cost management.

Key Takeaways
Created an ECS task definition named nginxdemos-hello using a Docker image from Docker Hub.
Configured the task to run on AWS Fargate with specified CPU and memory resources.
Launched an ECS service with one task, linked to an Application Load Balancer for port 80 traffic.
Demonstrated scaling the ECS service by increasing the number of tasks and verified load balancing.
Showed how to scale down the service to zero tasks to save costs while keeping the service configuration.