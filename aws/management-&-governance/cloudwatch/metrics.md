AWS CloudWatch Metrics

• CloudWatch provides metrics for every services in AWS
• Metric is a variable to monitor (CPUUtilization, NetworkIn…)
• Metrics belong to namespaces
• Dimension is an attribute of a metric (instance id, environment, etc…).
• Up to 30 dimensions per metric
• Metrics have timestamps
• Can create CloudWatch dashboards of metrics

---

EC2 Detailed monitoring
• EC2 instance metrics have metrics “every 5 minutes”
• With detailed monitoring (for a cost), you get data “every 1 minute”
• Use detailed monitoring if you want to scale faster for your ASG!
• The AWS Free Tier allows us to have 10 detailed monitoring metrics
• Note: EC2 Memory usage is by default not pushed (must be pushed
from inside the instance as a custom metric)

---

CloudWatch Custom Metrics
• Possibility to define and send your own custom metrics to CloudWatch
• Example: memory (RAM) usage, disk space, number of logged in users …
• Use API call PutMetricData
• Ability to use dimensions (attributes) to segment metrics
• Instance.id
• Environment.name
• Metric resolution (StorageResolution API parameter – two possible value):
• Standard: 1 minute (60 seconds)
• High Resolution: 1/5/10/30 second(s) – Higher cost
• Important: Accepts metric data points two weeks in the past and two hours in the
future (make sure to configure your EC2 instance time correctly)

---

CloudWatch Metrics
Introduction to CloudWatch Metrics
CloudWatch metrics provide monitoring data for every service in AWS. Understanding what each metric means is essential. Usually, the metric name gives a clear indication of its purpose. For example, metrics like CPU Utilization or NetworkIn help you understand the behavior of the service and assist in troubleshooting.

Metrics Structure
Metrics belong to namespaces and have attributes called dimensions. Dimensions can include attributes such as instance ID or environment. You can specify up to 30 dimensions per metric. Each metric also has a timestamp indicating when the data was recorded. CloudWatch allows you to create dashboards to visualize these metrics.

EC2 Metrics and Monitoring
For EC2 instances, metrics are collected every five minutes by default. However, if you enable detailed monitoring, which incurs an additional cost, metrics are collected every one minute. This higher granularity allows faster reaction to changing metrics, benefiting features like Auto Scaling Groups (ASG) that scale out or in more quickly.

Custom Metrics
It is important to note that some metrics, such as instance memory usage (RAM), are not pushed by default. These must be sent from the instance as custom metrics. Instructions on how to push custom metrics will be covered shortly.

Navigating the CloudWatch Dashboard
On the CloudWatch dashboard, the left-hand side menu includes a Metrics section where you can find all available metrics. Metrics are organized by namespaces corresponding to AWS services, such as ELB, Auto Scaling, EBS, EC2, and EFS. This organization provides a wealth of information for monitoring your resources.

Viewing EC2 Metrics
By selecting EC2 metrics, you can view metrics per instance. For example, you can search for CPU credit balance to monitor CPU credits for a specific instance. You can select a custom time range, such as one month, to analyze historical data.

Metric Visualization
CloudWatch metrics provide data points at intervals depending on monitoring settings. For instances without detailed monitoring enabled, data points appear every five minutes. With detailed monitoring enabled, data points appear every one minute. You can filter metrics by time and choose different visualization styles, including lines, stacked areas, numbers, or pie charts. Metrics can also be added to dashboards, downloaded as CSV files, or shared.

Filtering and Regional Selection
CloudWatch allows filtering metrics based on region, dimension, and resource. This flexibility enables precise monitoring tailored to your needs.

Conclusion
CloudWatch metrics are a powerful tool for monitoring AWS services. Understanding metric names, namespaces, dimensions, and monitoring granularity helps you effectively track and troubleshoot your resources. Custom metrics extend this capability further, allowing you to monitor additional parameters such as memory usage. The CloudWatch dashboard provides versatile visualization and filtering options to suit various monitoring requirements.

Key Takeaways
CloudWatch provides metrics for every AWS service, with metric names indicating their meaning.
Metrics belong to namespaces and can have up to 30 dimensions, such as instance ID or environment.
EC2 instances provide metrics every five minutes by default; enabling detailed monitoring provides one-minute granularity.
Custom metrics, like instance memory usage, must be pushed manually from the instance.
CloudWatch dashboards allow filtering, visualization, and sharing of metrics data across regions and resources.

---

CloudWatch Custom Metrics
Introduction to Custom Metrics in CloudWatch
All the metrics we have seen so far in this course are metrics taken directly from the inner services that we have enabled by default. However, there is a way for you to get custom metrics for CloudWatch. You can define your own custom metrics.

For example, if you want to push the memory usage for the RAM to CloudWatch or the disk base, or the number of logged-in users for your application, you would use an API call named PutMetricData.

You can add dimensions or attributes to your custom metrics. For example, instance.id, environment.name, or any other attribute you want. It is up to you to name these dimensions as you prefer.

You can specify a metric resolution with a storage resolution API parameter that has two possible values. It can either be a standard custom metric, where you can push a metric every one minute (60 seconds), or it can enable very high resolution, in which case you can push metrics every 1, 5, 10, or 30 seconds.

Something important to know is that with custom metrics, when you push a metric in the past or in the future, this works as well. This is a very important exam point. If you are pushing a metric up to two weeks in the past or two hours in the future, you will not get an error from CloudWatch. It will accept your metric as is.

This means you need to make sure that your EC2 instance time is correctly configured if you want the metrics to be synchronized with the actual time from AWS.

Pushing a Custom Metric
Let's push a custom metric. For this, I went to the CloudWatch documentation for PutMetricData. This is a CLI documentation that shows you how to push a metric into CloudWatch. I will not read the entire documentation, but you can look at all the parameters there.

Very importantly, you can specify a timestamp up to two weeks in the past and two hours in the future. You can also specify the data, the name, the value, the units, dimensions, and the storage resolution if you want a high resolution metric or a standard resolution.

I am going to push a very simple custom example. At the end of the documentation, there are examples, and you can use a metrics JSON file to push a metric using the API call. Alternatively, you can use a single API command to specify the value of your metric, the unit (such as bytes), as well as instance ID, instance type, and so on.

Let me take this command and open the CloudShell utility to push that metric.

CloudShell is launched, and I am going to paste the command in and then press enter. This will push a custom metric into CloudWatch.

Imagine that if this is done from an EC2 instance with a script, for example, you can push any metric regularly. Right now, I am just pushing one data point using the CLI into CloudWatch, which is quite empty already.

If you know the unified agent for CloudWatch, it uses this PutMetricData API call to push metrics into CloudWatch regularly.

When this is pushed, we have created a new namespace named MyNameSpace. This means that if I go back to my CloudWatch metrics and refresh, I will see this custom namespace.

I need to clear my graph and then go out of the service and back in. Then I go to all metrics, and as you can see, we have a custom namespace that has been created here. Previously, namespaces were created by AWS, but now we have a namespace created by us.

In this namespace, we have two dimensions: instance ID and instance type. These represent the same instance ID and instance type dimensions that were specified in the command. It is up to you to define these dimensions.

Clicking on the namespace, you can see the instance ID, the instance type, and the metric name buffers. If I click on it now, we do not see much because there is only one data point that has been created. This is part of my custom metric.

That's it. It is quite easy to create custom metrics very easily using an API call.

I hope you found this useful, and I will see you in the next lecture.

Key Takeaways
Custom metrics in CloudWatch can be defined and pushed using the PutMetricData API call.
Custom metrics support dimensions such as instance ID and environment name, which can be named arbitrarily.
Metrics can be pushed with standard resolution (every 60 seconds) or high resolution (every 1, 5, 10, or 30 seconds).
CloudWatch accepts metric data with timestamps up to two weeks in the past or two hours in the future without error, requiring synchronized instance time configuration.
