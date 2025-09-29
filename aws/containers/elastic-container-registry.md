Elastic Container Registry

• ECR = Elastic Container Registry
• Store and manage Docker images on AWS
• Private and Public repository (Amazon ECR
Public Gallery https://gallery.ecr.aws)
• Fully integrated with ECS, backed by Amazon S3
• Access is controlled through IAM (permission
errors => policy)
• Supports image vulnerability scanning, versioning,
image tags, image lifecycle, …

Amazon ECR – Using AWS 
• Login Command
• AWS CLI v2
aws ecr get-login-password --region region | docker login --username AWS
--password-stdin aws_account_id.dkr.ecr.region.amazonaws.com
• Docker Commands
• Push
• Pull
docker push aws_account_id.dkr.ecr.region.amazonaws.com/demo:latest
docker pull aws_account_id.dkr.ecr.region.amazonaws.com/demo:latest
• In case an EC2 instance (or you) can’t pull a Docker image, check IAM
permissions

--- 
Amazon ECR
Introduction to Amazon ECR
Amazon ECR stands for Elastic Container Registry, and it is used to store and manage Docker images on AWS.

So far, we have been using online repositories such as Docker Hub, but we can also store our own images on Amazon ECR.

You have two options for ECR: you can store images privately, just for your account or your own accounts, or you can use a public repository and publish to the Amazon ECR public gallery.

Amazon ECR is fully integrated with Amazon ECS, which is great. Your images are behind the scenes stored by Amazon S3.

Your ECR repository may contain different Docker images, and then your ECS cluster, for example, an EC2 instance on your ECS cluster may want to pull these images.

To do so, we assign an IAM role to our EC2 instance, and this IAM role will allow our instance to pull Docker images.

Of course, all access to ECR is protected by IAM. That includes that if you have a permission error on ECR, have a look at your policies.

Then your containers are going to be started on your EC2 instance after they are pulled by your EC2 instance. This is how ECS and ECR work together.

Amazon ECR is great because, on top of being a repository, it supports image vulnerability scanning, versioning, image tags, and image lifecycle.

Overall, anytime you see storing Docker images, think ECR, and that should be it for you at the exam.

Key Takeaways
Amazon ECR stands for Elastic Container Registry and is used to store and manage Docker images on AWS.
ECR supports both private repositories for individual accounts and public repositories published to the Amazon ECR public gallery.
ECR is fully integrated with Amazon ECS, with images stored behind the scenes in Amazon S3.
Access to ECR is protected by IAM roles, which allow EC2 instances in ECS clusters to pull Docker images securely.
ECR supports image vulnerability scanning, versioning, image tags, and image lifecycle management.
