Step Functions – Standard vs. Express

---

Step Functions - Standard vs Express
Step Functions - Standard vs Express
In this lecture, we explore the different ways of running Step Functions workflows. There are two main types: standard workflows and express workflows. Within express workflows, there are asynchronous and synchronous types. We will examine all of these.

Standard Workflows
The standard workflow is the default option. It supports a maximum duration of a single workflow of up to one year. Its execution model guarantees exactly-once execution. You can execute approximately 2,000 standard workflows per second, which provides a good rate.

Regarding execution history, you get up to 90 days of history in the console. Additionally, you can use CloudWatch to access more logs and configure log retention settings to keep logs indefinitely.

Pricing for standard workflows is based on the number of state transitions, which means the number of times the workflow moves from one state to another.

Use cases for standard workflows include non-idempotent actions such as payment processing.

Express Workflows
Express workflows are designed for short executions, up to five minutes. They offer extremely high capacity, supporting over 100,000 executions per second, which is suitable for high-volume workloads.

However, express workflows do not provide execution tracking in the console. The only way to obtain execution results and perform analysis is through CloudWatch logs.

Billing for express workflows is based on the number of executions, the duration of each execution, and memory consumption.

Typical use cases for express workflows include IoT data ingestion, streaming data, and mobile app backends.

Asynchronous vs Synchronous Express Workflows
Within express workflows, there are asynchronous and synchronous types. The main difference is in their execution guarantees:

Asynchronous express workflows have an at least once execution model guarantee.
Synchronous express workflows have an at most once execution model guarantee.
This distinction is important and will be tested in the exam.

Asynchronous Express Workflows
When using an asynchronous express workflow, the execution starts and does not wait for the results. To determine if the workflow has ended and if the result is correct, you must check CloudWatch logs.

This mode is suitable when you do not need an immediate response. For example, in messaging services, you send a message without waiting for confirmation that it was sent successfully.

Because asynchronous express workflows have an at least once execution guarantee, in case of errors, the system can retry automatically. This means the same action might be performed twice. Therefore, you must manage idempotence to ensure that running the same action twice does not cause duplicate effects.

Synchronous Express Workflows
In synchronous express workflows, you invoke the workflow and wait for it to complete before receiving the result.

This is useful when you need an immediate response from the workflow itself. For example, when orchestrating microservices, you want to ensure everything is working correctly before stopping the execution.

You can invoke synchronous workflows from API Gateway or Lambda functions and receive a response.

The execution model is at most once, meaning if there is a failure, Step Functions will not restart the workflow automatically. It is up to you to implement retry logic if needed.

Summary
To summarize, standard workflows are suitable for long-running, exactly-once executions with moderate throughput and detailed execution history. Express workflows are designed for short, high-volume executions with different execution guarantees depending on whether they are asynchronous or synchronous.

Understanding these differences helps in choosing the appropriate workflow type for your use case.

Key Takeaways
Standard workflows support up to one year execution with exactly-once execution and moderate throughput.
Express workflows are designed for short executions up to five minutes with very high throughput.
Express workflows include asynchronous (at least once execution) and synchronous (at most once execution) modes.
Use cases vary: standard for non-idempotent actions like payment processing; express for high-volume, short-duration tasks like IoT data ingestion.