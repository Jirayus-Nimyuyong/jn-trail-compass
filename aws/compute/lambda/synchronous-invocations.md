Lambda – Synchronous Invocations

• Synchronous: CLI, SDK, API Gateway, Application Load Balancer
• Results is returned right away
• Error handling must happen client side (retries, exponential backoff, etc…)

---

Lambda - Synchronous Invocations - Services

• User Invoked:
• Elastic Load Balancing (Application Load Balancer)
• Amazon API Gateway
• Amazon CloudFront (Lambda@Edge)
• Amazon S3 Batch
• Service Invoked:
• Amazon Cognito
• AWS Step Functions
• Other Services:
• Amazon Lex
• Amazon Alexa
• Amazon Kinesis Data Firehose

---

Lambda Synchronous Invocations
Lambda Synchronous Invocations
Let's have a detailed look at the first type of invocation for Lambda functions that we have already been using, called the synchronous invocation.

You are performing a synchronous invocation when you use the CLI, the SDK, the API Gateway, or even an Application Load Balancer.

What does synchronous mean? It means that you are waiting for the results, and then the result will be returned to you. Any errors that come back must be handled on the client side.

For example, if my Lambda function fails and I invoked it from the console, I want to click on the retry button to retry it. This means that any time there is an error on Lambda, the client has to figure out what to do, such as whether to retry it or perform an exponential backoff.

Synchronous invocation means a direct invocation where you wait for the result. The CLI and the SDK simply invoke our Lambda function; the Lambda function performs its task and returns the response.

This is the same when we use the API Gateway in future sections. The clients invoke the API Gateway, which proxies the request to the Lambda function. The Lambda function executes and returns the response to the API Gateway, which then returns the response to the client.

In this schema, we are just waiting for the response, which makes it a synchronous type of invocation.

Services That Invoke Lambda Functions Synchronously
Which services invoke Lambda functions synchronously? First of all, any time it is user-invoked, it is synchronous. This includes:

Elastic Load Balancing through the Application Load Balancer
API Gateway
CloudFront with Lambda@Edge
Anything in bold here is covered in this course, and anything not in bold will not be covered.

Other services that invoke Lambda synchronously include Amazon S3 Batch, Cognito, Step Functions, Lex, Alexa, and Kinesis Data Firehose.

In this section, we will see Application Load Balancer, API Gateway, CloudFront, Cognito, and Step Functions in their respective sections.

Now that we know what services invoke a Lambda function synchronously, let's proceed with a hands-on exercise.

Key Takeaways
Synchronous invocation means waiting for the Lambda function's result before proceeding.
Errors during synchronous invocation must be handled on the client side.
Services such as CLI, SDK, API Gateway, and Application Load Balancer invoke Lambda functions synchronously.
User-invoked Lambda functions and integrations like CloudFront with Lambda@Edge also use synchronous invocation.