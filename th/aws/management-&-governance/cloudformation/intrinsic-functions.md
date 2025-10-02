# CloudFormation - Intrinsic Functions

**Intrinsic functions** ใน CloudFormation เป็นฟังก์ชันสำคัญที่ใช้ **อ้างอิงและจัดการ resource** ภายใน template ของคุณ

## รายชื่อ Intrinsic Functions

ฟังก์ชันที่ควรรู้ ได้แก่:

* `Ref`
* `GetAtt` (Get attribute)
* `FindInMap`
* `ImportValue`
* `Join`
* `Sub`
* `ForEach`
* `ToJsonString`
* Condition functions เช่น `If`, `Not`, `Equals`
* `Base64`
* `Cidr`
* `GetAZs`
* `Select`
* `Split`
* `Transform`
* `Length`

ฟังก์ชันทั้งหมดมีเอกสารบนเว็บไซต์ CloudFormation

## ฟังก์ชัน Ref

* ใช้เพื่อ **อ้างอิงพารามิเตอร์** (คืนค่าของพารามิเตอร์) หรือ **resource** (คืนค่า physical ID ของ resource ที่สร้าง เช่น EC2 instance)
* สัญลักษณ์ย่อคือ `!Ref`

**ตัวอย่างการใช้ Ref กับ Subnet**

```yaml
Resources:
  MySubnet:
    Type: AWS::EC2::Subnet
    Properties:
      VpcId: !Ref MyVPC
```

* `MyVPC` อาจเป็น resource หรือพารามิเตอร์

## ฟังก์ชัน GetAtt

* ใช้เพื่อ **ดึง attribute ของ resource**
* ตัวอย่าง EC2 Instance:

  * `Ref` → คืนค่า instance ID
  * `GetAtt` → ดึงข้อมูลเพิ่มเติม เช่น AvailabilityZone, PrivateDNSName, PrivateIp, PublicDNSName, PublicIp

**ตัวอย่างการใช้ GetAtt เพื่อดึง Availability Zone**

```yaml
Resources:
  EC2Instance:
    Type: AWS::EC2::Instance
    Properties:
      # ... other properties ...
  EBSVolume:
    Type: AWS::EC2::Volume
    Properties:
      AvailabilityZone: !GetAtt EC2Instance.AvailabilityZone
```

* `EC2Instance` คือชื่อ resource
* `AvailabilityZone` คือ attribute ของ resource

## ฟังก์ชันอื่น ๆ

* `FindInMap` → ดึงค่าจาก key ใน map ที่กำหนด
* `ImportValue` → นำค่าที่ export จาก stack อื่นมาใช้

**ตัวอย่างการใช้ ImportValue**

```yaml
Resources:
  MyEC2Instance:
    Type: AWS::EC2::Instance
    Properties:
      SecurityGroupIds:
        - !ImportValue SSHSecurityGroup
```

* ใช้สำหรับนำค่า SecurityGroupID ที่ export จาก stack อื่นมาใช้

## ฟังก์ชัน Base64

* แปลง string เป็น Base64
* ใช้กับ **user data ของ EC2 instance**

## Condition Functions

* ใช้สร้าง resource แบบมีเงื่อนไขหรือทำ logical operations
* เช่น: `And`, `Equals`, `If`, `Not`, `Or`

## สรุป

* Intrinsic functions เป็นเครื่องมือสำคัญของ CloudFormation ช่วยให้ template **ยืดหยุ่นและ dynamic**
* ฟังก์ชันสำคัญ:

  * `Ref` → คืนค่าพารามิเตอร์หรือ physical ID ของ resource
  * `GetAtt` → ดึง attribute ของ resource
  * `FindInMap`, `ImportValue`, `Base64`
  * Condition functions เช่น `If`, `Not`, `Equals`
