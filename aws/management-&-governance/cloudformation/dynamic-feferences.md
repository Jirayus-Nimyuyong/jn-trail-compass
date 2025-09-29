<!-- CloudFormation – Dynamic References

• Reference external values stored in Systems Manager
create/update
Parameter Store and Secrets Manager within
CloudFormation templates
• CloudFormation retrieves the value of the specified
reference during create/update/delete operations
• For example: retrieve RDS DB Instance master password
from Secrets Manager
• Supports
• ssm – for plaintext values stored in SSM Parameter Store
• ssm-secure – for secure strings stored in SSM Parameter Store
• secretsmanager – for secret values stored in Secrets Manager

---

CloudFormation – Dynamic References

CloudFormation, Secrets Manager & RDS
Option 1 – ManageMasterUserPassword

• ManageMasterUserPassword – creates admin secret implicitly
• RDS, Aurora will manage the secret in Secrets Manager and its rotation


---

CloudFormation - Secrets Manager & SSM Integration
Introduction to Dynamic References in CloudFormation
Dynamic references in CloudFormation enable the retrieval of values stored in Systems Manager Parameter Store or Secrets Manager directly within CloudFormation templates. CloudFormation retrieves the value of the specified references during any create, update, or delete operations.

Supported Services for Dynamic References
CloudFormation supports three types of dynamic references:

ssm for plaintext values stored in the Systems Manager Parameter Store
ssm-secure for secure strings stored in the Systems Manager Parameter Store
secretsmanager for secret values stored in the Secrets Manager service
Syntax for Dynamic References
The syntax to resolve one of these values is:

{{resolve:service-name:reference-key}}

For SSM, the syntax is:

{{resolve:ssm:parameter-name:version}}

Example: Referencing SSM Parameter Store and Secrets Manager
Suppose there is an Amazon S3 bucket, and for the access control settings, the value is resolved directly from the SSM Parameter Store. For secure values, use ssm-secure instead of ssm because the value is encrypted. For example, the password of an IAM user can be resolved from within the Parameter Store as a secure parameter. For Secrets Manager, the master username and master password of an RDS Database Instance can be resolved directly from the Secrets Manager service using the dynamic references syntax.

{{resolve:ssm:/my/parameter:1}}

{{resolve:ssm-secure:/my/secure-parameter:1}}

{{resolve:secretsmanager:mysecret:SecretString:password}}

Integration of CloudFormation, Secrets Manager, and RDS
When creating a stack with an RDS Database cluster, such as Aurora, and setting ManageMasterUserPassword: true, the secret for the Aurora database is created implicitly. The RDS service creates a secret in Secrets Manager to manage the Master User Password and its rotation.

Retrieving the Secret ARN
To get the value of the secret ARN, use the GetAtt intrinsic function to get the secret ARN from the Master User secret.

Fn::GetAtt: [MyDBCluster, MasterUserSecret.SecretArn]

Creating and Referencing Secrets Directly in CloudFormation
Alternatively, a secret can be created from within the CloudFormation template. Using GenerateStringKey for the password means that CloudFormation will automatically generate a secret password. The database instance then references the secret in the RDS Database Instance using the resolve function through dynamic reference, leveraging the secret out of Secrets Manager.

Linking Secrets and Enabling Password Rotation
To link the secret and the database instance and ensure password rotation, create a secret RDS attachment. This allows the database to be linked to the secret in Secrets Manager so that the secret can rotate over time and the RDS Database is automatically updated.

Conclusion
Dynamic references are essential for securely managing sensitive values in CloudFormation templates. They enable seamless integration with Parameter Store and Secrets Manager, supporting secure and automated secret management for services like RDS.

Key Takeaways
Dynamic references in CloudFormation allow secure retrieval of values from SSM Parameter Store and Secrets Manager.
The syntax for dynamic references uses {{resolve:service-name:reference-key}}.
CloudFormation can integrate with RDS and Secrets Manager for automatic secret management and rotation.
Secrets can be referenced directly or managed implicitly by RDS with password rotation. -->
