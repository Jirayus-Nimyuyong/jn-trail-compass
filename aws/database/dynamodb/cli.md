DynamoDB CLI – Good to Know

• --projection-expression: one or more attributes to retrieve
• --filter-expression: filter items before returned to you

• General AWS CLI Pagination options (e.g., DynamoDB, S3, …)
• --page-size: specify that AWS CLI retrieves the full list of items but with a larger
number of API calls instead of one API call (default: 1000 items)
• --max-items: max. number of items to show in the CLI (returns NextToken)
• --star ting-token: specify the last NextToken to retrieve the next set of items

---

DynamoDB CLI
DynamoDB CLI Options Overview
In this lecture, we will discuss several CLI options for DynamoDB that may appear in the exam. These options help optimize data retrieval and manage large datasets efficiently.

Projection Expression
The projection-expression option allows you to specify one or more attributes to retrieve from a table. The purpose is to avoid retrieving all columns or attributes, instead fetching only a subset of data needed. This reduces the amount of data transferred and improves efficiency.

Filter Expression
The filter-expression option is used to filter items returned by a scan operation. You can specify conditions to filter the results. This filtering happens client-side after the data is retrieved from DynamoDB.

Pagination Options
DynamoDB CLI provides important pagination options to handle large datasets:

page-size: Controls the number of items retrieved per API call. This helps avoid timeouts by breaking a large dataset into smaller API calls.
max-items: Limits the total number of items returned in the CLI response.
NextToken (or starting-token): Used to retrieve the next set of items after a previous call, enabling paginated retrieval.
Explanation of Page-Size
For example, if you have a table with 10,000 items and perform a single API call, it might time out. By specifying a page-size of 100, the CLI makes 100 API calls behind the scenes, each retrieving 100 items. This approach ensures the complete dataset is retrieved without timing out.

Practical Demonstration with UserPosts Table
Let's explore these options using the UserPosts table. We will view the items and experiment with the CLI commands.

Using Projection Expression
We perform a DynamoDB scan specifying the table name and a projection-expression for user_id and content. This means we will not retrieve the post timestamp attribute.

The table currently has three attributes: user_id, post timestamp, and content. Using the projection expression excludes post timestamp from the results.

Scan Result with Projection Expression
After running the scan command, the returned items include only content and user_id. The post timestamp attribute is not part of the results, confirming the projection expression works as intended.

Using Filter Expression
Next, we scan the table with a filter-expression to retrieve only items where user_id equals john123. This filtering happens client-side after retrieving the data.

The result shows two items with user_id as john123, and only their content attributes are returned.

Efficiency Consideration
If user_id is a primary key, it is more efficient to run a query directly rather than scanning and filtering client-side. However, the filter expression demonstrates the ability to filter on any attribute, including user_id, post timestamp, or content.

Demonstrating Page-Size
When scanning the entire table, the CLI makes one API call if the dataset is small. For example, retrieving three items requires one API call.

If you specify a page-size of 1, the CLI makes three API calls in the background, each retrieving one item, but still returns all three items in one command. This optimization helps avoid timeouts for larger datasets.

Using Max-Items and NextToken
Using max-items 1 limits the CLI response to one item. The response includes a NextToken which can be used to retrieve the next item.

By running the command again with the starting-token set to the NextToken value, you retrieve the second item. Repeating this process allows you to paginate through the dataset one item at a time.

Final Pagination Step
Continuing with the NextToken values, you can retrieve the last item. When no NextToken is returned, it indicates that all items have been retrieved and the scan is complete.

Summary
These CLI options for DynamoDB provide powerful ways to optimize data retrieval:

projection-expression to select specific attributes.
filter-expression to filter scan results client-side.
Pagination options like page-size, max-items, and NextToken to manage large datasets and avoid timeouts.
Understanding and using these options effectively can improve the performance and usability of DynamoDB CLI commands.

Key Takeaways
The projection-expression option allows retrieval of specific attributes to minimize data transfer.
filter-expression filters items client-side based on specified conditions, useful for refining scan results.
Pagination options like page-size, max-items, and NextToken help manage large datasets and avoid API timeouts.
Using max-items with NextToken enables fetching data in chunks, supporting efficient data retrieval in CLI commands.
