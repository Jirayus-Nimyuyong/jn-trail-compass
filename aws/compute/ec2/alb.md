Application Load Balancer (v2)
• Application load balancers is Layer 7 (HTTP)
• Load balancing to multiple HTTP applications across machines
(target groups)
• Load balancing to multiple applications on the same machine
(ex: containers)
• Support for HTTP/2 and WebSocket
• Support redirects (from HTTP to HTTPS for example)
• Routing tables to different target groups:
• Routing based on path in URL (example.com/users & example.com/posts)
• Routing based on hostname in URL (one.example.com & other.example.com)
• Routing based on Query String, Headers
(example.com/users?id=123&order=false)
• ALB are a great fit for micro services & container-based application
(example: Docker & Amazon ECS)
• Has a port mapping feature to redirect to a dynamic port in ECS
• In comparison, we’d need multiple Classic Load Balancer per application

HTTP Based Traffic

Target Groups
• EC2 instances (can be managed by an Auto Scaling Group) – HTTP
• ECS tasks (managed by ECS itself) – HTTP
• Lambda functions – HTTP request is translated into a JSON event
• IP Addresses – must be private IPs
• ALB can route to multiple target groups
• Health checks are at the target group level

Query Strings/Parameters Routing

Good to Know
• Fixed hostname (XXX.region.elb.amazonaws.com)
• The application servers don’t see the IP of the client directly
• The true IP of the client is inserted in the header X-Forwarded-For
• We can also get Port (X-Forwarded-Port) and proto (X-Forwarded-Proto)

---
Application Load Balancer (ALB)
Introduction to Application Load Balancer (ALB)
Now, let's get into the second kind of load balancers we will see: the Application Load Balancer. It is a layer seven only load balancer, which means it operates at the HTTP layer. It allows you to route to multiple HTTP applications across machines. These machines are grouped in something called a target group. This concept will become clearer once we get into the hands-on section.

The Application Load Balancer allows you to load balance multiple applications on the same EC2 instance, which is useful when using containers and ECS, as we will see. It supports HTTP/2 and WebSockets protocols. Additionally, it supports redirects, such as automatically redirecting traffic from HTTP to HTTPS at the load balancer level.

Advanced Routing Features
ALB supports route-based routing. For example, you can route based on the target path of your URL, such as example.com/users and example.com/posts. The paths /users and /posts are different routes in your URL, and you can redirect these to different target groups. You can also route based on the hostname of the URL. For instance, if your load balancer is accessed using one.example.com or other.example.com, it can route to different target groups accordingly. Furthermore, routing can be based on query strings and headers. For example, example.com/reserves?id=123&order=false can be routed to a different target group.

ALBs are ideal when you have microservices and container-based applications. As we learn about Docker and Amazon ECS, ALBs will be the go-to load balancers because they have port mapping features that allow you to redirect to a dynamic port on the ECS instance. More details on this will be covered in the ECS section.

In comparison, to have multiple applications behind a Classic Load Balancer, you would need multiple Classic Load Balancers—one per application. However, with an Application Load Balancer, you can have one ALB in front of many applications.

ALB Architecture and Target Groups
Consider an external Application Load Balancer that is public facing. Behind it, there is a first target group made of EC2 instances routing for the /user route. There is a second target group, also made of EC2 instances, which is the search application. Health checks are configured for these target groups. The ALB routes requests based on rules for the /search route.

As you can see, there are two independent microservices doing different things: the user application and the search application. Both are behind the same Application Load Balancer, which intelligently routes to these target groups based on the URL route used.

Target groups can consist of EC2 instances, which can be managed by Auto Scaling Groups. They can also be ECS tasks, which we will see in the ECS section. Additionally, target groups can include Lambda functions, which is less commonly known. Application Load Balancers can be placed in front of Lambda functions, which are the foundation of serverless computing in AWS. Finally, target groups can include private IP addresses, which must be private IPs.

ALBs can route to multiple target groups, and health checks are performed at the target group level.

Example: Routing Based on Client Platform
Consider an ALB with two target groups. The first target group consists of AWS EC2 instances, and the second includes private servers on-premises in our own data center. For the target groups, you specify the private IPs of your servers to register them.

Suppose you have an application serving requests through the ALB. You want to send mobile-based traffic to the first target group and desktop-based traffic to the second. You can achieve this by using query string or parameter-based routing. For example, if the URL contains ?platform=mobile, you can write a routing rule in the ALB to redirect to the first target group. If the URL contains ?platform=desktop, it can redirect to the second target group. This is just an example to illustrate the concept.

Additional ALB Features
Before moving to the hands-on section, here are some important points:

You get a fixed hostname with your Application Load Balancer, similar to the Classic Load Balancer.
The application servers do not see the client's IP address directly. Instead, the true client IP is inserted into the HTTP header called X-Forwarded-For.
You can also obtain the port using X-Forwarded-Port and the protocol used via X-Forwarded-Proto headers.
This means that the client IP, for example, 12.34.56.78, communicates directly with the load balancer, which performs connection termination. When the load balancer communicates with your EC2 instance, it uses the load balancer's private IP. Therefore, the EC2 instance must look at these extra headers in the HTTP request to determine the original client IP, port, and protocol.

Now, let's proceed to the hands-on section and create our first Application Load Balancer.

Key Takeaways
Application Load Balancers (ALB) operate at layer seven, supporting HTTP and enabling routing to multiple HTTP applications across machines.
ALBs support advanced routing features including path-based, host-based, query string, and header-based routing.
Target groups behind ALBs can consist of EC2 instances, ECS tasks, Lambda functions, or private IP addresses.
ALBs provide fixed hostnames and use headers like X-Forwarded-For to preserve client IP information during connection termination.