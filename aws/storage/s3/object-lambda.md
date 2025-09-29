S3 Object Lambda
• Use AWS Lambda Functions to
change the object before it is
retrieved by the caller application
• Only one S3 bucket is needed, on
top of which we create S3 Access
Point and S3 Object Lambda Access
Points.
• Use Cases:
• Redacting personally identifiable
information for analytics or non-
production environments.
• Converting across data formats, such
as converting XML to JSON.
• Resizing and watermarking images on
the fly using caller-specific details, such
as the user who requested the object.

---
S3 Object Lambda
Introduction to S3 Object Lambda
There is another use case for EFS three access points called S3 Object Lambda. The idea is that you have an S3 bucket, but you want to modify the object just before it is retrieved by a client application. Instead of duplicating buckets to have different versions of each object, we can use S3 Object Lambda instead. For this, we need the S3 access points that we just saw.

How S3 Object Lambda Works
Imagine we have the cloud and an S3 bucket in it. An e-commerce application owns the data in this S3 bucket and can access it directly to put and get the original objects. However, an analytics application may want to access only a redacted version of the object, meaning some data has been removed. Instead of creating a new S3 bucket for this, we create an S3 access point on top of the S3 bucket connected to a Lambda function.

A Lambda function allows you to run a bit of code in the cloud very easily. This Lambda function will redact the object as it is being retrieved. On top of this Lambda function, we create an S3 Object Lambda access point. This is how the analytics application accesses our S3 bucket.

To summarize, the analytics application accesses our S3 Object Lambda access points, which invoke our Lambda function. The Lambda function retrieves data from the S3 bucket and runs code to redact the data. Therefore, the analytics application obtains a redacted object from the very same S3 bucket as the e-commerce application.

Enriching Data with S3 Object Lambda
Similarly, a marketing application may want access to an enriched object. They have a customer loyalty database to enhance the data. Instead of creating a new S3 bucket and all enriched objects, we use another Lambda function. This function enriches the data by looking it up from the customer loyalty database. We create another S3 Object Lambda access point on top of it. The marketing application accesses this access point to get the enriched objects.

As you can see, we only need one S3 bucket but can create access points and Object Lambda to modify the data as we wish.

Use Cases for S3 Object Lambda
Use cases include redacting personally identifiable information (PII) for analytics or non-production environments. It can also convert data from XML to JSON or perform any kind of transformation you want. For example, resizing and watermarking images on the fly, where the watermark is specific to the user who requests the object. This is a cool usage for S3 Object Lambda.

Conclusion
I hope you liked this explanation of S3 Object Lambda, and I will see you in the next lecture.

Key Takeaways
S3 Object Lambda allows modification of S3 objects on retrieval without duplicating buckets.
S3 access points combined with Lambda functions enable dynamic data redaction and enrichment.
Use cases include redacting personally identifiable information, transforming data formats, and customizing images on the fly.
This approach supports multiple applications accessing the same S3 bucket with different data views through Lambda-powered access points.