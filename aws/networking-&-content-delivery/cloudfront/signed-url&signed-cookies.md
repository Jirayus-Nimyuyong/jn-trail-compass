CloudFront Signed URL / Signed Cookies
• You want to distribute paid shared content to premium users over the world
• We can use CloudFront Signed URL / Cookie. We attach a policy with:
• Includes URL expiration
• Includes IP ranges to access the data from
• Trusted signers (which AWS accounts can create signed URLs)
• How long should the URL be valid for?
• Shared content (movie, music): make it short (a few minutes)
• Private content (private to the user): you can make it last for years
• Signed URL = access to individual files (one signed URL per file)
• Signed Cookies = access to multiple files (one signed cookie for many files)

CloudFront Signed URL Diagram

CloudFront Signed URL vs
S3 Pre-Signed URL

• CloudFront Signed URL:
• Allow access to a path, no matter
the origin
• Account wide key-pair, only the root
can manage it
• Can filter by IP, path, date, expiration
• Can leverage caching features

• S3 Pre-Signed URL:
• Issue a request as the person who
pre-signed the URL
• Uses the IAM key of the signing
IAM principal
• Limited lifetime

CloudFront Signed URL Process
• Two types of signers:
• Either a trusted key group (recommended)
• Can leverage APIs to create and rotate keys (and IAM for API security)
• An AWS Account that contains a CloudFront Key Pair
• Need to manage keys using the root account and the AWS console
• Not recommended because you shouldn’t use the root account for this
• In your CloudFront distribution, create one or more trusted key groups
• You generate your own public / private key
• The private key is used by your applications (e.g. EC2) to sign URLs
• The public key (uploaded) is used by CloudFront to verify URLs

---
CloudFront Signed URL / Cookies
Introduction to CloudFront Signed URLs and Cookies
Suppose you have a CloudFront distribution and you want to make it private. You want to provide access to premium, paid, shared content globally. Additionally, you want to monitor and know who has access to what on your CloudFront distribution. For this purpose, you can use a CloudFront signed URL or a signed cookie. By the end of this section, you will understand the difference between signed URLs and signed cookies.

When creating a signed URL or cookie, you need to attach a policy. This policy specifies when the URL or cookie expires, which IP ranges can access the data, and who the trusted signers are—meaning which accounts can create signed URLs for your users.

If you know the target IP addresses of your clients, you should definitely use that information in your policy.

You might wonder, "How long should this URL be valid?" If you are sharing content such as a movie or music, you can make the URL valid for a short period, such as a few minutes. However, if the content is private to the user and they will access it over a long period, you can make the signed URL or cookie last for years.

Difference Between Signed URL and Signed Cookie
A signed URL grants access to individual files. For example, if you have 100 files to show, you will get 100 signed URLs—one per file.

In contrast, a signed cookie grants access to multiple files. The cookie can be reused, so you have one signed cookie for many files. Choose whichever option suits your context best.

How Signed URLs Work
Consider a CloudFront distribution with multiple edge locations. For example, you can access your Amazon S3 bucket through an Origin Access Control (OAC) for maximum security. This means the objects in your S3 bucket cannot be accessed by anything other than CloudFront.

However, you still want to give people access to their objects through CloudFront. Clients will authenticate and authorize with your application, which you must code. Your application will use the AWS SDK to generate a signed URL directly from CloudFront. It will then return the signed URL to the clients, who can use it to access the data, files, or objects directly from CloudFront.

This process works similarly for signed cookies.

CloudFront Signed URL vs. S3 Pre-Signed URL
You may ask yourself whether to use a CloudFront signed URL or an S3 pre-signed URL. They serve different purposes.

CloudFront Signed URL:

Allows access to a path regardless of the origin.
Works not only for S3 origins but also for HTTP backends or any origin.
Uses an account-wide key pair managed only by the root account.
Supports filtering by IP, path, date, and expiration.
Leverages all CloudFront caching features.
S3 Pre-Signed URL:

Issues a request as the IAM principal who signed the URL.
The person with the URL has the same permissions as the signer.
Has a limited lifetime.
Allows clients to access your S3 bucket directly.
If your users access content through CloudFront in front of S3, you must use a CloudFront signed URL because the S3 bucket policy restricts access to the Origin Access Identity (OAI). If your users access S3 directly without CloudFront, pre-signed URLs are a great use case.

Summary
In summary, CloudFront signed URLs and signed cookies provide flexible and secure ways to control access to your content distributed globally. Choose signed URLs for individual file access and signed cookies for multiple files. Understand the differences between CloudFront signed URLs and S3 pre-signed URLs to select the appropriate method for your use case.

Key Takeaways
CloudFront signed URLs and signed cookies enable controlled, private access to content distributed globally.
Signed URLs provide access to individual files, while signed cookies allow access to multiple files with a single credential.
CloudFront signed URLs work across various origins and support IP filtering, expiration, and caching features.
S3 pre-signed URLs grant access directly to S3 buckets with the permissions of the signer and are suited for direct S3 access without CloudFront.