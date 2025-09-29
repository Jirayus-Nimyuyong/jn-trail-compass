CloudWatch Evidently
• Safely validate new features by serving them to a
specified % of your users
• Reduce risk and identify unintended consequences
• Collect experiment data, analyze using stats, monitor
performance
• Launches (= feature flags): enable and disable
features for a subset of users
• Experiments (= A/B testing): compare multiple
versions of the same feature
• Overrides: pre-define a variation for a specific user
• Store evaluation events in CloudWatch Logs or S3

---

CloudWatch Evidently
Introduction to CloudWatch Evidently
CloudWatch Evidently is a feature of CloudWatch that allows you to test new features in your application and serve these features only to a small percentage of your users.

Purpose of Controlled Feature Rollouts
You might want to do this to reduce risk when releasing a new feature. For example, by enabling the new feature for only 5% of your users, you can identify unintended consequences before a full rollout. Additionally, you can test the feature itself by collecting experiment data, analyzing it statistically, and monitoring the performance of the new feature.

Use Cases Enabled by CloudWatch Evidently
There are two main use cases enabled by CloudWatch Evidently:

Launches (Feature Flags): This allows you to enable or disable features for a subset of users.
Experiments (A/B Testing): This allows you to compare multiple versions of the same feature to determine which is more successful.
Feature Flags Example
For example, some users might have the ability to like comments on your app, but you do not want everyone to have this new feature immediately. You want to test this feature before releasing it to all users. In this case, a feature flag controls whether some users see the like button and others do not.

A/B Testing Example
In experiments, you might compare different versions of the same feature. For example, you could test whether placing the like button on the left or the right results in better user engagement. This helps determine which version is more successful.

Workflow in CloudWatch Evidently
As developers, you create a project in CloudWatch Evidently and then create a feature or an experiment. You receive code snippets that you embed into your application. Once embedded, users access your application normally. You then specify the percentage of users who should have access to the new feature or the distribution of users between versions A and B in the case of A/B testing. When users access the application, they see the feature configuration defined in CloudWatch Evidently.

Key Terms: Launches, Experiments, and Overrides
Launches: Feature flags to enable or disable features for subsets of users.
Experiments: A/B testing to compare multiple versions of a feature.
Overrides: A mechanism to ensure specific users, such as beta testers, always see a particular feature version regardless of rollout percentages.
Overrides Explained
If you have a beta tester within your organization and want to ensure that this tester always has access to the new feature, you cannot rely on the randomness of feature rollout. Instead, you create an override in CloudWatch Evidently. For a specific user ID, such as that of the beta tester, you specify that only the new feature or version B should be displayed. This guarantees that the beta tester will always see the intended feature when accessing the application.

Storing Experiment Data
To store your experiment data, you can use CloudWatch Logs or Amazon S3. This data can then be analyzed to evaluate the performance and impact of your feature launches or experiments.

Conclusion
CloudWatch Evidently provides a powerful way to safely roll out new features and conduct A/B testing by controlling feature exposure to users, enabling overrides for specific users, and collecting experiment data for analysis.

Key Takeaways
CloudWatch Evidently enables controlled feature rollouts by serving new features to a small percentage of users.
It supports two primary use cases: feature flags (launches) and A/B testing (experiments).
Overrides allow specific users, such as beta testers, to access features regardless of rollout percentage.
Experiment data can be stored in CloudWatch Logs or Amazon S3 for analysis.