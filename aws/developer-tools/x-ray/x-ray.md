AWS X-Ray

• Debugging in Production, the good old way:
• Test locally
• Add log statements everywhere
• Re-deploy in production
• Log formats differ across applications using CloudWatch and analytics is
hard.
• Debugging: monolith “easy”, distributed services “hard”
• No common views of your entire architecture!
• Enter… AWS X-Ray!

---

AWS X-Ray
Visual analysis of our applications

---

AWS X-Ray advantages
• Troubleshooting performance (bottlenecks)
• Understand dependencies in a microservice architecture
• Pinpoint service issues
• Review request behavior
• Find errors and exceptions
• Are we meeting time SLA?
• Where I am throttled?
• Identify users that are impacted

---

X-Ray compatibility
• AWS Lambda
• Elastic Beanstalk
• ECS
• ELB
• API Gateway
• EC2 Instances or any application server (even on premise)

---

AWS X-Ray Leverages Tracing
• Tracing is an end to end way to following a “request”
• Each component dealing with the request adds its own “trace”
• Tracing is made of segments (+ sub segments)
• Annotations can be added to traces to provide extra-information
• Ability to trace:
• Every request
• Sample request (as a % for example or a rate per minute)
• X-Ray Security:
• IAM for authorization
• KMS for encryption at rest

---
AWS X-Ray
How to enable it?

I) Your code (Java, Python, Go, Node.js, .NET) must import the
AWS X-Ray SDK
• Very little code modification needed
• The application SDK will then capture:
Calls to AWS services
HTTP / HTTPS requests
Database Calls (MySQL, PostgreSQL, DynamoDB)
Queue calls (SQS)
2) Install the X-Ray daemon or enable X-Ray AWS Integration
• X-Ray daemon works as a low level UDP packet interceptor
(Linux / Windows / Mac…)
• AWS Lambda / other AWS services already run the X-Ray
daemon for you
• Each application must have the IAM rights to write data to X-Ray

---
The X-Ray magic

• X-Ray service collects data from all the different services
• Service map is computed from all the segments and traces
• X-Ray is graphical, so even non technical people can help troubleshoot

AWS X-Ray Troubleshooting

• If X-Ray is not working on EC2
• Ensure the EC2 IAM Role has the proper permissions
• Ensure the EC2 instance is running the X-Ray Daemon
• To enable on AWS Lambda:
• Ensure it has an IAM execution role with proper policy
(AWSX-RayWriteOnlyAccess)
• Ensure that X-Ray is imported in the code
• Enable Lambda X-Ray Active Tracing


---

X-Ray Overview
Introduction to AWS X-Ray
AWS X-Ray is one of the most revolutionary services that AWS offers, yet it remains underutilized. The AWS certification exam emphasizes knowledge of X-Ray, reflecting its importance. The service is designed to encourage users to adopt it for better application debugging and monitoring.

Challenges of Debugging in Production
Traditionally, debugging production applications involves testing locally, adding numerous log statements, redeploying, and then analyzing logs to identify issues. This approach is painful and not considered best practice. When multiple applications log to CloudWatch, each with different formats, centralizing insights becomes difficult. Navigating and analyzing CloudWatch logs is challenging, especially in distributed systems with many microservices communicating with each other. This complexity makes it hard to obtain a unified view of the entire architecture or service map.

AWS X-Ray Overview
AWS X-Ray provides a visual analysis of your application. For example, when a client makes a request, X-Ray shows how many requests succeed or fail. It traces the application's internal calls, such as calls to IPs, SNS, or DynamoDB tables, allowing you to visually track what happens during a request. This visual trace helps identify the source of errors, such as pinpointing an issue in a DynamoDB table rather than SNS or other components.

Advantages of AWS X-Ray
Troubleshoot application performance and identify bottlenecks.
Understand dependencies within microservice architectures by visualizing interactions.
Pinpoint problematic services causing issues.
Analyze request behavior to find errors and exceptions.
Assess if time SLAs for latency or request processing are met.
Identify services that slow down or throttle the system.
Determine which users are impacted by errors.
Compatibility
X-Ray is compatible with various AWS services including Lambda, Elastic Beanstalk, ECS, ELBs, API Gateway, EC2 instances, and even on-premise application servers. AWS designed X-Ray to be broadly applicable across many application types.

How AWS X-Ray Works
X-Ray leverages tracing to follow requests end-to-end. Each component handling a request—such as databases, gateways, load balancers, and application servers—adds its own trace segment. These segments may contain subsegments and annotations that provide additional context. Together, these traces allow detailed tracking of requests. Users can sample requests, for example, capturing only a percentage or a fixed number of requests per minute.

In terms of security, X-Ray uses IAM authorization and supports encryption at rest with KMS.

Enabling AWS X-Ray
There are two main steps to enable X-Ray:

Code Modification: Your application code, written in Java, Python, Go, Node.js, or .NET, must import the AWS X-Ray SDK. This requires minimal code changes. The SDK captures calls to AWS services, HTTP/HTTPS requests, and database calls (MySQL, PostgreSQL, DynamoDB), as well as queue calls.

Running the X-Ray Daemon:

For on-premise servers or EC2 instances, you must install and run the X-Ray daemon. This daemon acts as a low-level UDP packet interceptor and is available for Linux, Windows, and Mac.
For AWS Lambda and other services with built-in X-Ray integration, the daemon runs automatically.
Additionally, the application must have IAM permissions to write data to X-Ray.

Common Issues
A frequent issue is that X-Ray works locally but not on EC2. This usually occurs because the X-Ray daemon is running locally but not on the EC2 instance. Without the daemon running on EC2, X-Ray cannot receive trace data.

To clarify, on an EC2 instance, your application code must import the X-Ray SDK and send traces to the X-Ray daemon running on the same machine. The daemon batches trace data every second and sends it to AWS X-Ray, which then generates the service map graphically. This graphical representation allows even non-technical users to assist in troubleshooting.

Troubleshooting X-Ray on EC2 and Lambda
EC2: Ensure the IAM role has the correct permissions and that the X-Ray daemon is running on the instance.
Lambda: The Lambda function must have an IAM execution role with the appropriate policy. The X-Ray SDK must be imported, and active tracing must be enabled in the Lambda configuration. This will be covered in more detail in the Lambda section.
Conclusion
This overview provides a brief introduction to AWS X-Ray and its capabilities. The next lecture will include hands-on demonstrations running applications with X-Ray to deepen understanding of its operation.

Key Takeaways
AWS X-Ray provides a powerful visual analysis tool for debugging and tracing distributed applications.
It helps identify performance bottlenecks, errors, and service dependencies in microservice architectures.
Enabling X-Ray requires minimal code modification and running the X-Ray daemon on EC2 or leveraging built-in integrations on AWS Lambda.
Proper IAM permissions and daemon setup are essential for X-Ray to function correctly in production environments.