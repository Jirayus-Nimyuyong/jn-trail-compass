KMS Request Quotas

• When you exceed a request quota, you get a ThrottlingException:
• To respond, use exponential backoff (backoff and retry)
• For cryptographic operations, they share a quota
• This includes requests made by AWS on your behalf (ex: SSE-KMS)
• For GenerateDataKey, consider using DEK caching from the Encryption SDK
• You can request a Request Quotas increase through API or AWS support

---
KMS Request Quotas

API operation
Decrypt
Encrypt
GenerateDataKey (symmetric)
GenerateDataKeyWithoutPlaintext (symmetric)
GenerateRandom
ReEncrypt
Sign (asymmetric)
Verify (asymmetric)

Request quotas (per second)
These shared quotas vary with the AWS Region and
the type of CMK used in the request. Each quota is
calculated separately.
Symmetric CMK quota:
• 5,500 (shared)
• 10,000 (shared) in the following Regions:
• us-east-2, ap-southeast-1, ap-southeast-2,
ap-northeast-1, eu-central-1, eu-west-2
• 30,000 (shared) in the following Regions:
• us-east-1, us-west-2, eu-west-1
Asymmetric CMK quota:
• 500 (shared) for RSA CMKs
• 300 (shared) for Elliptic curve (ECC) CMKs

---

KMS Limits
Introduction to KMS Request Quotas
KMS is an internal service, and as such, it enforces request quotas. These quotas are crucial because if you exceed the allowed number of requests for operations such as encryption or decryption, you will encounter a ThrottlingException.

When a ThrottlingException occurs, the error message typically looks like this:

"Status Code: 400; Error Code: ThrottlingException; you are exceeding the rate at which you can call KMS."

Handling Throttling Exceptions
To respond to such exceptions, we can apply exponential backoff. This means backing off and retrying with exponentially increasing wait times between each call.

Shared Quota for Cryptographic Operations
KMS has a specific characteristic: all cryptographic operations, including decrypt and encrypt, share a single quota. This means that any service making requests on our behalf, such as AWS S3 using SSE-KMS data encryption, contributes to this shared quota.

Every time AWS uses the key for us, it counts against that quota. This quota is shared across our account for each region and applies to all cryptographic operations.

If the key is used excessively, a ThrottlingException will be triggered.

Solutions to Avoid Throttling
There are several approaches to mitigate throttling:

Data Encryption Key (DEK) Caching:

When using the GenerateDataKey API, cache the data encryption key locally to reduce the number of API calls to AWS.
This feature is part of the encryption SDK.
Request Quota Increase:

If the limit is frequently exceeded, request a quota increase either via an API call or by opening a support ticket with AWS.
Understanding the Shared Quota
All cryptographic operations such as decrypt, encrypt, GenerateDataKey, GenerateRandom, and others share the same quota. The exact quota depends on the AWS region.

For symmetric Customer Master Keys (CMKs), the quotas are typically:

5,500 requests per second in some regions,
Up to 10,000 requests per second in others,
And as high as 30,000 requests per second in certain regions.
These quotas are shared across all API calls for cryptographic operations.

If you reach this limit, you must request a service limit increase to raise the shared quota for all cryptographic operations.

Summary: Three Ways to Handle KMS Throttling
Exponential Backoff: Use this approach if the throttling is transient.
Reduce API Calls: Utilize the envelope encryption SDK with data encryption key caching to minimize calls to KMS.
Request Limit Increase: Contact AWS to increase your quota if your usage consistently exceeds limits.
This concludes the discussion on KMS limits. We will continue with the next lecture shortly.

Key Takeaways
KMS enforces request quotas for cryptographic operations, and exceeding these results in a ThrottlingException.
All cryptographic operations share a single quota per account per region, including requests from AWS services like S3 using SSE-KMS.
To mitigate throttling, use exponential backoff retries, cache data encryption keys locally via the encryption SDK, or request a quota increase from AWS.
Quota limits vary by region, typically ranging from 5,500 to 30,000 requests per second for symmetric CMKs.

