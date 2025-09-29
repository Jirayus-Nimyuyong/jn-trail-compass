Amazon ElastiCache Overview
• The same way RDS is to get managed Relational Databases…
• ElastiCache is to get managed Redis or Memcached
• Caches are in-memory databases with really high performance, low
latency
• Helps reduce load off of databases for read intensive workloads
• Helps make your application stateless
• AWS takes care of OS maintenance / patching, optimizations, setup,
configuration, monitoring, failure recovery and backups
• Using ElastiCache involves heavy application code changes

ElastiCache
Solution Architecture - DB Cache

• Applications queries
ElastiCache, if not
available, get from RDS
and store in ElastiCache.
• Helps relieve load in RDS
• Cache must have an
invalidation strategy to
make sure only the most
current data is used in
there.

ElastiCache
Solution Architecture – User Session Store
• User logs into any of the
application
• The application writes
the session data into
ElastiCache
• The user hits another
instance of our
application
• The instance retrieves the
data and the user is
already logged in

ElastiCache – Redis vs Memcached
Redis
• Multi AZ with Auto-Failover
• Read Replicas to scale reads and
have high availability
• Data Durability using AOF
persistence
• Backup and restore features
• Supports Sets and Sorted Sets

Memcached
• Multi-node for partitioning of
data (sharding)
• No high availability (replication)
• Non persistent
• Backup and restore (Serverless)
• Multi-threaded architecture

Caching Implementation Considerations
• Read more at: https://aws.amazon.com/caching/implementation-
considerations/
• Is it safe to cache data? Data may be out of date, eventually consistent
• Is caching effective for that data?
• Pattern: data changing slowly, few keys are frequently needed
• Anti patterns: data changing rapidly, all large key space frequently needed
• Is data structured well for caching?
• example: key value caching, or caching of aggregations results
• Which caching design pattern is the most appropriate?

Lazy Loading / Cache-Aside / Lazy Population
• Pros
• Only requested data is
cached (the cache isn’t filled
up with unused data)
• Node failures are not fatal
(just increased latency to
warm the cache)
• Cons
• Cache miss penalty that
results in 3 round trips,
noticeable delay for that
request
• Stale data: data can be
updated in the database and
outdated in the cache

Cache Evictions and Time-to-live (TTL)
• Cache eviction can occur in three ways:
• You delete the item explicitly in the cache
• Item is evicted because the memory is full and it’s not recently used (LRU)
• You set an item time-to-live (or TTL)
• TTL are helpful for any kind of data:
• Leaderboards
• Comments
• Activity streams
• TTL can range from few seconds to hours or days
• If too many evictions happen due to memory, you should scale up or out

Final words of wisdom
• Lazy Loading / Cache aside is easy to implement and works for many
situations as a foundation, especially on the read side
• Write-through is usually combined with Lazy Loading as targeted for the
queries or workloads that benefit from this optimization
• Setting a TTL is usually not a bad idea, except when you’re using Write-
through. Set it to a sensible value for your application
• Only cache the data that makes sense (user profiles, blogs, etc…)
• Quote: There are only two hard things in Computer Science: cache
invalidation and naming things

Amazon MemoryDB for Redis
• Redis-compatible, durable, in-memory database service
• Ultra-fast performance with over 160 millions requests/second
• Durable in-memory data storage with Multi-AZ transactional log
• Scale seamlessly from 10s GBs to 100s TBs of storage
• Use cases: web and mobile apps, online gaming, media streaming, …

--- 
ElastiCache Overview
Let's talk about Amazon ElastiCache.

Similar to how Amazon RDS provides managed relational databases, ElastiCache offers managed Redis or Memcached, which are caching technologies.

What Are Caches?
Caches are in-memory databases characterized by very high performance and low latency. They help reduce the load on databases for read-intensive workloads by caching common queries. This means your database is not queried every time; instead, the cache retrieves the results of these queries.

Using a cache also helps make your application stateless by storing the application's state in Amazon ElastiCache.

Just like with RDS, AWS handles maintenance tasks for ElastiCache, including operating system management, patching, optimization, setup, configuration, monitoring, failure recovery, and backups.

However, using Amazon ElastiCache requires significant application code changes. It is not something you simply enable and start using. Your application must be modified to query the cache before or after querying the database. We will discuss caching strategies shortly.

ElastiCache Architecture Example
Consider an architecture with Amazon ElastiCache, an RDS database, and your application. The application first queries ElastiCache to check if the data is already cached.

If the data is found in ElastiCache, this is called a cache hit, and the application retrieves the answer directly from the cache, saving a trip to the database.

In the case of a cache miss, the application fetches the data from the database. Then, for subsequent queries, the data is written back into the cache so that the same query will result in a cache hit next time.

This approach helps relieve load from your RDS database. However, because data is stored in the cache, a cache invalidation strategy is necessary to ensure that only the most current data is used. This is a key challenge when using caching technologies.

Using ElastiCache for User Sessions
Another architecture involves storing user session data in ElastiCache to make your application stateless. When a user logs in, the application writes the session data into Amazon ElastiCache.

If the user is redirected to another instance of your application, that instance can retrieve the session directly from ElastiCache, allowing the user to remain logged in without needing to log in again.

Thus, by storing session data in ElastiCache, you make your application stateless.

Comparing Redis and Memcached
For Redis:

Supports multi-availability zones with auto-failover.
Allows creation of read replicas to scale reads and ensure high availability.
Provides data durability through Append Only File (AOF) persistence.
Offers backup and restore features in the open-source version.
Supports sets and sorted sets, useful for features like leaderboards.
A conceptual way to think about Redis is as a node replicated into another node, providing redundancy and availability. Note that Redis is evolving rapidly, so this is a simplification.

For Memcached:

Uses multiple nodes that partition your data, a process called sharding.
Does not provide high availability or replication.
The serverless version offers backup and restore features, but the self-managed version on ElastiCache does not.
Employs a multi-threaded architecture, which can improve performance.
Conceptually, Memcached nodes shard data across multiple nodes that work together to partition and share the data.

While the exam may not focus heavily on choosing between Redis and Memcached, it is useful to understand their differences and use cases as a reference.

That concludes this overview of Amazon ElastiCache. I hope you found it helpful, and I will see you in the next lecture.

Key Takeaways
Amazon ElastiCache provides managed Redis and Memcached caching services to reduce database load for read-intensive workloads.
Caches are in-memory databases offering high performance and low latency, enabling stateless applications by storing state externally.
Cache hit and miss strategies optimize data retrieval, but require careful cache invalidation to maintain data consistency.
Redis supports multi-availability zones, replication, persistence, and advanced data structures, while Memcached offers sharding and multi-threading but lacks replication and high availability.

ElastiCache Strategies
Introduction to Caching Strategies
Let's delve deeper into different caching strategies you can implement and the considerations involved. For further reading, I recommend the linked resource which forms the basis of this lecture with some additional insights.

Is it safe to cache data? Generally, yes, but sometimes your data may be out of date, leading to eventual consistency. Caching is not suitable for every type of dataset. You need to ensure that it is appropriate to cache your data.

Another question to consider is whether caching is effective for your data. For example, if your data changes slowly and a few keys are frequently accessed, caching can be very effective. However, if your data changes very rapidly and you need the entire key space, caching might not be as beneficial.

You also need to ask if your data is structured correctly for caching. Key-value pairs or aggregated results are ideal for caching. Since caching is about saving time and optimizing access speed, your data should be structured appropriately for your queries.

Choosing the Appropriate Caching Design Pattern
The most important question is which caching design pattern is most appropriate for your use case. We will now discuss several common strategies.

Lazy Loading (Cache-Aside or Lazy Population)
This strategy involves three components: your application, Amazon ElastiCache (such as Redis or Memcached), and Amazon RDS.

When your application requests data, it first queries the cache. If the cache contains the data (a cache hit), it returns it immediately. If the cache does not have the data (a cache miss), the application retrieves the data from the database, then writes it to the cache for future requests.

This approach caches only requested data, making it efficient. If the cache is wiped or a node fails, the system is not fatally affected; it just experiences increased latency while the cache warms up as reads go to the database and are cached.

However, there are some drawbacks. A cache miss results in three network calls: from the application to ElastiCache (miss), from the application to RDS (read), and a write to the cache. This can cause latency and a poor user experience. Additionally, stale data can occur if updates in RDS are not immediately reflected in the cache, leading to eventual consistency issues.

The exam expects you to understand the Cache-Aside or Lazy Loading pattern.

Lazy Loading Example in Python
Here is a Python function illustrating the Lazy Loading strategy:

The function get_user takes a user_id as an argument.
It first attempts to retrieve the user record from the cache.
If the record is found (cache hit), it returns it immediately.
If the record is not found (cache miss), it queries the database, caches the result, and then returns it.
python Code Sample
def get_user(user_id):
    record = cache.get(user_id)
    if record is None:
        record = db.query("SELECT * FROM users WHERE id = %s", user_id)
        cache.set(user_id, record)
    return record
Write Through Caching Strategy
The Write Through strategy updates the cache whenever the database is updated. The components remain the same: application, ElastiCache, and RDS.

When the application writes to the database, it also writes the updated data to the cache. This ensures that the cache is never stale.

This approach introduces a write penalty because each write requires two calls: one to the database and one to the cache. However, users generally expect writes to take longer than reads, so this penalty is often acceptable.

A downside is that the cache may not have all data until it is written to the database. To mitigate this, Write Through can be combined with Lazy Loading, where cache misses trigger loading from the database.

Write Through Example in Python
This function save_user demonstrates the Write Through strategy:

It updates the user record in the database.
Then it updates the cache with the new record.
Finally, it returns the updated record.
python Code Sample
def save_user(user_id, user_data):
    record = db.query_update("UPDATE users SET data = %s WHERE id = %s", user_data, user_id)
    cache.set(user_id, record)
    return record
Cache Evictions and Time-to-Live (TTL)
Caches have limited size, so cache eviction policies remove data when necessary.

Eviction can occur explicitly by deleting items or automatically when the cache is full. The Least Recently Used (LRU) policy evicts items that have not been accessed recently.

Time-to-Live (TTL) sets an expiration time for cached items, after which they are evicted. TTL is useful for data such as leaderboards, comments, or activity streams.

TTL values can range from seconds to days depending on the application. Even very short TTLs can be effective for frequently requested data.

If you experience too many evictions due to full cache memory, consider scaling your cache size up or out.

Final Thoughts on Caching
Lazy Loading (Cache-Aside) is easy to implement and works well for many situations, especially to improve read performance. It is a good foundation strategy.

Write Through is more involved and is typically an optimization applied after Lazy Loading to reduce cache staleness.

TTL is generally beneficial except when using Write Through, where it should be set to a sensible value.

Only cache data that makes sense, such as user profiles or blogs, but avoid caching sensitive or rapidly changing data like pricing or bank account balances.

As a famous quote says, "There are two hard things in Computer Science: cache invalidation and naming things." Caching is indeed complex, and this lecture provides an introduction. For the exam, you should understand different caching strategies, their pseudocode, and implications.

Key Takeaways
Caching is generally safe but may lead to eventual consistency and stale data.
Lazy Loading (Cache-Aside) caches data only when requested, optimizing read performance.
Write Through updates the cache immediately when the database is updated, preventing stale data but incurring write penalties.
Cache Eviction and Time-to-Live (TTL) strategies manage cache size and data freshness effectively.

Amazon MemoryDB for Redis - Overview
Introduction to Amazon MemoryDB for Redis
Amazon MemoryDB for Redis is a Redis-compatible, durable, in-memory database service.

Differences Between Redis and MemoryDB for Redis
While Redis is intended primarily to be used as a cache with some durability, MemoryDB for Redis is designed as a database with a Redis-compatible API. This distinction means MemoryDB offers durable data storage with ultra-fast performance.

MemoryDB for Redis delivers ultra-fast performance, capable of handling over 160 million requests per second. It stores data in-memory but ensures durability through Multi-AZ transaction logs.

Scalability and Use Cases
MemoryDB scales seamlessly from tens of gigabytes to hundreds of terabytes of storage. Its use cases include web and mobile applications, online gaming, media streaming, and other scenarios where microservices require access to a Redis-compatible in-memory database.

By using MemoryDB for Redis, you gain ultra-fast in-memory speed combined with a Multi-AZ transaction log stored across multiple availability zones. This setup provides fast recovery and data durability when needed.

This overview should provide sufficient understanding for exam preparation regarding Amazon MemoryDB for Redis.

Key Takeaways
Amazon MemoryDB for Redis is a Redis-compatible, durable, in-memory database service.
Unlike Redis, which is primarily a cache with some durability, MemoryDB functions as a durable database with a Redis-compatible API.
MemoryDB offers ultra-fast performance, handling over 160 million requests per second, with Multi-AZ transaction logs for data durability.
It scales seamlessly from tens of gigabytes to hundreds of terabytes, ideal for web and mobile applications, online gaming, media streaming, and microservices requiring fast, durable in-memory data access.
