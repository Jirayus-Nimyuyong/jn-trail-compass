Intrinsic Functions – Fn::Ref

• The Fn::Ref function can be leveraged to reference
• Parameters – returns the value of the parameter
• Resources – returns the physical ID of the underlying resource (e.g., EC2 ID)
• The shorthand for this in YAML is !Ref

---

Intrinsic Functions – Fn::GetAtt
• Attributes are attached to any resources you create
• To know the attributes of your resources, the best place to look at is
the documentation
• Example: the AZ of an EC2 instance!

---

Intrinsic Functions – Fn::FindInMap

• We use Fn::FindInMap to return a named value from a specific key
• !FindInMap [ MapName, TopLevelKey, SecondLevelKey ]

---

Intrinsic Functions – Fn::ImportValue

• Import values that are exported in other stacks
• For this, we use the Fn::Impor tValue function

---

Intrinsic Functions – Fn::Base64

• Convert String to it’s Base64 representation
• Example: pass encoded data to EC2 Instance’s UserData property

---

Intrinsic Functions – Condition Functions

• The logical ID is for you to choose. It’s how you name condition
• The intrinsic function (logical) can be any of the following:
• Fn::And
• Fn::Equals
• Fn::If
• Fn::Not
• Fn::Or

---

CloudFormation - Intrinsic Functions
Introduction to Intrinsic Functions
Let us discuss intrinsic functions in CloudFormation. These functions are essential for referencing and manipulating resources within your CloudFormation templates.

List of Intrinsic Functions
We have previously encountered intrinsic functions, but here is a list of them. The ones highlighted in blue are particularly important to know:

Ref
GetAtt (Get attribute)
FindInMap
ImportValue
Join
Sub
ForEach
ToJsonString
Condition functions such as If, Not, Equals, etc.
Base64
Cidr
GetAZs
Select
Split
Transform
Length
All these functions are documented on the CloudFormation website. If you wish to explore any function not discussed here, please refer to the official documentation.

The Ref Function
The first function to discuss is the Ref function. The Ref function can be used to obtain a reference, either to a parameter (to return its value) or to a resource (to return the physical ID of the created resource, such as an EC2 instance). The shorthand notation is always with an exclamation point: !Ref.

Example: Using Ref in a Subnet
Suppose we are creating a subnet and need to specify the VPC to which the subnet belongs. We use the Ref function to reference MyVPC, which can be another resource or a parameter.

yaml Code Sample
Resources:
  MySubnet:
    Type: AWS::EC2::Subnet
    Properties:
      VpcId: !Ref MyVPC
The GetAtt Function
The GetAtt function is used to retrieve an attribute attached to any resource you create. To determine which attributes a resource has, consult the documentation. For example, on the EC2 Instance documentation page for CloudFormation, under return values, you will find information about Ref and GetAtt.

When you use Ref with a resource of type EC2 instance, you receive the instance ID. For example, using Ref returns the instance ID. If you use GetAtt, you can retrieve more information from the EC2 instance, such as the AvailabilityZone, PrivateDNSName, PrivateIp, PublicDNSName, and PublicIp.

Example: Using GetAtt to Retrieve Availability Zone
Suppose you want to get the AvailabilityZone of an EC2 instance. First, define the EC2 instance in your template. Then, when defining an EBSVolume that should be attached to the EC2 instance in the correct Availability Zone, use the GetAtt intrinsic function to reference the EC2Instance's AvailabilityZone.

yaml Code Sample
Resources:
  EC2Instance:
    Type: AWS::EC2::Instance
    Properties:
      # ... other properties ...
  EBSVolume:
    Type: AWS::EC2::Volume
    Properties:
      AvailabilityZone: !GetAtt EC2Instance.AvailabilityZone
In this example, EC2Instance is the name of the resource, and AvailabilityZone is the attribute exposed by this resource. This allows you to input the correct Availability Zone into your EBSVolume.

Other Intrinsic Functions
FindInMap: Retrieves a value directly from a specific key in a specific map. This is used when you have mappings defined.
ImportValue: Used to import values that were exported in other stacks. For example, you can create an EC2 instance and import the value of a security group ID named SSHSecurityGroup, which was defined and exported in another stack.
yaml Code Sample
Resources:
  MyEC2Instance:
    Type: AWS::EC2::Instance
    Properties:
      SecurityGroupIds:
        - !ImportValue SSHSecurityGroup
Base64 Function
The Base64 function converts a string into its Base64 representation. This is typically used to pass data to the user data of an EC2 instance. Use the Base64 function before defining the string for user data, and it will automatically be converted and passed to your EC2 instance.

Condition Functions
Condition functions are used to conditionally create resources and perform logical operations. These include:

And
Equals
If
Not
Or
Conclusion
Intrinsic functions are powerful tools in CloudFormation, enabling dynamic and flexible template creation. Refer to the documentation for a full list of supported functions and their attributes.

Key Takeaways
Intrinsic functions in CloudFormation provide powerful ways to reference and manipulate resources within templates.
The Ref function returns the value of a parameter or the physical ID of a resource.
The GetAtt function retrieves specific attributes from resources, such as the Availability Zone of an EC2 instance.
Other important intrinsic functions include FindInMap, ImportValue, Base64, and condition functions like If, Not, and Equals.
