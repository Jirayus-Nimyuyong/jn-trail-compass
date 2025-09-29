EBS Multi-Attach – io1/io2 family

• Attach the same EBS volume to multiple EC2
instances in the same AZ
• Each instance has full read & write permissions
to the high-performance volume
• Use case:
• Achieve higher application availability in clustered
Linux applications (ex: Teradata)
• Applications must manage concurrent write
operations
• Up to 16 EC2 Instances at a time
• Must use a file system that’s cluster-aware (not
XFS, EXT4, etc…)

---
EBS Multi-Attach
Introduction to EBS Multi-Attach Feature
The Multi-Attach feature of EBS volumes enables attaching the same volume to multiple EC2 instances within the same availability zone.

As the name indicates, the Multi-Attach feature allows you to attach the same EBS volume to multiple EC2 instances in the same availability zone.

Supported Volume Types
This capability is available exclusively for the io1 and io2 families of EBS volumes. For example, if you have multiple EC2 instances and an io2 volume with Multi-Attach enabled, this volume can be attached to multiple EC2 instances simultaneously.

Each instance attached to the volume has full read and write permissions to this high-performance volume. This means all instances can read and write concurrently.

Use Cases
The primary use case for Multi-Attach is to achieve higher application availability, such as in clustered Linux applications like Teradata. It is also useful when your application must manage concurrent write operations.

Availability Zone Limitation
Multi-Attach is restricted to a specified availability zone. It does not allow attaching an EBS volume from one availability zone to another.

Instance Attachment Limit
Up to 16 EC2 instances can attach to the same volume simultaneously. This is an important detail to remember, especially for exam purposes.

File System Requirement
To use Multi-Attach effectively, you must use a cluster-aware file system. This differs from common file systems like XFS or EXT4.

This concludes the lecture on the Multi-Attach feature of EBS volumes.

Key Takeaways
The Multi-Attach feature allows the same EBS volume to be attached to multiple EC2 instances within the same availability zone.
This feature is available only for the io1 and io2 families of EBS volumes.
Up to 16 EC2 instances can simultaneously attach to the same volume.
A cluster-aware file system is required to use Multi-Attach effectively.