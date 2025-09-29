ECS + X-Ray integration options

X-Ray & ECS Integration Options
Integrating AWS X-Ray with ECS Clusters
This lecture discusses how to integrate AWS X-Ray with ECS clusters and presents three options for running the X-Ray Daemon within ECS environments.

Option 1: Running the X-Ray Daemon as a Daemon Container on EC2 Instances
In this approach, you have an ECS cluster composed of EC2 instances that you manage. You run the X-Ray Daemon as a Daemon task, meaning one X-Ray Daemon container runs on every EC2 instance in the cluster. For example, if your ECS cluster has 10 EC2 instances, there will be 10 X-Ray Daemon containers, one per instance.

This setup allows the X-Ray agent to run on all EC2 instances. Your application containers run on these instances and are configured from a networking standpoint to communicate with the X-Ray Daemon via a UDP port.

Option 2: Side Car Pattern
The second pattern is the Side Car pattern. Here, you still have your EC2 instances, but instead of one X-Ray Daemon container per instance, you run one X-Ray Daemon container alongside each application container. This means that if you have 20 application containers on a single EC2 instance, you will have 20 X-Ray Daemon Side Car containers running alongside them.

The term "Side Car" refers to the X-Ray Daemon running side-by-side with the application container, providing tracing capabilities per application container.

Option 3: Using X-Ray with Fargate Clusters
In Fargate clusters, you do not have control over the underlying EC2 instances. Therefore, you cannot run the X-Ray Daemon container as a Daemon task on instances. Instead, you must use the Side Car pattern, running the X-Ray Daemon container alongside each application container within the Fargate task.

This means that each Fargate task includes both the application container and the X-Ray Side Car container.

Example Task Definition for X-Ray Side Car Pattern
Although building all images to run this example is complex, here is an overview of an example task definition from the documentation illustrating the Side Car pattern:

The X-Ray Daemon container runs with port 2000 mapped to the instance, using the UDP protocol.
The application container (e.g., Scorekeep API) is configured with an environment variable named AWS_XRAY_DAEMON_ADDRESS.
This environment variable points to the X-Ray Daemon's UDP port 2000.
The two containers are linked from a networking standpoint, allowing the application container to resolve the hostname xray-daemon to the X-Ray Daemon container.
This setup ensures proper communication between the application container and the X-Ray Daemon Side Car.

Important Configuration Details
Map the X-Ray Daemon container port 2000 using UDP.
Set the environment variable AWS_XRAY_DAEMON_ADDRESS in the application container to point to the X-Ray Daemon's address and port.
Link the application container and the X-Ray Daemon container for hostname resolution and networking.
These steps are essential to enable the application container to send trace data to the X-Ray Daemon correctly.

Summary
To integrate AWS X-Ray with ECS:

Use the Daemon container approach on EC2 instances you manage.
Use the Side Car pattern alongside each application container on EC2 instances or Fargate tasks.
Configure networking correctly with port mappings, environment variables, and container linking.
This lecture clarifies common exam questions about running X-Ray with ECS and provides deeper insights into these integration patterns.

Key Takeaways
There are three main options to integrate AWS X-Ray with ECS clusters: running the X-Ray Daemon as a Daemon container on each EC2 instance, using the Side Car pattern alongside each application container, and using the Side Car pattern in Fargate clusters.
The Daemon container approach runs one X-Ray Daemon container per EC2 instance, capturing traces from all app containers on that instance.
The Side Car pattern runs one X-Ray Daemon container alongside each application container, providing isolated tracing per app container.
For Fargate clusters, since there is no control over underlying instances, the Side Car pattern is required to run X-Ray.
Proper networking setup includes mapping container port 2000 UDP for the X-Ray Daemon, setting the AWS_XRAY_DAEMON_ADDRESS environment variable, and linking containers for hostname resolution.