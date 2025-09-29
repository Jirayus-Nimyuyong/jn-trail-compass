API Gateway – Logging & Tracing

• CloudWatch Logs
• Log contains information about request/response body
• Enable CloudWatch logging at the Stage level (with Log Level - ERROR, DEBUG,
INFO)
• Can override settings on a per API basis

• X-Ray
• Enable tracing to get extra information about requests in API Gateway
• X-Ray API Gateway + AWS Lambda gives you the full picture

---

API Gateway – CloudWatch Metrics

• Metrics are by stage, Possibility to enable detailed metrics
• CacheHitCount & CacheMissCount: efficiency of the cache
• Count: The total number API requests in a given period.
• IntegrationLatency: The time between when API Gateway relays a
request to the backend and when it receives a response from the
backend.
• Latency: The time between when API Gateway receives a request from
a client and when it returns a response to the client. The latency
includes the integration latency and other API Gateway overhead.
• 4XXError (client-side) & 5XXError (server-side)

---

API Gateway Throttling

• Account Limit
• API Gateway throttles requests at10000 rps across all API
• Soft limit that can be increased upon request
• In case of throttling => 429 Too Many Requests (retriable error)
• Can set Stage limit & Method limits to improve performance
• Or you can define Usage Plans to throttle per customer
• Just like Lambda Concurrency, one API that is overloaded, if not
limited, can cause the other APIs to be throttled

---

API Gateway - Errors

• 4xx means Client errors
• 400: Bad Request
• 403: Access Denied, WAF filtered
• 429: Quota exceeded, Throttle

• 5xx means Server errors
• 502: Bad Gateway Exception, usually for an incompatible output returned from a
Lambda proxy integration backend and occasionally for out-of-order invocations due to
heavy loads.
• 503: Service Unavailable Exception
• 504: Integration Failure – ex Endpoint Request Timed-out Exception
API Gateway requests time out after 29 second maximum

---

API Gateway Monitoring, Logging and Tracing
API Gateway Logging and Tracing
Let's discuss API Gateway logging and tracing options.

The first option is to use CloudWatch Logs. When you enable CloudWatch log integration with API Gateway, you receive information about the request and the response body that passes through the API Gateway. This can be enabled at the Stage Level, where you define your Log Level, such as ERROR, DEBUG, or INFO. DEBUG provides the most detailed information. You can override this setting on a per-API basis.

To clarify, when a user makes a request to the API Gateway, that request is automatically logged into CloudWatch Logs. The request then reaches your backend, which sends a response back to the API Gateway. The response is also logged in CloudWatch Logs before being sent to the user. This logging is very helpful for capturing request and response data. However, be cautious when enabling this, as sensitive information may be logged into CloudWatch Logs.

AWS X-Ray provides tracing information about requests that go through the API Gateway. Enabling X-Ray for both API Gateway and Lambda offers a complete picture of your API's request flow.

API Gateway Monitoring with CloudWatch Metrics
API Gateway can be monitored using CloudWatch Metrics, which are available per stage. You can enable detailed metrics to gain deeper insights. Here are some key metrics to know:

CacheHitCount: Number of cache hits, indicating cache efficiency.
CacheMissCount: Number of cache misses, indicating inefficiency.
A high CacheHitCount means the cache is efficient, while a high CacheMissCount suggests the opposite.

IntegrationLatency: The time taken by the API Gateway to relay a request to the backend and wait for the response. This indicates how long the backend takes to reply.
Latency: The total time between when the API Gateway receives a request from the client and when it returns a response to the client. This includes IntegrationLatency plus additional processing by the API Gateway, such as authorization, authentication, cache checks, and mapping templates.
Latency is always slightly higher than IntegrationLatency.

Note that the maximum time API Gateway allows for processing any request is 29 seconds. If either Latency or IntegrationLatency exceeds 29 seconds, the API Gateway will time out the request.

There are also error metrics:

4XXError: Client-side errors, indicating issues from the clients using your API Gateway.
5XXError: Server-side errors, indicating problems with your backend.
These metrics help identify the source of errors in your API calls.

API Gateway Throttling and Limits
API Gateway supports throttling to protect your backend and ensure fair usage. By default, API Gateway throttles requests at 10,000 requests per second across all APIs as a soft limit, which can be increased upon request. This means if one API is heavily used, other APIs may also be throttled.

When throttling occurs, clients receive a 429 Too Many Requests error. This is a client error indicating that the client is sending too many requests. Clients should implement exponential backoff when retrying these requests.

To improve throttling and performance, you can set stage limits and method limits to ensure that no single stage consumes all request quotas, which is useful in case of attacks or heavy usage. Additionally, usage plans allow throttling on a per-customer basis.

Similar to Lambda concurrency limits, if one API is overloaded without limits, it can cause throttling on other APIs as well.

API Gateway Error Codes
Errors in API Gateway are categorized as follows:

4XX Errors (Client Errors): These originate from clients using your API Gateway. Examples include:

400: Bad Request
403: Access Denied or blocked by Web Application Firewall
429: Quota exceeded, indicating throttling
5XX Errors (Server Errors): These originate from your backend. Examples include:

502: Lambda proxy integration did not respond properly
503: Backend is unavailable
504: Integration Failure, often due to API Gateway request timeout after 29 seconds without a backend response
Understanding these error codes helps diagnose issues between clients, API Gateway, and backend services.

Conclusion
This concludes the overview of API Gateway monitoring, logging, and tracing. These tools and metrics are essential for maintaining the health and performance of your APIs.

Key Takeaways
API Gateway integrates with CloudWatch Logs to capture request and response data, configurable at the stage level with various log levels.
AWS X-Ray provides tracing information for requests passing through API Gateway and Lambda, offering comprehensive monitoring.
Important CloudWatch Metrics for API Gateway include CacheHitCount, CacheMissCount, IntegrationLatency, Latency, and error counts (4XX for client errors, 5XX for server errors).
API Gateway enforces throttling limits by default at 10,000 requests per second across all APIs, returning 429 errors when exceeded, and supports usage plans and stage/method limits to manage throttling.

---

