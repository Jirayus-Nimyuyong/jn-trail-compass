S3 User-Defined Object Metadata & S3 Object Tags

• S3 User-Defined Object Metadata
When uploading an object, you can also assign metadata
Name-value (key-value) pairs
User-defined metadata names must begin with "x-amz-meta-”
Amazon S3 stores user-defined metadata keys in lowercase
Metadata can be retrieved while retrieving the object

• S3 Object Tags
• Key-value pairs for objects in Amazon S3
• Useful for fine-grained permissions (only access specific objects
with specific tags)
• Useful for analytics purposes (using S3 Analytics to group by tags)

• You cannot search the object metadata or object tags
• Instead, you must use an external DB as a search index such
as DynamoDB

---
S3 Object Tags & Metadata
User-Defined Object Metadata and S3 Object Tags
When you create or upload an object to Amazon S3, you can assign metadata to it. Metadata refers to key-value pairs attached to your objects. User-defined metadata keys must begin with x-amz-meta- because AWS generates some metadata automatically.

The metadata can be retrieved when you retrieve the object, providing information about the object itself. For example, AWS provides metadata such as Content-Length and Content-Type. In one example, the Content-Length is 7.5 kilobytes and the Content-Type is html. User-defined metadata could include entries like x-amz-meta-origin: paris, which is custom information you define for your own purposes.

S3 Object Tags
S3 object tags are more commonly used key-value pairs associated with your objects in Amazon S3. Unlike metadata, tags can be used for fine-grained permissions. For example, you can grant access only to specific objects with particular tags within AWS. Tags are also useful for analytics purposes. For instance, using a solution like S3 Analytics, you can group findings by tags.

For example, an S3 object might have tags such as:

Project: Blue
PHI: True (indicating personal health information)
These tags provide additional information you may want to associate with your objects.

Important Note on Searchability
The most important point to remember is that metadata and tags are not searchable or filterable within Amazon S3. You cannot filter objects by metadata or tags directly in S3.

How to Search Objects in S3 Buckets
If you want to search your S3 buckets based on metadata or tags, you must build an external index in a database such as DynamoDB (or any other database of your choice). You store all the metadata and tags in this searchable index. Then, you perform your searches on DynamoDB, and the search results correspond to objects stored in Amazon S3.

This architecture is a common exam question and an important concept to understand when working with S3 object metadata and tags.

Key Takeaways
User-defined metadata in S3 objects must have keys beginning with x-amz-meta-.
S3 object tags are key-value pairs used for fine-grained permissions and analytics.
Metadata and tags are not searchable or filterable directly within Amazon S3.
To search objects by metadata or tags, an external index such as DynamoDB must be used.