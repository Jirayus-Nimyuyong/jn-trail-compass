CloudFront – Real Time Logs
• Get real-time requests received by CloudFront sent to Kinesis Data Streams
• Monitor, analyze, and take actions based on content delivery performance
• Allows you to choose:
• Sampling Rate – percentage of requests for which you want to receive
• Specific fields and specific Cache Behaviors (path patterns)

---

CloudFront - Real Time Logs
Introduction to Real-Time Logs in CloudFront
This lecture covers real-time logs in CloudFront. It is possible to have all requests received by CloudFront sent in real time to a Kinesis Data Stream. The goal of this feature is to monitor, analyze, and take actions based on content delivery performance.

Overview of Real-Time Logging Workflow
Users send numerous requests to CloudFront. When real-time logs are enabled, all these requests are logged into a Kinesis Data Stream. For example, a Lambda function can process these records from the Kinesis Data Stream.

Near Real-Time Processing Using Kinesis Data Firehose
If near real-time processing is required, the initial step remains the same since CloudFront can only send logs to Kinesis Data Stream. However, you would then use Kinesis Data Firehose to process these records in batches and send them to destinations such as Amazon S3 or OpenSearch, or any other destination you have in mind.

Configuring Sampling Rate and Log Fields
You can choose the sampling rate, which is the percentage of requests you want to receive in your Kinesis Data Stream. This is useful if you have very high traffic on an API or endpoint and do not want to log all requests, but only a sample.

Additionally, you can specify which fields and which cache behaviors or path patterns you want to have access to in your Kinesis Data Stream. For example, you can specify to only log requests for a specific cache behavior such as "/images" path pattern to monitor requests to that path specifically.

Conclusion
This concludes the lecture on real-time logs in CloudFront. The feature allows flexible and efficient monitoring of content delivery through real-time data streaming and processing.

Key Takeaways
CloudFront can send all received requests in real time to a Kinesis Data Stream.
Real-time logs enable monitoring, analysis, and action based on content delivery performance.
Lambda functions can process Kinesis Data Stream records for near real-time processing.
Sampling rate and specific fields or cache behaviors can be configured for the logs.