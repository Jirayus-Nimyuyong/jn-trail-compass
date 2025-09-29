EBS Snapshots
• Make a backup (snapshot) of your EBS volume at a point in time
• Not necessary to detach volume to do snapshot, but recommended
• Can copy snapshots across AZ or Region
---
EBS Snapshots Features

EBS Snapshot Archive
• Move a Snapshot to an ”archive tier” that is
75% cheaper
• Takes within 24 to 72 hours for restoring the
archive

Recycle Bin for EBS Snapshots
• Setup rules to retain deleted snapshots so you
can recover them after an accidental deletion
• Specify retention (from 1 day to 1 year)

Fast Snapshot Restore (FSR)
• Force full initialization of snapshot to have no
latency on the first use ($$$)

---
EBS Snapshots
Introduction to EBS Snapshots
An EBS Snapshot is a backup at any point in time of your EBS volume. It is not necessary to detach your EBS volume from your EC2 instance to create a snapshot, although detaching is recommended.

Snapshot Copying Across Availability Zones and Regions
You can copy EBS Snapshots across different Availability Zones or even across different Regions. For example, consider an EC2 instance with an EBS volume in US-EAST-1A and another EC2 instance in US-EAST-1B. You can take a snapshot of the EBS volume in US-EAST-1A and restore it in US-EAST-1B. This is how you transfer an EBS volume from one Availability Zone to another.

Key Features of EBS Snapshots
EBS Snapshot Archive
This feature allows you to move snapshots to an "archive tier" that is up to 75% cheaper. However, restoring a snapshot from the archive tier takes between 24 to 72 hours, so it is not immediate.

Recycle Bin for EBS Snapshots
If you delete your EBS Snapshots, instead of being permanently deleted, they are moved to a Recycle Bin. This allows you to recover snapshots from accidental deletion. The retention period for the Recycle Bin can be set anywhere between one day and one year.

Fast Snapshot Restore
This feature forces a full initialization of your snapshot to eliminate latency on the first use. It is particularly helpful if your snapshot is very large and you need to initialize an EBS volume or launch an instance from it very quickly. However, this feature is costly, so use it with caution.

Conclusion
This concludes the lecture on EBS Snapshots. Thank you for your attention, and I look forward to seeing you in the next lecture.

Key Takeaways
EBS Snapshots are backups of EBS volumes at any point in time and do not require detaching the volume from the EC2 instance.
Snapshots can be copied across different Availability Zones and Regions, enabling volume restoration elsewhere.
The EBS Snapshot Archive tier offers up to 75% cost savings but requires 24 to 72 hours for restoration.
The Recycle Bin feature allows recovery of accidentally deleted snapshots with retention from one day to one year.
Fast Snapshot Restore initializes snapshots fully to eliminate first-use latency but incurs significant costs.