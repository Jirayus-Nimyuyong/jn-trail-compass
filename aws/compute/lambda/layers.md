Lambda Layers

• Custom Runtimes
• Ex: C++ https://github.com/awslabs/aws-lambda-cpp
• Ex: Rust https://github.com/awslabs/aws-lambda-rust-runtime
• Externalize Dependencies to re-use them:

---

Lambda Layers
Introduction to Lambda Layers
Lambda Layers are a newer feature of AWS Lambda that provide two main capabilities.

Custom Runtimes
Firstly, Lambda Layers allow the creation of custom runtimes. This means supporting programming languages that were not initially designed for Lambda but have been adopted by the community through Lambda Layers. Examples include C++ and Rust. These languages can now be used to develop Lambda functions by leveraging custom runtimes provided via layers.

Externalizing Dependencies
The second, and more common, use case for Lambda Layers is to externalize dependencies to enable reuse. Consider a zipped application package that contains a Lambda function along with heavy libraries and dependencies. Such a package could be quite large, for example around 30 megabytes. When updating another function, this entire zip file must be re-uploaded repeatedly.

Often, the dependencies do not change frequently or change very slowly. Therefore, it is more efficient to externalize these dependencies into what is called a "layer." This approach separates the application code, which may be small (for example, 20 kilobytes), from the heavy libraries, which are packaged into layers (for example, one layer of 10 megabytes and another of 30 megabytes).

The Lambda function can then reference these layers. This setup allows for much faster deployment since the application code can be updated frequently without repackaging the dependencies every time. Additionally, because the layers are externalized, multiple functions or application packages can reference the same layers, promoting reuse and efficiency.

For example, another function with a 60-kilobyte application package can reference the same layers, avoiding duplication of dependencies. This is the primary purpose of Lambda Layers: to package application dependencies separately and reuse them across Lambda functions.

Hands-On Demonstration
Next, we will proceed to a hands-on session to see how Lambda Layers work in practice.

Key Takeaways
Lambda Layers enable the creation of custom runtimes for languages not originally supported by Lambda, such as C++ and Rust.
They allow externalization of heavy dependencies from the application package to improve deployment efficiency.
By separating dependencies into layers, multiple Lambda functions can reuse the same layers, reducing package size and upload times.
This approach facilitates faster deployments and better management of application code and dependencies.