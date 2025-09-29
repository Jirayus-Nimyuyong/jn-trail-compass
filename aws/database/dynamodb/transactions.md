DynamoDB Transactions

• Coordinated, all-or-nothing operations (add/update/delete) to multiple items
across one or more tables
• Provides Atomicity, Consistency, Isolation, and Durability (ACID)
• Read Modes – Eventual Consistency, Strong Consistency, Transactional
• Write Modes – Standard, Transactional
• Consumes 2x WCUs & RCUs
• DynamoDB performs 2 operations for every item (prepare & commit)
• Two operations:
• TransactGetItems – one or more GetItem operations
• TransactWriteItems – one or more PutItem, UpdateItem, and DeleteItem operations
• Use cases: financial transactions, managing orders, multiplayer games, …

---

DynamoDB Transactions – Capacity Computations

• Impor tant for the exam!
• Example1: 3 Transactional writes per second, with item size 5 KB
• We need 3 ∗
& #$
% #$
∗ 2 𝑡𝑟𝑎𝑛𝑠𝑎𝑐𝑡𝑖𝑜𝑛𝑎𝑙 𝑐𝑜𝑠𝑡 = 30 𝑊𝐶𝑈𝑠
• Example 2: 5 Transaction reads per second , with item size 5 KB
) #$
• We need 5 ∗ * #$ ∗ 2 𝑡𝑟𝑎𝑛𝑠𝑎𝑐𝑡𝑖𝑜𝑛𝑎𝑙 𝑐𝑜𝑠𝑡 = 20 𝑅𝐶𝑈𝑠
• (5 gets rounded to the upper 4 KB)

---

DynamoDB Transactions
Introduction to DynamoDB Transactions
DynamoDB transactions allow you to perform all-or-nothing operations across multiple items and tables. This means you can update, delete, or add items not just in one table but across multiple tables, ensuring that either all the writes succeed or none do. This atomic behavior is why these operations are called transactions.

This transactional capability provides DynamoDB with ACID properties: atomicity, consistency, isolation, and durability.

Transaction Modes in DynamoDB
Transactions in DynamoDB apply to two main modes: read modes and write modes.

Read Modes
DynamoDB supports three read modes:

Eventual consistency
Strong consistency
Transactional consistency: This mode allows you to read data from multiple tables simultaneously and obtain a consistent view across all of them.
Write Modes
For writes, DynamoDB offers:

Standard writes: Multiple writes across tables where some may fail.
Transactional writes: All writes across tables either succeed together or fail together, ensuring atomicity.
Capacity Consumption for Transactions
Performing transactions consumes twice the write capacity units (WCUs) and read capacity units (RCUs) compared to standard operations. This is because DynamoDB performs two background operations for each item: preparing the transaction and then committing it.

Transaction APIs
DynamoDB provides two main APIs for transactions:

TransactGetItems: Performs one or more GetItem operations as part of a transaction.
TransactWriteItems: Performs one or more PutItem, UpdateItem, or DeleteItem operations as part of a single transaction.
Use Cases for DynamoDB Transactions
Transactions are essential whenever ACID properties are required. Common use cases include:

Financial transactions
Order management systems
Multiplayer games
These scenarios require strong consistency guarantees to maintain data integrity.

Example: Bank Account Transactions
Consider two tables:

AccountBalance: Contains account ID, balance, and last transaction timestamp.
BankTransactions: Records all bank transactions with transaction ID, timestamp, source account, destination account, and amount.
When performing a transaction, the application updates the AccountBalance table and inserts a new record into the BankTransactions table within a single transaction. This ensures that both tables reflect the changes atomically.

With DynamoDB transactions, either both the update to AccountBalance and the insert into BankTransactions succeed together, or neither operation is applied. This atomicity is critical in financial contexts to prevent inconsistencies.

Capacity Unit Computations for Transactions
Transactional Writes
If you want to perform three transactional writes per second with item sizes of five kilobytes, the required write capacity units (WCUs) are calculated as follows:

Each WCU supports writing 1 KB per second.
For 5 KB items, each write requires 5 WCUs.
Since transactional writes consume twice the capacity, multiply by 2.
Calculation:

3
×
5
×
2
=
30
 WCUs
3×5×2=30 WCUs
Transactional Reads
For five transactional reads per second with item sizes of five kilobytes, the required read capacity units (RCUs) are:

Each RCU supports reading 4 KB per second.
Five KB items round up to two 4 KB units (8 KB total).
Multiply by 2 for transactional reads.
Calculation:

5
×
8
4
×
2
=
20
 RCUs
5× 
4
8
​
 ×2=20 RCUs
Understanding these capacity computations is important for efficient DynamoDB usage and exam preparation.

Conclusion
While it is difficult to demonstrate DynamoDB transactions directly in the console, understanding their behavior and capacity implications is crucial. Transactions provide powerful guarantees for applications requiring strong consistency and atomic operations across multiple tables.

Key Takeaways
DynamoDB transactions provide atomic, consistent, isolated, and durable (ACID) operations across multiple items and tables.
Transactions support both read modes (eventual, strong, transactional consistency) and write modes (standard and transactional).
Transactional operations consume twice the write and read capacity units compared to standard operations.
Use cases for DynamoDB transactions include financial transactions, order management, and multiplayer games where consistency is critical.