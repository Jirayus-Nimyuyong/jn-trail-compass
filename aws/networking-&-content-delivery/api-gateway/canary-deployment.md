API Gateway – Canary Deployment

• Possibility to enable canary deployments for any stage (usually prod)
• Choose the % of traffic the canary channel receives
• Metrics & Logs are separate (for better monitoring)
• Possibility to override stage variables for canary
• This is blue / green deployment with AWS Lambda & API Gateway

---

API Gateway Canary Deployments
Introduction to Canary Deployments on API Gateway
Let's discuss a method to perform canary deployments on your API Gateway. The main idea is to enable testing of a small portion of traffic on the changes you have made to your API Gateway.

Usually, canary deployments are done in production. You select the percentage of traffic that the canary channel will receive. This allows you to test your new version of the API Gateway, for example, over the backend Lambda function or similar services.

Example Scenario
Suppose our production stage currently points to version one, and our client wants to test a new version. We create a production stage canary for version two. This setup allows the client to have, for example, 95% of the traffic directed to the existing production stage, which is known to work, while automatically routing 5% of the traffic to the canary stage.

With this configuration, we can test all the changes, monitor metrics, review logs, debug if necessary, and verify that everything is functioning correctly. Once confident, we can shift 100% of the traffic to the canary stage.

In this example, metrics and logs are kept separate for better monitoring. Additionally, you can override any stage variables you want for your canary stage. This approach is equivalent to performing blue/green deployments with Lambda and API Gateway.

Hands-On Demonstration
Let's proceed with a hands-on demonstration to see how this works in practice.

Key Takeaways
Canary deployments allow testing a small percentage of traffic on new API gateway versions in production.
Traffic can be split, for example, 95% to the stable production stage and 5% to the canary stage.
Metrics and logs for canary stages are separate, enabling better monitoring and debugging.
Canary deployments with API Gateway and Lambda are equivalent to blue/green deployments.