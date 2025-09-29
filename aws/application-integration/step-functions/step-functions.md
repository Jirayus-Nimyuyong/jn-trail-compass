AWS Step Functions

• Model your workflows as state
machines (one per workflow)
• Order fulfillment, Data processing
• Web applications, Any workflow
• Written in JSON
• Visualization of the workflow and
the execution of the workflow, as
well as history
• Start workflow with SDK call, API
Gateway, Event Bridge
(CloudWatch Event)

---

Step Function – Task States

• Do some work in your state machine
• Invoke one AWS service
• Can invoke a Lambda function
• Run an AWS Batch job
• Run an ECS task and wait for it to complete
• Insert an item from DynamoDB
• Publish message to SNS, SQS
• Launch another Step Function workflow…
• Run an one Activity
• EC2, Amazon ECS, on-premises
• Activities poll the Step functions for work
• Activities send results back to Step Functions

---

Example – Invoke Lambda Function

---

Step Function - States

• Choice State - Test for a condition to send to a branch (or default branch)
• Fail or Succeed State - Stop execution with failure or success
• Pass State - Simply pass its input to its output or inject some fixed data,
without performing work.
• Wait State - Provide a delay for a certain amount of time or until a
specified time/date.
• Map State - Dynamically iterate steps.’
• Parallel State - Begin parallel branches of execution.

---

Step Functions Overview
Introduction to AWS Step Functions
AWS Step Functions allow you to model a workflow as state machines, with one state machine per workflow. This can be used for scenarios such as order fulfillment, data processing, web applications, or any workflow you want to automate.

The idea is that you define what happens, what happens next, and what happens based on some condition, and so on, to define a workflow. As shown on the right-hand side, there is a visual workflow example: it starts with a yes or no decision. If the answer is no, then you go to the end. If it is yes, then you wait three seconds, say "Hello" and "World," compile the result into "Hello World," and then go to the end.

You define a workflow in JSON, which allows you to get a visualization of the workflow. The workflow gets executed visually, and you can see the history of the execution itself.

Every little step in the workflow is, for example, a Lambda function, inserting data into DynamoDB, or a specific ECS task. The Step Function orchestrates this workflow for you.

To start a workflow, you can use an SDK API call, API Gateway, CloudWatch Events or Amazon EventBridge (which are the same), or launch a Step Function manually from the console, as will be done in the hands-on session.

Step Functions have a series of boxes called tasks. The task state is used to perform some work in your state machine. For example, the task state could invoke a Lambda function, a Batch job, run an ECS task and wait for it to complete, insert an item directly into DynamoDB, publish a message into SNS or SQS, or even launch another Step Function workflow.

A task could also be running one activity, which could be an EC2 machine, an Amazon ECS task, or an on-premises server that pulls work from Step Functions to do the work and then sends back the results. In this case, the app server is not invoked by the Step Function; instead, the app server pulls for Step Functions to find activities and work to do. This is similar to how the AWS service SWF worked.

Defining a Task State to Invoke a Lambda Function
For example, to define a task state to invoke a Lambda function, you define a JSON object with the name "Invoke Lambda function," type "Task," and the resource as the Lambda function invoke action. The parameters specify the function name and the input payload to the Lambda function. You also specify the next state to go to and a timeout to detect if the Lambda function is timing out.

Types of States in Step Functions
Choice State: Tests a condition to send execution to a branch or the default branch.
Fail or Succeed State: Stops executing the workflow with a failure or success.
Pass State: Passes the input to the output or injects fixed data without performing work.
Wait State: Provides a delay for a certain amount of time or until a specified date and time.
Map State: Dynamically iterates steps.
Parallel State: Begins parallel branches of execution.
From an exam perspective, the Parallel and Task states are most important to remember.

Visual Execution Workflow Example
Consider a workflow where you submit a job, wait for X seconds, get the job status, and check if the job is complete. If not, you wait again, creating a loop. When the job is complete, you get the final job status. If the job failed, you handle the failure, then proceed to the end. The execution shows progress in blue, loops while waiting, and ends when complete, providing a visual aspect of Step Functions.

Step Functions orchestrate whatever work you need to do by defining how your state machine and workflow look. Although it may seem confusing at first, especially since you could do all of that in one Lambda function, the power of Step Functions becomes clear with hands-on experience and when exploring features like error handling in further lectures.

Key Takeaways
AWS Step Functions allow modeling workflows as state machines, with one state machine per workflow.
Workflows are defined in JSON, enabling visual representation and execution tracking.
Task states in Step Functions can invoke Lambda functions, Batch jobs, ECS tasks, or interact with DynamoDB, SNS, SQS, and other services.
Step Functions support various state types including Choice, Fail, Succeed, Pass, Wait, Map, and Parallel states for flexible workflow control.

