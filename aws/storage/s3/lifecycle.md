Amazon S3 – Moving between Storage Classes
• You can transition objects between
storage classes
• For infrequently accessed object,
move them to Standard IA
• For archive objects that you don’t
need fast access to, move them to
Glacier or Glacier Deep Archive
• Moving objects can be automated
using a Lifecycle Rules

Amazon S3 – Lifecycle Rules
• Transition Actions – configure objects to transition to another storage class
• Move objects to Standard IA class 60 days after creation
• Move to Glacier for archiving after 6 months
• Expiration actions – configure objects to expire (delete) after some time
• Access log files can be set to delete after a 365 days
• Can be used to delete old versions of files (if versioning is enabled)
• Can be used to delete incomplete Multi-Part uploads
• Rules can be created for a certain prefix (example: s3://mybucket/mp3/*)
• Rules can be created for certain objects Tags (example: Department: Finance)

Amazon S3 – Lifecycle Rules (Scenario 1)
• Your application on EC2 creates images thumbnails after profile
photos are uploaded to Amazon S3. These thumbnails can be easily
recreated, and only need to be kept for 60 days. The source images
should be able to be immediately retrieved for these 60 days, and
afterwards, the user can wait up to 6 hours. How would you design
this?
• S3 source images can be on Standard, with a lifecycle configuration to
transition them to Glacier after 60 days
• S3 thumbnails can be on One-Zone IA, with a lifecycle configuration to
expire them (delete them) after 60 days

Amazon S3 – Lifecycle Rules (Scenario 2)

• A rule in your company states that you should be able to recover your
deleted S3 objects immediately for 30 days, although this may happen
rarely. After this time, and for up to 365 days, deleted objects should
be recoverable within 48 hours.
• Enable S3 Versioning in order to have object versions, so that “deleted
objects” are in fact hidden by a “delete marker” and can be recovered
• Transition the “noncurrent versions” of the object to Standard IA
• Transition afterwards the “noncurrent versions” to Glacier Deep Archive

Amazon S3 Analytics – Storage Class Analysis
• Help you decide when to transition objects to
the right storage class
• Recommendations for Standard and Standard
IA
S3 Bucket
• Does NOT work for One-Zone IA or Glacier
S3 Analytics
• Report is updated daily
• 24 to 48 hours to start seeing data analysis
• Good first step to put together Lifecycle Rules
(or improve them)!

---
S3 Lifecycle Rules (with S3 Analytics)
Introduction to S3 Storage Class Transitions
Let's discuss how objects can be moved between different Amazon S3 storage classes through transitions. The following diagram illustrates the possible transitions between storage classes.

You can transition objects from Standard to Standard-Infrequent Access (Standard IA), then to Intelligent Tiering, and then to One-Zone IA. From One-Zone IA, objects can be moved to Flexible Retrieval or Deep Archive storage classes. This graph shows all possible permutations of transitions.

If you know your objects will be infrequently accessed, move them to Standard IA. For archiving purposes, move objects to Glacier tiers or the Deep Archive tier. While manual movement is possible, automation is achievable using lifecycle rules.

Lifecycle Rules Overview
Lifecycle rules consist of multiple components:

Transition actions: Configure objects to transition to another storage class. For example, move to Standard IA 60 days after creation, or move to Glacier for archiving after six months.
Expiration actions: Configure objects to be deleted after a specified time. For instance, delete access log files after 365 days.
Version expiration: Delete old versions of files if versioning is enabled.
Incomplete multipart uploads: Delete incomplete multipart uploads older than two weeks, as they should have been fully uploaded by then.
Rules can apply to entire buckets, specific prefixes (paths), or objects with specific tags. For example, a rule can apply only to objects tagged for the finance department.

Example Scenario: Managing Source Images and Thumbnails
Consider an EC2 application that creates thumbnails after profile photos are uploaded to Amazon S3. Thumbnails can be recreated easily and only need to be kept for 60 days. Source images should be immediately retrievable for 60 days, after which retrieval can take up to six hours.

Design:

Store source images in the Standard storage class with a lifecycle rule to transition them to Glacier after 60 days.
Store thumbnails in One-Zone IA, as they are infrequently accessed and easily recreated.
Apply a lifecycle rule to expire (delete) thumbnails after 60 days.
Use prefixes to differentiate between source images and thumbnails for applying these rules.

Example Scenario: Retaining Deleted Objects with Versioning
A company policy requires that deleted S3 objects be recoverable immediately for 30 days, and thereafter recoverable within 48 hours for up to 365 days.

Implementation:

Enable S3 versioning to keep object versions. Deleted objects are hidden by a delete marker but can be recovered.
Create a lifecycle rule to transition non-current object versions (older versions) to Standard IA.
Subsequently, transition these non-current versions to Glacier Deep Archive for long-term archival.
Optimizing Lifecycle Transitions with Amazon S3 Analytics
Determining the optimal number of days to transition objects between storage classes can be challenging. Amazon S3 Analytics provides recommendations for transitions between Standard and Standard IA storage classes. Note that it does not support One-Zone IA or Glacier.

S3 Analytics runs on buckets and generates a CSV report containing statistics and recommendations. The report updates daily and typically takes 24 to 48 hours to start providing data analysis.

This report is a valuable first step in creating or improving lifecycle rules that make sense for your usage patterns.

Conclusion
This concludes the lecture on S3 lifecycle rules and analytics. These tools help automate storage management, optimize costs, and maintain data availability according to your requirements.

Key Takeaways
S3 lifecycle rules automate transitions between storage classes based on object age or usage.
Lifecycle rules can include transition actions, expiration actions, and apply to specific prefixes or tags.
Versioning combined with lifecycle rules enables management of non-current object versions and recovery of deleted objects.
Amazon S3 Analytics provides data-driven recommendations to optimize lifecycle transitions between Standard and Standard IA storage classes.