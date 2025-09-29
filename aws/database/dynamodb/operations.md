DynamoDB Operations

• Table Cleanup
• Option 1: Scan + DeleteItem
• Very slow, consumes RCU & WCU, expensive
• Option 2: Drop Table + Recreate table
• Fast, efficient, cheap

• Copying a DynamoDB Table
• Option 1: Using AWS Backup
• Option 2: Using AWS Glue
• Option 3: Scan + PutItem or BatchWriteItem
• Write your own code


---

DynamoDB Operations
DynamoDB Operations Overview
This lecture covers two DynamoDB operations that you may be tested on.

Table Cleanup Methods
There are two options to clean up a DynamoDB table:

Option 1: Scan all items in the table and delete them one by one. This method is very slow and consumes a lot of Read Capacity Units (RCU) during the scan operation and Write Capacity Units (WCU) during the delete operation, making it expensive.
Option 2: Drop the table and then recreate it. This method is fast, efficient, and cheap. It is important to recreate the table with the correct settings, identical to the original.
Copying a DynamoDB Table
If you want to copy a DynamoDB table, you have several options:

Use AWS Backup: Back up the source table and then restore it within your account or in another account.
Use AWS Glue: This ETL service creates a script that reads your source table and writes the data wherever you want.
Write your own code using API calls such as scan, put item, or batch write item. However, this approach is generally more difficult than using the AWS services mentioned.
Conclusion
This concludes the lecture on DynamoDB operations. The methods discussed provide efficient ways to clean up and copy tables using AWS services or custom code.

Key Takeaways
To clean up a DynamoDB table, scanning and deleting items one by one is slow and costly.
Dropping and recreating the table is a faster, more efficient, and cheaper method.
AWS Backup can be used to copy DynamoDB tables across accounts.
AWS Glue provides an ETL service to read from source tables and write data elsewhere.
Writing custom code with API calls like scan, put item, or batch write item is possible but more complex than using AWS services.