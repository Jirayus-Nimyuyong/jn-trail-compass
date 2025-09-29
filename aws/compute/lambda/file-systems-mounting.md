Lambda – File Systems Mounting

• Lambda functions can access EFS file
systems if they are running in a VPC
• Configure Lambda to mount EFS file
systems to local directory during
initialization
• Must leverage EFS Access Points
• Limitations: watch out for the EFS
connection limits (one function instance =
one connection) and connection burst
limits

---

Lambda File Systems Mounting
Lambda File System Mounting
Let's discuss file system mounting for Lambda functions.

Your Lambda functions can access your EFS file system if they are running in a VPC. To achieve this, configure Lambda to mount the EFS file system to a local directory during the initialization phase.

For this to work, you must leverage the EFS access points feature of EFS. Suppose you have an EFS file system and you create an EFS access point. Then, if your Lambda functions are deployed in a private subnet that has private connectivity into your VPC, you are good to go.

However, there are limitations. For each Lambda instance that comes up, you will have one more connection into your EFS file system. Therefore, you need to ensure you do not hit the EFS connection limits. Also, if many different Lambda functions come up simultaneously as a burst, you may hit connection burst limits.

Comparing Storage Options for Lambda
Let's compare the storage options available for Lambda functions to understand which is best based on the situation.

Ephemeral Storage (/tmp)
Maximum size: 10 gigabytes, which is substantial.
Persistence: Ephemeral, meaning as soon as your Lambda function instance is destroyed, you lose the storage.
Content: Dynamic; you can modify it as you wish.
Type: File system supporting any file system operation.
Included storage: Up to 512 megabytes included; you pay for extra storage beyond that.
Access: Only your function has access; storage is based on your Lambda function.
Performance: Fastest data retrieval level.
Sharing: Not shared across Lambda function invocations.
Lambda Layers
Maximum size: Five layers per function, up to 250 megabytes total to not exceed the maximum Lambda package size.
Persistence: Durable because it is immutable; you cannot change what goes into a Lambda Layer.
Type: Archive; static.
Pricing: Included in your Lambda function pricing.
Access: Requires proper IAM permissions.
Performance: Fast access speed because it is attached as storage to your Lambda function.
Sharing: Shared across all your Lambda invocations.
Modification: You cannot modify data on the Lambda Layer.
Amazon S3
Size: Virtually unlimited.
Persistence: Durable.
Content: Dynamic.
Type: Object storage; accessed using the S3 API.
Operations: Supports atomic operations such as get, put, post, with versioning.
Pricing: Pay for storage, requests, and data transfer.
Access: Requires proper IAM permissions.
Performance: Network-based storage with dedicated AWS bandwidth; not the fastest.
Sharing: Shared across all Lambda invocations as it is external storage.
Amazon EFS
Elastic and durable.
Content: Dynamic.
Type: File system; accessed using any file system operation.
Pricing: Pay for storage, data transfer, and throughput.
Access: Mounted as a network file system on your Lambda function.
Performance: Very fast access to data.
Sharing: Shared across all Lambda invocations.
Hopefully, this comparison clarifies the different storage options available for Lambda functions.

Key Takeaways
Lambda functions can mount EFS file systems when running in a VPC using EFS access points.
Ephemeral storage (/tmp) offers up to 10 GB of temporary, dynamic file system storage unique to each Lambda instance.
Lambda Layers provide immutable, durable storage up to 250 MB shared across all invocations.
Amazon S3 offers virtually unlimited, durable object storage accessed via API, shared across invocations.
Amazon EFS provides elastic, durable, dynamic file system storage mounted as a network file system, shared across invocations.

