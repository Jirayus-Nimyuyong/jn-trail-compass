Cognito User Pools (CUP) – User Features

• Create a serverless database of user for your web & mobile apps
• Simple login: Username (or email) / password combination
• Password reset
• Email & Phone Number Verification
• Multi-factor authentication (MFA)
• Federated Identities: users from Facebook, Google, SAML…
• Feature: block users if their credentials are compromised elsewhere
• Login sends back a JSON Web Token (JWT)

---

Cognito User Pools (CUP) – Diagram

---

Cognito User Pools (CUP) - Integrations
• CUP integrates with API Gateway and Application Load Balancer

---

Cognito User Pools – Lambda Triggers
• CUP can invoke a Lambda function synchronously on these triggers:

---

Cognito User Pools – Hosted Authentication UI

• Cognito has a hosted authentication UI
that you can add to your app to handle
sign-up and sign-in workflows
• Using the hosted UI, you have a
foundation for integration with social
logins, OIDC or SAML
• Can customize with a custom logo and
custom CSS

---

CUP – Hosted UI Custom Domain

• For custom domains, you must create an ACM certificate in us-east-1
• The custom domain must be defined in the “App Integration” section

---
CUP – Adaptive Authentication
• Block sign-ins or require MFA if the login appears
suspicious
• Cognito examines each sign-in attempt and generates a risk
score (low, medium, high) for how likely the sign-in request
is to be from a malicious attacker
• Users are prompted for a second MFA only when risk is
detected
• Risk score is based on different factors such as if the user
has used the same device, location, or IP address
• Checks for compromised credentials, account takeover
protection, and phone and email verification
• Integration with CloudWatch Logs (sign-in attempts, risk
score, failed challenges…)

---

Decoding a ID Token; JWT – JSON Web Token
• CUP issues JWT tokens (Base64 encoded):
• Header
• Payload
• Signature
• The signature must be verified to ensure
the JWT can be trusted
• Libraries can help you verify the validity of
JWT tokens issued by Cognito User Pools
• The Payload will contain the user
information (sub UUID, given_name, email,
phone_number, attributes…)
• From the sub UUID, you can retrieve all
users details from Cognito / OIDC

---

Cognito User Pools
Introduction to Cognito User Pools
Cognito User Pools, abbreviated as CUP, is a service that provides a serverless database for your web and mobile application users.

What is a Serverless Database?
A serverless database means that your users can authenticate using simple login credentials such as a username or email combined with a password to access your applications.

Cognito User Pools also enable users to reset their passwords. Additionally, it supports email and phone number verification, multi-factor authentication, and federated identities allowing login through providers like Google, Facebook, or SAML.

Federated Identities
Federated Identities allow users to log in using third-party identity providers such as Google or Facebook. This is the common login experience seen on many websites where users can either create a username and password or use social login options.

There is also a security feature that blocks users if their credentials are compromised elsewhere. AWS scans the web for compromised credentials and notifies Cognito User Pools accordingly.

Authentication Tokens
When users log in through Cognito User Pools, the API returns a JSON Web Token (JWT), which is used for authentication in subsequent requests.

Architecture of Cognito User Pools
Cognito User Pools maintain their own internal database of users. Mobile and web applications authenticate against this user pool. Upon successful login, the user receives a JWT from the pool.

Social and Third-Party Logins
Cognito User Pools support social login through providers such as Amazon, Google, and Facebook. Additionally, it supports integration with identity providers using SAML or OpenID Connect protocols if the provider supports OpenID Connect.

AWS Integrations with Cognito User Pools
Cognito User Pools integrate natively with AWS API Gateway and Application Load Balancer.

API Gateway Integration
Users authenticate with the Cognito User Pool and receive a JWT. This token is then passed to the API Gateway, which validates the token to authorize access to backend services.

Application Load Balancer Integration
Using Application Load Balancer listeners and rules, users can be authenticated against Cognito User Pools. After successful authentication, requests are forwarded to backend target groups, which can include EC2 instances, Lambda functions, or ECS containers.

Conclusion
This overview covered the high-level concepts of Cognito User Pools. The next lecture will provide a hands-on demonstration to explore how Cognito User Pools work in detail.

Key Takeaways
Cognito User Pools (CUP) provide a serverless database for managing web and mobile application users.
CUP supports user authentication via username/password, social logins (Google, Facebook), and federated identities including SAML and OpenID Connect.
Features include password reset, email and phone verification, multi-factor authentication, and compromised credential blocking.
CUP integrates natively with AWS API Gateway and Application Load Balancer for secure backend access.

---

Cognito User Pools - Others
Lambda Triggers in Cognito User Pools
Cognito User Pools allow the use of Lambda triggers to invoke Lambda functions synchronously on specific events. The important triggers are related to authentication events, such as pre-authentication, post-authentication, and pre-token generation. For example, a Lambda trigger can accept or deny a sign-in request, log events after successful authentication for custom analytics, or augment and suppress token claims.

For the sign-up process, there are pre sign-up, post confirmation, and migrate user Lambda triggers. These can be used to send custom welcome messages or log events for analytics after a user has signed up. Additionally, messages sent to users can be customized through Lambda functions. Token creation can also be modified by adding or removing attributes in ID tokens.

Hosted Authentication UI
Cognito User Pools provide a hosted authentication UI, which eliminates the need to program the UI within your application. This hosted UI handles sign-up and sign-in workflows and includes integration for social logins, OpenID Connect (OIDC), and Security Assertion Markup Language (SAML). If desired, the hosted UI can be customized with your own logo and CSS to match your website's branding.

Custom Domains for Hosted UI
If you want to host the Cognito hosted UI on your own domain, you must configure a custom domain. When using custom domains with Cognito User Pools, regardless of the region where the user pool is created, you must create an HTTPS certificate in AWS Certificate Manager (ACM) located in the us-east-1 region. This certificate is mandatory for enabling HTTPS on the custom domain.

The custom domain must be defined in the app integration section of Cognito User Pools, as this configuration applies to all app clients.

Adaptive Authentication
Adaptive authentication allows users to sign in normally with their username and password. However, if a sign-in attempt is deemed suspicious, the sign-in can be blocked or require multi-factor authentication (MFA). Each sign-in attempt is examined by Cognito, which assigns a risk score of low, medium, or high based on the likelihood that the request is from a malicious attacker or an unknown login.

If the risk score is high, users may be prompted for a second factor of authentication only when there is risk. For example, a user logging in from their usual device and location can sign in with just a password, but a login attempt from a new location may require MFA verification.

The risk score is based on factors such as device recognition, location, IP address, and others. In cases of compromised credentials, account takeover protection includes phone and email verification. All activities related to adaptive authentication, including sign-in attempts, risk scores, and failed challenges, are logged in CloudWatch for monitoring.

JSON Web Tokens (JWT) in Cognito User Pools
When logging in with a Cognito User Pool, the response includes a JWT (JSON Web Token). These tokens are Base64 encoded and consist of three parts: the header, the payload, and the signature. The header and signature are not shown here, but the payload contains important information about the user.

To trust the information in the payload, the signature must be verified using an algorithm. If the signature is valid, the payload can be trusted; otherwise, the token could be forged.

The payload contains user information such as the sub UUID, which represents the user ID in the Cognito User Pool database. Using this sub UUID, you can retrieve additional user information stored in the Cognito database, including email, given name, phone number, and any custom attributes defined in the user pool.

Other fields in the payload include the username, Cognito groups, and the token's expiry time. For extra information, you should query the Cognito user pool database using the user ID.

Conclusion
This concludes the overview of Cognito User Pools, including Lambda triggers, hosted UI customization, custom domains, adaptive authentication, and JWT token structure. These features provide a robust and customizable authentication system for your applications.

Key Takeaways
Lambda triggers in Cognito User Pools enable synchronous invocation of Lambda functions during authentication and sign-up events.
The hosted authentication UI provided by Cognito can be customized and supports social logins, OIDC, and SAML integrations.
Custom domains for Cognito User Pools require an HTTPS certificate in ACM located in the us-east-1 region.
Adaptive authentication assesses risk scores for sign-in attempts to enforce multi-factor authentication when suspicious activity is detected.