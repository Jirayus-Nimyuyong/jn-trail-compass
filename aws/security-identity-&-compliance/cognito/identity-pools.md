Cognito Identity Pools – Diagram

---

Cognito Identity Pools – Diagram with CUP

---

Cognito Identity Pools – IAM Roles

• Default IAM roles for authenticated and guest users
• Define rules to choose the role for each user based on the user’s ID
• You can partition your users’ access using policy variables
• IAM credentials are obtained by Cognito Identity Pools through STS
• The roles must have a “trust” policy of Cognito Identity Pools

---

Cognito Identity Pools – Guest User example

---

Cognito Identity Pools – Policy variable on S3

---

Cognito Identity Pools – Policy variable on S3

---

Cognito User Pools vs Identity Pools

• Cognito User Pools (for authentication = identity verification)
• Database of users for your web and mobile application
• Allows to federate logins through Public Social, OIDC, SAML…
• Can customize the hosted UI for authentication (including the logo)
• Has triggers with AWS Lambda during the authentication flow
• Adapt the sign-in experience to different risk levels (MFA, adaptive authentication, etc…)
• Cognito Identity Pools (for authorization = access control)
• Obtain AWS credentials for your users
• Users can login through Public Social, OIDC, SAML & Cognito User Pools
• Users can be unauthenticated (guests)
• Users are mapped to IAM roles & policies, can leverage policy variables
• CUP + CIP = authentication + authorization

---

Cognito Identity Pools
Introduction to Cognito Identity Pools
Let's discuss a service named Cognito Identity Pools, also known as Federated Identities. Although it shares the Cognito name, it is quite different from Cognito User Pools, which can be confusing. Despite this, both fall under the Cognito umbrella.

Our users exist outside of the AWS environment. They could be users of web or mobile applications who want to access AWS resources such as DynamoDB tables or S3 buckets. To do this, they require temporary AWS credentials.

Creating regular IAM users for these external users is not scalable and not secure since we do not fully trust them. Instead, we provide access through Cognito Identity Pools, which allow users to log in via trusted third-party identity providers.

These trusted third-party providers include public providers such as Amazon, Facebook, Google, and Apple. Additionally, users already authenticated with Cognito User Pools, OpenID Connect Providers, SAML Providers, or custom Developer Authenticated Identities (custom login servers) can also be supported.

Cognito Identity Pools also allow unauthenticated guest users to access AWS by defining a Guest Policy. This means guest users can receive AWS credentials with limited permissions.

Once users obtain these temporary AWS credentials, they can directly access AWS services through API calls using SDKs or via API Gateway. These credentials come with IAM policies defined within the Cognito Identity Pool, which can be customized based on the user's identity for fine-grained access control.

How Cognito Identity Pools Work
Consider web and mobile applications that need access to private S3 buckets and DynamoDB tables. Instead of creating IAM users for each application user, we leverage Cognito Identity Pools. Users first authenticate and obtain a login token from identity providers such as Cognito User Pools, Google, Facebook, SAML, or OpenID Connect.

Users then present this token to the Cognito Identity Pool service, which verifies the token with the respective provider. Upon successful validation, the Identity Pool communicates with the AWS Security Token Service (STS) to obtain temporary AWS credentials for the users.

These temporary credentials are returned to the applications, enabling direct access to AWS resources with permissions defined by associated IAM policies. This process is distinct from Cognito User Pools but shares common elements, especially regarding identity providers.

Integration of Cognito Identity Pools with Cognito User Pools
When using Cognito Identity Pools with Cognito User Pools, users authenticate through the User Pool and obtain a token. This token is then exchanged with the Identity Pool for AWS credentials.

Centralizing user identities in Cognito User Pools allows management of internal users as well as federated identities from social providers, SAML, and OpenID Connect. All users appear in the User Pool database.

The web and mobile applications exchange the JWT token obtained from the User Pool with the Identity Pool. The Identity Pool verifies the token and requests temporary credentials from STS, which are then returned to the applications for direct AWS access.

Role Assignment and IAM Policies in Cognito Identity Pools
Cognito Identity Pools allow defining default IAM roles for both authenticated and guest users. Guest users receive one IAM role, while authenticated users receive another. Rules can be established to assign roles based on user identity.

IAM policies can be customized using policy variables, enabling fine-grained access control. This ensures users only access the AWS resources they are authorized for, such as specific DynamoDB items or S3 bucket prefixes.

The temporary IAM credentials are obtained by the Identity Pool through STS. The IAM roles must have trust policies that allow Cognito Identity Pools to assume them for this mechanism to work.

Example IAM Policies for Guest and Authenticated Users
For guest users, an IAM policy might allow simple read access, such as performing a GetObject operation on a specific S3 bucket object (e.g., a picture). This provides limited and secure access for guests.

For authenticated users, policy variables can be used to restrict access to only the parts of an S3 bucket that correspond to their user identity. For example, users can access objects under a prefix matching their user ID, ensuring they only access their own data.

Similarly, in DynamoDB, policies can restrict users to perform actions only on items where the partition key matches their user ID, effectively implementing row-level security.

These advanced IAM policies enable secure, fine-grained access control tailored to each user's identity, enhancing security and user experience.

This concludes the theory lecture on Cognito Identity Pools. The next lecture will focus on practical implementation.

Key Takeaways
Cognito Identity Pools provide temporary AWS credentials to users outside the AWS environment, enabling secure access to AWS resources.
Users can authenticate through various identity providers including social logins, Cognito User Pools, OpenID Connect, SAML, or custom developer authentication.
Identity Pools support both authenticated users and unauthenticated guest users, each with customizable IAM roles and policies.
Fine-grained access control is achievable by using IAM policy variables based on user identity, enabling secure access to specific resources like S3 prefixes or DynamoDB rows.

---

Cognito Identity Pools Hands On
Introduction to Cognito Identity Pools
Let's go ahead and practice using Cognito Identity Pool. To start, navigate to Cognito Identity on the left panel and create a new identity pool.

Configuring Access Types
First, choose whether you want authenticated access and/or guest access. For authenticated access, you must define the source of authentication. Options include Amazon Cognito user pool, Facebook, Google, Apple, Amazon, Twitter, OIDC, SAML, or a custom developer provider.

Since we have previously created an Amazon Cognito user pool, we can safely select this option. If you want guest access enabled so that anyone can access the pool and obtain IAM credentials, enable guest access as well.

After enabling both authenticated and guest access, click on Next to configure permissions.

Creating IAM Roles for Identity Pool
You need to create an authenticated role. This role will be assumed by users authenticating into your identity pool. For example, name it Cognito Identity Pool Authenticated Role Demo. This role should contain the permissions users will have once they obtain access to AWS. Initially, assign minimal policies; you can add more permissions later.

Similarly, create a guest role, for example, Unauthenticated Role Demo, with minimal permissions. Then click Next.

Specifying User Pool Details
Since Amazon Cognito user pool is the login source, specify the pool ID and app client ID that you created earlier.

Role Settings
Decide whether to use the default authenticated role created for this pool or to have roles with rules. You can assign different roles based on claims in tokens or other criteria. To keep it simple, use the default authenticated role.

You can be very specific about which users get which roles and map user attributes into IAM policies. For example, you can use the username or client attributes for access control. This advanced feature allows you to specify what users can and cannot access based on their attributes.

Click Next and name the identity pool, for example, Demo Identity Pool. Choose whether to use classic authentication; the default setting is fine. Then click Next and create the identity pool.

Reviewing Identity Pool Access
Once created, click on the identity pool. You will see that both authenticated and guest access are enabled.

Integrating SDK and Authentication
To get started, set up the SDK and integrate it into your code. Authenticate a user using the SDK, then retrieve AWS credentials. This part cannot be demonstrated here but is essential for practical use.

Modifying IAM Roles
Go to IAM and find the roles by searching for "Cognito". You will find the authenticated and unauthenticated roles. Modify these roles to set the appropriate policies for your users authenticating through the identity pool.

For example, create an inline policy for Amazon S3 with read permissions or add other policies as needed. This customization controls what authenticated users can access.

Once you understand this process, you have grasped the core concept behind Cognito Identity Pools. This concludes the demonstration.

Key Takeaways
Created a Cognito Identity Pool with both authenticated and guest access.
Configured authenticated and unauthenticated IAM roles with minimal permissions.
Linked the identity pool to an existing Amazon Cognito user pool for authentication.
Explained how to modify IAM roles to assign specific permissions for authenticated users.

---
Cognito User Pools vs Cognito Identity Pools
Understanding Cognito User Pools and Identity Pools
In this lecture, we will explore the differences between Cognito User Pools and Identity Pools. By now, you should have a good idea of their distinct purposes and functionalities.

Cognito User Pools: Authentication and User Database
Cognito User Pools are used for authentication, which means verifying the identity of users. Essentially, it acts as a database of users for your web and mobile applications. It supports federation for logins, allowing users to sign in using social providers such as Google, Facebook, Amazon, or via OpenID Connect (OIDC), as well as corporate logins using SAML.

The User Pools can be customized, including the hosted UI for authentication where you can add your logo. Integration with AWS Lambda is possible during the authentication flow for pre- and post-authentication triggers. Additionally, the sign-in experience can be adapted to different risk levels using adaptive authentication, enabling multi-factor authentication (MFA) when appropriate.

Cognito Identity Pools: Authorization and Access Control
Cognito Identity Pools are designed for authorization or access control within AWS. They provide access control from within the AWS environment. For example, if you have a mobile application and you want users to access AWS resources such as DynamoDB databases or S3 buckets, you need to grant them authorization. This is achieved by using Cognito Identity Pools.

Identity Pools provide temporary AWS credentials to users. The login process to obtain these credentials can be done through social providers, OIDC, SAML, or even Cognito User Pools. This means that wherever your user is identified, they can exchange their token for authorization credentials.

Using Cognito Identity Pools with or without User Pools
You can use Cognito Identity Pools in conjunction with Cognito User Pools, or you can use Identity Pools on their own. One of the benefits of using Identity Pools is that users can be unauthenticated guests. Once users are set up in an Identity Pool, they are mapped to specific IAM roles and policies. Policy variables can be leveraged to grant access to specific AWS resources, such as DynamoDB tables or S3 buckets.

When you use Cognito User Pools with Cognito Identity Pools, you get authentication first and authorization second.

Practical Example: Accessing AWS Resources with Per-User Security
Consider a web or mobile application where users need to access a private S3 bucket and a DynamoDB table with per-user security. The best practice is to first perform login and obtain a token from Cognito User Pools. This internal user database supports federated logins via SAML, OpenID Connect, Google, or Facebook.

Once the user's identity is verified, the token can be exchanged for temporary AWS credentials through Cognito Identity Pools. This integration uses AWS Security Token Service (STS) to issue temporary credentials. The application can then make API calls directly to AWS services. Cognito Identity Pools ensure that the IAM policies attached to these temporary credentials allow users to perform only the actions they are authorized to do.

Summary
By now, you should clearly understand the differences between Cognito User Pools and Identity Pools. User Pools handle authentication and user management, while Identity Pools provide authorization and access control to AWS resources. Combining both allows for secure, scalable user authentication and fine-grained access control in your applications.

Key Takeaways
Cognito User Pools are used for authentication, serving as a user database for web and mobile applications.
Cognito Identity Pools provide authorization, granting temporary AWS credentials for access control within AWS services.
User Pools support social and corporate logins via federation, and allow customization of the authentication UI and flow.
Identity Pools can be used alone or with User Pools, enabling both authenticated and guest user access with fine-grained IAM role mapping.