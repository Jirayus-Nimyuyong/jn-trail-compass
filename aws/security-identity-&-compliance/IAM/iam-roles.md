IAM Roles for AWS Services

Some AWS service will need to
perform actions on your behalf
• To do so, we will assign
permissions to AWS services
with IAM Roles
• Common roles:
• EC2 Instance Roles
• Lambda Function Roles
• Roles for CloudFormation

---

Introduction to IAM Roles
We need to discuss the last component of IAM, which is called IAM Roles. Some AWS services that we will be launching throughout this course will need to perform actions on our behalf, on our account. To perform these actions, they require permissions just like users do. Therefore, we need to assign permissions to AWS services, and to do so, we create what's called an IAM Role.

IAM Roles are similar to users but are intended to be used not by physical people, but instead by AWS services. This concept might be a bit confusing at first.

Example: EC2 Instance and IAM Role
For example, throughout this course, we will create an EC2 Instance. An EC2 Instance is essentially a virtual server, which we will explore in the next section. This EC2 Instance may want to perform some actions on AWS. To enable this, we need to grant permissions to our EC2 Instance. We do this by creating an IAM Role. Together, the EC2 Instance and the IAM Role form one entity. When the EC2 Instance tries to access some information from AWS, it will use the IAM Role. If the permissions assigned to the IAM Role are correct, then the EC2 Instance will gain access to the AWS calls it is trying to make.

Some common IAM Roles include EC2 Instance roles, Lambda Function Roles, and CloudFormation roles. These roles allow the respective AWS services to perform actions against AWS securely and with proper permissions.

This overview is at a high level. In the next lecture, we will create an IAM Role. However, we will not use it immediately until the following section. Let's proceed to create a role.

Key Takeaways
IAM Roles allow AWS services to perform actions on your behalf with assigned permissions.
IAM Roles function similarly to users but are intended for AWS services, not physical people.
EC2 Instances and other AWS services like Lambda Functions require IAM Roles to access AWS resources securely.
Creating and assigning IAM Roles is essential for managing permissions for AWS services.