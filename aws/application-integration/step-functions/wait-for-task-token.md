Step Functions – Wait for Task Token

• Allows you to pause Step Functions during a Task until a Task Token is
returned
• Task might wait for other AWS services, human approval, 3rd party
integration, call legacy systems…
• Append .waitForTaskToken to the Resource field to tell Step Functions
to wait for the Task Token to be returned
• Task will pause until it receives that Task Token back with a
SendTaskSuccess or SendTaskFailure API call

---

Step Functions - Wait For Task Token
Step Functions - Wait For Task Token
In this lecture, we discuss a Step Functions feature called wait for task token. This feature allows your Step Functions execution workflow to pause and wait for a specific task token to be returned before proceeding.

The purpose of waiting for a task token is to enable your workflow to wait for an external event or process. This could be an AWS service performing some action, a human approval, a third-party integration, or a call to legacy systems.

To implement this, you append .waitForTaskToken to the resource field in your Step Functions task. This instructs Step Functions to pause the execution and wait until it receives the specific task token back before moving on.

For example, consider a resource named sqs:sendMessage with .waitForTaskToken appended. This configuration causes the task to pause until it receives a task token back via either a SendTaskSuccess or SendTaskFailure API call.

Example Workflow
The workflow starts and checks client credits, which depends on an external service.
It calls SQS with a task token by using the waitForTaskToken feature in the resource.
The input to the SQS queue message includes the task token so the receiving application knows how to call back Step Functions.
The SQS queue is then processed by an application, which could be a Lambda function, ECS, EC2, or a third-party server.
The application receives the message body and the task token.
Upon success or failure, the application calls the SendTaskSuccess or SendTaskFailure API, passing the output and the original task token.
Once Step Functions receives the API call with the correct task token and output, the workflow continues.
This approach allows your Step Functions workflow to rely on external systems to perform processing before continuing. It provides a flexible way to integrate with any external mechanism while maintaining workflow control.

This concludes the lecture on the wait for task token feature in Step Functions.

Key Takeaways
The waitForTaskToken feature in AWS Step Functions allows workflows to pause and wait for an external task token before proceeding.
This feature is useful for integrating external services, human approvals, third-party integrations, or legacy systems into Step Functions workflows.
The workflow sends a task token along with the message to an external service such as SQS, which then processes the message and calls back Step Functions using SendTaskSuccess or SendTaskFailure API calls.
This mechanism enables reliable coordination between Step Functions and external processes, ensuring the workflow continues only after receiving the appropriate response.