API Gateway - Integration Types

• Integration Type MOCK
• API Gateway returns a response without sending the request to the backend

• Integration Type HTTP / AWS (Lambda & AWS Services)
• you must configure both the integration request and integration response
• Setup data mapping using mapping templates for the request & response

• Integration Type AWS_PROXY (Lambda Proxy):
• incoming request from the client is the input to Lambda
• The function is responsible for the logic of request / response
• No mapping template, headers, query string parameters… are passed as
arguments

• Integration Type HTTP_PROXY
• No mapping template
• The HTTP request is passed to the backend
• The HTTP response from the backend is forwarded by API Gateway
• Possibility to add HTTP Headers if need be (ex: API key)

---

Mapping Templates (AWS & HTTP Integration)

• Mapping templates can be used to modify request / responses
• Rename / Modify query string parameters
• Modify body content
• Add headers
• Uses Velocity Template Language (VTL): for loop, if etc…
• Filter output results (remove unnecessary data)
• Content-Type can be set to application/json or application/xml

---

Mapping Example: JSON to XML with SOAP

• SOAP API are XML based, whereas REST API are JSON based
• In this case, API Gateway should:
• Extract data from the request: either path, payload or header
• Build SOAP message based on request data (mapping template)
• Call SOAP service and receive XML response
• Transform XML response to desired format (like JSON), and respond to the user

---

Mapping Example: Query String parameters

---

API Gateway Integration Types & Mappings
API Gateway Integration Types & Mappings
In this lecture, we discuss the different ways to integrate API Gateway with backend services. Understanding these integration types is essential for configuring API Gateway effectively.

MOCK Integration
The MOCK integration type returns a response without sending any request to the backend. This is useful during development and testing when backend implementation is not yet available. However, MOCK integration is not suitable for production environments.

HTTP and AWS Lambda Integration
API Gateway can forward requests to HTTP endpoints or AWS Lambda functions. In these cases, you must configure both an integration request and an integration response. This setup allows the use of mapping templates to modify the request sent to the backend and the response returned to clients. Mapping templates enable changing, renaming, or reordering data so that the backend can understand the API call made by API Gateway.

For example, when creating a REST API, you can map the REST API call to an API call on an SQS Queue by adjusting the request format accordingly. This demonstrates the power of API Gateway to transform both requests and responses.

AWS Lambda Proxy Integration
The AWS Lambda Proxy integration forwards the client request directly as input to the Lambda function without any modification. In this proxy mode, mapping templates cannot be used to change headers, query string parameters, or the body. The Lambda function itself is responsible for processing the request and generating the response.

When logging the event in the Lambda function, the request includes details such as the resource, path, HTTP method, headers, query string parameters, stage variables, and body. The Lambda function processes this event and returns a response specifying the status code, headers, and body. In this integration, API Gateway acts solely as a proxy passing requests and responses through.

HTTP Proxy Integration
Similar to Lambda Proxy, HTTP Proxy integration passes the request directly to the backend without modification. The response from the backend is proxied back to the client. Optional HTTP headers, such as an API key, can be added between API Gateway and the backend to secure the communication without exposing secrets to the client.

For example, a client sends an HTTP request to API Gateway, which proxies the request to a backend such as an Application Load Balancer. API Gateway can add headers like an API key to authenticate the request with the backend, while the client remains unaware of these details.

Mapping Templates
Mapping templates are applicable when integrating with AWS services or HTTP endpoints without using proxy methods. They allow modification of requests and responses by renaming or changing query string parameters, modifying body content, and adding or changing headers.

Mapping templates use the Velocity Template Language (VTL), a scripting language that supports control structures such as loops and conditionals. This enables complex transformations of the request and response data.

When setting mapping templates, the Content-Type must be set to either application/json or application/xml to indicate the format of the data being transformed.

Use Case: Integrating with a SOAP API
SOAP APIs are XML-based, whereas REST APIs typically use JSON. To integrate a client using JSON with a SOAP backend, API Gateway can use mapping templates to convert JSON payloads into XML SOAP messages and vice versa.

The API Gateway extracts data from the request path, payload, or headers, builds the necessary SOAP message using the mapping template, calls the SOAP service, receives the XML response, and transforms it back into a format suitable for the client.

Example: Mapping Query String Parameters
In a scenario where a client sends a request with query string parameters such as ?name=foo&other=bar, and the API Gateway integrates with Lambda directly (not as a proxy), mapping templates can rename these parameters before passing them to the Lambda function.

For instance, the JSON passed to the Lambda function could rename name to foo and other to bar. This flexibility allows customization of the data structure received by the backend.

This concludes the theoretical overview of API Gateway integration types and mapping templates. Next, we will explore practical examples to see how these concepts work in real scenarios.

Key Takeaways
API Gateway supports multiple integration types including MOCK, HTTP, AWS Lambda, and HTTP Proxy.
Mapping templates allow modification of requests and responses, enabling transformations such as JSON to XML for SOAP APIs.
Proxy integrations pass requests and responses directly without modification, placing logic responsibility on the backend.
Velocity Template Language (VTL) is used in mapping templates to script request and response transformations.
