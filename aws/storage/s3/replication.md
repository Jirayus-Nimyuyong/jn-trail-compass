Amazon S3 – Replication (CRR & SRR)

• Must enable Versioning in source and destination buckets
• Cross-Region Replication (CRR)
• Same-Region Replication (SRR)
• Buckets can be in different AWS accounts
• Copying is asynchronous
• Must give proper IAM permissions to S3

• Use cases:
• CRR – compliance, lower latency access, replication across
accounts
• SRR – log aggregation, live replication between production and test
accounts

Amazon S3 – Replication (Notes)

• After you enable Replication, only new objects are replicated
• Optionally, you can replicate existing objects using S3 Batch Replication
• Replicates existing objects and objects that failed replication
• For DELETE operations
• Can replicate delete markers from source to target (optional setting)
• Deletions with a version ID are not replicated (to avoid malicious deletes)
• There is no “chaining” of replication
• If bucket 1 has replication into bucket 2, which has replication into bucket 3
• Then objects created in bucket 1 are not replicated to bucket 3

---
S3 Replication
Introduction to Amazon S3 Replication
Now, let us talk about Amazon S3 Replication, which comes in two flavors.

CRR stands for Cross-Region Replication.
SRR stands for Same-Region Replication.
The idea is that we have an S3 Bucket in one region and a target S3 Bucket in another region, and we want to set up asynchronous replication between these two buckets.

To enable replication, we first must enable Versioning in both the source and the destination buckets.

If we do Cross-Region Replication (CRR), the two regions must be different. If we do Same-Region Replication (SRR), the two regions are the same.

It is possible for these buckets to be in different AWS accounts, and the copying happens asynchronously. The replication mechanism operates behind the scenes, in the background.

To make replication work, you must give proper IAM permissions to the S3 service so that it has permission to read from and write to the specified buckets.

Use Cases for S3 Replication
The use cases for replication are manyfold:

For Cross-Region Replication (CRR):

Helpful for compliance requirements.
Provides lower latency access to your data because it is in another region.
Enables replication of data across AWS accounts.
For Same-Region Replication (SRR):

Useful to aggregate logs across multiple S3 Buckets.
Enables live replication between production and test accounts, allowing you to maintain your own test environment.
That concludes the discussion about replication. I will see you in the next lecture for some practice.

Key Takeaways
Amazon S3 Replication has two types: Cross-Region Replication (CRR) and Same-Region Replication (SRR).
Versioning must be enabled on both source and destination buckets to enable replication.
Proper IAM permissions are required for S3 to read and write between buckets.
CRR is useful for compliance, lower latency, and cross-account replication; SRR is helpful for log aggregation and live replication between production and test environments.


S3 Replication Notes
Amazon S3 Replication Overview
After enabling replication, only new objects will be replicated automatically.

Replicating Existing Objects
To replicate existing objects, you need to use the S3 Batch Replication feature. This feature replicates existing objects as well as objects that have failed replication.

Replicating Delete Markers
You can replicate delete markers from the source bucket to the target bucket. This is an optional setting. However, if deletions include version IDs, they are not replicated. This prevents permanent deletions from propagating, which helps avoid malicious deletes happening from one bucket to another.

Replication Limitations
There is no chaining of replications. For example, if bucket one replicates to bucket two, and bucket two replicates to bucket three, the objects from bucket one are not replicated into bucket three.

This concludes the notes on Amazon S3 Replication.

Key Takeaways
After enabling replication, only new objects are replicated automatically.
To replicate existing objects, use the S3 Batch Replication feature.
Delete markers can be optionally replicated from the source to the target bucket.
Objects deleted with version IDs are not replicated to prevent malicious deletions.
Replication does not chain across multiple buckets; replication occurs only between directly linked buckets.