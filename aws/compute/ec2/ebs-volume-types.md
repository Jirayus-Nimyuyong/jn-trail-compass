EBS Volume Types
• EBS Volumes come in 6 types
• gp2 / gp3 (SSD): General purpose SSD volume that balances price and performance for
a wide variety of workloads
• io1 / io2 Block Express (SSD): Highest-performance SSD volume for mission-critical
low-latency or high-throughput workloads
• st1 (HDD): Low cost HDD volume designed for frequently accessed, throughput-
intensive workloads
• sc1 (HDD): Lowest cost HDD volume designed for less frequently accessed workloads
• EBS Volumes are characterized in Size | Throughput | IOPS (I/O Ops Per Sec)
• When in doubt always consult the AWS documentation – it’s good!
• Only gp2/gp3 and io1/io2 Block Express can be used as boot volumes

---
EBS Volume Types Use cases

General Purpose SSD
• Cost effective storage, low-latency
• System boot volumes, Virtual desktops, Development and test environments
• 1 GiB - 16 TiB
• gp3:
• Baseline of 3,000 IOPS and throughput of 125 MiB/s
• Can increase IOPS up to 16,000 and throughput up to 1000 MiB/s independently
• gp2:
• Small gp2 volumes can burst IOPS to 3,000
• Size of the volume and IOPS are linked, max IOPS is 16,000
• 3 IOPS per GB, means at 5,334 GB we are at the max IOPS

---
Provisioned IOPS (PIOPS) SSD
• Critical business applications with sustained IOPS performance
• Or applications that need more than 16,000 IOPS
• Great for databases workloads (sensitive to storage perf and consistency)
• io1 (4 GiB - 16 TiB):
• Max PIOPS: 64,000 for Nitro EC2 instances & 32,000 for other
• Can increase PIOPS independently from storage size
• io2 Block Express (4 GiB – 64 TiB):
• Sub-millisecond latency
• Max PIOPS: 256,000 with an IOPS:GiB ratio of 1,000:1
• Supports EBS Multi-attach
---
Hard Disk Drives (HDD)
• Cannot be a boot volume
• 125 GiB to 16 TiB
• Throughput Optimized HDD (st1)
• Big Data, Data Warehouses, Log Processing
• Max throughput 500 MiB/s – max IOPS 500
• Cold HDD (sc1):
• For data that is infrequently accessed
• Scenarios where lowest cost is important
• Max throughput 250 MiB/s – max IOPS 250
---

EBS Volume Types
Introduction to EBS Volume Types
Let's discuss EBS volumes and their different volume types. Currently, there are six different types, which can be grouped into several categories.

gp2 and gp3: General purpose SSD volumes that balance price and performance for a wide variety of workloads. These have been used throughout this course.
io1 and io2 Block Express: Highest-performance SSD volumes designed for mission-critical, low-latency, and high-throughput workloads.
st1: Low-cost HDD volume designed for frequently accessed, throughput-intensive workloads.
sc1: Lowest-cost HDD volume designed for less frequently accessed workloads.
Defining an EBS Volume
Several factors define an EBS volume, including size, throughput, and IOPS (Input/Output Operations Per Second). When in doubt, always consult the official documentation.

For EC2 instances, only gp2, gp3, io1, and io2 volumes can be used as boot volumes, meaning where the root operating system runs.

General Purpose SSD Volumes: gp2 and gp3
Let's take a deeper dive into gp2, gp3, io1, io2, and the other volume types. gp2 and provisioned IOPS volumes are the most important for your exam.

gp2: Cost-effective storage with low latency. Suitable for system boot volumes, virtual desktops, development, and test environments. Sizes range from 1 gigabyte to 16 terabytes.
gp3: The newer generation of volumes. Provides a baseline of 3,000 IOPS and a throughput of 125 megabytes per second. IOPS can be increased up to 16,000 and throughput up to 1,000 megabytes per second independently, meaning they are not linked.
In contrast, gp2 volumes link size and IOPS. Smaller gp2 volumes can burst up to 3,000 IOPS. Increasing the volume size increases IOPS at a rate of 3 IOPS per gigabyte, up to a maximum of 16,000 IOPS. For example, a 5,334 gigabyte gp2 volume will reach the 16,000 IOPS maximum.

Summary of gp2 and gp3
Both are cost-effective storage options with low latency.
gp3 allows independent scaling of IOPS and throughput.
gp2 links volume size and IOPS together.
Provisioned IOPS Volumes: io1 and io2
Provisioned IOPS volumes are used for critical business applications that require sustained IOPS performance or need a large number of IOPS, for example, more than 16,000.

From an exam perspective, if you encounter a database workload sensitive to storage performance and consistency, provisioned IOPS volumes are ideal.

io1: Supports sizes between 4 and 16 terabytes. Maximum provisioned IOPS is approximately 64,000 for Nitro-based EC2 instances and 32,000 for other instances. Provisioned IOPS can be increased independently from storage size.
io2 Block Express: Supports up to 64 terabytes of data, offers sub-millisecond latency, and provides up to 256,000 maximum IOPS with an IOPS to gigabyte ratio of 1,000:1. This is a very high-performance I/O volume type.
Provisioned IOPS volumes support the EBS multi-attach feature, which will be discussed in upcoming lectures.

Throughput Optimized and Cold HDD Volumes: st1 and sc1
These volumes cannot be used as boot volumes.
Maximum size is up to 16 terabytes.
There are two types:

st1 (Throughput Optimized HDD): Suitable for big data, data warehousing, and log processing. Maximum throughput is 500 megabytes per second and maximum IOPS is 500.
sc1 (Cold HDD): Designed for archive data that is infrequently accessed. This volume type offers the lowest possible cost with maximum throughput of 250 megabytes per second and maximum IOPS of 250.
You do not need to memorize all these details for the exam. Instead, understand the high-level differences:

General purpose SSD (gp2, gp3) for balanced cost and performance.
Provisioned IOPS SSD (io1, io2) for high-performance, mission-critical applications like databases.
st1 and sc1 for high throughput and low cost, respectively.
If you require more than 32,000 IOPS, you need an EC2 Nitro instance with io1 or io2 volumes.

This concludes the lecture on EBS volume types.

Key Takeaways
EBS volumes come in six types: gp2, gp3, io1, io2 Block Express, st1, and sc1.
gp2 and gp3 are general purpose SSDs balancing price and performance; gp3 allows independent scaling of IOPS and throughput.
io1 and io2 are provisioned IOPS SSDs for mission-critical, high-performance workloads with high IOPS capacity.
st1 and sc1 are HDD volumes optimized for throughput and cost, respectively, but cannot be used as boot volumes.