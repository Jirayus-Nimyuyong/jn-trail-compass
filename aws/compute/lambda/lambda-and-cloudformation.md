Lambda and CloudFormation – inline

• Inline functions are very
simple
• Use the Code.ZipFile
property
• You cannot include function
dependencies with inline
functions

---

Lambda and CloudFormation – through S3

• You must store the Lambda zip in S3
• You must refer the S3 zip location in
the CloudFormation code
• S3Bucket
• S3Key: full path to zip
• S3ObjectVersion: if versioned bucket
• If you update the code in S3, but
don’t update S3Bucket, S3Key or
S3ObjectVersion, CloudFormation
won’t update your function

---

Lambda and CloudFormation – through S3 Multiple accounts

---

Lambda and CloudFormation
Uploading Lambda Functions with CloudFormation
CloudFormation allows us to upload Lambda functions in two primary ways. The first method is to define the Lambda code inline within the CloudFormation template itself.

In the screenshot example, the Lambda function code is embedded directly in the template using the Code.ZipFile property. This approach is feasible for very simple functions.

However, the inline method does not support including function dependencies. Therefore, it is only suitable for use cases where the Lambda function code does not require any external libraries or packages.

The second method involves packaging the Lambda function code as a zip file and storing it in Amazon S3. The CloudFormation template then references this zip file.

To use this method, you must upload the Lambda function zip file to an S3 bucket. The CloudFormation template needs to specify the S3 bucket name, the S3 key (which is the full path to the zip file), and optionally the S3 object version if the bucket has versioning enabled.

Including the S3 object version is recommended because if you update the code in S3 but do not update the bucket, key, or object version in the CloudFormation template, CloudFormation will not detect the change and will not update the Lambda function.

With versioning enabled, when you overwrite the file and specify a new S3 object version in the template, CloudFormation will detect the change and update your Lambda function accordingly.

Deploying Lambda Functions Across Multiple AWS Accounts
If you want to deploy a Lambda function through CloudFormation into multiple AWS accounts, such as Account 2 and Account 3, while the Lambda code is stored in an S3 bucket in Account 1, there are some considerations.

First, you launch CloudFormation in Account 2 or Account 3. The CloudFormation template in these accounts will reference the S3 bucket located in Account 1.

To ensure that Account 2 and Account 3 have access to the Lambda code in Account 1's S3 bucket, you need to configure a bucket policy on the S3 bucket in Account 1. This policy should allow CloudFormation in the other accounts to access the code.

Additionally, you should define an execution role for the CloudFormation service in the target accounts. This role must have permissions to get and list objects in the S3 bucket of Account 1.

Together, the bucket policy and the execution role enable CloudFormation to retrieve the Lambda code from the S3 bucket and create the Lambda function in the target accounts.

The same approach applies for Account 3 or any other accounts you want to deploy the Lambda function to, ensuring proper bucket policies and execution roles are in place.

This setup involves some security considerations, but it is straightforward once you understand how to combine bucket policies and execution roles to grant the necessary access.

This concludes the lecture on uploading Lambda functions using CloudFormation. The next lecture will include a hands-on demonstration.

Key Takeaways
CloudFormation supports two methods to upload Lambda functions: inline code and zipped files stored in S3.
Inline Lambda code is suitable only for simple functions without dependencies.
Using zipped Lambda code stored in S3 requires specifying the bucket, key, and optionally the object version to ensure updates are recognized.
Deploying Lambda functions across multiple AWS accounts requires appropriate S3 bucket policies and CloudFormation execution roles to grant access.