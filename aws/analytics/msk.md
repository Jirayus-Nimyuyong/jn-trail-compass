Amazon Managed Streaming for Apache Kafka
(Amazon MSK)

• Alternative to Amazon Kinesis
• Fully managed Apache Kafka on AWS
• Allow you to create, update, delete clusters
• MSK creates & manages Kafka brokers nodes & Zookeeper nodes for you
• Deploy the MSK cluster in your VPC, multi-AZ (up to 3 for HA)
• Automatic recovery from common Apache Kafka failures
• Data is stored on EBS volumes for as long as you want
• MSK Serverless
• Run Apache Kafka on MSK without managing the capacity
• MSK automatically provisions resources and scales compute & storage

---

Apache Kafka at a high level

---

Kinesis Data Streams vs. Amazon MSK

Kinesis Data Streams
• 1 MB message size limit
• Data Streams with Shards
• Shard Splitting & Merging
• TLS In-flight encryption
• KMS at-rest encryption

Amazon MSK
• 1MB default, configure for higher (ex: 10MB)
• Kafka Topics with Partitions
• Can only add partitions to a topic
• PLAINTEXT or TLS In-flight Encryption
• KMS at-rest encryption


---

Amazon MSK Consumers

---

Amazon MSK - Overview
Introduction to Amazon MSK
Amazon Managed Streaming for Apache Kafka, also known as Amazon MSK, is an analytics service offered by AWS. It provides a fully managed Kafka cluster, enabling users to create, update, and delete clusters on demand.

Kafka is an alternative to Amazon Kinesis, with both services allowing data streaming capabilities. Amazon MSK manages Kafka broker nodes and Zookeeper broker nodes within your cluster, which you deploy in your Virtual Private Cloud (VPC) across up to three Availability Zones for high availability.

MSK provides automatic recovery from common Kafka failures, and data is stored on Elastic Block Store (EBS) volumes for as long as desired. Setting up Apache Kafka independently can be complex, but Amazon MSK simplifies this with a one-click deployment on AWS.

MSK Serverless
Amazon MSK also offers a Serverless option, where Apache Kafka runs without the need to provision servers or manage capacity. MSK automatically provisions resources and scales compute and storage as needed.

Understanding Apache Kafka
Apache Kafka enables data streaming through a cluster composed of multiple brokers. Producers ingest data from various sources such as Kinesis, IoT devices, or RDS, and send this data into Kafka topics. These topics are fully replicated across brokers, providing real-time streaming data.

Consumers pull data from Kafka topics and can process it or send it to various destinations including EMR, S3, SageMaker, Kinesis, and RDS. Kafka's functionality is similar to Kinesis, but there are important differences to consider.

Differences Between Kinesis Data Streams and Amazon MSK
Message Size Limit: Kinesis Data Streams has a one megabyte message limit by default. Amazon MSK also defaults to this limit but can be configured for higher message retention, such as 10 megabytes.
Scaling: Kinesis Data Streams uses shards that can be split or merged to scale up or down. In Amazon MSK, scaling a topic involves adding partitions; removing partitions is not supported.
Encryption: Kinesis Data Streams supports in-flight encryption. Amazon MSK supports either plain text or TLS in-flight encryption. Both services provide at-rest encryption.
Data Retention: Amazon MSK allows data to be retained for as long as desired, even beyond one year, as long as the underlying EBS storage costs are covered.
Producing and Consuming Data with Amazon MSK
To produce data to MSK, you create a Kafka Producer. For consuming data, multiple options are available:

Use Kinesis Data Analytics for Apache Flink to read directly from the MSK cluster.
Use AWS Glue for streaming ETL jobs powered by Apache Spark Streaming.
Use AWS Lambda functions with Amazon MSK as an event source.
Write your own Kafka consumer and run it on platforms such as Amazon EC2 instances, ECS clusters, or EKS clusters.
Conclusion
Understanding Amazon MSK and its features equips you with the knowledge needed for the AWS exam and practical applications. MSK simplifies Kafka management, offers serverless options, and integrates well with other AWS services for data streaming and processing.

Key Takeaways
Amazon MSK provides a fully managed Apache Kafka service on AWS, simplifying Kafka cluster deployment and management.
MSK supports high availability by deploying clusters across multiple Availability Zones and offers automatic recovery from common failures.
MSK Serverless allows running Kafka without provisioning or managing servers, automatically scaling compute and storage.
Differences between Kinesis Data Streams and Amazon MSK include message size limits, scaling methods, and encryption options.