X-Ray with Elastic Beanstalk

• AWS Elastic Beanstalk platforms include the X-Ray daemon
• You can run the daemon by setting an option in the Elastic Beanstalk console
or with a configuration file (in .ebextensions/xray-daemon.config)
• Make sure to give your instance profile the correct IAM permissions so that
the X-Ray daemon can function correctly
• Then make sure your application code is instrumented with the X-Ray SDK
• Note: The X-Ray daemon is not provided for Multicontainer Docker

---

X-Ray with Beanstalk
Integrating AWS X-Ray with Elastic Beanstalk
This lecture provides a quick overview of how to integrate AWS X-Ray with Elastic Beanstalk (Beanstalk).

The Beanstalk platform includes the X-Ray daemon by default, so there is no need to include it manually. You can run the daemon by simply setting one option in the Beanstalk console, as will be demonstrated in the hands-on section.

Alternatively, you can create an EB extensions file named x-ray-daemon.config inside the .ebextensions folder. This file should have a .config extension and contain a single line that enables the X-Ray daemon. This approach is straightforward and simple.

Once you enable the X-Ray daemon, ensure that your EC2 instance has an instance profile with the correct IAM permissions. This is necessary for the X-Ray daemon to function properly and write data to the X-Ray service.

Additionally, your application code must be instrumented with the X-Ray SDK to send trace data. If you are running multiple Docker containers, you will need to manage the X-Ray daemon yourself, which will be covered in the next lecture focusing on ECS.

Creating a Beanstalk Application with X-Ray Enabled
Let's proceed to create an application to demonstrate X-Ray integration with Beanstalk. We will create a web server environment, name the application, and select Node.js as the platform. We will keep all other settings as default and choose a single instance environment.

After clicking next, select an existing service role and choose a key pair. Proceed by clicking next. There is no need to configure VPC or instance traffic and scaling settings, so continue by clicking next through those steps.

In the monitoring section, scroll down to find the Amazon X-Ray option under platform software. Activate the X-Ray daemon by enabling this option. This will enable X-Ray on the Beanstalk EC2 instances.

Click next and then submit to launch the environment. X-Ray is now activated, and Beanstalk will launch the environment with X-Ray enabled.

Verifying IAM Role Permissions for X-Ray
Let's examine the configuration to verify the EC2 instance profile. The profile used is AWS Elastic Beanstalk EC2 Role. In the IAM console, navigate to Roles and search for this role. Click on it to view the permission policies attached.

One of the policies attached is the Elastic Beanstalk Web Tier Policy. Inspecting this policy reveals that it includes the necessary permissions for X-Ray. These permissions allow the daemon running on the EC2 instance to send data to Amazon X-Ray and retrieve data as needed.

It is important to note that if you launch a Beanstalk application using a custom role instead of the default role, you must ensure that the custom role includes the necessary permissions for X-Ray.

Viewing X-Ray Traces
If your application has more than just a congratulations page and is properly integrated with X-Ray, you will be able to see the traces in the X-Ray console. At minimum, you have now seen how to enable the X-Ray option under Beanstalk.

This concludes the lecture on integrating Beanstalk with X-Ray. Remember to terminate your environment after completing your work.

Key Takeaways
The AWS Elastic Beanstalk platform includes the X-Ray daemon, which can be enabled via a simple configuration.
Enabling X-Ray requires setting an option in the Beanstalk console or creating an .ebextensions/x-ray-daemon.config file.
The EC2 instance profile must have the correct IAM permissions to allow the X-Ray daemon to send data.
Application code must be instrumented with the X-Ray SDK to send trace data for monitoring.
