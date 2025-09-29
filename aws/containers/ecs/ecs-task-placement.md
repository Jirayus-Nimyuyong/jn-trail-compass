Amazon ECS - Task Placements
• When an ECS task is started with EC2
Launch Type, ECS must determine
where to place it, with the constraints
of CPU and memory (RAM)
• Similarly, when a service scales in, ECS
needs to determine which task to
terminate
• You can define:
• Task Placement Strategy
• Task Placement Constraints
• Note: only for ECS Tasks with EC2
Launch Type (Fargate not supported)

---
Amazon ECS – Task Placement Strategies
• Binpack
• Tasks are placed on the least available amount of CPU and Memory
• Minimizes the number of EC2 instances in use (cost savings)

• Random
• Tasks are placed randomly

• Spread
• Tasks are placed evenly based on the specified value
• Example: instanceId, attribute:ecs.availability-zone, …

• You can mix them together

---
Amazon ECS – Task Placement Constraints

• distinctInstance
• Tasks are placed on a different EC2 instance

• memberOf
• Tasks are placed on EC2 instances that satisfy a specified expression
• Uses the Cluster Query Language (advanced)



---
Amazon ECS – Task Placement Process
• Task Placement Strategies are a best effort

• When Amazon ECS places a task, it uses the following process to select
the appropriate EC2 Container instance:
Identify which instances that satisfy the CPU, memory, and por t requirements
Identify which instances that satisfy the Task Placement Constraints
Identify which instances that satisfy the Task Placement Strategies
Select the instances

Amazon ECS - Task Placements
Introduction to ECS Task Placements
A new concept required for the exam is the concept of ECS task placements. When a task of type EC2 is created, ECS must determine where to place the task based on the available memory, CPU, and ports on the target EC2 instances.

For example, consider an ECS cluster made of three EC2 instances. Some tasks are placed on each instance in various ways. If the ECS service has a new container, a new task that it wants to place on your EC2 instances, it needs to determine where to place it. This is the central question.

Similarly, whenever a service scales in, meaning that an ECS task is removed, the ECS service must determine which ECS task to terminate.

To assist with this, you can define what is called a task placement strategy and task placement constraints. These guide where a new container will be added or where a container will be removed from.

This only works when using ECS launched on EC2 instances, not for Fargate. For Fargate, AWS determines where to start the container, and you do not manage any backend instances. Therefore, this is only valid for ECS on EC2.

Task Placement Process
The first thing to note is that task placement strategies are a best effort. If you want to have constraints, these will be discussed soon.

When ECS places tasks, it uses the following process to select where to place them:

Identify instances that satisfy the CPU, memory, and port requirements in the task definition.
Apply the task placement constraints.
Identify the instance that best satisfies the task placement strategy.
Select that instance for the task placement and place the task there.
Task Placement Strategies
The first strategy to know for the exam is called binpack. Binpack places tasks based on the least available amount of CPU or memory. This helps minimize the number of instances in use, resulting in cost savings.

json Code Sample
{
  "type": "binpack",
  "field": "memory"
}
If there is one EC2 instance, ECS will try to fill up that EC2 instance with containers. When it cannot place any more containers on that instance, it will place containers on another EC2 instance. As shown, as many containers as possible are placed on one EC2 instance before moving to the next. This is why it is called binpack, as it packs all the containers together. This strategy brings the most cost savings by minimizing the number of EC2 instances in use and maximizing the utilization of one EC2 instance at a time.

Random Placement Strategy
The next task placement strategy is random. This strategy places the tasks randomly.

json Code Sample
{
  "type": "random"
}
For example, if there are two EC2 instances and tasks are being added, they will be placed randomly. There is no logic to it, just random placement. This is not an optimal strategy, but it works.

Spread Placement Strategy
The last placement strategy to be aware of is spread. Suppose there are three EC2 instances in three different availability zones. If the spread strategy is used, tasks will be distributed based on the specified value, such as instance ID or ECS availability zones.

json Code Sample
{
  "type": "spread",
  "field": "attribute:ecs.availability-zone"
}
For example, with a placement strategy of spread on ECS availability zones, tasks will be spread evenly across AZs. The first task may be on AZ-A, then AZ-B, then AZ-C, and so on. They are spread across each AZ and then the process starts over. This maximizes the high availability of the ECS service by spreading the tasks on the EC2 instances.

Task placement strategies can be mixed together. For example, you can have a spread on availability zone and then a spread on instance ID, or a spread on availability zone and then a binpack on memory. It is possible to mix and match, but for the exam, focus on understanding the difference between binpack, spread, and random.

ECS Task Placement Constraints
Task placement constraints bring additional rules to how tasks are placed.

distinctInstance Constraint
The first constraint is called distinctInstance. This ensures that each task is placed on a different container instance, so there will never be two tasks on the same instance.

json Code Sample
{
  "type": "distinctInstance"
}
memberOf Constraint
The second constraint is called memberOf. This allows you to place tasks on instances that satisfy an expression defined in the cluster query language, which is more advanced.

json Code Sample
{
  "type": "memberOf",
  "expression": "attribute:ecs.instance-type == t2.*"
}
For example, with this placement constraint, the instance type must be of type t2. All tasks will be placed only on t2 instances. This is the kind of constraint you can use with memberOf. The distinctInstance constraint is straightforward, while memberOf uses a more complex cluster query language to force your task to be, for example, only on specific EC2 instances.

Conclusion
These are the key concepts for ECS task placements, including strategies and constraints. This knowledge is essential for the exam.

Key Takeaways
ECS task placement determines where tasks are placed on EC2 instances based on available resources and defined strategies.
Three main task placement strategies are binpack, random, and spread, each with distinct behaviors and use cases.
Task placement constraints such as distinctInstance and memberOf allow for fine-grained control over where tasks are placed.
These concepts apply only to ECS on EC2, not Fargate, as Fargate manages placement automatically.