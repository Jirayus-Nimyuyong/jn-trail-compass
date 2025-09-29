Amazon S3 – Pre-Signed URLs
• Generate pre-signed URLs using the S3 Console, AWS CLI or SDK
• URL Expiration
    • S3 Console – 1 min up to 720 mins (12 hours)
    • AWS CLI – configure expiration with --expires-in parameter in seconds
    (default 3600 secs, max. 604800 secs ~ 168 hours)
• Users given a pre-signed URL inherit the permissions of the user
that generated the URL for GET / PUT

• Examples:
• Allow only logged-in users to download a premium video from your S3
bucket
• Allow an ever-changing list of users to download files by generating URLs
dynamically
• Allow temporarily a user to upload a file to a precise location in your S3
bucket
---
S3 Pre-signed URLs
Introduction to Amazon S3 Pre-signed URLs
Amazon S3 pre-signed URLs are URLs that you can generate using the S3 console, the CLI, or the SDK. These URLs have an expiration time after which they become invalid.

When generating a pre-signed URL via the console, the maximum expiration time is up to 12 hours. Using the CLI, you can set the expiration time up to 168 hours.

The key concept is that when you generate a pre-signed URL, the user who receives that URL will inherit the permissions of the user who generated it. This applies for GET or PUT operations.

Use Case for Pre-signed URLs
Imagine you have an S3 bucket that is private, and you want to give someone outside of AWS access to a single file. You do not want to make that file public or compromise your security in any way.

As the bucket owner or authorized user, you generate a pre-signed URL for that specific file. The S3 bucket then provides you with a URL that is pre-signed, meaning it carries your authorization credentials to access that file.

You then send this URL to the target user to whom you want to grant access to the file for a limited amount of time.

The user uses the URL to access the file on the S3 bucket. The user can then download the file, for example, within the allowed time window.

Common Use Cases
Pre-signed URLs are a very common solution for temporary access to a specific file, either for download or upload.

Examples include:

Allowing only logged-in users to download a premium video stored in your S3 bucket.
Dynamically generating URLs to allow an ever-changing list of users to download files.
Temporarily permitting a user to upload a file to a precise location in your S3 bucket while keeping the bucket private.
Conclusion
This concludes the lecture on Amazon S3 pre-signed URLs. In the next lecture, we will have some hands-on exercises.

Key Takeaways
Amazon S3 pre-signed URLs allow temporary, secure access to private S3 bucket files.
Pre-signed URLs inherit the permissions of the user who generates them, enabling controlled GET or PUT operations.
These URLs have expiration times, configurable via the console (up to 12 hours) or CLI (up to 168 hours).
Common use cases include granting temporary download or upload access without making files public.