Amazon EventBridge – Intercept API Calls

Amazon EventBridge + CloudTrail

CloudTrail - EventBridge Integration
CloudTrail and Amazon EventBridge Integration
A very important cultural integration you need to know about is the one with Amazon EventBridge to intercept any API calls.

For example, suppose you wanted to receive an SNS notification anytime a user deletes a table in DynamoDB by using the DeleteTable API call.

Whenever we perform an API call in AWS, as you know, the API call itself is logged in CloudTrail. This applies to any API call.

All these API calls will also end up as events in Amazon EventBridge. Therefore, we can look for that very specific DeleteTable API call and create a rule based on it.

This rule will have a destination, which is Amazon SNS, allowing us to create alerts.

Additional Examples of EventBridge and CloudTrail Integration
Let me give you a few more examples on how you can integrate Amazon EventBridge and CloudTrail.

For instance, if you wanted to be notified whenever a user assumes a role in your accounts, the AssumeRole API in the IAM service is logged by CloudTrail.

Using EventBridge integration, we can trigger a message into an SNS topic upon this event.

Similarly, we can intercept API calls that change Security Group inbound rules. The Security Group API call is called AuthorizeSecurityGroupIngress, which is an EC2 API call.

These calls are logged by CloudTrail and appear in EventBridge, where we can trigger a notification in SNS.

As you can see, the possibilities are endless, but now you have a few ideas of how the integration can be leveraged.

I hope you found this information useful, and I will see you in the next lecture.

Key Takeaways
Amazon EventBridge can intercept AWS API calls logged by CloudTrail to trigger automated responses.
You can create EventBridge rules targeting specific API calls, such as DynamoDB's DeleteTable, to send notifications via SNS.
EventBridge integration enables alerts for critical actions like IAM AssumeRole or changes to Security Group inbound rules.
This integration provides flexible, event-driven monitoring and alerting capabilities across AWS services.