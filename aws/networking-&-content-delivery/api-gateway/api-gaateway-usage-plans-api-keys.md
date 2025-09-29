API Gateway – Usage Plans & API Keys

• If you want to make an API available as an offering ($) to your customers
• Usage Plan:
• who can access one or more deployed API stages and methods
• how much and how fast they can access them
• uses API keys to identify API clients and meter access
• configure throttling limits and quota limits that are enforced on individual client
• API Keys:
• alphanumeric string values to distribute to your customers
• Ex: WBjHxNtoAb4WPKBC7cGm64CBibIb24b4jt8jJHo9
• Can use with usage plans to control access
• Throttling limits are applied to the API keys
• Quotas limits is the overall number of maximum requests

---

API Gateway – Correct Order for API keys

• To configure a usage plan
1. Create one or more APIs, configure the methods to require an API key, and
deploy the APIs to stages.
2. Generate or import API keys to distribute to application developers (your
customers) who will be using your API.
3. Create the usage plan with the desired throttle and quota limits.
4. Associate API stages and API keys with the usage plan.
• Callers of the API must supply an assigned API key in the x-api-key header in
requests to the API.

---

API Gateway Usage Plans & API Keys
Introduction to API Gateway Usage Plans and API Keys
We have now created our API, and it is time to make it available for our customers. We may want to charge them some money for it. For this purpose, there is the concept of usage plans and API keys.

Usage Plans
A usage plan is created to define who can access one or more API stages and methods, how much and how fast they can access them, and which API keys are linked to this usage plan to identify the clients and meter their access.

We can also configure throttling limits, which control how fast the users can target our API, and quotas, which specify limits such as only 10,000 requests per month before additional payment is required.

API Keys
API keys are strings distributed to your customers. They look like this and allow your customers to securely use your API Gateway and authenticate their requests. You can use API keys in conjunction with usage plans to control access.

If you enable any throttling limits, they are applied at the API key level. Overall, quota limits represent the total number of requests allowed.

By using usage plans and API keys, we are able to monitor, offer, and limit our API for our customers effectively.

Order of Creating API Keys and Usage Plans
To configure a usage plan, you need to follow this order:

First, create one or more APIs.
Configure the methods that will require an API key.
Deploy the API to your stages.
Generate or import API keys to distribute to your application developers, who are your customers using your API.
Create a usage plan with the desired throttle and quota limits.
Associate the API stages and API keys with the usage plan.
This last step is crucial; if you forget it, things will not work properly.

Finally, callers of the API must supply an API key in the x-api-key header of their requests to the API.

That concludes this lecture on API Gateway usage plans and API keys.

Key Takeaways
Usage plans define access control, throttling, and quotas for API stages and methods.
API keys are unique strings distributed to customers to authenticate and meter API usage.
Throttling limits apply at the API key level, while quota limits restrict total requests.
The correct order is to create APIs, configure methods requiring API keys, deploy stages, generate API keys, create usage plans, and associate keys and stages.

