CloudFormation – DeletionPolicy Delete
• DeletionPolicy:
• Control what happens when the
CloudFormation template is
deleted or when a resource is
removed from a CloudFormation
template
• Extra safety measure to preserve
and backup resources
• Default DeletionPolicy=Delete
• ⚠ Delete won’t work on an S3
bucket if the bucket is not empty

---

CloudFormation – DeletionPolicy Retain
• DeletionPolicy=Retain:
• Specify on resources to preserve
in case of CloudFormation
deletes
• Works with any resources

---

CloudFormation – DeletionPolicy Snapshot
• DeletionPolicy=Snapshot
• Create one final snapshot before
deleting the resource
• Examples of supported resources:
• EBS Volume, ElastiCache Cluster,
ElastiCache ReplicationGroup
• RDS DBInstance, RDS DBCluster,
Redshift Cluster, Neptune DBCluster,
DocumentDB DBCluster

---
CloudFormation - Deletion Policy
Introduction to CloudFormation DeletionPolicy
DeletionPolicy is a setting you can apply to resources in your CloudFormation templates. It allows you to control what happens to a resource when it is removed from your CloudFormation templates or when the CloudFormation stack is deleted. This feature enables you to preserve and back up resources.

By default, when you delete a CloudFormation stack, all the resources within it are also deleted. This means the default DeletionPolicy is Delete, so you do not have to specify it explicitly. Sometimes, you may want to specify it explicitly to be clear that resources are being deleted.

For example, if you have an EC2 instance with DeletionPolicy set to Delete, the EC2 instance will be deleted whenever the CloudFormation stack is deleted.

DeletionPolicy with S3 Buckets
Consider an S3 bucket with DeletionPolicy set to Delete. This will work only if the S3 bucket is empty. If the bucket is not empty, the deletion will fail. To fix this, you can either manually delete all objects within the S3 bucket before deleting the stack, or implement a custom resource that deletes all contents automatically before the bucket is deleted.

DeletionPolicy Retain
The Retain DeletionPolicy specifies which resources you want to preserve when deleting your CloudFormation stack. For example, if you have a DynamoDB table, by default it would be deleted when the stack is deleted. However, if you want to keep the data in the table, you specify DeletionPolicy: Retain. This ensures the DynamoDB table remains even after the stack deletion. This policy works with any resource.

DeletionPolicy Snapshot
The Snapshot DeletionPolicy creates a final snapshot before deleting the resource. It is supported by resources such as EBS volumes, ElastiCache clusters and replication groups, RDS DB instances and clusters, Redshift, Neptune, DocumentDB, and possibly more.

By specifying DeletionPolicy: Snapshot, the resource (for example, an RDS database instance) will be deleted, but a final snapshot will be taken before deletion. This is very helpful for backups and safety purposes.

Example: DeletionPolicy in a Template
In the file deletionpolicy.yaml, there is a security group with DeletionPolicy: Retain. This means if the CloudFormation stack is deleted, the security group will remain.

There is also an EBS volume with DeletionPolicy: Snapshot. Upon deleting the stack, the volume will be deleted, but a snapshot will be created first.

Demonstration: Creating and Deleting the Stack
A stack named DeletionPolicyDemo is created using the template file. The stack consists of two resources: an EBS volume and an EC2 security group. Both resources are created successfully.

When deleting the stack, the security group deletion is skipped due to the Retain policy. It remains and must be deleted manually if desired.

The EBS volume is deleted, but a snapshot is created successfully before deletion. The snapshot ID is shown, and the snapshot appears in the snapshots list.

Cleanup Reminder
To fully clean up, you must manually delete the snapshot created from the EBS volume and also manually delete the retained security group if you no longer need it.

This demonstrates the power and flexibility of the DeletionPolicy attribute in CloudFormation templates.

Key Takeaways
The DeletionPolicy attribute in CloudFormation templates controls the fate of resources upon stack deletion.
The default DeletionPolicy is Delete, which removes the resource when the stack is deleted.
The Retain policy preserves the resource even after the stack is deleted, requiring manual deletion if desired.
The Snapshot policy creates a final snapshot of certain resource types before deletion, useful for backups.