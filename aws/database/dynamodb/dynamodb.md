Traditional Architecture
• Traditional applications leverage RDBMS databases
• These databases have the SQL query language
• Strong requirements about how the data should be modeled
• Ability to do query joins, aggregations, complex computations
• Vertical scaling (getting a more powerful CPU / RAM / IO)
• Horizontal scaling (increasing reading capability by adding EC2 / RDS Read Replicas)

---

NoSQL databases

• NoSQL databases are non-relational databases and are distributed
• NoSQL databases include MongoDB, DynamoDB, …
• NoSQL databases do not support query joins (or just limited support)
• All the data that is needed for a query is present in one row
• NoSQL databases don’t perform aggregations such as “SUM”, “AVG”, …
• NoSQL databases scale horizontally
• There’s no “right or wrong” for NoSQL vs SQL, they just require to
model the data differently and think about user queries differently

---

Amazon DynamoDB

• Fully managed, highly available with replication across multiple AZs
• NoSQL database - not a relational database
• Scales to massive workloads, distributed database
• Millions of requests per seconds, trillions of row, 100s of TB of storage
• Fast and consistent in performance (low latency on retrieval)
• Integrated with IAM for security, authorization and administration
• Enables event driven programming with DynamoDB Streams
• Low cost and auto-scaling capabilities
• Standard & Infrequent Access (IA) Table Class

---

DynamoDB - Basics

• DynamoDB is made of Tables
• Each table has a Primary Key (must be decided at creation time)
• Each table can have an infinite number of items (= rows)
• Each item has attributes (can be added over time – can be null)
• Maximum size of an item is 400KB
• Data types supported are:
• Scalar Types – String, Number, Binary, Boolean, Null
• Document Types – List, Map
• Set Types – String Set, Number Set, Binary Set

---

DynamoDB – Primary Keys

• Option 1: Par tition Key (HASH)
• Partition key must be unique for each item
• Partition key must be “diverse” so that the data is distributed
• Example: “User_ID” for a users table

• Option 2: Par tition Key + Sor t Key (HASH + RANGE)
• The combination must be unique for each item
• Data is grouped by partition key
• Example: users-games table, “User_ID” for Partition Key and “Game_ID” for Sort Key

---

DynamoDB – Partition Keys (Exercise)

• We’re building a movie database
• What is the best Partition Key to maximize data distribution?
• movie_id
• producer_name
• leader_actor_name
• movie_language
• “movie_id” has the highest cardinality so it’s a good candidate
• “movie_language” doesn’t take many values and may be skewed
towards English so it’s not a great choice for the Partition Key

---

DynamoDB Overview
Introduction to DynamoDB
Now let's have a look at DynamoDB, which is a NoSQL serverless database.

Traditional Architecture Overview
In the traditional architecture that we've seen throughout this course, we have clients connecting to an application layer. This layer could consist of an elastic load balancer and EC2 instances grouped and scaled with an auto scaling group. The data must be sourced somewhere, so we have a database layer, which could be using Amazon RDS backed by MySQL, PostgreSQL, or similar technologies.

Traditional applications leverage relational database management systems (RDBMS) because of the SQL query language. SQL is very effective, allowing us to define strong requirements about how data should be modeled, since we have tables and schemas. We can perform joins, aggregations, and complex computations, which all work well.

Scaling Limitations of RDBMS
However, when it comes to scaling, traditional databases mostly support vertical scaling. If you want a better database, specifically at the database layer, you need to replace the database with one that has a more powerful CPU, more RAM, or better disk I/O. Horizontal scaling is limited to increasing read capability by adding EC2 instances at the application layer or RDS Read Replicas at the database layer. But the number of replicas is limited, restricting horizontal read scaling, and there is no horizontal write scaling with RDS.

Introduction to NoSQL Databases
NoSQL databases, meaning non-relational or not only SQL databases, are distributed and provide horizontal scalability. Some well-known NoSQL technologies are MongoDB and DynamoDB. These databases do not support query joins or have very limited support, so for simplicity, assume they do not have query joins. Therefore, all the data needed must be present in one row in your database. Also, NoSQL databases typically do not perform aggregation computations such as SUM or AVG.

The advantage of NoSQL databases is that, thanks to their design, they scale horizontally. This means that if you need more write or read capacity, you can have more instances behind the scenes, and it will scale very well. There is no right or wrong choice between NoSQL and SQL; it depends on your data modeling, application, user queries, and scaling needs.

Overview of DynamoDB
DynamoDB is a fully managed NoSQL database. It is highly available and replicates data across multiple Availability Zones out of the box. It is not a relational database like RDS. DynamoDB scales to massive workloads and is fully distributed, allowing it to handle millions of requests per second, trillions of rows, and hundreds of terabytes of storage regardless of workload.

DynamoDB provides fast and consistent performance with low latency on data retrieval. As a service, it integrates fully with IAM for security, authorization, and administration. You can enable event-driven programming with DynamoDB Streams. It is low cost and supports auto scaling. Additionally, it offers standard and Infrequent Access (IA) table classes for different storage tiers.

DynamoDB Basics
DynamoDB consists of tables, and each table has a primary key which must be decided before creating the table. Each table can have an infinite number of rows, also called items. The terms rows and items will be used interchangeably. Each item has attributes, which are similar to columns but can be nested and added over time. Attributes do not all need to be defined at table creation, and some can be null or missing in some items.

Each item or row can have up to 400 kilobytes of data. Supported data types include scalar types such as string, number, binary, boolean, and null; document types such as lists and maps, which provide nesting capabilities; and set types such as string sets, number sets, and binary sets.

Choosing a Primary Key in DynamoDB
Choosing a primary key is crucial and will be tested in the exam. There are two options for primary keys:

Partition Key (Hash Strategy): The partition key must be unique for each item, similar to a normal database. The partition key should be diverse enough to distribute data evenly. For example, in a users table, the partition key could be User_ID, with attributes like First_Name, Last_Name, and Age.

Partition Key and Sort Key (Hash + Range): The combination of these two must be unique for each item. Data is grouped by the partition key. For example, in a users-game table, User_ID can be the partition key and Game_ID the sort key. This allows users to attend multiple games, with uniqueness ensured by the combination of User_ID and Game_ID.

In this model, the partition key groups data, and the sort key provides uniqueness within that group. For example, multiple rows can have the same partition key but different sort keys, which is acceptable and expected. This design emphasizes the importance of choosing a good partition key to ensure data is distributed evenly.

Exam Exercise: Choosing the Best Partition Key
Consider building a movie database and choosing the best partition key to maximize data distribution. Options include movie_id, producer_name, lead_actor_name, or movie_language. The best choice is movie_id because it is unique for each row, providing high cardinality and good data distribution.

Choosing a partition key like movie_language would not be ideal because there are fewer distinct values, and many movies might be in English, causing data skew. The exam will test your ability to select the best partition key based on cardinality and data distribution. Always choose the key with the highest cardinality and the most distinct values.

Conclusion
This overview of DynamoDB introduces its key concepts and contrasts it with traditional relational databases. A detailed section and hands-on practice will follow to deepen understanding and application of DynamoDB.

Key Takeaways
DynamoDB is a fully managed, serverless NoSQL database designed for horizontal scalability and high availability.
Unlike traditional RDBMS, DynamoDB uses primary keys (partition key or partition key plus sort key) to distribute data efficiently.
NoSQL databases like DynamoDB do not support joins or complex aggregations, requiring data to be modeled accordingly.
Choosing a partition key with high cardinality is critical to ensure even data distribution and optimal performance.