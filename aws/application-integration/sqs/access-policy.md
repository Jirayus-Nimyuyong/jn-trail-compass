SQS Queue Access Policy

Cross Account Access

Publish S3 Event Notifications
To SQS Queue

---

SQS Queue Access Policy
Introduction to SQS Queue Access Policies
SQS Queue Access Policies are similar to S3 Bucket policies in that they are resource policies. These are JSON IAM policies that you add directly onto your SQS Queue. They serve two primary use cases.

Use Case 1: Cross-Account Access
One use case is to allow cross-account access. For example, if you have a queue in one AWS account and another account needs to access that queue, such as an EC2 instance in the second account pulling messages from the queue, you need to create a Queue Access Policy. This policy is attached to the SQS Queue in the first account.

This Queue Access Policy allows the principal AWS account ID (e.g., 111122223333) to perform the sqs:ReceiveMessage action on the specified SQS resource. This setup enables the EC2 instance in the other account to pull messages from the SQS Queue.

Use Case 2: S3 Bucket Event Notifications to SQS
Another use case is when an S3 Bucket publishes event notifications to an SQS Queue. For example, when you upload an object to an S3 Bucket, you may want a message to be automatically sent to an SQS Queue.

In this scenario, the SQS Queue must grant permission to the S3 Bucket to write messages to it. This requires creating an SQS Queue Access Policy that allows the sqs:SendMessage action.

The policy specifies the principal as any AWS account, but includes a condition that the source ARN matches the S3 Bucket's ARN (e.g., arn:aws:s3:::bucket1) and that the source account is the owner of the S3 Bucket. This configuration allows the S3 Bucket to send messages to the SQS Queue securely.

These access policies are important, especially for exam scenarios, where you may be tested on what is required to write to an SQS Queue for cross-account access or for publishing S3 event notifications.

Creating an SQS Queue and Setting Access Policies
Let's create an SQS Queue named events-from-s3 to set up an S3 event notification to send messages to this queue. We will keep the default settings for the queue.

Within the queue settings, you can define which services can send data to the SQS Queue. The basic method allows only the queue owner to send data, while the advanced method lets you specify accounts, IAM users, and roles that can send messages. This is useful for cross-account access control.

Similarly, you can configure who can receive messages from the queue.

Setting Up S3 Event Notifications to SQS
Next, we go to Amazon S3 to create a bucket named demo-sqs-queue-access-policy. After creating the bucket, navigate to its Properties and scroll down to Event Notifications.

Create a new event notification named NewObjects. For the event types, select "All object create events". Set the destination to the SQS Queue events-from-s3.

When saving, you may encounter an error because the SQS Queue Access Policy does not yet allow the S3 Bucket to send messages to it.

Modifying the SQS Queue Access Policy
To resolve the error, modify the SQS Queue Access Policy to allow the S3 Bucket to write messages to the queue. You can find the required policy document in the AWS documentation by searching for "S3 events into SQS access policy".

The policy document includes:

The sqs:SendMessage action.
The resource ARN of the SQS Queue.
A condition specifying that the source ARN matches the S3 Bucket's ARN.
The source account owner matching your AWS account ID.
Update the policy with the correct queue ARN, bucket name, and account ID, then save the policy.

Verifying the Setup
After updating the access policy, save the event notification again in the S3 bucket properties. This time, it should save successfully.

You can verify the integration by checking the SQS Queue for messages. For example, a test event sent by Amazon S3 should appear in the queue, confirming that the S3 Bucket can send messages to the SQS Queue as intended.

Summary
By modifying the SQS Queue Access Policy, we provided the necessary permissions for the S3 Bucket to send event notifications to the SQS Queue. This demonstrates the importance of correctly configuring resource-based policies for cross-service communication within AWS.

Key Takeaways
SQS Queue Access Policies are resource-based JSON IAM policies attached directly to SQS queues.
They enable cross-account access, allowing resources like EC2 instances in different accounts to interact with the queue.
SQS Access Policies are essential for allowing services such as S3 buckets to send event notifications to SQS queues.
Proper configuration of these policies is critical for permissions and successful integration between AWS services.