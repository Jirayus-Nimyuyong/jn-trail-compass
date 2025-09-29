CodeBuild Security

• To access resources in your VPC, make sure you specify a VPC
configuration for your CodeBuild
• Secrets in CodeBuild:
• Don’t store them as plaintext in environment variables
• Instead…
• Environment variables can reference parameter store parameters
• Environment variables can reference secrets manager secrets

---

CodeBuild Security
CodeBuild Security Overview
Let's begin with a quick lecture on CodeBuild security.

Although CodeBuild runs outside your VPC by default, you can launch CodeBuild inside your VPC to access your VPC resources securely.

Managing Secrets in CodeBuild
It is important not to store secrets as plaintext in CodeBuild environment variables. Instead, you have two secure options:

Use environment variables that reference parameters stored in AWS Systems Manager Parameter Store.
Use environment variables that reference secrets stored in AWS Secrets Manager.
We will see how to configure these options shortly.

Creating a CodeBuild Project and Configuring Security Settings
We are now in the CodeBuild console, creating a new build project. I will not fill in all the details, but I want to show you where the security settings are located.

If you scroll down to the "Additional Configuration" section, you will find important security-related settings.

VPC Configuration
One key setting is related to the VPC. You can launch CodeBuild within your VPC by specifying the subnets and security groups. This allows CodeBuild to access resources inside your VPC securely.

Environment Variables and Secrets
Environment variables are very important for security. For example, if you need to access an RDS database inside your VPC, you might need the database password.

You could set an environment variable like DB_PASSWORD with the value "supersecret", but this is insecure because it stores the secret in plaintext and could be leaked.

Instead, you should use either a parameter from Parameter Store or a secret from Secrets Manager.

Let's look at how to create a secure parameter in Parameter Store.

Creating a Secure Parameter in AWS Systems Manager Parameter Store
In the Parameter Store console, create a new parameter named /CodeBuild/DBPassword.

Set the parameter type to "SecureString" and associate it with a KMS key, such as the AWS managed CMK.

Set the value to "SuperSecret" and create the parameter.

Now, in your CodeBuild project, you can reference this parameter name in your environment variables. For example, set DB_PASSWORD to reference the parameter store value.

At runtime, CodeBuild will fetch the actual secret value "SuperSecret" and inject it into the build container securely.

You can also add another environment variable, such as DB_PASSWORD_ALT, and use the same approach with Secrets Manager by referencing the secret name.

Make sure the IAM role associated with your CodeBuild project has permissions to access both Systems Manager Parameter Store and Secrets Manager.

Summary
This approach ensures that secrets are not exposed as plaintext in your environment variables and are securely managed using AWS services.

This is a simple but important security best practice to remember, especially for exam preparation.

Thank you for watching, and I will see you in the next lecture.

Key Takeaways
CodeBuild can be launched inside your VPC to access VPC resources securely.
Avoid storing secrets as plaintext environment variables in CodeBuild.
Use AWS Systems Manager Parameter Store or Secrets Manager to securely manage secrets.
Ensure the IAM role for CodeBuild has permissions to access Parameter Store and Secrets Manager.