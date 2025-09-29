Amazon RDS Overview
• RDS stands for Relational Database Service
• It’s a managed DB service for DB use SQL as a query language.
• It allows you to create databases in the cloud that are managed by AWS
• Postgres
• MySQL
• MariaDB
• Oracle
• Microsoft SQL Server
• IBM DB2
• Aurora (AWS Proprietary database)

Advantage over using RDS versus deploying
DB on EC2
• RDS is a managed service:
• Automated provisioning, OS patching
• Continuous backups and restore to specific timestamp (Point in Time Restore)!
• Monitoring dashboards
• Read replicas for improved read performance
• Multi AZ setup for DR (Disaster Recovery)
• Maintenance windows for upgrades
• Scaling capability (vertical and horizontal)
• Storage backed by EBS
• BUT you can’t SSH into your instances

RDS – Storage Auto Scaling
• Helps you increase storage on your RDS DB instance
dynamically
• When RDS detects you are running out of free database
storage, it scales automatically
• Avoid manually scaling your database storage
• You have to set Maximum Storage Threshold (maximum
limit for DB storage)
• Automatically modify storage if:
• Free storage is less than 10% of allocated storage
• Low-storage lasts at least 5 minutes
• 6 hours have passed since last modification
• Useful for applications with unpredictable workloads
• Supports all RDS database engines

RDS Read Replicas for read scalability
• Up to 15 Read Replicas
• Within AZ, Cross AZ or
Cross Region
• Replication is ASYNC,
so reads are eventually
consistent
• Replicas can be
promoted to their own
DB
• Applications must
update the connection
string to leverage read
replicas

RDS Read Replicas – Use Cases
• You have a production database
that is taking on normal load
• You want to run a reporting
application to run some analytics
• You create a Read Replica to run
the new workload there
• The production application is
unaffected
• Read replicas are used for SELECT
(=read) only kind of statements
(not INSERT, UPDATE, DELETE)

RDS Read Replicas – Network Cost
• In AWS there’s a network cost when data goes from one AZ to another
• For RDS Read Replicas within the same region, you don’t pay that fee

RDS Multi AZ (Disaster Recovery)
• SYNC replication
• One DNS name – automatic app
failover to standby
• Increase availability
• Failover in case of loss of AZ, loss of
network, instance or storage failure
• No manual intervention in apps
• Not used for scaling
• Note: The Read Replicas be setup as
Multi AZ for Disaster Recovery (DR)

RDS – From Single-AZ to Multi-AZ
• Zero downtime operation (no
need to stop the DB)
• Just click on “modify” for the
database
• The following happens internally:
• A snapshot is taken
• A new DB is restored from the
snapshot in a new AZ
• Synchronization is established
between the two databases

Amazon Aurora
• Aurora is a proprietary technology from AWS (not open sourced)
• Postgres and MySQL are both supported as Aurora DB (that means your
drivers will work as if Aurora was a Postgres or MySQL database)
• Aurora is “AWS cloud optimized” and claims 5x performance improvement
over MySQL on RDS, over 3x the performance of Postgres on RDS
• Aurora storage automatically grows in increments of 10GB, up to 128 TB.
• Aurora can have up to 15 replicas and the replication process is faster than
MySQL (sub 10 ms replica lag)
• Failover in Aurora is instantaneous. It’s HA (High Availability) native.
• Aurora costs more than RDS (20% more) – but is more efficient

Aurora High Availability and Read Scaling

• 6 copies of your data across 3 AZ:
• 4 copies out of 6 needed for writes
• 3 copies out of 6 need for reads
• Self healing with peer-to-peer replication
• Storage is striped across 100s of volumes
• One Aurora Instance takes writes (master)
• Automated failover for master in less than
30 seconds
• Master + up to 15 Aurora Read Replicas
serve reads
• Suppor t for Cross Region Replication

Aurora DB Cluster

Features of Aurora
• Automatic fail-over
• Backup and Recovery
• Isolation and security
• Industry compliance
• Push-button scaling
• Automated Patching with Zero Downtime
• Advanced Monitoring
• Routine Maintenance
• Backtrack: restore data at any point of time without using backups

RDS & Aurora Security
• At-rest encryption:
• Database master & replicas encryption using AWS KMS – must be defined as launch time
• If the master is not encrypted, the read replicas cannot be encrypted
• To encrypt an un-encrypted database, go through a DB snapshot & restore as encrypted
• In-flight encryption: TLS-ready by default, use the AWS TLS root certificates client-side
• IAM Authentication: IAM roles to connect to your database (instead of username/pw)
• Security Groups: Control Network access to your RDS / Aurora DB
• No SSH available except on RDS Custom
• Audit Logs can be enabled and sent to CloudWatch Logs for longer retention

Amazon RDS Proxy
• Fully managed database proxy for RDS
• Allows apps to pool and share DB connections
established with the database
• Improving database efficiency by reducing the
stress on database resources (e.g., CPU, RAM) and
minimize open connections (and timeouts)
• Serverless, autoscaling, highly available (multi-AZ)
• Reduced RDS & Aurora failover time by up 66%
• Supports RDS (MySQL, PostgreSQL, MariaDB, MS
SQL Server) and Aurora (MySQL, PostgreSQL)
• No code changes required for most apps
• Enforce IAM Authentication for DB, and securely
store credentials in AWS Secrets Manager
• RDS Proxy is never publicly accessible (must be
accessed from VPC)

---

Amazon RDS Overview
Introduction to Amazon RDS
Amazon RDS stands for Relational Database Service. It is a managed database service designed for databases that use SQL as their query language. SQL is a structured language widely used across many database engines.

With Amazon RDS, you can create databases in the cloud that are managed by AWS, providing numerous benefits.

Supported Database Engines
Amazon RDS supports several database engines including:

PostgreSQL
MySQL
MariaDB
Oracle
Microsoft SQL Server
IBM DB2
Aurora (a proprietary AWS database engine that will be studied in depth)
Why Use Amazon RDS Instead of Self-Managed Databases?
While it is possible to deploy your own database service on an EC2 instance, Amazon RDS offers a fully managed service with many advantages:

Automated provisioning of the database
Automated operating system patching
Continuous backups with the ability to restore to a specific timestamp (Point in Time Restore)
Monitoring dashboards to view database performance
Support for read replicas to improve read performance
Multi-AZ deployments for disaster recovery
Maintenance windows for upgrades
Scaling capabilities both vertically (increasing instance type) and horizontally (adding read replicas)
Storage backed by Elastic Block Store (EBS)
One limitation is that you cannot SSH into the underlying RDS instances, as AWS manages the infrastructure. This is not a disadvantage because it removes the need to manage the underlying EC2 instances yourself.

RDS Storage Auto Scaling
A notable feature of Amazon RDS is Storage Auto Scaling. When creating an RDS database, you specify the initial storage size, for example, 20 gigabytes. If your database usage increases and you approach the allocated storage limit, RDS can automatically scale the storage without any manual intervention or downtime.

This feature is especially useful for applications with unpredictable workloads, as it prevents running out of storage space and the need to manually increase storage.

To use Storage Auto Scaling, you must set a maximum storage threshold to prevent unlimited growth. The storage will automatically increase if the following conditions are met:

Free storage is less than 10% of the allocated storage
The low storage condition has persisted for more than five minutes
At least six hours have passed since the last storage modification
This feature supports all database engines available in Amazon RDS.

Conclusion
Amazon RDS provides a robust, managed relational database service with automation for provisioning, maintenance, scaling, and backups. Its Storage Auto Scaling feature enhances flexibility for applications with variable workloads. While direct access to the underlying instances is not provided, the managed nature of RDS simplifies database operations significantly.

Key Takeaways
Amazon RDS is a managed relational database service supporting multiple SQL engines.
RDS automates provisioning, patching, backups, monitoring, and scaling.
Storage Auto Scaling allows automatic increase of storage based on usage thresholds.
RDS does not provide SSH access to underlying instances, emphasizing its managed nature.

---

RDS Read Replicas vs Multi AZ
Introduction to RDS Read Replicas and Multi AZ
Understanding the difference between RDS Read Replicas and Multi AZ is extremely important for the exam. This lecture is dedicated to explaining Read Replicas and Multi AZ, focusing on their use cases.

RDS Read Replicas
Read Replicas, as the name indicates, help you to scale your read operations. Consider an application connected to an RDS database instance that performs both reads and writes. When the main database instance cannot scale enough due to too many requests, you can create up to 15 Read Replicas. These replicas can be within the same availability zone, across availability zones, or even across regions. These three deployment options are important to remember.

The replication between the main RDS database instance and the Read Replicas is asynchronous. This means the reads are eventually consistent. For example, if your application reads from a Read Replica before it has had the chance to replicate the latest data, you may not get all the data. This is why it is called eventually consistent asynchronous replication.

These Read Replicas are excellent for scaling read operations. Additionally, they can be promoted to their own standalone database. Once promoted, the replica is completely out of the replication mechanism and has its own lifecycle, allowing write operations.

When using Read Replicas, the main application must update the connection string to leverage the list of all Read Replicas in the RDS cluster.

Use Case for Read Replicas
Consider a production database handling normal load with both reads and writes. If a new team wants to run reporting and analytics on the data, connecting their application directly to the main RDS database instance could overload it and slow down the production application. Instead, a Read Replica is created to run the new workload. The replication between the main database and the Read Replica is asynchronous, and the reporting application performs reads from the Read Replica, leaving the production application unaffected.

It is important to ensure that Read Replicas are used only for SELECT statements, which are read operations. You cannot use INSERT, UPDATE, or DELETE statements on Read Replicas, as these modify the database.

Networking Costs Associated with Read Replicas
In AWS, data transfer between availability zones usually incurs a cost, but there are exceptions for managed services like RDS. If your Read Replica is within the same region but a different availability zone, replication traffic is free. For example, replication traffic between us-east-1a and us-east-1b is free. However, if you use a cross-region Read Replica, such as between us-east-1 and eu-west-1, replication traffic will incur network fees.

RDS Multi AZ
Multi AZ is mainly used for disaster recovery. The application performs reads and writes to a Master database instance in availability zone A. There is synchronous replication to a standby instance in availability zone B. Every change in the Master is synchronously replicated to the standby instance. This means when the application writes to the Master, the change must also be replicated to the standby to be accepted.

With Multi AZ, there is one DNS name that the application uses to connect. In case of a problem with the Master, an automatic failover occurs to the standby database using that DNS name. This increases availability and provides failover in case of losing an entire availability zone, network issues, or instance or storage failures on the Master database. The standby database becomes the new Master without manual intervention in the application, as long as the application continues to attempt connections.

Multi AZ is not used for scaling. The standby database is just for failover; it cannot be read from or written to.

Combining Read Replicas with Multi AZ
It is possible to set up Read Replicas as Multi AZ for disaster recovery. This is a common exam question.

Transitioning from Single AZ to Multi AZ
To convert an RDS database from Single AZ to Multi AZ, it is a zero downtime operation. You do not need to stop the database. You simply modify the database and enable Multi AZ. This causes the RDS database instance to have a Master and a standby database with synchronous replication without any manual intervention other than modifying the setting. The database continues running during this process.

Behind the scenes, RDS takes a snapshot of the main database automatically. This snapshot is restored into a new standby database. Once restored, synchronization is established between the two databases, allowing the standby to catch up to the main database. At this point, the Multi AZ setup is complete.

Conclusion
This concludes the lecture on the differences between RDS Read Replicas and Multi AZ. Understanding these concepts is essential for the exam, as many questions will focus on them.

Key Takeaways
RDS Read Replicas are used to scale read operations with asynchronous replication, supporting up to 15 replicas across availability zones or regions.
Read Replicas are eventually consistent and can be promoted to standalone databases for write operations.
RDS Multi-AZ deployments provide synchronous replication for disaster recovery with automatic failover, enhancing availability but not scaling reads.
Transitioning from Single AZ to Multi AZ is a zero downtime operation involving an automatic snapshot and standby database creation.

Amazon Aurora
Introduction to Amazon Aurora
Let's discuss Amazon Aurora, as the exam increasingly includes questions about it. While deep knowledge is not required, a high-level overview is essential to understand how it works.

Aurora is a proprietary technology developed by AWS. It is not open source but is designed to be compatible with PostgreSQL and MySQL. This means your Aurora database will accept connections using the same drivers as PostgreSQL or MySQL.

Aurora is cloud-optimized and achieves significant performance improvements: approximately 5 times faster than MySQL on RDS and 3 times faster than PostgreSQL on RDS. These optimizations are achieved through various smart techniques, though the internal details are beyond this lecture's scope.

Storage Auto-Scaling
Aurora storage automatically grows, starting at 10GB and scaling up to 128TB as more data is added. This feature removes the need for database administrators or SysOps to monitor disk space manually.

Aurora supports up to 15 read replicas, with replication processes faster than MySQL, typically achieving sub-10 millisecond replica lag. Failover in Aurora is nearly instantaneous, much faster than Multi-AZ failover on MySQL RDS. Being cloud-native, Aurora provides high availability by default.

Although Aurora costs about 20% more than standard RDS, its efficiency at scale often results in cost savings.

High Availability and Read Scaling
Aurora stores six copies of your data across three Availability Zones (AZs). For writes, it requires four out of six copies to be available, so if one AZ goes down, writes can continue uninterrupted. For reads, it requires three out of six copies, ensuring high availability for read operations.

Aurora includes a self-healing process that repairs corrupted or bad data through peer-to-peer replication in the backend. Instead of relying on a single volume, Aurora uses hundreds of volumes, significantly reducing risk without requiring user management.

Data Replication Diagram
Imagine three AZs with a shared logical storage volume that performs replication, self-healing, and auto-expansion. When you write data (e.g., blue data), six copies are stored across the three AZs. The same applies to other data (e.g., orange data). Data is striped across different volumes, enabling efficient and reliable storage.

You do not directly interface with the storage; this design is managed entirely by Amazon to optimize performance and reliability.

Aurora Architecture
Aurora functions similarly to Multi-AZ RDS but with enhancements. There is a single master instance that handles all writes. If the master fails, failover occurs in less than 30 seconds on average, which is very fast.

You can have up to 15 read replicas serving read requests, which allows scaling of read workloads. Any read replica can be promoted to master if the current master fails. This differs from traditional RDS behavior, where only one master exists by default.

Read replicas support cross-region replication, enhancing disaster recovery and global availability.

Connection Management with Endpoints
Aurora provides a writer endpoint, a DNS name that always points to the current master instance. This means clients connect to the writer endpoint for write operations, and if failover occurs, the endpoint automatically redirects to the new master.

Similarly, there is a reader endpoint that load balances connections across all read replicas. This endpoint simplifies connection management, especially when auto scaling is enabled for read replicas (from 1 up to 15 replicas).

Load balancing via the reader endpoint occurs at the connection level, not the statement level.

Summary of Aurora Features
Writer endpoint for seamless write operations.
Reader endpoint for connection load balancing across read replicas.
Auto scaling of read replicas to match workload demands.
Shared storage volume that auto-expands from 10GB to 128TB.
Understanding this architecture is crucial for the exam.

Additional Features
Aurora offers several advanced features including automatic failover, backup and recovery, isolation and security, industry compliance, push-button scaling via auto scaling, and automated patching with zero downtime. It also provides advanced monitoring and routine maintenance handled by AWS.

Aurora includes a feature called backtrack, which allows restoring data to any point in time without relying on traditional backups. For example, you can restore data to yesterday at 4:00 PM or 5:00 PM, providing flexibility and ease in data recovery.

This concludes our overview of Amazon Aurora. Thank you for your attention, and I will see you in the next lecture.

Key Takeaways
Amazon Aurora is a cloud-optimized, proprietary AWS database compatible with PostgreSQL and MySQL drivers.
Aurora storage automatically grows from 10GB up to 128TB, eliminating manual disk monitoring.
It maintains six copies of data across three Availability Zones, ensuring high availability and self-healing.
Aurora supports up to 15 read replicas with fast replication and failover, including writer and reader endpoints for seamless connection management.

---
RDS & Aurora Security
Introduction to RDS and Aurora Security
This lecture provides a quick overview of security features available for RDS and Aurora databases.

Data Encryption at Rest
You can encrypt data at-rest on your RDS and Aurora databases. This means that the data is encrypted on the storage volumes. Both the master database and any replicas are encrypted using AWS Key Management Service (KMS). This encryption must be defined at the time of the initial database launch.

If the master database is not encrypted at launch, then read replicas cannot be encrypted either. To encrypt an existing unencrypted database, you must take a snapshot of that database and then restore the snapshot as an encrypted database. This process involves a snapshot and restore operation.

Data Encryption in Transit
RDS and Aurora databases support in-flight encryption by default. This means that data transmitted between your clients and the database is encrypted. Clients must use the TLS root certificates provided by AWS, which are available on the AWS website.

Database Authentication Methods
For authentication, RDS and Aurora support the classic username and password combination. Additionally, because these are AWS services, you can use IAM roles to connect to your database. For example, EC2 instances with assigned IAM roles can authenticate directly to the database without requiring a username and password. This approach helps manage security centrally within AWS and IAM.

Network Access Control
You can control network access to your database using security groups. This allows you to allow or block specific ports, IP addresses, or other security groups to restrict access appropriately.

Access Restrictions and SSH
RDS and Aurora do not provide SSH access because they are managed services. The exception is if you use the RDS Custom service from AWS, which may allow more control.

Audit Logs
To monitor database activity, you can enable Audit Logs on RDS and Aurora. These logs record queries and other database events over time. Audit Logs are retained only for a limited period. To preserve them for longer durations, you need to send the logs to AWS CloudWatch Logs, a dedicated logging service.

Summary
This concludes the brief lecture on security options for RDS and Aurora databases. These features include encryption at rest and in transit, flexible authentication methods, network access control, and audit logging capabilities.

Key Takeaways
Data at-rest encryption on RDS and Aurora is enabled using KMS and must be defined at database launch.
In-flight encryption is enabled by default, requiring clients to use AWS TLS root certificates.
Database authentication supports both username/password and IAM roles for enhanced security management.
Network access is controlled via security groups, and audit logs can be sent to CloudWatch Logs for long-term retention.

---
Amazon RDS Proxy Overview
Introduction to Amazon RDS Proxy
Amazon RDS Proxy is a fully managed database proxy for Amazon RDS that you can deploy within your Virtual Private Cloud (VPC).

Instead of having every application connect directly to your RDS database instance, applications connect to the RDS Proxy. The proxy pools and shares the database connections established with the database, consolidating many application connections into fewer database connections.

This approach improves database efficiency by reducing stress on database resources such as CPU and RAM. It also minimizes the number of open connections and reduces timeouts to your database.

Features of RDS Proxy
Fully serverless and auto-scaling, so you do not need to manage its capacity.
Highly available across multiple Availability Zones (AZs).
Supports failover handling, reducing failover time by up to 66% for RDS and Aurora databases.
During a failover event, such as switching from a primary to a standby instance, the RDS Proxy manages the failover transparently. Applications connect to the proxy, which handles the failover without the applications needing to be aware of it.

Supported Database Engines
RDS Proxy supports the following database engines:

MySQL
PostgreSQL
MariaDB
Microsoft SQL Server
Aurora for MySQL and PostgreSQL
Using RDS Proxy does not require any code changes in your application. Instead of connecting directly to your RDS or Aurora database instance, you simply connect to the RDS Proxy endpoint.

Security Enhancements
RDS Proxy can enforce IAM authentication for your database connections, ensuring that only authorized users can connect using IAM credentials. These credentials can be securely stored and managed using AWS Secrets Manager.

Additionally, the RDS Proxy is never publicly accessible. It is only accessible from within your VPC, enhancing security by preventing internet-based access.

Use Case: AWS Lambda Functions
AWS Lambda functions execute code in response to events and can scale rapidly, creating many instances that open connections to your RDS database. This can lead to a large number of open connections and potential timeouts, causing performance issues.

By using RDS Proxy, Lambda functions connect to the proxy instead of directly to the database. The proxy pools these connections, reducing the number of direct connections to the database instance and solving the problem of connection overload.

Summary
RDS Proxy pools and minimizes connections to your RDS database instance.
It reduces failover time by up to 66% by managing failovers transparently.
It enforces IAM authentication and securely stores credentials in AWS Secrets Manager.
It enhances security by being accessible only within your VPC.
It is especially beneficial for serverless architectures such as AWS Lambda functions.
Key Takeaways
Amazon RDS Proxy pools and shares database connections to improve efficiency and reduce resource stress.
It is fully serverless, auto-scaling, and highly available across multiple Availability Zones.
RDS Proxy reduces failover time by up to 66% by managing failovers transparently.
It supports IAM authentication enforcement and securely stores credentials in AWS Secrets Manager.