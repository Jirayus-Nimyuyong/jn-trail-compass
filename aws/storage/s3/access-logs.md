S3 Access Logs

• For audit purpose, you may want to log all access to S3 buckets
• Any request made to S3, from any account, authorized or denied,
will be logged into another S3 bucket
• That data can be analyzed using data analysis tools…
• The target logging bucket must be in the same AWS region
• The log format is at:
https://docs.aws.amazon.com/AmazonS3/latest/dev/LogFormat.html

S3 Access Logs: Warning
• Do not set your logging bucket to be the monitored bucket
• It will create a logging loop, and your bucket will grow exponentially
---
S3 Access Logs
Introduction to S3 Access Logs
For audit purposes, you may want to log all access made to your S3 buckets. This means that any request made to your S3 bucket from any account, whether authorized or denied, will be logged as a file into another S3 bucket. This data can then be analyzed using data analysis tools such as Amazon Athena.

Requirements for Logging Buckets
The target logging buckets must also be in the same AWS region as the buckets being monitored.

How S3 Access Logging Works
You make requests against your S3 buckets and enable access logs. All requests are then logged into the designated logging buckets.

Log Format
The access logs follow a specific format. You can find the details of this format at the following URL:

https://docs.aws.amazon.com/AmazonS3/latest/dev/LogFormat.html

Important Warning About Logging Buckets
Never set your logging bucket to be the same as the bucket you are monitoring. Doing so will create a logging loop that is infinite, causing your bucket size to grow exponentially.

Explanation of the Logging Loop
If the application bucket and the logging bucket are the same, each object put into the bucket will generate a log entry, which itself is an object put into the same bucket. This cycle repeats indefinitely, causing continuous logging and resulting in very high costs.

Conclusion
That concludes the overview of S3 access logs.

Key Takeaways
S3 Access Logs record all requests made to your S3 buckets, including authorized and denied requests.
Access logs are stored as files in a separate S3 bucket within the same AWS region.
The log files follow a specific format, which can be referenced via the provided URL.
Never configure the logging bucket to be the same as the monitored bucket to avoid infinite logging loops and excessive costs.