Caching API responses

• Caching reduces the number of calls made to
the backend
• Default TTL (time to live) is 300 seconds
(min: 0s, max: 3600s)
• Caches are defined per stage
• Possible to override cache settings per
method
• Cache encryption option
• Cache capacity between 0.5GB to 237GB
• Cache is expensive, makes sense in
production, may not make sense in dev / test

---

API Gateway Cache Invalidation

• Able to flush the entire cache
(invalidate it) immediately
• Clients can invalidate the
cache with header: Cache-
Control: max-age=0 (with
proper IAM authorization)
• If you don't impose
an InvalidateCache policy (or
choose the Require
authorization check box in
the console), any client can
invalidate the API cache

---

API Gateway Caching
Introduction to API Gateway Caching
Caching in API Gateway is a technique used to reduce the number of calls made to the backend. When clients send requests to the API Gateway, it first checks the cache. If a cached result exists, it returns that result immediately. Otherwise, on a cache miss, the API Gateway forwards the request to the backend to obtain the response. This approach leverages caching to reduce backend load.

The default Time To Live (TTL) for cached results is 300 seconds, which equals five minutes. The minimum TTL is zero, meaning no caching, and the maximum TTL is one hour. Cache configurations are defined at the stage level, with one cache per stage. It is also possible to override cache settings at the method level, allowing specific methods to disable caching if desired.

Cache data can be encrypted, and the cache size ranges from 0.5 gigabytes up to 237 gigabytes. Because caching can be expensive, it is recommended primarily for production environments. In development or testing environments, where request volume is typically low, caching may not be necessary.

Cache Invalidation
Cache invalidation can be performed immediately for the entire cache from the API Gateway console user interface. Additionally, clients can invalidate the cache by including a header in their request to the API Gateway: Cache-Control: max-age=0. However, clients must have proper IAM authorization to perform cache invalidation.

An IAM policy can be configured to allow a client to invalidate the cache on a specific resource. If no such policy is enforced or authorization is not required, any client could invalidate the API cache, which could lead to undesirable consequences.

Hands-On: Enabling Cache on API Gateway
To enable caching, navigate to the production stage and edit the stage details. In the cache settings, enable caching and select the cache capacity. Larger capacities are suitable if you have many different API calls to cache. You can also choose whether to encrypt the cache data and specify the cache TTL, which determines how long records live in the cache. The TTL can be set anywhere between zero and 3,600 seconds (one hour), with 300 seconds (five minutes) as a good default.

Per-key cache invalidation is also available, allowing specific cache entries to be invalidated based on their keys. However, this feature can be risky, so it is advisable to require authorization for cache invalidation. If a request is unauthorized, you can configure the system to either ignore the cache control header, fail with a 403 error, or add a warning.

After saving these settings, caching will be enabled for the entire API. You can further customize caching on a per-method basis. For example, for a GET method, you can override the cache settings by defining a specific TTL and cache invalidation rules.

Testing the Cache
To test caching, access the stage endpoint. The first request will invoke the backend Lambda function and return "hello from Lambda." Subsequent requests with the same route and arguments will return the cached result from API Gateway instead of invoking Lambda again. This behavior reduces repeated backend calls for identical requests.

Conclusion
Remember to disable the API cache when it is no longer needed to avoid incurring unnecessary charges. Caching is a powerful feature to optimize API performance and reduce backend load, especially in production environments.

Key Takeaways
API Gateway caching reduces backend calls by storing responses for reuse.
Cache settings include TTL (default 300 seconds), size (0.5 to 237 GB), and encryption.
Cache is defined at the stage level but can be overridden per method.
Cache invalidation requires proper IAM authorization to prevent unauthorized clearing.