S3 Storage Classes

• Amazon S3 Standard - General Purpose
• Amazon S3 Standard-Infrequent Access (IA)
• Amazon S3 One Zone-Infrequent Access
• Amazon S3 Glacier Instant Retrieval
• Amazon S3 Glacier Flexible Retrieval
• Amazon S3 Glacier Deep Archive
• Amazon S3 Intelligent Tiering
• Can move between classes manually or using S3 Lifecycle configurations

S3 Durability and Availability

• Durability:
• High durability (99.999999999%, 11 9’s) of objects across multiple AZ
• If you store 10,000,000 objects with Amazon S3, you can on average expect to
incur a loss of a single object once every 10,000 years
• Same for all storage classes

• Availability:
• Measures how readily available a service is
• Varies depending on storage class
• Example: S3 standard has 99.99% availability = not available 53 minutes a year

S3 Standard – General Purpose

• 99.99% Availability
• Used for frequently accessed data
• Low latency and high throughput
• Sustain 2 concurrent facility failures
• Use Cases: Big Data analytics, mobile & gaming applications, content
distribution…

S3 Storage Classes – Infrequent Access

• For data that is less frequently accessed, but requires rapid access when needed
• Lower cost than S3 Standard
• Amazon S3 Standard-Infrequent Access (S3 Standard-IA)
• 99.9% Availability
• Use cases: Disaster Recovery, backups
• Amazon S3 One Zone-Infrequent Access (S3 One Zone-IA)
• High durability (99.999999999%) in a single AZ; data lost when AZ is destroyed
• 99.5% Availability
• Use Cases: Storing secondary backup copies of on-premises data, or data you can recreate

Amazon S3 Glacier Storage Classes
• Low-cost object storage meant for archiving / backup
• Pricing: price for storage + object retrieval cost
• Amazon S3 Glacier Instant Retrieval
• Millisecond retrieval, great for data accessed once a quarter
• Minimum storage duration of 90 days
• Amazon S3 Glacier Flexible Retrieval (formerly Amazon S3 Glacier):
• Expedited (1 to 5 minutes), Standard (3 to 5 hours), Bulk (5 to 12 hours) – free
• Minimum storage duration of 90 days
• Amazon S3 Glacier Deep Archive – for long term storage:
• Standard (12 hours), Bulk (48 hours)
• Minimum storage duration of 180 days

S3 Intelligent-Tiering
• Small monthly monitoring and auto-tiering fee
• Moves objects automatically between Access Tiers based on usage
• There are no retrieval charges in S3 Intelligent-Tiering
• Frequent Access tier (automatic): default tier
• Infrequent Access tier (automatic): objects not accessed for 30 days
• Archive Instant Access tier (automatic): objects not accessed for 90 days
• Archive Access tier (optional): configurable from 90 days to 700+ days
• Deep Archive Access tier (optional): config. from 180 days to 700+ days

---
S3 Storage Classes Overview
Overview of Amazon S3 Storage Classes
In this lecture, we will discuss the different storage classes available in Amazon S3. These include:

Amazon S3 Standard - General Purpose
Amazon S3 Infrequent Access (Standard-IA)
Amazon S3 One Zone-Infrequent Access (One Zone-IA)
Glacier Instant Retrieval
Glacier Flexible Retrieval
Glacier Deep Archive
Amazon S3 Intelligent-Tiering
We will explore each of these classes in depth. It is important to know these for the exam.

When you create an object in Amazon S3, you can choose its storage class. You can also modify the storage class manually later. Additionally, Amazon S3 Lifecycle configurations allow you to automatically move objects between storage classes based on policies.

Durability and Availability
Before diving into the storage classes, let's define two important concepts:

Durability: This represents the likelihood of losing an object stored in Amazon S3.
Availability: This indicates how readily accessible the service is.
Amazon S3 provides very high durability, often referred to as "11 nines". This means 99.999999999% durability. To put it in perspective, if you store 10 million objects, you can expect to lose a single object once every 10,000 years on average. This durability is consistent across all storage classes.

Availability varies depending on the storage class. For example, S3 Standard offers 99.99% availability. This translates to approximately 53 minutes of downtime per year, during which you might encounter errors when accessing the service. It is important to consider availability when designing your applications.

Amazon S3 Standard
S3 Standard is designed for frequently accessed data. It is the default storage class and provides low latency and high throughput. It can sustain two concurrent facility failures on the AWS side.

Use cases include:

Big data analytics
Mobile and gaming applications
Content distribution
Amazon S3 Infrequent Access (Standard-IA)
This class is intended for data that is accessed less frequently but requires rapid access when needed. It offers lower storage costs than S3 Standard but charges for retrievals.

Key features:

99.9% availability
Suitable for disaster recovery and backups
Amazon S3 One Zone-Infrequent Access (One Zone-IA)
This storage class stores data in a single Availability Zone (AZ) and offers high durability within that zone. However, data can be lost if the AZ is destroyed.

Key features:

99.5% availability
Lower cost than Standard-IA
Suitable for secondary backup copies or data that can be recreated
Glacier Storage Classes
Glacier is low-cost object storage designed for archiving and backup. Pricing includes storage and retrieval costs. There are three Glacier storage classes:

Glacier Instant Retrieval
Milliseconds retrieval time
Ideal for data accessed once a quarter
Minimum storage duration: 90 days
Glacier Flexible Retrieval
Formerly called Amazon S3 Glacier
Offers three retrieval options:
Expedited: 1 to 5 minutes
Standard: 3 to 5 hours
Bulk: 5 to 12 hours (free)
Minimum storage duration: 90 days
Glacier Deep Archive
Designed for long-term storage
Retrieval options:
Standard: 12 hours
Bulk: 48 hours
Minimum storage duration: 180 days
Lowest cost option
Amazon S3 Intelligent-Tiering
This storage class automatically moves objects between access tiers based on usage patterns. It incurs a small monthly monitoring and auto-tiering fee but has no retrieval charges.

Tiers include:

Frequent Access (default)
Infrequent Access (for objects not accessed for 30 days)
Archive Instant Access (for objects not accessed over 90 days)
Archive Access (optional, configurable from 90 to 700+ days)
Deep Archive Access (optional, configurable from 180 to 700+ days)
This class allows you to "set and forget" your storage management as S3 handles tiering automatically.

Summary and Comparison
All Amazon S3 storage classes provide 11 nines durability. Availability decreases as the number of Availability Zones storing the data decreases. Minimum storage durations and retrieval times vary across classes.

It is not necessary to memorize all details but understanding the characteristics and use cases of each class will help you make informed decisions.

Pricing Overview
Pricing varies by storage class and region. For example, in the us-east-1 region, storage costs and retrieval fees differ across classes. While you are not expected to memorize prices, understanding the cost implications of each class is important for optimizing your storage strategy.

This concludes the lecture on Amazon S3 storage classes. Understanding these classes will help you choose the right storage option for your data needs and optimize costs effectively.

Key Takeaways
Amazon S3 offers multiple storage classes tailored for different access patterns and cost requirements.
All S3 storage classes provide 11 nines (99.999999999%) durability.
Availability varies by storage class, with S3 Standard offering 99.99% availability and others lower depending on redundancy.
Lifecycle configurations can automate moving objects between storage classes based on usage.
Glacier classes provide cost-effective archival storage with varying retrieval times and minimum storage durations.
S3 Intelligent-Tiering automatically moves objects between tiers based on access patterns, incurring monitoring fees but no retrieval charges.