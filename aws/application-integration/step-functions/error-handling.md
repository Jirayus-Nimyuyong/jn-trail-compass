Error Handling in Step Functions

• Any state can encounter runtime errors for various reasons:
• State machine definition issues (for example, no matching rule in a Choice state)
• Task failures (for example, an exception in a Lambda function)
• Transient issues (for example, network partition events)
• Use Retry (to retry failed state) and Catch (transition to failure path) in the
State Machine to handle the errors instead of inside the Application Code
• Predefined error codes:
• States.ALL : matches any error name
• States.Timeout: Task ran longer than TimeoutSeconds or no heartbeat received
• States.TaskFailed: execution failure
• States.Permissions: insufficient privileges to execute code
• The state may report is own errors

---

Step Functions – Retry (Task or Parallel State)

• Evaluated from top to bottom
• ErrorEquals: match a specific kind
of error
• IntervalSeconds: initial delay
before retrying
• BackoffRate: multiple the delay
after each retry
• MaxAttempts: default to 3, set to
0 for never retried
• When max attempts are reached,
the Catch kicks in

---

Step Functions – Catch (Task or Parallel State)

• Evaluated from top to bottom
• ErrorEquals: match a specific
kind of error
• Next: State to send to
• ResultPath - A path that
determines what input is sent
to the state specified in the
Next field.

---

Step Function – ResultPath

• Include the error in the input

---

Step Functions - Error Handling
Introduction to Error Handling in Step Functions
Step Functions execute many small tasks that perform minimal work, such as interacting with an API. The key principle is that all error handling should occur outside these tasks, managed by the Step Functions themselves.

When Do Errors Occur?
Errors can arise in various scenarios:

State machine definition issues, such as no matching rule in choice states.
Task failures, for example, when a Lambda function throws an exception.
Transient failures, like network partition events.
Importantly, exceptions should not be caught within the Lambda function itself but handled by the Step Functions' error handling mechanism.

Types of Error Handling in Step Functions
There are two primary error handling mechanisms:

Retry: To retry a task upon failure.
Catch: To transition into a failure path.
These should be implemented within the state machine rather than the application code, simplifying the application and providing detailed execution history of retries and catches directly in the Step Function history.

Predefined Error Codes
Step Functions provide predefined error codes such as:

States.All: Matches any error.
States.Timeout: Task ran longer than the specified timeout.
States.TaskFailed: Execution failure of the task itself, e.g., an exception in a Lambda function.
States.Permissions: Insufficient permissions to execute code.
States themselves may report their own errors, which can be caught within Step Functions.

Retry Mechanism for Tasks or Parallel States
The Retry mechanism allows defining how many times and under what conditions to retry a task based on specific errors. The retry rules are evaluated from top to bottom.

For example, consider a Lambda function with three retry rules:

ErrorEquals: Specifies the error types to match, such as CustomError, TaskFailed, or States.All.
IntervalSeconds: Time to wait before retrying (e.g., 1 second, 30 seconds, 5 seconds).
BackoffRate: Multiplier for delay after each retry to implement exponential backoff (e.g., 2).
MaxAttempts: Maximum number of retry attempts (e.g., 2, 2, 5).
Once all retry attempts are exhausted, the Catch block is triggered.

Advantages of External Retry Logic
Defining retry logic outside the Lambda function in Step Functions avoids long-running Lambda executions that might time out. It also allows changing error handling logic without redeploying the Lambda function, providing greater flexibility and faster execution of Lambda functions.

Catch Mechanism
The Catch mechanism is evaluated from top to bottom and specifies error handling paths when retries are exhausted or specific errors occur.

For example:

ErrorEquals: Matches specific errors like CustomError.
Next: Specifies the next state to transition to, such as a fallback state.
ResultPath: Determines what input is sent to the next state.
This allows handling errors gracefully by transitioning to alternative states and performing actions like logging or notifications.

Example of Catch Usage
If a CustomError occurs, the state machine transitions to a CustomErrorFallback state, which could be a pass state that ends the execution or performs error handling tasks. This structure allows retrying multiple times and then catching errors to proceed with alternative flows.

Understanding ResultPath
ResultPath controls how the output of a state is combined with its input before passing to the next state. For example, setting ResultPath to .error includes the error information in the output.

Consider an input { "foo": "bar" } and a ResultPath of .error. The output will contain the original input plus an error field with details about the error message. This allows subsequent states to analyze or act upon error information, such as sending notifications or debugging.

Conclusion
Step Functions provide robust mechanisms for error handling through Retry and Catch constructs, enabling flexible, maintainable, and observable workflows. Defining error handling externally simplifies application code and enhances control over execution flows.

In the next lecture, we will explore hands-on examples to deepen understanding of retries and catches in Step Functions.

Key Takeaways
Step Functions handle error management externally, simplifying individual task code.
Errors such as state machine definition issues, task failures, and transient failures can be managed via Retry and Catch mechanisms.
Retry allows configurable attempts with intervals, backoff rates, and maximum attempts to handle transient errors.
Catch enables transitioning to failure paths with error-specific handling and passing error information using ResultPath.