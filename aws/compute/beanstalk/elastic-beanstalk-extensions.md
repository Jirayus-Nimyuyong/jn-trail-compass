Beanstalk Extensions
Introduction to Elastic Beanstalk Extensions
When creating a zip file for deployment to Elastic Beanstalk, it contains your application code. However, you can also include Elastic Beanstalk (EB) extensions. These extensions allow you to configure parameters programmatically, similar to settings you can adjust in the Elastic Beanstalk user interface.

EB Extensions Directory and File Format
All configuration files for EB extensions must be placed inside a directory named .ebextensions/ located at the root of your source code. These files must be in either YAML or JSON format. Despite the format, the file extension must be .config. For example, a file could be named logging.config.

Modifying Defaults and Adding Resources
You can modify default settings using the option_settings document within EB extensions. Additionally, EB extensions allow you to add AWS resources such as RDS, ElastiCache, and DynamoDB. These resources might not be configurable directly through the Elastic Beanstalk console.

Lifecycle of Resources Managed by EB Extensions
Any resource managed by EB extensions is deleted if the Elastic Beanstalk environment is terminated. For example, if you create an ElastiCache instance as part of your environment and then delete the environment, the ElastiCache instance will also be deleted.

Hands-on Example: Setting Environment Variables with EB Extensions
In the code directory, a folder named nodejs-v3-ebextensions contains a .ebextensions directory. Inside this directory, there is a file named environment-variables.config. This file ends with .config and is placed correctly to be recognized by Elastic Beanstalk.

The file uses YAML formatting, despite having a .config extension. Within this file, the option_settings section is used to define environment variables such as DB_URL and DB_USER. These variables can be used to configure connections to external resources like an RDS Postgres database.

Deploying the Application with EB Extensions
The application, including the .ebextensions directory and its configuration files, is zipped into nodejs-v3-ebextensions.zip. This zip file is then uploaded and deployed to the Elastic Beanstalk environment. The deployment is performed on a development environment for faster updates.

After deployment, the environment is updated with the new version containing the EB extensions.

Verifying the Applied EB Extensions
To verify that the EB extensions have been applied, navigate to the Elastic Beanstalk environment's Configuration page. Scroll down to the Environment Properties section, where you will find the environment variables DB_URL and DB_USER set. These were not set manually in the console but were applied from the deployed EB extension files.

This demonstrates the power and flexibility of EB extension configuration files.

Conclusion
This overview introduces the use of Elastic Beanstalk extensions for configuring environment variables and managing AWS resources programmatically. While this only scratches the surface, it covers essential knowledge for managing Elastic Beanstalk environments effectively.

Key Takeaways
Elastic Beanstalk extensions allow configuration of environment parameters through code using .config files.
EB extension files must be placed in the .ebextensions/ directory at the root of the source code and use YAML or JSON format.
EB extensions can set environment variables and add AWS resources like RDS or ElastiCache that are managed alongside the Elastic Beanstalk environment.
Resources created via EB extensions are deleted when the Elastic Beanstalk environment is terminated.

---

Elastic Beanstalk Extensions

• A zip file containing our code must be deployed to Elastic Beanstalk
• All the parameters set in the UI can be configured with code using files
• Requirements:
• in the .ebextensions/ directory in the root of source code
• YAML / JSON format
• .config extensions (example: logging.config)
• Able to modify some default settings using: option_settings
• Ability to add resources such as RDS, ElastiCache, DynamoDB, etc…
• Resources managed by .ebextensions get deleted if the environment goes away