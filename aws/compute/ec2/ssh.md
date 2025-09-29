SSH Overview
Introduction to SSH for Cloud Servers
Connecting to your servers in the Cloud to perform maintenance or actions can be one of the trickier aspects. For Linux servers, we use SSH, which stands for Secure Shell, to securely access our servers.

SSH Access Methods Based on Operating System
Depending on the operating system on your computer, there are different ways to achieve SSH access. The main categories are Mac, Linux, Windows before version 10, and Windows version 10 or later.

On Mac and Linux, SSH is available as a command line interface utility.
Windows 10 and later versions also support SSH natively via the command line.
For Windows versions earlier than 10, you can use a tool called Putty, which provides the same SSH functionality.
Putty and SSH both allow you to use the SSH protocol to connect to your EC2 instances.

EC2 Instance Connect: Browser-Based SSH Access
There is a newer method called EC2 Instance Connect, which allows you to connect to your EC2 instances using your web browser instead of a terminal or Putty. This method is compatible with Mac, Linux, and all versions of Windows.

EC2 Instance Connect currently works only with Amazon EC2 instances, which is why Amazon EC2 has been used throughout this tutorial.

Choosing the Right SSH Method for Your System
If you are using Mac or Linux, please refer to the SSH lecture specific to Mac/Linux.
If you are on Windows, you can either watch the Putty lecture or, if you have Windows 10, the SSH on Windows 10 lecture.
Personally, for future lectures, I will use EC2 Instance Connect because it is simple, requires no installation, and does not require familiarity with the command line interface. This can be very handy for many users.

Troubleshooting SSH Connections
In my experience teaching hundreds of thousands of students, SSH has caused the most trouble. If you encounter problems with SSH, consider the following:

Re-watch the lecture to ensure you did not miss any steps.
Check your security group rules.
Verify your commands for typos.
Additionally, I have put together a troubleshooting guide after these lectures for your reference.

I recommend trying EC2 Instance Connect as it often resolves many connection issues.

Final Notes
If one method works for you, that is sufficient; you do not need all methods to work. If none of the methods work, that is completely okay as this course is introductory and will not require extensive use of SSH.

This concludes the introduction. Please find the lecture appropriate for your system, and I will see you in the next lecture.

Key Takeaways
SSH is a secure shell protocol used to connect to Linux servers for maintenance or actions.
Different operating systems require different SSH methods: Mac/Linux use command line SSH, Windows before version 10 uses Putty, and Windows 10 or later supports SSH natively.
EC2 Instance Connect allows connecting to EC2 instances via a web browser and supports all major operating systems.
Troubleshooting SSH issues often involves checking security group rules, commands, or typos; using EC2 Instance Connect can resolve many connection problems.


SSH troubleshooting