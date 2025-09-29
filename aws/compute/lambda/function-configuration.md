Lambda Function Configuration

• RAM:
• From 128MB to 10GB in 1MB increments
• The more RAM you add, the more vCPU credits you get
• At 1,792 MB, a function has the equivalent of one full vCPU
• After 1,792 MB, you get more than one CPU, and need to use multi-threading
in your code to benefit from it (up to 6 vCPU)
• If your application is CPU-bound (computation heavy), increase RAM
• Timeout: default 3 seconds, maximum is 900 seconds (15 minutes)

---

Lambda Execution Context

• The execution context is a temporary runtime environment that
initializes any external dependencies of your lambda code
• Great for database connections, HTTP clients, SDK clients…
• The execution context is maintained for some time in anticipation of
another Lambda function invocation
• The next function invocation can “re-use” the context to execution
time and save time in initializing connections objects
• The execution context includes the /tmp directory

---

Initialize outside the handler

---

Lambda Functions /tmp space

• If your Lambda function needs to download a big file to work…
• If your Lambda function needs disk space to perform operations…
• You can use the /tmp directory
• Max size is 10GB
• The directory content remains when the execution context is frozen,
providing transient cache that can be used for multiple invocations
(helpful to checkpoint your work)
• For permanent persistence of object (non temporary), use S3
• To encrypt content on /tmp, you must generate KMS Data Keys

---

Lambda Function Performance
Lambda Function Configuration and Performance
Let's discuss the configuration and performance aspects of AWS Lambda functions, starting with RAM allocation.

Currently, Lambda functions use 128 megabytes of RAM by default, but this can be scaled up to 10 gigabytes in one megabyte increments. The key idea is that increasing the RAM allocated to your Lambda function also increases the number of vCPU credits you receive. Note that you cannot set the number of vCPUs directly; instead, you increase RAM to implicitly gain more vCPU resources.

When your Lambda function reaches 1,792 megabytes of RAM, it is allocated the equivalent of one full vCPU. Beyond this point, your function can have more than one vCPU, and to benefit from the additional vCPUs, you need to implement multi-threading in your application.

If your application is CPU-bound, meaning it performs many computations, and you want to improve its performance by reducing execution time, you should increase the RAM allocated to your Lambda function. This is a common exam question.

Lambda Function Timeout
By default, a Lambda function has a timeout of three seconds. If the function runs longer than this, it will error out with a timeout. However, you can configure the timeout to be any duration up to a maximum of 900 seconds, which equals 15 minutes.

Any execution interval between zero seconds and 15 minutes is a suitable use case for Lambda. If your process requires more than 15 minutes, Lambda is not ideal, and you should consider alternatives such as AWS Fargate, ECS, or EC2. This is also a topic that may appear on exams.

Lambda Execution Context
Lambda functions have an execution context, which is a temporary runtime environment that initializes any external dependencies your code requires. This context is maintained for some time in anticipation of subsequent Lambda invocations.

You can use the execution context to establish database connections, create HTTP clients, or initialize SDK clients. If you invoke your Lambda function multiple times in quick succession, the execution context can be reused, allowing you to reuse existing database connections and clients. This reuse significantly improves the performance of your Lambda function.

The execution context also includes the /tmp directory, which is a space where you can write files that persist across executions within the same context. This feature can be leveraged to improve performance, as we will see in the following code examples.

Inefficient Database Connection Handling
Consider the following code snippet, which demonstrates a less efficient approach to handling database connections in Lambda functions:

python Code Sample
def get_user_handler(event, context):
    DB_URL = os.getenv('DB_URL')
    db_client = database.connect(DB_URL)
    # Logic to get user using db_client
    return user
In this example, the database connection is established inside the handler function. This means that every time the Lambda function is invoked, it must reconnect to the database, which is inefficient and slows down execution.

Best Practice: Initialize Outside the Handler
The recommended best practice is to initialize the database connection outside the handler function. This way, the connection is established once and reused across multiple function invocations, improving performance.

Example of improved code structure:

python Code Sample
DB_URL = os.getenv('DB_URL')
db_client = database.connect(DB_URL)

def get_user_handler(event, context):
    # Use existing db_client to get user
    return user
This approach ensures the database connection is initialized once per execution context and reused, greatly enhancing Lambda function performance. This concept also applies to HTTP clients and SDK clients.

Using the /tmp Directory for Temporary Files
If your Lambda function needs to write temporary files, you can use the /tmp directory. This directory provides up to 10 gigabytes of disk space for your Lambda function to use during execution.

For example, if you need to download a large file or perform disk-intensive operations, you can store these files in the /tmp directory. The contents of this directory persist for the lifetime of the execution context, meaning that if your Lambda function is reinvoked within the same context, the files remain accessible.

You can store files up to approximately half a gigabyte in /tmp to optimize performance by avoiding repeated downloads or computations.

Persistent Storage and Encryption
If you require permanent persistence of objects beyond the execution context, you should store them in persistent storage services such as Amazon S3.

Regarding encryption, there is no built-in setting to encrypt data stored in the /tmp directory. To secure data in /tmp, you must use AWS Key Management Service (KMS) to generate data keys and manually encrypt the data before writing it to the temporary storage.

Summary
We have explored various ways to improve the performance of Lambda functions, including RAM allocation, timeout settings, efficient resource initialization, and temporary file storage. Next, we will demonstrate these concepts in the AWS console.

Key Takeaways
Increasing Lambda function RAM increases vCPU credits, improving performance for CPU-bound applications.
Lambda functions have a default timeout of 3 seconds, adjustable up to 900 seconds (15 minutes).
Execution context persists between invocations, allowing reuse of resources like database connections and temporary files.
Use the /tmp directory for temporary file storage up to 10 GB, but for persistent storage, use services like Amazon S3.
Encrypting data in /tmp requires manual encryption using AWS KMS data keys.

