CloudFront - Pricing

• CloudFront Edge locations are all around the world
• The cost of data out per edge location varies

CloudFront – Price Classes
• You can reduce the number of edge locations for cost reduction
• Three price classes:
1. Price Class All: all regions – best performance
2. Price Class 200: most regions, but excludes the most expensive regions
3. Price Class 100: only the least expensive regions

CloudFront – Multiple Origin
• To route to different kind of origins based on the content type
• Based on path pattern:
• /images/*
• /api/*
• /*

CloudFront – Origin Groups
• To increase high-availability and do failover
• Origin Group: one primary and one secondary origin
• If the primary origin fails, the second one is used

CloudFront – Field Level Encryption
• Protect user sensitive information through application stack
• Adds an additional layer of security along with HTTPS
• Sensitive information encrypted at the edge close to user
• Uses asymmetric encryption
• Usage:
• Specify set of fields in POST requests that you want to be encrypted (up to 10 fields)
• Specify the public key to encrypt them


---
CloudFront Advanced Concepts
Let's explore some advanced options for CloudFront that may appear in the exam.

Pricing and Price Classes
CloudFront edge locations are distributed worldwide, and the cost of data transfer out varies by edge location region. The following table illustrates pricing differences based on continent or geographic region.

For example, in Mexico, the United States, and Canada, the first 10 terabytes cost $0.08 per gigabyte.
In India, the cost is approximately twice as much at $0.17 per gigabyte.
The more data transferred out of CloudFront, the lower the cost per gigabyte.
For data transfer exceeding five petabytes, the cost in the United States drops to $0.02 per gigabyte.
Price Classes
To reduce costs, you can limit the number of edge locations used by your CloudFront distribution. There are three price classes available:

Price Class All: Includes all regions, offering the best performance but at a higher cost.
Price Class 200: Includes most regions but excludes the most expensive ones.
Price Class 100: Includes only the least expensive regions.
This is summarized in the following diagram:

Price Class 100 covers North America and Europe.
Price Class 200 adds some additional regions.
Price Class All includes the entire world.
Multiple Origins and Origin Groups
CloudFront supports multiple origins and origin groups to enable routing based on content type or path, and to increase high availability through failover mechanisms.

Multiple Origins
You can route requests to different origins based on the path or content type. For example:

Requests to /API/* can be routed to an Application Load Balancer origin.
All other requests can be routed to an S3 bucket origin.
This is configured by setting different cache behaviors with path patterns in CloudFront.

Origin Groups
Origin groups provide high availability by defining a primary and a secondary origin. If the primary origin fails, CloudFront automatically fails over to the secondary origin.

For example, an origin group can consist of two EC2 instances:

The first EC2 instance is the primary origin.
The second EC2 instance is the secondary origin.
If the primary origin returns an error, CloudFront retries the request on the secondary origin.

This failover mechanism also applies to S3 buckets. By configuring origin groups with S3 buckets in different regions and enabling replication between them, you achieve regional high availability and disaster recovery for your CloudFront distribution.

Field-Level Encryption
Field-level encryption protects sensitive information throughout the application stack by adding an additional security layer alongside HTTPS encryption in transit.

When a user sends sensitive data, such as credit card information, the CloudFront edge location encrypts specified fields using a public key. Only the web server with access to the corresponding private key can decrypt these fields.

How Field-Level Encryption Works
The client sends a POST request over HTTPS to the CloudFront edge location.
The edge location encrypts up to 10 specified fields using the public key.
The encrypted data is forwarded over HTTPS through CloudFront and the Application Load Balancer to the origin web server.
The web server uses the private key to decrypt the encrypted fields.
This ensures that sensitive data remains encrypted throughout the transit and only the origin server can access the decrypted information.

Summary
This lecture covered advanced CloudFront concepts including pricing and price classes, multiple origins and origin groups for routing and high availability, and field-level encryption for enhanced security of sensitive data.

Key Takeaways
CloudFront pricing varies by geographic region and data transfer volume.
Price classes allow cost optimization by limiting edge locations used.
Multiple origins and origin groups enable routing based on content and high availability.
Field-level encryption provides additional security for sensitive data in transit.
