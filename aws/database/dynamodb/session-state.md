DynamoDB as Session State Cache

• It’s common to use DynamoDB to store session states
• vs. ElastiCache
• ElastiCache is in-memory, but DynamoDB is serverless
• Both are key/value stores
• vs. EFS
• EFS must be attached to EC2 instances as a network drive
• vs. EBS & Instance Store
• EBS & Instance Store can only be used for local caching, not shared caching
• vs. S3
• S3 is higher latency, and not meant for small objects

---

DynamoDB Session State
Introduction to DynamoDB for Session State
DynamoDB can be used to store data, but it can also be used to store the session state as a cache. This is something that your web application can utilize. Therefore, web applications can retrieve or store the session states on demand and share the user login, for example, across all your backend web applications. This is a very common use case for DynamoDB.

Comparing DynamoDB and ElastiCache for Session State Storage
ElastiCache and DynamoDB achieve the same purpose in storing session states. The question you may ask yourself is: what is the difference between using DynamoDB or ElastiCache to store the session states?

ElastiCache is fully in-memory.
DynamoDB is serverless.
Both are key/value stores.
If the exam mentions a session state store that is in memory, it probably means ElastiCache. If it talks about automatic scaling and so on, then DynamoDB is probably the right choice. This is something to look for in the exam.

Alternative Session State Storage Options
Another way to store session states is on disk, which requires sharing that disk across many EC2 instances. EFS could be a great choice for this purpose. EFS must be attached to your EC2 instances as a network drive, and this could work as an alternative to DynamoDB.

However, EFS is a file system, whereas DynamoDB is a database. This distinction is important.

Local Caching with EBS and EC2 Instance Store
You might wonder about EBS volumes and EC2 instance stores. While these are storage options, they can only be used for local caching, not shared caching. This is because your EBS drives and instance stores are attached to only one EC2 instance.

Therefore, they are suitable for caching a local dataset but not for sharing it across many instances.

Using S3 for Session State
S3 could be used for session states; however, it has higher latency. It is designed for big files, not for small objects. Therefore, S3 as a session state cache is not an ideal tool.

Summary of Best Options for Session State Storage
The best three options for session state storage are DynamoDB, ElastiCache, and EFS. Preferably, DynamoDB and ElastiCache are used. The choice depends on whether you want something in memory or something that is more serverless and with automatic scaling.

Conclusion
This concludes the discussion on DynamoDB session state storage. We will continue with the next lecture.

Key Takeaways
DynamoDB can be used to store session state as a cache, enabling web applications to retrieve or store session states on demand.
ElastiCache and DynamoDB both serve as key/value stores for session state, with ElastiCache being fully in-memory and DynamoDB being serverless with automatic scaling.
EFS can be used for shared disk storage across EC2 instances, suitable for session state storage, unlike EBS or EC2 instance store which are local only.
S3 is not ideal for session state caching due to higher latency and its design for large files rather than small objects.