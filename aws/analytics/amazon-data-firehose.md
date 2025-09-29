Amazon Data Firehose

• Note: used to be called “Kinesis Data Firehose”
• Fully Managed Service
• Amazon Redshift / Amazon S3 / Amazon OpenSearch Service
• 3rd party: Splunk / MongoDB / Datadog / NewRelic / …
• Custom HTTP Endpoint
• Automatic scaling, serverless, pay for what you use
• Near Real-Time with buffering capability based on size / time
• Supports CSV, JSON, Parquet, Avro, Raw Text, Binary data
• Conversions to Parquet / ORC, compressions with gzip / snappy
• Custom data transformations using AWS Lambda (ex: CSV to JSON)

Kinesis Data Streams vs Amazon Data
Firehose

Kinesis Data Streams
• Streaming data collection
• Producer & Consumer code
• Real-time
• Provisioned / On-Demand mode
• Data storage up to 365 days
• Replay Capability

Amazon Data Firehose
• Load streaming data into S3 / Redshift /
OpenSearch / 3rd party / custom HTTP
• Fully managed
• Near real-time
• Automatic scaling
• No data storage
• Doesn’t support replay capability

---

Amazon Data Firehose
Introduction to Amazon Data Firehose
Amazon Data Firehose is a service designed to send data from various sources into target destinations. It enables seamless data ingestion and delivery for analytics and storage purposes.

Data Producers and Ingestion Methods
Data can be sent into Amazon Data Firehose through several producers such as your applications, clients, or custom-written tools. You can use the AWS SDK or Kinesis agents to send data into Firehose. Additionally, Firehose can pull data directly from certain AWS services including Kinesis Data Streams, Amazon CloudWatch Logs and Events, and AWS IoT.

Data Flow and Transformation
Data records received by Firehose can optionally be transformed using AWS Lambda functions. This allows for data conversion or formatting before delivery. The records are accumulated into a buffer, which is periodically flushed to perform batch writes into various destinations.

Supported Destinations
Amazon Data Firehose supports multiple destination types:

AWS destinations such as Amazon S3, Amazon Redshift for analytics, and Amazon OpenSearch Service.
Third-party partner destinations including Datadog, Splunk, New Relic, and MongoDB.
Custom destinations via HTTP endpoint integration, allowing you to send data anywhere you want.
Data Backup Options
Firehose provides the option to write all data or only failed data into an Amazon S3 bucket for backup purposes. This ensures data durability and recovery options in case of delivery failures.

Overview and Features of Amazon Data Firehose
Amazon Data Firehose, formerly known as Kinesis Data Firehose, has evolved beyond just Kinesis integration. It is a fully managed service supporting destinations such as Redshift, S3, and Amazon OpenSearch Service, as well as third-party services like Splunk and custom HTTP endpoints. It offers automatic scaling, is fully serverless, and you pay only for what you use.

Near Real-Time Data Delivery
Firehose is considered a near real-time service due to its buffering mechanism. The buffer accumulates data based on size or time thresholds before flushing it to the destination. This buffering introduces a slight delay, distinguishing it from real-time streaming services.

Supported Data Formats and Transformations
Firehose supports incoming data in formats such as CSV, JSON, Parquet, Avro, text, or binary. It can convert data to Parquet or ORC formats and apply compression methods like gzip or snappy. For custom data transformations, AWS Lambda functions can be used—for example, converting CSV data to JSON before storing it in Amazon S3.

Comparison Between Kinesis Data Streams and Amazon Data Firehose
| Feature | Kinesis Data Streams | Amazon Data Firehose | |-------------------------|-----------------------------------------|---------------------------------------------| | Service Type | Streaming data collection service | Data loading service into target destinations | | Data Processing | Requires custom producer and consumer code | Fully managed with automatic scaling | | Latency | Real-time | Near real-time | | Modes | Provisioned and on-demand | Fully serverless | | Data Storage | Up to one year with replay capability | No data storage or replay capability | | Destinations | Custom processing by consumers | Supports S3, Redshift, OpenSearch, third-party, and HTTP endpoints |

Conclusion
Amazon Data Firehose is a powerful, fully managed service for loading streaming data into various destinations with near real-time delivery, automatic scaling, and flexible data transformation options. It complements Kinesis Data Streams by simplifying data ingestion and delivery without the need for custom consumer applications.

Key Takeaways
Amazon Data Firehose is a fully managed, serverless service for loading streaming data into various destinations.
It supports near real-time data delivery with optional buffering and automatic scaling.
Firehose can ingest data from multiple sources, transform it using AWS Lambda, and deliver it to AWS services or third-party destinations.
Unlike Kinesis Data Streams, Firehose does not store data or support replay capabilities.
