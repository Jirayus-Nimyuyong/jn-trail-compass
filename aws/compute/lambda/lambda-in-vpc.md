Lambda by default

• By default, your Lambda function is
launched outside your own VPC (in
an AWS-owned VPC)
• Therefore it cannot access resources
in your VPC (RDS, ElastiCache,
internal ELB…)

---

Lambda in VPC
• You must define the VPC ID, the
Subnets and the Security Groups
• Lambda will create an ENI (Elastic
Network Interface) in your subnets
• AWSLambdaVPCAccessExecutionRol
e

---

Lambda in VPC – Internet Access

• A Lambda function in your VPC
does not have internet access
• Deploying a Lambda function in
a public subnet does not give it
internet access or a public IP
• Deploying a Lambda function in a
private subnet gives it internet
access if you have a NAT
Gateway / Instance
• You can use VPC endpoints to
privately access AWS services
without a NAT

---

Lambda in VPC
Introduction to Lambda Networking
By default, your Lambda functions are launched outside of your own Virtual Private Cloud (VPC). Instead, they run in another VPC that AWS owns. Therefore, these Lambda functions cannot access resources that belong inside your VPC.

What is a VPC and Why Use It?
Your VPC could contain resources such as EC2 instances, RDS databases, ElastiCache clusters, or internal Elastic Load Balancers. By default, Lambda deployments look like this:

The Lambda function runs in the cloud outside your VPC.
It can access any public websites.
It can access external APIs.
It can access other AWS services such as DynamoDB.
However, if you have your own VPC with private subnets and private resources like an RDS database, Lambda functions cannot access those resources by default.

Deploying Lambda Functions Inside a VPC
To allow Lambda functions to access resources inside your VPC, you can deploy them within your VPC. For this, you must:

Define your VPC ID.
Specify the subnets.
Assign a security group to your Lambda function.
Behind the scenes, the Lambda function will create an Elastic Network Interface (ENI) in the selected subnets. To create this ENI, your Lambda function requires a Lambda VPC Access Execution Role.

How Lambda Accesses Resources Inside the VPC
Consider a private subnet containing your Amazon RDS database secured by an RDS security group. When you configure your Lambda function with VPC access:

It creates an ENI alongside the Lambda security group.
The Lambda function accesses your RDS database through this ENI.
This process is invisible to you but happens behind the scenes. For this to work, ensure that the RDS security group allows network access from the Lambda security group, similar to how EC2 instances and load balancers are configured.

Internet Access Considerations for Lambda in VPC
A key caveat is that Lambda functions deployed inside your VPC do not have internet access by default. You might ask:

Can I deploy my Lambda function in a public subnet to get internet access?
While public subnets provide internet access for EC2 instances, this is not true for Lambda functions. Deploying a Lambda function in a public subnet does not assign it a public IP or internet access.

Enabling Internet Access for Lambda in VPC
To provide internet access to a Lambda function deployed in a private subnet, you must use a NAT gateway or NAT instance. The setup is as follows:

Lambda function runs in a private subnet.
To access external APIs, traffic routes through a NAT gateway or NAT instance located in a public subnet.
The NAT device communicates with the internet gateway of your VPC.
The internet gateway provides access to the external internet.
All of this is configured through your route tables and VPC settings.

Accessing DynamoDB from Lambda in VPC
You can access DynamoDB from your Lambda function in two ways:

Through the public route and internet gateway, which requires a NAT device in place.
Privately, using VPC endpoints.
VPC endpoints allow you to access private AWS services within your cloud without requiring a NAT device or internet gateway. For DynamoDB, you create a VPC endpoint of type gateway. The Lambda function communicates with this endpoint to access DynamoDB privately.

Additional Notes
If you deploy a Lambda function in a private subnet, CloudWatch Logs continue to work even if you have no VPC endpoints or NAT gateway configured.
This concludes the theoretical overview of Lambda networking in VPCs. Next, we will proceed to the hands-on section.

Key Takeaways
Lambda functions are launched outside your own VPC by default and cannot access resources within your VPC.
To enable Lambda functions to access VPC resources like RDS, you must configure the Lambda with your VPC ID, subnets, and security groups, which creates an Elastic Network Interface (ENI).
Lambda functions deployed inside a VPC do not have internet access by default; to enable internet access, you must route traffic through a NAT gateway or NAT instance.
VPC endpoints allow Lambda functions to access AWS services like DynamoDB privately without requiring internet access or NAT devices.