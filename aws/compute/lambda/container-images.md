Lambda Container Images

• Deploy Lambda function as container
images of up to 10GB from ECR
• Pack complex dependencies, large
dependencies in a container
• Base images are available for Python,
Node.js, Java, .NET, Go, Ruby
• Can create your own image as long as it
implements the Lambda Runtime API
• Test the containers locally using the
Lambda Runtime Interface Emulator
• Unified workflow to build apps

---

• Example: build from the base images provided by AWS

---

Lambda Container Images – Best Practices

• Strategies for optimizing container images:
• Use AWS-provided Base Images
• Stable, Built on Amazon Linux 2, cached by Lambda service
• Use Multi-Stage Builds
• Build your code in larger preliminary images, copy only the artifacts you need in your final
container image, discard the preliminary steps
• Build from Stable to Frequently Changing
• Make your most frequently occurring changes as late in your Dockerfile as possible
• Use a Single Repository for Functions with Large Layers
• ECR compares each layer of a container image when it is pushed to avoid uploading and
storing duplicates
• Use them to upload large Lambda Functions (up to 10 GB)

---

Lambda Container Images
Introduction to Lambda Container Images
AWS Lambda now supports container images, a new feature that allows you to deploy Lambda functions as container images up to 10 gigabytes in size from Amazon Elastic Container Registry (ECR). This capability enables packaging complex and large dependencies within a container.

Docker is widely used to bundle your application code, dependencies, and required data sets together on top of a base image. This base image must implement the Lambda Runtime API to be compatible with Lambda.

The concept is that Lambda runs a virtual machine, which is the container. You use the base image of that container, add your application code and dependencies, and package this as an image that Lambda can run because the base image implements the Lambda Runtime API.

This allows you to run your containers on Lambda, but it is not any Docker container; the base image must implement the Lambda Runtime API. AWS provides base images for multiple languages, including Python, Node.js, Java, .NET, Go, and Ruby. You can also create your own Lambda base image as long as you implement the Lambda Runtime API specification, which is detailed in the documentation.

You can test your containers locally using the Lambda Runtime Interface Emulator. Having Lambda functions as containers provides a unified workflow to publish your applications. Whether it is a container for Amazon ECS or Lambda, you can build and publish your containers the same way, push them to Amazon ECR, and then deploy them onto Lambda.

Example of a Lambda Container Image
Here is an example of building a Lambda container image using AWS-provided base images. First, choose an image that implements the Lambda Runtime API, such as amazon/aws-lambda-nodejs:12.

Next, copy your application code and files into the container. For example, copy app.js and package.json along with any necessary data into the container.

Then, install the dependencies inside the container by running npm install. Finally, specify the function to run when the Lambda function is invoked by setting the command to app.lambdaHandler.

This Docker image, built from the Lambda Node.js 12 base image, can be run on Lambda functions. This approach simplifies dependency management and compilation concerns, as long as the Docker container is built correctly from the appropriate base image. It serves as a great alternative to compiling your own Lambda layers.

Best Practices for Lambda Container Images
Use AWS-provided base images: These are built on Amazon Linux 2 and are cached by the Lambda service, reducing the amount of data Lambda needs to pull from your containers.

Use multi-stage builds: Perform complex build steps in preliminary large images, then copy only the necessary artifacts into a new final container image. This results in a smaller and simpler final image.

Build images in layers from stable to frequently changing: Place the most stable components, such as base packages, early in the build process, and the frequently changing parts towards the end. This optimizes caching and build efficiency.

Use a single repository for functions with large layers: Storing large layers in the same repository allows Amazon ECR to compare layers and avoid storing duplicates, saving storage and upload time.

Use Case for Large Lambda Functions
One of the best use cases for Lambda container images is when you need to upload very large Lambda functions, up to 10 gigabytes. Instead of pushing code directly to Lambda, you can create a large container image and use that as the basis for your Lambda function.

This concludes the lecture on Lambda container images. Thank you for your attention, and I look forward to seeing you in the next lecture.

Key Takeaways
AWS Lambda now supports container images up to 10 GB, enabling deployment of complex applications with large dependencies.
Lambda container images must be based on a base image implementing the Lambda Runtime API, available for multiple languages.
Using AWS-provided base images and multi-stage builds optimizes container size and deployment efficiency.
Storing functions with large layers in a single repository reduces duplication and improves storage efficiency in Amazon ECR.
