Application Load Balancer – Authenticate Users

• Your Application Load Balancer can securely authenticate users
• Offload the work of authenticating users to your load balancer
• Your applications can focus on their business logic
• Authenticate users through:
• Identity Provider (IdP): OpenID Connect (OIDC) compliant
• Cognito User Pools:
• Social IdPs, such as Amazon, Facebook, or Google
• Corporate identities using SAML, LDAP, or Microsoft AD
• Must use an HTTPS listener to set authenticate-oidc &
authenticate-cognito rules
• OnUnauthenticatedRequest – authenticate (default), deny,
allow

---

Application Load Balancer – Cognito Auth.

---

ALB – Auth through Cognito User Pools
• Create Cognito User Pool, Client and
Domain
• Make sure an ID token is returned
• Add the social or Corporate IdP if needed
• Several URL redirections are necessary
• Allow your Cognito User Pool Domain on
your IdP app's callback URL. For example:
• https://domain-
prefix.auth.region.amazoncognito.com/saml2/
idpresponse
• https://user-pool-domain/oauth2/idpresponse

---

Application Load Balancer – OIDC Auth.

---

ALB – Auth. Through an Identity Provider (IdP)
That is OpenID Connect (OIDC) Compliant

• Configure a Client ID & Client Secret
• Allow redirect from OIDC to your
Application Load Balancer DNS name
(AWS provided) and CNAME (DNS
Alias of your app)
• https://DNS/oauth2/idpresponse
• https://CNAME/oauth2/idpresponse

---

Application Load Balancer - User Authentication
Introduction to Application Load Balancer User Authentication
We know that we can integrate Amazon Cognito with the API Gateway to authenticate users. However, we can actually do the very same thing with an Application Load Balancer (ALB). Your ALB can securely authenticate users, which allows you to remove this responsibility from your application. This way, your applications can focus solely on their business logic.

Authentication Methods Supported by ALB
You can authenticate users in multiple ways using your Application Load Balancer:

OpenID Connect (OIDC) compliant identity providers
Amazon Cognito user pools
The Cognito user pools support social identity providers such as Amazon login, Facebook login, or Google login. They also support corporate identities compatible with SAML, LDAP, or Microsoft Active Directory.

There are two main options:

Integrate directly with an OIDC-compliant identity provider without using Cognito user pools.
Use Cognito user pools.
Both options will be demonstrated in this lecture.

Setting Up Authentication on ALB
To make authentication work, you must set up an HTTPS listener (note the "S" for secure). Then, you can configure either the authenticate-oidc or the authenticate-cognito rules.

When configuring your load balancer, you will see a listener detail on HTTPS where the first default action is to authenticate, followed by forwarding the request to your backend.

Handling Unauthenticated Users
If a user is unauthenticated, you have three options:

Authenticate: This is the default option, which prompts the user to authenticate.
Deny: Deny the request altogether.
Allow: Allow the request to proceed without authentication.
The "allow" option is useful, for example, for your login page, since users need to access it without being authenticated first.

Example: ALB with Amazon Cognito Integration
Consider an Application Load Balancer connected to Amazon ECS. We want to implement login through Amazon Cognito. When users perform a GET request to /api/data, the ALB is set up with HTTPS and the action authenticate-cognito.

Cognito authenticates the user, and then the request payload is passed on to Amazon ECS with added user information from Cognito. This is very helpful because your application now has more information about the user making the request, allowing you to return specific responses based on user data.

Configuring Cognito User Pools for ALB
To set this up:

Go to the ALB user interface.
Create a Cognito user pool, a client, and a domain.
Ensure that the ID token (JWT token) is returned; this is the default in Cognito user pools.
Connect your Cognito user pool to your social or corporate identity provider if desired.
Set up several URL redirections and callback URLs specific to the Cognito user pool.
Link the Cognito user pool to your ALB with the specific app clients.
This process is quite straightforward.

Using OIDC Authentication with ALB
If you are using OIDC authentication without Cognito, there is a bit more work involved because it does not use the Cognito integration. You can integrate with any OIDC-compliant identity provider.

The flow is as follows:

The user makes an HTTP request.
The ALB redirects the user to the authentication endpoint of your identity provider.
The identity provider grants an authorization code.
The authorization code is passed to the ALB.
The ALB sends the code to the token endpoint.
The authorization code is exchanged for an ID token and an access token.
The ALB requests user claims from the user info endpoint using the access token.
The user claims include user ID and attributes.
The request is then sent to Amazon ECS with the original request and user claims.
The response is returned to the user.
Additional Configuration for OIDC
For OIDC integration, you need to configure:

Authorization endpoint
Token endpoint
User info endpoint
Client ID and client secret
Proper redirection URLs
These settings ensure that your ALB and OpenID Connect endpoints function together correctly.

Summary
You have now seen two ways to authenticate users with your Application Load Balancer: using Amazon Cognito user pools or integrating directly with OIDC-compliant identity providers. Both methods enable your ALB to securely authenticate users and pass user information to backend services such as Amazon ECS.

Key Takeaways
Application Load Balancer (ALB) can securely authenticate users, offloading this responsibility from the application.
ALB supports authentication via OpenID Connect (OIDC) compliant identity providers or Amazon Cognito user pools.
Setting up ALB authentication requires configuring HTTPS listeners and appropriate authentication rules.
Cognito integration simplifies user authentication and passes user information to backend services like Amazon ECS.