How can users access AWS ?
• To access AWS, you have three options:
• AWS Management Console (protected by password + MFA)
• AWS Command Line Interface (CLI): protected by access keys
• AWS Software Developer Kit (SDK) - for code: protected by access keys
• Access Keys are generated through the AWS Console
• Users manage their own access keys
• Access Keys are secret, just like a password. Don’t share them
• Access Key ID ~= username
• Secret Access Key ~= password


What’s the AWS CLI?
• A tool that enables you to interact with AWS services using commands in
your command-line shell
• Direct access to the public APIs of AWS services
• You can develop scripts to manage your resources
• It’s open-source https://github.com/aws/aws-cli
• Alternative to using AWS Management Console

What’s the AWS SDK?
• AWS Software Development Kit (AWS SDK)
• Language-specific APIs (set of libraries)
• Enables you to access and manage AWS services
programmatically
• Embedded within your application
• Supports
• SDKs (JavaScript, Python, PHP, .NET, Ruby, Java, Go, Node.js,
C++)
• Mobile SDKs (Android, iOS, …)
• IoT Device SDKs (Embedded C, Arduino, …)
• Example: AWS CLI is built on AWS SDK for Python


AWS Access Keys, CLI and SDK
Introduction to AWS Access Methods
We have seen how to access AWS using the Management Console, which is the web interface covered so far in this course. However, there are actually three different options to access AWS.

The first option is the Management Console, protected by your username, password, and possibly multifactor authentication.
The second option is the CLI, or Command Line Interface, which we will set up on our computer. This is protected by access keys, which are credentials that we will download shortly to allow access to AWS from the terminal.
The third option is the SDK, the AWS Software Development Kit, used when calling AWS APIs from within your application code. These are also protected by the same access keys.
Generating and Managing Access Keys
Access keys are generated through the Management Console. Each user is responsible for their own access keys, which are secret like a password. If you generate your own access keys, do not share them with colleagues because they can generate their own access keys as well.

Treat your access key ID like your username and your secret access key like your password. Do not share them with others.

When you go into the Management Console, there is a button to create access keys. You can then download them immediately. For example, here is a fake access key ID and a fake secret access key. When loaded into the Command Line Interface, these would allow access to the AWS API. We will practice this hands-on shortly.

Remember, to avoid security issues during this course or at work, do not share your access keys as they are private to you.

Understanding the AWS CLI
If you are new to the cloud, programming, or IT, you might not know what a CLI is. CLI stands for Command Line Interface. The AWS CLI is a tool that allows you to interact with AWS services using commands from your command-line shell.

Whenever you see code where you type a command and it returns a result, for example, aws s3 cp, this is the CLI. We use the AWS CLI because every command starts with the word aws.

The CLI provides direct access to the public APIs of AWS services, which is very helpful in this course. Using the CLI, you can develop scripts to manage your resources and automate tasks. The CLI is open-source, with source code available on GitHub, and serves as an alternative to the AWS Management Console. Some users only use the CLI without ever using the Management Console.

Overview of the AWS SDK
SDK stands for Software Development Kit. It is a set of libraries that are language-specific. You will find an SDK for different programming languages. The SDK allows you to access and manage AWS services and APIs programmatically.

Unlike the CLI, the SDK is not used within your terminal but embedded within your application code. Your application will include the AWS SDK.

The SDK supports many programming languages such as JavaScript, Python, PHP, .NET, Ruby, Java, Go, Node.js, C++, and more. There are also mobile SDKs for Android and iOS, and IoT SDKs for Internet of Things devices like thermal sensors or connected devices.

Example: AWS CLI Built on AWS SDK
To give an example of what you can build with the SDK, the AWS CLI that we will use in this course is actually built on the AWS SDK for Python, named Boto.

Next Steps
That concludes this lecture. In the next lecture, we will practice setting up the CLI and managing access keys. I will see you then.

Key Takeaways
AWS can be accessed via three main methods: Management Console, CLI, and SDK.
Access keys are essential credentials for CLI and SDK access and must be kept private.
The AWS CLI allows command-line interaction with AWS services and supports scripting for automation.
The AWS SDK provides language-specific libraries to programmatically interact with AWS services within applications.