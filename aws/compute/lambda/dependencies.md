Lambda Function Dependencies

• If your Lambda function depends on external libraries:
for example AWS X-Ray SDK, Database Clients, etc…
• You need to install the packages alongside your code and zip it
together
• For Node.js, use npm & “node_modules” directory
• For Python, use pip --target options
• For Java, include the relevant .jar files
• Upload the zip straight to Lambda if less than 50MB, else to S3 first
• Native libraries work: they need to be compiled on Amazon Linux
• AWS SDK comes by default with every Lambda function

---

Lambda External Dependencies
Introduction to Lambda External Dependencies
So far in this course, we have been working with some pretty simple Lambda functions. These functions consisted of just code without any external dependencies.

In real-world applications, you definitely need to add more dependencies with the packages and so on. For example, if your Lambda function depends on extra libraries such as the X-Ray SDK, database clients, and so forth, then you need to install these packages alongside your code and zip it all together.

Packaging Dependencies by Language
For JavaScript, you can use NPM and the node_modules directory.
For Python, you can use PIP with the --target option.
For Java, you can include the relevant .jar files.
Each language has its own way of packaging dependencies.

Deployment Packaging
What you need to remember is that you zip the code and the dependencies together. Then, you upload the zip file directly into Lambda if it is less than 50 megabytes. Otherwise, you first upload it into Amazon S3 and then reference it from Lambda.

Native Libraries
Regarding native libraries, they first need to be compiled on Amazon Linux for them to work properly within Lambda.

AWS SDK
By default, the AWS SDK comes with every Lambda function. Therefore, if you are just using the AWS SDK, you do not need to package the SDK alongside your code.

Hands-On Demonstration
Let's proceed with a hands-on demonstration to see how packaging and deploying Lambda functions with external dependencies works in practice.

Key Takeaways
Lambda functions often require external dependencies beyond simple code.
Dependencies must be packaged together with the code in a zip file for deployment.
Each programming language has its own method for managing and packaging dependencies.
The AWS SDK is included by default in Lambda, so it does not need to be packaged separately.

