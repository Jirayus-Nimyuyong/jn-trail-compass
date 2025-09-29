Amazon EFS – Elastic File System
• Use cases: content management, web serving, data sharing, Wordpress
• Uses NFSv4.1 protocol
• Uses security group to control access to EFS
• Compatible with Linux based AMI (not Windows)
• Encryption at rest using KMS
• POSIX file system (~Linux) that has a standard file API
• File system scales automatically, pay-per-use, no capacity planning!

EFS – Performance & Storage Classes
• EFS Scale
• 1000s of concurrent NFS clients, 10 GB+ /s throughput
• Grow to Petabyte-scale network file system, automatically
• Performance Mode (set at EFS creation time)
• General Purpose (default) – latency-sensitive use cases (web server, CMS, etc…)
• Max I/O – higher latency, throughput, highly parallel (big data, media processing)
• Throughput Mode
• Bursting – 1 TB = 50MiB/s + burst of up to 100MiB/s
• Provisioned – set your throughput regardless of storage size, ex: 1 GiB/s for 1 TB storage
• Elastic – automatically scales throughput up or down based on your workloads
• Up to 3GiB/s for reads and 1GiB/s for writes
• Used for unpredictable workloads

EFS – Storage Classes
• Storage Tiers (lifecycle management feature –
move file after N days)
• Standard: for frequently accessed files
• Infrequent access (EFS-IA): cost to retrieve files, lower
price to store.
• Archive: rarely accessed data (few times each year), 50%
cheaper
• Implement lifecycle policies to move files between storage
tiers
• Availability and durability
• Standard: Multi-AZ, great for prod
• One Zone: One AZ, great for dev, backup enabled by
default, compatible with IA (EFS One Zone-IA)
• Over 90% in cost savings

---

Amazon Elastic File System (EFS) Overview
Introduction to Amazon EFS
Amazon Elastic File System (EFS) is a managed Network File System (NFS). Because it is a network file system, it can be mounted on many EC2 instances simultaneously. These EC2 instances can reside in different availability zones, which is a key advantage of EFS. This design makes EFS highly available and very scalable. However, it is more expensive, costing about three times as much as a GP2 EBS volume. The pricing model is pay-per-use, so you do not need to provision capacity in advance.

Architecture and Connectivity
You create an EFS file system and associate it with a security group. Multiple EC2 instances, for example in the US East-1A, US East-1B, or US East-1C availability zones, can connect simultaneously to the same EFS network file system. This multi-AZ connectivity enables shared access across distributed instances.

Use Cases and Compatibility
EFS is suitable for content management, web serving, data sharing, and applications like WordPress. Internally, it uses the NFS protocol. To control access, you configure security groups. It is important to note that EFS is only compatible with Linux-based AMIs and does not support Windows. Encryption at rest can be enabled using AWS Key Management Service (KMS). EFS follows the POSIX standard file system and provides a standard file API.

Scalability and Pricing
A key feature of EFS is that you do not need to plan capacity in advance. The file system scales automatically and you pay per gigabyte of data used. This elasticity simplifies storage management and cost control.

Performance and Throughput Modes
EFS supports thousands of concurrent NFS clients and can provide over 10 gigabytes per second of throughput. It can scale to petabyte levels automatically.

When creating an EFS file system, you can select the performance mode:

General Purpose (default): Optimized for latency-sensitive use cases such as web servers and content management systems.
Max I/O: Provides higher throughput with higher latency, suitable for big data and media processing applications due to its high parallelism.
Throughput Modes
EFS offers different throughput modes:

Bursting: Throughput scales with storage size. For example, with one terabyte of storage, you get 50 megabytes per second plus bursts up to 100 megabytes per second.
Provisioned: Allows you to set throughput independently of storage size, such as one gigabyte per second for one terabyte of storage.
Elastic: Automatically scales throughput up and down based on workload, supporting up to three gigabytes per second for reads and one gigabyte per second for writes. This mode is ideal for unpredictable workloads.
Storage Classes and Lifecycle Management
EFS provides several storage tiers with lifecycle management features to optimize cost:

Standard Tier: For frequently accessed files.
EFS Infrequent Access (EFS-IA): For files accessed less frequently, offering lower storage costs but with retrieval fees.
Archive Storage Tier: For rarely accessed data, such as files accessed only a few times per year, providing significant storage cost savings.
Lifecycle policies can be configured to automatically move files between tiers based on the number of days since last access. For example, a file not accessed for 60 days in the Standard tier can be moved to the EFS-IA tier automatically.

Availability and Durability Options
EFS supports multi-availability zone (multi-AZ) deployments, which are ideal for production workloads requiring high availability and disaster resistance. This setup replicates data across multiple availability zones.

For development or cost-sensitive environments, EFS offers a single availability zone option, which is less expensive but still supports backups and is compatible with the EFS-IA storage tier. This option is called EFS One Zone-IA.

By selecting appropriate storage classes and deployment options, users can achieve up to 90% cost savings.

Conclusion
Amazon EFS is a flexible, scalable, and highly available network file system designed for Linux-based EC2 instances. It supports multiple performance and throughput modes, various storage classes with lifecycle management, and deployment options tailored for both production and development environments. Its pay-per-use pricing and automatic scaling simplify storage management while optimizing costs.

Key Takeaways
Amazon EFS is a managed, scalable, and highly available network file system compatible with Linux-based EC2 instances across multiple availability zones.
EFS supports different performance modes (General Purpose and Max I/O) and throughput modes (Bursting, Provisioned, Elastic) to suit various workload needs.
Storage classes include Standard, Infrequent Access (EFS-IA), and Archive tiers, with lifecycle management policies to optimize cost.
EFS offers multi-AZ and single-AZ deployment options, balancing availability, durability, and cost savings up to 90% with appropriate storage class choices.