Amazon S3 – Object Encryption

• You can encrypt objects in S3 buckets using one of 4 methods
• Server-Side Encryption (SSE)
• Server-Side Encryption with Amazon S3-Managed Keys (SSE-S3) – Enabled by
Default
• Encrypts S3 objects using keys handled, managed, and owned by AWS
• Server-Side Encryption with KMS Keys stored in AWS KMS (SSE-KMS)
• Leverage AWS Key Management Service (AWS KMS) to manage encryption keys
• Server-Side Encryption with Customer-Provided Keys (SSE-C)
• When you want to manage your own encryption keys
• Client-Side Encryption
• It’s important to understand which ones are for which situation for the exam

Amazon S3 Encryption – SSE-S3

• Encryption using keys handled, managed, and owned by AWS
• Object is encrypted server-side
• Encryption type is AES-256
• Must set header "x-amz-server-side-encryption": "AES256"
• Enabled by default for new buckets & new objects

Amazon S3 Encryption – SSE-KMS
• Encryption using keys handled and managed by AWS KMS (Key Management Service)
• KMS advantages: user control + audit key usage using CloudTrail
• Object is encrypted server side
• Must set header "x-amz-server-side-encryption": "aws:kms"

SSE-KMS Limitation
• If you use SSE-KMS, you may be impacted
by the KMS limits
• When you upload, it calls the
GenerateDataKey KMS API
• When you download, it calls the Decrypt
KMS API
• Count towards the KMS quota per second
(5500, 10000, 30000 req/s based on region)
• You can request a quota increase using the
Service Quotas Console

Amazon S3 Encryption – SSE-C
• Server-Side Encryption using keys fully managed by the customer outside of AWS
• Amazon S3 does NOT store the encryption key you provide
• HTTPS must be used
• Encryption key must provided in HTTP headers, for every HTTP request made

Amazon S3 Encryption – Client-Side Encryption

• Use client libraries such as Amazon S3 Client-Side Encryption Library
• Clients must encrypt data themselves before sending to Amazon S3
• Clients must decrypt data themselves when retrieving from Amazon S3
• Customer fully manages the keys and encryption cycle

Amazon S3 – Encryption in transit (SSL/TLS)
• Encryption in flight is also called SSL/TLS
• Amazon S3 exposes two endpoints:
• HTTP Endpoint – non encrypted
• HTTPS Endpoint – encryption in flight
• HTTPS is recommended
• HTTPS is mandatory for SSE-C
• Most clients would use the HTTPS endpoint by default

Amazon S3 – Force Encryption in Transit
aws:SecureTransport

Amazon S3 – Default Encryption vs. Bucket Policies

• SSE-S3 encryption is automatically applied to new objects stored in S3 bucket
• Optionally, you can “force encryption” using a bucket policy and refuse any API call
to PUT an S3 object without encryption headers (SSE-KMS or SSE-C)

• Note: Bucket Policies are evaluated before “Default Encryption”

---
S3 Encryption
Overview of S3 Object Encryption
You can encrypt objects in Amazon S3 buckets using one of the following four methods:

Server-side encryption (SSE), which has multiple types.
SSE-S3: Server-side encryption with Amazon S3-managed keys.
SSE-KMS: Server-side encryption with AWS Key Management Service (KMS) keys.
SSE-C: Server-side encryption with customer-provided keys.
Client-side encryption: Encrypting data on the client before uploading to S3.
This section provides an overview; details for each method will follow.

SSE-S3: Server-Side Encryption with S3-Managed Keys
With SSE-S3, encryption uses a key handled, managed, and owned by AWS. You never have access to this key. The object is encrypted server-side by AWS using AES-256 encryption. To request Amazon S3 to encrypt the object using SSE-S3, set the header:

x-amz-server-side-encryption: AES256
SSE-S3 is enabled by default for new buckets and new objects.

How SSE-S3 Works
The user uploads a file with the correct header.
The file becomes an object in Amazon S3.
Amazon S3 pairs the object with the S3-owned key.
Encryption is performed by mixing the key and the object, and the encrypted object is stored in the S3 bucket.
SSE-KMS: Server-Side Encryption with AWS KMS Keys
With SSE-KMS, you manage your own keys using AWS KMS (Key Management Service). The advantages include user control over keys and the ability to create and manage keys within KMS. Key usage is logged using CloudTrail. Any time someone uses a key in KMS, it is logged in CloudTrail.

To use SSE-KMS, set the header:

x-amz-server-side-encryption: aws:kms
You can also specify the KMS key you want to use in the header.

How SSE-KMS Works
Upload the object with the appropriate header specifying the KMS key.
The object appears in Amazon S3.
The KMS key from AWS KMS is used for encryption.
The object and the KMS key are blended for encryption, and the encrypted file is stored in the S3 bucket.
To read the file, you need access to both the object and the underlying KMS key used for encryption.
SSE-KMS Limitations
Uploading and downloading files with SSE-KMS requires using KMS APIs, such as GenerateDataKey and Decrypt.
Each API call counts toward the KMS quotas of API calls per second (between 5,000 and 30,000 requests per second, depending on the region).
High-throughput S3 buckets using KMS keys may encounter throttling due to these limits.
SSE-C: Server-Side Encryption with Customer-Provided Keys
With SSE-C, keys are managed outside of AWS, but encryption is still performed server-side. You send the key to AWS with each request, but Amazon S3 never stores the encryption key you provide. After use, the key is discarded.

How SSE-C Works
You must use HTTPS and pass the key as part of HTTP headers for every request.
The user uploads a file and provides the key, which is managed outside AWS.
Amazon S3 uses the client-provided key and the object to perform encryption, then stores the encrypted file in the S3 bucket.
To read the file, the user must provide the same key used for encryption.
Client-Side Encryption
With client-side encryption, the client encrypts data before sending it to Amazon S3. This can be implemented using a client library, such as the Client-Side Encryption Library. The client is responsible for managing the keys and the entire encryption cycle.

How Client-Side Encryption Works
The client has a file and a key, both outside AWS.
The client performs the encryption, resulting in an encrypted file.
The encrypted file is uploaded to Amazon S3.
Decryption also happens on the client, outside of Amazon S3.
Encryption in Transit (SSL/TLS)
Encryption in transit, also called SSL or TLS, ensures secure transmission between the client and Amazon S3. Amazon S3 provides two endpoints:

HTTP (not encrypted)
HTTPS (encrypted in flight)
It is recommended to use HTTPS for secure transmission of data. If you use SSE-C, you must use HTTPS.

Enforcing Encryption in Transit
You can enforce encryption in transit by attaching a bucket policy to your S3 bucket. The policy denies any GetObject operation if the condition aws:SecureTransport is false. SecureTransport is true when using HTTPS and false when not using an encrypted connection. Users attempting to use HTTP will be blocked, while users using HTTPS will be allowed.

Conclusion
This concludes the discussion on S3 object encryption and encryption in transit. It is important to understand the different encryption options and when to use each, as well as how to enforce secure data transmission.

Key Takeaways
Amazon S3 supports four main methods of object encryption: SSE-S3, SSE-KMS, SSE-C, and client-side encryption.
SSE-S3 uses AWS-managed keys and is enabled by default for new buckets and objects.
SSE-KMS allows user control of keys through AWS KMS, with additional logging and API quota considerations.
SSE-C uses customer-provided keys, which are never stored by AWS and require HTTPS for transmission.
Client-side encryption requires the client to manage encryption and decryption entirely outside AWS.
Encryption in transit is achieved using HTTPS (SSL/TLS), and bucket policies can enforce its use.

--- 
S3 Default Encryption
Introduction to Default Encryption and Bucket Policies
This lecture covers the topic of default encryption in Amazon S3 and how bucket policies can be used to enforce encryption requirements.

By default, all new S3 buckets have default encryption enabled using SSE-S3. This encryption is automatically applied to new objects uploaded to these buckets.

You can change the default encryption method to a different option, such as SSE-KMS, if desired.

Enforcing Encryption with Bucket Policies
In addition to default encryption, you can enforce encryption by using bucket policies. These policies can refuse any API call to put an S3 object without the correct encryption headers.

For example, a bucket policy can deny a PUT object request if the encryption header does not specify AWS KMS (SSE-KMS). Similarly, it can deny requests that do not include a customer-side encryption algorithm (SSE-C).

Here is an example scenario:

If a PUT object request does not have the encryption header specifying AWS KMS, then the request is denied.
If the upload does not specify a customer-side encryption algorithm (SSE-C), then the request is denied.
This example illustrates that bucket policies can be used to enforce encryption requirements on your buckets proactively.

It is important to note that bucket policies are always evaluated before your default encryption settings.

Summary
To summarize:

Default encryption is enabled by default with SSE-S3 on new buckets.
You can change the default encryption method to your preferred option, such as SSE-KMS.
Bucket policies can be applied to enforce encryption by denying requests without the correct encryption headers.
Bucket policies take precedence and are evaluated before default encryption settings.
That concludes this lecture on default encryption and bucket policies in Amazon S3.

Key Takeaways
All new S3 buckets have default encryption enabled with SSE-S3.
Default encryption can be changed to other methods such as SSE-KMS.
Bucket policies can enforce encryption by denying PUT requests without the correct encryption headers.
Bucket policies are evaluated before default encryption settings.