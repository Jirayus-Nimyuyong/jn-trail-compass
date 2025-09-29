AWS STS – Security Token Service

• Allows to grant limited and temporary access to AWS resources (up to 1 hour).
• AssumeRole: Assume roles within your account or cross account
• AssumeRoleWithSAML: return credentials for users logged with SAML
• AssumeRoleWithWebIdentity
• return creds for users logged with an IdP (Facebook Login, Google Login, OIDC compatible…)
• AWS recommends against using this, and using Cognito Identity Pools instead
• GetSessionToken: for MFA, from a user or AWS account root user
• GetFederationToken: obtain temporary creds for a federated user
• GetCallerIdentity: return details about the IAM user or role used in the API call
• DecodeAuthorizationMessage: decode error message when an AWS API is denied

---

Using STS to Assume a Role

---

Define an IAM Role within your
account or cross-account
• Define which principals can access
this IAM Role
• Use AWS STS (Security Token
Service) to retrieve credentials and
impersonate the IAM Role you
have access to (AssumeRole API)
• Temporary credentials can be valid
between 15 minutes to 1 hour

---

Cross account access with STS

---

STS with MFA

• Use GetSessionToken from STS
• Appropriate IAM policy using
IAM Conditions
• aws:MultiFactorAuthPresent:tru
e
• Reminder, GetSessionToken
returns:
• Access ID
• Secret Key
• Session Token
• Expiration date

---

STS Overview
Introduction to Security Token Service (STS)
Security Token Service, or STS, allows you to obtain temporary security credentials valid for up to one hour. These credentials enable direct access to AWS resources. Understanding the key STS APIs is essential for the AWS Certified Developer exam.

Key STS API Calls
AssumeRole: Used to assume roles within your own AWS accounts or across different accounts, which is fundamental.
AssumeRoleWithSAML: Allows users logged in with SAML to obtain temporary credentials.
AssumeRoleWithWebIdentity: Returns roles for users logged in with an identity provider such as Facebook Login, Google Login, or any OIDC compatible provider. However, this is largely replaced by Cognito Identity Pools now.
GetSessionToken: Used when a user or AWS root account has Multi-Factor Authentication (MFA) enabled.
GetFederationToken: Retrieves temporary credentials for federated users.
GetCallerIdentity: Returns details about the IAM user or role making the API call. This is useful to identify who you are when using AWS.
DecodeAuthorizationMessage: Decodes error messages when AWS API calls are denied.
The most important STS APIs to focus on for the exam are AssumeRole, GetSessionToken, GetCallerIdentity, and DecodeAuthorizationMessage.

How AssumeRole Works
To use AssumeRole, first define an IAM role in your AWS account or in another account if you want cross-account access. Then specify which principals are allowed to access this IAM role through IAM policies. Using the STS API, you call AssumeRole to impersonate the IAM role you have access to. The temporary credentials returned are valid from 15 minutes up to one hour.

AssumeRole Workflow
A user requests access to a role within the same or another AWS account.
The user calls the AssumeRole API on STS.
STS verifies the permissions.
STS returns temporary security credentials.
The user can act as if they were the assumed role using these credentials.
Cross-Account Access
For cross-account access, the process is similar:

Create the role in the target account.
Configure the correct permissions in both your account and the target account.
Use the AssumeRole API to access the target account.
For example, if the role allows access to an S3 bucket, you can access that bucket from your account using the assumed role credentials.

STS with Multi-Factor Authentication (MFA)
Understanding STS with MFA is crucial for the Certified Developer exam. To use MFA, you call the GetSessionToken API from STS after logging in with an MFA device. This API returns temporary credentials including an Access Key ID, a Secret Access Key, and a session token that must be included in API calls.

IAM Policy for MFA
The IAM policy must include the condition aws:MultiFactorAuthPresent:true to enforce MFA. For example, a role might only allow stopping or terminating instances if MFA is present. This explicit condition ensures that sensitive actions require MFA authentication.

GetSessionToken Details
The GetSessionToken API returns:

Access Key ID
Secret Access Key
Session Token
Expiration time of the credentials
The expiration time helps determine when to renew the credentials.

Conclusion
This concludes the overview of Security Token Service (STS). Understanding these APIs and their use cases is essential for managing temporary credentials and secure access in AWS environments.

Key Takeaways
Security Token Service (STS) provides temporary security credentials valid up to one hour for accessing AWS resources.
Important STS API calls include AssumeRole, GetSessionToken, GetCallerIdentity, and DecodeAuthorizationMessage.
AssumeRole allows users to impersonate IAM roles within the same or across AWS accounts.
GetSessionToken is used with MFA to obtain session tokens with explicit IAM policy conditions enforcing MFA presence.
