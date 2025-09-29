AWS API Gateway - CORS

• CORS must be enabled when you receive API calls from another
domain.
• The OPTIONS pre-flight request must contain the following headers:
• Access-Control-Allow-Methods
• Access-Control-Allow-Headers
• Access-Control-Allow-Origin
• CORS can be enabled through the console

---

CORS – Enabled on the API Gateway

---

API Gateway CORS
Introduction to API Gateway and CORS
API Gateway supports browser security through Cross-Origin Resource Sharing (CORS). CORS must be enabled if you want to receive API calls from another domain.

To enable this, API Gateway works by creating an OPTIONS pre-flight request. This request contains the following CORS headers:

Access-Control-Allow-Methods
Access-Control-Allow-Headers
Allow Origins
These methods can be configured from the console.

How CORS Works: A Concrete Example
Consider a web browser accessing an S3 bucket to retrieve static website content hosted at example.com or www.example.com. The JavaScript launched from this S3 bucket requests to make API calls to a cross-origin endpoint at api.example.com.

Due to browser security policies, the web browser will make an OPTIONS pre-flight request to the API Gateway. The API Gateway responds with a pre-flight response indicating whether the origin is allowed to make a cross-origin request.

If the origin is authorized, the web browser and API Gateway can communicate successfully, allowing the API calls to proceed.

Summary
From an exam perspective, it is important to know that CORS can be enabled on the API Gateway to support cross-origin requests.

Key Takeaways
API Gateway supports browser security through Cross-Origin Resource Sharing (CORS).
CORS must be enabled to allow API calls from different domains.
API Gateway handles CORS by creating an OPTIONS pre-flight request with specific headers.
The pre-flight request and response ensure that cross-origin requests are authorized before actual API calls proceed.