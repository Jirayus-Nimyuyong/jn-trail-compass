CloudFront – ALB or EC2 as an origin
Using VPC Origins

• Allows you to deliver content from your applications hosted in your
VPC private subnets (no need to expose them on the Internet)
• Deliver traffic to private:
• Application Load Balancer
• Network Load Balancer
• EC2 Instances

Using Public Network

---
CloudFront - ALB/EC2 as an Origin
Connecting CloudFront to Application Load Balancers and EC2 Instances
How can we connect CloudFront to an application load balancer or an EC2 instance as an origin? There are two ways to do this, and the better, newer way is called using VPC origins.

VPC origins allow you to deliver content directly from applications that are hosted in your private subnets within your VPC. Everything can remain private, so you do not need to expose any of this to the internet.

This means you can deliver traffic to private application load balancers, network load balancers, and EC2 instances.

How VPC Origins Work
We create a CloudFront distribution that has multiple edge locations. Users access CloudFront through these edge locations.

From CloudFront, we create a VPC origin and connect this VPC origin to our backend, which could be an application load balancer (ALB), a network load balancer (NLB), or an EC2 instance.

CloudFront then directs traffic through the VPC origin to your private subnets and applications.

From a network perspective, this is one of the most secure ways to set up your architecture because your applications remain hosted privately and internally. You choose exactly what to expose through CloudFront, which is very convenient.

The Previous Public Network Method
Before the VPC origin feature existed, the previous method involved using a public network. This method is important to understand for context.

You had to have an EC2 instance that was public. Therefore, you had a list of edge locations with their public IPs.

You would use this link to find the list of all CloudFront IPs and then modify the security group to allow all these public IPs of the edge locations into your EC2 instance.

Thus, the EC2 instance would be public but only restricted to the CloudFront edge locations.

The same approach applied if you had an application load balancer. The ALB would be public, but your EC2 instances could remain private. You would have a private network between your ALB and EC2 instances controlled by security groups.

You had to ensure that your ALB's security group allowed all the public IPs coming from CloudFront.

This method was more tedious because you needed to find these public IPs and update the security group accordingly.

Additionally, there was a risk that if someone changed the security group of your ALB or EC2 instance, your instance could become publicly accessible to more than just your CloudFront distribution.

Summary
The old way involved public exposure with IP restrictions, while the new and better way is to use VPC origins.

This concludes the lecture on connecting CloudFront to ALB and EC2 instances as origins.

Key Takeaways
CloudFront can connect to private application load balancers, network load balancers, and EC2 instances using VPC origins.
VPC origins allow content delivery directly from applications hosted in private subnets without exposing them to the internet.
The previous method involved using public IPs of CloudFront edge locations and configuring security groups accordingly, which was more tedious and less secure.
Using VPC origins is the more secure and modern approach to integrate CloudFront with backend resources.