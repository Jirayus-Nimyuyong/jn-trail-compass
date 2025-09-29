<!-- Lambda – Function URL

• Dedicated HTTP(S) endpoint for your Lambda function
• A unique URL endpoint is generated for you (never changes)
• https://<url-id>.lambda-url.<region>.on.aws (dual-stack IPv4 & IPv6)
• Invoke via a web browser, curl, Postman, or any HTTP client
• Access your function URL through the public Internet only
• Doesn’t support PrivateLink (Lambda functions do support)
• Supports Resource-based Policies & CORS configurations
• Can be applied to any function alias or to $LATEST (can’t be
applied to other function versions)
• Create and configure using AWS Console or AWS API
• Throttle your function by using Reserved Concurrency

---

Lambda – Function URL Security

• Resource-based Policy
• Authorize other accounts / specific CIDR / IAM principals
• Cross-Origin Resource Sharing (CORS)
• If you call your Lambda function URL from a different domain
• AuthType NONE – allow public and unauthenticated access
• Resource-based Policy is always in effect (must grant public access)
• AuthType AWS_IAM – IAM is used to authenticate and authorize requests
• Both Principal’s Identity-based Policy & Resource-based Policy are evaluated
• Principal must have lambda:InvokeFunctionUrl permissions
• Same account – Identity-based Policy OR Resource-based Policy as ALLOW
• Cross account – Identity-based Policy AND Resource Based Policy as ALLOW

---
Lambda Function URL
Introduction to Lambda Function URL
Let's discuss Lambda function URL. What if you want to expose your Lambda function as an HTTP endpoint without the hassle of using API Gateway or an application load balancer? You can use a function URL, which provides a unique URL endpoint that never changes for your Lambda function. This URL supports both IPv4 and IPv6.

Once you publish your Lambda function as a function URL, you can access it and perform HTTPS requests using a web browser, command line, Postman, or any HTTP client. However, this function URL can only be accessed through the public internet. If you require private access with a private URL, this method will not work.

If you access the function URL from a different domain, you can configure Cross-Origin Resource Sharing (CORS) settings to enable this. For security, resource-based policies manage access to your Lambda function URL. These policies can be applied to any function alias or to the latest version of your function, but not to specific function versions.

You can create and configure function URLs using the AWS Management Console or the API. If you need throttling to limit how many times your Lambda function can run, you can use the reserved concurrency feature of Lambda to control the maximum number of concurrent executions.

URL Security and Access Control
Regarding URL security, resource-based policies attach to your Lambda function and specify which accounts, IP ranges (CIDR), or IAM principals can access your Lambda function URL. For CORS, similar to Amazon S3, if you call your Lambda function URL from a different domain, you must have CORS security configured.

For example, if your S3 bucket is fronted by CloudFront with a custom URL such as example.com, and your API is hosted as a Lambda function URL at api.example.com, because these domains differ, you need to set the CORS settings on your Lambda function URL to enable cross-domain requests.

Authentication Types
If you set the AuthType to NONE, this allows public and unauthenticated access to your Lambda function. The resource-based policy then determines whether a request is allowed on your function. You must grant public access in the resource policy. For example, allowing principal "*" for InvokeFunctionUrl enables anyone on the internet to access your Lambda function URL.

If you set AuthType to AWS_IAM, then IAM is used to authenticate and authorize requests to your Lambda function. Both the principal's identity-based policy and the resource-based policies are evaluated. You must ensure that between these two policies, there is a lambda:InvokeFunctionUrl permission.

Within the same AWS account, if either the identity-based policy or the resource-based policy allows the API call, access is granted. This is similar to Amazon S3 bucket permissions. However, in cross-account scenarios, both the identity policy and the resource-based policy must allow the access.

For example, in account A, a resource-based policy authorizes a role in account B to access the Lambda function. However, this alone is insufficient. The IAM role in account B must also have an identity-based policy that allows invoking the Lambda function URL of account A. When both policies are in place, the IAM role can successfully use the Lambda function URL of account A.

Conclusion
That concludes this lecture on Lambda function URLs. I hope you found it informative, and I look forward to seeing you in the next lecture.

Key Takeaways
Lambda function URLs provide a unique, permanent HTTPS endpoint for Lambda functions without requiring API Gateway or load balancers.
Function URLs support public internet access only; private access requires other solutions.
Resource-based policies and CORS configurations manage access control and cross-domain requests for Lambda function URLs.
Authentication can be set to NONE for public access or AWS_IAM for IAM-based authorization, requiring proper identity and resource policies especially in cross-account scenarios. -->
