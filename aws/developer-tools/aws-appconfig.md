AWS AppConfig

• Configure, validate, and deploy dynamic configurations
• Deploy dynamic configuration changes to your
applications independently of any code deployments
• You don’t need to restart the application
• Feature flags, application tuning, allow/block listing…
• Use with apps on EC2 instances, Lambda, ECS, EKS…
• Gradually deploy the configuration changes and
rollback if issues occur
• Validate configuration changes before deployment
using:
• JSON Schema (syntactic check) or
• Lambda Function – run code to perform validation
(semantic check)

---

AWS AppConfig - Overview
Introduction to AWS AppConfig
AWS AppConfig allows you to manage your application configurations dynamically, separate from your application code. Instead of shipping configuration alongside your app or using environment variables, AppConfig enables you to configure, validate, and deploy dynamic configurations independently.

With AppConfig, you can change configurations and your application will adapt without requiring any new code deployment or application restart. This dynamic behavior ensures seamless updates and flexibility.

Feature Flags
A common use case is feature flags. For example, if your application includes a new feature that you want to disable initially, you can deploy your application with the feature flag set to false in AppConfig. Once ready to test or enable the feature, simply update the feature flag in AppConfig, and your application will automatically enable the feature without redeployment.

Beyond feature flags, AppConfig allows you to dynamically adjust any configuration, such as fine-tuning application performance or modifying IP block or allow lists in real time, all without changing your application code.

AppConfig is particularly useful for applications running on EC2 instances, AWS Lambda, ECS, EKS, and similar environments.

Gradual Deployment and Rollback
When deploying configuration changes, such as enabling a feature flag, you may not want to release the change to all instances simultaneously. AppConfig supports gradual deployment to monitor for issues. If problems are detected, it can automatically trigger a rollback to the previous configuration.

Configuration Sources
AppConfig supports multiple configuration sources, including Parameter Store, SSM documents, S3 buckets, and others. Applications running on EC2 instances or other compute services regularly poll these sources for configuration updates.

Monitoring and Validation
When a configuration change occurs, CloudWatch monitors the application for any issues. If an alarm is triggered, AppConfig can automatically rollback the configuration to maintain stability.

To ensure configurations are valid before deployment, AppConfig supports validation using JSON Schema to check data types and structure, or Lambda functions for more complex validation logic.

Summary
AWS AppConfig provides a robust solution for managing application configurations dynamically, enabling feature flag management, gradual rollouts, validation, and monitoring without the need to redeploy or restart applications.

Key Takeaways
AWS AppConfig enables dynamic configuration management outside of application code.
Feature flags can be toggled in real time without redeploying or restarting applications.
Configuration changes can be gradually deployed with monitoring and automatic rollback.
Configurations can be validated using JSON Schema or Lambda functions before deployment.
