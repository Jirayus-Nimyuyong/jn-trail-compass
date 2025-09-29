
Amazon EC2
EC2 is one of the most popular of AWS’ offering
• EC2 = Elastic Compute Cloud = Infrastructure as a Service
• It mainly consists in the capability of :
• Renting virtual machines (EC2)
• Storing data on virtual drives (EBS)
• Distributing load across machines (ELB)
• Scaling the services using an auto-scaling group (ASG)
• Knowing EC2 is fundamental to understand how the Cloud works

---
EC2 sizing & configuration options
• Operating System (OS): Linux, Windows or Mac OS
• How much compute power & cores (CPU)
• How much random-access memory (RAM)
• How much storage space:
• Network-attached (EBS & EFS)
• hardware (EC2 Instance Store)
• Network card: speed of the card, Public IP address
• Firewall rules: security group
• Bootstrap script (configure at first launch): EC2 User Data

---

EC2 User Data
• It is possible to bootstrap our instances using an EC2 User data script.
• bootstrapping means launching commands when a machine starts
• That script is only run once at the instance first start
• EC2 user data is used to automate boot tasks such as:
• Installing updates
• Installing software
• Downloading common files from the internet
• Anything you can think of
• The EC2 User Data Script runs with the root user

---
EC2 Basics
In this lecture, we will use EC2 to create our first website on AWS.

What is Amazon EC2?
So what is Amazon EC2? EC2 is one of the most popular AWS offerings. It is widely used. EC2 stands for Elastic Compute Cloud. This is the way to do infrastructure as a service on AWS. EC2 is not just a single service; it is composed of many things at a high level.

Core Components
You can rent virtual machines on EC2; they are called EC2 instances.
You can store data on virtual drives called EBS volumes.
You can distribute load across machines using an Elastic Load Balancer.
You can scale services using an Auto Scaling Group (ASG).
Do not worry — we will examine these components in depth during this course.

Why EC2 Matters
Knowing how to use EC2 in AWS is fundamental to understanding how the cloud works. As mentioned before, the cloud allows you to rent compute resources on demand, and EC2 provides exactly that.

Choosing Instance Options
So EC2: what can we choose for our instances — our virtual servers rented from AWS? You can choose:

The operating system: Linux (the most popular), Windows, or even Mac OS.
How much compute power and number of cores you want (CPU).
How much random access memory (RAM) you want.
How much storage space you want.
Storage Options
For storage, you can choose whether storage is attached through the network (for example using EBS or EFS) or hardware-attached. In the latter case it will be an EC2 instance store. We have a whole section on storage, so do not worry about the details now.

Networking and Security
Finally, you must choose the type of network to attach to your EC2 instance. For example:

Do you want a fast network interface?
What kind of public IP do you want?
You also need to handle firewall rules for the EC2 instance using a security group.

Bootstrapping Instances with EC2 User Data
You can bootstrap instances using an EC2 user data script. What does bootstrapping mean? Bootstrapping means launching commands when the machine starts. The user data script is only run once when the instance first starts and then it will not be run again.

Purpose of User Data
The EC2 user data has a very specific purpose: it automates boot tasks, hence the name bootstrapping. Typical tasks you automate when booting an instance include installing updates, installing software, downloading common files from the internet, or any other commands you want to run at first startup. The more you add to your user data script, the more work your instance must perform at boot time.

Privileges
The EC2 user data script runs as the root user, so any command in the script has sudo rights.

Conclusion
This was a short introduction to EC2. Do not worry — it will become very practical very soon. I will see you in the next lecture.

Key Takeaways
EC2 stands for Elastic Compute Cloud and provides infrastructure as a service for renting compute on demand.
EC2 is composed of multiple components: EC2 instances, EBS volumes, load balancers, and auto scaling groups.
When launching an instance you choose the operating system, CPU, memory (RAM), storage type and size, and networking options.
EC2 user data scripts bootstrap instances on first launch and run with root privileges, allowing automated installation and configuration.