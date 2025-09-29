Lambda Logging & Monitoring
• CloudWatch Logs:
• AWS Lambda execution logs are stored in AWS CloudWatch Logs
• Make sure your AWS Lambda function has an execution role with an IAM
policy that authorizes writes to CloudWatch Logs
• CloudWatch Metrics:
• AWS Lambda metrics are displayed in AWS CloudWatch Metrics
• Invocations, Durations, Concurrent Executions
• Error count, Success Rates, Throttles
• Async Delivery Failures
• Iterator Age (Kinesis & DynamoDB Streams)

Lambda Tracing with X-Ray

• Enable in Lambda configuration (Active Tracing)
• Runs the X-Ray daemon for you
• Use AWS X-Ray SDK in Code
• Ensure Lambda Function has a correct IAM Execution Role
• The managed policy is called AWSXRayDaemonWriteAccess
• Environment variables to communicate with X-Ray
• _X_AMZN_TRACE_ID: contains the tracing header
• AWS_XRAY_CONTEXT_MISSING: by default, LOG_ERROR
• AWS_XRAY_DAEMON_ADDRESS: the X-Ray Daemon IP_ADDRESS:PORT

---

Lambda Monitoring & X-Ray Tracing
Lambda Logging, Monitoring, and Tracing
Let's discuss how AWS Lambda handles logging, monitoring, and tracing.

AWS Lambda integrates with CloudWatch Logs, where all Lambda execution logs are automatically stored.

For this to work, your Lambda function must have an execution role with the correct IAM policy authorizing it to write to CloudWatch Logs. This permission is included in the Lambda basic execution role.

In addition to logs, CloudWatch Metrics are available and displayed in the CloudWatch Metrics UI or the Lambda UI. These metrics provide information about your Lambda function's invocations, duration, concurrent executions, error counts, success rate, throttles, and asynchronous delivery failures.

If your Lambda function reads from Kinesis or DynamoDB streams, CloudWatch Metrics also include the iterator age, which indicates how far behind your function is in processing the stream records.

Finally, you can enable tracing with AWS X-Ray in your Lambda function. This is straightforward: you enable active tracing in your Lambda configuration, and Lambda runs the X-Ray daemon for you.

To use X-Ray tracing, you need to include the X-Ray SDK in your code and ensure your Lambda function has the correct IAM execution role to write to X-Ray. AWS provides a managed policy called AWSXRayDaemonWriteAccess for this purpose.

There are three environment variables used to communicate with the X-Ray daemon. The most important one is AWS_XRAY_DAEMON_ADDRESS, which specifies the IP address and port where the X-Ray daemon is running relative to your Lambda function. These environment variables can be accessed in your code just like any other environment variables.

Now, let's proceed to the hands-on section to see how this works in practice.

Key Takeaways
AWS Lambda automatically integrates with CloudWatch Logs to store execution logs.
CloudWatch Metrics provide detailed insights such as invocation counts, duration, errors, throttles, and stream iterator age.
AWS X-Ray tracing can be enabled easily via Lambda configuration with active tracing.
Proper IAM roles and environment variables are required for Lambda functions to write to X-Ray.

