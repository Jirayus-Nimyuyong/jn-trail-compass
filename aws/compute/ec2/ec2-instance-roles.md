EC2 Instance Roles Demo
Introduction to Using IAM Roles with EC2 Instances
In this demonstration, we will practice using IAM roles for our EC2 instance. First, I will connect to my EC2 instance. You can connect either by SSH or by using EC2 Instance Connect. I will use EC2 Instance Connect because it is accessible directly in the web browser and is simpler.

We are now connected to the instance using EC2 Instance Connect. As you can see, we are logged in as the user ec2-user with the private IP address assigned. Regardless of whether you use EC2 Instance Connect, SSH through your terminal, or PuTTY, you will reach the same stage.

At this point, you can run Linux commands. For example, you can ping Google to get some information. To exit the ping command, press Control + C. You can issue any Linux commands you want here. This is a Linux terminal available to you in the cloud.

Next, we will run some AWS IAM commands. The Amazon Linux AMI we are using comes with the AWS CLI pre-installed, as you can verify. We can start using AWS commands immediately.

For example, if we run aws iam list users, the CLI responds with an error stating it is unable to locate credentials. It suggests configuring credentials by using aws configure.

We could run aws configure to specify an Access Key ID, a Secret Access Key, and a region name. However, this is a very bad idea. If you enter your personal credentials on this EC2 instance, anyone else with access to the instance could retrieve these credentials, which is a serious security risk.

As a rule of thumb, never enter your IAM Access Key ID and Secret Access Key directly into an EC2 instance. This practice is highly discouraged and insecure.

Instead, we should use IAM roles. Recall that in the AWS Management Console under IAM, we created an IAM role named DemoRoleForEC2 with the policy IAMReadOnlyAccess attached.

We will attach this IAM role to our EC2 instance to provide it with credentials securely. To do this, navigate to the EC2 instance's Security tab. Currently, there is no IAM role attached to the instance.

Go back to the Instances page, select the instance, then choose Actions > Security > Modify IAM role. Here, select the IAM role DemoRoleForEC2 and click Save to attach it to the instance.

After attaching the role, if you return to the Security tab, you will see that the IAM role DemoRoleForEC2 is now attached to the instance.

Now, if you run the command aws iam list users again, it will return the list of IAM users. Notice that we did not run aws configure to set credentials. The attached IAM role provides the necessary permissions.

To demonstrate the effect of the role, if you detach the IAMReadOnlyAccess policy from the role and run the command again, you will receive an Access Denied error. This confirms that the role is linked to the EC2 instance and controls permissions.

This is how AWS credentials are securely provided to EC2 instances—only through IAM roles. If you reattach the IAMReadOnlyAccess policy and run the command again, it may take a short time for the changes to propagate. After propagation, the command will succeed again.

Summary
Using IAM roles for EC2 instances is essential for security. Avoid embedding credentials directly on instances. Instead, assign roles with appropriate permissions to manage access securely and efficiently.

Thank you for following this hands-on demonstration. I hope this was helpful, and I will see you in the next lecture.

Key Takeaways
Never enter your IAM Access Key ID and Secret Access Key directly into an EC2 instance.
Use IAM roles to securely provide AWS credentials to EC2 instances.
Attaching an IAM role to an EC2 instance allows AWS CLI commands to execute with the permissions of that role.
Changes to IAM role permissions may take some time to propagate and reflect on the instance.