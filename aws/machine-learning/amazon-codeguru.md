Amazon CodeGuru

• An ML-powered service for automated code reviews and application
performance recommendations
• Provides two functionalities
• CodeGuru Reviewer : automated code reviews for static code analysis (development)
• CodeGuru Profiler : visibility/recommendations about application performance during
runtime (production)

---

Amazon CodeGuru Reviewer

• Identify critical issues, security
vulnerabilities, and hard-to-find bugs
• Example: common coding best practices,
resource leaks, security detection, input
validation
• Uses Machine Learning and automated
reasoning
• Hard-learned lessons across millions of
code reviews on 1000s of open-source
and Amazon repositories
• Supports Java and Python
• Integrates with GitHub, Bitbucket, and
AWS CodeCommit

---

Amazon CodeGuru Profiler

• Helps understand the runtime behavior of your
application
• Example: identify if your application is consuming
excessive CPU capacity on a logging routine
• Features:
• Identify and remove code inefficiencies
• Improve application performance (e.g., reduce CPU
utilization)
• Decrease compute costs
• Provides heap summary (identify which objects using
up memory)
• Anomaly Detection
• Support applications running on AWS or on-
premise
• Minimal overhead on application

---

Amazon CodeGuru – Agent Configuration

• MaxStackDepth – the maximum depth of the stacks in the code that is
represented in the profile
• Example: if CodeGuru Profiler finds a method A, which calls method B, which calls
method C, which calls method D, then the depth is 4
• If the MaxStackDepth is set to 2, then the profiler evaluates A and B
• MemoryUsageLimitPercent – the memory percentage used by the profiler
• MinimumTimeForReportingInMilliseconds – the minimum time between
sending reports (milliseconds)
• Repor tingIntervalInMilliseconds – the reporting interval used to report
profiles (milliseconds)
• SamplingIntervalInMilliseconds – the sampling interval that is used to profile
samples (milliseconds)
• Reduce to have a higher sampling rate

---

CodeGuru - Overview
Introduction to Amazon CodeGuru
Amazon CodeGuru is a machine learning-powered service that offers two main functionalities: automated code reviews and application performance recommendations.

When developers push code, typically another developer performs a code review. Additionally, once the code is deployed into production, monitoring its performance is essential to detect potential bugs. CodeGuru automates both these tasks.

CodeGuru Reviewer
CodeGuru Reviewer conducts automated code reviews using static code analysis. When you deploy your code to a repository such as CodeCommit or GitHub, CodeGuru analyzes all lines of code and provides actionable recommendations if it detects bugs, memory leaks, or other issues it has encountered before.

Thanks to its machine learning capabilities, CodeGuru can detect bugs even before other reviewers, which is highly beneficial.

CodeGuru Profiler
CodeGuru Profiler provides visibility and recommendations regarding your application's performance during runtime or in production. It detects and optimizes expensive lines of code during pre-production testing. Once the application is deployed, it measures performance in real time and identifies opportunities for performance and cost improvements, delivering recommendations directly in your code.

Deep Dive into CodeGuru Reviewer
CodeGuru Reviewer analyzes your commits whenever you push code and highlights lines that are likely problematic. This tool helps identify critical issues, security vulnerabilities, and hard-to-find bugs.

It assists in implementing coding best practices, detecting resource leaks, identifying security holes, and validating inputs. It achieves this through machine learning and automated reasoning.

CodeGuru Reviewer learned to be an effective code reviewer by analyzing code reviews across thousands of open-source repositories and Amazon.com repositories using machine learning.

Currently, it supports Java and Python and integrates with GitHub, Bitbucket, and CodeCommit. These capabilities may evolve over time, but the core concepts of CodeGuru Reviewer and Profiler remain essential.

Deep Dive into CodeGuru Profiler
CodeGuru Profiler helps understand the runtime behavior of your application in production or pre-production environments. It identifies excessive CPU consumption, such as on logging routines, allowing you to remove inefficiencies and improve performance.

It reduces CPU utilization, decreases compute costs, provides heap summaries to identify memory-heavy objects, and performs anomaly detection to catch unusual application behavior.

CodeGuru Profiler supports applications running on AWS Cloud as well as on-premises, with minimal overhead on the monitored application.

Conclusion
This lecture provided a high-level overview of Amazon CodeGuru, including its Reviewer and Profiler components. Understanding these tools equips you to leverage automated code reviews and performance profiling effectively.

Key Takeaways
Amazon CodeGuru provides automated code reviews and application performance recommendations using machine learning.
CodeGuru Reviewer performs static code analysis on code commits to detect bugs, security vulnerabilities, and resource leaks.
CodeGuru Profiler monitors application runtime behavior to identify performance bottlenecks and optimize resource usage.
CodeGuru supports Java and Python, integrates with GitHub, Bitbucket, and CodeCommit, and works for applications running on AWS Cloud or on-premises.