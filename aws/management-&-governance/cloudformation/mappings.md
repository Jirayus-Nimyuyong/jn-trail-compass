CloudFormation – Mappings

• Mappings are fixed variables within your CloudFormation template
• They’re very handy to differentiate between different environments
(dev vs prod), regions (AWS regions), AMI types…
• All the values are hardcoded within the template

Accessing Mapping Values (Fn::FindInMap)
• We use Fn::FindInMap to return a named value from a specific key
• !FindInMap [ MapName, TopLevelKey, SecondLevelKey ]
Because AMIs are region-specific!
Mappings work great for AMIs 

When would you use Mappings vs. Parameters?
Mappings are great when you know in advance all the values that can be
taken and that they can be deduced from variables such as
• Region
• Availability Zone
• AWS Account
• Environment (dev vs prod)
• etc…
• They allow safer control over the template
• Use parameters when the values are really user specific

---

CloudFormation - Mappings
Introduction to Mappings in CloudFormation
Mappings are fixed variables within your CloudFormation templates. They are very handy if you want to differentiate between different environments, such as development versus production, and assign different values accordingly. Mappings can also be used for regions, such as AWS regions or AMI types, and so on.

All possible values are hardcoded within the template. Here is the format of mappings.

Example: Region Map
To make this more concrete, consider a region map. Based on the region you have, such as us-east-1, us-west-1, or eu-west-1, and based on the architecture you are using, for example, HVM64 or HVMG2, this mapping will provide a different AMI ID every time.

Since AMIs are specific to regions, it makes sense to have a different AMI per region. This is a great candidate for a mapping.

Accessing Mapping Values
Here is an example of accessing mapping values. We have an EC2 instance that uses an ImageId. This ImageId is obtained using the FindInMap function.

To use the FindInMap function, you first specify the map name. For example, RegionMap. Then, you provide the top-level key, which in this case is a reference to the pseudo parameter AWS::Region.

If you launch this template in us-east-1, the pseudo parameter resolves to us-east-1. If you launch it in us-west-1, it resolves to us-west-1 automatically. Finally, you specify the type of architecture you want, such as HVM64.

This works well because AMIs are region-specific, so you want to ensure you have the right AMI for the right region and architecture.

Mappings versus Parameters
When should you use mappings versus parameters?

Mappings are great when you know in advance all the possible values and they can be deduced from variables such as the region, availability zone, AWS account, environment (development versus production), and so on. They allow safer control over the templates.

However, if you have values that depend on what the user wants or is thinking about at runtime, you should use parameters to give the user maximum freedom.

Conclusion
That concludes the discussion on mappings. I hope you found it helpful. See you in the next lecture.

Key Takeaways
Mappings in CloudFormation are fixed variables within templates used to differentiate environments or regions.
Mappings are ideal for predefined values such as region-specific AMI IDs based on architecture.
The FindInMap function accesses mapping values using a map name, top-level key, and second-level key.
Use mappings when values are known in advance and deducible; use parameters for user-defined runtime values.