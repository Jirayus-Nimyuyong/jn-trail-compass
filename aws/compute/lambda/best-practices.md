AWS Lambda Best Practices

• Perform heavy-duty work outside of your function handler
• Connect to databases outside of your function handler
• Initialize the AWS SDK outside of your function handler
• Pull in dependencies or datasets outside of your function handler
• Use environment variables for:
• Database Connection Strings, S3 bucket, etc… don’t put these values in your code
• Passwords, sensitive values… they can be encrypted using KMS
• Minimize your deployment package size to its runtime necessities.
• Break down the function if need be
• Remember the AWS Lambda limits
• Use Layers where necessary
• Avoid using recursive code, never have a Lambda function call itself

---

Lambda Best Practices
Lambda Best Practices
In this section, we have learned a lot about Lambda. These best practices are essential, especially when preparing for the exam.

Optimize Function Handler Execution
You need to perform heavy-duty work outside of your function handler to minimize the amount of time your handler runs. This means:

Connect your databases outside of your function handler.
Initialize the AWS SDK outside of your handler.
Build any dependencies or datasets outside of your function handler.
Use Environment Variables
Use environment variables for anything that changes over time, such as:

Database connection strings
S3 bucket names
Do not hardcode these values in your code. For passwords and sensitive values, encrypt these environment variables using AWS Key Management Service (KMS).

Minimize Deployment Package Size
Minimize your deployment package size to include only runtime necessities. If your function is too large, break it down into smaller functions. Remember the Lambda limits on package size.

If you need to reuse libraries, consider leveraging Lambda layers.

Avoid Recursive Lambda Calls
Never have a Lambda function call itself. This will lead to disastrous results and can be very expensive.

That concludes this lecture. I hope you found it helpful, and I will see you in the next lecture.

Key Takeaways
Perform heavy-duty work outside of your Lambda function handler to minimize execution time.
Use environment variables for dynamic values like database connection strings and S3 bucket names.
Encrypt sensitive environment variables using AWS KMS.
Minimize deployment package size and consider using Lambda layers for reusable libraries.
Avoid recursive Lambda function calls to prevent costly failures.