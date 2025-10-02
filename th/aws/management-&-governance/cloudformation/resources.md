# CloudFormation - Resources

**Resources** เป็นหัวใจหลักของ **CloudFormation templates** และเป็นส่วนเดียวที่จำเป็นต้องมีใน template ทั้งหมด
Resources แทนส่วนประกอบของ AWS ที่จะถูกสร้างและกำหนดค่าผ่าน template ของคุณ
Resources จะถูกประกาศภายใน template และสามารถอ้างอิงกันได้
AWS จะจัดการเรื่องการสร้าง การอัปเดต และการลบ resources เหล่านี้โดยอัตโนมัติ

มี resource หลายประเภท และจำนวนยังเพิ่มขึ้นเรื่อย ๆ ปัจจุบันมีมากกว่า **700 ประเภท**
แม้จะไม่สามารถครอบคลุมทั้งหมด แต่การเรียนรู้วิธีอ่านและเข้าใจเอกสารเป็นสิ่งสำคัญเพื่อใช้งานได้อย่างมีประสิทธิภาพ

**รูปแบบของ resource type identifier:**

```cli
service-provider::service-name::data-type-name
```

## การเข้าถึงเอกสาร Resource

AWS มีหน้าเอกสารเฉพาะสำหรับ resource ของ CloudFormation
โดยดูจากหน้านี้และความรู้จากคอร์ส คุณสามารถทำงานกับ resource ใดก็ได้อย่างมีประสิทธิภาพ

ตัวอย่างเช่น หน้าเอกสารจะแสดง resource ทั้งหมด และคุณสามารถเลือก service เฉพาะ เช่น **Amazon Kinesis** ที่มี 2 resource types หรือ **Amazon EC2** ที่มี resource types หลายประเภท

## ตัวอย่าง: AWS::EC2::Instance

เอกสารสำหรับ **AWS::EC2::Instance** ให้ syntax ทั้งแบบ JSON และ YAML

* YAML อ่านง่ายกว่าโดยทั่วไป
* Resource type คือ `EC2::Instance`
* ประกอบด้วย **properties** เป็น key-value pairs

แต่ละ property จะมีรายละเอียดการใช้งาน เช่น:

* `IamInstanceProfile` ระบุชื่อ **IAM instance profile**
* เอกสารบอกวิธีสร้าง instance profile และระบุว่า property นี้ **จำเป็นหรือไม่**

  * ในกรณีนี้ ไม่จำเป็นต้องระบุ property นี้เพื่อสร้าง EC2 instance

เอกสารยังบอก **data type** ของแต่ละ property เช่น `String` สำหรับ IamInstanceProfile
และบอกด้วยว่าการอัปเดต property นี้ต้อง **หยุด resource หรือไม่**

* ตัวอย่าง: การเพิ่มหรือแก้ไข IamInstanceProfile ไม่ทำให้ EC2 instance หยุด
* แต่การเปลี่ยน ImageId (AMI ID) ต้อง **replace instance**

เอกสารให้รายละเอียดครบถ้วนทั้ง properties, return values และตัวอย่างทั้ง YAML และ JSON
เป็นแหล่งข้อมูลสำคัญในการทำความเข้าใจวิธีตั้งค่า resources อย่างถูกต้อง

## การทำงานกับ EC2 Instances ใน Templates

ใน CloudFormation stack ของคุณ อาจกำหนด EC2 instance ด้วย properties เช่น:

* `AvailabilityZone`
* `ImageId`
* `InstanceType`

นอกจากนี้ สามารถระบุ **SecurityGroups** เป็น list ภายใต้ property `SecurityGroups`

เมื่อดูเอกสารของ SecurityGroups จะเห็นว่าเป็น **array ของ strings** แสดงชื่อ security groups
ช่วยให้เข้าใจวิธีระบุ property นี้ใน template ได้ถูกต้อง

สามารถใช้ **references ภายใน template** เพื่อเชื่อม resources และ properties
เอกสารช่วยให้เข้าใจ references และวิธีใช้งาน

## ตัวอย่าง Elastic IP Resource

Elastic IP มีหน้าเอกสารเฉพาะ
ค้นหา `"elastic IP cloudformation"` เพื่อไปยังหน้าเอกสาร
เอกสารอธิบายวิธีประกาศ Elastic IP resource พร้อมตัวอย่าง

ตัวอย่างประกอบด้วยการสร้าง Elastic IP และการ associate กับ security groups เช่น `SSHSecurityGroup`
การอ่านเอกสารช่วยให้เข้าใจการทำงานร่วมกันของ components เหล่านี้

## ความสามารถและความยืดหยุ่นของ Resources

Resources มอบความสามารถที่ทรงพลังใน CloudFormation
การรู้วิธีสร้าง resources และหาเอกสารที่เหมาะสมช่วยให้กรอก properties ได้ถูกต้อง
หลาย resource มี properties มากมาย คล้ายกับที่สามารถกำหนดใน **AWS Management Console**

## คำถามที่พบบ่อยเกี่ยวกับ Resources

**1. สามารถสร้าง resource แบบ dynamic ได้หรือไม่?**

* ได้ แต่ต้องใช้ **CloudFormation Macros และ Transforms** ซึ่งอยู่นอกขอบเขตคอร์สนี้
* ในคอร์สนี้ template กำหนดสิ่งที่จะสร้าง **แน่นอน** และไม่รองรับการสร้าง dynamic

**2. ทุก AWS Service รองรับหรือไม่?**

* เกือบทุก service รองรับ
* มีบาง service ที่ไม่รองรับ วิธีแก้คือใช้ **CloudFormation Custom Resources**
* วิธีนี้จะอธิบายต่อในคอร์ส

## สรุป

การเข้าใจ Resources และเอกสารของมันเป็นพื้นฐานสำคัญในการทำงานกับ CloudFormation templates อย่างมีประสิทธิภาพ

## Key Takeaways

* **Resources** เป็นหัวใจหลักและส่วนเดียวที่จำเป็นใน CloudFormation templates แทน AWS components ที่จะสร้างและกำหนดค่า
* Resource type identifier มีรูปแบบ: `service-provider::service-name::data-type-name`
* AWS มีเอกสาร resources มากกว่า 700 ประเภท พร้อม syntax, properties และตัวอย่าง
* การสร้าง resources แบบ dynamic ต้องใช้ Macros และ Transforms
* Service ที่ไม่รองรับสามารถใช้ **Custom Resources** แทน
