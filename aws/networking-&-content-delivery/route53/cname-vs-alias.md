CNAME vs Alias
• AWS Resources (Load Balancer, CloudFront...) expose an AWS hostname:
• lb1-1234.us-east-2.elb.amazonaws.com and you want myapp.mydomain.com
• CNAME:
• Points a hostname to any other hostname. (app.mydomain.com => blabla.anything.com)
• ONLY FOR NON ROOT DOMAIN (aka. something.mydomain.com)
• Alias:
• Points a hostname to an AWS Resource (app.mydomain.com => blabla.amazonaws.com)
• Works for ROOT DOMAIN and NON ROOT DOMAIN (aka mydomain.com)
• Free of charge
• Native health check

Route 53 – Alias Records
• Maps a hostname to an AWS resource
• An extension to DNS functionality
• Automatically recognizes changes in the resource’s IP addresses
• Unlike CNAME, it can be used for the top node of a DNS namespace (Zone Apex), e.g.: example.com
• Alias Record is always of type A/AAAA for AWS resources (IPv4 / IPv6)
• You can’t set the TTL

Route 53 – Alias Records Targets
• Elastic Load Balancers
• CloudFront Distributions
• API Gateway
• Elastic Beanstalk environments
• S3 Websites
• VPC Interface Endpoints
• Global Accelerator accelerator
• Route 53 record in the same hosted zone
• You cannot set an ALIAS record for an EC2 DNS name

--- 
Route 53 CNAME vs Alias
Differences Between CNAME and Alias Records
When you have an AWS resource, such as a Load Balancer or CloudFront distribution, it exposes a hostname. You may want to map that hostname to a domain you own. For example, you might want to map this Load Balancer to myapp.mydomain.com. There are two options to achieve this.

The first option is to use a CNAME record. Unlike A records, CNAME records allow you to point a hostname to any other hostname. For example, you can have app.mydomain.com pointing to blabla.anything.com. However, this only works if you have a non-root domain name, such as something.mydomain.com. It does not work for the root domain like mydomain.com, as will be demonstrated in the hands-on section.

On the other hand, alias records are specific to Route 53 and allow you to point a hostname to a specific AWS resource. For example, app.mydomain.com can point to blabla.amazonaws.com. Alias records work for both root domains and non-root domains, so you can have mydomain.com pointing as an alias to an AWS resource. This is very useful and is something that may be tested in the exam.

Additionally, alias records are free of charge and have native health check capabilities built in. This makes them advantageous over CNAME records in many scenarios.

Details of Alias Records
Alias records can only be mapped to AWS resources. For example, in Route 53, you can create an alias record of type A for example.com with the value being the DNS name of your load balancer. This is an extension to standard DNS functionalities and is unique to Route 53. If the underlying Application Load Balancer (ALB) changes IP addresses, the alias record automatically recognizes these changes.

Unlike CNAME records, alias records can be used for the top node of the DNS namespace, called the Zone Apex. This means you can use an alias record for example.com directly. Alias records are always of type A or AAAA, corresponding to IPv4 or IPv6 respectively. When you create an alias record, you cannot set the TTL manually; it is set automatically by Route 53.

Targets for Alias Records
Alias records can target various AWS resources including:

Elastic Load Balancers (ELBs)
CloudFront Distributions
API Gateway
Elastic Beanstalk environments
S3 Websites (when buckets are enabled as websites)
VPC Interface Endpoints
Global Accelerator
Route 53 records in the same hosted zone
However, you cannot set an alias record to point to an EC2 DNS name. This is an important limitation to remember.

Hands-On: Creating CNAME and Alias Records
Let's explore how to create CNAME and alias records in the Route 53 console.

First, create a record of type CNAME. For example, name it myapp.stephanetheteacher.com. The record type is CNAME, and the value must be a domain name. You can copy the DNS name of your Application Load Balancer (ALB) and paste it here. This setup allows you to access the ALB through myapp.stephanetheteacher.com instead of the ALB's URL.

After creating this CNAME record, accessing myapp.stephanetheteacher.com in a browser will return the response from the ALB, such as "Hello World" from the EC2 instance behind the ALB. This method works but is not AWS native and has limitations.

Next, create an alias record. Name it myalias.stephanetheteacher.com with record type A, since the ALB handles IPv4 traffic. Select the alias option and choose the target AWS resource, such as your Application Load Balancer in the appropriate region (e.g., eu-central-1). Route 53 will automatically evaluate the target's health. Creating this alias record is free of charge and provides the same functionality as the CNAME record.

Accessing myalias.stephanetheteacher.com in a browser will yield the same response as the CNAME record, confirming that the alias record works correctly and is more efficient.

Handling the Domain Apex with Alias Records
If you want to map the root domain, such as stephanetheteacher.com, to your ALB, you cannot use a CNAME record. Attempting to create a CNAME at the zone apex results in an error: "CNAME is not permitted at apex of this zone." This is because the DNS standards prohibit CNAME records at the root domain.

The solution is to create an alias record of type A at the root domain pointing to your ALB. This is accepted by Route 53 and works correctly. After creating this alias record, accessing stephanetheteacher.com in a browser will return the expected response from the ALB.

Summary
In this lecture, we demonstrated how CNAME and alias records work in AWS Route 53. CNAME records allow hostname redirection but cannot be used at the root domain. Alias records are a Route 53-specific feature that enable pointing both root and non-root domains to AWS resources efficiently, with added benefits such as no query charges and native health checks.

Key Takeaways
CNAME records point a hostname to another hostname but cannot be used at the root domain (zone apex).
Alias records are specific to Route 53 and allow pointing a hostname to AWS resources, including root domains.
Alias records are free of charge and support native health checks.
Alias records can target AWS resources like ELBs, CloudFront, API Gateway, and more, but not EC2 DNS names.