Amazon Cognito

• Give users an identity to interact with our web or mobile application
• Cognito User Pools:
• Sign in functionality for app users
• Integrate with API Gateway & Application Load Balancer
• Cognito Identity Pools (Federated Identity):
• Provide AWS credentials to users so they can access AWS resources directly
• Integrate with Cognito User Pools as an identity provider
• Cognito vs IAM: “hundreds of users”, ”mobile users”, “authenticate with SAML”

---

Cognito Overview
Introduction to Amazon Cognito
Amazon Cognito is a service designed to provide users with an identity to interact with web and mobile applications.

These users typically exist outside of our AWS account, which is why the service is named Cognito, as it grants an identity to users we do not yet know.

Components of Amazon Cognito
Amazon Cognito consists of two primary sub-services:

Cognito User Pool
Cognito Identity Pool
Cognito User Pool
The Cognito User Pool provides sign-in functionality for application users. It integrates effectively with API Gateway and the Application Load Balancer.

Cognito Identity Pool
Previously known as Federated Identity, the Cognito Identity Pool provides temporary AWS credentials to users registered with our application, enabling them to access certain AWS resources directly.

There is strong integration between Cognito Identity Pools and Cognito User Pools, as we will see.

Cognito vs IAM Users
You might wonder, "Don't we already have users in IAM?" The answer is yes, but Cognito is intended for your web and mobile application users who exist outside of AWS.

Look for keywords such as hundreds of users, mobile users, or authentication mechanisms like SAML when considering Cognito for your application.

Conclusion
That concludes the overview of Amazon Cognito. I hope you found this information helpful, and I look forward to seeing you in the next lecture.

Key Takeaways
Amazon Cognito provides user identity management for web and mobile applications.
Cognito consists of two main components: User Pools for sign-in functionality and Identity Pools for providing temporary AWS credentials.
Cognito User Pools integrate well with API Gateway and Application Load Balancer.
Cognito is designed for users outside of AWS, unlike IAM users which are for AWS account management.
