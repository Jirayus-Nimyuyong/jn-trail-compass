AWS Certificate Manager (ACM)

• Let’s you easily provision, manage, and deploy
SSL/TLS Cer tificates
• Used to provide in-flight encryption for
websites (HTTPS)
• Supports both public and private TLS
certificates
• Free of charge for public TLS certificates
• Automatic TLS certificate renewal
• Integrations with (load TLS certificates on)
HTTP
• Elastic Load Balancers
• CloudFront Distributions
• APIs on API Gateway

---

AWS Private Certificate Authority (CA)

• Managed service allows you to create private
Certificate Authorities (CA), including root and
subordinaries CAs
• Can issue and deploy end-entity X.509 certificates
• Certificates are trusted only by your Organization
(not the public Internet)
• Works for AWS services that are integrated with
ACM
• Use cases:
issue certificate for
• Encrypted TLS communication, Cryptographically signing code
• Authenticate users, computers, API endpoints, and IoT devices
• Enterprise customers building a Public Key Infrastructure (PKI)

---

Amazon Certificate Manager (ACM)
Introduction to AWS Certificate Manager (ACM)
AWS Certificate Manager, or ACM, is a service designed to easily provision, manage, and deploy SSL or TLS certificates.

Purpose of Certificates
Certificates are used to provide in-flight encryption for your websites by enabling HTTPS endpoints.

Example Architecture
Consider an application load balancer connected in the backend through HTTP to an auto scaling group with EC2 instances. We want our end users to access our application via HTTPS endpoints.

To achieve this, we use ACM. Once connected to our domain, ACM allows us to provision and maintain TLS certificates. These certificates are loaded onto our application load balancer, which then automatically offers HTTPS endpoints for clients. This setup enables in-flight encryption over the public web.

Features of ACM
Supports both public and private TLS certificates.
Public TLS certificates are free of charge.
Provides automatic TLS certificate renewal, which is very helpful.
Integrates with various AWS services such as Elastic Load Balancer, CloudFront distributions, and API Gateway to load TLS certificates automatically.
Whenever you need a service to provide in-flight encryption and generate certificates, think of ACM.

Key Takeaways
AWS Certificate Manager (ACM) simplifies provisioning, managing, and deploying SSL/TLS certificates.
Certificates enable in-flight encryption by providing HTTPS endpoints for websites.
ACM integrates with services like Application Load Balancers, CloudFront, and API Gateway to automatically load certificates.
Public TLS certificates from ACM are free and include automatic renewal features.

---

ACM Private Certificate Authority - Overview
Overview of AWS Private Certificate Authority
AWS Certificate Manager (ACM) can issue public certificates, but it can also issue private certificates. To do this, you must create an AWS Private Certificate Authority (CA). This is a managed service that allows you to create a root Certificate Authority or subordinate Certificate Authorities, which depend on the root CA.

From these Certificate Authorities, you can issue and deploy end-entity X.509 certificates. These certificates are used by your applications but cannot be used to create new certificates. They are trusted only by all your applications within your organization, as long as they trust the Private Certificate Authority.

However, these private certificates cannot be deployed on the public internet because they are issued by a Private Certificate Authority. Therefore, they will not be trusted publicly.

If you are using an AWS service that integrates with ACM, such as your Application Load Balancer, it is possible to load a private certificate onto it. This enables secure communication within your private environment.

Examples of AWS services that support private certificates include CloudFront, API Gateway, Load Balancers, Kubernetes services, and others. These certificates can be issued for users, computers, APIs, HTTP endpoints, and IoT devices.

Use Cases for AWS Private Certificate Authority
Enabling encrypted TLS communication internally within your organization.
Cryptographically signing code to authenticate users, computers, API endpoints, and IoT devices by providing them certificates.
Creating a public key infrastructure (PKI) within an enterprise environment.
This concludes the overview of AWS Private Certificate Authority. Thank you for your attention, and I will see you in the next lecture.

Key Takeaways
AWS Certificate Manager (ACM) can issue both public and private certificates.
AWS Private Certificate Authority (CA) is a managed service to create root and subordinate CAs.
Private certificates issued by AWS Private CA are trusted only within your organization and cannot be used on the public internet.
Private certificates can be integrated with AWS services like Application Load Balancer, CloudFront, API Gateway, Kubernetes, and used for users, computers, APIs, and IoT devices to enable secure internal communication and authentication.