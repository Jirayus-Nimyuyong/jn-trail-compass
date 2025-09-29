What is Docker?
• Docker is a software development platform to deploy apps
• Apps are packaged in containers that can be run on any OS
• Apps run the same, regardless of where they’re run
• Any machine
• No compatibility issues
• Predictable behavior
• Less work
• Easier to maintain and deploy
• Works with any language, any OS, any technology
• Use cases: microservices architecture, lift-and-shift apps from on-
premises to the AWS cloud, …

---
Where are Docker images stored?
• Docker images are stored in Docker Repositories
• Docker Hub (https://hub.docker.com)
• Public repository
• Find base images for many technologies or OS (e.g., Ubuntu, MySQL, …)
• Amazon ECR (Amazon Elastic Container Registry)
• Private repository
• Public repository (Amazon ECR Public Gallery https://gallery.ecr.aws)

Where are Docker images stored?
• Docker images are stored in Docker Repositories
• Docker Hub (https://hub.docker.com)
• Public repository
• Find base images for many technologies or OS (e.g., Ubuntu, MySQL, …)
• Amazon ECR (Amazon Elastic Container Registry)
• Private repository
• Public repository (Amazon ECR Public Gallery https://gallery.ecr.aws)

---
Docker vs. Virtual Machines
• Docker is ”sort of ” a virtualization technology, but not exactly
• Resources are shared with the host => many containers on one server

Docker Containers Management on AWS
• Amazon Elastic Container Service (Amazon ECS)
• Amazon’s own container platform
• Amazon Elastic Kubernetes Service (Amazon EKS)
• Amazon’s managed Kubernetes (open source)
• AWS Fargate
• Amazon’s own Serverless container platform
• Works with ECS and with EKS
• Amazon ECR:
• Store container images


---
Docker Introduction
Docker Introduction
In this section, we will discuss containers, focusing on Docker, Amazon ECS, and Amazon EKS.

What is Docker?
Docker is a software development platform used to deploy applications. It is a container technology where applications are packaged into containers. These containers are standardized, allowing them to run on any operating system. This means that once your applications are containerized, they run the same way regardless of the machine they run on. There are no compatibility issues, and the behavior is predictable, which reduces the amount of work needed. Docker makes it easier to maintain and deploy applications, and it supports any programming language, operating system, and technology.

Use Cases for Docker
Microservice architecture
Migrating applications from on-premises to the cloud (lift and shift)
Running any containerized application
How Docker Works on an Operating System
You have a server, which could be an EC2 instance or any other server. On this server, you run a Docker agent (Docker Daemon). From there, you can start Docker containers. For example, one Docker container may contain a Java application, while another may contain a Node.js application. You can run multiple instances of the same Docker container, such as multiple Java or Node.js containers. Docker containers can also run databases like MySQL. From the server's perspective, all these are Docker containers, making Docker very versatile.

Docker Images and Repositories
Docker images are stored in Docker repositories. There are multiple options:

Docker Hub: A public repository where you can find base images for many technologies and operating systems such as Ubuntu and MySQL. It is very popular.
Amazon Elastic Container Registry (ECR): A private repository for storing your images. Amazon ECR also offers a public repository option called the Amazon ECR Public Gallery.
Docker vs Virtual Machines
Docker is a type of virtualization technology but differs from traditional virtual machines (VMs). The key differences are:

Virtual Machines:

Architecture: Infrastructure → Host Operating System → Hypervisor → Guest Operating System → Applications
Each VM is isolated with its own OS and resources.
Example: EC2 instances are virtual machines running on a hypervisor.
Docker Containers:

Architecture: Infrastructure → Host Operating System → Docker Daemon → Containers
Containers share the host OS resources.
Multiple lightweight containers can run on a single server.
Containers can share networking and some data.
While containers are less isolated and thus slightly less secure than VMs, they allow running more instances on a single server, which is a major advantage.

Getting Started with Docker
The process to use Docker involves:

Writing a Dockerfile that defines how your Docker container will be built.
Using a base Docker image and adding files or configurations.
Building the Dockerfile to create a Docker image.
Pushing the Docker image to a Docker repository such as Docker Hub or Amazon ECR.
Pulling the Docker image from the repository when needed.
Running the Docker image, which creates a Docker container that runs your application code.
Docker Container Management on AWS
AWS offers several services for managing Docker containers:

Amazon ECS (Elastic Container Service): AWS's own platform for Docker container management.
Amazon EKS (Elastic Kubernetes Service): AWS's managed Kubernetes service.
AWS Fargate: A serverless container platform that works with both ECS and EKS.
Amazon ECR: Used to store container images, both private and public.
We will explore these services in more detail in the following sections.

Key Takeaways
Docker is a container technology that packages applications into standardized containers, ensuring consistent behavior across any operating system or machine.
Docker containers share the host OS resources, allowing multiple lightweight containers to run on a single server, unlike virtual machines which are fully isolated.
Docker images are stored in repositories such as Docker Hub (public) or Amazon ECR (private and public options).
AWS provides several container management services including Amazon ECS, Amazon EKS, AWS Fargate, and Amazon ECR for storing container images.