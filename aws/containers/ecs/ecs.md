Amazon ECS - EC2 Launch Type
• ECS = Elastic Container Service
• Launch Docker containers on AWS =
Launch ECS Tasks on ECS Clusters
• EC2 Launch Type: you must provision
& maintain the infrastructure (the
EC2 instances)
• Each EC2 Instance must run the ECS
Agent to register in the ECS Cluster
• AWS takes care of starting / stopping
containers

---
Amazon ECS – Fargate Launch Type
• Launch Docker containers on AWS
• You do not provision the infrastructure
(no EC2 instances to manage)
• It’s all Serverless!
• You just create task definitions
• AWS just runs ECS Tasks for you based
on the CPU / RAM you need
• To scale, just increase the number of
tasks. Simple - no more EC2 instances

---
Amazon ECS – IAM Roles for ECS
• EC2 Instance Profile (EC2 Launch Type
only):
• Used by the ECS agent
• Makes API calls to ECS service
• Send container logs to CloudWatch Logs
• Pull Docker image from ECR
• Reference sensitive data in Secrets Manager or
SSM Parameter Store
• ECS Task Role:
• Allows each task to have a specific role
• Use different roles for the different ECS Services
you run
• Task Role is defined in the task definition

---
Amazon ECS – Load Balancer Integrations
• Application Load Balancer supported
and works for most use cases
• Network Load Balancer recommended
only for high throughput / high
performance use cases, or to pair it with
AWS Private Link
• Classic Load Balancer supported but
not recommended (no advanced
features – no Fargate)

---
• Mount EFS file systems onto ECS tasks
• Works for both EC2 and Fargate launch types
• Tasks running in any AZ will share the same data
in the EFS file system
• Fargate + EFS = Serverless
• Use cases: persistent multi-AZ shared storage for
your containers
• Note:
• Amazon S3 cannot be mounted as a file system

---
Amazon ECS
Introduction to Amazon ECS
Amazon ECS stands for Elastic Container Service. When you launch Docker containers on AWS, you are launching what is called an ECS Task on an ECS Cluster. An ECS Cluster is composed of several components depending on the launch type you choose.

EC2 Launch Type Overview
With the EC2 Launch Type, the ECS Cluster is composed of EC2 instances. In this case, you must provision and maintain the infrastructure yourself. Your Amazon ECS Cluster will consist of multiple EC2 instances.

Each EC2 instance runs the ECS Agent, which registers the instance into the Amazon ECS service and the specified ECS Cluster. Once this setup is in place, when you start ECS tasks, AWS will start or stop the containers accordingly.

Whenever there is a new Docker container, it will be placed on the EC2 instances over time. You can start or stop ECS tasks, and they will be placed automatically on the instances.

In summary, with the EC2 Launch Type, Docker containers are placed on Amazon EC2 instances that you provision in advance.

Fargate Launch Type Overview
The second launch type is the Fargate Launch Type. Here, you launch Docker containers on AWS without provisioning any infrastructure. There are no EC2 instances to manage; it is entirely serverless.

Although servers exist behind the scenes, you do not manage them. In the Fargate launch type, you create task definitions to define your ECS tasks. AWS runs these ECS tasks for you based on the CPU and RAM requirements you specify.

When you want to run a new Docker container, it will run without you knowing where it is executed and without any EC2 instance being created in your account.

Scaling is simple: you just increase the number of tasks without managing any EC2 instances.

The Fargate launch type is preferred for its serverless nature and ease of management.

IAM Roles for ECS Tasks
EC2 Instance Profile Role
In the EC2 Launch Type, each EC2 instance running the ECS Agent uses an EC2 Instance Profile. This profile allows the ECS Agent to make API calls to the ECS service, CloudWatch Logs for container logging, ECR to pull Docker images, and to reference sensitive data in Secrets Manager or the SSM Parameter Store.

ECS Task Roles
ECS tasks themselves have ECS Task Roles, which are applicable for both EC2 Launch Type and Fargate.

You can create specific roles per task. For example, Task A can have an ECS Task A Role, and Task B can have a Task B Role. Different roles allow tasks to access different AWS services. For instance, Task A's role might allow API calls to Amazon S3, while Task B's role allows API calls to DynamoDB.

You define the Task Role in the task definition of your ECS service.

Remember the distinction between the EC2 Instance Profile Role used by ECS Agents and the ECS Task Role used by ECS tasks.

Load Balancer Integrations
In both EC2 Launch Type and Fargate, you can run multiple ECS tasks within an ECS Cluster. To expose these tasks as HTTP or HTTPS endpoints, you can place an Application Load Balancer (ALB) in front of them.

Users connect to the ALB, which routes traffic to the ECS tasks directly.

The Application Load Balancer supports most use cases and is a good choice.

The Network Load Balancer (NLB) is recommended only for very high throughput or high-performance use cases, or when used with AWS PrivateLink.

The older Classic Load Balancer can be used but is not recommended because it lacks advanced features and cannot be linked to Fargate.

The Application Load Balancer works with both EC2 and Fargate launch types.

Data Persistence on Amazon ECS
To provide persistent data storage for ECS tasks, you use Data Volumes. One notable option is Amazon Elastic File System (EFS).

EFS is a network file system compatible with both EC2 and Fargate launch types. It allows you to mount a file system directly onto ECS tasks.

Tasks running in any Availability Zone linked to the Amazon EFS file system share the same data and can communicate via the file system if needed.

The ideal combination is to use Fargate to launch ECS tasks in a serverless fashion and Amazon EFS for persistent file system storage.

EFS is also serverless, requiring no server management, and is pay-as-you-go.

Use cases for EFS with ECS include persistent multi-AZ shared storage for containers.

Key Takeaways
Amazon ECS supports two launch types: EC2 Launch Type and Fargate Launch Type.
EC2 Launch Type requires provisioning and maintaining EC2 instances running the ECS Agent.
Fargate Launch Type is serverless, removing the need to manage infrastructure.
ECS uses IAM roles: EC2 Instance Profile for ECS Agents and ECS Task Roles for individual tasks.
Application Load Balancer is recommended for ECS tasks, with Network Load Balancer for high throughput scenarios.
Amazon EFS provides persistent, shared storage compatible with both EC2 and Fargate launch types.