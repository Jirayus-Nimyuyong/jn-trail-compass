Lambda – Event and Context Objects

• Event Object
• JSON-formatted document contains data for the function to process
• Contains information from the invoking service (e.g., EventBridge, custom, …)
• Lambda runtime converts the event to an object (e.g., dict type in Python)
• Example: input arguments, invoking service arguments, …

• Context Object
• Provides methods and properties that provide information about the invocation,
function, and runtime environment
• Passed to your function by Lambda at runtime
• Example: aws_request_id, function_name, memory_limit_in_mb, …

---

Lambda Event & Context Objects
Understanding Lambda Event and Context Objects
In this lecture, we will explore a very important concept: the event and context objects in your Lambda function.

Example Invocation by EventBridge
Consider an example where your Lambda function is invoked by an EventBridge rule. EventBridge creates an event, which is then passed to your Lambda function. This data is referred to as the event object.

The event object includes detailed information about the event itself, such as where it was emitted from. The service that triggers the event includes a lot of data related to that event within the event object.

The Context Object
Alongside the event object, there is the context object. This is the second part of your Lambda function input and contains metadata about your function. Examples include the AWS request ID, your function name, the associated log group, memory limits, and more.

The event object and the context object are very different but complementary. The event object is a JSON-formatted document containing data that the function will process.

The invoking service, such as EventBridge, SQS, or SNS, provides all the information needed for your Lambda function to process the events.

Event Object Conversion Based on Runtime
Depending on the runtime you are using, the event object is converted into an appropriate object. For example, in Python, it is converted into a dictionary. Any input arguments or invoking service arguments are contained within this event object.

The context object, on the other hand, provides methods and data about the invocation itself and the runtime environment. This object is passed to your Lambda function at runtime.

From the context object, you can retrieve the AWS request ID, function name, memory limit in megabytes, and other relevant information. This context information can be used within your Lambda function as needed.

Example Handler Signature in Python
In your code, for example in Python, the handler function typically accepts two parameters: event and context. The event parameter contains information such as the source or region of the event, which you can print to the console.

The context parameter contains information such as the request ID, function ARN, function name, memory limits, and CloudWatch Logs details like the stream name and group name.

Summary
Understanding the differences and uses of the event and context objects allows you to select the correct one to retrieve specific information, which is essential knowledge for your exam and practical Lambda function development.

Key Takeaways
The event object in a Lambda function contains JSON-formatted data about the triggering event.
The context object provides metadata about the Lambda function invocation and runtime environment.
Event data is converted into language-specific objects, such as dictionaries in Python.
Both event and context objects are essential and complementary for processing and managing Lambda function executions.