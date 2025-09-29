DynamoDB – Read/Write Capacity Modes

• Control how you manage your table’s capacity (read/write throughput)
• Provisioned Mode
• You specify the number of reads/writes per second
• You need to plan capacity beforehand
• Pay for provisioned read & write capacity units
• On-Demand Mode (default)
• Read/writes automatically scale up/down with your workloads
• No capacity planning needed
• Pay for what you use, more expensive ($$$)
• You can switch between different modes once every 24 hours

---

R/W Capacity Modes – Provisioned

• Table must have provisioned read and write capacity units
• Read Capacity Units (RCU) – throughput for reads
• Write Capacity Units (WCU) – throughput for writes
• Option to setup auto-scaling of throughput to meet demand
• Throughput can be exceeded temporarily using “Burst Capacity”
• If Burst Capacity has been consumed, you’ll get a
“ProvisionedThroughputExceededException”
• It’s then advised to do an exponential backoff retry

---

DynamoDB – Write Capacity Units (WCU)

• One Write Capacity Unit (WCU) represents one write per second for an
item up to 1 KB in size
• If the items are larger than 1 KB, more WCUs are consumed
• Example 1: we write 10 items per second, with item size 2 KB
! #$
• We need 10 ∗ (% #$) = 20 𝑊𝐶𝑈𝑠
• Example 2: we write 6 items per second, with item size 4.5 KB
& #$
• We need 6 ∗ (% #$) = 30 𝑊𝐶𝑈𝑠 (4.5 gets rounded to the upper KB)
• Example 3: we write 120 items per minute, with item size 2 KB
• We need
%!'
('
! #$
∗ (% #$) = 4 𝑊𝐶𝑈𝑠

---

Strongly Consistent Read
vs. Eventually Consistent Read

• Eventually Consistent Read (default)
• If we read just after a write, it’s possible we’ll
get some stale data because of replication

• Strongly Consistent Read
• If we read just after a write, we will get the
correct data
• Set “ConsistentRead” parameter to True in
API calls (GetItem, BatchGetItem, Query, Scan)
• Consumes twice the RCU

---

DynamoDB – Read Capacity Units (RCU)

• One Read Capacity Unit (RCU) represents one Strongly Consistent Read per
second, or two Eventually Consistent Reads per second, for an item up to 4
KB in size
• If the items are larger than 4 KB, more RCUs are consumed
• Example 1: 10 Strongly Consistent Reads per second, with item size 4 KB
! #$
• We need 10 ∗
! #$
= 10 𝑅𝐶𝑈𝑠
• Example 2: 16 Eventually Consistent Reads per second, with item size 12 KB
• We need
%&
'
∗
%' #$
! #$
= 24 𝑅𝐶𝑈𝑠
• Example 3: 10 Strongly Consistent Reads per second, with item size 6 KB
• We need 10 ∗
( #$
! #$
= 20 𝑅𝐶𝑈𝑠 (we must round up 6 KB to 8 KB)

---

DynamoDB – Partitions Internal

• Data is stored in partitions
• Partition Keys go through a hashing algorithm to know to
which partition they go to

• WCUs and RCUs are spread evenly across partitions

---

DynamoDB – Throttling

• If we exceed provisioned RCUs or WCUs, we get
“ProvisionedThroughputExceededException”
• Reasons:
• Hot Keys – one partition key is being read too many times (e.g., popular item)
• Hot Partitions
• Very large items, remember RCU and WCU depends on size of items
• Solutions:
• Exponential backoff when exception is encountered (already in SDK)
• Distribute partition keys as much as possible
• If RCU issue, we can use DynamoDB Accelerator (DAX)

---

R/W Capacity Modes – On-Demand

• Read/writes automatically scale up/down with your workloads
• No capacity planning needed (WCU / RCU)
• Unlimited WCU & RCU, no throttle, more expensive
• You’re charged for reads/writes that you use in terms of RRU and
WRU
• Read Request Units (RRU) – throughput for reads (same as RCU)
• Write Request Units (WRU) – throughput for writes (same as WCU)
• 2.5x more expensive than provisioned capacity (use with care)
• Use cases: unknown workloads, unpredictable application traffic, …

---

DynamoDB WCU & RCU - Throughput
Introduction to DynamoDB Read and Write Capacity Modes
In this lecture, we discuss the read and write capacity modes for DynamoDB, which control your table's throughput. You must specify the read and write throughput in advance. There are two modes:

Provisioned mode: You specify the number of reads and writes per second, known as Read Capacity Units (RCU) and Write Capacity Units (WCU). You pay for the provisioned capacity regardless of usage.
On-demand mode: Reads and writes automatically scale up and down based on workload. No capacity planning is needed, and you pay only for what you use, though it is more expensive than provisioned mode.
You can switch between these two modes once every 24 hours.

Provisioned Read and Write Capacity Units
In provisioned mode, you must provision read and write capacity units (RCU and WCU) to specify throughput. Auto-scaling can be configured to adjust throughput to meet demand, so you do not need to worry excessively about exact RCU and WCU values.

If you exceed your provisioned RCU or WCU, you can temporarily use burst capacity. However, if burst capacity is exhausted, you will receive a ProvisionedThroughputExceededException. In such cases, you should retry using an exponential backoff retry strategy.

Write Capacity Unit (WCU) Details
One WCU represents one write per second for an item up to 1 kilobyte in size. If the item size exceeds 1 kilobyte, more WCUs are consumed, rounded up to the nearest kilobyte.

Examples:

Writing 10 items per second, each 2 KB in size:

WCU
=
10
×
2
1
=
20
WCU=10× 
1
2
​
 =20

Writing 6 items per second, each 4.5 KB in size (rounded up to 5 KB):

WCU
=
6
×
5
1
=
30
WCU=6× 
1
5
​
 =30

Writing 120 items per minute, each 2 KB in size:

Convert items per minute to per second: 
120
/
60
=
2
120/60=2 items per second

WCU
=
2
×
2
1
=
4
WCU=2× 
1
2
​
 =4

Read Capacity Units (RCU) and Consistency Models
DynamoDB supports two read consistency models:

Eventually consistent reads (default): Reads may return stale data immediately after a write due to replication delay, but data becomes consistent after about 100 milliseconds.
Strongly consistent reads: Reads always return the latest data immediately after a write by setting the ConsistentRead parameter to True in API calls such as GetItem, BatchGetItem, Query, and Scan.
Strongly consistent reads consume twice the RCU compared to eventually consistent reads and may have slightly higher latency.

Read Capacity Unit (RCU) Details
One RCU represents:

One strongly consistent read per second for an item up to 4 kilobytes in size.
Two eventually consistent reads per second for an item up to 4 kilobytes in size.
If the item size exceeds 4 kilobytes, RCUs consumed increase, rounded up to the nearest 4 KB.

Examples:

10 strongly consistent reads per second, item size 4 KB:

RCU
=
10
×
4
4
=
10
RCU=10× 
4
4
​
 =10

16 eventually consistent reads per second, item size 12 KB:

RCU
=
16
2
×
12
4
=
8
×
3
=
24
RCU= 
2
16
​
 × 
4
12
​
 =8×3=24

10 strongly consistent reads per second, item size 6 KB (rounded up to 8 KB):

RCU
=
10
×
8
4
=
20
RCU=10× 
4
8
​
 =20

DynamoDB Partitions and Throughput Distribution
DynamoDB tables are composed of partitions, which are copies of your data stored on specific servers. When writing data, the partition key is hashed to determine the partition where the data will be stored.

For example:

Partition key ID_13 hashes to Partition 1.
Partition key ID_45 hashes to Partition 2.
Provisioned WCUs and RCUs are evenly distributed across partitions. For instance, if you have 10 partitions and provision 10 WCUs and 10 RCUs, each partition receives 1 WCU and 1 RCU.

Hot partitions occur when a single partition key is accessed disproportionately, leading to throttling and ProvisionedThroughputExceededException errors.

Handling Throttling and Hot Partitions
To mitigate throttling caused by exceeding provisioned throughput at the partition level:

Use exponential backoff retry strategies when encountering ProvisionedThroughputExceededException.
Distribute partition keys evenly to avoid hot partitions.
For heavy read workloads on a single partition key, consider using DynamoDB Accelerator (DAX) to reduce latency and offload reads.
On-Demand Capacity Mode
On-demand mode automatically scales read and write capacity based on workload without requiring capacity planning. There is no throttling, and you pay per request.

Read Request Units (RRUs) and Write Request Units (WRUs) are used instead of RCU and WCU.
On-demand mode is approximately 2.5 times more expensive than provisioned mode.
It is suitable for unpredictable or unknown workloads.
Key Takeaways
DynamoDB offers two capacity modes: provisioned and on-demand, each with distinct cost and scaling characteristics.
Write Capacity Units (WCU) and Read Capacity Units (RCU) are fundamental for provisioning throughput, with specific formulas based on item size and read consistency.
Strongly consistent reads consume twice the RCU compared to eventually consistent reads but guarantee the latest data.
Partitioning affects throughput distribution; hot partitions can cause throttling, mitigated by exponential backoff and good partition key design