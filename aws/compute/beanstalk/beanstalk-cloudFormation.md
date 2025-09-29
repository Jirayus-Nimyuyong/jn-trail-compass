Elastic Beanstalk Under the Hood

• Under the hood, Elastic Beanstalk relies on CloudFormation
• CloudFormation is used to provision other AWS services (we’ll see later)

• Use case: you can define CloudFormation resources in your
.ebextensions to provision ElastiCache, an S3 bucket, anything you want!
• Let’s have a sneak peak into it!

---

Beanstalk & CloudFormation
Introduction to Elastic Beanstalk and CloudFormation
Let's take a look under the hood at how Elastic Beanstalk works. Underneath, Beanstalk relies on a service called CloudFormation. We will explore CloudFormation later in this course, but as a sneak peek, CloudFormation is used to provision other AWS services, enabling infrastructure as code.

Elastic Beanstalk uses CloudFormation as its foundation to perform many of its operations. The reason I mention this is because by using CloudFormation resources in your .ebextensions folder, which we saw earlier, you can provision virtually anything you want.

For example, you can provision an ElastiCache cluster, an S3 bucket, a DynamoDB table, or any other AWS resource. You will see this capability demonstrated in this course. The great advantage is that although the Elastic Beanstalk UI only allows you to configure a few things, with .ebextensions and CloudFormation, you can configure anything you want in your AWS environment.

Exploring CloudFormation Stacks Created by Elastic Beanstalk
Let's take a sneak peek to see how CloudFormation is used during this session. I am currently in the Beanstalk console, where we have our application with two environments.

Now, I will navigate to the CloudFormation console to show you what happens behind the scenes. In CloudFormation, I can see two stacks. Don't worry about the unrelated one. The two relevant stacks are named eb-e-stack and eb-e-stacks.

These stacks are different. The first stack corresponds to the -en environment, and the other corresponds to the -prod environment. Let's keep it simple and look at the -en stack first.

By clicking on the stack, it corresponds to a CloudFormation template. You can view the entire template by clicking on the "Template" tab. You do not need to understand how to read this right now; we will learn about it later in this course.

The useful part is the "Resources" tab, which shows everything this CloudFormation stack has created for us. For example, it has created an autoscaling group, an autoscaling group launch configuration, an Elastic IP (EIP), an EC2 security group, and wait conditions, which we can ignore for now.

If we look at the other stack, the -prod stack, it has created 16 resources. These include an autoscaling group, a launch configuration, multiple scaling policies, CloudWatch alarms used for scaling policies, EC2 security groups, an elastic load balancer, listener rules, and a target group.

Summary
CloudFormation is used behind the scenes to provision our Elastic Beanstalk environments. While we do not need to interact directly with CloudFormation, knowing that it is the underlying mechanism allows us to extend our Elastic Beanstalk applications by deploying additional AWS resources such as ElastiCache, DynamoDB, or S3 buckets.

This capability enables us to expand our Elastic Beanstalk applications to include any AWS resources we require. That concludes this review. I hope you found it helpful.

Key Takeaways
Elastic Beanstalk relies on CloudFormation to provision AWS resources as infrastructure as code.
Using .ebextensions with CloudFormation, you can provision additional AWS services like ElastiCache, S3 buckets, and DynamoDB tables.
CloudFormation stacks created by Elastic Beanstalk manage resources such as autoscaling groups, security groups, load balancers, and scaling policies.
Understanding CloudFormation enables expanding Elastic Beanstalk applications beyond the UI's limited configuration options.