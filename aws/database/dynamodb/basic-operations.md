DynamoDB – Writing Data

• PutItem
• Creates a new item or fully replace an old item (same Primary Key)
• Consumes WCUs
• UpdateItem
• Edits an existing item’s attributes or adds a new item if it doesn’t exist
• Can be used to implement Atomic Counters – a numeric attribute that’s
unconditionally incremented
• Conditional Writes
• Accept a write/update/delete only if conditions are met, otherwise returns an error
• Helps with concurrent access to items
• No performance impact

---

DynamoDB – Reading Data

• GetItem
• Read based on Primary key
• Primary Key can be HASH or HASH+RANGE
• Eventually Consistent Read (default)
• Option to use Strongly Consistent Reads (more RCU - might take longer)
• ProjectionExpression can be specified to retrieve only certain attributes

---

DynamoDB – Reading Data (Query)

• Query returns items based on:
• KeyConditionExpression
• Partition Key value (must be = operator) – required
• Sort Key value (=, <, <=, >, >=, Between, Begins with) – optional
• FilterExpression
• Additional filtering after the Query operation (before data returned to you)
• Use only with non-key attributes (does not allow HASH or RANGE attributes)
• Returns:
• The number of items specified in Limit
• Or up to 1 MB of data
• Ability to do pagination on the results
• Can query table, a Local Secondary Index, or a Global Secondary Index

---

DynamoDB – Reading Data (Scan)

• Scan the entire table and then filter out data (inefficient)
• Returns up to 1 MB of data – use pagination to keep on reading
• Consumes a lot of RCU
• Limit impact using Limit or reduce the size of the result and pause
• For faster performance, use Parallel Scan
• Multiple workers scan multiple data segments at the same time
• Increases the throughput and RCU consumed
• Limit the impact of parallel scans just like you would for Scans
• Can use ProjectionExpression & FilterExpression (no changes to
RCU)

---

DynamoDB – Deleting Data

• DeleteItem
• Delete an individual item
• Ability to perform a conditional delete
• DeleteTable
• Delete a whole table and all its items
• Much quicker deletion than calling DeleteItem on all items

---

DynamoDB – Batch Operations

• Allows you to save in latency by reducing the number of API calls
• Operations are done in parallel for better efficiency
• Part of a batch can fail; in which case we need to try again for the failed items
• BatchWriteItem
• Up to 25 PutItem and/or DeleteItem in one call
• Up to 16 MB of data written, up to 400 KB of data per item
• Can’t update items (use UpdateItem)
• UnprocessedItems for failed write operations (exponential backoff or add WCU)
• BatchGetItem
• Return items from one or more tables
• Up to 100 items, up to 16 MB of data
• Items are retrieved in parallel to minimize latency
• UnprocessedKeys for failed read operations (exponential backoff or add RCU)

---

DynamoDB – PartiQL

• SQL-compatible query language for DynamoDB
• Allows you to select, insert, update, and delete
data in DynamoDB using SQL
• Run queries across multiple DynamoDB tables
• Run PartiQL queries from:
• AWS Management Console
• NoSQL Workbench for DynamoDB
• DynamoDB APIs
• AWS CLI
• AWS SDK

---
DynamoDB - Basic Operations
DynamoDB Basic Operations Overview
In the exam, you will encounter the DynamoDB API calls referred to by their names. It is beneficial to familiarize yourself with them.

When writing data, you have several options:

PutItem: This operation creates or fully replaces an item with the same Primary Key. It consumes write capacity units. Use PutItem when you want to perform a full replacement or write a new item.

UpdateItem: Unlike PutItem, UpdateItem edits existing item attributes or adds a new item if it does not exist. It modifies only specific attributes rather than replacing the entire item. UpdateItem can also be used with Atomic Counters, which will be discussed later.

Conditional Writes: These allow you to perform write, update, or delete operations only if certain conditions are met. This feature helps manage concurrent access to items.

Reading Data from DynamoDB
To read data, DynamoDB provides the GetItem operation. It is straightforward and reads data based on the Primary Key, which can be either a HASH or a HASH plus Range key.

You have two consistency modes when reading:

Eventually Consistent Read Mode
Strongly Consistent Read Mode (requires explicit specification, consumes more read capacity units, and may have slightly higher latency)
Additionally, you can specify a Projection Expression in your API call. This expression helps retrieve only a subset of attributes from DynamoDB, improving efficiency.

Query Operation
The Query operation returns items based on a Key Condition Expression. This expression must include the Partition Key with an equality operator. For example, you might query for a Partition Key value such as "John123".

Optionally, you can specify a Sort Key condition using operators like equal, less than, greater than, begins with, between, and so on.

You can also add a FilterExpression to apply additional filtering after the query but before the data is returned. Note that FilterExpressions cannot be used on HASH or RANGE key attributes; they apply only to non-key attributes.

The query returns a list of items, and you can limit the number of items retrieved using the limit parameter. The query will return either up to the specified limit or up to one megabyte of data.

If you need more data, you can paginate through the results.

Queries can be performed on tables, Local Secondary Indexes, or Global Secondary Indexes.

Scan Operation
The Scan operation reads the entire table. Unlike GetItem (which reads one item) or Query (which reads items based on a Partition Key and optional Sort Key), Scan retrieves all items.

You can filter the data client-side after the scan, but this is inefficient.

Each Scan returns up to one megabyte of data. To read more, you must paginate through the results.

Scan consumes a significant amount of read capacity units (RCUs), so to avoid impacting normal operations, you can limit the size of the results or pause between scans.

For faster performance, you can use Parallel Scan, where multiple workers scan different data segments simultaneously, increasing throughput and RCU consumption.

You can also use ProjectionExpression and FilterExpression with Scan to retrieve specific attributes and filter data server-side.

Deleting Data
To delete data in DynamoDB, you have the following options:

DeleteItem: Deletes an individual item. You can perform conditional deletes, such as deleting an item only if a certain attribute (e.g., money) equals zero.

DeleteTable: Deletes an entire table and all its items. This operation is much faster than scanning the table and deleting items individually. This is a useful operation to know for the exam.

Batch Operations
For efficiency, DynamoDB supports batch operations that reduce latency and the number of API calls.

BatchWriteItem: Allows up to 25 PutItem and/or DeleteItem operations in a single call. The total data written can be up to 16 megabytes, with a limit of 400 kilobytes per item. Note that UpdateItem is not supported in batch writes.

If some items fail to be written, typically due to insufficient write capacity, the response includes UnprocessedItems. You can retry these items using strategies such as exponential backoff or by increasing write capacity units.

BatchGetItem: Retrieves items from one or more tables, up to 100 items and 16 megabytes of data. Items are retrieved in parallel to minimize latency. If some items are missing, they appear in UnprocessedKeys due to failed read operations, often caused by insufficient read capacity. Similar retry strategies apply.

PartiQL: SQL for DynamoDB
DynamoDB provides PartiQL, which allows you to use standard SQL syntax to interact with DynamoDB tables.

For example, you can write SQL queries to select OrderID and Total from an Orders table with filtering and ordering conditions.

Using PartiQL, you can perform select, insert, update, and delete operations on DynamoDB tables, just like with the native API calls.

However, PartiQL does not support joins.

You can run PartiQL queries from the AWS Management Console, NoSQL Workbench for DynamoDB, DynamoDB APIs, CLI, or SDK.

The goal of PartiQL is not to add new capabilities but to allow users familiar with SQL to write DynamoDB API calls using SQL syntax.

Summary
This lecture covered the basic DynamoDB operations including writing, reading, querying, scanning, deleting, batch operations, and using PartiQL for SQL-like queries. Understanding these operations and their differences is essential for efficient DynamoDB usage and exam preparation.

Key Takeaways
DynamoDB provides various API calls such as PutItem, UpdateItem, GetItem, Query, Scan, DeleteItem, and DeleteTable for data operations.
PutItem replaces or creates a new item fully, while UpdateItem modifies specific attributes or adds new items if they do not exist.
Query operations use Key Condition Expressions on Partition Keys and optionally Sort Keys, with support for FilterExpressions on non-key attributes.
Scan reads the entire table and is less efficient; Parallel Scan can improve throughput but consumes more capacity.
Batch operations like BatchWriteItem and BatchGetItem improve efficiency by reducing API calls but may return UnprocessedItems or UnprocessedKeys that require retry strategies.
PartiQL allows using SQL syntax to perform select, insert, update, and delete operations on DynamoDB tables without joins, providing an alternative to native API calls.

