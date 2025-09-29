Amazon ECS - Solutions Architectures
Amazon ECS Solution Architectures
In this lecture, we discuss several solution architectures you can encounter with Amazon ECS.

ECS Tasks Invoked by Event Bridge
Consider an Amazon ECS cluster backed by Fargate, alongside S3 buckets. Users upload objects into these S3 buckets. These buckets can be integrated with Amazon Event Bridge to send all events to it. Event Bridge can have a rule configured to run ECS tasks dynamically.

When ECS tasks are created, they have an ECS task role associated with them. From the task itself, it can retrieve the objects, process them, and then send the results into Amazon DynamoDB. This is possible because of the ECS task role associated with the task.

Effectively, this architecture creates a serverless solution to process images or objects from your S3 buckets using a Docker container. This uses Amazon Event Bridge with ECS in Fargate mode, along with an ECS task role to interact with Amazon S3 and Amazon DynamoDB.

Event Bridge Scheduled ECS Tasks
Another architecture involves using an Event Bridge schedule. Here, an Amazon ECS cluster backed by Fargate is combined with Amazon Event Bridge, which schedules a rule to trigger every hour.

This rule runs ECS tasks in Fargate every hour. Each time, a new task is created in the Fargate cluster. The task can perform any desired operation. For example, an ECS task role with access to Amazon S3 allows the Docker container or program to perform batch processing against files in Amazon S3 every hour.

This architecture is also fully serverless.

ECS Service with SQS Queue Integration
A further example uses ECS with an SQS queue. In this setup, an ECS service runs with two ECS tasks. Messages are sent into an SQS queue, and the service pulls messages from the queue to process them.

ECS Service Auto Scaling can be enabled on top of this service. This means that as the number of messages in the SQS queue increases, the number of tasks in the ECS service scales up accordingly, thanks to auto-scaling.

Event Bridge Monitoring of ECS Task Lifecycle
Event Bridge can also intercept events from within your ECS cluster. For example, you may want to react to tasks exiting.

Any task starting or exiting in your ECS cluster can trigger an event in Event Bridge. This event includes details such as the ECS task state change to "stopped" and the stopped reason.

From there, you could alert an SNS topic to send emails to administrators. In summary, Event Bridge allows you to understand the lifecycle of your containers in your ECS cluster.

Conclusion
This concludes the lecture on Amazon ECS solution architectures. These architectures demonstrate how to build scalable, serverless, and event-driven containerized applications using Amazon ECS, Event Bridge, S3, DynamoDB, SQS, and SNS.

Key Takeaways
Amazon ECS tasks can be invoked by Event Bridge to create serverless architectures.
Event Bridge schedules enable running ECS tasks on a recurring basis, such as hourly batch processing.
ECS services can integrate with SQS queues, allowing auto-scaling based on queue message volume.
Event Bridge can monitor ECS task lifecycle events, enabling alerts and operational insights.