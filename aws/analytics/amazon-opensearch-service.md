Amazon OpenSearch Service

• Amazon OpenSearch is successor to Amazon ElasticSearch
• In DynamoDB, queries only exist by primary key or indexes…
• With OpenSearch, you can search any field, even par tially matches
• It’s common to use OpenSearch as a complement to another database
• Two modes: managed cluster or serverless cluster
• Does not natively support SQL (can be enabled via a plugin)
• Ingestion from Kinesis Data Firehose, AWS IoT, and CloudWatch Logs
• Security through Cognito & IAM, KMS encryption, TLS
• Comes with OpenSearch Dashboards (visualization)

---

OpenSearch patterns
DynamoDB

---

OpenSearch patterns
CloudWatch Logs

---

OpenSearch patterns
Kinesis Data Streams & Kinesis Data Firehose

---

Amazon OpenSearch Service - Overview
Introduction to Amazon OpenSearch Service
Amazon OpenSearch Service is the successor to a service you may have heard of before called Amazon ElasticSearch. The name change was due to some licensing issues.

Comparison with DynamoDB
In DynamoDB, you can only query data by primary key or if you have indexes on your database. However, with OpenSearch, you can search any fields, even for partial matches. This makes OpenSearch very common to provide search capabilities to your application.

Complementing Databases
You would use OpenSearch as a complement to another database. OpenSearch can be used not only for search but also for analytic queries on top of your data.

Provisioning OpenSearch Clusters
There are two modes to provision an OpenSearch cluster:

Managed cluster option: Actual physical instances are provisioned for you and you can see them.
Serverless cluster: Everything from scaling to operations is handled by AWS.
Query Language and Data Ingestion
OpenSearch has its own query language and does not natively support SQL. However, you can enable SQL compatibility via a plugin. You can ingest data from various sources such as Kinesis Data Firehose, IoT, CloudWatch Logs, or any custom-built application.

Security Features
Security is provided through integration with Cognito and IAM. You also get encryption at rest and in-flight encryption to protect your data.

Analytics and Visualization
You can perform analytics on top of the OpenSearch Service using OpenSearch Dashboards to create visualizations based on your OpenSearch data.

Common Usage Patterns
A typical pattern involves using DynamoDB as your main data store where users insert, delete, and update data. DynamoDB Streams capture these changes and a Lambda function picks up the stream to insert data into Amazon OpenSearch in real time. This enables your application to perform partial searches on item names to find item IDs, and then retrieve full items from DynamoDB using those IDs.

CloudWatch Logs Ingestion
You can ingest CloudWatch Logs into OpenSearch using two methods:

Using a CloudWatch Log Subscription Filter that sends data in real time to a Lambda function managed by AWS, which then sends data to OpenSearch.
Using a CloudWatch Logs Subscription Filter with Kinesis Data Firehose, which reads from the filter and inserts data into OpenSearch near real time.
Kinesis Data Streams Ingestion
To send Kinesis Data Streams into OpenSearch, you have two strategies:

Use Kinesis Data Firehose for near real-time ingestion, optionally transforming data with a Lambda function before sending it to OpenSearch.
Use Kinesis Data Streams with a Lambda function that reads the stream in real time and writes custom code to send data to OpenSearch.
Summary
These patterns cover the possible architectures for using Amazon OpenSearch. OpenSearch provides powerful search and analytics capabilities that complement your existing data stores and AWS services.

Key Takeaways
Amazon OpenSearch Service is the successor to Amazon ElasticSearch, renamed due to licensing issues.
OpenSearch allows searching any fields including partial matches, complementing databases like DynamoDB.
OpenSearch supports both managed and serverless cluster provisioning options.
Data ingestion into OpenSearch can be done via various AWS services such as DynamoDB Streams, CloudWatch Logs, Kinesis Data Firehose, and Lambda functions.
