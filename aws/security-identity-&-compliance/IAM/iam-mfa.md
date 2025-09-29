
IAM – Password Policy
• Strong passwords = higher security for your account
• In AWS, you can setup a password policy:
• Set a minimum password length
• Require specific character types:
• including uppercase letters
• lowercase letters
• numbers
• non-alphanumeric characters
• Allow all IAM users to change their own passwords
• Require users to change their password after some time (password expiration)
• Prevent password re-use

Multi Factor Authentication - MFA
• Users have access to your account and can possibly change
configurations or delete resources in your AWS account
• You want to protect your Root Accounts and IAM users
• MFA = password you know + security device you own

Main benefit of MFA:
if a password is stolen or hacked, the account is not compromised

MFA devices options in AWS

Virtual MFA device

Google Authenticator
(phone only)
Authy
(phone only)
Support for multiple tokens on a single device.

Universal 2nd Factor (U2F) Security Key

YubiKey by Yubico (3rd party)
Support for multiple root and IAM users
using a single security key

MFA devices options in AWS

Hardware Key Fob MFA Device
Provided by Gemalto (3rd party)


Hardware Key Fob MFA Device for
AWS GovCloud (US)
Provided by SurePassID (3rd party)

---

IAM MFA Overview

Protecting Users in AWS Groups
Now that we have created users in groups, it is time to protect these users from being compromised. To achieve this, AWS provides two defense mechanisms.

Password Policy
The first defense mechanism is to define a password policy. The stronger the password you use, the more secure your accounts will be. AWS allows you to set up a password policy with several options:

Minimum password length.
Requirement of specific character types, such as uppercase letters, lowercase letters, numbers, and non-alphanumeric characters (e.g., question marks).
Allowing or disallowing IAM users to change their own passwords.
Requiring users to change their passwords after a certain period, for example, every 90 days.
Preventing password reuse, so users cannot reuse their current or previous passwords.
A password policy is very helpful against brute force attacks on your account.

Multi-Factor Authentication (MFA)
The second defense mechanism is Multi-Factor Authentication, or MFA. You may have already used MFA on some websites, but on AWS, it is a must and highly recommended.

Users have access to your account and can perform many actions, especially if they are administrators. They can change configurations, delete resources, and more. Therefore, it is crucial to protect at least your root account and, ideally, all your IAM users.

MFA adds an extra layer of security on top of the password by requiring a security device in addition to the password.

MFA uses the combination of something you know (a password) and something you own (a security device). These two factors together provide much greater security than a password alone.

For example, consider Alice. She knows her password and also has an MFA generating token. By using both together during login, she can successfully authenticate with MFA.

The benefit of MFA is that even if Alice's password is stolen or hacked, the account will not be compromised because the attacker would also need to have physical access to Alice's MFA device, such as her phone, to log in. This scenario is much less likely.

MFA Device Options in AWS
You need to know the MFA device options for the exam, but they are quite simple:

Virtual MFA Device: This is the option used in the hands-on labs. You can use applications like Google Authenticator, which works on one phone at a time, or Authy, which supports multiple tokens on a single device. With a virtual MFA device, you can manage multiple accounts and users, such as your root account and various IAM users, all on one device.

Universal 2nd Factor (U2F) Security Key: This is a physical device, for example, a YubiKey by Yubico, which is a third party to AWS. It is convenient because you can attach it to your key fob and carry it easily. A single security key can support multiple root and IAM users, so you do not need one key per user.

Hardware Key Fob MFA Device: For example, a device provided by Gemalto, also a third party to AWS.

Specialized Key Fob for AWS GovCloud: If you are using the AWS GovCloud in the US, there is a special key fob provided by SurePassID, another third party.

Summary
We have covered the theory on how to protect your AWS accounts using password policies and Multi-Factor Authentication. In the next lecture, we will implement these protections practically.

Key Takeaways
Password policies enhance account security by enforcing strong password requirements such as minimum length, character types, expiration, and reuse prevention.
Multi-Factor Authentication (MFA) combines something you know (password) with something you own (security device) to significantly increase account protection.
AWS supports various MFA devices including virtual MFA apps like Google Authenticator and Authy, physical U2F security keys like YubiKey, hardware key fobs, and specialized devices for AWS GovCloud.
Protecting root and IAM user accounts with MFA is highly recommended to prevent unauthorized access even if passwords are compromised.