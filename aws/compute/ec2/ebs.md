What’s an EBS Volume?

• An EBS (Elastic Block Store) Volume is a network drive you can attach
to your instances while they run
• It allows your instances to persist data, even after their termination
• They can only be mounted to one instance at a time (at the CCP
level)
• They are bound to a specific availability zone
• Analogy: Think of them as a “network USB stick”

EBS Volume
• It’s a network drive (i.e. not a physical drive)
• It uses the network to communicate the instance, which means there might be a bit of
latency
• It can be detached from an EC2 instance and attached to another one quickly
• It’s locked to an Availability Zone (AZ)
• An EBS Volume in us-east-1a cannot be attached to us-east-1b
• To move a volume across, you first need to snapshot it
• Have a provisioned capacity (size in GBs, and IOPS)
• You get billed for all the provisioned capacity
• You can increase the capacity of the drive over time

---

EBS Overview
Welcome to this section where we will explore the different storage options for EC2 instances. The most important among these are EBS volumes.

What is an EBS Volume?
EBS volume stands for Elastic Block Store. It is a network drive that you can attach to your instances while they run. In fact, we have been using them without even realizing it. These EBS volumes allow us to persist data even after the instance is terminated. This means we can recreate an instance and mount the same EBS volume from before, retrieving our data. This feature is very helpful.

At the Certified Cloud Practitioner level, EBS volumes can only be mounted to one instance at a time. When you create an EBS volume, it is bound to a specific availability zone. For example, you cannot have an EBS volume created in us-east-1a attached to an instance in us-east-1b. We will illustrate this with a diagram shortly.

You can think of EBS volumes as network USB sticks. It is like a USB stick that you can take from one computer and attach to another, but instead of physically plugging it in, it is attached through the network.

EBS volumes are network drives, not physical drives. Communication between the instance and the EBS volume occurs over the network. Because of this, there may be some latency when accessing data from the volume.

Since EBS volumes are network drives, they can be detached from one EC2 instance and attached to another very quickly. This makes them extremely useful for failover scenarios.

As mentioned, EBS volumes are locked to a specific availability zone. For example, if an EBS volume is created in us-east-1a, it cannot be attached to an instance in us-east-1b. However, if you create a snapshot of the volume, you can move it across different availability zones.

EBS volumes are block storage volumes, so you must provision capacity in advance. This means specifying how many gigabytes you want and the IOPS (input/output operations per second) to define the performance of your volume. You will be billed based on the provisioned capacity, and you can increase the capacity over time to improve performance or size.

EBS Volume Diagram
Consider the availability zone us-east-1a. You can have one EC2 instance with one EBS volume attached. If you create another EC2 instance, the EBS volume cannot be attached to both instances simultaneously at the Certified Cloud Practitioner level. Therefore, the second instance needs its own EBS volume. However, it is possible to attach multiple EBS volumes to a single instance, similar to having multiple network USB sticks connected to one machine.

EBS volumes are linked to an availability zone. If you want EBS volumes in other availability zones, you must create them separately in those zones. Just like EC2 instances, EBS volumes are bound to an availability zone.

It is also possible to create EBS volumes and leave them unattached. These volumes do not need to be attached to an EC2 instance immediately and can be attached on demand, which adds to their flexibility and power.

Delete on Termination Attribute
When creating EBS volumes through EC2 instances, there is an attribute called "delete on termination." This attribute controls the behavior of the EBS volume when the EC2 instance is terminated. By default, the root EBS volume has this attribute enabled, meaning it is deleted alongside the instance termination. Other attached EBS volumes have this attribute disabled by default, so they are not deleted when the instance is terminated. You can control this setting in the console by enabling or disabling "delete on termination."

A practical use case for this attribute is if you want to preserve the root volume when an instance is terminated to save some data. In that case, you can disable "delete on termination" for the root volume, and your data will be preserved. This scenario could appear in the exam.

This concludes our overview of EBS volumes. Thank you for your attention, and I will see you in the next lecture.

Key Takeaways
EBS volumes are network-attached storage devices that persist data beyond the lifecycle of EC2 instances.
Each EBS volume is bound to a specific availability zone and can only be attached to one instance at a time.
EBS volumes must be provisioned with capacity and IOPS in advance, and their performance can be adjusted over time.
The "delete on termination" attribute controls whether EBS volumes are deleted when the associated EC2 instance is terminated, with root volumes deleted by default.