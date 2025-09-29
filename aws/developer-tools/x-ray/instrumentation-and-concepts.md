X-Ray Instrumentation in your code
• Instrumentation means the
measure of product’s performance,
diagnose errors, and to write trace
information.
• To instrument your application
code, you use the X-Ray SDK
• Many SDK require only
configuration changes
• You can modify your application
code to customize and annotation
the data that the SDK sends to X-
Ray, using interceptors, filters,
handlers, middleware…

X-Ray Concepts

• Segments: each application / service will send them
• Subsegments: if you need more details in your segment
• Trace: segments collected together to form an end-to-end trace
• Sampling: decrease the amount of requests sent to X-Ray, reduce cost
• Annotations: Key Value pairs used to index traces and use with filters
• Metadata: Key Value pairs, not indexed, not used for searching
• The X-Ray daemon / agent has a config to send traces cross account:
• make sure the IAM permissions are correct – the agent will assume the role
• This allows to have a central account for all your application tracing

---
X-Ray: Instrumentation and Concepts
Introduction to X-Ray Instrumentation
Instrumentation is a term that may be new to some. It refers to the measurement of a product's performance, diagnosing errors, and writing trace information. This is a field within Software Engineering dedicated to these tasks.

When we want to instrument our application with X-Ray, we need to modify our code and use the X-Ray SDK.

Here is an example of how to instrument Node.js code with the X-Ray SDK. By requiring the X-Ray SDK and integrating it with an Express app, the code becomes instrumented. This means trace information from the code will be sent to the X-Ray service.

The use of the X-Ray SDK is minimal; sometimes it only requires configuration changes or slight modifications to the application code.

If customization of traces is needed, such as annotating data or changing how X-Ray sends data to the Express service, developers can create interceptors, filters, handlers, and middleware. This is an advanced feature that allows customization of X-Ray's behavior within the code.

Advanced X-Ray Concepts
A segment represents a unit of work in the URL, and each application or service sends segments. For more granularity, subsegments can be defined to include more detailed information within segments.

A trace is the collection of all segments, providing an end-to-end view of an API call or request.

Trace Sampling
Sampling reduces the number of requests sent to X-Ray to control costs. By default, the X-Ray SDK records every first request each second (called the reservoir) and five percent of additional requests (called the rate).

This mechanism ensures at least one trace per second if the service is receiving requests, while limiting the volume of data sent.

Annotations and Metadata
Annotations are key-value pairs added to traces that are indexed and can be used with filters to search traces. Metadata are also key-value pairs but are not indexed and cannot be used for searching.

Annotations are extremely important for trace filtering and analysis in X-Ray.

Cross-Account Trace Sending
The X-Ray daemon agent can be configured to send traces across AWS accounts. This requires correct IAM permissions, allowing the agent to assume the appropriate role. This setup enables centralized logging and application tracing across multiple accounts.

Custom Sampling Rules
Sampling rules can be customized to control the amount of data sent to X-Ray without changing application code. For example, increasing the reservoir size and rate for POST requests allows more traces to be sent for those requests.

One can also set rules to send all requests to X-Ray, which is useful for debugging but can be expensive in production due to the high volume of data.

The advantage of modifying sampling rules in the X-Ray console is that applications do not need to be restarted or changed. The X-Ray daemon automatically updates and sends the correct amount of data based on the new rules.

Summary
In this lecture, we covered how to instrument code with the X-Ray SDK, the concepts of segments, subsegments, and traces, the importance of annotations versus metadata, cross-account trace sending, and how sampling rules control data volume and cost.

Key Takeaways
Instrumentation involves measuring performance, diagnosing errors, and writing trace information using the X-Ray SDK.
Segments and subsegments provide granular trace data, while traces aggregate these for end-to-end views.
Annotations are indexed key-value pairs used for filtering traces, unlike metadata which are not indexed.
Sampling rules control the volume of trace data sent to X-Ray, balancing cost and detail without requiring code changes.