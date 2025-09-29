DynamoDB Basic APIs - Hands On
Overview of DynamoDB API Calls
Let's have a look at the data API calls we can perform on a DynamoDB table.

Currently, we are in the 'Scan' section where we can select a table and then click on 'Run'. The 'Scan' operation scans the entire table and returns many items to us.

Creating an Item with PutItem
To create an item, we specify a user ID, for example, Alice456, and then specify a timestamp. For instance, the timestamp could be something like 2021-05-06T00:00. Then, we add some content such as "Alice blog".

After specifying these attributes, we create the item by performing a PutItem operation. This sends a new item into DynamoDB with the specified user ID and post timestamp, creating the item if it is new.

Updating an Item with UpdateItem
To update an item, we can select 'Actions' and then 'Edit'. We edit a specific attribute, for example changing the content to "Alice blog edited", and then click on 'Save changes'. Behind the scenes, this performs an UpdateItem API call.

Retrieving an Item with GetItem
To retrieve an item, we can click on a specific row and open the 'Item editor'. Behind the scenes, this performs a GetItem operation to fetch the content of the selected item.

Batch Actions: Batch Delete
We can perform batch actions such as batch deleting items by selecting 'Actions' and then 'Delete Items'. This performs a batch delete operation.

If you want to delete everything in the table, you could perform a Scan followed by a batch delete, but this is not very efficient. Alternatively, you could simply drop the table to remove all data.

Scan vs Query
The Scan operation returns all items in the table. You can apply a filter, but this filtering is done client-side in your web browser, not within DynamoDB itself.

In contrast, the Query operation is more efficient because you can specify a specific partition key, such as a user ID, to retrieve all items for that user. For example, querying for user ID "John123" returns all items associated with that user.

You can also specify conditions on the sort key, such as the post timestamp. Conditions include equal to, less than or equal to, greater than, between, and begins with.

For example, querying for posts after "2021-11" returns one item, while querying for posts after "2021-09" returns two items.

Limitations of Query
The Query operation only works on the partition key (user ID) and the sort key (post timestamp). You cannot query based on other attributes such as content. While you can filter on content, this filtering happens client-side after data retrieval.

This demonstrates the power of using partition keys (hash keys) and sort keys in DynamoDB for efficient data retrieval.

Summary
We have covered all the basic DynamoDB APIs including Scan, PutItem, UpdateItem, GetItem, BatchDelete, and Query. Let's finish by performing a Scan to retrieve all data from the table.

I hope you found this lecture helpful, and I look forward to seeing you in the next lecture.

Key Takeaways
Demonstrated how to perform basic DynamoDB API operations including Scan, PutItem, UpdateItem, GetItem, BatchDelete, and Query.
Explained the difference between Scan and Query, emphasizing the efficiency of Query with partition and sort keys.
Highlighted that client-side filtering occurs after Scan, not within DynamoDB itself.
Showed the importance of partition keys and sort keys for efficient data retrieval in DynamoDB.
