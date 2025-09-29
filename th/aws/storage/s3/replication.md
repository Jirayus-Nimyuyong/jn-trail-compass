# Amazon S3 – Replication (CRR & SRR)

## แนะนำ S3 Replication

* S3 Replication คือการ **ทำสำเนาไฟล์จาก S3 Bucket หนึ่งไปยังอีก Bucket หนึ่ง**

* มี 2 แบบหลัก:

  1. **CRR (Cross-Region Replication)** → ข้าม region
  2. **SRR (Same-Region Replication)** → ภายใน region เดียวกัน

* แนวคิด: มี **source bucket** และ **destination bucket** → ต้องการตั้งค่า **replication แบบ asynchronous**

## เงื่อนไขการใช้งาน

* ต้องเปิด **Versioning** ในทั้ง source และ destination bucket
* CRR → ต้องเป็น region ต่างกัน
* SRR → อยู่ใน region เดียวกัน
* สามารถทำข้ามบัญชี AWS ได้
* การ replication ทำงาน **เบื้องหลังแบบ asynchronous**
* ต้องให้ **IAM permissions** ที่เหมาะสมกับ S3 เพื่อให้สามารถอ่านจาก source และเขียนไปยัง destination ได้

## การใช้งาน S3 Replication

**สำหรับ CRR (Cross-Region Replication)**

* ใช้สำหรับ **ตอบสนองข้อกำหนด compliance**
* ให้ **การเข้าถึงข้อมูลที่มี latency ต่ำขึ้น** เพราะข้อมูลมีอยู่ใน region อื่น
* สามารถทำ replication ข้ามบัญชี AWS ได้

**สำหรับ SRR (Same-Region Replication)**

* ใช้สำหรับ **รวม log จากหลาย S3 Buckets**
* ใช้สำหรับ **replicate ข้อมูลแบบ live ระหว่าง production กับ test environment**

## หมายเหตุเกี่ยวกับ Amazon S3 Replication

### ภาพรวม S3 Replication

* หลังจากเปิดใช้งาน **replication** ข้อมูลใหม่ ๆ ที่ถูกอัปโหลดจะถูก **replicate อัตโนมัติ**

### การ replicate objects ที่มีอยู่แล้ว

* ถ้าต้องการ replicate **objects ที่มีอยู่ก่อนหน้า** ต้องใช้ฟีเจอร์ **S3 Batch Replication**
* ฟีเจอร์นี้สามารถ replicate ทั้ง **objects ที่มีอยู่** และ **objects ที่ replication ล้มเหลว**

### การ replicate Delete Markers

* สามารถ replicate **delete markers** จาก source bucket ไปยัง target bucket ได้ (เป็น optional)
* แต่ **การลบที่มี version IDs จะไม่ถูก replicate**

  * เพื่อป้องกันการลบถาวรจาก bucket หนึ่งไปยังอีก bucket หนึ่ง
  * ช่วยลดความเสี่ยงจากการลบที่เป็นอันตราย

### ข้อจำกัดของ Replication

* **ไม่มีการ chain replication**

  * เช่น bucket1 → bucket2 → bucket3
  * objects จาก bucket1 จะ **ไม่ replicate ไป bucket3**
* Replication จะเกิด **เฉพาะระหว่าง bucket ที่เชื่อมต่อโดยตรง** เท่านั้น

## Key Takeaways

* S3 Replication มี 2 แบบ: **CRR (ข้าม region)** และ **SRR (ใน region เดียวกัน)**
* ต้องเปิด **versioning** ในทั้ง source และ destination bucket
* ต้องให้ **IAM permissions** ที่เหมาะสมสำหรับ S3
* **CRR** → ดีสำหรับ compliance, ลด latency, replication ข้ามบัญชี
* **SRR** → ดีสำหรับรวบรวม log และ replication ข้อมูลระหว่าง production และ test
* หลังเปิด replication → **เฉพาะ objects ใหม่** ที่ถูก replicate อัตโนมัติ
* ต้องใช้ **S3 Batch Replication** หากต้อง replicate objects ที่มีอยู่แล้ว
* สามารถ replicate delete markers ได้ แต่ **objects ที่ลบพร้อม version ID จะไม่ถูก replicate**
* Replication **ไม่ chain ข้ามหลาย bucket** → เกิดเฉพาะระหว่าง bucket ที่เชื่อมตรงกันเท่านั้น
