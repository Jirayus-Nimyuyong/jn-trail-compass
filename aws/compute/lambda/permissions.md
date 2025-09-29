Lambda Execution Role (IAM Role)

• Grants the Lambda function permissions to AWS services / resources
• Sample managed policies for Lambda:
• AWSLambdaBasicExecutionRole – Upload logs to CloudWatch.
• AWSLambdaKinesisExecutionRole – Read from Kinesis
• AWSLambdaDynamoDBExecutionRole – Read from DynamoDB Streams
• AWSLambdaSQSQueueExecutionRole – Read from SQS
• AWSLambdaVPCAccessExecutionRole – Deploy Lambda function in VPC
• AWSXRayDaemonWriteAccess – Upload trace data to X-Ray.

• When you use an event source mapping to invoke your function, Lambda
uses the execution role to read event data.
• Best practice: create one Lambda Execution Role per function

---

Lambda Resource Based Policies

• Use resource-based policies to give other accounts and AWS services
permission to use your Lambda resources
• Similar to S3 bucket policies for S3 bucket
• An IAM principal can access Lambda:
• if the IAM policy attached to the principal authorizes it (e.g. user access)
• OR if the resource-based policy authorizes (e.g. service access)
• When an AWS service like Amazon S3 calls your Lambda function, the
resource-based policy gives it access.

---

Lambda Permissions - IAM Roles & Resource Policies
Lambda Execution Roles and Permissions
Let's discuss Lambda execution roles and permissions. Although we've covered much of this in hands-on sessions, revisiting the theory will reinforce understanding.

An IAM Role must be attached to your Lambda function. This role grants the Lambda function permission to access AWS services and resources.

There are several simple managed policies for Lambda that we can reuse. For example:

BasicExecutionRole: Allows uploading logs to CloudWatch.
KinesisExecutionRole: Grants permission to read from Kinesis.
DynamoDBExecutionRole: Allows reading from DynamoDB streams.
SQSQueueExecutionRole: Enables reading from SQS.
LambdaVPCAccessExecutionRole: Permits deploying Lambda functions inside a VPC.
XrayDaemonWriteAccess: Allows uploading trace data to X-Ray.
These are managed policies, but we can also create our own custom policies for Lambda functions.

Whenever we use an event source mapping to invoke our function, Lambda reads the data. Therefore, we must use an execution role to read the event data.

Conversely, if the Lambda function is invoked by other services, we might not need a specific IAM Role with particular permissions.

By the way, the best practice is to create one Lambda execution role per function, as we have done so far in the hands-on exercises.

This applies for event source mappings or if our Lambda function needs to invoke other services.

Resource-Based Policies for Lambda
What if our Lambda function is invoked by other services? In that case, we use resource-based policies. These policies grant other AWS accounts or services permission to use your Lambda resources, such as invoking the function.

This is very similar to an Amazon S3 bucket policy.

The rule is that an IAM principal can access your Lambda function if one of these two conditions is met:

The IAM policy attached to the principal authorizes access. For example, an IAM user with full permissions can access the Lambda function, as we have done with our administrator access policy.
A resource-based policy authorizes access to the Lambda function. This is particularly helpful for service-to-service access.
For instance, when another AWS service like Amazon S3 wants to invoke our Lambda function, the resource-based policy must grant it access.

The AWS Management Console handles this automatically behind the scenes, but if you are doing your own integrations, this is where you would configure it manually.

Let's proceed to the console to see how this works in practice.

Key Takeaways
Lambda functions require an IAM execution role to access AWS services and resources.
AWS provides managed policies like BasicExecutionRole, KinesisExecutionRole, and others for common Lambda permissions.
Best practice is to create one Lambda execution role per function.
Resource-based policies allow other AWS accounts or services to invoke your Lambda functions, enabling service-to-service access.
