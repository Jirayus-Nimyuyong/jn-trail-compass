S3 – Access Points

• Access Points simplify security management for S3 Buckets
• Each Access Point has:
• its own DNS name (Internet Origin or VPC Origin)
• an access point policy (similar to bucket policy) – manage security at scale

S3 – Access Points – VPC Origin
• We can define the access
point to be accessible
only from within the VPC
• You must create a VPC
Endpoint to access the
Access Point (Gateway
or Interface Endpoint)
• The VPC Endpoint Policy
must allow access to the
target bucket and Access
Point
---
S3 Access Points
Introduction to S3 Access Points
Let's discuss S3 access points. Consider an S3 bucket containing a large amount of data, such as finance data and sales data. Different users or groups require access to their respective data segments. Managing access through a single, complex S3 bucket policy can become increasingly unmanageable as the number of users and data grows.

The Solution: S3 Access Points
The solution is to create S3 access points. For example, we can create a finance access point connected to the finance data. This connection is established by defining an access point policy, which resembles an S3 bucket policy. This policy grants read and write access specifically to the finance prefix.

Similarly, a sales access point can be created, connected to the sales data via its own access point policy. This policy grants read and write access to the sales prefix. Thus, we have two distinct policies attached to two separate access points.

An analytics access point can also be created, which points to both finance and sales data but with read-only access. This is achieved by defining a read-only policy on the analytics access point.

Benefits of Using Access Points
By using access points, security management is shifted from the S3 bucket policy to individual access points, each with its own security policy. With proper IAM permissions, users can access only the relevant access points: finance users connect exclusively to the finance access point, sales users to the sales access point, and analytics users can access both finance and sales data simultaneously.

This approach defines different ways to access an S3 bucket, resulting in a simple and scalable security management system. Each access point has its own policy, and the bucket policy remains straightforward.

Summary of Access Points
Access points simplify security management for S3 buckets.
Each access point has its own DNS name, which is used to connect.
Connections can be made via the internet as an origin or through a VPC for private traffic.
Each access point has an attached policy similar to a bucket policy, enabling scalable security management.
VPC Origin and Private Access
S3 access points can be defined to be privately accessible through a VPC origin. For example, an EC2 instance within a VPC can access the S3 bucket through the VPC access point without traversing the internet. To enable this, a VPC endpoint must be created to access the access point privately through the VPC origin.

The VPC endpoint has its own policy, which must allow access to the target buckets and access points. This policy enables the EC2 instance to connect securely to both the VPC access points on Amazon S3 and the S3 buckets.

Layered Security Model
In this setup, security is enforced at multiple levels:

VPC endpoint policy controls private connectivity.
Access point policies manage access permissions.
S3 bucket policies provide overarching security controls.
Conclusion
That concludes the discussion on S3 access points. This approach provides a scalable and manageable way to control access to large S3 buckets with diverse data and user groups.

Key Takeaways
S3 Access Points simplify security management by allowing distinct policies per access point.
Access points can be configured to grant specific read/write permissions to different data prefixes within a bucket.
Access points have unique DNS names and can be connected via the internet or through a VPC for private access.
VPC endpoints with appropriate policies enable secure, private connectivity to S3 access points without traversing the internet.