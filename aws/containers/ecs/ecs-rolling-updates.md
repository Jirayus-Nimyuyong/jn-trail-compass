ECS Rolling Updates
• When updating from v1 to v2, we can
control how many tasks can be started
and stopped, and in which order

---
Amazon ECS - Rolling Updates
Introduction to ECS Service Updates
Now let's talk about how to update an ECS service. For this, we use rolling updates. When you update an ECS service from version 1 to version 2, you can control how many tasks will be started and stopped at a time and in which order.

When you select a new task definition number and want to update an ECS service, you will have two settings: the minimum healthy percent and the maximum percent. By default, these are set to 100 and 200 respectively. Let's see what they mean.

For example, your ECS service is running nine tasks, which represents an actual running capacity of 100%. If you set a minimum healthy percent of less than 100, this means you are allowed to terminate some tasks as long as the remaining tasks maintain a percentage over the minimum healthy percent.

The maximum percent indicates how many new tasks you can create of the new version to roll update your service.

These two settings impact your updates by controlling the number of tasks created and terminated during the rolling update process. You will create new tasks, then terminate old tasks, and so on, to ensure all tasks are updated to the newer version.

Scenario 1: Minimum Healthy Percent at 50 and Maximum Percent at 100
Suppose you start with four tasks. In this case, you can terminate two tasks so that you are running at 50% capacity. Then, two new tasks are created, bringing you back to 100% capacity. Next, two old tasks are terminated, returning to 50% capacity. Finally, two new tasks are created again, restoring 100% capacity. This completes the rolling update.

In this scenario, tasks are terminated during the update because the minimum healthy percent is set to 50 and the maximum to 100.

Scenario 2: Minimum Healthy Percent at 100 and Maximum Percent at 150
Starting with four tasks, you cannot terminate any tasks initially because the minimum healthy percent is 100. Therefore, you create two new tasks first, increasing capacity to 150%. Since you are above the minimum, you can then terminate two old tasks, bringing capacity back to 100%. Next, you create two new tasks again, and finally terminate two old tasks. This completes the rolling update.

This approach allows for zero downtime by temporarily increasing capacity during the update.

Summary
Understanding the minimum healthy percent and maximum percent settings is crucial for managing rolling updates in ECS services. These settings determine how many tasks can be stopped or started during the update process, affecting service availability and resource usage.

Key Takeaways
Rolling updates in Amazon ECS allow controlled updating of services from one version to another.
The minimum healthy percent controls the lowest allowed running capacity during updates.
The maximum percent controls the highest allowed running capacity during updates.
Different settings of minimum and maximum percentages affect how tasks are terminated and created during rolling updates.