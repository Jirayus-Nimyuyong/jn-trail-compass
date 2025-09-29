CodeBuildAWS CodeBuild

• A fully managed continuous integration (CI) service
• Continuous scaling (no servers to manage or provision – no build queue)
• Compile source code, run tests, produce software packages, …
• Alternative to other build tools (e.g., Jenkins)
• Charged per minute for compute resources (time it takes to complete the builds)
• Leverages Docker under the hood for reproducible builds
• Use prepackaged Docker images or create your own custom Docker image
• Security:
• Integration with KMS for encryption of build artifacts
• IAM for CodeBuild permissions, and VPC for network security
• AWS CloudTrail for API calls logging

---

• Source – CodeCommit, S3, Bitbucket, GitHub
• Build instructions: Code file buildspec.yml or insert manually in
Console
• Output logs can be stored in Amazon S3 & CloudWatch Logs
• Use CloudWatch Metrics to monitor build statistics
• Use EventBridge to detect failed builds and trigger notifications
• Use CloudWatch Alarms to notify if you need “thresholds” for failures
• Build Projects can be defined within CodePipeline or CodeBuild

---

CodeBuild – Supported Environments

• Java
• Ruby
• Python
• Go
• Node.js
• Android
• .NET Core
• PHP
• Docker – extend any environment you like

---

CodeBuild – How it Works

---

CodeBuild – buildspec.yml

• buildspec.yml file must be at the root of your code
• env – define environment variables
• variables – plaintext variables
• parameter-store – variables stored in SSM Parameter Store
• secrets-manager – variables stored in AWS Secrets Manager
• phases – specify commands to run:
• install – install dependencies you may need for your build
• pre_build – final commands to execute before build
• Build – actual build commands
• post_build – finishing touches (e.g., zip output)
• ar tifacts – what to upload to S3 (encrypted with KMS)
• cache – files to cache (usually dependencies) to S3 for
future build speedup

---

CodeBuild Overview
Introduction to CodeBuild
CodeBuild allows you to take a source of code, for example, CodeCommit, Amazon S3, Bitbucket, or GitHub, and then execute build instructions defined within that source.

From an exam perspective, you need to know the name of the build instructions file, which is buildspec.yml. This file must reside at the root of your code repository. Alternatively, you can insert these instructions manually in the console, but the best practice is to use buildspec.yml. This is what the exam will test you on.

Once the application is built, the output logs can be stored into Amazon S3 and CloudWatch Logs for later analysis. You can use CloudWatch Metrics to examine build statistics, EventBridge to detect failed builds and trigger notifications, and CloudWatch Alarms in case you have too many failures.

The Build Projects themselves can be defined either within CodeBuild or within CodePipeline. CodePipeline can also invoke an existing CodeBuild Build Project.

Supported Environments and Customization
CodeBuild supports testing for Java, Ruby, Python, Go, Node.js, Android, .NET Core, and PHP applications using pre-built images. If you require any other environment, you can extend a Docker image to support the language or environment you want. This customization is up to you to support your own environment.

How CodeBuild Works
Consider your source code stored in CodeCommit. At the top of your repository, there is a very important file named buildspec.yml. CodeBuild fetches this code and runs inside a container that provides the build environment, such as Java or Go. This container loads all the source code and the buildspec.yml file, then executes all the instructions specified in that file.

To build this container, CodeBuild pulls a Docker image. This image can be prepackaged by AWS for supported environments or you can provide your own Docker image to run whatever code you need.

CodeBuild executes all instructions from buildspec.yml. Sometimes these instructions can be quite lengthy, so CodeBuild offers a feature to cache files in an S3 bucket to reuse them from build to build. This is an optional optimization.

All logs generated during the build process are stored in CloudWatch Logs and optionally in Amazon S3 if enabled. Once CodeBuild finishes building or testing your code, it can produce artifacts. These artifacts are extracted from the container and placed into an S3 bucket, where you can find the final outputs of CodeBuild.

The buildspec.yml File
The buildspec.yml file is crucial. It must be located at the root of your code directory. This file defines several important sections:

Environment: Defines environment variables for the build execution. Variables can be plaintext or pulled from the SSM Parameter Store or Secrets Manager, allowing secure retrieval of sensitive information such as passwords.
Phases: Defines the sequence of commands CodeBuild will execute:
install: Commands to install necessary packages.
pre_build: Commands executed just before the build.
build: The actual build commands.
post_build: Finalization commands, such as creating zipped outputs.
Artifacts: Specifies which files from the Docker container should be extracted and sent to Amazon S3. These can also be encrypted.
Cache: Specifies which files, usually dependencies, should be cached in Amazon S3 to speed up future builds.
Conclusion
That concludes the overview of CodeBuild. This service enables automated building and testing of your code with flexible environment support, detailed logging, and artifact management. The buildspec.yml file is central to configuring your build process effectively.

Key Takeaways
CodeBuild uses a buildspec.yml file at the root of your source code to define build instructions.
Build logs can be stored in Amazon S3 and CloudWatch Logs for analysis.
CodeBuild supports multiple programming environments with pre-built images and allows custom Docker images.
The buildspec.yml file includes environment variables, phases (install, pre_build, build, post_build), artifacts, and caching configurations.
