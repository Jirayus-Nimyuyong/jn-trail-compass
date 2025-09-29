DynamoDB – Local Secondary Index (LSI)

• Alternative Sor t Key for your table (same Par tition Key as that of base table)
• The Sort Key consists of one scalar attribute (String, Number, or Binary)
• Up to 5 Local Secondary Indexes per table
• Must be defined at table creation time
• Attribute Projections – can contain some or all the attributes of the base table
(KEYS_ONLY, INCLUDE, ALL)

---

DynamoDB – Global Secondary Index (GSI)

• Alternative Primary Key (HASH or HASH+RANGE) from the base table
• Speed up queries on non-key attributes
• The Index Key consists of scalar attributes (String, Number, or Binary)
• Attribute Projections – some or all the attributes of the base table (KEYS_ONLY, INCLUDE, ALL)
• Must provision RCUs & WCUs for the index
• Can be added/modified after table creation

---
DynamoDB – Indexes and Throttling

• Global Secondary Index (GSI):
• If the writes are throttled on the GSI, then the main table will be throttled!
• Even if the WCU on the main tables are fine
• Choose your GSI partition key carefully!
• Assign your WCU capacity carefully!
• Local Secondary Index (LSI):
• Uses the WCUs and RCUs of the main table
• No special throttling considerations

---

DynamoDB Indexes (GSI + LSI)
DynamoDB Indexes Overview
In this lecture, we will discuss indexes in DynamoDB. There are two kinds of indexes you need to know: Local Secondary Indexes (LSI) and Global Secondary Indexes (GSI).

Local Secondary Index (LSI)
An LSI provides an alternative sort key for your table. It uses the same partition key as your base table but adds an additional sort key. This sort key consists of one scalar attribute, which can be a string, number, or binary. You can have up to five LSIs per table.

LSIs must be defined at the time of table creation; they cannot be added after the table has been created. Therefore, careful planning is required when designing your table.

You can choose some or all attributes from your main table to include in your LSI. This allows you to select specific attributes that you want to query on.

For example, consider a table with the following attributes: user ID, game ID, game timestamp, score, and results. Currently, you can query based on user ID and game ID easily. However, you cannot query on user ID and game timestamp directly.

To query based on user ID and game timestamp, you would need to perform a scan and then filter the results on the client side, which is inefficient.

To enable efficient queries on user ID and game timestamp, you would create an LSI with the sort key defined as the game timestamp. This allows you to query all games played by a user within a specific time range, such as between 2020 and 2021.

Remember, the partition key remains the same as the base table, but the sort key differs in the LSI.

Global Secondary Index (GSI)
A GSI provides an alternative primary key, which means you can have a different partition key, or both a different partition key and sort key from the base table. This is useful for speeding up queries on non-key attributes within your table.

The index can include scalar attributes such as strings, numbers, or binary data. You can specify which attributes to project onto the index.

Unlike LSIs, GSIs behave like separate tables. Therefore, you must provision read capacity units (RCUs) and write capacity units (WCUs) for GSIs separately.

GSIs are powerful because they can be added or modified after the table has been created.

For example, consider a simple table with user ID, game ID, and game timestamp. You can query based on user ID to get all games played by that user, but you cannot query efficiently on game ID.

To enable querying by game ID, you would create a GSI where the partition key is the game ID and the sort key could be the game timestamp. You can project the user ID attribute onto this index.

This creates entirely new query capabilities by defining new partition and sort keys.

Understanding how you plan to query your data is crucial in deciding how to design your LSIs and GSIs.

LSIs and GSIs serve very different purposes, and it is important to understand their differences to optimize your DynamoDB usage.

Indexes and Throttling Considerations
When you have a GSI, if there is throttling on write capacity units (WCUs) for the GSI, the main table will also experience throttling. This is an important caveat often tested in exams.

Even if the WCUs are sufficient on the main table, throttling on the GSI will cause throttling on the main table as well. Therefore, you must choose your GSI partition key carefully and assign WCU capacity thoughtfully.

In contrast, LSIs use the WCUs and RCUs of the main table and do not have separate throttling considerations.

This concludes the lecture on DynamoDB indexes. Understanding LSIs and GSIs, their use cases, and throttling implications is essential for effective DynamoDB table design.

Key Takeaways
Local Secondary Indexes (LSIs) provide an alternative sort key using the same partition key and must be defined at table creation.
Global Secondary Indexes (GSIs) allow different partition and sort keys and can be added or modified after table creation.
GSIs require separate provisioned read and write capacity units and behave like separate tables.
Throttling on GSIs affects the main table, whereas LSIs share the main table's capacity units without separate throttling concerns.

