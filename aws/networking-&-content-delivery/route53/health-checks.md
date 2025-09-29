Route 53 – Health Checks

• HTTP Health Checks are only for public
resources
• Health Check => Automated DNS Failover:
1. Health checks that monitor an endpoint
(application, server, other AWS resource)
2. Health checks that monitor other health
checks (Calculated Health Checks)
3. Health checks that monitor CloudWatch
Alarms (full control !!) – e.g., throttles of
DynamoDB, alarms on RDS, custom metrics,
… (helpful for private resources)
• Health Checks are integrated with CW
metrics

Health Checks – Monitor an Endpoint
• About 15 global health checkers will check the endpoint health
• Healthy/Unhealthy Threshold – 3 (default)
• Interval – 30 sec (can set to 10 sec – higher cost)
• Supported protocol: HTTP, HTTPS and TCP
• If > 18% of health checkers report the endpoint is
healthy, Route 53 considers it Healthy. Otherwise, it’s
Unhealthy
• Ability to choose which locations you want Route 53 to
use
• Health Checks pass only when the endpoint responds with the 2xx and 3xx status codes
• Health Checks can be setup to pass / fail based on the text in the first 5120 bytes of the response
• Configure you router/firewall to allow incoming requests from Route 53 Health Checkers

Route 53 – Calculated Health 
• Combine the results of multiple Health
Checks into a single Health Check
• You can use OR, AND, or NOT
• Can monitor up to 256 Child Health Checks
• Specify how many of the health checks need
to pass to make the parent pass
• Usage: perform maintenance to your website
without causing all health checks to fail

Health Checks – Private Hosted Zones
• Route 53 health checkers are outside the
VPC
• They can’t access private endpoints
(private VPC or on-premises resource)
• You can create a CloudWatch Metric
and associate a CloudWatch Alarm, then
create a Health Check that checks the
alarm itself

--- 
Route 53 Health Checks
Introduction to Route 53 Health Checks
Route 53 health checks allow you to monitor the health of mainly public resources, although there is a way to monitor private resources as well, which we will explore in this lecture.

For example, consider two public load balancers located in different regions. Behind these load balancers, our application is running in both regions, creating a multi-region setup to ensure high availability at the regional level.

We use Route 53 to create DNS records so that when users access our URL, such as mydomain.com, they are redirected to the closest load balancer. This is typically achieved with a latency-based record.

However, if one region is down, we want to ensure that users are not sent to that region. To achieve this, we create health checks in Route 53 for each region, for example, one in us-east-1 and another in eu-west-1.

These health checks are associated with Route 53 DNS records to enable automated DNS failover, ensuring traffic is routed only to healthy endpoints.

Types of Route 53 Health Checks
There are three types of health checks available:

Endpoint Health Checks: Monitor a public endpoint such as an application, server, or AWS resource.
Calculated Health Checks: Monitor other health checks and combine their results.
CloudWatch Alarm Health Checks: Monitor CloudWatch Alarms, useful for private resources.
Each health check has its own metric, which can be viewed in CloudWatch metrics for monitoring and analysis.

How Endpoint Health Checks Work
Consider a health check for an Application Load Balancer (ALB) in eu-west-1. AWS health checkers, approximately 15 in number, are distributed globally and send requests to the public endpoint configured in the health check.

If the health checkers receive a 200 OK status code or another defined success code, the resource is considered healthy.

You can configure the health check threshold and interval. The interval can be either 30 seconds for regular health checks or 10 seconds for fast health checks, which incur higher costs.

Supported protocols include HTTP, HTTPS, and TCP. If over 18 of the health checkers report the endpoint as healthy, Route 53 considers it healthy; otherwise, it is deemed unhealthy.

You can also select which geographic locations the health checks originate from. The health check passes only if the status code returned is in the 2xx or 3xx range.

Health checks have the capability to inspect the first 5,120 bytes of a text-based response to look for specific text strings, adding an additional layer of validation.

From a network perspective, it is crucial that the health checkers can access your Application Load Balancer or other endpoints. Therefore, you must allow incoming requests from the Route 53 health checkers' IP address ranges, which are publicly documented.

Calculated Health Checks
Calculated health checks combine the results of multiple health checks into a single health check. For example, if you have three EC2 instances, you can create three child health checks, each monitoring one instance.

A parent health check can then be defined based on these child health checks, using logical conditions such as OR, AND, or NOT to determine the overall health status.

You can monitor up to 256 child health checks and specify how many must pass for the parent health check to be considered healthy. This is useful for scenarios such as performing maintenance without causing all health checks to fail.

Monitoring Private Resources
Monitoring private resources is challenging because Route 53 health checkers operate from the public internet and cannot access private endpoints inside a VPC or on-premises resources.

To monitor private resources, you create a CloudWatch Metric for the resource and assign a CloudWatch Alarm based on that metric. This alarm is then associated with a Route 53 health check.

For example, you can monitor the health of an EC2 instance in a private subnet using a CloudWatch Metric. If the metric breaches a threshold, the CloudWatch Alarm enters the alarm state, causing the health check to be marked unhealthy.

This approach effectively creates a health check for private resources, which is a common use case.

Conclusion
This concludes the lecture on Route 53 health checks. We have covered how to monitor both public and private resources using different types of health checks to ensure high availability and automated DNS failover.

Key Takeaways
Route 53 health checks monitor the health of public and private resources to enable automated DNS failover.
There are three types of health checks: endpoint health checks, calculated health checks, and CloudWatch Alarm-based health checks.
Endpoint health checks use global health checkers to verify resource availability via HTTP, HTTPS, or TCP protocols.
Private resource health monitoring is achieved by integrating CloudWatch Metrics and Alarms with Route 53 health checks.