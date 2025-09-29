DynamoDB - PartiQL

• Use a SQL-like syntax to manipulate DynamoDB tables

• Supports some (but not all) statements:
• INSERT
• UPDATE
• SELECT
• DELETE
• It supports Batch operations

---

DynamoDB PartiQL
Introduction to PartiQL for DynamoDB
PartiQL for DynamoDB enables the use of SQL-like syntax to manipulate DynamoDB tables. This includes inserting, updating, selecting, and deleting items from a DynamoDB table. PartiQL is designed for users who are more comfortable with SQL, allowing them to interact with DynamoDB using familiar statements.

Supported Operations in PartiQL
With PartiQL, you can:

Insert items into tables
Update existing items
Select items using SQL-like queries
Delete items from tables
Perform batch operations when necessary
Using the PartiQL Editor in the DynamoDB Console
The DynamoDB console features a PartiQL editor on the left-hand side. You can open tables, such as the users table, and add items. For example, you can add an item with user_id 123 and a new attribute name set to Stephan. Similarly, you can add items to other tables, such as the user's post table with user_id 123 and post_id 456, or to demo indexes with attributes like user_id 123, game_time_stamp 2022, and game_id 456.

Scanning and Querying Tables
After adding items, you can use the PartiQL editor to scan tables. For example, selecting the users table and running a scan will generate a SQL statement such as:

sql Code Sample
SELECT * FROM users
Running this statement retrieves the items in the table, such as the user with user_id 123. The results can be viewed in different formats, including an adjacent view suitable for use in code, and can be downloaded as a CSV file.

Advanced Queries and Index Usage
For more complex operations, you can query tables with conditions. For example, querying the demo indexes table can generate a statement like:

sql Code Sample
SELECT * FROM demo_indexes WHERE user_id = 123 AND game_time_stamp = 2022
This retrieves the correct items based on the specified conditions. PartiQL also allows you to scan indexes directly by specifying the index name in the query, returning items based on the index.

Inserting, Updating, and Deleting Items
You can run insert statements, although they are not automatically generated in the UI. To update a specific item, you can set the attribute value, partition key value, and sort key value as needed. To delete an item, use a delete statement. For example:

sql Code Sample
DELETE FROM users WHERE user_id = 123
Purpose of the PartiQL Editor
The PartiQL editor is intended for users who want to use SQL against DynamoDB. It provides a convenient way to perform various operations using familiar SQL syntax.

Conclusion
PartiQL for DynamoDB offers a powerful interface for users comfortable with SQL, enabling efficient manipulation and querying of DynamoDB tables and indexes.

Key Takeaways
PartiQL allows SQL-like syntax to manipulate DynamoDB tables, supporting operations such as insert, update, select, and delete.
The DynamoDB console provides a PartiQL editor for executing SQL statements on tables and indexes.
Users can perform batch operations, scan tables, query with conditions, and download results as CSV files.
PartiQL supports advanced queries using indexes and enables updating or deleting specific items directly from the editor.