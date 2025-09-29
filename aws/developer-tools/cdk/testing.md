CDK – Testing
• To test CDK apps, use CDK Asser tions Module
combined with popular test frameworks such as
Jest (JavaScript) or Pytest (Python)
• Verify we have specific resources, rules, conditions,
parameters…
• Two types of tests:
• Fine-grained Assertions (common) – test specific
aspects of the CloudFormation template (e.g., check if a
resource has this property with this value)
• Snapshot Tests – test the synthesized CloudFormation
template against a previously stored baseline template
• To import a template
• Template.fromStack(MyStack) : stack built in CDK
• Template.fromString(mystring) : stack build outside CDK

---

CDK - Unit Testing
Introduction to CDK Testing
This lecture provides a brief overview of testing within the AWS Cloud Development Kit (CDK). Since CDK uses code, you can test your infrastructure code in the same way as standard Python or JavaScript code.

In CDK applications, there are assertion modules that include popular test frameworks such as Jest for JavaScript and Pytest for Python. These assertion modules allow us to verify whether specific resources, rules, conditions, or parameters meet our requirements.

Here is a simple test example that checks whether the CDK application synthesizes correctly. This means verifying that the generated CloudFormation template contains the necessary resources and configurations.

Types of Tests in CDK
There are two main types of tests in CDK:

Fine-grained assertions: The most common type, where you test whether specific resources have particular properties.
Snapshot tests: Tests that compare the current CloudFormation template against a previously stored baseline template.
Fine-Grained Assertions
For example, you can test whether a Lambda function has the correct handler and runtime, such as nodejs14.x. Additionally, you can verify that an SNS topic subscription count is exactly one. These tests ensure that individual resource properties are as expected.

Snapshot Tests
Snapshot tests verify the entire CloudFormation template against a stored baseline. This is useful to ensure that key resources, such as a DynamoDB table, remain present with expected properties. Snapshot testing helps detect unintended changes in the infrastructure template.

Methods to Test CloudFormation Templates
There are two primary methods to test CloudFormation templates in CDK:

fromStack: This method imports a CDK stack defined in code and generates the template for testing.
fromString: This method imports a CloudFormation template as a string, allowing testing of templates that exist outside of CDK code.
Using Template.fromStack(MyStack), you import a CDK stack named MyStack for testing. Alternatively, Template.fromString(myString) allows you to import a CloudFormation template from a string variable myString. This flexibility enables testing of both CDK-generated and external templates.

Remembering these two methods, fromStack and fromString, is important, especially from an exam perspective.

Conclusion
This concludes the lecture on CDK unit testing. Testing your CDK applications ensures that your infrastructure code behaves as expected and that your CloudFormation templates are correctly generated.

Key Takeaways
CDK allows testing of infrastructure code similarly to standard programming languages like Python or JavaScript.
CDK assertion modules integrate popular testing frameworks such as Jest and Pytest.
Fine-grained assertions verify specific resource properties within the CloudFormation template.
Snapshot tests compare the current CloudFormation template against a stored baseline to detect changes.