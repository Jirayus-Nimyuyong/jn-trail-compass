AWS Lambda Versions

• When you work on a Lambda function,
we work on $LATEST
• When we’re ready to publish a Lambda
function, we create a version
• Versions are immutable
• Versions have increasing version numbers
• Versions get their own ARN (Amazon
Resource Name)
• Version = code + configuration (nothing
can be changed - immutable)
• Each version of the lambda function can
be accessed

AWS Lambda Aliases

• Aliases are ”pointers” to Lambda
function versions
• We can define a “dev”, ”test”,
“prod” aliases and have them point
at different lambda versions
• Aliases are mutable
• Aliases enable Canary deployment
by assigning weights to lambda
functions
• Aliases enable stable configuration
of our event triggers / destinations
• Aliases have their own ARNs
• Aliases cannot reference aliases

---

Lambda Versions and Aliases
Lambda Versions and Aliases
Let's discuss the concepts of Lambda Versions and Aliases.

So far, when we have been working on Lambda functions, we have used the LATEST version. This version was mutable because we were able to edit our code and configuration.

However, one thing we have not done yet is publishing the Lambda function to create a new version once we are happy with our code state. When we hit publish, it will become version 1 (V1).

Version 1 (V1) is immutable. What does immutable mean? It means that you cannot change the code, environment variables, or anything else afterwards. It is fixed as a version.

As you keep publishing, the versions will have increasing version numbers, going from V1 to V2, and so on. Each version is independent and receives its own Amazon Resource Name (ARN).

Each Lambda function version is immutable, meaning nothing can be changed after publishing. You can access each version as well as the LATEST version.

This approach is great for iterating and marking your progress until you release your Lambda function.

Lambda Aliases
What if you want to provide your end users with a standard endpoint? For this, we can use Lambda Aliases.

Aliases are pointers that reference specific Lambda function versions. We can define aliases such as DEV, TEST, and PROD and have them point to different Lambda versions.

Unlike versions, aliases are mutable, which is why we use them. For example, we can create a DEV alias that points to the LATEST version of the Lambda function. This allows us to edit code and quickly see changes.

Users can interact with the DEV alias, which will in turn invoke the LATEST version of the function.

Similarly, we can create a TEST alias to test the V2 version of our function. This alias is also mutable.

We can create a PROD alias that points to the V1 function, which we know is stable and working.

Why Use Aliases?
Aliases enable canary deployments because we can assign traffic weights to the Lambda function versions they point to.

For example, in PROD, if we want to switch from the V1 function to the V2 function, instead of switching the pointer immediately, we can route 95% of the traffic to V1 and 5% to V2.

This approach allows us to test V2 in production, ensuring it works correctly before switching 100% of the traffic to V2.

Aliases provide a stable configuration for triggers or user destinations. They can be invoked stably but point to whichever Lambda version we want in the backend.

Each alias receives its own ARN. It is important to note that aliases cannot reference other aliases; they can only reference versions. This is a common exam trick.

Let's proceed to the hands-on section to see how Lambda versions and aliases work in practice.

Key Takeaways
Lambda function versions are immutable snapshots of your code and configuration.
Publishing a Lambda function creates a new version with an increasing version number.
Lambda Aliases are mutable pointers to specific Lambda function versions, allowing flexible routing.
Aliases enable canary deployments by assigning traffic weights to different versions.