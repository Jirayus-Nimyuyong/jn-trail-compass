CloudHSM

• KMS => AWS manages the software for encryption
• CloudHSM => AWS provisions encryption hardware
• Dedicated Hardware (HSM = Hardware Security Module)
• You manage your own encryption keys entirely (not AWS)
• HSM device is tamper resistant, FIPS 140-2 Level 3 compliance
• Supports both symmetric and asymmetric encryption (SSL/TLS keys)
• No free tier available
• Must use the CloudHSM Client Software
• Redshift supports CloudHSM for database encryption and key management
• Good option to use with SSE-C encryption

---

CloudHSM Diagram

IAM permissions:
• CRUD an HSM Cluster

CloudHSM Software:
• Manage the Keys
• Manage the Users

---

CloudHSM – High Availability

• CloudHSM clusters are spread across Multi AZ (HA)
• Great for availability and durability

---

CloudHSM – Integration with AWS Services

• Through integration with
AWS KMS
• Configure KMS Custom
Key Store with
CloudHSM
• Example: EBS, S3, RDS …

---

CloudHSM vs. KMS

---

CloudHSM Overview
Introduction to CloudHSM
We have previously seen KMS for encryption. Now, let's look at CloudHSM. With KMS, AWS manages the software for encryption and controls the encryption keys. However, with CloudHSM, AWS provisions dedicated encryption hardware known as an HSM device, which stands for Hardware Security Module. This means that we manage our own encryption keys entirely, not AWS. Therefore, we have full control over the encryption keys.

The HSM device is set up within the AWS cloud but is tamper-resistant with FIPS 140-2 Level 3 compliance. This compliance means that if anyone tries to manually access your HSM device, they will be stopped and blocked. The CloudHSM device supports both symmetric and asymmetric encryption keys. For example, you can have SSL and TLS keys on top of it.

There is no free tier for CloudHSM. To use the CloudHSM device, you need to use client software, which is quite complicated and beyond the scope of this lecture. There is an integration between Redshift and CloudHSM if you want to leverage CloudHSM for your database encryption and key management.

CloudHSM is an excellent candidate if you want to implement SSE-C type encryption on top of S3, for example, because you manage your own encryption keys and store them in CloudHSM. With CloudHSM, AWS manages your hardware, whereas you manage the service yourself. The CloudHSM client is required to establish a connection to the CloudHSM service, after which you manage the keys overall.

IAM permissions are used to create, read, update, and delete an HSM cluster at a high level. However, you use your CloudHSM software to manage the keys, users, and their permissions to access the keys. This differs from KMS, where everything is managed using IAM.

CloudHSM clusters can have high availability and are spread across multiple Availability Zones (AZs). This means you can have two AZs, where one is replicated from another, and your HSM client can connect to either. This high availability is important to understand.

Integration of CloudHSM with AWS Services
How do we transparently leverage CloudHSM within AWS services encryption? There is an integration between CloudHSM and KMS. In KMS, we define a KMS custom key store that uses CloudHSM. This allows CloudHSM encryption for EBS, S3, RDS, and other services.

The process involves creating a CloudHSM cluster and defining a KMS custom key store connected to that cluster. For example, if we create an RDS database instance with an encrypted EBS volume using KMS encryption, internally, this KMS encryption leverages encryption keys within your CloudHSM cluster.

The benefits of this approach are twofold: first, you are using your CloudHSM cluster; second, any API calls made through KMS that reach your CloudHSM cluster are logged in CloudTrail.

Comparison Between CloudHSM and KMS
When comparing CloudHSM and KMS, KMS tends to be multi-tenant, whereas CloudHSM is single-tenant. Both have the same standards. KMS master keys come in three types: AWS owned, AWS managed, and customer managed CMK. CloudHSM only supports customer-managed CMK because AWS cannot access your HSM device.

In terms of key types, both support symmetric, asymmetric, and digital signing keys. CloudHSM also supports hashing. Regarding key accessibility, KMS is accessible in multiple regions, while CloudHSM is deployed in a VPC but can be shared across VPCs using VPC sharing, making it accessible across multiple regions if desired.

For cryptographic acceleration, KMS does not provide any, but CloudHSM offers SSL and TLS acceleration that can be used at the load balancer level. It also supports Oracle and TDE acceleration for databases, which is Oracle-based.

Access and authentication differ as well: KMS uses IAM, whereas CloudHSM has its own security mechanism to manage users, their permissions, and keys. For high availability, KMS is a managed service and always available, while CloudHSM has multiple HSM devices across different availability zones.

Other capabilities include CloudTrail and CloudWatch support for KMS, whereas CloudHSM supports MFS. Finally, KMS is part of the AWS free tier, but CloudHSM is not.

This concludes the overview of CloudHSM. I hope you found it informative, and I will see you in the next lecture.

Key Takeaways
CloudHSM provides dedicated hardware security modules for encryption key management, offering full control to the user.
CloudHSM devices are tamper-resistant and comply with FIPS 140-2 Level 3 standards.
Integration between CloudHSM and KMS allows leveraging CloudHSM encryption within AWS services like EBS, S3, and RDS.
CloudHSM supports high availability across multiple availability zones and uses its own security mechanisms distinct from IAM.