<!-- CloudWatch Logs - Encryption

• You can encrypt CloudWatch logs with KMS keys
• Encryption is enabled at the log group level, by associating a CMK with a
log group, either when you create the log group or after it exists.
• You cannot associate a CMK with a log group using the CloudWatch
console.
• You must use the CloudWatch Logs API:
• associate-kms-key : if the log group already exists
• create-log-group: if the log group doesn’t exist yet

---

CloudWatch Logs Encryption
CloudWatch Logs Encryption Overview
You can encrypt your CloudWatch Logs using AWS Key Management Service (KMS) keys. The encryption is applied at the log group level, not at the log stream level. This means that each log group can be associated with a Customer Master Key (CMK) for encryption purposes.

You have two options to associate a CMK with a log group:

Associate a CMK with an existing log group.
Create a new log group and directly associate it with a CMK.
However, this association cannot be done through the CloudWatch console. Instead, you must use the CloudWatch Logs API, the AWS CLI, or the SDK. In this lecture, we will demonstrate using the CLI.

CLI Commands for KMS Key Association
There are two relevant commands:

associate-kms-key: Associates a KMS key with an existing log group.
create-log-group: Creates a new log group and associates it directly with a KMS key.
Let's proceed with a hands-on demonstration to see how this works.

Demonstration: Associating a KMS Key with an Existing Log Group
In the CloudWatch Logs console, navigate to your log groups. For example, the aws/lambda/hello-world log group currently has no KMS key ID associated with it. The UI does not allow associating a KMS key with this log group.

To associate a KMS key, we will use the CLI. We take the KMS key ID from a previously created key (e.g., the tutorial key) and run the associate-kms-key command with the log group name, KMS key ID, and region as arguments.

When running the command, you might encounter an "Access Denied" exception. This indicates that the KMS key exists but has not been authorized for use with this log group. To resolve this, you must update the key policy to allow CloudWatch Logs access.

Updating the KMS Key Policy
Navigate to the KMS console and select your key. Switch to the policy view and edit the key policy. The default key policy allows any user or role within your account to use the key but does not allow any AWS service access.

You need to add a statement that grants the CloudWatch Logs service permission to use the key. This includes actions such as encrypt, decrypt, re-encrypt, generate data key, and describe on the key.

For example, add a statement allowing the principal logs.<region>.amazonaws.com (e.g., logs.eu-west-2.amazonaws.com) to perform these actions. Save the changes to the key policy.

Retrying the Association Command
After updating the key policy, rerun the associate-kms-key CLI command. This time, the command should succeed, and the KMS key will be associated with the log group.

You can verify this by refreshing the CloudWatch Logs console. The log group will now display the associated KMS key ID, indicating that it is encrypted with that key.

Creating a New Encrypted Log Group
You can also create a new log group and associate it with a KMS key directly using the CLI. For example, run the create-log-group command with the log group name and KMS key ID as parameters.

After creation, refresh the log groups list in the console to see the new encrypted log group with the associated KMS key ID.

Summary
CloudWatch Logs encryption is configured at the log group level using KMS keys.
Association of KMS keys with log groups must be done via CLI or API, not the console.
Updating the KMS key policy to allow CloudWatch Logs service access is necessary.
You can either associate a KMS key with an existing log group or create a new log group with a KMS key directly.
This process demonstrates a strong security practice by explicitly granting service permissions through key policies.

Key Takeaways
CloudWatch Logs encryption is configured at the log group level using KMS keys.
Associating a KMS key with a log group requires using the CloudWatch Logs API or CLI, not the console.
Modifying the KMS key policy to allow CloudWatch Logs service access is essential for successful encryption.
There are two methods: associating a KMS key with an existing log group or creating a new log group with a KMS key directly.
 -->
