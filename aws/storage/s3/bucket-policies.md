Amazon S3 – Security
• User-Based
• IAM Policies – which API calls should be allowed for a specific user from IAM
• Resource-Based
• Bucket Policies – bucket wide rules from the S3 console - allows cross account
• Object Access Control List (ACL) – finer grain (can be disabled)
• Bucket Access Control List (ACL) – less common (can be disabled)
• Note: an IAM principal can access an S3 object if
• The user IAM permissions ALLOW it OR the resource policy ALLOWS it
• AND there’s no explicit DENY
• Encryption: encrypt objects in Amazon S3 using encryption keys

S3 Bucket Policies

• JSON based policies
• Resources: buckets and objects
• Effect: Allow / Deny
• Actions: Set of API to Allow or Deny
• Principal: The account or user to apply the
policy to

• Use S3 bucket for policy to:
• Grant public access to the bucket
• Force objects to be encrypted at upload
• Grant access to another account (Cross
Account)

Bucket settings for Block Public Access
• These settings were created to prevent company data leaks
• If you know your bucket should never be public, leave these on
• Can be set at the account level

---

S3 Security: Bucket Policy
Introduction to Amazon S3 Security
Amazon S3 security can be divided into several components. The first part is user-based security, where IAM policies authorize which API calls are allowed for a specific IAM user.

Resource-Based Security: S3 Bucket Policies
Resource-based security is a newer feature that uses S3 Bucket policies. These are bucket-wide rules that can be assigned directly from the S3 console. They allow, for example, a specific user or a user from another AWS account (cross-account access) to access your S3 buckets. This is also how S3 buckets can be made public.

Object and Bucket Access Control Lists (ACLs)
Amazon S3 also supports Object Access Control Lists (ACLs), which provide finer-grain security and can be disabled if desired. Similarly, Bucket ACLs exist but are less common and can also be disabled. The most common and recommended way to secure S3 buckets today is through bucket policies.

When Can an IAM Principal Access an S3 Object?
An IAM principal can access an S3 object if:

The IAM permissions allow it, or
The resource policies allow it,
and there is no explicit deny on the action. Under these conditions, the IAM principal can perform the specified API call on the S3 object.

Encryption as a Security Measure
Another way to secure Amazon S3 is by encrypting objects using encryption keys. This adds a layer of protection to the data stored in S3.

Structure of an S3 Bucket Policy
S3 Bucket policies are JSON-based documents. They are quite easy to read and consist of several key components:

Resource: Specifies the buckets and objects the policy applies to. For example, a resource might apply to every object within a bucket, indicated by a wildcard star (*).
Effect: Specifies whether to Allow or Deny actions.
Action: Lists the API calls that are allowed or denied, such as GetObject.
Principal: Specifies the account or user the policy applies to, which can be a wildcard star (*) to represent anyone.
For example, a policy might allow anyone (Principal: "*") to perform the GetObject action on all objects in a bucket, effectively making the bucket publicly readable.

Use Cases for S3 Bucket Policies
S3 Bucket policies can be used to:

Grant public access to a bucket.
Force objects to be encrypted upon upload.
Grant access to users in another AWS account (cross-account access).
Example: Public Access Bucket Policy
Consider a website visitor on the worldwide web who wants to access files within your S3 bucket. You can attach an S3 Bucket policy that allows public access. Once this policy is attached, any object within the bucket can be accessed publicly.

IAM User Access
If you have an IAM user within your AWS account who needs access to S3, you can assign IAM permissions to that user through a policy. If the policy allows access to the S3 buckets, the user can access them accordingly.

EC2 Instance Access via IAM Roles
For EC2 instances that require access to S3 buckets, IAM users are not appropriate. Instead, you create an IAM role for the EC2 instance with the correct permissions. This role allows the EC2 instance to access the Amazon S3 buckets securely.

Cross-Account Access
To allow cross-account access, where an IAM user in another AWS account needs access to your S3 buckets, you must use a bucket policy. This policy grants the specific IAM user in the other account permission to make API calls to your S3 buckets.

Block Public Access Settings
AWS provides Block Public Access settings at the bucket and account level. These settings were introduced as an extra layer of security to prevent accidental data leaks. Even if a bucket policy would make a bucket public, if Block Public Access settings are enabled, the bucket will never be public. This protects against misconfigured bucket policies.

If you know that your bucket should never be public, leave these settings enabled. You can also set this at the account level to ensure none of your buckets are ever public.

Conclusion
This concludes the overview of Amazon S3 security focusing on bucket policies. Next, we will proceed to hands-on practice to apply these concepts.

Key Takeaways
Amazon S3 security includes user-based IAM policies, resource-based bucket policies, object and bucket ACLs, and encryption.
S3 Bucket policies are JSON documents that specify permissions on buckets and objects, allowing actions like GetObject.
Bucket policies can grant public access, cross-account access, or enforce encryption on uploads.
AWS provides Block Public Access settings to prevent accidental public exposure of buckets, adding an extra layer of security.