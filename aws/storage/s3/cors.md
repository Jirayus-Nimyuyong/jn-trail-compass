What is CORS?

• Cross-Origin Resource Sharing (CORS)
• Origin = scheme (protocol) + host (domain) + por t
• example: https://www.example.com (implied port is 443 for HTTPS, 80 for HTTP)
• Web Browser based mechanism to allow requests to other origins while
visiting the main origin
• Same origin: http://example.com/app1 & http://example.com/app2
• Different origins: http://www.example.com & http://other.example.com
• The requests won’t be fulfilled unless the other origin allows for the
requests, using CORS Headers (example: Access-Control-Allow-Origin)

Amazon S3 – CORS

• If a client makes a cross-origin request on our S3 bucket, we need to enable
the correct CORS headers
• It’s a popular exam question
• You can allow for a specific origin or for * (all origins)

--- 
S3 CORS
Introduction to CORS
CORS stands for Cross-Origin Resource Sharing. It is an important concept to understand, especially for the exam where it may be tested with at least one question. This lecture will explore how CORS works in depth, making it easier to answer related questions.

Understanding Origin
The origin is defined by a combination of the scheme (protocol), host, domain, and port. For example, consider the URL https://www.example.com:

The implied port is 443 for HTTPS.
The protocol is HTTPS.
The domain is www.example.com.
What is CORS?
CORS is a web browser-based security mechanism that allows or denies requests to other origins while visiting the main origin. It controls cross-origin requests to protect users and resources.

Same Origin Policy
Two URLs share the same origin if they have the same scheme, host, and port. For example, these two URLs share the same origin:

https://www.example.com/page1
https://www.example.com/page2
However, different origins exist when any of these components differ, such as:

https://www.example.com
https://other.example.com
Cross-Origin Requests and Restrictions
If a web browser is visiting one website and attempts to make a request to another website (a different origin), these requests will not be fulfilled unless the other origin explicitly allows the request using CORS headers. These headers are known as Access-Control-Allow-Origin headers.

How CORS Works: A Diagrammatic Explanation
Consider the following components:

A web server at the origin: https://www.example.com
A web browser
A second web server at a cross-origin: https://www.other.com
The web browser sends an HTTPS request to the first origin web server. The response includes an HTML file (e.g., index.html) which instructs the browser to fetch additional resources, such as images, from the other web server.

Because of browser security, before making the actual request to the cross-origin server, the browser performs a pre-flight OPTIONS request to the cross-origin server. This pre-flight request includes:

The target URL (e.g., https://www.other.com)
The origin of the request (e.g., https://www.example.com)
If the cross-origin server is configured to allow this origin via CORS, it responds with headers indicating allowed methods (GET, PUT, DELETE, etc.) and origins.

If the browser accepts these headers, it proceeds to make the actual request to retrieve the resources.

Applying CORS to Amazon S3
When a client makes a cross-origin request to an Amazon S3 bucket, the bucket must be configured with the correct CORS headers to allow the request. This is a common exam question.

One way to quickly enable this is to allow a specific origin or to allow all origins (*).

Example Scenario with S3 Buckets
A web browser accesses an S3 bucket configured as a static website (e.g., my-bucket-html).
This bucket serves an index.html file.
The index.html references images stored in another S3 bucket (e.g., my-bucket-assets), also configured as a static website.
When the browser tries to fetch images from the second bucket, it sends a cross-origin request.

If the second bucket is not configured with the correct CORS headers, the request will be refused.

If the bucket allows the request by including the appropriate CORS headers, the browser will successfully retrieve the images.

Summary
CORS is a web browser security feature that enables or restricts the retrieval of assets such as images or files from one origin when the request originates from another origin. Proper configuration of CORS headers is essential for cross-origin resource sharing, especially in services like Amazon S3.

Key Takeaways
CORS (Cross-Origin Resource Sharing) is a web browser security mechanism that controls requests between different origins.
The origin consists of the scheme, host, domain, and port; requests between different origins require explicit permission via CORS headers.
Browsers perform a pre-flight OPTIONS request to check if the cross-origin request is allowed by the server.
Configuring CORS correctly is essential for enabling cross-origin requests to Amazon S3 buckets, especially for static website hosting and asset sharing.