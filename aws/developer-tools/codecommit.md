AWS CodeCommit

• Git repositories can be expensive
• The industry includes GitHub, GitLab, Bitbucket, …
• And AWS CodeCommit:
• Private Git repositories
• No size limit on repositories (scale seamlessly)
• Fully managed, highly available
• Code only in AWS Cloud account => increased security
and compliance
• Security (encrypted, access control, …)
• Integrated with Jenkins, AWS CodeBuild, and other CI tools

---

CodeCommit – Security

• Interactions are done using Git (standard)
• Authentication
• SSH Keys – AWS Users can configure SSH keys in their IAM Console
• HTTPS – with AWS CLI Credential helper or Git Credentials for IAM user
• Authorization
• IAM policies to manage users/roles permissions to repositories
• Encryption
• Repositories are automatically encrypted at rest using AWS KMS
• Encrypted in transit (can only use HTTPS or SSH – both secure)
• Cross-account Access
• Do NOT share your SSH keys or your AWS credentials
• Use an IAM Role in your AWS account and use AWS STS (AssumeRole API)

---

CodeCommit vs. GitHub

---

CodeCommit – Important – Deprecation

• On July 25th 2024, AWS abruptly discontinued CodeCommit
• New customers cannot use the service
• AWS recommends to migrate to an external Git solution

---

• For this course:
• CodeCommit might still appear at the exam (for now)
• Anytime I use CodeCommit, please use GitHub instead (we set it up once together)
• Every time I mention CodeCommit, assume there’s a GitHub integration

---

CodeCommit Overview
Introduction to AWS CodeCommit
Let's discuss AWS CodeCommit, a service focused on version control.

Understanding Version Control
Version control is the ability to track various changes that happen to code over time and possibly roll back to previous versions. It allows you to see what happened in the past, who committed code, what was changed, added, or removed, and then revert those changes if necessary.

Git as the Underlying Technology
To achieve version control, an underlying technology called Git is widely used. A Git repository can be synchronized on your computer but is usually uploaded to a central online repository. This central repository enables collaboration among developers.

Benefits of a Central Online Git Repository
Enables collaboration among potentially hundreds of thousands of developers working on the same code simultaneously.
Ensures code is backed up in the cloud rather than residing solely on individual computers.
Provides full visibility and editability, allowing tracking of who committed which lines of code and when.
Facilitates rolling back changes when needed.
AWS CodeCommit Overview
With CodeCommit, AWS offers a code repository service where developers, such as Emma and John, can collaborate by pushing and pulling code from a centralized repository hosted on AWS.

Why Use AWS CodeCommit?
Git repositories can be expensive when using third-party services like GitHub, GitLab, or Bitbucket.
CodeCommit provides a private Git repository hosted within your AWS Virtual Private Cloud (VPC).
There is no size limit on the repository, allowing you to scale to gigabytes of code.
It is fully managed and highly available.
Code remains within the AWS cloud, enhancing security and compliance.
Security Features of CodeCommit
CodeCommit encrypts your code at rest using AWS Key Management Service (KMS).
Access control is managed through AWS Identity and Access Management (IAM) policies.
Interactions use standard Git command-line tools with authentication via SSH keys or HTTPS.
Encryption in transit is ensured through HTTPS or SSH protocols.
For cross-account access, IAM roles and AWS Security Token Service (STS) AssumeRole API are used instead of sharing credentials.
Integration and Compatibility
CodeCommit integrates with industry-standard continuous integration tools such as Jenkins and AWS CodeBuild, making it a great choice for storing your code within a CI/CD pipeline.

Comparison: CodeCommit vs GitHub
Both support code reuse through pull requests.
Both integrate with CodeBuild and support authentication via SSL and HTTPS.
GitHub supports GitHub users and Single Sign-On (SSO) at the enterprise level.
CodeCommit is fully integrated with AWS IAM users and roles.
CodeCommit hosts code exclusively on AWS, whereas GitHub can host code on its own servers or on-premises for enterprise customers.
GitHub offers a fully featured user interface, while CodeCommit's UI is more minimalistic.
CodeCommit is ideal if you want your code to reside solely within AWS for security or compliance reasons.
Conclusion
This overview of AWS CodeCommit highlights its capabilities as a secure, scalable, and integrated Git repository service within the AWS ecosystem. It is a strong choice for organizations seeking private, managed code repositories with tight AWS integration.

I hope you found this overview helpful. In the next lecture, we will engage in practical exercises to deepen your understanding.

Key Takeaways
AWS CodeCommit provides a fully managed, scalable, and secure Git repository service integrated within the AWS cloud.
CodeCommit supports standard Git commands with enhanced security features such as encryption, IAM-based access control, and integration with AWS services.
It offers cost-effective private repositories without size limits, making it suitable for organizations requiring code hosting within their AWS environment.
CodeCommit differs from GitHub mainly in hosting, security integration, and user interface, favoring AWS-centric workflows.

---

Important Update: AWS CodeCommit Discontinuation and Migration to GitHub
Important Announcement: AWS CodeCommit Discontinuation
On July 25, 2024, AWS abruptly discontinued CodeCommit. This means that new customers can no longer use the service, and it is likely that existing users cannot access it either.

AWS now recommends migrating to an external Git solution, such as GitHub or GitLab, or any other third-party provider that supports Git access.

Implications for This Course
It is important to note a few things regarding CodeCommit in this course:

CodeCommit might still appear in the exam for now.
If you are watching this video more than six months after its release, CodeCommit references may have disappeared.
It is still useful to understand what CodeCommit is in terms of storing code in a repository.
Whenever CodeCommit is used in this course, please use GitHub instead. The first video where we set up GitHub will be done together, so you will have the necessary knowledge to use GitHub effectively.

Therefore, if you see CodeCommit being used for a few seconds, please make the parallel and use GitHub instead. I am confident you can do this.

Every time CodeCommit is mentioned in this course, please assume there is a GitHub integration instead. CodeCommit is not the only relevant service for this case; the key is to understand the essence behind the service.

Thank you for working with me through these changes. They are very painful to edit in the course, but I hope to make the transition as smooth as possible.

In the next lecture, as you might have guessed, we will use GitHub and not CodeCommit.

That is all from me. I hope you found this information helpful, and I will see you in the next lecture.

Key Takeaways
AWS discontinued CodeCommit on July 25, 2024, making it unavailable for new customers.
AWS recommends migrating to external Git solutions like GitHub or GitLab.
CodeCommit references in this course should be considered as GitHub integrations.
The course will provide guidance on setting up and using GitHub instead of CodeCommit.