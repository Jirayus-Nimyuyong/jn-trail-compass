DynamoDB Conditional Writes, Concurrent Writes & Atomic Writes
Introduction to DynamoDB Write Operations
This lecture covers the different types of write operations available in DynamoDB, providing a comprehensive understanding of how they function.

Concurrent Writes
Consider a scenario where two users attempt to update the same item concurrently. The first user requests to update the item with a value equal to one, while the second user requests to update the same item with a value equal to two. Both write operations will succeed independently. For example, the first write may update the value to one, and the second write may subsequently overwrite it to two. Consequently, one of the writes will overwrite the other.

This behavior is undesirable because although both updates report success, only one truly persists in the database. This situation is known as concurrent writes.

Conditional Writes
To address concurrency issues, DynamoDB supports conditional writes. In this approach, a user specifies a condition that must be true for the write to proceed. For example, one user might request to update the item to a value of one only if the current value is zero. Simultaneously, another user might request to update the item to a value of two, also only if the current value is zero.

In this case, the first write will be accepted, updating the value to one. The second write will fail because the condition that the value must be zero is no longer true; the value is now one. Therefore, the second write is rejected.

This mechanism effectively solves concurrency problems by ensuring that updates only occur when the specified conditions are met. This technique is known as optimistic locking.

Atomic Writes
Another type of write operation in DynamoDB is atomic writes. For example, one user may request to increase the value by one, while another user requests to increase the value by two. Both write operations will succeed, and the final value will be increased by the sum of both increments, which is three.

This ensures that concurrent increments are combined correctly without overwriting each other.

Batch Writes
Batch writes allow a user to write or update many items simultaneously. This operation is useful for efficiently processing multiple items in a single request.

Summary
Now you are familiar with all the types of writes available in DynamoDB. Understanding these concepts is essential for managing data consistency and concurrency effectively. This knowledge will also be valuable for exam preparation.

Key Takeaways
Concurrent writes in DynamoDB can lead to overwriting issues where multiple updates succeed but only the last one persists.
Conditional writes prevent concurrency problems by allowing updates only if certain conditions are met, implementing optimistic locking.
Atomic writes enable multiple increments to a value to be combined correctly, ensuring the total update reflects all changes.
Batch writes allow multiple items to be written or updated simultaneously, improving efficiency.
