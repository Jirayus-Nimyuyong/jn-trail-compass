Lambda Environment Variables

• Environment variable = key / value pair in “String” form
• Adjust the function behavior without updating code
• The environment variables are available to your code
• Lambda Service adds its own system environment variables as well
• Helpful to store secrets (encrypted by KMS)
• Secrets can be encrypted by the Lambda service key, or your own CMK

---

Lambda Environment Variables
Lambda Environment Variables
Now that we have completed all Lambda invocations, let's proceed to explore more Lambda configurations and deployments.

Lambda has the concept of environment variables. What are they? They are key-value pairs in string form that help you adjust the function's behavior without updating your code.

The environment variables will be available to your code, and the Lambda service will also provide its own system environment variables on top of those. This is quite common when programming to use environment variables, and they are supported for Lambda.

A notable feature is that we can encrypt these environment variables, for example, by using AWS Key Management Service (KMS) to store secret values securely.

The secrets can be encrypted either by the Lambda service key or by your own customer master key.

Let's proceed with some practical exercises involving environment variables.

Key Takeaways
Lambda environment variables are key-value pairs in string form that allow adjusting function behavior without code changes.
These environment variables are accessible to your code and supplemented by Lambda's own system environment variables.
Lambda supports encryption of environment variables using AWS KMS, either with the Lambda service key or a customer master key.
Using environment variables is a common and effective practice in programming to manage configuration and secrets.
