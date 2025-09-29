CloudWatch Synthetics Canary

• Configurable script that monitor your APIs, URLs,
Websites, …
• Reproduce what your customers do
programmatically to find issues before customers
are impacted
• Checks the availability and latency of your
endpoints and can store load time data and
screenshots of the UI
• Integration with CloudWatch Alarms
• Scripts written in Node.js or Python
• Programmatic access to a headless Google Chrome
browser
• Can run once or on a regular schedule

---

CloudWatch Synthetics Canary Blueprints

• Heartbeat Monitor – load URL, store screenshot and an HTTP archive file
• API Canary – test basic read and write functions of REST APIs
• Broken Link Checker – check all links inside the URL that you are testing
• Visual Monitoring – compare a screenshot taken during a canary run with a baseline
screenshot
• Canary Recorder – used with CloudWatch Synthetics Recorder (record your
actions on a website and automatically generates a script for that)
• GUI Workflow Builder – verifies that actions can be taken on your webpage (e.g.,
test a webpage with a login form)

---
CloudWatch Synthetics
Introduction to CloudWatch Synthetics Canary
CloudWatch Synthetics Canary enables you to create configurable scripts that run from CloudWatch to monitor your APIs, URLs, or websites. These scripts programmatically reproduce the actions your customers perform.

For example, if a customer visits a product webpage, adds an item to the cart, proceeds to checkout, enters credit card details, and completes the purchase, you can test and reproduce all these steps using CloudWatch Synthetics Canary.

If the script fails at any point, it indicates an issue, allowing you to detect problems before your customers do. This helps verify whether specific flows are functioning correctly.

CloudWatch Synthetics Canary can also check the availability and latency of endpoints, store load time data, and even take screenshots of the user interface.

Example Use Case
Consider an application deployed in the us-east-1 region. CloudWatch Synthetics Canary monitors this application. If the monitoring detects a failure, a CloudWatch alarm triggers a Lambda function.

The Lambda function can update the DNS record in Route 53 to point to another instance in the us-west-2 region, redirecting traffic to a known working version of the application. This is one example of automated failover using CloudWatch Synthetics Canary.

Script Development and Execution
The scripts that Synthetics Canary runs can be written in Node.js or Python. Additionally, within Synthetics Canary, you have access to a headless Google Chrome browser.

This allows you to perform any actions you would normally do with Google Chrome directly from within Synthetics Canary.

You can choose to run your script once or on a regular schedule, for example, to continuously check the availability of your endpoints.

Available Blueprints
CloudWatch Synthetics provides several blueprints to help you get started:

Heartbeat Monitor: Loads a URL, stores screenshots and an HTTP archive file, and verifies that everything is working correctly.
API Canary: Tests basic read and write functions of REST APIs.
Broken Link Checker: Checks all links within the URL you are testing to ensure none lead to broken links.
Visual Monitoring: Compares a screenshot taken during the canary run with a baseline screenshot taken previously.
Canary Recorder: Used with CloudWatch Synthetics Recorder to record your actions on a website and automatically generate a script that can be run directly on Synthetics Canary, repeating the recorded actions.
GUI Workflow Builder: Allows you to verify that actions taken on your webpage, such as submitting a login form, are working correctly.
Conclusion
CloudWatch Synthetics Canary is a powerful tool for monitoring the functionality and availability of your web applications and APIs by simulating user interactions and automating checks.

I hope you found this overview of CloudWatch Synthetics Canary helpful. See you in the next lecture.

Key Takeaways
CloudWatch Synthetics Canary allows you to create configurable scripts to monitor APIs, URLs, and websites by programmatically reproducing customer interactions.
The canary scripts can be written in Node.js or Python and run using a headless Google Chrome browser.
It supports scheduled runs, capturing screenshots, storing load time data, and checking availability and latency of endpoints.
Integration with CloudWatch alarms and AWS Lambda enables automated responses such as DNS updates for failover scenarios.