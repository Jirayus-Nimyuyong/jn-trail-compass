DynamoDB – Optimistic Locking

• DynamoDB has a feature called “Conditional Writes”
• A strategy to ensure an item hasn’t changed before you update/delete it
• Each item has an attribute that acts as a version number

---

DynamoDB Optimistic Locking
Introduction to DynamoDB Optimistic Locking
DynamoDB provides a feature called Optimistic Locking. This feature allows you to perform Conditional Writes in DynamoDB. Conditional Writes ensure that an item has not changed before you update or delete it. Essentially, you specify that you want to write data only if a certain condition is met. This approach is known as Optimistic Locking.

How Optimistic Locking Works
The mechanism involves having an attribute on your items that acts as a version number. When you perform an update, you check an equality condition on this version number to ensure it has not changed since you last read it.

Example Scenario
Consider a DynamoDB table with an item that has a user ID, a first name, and a version attribute set to 1. Two clients simultaneously want to update this item because they believe the first name is incorrect.

Client 1 wants to update the first name to "John" only if the version is 1.
Client 2 wants to update the first name to "Lisa" only if the version is 1.
One of these requests will reach DynamoDB first. Suppose Client 2's request arrives first; DynamoDB will update the first name to "Lisa" and increment the version to 2.

Outcome for Concurrent Updates
As a result, Client 1's update will fail because the version condition no longer holds true. DynamoDB will respond with an error indicating that the data is outdated. Client 1 should then retrieve the latest item and attempt the update again if desired.

Summary
This feature of Conditional Writes or Optimistic Locking is important and is often tested in exams. It provides a way to handle concurrent updates safely without locking the data.

This concludes the introduction to DynamoDB Optimistic Locking. Although it is difficult to demonstrate easily in a short lecture, understanding this concept is valuable for managing concurrent data modifications.

Key Takeaways
DynamoDB supports Optimistic Locking through Conditional Writes to ensure data consistency.
A version number attribute on items is used to check for concurrent modifications.
Updates occur only if the version number matches the expected value, preventing overwrites.
Clients receive an error if the version condition fails, prompting them to retrieve the latest data before retrying.