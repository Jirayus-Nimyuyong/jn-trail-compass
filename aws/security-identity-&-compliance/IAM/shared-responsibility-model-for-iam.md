Shared Responsibility Model for IAM

AWS
Infrastructure (global
network security)
• Configuration and
vulnerability analysis
• Compliance validation

User
• Users, Groups, Roles, Policies
management and monitoring
• Enable MFA on all accounts
• Rotate all your keys often
• Use IAM tools to apply
appropriate permissions
• Analyze access patterns &
review permissions

Throughout the CCP exam, you will encounter many questions about the Shared Responsibility Model.

This model ensures that you understand what AWS is responsible for and what you are responsible for.

Introduction to the Shared Responsibility Model
I want to include some information within sections to give you an idea of how the Shared Responsibility Model works for AWS.

AWS is responsible for everything they do, for example, their infrastructure and their global network security.

They are also responsible for the configuration and vulnerability analysis of the services they offer, as well as any sign of compliance.

User Responsibilities in IAM
Regarding IAM, you are responsible for many things that AWS will not do for you.

You are responsible for creating your own users, groups, roles, and policies, as well as managing these policies and monitoring them.

You are responsible for enabling Multi-Factor Authentication (MFA) on all accounts and enforcing this; AWS does not do this for you.

You must also ensure that keys are rotated often.

You need to use IAM tools to apply the appropriate permissions.

Again, you are responsible for analyzing access patterns and reviewing permissions in your accounts, not AWS.

Summary
This is a simple but clear example: AWS is responsible for all the infrastructure, and you are responsible for how you use that infrastructure.

This lecture is one of several on the Shared Responsibility Model.

I hope you found it helpful, and I will see you in the next lecture.

Key Takeaways
The Shared Responsibility Model clarifies the division of security duties between AWS and the user.
AWS is responsible for infrastructure, global network security, service configuration, vulnerability analysis, and compliance.
Users are responsible for managing IAM components such as users, groups, roles, policies, and their monitoring.
Users must enable and enforce MFA, rotate keys regularly, and review access permissions using IAM tools.