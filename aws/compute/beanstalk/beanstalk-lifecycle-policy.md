Beanstalk Lifecycle Policy
• Elastic Beanstalk can store at most 1000 application versions
• If you don’t remove old versions, you won’t be able to deploy anymore
• To phase out old application versions, use a lifecycle policy
• Based on time (old versions are removed)
• Based on space (when you have too many versions)
• Versions that are currently used won’t be deleted
• Option not to delete the source bundle in S3 to prevent data loss

---
Beanstalk Lifecycle Policy Overview + Hands On
Beanstalk Application Version Limits and Lifecycle Policy
Elastic Beanstalk can store, at most, 1000 application versions inside your account. If you do not remove old versions, you will not be able to deploy your Beanstalk applications anymore. Therefore, it is necessary to phase out old application versions. To accomplish this, you can use a Beanstalk lifecycle policy.

This lifecycle policy can be based on time to remove older versions or based on space, where having too many versions triggers phasing out the old ones. Versions currently used by your environments will not be deleted, even if they are old or consume too much space. Additionally, you have the option not to delete the source bundle of your application in Amazon S3 to prevent data loss, which can be helpful if you want to restore these versions later on. Currently, the lifecycle policy only removes versions from the Beanstalk interface.

Hands-On Demonstration of Lifecycle Policy
Let's proceed with a demonstration of the lifecycle policy. Navigate to the "Application Versions" section under your application, for example, MyApplication. Here, you can find deployed versions such as MyApplication-blue, including details about which label is deployed, from which source, and to which location.

Clicking on the source will download the application version. Instead, we will explore the source bundles in Amazon S3 to understand their storage.

Exploring Source Bundles in Amazon S3
In Amazon S3, locate the bucket created by Beanstalk to hold all application versions for your applications. For example, in the EU Central-1 region, you will find a bucket named accordingly.

The blue version has been uploaded to Beanstalk and is stored in this S3 bucket. All application versions remain in Amazon S3 but are registered in Beanstalk, where you can control how many versions are retained.

Configuring Application Lifecycle Policy
Within the Beanstalk settings, you can activate an application lifecycle policy. Once activated, you can limit the number of application versions by count, for example, setting a maximum of 200 application versions, or limit by age, such as retaining only the last 180 days of versions.

Versions currently in use will not be deleted. However, versions not in use and not compliant with the lifecycle rule will be deleted from Beanstalk.

Handling Source Bundles in Amazon S3 During Deletion
When a version is deleted from Beanstalk, you have two options regarding the source bundle in Amazon S3:

Retain the source bundle in Amazon S3, which is useful for recovery purposes.
Delete the source bundle from Amazon S3.
Finally, the AWS Elastic Beanstalk service role is the role that allows you to perform these deletions.

Summary
In this lecture, we have explored lifecycle policies in Elastic Beanstalk and the backing S3 bucket that stores application versions. Proper configuration of lifecycle policies ensures efficient management of application versions and storage resources.

Key Takeaways
Elastic Beanstalk can store up to 1000 application versions per account, requiring old versions to be phased out to continue deployments.
Lifecycle policies in Elastic Beanstalk allow automatic removal of old application versions based on age or count, while preserving versions currently in use.
Source bundles of application versions are stored in Amazon S3, and lifecycle policies can be configured to retain or delete these bundles.
The AWS Elastic Beanstalk service role is required to perform deletions as part of lifecycle policy enforcement.