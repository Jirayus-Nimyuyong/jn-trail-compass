Elastic Beanstalk Migration: Load Balancer
• After creating an Elastic Beanstalk
environment, you cannot change
the Elastic Load Balancer type
(only the configuration)
• To migrate:
1. create a new environment with the
same configuration except LB
(can’t clone)
2. deploy your application onto the
new environment
3. perform a CNAME swap or Route
53 update

---
RDS with Elastic Beanstalk
• RDS can be provisioned with Beanstalk, which is great for dev / test
• This is not great for prod as the database lifecycle is tied to the
Beanstalk environment lifecycle
• The best for prod is to separately create an RDS database and provide
our EB application with the connection string

---

Elastic Beanstalk Migration: Decouple RDS
1. Create a snapshot of RDS DB (as a
safeguard)
2. Go to the RDS console and protect
the RDS database from deletion
3. Create a new Elastic Beanstalk
environment, without RDS, point your
application to existing RDS
4. perform a CNAME swap (blue/green)
or Route 53 update, confirm working
5. Terminate the old environment (RDS
won’t be deleted)
6. Delete CloudFormation stack (in
DELETE_FAILED state)

---
Beanstalk Migrations
Elastic Beanstalk Migration Overview
This section covers how to perform an Elastic Beanstalk migration, which is a topic that can appear in the exam.

Load Balancer Constraints
After creating a Beanstalk environment, you cannot change the Elastic Load Balancer type; only its configuration can be modified. For example, if you create a Classic Load Balancer, you can only edit its settings but cannot upgrade it to an Application Load Balancer.

Migration Steps for Load Balancer Upgrade
If you want to upgrade from a Classic Load Balancer to an Application Load Balancer, or from an Application Load Balancer to a Network Load Balancer, you need to perform a migration with the following steps:

Create a new environment with the same configuration except for the Load Balancer type.
Note that the clone feature cannot be used because it copies the exact same Load Balancer type and configuration.
Manually recreate the same configuration.
The old environment will be copied (not cloned) into the new environment.
The new environment will have the desired Load Balancer type, for example, an Application Load Balancer.
Deploy your application onto the new environment.
Shift the traffic from the old environment to the new environment using a CNAME swap or Route 53 DNS update.
RDS and Elastic Beanstalk
RDS can be provisioned with your Beanstalk application, which is convenient for development and testing environments. In this setup, your Beanstalk environment includes its own RDS database.

Production Considerations
For production deployments, this setup is not ideal because the database lifecycle is tied to the Beanstalk environment lifecycle. The best practice is to separate the RDS database from your Beanstalk environment and reference it using a connection string, such as an environment variable.

Decoupling RDS from Elastic Beanstalk
If your RDS database is already part of your Beanstalk stack, you can decouple it by following these steps:

Create a snapshot of your RDS database as a safeguard in case anything goes wrong.
Go to the RDS console and enable deletion protection for the RDS database to prevent accidental deletion.
Create a new Elastic Beanstalk environment without RDS.
Point your application to the existing RDS database, for example, by using an environment variable.
Perform a CNAME swap (blue/green deployment) or update DNS records via Route 53 to shift traffic to the new environment.
Confirm that the new environment is working correctly.
Terminate the old environment.
Because deletion protection is enabled, the RDS database will remain intact.
The CloudFormation stack associated with the old environment will fail to delete and enter a "Delete Failed" state.
Manually delete the CloudFormation stack in the AWS CloudFormation console.
This process effectively creates an RDS database independent of your Beanstalk environment, which is the recommended approach for production deployments.

Key Takeaways
Elastic Beanstalk environments do not allow changing the Elastic Load Balancer type after creation; only configuration changes are permitted.
To upgrade the Load Balancer type, a migration involving creating a new environment with the desired Load Balancer is required.
For production deployments, it is best practice to decouple the RDS database from the Elastic Beanstalk environment to avoid lifecycle coupling.
Decoupling RDS involves creating a snapshot, enabling deletion protection, creating a new environment without RDS, pointing to the existing database, performing a CNAME swap, and manually deleting the CloudFormation stack if necessary.