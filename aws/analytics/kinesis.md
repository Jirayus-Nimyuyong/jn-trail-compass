Amazon Kinesis Data Streams
• Collect and store streaming data in real-time

---
Kinesis Data Streams

• Retention between up to 365 days
• Ability to reprocess (replay) data by consumers
• Data can’t be deleted from Kinesis (until it expires)
• Data up to 1MB (typical use case is lot of “small” real-time data)
• Data ordering guarantee for data with the same “Partition ID”
• At-rest KMS encryption, in-flight HTTPS encryption
• Kinesis Producer Library (KPL) to write an optimized producer application
• Kinesis Client Library (KCL) to write an optimized consumer application

---
Kinesis Data Streams – Capacity Modes

• Provisioned mode:
• Choose number of shards
• Each shard gets 1MB/s in (or 1000 records per second)
• Each shard gets 2MB/s out
• Scale manually to increase or decrease the number of shards
• You pay per shard provisioned per hour
• On-demand mode:
• No need to provision or manage the capacity
• Default capacity provisioned (4 MB/s in or 4000 records per second)
• Scales automatically based on observed throughput peak during the last 30 days
• Pay per stream per hour & data in/out per GB


SQS vs SNS vs Kinesis

SQS:
• Consumer “pull data”
• Data is deleted after being
consumed
• Can have as many workers
(consumers) as we want
• No need to provision
throughput
• Ordering guarantees only on
FIFO queues
• Individual message delay
capability

SNS:
• Push data to many
subscribers
• Up to 12,500,000 subscribers
• Data is not persisted (lost if
not delivered)
• Pub/Sub
• Up to 100,000 topics
• No need to provision
throughput
• Integrates with SQS for fan-
out architecture paGern
• FIFO capability for SQS FIFO

Kinesis:
• Standard: pull data
• 2 MB per shard
• Enhanced-fan out: push data
• 2 MB per shard per consumer
• Possibility to replay data
• Meant for real-Wme big data,
analyWcs and ETL
• Ordering at the shard level
• Data expires aZer X days
• Provisioned mode or on-
demand capacity mode
---

Amazon Kinesis Data Streams
Introduction to Amazon Kinesis Data Streams
Amazon Kinesis Data Streams is a service used to collect and store streaming data in real time. The key aspect to focus on is the real-time nature of the data processing.

Understanding Real-Time Data
Real-time data refers to data that is created and used immediately. Examples include:

Click streams generated whenever users click on a website.
Data from internet-connected devices, such as a connected bicycle.
Metrics and logs from servers that need to be processed directly.
This data is sent into Amazon Kinesis Data Streams for real-time processing.

Producers: Sending Data into Kinesis Data Streams
To send data into Kinesis Data Streams, producers are used. Producers can be:

Applications: Code written to extract data from websites or devices and send it to Kinesis Data Streams.
Kinesis Agent: Installed on servers to act as a producer for metrics and logs.
These producers send data into the stream as it happens, enabling real-time ingestion.

Consumers: Processing Data from Kinesis Data Streams
Consumer applications read and process data from Kinesis Data Streams in real time. These consumers can be:

Custom applications with code to read from the stream.
AWS Lambda functions configured to trigger on new data.
Amazon Data Firehose (covered in a future lecture).
Analytics services such as the Managed Service for Apache Flink.
This architecture allows leveraging streaming data immediately as it arrives.

Features of Kinesis Data Streams
Data retention on the stream can be up to 365 days.
Persisted data allows consumers to reprocess or replay data.
Once data is sent into Kinesis Data Streams, it cannot be deleted manually; it expires based on retention time.
Data records can be up to one megabyte in size.
Typical use cases involve many small real-time data points.
Data ordering is maintained for records sharing the same Partition ID, which groups related data points in time.
Security features include at-rest encryption using AWS KMS and in-flight encryption via HTTPS.
Optimized Producer and Consumer Applications
For high throughput producer applications, use the Kinesis Producer Library (KPL).
For optimized consumer applications, use the Kinesis Client Library (KCL).
These libraries help manage efficient data ingestion and processing.

Capacity Modes in Kinesis Data Streams
Kinesis Data Streams supports two capacity modes:

Provisioned Mode
You specify the number of shards in your stream.
A shard represents the capacity of the stream.
You can have from one shard up to 1,000 shards.
Each shard provides:
1 megabyte per second or 1,000 records per second of write capacity.
2 megabytes per second of read capacity.
To handle higher throughput, increase the number of shards accordingly.
You can manually scale the number of shards up or down.
Monitoring throughput is necessary to determine the required shard count.
Pricing is based on the number of shards provisioned per hour.
On-Demand Mode
No need to provision or manage capacity.
Default capacity provision is approximately 4,000 records per second or 4 megabytes per second.
Kinesis Data Streams automatically scales based on observed throughput over the past 30 days.
Pricing is based on the amount of data ingested and egressed per stream per hour.
Conclusion
Amazon Kinesis Data Streams provides a scalable, real-time data streaming service with flexible capacity modes and robust features for data retention, ordering, and security. It enables applications to ingest and process streaming data efficiently and reliably.

Key Takeaways
Amazon Kinesis Data Streams is a real-time service for collecting and storing streaming data.
Producers, such as applications or Kinesis Agent, send data into streams, while consumers like applications or Lambda functions read and process the data.
Data in Kinesis Data Streams is retained up to 365 days, allowing replay and reprocessing, but cannot be deleted manually once sent.
Kinesis Data Streams supports two capacity modes: Provisioned mode with manual shard management and On-demand mode with automatic scaling.

---

SQS vs SNS vs Kinesis
Understanding SQS, SNS, and Kinesis
It is very important to understand the differences between SQS, SNS, and Kinesis.

Amazon SQS (Simple Queue Service)
SQS operates on a model where consumers pull data by requesting messages from the SQS queue. Once the data is processed, the consumer must delete it from the queue so that no other consumers can read it again. You can have as many workers or consumers as you want, and they all work together to consume and delete all the messages from the queue.

You do not need to provision throughput in advance because it is a managed service that can scale to hundreds of thousands of messages very quickly. Ordering guarantees are only available if you enable FIFO queues, which provide first-in, first-out ordering. Additionally, SQS supports individual message delay capability, allowing a message to appear to a consumer in the queue after a specified delay, for example, 30 seconds.

Amazon SNS (Simple Notification Service)
SNS uses a different model known as the publish-subscribe (pub-sub) model. In this model, you push data to many subscribers, and they all receive a copy of the message you send. SNS supports up to 12,500,000 subscribers per topic.

Once data is sent to SNS, it is not persistent. This means that if the message is not delivered, there is a chance of losing it. SNS can scale to hundreds of thousands of topics, and you do not need to provision throughput in advance.

You can combine SNS with SQS using the fan-out architecture pattern. This allows you to combine SNS with SQS or SNS FIFO topics with SQS FIFO queues.

Amazon Kinesis
Kinesis offers two modes of consumption:

Standard mode: Consumers pull data from Kinesis, with a throughput of two megabytes per second per shard.
Enhanced fan-out mode: Kinesis pushes data to your consumers, providing two megabytes per second per shard per consumer. This mode offers much higher throughput and allows more applications to read from your Kinesis stream.
Kinesis persists data, allowing you to replay data with the new Kinesis data stream. It is typically used for real-time big data analytics and ETL (Extract, Transform, Load) processes.

Ordering is guaranteed at the shard level. You must specify the number of shards you want per Kinesis data stream in advance, which means you need to scale shards yourself. Data expires after a configurable retention period, which at the time of recording ranges between one and 365 days.

Kinesis Capacity Modes
There are two capacity modes for Kinesis:

Provisioned mode: You specify in advance the number of shards you want for your Kinesis streams.
On-demand capacity mode: The number of shards is adjusted automatically by Kinesis streams based on demand.
Summary
This concludes the overview of SQS, SNS, and Kinesis. Each service has distinct models and use cases:

SQS is a pull-based queue service with message deletion and optional FIFO ordering.
SNS is a push-based pub-sub service with high scalability but no message persistence.
Kinesis supports both pull and push consumption, data persistence, and is designed for real-time big data processing with configurable shards.
Combining SNS with SQS enables powerful fan-out architectures, and Kinesis is ideal for real-time analytics and ETL workloads.

Key Takeaways
SQS uses a pull model where consumers request and delete messages, supporting multiple consumers working together without needing throughput provisioning.
SNS operates on a pub-sub model, pushing messages to many subscribers, with high scalability but no persistence guarantee.
Kinesis supports both pull and push consumption modes, offers data persistence, ordering at shard level, and requires shard provisioning or can use on-demand capacity.
Combining SNS with SQS enables fan-out architectures, and Kinesis is suited for real-time big data analytics and ETL workloads.
