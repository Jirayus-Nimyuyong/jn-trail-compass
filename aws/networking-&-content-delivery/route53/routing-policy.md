Route 53 – Routing Policies

• Define how Route 53 responds to DNS queries
• Don’t get confused by the word “Routing”
• It’s not the same as Load balancer routing which routes the traffic
• DNS does not route any traffic, it only responds to the DNS queries
• Route 53 Supports the following Routing Policies
• Simple
• Weighted
• Failover
• Latency based
• Geolocation
• Multi-Value Answer
• Geoproximity (using Route 53 Traffic Flow feature)

Routing Policies – Simple
• Typically, route traffic to a single
resource
• Can specify multiple values in the
same record
• If multiple values are returned, a
random one is chosen by the client
• When Alias enabled, specify only
one AWS resource
• Can’t be associated with Health
Checks

Routing Policies – Weighted

• Control the % of the requests that go to each
specific resource
• Assign each record a relative weight:
• 𝑡𝑟𝑎𝑓𝑓𝑖𝑐 (%) =
• Weights don’t need to sum up to 100
• DNS records must have the same name and type
• Can be associated with Health Checks
• Use cases: load balancing between regions, testing
new application versions…
• Assign a weight of 0 to a record to stop
sending traffic to a resource
• If all records have weight of 0, then all records
will be returned equally

Routing Policies – Latency-based
• Redirect to the resource that
has the least latency close to us
• Super helpful when latency for
users is a priority
• Latency is based on traffic
between users and AWS
Regions
• Germany users may be
directed to the US (if that’s the
lowest latency)
• Can be associated with Health
Checks (has a failover
capability)

Routing Policies – Failover (Active-Passive)

Routing Policies – Geolocation
• Different from Latency-based!
• This routing is based on user location
• Specify location by Continent, Country
or by US State (if there’s overlapping,
most precise location selected)
• Should create a “Default” record (in
case there’s no match on location)
• Use cases: website localization, restrict
content distribution, load balancing, …
• Can be associated with Health Checks

Routing Policies – Geoproximity
• Route traffic to your resources based on the geographic location of users and
resources
• Ability to shift more traffic to resources based on the defined bias
• To change the size of the geographic region, specify bias values:
• To expand (1 to 99) – more traffic to the resource
• To shrink (-1 to -99) – less traffic to the resource
• Resources can be:
• AWS resources (specify AWS region)
• Non-AWS resources (specify Latitude and Longitude)
• You must use Route 53 Traffic Flow to use this feature

Route 53 – Traffic flow
• Simplify the process of creating and
maintaining records in large and
complex configurations
• Visual editor to manage complex
routing decision trees
• Configurations can be saved as
Traffic Flow Policy
• Can be applied to different Route 53
Hosted Zones (different domain
names)
• Supports versioning

IP-based Routing
• Routing is based on clients’ IP addresses
• You provide a list of CIDRs for your clients
and the corresponding endpoints/locations
(user-IP-to-endpoint mappings)
• Use cases: Optimize performance, reduce
network costs…
• Example: route end users from a particular
ISP to a specific endpoint

Routing Policies – Multi-Value
• Use when routing traffic to multiple resources
• Route 53 return multiple values/resources
• Can be associated with Health Checks (return only values for healthy resources)
• Up to 8 healthy records are returned for each Multi-Value query
• Multi-Value is not a substitute for having an ELB

--- 

Routing Policy - Simple
Introduction to Routing Policies in Route 53
Let's discuss routing policies in Route 53. A routing policy helps Route 53 respond to DNS queries. It is important not to confuse this with routing in the context of load balancers. Unlike load balancers that route traffic to backend EC2 instances, Route 53 routing policies operate from a DNS perspective. The DNS does not route traffic; it only responds to DNS queries. The traffic itself does not pass through the DNS. Instead, the DNS helps clients determine where to send their HTTP queries by translating hostnames into actual endpoints.

Supported Routing Policies in Route 53
Route 53 supports several routing policies, including:

Simple
Weighted
Failover
Latency-based
Geolocation
Multi-value answer
Geoproximity
We will examine each of these policies in this section, starting with the simple routing policy.

Simple Routing Policy
The simple routing policy typically routes traffic to a single resource. For example, when a client requests foo.example.com, Route 53 responds with an IP address via an A record. It is possible to specify multiple IP addresses in the same record. When multiple values are returned, clients randomly select one for routing.

In this example, a client requests foo.example.com, and Route 53 replies with three IP addresses embedded in the A record. The client then randomly picks one of these IPs to use.

If an alias record is enabled alongside the simple policy, only one AWS resource can be specified as the target. The simple routing policy is named so because it is straightforward and does not support health checks, which we will explore later in this section.

Creating a Simple Routing Policy Record in the Console
Let's create a simple routing policy record in the AWS console. The record name will be simple.stephanetheteacher.com. It will be an A record with a value pointing to an instance in the ap-southeast-1 region. The TTL (Time To Live) is set low, for example, 20 seconds.

The routing policy options available include six types, with one additional option located elsewhere in the UI. We select the simple routing policy and create the record.

Verifying the Simple Routing Policy
After creating the record, accessing simple.stephanetheteacher.com returns "Hello World from my instance in ap-southeast-1b," confirming the setup.

Using the dig command, we verify the A record with a TTL of 20 seconds pointing to the specified IP address. If the record needs to be changed, it can be edited to include multiple IP addresses, such as one in ap-southeast-1 and another in us-east-1.

Multiple IP Addresses in Simple Routing
When multiple IP addresses are specified and the TTL expires, DNS responses will include both IPs. Clients will randomly choose one to use. For example, a dig command shows two IP addresses returned for the record. This means there is a 50% chance a client will route to either IP.

Refreshing the website may initially return the instance in ap-southeast-1b. After waiting for the TTL to expire and refreshing again, the response may come from us-east-1a, demonstrating the random client-side selection.

This example clearly illustrates how simple routing policies work in Route 53.

Key Takeaways
Routing policies in Route 53 determine how DNS queries are answered, not how traffic is routed.
The simple routing policy directs traffic typically to a single resource using A records.
Multiple IP addresses can be specified in a simple routing policy, with clients randomly choosing one.
Alias records with simple routing can only target one AWS resource and do not support health checks.

--- 
Routing Policy - Weighted
Introduction to Weighted Routing Policy
The weighted routing policy enables control over the percentage of requests directed to specific resources by assigning weights. Simply put, in a setup such as Amazon Route 53, multiple EC2 instances can be assigned different weights to distribute traffic accordingly.

For example, consider three EC2 instances with weights 70, 20, and 10 respectively. Although these weights sum to 100 in this example, it is not mandatory in real scenarios. The weight determines the proportion of DNS responses from Amazon Route 53 that redirect to each instance. Specifically, 70% of the traffic goes to the first instance, 20% to the second, and 10% to the third.

To implement this, each DNS record is assigned a relative weight. The traffic percentage sent to each record is calculated as the weight of that record divided by the sum of weights of all records, effectively representing a percentage of the total weights.

It is important to note that weights do not need to sum to 100; they simply indicate the relative amount of traffic to send to each instance compared to others in the DNS name set.

For weighted routing to function correctly, all DNS records must have the same name and type. Additionally, these records can be associated with health checks, which will be covered in a subsequent lecture.

Use Cases for Weighted Routing Policy
Weighted routing is useful for scenarios such as load balancing across different regions or testing new application versions by directing a small portion of traffic to them. Assigning a weight of zero to a resource effectively stops traffic from being sent to it, allowing dynamic shifting of traffic over time.

If all resource records have a weight of zero, then all records are returned with equal weight distribution.

Configuring Weighted Records in the Console
Let's create weighted DNS records in the Amazon Route 53 console. We will create three records with the name weighted.stephanetheteacher.com, all of type A, and assign weighted routing policies to them.

The first record points to the IP from the ap-southeast-1 region with a weight of 10.
The second record points to the IP from the us-east-1 region with a weight of 70.
The third record points to the IP from the eu-central-1 region with a weight of 20.
For demonstration, the TTL is set to a low value of 3 seconds to observe the effects quickly, though this is not recommended for production environments.

Each record can optionally be associated with a health check, but for now, we will not use health checks. Each record also has a unique record ID to identify it within the weighted record sets, such as southeast, us-east, and EU for the respective regions.

After creating these three records, the table shows each record with its assigned weight: 10, 20, and 70 respectively. Unlike a simple record with multiple values, here each record has a single value and an associated weight.

Observing Weighted Routing Behavior
Accessing the URL weighted.stephanetheteacher.com initially returns a response from the us-east-1a region, which aligns with the 70% traffic weight assigned to that region. Refreshing the page every three seconds may occasionally return responses from other regions, reflecting the weighted distribution of traffic.

Using the dig command to query the DNS record shows a TTL of 3 seconds and typically returns the IP from the us-east-1 region due to its higher weight. However, subsequent queries may return IPs from other regions, such as the one with weight 20, demonstrating the weighted routing in action.

Weighted routing effectively directs most queries to the resource with the highest weight, while occasionally routing some traffic to other resources based on their relative weights. This behavior can be observed by refreshing the browser or issuing DNS queries repeatedly.

Conclusion
Weighted routing policies provide powerful control over traffic distribution among multiple resources. They are useful for load balancing, gradual rollouts, and managing traffic shifts dynamically. Experimenting with weighted records in your DNS setup can help you understand their behavior and benefits.

Key Takeaways
Weighted routing policy allows directing a percentage of DNS requests to specific resources based on assigned weights.
Weights do not need to sum to 100; they represent relative traffic distribution among records.
DNS records must share the same name and type to use weighted routing.
Weighted routing can be used for load balancing across regions or gradual deployment of new application versions.

--- 

Routing Policy - Latency
Introduction to Latency-Based Routing Policy
Let's discuss a routing policy that is straightforward to understand: the latency-based routing policy. The core idea is to redirect users to the resource that offers the lowest latency, essentially the closest resource to them. This approach is particularly beneficial when latency is the primary concern for your websites or applications.

Latency is measured based on how quickly users can connect to the closest identified AWS region for a given DNS record. For example, if a user is in Germany and the lowest latency is to a resource in the US, then the user will be redirected to that US resource. This routing policy can be combined with health checks, which will be discussed in the next lecture.

Understanding Latency Routing with a Global Deployment
Consider a scenario where applications are deployed in two different parts of the world: one in us-east-1 and another in ap-southeast-1. Users are distributed globally, and Route 53 evaluates latency to determine routing. Users closest to and with the lowest latency to the Application Load Balancer (ALB) in us-east-1 will be redirected there, while others will be redirected to ap-southeast-1.

Creating Latency-Based DNS Records in Route 53
Let's put this into practice by creating new DNS records in the AWS console. The record name will be latency.stephanetheteacher.com.

The first value corresponds to the ap-southeast-1 region. Paste the IP address here.
Set the routing policy to Latency.
Since the value is an IP address, specify the region corresponding to this record, which is ap-southeast-1 (Singapore).
Optionally, associate a health check and assign a Record ID, for example, ap-southeast-1.
Repeat this process for us-east-1 and eu-central-1, specifying the appropriate IP addresses, routing policy as Latency, and corresponding regions and Record IDs.

It is important to specify the region when using IP addresses because the Alias feature does not automatically associate an IP with its AWS region. The IP could be from anywhere globally, so manual specification ensures correct latency routing.

Verifying Latency-Based Routing
After creating the three records successfully, we can test the routing behavior.

When accessing the URL from Europe, the response should come from the instance in eu-central-1.
Using CloudShell in Europe and running a dig command on the domain returns the IP address of the eu-central-1 instance consistently, as the latency has not changed.
To test routing for other regions, use a VPN to simulate different user locations:

Connecting via a VPN in Canada should redirect to the us-east-1 instance, as it has the lowest latency there.
Changing location to Hong Kong should redirect to the ap-southeast-1 instance.
Refreshing the browser after changing VPN location clears the local DNS cache, allowing the new latency-based routing to take effect.

This demonstrates that latency-based routing records are effective and commonly used to optimize user experience by directing traffic to the closest AWS region.

Key Takeaways
Latency-based routing policies redirect users to the resource with the lowest latency, typically the closest AWS region.
Latency is measured by how quickly users can connect to the closest AWS region associated with a DNS record.
Route 53 evaluates latency to redirect users to the optimal region, improving website or application performance.
Testing latency routing can be done using VPNs to simulate different user locations and observe DNS responses.

---
Routing Policy - Failover
Routing Policies: Failover
In this lecture, we discuss routing policies, specifically focusing on failover. The setup involves Route 53 acting as the DNS service, with two EC2 instances: one designated as the primary instance and the other as the secondary or disaster recovery instance.

The primary record is associated with a health check, which is mandatory. If the health check determines that the primary instance is unhealthy, Route 53 automatically fails over to the secondary EC2 instance and begins routing traffic to it instead.

The secondary EC2 instance can also be associated with a health check if desired. However, there can only be one primary and one secondary record in this failover configuration.

When clients make DNS requests, they automatically receive the resource that is currently deemed healthy. If the primary instance is healthy, Route 53 responds with the primary record. If the primary health check fails, the response switches to the secondary record, facilitating seamless failover.

Hands-On: Creating a Failover Record
Let's proceed to a practical demonstration of creating a failover record using health checks in Route 53. Within the hosted zone, we create a new record named failover.stephanetheteacher.com. This will be an A record pointing to the EC2 instance in the EU-central-1 region, which is geographically closer to us.

The routing policy is set to failover, and the TTL is configured to a low value, such as 60 seconds, to allow quick DNS updates during failover events. The failover record type has two options: primary or secondary. This record is designated as primary and must be associated with a health check, in this case named EU-central-1 with record ID E.

Next, we add a secondary record with the same name failover.stephanetheteacher.com, pointing to the EC2 instance in the US-east-1 region. This record also uses a failover routing policy with a TTL of 60 seconds and is designated as secondary. Associating a health check with the secondary record is optional; here, we associate it with the US-East-1 health check with record ID US.

After creating both records successfully, we verify the health checks associated with them. Currently, both health checks report healthy status.

Visiting the URL failover.stephanetheteacher.com returns a response from the EU-central-1 instance, confirming the primary record is active and healthy.

Simulating Failover
To test failover, we simulate a failure on the primary instance by modifying its security group to block inbound traffic on the relevant port, making it unreachable by the health checkers.

After removing the inbound rule for port 80, the health check for the EU-central-1 instance eventually becomes unhealthy. The monitoring tab shows the health check status dropping from healthy to zero, indicating failure.

Once the primary health check is unhealthy, Route 53 automatically fails over to the secondary record. Refreshing the URL now returns a response from the US-east-1 instance, demonstrating seamless failover behind the scenes.

To restore the primary instance, we revert the security group changes by adding back the HTTP inbound rule. The health check then passes again, and Route 53 fails back to the primary location automatically.

This concludes the lecture on Route 53 failover routing policies. The failover mechanism ensures high availability by automatically routing traffic to healthy resources based on health checks.

Key Takeaways
Route 53 failover routing policy enables automatic DNS failover between primary and secondary EC2 instances based on health checks.
Health checks are mandatory for the primary record and optional for the secondary record.
DNS responses automatically direct clients to the healthy instance, ensuring high availability.
Failover can be tested by simulating failure via security group rule changes and observing DNS response changes.
---
Routing Policy - Geolocation
Routing Policy - Geolocation
Now, let's discuss the Routing Policy based on Geolocation, which differs significantly from Latency-based routing. This policy routes users according to their actual physical location.

For example, you can specify routing rules based on a user's continent, country, or even more precisely, by U.S. states. The most precise location match is selected first, and then the user is routed to the corresponding IP address.

It is important to create a default record to handle cases where there is no location match.

The use cases for geolocation routing include:

Website localization
Content distribution restrictions
Load balancing
Additionally, these types of records can be associated with health checks to ensure availability.

Consider a map of Europe with multiple countries. You can define a geolocation record for Germany so that German users are routed to an IP hosting the German version of your application. Similarly, users in France can be routed to an IP hosting the French version. Users from any other location will be routed to a default IP, which might host the English version of your application.

This is how geolocation routing is used in practice. Now, let's proceed to create geolocation records in the console.

Creating a Geolocation Record
First, create a record with the routing policy set to geolocation. For example, create an A record linked to the ap-southeast-1 region. Set the routing policy to geolocation and specify the location as all of Asia. This means any user located in Asia will be routed to the ap-southeast-1 EC2 instance.

Optionally, you can associate a health check with this record and provide a record ID.

Next, add two more records:

For the us-east-1 region, create a geolocation record specifying the country as the United States. Assign a record ID such as "US".
For the eu-central-1 region, create a default geolocation record. This default will route any users not matching Asia or the United States to this location. Assign a record ID such as "Default EU".
After creating these records, you can test the routing behavior. If you are not located in the U.S. or Asia, accessing the URL will route you to the eu-central-1 region, which is the default record. This confirms that the default routing is working properly.

To test routing for Asia, change your geographic location using a VPN to a country in Asia, such as India. When you refresh the page, you should receive a response from the ap-southeast-1 instance.

If you experience a timeout, it is often due to security group settings. For example, if the HTTP rule was removed to cause a health check failure, you need to add the HTTP inbound rule back to the security group in the relevant region (e.g., Singapore).

Once the HTTP rule is restored, refreshing the page should display the expected response from the Asia region instance, confirming that geolocation routing is functioning correctly.

Similarly, when you connect from the United States and refresh the page, you should receive a response from the us-east-1a instance, confirming correct routing for U.S. users.

If you connect from a nearby country not explicitly specified, such as Mexico, the request will be routed to the default location, eu-central-1c, since Mexico was not defined in the geolocation records.

This concludes the demonstration of geolocation routing policy. It is working perfectly.

Thank you for following this lecture, and I look forward to seeing you in the next one.

Key Takeaways
Geolocation routing policy directs users based on their physical location, such as continent, country, or state.
A default record is necessary to handle requests from locations not explicitly specified.
Geolocation routing can be used for website localization, content restriction, and load balancing.
Health checks and security group configurations are important to ensure proper routing and accessibility.
---
Routing Policy - Geoproximity
Introduction to Geoproximity Routing
Geoproximity Routing is a feature that enables routing traffic to your resources based on the geographic location of your users and resources. This concept can be somewhat confusing, but it becomes clearer with diagrams and examples.

Purpose of Geoproximity Routing
This routing policy allows you to shift more traffic to resources in specific locations by using a parameter called the bias. Adjusting the bias value changes the size of the geographic area served by a resource.

How Bias Affects Traffic Distribution
Increasing the bias value expands the geographic area, attracting more traffic to the resource.
Decreasing the bias value (to a negative number) shrinks the area, reducing traffic to the resource.
Specifying Resource Locations
For AWS resources, specify the region they are in, and AWS automatically computes the correct routing.
For non-AWS resources, such as on-premises data centers, you must specify the latitude and longitude so AWS knows their exact location.
Using Advanced Route 53 Traffic Flow
To leverage the bias feature in Geoproximity Routing, you need to use the advanced Route 53 Traffic Flow service.

Example Scenario: Two Resources in Different Regions
Consider two resources, one in us-west-1 and another in us-east-1, both with a bias set to zero. Users across the United States will be routed based on proximity:

Users west of a dividing line will be routed to us-west-1.
Users east of that line will be routed to us-east-1.
This setup routes users to the closest resource region when no bias is applied.

Effect of Bias on Routing
If the bias is set to zero in us-west-1 but increased to a positive value (e.g., 50) in us-east-1, the dividing line shifts leftward. This means:

Users left of the new dividing line will still go to us-west-1.
Users right of the line will go to us-east-1.
The positive bias in us-east-1 attracts more users and traffic to that region.

Practical Use of Bias
You can set resources worldwide and use Geoproximity Routing to shift more traffic to a specific region by increasing the bias value for that region. This effectively attracts more users and traffic to the targeted resource location.

Summary
Geoproximity Routing is particularly useful when you need to shift traffic from one region to another by adjusting the bias. This feature allows fine-tuned control over traffic distribution based on geographic proximity and bias settings.

Key Takeaways
Geoproximity Routing allows routing traffic based on the geographic location of users and resources.
The bias value controls traffic distribution by expanding or shrinking the geographic area served by a resource.
AWS resources use region specifications, while non-AWS resources require latitude and longitude coordinates.
Geoproximity Routing is useful for shifting traffic between regions by adjusting bias values.


---
Routing Policy - Traffic Flow & Geoproximity Hands On
Introduction to Traffic Flow and Geoproximity Records
Let's explore how to build complex geoproximity records using a feature called Traffic Flow. This feature is not limited to geoproximity but applies broadly. The idea is to use a visual editor UI that allows managing complex routing decision trees.

This UI enables specifying different routing rules visually instead of writing records one by one in your DNS management system such as Route 53. The configurations are saved as Traffic Flow Policies, which can be versioned, applied to different hosted zones, and easily changed and applied.

Creating a Traffic Policy
To begin, navigate to the left-hand side panel and select Traffic Policies. Here, you can create a new Traffic Policy. For example, name it DemoGeoPolicy and proceed by clicking Next.

You start by specifying the type of DNS record to create, such as A, AAAA, or CNAME. The UI provides details about each record type. For this example, select an A record. Then, connect it to a specific routing rule.

Available routing rules include Weighted, Failover, Geolocation, Latency, Multivalue, Geoproximity, or simply an endpoint. For a simple record, you could point an A record directly to an endpoint IP address.

More complex policies can be created by connecting to Weighted rules with multiple weights, Failover rules, and so on. The UI is visual, making it easier to understand what is happening within Route 53.

Creating a Geoproximity Rule
In this example, we will create a Geoproximity rule. The UI shows a map to provide visual feedback on the routing configuration. You enter the first region and then the second region for the geoproximity routing.

For the first endpoint location, you can enter custom coordinates or select from available AWS regions. For instance, choose US-East-1 and specify a bias value. The bias affects the traffic distribution area on the map.

Assign this record to an endpoint, such as your US-East-1 EC2 instance's IP address. Paste the IP address and leave the bias at zero initially.

For the second region, enter coordinates or select a region like Singapore (AP-Southeast-1). Assign this to the corresponding endpoint IP address and confirm the entry.

Visualizing the Geoproximity Map
Click "Show Map" to visualize the geoproximity routing. The map divides the world into areas routed to each instance. For example, users on the blue side of the map will connect to the first instance, while users on the orange side connect to the second instance.

Adjusting the bias value changes the size of the area routed to each instance. Increasing the bias for the US-East-1 instance expands its traffic area, while decreasing it shifts traffic towards the other instance.

You can add more geoproximity locations, such as Frankfurt (EU-Central-1), and assign endpoints accordingly. The map updates to show the impact of bias adjustments on traffic distribution.

After configuring the policy, create the traffic policy. Then, deploy it to a hosted zone, for example, stephanetheteacher.com. Specify the policy record name, such as proximity.stephanetheteacher.com, and set the TTL.

Note that creating a traffic policy record costs $50 per month, prorated for the duration it is kept. To stay within the free tier, avoid creating such policies unnecessarily.

Once created, the policy versions are visible. You can edit the policy and deploy new versions. The records created by the policy are listed and can be inspected.

Testing the Geoproximity Routing
Using the map and policy, users in Europe connect to the EU-Central-1 instance, users in Brazil connect to the US-East-1 instance, and users in Asia connect to the AP-Southeast-1 instance. This behavior can be verified by testing the DNS records from different locations.

In Route 53, the proximity record routes directly to the traffic policy record. Editing the record takes you back to the traffic policy UI for modifications.

Finally, to avoid incurring charges, delete the traffic policy record after demonstration. This concludes the lecture on Traffic Flow and Geoproximity routing.

Key Takeaways
Traffic Flow allows visual management of complex routing decision trees in Route 53.
Traffic Flow policies can be versioned, applied to multiple hosted zones, and easily modified.
Geoproximity routing uses regions and bias values to control traffic distribution visually.
Deploying Traffic Flow policies incurs a monthly cost, and policies can be edited and redeployed as new versions.

Routing Policy - IP-based
Introduction to IP-based Routing
Now, let's discuss another routing policy called IP-based Routing. This approach is intuitive because it defines routing based on client IP addresses.

In Route 53, you define a list of CIDRs, which are IP ranges for your clients. Based on the CIDR, you specify which location the traffic should be sent to.

The use cases for IP-based routing include optimizing performance because you know the IP ahead of time, and reducing network costs because you know where the IPs are coming from.

For example, if you know that a specific internet provider uses a specific CIDR of IP addresses, you can route their traffic to a specific endpoint using this strategy.

Example Setup in Route 53
In Route 53, you can define two locations with two different CIDR blocks. For instance, one CIDR block starts with 203, and the other starts with 200, each defining specific IP ranges.

These locations are linked to specific DNS records. For example, for example.com, location one with the first CIDR block routes traffic to the IP address 1.2.3.4, and location two with the second CIDR block routes traffic to 5.6.7.8.

These IP addresses represent the public IPs of two EC2 instances.

Routing Behavior
When a user connects with an IP address that belongs to the first CIDR block (location one), they are directed to the EC2 instance at IP 1.2.3.4.

Similarly, a user with an IP address in the second CIDR block (location two) will be redirected to the EC2 instance at IP 5.6.7.8 via DNS query response.

Conclusion
That concludes the explanation of IP-based routing. It is a simple yet effective routing policy based on client IP addresses.

Key Takeaways
IP-based routing defines routing policies based on client IP addresses using CIDR blocks.
Route 53 allows specifying CIDR ranges linked to specific geographic locations or endpoints.
This routing strategy optimizes performance and reduces network costs by directing traffic based on known IP ranges.
Users with IPs within defined CIDR blocks are routed to corresponding EC2 instances or endpoints.

--- 
Routing Policy - Multi Value
Multi-Value Routing Policy
Let's discuss the last routing policy, which is Multi-Value. This policy is used when you want to route traffic to multiple resources. Route 53 will therefore return multiple values or resources.

You can associate these resources with Health Checks. Therefore, the only resources returned via the Multi-Value policy are those associated with a healthy Health Check. Up to eight healthy records are returned for each Multi-Value query.

Although it looks like an Elastic Load Balancer (ELB), Multi-Value routing is not a substitute for having an ELB. The idea is that it provides client-side load balancing.

Example Setup
We will set up multiple A Records for our example.com domain and associate them with Health Checks. When a Multi-Value query is made by clients, it will receive up to eight records back. The clients will then choose one of them. By combining this with Health Checks, we ensure that the returned records are healthy, allowing clients to have very safe queries.

This differs from simple routing with multiple values because simple routing does not allow for Health Checks. Therefore, it is possible that one of the resources returned in a simple routing query is unhealthy. This is why Multi-Value routing is more powerful as a type of record.

Creating Multi-Value Records in the UI
Let's practice creating Multi-Value records. We will create a record named multi linked to the us-east-1 region. The Routing policy will be Multi-Value, and the Health Check will be us-east-1. The Record ID will be US, and the TTL will be 60 seconds.

Next, we add another record named multi routing to the ap-southeast-1 region. The Routing policy is Multi-Value answer, the Health Check is ap-southeast-1, the Record ID is Asia, and the TTL is one minute.

Finally, we add one more record named multi linked to eu-central-1. The TTL is one minute, the Routing policy is Multi-Value answer, the Health Check is eu-central-1, and the Record ID is EU.

The records are successfully created. Now, let's test them using CloudShell.

Testing Multi-Value Records
We reconnect to CloudShell and test the record by running a dig command. The command returns three answers, corresponding to the three IPs. This is because all three Health Checks are healthy.

If we make one Health Check unhealthy, for example, by inverting the health status of eu-central-1, the dig command will then return only two values. This demonstrates that the Multi-Value answer works as expected by returning only healthy resources.

To revert, we edit the Health Check and untick the invert health check status, restoring it to healthy.

This concludes the lecture on the Multi-Value routing policy.

Key Takeaways
Multi-Value routing policy returns multiple healthy resources up to eight per query.
Health Checks ensure only healthy resources are returned in Multi-Value routing.
Multi-Value routing enables client-side load balancing but is not a substitute for ELB.
Testing Multi-Value records can be done using dig commands and manipulating health check statuses.
