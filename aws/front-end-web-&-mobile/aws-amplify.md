AWS Amplify

Create mobile and web applications

• Set of tools to get started with creating mobile
and web applications
• “Elastic Beanstalk for mobile and web
applications”
• Must-have features such as data storage,
authentication, storage, and machine-learning,
all powered by AWS services
• Front-end libraries with ready-to-use
components for React.js, Vue, Javascript, iOS,
Android, Flutter, etc…
• Incorporates AWS best practices to for
reliability, security, scalability
• Build and deploy with the Amplify CLI or
Amplify Studio

---

AWS Amplify – Important Features

AUTHENTICATION
• Leverages Amazon Cognito
• User registration, authentication,
account recovery & other
operations
• Support MFA, Social Sign-in,
etc…
• Pre-built UI components
• Fine-grained authorization

---

DATASTORE
• Leverages Amazon AppSync and
Amazon DynamoDB
• Work with local data and have
automatic synchronization to the
cloud without complex code
• Powered by GraphQL
• Offline and real-time capabilities
• Visual data modeling w/ Amplify Studio

---

AWS Amplify Hosting

• Build and Host Modern Web Apps
• CICD (build, test, deploy)
• Pull Request Previews
• Custom Domains
• Monitoring
• Redirect and Custom Headers
• Password protection

---

AWS Amplify – End-to-End (E2E) Testing

• Run end-to-end (E2E) tests in the test phase in
Amplify
• Catch regressions before pushing code to
production
• Use the test step to run any test commands at
build time (amplify.yml)
• Integrated with Cypress testing framework
• Allows you to generate UI report for your tests

---

AWS Amplify
Introduction to AWS Amplify
AWS Amplify is a service that, in essence, allows the creation of mobile and web applications. It is composed of several components, including Amplify Studio, which enables visual building of full stack applications—both the front-end UI and the backend.

Amplify CLI and Libraries
Amplify also provides a CLI to accomplish the same tasks as Amplify Studio but through the command line. Additionally, Amplify Libraries connect your application to existing AWS services, such as Cognito for authentication or S3 for storage.

Amplify Hosting
Amplify Hosting is used to host your Amplify application on AWS, delivering it with high performance.

Overview of AWS Amplify
AWS Amplify is a set of tools to get started with mobile and web applications. It can be considered as the Elastic Beanstalk for mobile and web applications. You can start with Amplify Studio or the CLI. For the CLI, you initialize your Amplify application with the following command:

bash Code Sample
amplify init
Amplify provides essential features such as data storage, authentication, file storage, and machine learning, all powered by AWS services. In the backend, Amplify relies on DynamoDB, AWS AppSync for GraphQL APIs, Cognito, Amazon S3, and more.

Amplify also offers front-end libraries ready to use for different frameworks such as React, Vue, JavaScript, iOS, Android, Flutter, and others. AWS Amplify serves as a one-stop shop to integrate all these components together, incorporating best practices for reliability, security, and scalability.

Deploying Applications with Amplify
To deploy an application, you can use either the Amplify CLI or Amplify Studio.

Key Features of AWS Amplify
The exam may ask about important features of Amplify. Here are the main ones:

Authentication
Amplify provides authentication out of the box. To add authentication, use the following command:

bash Code Sample
amplify add auth
This leverages Amazon Cognito, offering user registration, authentication, account recovery, and other operations. It supports MFA, social sign-in, and provides pre-built components for frontend integration with Cognito. Fine-grained authorization is also available.

Datastore
To add an API and datastore, use the following command:

bash Code Sample
amplify add api
This leverages Amazon AppSync for the API and Amazon DynamoDB for data storage. With Data Store, you work with local data and have automatic synchronization to the cloud without complex code, thanks to the Amplify framework. It is powered by GraphQL and AppSync, offering offline and real-time capabilities. You can also model your data with Amplify Studio.

Amplify Hosting
To deploy your application, use the following command:

bash Code Sample
amplify add hosting
Amplify Hosting allows you to build and host modern web applications. It supports CI/CD, including build, test, and deploy steps. You can have pull request previews, custom domains, monitoring, redirects, custom headers, and password protection. Amplify Hosting is similar to services like Netlify and Vercel.

You can connect your code repository from GitHub, Bitbucket, GitLab, or CodeCommit. The CI/CD pipeline builds the frontend and deploys it, for example, to CloudFront. Optionally, the backend can also be built and deployed into Amplify.

Testing in Amplify
Amplify supports two kinds of testing: unit testing and end-to-end testing. End-to-end tests can be run during the test phase in Amplify to catch regressions before pushing code to production. Test steps are defined in your amplify.yml file.

You can use the Cypress testing framework to generate end-to-end tests. Cypress provides a UI report for your tests and allows you to define web interactions. Cypress can simulate a web browser, enabling you to specify actions such as clicking and verifying application behavior.

End-to-end tests are called such because the application is deployed and verified for expected usability. Build-level tests are unit tests run during the build to ensure the code functions as intended. End-to-end tests are run after deployment to ensure correct behavior.

Conclusion
In summary, AWS Amplify provides build-level unit tests and end-to-end tests to ensure application quality before deployment.

Key Takeaways
AWS Amplify is a comprehensive service for building mobile and web applications, offering tools like Amplify Studio, CLI, Libraries, and Hosting.
Amplify integrates with AWS services such as Cognito, DynamoDB, AppSync, and S3 to provide authentication, data storage, and APIs.
Amplify Hosting supports CI/CD, custom domains, monitoring, and end-to-end testing with frameworks like Cypress.
Amplify enables both unit and end-to-end testing to ensure application reliability before deployment.