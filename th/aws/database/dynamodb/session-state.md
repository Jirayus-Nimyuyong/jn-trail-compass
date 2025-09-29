# การใช้ DynamoDB สำหรับ Session State

DynamoDB สามารถใช้เก็บข้อมูลได้ แต่ยังสามารถใช้ **เก็บ session state เป็น cache** ให้กับเว็บแอปพลิเคชันได้ ซึ่งทำให้เว็บแอปสามารถดึงหรือเก็บสถานะของ session ตามต้องการ และแชร์ข้อมูลการล็อกอินของผู้ใช้ระหว่าง backend web applications ได้ นี่เป็น **กรณีการใช้งานที่พบบ่อยมาก** ของ DynamoDB

## การเปรียบเทียบ DynamoDB กับ ElastiCache สำหรับการเก็บ Session State

ทั้ง ElastiCache และ DynamoDB สามารถใช้เก็บ session state ได้เหมือนกัน แต่มีความแตกต่างบางอย่าง:

* **ElastiCache** → เป็น **in-memory 100%**
* **DynamoDB** → เป็น **serverless**
* ทั้งคู่เป็น **key/value store**

**ข้อสังเกตสำหรับสอบ:**

* ถ้าข้อสอบพูดถึง session state **ที่อยู่ใน memory** → มักหมายถึง ElastiCache
* ถ้าพูดถึง session state **ที่ปรับขนาดอัตโนมัติและ serverless** → DynamoDB มักเป็นคำตอบที่ถูกต้อง

## ตัวเลือกอื่นสำหรับเก็บ Session State

1. **เก็บบนดิสก์**

   * ต้องแชร์ดิสก์ระหว่างหลาย EC2 instance
   * **EFS** เป็นตัวเลือกที่ดีสำหรับแชร์ดิสก์แบบนี้
   * EFS ต้องแนบกับ EC2 เป็น network drive
   * **ข้อแตกต่างสำคัญ:** EFS เป็นไฟล์ซิสเต็ม, DynamoDB เป็นฐานข้อมูล

2. **Local caching กับ EBS และ EC2 Instance Store**

   * สามารถใช้สำหรับ cache **ในเครื่องเดียว** แต่ไม่สามารถแชร์ระหว่างหลาย instance
   * เหมาะสำหรับ caching dataset **ท้องถิ่น** แต่ไม่เหมาะสำหรับ shared cache

3. **ใช้ S3 สำหรับ Session State**

   * สามารถทำได้ แต่มี **latency สูง**
   * S3 ออกแบบมาสำหรับไฟล์ใหญ่ ไม่เหมาะกับ object ขนาดเล็ก
   * ดังนั้น S3 **ไม่เหมาะ** สำหรับ session state cache

## สรุปตัวเลือกที่ดีที่สุดสำหรับ Session State

* **ตัวเลือกที่ดีที่สุด 3 อันดับ:** DynamoDB, ElastiCache, EFS
* **แนะนำ:** ใช้ DynamoDB หรือ ElastiCache
* **การเลือกใช้ขึ้นกับ:**

  * ต้องการ **in-memory** → ElastiCache
  * ต้องการ **serverless + scaling อัตโนมัติ** → DynamoDB

## ข้อสรุป

* DynamoDB สามารถใช้เก็บ **session state เป็น cache** ให้เว็บแอปดึงหรือเก็บ session ตามต้องการ
* ElastiCache และ DynamoDB เป็น **key/value store** สำหรับ session state

  * ElastiCache → in-memory
  * DynamoDB → serverless, scaling อัตโนมัติ
* EFS → ใช้แชร์ disk ระหว่างหลาย EC2 ได้ เหมาะสำหรับ session state
* EBS / EC2 instance store → ใช้ได้เฉพาะ local cache
* S3 → **ไม่เหมาะ** สำหรับ session state เพราะ latency สูงและออกแบบสำหรับไฟล์ใหญ่
