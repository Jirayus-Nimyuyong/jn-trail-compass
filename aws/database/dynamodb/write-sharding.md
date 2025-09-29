DynamoDB Write Sharding

Imagine we have a voting application with two
candidates, candidate A and candidate B
• If Partition Key is “Candidate_ID”, this results
into two partitions, which will generate issues
(e.g., Hot Partition)
• A strategy that allows better distribution of
items evenly across partitions
• Add a suffix to Partition Key value
• Two methods:
• Sharding Using Random Suffix
• Sharding Using Calculated Suffix

---


DynamoDB Partitioning Strategies
DynamoDB Write Sharding
Let's consider a use case involving a voting application where users can vote for two candidates: candidate A and candidate B.

If we use the candidate ID as the partition key, all data will be partitioned into only two partitions corresponding to candidate A and candidate B. This setup leads to hot partition issues, affecting both write and read operations.

Solving Hot Partition Issues
To address this problem, we can distribute the candidate ID more effectively across partitions by adding a suffix or prefix to the partition key value. For example, instead of just using "candidateA" or "candidateB", we can use keys like "candidateA11", "candidateB17", "candidateB18", or "candidateA20".

This approach increases the uniqueness of partition keys, resulting in a more evenly distributed dataset. Consequently, the data will be fully writable and readable from the DynamoDB table without causing hot partitions.

Methods for Generating Suffixes or Prefixes
There are two common methods to create these suffixes or prefixes:

Using a random suffix
Calculating the suffix using a hashing algorithm
Both methods effectively achieve a highly distributed partition key.

This strategy ensures that the partition key is very well distributed, which is essential for optimizing DynamoDB performance. This concludes the theory lecture on DynamoDB write sharding.

Key Takeaways
Using a candidate ID as a partition key in DynamoDB can cause hot partition issues due to limited partition distribution.
Adding a suffix or prefix to the partition key value helps distribute data more evenly across partitions.
Suffixes or prefixes can be generated randomly or by using a hashing algorithm to ensure better partition key distribution.
Proper partition key design is crucial for optimizing write and read performance in DynamoDB.