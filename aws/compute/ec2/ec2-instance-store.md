EC2 Instance Store
• EBS volumes are network drives with good but “limited” performance
• If you need a high-performance hardware disk, use EC2 Instance
Store
• Better I/O performance
• EC2 Instance Store lose their storage if they’re stopped (ephemeral)
• Good for buffer / cache / scratch data / temporary content
• Risk of data loss if hardware fails
• Backups and Replication are your responsibility

---
Local EC2 Instance Store

---

EC2 Instance Store
Introduction to EC2 Instance Store
We have previously seen how to attach a network drive to our EC2 instances. While these drives offer good performance, sometimes even higher performance is required. This higher performance can be achieved by using a hardware disk attached directly to your EC2 instance.

An EC2 instance is a virtual machine, but it is attached to a physical hardware server. Some of these servers have disk space physically connected to the server. A special type of EC2 instance can leverage what is called an EC2 Instance Store, which refers to the hard drive attached to the physical server.

Benefits and Characteristics of EC2 Instance Store
EC2 Instance Store is used for better input/output (I/O) performance and ensures good throughput. It is a great choice when extremely high disk performance is required. However, there is a caveat: if you stop or terminate your EC2 instance that has an Instance Store, the storage will be lost.

Because of this, the EC2 Instance Store is called ephemeral storage. This means it cannot be used as a durable, long-term place to store your data.

Appropriate Use Cases for EC2 Instance Store
So, what is a good use case for EC2 Instance Store? If you have a buffer, a cache, or you want to store scratch data or temporary content, this would be a great place to do so. However, it is not suitable for long-term storage. For long-term storage, Elastic Block Store (EBS) is a great option.

In case the underlying physical server of the EC2 instance fails, you risk data loss because the hardware attached to the EC2 instance will fail as well. Therefore, if you decide to use an EC2 Instance Store, it is your responsibility to back up and replicate the data correctly based on your needs.

Performance Illustration
To illustrate the performance, consider the instance size of I3 instances. These instances have an Instance Store attached. The read and write IOPS (input/output operations per second) can reach up to 3.3 million and 1.4 million respectively for the most performant ones.

In comparison, an EBS volume of type GP2 can reach about 32,000 IOPS. This demonstrates that Instance Store offers significantly higher performance.

From an exam perspective, whenever you see a very high-performance hardware-attached volume for your EC2 instances, think of local EC2 Instance Store.

That concludes this lecture on EC2 Instance Store.

Key Takeaways
EC2 Instance Store provides hardware-attached disk storage for EC2 instances, offering very high I/O performance.
Instance Store storage is ephemeral and data is lost if the instance is stopped or terminated.
Ideal use cases for Instance Store include buffers, caches, scratch data, or temporary content, but not long-term storage.
Users are responsible for backing up and replicating data stored on Instance Store to prevent data loss.
