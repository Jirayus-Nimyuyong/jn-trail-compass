X-Ray Sampling Rules
• With sampling rules, you control the amount of data that you record
• You can modify sampling rules without changing your code
• By default, the X-Ray SDK records the first request each second, and
five percent of any additional requests.
• One request per second is the reservoir, which ensures that at least
one trace is recorded each second as long the service is serving
requests.
• Five percent is the rate at which additional requests beyond the
reservoir size are sampled.

---

X-Ray Custom Sampling Rules

You can create your own rules with the reservoir and rate

---

X-Ray: Sampling Rules
Introduction to X-Ray Sampling Rules
In this lecture, we will explore where to set up sampling rules in AWS CloudWatch for X-Ray traces.

To configure sampling rules for X-Ray traces, navigate to the left-hand side menu and select Settings. Under CloudWatch settings, you will find Traces. Here, you can manage encryption rules, group rules, and sampling rules. We will focus on sampling rules in this session.

Viewing the Default Sampling Rule
Currently, there is a default sampling rule with a priority of 10,000. This rule applies when there is one request per second, with a fixed rate of 5%. The matching criteria for this rule is set to match everything.

You can edit this default rule to change the reservoir size and fixed rate if desired. However, the matching criteria cannot be changed because it is a default rule. The only adjustable parameters are the limits.

Creating a Custom Sampling Rule
You can create your own sampling rule by clicking on Create Sampling Rule. For example, you might name it DemoSampling.

When creating a custom rule, you can set the priority between 1 and 9,999. Note that a lower number indicates a higher priority. For instance, setting a priority of 5,000 gives this rule a higher priority than the default rule.

You can also specify the reservoir size, which is the maximum number of requests to sample per second. For example, you might set the reservoir size to 1 and the fixed rate to 100%. These values can be adjusted based on your sampling needs.

Targeting Specific Services and Requests
If you want to target a specific service, enter the service name, such as MYSERVICE. You can also specify the HTTP method, for example, POST, and a URL path. This allows you to sample every request made to that service with the specified method and path, enabling you to get detailed traces for those requests.

Applying Sampling Rules
Once you create a sampling rule, it takes effect automatically. There is no need to restart the X-Ray daemons. The daemons will incorporate these rules immediately, and you will start seeing the impact directly in the X-Ray console.

Conclusion
This concludes the lecture on setting up sampling rules in AWS X-Ray. Implementing these rules allows you to control the volume and specificity of trace data collected, optimizing your monitoring and debugging processes.

Key Takeaways
Sampling rules for AWS X-Ray can be configured in the CloudWatch settings under traces.
The default sampling rule has a fixed priority and matches all requests but can only have its limits adjusted.
Custom sampling rules can be created with specific priorities, reservoir sizes, fixed rates, and matching criteria such as service name, HTTP method, and URL path.
Changes to sampling rules take effect immediately without needing to restart X-Ray daemons.