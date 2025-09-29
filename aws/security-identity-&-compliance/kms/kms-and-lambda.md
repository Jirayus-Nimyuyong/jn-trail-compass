KMS and AWS Lambda Practice
Introduction to Lambda and KMS Integration
In this lecture, we will practice using AWS Lambda with Key Management Service (KMS). The goal is to demonstrate how to securely handle sensitive information, such as database passwords, within Lambda functions by leveraging KMS for encryption.

Creating a Lambda Function and Identifying the Problem
We begin by creating a Lambda function from scratch, naming it Lambda KMS, and selecting the Python runtime. The focus is on encrypting environment variables within Lambda, specifically using a KMS key generated earlier.

Suppose the Lambda function needs a database password. A naive approach is to hardcode the password in the function, such as setting DB_PASSWORD = 'super_secret'. However, this is insecure because anyone with access to the code can see the password.

Using Environment Variables for Secrets
A better approach is to use environment variables. For example, you can retrieve the password using the os module in Python:

python Code Sample
db_password = os.getenv('DB_PASSWORD')
You would then set the environment variable DB_PASSWORD in the Lambda configuration to super_secret. This keeps the password out of the code. However, if someone gains access to the Lambda configuration, they can still see the password in plain text.

Encrypting Environment Variables with KMS
To address this, Lambda provides an encryption configuration for environment variables. You can enable encryption helpers and select a KMS key (such as the tutorial KMS key) to encrypt the variable at rest. After clicking the encrypt button, the environment variable is now encrypted.

Decrypting the Encrypted Environment Variable in Lambda
To use the encrypted environment variable in your function, you need to decrypt it using the AWS SDK. The following code snippet demonstrates how to decrypt the environment variable using the KMS client:

python Code Sample
import boto3
import os
import base64

def decrypt_env_var():
    encrypted = os.environ['DB_PASSWORD']
    kms_client = boto3.client('kms')
    decrypted = kms_client.decrypt(
        CiphertextBlob=base64.b64decode(encrypted),
        EncryptionContext={'LambdaFunctionName': os.environ['AWS_LAMBDA_FUNCTION_NAME']}
    )['Plaintext'].decode('utf-8')
    return decrypted
In your Lambda function, you can print both the encrypted and decrypted values to verify the process. Deploy and test the function using sample events.

Handling Lambda Timeout and IAM Permissions
If the function times out (for example, after three seconds), increase the timeout in the general configuration to ten seconds and save the changes. If you encounter an access denied exception, it means the Lambda function's IAM role does not have permission to decrypt using the KMS key.

Granting KMS Decrypt Permission to Lambda Role
To fix the permission issue, go to the Lambda function's configuration and select the permissions tab. Edit the Lambda execution role to add an inline policy that allows the kms:Decrypt action for the specific KMS key ARN.

json Code Sample
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Action": "kms:Decrypt",
      "Resource": "<KMS_KEY_ARN>"
    }
  ]
}
After attaching the policy, test the Lambda function again. The function should now successfully decrypt the environment variable using KMS.

Verifying the Results
Check the Lambda logs to see the encrypted environment variable and the decrypted value (super_secret). This approach ensures that the code does not expose sensitive information, and only users with access to the KMS key can decrypt the environment variable.

Conclusion
By integrating Lambda with KMS, you can securely manage secrets such as database passwords. This method protects sensitive data both in the code and in the Lambda configuration, as only those with KMS key access can decrypt the values.

Key Takeaways
Storing sensitive data like database passwords directly in Lambda code or environment variables is insecure.
AWS Lambda allows encrypting environment variables using KMS keys for enhanced security.
Decrypting environment variables in Lambda requires proper IAM permissions for the KMS key.
Integrating Lambda with KMS ensures secrets are protected both in code and configuration.