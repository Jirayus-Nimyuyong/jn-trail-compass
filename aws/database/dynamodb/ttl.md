DynamoDB – Time To Live (TTL)

• Automatically delete items after an expiry timestamp
• Doesn’t consume any WCUs (i.e., no extra cost)
• The TTL attribute must be a “Number” data type
with “Unix Epoch timestamp” value
• Expired items deleted within few days of expiration
• Expired items, that haven’t been deleted, appears in
reads/queries/scans (if you don’t want them, filter
them out)
• Expired items are deleted from both LSIs and GSIs
• A delete operation for each expired item enters the
DynamoDB Streams (can help recover expired
items)
• Use cases: reduce stored data by keeping only
current items, adhere to regulatory obligations, …

---

DynamoDB TTL
Introduction to Time To Live (TTL) in DynamoDB
Time To Live (TTL) allows you to automatically delete items after an expired timestamp. The idea is that you define a column, and when the current time surpasses the value of this column, the item is removed. Importantly, deleting an item due to TTL does not consume any write capacity units (WCU), so there is no extra cost.

The timestamp must be a number representing the Unix Epoch timestamp value, as we will see in the hands-on section. Expired items are deleted within a few days of expiration.

How TTL Works in a Table
Consider a session data table with two columns: User ID and Session ID. We want to add an expiration time, which will be the TTL of our table, defining when each session will expire.

When the expiration process runs in DynamoDB, it checks the current time and scans the table to identify items with TTL epoch times less than the current time. Then, a second process scans and deletes these expired items from the table. This is how TTL works.

Note that expired items that have not yet been deleted will still appear in reads, queries, and scans. Therefore, if you do not want to see them, you need to perform client-side filtering. It may take up to 40 hours for expired items to be deleted.

When items are deleted, they are also removed from local secondary indexes and global secondary indexes. Each delete operation for an expired item enters the DynamoDB stream, meaning you can recover deleted items if needed.

Use Cases for TTL
TTL is useful for reducing stored data by keeping only current items and adhering to regulatory obligations. For example, session data is a perfect use case for TTL.

Defining TTL in DynamoDB: Hands-On Example
Let's create a table named DemoTTL. The partition key will be user_id, and we will not use a sort key. We will customize the settings by turning off provisioned capacity and auto scaling, setting one read capacity unit (RCU) and one write capacity unit (WCU). Then, we create the table.

Adding Items with Expiration Attribute
We insert some items into the table. For example, create an item with user_id as john_123 and add an attribute name with the value John. We also add an expire_on attribute, which is a number representing the expiration timestamp.

To get the expiration timestamp, we use an online epoch converter. For instance, we convert five minutes from now into an epoch timestamp and enter that value into DynamoDB. This creates one item with a TTL set to five minutes from now.

Similarly, create a second item with user_id as alice_456, name as Alice, and an expire_on attribute set to one hour from now using the epoch converter.

Enabling TTL on the Table
Next, we define the TTL on our table. Initially, the Time To Live setting is disabled. To enable it, go to Additional Settings, scroll down to Time To Live, and click Enable.

Specify the TTL attribute name as expire_on, which is the attribute we used for expiration timestamps. You can run a preview to see which items will be deleted based on the current time or a custom time.

For example, running a preview with the current time may show no items to delete, but running it with a future time such as one hour from now will show the items that will expire by then.

You can specify an epoch value or choose a custom time frame such as the next 60 minutes, 24 hours, or seven days for simulations.

TTL Activation and Monitoring
After enabling TTL, items will automatically expire after their specified time. You can monitor the number of items deleted in the last 24 hours using CloudWatch metrics, which provides insights into TTL activity.

This feature helps manage data lifecycle efficiently without manual intervention.

Summary
TTL in DynamoDB is a powerful feature to automatically delete expired items based on a Unix Epoch timestamp attribute. It helps reduce storage costs and maintain data compliance by removing outdated data without consuming additional write capacity units. Although expired items may appear in queries for some time, they are eventually deleted and removed from indexes and streams, allowing for recovery and monitoring.

Key Takeaways
Time To Live (TTL) in DynamoDB allows automatic deletion of items after an expiration timestamp without consuming additional write capacity units (WCU).
TTL requires a numeric Unix Epoch timestamp attribute to determine when items expire.
Expired items may still appear in queries for up to 40 hours before deletion; client-side filtering may be necessary.
TTL deletions are reflected in DynamoDB streams and CloudWatch metrics, enabling recovery and monitoring.