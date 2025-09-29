S3 Bucket Key for SSE-KMS encryption

• New setting to decrease…
• Number of API calls made to KMS from
S3 by 99%
• Costs of overall KMS encryption with
Amazon S3 by 99%
• This leverages data keys
• A “S3 bucket key” is generated
• That key is used to encrypt KMS
objects with new data keys
• You will see less KMS CloudTrail
events in CloudTrail

---
Key Policy – Examples

---

S3 Bucket Key
Introduction to S3 Bucket Key Setting
Let's discuss a new setting for your Amazon S3 Buckets when using SSE-KMS encryption. This setting allows you to reduce the number of API calls made to AWS Key Management Service (KMS) from Amazon S3 by 99%. Consequently, it also reduces the overall cost of KMS encryption used by Amazon S3 by 99%.

How the S3 Bucket Key Works
This optimization leverages data keys and, more importantly, an S3 Bucket Key. Here's how it works:

A customer master key (CMK) in KMS generates a data key for your Amazon S3 Bucket periodically.
This data key, called the Amazon S3 Bucket Key, rotates occasionally.
The bucket key is used to encrypt objects in your Amazon S3 Buckets with KMS encryption.
By introducing this extra bucket key, Amazon S3 generates many data keys using envelope encryption to encrypt your S3 objects.

Benefits of Using the S3 Bucket Key
By using the S3 Bucket Key instead of calling KMS directly for every data key generation, the number of API calls to KMS is significantly reduced. This leads to:

A substantial reduction in costs associated with KMS encryption.
Lower risk of exceeding encryption limits within your Amazon S3 Buckets.
No compromise on security.
As a result, you will observe fewer KMS-related events in AWS CloudTrail and much lower KMS costs.

Enabling the S3 Bucket Key in the S3 Console
To enable this setting:

Navigate to the Amazon S3 Console.
Create a new bucket (for example, named "Demo S3 Bucket Key").
Configure the bucket settings:
Block all public access.
Disable versioning.
Enable encryption with SSE-KMS using the AWS managed key.
Enable the bucket key option. By default, this setting is enabled, but you can disable it if you want every upload to communicate directly with KMS.
Create the bucket.
Once enabled, the bucket key will be used for encryption in your S3 Bucket, reducing costs and API calls without sacrificing security.

Summary
The S3 Bucket Key setting is a valuable optimization for users employing SSE-KMS encryption at scale. It reduces KMS API calls and costs by 99% while maintaining strong security guarantees. Enabling this feature in the S3 Console is straightforward and highly recommended for large-scale encryption workloads.

Key Takeaways
The S3 Bucket Key setting significantly reduces the number of KMS API calls by 99% when using SSE-KMS encryption.
This optimization lowers the overall cost of KMS encryption in Amazon S3 without compromising security.
The S3 Bucket Key is a data key generated and rotated periodically by the customer master key in KMS.
Enabling the bucket key setting in the S3 Console is straightforward and recommended for large-scale SSE-KMS usage.