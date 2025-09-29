Step Functions – Activity Tasks

• Enables you to have the Task work performed by an
Activity Worker
• Activity Worker apps can be running on EC2, Lambda,
mobile device…
• Activity Worker poll for a Task using GetActivityTask API
• After Activity Worker completes its work, it sends a
response of its success/failure using SendTaskSuccess or
SendTaskFailure
• To keep the Task active:
• Configure how long a task can wait by setting TimeoutSeconds
• Periodically send a heartbeat from your Activity Worker using
SendTaskHeartBeat within the time you set in
HeartBeatSeconds
• By configuring a long TimeoutSeconds and actively
sending a heartbeat, Activity Task can wait up to 1 year

---

Step Functions - Activity Tasks
Activity Tasks in Step Functions
Let's examine Activity Tasks within Step Functions. The intent behind Activity Tasks is quite similar to the wait-for-task-token pattern we discussed earlier, but the method of implementation differs slightly.

In this model, we have what are called activity workers. These workers perform tasks assigned by your Step Functions workflows. Activity workers can be running on EC2 instances, Lambda functions, mobile devices, or any platform you choose.

Activity workers regularly poll Step Functions to find tasks using the GetActivityTask API. When they receive work, they execute the task and upon completion, send a response back using either SendTaskSuccess or SendTaskFailure API calls, which are the same as those used previously.

For example, an EC2 instance acting as an activity worker will poll for a task with GetActivityTask. Step Functions will respond if there is work available, providing the input and a task token. Once the task is completed, the worker sends back the output along with the task token using SendTaskSuccess.

Although this process may appear similar to the wait-for-task-token pattern, there is a key difference in the activity mechanism. In the Activity Task model, EC2 instances or applications pull tasks from Step Functions. This pull mechanism simplifies the network setup since the EC2 instance only needs connectivity to Step Functions.

Pull vs Push Mechanisms
Activity Task: Pull-based mechanism where workers poll Step Functions for tasks.
Wait-for-Task-Token Pattern: Push-based mechanism where Step Functions push events out, for example, to an SQS queue, and an external component pulls tasks from there back into Step Functions.
This distinction means the Activity Task model generally involves a simpler network diagram with a pull mechanism, while the wait-for-task-token pattern involves a push mechanism requiring additional components to pull tasks back into Step Functions.

Parameters for Activity Tasks
When using Activity Tasks, there are several important parameters to configure:

TimeoutSeconds: Defines how long a task in progress can wait before it is considered a failure.
HeartbeatSeconds: Defines the maximum time to wait for a heartbeat signal from the activity worker to consider the task alive.
The activity worker must regularly send heartbeat signals using the SendHeartbeat API call to indicate the task is still active.

For example, if HeartbeatSeconds is set to 10 seconds, it is advisable to send a heartbeat every 5 seconds to ensure the task remains alive. If you configure a very long TimeoutSeconds and continuously send heartbeats, an Activity Task can effectively run for up to one year.

This concludes our overview of Activity Tasks in Step Functions. Thank you for your attention, and I look forward to seeing you in the next lecture.

Key Takeaways
Activity Tasks in Step Functions use a pull mechanism where activity workers poll for tasks using the GetActivityTask API.
Activity workers can run on EC2 instances, Lambda functions, mobile devices, or other platforms.
Task completion is reported back to Step Functions using SendTaskSuccess or SendTaskFailure API calls.
TimeoutSeconds defines how long a task can run before being considered failed, and HeartBeatSeconds configures the maximum allowed time between heartbeat signals to keep the task alive.