Amazon S3 – Static Website Hosting

• S3 can host static websites and have them accessible on
the Internet

• The website URL will be (depending on the region)
• http://bucket-name.s3-website-aws-region.amazonaws.com
OR
• http://bucket-name.s3-website.aws-region.amazonaws.com

• If you get a 403 Forbidden error, make sure the bucket
policy allows public reads!

---
S3 Website Overview
Introduction to Amazon S3 Website Hosting
Amazon S3 can be used to create aesthetic websites. It supports hosting static websites that are accessible on the internet.

The website URL depends on the AWS region where the S3 bucket is created. Although the URLs look very similar, the only difference is that one contains a dash and the other contains a dot. This distinction is not critical to remember but is useful to be aware of.

Setting Up the S3 Bucket for Website Hosting
To host a website, you create an S3 bucket that contains files such as HTML files and images. Then, you enable the bucket to be compatible with hosting a website.

Once configured, the website will have a corresponding URL through which users can access the S3 bucket contents as a website.

Importance of Public Read Permissions
The website will not work if public read permissions are not enabled on the S3 bucket. This is why, in the previous lecture, we learned about S3 bucket policies.

If you encounter a 403 Forbidden error after enabling your S3 bucket for reads, it means that your bucket is not public. Therefore, you must attach an S3 bucket policy that allows public access.

Conclusion
This concludes this short lecture. Next, we will proceed to hands-on practice to apply these concepts.

Key Takeaways
Amazon S3 can host static websites accessible via the internet.
The website URL depends on the AWS region where the S3 bucket is created.
Public read permissions must be enabled on the S3 bucket for the website to be accessible.
S3 bucket policies are essential to allow public access and avoid 403 forbidden errors.