DynamoDB – Conditional Writes

• For PutItem, UpdateItem, DeleteItem, and BatchWriteItem
• You can specify a Condition expression to determine which items should be modified:
• attribute_exists
• attribute_not_exists
• attribute_type
• contains (for string)
• begins_with (for string)
• ProductCategory IN (:cat1, :cat2) and Price between :low and :high
• size (string length)
• Note: Filter Expression filters the results of read queries, while Condition
Expressions are for write operations

---

Conditional Writes – Example on Update Item

---

Conditional Writes – Example on Delete Item

• attribute_not_exists
• Only succeeds if the attribute doesn’t exist yet (no value)

• attribute_exists
• Opposite of attribute_not_exists

---

Conditional Writes – Do Not Overwrite Elements

• attribute_not_exists(partition_key)
• Make sure the item isn’t overwritten

• attribute_not_exists(partition_key) and
attribute_not_exists(sort_key)
• Make sure the partition / sort key combination is not overwritten

---

Conditional Writes – Example Complex Condition

---

Conditional Writes – Example of String Comparisons

• begins_with – check if prefix matches
• contains – check if string is contained in another string

---

DynamoDB - Conditional Writes
Introduction to DynamoDB Conditional Writes
DynamoDB supports conditional writes for its write operations, including PutItem, UpdateItem, DeleteItem, and BatchWriteItem. These conditional writes allow you to specify a condition expression that determines which items should be modified.

Several condition expressions are available to use in DynamoDB conditional writes. These include:

attribute_exists and attribute_not_exists
attribute_type to check if an attribute exists and is of the correct type
contains and begins_with for string comparisons
The IN keyword to check if a value belongs to a set of values
between to check if a value falls within a range
Comparison operators such as greater than or less than
The size function to check string length
It is important to distinguish between Filter Expressions and Condition Expressions in DynamoDB:

Filter Expressions filter the results of read queries.
Condition Expressions apply only to write operations and determine whether the write should succeed or fail based on the condition.
Example: Conditional UpdateItem
Consider an UpdateItem operation on the productcatalog table where we want to set the price to the current price minus a discount, but only if the price is above a specific limit. The condition expression ensures the update only occurs if the price exceeds this limit.

The discount and limit values are passed in a values.json file, for example:

discount: 150
limit: 500
If the item with key 456 has a price of 650, applying this update will reduce the price to 500 because 650 is greater than 500. However, applying the same update again will not succeed because the price is no longer above the limit, preventing the price from going below 500.

Conditional DeleteItem
You can also use condition expressions with DeleteItem operations. For example, you might want to delete an item only if a certain attribute does not exist. This can be useful for cleaning up items that lack required attributes, such as a price.

Using attribute_not_exists ensures the delete only succeeds if the attribute is missing. Conversely, attribute_exists can be used to delete items only if a certain attribute exists, such as deleting product reviews with a one-star rating.

Preventing Overwrites with Condition Expressions
Using attribute_not_exists on the partition key ensures that an item is only written if it does not already exist in the database. This prevents overwriting existing data. If both a partition key and sort key are used, you can specify attribute_not_exists for both keys to ensure no existing item is overwritten.

Checking Values with Condition Expressions
You can check if an attribute value belongs to a set or range using condition expressions. For example:

Check if a product category is in a list of categories using the IN keyword.
Check if a price is between a low and high value using between :low and :high.
These values can be passed in a values.json file specifying the categories and price range.

If the item meets the condition, the write operation proceeds; otherwise, it fails.

String Comparisons in Condition Expressions
DynamoDB supports string comparison functions such as begins_with and contains in condition expressions. For example, you can delete items where a string attribute begins with "http://" to remove insecure image URLs from your product catalog.

Summary
Condition Expressions in DynamoDB enable you to create precise conditions that determine whether write operations are applied. This feature helps maintain data integrity by preventing unwanted overwrites or deletions and allows for complex conditional logic during writes.

Key Takeaways
DynamoDB conditional writes allow specifying conditions that determine whether write operations succeed.
Condition expressions include attribute_exists, attribute_not_exists, attribute_type, contains, begins_with, IN, between, and size.
Condition expressions differ from filter expressions; the former apply to write operations, the latter to read queries.
Using condition expressions helps prevent overwriting data and enables conditional updates or deletions based on attribute values.
