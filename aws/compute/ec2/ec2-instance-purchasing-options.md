EC2 Instances Purchasing Options
• On-Demand Instances – short workload, predictable pricing, pay by second
• Reserved (1 & 3 years)
• Reserved Instances – long workloads
• Conver tible Reserved Instances – long workloads with flexible instances
• Savings Plans (1 & 3 years) –commitment to an amount of usage, long workload
• Spot Instances – short workloads, cheap, can lose instances (less reliable)
• Dedicated Hosts – book an entire physical server, control instance placement
• Dedicated Instances – no other customers will share your hardware
• Capacity Reservations – reserve capacity in a specific AZ for any duration

---
EC2 On Demand
• Pay for what you use:
• Linux or Windows - billing per second, after the first minute
• All other operating systems - billing per hour
• Has the highest cost but no upfront payment
• No long-term commitment
• Recommended for shor t-term and un-interrupted workloads, where
you can't predict how the application will behave

---
EC2 Reserved Instances
• Up to 72% discount compared to On-demand
• You reserve a specific instance attributes (Instance Type, Region, Tenancy, OS)
• Reservation Period – 1 year (+discount) or 3 years (+++discount)
• Payment Options – No Upfront (+), Par tial Upfront (++), All Upfront (+++)
• Reserved Instance’s Scope – Regional or Zonal (reserve capacity in an AZ)
• Recommended for steady-state usage applications (think database)
• You can buy and sell in the Reserved Instance Marketplace
• Conver tible Reserved Instance
• Can change the EC2 instance type, instance family, OS, scope and tenancy
• Up to 66% discount

Note: the % discounts are different from the video as AWS
change them over time – the exact numbers are not needed
for the exam. This is just for illustrative purposes

---
EC2 Savings Plans
• Get a discount based on long-term usage (up to 72% - same as RIs)
• Commit to a certain type of usage ($10/hour for 1 or 3 years)
• Usage beyond EC2 Savings Plans is billed at the On-Demand price
• Locked to a specific instance family & AWS region (e.g., M5 in us-east-1)
• Flexible across:
• Instance Size (e.g., m5.xlarge, m5.2xlarge)
• OS (e.g., Linux, Windows)
• Tenancy (Host, Dedicated, Default)

---
EC2 Spot Instances
• Can get a discount of up to 90% compared to On-demand
• Instances that you can “lose” at any point of time if your max price is less than the
current spot price
• The MOST cost-efficient instances in AWS
• Useful for workloads that are resilient to failure
• Batch jobs
• Data analysis
• Image processing
• Any distributed workloads
• Workloads with a flexible start and end time
• Not suitable for critical jobs or databases

---
EC2 Dedicated Hosts
• A physical server with EC2 instance capacity fully dedicated to your use
• Allows you address compliance requirements and use your existing server-
bound software licenses (per-socket, per-core, pe—VM software licenses)
• Purchasing Options:
• On-demand – pay per second for active Dedicated Host
• Reserved - 1 or 3 years (No Upfront, Partial Upfront, All Upfront)
• The most expensive option
• Useful for software that have complicated licensing model (BYOL – Bring Your
Own License)
• Or for companies that have strong regulatory or compliance needs

---
EC2 Dedicated Instances
• Instances run on hardware that’s
dedicated to you
• May share hardware with other
instances in same account
• No control over instance placement
(can move hardware after Stop / Start)

---
EC2 Capacity Reservations
• Reserve On-Demand instances capacity in a specific AZ for any
duration
• You always have access to EC2 capacity when you need it
• No time commitment (create/cancel anytime), no billing discounts
• Combine with Regional Reserved Instances and Savings Plans to benefit
from billing discounts
• You’re charged at On-Demand rate whether you run instances or not
• Suitable for short-term, uninterrupted workloads that needs to be in a
specific AZ

---
EC2 Instance Purchasing Options
Introduction to EC2 Instance Purchasing Options
So far, we have been using on-demand EC2 instances. These allow us to run instances on demand, which means they are suitable for short workloads. They provide predictable pricing, and we pay by the second.

Optimizing Costs with Different Purchasing Options
If you have different kinds of workloads, you can optimize your discounts and pricing by specifying your preferences to AWS. For example, you can use reserved instances with one-year or three-year terms, which are meant for long workloads. If you know you are going to run a database for a long time, then a reserved instance is a great choice.

Convertible Reserved Instances
If you want flexibility to change the instance type over time, convertible reserved instances are suitable for you. I will provide a deep dive into all these options over time.

Savings Plans
Savings plans have one- and three-year terms and are more modern. Instead of committing to a specific instance type, you commit to a specific amount of usage in dollars. These are also intended for long workloads.

Spot Instances
Spot instances are designed for very short workloads. They are very inexpensive, but you can lose these instances at any time, which makes them less reliable.

Dedicated Hosts and Dedicated Instances
Dedicated hosts allow you to book an entire physical server and control instance placements. Dedicated instances mean that no other customers will share your hardware.

Capacity Reservations
Capacity reservations allow you to reserve capacity in a specific Availability Zone for any duration.

EC2 On-Demand Instances
With on-demand instances, you pay for what you use. For Linux or Windows, billing is per second after the first minute. For other operating systems, billing is per hour. On-demand instances have the highest cost but require no upfront payments and no long-term commitments. They are recommended for short-term, uninterrupted workloads where application behavior is unpredictable.

Reserved Instances
Reserved instances offer up to 72% discounts compared to on-demand pricing. You reserve specific instance attributes such as instance type, region, tenancy, and operating system. You specify a reservation period of one or three years to receive greater discounts. Payment options include upfront, partial upfront, or no upfront, with all upfront payments providing the maximum discount.

Scope of Reserved Instances
You can choose the scope to be regional or specific to an Availability Zone, which reserves capacity in that zone. Reserved instances are ideal for steady-state usage applications, such as databases. You can buy or sell reserved instances in a marketplace if you no longer need them.

Convertible Reserved Instances
Convertible reserved instances allow you to change the instance type, family, operating system, scope, and tenancy. Due to this flexibility, the discounts are slightly lower, up to 66%.

EC2 Savings Plans
Savings plans provide discounts based on long-term usage, similar to reserved instances with approximately 70% discounts. Instead of committing to a specific instance type, you commit to a specific spending amount per hour for one to three years. Any usage beyond the savings plan is billed at the on-demand price.

Flexibility with Savings Plans
Savings plans lock you to a specific instance family and region, for example, the M5 instance family in us-east-1. However, you can switch between instance sizes (e.g., m5.xlarge, m5.2xlarge), operating systems (Linux, Windows), and tenancy (host, dedicated, default).

Spot Instances
Spot instances offer the most aggressive discounts, up to 90% off compared to on-demand prices. You define the maximum price you are willing to pay. If the spot price exceeds your maximum, your instance can be terminated. Spot instances are the most cost-efficient in AWS and are suitable for workloads resilient to failure, such as batch jobs, data analysis, image processing, and distributed workloads with flexible start and end times. They are not suitable for critical jobs or databases.

Dedicated Hosts
Dedicated hosts provide an actual physical server with EC2 instance capacity fully dedicated to your use case. Use cases include compliance requirements or using existing server-bound software licenses that are billed per socket, core, or VM. Dedicated hosts can be used on-demand with per-second billing or reserved for one or three years. They are the most expensive AWS option because you reserve a physical server.

Dedicated Instances
Dedicated instances run on hardware dedicated to you, but you may share the hardware with other instances in the same account. You have no control over instance placements. The difference between dedicated instances and dedicated hosts is that dedicated hosts provide access to the physical server itself, giving visibility into lower-level hardware.

Capacity Reservations
Capacity reservations allow you to reserve on-demand instances in a specific Availability Zone for any duration. You get access to that capacity whenever you need it. There is no time commitment, so you can cancel your reservation at any time. There are no billing discounts; you are charged at on-demand rates whether or not you run instances. This option is suitable for short-term uninterrupted workloads that need to be in a specific Availability Zone.

Summary of Purchasing Options
Choosing the right purchasing option can be difficult, especially for beginners. Here is an analogy:

On-demand: Like a resort where you come and go as you please, paying full price.
Reserved: Planning ahead for a long stay (one to three years) to get a good discount.
Savings plan: Committing to a specific spending amount over time, allowing changes in room type.
Spot instances: Last-minute discounts for empty rooms, but you can be asked to leave if someone pays more.
Dedicated host: Booking the entire building of the resort, your own hardware.
Capacity reservation: Booking a room you may or may not use, paying full price regardless.
Price Comparison Example
Here is an example price comparison for an m4.large instance in us-east-1:

On-demand price: $0.10 per hour
Spot price: up to 61% off
Reserved instances: varying prices depending on term and upfront payment
Savings plans: similar discounts to reserved instances
Convertible reserved instances: slightly less discount
Dedicated host: on-demand price or up to 70% off with reservation
Capacity reservation: on-demand price
Note that prices can change over time.

Exam Tips
The exam will test your knowledge of which instance type is right based on workloads. By now, you should have some good hints. We will practice this over time.

Conclusion
That concludes this lecture on EC2 instance purchasing options. I hope you found it helpful, and I look forward to seeing you in the next lecture.

Key Takeaways
On-demand EC2 instances provide flexible, pay-by-the-second pricing ideal for short workloads without long-term commitments.
Reserved instances offer significant discounts for one- or three-year commitments, suitable for steady-state, long-running applications.
Savings plans provide flexible discounts based on committed spend rather than specific instance types.
Spot instances offer the highest discounts but can be interrupted, making them suitable for fault-tolerant workloads.
Dedicated hosts and dedicated instances provide physical hardware isolation for compliance or licensing needs.
Capacity reservations guarantee instance availability in a specific availability zone without discounts.