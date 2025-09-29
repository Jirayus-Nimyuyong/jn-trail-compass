DynamoDB Streams

• Ordered stream of item-level modifications (create/update/delete) in a table
• Stream records can be:
• Sent to Kinesis Data Streams
• Read by AWS Lambda
• Read by Kinesis Client Library applications
• Data Retention for up to 24 hours
• Use cases:
• react to changes in real-time (welcome email to users)
• Analytics
• Insert into derivative tables
• Insert into OpenSearch Service
• Implement cross-region replication

---

• Ability to choose the information that will be written to the stream:
• KEYS_ONLY – only the key attributes of the modified item
• NEW_IMAGE – the entire item, as it appears after it was modified
• OLD_IMAGE – the entire item, as it appeared before it was modified
• NEW_AND_OLD_IMAGES – both the new and the old images of the item
• DynamoDB Streams are made of shards, just like Kinesis Data Streams
• You don’t provision shards, this is automated by AWS
• Records are not retroactively populated in a stream after enabling it

---

DynamoDB Streams & AWS Lambda

• You need to define an Event Source
Mapping to read from a DynamoDB
Streams
• You need to ensure the Lambda
function has the appropriate
permissions
• Your Lambda function is invoked
synchronously

---

DynamoDB Streams
Introduction to DynamoDB Streams
DynamoDB Streams are an ordered list of item-level modifications, such as create, update, and delete operations, that occur within a table. Whenever you insert, modify, or delete an item, that modification becomes visible in the stream. The stream represents the list of all modifications over time in your table.

Stream records can be sent to multiple destinations. For example, you can send a DynamoDB Stream into Kinesis Data Streams and then process it as needed. Alternatively, you can use a Lambda function to read directly from your DynamoDB Streams, or use Kinesis Client Library (KCL) applications to read from DynamoDB Streams as well.

The data retention within a DynamoDB Stream is up to 24 hours. Therefore, you need to ensure that you either persist the data somewhere like Kinesis Data Streams for longer retention or use Lambda or KCL applications to persist it in a more durable storage.

Use Cases for DynamoDB Streams
DynamoDB Streams enable you to react to changes in real-time happening in your DynamoDB tables. Examples include:

Sending a welcome email to users upon account creation.
Performing analytics based on data changes.
Transforming the stream to create derivative tables in DynamoDB.
Sending data into OpenSearch for indexing and providing search capabilities on top of DynamoDB.
Implementing global tables and cross-region replication, which require streams.
Architecture of DynamoDB Streams
Your application performs create, update, and delete operations on your DynamoDB table. Any of these changes appear in a DynamoDB Stream. From there, Kinesis Data Streams can receive your DynamoDB Stream. Using Kinesis Data Firehose, you can send the data to destinations such as Amazon Redshift for analytics queries, Amazon S3 for archival, or OpenSearch Service to create search capabilities on top of your DynamoDB table.

This architecture is mostly managed by AWS. If you want to add custom logic, you can create a processing layer such as a Kinesis Client Library application running on EC2 or a Lambda function that reads from DynamoDB Streams. This allows you to implement any logic you want, such as sending notifications using Amazon SNS, filtering and transforming data, reinserting data into DynamoDB tables, or sending data into OpenSearch.

Stream Content Options
In the stream, you can choose the information that appears:

KEYS_ONLY: Shows only the key attributes that have been modified.
NEW_IMAGE: Represents the new item after modification.
OLD_IMAGE: Represents the entire item as it appeared before modification.
NEW_AND_OLD_IMAGES: Provides both the new and old images of the item, allowing you to see what changes occurred.
DynamoDB Streams and Shards
DynamoDB Streams are composed of shards, similar to Kinesis Data Streams. This similarity allows the Kinesis Client Library to work with both DynamoDB Streams and Kinesis Data Streams. However, unlike Kinesis Data Streams, you do not need to provision shards for DynamoDB Streams; AWS manages this automatically, providing a hands-off approach.

Note that when you enable DynamoDB Streams, records are not retroactively populated in the stream. Only changes that occur after enabling the stream will be captured. This is an important detail to remember.

DynamoDB Streams and Lambda Integration
To use Lambda with DynamoDB Streams, you need to define an Event Source Mapping to read from the stream. The Lambda function must have the appropriate permissions to pull from the DynamoDB Stream. The Lambda function will be invoked synchronously.

For example, the table sends changes to a DynamoDB Stream. The Lambda function has an Event Source Mapping that pulls records in batches from the stream. Once records are retrieved, the Event Source Mapping invokes the Lambda function synchronously with a batch of records from the stream.

Conclusion
This concludes the lecture on DynamoDB Streams. The integration with Kinesis Data Streams, Lambda, and other AWS services enables powerful real-time data processing and analytics capabilities.

Key Takeaways
DynamoDB Streams capture an ordered list of item-level modifications such as create, update, and delete operations.
Stream records can be sent to multiple destinations including Kinesis Data Streams and Lambda functions for real-time processing.
DynamoDB Streams retain data for up to 24 hours; longer retention requires persisting data externally.
Lambda functions can be triggered synchronously via Event Source Mapping to process DynamoDB Stream records in batches.