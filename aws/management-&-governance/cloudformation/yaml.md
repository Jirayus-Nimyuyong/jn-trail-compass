• YAML and JSON are the languages you can
use for CloudFormation
• JSON is horrible for CF
• YAML is great in so many ways
• Let’s learn a bit about it!
• Key value Pairs
• Nested objects
• Support Arrays
• Multi line strings
• Can include comments!
---
YAML Crash Course
In this course and in CloudFormation, you will most often encounter YAML templates. YAML is a language, like JSON, that you can use to write CloudFormation templates.

I personally find JSON to be a poor choice for writing CloudFormation templates because of many string interpolations and other complexities. YAML, on the other hand, is excellent in many ways, especially for readability and ease of construction.

Let's learn more about YAML in this lecture so you feel confident reading these templates.

Understanding YAML Documents
On the left-hand side, you can see a YAML document. A YAML document is composed of key-value pairs.

For example, the first key is invoice with a numeric value. Then there is date with a string value. The key bill-to contains an indented nested object with multiple key-value pairs.

This structure is called a nested object. YAML supports nesting objects within objects, similar to JSON. For instance, the bill-to key contains an object with keys like given, family, and address, where address itself is another nested object.

YAML also supports arrays. For example, under products, a dash (-) indicates an array. There are multiple products listed, each with keys such as SKU, quantity, description, and price.

YAML supports multi-line strings as well. For example, the address lines use a vertical bar (|) to represent a multi-line string.

Additionally, YAML allows comments, which are not shown here but will be demonstrated in CloudFormation templates later.

Learning to read YAML and understanding its structure is very important, and it is even better if you can write it yourself.

YAML in CloudFormation Templates
Let's examine some CloudFormation templates we have used so far. The first block is Resources, which contains nested objects.

For example, MyInstance is a nested object with a Type key set to AWS::EC2::Instance, which is a string. The Properties key is another nested object containing multiple key-value pairs.

In another example, there is a list of security groups indicated by dashes (-). Here, the first and second security groups are listed as elements of the array.

YAML supports comments using the hash sign (#). Comments can be included anywhere in the YAML document, which is very useful for documentation.

Lists can contain one or multiple elements. Even a single element is represented as a list with one item.

As we can see, YAML makes CloudFormation templates very easy to read. Once you become familiar with it, you can truly unleash the power of CloudFormation.

That concludes this introduction to YAML. I hope it was helpful, and I look forward to seeing you in the next lecture.

Key Takeaways
YAML is a preferred language over JSON for writing CloudFormation templates due to its readability and ease of construction.
YAML documents consist of key-value pairs, supporting nested objects and arrays for complex data structures.
YAML supports multi-line strings and comments, enhancing clarity in templates.
Understanding and writing YAML effectively unlocks the full potential of CloudFormation templates.
