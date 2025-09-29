Introduction to Security Groups
• Security Groups are the fundamental of network security in AWS
• They control how traffic is allowed into or out of our EC2 Instances.

• Security groups only contain
rules
• Security groups rules can reference by IP or by security group

---
Security Groups Deeper Dive
• Security groups are acting as a “firewall” on EC2 instances
• They regulate:
• Access to Ports
• Authorised IP ranges – IPv4 and IPv6
• Control of inbound network (from other to the instance)
• Control of outbound network (from the instance to other)

---
Security Groups
Diagram

---
Security Groups
Good to know
• Can be attached to multiple instances
• Locked down to a region / VPC combination
• Does live “outside” the EC2 – if traffic is blocked the EC2 instance won’t see it
• It’s good to maintain one separate security group for SSH access
• If your application is not accessible (time out), then it’s a security group issue
• If your application gives a “connection refused“ error, then it’s an application
error or it’s not launched
• All inbound traffic is blocked by default
• All outbound traffic is authorised by default
---
Referencing other security groups
Diagram
---
Classic Ports to know
• 22 = SSH (Secure Shell) - log into a Linux instance
• 21 = FTP (File Transfer Protocol) – upload files into a file share
• 22 = SFTP (Secure File Transfer Protocol) – upload files using SSH
• 80 = HTTP – access unsecured websites
• 443 = HTTPS – access secured websites
• 3389 = RDP (Remote Desktop Protocol) – log into a Windows instance
---

Security Groups & Classic Ports Overview
Let's talk about the firewalls around our EC2 instances. We briefly configured one in the previous lecture, but security groups, yet again, are fundamental for network security in the AWS cloud. They control how traffic is allowed into and out of your EC2 instances.

Security groups are very easy to use. They only contain allow rules, so we specify what is allowed to go in and out. Security groups can have rules that reference either IP addresses, such as where your computer is from, or other security groups. As we'll see, security groups can reference each other.

For example, we are on our computer, connected to the public internet, trying to access our EC2 instance. We create a security group around our EC2 instance, which acts as the firewall. This security group has rules that determine whether inbound traffic from outside to the EC2 instance is allowed, and whether the EC2 instance can perform outbound traffic to the internet.

Security groups act as firewalls on our EC2 instances and regulate access to ports. They specify authorized IP ranges, either IPv4 or IPv6, which are the two types of IP addresses on the internet. They control inbound network traffic from outside to the instance, and outbound network traffic from the instance to the outside.

When we look at security group rules, they include the type, the protocol (such as TCP), the port allowing traffic through on the instance, and the source, which represents an IP address range. For example, 0.0.0.0/0 means all IP addresses, and a specific IP address can be specified as well.

Consider a diagram where our EC2 instance has one security group attached to it with inbound and outbound rules. Our computer is authorized on, say, port 22, so traffic can go through from our computer to the EC2 instance. However, someone else's computer not using our IP address will be blocked by the firewall and experience a timeout.

By default, the outbound rules allow any traffic out of the EC2 instance. So if the EC2 instance tries to access a website and initiate a connection, the security group will allow it. This is the basic way the firewall works.

Important points about security groups:

They can be attached to multiple instances; there is not a one-to-one relationship between security groups and instances.
An instance can have multiple security groups attached.
Security groups are locked down to your region and VPC combination. If you switch regions or create another VPC, you must create new security groups.
Security groups live outside the EC2 instance. If traffic is blocked, the EC2 instance does not even see it; it is a firewall external to the instance.
As advice from developer to developer, it is good to maintain one separate security group just for SSH access. SSH access is usually the most complicated, and you want to ensure it is configured correctly. Separating the security group for SSH access helps manage this.

If your application is not accessible and you experience a timeout, this is likely a security group issue. If you receive a connection refused error, it means the security group allowed the traffic through, but the application either errored or was not launched.

By default, all inbound traffic is blocked, and all outbound traffic is authorized. There is an advanced feature useful when using load balancers: referencing security groups from other security groups.

For example, an EC2 instance has security group one attached with inbound rules authorizing security group one and security group two. If another EC2 instance has security group two attached, it can connect directly to the first EC2 instance on the authorized port. Similarly, if another EC2 instance has security group one attached, it can communicate back to the first instance. This allows communication regardless of IP addresses, based on security group membership.

If an EC2 instance has security group three attached, and group three is not authorized in the inbound rules of security group one, then the connection is denied. This advanced feature is common when dealing with load balancers.

By now, you should have a solid understanding of security groups. For the exam, you need to know the following ports:

Port 22 for SSH (Secure Shell), used to log into Linux EC2 instances.
Port 21 for FTP (File Transfer Protocol), used to upload files.
Port 22 also for SFTP (Secure File Transfer Protocol), which uses SSH for secure file transfer.
Port 80 for HTTP, used to access unsecured websites.
Port 443 for HTTPS, used to access secured websites.
Port 3389 for RDP (Remote Desktop Protocol), used to log into Windows instances.
To summarize:

Port 22 is SSH for Linux instances.
Port 3389 is RDP for Windows instances.
This concludes the theory about security groups. We will see practical examples in the next lecture.

Key Takeaways
Security groups act as firewalls controlling inbound and outbound traffic for EC2 instances.
Security groups contain only allow rules and can reference IP addresses or other security groups.
Default security group behavior blocks all inbound traffic and allows all outbound traffic.
Important ports to know include 22 for SSH, 21 for FTP, 80 for HTTP, 443 for HTTPS, and 3389 for RDP.