# DynamoDB Accelerator (DAX)

**DynamoDB Accelerator (DAX)** เป็น **แคชในหน่วยความจำ (in-memory cache)** สำหรับ DynamoDB ที่ **จัดการโดย AWS แบบเต็มรูปแบบ (fully-managed)**, **มีความพร้อมใช้งานสูง (highly available)** และ **ทำงานได้โดยไม่ต้องแก้ไขโค้ดแอปพลิเคชัน**

* DAX จะ **เก็บข้อมูลที่ถูกเข้าถึงบ่อย (hot items)**
* ทำให้การอ่านและ query ข้อมูลทำได้ **เร็วมากในระดับไมโครวินาที (microsecond latency)**
* การใช้งาน DAX **ไม่จำเป็นต้องเปลี่ยน API ของ DynamoDB**
* เพียงสร้าง **DAX cluster** และเริ่มใช้งาน

## ปัญหาที่ DAX แก้ไข

* ปัญหา **Hot Key**: เมื่อ key หรือ item ใดถูกอ่านบ่อย ๆ จะเกิด **throttling** ของ **Read Capacity Units (RCUs)**
* DAX **เก็บ hot keys ในแคช** ทำให้ **ลดปัญหา throttling**

## ภาพรวมสถาปัตยกรรม

* แอปพลิเคชันเข้าถึง **DynamoDB tables**
* ระหว่างแอปพลิเคชันและ DynamoDB เพิ่ม **DAX cluster** ซึ่งประกอบด้วย **cache nodes** ที่ provision ล่วงหน้า
* แอปฯ จะติดต่อกับ **DAX cluster** โดยตรง ซึ่ง DAX จะดึงข้อมูลจาก DynamoDB tables หากข้อมูลไม่อยู่ในแคช

## เวลาเก็บแคช (Cache TTL)

* ข้อมูลใน DAX **มีค่าเริ่มต้น TTL 5 นาที**
* หลังจากนั้นข้อมูลจะหมดอายุและต้องดึงจาก DynamoDB ใหม่

## DAX Cluster Nodes และ Provisioning

* **Cluster ประกอบด้วย nodes** ที่ต้อง provision ล่วงหน้า
* สามารถมี **สูงสุด 10 nodes ต่อ cluster**
* สำหรับ **production** แนะนำอย่างน้อย **3 nodes** ใน **multi-AZ setup** โดยมี **node อย่างน้อยหนึ่งตัวในแต่ละ AZ** เพื่อความพร้อมใช้งานสูง

## ฟีเจอร์ความปลอดภัย

DAX รองรับการรักษาความปลอดภัยครบถ้วน เช่น:

* **Encryption at rest**
* **IAM integration**
* **VPC security**
* **CloudTrail integration**

## สรุปวัตถุประสงค์ของ DAX

* DAX ถูกออกแบบเพื่อ **เก็บแคชข้อมูลหรือ query ที่ถูกใช้งานบ่อย**
* ทำให้ **การอ่านข้อมูลเร็วขึ้น** และ **ลด throttling**

## การเปรียบเทียบ DAX กับ ElastiCache

* **DAX**: แคช **individual objects หรือ simple queries/scans**
* **ElastiCache**: ใช้สำหรับ **คำนวณหรือ query ที่ซับซ้อน** เช่น การรวมค่า, filter, หรือ computation ที่ใช้เวลานาน
* การใช้ **DAX + ElastiCache ร่วมกัน**:

  * DAX แคช query หรือ object ที่ง่าย
  * ElastiCache เก็บผลลัพธ์จาก computation ที่ซับซ้อน
  * ลดโหลดบน DynamoDB และ **เพิ่มความเร็วตอบสนอง**

## การสร้าง DAX Cluster

* หลังจากนี้สามารถสร้าง **DAX cluster** เพื่อเริ่มใช้งานแคชได้

## Key Takeaways

* **DAX** เป็น **แคชในหน่วยความจำที่จัดการเต็มรูปแบบ** สำหรับ DynamoDB ที่ให้ **microsecond latency** สำหรับการอ่านและ query
* แก้ปัญหา **Hot Key** โดยเก็บข้อมูลที่เข้าถึงบ่อย ลด **throttling ของ RCUs**
* Cluster ประกอบด้วย **cache nodes** ที่ต้อง provision ล่วงหน้า และควรใช้ **multi-AZ setup** สำหรับ production
* **เข้ากันได้กับ DynamoDB API** ไม่ต้องเปลี่ยนแอปพลิเคชัน
* DAX แคชข้อมูลด้วย **TTL เริ่มต้น 5 นาที**
* สามารถใช้ **DAX + ElastiCache** ร่วมกัน:

  * DAX สำหรับ query หรือ object ที่ง่าย
  * ElastiCache สำหรับผลลัพธ์การคำนวณซับซ้อน เพื่อหลีกเลี่ยงการ query ซ้ำจาก DynamoDB