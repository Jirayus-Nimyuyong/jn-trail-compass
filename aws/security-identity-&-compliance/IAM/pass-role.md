Granting a User Permissions to Pass a Role to
an AWS Service

• To configure many AWS services, you must pass an IAM role to the service
(this happens only once during setup)
• The service will later assume the role and perform actions
• Example of passing a role:
• To an EC2 instance
• To a Lambda function
• To an ECS task
• To CodePipeline to allow it to invoke other services
• For this, you need the IAM permission iam:PassRole
• It often comes with iam:GetRole to view the role being passed

---

IAM PassRole example

---

Can a role be passed to any service?

• No: Roles can only be passed to what their trust allows
• A trust policy for the role that allows the service to assume the role

---

Granting a User Permissions to Pass a Role to an AWS Service
Introduction to Passing Roles in AWS
Another important feature in IAM is the ability to pass roles to AWS services. This is a crucial concept for understanding AWS permissions and service interactions.

When configuring many AWS services, IAM roles are provided to them. These roles are passed to the services, usually during the initial setup. Once a service has an IAM role, it can assume the role and perform the actions it needs.

For example, when creating an EC2 instance role and assigning it to the EC2 instance, the role is passed to the instance. Similarly, when creating an IAM role for a Lambda function, the role is passed so that the function can, for example, call Amazon S3. The same applies to ECS tasks or when passing a role to CodePipeline to allow it to invoke other services.

Required Permissions for Passing Roles
To pass a role to another AWS service, the IAM permission iam:PassRole is required. Often, the iam:GetRole permission is also needed to view the role being passed.

The key point is that to pass a role to another service, the iam:PassRole permission is necessary.

Example IAM Policy for Passing Roles
A typical IAM policy that allows passing a role might look like the following:

json Code Sample
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Action": "ec2:*",
      "Resource": "*"
    },
    {
      "Effect": "Allow",
      "Action": "iam:PassRole",
      "Resource": "arn:aws:iam::account-id:role/S3Access"
    }
  ]
}
If this IAM policy is assigned to a user, it allows all EC2 actions, such as creating and terminating instances. The second statement allows passing only the role named S3Access to EC2 instances. The only role that can be assigned to EC2 instances is the S3Access role, and the iam:PassRole action is required to do this.

Trust Policies and Role Assumption
Not every role can be passed to any service. Roles can only be passed to services based on what their trust policy allows. A trust policy for a role indicates which service can assume that role.

json Code Sample
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Principal": {
        "Service": "ec2.amazonaws.com"
      },
      "Action": "sts:AssumeRole"
    }
  ]
}
This trust policy example specifies that only the EC2 service (ec2.amazonaws.com) is trusted to assume the role. This trust relationship is configured in the IAM console under the role's trust relationships.

Viewing Trusted Entities in IAM
In the IAM console, under roles, each role lists its trusted entity. This specifies which service is allowed to assume the role. For example, the trusted entity for a CodePipeline role would be codepipeline.amazonaws.com.

Similarly, for a Lambda function, the trusted entity would be lambda.amazonaws.com. The trust relationship is visible in the JSON policy document under the Trust relationships tab.

Summary of Passing Roles
To pass a role, first create the correct trust relationship to allow the target service to assume the role. Then, ensure the user or service has the iam:PassRole permission to pass the role to the target service.

Key Takeaways
Passing a role to an AWS service requires the iam:PassRole permission.
The trust policy of a role determines which AWS service can assume that role.
Only roles with the correct trust relationship can be passed to specific services.
IAM policies and trust relationships work together to control access and permissions in AWS.