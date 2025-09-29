Amazon S3 - Versioning

• You can version your files in Amazon S3
• It is enabled at the bucket level
• Same key overwrite will change the “version”: 1, 2, 3….
• It is best practice to version your buckets
• Protect against unintended deletes (ability to restore a version)
• Easy roll back to previous version
• Notes:
• Any file that is not versioned prior to enabling versioning will
have version “null”
• Suspending versioning does not delete the previous versions

---
S3 Versioning
Introduction to Amazon S3 Versioning
Now, let's talk about versioning in Amazon S3. We have already seen how to create a website, but it would be beneficial to update it in a safe way. Versioning your files in Amazon S3 is a feature you can enable at the bucket level.

For example, if you have a bucket with versioning enabled, whenever a user uploads a file, it creates a version of that file at the selected key. If the same key is uploaded again, effectively overwriting the file, it creates version two, then version three, and so on.

Therefore, it is best practice to enable versioning on your buckets. This provides protection against unintended deletes. For instance, if you delete a file version, Amazon S3 actually adds a delete marker instead of permanently removing it. This allows you to restore previous versions that existed before the deletion.

Additionally, versioning allows you to easily roll back to a previous version. If you want to revert to the state of a file from two days ago, you can simply take that file version and roll it back.

Important Notes About Versioning
Any file that existed prior to enabling versioning will have a version ID of null.
Suspending versioning does not delete previous versions; it is a safe operation.
Now, let's go into the AWS console and see how we can use versioning.

Key Takeaways
Amazon S3 versioning allows safe updates by creating multiple versions of files under the same key.
Enabling versioning at the bucket level is a best practice to protect against unintended deletes.
Deleting a file version adds a delete marker, enabling restoration of previous versions.
Suspending versioning does not delete existing versions, making it a safe operation.