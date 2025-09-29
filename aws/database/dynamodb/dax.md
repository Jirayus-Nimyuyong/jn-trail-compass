DynamoDB Accelerator (DAX)

• Fully-managed, highly available, seamless in-memory
cache for DynamoDB
• Microseconds latency for cached reads & queries
• Doesn’t require application logic modification
(compatible with existing DynamoDB APIs)
• Solves the “Hot Key” problem (too many reads)
• 5 minutes TTL for cache (default)
• Up to 10 nodes in the cluster
• Multi-AZ (3 nodes minimum recommended for
production)
• Secure (Encryption at rest with KMS, VPC, IAM,
CloudTrail, …)

DynamoDB Accelerator (DAX) vs. ElastiCache

---

DynamoDB DAX
Introduction to DynamoDB Accelerator (DAX)
DynamoDB Accelerator, or DAX, is a fully-managed, highly available, and seamless in-memory cache for DynamoDB. The main idea behind DAX is to cache the most popular data, thereby achieving microsecond latency for cached reads and queries. Importantly, DAX does not require any changes to your application logic as it is compatible with existing DynamoDB APIs. To use DAX, you simply create a DAX cluster and start using it.

What Problem Does DAX Solve?
DAX addresses the hot key problem. When a specific key or item is read excessively, it can cause throttling on your read capacity units (RCUs). By caching these hot keys, DAX effectively eliminates this throttling issue.

Architecture Overview
DynamoDB consists of tables that your application accesses. Between your application and DynamoDB tables, you introduce a DAX cluster composed of cache nodes that you provision in advance. The application interacts directly with the DAX cluster, which in turn fetches data from the DynamoDB tables. This setup means that some data will be cached by default.

Cache Time-to-Live (TTL)
When thinking about cached data, it is important to consider the time-to-live (TTL). By default, cached data in a DAX cluster lives for five minutes before it expires.

DAX Cluster Nodes and Provisioning
A DAX cluster is made up of nodes that you must provision ahead of time. You can have up to 10 nodes in a cluster. For production environments, it is recommended to have at least three nodes in a multi-Availability Zone (AZ) setup, with one node in each AZ to ensure high availability.

Security Features
DAX is fully secure, offering encryption at rest, IAM application integration, VPC security, and CloudTrail integration among other security features.

Summary: Purpose of DAX
Remember, DAX is designed to help you cache the most popular items or queries from DynamoDB, improving read performance and reducing throttling.

Comparing DynamoDB Accelerator (DAX) and ElastiCache
A common question is the difference between DynamoDB Accelerator (DAX) and Amazon ElastiCache. Both can be used together in an architecture depending on your use case.

DAX is used as a cache for individual objects, queries, or scans. It is ideal for simple types of queries such as retrieving objects or performing scans.

ElastiCache is suitable when your application performs additional logic, such as scanning data, summing values, filtering, or other computationally expensive operations. Instead of repeating these operations every time, you can store the results in ElastiCache and retrieve them directly, avoiding repeated queries to DAX or DynamoDB.

Using DAX and ElastiCache Together
Using DAX and ElastiCache together can optimize your application's performance by caching simple queries with DAX and storing complex computation results in ElastiCache. This combination reduces load on DynamoDB and improves response times.

Creating a DAX Cluster
Next, we will explore how to create a DAX cluster to start leveraging its caching capabilities.

Key Takeaways
DynamoDB Accelerator (DAX) is a fully-managed, highly available in-memory cache for DynamoDB that provides microsecond latency for cached reads and queries.
DAX solves hot key problems by caching frequently accessed items, preventing throttling on read capacity units (RCUs).
A DAX cluster consists of cache nodes that must be provisioned in advance, with a recommended multi-AZ setup for production.
DAX is compatible with existing DynamoDB APIs and requires no changes to application logic.
DAX caches data with a default TTL of five minutes.
DAX and Amazon ElastiCache can be used together: DAX for caching simple queries and objects, ElastiCache for storing results of complex application-side computations to avoid repeated expensive operations.