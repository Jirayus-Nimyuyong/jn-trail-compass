# CloudFormation - Mappings

**Mappings** คือค่าคงที่ (fixed variables) ภายใน CloudFormation templates ของคุณ
Mappings มีประโยชน์มากหากคุณต้องการแยกค่าใน **environment ต่าง ๆ** เช่น development กับ production และกำหนดค่าแตกต่างกันตามนั้น
Mappings ยังสามารถใช้กับ region ต่าง ๆ เช่น AWS regions, ประเภท AMI เป็นต้น

ค่าทั้งหมดถูกกำหนด **hardcoded** ไว้ใน template

## ตัวอย่าง: Region Map

เพื่อให้เห็นภาพชัดเจน ลองพิจารณา **region map**

* ขึ้นอยู่กับ region ของคุณ เช่น `us-east-1`, `us-west-1`, `eu-west-1`
* และขึ้นอยู่กับ architecture เช่น `HVM64` หรือ `HVMG2`

Mapping นี้จะให้ **AMI ID ที่แตกต่างกัน** ทุกครั้ง

* เพราะ AMI เฉพาะกับแต่ละ region
* ดังนั้นการมี AMI ต่างกันตาม region จึงเหมาะมากสำหรับการใช้ mapping

## การเข้าถึงค่าจาก Mapping

ตัวอย่าง: EC2 instance ใช้ `ImageId`

* ค่านี้ได้จากฟังก์ชัน **FindInMap**

วิธีใช้ FindInMap:

1. ระบุชื่อ map เช่น `RegionMap`
2. ระบุ **top-level key** เช่น pseudo parameter `AWS::Region`

   * หาก deploy ใน `us-east-1` → `AWS::Region` จะ resolve เป็น `us-east-1`
   * หาก deploy ใน `us-west-1` → resolve เป็น `us-west-1`
3. ระบุ **second-level key** เช่น architecture (`HVM64`)

ผลลัพธ์คือคุณจะได้ AMI ที่ถูกต้องสำหรับ **region และ architecture** ที่กำหนด

## Mappings vs Parameters

**เมื่อใดควรใช้ mappings หรือ parameters**

* **Mappings:**

  * เหมาะเมื่อค่าทั้งหมดทราบล่วงหน้า
  * ค่ามาจากตัวแปร เช่น region, availability zone, AWS account, environment (dev vs prod)
  * ช่วยให้ควบคุม template ได้อย่างปลอดภัย

* **Parameters:**

  * ใช้เมื่อค่าขึ้นอยู่กับผู้ใช้ใน runtime
  * ให้ความยืดหยุ่นสูงสุดแก่ผู้ใช้

## สรุป

* Mappings เป็นค่าคงที่ใน template ใช้สำหรับแยก environment หรือ region
* เหมาะกับค่าที่ทราบล่วงหน้า เช่น AMI ID เฉพาะ region ตาม architecture
* ใช้ฟังก์ชัน **FindInMap** เพื่อเข้าถึงค่าจาก mapping โดยระบุ map name, top-level key, และ second-level key
* ใช้ mappings สำหรับค่าที่ทราบล่วงหน้า และใช้ parameters สำหรับค่าที่ผู้ใช้กำหนด runtime
