Gateway Load Balancer

• Deploy, scale, and manage a fleet of 3rd party
network virtual appliances in AWS
• Example: Firewalls, Intrusion Detection and
Prevention Systems, Deep Packet Inspection
Systems, payload manipulation, …
• Operates at Layer 3 (Network Layer) – IP
Packets
• Combines the following functions:
• Transparent Network Gateway – single
entry/exit for all traffic
• Load Balancer – distributes traffic to your virtual

Uses the GENEVE protocol on port 6081
---

Gateway Load Balancer – Target Groups

• EC2 instances
• IP Addresses – must be private IPs

---

Gateway Load Balancer (GWLB)
Introduction to Gateway Load Balancer
The newest kind of load balancer is the Gateway Load Balancer (GWLB). It is used to deploy, scale, and manage your fleet of third-party network-neutral appliances in AWS. This concept will be explained in detail shortly.

You would use a Gateway Load Balancer if you want all the traffic of your network to go through a firewall that you have, or an intrusion detection and prevention system (IDPS), or a deep packet inspection system. Alternatively, if you want to modify some payloads at the network level, GWLB is appropriate.

Typical Traffic Flow Without GWLB
Users typically access your applications directly using a load balancer, such as an Application Load Balancer (ALB). The traffic flows directly from the users to the ALB and then to the application.

Traffic Flow With Gateway Load Balancer
If you want all network traffic to be inspected before reaching your application, you can deploy a set of third-party virtual appliances, for example, EC2 instances, that all traffic must pass through first. Previously, this setup was complicated, but with a Gateway Load Balancer, it becomes very simple.

You create a Gateway Load Balancer, and behind the scenes, the route tables in your VPC are updated. This is an advanced networking concept. After this, all user traffic first goes through the Gateway Load Balancer, which then distributes the traffic across a target group of your virtual appliances.

The virtual appliances analyze the traffic, performing functions such as firewall filtering or intrusion detection. If the traffic is acceptable, the appliances send it back to the Gateway Load Balancer. If not, they can drop the traffic. The Gateway Load Balancer then forwards the accepted traffic to your application. This process is transparent to your application.

Summary of Gateway Load Balancer Functionality
Acts as a transparent network gateway: all traffic in your VPC passes through a single entry and exit point, the Gateway Load Balancer.
Functions as a load balancer: it distributes traffic across a set of virtual appliances in your target group.
The Gateway Load Balancer operates at Layer 3, the network layer for IP packets, which is lower than other load balancers you may have seen. It uses the GENEVE protocol on port 6081 for encapsulating traffic.

Target Groups for Gateway Load Balancer
The target groups for the Gateway Load Balancer consist of your third-party appliances. These can be EC2 instances registered by instance ID or IP addresses. If using IP addresses, they must be private IPs. This allows you to register virtual appliances running in your own network or data center manually by IP.

Practical Considerations
Setting up a Gateway Load Balancer hands-on is extremely difficult, so this lecture skips the practical demonstration. The most important takeaway is understanding the diagram and the high-level concept of how the Gateway Load Balancer works. Deep dive questions are unlikely; focus on the overall meaning and operation.

This concludes the lecture on Gateway Load Balancer. Thank you for your attention, and see you in the next lecture.

Key Takeaways
Gateway Load Balancer (GWLB) is used to deploy, scale, and manage fleets of third-party network appliances in AWS.
GWLB enables all network traffic to be inspected by virtual appliances such as firewalls or intrusion detection systems before reaching applications.
It operates at the network layer (Layer 3), acting as a transparent gateway and load balancer distributing traffic across virtual appliances.
GWLB uses the GENEVE protocol on port 6081 and supports target groups consisting of EC2 instances or private IP addresses.
