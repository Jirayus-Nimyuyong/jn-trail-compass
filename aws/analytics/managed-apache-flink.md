Amazon Managed Service for Apache Flink

• Previously named: Kinesis Data Analytics for Apache Flink
• Flink (Java, Scala or SQL) is a framework for processing data streams

• Run any Apache Flink application on a managed cluster on AWS
• Provisioned compute resources, parallel computation, automatic scaling
• Application backups (implemented as checkpoints and snapshots)
• Use any Apache Flink programming features to transform data
• Important: Flink does not read from Amazon Data Firehose

---

Amazon Managed Service for Apache Flink
Introduction to Amazon Managed Service for Apache Flink
Now let's talk about the Amazon Managed Service for Apache Flink. It used to be called Kinesis Data Analytics for Apache Flink, but since then it has been renamed to just Managed Service for Apache Flink.

What is Apache Flink?
Flink is a framework, usually using the Java, SQL, or Scala languages. It is a framework used for processing data streams in real time.

Data Sources and Integration
With Amazon Managed Service for Apache Flink, you can read data from Kinesis Data Streams or even Amazon MSK, which is Apache Kafka. Amazon MSK is a managed service for Apache Kafka, which is also a service for real-time data streams but not an AWS service itself.

Running Apache Flink Applications on AWS
Thanks to the Amazon Managed Service for Apache Flink, you can run any Apache Flink application on the managed cluster on AWS. This means that AWS will provision the compute resources for you, provide access to parallel computation, and enable automatic scaling.

Application Management Features
On top of that, AWS manages your application backups, which are implemented as checkpoints and snapshots. You can use any Apache Flink supported programming features to transform your data, giving you freedom regarding the types of transformations you want to perform on your streams.

Important Note on Data Sources
As you should know, Flink can read from Kinesis Data Streams, but it cannot read from Amazon Data Firehose. This could be an exam trick to keep in mind.

Summary
That is all you should know about Amazon Managed Service for Apache Flink. Remember, it is only used for processing data streams.

This concludes the lecture on Amazon Managed Service for Apache Flink.

Key Takeaways
Amazon Managed Service for Apache Flink is a managed service for running Apache Flink applications on AWS.
It supports real-time data stream processing using Java, SQL, or Scala.
The service integrates with Kinesis Data Streams and Amazon MSK (Apache Kafka) for data ingestion.
AWS manages compute resources, parallel computation, automatic scaling, and application backups via checkpoints and snapshots.