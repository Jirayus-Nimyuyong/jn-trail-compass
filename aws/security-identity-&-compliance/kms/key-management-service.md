AWS KMS (Key Management Service)

• Anytime you hear “encryption” for an AWS service, it’s most likely KMS
• AWS manages encryption keys for us
• Fully integrated with IAM for authorization
• Easy way to control access to your data
• Able to audit KMS Key usage using CloudTrail
• Seamlessly integrated into most AWS services (EBS, S3, RDS, SSM…)
• Never ever store your secrets in plaintext, especially in your code!
• KMS Key Encryption also available through API calls (SDK, CLI)
• Encrypted secrets can be stored in the code / environment variables

---

KMS Keys Types

• KMS Keys is the new name of KMS Customer Master Key
• Symmetric (AES-256 keys)
• Single encryption key that is used to Encrypt and Decrypt
• AWS services that are integrated with KMS use Symmetric CMKs
• You never get access to the KMS Key unencrypted (must call KMS API to use)
• Asymmetric (RSA & ECC key pairs)
• Public (Encrypt) and Private Key (Decrypt) pair
• Used for Encrypt/Decrypt, or Sign/Verify operations
• The public key is downloadable, but you can’t access the Private Key unencrypted
• Use case: encryption outside of AWS by users who can’t call the KMS API

---

AWS KMS (Key Management Service)

• Types of KMS Keys:
• AWS Owned Keys (free): SSE-S3, SSE-SQS, SSE-DDB (default key)
• AWS Managed Key: free (aws/service-name, example: aws/rds or aws/ebs)
• Customer managed keys created in KMS: $1 / month
• Customer managed keys imported: $1 / month
• + pay for API call to KMS ($0.03 / 10000 calls)

• Automatic Key rotation:
• AWS-managed KMS Key: automatic every 1 year
• Customer-managed KMS Key: (must be enabled) automatic & on-demand
• Imported KMS Key: only manual rotation possible using alias

---

Copying Snapshots across regions

---

KMS Key Policies
• Control access to KMS keys, “similar” to S3 bucket policies
• Difference: you cannot control access without them
• Default KMS Key Policy:
• Created if you don’t provide a specific KMS Key Policy
• Complete access to the key to the root user = entire AWS account
• Custom KMS Key Policy:
• Define users, roles that can access the KMS key
• Define who can administer the key
• Useful for cross-account access of your KMS key

---

Copying Snapshots across accounts

1. Create a Snapshot, encrypted with
your own KMS Key (Customer
Managed Key)
2. Attach a KMS Key Policy to
authorize cross-account access
3. Share the encrypted snapshot
4. (in target) Create a copy of the
Snapshot, encrypt it with a CMK in
your account
5. Create a volume from the snapshot

---

KMS Overview
Introduction to AWS KMS
AWS Key Management Service (KMS) is a key management service provided by AWS. It is widely used, often without explicit awareness, whenever encryption is involved in AWS services. Essentially, when you hear about encryption in AWS, it is most likely referring to KMS encryption.

The primary goal of KMS is to manage encryption keys on behalf of users, reducing the operational burden of key management.

KMS is fully integrated with AWS Identity and Access Management (IAM) for authorization. This integration provides straightforward mechanisms to control access to encrypted data using KMS.

One of the powerful features of AWS KMS is the ability to audit every API call made to use your keys through AWS CloudTrail. This auditing capability is important and may be tested in certification exams.

KMS can be seamlessly integrated into most AWS services. For example, to encrypt data at rest in an Elastic Block Store (EBS) volume, you simply enable KMS integration. The same applies to services such as Amazon S3, Amazon RDS, and AWS Systems Manager (SSM), among others that require encryption.

Additionally, KMS can be used directly by users. If you have secret data, it is critical never to store it in plain text, especially within your code. Instead, you can use KMS through API calls, AWS CLI, or SDKs to encrypt secrets with a KMS key. These encrypted secrets can then be safely stored in your code or environment variables, which is a much better security practice.

Types of KMS Keys
AWS KMS keys, formerly known as Customer Master Keys (CMKs), are now simply referred to as KMS keys to avoid confusion with customer managed keys.

There are two main types of KMS keys:

Symmetric KMS Keys: These use a single key for both encryption and decryption. All AWS services integrated with KMS use symmetric keys. When you create or use a symmetric KMS key, you never get direct access to the key material; instead, you use KMS API calls to perform cryptographic operations.

Asymmetric KMS Keys: These consist of a public key used for encryption and a private key used for decryption. They support encrypt/decrypt or sign/verify operations. You can download the public key from KMS, but the private key remains protected and can only be accessed via API calls.

Asymmetric keys are useful when encryption needs to be performed outside of AWS by users who do not have access to the KMS API. These users encrypt data with the public key and send it to you, and you decrypt it within your AWS account using the private key.

Categories of KMS Keys
Within KMS keys, there are different categories:

AWS Owned Keys: These keys are free and used internally by AWS services, such as SSE-S3 or DynamoDB encryption. These keys are not visible to users but are types of encryption keys managed by AWS.

AWS Managed Keys: Also free, these keys are created and managed by AWS for specific services. They have names starting with AWS/ followed by the service name, for example, AWS/RDS or AWS/EBS. These keys can only be used within the service they are assigned to.

Customer Managed Keys: These are keys created and managed by customers. They incur a cost of approximately one dollar per month. Customers can also import keys, which also cost one dollar per month. Additionally, API calls to KMS incur charges, approximately 3 cents per 10,000 API calls.

Key Rotation
KMS supports automatic key rotation:

For AWS managed keys, rotation is automatic every year.
For customer managed keys, you can enable automatic rotation and set the rotation period.
You can also perform on-demand rotation for customer managed keys.
For imported keys, rotation must be done manually.
To facilitate key rotation, KMS uses aliases to reference keys.

Regional Scope of KMS Keys
KMS keys are scoped per AWS region. For example, if you have an EBS volume encrypted with a KMS key in the eu-south-2 region, copying that volume to another region involves several steps:

Take a snapshot of the encrypted EBS volume. The snapshot itself will be encrypted with the same KMS key.
To copy the snapshot to another region, AWS will re-encrypt the snapshot using a different KMS key in the target region.
The original KMS key cannot exist in two regions simultaneously.
After copying, you restore the snapshot into a new EBS volume encrypted with the new KMS key in the target region.
This process ensures encryption continuity while respecting regional key boundaries.

KMS Key Policies
KMS key policies control access to your KMS keys and are similar to S3 bucket policies. However, if a KMS key does not have a key policy attached, no one can access it.

There are two types of KMS key policies:

Default Key Policy: Created automatically if you do not provide a custom key policy. It allows everyone in your AWS account to access the key, provided they have the appropriate IAM permissions.

Custom Key Policy: Allows you to define specific users and roles that can access or administer the key. This is especially useful for cross-account access scenarios.

For example, to share an encrypted snapshot across AWS accounts:

Create a snapshot encrypted with a customer managed KMS key.
Attach a custom key policy to authorize cross-account access.
Share the encrypted snapshot with the target account.
In the target account, create a copy of the snapshot encrypted with a different customer managed key.
Create a volume from the snapshot in the target account.
This process ensures secure sharing of encrypted data across accounts.

Summary
This overview covered the essential concepts of AWS KMS, including its integration with AWS services, types of keys, key management, regional scope, and key policies. Understanding these concepts is crucial for managing encryption securely and effectively in AWS environments.

Let's proceed to hands-on exercises to deepen our understanding of AWS KMS.

Key Takeaways
AWS KMS is a key management service that manages encryption keys and integrates fully with IAM for access control.
KMS supports symmetric keys (single key for encrypt/decrypt) and asymmetric keys (public/private key pairs).
Different types of KMS keys include AWS owned keys, AWS managed keys, and customer managed keys, each with different cost and usage scopes.
KMS keys are region-scoped; copying encrypted snapshots across regions requires re-encryption with a different key.
KMS key policies control access; default policies allow account-wide access, while custom policies enable fine-grained and cross-account permissions.
KMS API calls are auditable via CloudTrail and incur costs per call.
Automatic and manual key rotation options are available depending on key type.

---

