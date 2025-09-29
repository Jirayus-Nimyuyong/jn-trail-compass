Amazon EKS Overview
• Amazon EKS = Amazon Elastic Kubernetes Service
• It is a way to launch managed Kubernetes clusters on AWS
• Kubernetes is an open-source system for automatic deployment, scaling and
management of containerized (usually Docker) application
• It’s an alternative to ECS, similar goal but different API
• EKS supports EC2 if you want to deploy worker nodes or Fargate to deploy
serverless containers
• Use case: if your company is already using Kubernetes on-premises or in
another cloud, and wants to migrate to AWS using Kubernetes
• Kubernetes is cloud-agnostic (can be used in any cloud – Azure, GCP…)
• For multiple regions, deploy one EKS cluster per region
• Collect logs and metrics using CloudWatch Container Insights

---
Amazon EKS – Node Types
• Managed Node Groups
• Creates and manages Nodes (EC2 instances) for you
• Nodes are part of an ASG managed by EKS
• Supports On-Demand or Spot Instances
• Self-Managed Nodes
• Nodes created by you and registered to the EKS cluster and managed by an ASG
• You can use prebuilt AMI - Amazon EKS Optimized AMI
• Supports On-Demand or Spot Instances
• AWS Fargate
• No maintenance required; no nodes managed

---

Amazon EKS – Data Volumes
• Need to specify StorageClass manifest on your EKS cluster
• Leverages a Container Storage Interface (CSI) compliant driver

• Support for…
• Amazon EBS
• Amazon EFS (works with Fargate)
• Amazon FSx for Lustre
• Amazon FSx for NetApp ONTAP


---
Amazon EKS
Introduction to Amazon EKS
Amazon EKS stands for Amazon Elastic Kubernetes Service. It is a way, as the name indicates, to launch and manage Kubernetes clusters on AWS.

What is Kubernetes?
Kubernetes is an open-source system for automatic deployments, scaling, and management of containerized, usually Docker, applications. It serves as an alternative to ECS, which has a similar goal of running containers but uses a very different API.

ECS is not open-source, whereas Kubernetes is open-source and used by many different cloud providers, which provides a form of standardization.

Amazon EKS Launch Modes
Amazon EKS supports two launch modes:

EC2 launch mode: Deploy worker nodes as EC2 instances.
Fargate mode: Deploy serverless containers in an EKS cluster.
The use case for Amazon EKS includes companies already using Kubernetes on-premises or in other clouds, or those who want to use the Kubernetes API while leveraging AWS to manage the Kubernetes cluster.

Kubernetes Cloud Agnosticism
From an exam perspective, Kubernetes is cloud agnostic and can be used in any cloud such as Azure, Google Cloud, and others. This means that migrating containers between clouds can be simplified by using Amazon EKS.

Amazon EKS Architecture
The architecture typically includes a VPC with three Availability Zones separated into public and private subnets. EKS Worker Nodes, which are EC2 instances, run EKS Pods. Pods are similar to ECS tasks but are the Kubernetes terminology for container groups running on nodes.

These nodes can be managed by an Auto Scaling group. To expose EKS or Kubernetes services, you can set up either private or public load balancers to handle web traffic.

Node Types in Amazon EKS
There are three main node types:

Managed Node Groups: AWS creates and manages EC2 instances for you as part of an Auto Scaling group. This supports both On-Demand and Spot Instances.

Self-Managed Nodes: You create and manage the nodes yourself, registering them to the EKS cluster and managing them within an Auto Scaling group. You can use the pre-built Amazon EKS Optimized AMI or build your own AMI. This also supports On-Demand and Spot Instances.

Fargate Mode: No nodes are visible or managed by you; containers run serverlessly on top of Amazon EKS without maintenance.

Storage Options for Amazon EKS
You can attach data volumes to your Amazon EKS cluster by specifying a StorageClass manifest on your EKS cluster. This leverages the Container Storage Interface (CSI) compliant driver.

Supported storage options include:

Amazon EBS
Amazon EFS (the only storage class compatible with Fargate)
Amazon FSx for Lustre
Amazon FSx for NetApp ONTAP
Conclusion
Amazon EKS provides a robust, cloud-agnostic Kubernetes service on AWS with flexible deployment options and storage integrations, suitable for organizations leveraging Kubernetes across environments.

Key Takeaways
Amazon EKS is a managed Kubernetes service on AWS that supports both EC2 and Fargate launch modes.
Kubernetes is an open-source system for automating deployment, scaling, and management of containerized applications.
EKS supports managed node groups, self-managed nodes, and serverless Fargate nodes for flexible cluster management.
Storage options for EKS include Amazon EBS, Amazon EFS (compatible with Fargate), and Amazon FSx variants, using the Container Storage Interface (CSI).