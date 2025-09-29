API Gateway – Security 

IAM Permissions

• Create an IAM policy authorization and attach to User / Role
|
Authorization = IAM Policy
• Authentication = IAM
• Good to provide access within AWS (EC2, Lambda, IAM users…)
• Leverages “Sig v4” capability where IAM credential are in headers

---

API Gateway – Resource Policies

• Resource policies (similar
to Lambda Resource
Policy)
• Allow for Cross Account
Access (combined with
IAM Security)
• Allow for a specific source
IP address
• Allow for a VPC Endpoint

---

API Gateway – Security
Cognito User Pools

• Cognito fully manages user lifecycle, token expires automatically
• API gateway verifies identity automatically from AWS Cognito
• No custom implementation required
• Authentication = Cognito User Pools | Authorization = API Gateway Methods

---

Lambda Authorizer (formerly Custom
Authorizers)

• Token-based authorizer (bearer token) – ex JWT (JSON Web Token) or Oauth
• A request parameter-based Lambda authorizer (headers, query string, stage var)
• Lambda must return an IAM policy for the user, result policy is cached
Authentication = External | Authorization = Lambda function

---

API Gateway – Security – Summary

• IAM:
• Great for users / roles already within your AWS account, + resource policy for cross account
• Handle authentication + authorization
• Leverages Signature v4
• Custom Authorizer:
• Great for 3rd party tokens
• Very flexible in terms of what IAM policy is returned
• Handle Authentication verification + Authorization in the Lambda function
• Pay per Lambda invocation, results are cached
• Cognito User Pool:
• You manage your own user pool (can be backed by Facebook, Google login etc…)
• No need to write any custom code
• Must implement authorization in the backend

---

API Gateway Authentication and Authorization
Introduction to API Gateway Security
This lecture covers API Gateway security, a complex but essential topic. To aid understanding, numerous diagrams are included.

IAM Permissions for API Gateway Access
The first method uses IAM permissions to access your API Gateway. This approach involves attaching an IAM policy to a user or role, enabling invocation of the API Gateway. Authentication is handled through IAM, and authorization is enforced by the IAM policy. This method is optimal for securing API Gateway when accessed within your AWS accounts, including EC2 instances, Lambda functions, and IAM users.

To pass IAM credentials to the API Gateway, Signature Version 4 is leveraged. Credentials are signed and placed into request headers.

Consider an example where the API Gateway is deployed to a stage and secured with IAM permissions, with a backend of Lambda functions. Clients make REST API calls including SigV4 headers. The API Gateway decrypts these headers and verifies authorization with IAM policies. Upon successful authorization, the API Gateway invokes the backend Lambda function and returns the result to the client. This is a straightforward permission model.

Resource Policies
Resource policies function similarly to Lambda resource policies, allowing you to define who and what can access your API Gateway. The primary use case is cross-account access, where you define a resource policy combined with IAM security to grant access to users or roles in other AWS accounts.

Resource policies can also filter access by specific IP addresses or restrict access to a VPC Endpoint. This adds a layer of control on top of IAM permissions.

Cognito User Pools
The second category of security involves Amazon Cognito User Pools, which manage a database of users and handle the entire user lifecycle. Tokens issued by Cognito expire automatically. API Gateway verifies the identity of users connecting with Cognito tokens without requiring custom implementation.

Users authenticate with Cognito User Pools to obtain a token. This token is then passed in API calls to the API Gateway. The API Gateway integrates directly with Cognito User Pools to validate tokens. If the token is valid, access to the backend Lambda function is granted. Authorization is configured at the API Gateway method level.

Lambda Authorizer (Custom Authorizer)
The third method is the Lambda Authorizer, formerly known as the Custom Authorizer. This is the most flexible but requires the most involvement. It is a token-based authorizer using bearer tokens such as JSON Web Tokens (JWT) or OAuth tokens.

Request parameters, headers, or query strings are passed to the Lambda Authorizer function. The Lambda function evaluates the token and, if valid, returns an IAM policy for the requesting client. This policy is cached for performance.

Authentication is external and must be handled by you. Authorization logic is implemented within the Lambda function.

The following diagram illustrates this flow:

The API Gateway has a backend Lambda function.
Clients authenticate with a third-party authentication system (e.g., Auth0) and obtain a token.
The token is passed to the API Gateway via headers or request parameters.
The API Gateway invokes the Lambda Authorizer, passing the token and context.
The Lambda Authorizer verifies the token, possibly by contacting the third-party system.
If valid, the Lambda Authorizer returns an IAM principal and policy, which is cached.
The API Gateway then invokes the backend Lambda function.
Summary for Exam Preparation
IAM security is ideal when users and roles exist within your AWS accounts. For cross-account access, resource policies are necessary.
IAM leverages Signature Version 4 for authentication and authorization.
Lambda Authorizers are suitable when using third-party user databases. They require custom authentication and authorization logic in the Lambda function. Although results are cached, Lambda invocations incur cost and latency.
Cognito User Pools manage user authentication without custom code. Authorization must be implemented in backend Lambda functions.
Console Demonstration of Security Options
In the API Gateway console, selecting any method under resources and clicking on Method Request allows setting the authorization type. Currently, the available option is IAM, which checks IAM user policies and roles. This is useful when all resources are within your AWS accounts and uses Signature Version 4.

Resource policies can be defined on the left-hand side with templates such as cross-account access, IP range blacklists, or source VPC whitelists. Combining cross-account resource policies with IAM security provides full control over API Gateway access.

New authorizers can be created on the left-hand side. Two types are available:

Lambda Authorizer (custom): Requires specifying a Lambda function and optional caching.
Cognito User Pool: Requires specifying the ARN of the Cognito User Pool and is simpler to set up.
These options provide advanced security configurations accessible via the console.

This concludes the overview of API Gateway authentication and authorization methods.

Key Takeaways
IAM permissions provide optimal security for API Gateway within AWS accounts using Signature Version 4.
Resource policies enable cross-account access and IP or VPC endpoint filtering for API Gateway.
Cognito User Pools manage user lifecycle and token verification without custom code, integrating directly with API Gateway.
Lambda Authorizers offer flexible, token-based authorization requiring custom Lambda functions and external authentication systems.

