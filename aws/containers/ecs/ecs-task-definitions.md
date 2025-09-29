Amazon ECS – Task Definitions
• Task definitions are metadata in JSON form to tell
ECS how to run a Docker container
• It contains crucial information, such as:
• Image Name
• Port Binding for Container and Host
• Memory and CPU required
• Environment variables
• Networking information
• IAM Role
• Logging configuration (ex CloudWatch)
• Can define up to 10 containers in a Task Definition

---
Amazon ECS – Load Balancing (EC2 Launch Type)
• We get a Dynamic Host
Port Mapping if you define
only the container por t in
the task definition
• The ALB finds the right
port on your EC2
Instances
• You must allow on the
EC2 instance’s Security
Group any por t from the
ALB’s Security Group
---

Amazon ECS – Load Balancing (Fargate)
• Each task has a unique
private IP
• Only define the container
por t (host port is not
applicable)

• Example
• ECS ENI Security Group
• Allow port 80 from the ALB
• ALB Security Group
• Allow port 80/443 from web

---
Amazon ECS – Environment Variables
• Environment Variable
• Hardcoded – e.g., URLs
• SSM Parameter Store – sensitive variables (e.g., API keys, shared configs)
• Secrets Manager – sensitive variables (e.g., DB passwords)
• Environment Files (bulk) – Amazon S3

---
Amazon ECS – Data Volumes (Bind Mounts)
• Share data between multiple containers in the
same Task Definition
• Works for both EC2 and Fargate tasks
• EC2 Tasks – using EC2 instance storage
• Data are tied to the lifecycle of the EC2 instance
• Fargate Tasks – using ephemeral storage
• Data are tied to the container(s) using them
• 20 GiB – 200 GiB (default 20 GiB)
• Use cases:
• Share ephemeral data between multiple containers
• “Sidecar” container pattern, where the “sidecar”
container used to send metrics/logs to other
destinations (separation of conerns)

---
Amazon ECS Task Definitions - Deep Dive
Amazon ECS Task Definitions - Deep Dive
Amazon ECS task definitions are defined in JSON format. While you can write the JSON manually, the AWS console provides a user interface to help create the JSON. The task definition instructs the ECS service on how to run one or multiple Docker containers on ECS.

There is crucial information within your task definition, such as:

The Image Name
The Port Binding for the Container and the Host (if using EC2)
The memory and CPU required for your container
Environment variables
Networking information
The IAM role attached to the task definition
The logging configuration, such as CloudWatch
These are the most important fields, and the exam will test you on some of these aspects. This lecture provides a deep dive into some of these components.

Example Scenario
Consider an EC2 instance registered with an ECS cluster. This instance must be running the ECS agent. We want to run a Docker container through an ECS task definition, for example, an Apache HTTP server. To expose that server to the internet, we define a container port 80, which is the port exposing the HTTP server inside the container.

Since we are on EC2, we also define a host port. This host port could be 80 or 8080; they do not have to be the same. The host port allows external network communication to access the EC2 instance on that port, which is then directed to the container port 80, granting access to the HTTP server.

You can define more than one container per task definition, up to 10 containers. This flexibility allows you to run multiple containers within the same task.

Container Port and Dynamic Host Port Mapping
If you have load balancing and use the EC2 launch type, you can use Dynamic Host Port Mapping by defining only the container port in the task definition and setting the host port to zero (meaning not set).

In this case, each ECS task running on the EC2 instance will have the container port set to 80, but the host port will be dynamically assigned a random port. This means each ECS task is accessible from a different port on the EC2 instance.

Although this dynamic port assignment might seem to complicate the Application Load Balancer's (ALB) ability to connect to ECS tasks, the ALB, when linked to an ECS service, automatically knows how to find the correct port thanks to the Dynamic Host Port Mapping feature.

This setup works with the ALB but does not work with a Classic Load Balancer, which is an older generation load balancer. From a security perspective, the EC2 instance's security group must allow inbound traffic on any port from the ALB's security group because the host port is not known in advance.

Fargate Launch Type Port Configuration
When using the Fargate launch type, each ECS task receives a unique private IP address through an Elastic Network Interface (ENI). Since there is no host in this model, you only define container ports.

For example, if you have four tasks, each task gets its own private IP and the same container ports. The ALB connects to all tasks on the same port, such as port 80.

The ECS ENI security group must allow inbound traffic on the container port (e.g., port 80) from the ALB security group. The ALB security group, in turn, allows inbound traffic on port 80 or 443 (if SSL is enabled) from the internet.

IAM Roles in ECS
IAM roles are assigned per task definition. You define an ECS task role in the task definition, which allows ECS tasks launched from that task definition to assume the role and access AWS services such as Amazon S3.

When you create an ECS service from this task definition, each ECS task automatically inherits the ECS task role.

It is important to note that the IAM role is defined at the task definition level, not at the service level. Therefore, all tasks within your service get access to the permissions granted by the task role.

You can define different task definitions with different IAM roles, allowing different services to assume different roles as needed.

Environment Variables in Task Definitions
Task definitions can include environment variables, which can be sourced from multiple places:

Hardcoded directly in the task definition for fixed, non-secret values.
Stored securely in AWS Systems Manager Parameter Store or AWS Secrets Manager for sensitive data such as API keys or database passwords.
Referenced in the task definition and fetched at runtime, where they are injected as environment variables into the ECS task.
Loaded in bulk from an Amazon S3 bucket as a file containing environment variables.
This flexibility allows secure and manageable configuration of ECS tasks.

Sharing Data Between ECS Tasks
An ECS task can contain one or multiple containers. Multiple containers in the same task definition are common, especially when using sidecar containers for logging, tracing, or metrics.

To share data between containers within the same task, you mount a data volume (bind mount) onto both containers. This shared storage allows containers to read and write files accessible to each other.

For EC2 tasks, the bind mount uses the EC2 instance's storage, so the data lifecycle is tied to the EC2 instance's lifecycle.

For Fargate tasks, ephemeral storage is used, and the data lifecycle is tied to the container's lifecycle. When the Fargate task stops, the storage is deleted.

Fargate provides between 20 GB and 200 GB of shared storage, supporting various use cases.

This setup is particularly useful when sidecar containers need to send metrics or logs by reading from shared storage written by application containers.

Conclusion
This concludes the deep dive into Amazon ECS task definitions. Understanding task definitions, port mappings, IAM roles, environment variables, and data sharing between containers is essential for effectively deploying and managing containers on ECS.

Thank you for following this lecture. I look forward to seeing you in the next one.

Key Takeaways
Amazon ECS task definitions specify how to run one or multiple Docker containers on ECS, including crucial details like image name, port bindings, CPU, memory, environment variables, IAM roles, and logging configuration.
For EC2 launch type, container ports map to host ports, which can be dynamic when using load balancing with an Application Load Balancer (ALB), enabling ALB to route traffic correctly.
For Fargate launch type, each task gets a unique private IP and only container ports are defined; ALB connects to tasks on the same port.
IAM roles are assigned at the task definition level, allowing ECS tasks to assume roles for accessing AWS services like S3 or DynamoDB.
Environment variables in task definitions can be hardcoded, sourced from SSM Parameter Store or Secrets Manager, or loaded in bulk from an S3 bucket.
Data sharing between containers in the same task is achieved by mounting shared data volumes (bind mounts), applicable to both EC2 and Fargate tasks.