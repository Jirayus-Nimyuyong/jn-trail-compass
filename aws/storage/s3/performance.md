S3 – Baseline Performance
• Amazon S3 automatically scales to high request rates, latency 100-200 ms
• Your application can achieve at least 3,500 PUT/COPY/POST/DELETE or
5,500 GET/HEAD requests per second per prefix in a bucket.
• There are no limits to the number of prefixes in a bucket.
• Example (object path => prefix):
• bucket/folder1/sub1/file => /folder1/sub1/
• bucket/folder1/sub2/file => /folder1/sub2/
• bucket/1/file
=> /1/
• bucket/2/file
=> /2/
• If you spread reads across all four prefixes evenly, you can achieve 22,000
requests per second for GET and HEAD

S3 Performance
Multi-Par t upload:
• recommended for files > 100MB,
must use for files > 5GB
• Can help parallelize uploads (speed
up transfers)

S3 Transfer Acceleration
• Increase transfer speed by transferring
file to an AWS edge location which will
forward the data to the S3 bucket in the
target region
• Compatible with multi-part upload

S3 Byte-Range Fetches

• Parallelize GETs by requesting specific
byte ranges
• Better resilience in case of failures

---
S3 Performance
S3 Baseline Performance
Amazon S3 automatically scales to handle a very high number of requests with a low latency between 100 and 200 milliseconds to get the first byte from S3. This performance is quite fast by default.

In terms of request rates, you can achieve 3,500 PUT, COPY, POST, or DELETE requests per second per prefix, and 5,500 GET or HEAD requests per second per prefix in your buckets. This information is available on the AWS website, but the meaning of "per prefix" might not be very clear, so let's explain it.

There is no limit to the number of prefixes in your bucket, which means you can scale performance by using multiple prefixes.

Understanding Prefixes with Examples
Consider four objects named "file" located in different folders and subfolders within your bucket. For example, one object is located at /folder1/sub1/file. The prefix for this object is the path between the bucket and the file, which in this case is /folder1/sub1.

For this prefix, you can achieve 3,500 PUTs and 5,500 GETs per second. Similarly, if you have another object at /folder1/sub2/file, the prefix is /folder1/sub2, which also supports the same request rates. Each distinct prefix allows you to achieve these request rates independently.

If you spread your read requests evenly across four different prefixes, you can achieve a total of 22,000 GET and HEAD requests per second. This illustrates how using multiple prefixes can increase your overall throughput.

Optimizing S3 Performance
Multi-Part Upload
It is recommended to use multi-part upload for files larger than 100 megabytes, and it is mandatory for files larger than five gigabytes. Multi-part upload divides a large file into smaller parts and uploads them in parallel, which speeds up the transfer and maximizes bandwidth utilization.

The process works as follows: a large file is split into smaller chunks, each chunk is uploaded independently and in parallel to Amazon S3, and once all parts are uploaded, Amazon S3 assembles them back into the original file.

S3 Transfer Acceleration
S3 Transfer Acceleration is a feature that increases upload and download speeds by transferring files through AWS edge locations. These edge locations forward data to the S3 bucket in the target region over the AWS private network, reducing the use of the public internet.

There are over 200 edge locations worldwide, which is more than the number of AWS regions. Transfer Acceleration is compatible with multi-part upload, further enhancing transfer speeds.

For example, if you want to upload a file from the United States to an S3 bucket in Australia, the file is first uploaded quickly to a nearby edge location in the United States. Then, the edge location transfers the file over the fast, private AWS network to the S3 bucket in Australia. This minimizes the amount of data transferred over the public internet and maximizes the use of the private AWS network, thus accelerating transfers.

S3 Byte Range Fetches
To efficiently read files, S3 supports Byte Range Fetches, which allow you to request specific byte ranges of a file. This enables parallelized GET requests for different parts of a file, speeding up downloads and improving resilience in case of failures.

For instance, if you have a large file in S3, you can request the first few bytes, then the next part, and so on, all in parallel. If a request for a specific byte range fails, you can retry just that smaller range, improving reliability.

Another use case is to retrieve only a partial amount of a file. For example, if the first 50 bytes of a file contain a header with metadata, you can issue a byte range request for just those 50 bytes to quickly obtain that information.

Summary
In this lecture, we covered the baseline performance of Amazon S3, including request rates per prefix and latency. We discussed how to optimize performance using multi-part uploads and S3 Transfer Acceleration. Additionally, we explored how S3 Byte Range Fetches can speed up downloads and improve resilience.

Key Takeaways
Amazon S3 automatically scales to handle very high request rates with low latency.
Each prefix in an S3 bucket supports up to 3,500 PUT/COPY/POST/DELETE and 5,500 GET/HEAD requests per second.
Multi-part upload is recommended for files over 100 MB and mandatory for files over 5 GB to optimize upload speed.
S3 Transfer Acceleration uses AWS edge locations to speed up uploads and downloads by minimizing public internet usage.
S3 Byte Range Fetches allow parallelized GET requests for specific byte ranges, improving download speed and resilience.