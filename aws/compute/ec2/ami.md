AMI Overview

• AMI = Amazon Machine Image
• AMI are a customization of an EC2 instance
• You add your own software, configuration, operating system, monitoring…
• Faster boot / configuration time because all your software is pre-packaged
• AMI are built for a specific region (and can be copied across regions)
• You can launch EC2 instances from:
• A Public AMI: AWS provided
• Your own AMI: you make and maintain them yourself
• An AWS Marketplace AMI: an AMI someone else made (and potentially sells)

AMI Process (from an EC2 instance)
• Start an EC2 instance and customize it
• Stop the instance (for data integrity)
• Build an AMI – this will also create EBS snapshots
• Launch instances from other AMIs

---
AMI Overview
Introduction to AMIs
Now let's talk about what powers our EC2 instances, which is an AMI. AMI stands for Amazon Machine Image, and it represents a customization of an EC2 instance.

You can use AMIs created by AWS, or you can customize your own. What is in an AMI? It contains your own software configuration. You can define and set up the operating system, set up any monitoring tools, and more.

If you create your own AMI, you will get faster boot time and configuration time because all the software that you want to install onto your EC2 instance is prepackaged through the AMI.

Therefore, we have to build our own AMIs. They can be built for a specific region and then copied across regions if we want to use them and leverage the AWS global infrastructure.

We can launch EC2 instances from different kinds of AMIs. What we've been doing so far in this course is using a public AMI, which is provided by AWS. For example, the Amazon Linux 2 AMI is a very popular AMI provided by AWS themselves.

However, we can create our own AMI, which means you have to make and maintain them yourself. There are tools to automate this, but it is a task that you have to do as a cloud user.

Finally, you can launch an EC2 instance from an AWS Marketplace AMI, which is an AMI made by someone else and potentially sold by someone else. It is quite common for vendors on AWS to create their own AMIs or software with nice configurations and sell them through the Marketplace AMI for you to buy and save time.

Even you, as a user, could create a business of selling AMIs on the AWS Marketplace. This is something that some businesses do.

AMI Creation Process
How does the AMI process work from an EC2 instance? We start an EC2 instance and customize it. Then, we stop the instance to ensure data integrity is correct. After that, we build an AMI from it, which also creates EBS snapshots behind the scenes. Finally, we can launch instances from other AMIs.

For example, we have US-EAST-1A, and we can create the same instance as US-EAST-1B. The process is: we launch the instance in US-EAST-1A, customize it, then create an AMI from it. This will be our custom AMI. Then, in US-EAST-1B, we can launch from that AMI and effectively create a copy of our EC2 instance.

I hope you are excited, and I will see you in the next lecture.

Key Takeaways
An AMI (Amazon Machine Image) customizes EC2 instances by prepackaging software and configurations.
AMIs can be created by AWS, customized by users, or purchased from the AWS Marketplace.
Creating your own AMI results in faster boot and configuration times for EC2 instances.
AMIs can be region-specific but are copyable across AWS regions to leverage global infrastructure.
