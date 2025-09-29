EC2 Instance Metadata (IMDS)

• AWS EC2 Instance Metadata (IMDS) is powerful but one of the least known
features to developers
• It allows AWS EC2 instances to ”learn about themselves” without using an
IAM Role for that purpose.
• The URL is http://169.254.169.254/latest/meta-data
• You can retrieve the IAM Role name from the metadata, but you CANNOT
retrieve the IAM Policy.
• Metadata = Info about the EC2 instance
• Userdata = launch script of the EC2 instance
• Let’s practice and see what we can do with it!

IMDSv2 vs. IMDSv1

• IMDSv1 is accessing http://169.254.169.254/latest/meta-data directly
• IMDSv2 is more secure and is done in two steps:
1. Get Session Token (limited validity) – using headers & PUT
2. Use Session Token in IMDSv2 calls – using heade

MFA with CLI

• To use MFA with the CLI, you must create a temporary session
• To do so, you must run the STS GetSessionToken API call
• aws sts get-session-token --serial-number arn-of-the-mfa-device --token-
code code-from-token --duration-seconds 3600

--- 
AWS EC2 Instance Metadata
Introduction to EC2 Instance Metadata Service (IMDS)
Let's discuss EC2 instance metadata, commonly referred to as IMDS. It is a very powerful feature, although not many developers are aware of it. This is how EC2 works inherently. Let's explore it further.

The idea behind the Instance Metadata Service (IMDS) is that EC2 instances can learn about themselves without requiring an IAM Role for that purpose. They can communicate with a specific URL, 169.254.169.254, to retrieve their own metadata.

Using this metadata, an instance can determine information such as its instance name, public IP address, private IP address, and much more. Additionally, it can retrieve the IAM Role name associated with the instance. It is even possible to obtain some credentials from this service; however, the IAM policies attached to the role are not accessible through metadata.

Metadata refers to information about the instance itself. This differs from user data, which is the launch script provided to the EC2 instance at startup. The special URL allows access to both metadata and user data, but in this discussion, we focus solely on the metadata service.

We will have a practical hands-on session in the next lecture to explore what can be done with the metadata service. Before that, it is important to understand the two versions of the IMDS service.

IMDS Versions
IMDSv1: This is the original instance metadata service version 1. It accesses the metadata URL directly and works out of the box.

IMDSv2: Introduced with the rollout of Amazon in 2023, IMDSv2 is enabled by default and provides a more secure way to access metadata. It requires two steps to access the metadata service:

Obtain a session token by sending a PUT request.
Use this token as a header in subsequent requests to the metadata URL.
This additional step adds some overhead but enhances security significantly.

AWS implemented IMDSv2 to improve security over IMDSv1. In the upcoming hands-on, we will demonstrate how to use this more complex version, which is important for you to understand.

That concludes our overview of the EC2 Instance Metadata Service. See you in the next lecture for the practical session.

Key Takeaways
EC2 Instance Metadata Service (IMDS) allows instances to learn about themselves without using an IAM Role.
IMDS is accessed via the special URL 169.254.169.254 to retrieve metadata such as instance name, public and private IPs, and IAM Role name.
IMDSv1 accesses the metadata URL directly, while IMDSv2 requires a session token obtained via a PUT request for enhanced security.
Understanding both versions of IMDS is important for secure and effective interaction with EC2 instance metadata.