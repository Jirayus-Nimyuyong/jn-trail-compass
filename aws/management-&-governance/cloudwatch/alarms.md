CloudWatch Alarms

• Alarms are used to trigger notifications for any metric
• Various options (sampling, %, max, min, etc…)
• Alarm States:
• OK
• INSUFFICIENT_DATA
• ALARM
• Period:
• Length of time in seconds to evaluate the metric
• High resolution custom metrics: 10 sec, 30 sec or multiples of 60 sec

---

CloudWatch Alarm Targets

• Stop, Terminate, Reboot, or Recover an EC2 Instance
• Trigger Auto Scaling Action
• Send notification to SNS (from which you can do pretty much anything)

---

CloudWatch Alarms – Composite Alarms

• CloudWatch Alarms are on a single metric
• Composite Alarms are monitoring the states of multiple other alarms
• AND and OR conditions
• Helpful to reduce “alarm noise” by creating complex composite alarms

---

EC2 Instance Recovery
• Status Check:
• Instance status = check the EC2 VM
• System status = check the underlying hardware
• Attached EBS status = check attached EBS volumes

• Recovery: Same Private, Public, Elastic IP, metadata, placement group

---

CloudWatch Alarm: good to know

• Alarms can be created based on CloudWatch Logs Metrics Filters
• To test alarms and notifications, set the alarm state to Alarm using CLI
aws cloudwatch set-alarm-state --alarm-name "myalarm" --state-value
ALARM --state-reason "testing purposes"

---

CloudWatch Alarms
Introduction to CloudWatch Alarms
CloudWatch Alarms are used to trigger notifications based on any metric. You can define complex alarms with various options such as sampling methods, percentages, or maximum values.

Alarms have three states:

OK: The alarm is not triggered.
INSUFFICIENT_DATA: There is not enough data for the alarm to determine a state.
ALARM: The threshold has been breached, and a notification will be sent.
The period is the duration over which the alarm evaluates the metric. This period can be very short or very long and applies to high-resolution custom metrics as well, such as 10 seconds, 30 seconds, or multiples of 60 seconds.

Alarm Targets
CloudWatch Alarms have three main targets:

Actions on EC2 instances, such as stopping, terminating, rebooting, or recovering an instance.
Triggering auto-scaling actions, for example, scaling out or scaling in.
Sending notifications to the SNS service, which can then trigger Lambda functions to perform custom actions based on the alarm being breached.
Composite Alarms
CloudWatch Alarms monitor single metrics, but if you want to monitor multiple metrics together, you can use Composite Alarms. Composite Alarms monitor the states of multiple other alarms, each potentially relying on different metrics.

They combine these alarms using logical AND or OR conditions, providing flexibility in defining complex conditions.

Composite Alarms help reduce alarm noise by allowing you to specify conditions such as:

Alert only when CPU is high and network is low.
Avoid alerts when both CPU and network are high.
This flexibility enables more precise monitoring and alerting.

Example of Composite Alarm
Consider an EC2 instance with two underlying alarms:

Alarm A monitors the CPU usage.
Alarm B monitors the IOPS of the instance.
The Composite Alarm is defined as the logical junction of Alarm A and Alarm B. If both Alarm A and Alarm B are in the ALARM state, the Composite Alarm itself will be in the ALARM state and can trigger an SNS notification.

EC2 Instance Recovery
There are three status checks related to EC2 instances:

Instance status check: Checks the EC2 virtual machine.
System status check: Checks the underlying hardware layer.
Attached EBS status check: Checks the health of attached EBS volumes.
You can define CloudWatch Alarms on these checks to monitor specific EC2 instances.

If an alarm is breached, you can initiate an EC2 instance recovery. This process moves your EC2 instance from one host to another while retaining the same private IP, public IP, elastic IP, metadata, and placement group.

Additionally, you can send alerts to an SNS topic to notify when an EC2 instance recovery occurs.

CloudWatch Alarms and Logs
CloudWatch Alarms can be created on top of CloudWatch Logs metric filters. For example, if a metric filter detects too many occurrences of a specific word such as "error," it can trigger an alarm and send a message to Amazon SNS.

To test alarms and notifications, you can use the CLI command set-alarm-state. This command allows you to trigger an alarm manually, even if the threshold has not been reached, to verify that the alarm triggers the correct actions in your infrastructure.

Conclusion
This concludes the discussion on CloudWatch Alarms. They provide powerful monitoring and automation capabilities for AWS resources, enabling proactive management and alerting.

Key Takeaways
CloudWatch Alarms monitor metrics and trigger notifications based on defined thresholds.
Alarms have three states: OK, INSUFFICIENT_DATA, and ALARM.
Composite Alarms combine multiple alarms using AND/OR logic to reduce noise.
EC2 instance recovery can be automated using alarms on status checks.
CloudWatch Alarms can be triggered by metric filters on logs and tested via CLI commands.