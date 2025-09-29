Lambda Concurrency and Throttling
• Concurrency limit: up to 1000 concurrent executions
• Can set a “reserved concurrency” at the function level (=limit)
• Each invocation over the concurrency limit will trigger a “Throttle”
• Throttle behavior:
• If synchronous invocation => return ThrottleError - 429
• If asynchronous invocation => retry automatically and then go to DLQ
• If you need a higher limit, open a support ticket

---

Lambda Concurrency Issue
• If you don’t reserve (=limit) concurrency, the following can happen:

---

Concurrency and Asynchronous Invocations

• If the function doesn't have enough
concurrency available to process all
events, additional requests are
throttled.
• For throttling errors (429) and
system errors (500-series), Lambda
returns the event to the queue and
attempts to run the function again
for up to 6 hours.
• The retry interval increases
exponentially from 1 second after
the first attempt to a maximum of
5 minutes.

---

Cold Starts & Provisioned Concurrency

• Cold Star t:
• New instance => code is loaded and code outside the handler run (init)
• If the init is large (code, dependencies, SDK…) this process can take some time.
• First request served by new instances has higher latency than the rest
• Provisioned Concurrency:
• Concurrency is allocated before the function is invoked (in advance)
• So the cold start never happens and all invocations have low latency
• Application Auto Scaling can manage concurrency (schedule or target utilization)
• Note:
• Note: cold starts in VPC have been dramatically reduced in Oct & Nov 2019
• https://aws.amazon.com/blogs/compute/announcing-improved-vpc-networking-for-aws-lambda-functions/

---

Reserved and Provisioned Concurrency

---

Lambda Concurrency
Lambda Concurrency and Throttling
As we invoke our Lambda functions more frequently, the number of concurrent executions increases. Lambda is designed to scale very quickly and efficiently. For example, at a low invocation rate, there may be only two concurrent executions, but at a high scale, there could be up to 1000 concurrent Lambda executions processing events simultaneously.

To manage this scaling, it is recommended to set a reserved concurrency limit at the function level. This limit restricts the maximum number of concurrent executions a Lambda function can have. For instance, setting a reserved concurrency of 50 means that the function can only have up to 50 concurrent executions.

When the concurrency limit is exceeded, throttling occurs.

Throttling behavior depends on the invocation type:

Synchronous invocations: If throttled, the Lambda function returns a throttle error with status code 429.
Asynchronous invocations: Throttled events are automatically retried and, if retries fail, sent to a Dead Letter Queue (DLQ).
If you require more than 1000 concurrent executions, you can request an increase by opening a support ticket with AWS.

Impact of Not Setting Reserved Concurrency
If no reserved concurrency limit is set on your Lambda functions, concurrency is shared across all functions in your AWS account. Consider the following scenario:

An Application Load Balancer (ALB) invokes one Lambda function.
An API Gateway invokes another Lambda function.
The AWS SDK or CLI invokes a third Lambda function.
When invocation rates are low, all functions operate normally. However, during a high-traffic event, such as a large promotion causing many users to access the ALB, the ALB's Lambda function may consume all available concurrency (up to 1000 concurrent executions). This can cause throttling for the other Lambda functions invoked by the API Gateway and SDK/CLI.

The key takeaway is that concurrency limits apply at the account level across all functions. If one function consumes all concurrency, other functions can be throttled. Therefore, it is important to manage concurrency carefully to avoid unintended throttling.

Concurrency and Asynchronous Invocations
Consider S3 event notifications that invoke Lambda functions asynchronously when files are uploaded to an S3 bucket. If many files are uploaded simultaneously, many concurrent Lambda executions occur.

If the function cannot scale further due to concurrency limits, additional requests are throttled. Since these are asynchronous invocations, Lambda automatically retries throttled events by placing them back into an internal event queue. Lambda will retry execution for up to six hours.

The retry interval increases exponentially, starting from one second up to a maximum of five minutes. This exponential backoff allows Lambda functions to keep retrying until concurrency becomes available and the function can execute successfully.

Cold Starts and Provisioned Concurrency
A cold start occurs when a new Lambda function instance is created. During this time, the function's code is loaded and initialization code outside the handler runs. This initialization can take significant time if the function has many dependencies or connections to databases and SDKs.

As a result, the first request served by a new instance experiences higher latency, which may negatively impact user experience.

To mitigate cold starts, AWS offers provisioned concurrency. This feature pre-allocates execution environments before the function is invoked, ensuring that cold starts do not occur and all invocations have low latency.

Provisioned concurrency can be managed using Application Auto Scaling, which allows you to schedule or target the number of reserved Lambda instances to minimize cold start impact.

Improvements in VPC Cold Start Performance
Previously, launching Lambda functions inside a Virtual Private Cloud (VPC) caused significant cold start delays. However, AWS released improvements in late 2019 that dramatically reduced cold start times for Lambda functions running in VPCs. This enhancement minimizes the impact of cold starts for VPC-based Lambda functions.

Additional Resources
Two diagrams explaining reserved concurrency and provisioned concurrency are available in the provided slides. These diagrams offer a visual understanding of these concepts and are recommended for review to deepen comprehension.

Hands-On: Exploring Lambda Concurrency
Next, we will proceed to a hands-on session to explore how concurrency works in practice with AWS Lambda.

Key Takeaways
Lambda functions can scale to thousands of concurrent executions, but concurrency limits can be set to control this.
Reserved concurrency limits apply at the function level and throttling occurs when limits are exceeded.
Throttling behavior differs between synchronous (returns error 429) and asynchronous invocations (automatic retries and DLQ).
Provisioned concurrency pre-allocates execution environments to reduce cold start latency.
Concurrency limits are shared across all functions in an account, so one function's high usage can throttle others.
AWS has improved cold start performance for Lambda functions running in VPCs.

