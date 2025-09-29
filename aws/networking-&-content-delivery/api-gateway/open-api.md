API Gateway - Open API spec

• Common way of defining REST APIs, using API definition as code
• Import existing OpenAPI 3.0 spec to API Gateway
• Method
• Method Request
• Integration Request
• Method Response
• + AWS extensions for API gateway and setup every single option
• Can export current API as OpenAPI spec
• OpenAPI specs can be written in YAML or JSON
• Using OpenAPI we can generate SDK for our applications

---

REST API – Request Validation

• You can configure API Gateway to perform basic validation of an API
request before proceeding with the integration request
• When the validation fails, API Gateway immediately fails the request
• Returns a 400-error response to the caller
• This reduces unnecessary calls to the backend
• Checks:
• The required request parameters in the URI, query string, and headers of an
incoming request are included and non-blank
• The applicable request payload adheres to the configured JSON Schema
request model of the method

---

REST API – RequestValidation – OpenAPI

• Setup request validation by importing OpenAPI definitions file

---

API Gateway Open API
The API Gateway has a tight integration with the OpenAPI specification.

What is the OpenAPI Specification?
It is a very common way to define REST APIs, where the API definition itself is code.

You create this specification using the OpenAPI model 3.0 and then import it into the API Gateway.

Within the specification, you define the methods, the method request, the integration request, the method response, as well as any AWS extensions that you can set up for the API Gateway.

You can configure every single option of these extensions directly from within the API specification.

Similarly, instead of importing specifications into the API Gateway, you can take an existing API in the API Gateway and export it as an OpenAPI specification.

Why do this? Because this specification can be used, for example, to generate client code.

OpenAPI specifications can be written in YAML or JSON, and when you use them, you can generate client SDKs as mentioned.

On top of having a one-to-one mapping between the API Gateway and the OpenAPI specification, you can use the OpenAPI spec to perform request validation within your API Gateway.

The idea is that instead of just sending a payload as is to your backend, API Gateway can verify if it corresponds to a proper schema.

If the payload does not correspond to the correct validation, the caller receives a 400 error directly, which reduces unnecessary calls to the backend.

You can check whether the request parameters are in the URI or query strings, test for headers that are present and non-blank, and verify whether the payload adheres to a specified JSON Schema model for the method.

This verification ensures that your backend will not have any issues parsing and using the payload.

How to Set Up Request Validation
You set up an OpenAPI definitions file, and in it, you include an x-amazon-apigateway-request-validator extension.

Here, you define what you want to validate: the body, the parameters on all methods or some methods, and so on.

You can enable a params-only validator on all API methods, or enable all validators on just a specific method such as POST /validation, or any method you want.

This flexibility allows you to verify whatever you want on your API.

Hopefully, this explanation makes sense and you see the power of using OpenAPI with the API Gateway.

Thank you for your attention, and I will see you in the next lecture.

Key Takeaways
The API Gateway integrates tightly with the OpenAPI specification, allowing API definitions as code.
OpenAPI specifications can be imported into or exported from the API Gateway in YAML or JSON formats.
The OpenAPI spec enables request validation within API Gateway, reducing unnecessary backend calls by rejecting invalid requests early.
Validation can be configured flexibly per method for parameters, headers, and payloads using the x-amazon-apigateway-request-validator extension.
