Lambda Integration with ALB

• To expose a Lambda function as an HTTP(S) endpoint…
• You can use the Application Load Balancer (or an API Gateway)
• The Lambda function must be registered in a target group

---

ALB to Lambda: HTTP to JSON

---

Lambda to ALB conversions: JSON to HTTP

---

ALB Multi-Value Headers

• ALB can support multi-value
headers (ALB setting)
• When you enable multi-value
headers, HTTP headers and
query string parameters that
are sent with multiple values
are shown as arrays within the
AWS Lambda event and
response objects.

---

ALB + Lambda – Permissios

---

Lambda & Application Load Balancer
Lambda Integration with Application Load Balancer
Let's discuss how our Lambda function integrates with an Application Load Balancer (ALB).

Currently, Lambda functions can be invoked using either the CLI or the SDK. However, if you want to expose them to the internet, you need to allow users to access them through an HTTP or HTTPS endpoint. There are two ways to achieve this: using an Application Load Balancer or an API Gateway. In this lecture, we will focus on the ALB.

For the ALB to work with Lambda, you need to register the Lambda function in a target group. Clients will send HTTP or HTTPS requests to your ALB, which will synchronously invoke your Lambda function in the target group. The invocation is synchronous because the ALB waits for the Lambda function to respond before returning a response to the client.

How ALB Converts HTTP Requests to Lambda Invocations
The ALB transforms the incoming HTTP request into a JSON document that is passed to the Lambda function. Here is an example of such a request payload:

The top of the JSON document contains ELB information, such as which ELB invoked the Lambda and the target group.
It includes the HTTP method (e.g., GET) and the path (e.g., /lambda).
Query string parameters are included as key-value pairs.
Headers are also included as key-value pairs.
The body is included for POST or PUT requests, along with a flag indicating whether the body is Base64 encoded.
In summary, the query string parameters, headers, and body are all converted into JSON format. The query string parameters and headers are represented as key-value pairs.

Lambda Response Format
Similarly, your Lambda function should return a JSON document. The ALB will convert this JSON response back into an HTTP response. The Lambda response must include:

A status code and description.
Response headers as key-value pairs.
The body of the response.
A flag indicating whether the body is Base64 encoded.
ALB Multi-Value Header Feature
The ALB supports a feature called multi-value headers, which can be enabled directly on your Application Load Balancer as a setting. This feature is useful when clients send headers or query string parameters with multiple values for the same key. Instead of selecting only one value, the ALB preserves all values.

For example, consider the query string parameters after the question mark: name=foo&name=bar. Here, the key name appears twice with different values. By enabling the multi-value header setting, both values are preserved and sent to the Lambda function as an array under the key name. This behavior applies to both HTTP headers and query string parameters.

This concludes our lecture on Lambda integration with Application Load Balancer. I hope you found it informative, and I look forward to seeing you in the next lecture.

Key Takeaways
Lambda functions can be invoked via CLI, SDK, or exposed through HTTP/HTTPS endpoints using Application Load Balancer (ALB) or API Gateway.
To integrate Lambda with ALB, register the Lambda function in a target group; ALB synchronously invokes the Lambda and returns the response to the client.
ALB converts HTTP requests into JSON documents for Lambda, including ELB info, HTTP method, path, query parameters, headers, and body with Base64 encoding flag.
Lambda must return a JSON response with status code, headers, body, and Base64 encoding flag; ALB converts this back to HTTP.
ALB supports a multi-value header feature that preserves multiple values for the same header or query parameter key by sending them as arrays to Lambda.

