Amazon CloudFront
• Content Delivery Network (CDN)
• Improves read performance,
content is cached at the edge
• Improves users experience
• Hundreds of Points of Presence
globally (edge locations, caches)
• DDoS protection (because
worldwide), integration with Shield,
AWS Web Application Firewall

CloudFront – Origins
• S3 bucket
• For distributing files and caching them at the edge
• For uploading files to S3 through CloudFront
• Secured using Origin Access Control (OAC)
• VPC Origin
• For applications hosted in VPC private subnets
• Application Load Balancer / Network Load Balancer / EC2 Instances
• Custom Origin (HTTP)
• S3 website (must first enable the bucket as a static S3 website)
• Any public HTTP backend you want

CloudFront at a high level

CloudFront – S3 as an Origin

CloudFront vs S3 Cross Region Replication
• CloudFront:
• Global Edge network
• Files are cached for a TTL (maybe a day)
• Great for static content that must be available everywhere
• S3 Cross Region Replication:
• Must be setup for each region you want replication to happen
• Files are updated in near real-time
• Read only
• Great for dynamic content that needs to be available at low-latency in few
regions
---
CloudFront - Overview
Now let us talk about CloudFront.

What is CloudFront?
CloudFront is a content delivery network or CDN. Whenever you see CDN in the exam, think CloudFront.

It improves read performance by caching the content of your website at different edge locations. Because your content is cached around the world, your users will have lower latency and this will improve the user experience.

CloudFront is made of hundreds of points of presence globally, and that includes edge locations and caches across the world.

Edge Locations and DDoS Protection
On top of that, by having the content distributed globally, we are getting DDoS protection. DDoS is a sort of attack where all your servers around the world are getting attacked at the same time. We will see this later on in this course. The idea is that CloudFront, because your application is worldwide, helps protect you against these attacks also using services called Shield and Web Application Firewall that we will be seeing in the security section.

If you want to look at a map of the world, these are the maps and we see some edge locations as well as edge caches.

Example: S3 Origin and Global Users
And so, say we had created an S3 bucket and a website on our S3 bucket in Australia, but we had a user in America. The user will request the content from an American edge location using CloudFront, and CloudFront will fetch the content from Australia. If another user in the US requests the same content, it will be served directly from the edge and will not go all the way to Australia to serve that content.

Similarly, if a user is in China, the user will connect to a Chinese point of presence which will be redirected to the S3 buckets, and the content will be cached at the edge.

Origins — Backends for CloudFront
CloudFront has several types of origins, which are basically backends you want to connect CloudFront to. We have Amazon S3 buckets for distributing files and caching them at the edge. There is also a way to upload files to Amazon S3 directly through CloudFront. The connection between CloudFront and your S3 bucket is secured using something called an OAC, an Origin Access Control.

You can also have a VPC origin. If you have an application hosted in private subnets in a VPC, for example, it could be an Application Load Balancer, a Network Load Balancer, or an EC2 instance. You can connect CloudFront directly to them privately.

You can also have any custom origin. Anything that uses HTTP can be used as a backend. For example, it could be a website hosted on Amazon S3. First we must make sure that the S3 bucket is enabled as a static S3 website or any public HTTP backend you want, within or outside of AWS.

How CloudFront Works (High Level)
At a high level, CloudFront uses edge locations all around the world and connects them to your origin, whether that is an S3 bucket or an HTTP server. When a client connects and makes an HTTP request to an edge location, the edge location checks whether it has the requested object in its cache. If it does not have it in the cache, the edge location goes to the origin to retrieve the object. Once it retrieves the results, it caches them in the local cache so that if another client requests the same content from the same edge location, the edge location does not need to go to the origin.

If we have S3 as an origin, your S3 bucket is the origin in some region, and then you have edge locations all around the world, for example in Los Angeles. Users accessing the edge location in Los Angeles will get their content directly served through the edge location. First the edge location will get the content from the origin S3 bucket through the private network. The S3 bucket will be secured using an Origin Access Control and by modifying the S3 bucket policy.

This is the same when we have a user in Sao Paulo, for example in Brazil. That user will be served by another edge location close to Brazil, and there will be a private connection between the edge location and the S3 bucket.

Using CloudFront and edge locations, the content of an S3 bucket in one region can be distributed all around the world through the edge locations or points of presence.

CloudFront vs S3 Cross Region Replication
One common question is: what is the difference between CloudFront and something like S3 Replication?

If you use CloudFront, you are using the Global Edge network, which is about 216 points of presence. Files cached in each edge location may be cached for a day. CloudFront is ideal for static content that must be available everywhere around the world.

S3 Cross Region Replication is different. It must be set up for each region you want replication to happen, so it is not for every region by default. Files are updated in near real time. There is no caching with replication, and it is only for read-only copies. This is useful for dynamic content that changes frequently and must be available at low latency in a few regions.

These serve very different purposes: CloudFront is a CDN to cache content globally, whereas S3 Cross Region Replication replicates an entire bucket into another region.

Hopefully that makes sense about CloudFront. In the next lecture we will have a play and see how we can set up a CloudFront distribution on the cloud for an S3 bucket. We will see you in the next lecture.

Key Takeaways
CloudFront is a CDN that caches website content at global edge locations to reduce latency and improve user experience.
Cached content at edge locations provides additional protection against DDoS when combined with Shield and Web Application Firewall.
CloudFront supports multiple origin types: Amazon S3 (with Origin Access Control), VPC origins (ALB, NLB, EC2), and custom HTTP origins.
CloudFront (caching via global edge network) serves a different purpose than S3 Cross Region Replication (region-to-region replication without caching).