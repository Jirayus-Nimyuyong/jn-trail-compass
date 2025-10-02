# YAML

ในคอร์สนี้และใน **CloudFormation** คุณจะเจอ **YAML templates** บ่อยที่สุด
YAML เป็นภาษาหนึ่ง คล้ายกับ JSON ที่คุณสามารถใช้เขียน CloudFormation templates

ส่วนตัวผมคิดว่า **JSON** ไม่เหมาะสำหรับการเขียน CloudFormation template เพราะมีเรื่อง string interpolation และความซับซ้อนหลายอย่าง
ในทางกลับกัน **YAML** ดีมากในหลายด้าน โดยเฉพาะเรื่อง **อ่านง่ายและสร้างง่าย**

มาลองเรียนรู้ YAML ในบทนี้เพื่อให้คุณมั่นใจในการอ่าน templates

## ทำความเข้าใจ YAML Documents

ด้านซ้ายมือ คุณจะเห็น **YAML document**
YAML document ประกอบด้วย **คู่ key-value**

ตัวอย่างเช่น:

* key แรกคือ `invoice` กับค่าเป็นตัวเลข
* `date` เป็น string
* key `bill-to` มี **nested object** ที่ย่อหน้าและประกอบด้วยหลาย key-value

โครงสร้างนี้เรียกว่า **nested object**
YAML รองรับการ **nested objects** เหมือน JSON
ตัวอย่างเช่น key `bill-to` มี object ที่มี keys เช่น `given`, `family`, และ `address` โดยที่ `address` เป็น **nested object อีกชั้นหนึ่ง**

YAML ยังรองรับ **arrays**
ตัวอย่างเช่นใต้ `products` จะใช้ dash (-) เพื่อแสดง array
มีหลาย product listed โดยแต่ละตัวมี keys เช่น `SKU`, `quantity`, `description`, และ `price`

YAML รองรับ **multi-line strings**
ตัวอย่างเช่น lines ของ address ใช้ vertical bar (|) เพื่อแทน multi-line string

นอกจากนี้ YAML ยังรองรับ **comments** ซึ่งจะไม่ถูกประมวลผล
ตัวอย่างการใช้ comments จะเห็นใน CloudFormation templates

การอ่านและทำความเข้าใจ YAML เป็นสิ่งสำคัญมาก และยิ่งดีถ้าคุณสามารถเขียนเองได้

## YAML ใน CloudFormation Templates

ลองดูตัวอย่าง CloudFormation template ที่เราใช้

* **Resources block** มี **nested objects**

  * ตัวอย่างเช่น `MyInstance` เป็น nested object

    * `Type` = `AWS::EC2::Instance` (string)
    * `Properties` เป็น nested object อีกชั้นหนึ่ง มีหลาย key-value

* ตัวอย่างอื่นคือ **list ของ security groups** ใช้ dash (-)

  * security group แรกและสองถูกระบุเป็น elements ของ array

YAML รองรับ **comments** ด้วยเครื่องหมาย hash (#)

* สามารถใส่ comments ได้ทุกที่ใน YAML document
* มีประโยชน์มากสำหรับการทำ documentation

**Lists** สามารถมี element เดียวหรือหลาย element

* แม้แต่ element เดียว ก็จะแสดงเป็น list ที่มี item หนึ่ง

อย่างที่เห็น **YAML ทำให้ CloudFormation templates อ่านง่ายมาก**
เมื่อคุ้นเคยแล้ว คุณจะใช้ความสามารถเต็มที่ของ CloudFormation ได้

## สรุป

* YAML เป็นภาษาที่นิยมใช้มากกว่า JSON สำหรับ CloudFormation เพราะ **อ่านง่ายและสร้างง่าย**
* YAML document ประกอบด้วย **key-value pairs** รองรับ **nested objects และ arrays** สำหรับโครงสร้างข้อมูลซับซ้อน
* YAML รองรับ **multi-line strings** และ **comments** ทำให้ template ชัดเจน
* การเข้าใจและเขียน YAML ได้อย่างถูกต้อง จะช่วยให้คุณใช้ **CloudFormation templates** ได้เต็มประสิทธิภาพ