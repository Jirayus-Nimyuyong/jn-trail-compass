Network Load Balancer

• Network load balancers (Layer 4) allow to:
• Forward TCP & UDP traffic to your instances
• Handle millions of request per seconds
• Ultra-low latency
• NLB has one static IP per AZ, and suppor ts assigning Elastic IP
(helpful for whitelisting specific IP)
• NLB are used for extreme performance, TCP or UDP traffic

Network Load Balancer (v2)
TCP (Layer 4) Based Traffic

Network Load Balancer – Target Groups
• EC2 instances
• IP Addresses – must be private IPs
• Application Load Balancer
• Health Checks support the TCP, HTTP and HTTPS Protocols

---
Network Load Balancer (NLB)
Network Load Balancer (NLB) Overview
The Network Load Balancer operates at Layer 4, which means it handles TCP and UDP traffic. This is a lower level compared to Layer 7, which deals with HTTP traffic. When considering load balancing for UDP or TCP traffic, the Network Load Balancer is the appropriate choice.

The Network Load Balancer is designed for extremely high performance. It can handle millions of requests per second while maintaining ultra-low latency, making it suitable for demanding network traffic scenarios.

A distinctive feature of the Network Load Balancer is that it provides one static IP address per availability zone. Additionally, you can assign an Elastic IP to each availability zone. This is particularly useful when you need to expose your application through a fixed set of IP addresses, which can be Elastic IPs.

In exam scenarios, if you encounter requirements where the application must be accessed via one, two, or three specific IP addresses, the Network Load Balancer should be considered as a solution. Similarly, if extreme performance for TCP or UDP traffic or static IPs are mentioned, think of the Network Load Balancer.

How the Network Load Balancer Works
The Network Load Balancer functions similarly to the Application Load Balancer. You create target groups, and the Network Load Balancer redirects traffic to these groups. For example, the front end can use TCP traffic, while the backend might use a different protocol such as GTP.

Target Groups
Target groups for the Network Load Balancer can consist of EC2 instances. This means the NLB can redirect TCP or UDP traffic directly to your EC2 instances. Alternatively, you can register IP addresses as targets. These IP addresses must be hard-coded and private.

Why register IP addresses? You can send the private IP of your EC2 instance, but you can also use the private IP of a server located in your own data center. This allows both cloud-based and on-premises servers to be fronted by the same Network Load Balancer.

It is also possible to place a Network Load Balancer in front of an Application Load Balancer. In this configuration, the NLB provides fixed IP addresses, while the ALB manages HTTP traffic with its routing rules. This combination leverages the strengths of both load balancers.

Health Checks
For the exam, it is important to know that Network Load Balancer target groups support health checks using three protocols: TCP, HTTP, and HTTPS. If your backend application supports HTTP or HTTPS, you can configure health checks accordingly.

This concludes the overview of the Network Load Balancer. It is a powerful tool for managing TCP and UDP traffic with high performance and static IP capabilities.

Key Takeaways
The Network Load Balancer (NLB) operates at Layer 4, handling TCP and UDP traffic.
NLB provides ultra-high performance with the ability to manage millions of requests per second and ultra-low latency.
It supports one static IP per availability zone, with the option to assign Elastic IPs for static IP exposure.
Target groups for NLB can include EC2 instances or hard-coded private IP addresses, including those from on-premises data centers.
NLB can be placed in front of an Application Load Balancer (ALB) to combine fixed IP benefits with HTTP routing rules.
Health checks for NLB target groups support TCP, HTTP, and HTTPS protocols.