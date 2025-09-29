Lambda and CodeGuru Profiling
• Gain insights into runtime performance of your Lambda
functions using CodeGuru Profiler
• CodeGuru creates a Profiler Group for your Lambda function
• Supported for Java and Python runtimes
• Activate from AWS Lambda Console
• When activated, Lambda adds:
• CodeGuru Profiler layer to your function
• Environment variables to your function
• AmazonCodeGuruProfilerAgentAccess policy to your function

---

Lambda - CodeGuru Integration
Lambda and CodeGuru Integration
In this lecture, we discuss how Lambda and CodeGuru work together to enhance performance monitoring.

By using CodeGuru Profiler, you gain insights into the runtime performance of your Lambda functions. This integration enables detailed profiling to optimize your serverless applications.

When you enable this integration, CodeGuru creates a profiler group specifically for your Lambda function. This feature is supported for both Java and Python runtimes.

To activate CodeGuru integration, simply enable it from the Lambda console. Once activated, you will receive runtime performance insights for your Lambda functions.

Upon activation, the CodeGuru Profiler layer is added to your function as a Lambda layer. Additionally, environment variables related to CodeGuru are injected into your function configuration.

For the integration to function fully, your Lambda function requires appropriate IAM permissions. Specifically, the AmazonCodeGuruProfilerAgentAccess policy must be attached to the function's IAM role.

This setup ensures that CodeGuru Profiler can collect and analyze performance data securely and effectively.

I hope this explanation clarifies how to integrate Lambda with CodeGuru Profiler. Thank you for your attention, and I look forward to seeing you in the next lecture.

Key Takeaways
CodeGuru Profiler provides runtime performance insights for Lambda functions.
Integration is supported for Java and Python runtimes.
Activation is done via the Lambda console, adding a profiler layer and environment variables.
Proper IAM permissions with AmazonCodeGuruProfilerAgentAccess policy are required for full functionality.

