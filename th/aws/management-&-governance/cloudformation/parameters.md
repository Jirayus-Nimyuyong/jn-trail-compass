# CloudFormation - Parameters

## แนะนำ CloudFormation Parameters

**Parameters** ใน CloudFormation คือวิธีให้คุณสามารถรับ input เข้าไปยัง template ของคุณ
เมื่อคุณมี CloudFormation template คุณอาจต้องการให้ผู้ใช้กำหนดค่า parameter ต่าง ๆ
Parameters จะถูกประกาศเป็นส่วนหนึ่งของ template

เราเคยใช้ parameters มาก่อนแล้ว เช่น การใส่ **description** ให้กับ Security Group
การเข้าใจ parameters เป็นสิ่งสำคัญมากถ้าคุณต้องการ **reuse template** ของคุณภายในองค์กร ให้หลายคนสามารถระบุค่า parameter ได้
สิ่งนี้มีประโยชน์โดยเฉพาะเมื่อค่าบางอย่างไม่สามารถกำหนดล่วงหน้าได้

Parameters มีความสามารถสูงและสามารถควบคุมได้
พวกมันยังช่วยป้องกันข้อผิดพลาดใน template ของคุณด้วยการกำหนด **types** และ **constraints**

## เมื่อใดควรใช้ Parameters

พิจารณา parameter `SecurityGroupDescription` ที่เราใช้ก่อนหน้านี้
คำถามหลักคือ: **ค่าของ resource นี้อาจเปลี่ยนในอนาคตหรือไม่?**

* หากใช่ ควรทำเป็น parameter
* ทำให้เวลาอัปเดตค่า คุณไม่ต้องอัปโหลด template ใหม่เพื่อเปลี่ยนค่า
* ถ้าค่าของ property ไม่สามารถกำหนดล่วงหน้าได้ ควรทำเป็น parameter

## การตั้งค่าและประเภทของ Parameters

Parameters มีหลายการตั้งค่า:

* **Type:** String, Number, CommaDelimitedList, List of numbers หรือ AWS-specific เช่น SSM Parameter
* **Description:** คำอธิบาย
* **ConstraintDescription:** คำอธิบาย constraint หากมี
* **Min/Max Length:** ความยาวขั้นต่ำ/สูงสุด
* **Min/Max Value:** ค่าต่ำสุด/สูงสุด
* **Default:** ค่าเริ่มต้น
* **AllowedValues:** รายการค่าที่อนุญาต
* **AllowedPattern:** regex pattern
* **NoEcho:** ป้องกันไม่ให้แสดงค่า (เช่น รหัสผ่าน)

ไม่จำเป็นต้องจำทั้งหมด แต่ควรรู้ว่า parameters ไม่ใช่แค่ string ธรรมดา สามารถใช้ **constraints และ validation** เพื่อให้ค่าปลอดภัย

## ตัวอย่าง Parameter ที่สำคัญ

**AllowedValues** และ **NoEcho** เป็นตัวอย่างสำคัญสำหรับสอบ

**AllowedValues**

* ตัวอย่าง: parameter `InstanceType` Type: String
* AllowedValues: t2.micro, t2.small, t2.medium
* Default: t2.micro
* ใน resource `EC2Instance` จะใช้ parameter นี้
* ผู้ใช้จะเห็น dropdown ให้เลือกเพียง 3 ค่านี้เท่านั้น

**NoEcho**

* ตัวอย่าง: parameter รหัสผ่านฐานข้อมูล
* ตั้งค่า `NoEcho: true` เพื่อไม่ให้แสดงค่าใน logs หรือส่วนใด ๆ

## การใช้ Parameters กับฟังก์ชัน !Ref

* ใช้ **!Ref** เพื่ออ้างอิง parameter หรือ resource
* ใน YAML ใช้ shorthand version `!Ref`
* สามารถใช้ได้ทุกที่ใน template

**ตัวอย่าง:**

* parameter `SecurityGroupDescription` ใช้ใน property `GroupDescription` ของ SecurityGroup
* `!Ref SecurityGroupDescription` อ้างอิงไปยัง parameter ที่กำหนดด้านบน

**หมายเหตุ:** !Ref ใช้ได้ทั้ง **resource** และ **parameter**

* ตัวอย่าง: `SecurityGroups` ของ EC2::Instance ใช้ `!Ref SSHSecurityGroup`
* ต้องระวัง **ไม่ให้ชื่อ resource ซ้ำกับชื่อ parameter** เพื่อป้องกัน conflict

## Pseudo Parameters

AWS มี **pseudo parameters** ใช้ได้ในทุก template

* เป็นค่าที่กำหนดมาให้โดย default
* ตัวอย่างสำคัญ:

  * `AWS::AccountId` → AWS account ID ของคุณ
  * `AWS::Region` → region ที่ stack ถูก deploy
  * `AWS::StackId` → Stack ID
  * `AWS::StackName` → ชื่อ stack
  * `AWS::NotificationARNs` → notification ARNs
  * `AWS::NoValue` → ไม่มีค่า

ตัวอย่างการใช้งาน: ไม่ต้องให้ผู้ใช้ระบุ region เช่น `us-east-1` เพราะ pseudo parameters รู้ค่าโดยอัตโนมัติ

## สรุป

การเข้าใจ **parameters** และ **pseudo parameters** เป็นสิ่งจำเป็นสำหรับการสร้าง CloudFormation templates ที่ยืดหยุ่น, สามารถ reuse และปลอดภัย

## ข้อสรุปสำคัญ (Key Takeaways)

* CloudFormation parameters ให้ผู้ใช้สามารถส่งค่า input เข้าไปใน template ทำให้สามารถ reuse และปรับเปลี่ยนได้ง่าย
* Parameters รองรับหลาย **type และ constraints** เช่น AllowedValues และ NoEcho สำหรับข้อมูลสำคัญ
* ใช้ฟังก์ชัน **!Ref** เพื่ออ้างอิง parameter และ resource
* Pseudo parameters มีค่าในตัว เช่น AWS Account ID และ region ทำให้การตั้งค่า template ง่ายขึ้น
