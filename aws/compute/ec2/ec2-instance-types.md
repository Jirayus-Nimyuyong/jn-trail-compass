EC2 Instance Types - Overview
• You can use different types of EC2 instances that are optimised for
different use cases (https://aws.amazon.com/ec2/instance-types/)
• AWS has the following naming convention:
m5.2xlarge
• m: instance class
• 5: generation (AWS improves them over time)
• 2xlarge: size within the instance class
---
EC2 Instance Types – General Purpose
Great for a diversity of workloads such as web servers or code repositories
• Balance between:
• Compute
• Memory
• Networking
• In the course, we will be using the t2.micro which is a General Purpose EC2
instance
---
EC2 Instance Types – Compute Optimized
Great for compute-intensive tasks that require high performance
processors:
• Batch processing workloads
• Media transcoding
• High performance web servers
• High performance computing (HPC)
• Scientific modeling & machine learning
• Dedicated gaming servers
---
EC2 Instance Types – Memory Optimized
• Fast performance for workloads that process large data sets in memory
• Use cases:
• High performance, relational/non-relational databases
• Distributed web scale cache stores
• In-memory databases optimized for BI (business intelligence)
• Applications performing real-time processing of big unstructured data
--- 
EC2 Instance Types – Storage Optimized
• Great for storage-intensive tasks that require high, sequential read and write
access to large data sets on local storage
• Use cases:
• High frequency online transaction processing (OLTP) systems
• Relational & NoSQL databases
• Cache for in-memory databases (for example, Redis)
• Data warehousing applications
• Distributed file systems
---


EC2 Instance Types Basics
Introduction to EC2 Instance Types
In this lecture, we will discuss EC2 instance types. There are different types of EC2 instances available for various use cases, each optimized differently. Currently, there are seven different types of EC2 instances listed on the AWS website. This website serves as a reference to explore EC2 instance types, their costs, and other specific details.

AWS EC2 Instance Naming Convention
AWS uses a specific naming convention for EC2 instances. For example, consider the instance named m5.2xlarge:

M represents the instance class, which in this case is a general purpose instance.
5 indicates the generation of the instance. As hardware improves, new generations are released (e.g., from m5 to m6).
2xlarge denotes the size within the instance class. Sizes start from small, then large, 2xlarge, 4xlarge, and so forth.
The size reflects the amount of memory and CPU resources available. Larger sizes provide more memory and CPU power.

General Purpose Instances
General purpose instances are versatile and suitable for a wide range of workloads such as web servers or code repositories. They offer a balanced combination of compute, memory, and networking resources.

In this course, we will primarily use general purpose instances, specifically the t2.micro instance, which is included in the AWS free tier.

The AWS website provides an evolving list of general purpose instances, which can be referenced for the most current information.

Compute Optimized Instances
Compute optimized instances are designed for compute-intensive tasks requiring high processor performance. Use cases include:

Batch processing of data
Media transcoding
High performance web servers
High performance computing (HPC)
Machine learning
Dedicated gaming servers
These instances are identified by the C series, such as C5 and C6.

Memory Optimized Instances
Memory optimized instances provide fast performance for workloads that process large data sets in memory. "Memory" here refers to RAM.

Typical use cases include:

High performance relational or non-relational databases, especially in-memory databases
Distributed web scale cache stores, such as ElastiCache
Business intelligence (BI) applications
Real-time processing of large unstructured data
These instances are commonly from the R series (where R stands for RAM), but also include X1, High Memory, and Z1 instances.

Storage Optimized Instances
Storage optimized instances are ideal when accessing large data sets on local storage frequently. Use cases include:

High frequency online transaction processing (OLTP) systems
Relational and NoSQL databases
Cache for in-memory databases, such as Redis
Data warehousing applications
Distributed file systems
These instances typically start with the prefixes I, D, or H1.

Comparing EC2 Instance Types
To illustrate differences, consider the following examples:

t2.micro has 1 vCPU and 1 gigabyte of memory.
r5.16xlarge has 16 vCPUs and 512 gigabytes of memory, emphasizing memory capacity.
c5d.4xlarge has 16 vCPUs and 32 gigabytes of memory, emphasizing CPU power.
These instances also differ in network performance and EBS bandwidth.

For a comprehensive comparison of all instances, the website ec2instances.info is highly recommended. It provides detailed specifications and cost information for all AWS EC2 instances.

Conclusion
This lecture provided a high-level overview of EC2 instance types, their naming conventions, and typical use cases. For detailed and updated information, always refer to the official AWS website or trusted resources like ec2instances.info.

Key Takeaways
EC2 instance types are categorized by optimization: general purpose, compute optimized, memory optimized, and storage optimized.
AWS uses a naming convention for instances: instance class (e.g., M), generation number (e.g., 5), and size (e.g., 2xlarge).
General purpose instances balance compute, memory, and networking, suitable for diverse workloads like web servers.
Compute optimized instances (C series) are ideal for CPU-intensive tasks such as batch processing and machine learning.
Memory optimized instances (R series) excel at workloads requiring large in-memory data processing.
Storage optimized instances (I, D, H1 series) are designed for high-frequency data access on local storage.
The website ec2instances.info is a useful resource to compare EC2 instance specifications and costs.