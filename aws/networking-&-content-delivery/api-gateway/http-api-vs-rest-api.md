API Gateway – HTTP API vs REST API

• HTTP APIs
• low-latency, cost-effective AWS
Lambda proxy, HTTP proxy APIs and
private integration (no data mapping)
• support OIDC and OAuth 2.0
authorization, and built-in support for
CORS
• No usage plans and API keys

---

• REST APIs

• All features (except Native OpenID
Connect / OAuth 2.0)

---

API Gateway REST API vs HTTP API
Overview of API Gateway API Types
In this section, we discuss the different types of APIs that can be set up in the API Gateway. So far in this course, we have been using the REST API, but there are two other kinds: the HTTP API and the WebSocket API. We will describe these at a high level. While they may not appear in the exam yet, except possibly WebSocket, it is important to understand their basic characteristics.

HTTP API Characteristics
The HTTP API is designed to be low latency and cost-effective. It functions as an AWS Lambda proxy, HTTP proxy API, and supports private integrations. As you can see, it operates entirely as a proxy without data mapping capabilities. It supports only a few types of authorization, specifically OpenID Connect (OIDC) and OAuth 2.0. Additionally, it has built-in support for Cross-Origin Resource Sharing (CORS). However, it does not support usage plans or API keys.

HTTP APIs are a very low-cost alternative to the API Gateway. They are relatively new and somewhat confusingly named, but they are simpler than REST APIs.

REST API Features
The REST API includes all the features covered in this course, except for native OpenID Connect and OAuth 2.0 support. For a detailed comparison, you can refer to the link highlighting the differences between HTTP and REST APIs.

Key Differences for Exam Focus
For the exam, remember that HTTP APIs are much cheaper than REST APIs and have some differences in support. For example, REST APIs support resource policies, whereas HTTP APIs do not.

That concludes this overview. I hope you found it helpful, and I will see you in the next lecture.

Key Takeaways
API Gateway offers three types of APIs: REST API, HTTP API, and WebSocket.
HTTP APIs are low latency, cost-effective proxies with limited features compared to REST APIs.
HTTP APIs support OIDC and OAuth 2.0 authorizations but lack data mapping, usage plans, and API keys.
REST APIs provide more features including resource policies, which HTTP APIs do not support.
