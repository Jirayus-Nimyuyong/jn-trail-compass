Amazon S3 – MFA Delete

• MFA (Multi-Factor Authentication) – force users to generate a code on a
device (usually a mobile phone or hardware) before doing important
operations on S3
• MFA will be required to:
• Permanently delete an object version
• Suspend Versioning on the bucket
Google Authenticator
• MFA won’t be required to:
• Enable Versioning
• List deleted versions
MFA Hardware Device
• To use MFA Delete, Versioning must be enabled on the bucket
• Only the bucket owner (root account) can enable/disable MFA Delete
---
S3 MFA Delete
Introduction to MFA Delete
Let's discuss a security feature called MFA Delete.

MFA stands for multi-factor authentication. It is a method that forces users to generate a code on a device. This device could be, for example, a mobile phone with a Google Authenticator application or another similar app, or it could be a hardware MFA device.

This device generates a code, and that code must be inserted into Amazon S3 before performing important operations.

When is MFA Required?
MFA is required when you want to permanently delete an object version. This provides protection against permanent deletions. Additionally, MFA is required if you want to suspend Versioning on the bucket. Both of these actions are quite destructive, so MFA is necessary.

However, if you want to enable Versioning or list deleted versions, MFA is not required because these operations are not dangerous.

Requirements to Use MFA Delete
To use MFA Delete, you must first enable Versioning on the bucket because MFA Delete relates specifically to Versioning.

Only the bucket owner, which is the root account, can enable or disable MFA Delete. This will be demonstrated in the next hands-on session.

Using the root account is not something you should do frequently, but you will see how to do this in the next lecture.

Summary
MFA Delete is an extra protection to prevent the permanent deletion of specific object versions.

That concludes this lecture. I will see you in the next lecture.

Key Takeaways
MFA Delete is a security feature that requires multi-factor authentication to perform sensitive operations in Amazon S3.
MFA involves generating a code from a device such as a mobile phone app or hardware device.
MFA is required for permanently deleting object versions and suspending bucket Versioning.
Only the bucket owner (root account) can enable or disable MFA Delete, and Versioning must be enabled first.