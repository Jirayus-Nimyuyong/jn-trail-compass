AWS Distro for OpenTelemetry

• Secure, production-ready AWS-supported distribution of the open-source
project OpenTelemetry project
• Provides a single set of APIs, libraries, agents, and collector services
• Collects distributed traces and metrics from your apps
• Collects metadata from your AWS resources and services
• Auto-instrumentation Agents to collect traces without changing your code
• Send traces and metrics to multiple AWS services and partner solutions
• X-Ray, CloudWatch, Prometheus…
• Instrument your apps running on AWS (e.g., EC2, ECS, EKS, Fargate, Lambda)
as well as on-premises
• Migrate from X-Ray to AWS Distro for Temeletry if you want to standardize
with open-source APIs from Telemetry or send traces to multiple
destinations simultaneously

---

AWS Distro for OpenTelemetry
Introduction to AWS Distro for OpenTelemetry
AWS Distro for OpenTelemetry is a distribution created by AWS that supports the OpenTelemetry project. It is designed to be secure and production ready.

What is OpenTelemetry?
OpenTelemetry provides a single set of APIs, libraries, agents, and collector services to collect distributed traces and metrics from your applications. It also helps collect metadata from your AWS resources and services.

OpenTelemetry is similar to AWS X-Ray but is open-source. It includes agents that can be auto-instrumented to collect traces without requiring changes to your application code, providing functionality similar to X-Ray.

Data Collection and Integration
Thanks to scalable collection within your AWS account and applications, all traces and metrics can be sent to multiple AWS services as well as partner solutions. For example:

Traces can be sent to the X-Ray service.
Metrics can be sent to CloudWatch.
Both traces and metrics can be sent to Prometheus.
Supported Environments
You can instrument your applications running on various AWS environments such as EC2, ECS, EKS, Fargate, or Lambda. It also supports applications running on-premises. Using the OpenTelemetry standard, you can send traces and metrics to AWS services like X-Ray or to partner services such as Datadog.

Differences Between OpenTelemetry and X-Ray
You might consider migrating from X-Ray to AWS Distro for OpenTelemetry if you want to standardize on open-source APIs or if you want to send trace data to multiple destinations simultaneously, a feature supported by OpenTelemetry.

Summary
The AWS Distro for OpenTelemetry collects traces and metrics from each application request. It also collects contextual data about your AWS resources. This data can be sent to X-Ray, CloudWatch, Amazon Managed Service for Prometheus, and any partner monitoring solutions supported by OpenTelemetry.

This overview provides a high-level understanding of AWS Distro for OpenTelemetry. In exam scenarios, questions about this topic are typically high-level.

Key Takeaways
AWS Distro for OpenTelemetry is a secure, production-ready distribution supported by AWS.
OpenTelemetry provides a unified set of APIs, libraries, agents, and collector services to gather distributed traces and metrics.
It supports auto-instrumentation to collect traces without modifying application code.
Collected telemetry data can be sent to multiple AWS services like X-Ray, CloudWatch, Amazon Managed Service for Prometheus, and partner solutions simultaneously.