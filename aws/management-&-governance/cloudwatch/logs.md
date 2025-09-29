CloudWatch Logs

• Log groups: arbitrary name, usually representing an application
• Log stream: instances within application / log files / containers
• Can define log expiration policies (never expire, 1 day to 10 years…)
• CloudWatch Logs can send logs to:
• Amazon S3 (exports)
• Kinesis Data Streams
• Kinesis Data Firehose
• AWS Lambda
• OpenSearch
• Logs are encrypted by default
• Can setup KMS-based encryption with your own keys

---

CloudWatch Logs - Sources
• SDK, CloudWatch Logs Agent, CloudWatch Unified Agent
• Elastic Beanstalk: collection of logs from application
• ECS: collection from containers
• AWS Lambda: collection from function logs
• VPC Flow Logs: VPC specific logs
• API Gateway
• CloudTrail based on filter
• Route53: Log DNS queries

---

CloudWatch Logs Insights
• Search and analyze log data stored in CloudWatch Logs
• Example: find a specific IP inside a log, count occurrences of
“ERROR” in your logs…
• Provides a purpose-built query language
• Automatically discovers fields from AWS services and JSON log
events
• Fetch desired event fields, filter based on conditions, calculate
aggregate statistics, sort events, limit number of events…
• Can save queries and add them to CloudWatch Dashboards
• Can query multiple Log Groups in different AWS accounts
• It’s a query engine, not a real-time engine

---

CloudWatch Logs – S3 Export
• Log data can take up to 12 hours to
become available for export
• The API call is CreateExpor tTask
• Not near-real time or real-time… use
Logs Subscriptions instead

---

CloudWatch Logs Subscriptions

• Get a real-time log events from CloudWatch Logs for processing and analysis
• Send to Kinesis Data Streams, Kinesis Data Firehose, or Lambda
• Subscription Filter – filter which logs are events delivered to your destination

---

CloudWatch Logs Aggregation
Multi-Account & Multi Region

---

CloudWatch Logs Subscriptions

• Cross-Account Subscription – send log events to resources in a different
AWS account (KDS, KDF)

---

CloudWatch Logs for EC2
By default, no logs from your EC2
machine will go to CloudWatch
• You need to run a CloudWatch
agent on EC2 to push the log files
you want
• Make sure IAM permissions are
correct
• The CloudWatch log agent can be
setup on-premises too

---

CloudWatch Logs Agent & Unified Agent

• For virtual servers (EC2 instances, on-premise servers…)
• CloudWatch Logs Agent
• Old version of the agent
• Can only send to CloudWatch Logs
• CloudWatch Unified Agent
• Collect additional system-level metrics such as RAM, processes, etc…
• Collect logs to send to CloudWatch Logs
• Centralized configuration using SSM Parameter Store

CloudWatch Unified Agent – Metrics

• Collected directly on your Linux server / EC2 instance
• CPU (active, guest, idle, system, user, steal)
• Disk metrics (free, used, total), Disk IO (writes, reads, bytes, iops)
• RAM (free, inactive, used, total, cached)
• Netstat (number of TCP and UDP connections, net packets, bytes)
• Processes (total, dead, bloqued, idle, running, sleep)
• Swap Space (free, used, used %)
• Reminder: out-of-the box metrics for EC2 – disk, CPU, network (high level)

CloudWatch Logs Metric Filter

• CloudWatch Logs can use filter expressions
• For example, find a specific IP inside of a log
• Or count occurrences of “ERROR” in your logs
• Metric filters can be used to trigger alarms
• Filters do not retroactively filter data. Filters only publish the metric data
points for events that happen after the filter was created.
• Ability to specify up to 3 Dimensions for the Metric Filter (optional)

---

CloudWatch Logs
Introduction to CloudWatch Logs
CloudWatch Logs is the ideal service for storing your application logs within AWS. To begin using CloudWatch Logs, you must first define log groups. These log groups can be named as you wish, but they typically represent one of your applications.

Within each log group, there are multiple log streams. These log streams represent log instances within an application, specific log files, or specific containers that are part of a cluster.

You also define your log expiration policy. Logs can be retained indefinitely, meaning they never expire, or you can choose to have them expire anywhere between one day and ten years.

CloudWatch Logs can be sent to various destinations. For example, you can export logs in batch to Amazon S3 or stream them into Kinesis Data Streams, Kinesis Data Firehose, AWS Lambda, or Amazon OpenSearch. All logs are encrypted by default, and you can configure your own KMS-based encryption with your own keys if desired.

Types of Logs and Data Sources
What types of log data can be sent to CloudWatch Logs? Logs can be sent using the AWS SDK, the CloudWatch Logs Agent, or the CloudWatch Unified Agent. The CloudWatch Unified Agent sends logs to CloudWatch, and the CloudWatch Logs Agent is now considered deprecated.

Various AWS services integrate directly with CloudWatch Logs:

Elastic Beanstalk collects logs from applications directly into CloudWatch.
ECS sends logs directly from containers into CloudWatch.
Lambda sends logs from functions.
VPC Flow Logs send metadata about network traffic in your VPC.
API Gateway sends all requests made to the API Gateway.
CloudTrail can send logs based on filters.
Route53 logs all DNS queries made to its service.
Querying Logs with CloudWatch Logs Insights
To query logs in CloudWatch Logs, you can use CloudWatch Logs Insights. This is a querying capability within CloudWatch Logs that allows you to write queries and specify the timeframe for your query. The results are automatically visualized, and you can view the specific log lines that contributed to the visualization.

Visualizations from queries can be exported as results or added to dashboards for easy rerunning. This feature is very handy for searching and analyzing log data within CloudWatch Logs.

CloudWatch Logs Insights provides many simple queries in the console. For example, you can find the 25 most recent events, check how many events had exceptions or errors, or search for a specific IP address. It offers a purpose-built query language with automatic detection of fields from CloudWatch Logs, allowing you to filter based on conditions, calculate aggregate statistics, sort events, limit the number of events, and more.

You can save queries and add them to CloudWatch Dashboards. Additionally, you can query multiple log groups simultaneously, even if they are in different AWS accounts. It is important to note that CloudWatch Logs Insights is a query engine for historical data and is not a real-time engine; it queries data only when you run the query.

Exporting CloudWatch Logs
CloudWatch Logs can be exported to several destinations. The first is Amazon S3, which supports batch exports of all your logs. This export can take up to 12 hours to complete. The API call to initiate this export is called CreateExportTask. Because this is a batch export, it is not real-time or near real-time.

For real-time streaming of log events, you must use CloudWatch Logs subscriptions. These allow you to receive a real-time stream of log events for processing and analysis. You can send this data to multiple destinations such as Kinesis Data Streams, Kinesis Data Firehose, or Lambda. You specify a subscription filter to determine which log events are delivered to your destination.

Subscription filters can send data to Kinesis Data Streams, which is a great choice if you want to integrate with Kinesis Data Firehose, Kinesis Data Analytics, Amazon EC2, or Lambda. You can also send data directly to Kinesis Data Firehose, which can then deliver data in near real-time to Amazon S3, OpenSearch Service, or Lambda. You can write your own custom Lambda function or use a managed Lambda function to send data in real-time to OpenSearch Service.

Thanks to subscription filters, it is possible to aggregate data from different CloudWatch Logs across different accounts and regions into a common destination, such as a Kinesis Data Stream in a specific account. From there, data can be sent via Kinesis Data Firehose in near real-time into Amazon S3. This approach enables log aggregation across multiple accounts and regions.

Cross-Account Log Aggregation Setup
To achieve cross-account log aggregation, you use what are called destinations. Suppose you have a sender account and a recipient account. You create a CloudWatch Log subscription filter in the sender account, which sends data to a subscription destination. This destination is a virtual representation of the Kinesis Data Stream in the recipient account.

You then attach a destination access policy to allow the sender account to send data into this destination. Next, you create an IAM role in the recipient account with permission to send records into the Kinesis Data Stream. This role must be assumable by the sender account. When all these components are in place, it is possible to send data from CloudWatch Logs in one account into a destination in another account.

Conclusion
This concludes the lecture on CloudWatch Logs. CloudWatch Logs provides a robust and flexible solution for storing, querying, and exporting log data within AWS. It supports multiple data sources, powerful querying capabilities, and flexible export options including real-time streaming and cross-account aggregation.

Key Takeaways
CloudWatch Logs stores application logs in AWS, organized into log groups and log streams.
Logs can be retained indefinitely or set to expire between one day and ten years.
CloudWatch Logs supports exporting logs to destinations like Amazon S3, Kinesis Data Streams, Firehose, Lambda, and OpenSearch.
CloudWatch Logs Insights provides a powerful query engine for analyzing and visualizing log data with a purpose-built query language.

---

CloudWatch Agent & CloudWatch Logs Agent
Introduction to CloudWatch Agents
Now let's discuss how we can use CloudWatch Agents to collect logs from EC2 instances, as well as metrics, and send them to CloudWatch.

By default, no logs are sent from your EC2 instance to CloudWatch. To enable this, you need to create and start an agent, which is a small program running on your EC2 instances that pushes the log files you want to CloudWatch.

The idea is that your EC2 instances will have CloudWatch Log Agents running, sending logs into CloudWatch Logs for processing.

Your EC2 instance must have an IAM role that allows it to send logs to CloudWatch Logs. This is essential for the agent to function properly.

It is important to note that these CloudWatch log agents can also be set up on on-premises servers. This means you can have your services running on virtual servers like VMware on premises, install the exact same agent (a small Linux program), and your logs will end up in CloudWatch Logs as well.

Types of CloudWatch Agents
There are two different agents available in CloudWatch:

The CloudWatch Logs Agent, which is the older version.
The CloudWatch Unified Agent, which is the newer version.
Both agents are designed for virtual servers such as EC2 instances and on-premises servers. The CloudWatch Logs Agent is the old version and can only send logs to CloudWatch Logs.

In contrast, the CloudWatch Unified Agent collects additional system-level metrics, such as RAM and processes, and also sends logs into CloudWatch Logs.

It is called the Unified Agent because it can handle both metrics and logs. Additionally, you can configure this agent very easily using the SSM Parameter Store, a feature that the previous agent did not have. This allows centralized configuration for all your Unified Agents.

Metrics Collected by the CloudWatch Unified Agent
The CloudWatch Unified Agent can send logs to CloudWatch Logs, but it also collects detailed metrics when installed on your EC2 instances or Linux servers.

These metrics include:

CPU metrics at a granular level, such as active, guest, idle, system, user, and steal states.
Disk metrics including free, used, and total space.
Disk IO metrics such as number of writes, reads, bytes, and IOPS.
RAM metrics including free, inactive, used, total, and cached memory.
Network statistics including number of TCP and UDP connections, packets, and bytes.
Process information such as total number of processes, dead, blocked, idle, running, and sleeping states.
Swap space metrics, which represent memory spilling onto disk, including free, used, and usage percentage.
The bottom line is that the CloudWatch Unified Agent provides a lot more metrics at much more granular detail than the standard monitoring available for EC2 instances.

As a reminder, out of the box for EC2, you get some information on disk, CPU, and network, but not memory or swap, and all of this is at a high level.

If you want more granularity, consider using the CloudWatch Unified Agent.

Conclusion
That concludes this lecture on CloudWatch Agents. I hope you found it informative, and I will see you in the next lecture.

Key Takeaways
CloudWatch Agents are essential for sending logs and metrics from EC2 instances to CloudWatch.
The CloudWatch Logs Agent is the older version and only sends logs, while the CloudWatch Unified Agent sends both logs and detailed system metrics.
The Unified Agent supports centralized configuration via the SSM Parameter Store.
The Unified Agent provides granular metrics including CPU states, disk IO, RAM usage, network statistics, process states, and swap space usage.

---

CloudWatch Logs - Metric Filters
Introduction to CloudWatch Logs Metric Filters
CloudWatch Logs metric filters enable you to define filter expressions on your logs. For example, you can search for a specific IP address within a log or count the number of occurrences of the word error in your logs. These filters allow you to create metrics based on the filtered data.

This functionality is referred to as a metric filter. The metric filter can then be used to trigger alarms based on the metric data it generates.

It is important to note that when you create a filter, it does not retroactively filter existing data. The metric data will only be pushed for events that occur after the filter has been created.

Additionally, you can specify up to three dimensions for the metric filter to create a more detailed and interesting metric.

Example Scenario
Consider a CloudWatch Logs agent installed on an EC2 instance that streams logs into CloudWatch Logs. A metric filter is created based on a filter expression applied to these logs. This results in a real CloudWatch metric derived from the filtered log data.

From this metric, you can integrate with a CloudWatch alarm. For instance, you might configure the alarm to notify you via an SNS topic if the word error appears five times within less than a minute in your logs. This allows you to be alerted promptly about potential issues.

Conclusion
That concludes the overview of metric filters in CloudWatch Logs. They provide a powerful way to create actionable metrics from your log data and enable proactive monitoring through alarms.

Key Takeaways
CloudWatch Logs metric filters allow you to create metrics based on filter expressions applied to your logs.
Metric filters can detect specific patterns, such as IP addresses or occurrences of the word "error".
Metrics generated by filters can be used to trigger CloudWatch alarms for proactive monitoring.
Metric filters only apply to events occurring after their creation and support up to three dimensions for detailed metrics.
