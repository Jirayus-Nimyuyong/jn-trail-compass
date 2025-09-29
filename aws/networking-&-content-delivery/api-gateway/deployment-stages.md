API Gateway – Deployment Stages

• Making changes in the API Gateway does not mean they’re effective
• You need to make a “deployment” for them to be in effect
• It’s a common source of confusion
• Changes are deployed to “Stages” (as many as you want)
• Use the naming you like for stages (dev, test, prod)
• Each stage has its own configuration parameters
• Stages can be rolled back as a history of deployments is kept

---

API Gateway – Stages v1 and v2

API breaking change

---

API Gateway – Stage Variables

• Stage variables are like environment variables for API Gateway
• Use them to change often changing configuration values
• They can be used in:
• Lambda function ARN
• HTTP Endpoint
• Parameter mapping templates
• Use cases:
• Configure HTTP endpoints your stages talk to (dev, test, prod…)
• Pass configuration parameters to AWS Lambda through mapping templates
• Stage variables are passed to the ”context” object in AWS Lambda
• Format: ${stageVariables.variableName}

---

API Gateway Stage Variables & Lambda Aliases

• We create a stage variable to indicate the corresponding Lambda alias
• Our API gateway will automatically invoke the right Lambda function!

---

API Gateway Stage Variables & Lambda Aliases

• We create a stage variable to indicate the corresponding Lambda alias
• Our API gateway will automatically invoke the right Lambda function!

---

API Gateway Stages and Deployment
Introduction to API Gateway Deployment
We have deployed our first API through the API Gateway in a deployment stage. Whenever changes are made to the API Gateway, they are not effective until a deployment is performed. Therefore, deployment is necessary for changes to take effect. This is a common source of confusion; some people modify the API Gateway but forget to deploy, resulting in the API not being live.

Deployment Stages and Their Usage
Changes are deployed to stages, and you can have as many stages as desired with any naming convention. For example, stages can be named dev, test, and prod, or v1, v2, v3, etc. Each stage has its own configuration parameters and supports seamless rollback because a complete history of all deployments to a stage is maintained.

Example of Managing Breaking API Changes with Stages
Consider having two stages while creating a breaking API change. The Lambda function backing the API Gateway is changing. The v1 stage invokes the v1 function and has been deployed, allowing v1 clients to access the API through its URL. Meanwhile, a new version of the Lambda function called v2 is being developed, which does not respect the same data format.

Deploying changes on the v1 stage would break existing v1 clients. Instead, a new stage named v2 is created, pointing to the v2 function. This creates a new URL, for example, api.example.com/v2, representing the v2 stage.

Clients can be updated to version two and access the new URL, maintaining compatibility. For a period, v1 and v2 can coexist as two different stages. Clients can be migrated from version one to version two, and when no clients use version one, it can be shut down, allowing progression with the API Gateway. This is a common use case for stages.

Stage Variables
Stage variables function like environment variables but are specific to API Gateway stages. They allow changing configuration values without redeploying the API. Stage variables can be used in the Lambda function ARN, HTTP endpoints, parameter mapping templates, and more, enabling flexible configuration changes.

Use cases for stage variables include automatically configuring the HTTP endpoint your stages communicate with, such as dev, test, and prod, passing configuration parameters to Lambda functions through mapping templates, or pointing to the correct Lambda function. These variables are passed to the context object in Lambda functions, allowing logging and access to their values directly.

The format to access a stage variable's value within API Gateway is stageVariables.variableName. This is a very common use case for stage variables.

Using Stage Variables to Manage Lambda Aliases
A common pattern is to create a stage variable indicating the corresponding Lambda alias that the API Gateway should invoke. This allows the API Gateway to automatically invoke the correct Lambda function.

For example:

The dev stage points to the dev alias, which directs 100% of traffic to the latest Lambda version.
The test stage points to the test alias, which directs traffic to the v2 version of the Lambda function.
The prod alias is linked to the prod stage, directing 95% of traffic to v1 and 5% to v2.
In this setup, Lambda alias changes can be made in the backend by updating the traffic percentages on different versions without updating the API Gateway. Each stage points to the correct alias, and each alias redirects to the appropriate Lambda function. This is a very common pattern for API Gateway and will be practiced in the next lecture.

Key Takeaways
API Gateway requires deployment to stages for changes to take effect.
Multiple stages can coexist, enabling versioning and smooth client migration.
Stage variables act like environment variables to configure stages without redeployment.
Lambda aliases combined with stage variables allow seamless backend version management without updating API Gateway configurations.