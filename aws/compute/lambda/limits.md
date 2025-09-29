AWS Lambda Limits to Know - per region
• Execution:
• Memory allocation: 128 MB – 10GB (1 MB increments)
• Maximum execution time: 900 seconds (15 minutes)
• Environment variables (4 KB)
• Disk capacity in the “function container” (in /tmp): 512 MB to 10GB
• Concurrency executions: 1000 (can be increased)
• Deployment:
• Lambda function deployment size (compressed .zip): 50 MB
• Size of uncompressed deployment (code + dependencies): 250 MB
• Can use the /tmp directory to load other files at startup
• Size of environment variables: 4 KB

---


Lambda Limits
AWS Lambda Limits
Before taking the exam, it is important to know a few AWS Lambda limits. The exam often tests your knowledge of these limits, which vary by region. These limits are divided into execution limits and deployment limits.

Execution Limits
Memory allocation ranges from 128 megabytes to 10 gigabytes.
Memory increments are in steps of 64 megabytes.
Increasing memory allocation also increases the number of virtual CPUs (vCPUs).
The maximum execution time for a Lambda function is 900 seconds, which equals 15 minutes.
Execution beyond 15 minutes is not suitable for Lambda use cases.
Environment Variables and Temporary Storage
Environment variables can only use up to 4 kilobytes of space.
For larger files, temporary storage is available in the /tmp directory.
The /tmp folder provides up to 10 gigabytes of temporary space.
This storage can be used to pull in large files during function execution.
Concurrency and Deployment Limits
Lambda supports up to 1000 concurrent executions by default.
This concurrency limit can be increased upon request.
It is advisable to use reserved concurrency early to manage execution limits.
Deployment package size limits are as follows:
Maximum compressed zip file size: 50 megabytes.
Maximum uncompressed deployment size: 250 megabytes.
For files larger than these limits, use the /tmp directory for storage.
Summary
Knowing these limits is crucial for determining whether Lambda is the right solution for your workload. For example, if you require 30 gigabytes of RAM, 30 minutes of execution time, or need to handle a 3 gigabyte file, Lambda is not suitable. Instead, consider alternative services or architectures for such requirements.

Key Takeaways
AWS Lambda memory allocation ranges from 128 megabytes to 10 gigabytes, increasing in 64 megabyte increments.
The maximum execution time for a Lambda function is 900 seconds (15 minutes).
Environment variables are limited to 4 kilobytes, and temporary storage in the /tmp folder can be up to 10 gigabytes.
Deployment package size limits are 50 megabytes compressed and 250 megabytes uncompressed; larger files should use temporary storage.
Lambda supports up to 1000 concurrent executions by default, which can be increased upon request.
Understanding these limits helps determine when Lambda is unsuitable for workloads requiring more resources or longer execution times.