CloudFormation – Rollbacks

• Stack Creation Fails:
• Default: everything rolls back (gets deleted). We can look at the log
• Option to disable rollback and troubleshoot what happened
• Stack Update Fails:
• The stack automatically rolls back to the previous known working state
• Ability to see in the log what happened and error messages
• Rollback Failure? Fix resources manually then issue
ContinueUpdateRollback API from Console
• Or from the CLI using continue-update-rollback API call

---

CloudFormation - Rollbacks
CloudFormation Rollbacks
Let's discuss CloudFormation rollbacks, which are important to understand for the exam.

If you create a stack and the stack creation fails, you have two options. The first, which is the default, is that everything rolls back and gets deleted. You can review the CloudFormation creation logs to understand what happened and why it failed, but you cannot inspect the resources themselves.

If one of the resources has a problem and you want to keep it for troubleshooting, you have the option to disable the rollback during stack creation. This allows you to investigate what happened during the stack creation process.

In the case of stack updates, by default, the stack automatically rolls back to the last previous known working state if an update fails. This rollback deletes any newly created resources. You can check the logs and error messages to understand the failure.

Rollback Failures
If a rollback itself fails during a stack update, this indicates a problem with your stack, often caused by resources that were manually changed outside CloudFormation. In this case, you must manually fix these resources.

After manual fixes, you can issue a ContinueUpdateRollback command through the console, API, or CLI to instruct CloudFormation to attempt the rollback again.

Practical Example: Triggering Failures
Let's practice with failures by creating a stack using a template file named trigger-failure.yaml (version 2).

The trigger-failure.yaml template is problematic because the image ID for the EC2 instance does not exist, which will cause the stack creation to fail.

When creating the stack named TriggerCreationFailure, you have two stack failure options:

Roll back all stack resources (default): deletes all resources and rolls back to the previous stable state.
Preserve successfully provisioned resources: keeps successfully created resources and only rolls back failed ones to the last stable state.
Choosing the non-default option to preserve successfully provisioned resources allows you to keep resources like security groups that were created successfully, even if other parts of the stack creation fail.

For example, in this case, the SSH security group was created successfully and preserved, while the server security group failed to be created due to missing group description. This allows troubleshooting of the failure while keeping some resources intact.

However, because some resources remain, you must delete the stack manually to remove all resources before retrying or updating the stack.

Stack Update Failure and Rollback
Next, create a stack using a correct template named just-ec2.yaml and name it FailureOnUpdate. This stack creation should succeed.

After the stack is created, update it by replacing the template with the trigger-failure.yaml file. This update will fail due to the invalid AMI image ID.

During the update, you again have the option to either roll back all stack resources or preserve successfully provisioned resources. Choosing to roll back everything will delete all newly created resources and revert to the last stable state.

As the update fails, CloudFormation triggers a rollback. The security groups and instance created during the update are deleted, restoring the stack to its previous stable state.

Alternatively, if you choose to preserve successfully provisioned resources during the update failure, the resources that were created successfully before the failure will remain, while only the failed resources are rolled back.

Both rollback behaviors are valid depending on your troubleshooting or operational needs. When finished, remember to delete the stack to clean up all resources.

This concludes the lecture on CloudFormation rollbacks.

Key Takeaways
CloudFormation stack creation failures by default roll back and delete all resources.
Disabling rollback allows preserving successfully created resources for troubleshooting.
Stack update failures automatically roll back to the last known stable state.
In case of rollback failure, manual intervention and the ContinueUpdateRollback API call are required.

