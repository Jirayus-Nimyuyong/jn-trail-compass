API Gateway - Architecture

• Create a single interface for
all the microservices in your
company
• Use API endpoints with
various resources
• Apply a simple domain name
and SSL certificates
• Can apply forwarding and
transformation rules at the
API Gateway level

---

API Gateway - Architecture
Introduction to API Gateway in Microservice Architecture
This lecture provides a quick overview of implementing a microservice architecture using an API Gateway. Thanks to the API Gateway, you can have a single interface for all the microservices in your company. This allows you to use API endpoints with various resources in the backends, effectively hiding the complexity from your clients.

Routing Through API Gateway
For example, we can have an API Gateway with a /service1 route that sends requests to an Elastic Load Balancer, which backs an actual ECS cluster of microservices. Alternatively, the /docs route can send requests to an S3 bucket containing study content, such as the documentation of your service. Another route, /service2, can connect to an Elastic Load Balancer linked to an Amazon EC2 Auto Scaling group fleet.

Unified URL and Routing
All these routes allow you to define paths and use the API Gateway as a single URL to connect to these services. This unifies your microservices under one external URL, simplifying access while hiding the routing complexity.

Custom Domains and SSL Certificates
We can use Route 53 to register a domain instead of relying on the default DNS for the API Gateway. This enables custom addresses based on the client, such as customer1.example.com for one client or customer2.example.com for another. Additionally, SSL certificates can be applied based on these domains to secure the connections.

Data Forwarding and Transformation
Within the API Gateway, forwarding and transformation rules can be applied to modify incoming data before sending it to the backends. This feature allows for flexible data handling and adaptation to backend requirements.

Summary of API Gateway Architecture
The architecture shown demonstrates how to unify your microservices and provide an external unified URL while hiding all the complexity of routing to services, transforming data, and specifying SSL certificates. All of these functionalities are managed at the API Gateway level.

I hope this overview is helpful, and I will see you in the next lecture.

Key Takeaways
API Gateway provides a single interface for all microservices, simplifying client interactions.
Routes can be defined to direct requests to various backend resources such as ECS clusters, S3 buckets, or EC2 Auto Scaling groups.
Route 53 can be used to register custom domains for API Gateway, enabling client-specific URLs and SSL certificates.
API Gateway supports forwarding and transformation rules to modify incoming data before it reaches backend services.