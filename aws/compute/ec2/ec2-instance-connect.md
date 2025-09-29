EC2 Instance Connect

• Connect to your EC2 instance within your browser
• No need to use your key file that was downloaded
• The “magic” is that a temporary key is uploaded onto EC2 by AWS
• Works only out-of-the-box with Amazon Linux 2
• Need to make sure the port 22 is still opened!

---

EC2 Instance Connect
Introduction to EC2 Instance Connect
I want to show you an alternative to SSH that I found a lot easier, which is the EC2 Instance Connect.

To use this, click on "My First Instance" and then click on the "Connect" button at the top. You will see multiple options, including the SSH client we saw before.

One option I want to show you is the EC2 Instance Connect. This allows us to do a browser-based SSH session into our EC2 instance.

For this, we verified the public IP address, which is good. The username is provided by default, which is ec2-user because AWS guesses that we are using Amazon Linux 2, and therefore ec2-user is the right username.

If you wanted to, you could override the username, but it does not work unless you enter ec2-user. So we will leave it as is for now.

As you can see, there is no SSH key option because when we connect, it uploads a temporary SSH key for us and establishes a connection this way.

With this methodology, we do not even need to manage SSH keys, which I found lovely.

You click on "Connect" and it opens a new tab. Very quickly, you are into your Amazon Linux 2 AMI and can start running commands such as whoami or ping google.com.

As you can see, everything is working. The cool thing is that your session is in the browser instead of using a different command line interface such as Terminal.

You can run commands like ping google.com or any other commands you want without using the SSH utility beforehand.

In this course, if I say use SSH, you have the option to use your own terminal, MobaXterm, PuTTY, or the SSH command on Windows, Linux, or Mac, or to use the EC2 Instance Connect.

This method relies on SSH behind the scenes.

Security Group Configuration for EC2 Instance Connect
For example, if I go to my instance and look at the security group, I want to edit the inbound rules.

I click on my security group, then edit the inbound rules. I remove the SSH inbound rule by deleting it and saving the rules.

Then I go back to my EC2 instances, close the current connection, and try to establish a new EC2 Instance Connect session.

When I try to connect, it does not work because there is a problem connecting to your instance. The first thing is that you need to open port 22.

Back in the launch wizard, I can fix this by editing the inbound rule and adding the SSH rule from anywhere (IPv4), then saving the rule.

Sometimes, if it does not work for you, it might be because you are using IPv6. Therefore, you need to add the SSH rule from anywhere (IPv6) as well.

You need to add these two entries for your EC2 Instance Connect to work, depending on your setup.

Now we are good to go. If we try to connect to the instance itself, it works.

Voila, we are into the instance.

That was a quick demo of EC2 Instance Connect. I will use it a lot in this course. I hope you liked it, and I will see you in the next lecture.

Key Takeaways
EC2 Instance Connect provides a browser-based SSH session to EC2 instances, simplifying access without managing SSH keys.
The default username for Amazon Linux 2 AMI is ec2-user, which is automatically set by AWS.
EC2 Instance Connect requires port 22 to be open in the security group's inbound rules for successful connection.
This method relies on SSH behind the scenes but eliminates the need for manual SSH key management.