Customization At The Edge

• Many modern applications execute some form of the logic at the edge
• Edge Function:
• A code that you write and attach to CloudFront distributions
• Runs close to your users to minimize latency
• CloudFront provides two types: CloudFront Functions &
Lambda@Edge
• You don’t have to manage any servers, deployed globally
• Use case: customize the CDN content
• Pay only for what you use
• Fully serverless

---
CloudFront Functions & Lambda@Edge Use Cases

• Website Security and Privacy
• Dynamic Web Application at the Edge
• Search Engine Optimization (SEO)
• Intelligently Route Across Origins and Data Centers
• Bot Mitigation at the Edge
• Real-time Image Transformation
• A/B Testing
• User Authentication and Authorization
• User Prioritization
• User Tracking and Analytics

---

CloudFront Functions

• Lightweight functions written in JavaScript
• For high-scale, latency-sensitive CDN customizations
• Sub-ms startup times, millions of requests/second
• Used to change Viewer requests and responses:
• Viewer Request: after CloudFront receives a request from a
viewer
• Viewer Response: before CloudFront forwards the response
to the viewer
• Native feature of CloudFront (manage code entirely
within CloudFront)

---

Lambda@Edge

• Lambda functions written in NodeJS or Python
• Scales to 1000s of requests/second
• Used to change CloudFront requests and responses:
• Viewer Request – after CloudFront receives a request from a
viewer
• Origin Request – before CloudFront forwards the request to the
origin
• Origin Response – after CloudFront receives the response from
the origin
• Viewer Response – before CloudFront forwards the response to
the viewer
• Author your functions in one AWS Region (us-east-1), then
CloudFront replicates to its locations

---

CloudFront Functions vs. Lambda@Edge

---

CloudFront Functions vs. Lambda@Edge - Use Cases

CloudFront Functions
• Cache key normalization
• Transform request attributes (headers,
cookies, query strings, URL) to create an
optimal Cache Key
• Header manipulation
• Insert/modify/delete HTTP headers in the
request or response
• URL rewrites or redirects
• Request authentication & authorization
• Create and validate user-generated
tokens (e.g., JWT) to allow/deny requests

Lambda@Edge
• Longer execution time (several ms)
• Adjustable CPU or memory
• Your code depends on a 3rd
libraries (e.g., AWS SDK to access
other AWS services)
• Network access to use external
services for processing
• File system access or access to the
body of HTTP requests

---

Lambda@Edge & CloudFront Functions
Customization At The Edge
Let's discuss customization at the Edge. We deploy our functions and applications in specific regions, but sometimes, for example using CloudFront, the Edge locations distribute our content. Modern applications often require executing some form of logic at the Edge before reaching the application itself. These are called Edge Functions, which are pieces of code you write and attach to your CloudFront distributions. The goal is to run these functions close to users to minimize latency in some cases.

CloudFront offers two kinds of functions: CloudFront Functions and Lambda@Edge. The idea is to understand when each is required and their differences, which we will cover in this lecture. Using Edge Functions means you do not have to manage any servers; these functions are deployed globally. Use cases include customizing CDN content coming out of CloudFront. Additionally, you only pay for what you use, and it is fully serverless.

Use Cases for Edge Functions
Some common use cases for Edge Functions include:

Website security and privacy
Dynamic web applications at the Edge
Search engine optimization (SEO)
Intelligent routing across origins and data centers
Bot mitigation at the Edge
Real-time image transformation at the Edge
A/B testing
User authentication and authorization
User prioritization
User tracking and analytics
These represent a wide range of customizations possible using CloudFront Functions and Lambda@Edge.

CloudFront Request and Response Flow
A typical request into CloudFront proceeds as follows:

The client sends a request to CloudFront, called a viewer request.
CloudFront sends an origin request to your origin server.
The origin server replies with an origin response.
CloudFront sends a viewer response back to the client.
CloudFront Functions are lightweight JavaScript functions that modify the viewer request and response only. They are used for high-scale, latency-sensitive CDN customizations, providing sub-millisecond startup times and scaling to millions of requests per second.

CloudFront Functions operate on the viewer request, which is after CloudFront receives a request from a viewer, and on the viewer response, which is before CloudFront forwards the response back to the viewer. This is a native feature of CloudFront, and the entire code is managed directly within CloudFront. CloudFront Functions provide high performance and high scale but only for the viewer request and response events.

Lambda@Edge Overview
Lambda@Edge functions are more versatile. They can modify all request and response events, including viewer request, origin request (before CloudFront forwards a request to the origin), origin response (after CloudFront receives the response from the origin), and viewer response (before CloudFront forwards the response back to the viewer).

These functions are authored in Node.js or Python and scale to thousands of requests per second. You author your function in the us-east-1 region, which is where you manage your CloudFront distributions, and CloudFront replicates this function to all of its locations globally.

Comparison Between CloudFront Functions and Lambda@Edge
| Feature | CloudFront Functions | Lambda@Edge | |-------------------------|-------------------------------|---------------------------------| | Runtime Support | JavaScript only | Node.js and Python | | Scale | Millions of requests per second | Thousands of requests per second | | Trigger Events | Viewer request and response only | Viewer request, origin request, origin response, viewer response | | Max Execution Time | Less than 1 millisecond | Up to 5 to 10 seconds |

CloudFront Functions are designed for very quick and simple functions, while Lambda@Edge allows longer execution times and more complex logic.

Use Cases for CloudFront Functions
CloudFront Functions are ideal for:

Cache key normalization to transform request attributes for optimal cache keys
HTTP header manipulation to insert, modify, or delete headers in requests or responses
URL rewrites or redirects
Request authorization, including creating and validating JWT tokens to allow or deny requests
All these operations execute in less than one millisecond.

Use Cases for Lambda@Edge
Lambda@Edge supports longer execution times (up to 10 seconds) and adjustable CPU and memory resources. This allows:

Loading and using third-party libraries, such as AWS SDKs
Network access to external services for data processing
File system access
Access to the HTTP request body for advanced customizations
This makes Lambda@Edge suitable for complex integrations and customizations beyond what CloudFront Functions can handle.

Conclusion
This lecture covered the differences and use cases of CloudFront Functions and Lambda@Edge for Edge customization. CloudFront Functions provide high-scale, low-latency modifications limited to viewer requests and responses, while Lambda@Edge offers more flexibility and longer execution times for all request and response events.

Thank you for your attention, and I look forward to seeing you in the next lecture.

Key Takeaways
Edge Functions enable running code close to users to minimize latency without managing servers.
CloudFront Functions are lightweight JavaScript functions for modifying viewer requests and responses with sub-millisecond latency.
Lambda@Edge supports Node.js and Python, can modify all request and response events, and allows longer execution times with more resources.
Use cases include security, dynamic web apps, SEO, routing, bot mitigation, image transformation, A/B testing, authentication, and analytics.