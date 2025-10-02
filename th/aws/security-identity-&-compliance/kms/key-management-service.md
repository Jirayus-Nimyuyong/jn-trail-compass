# AWS Key Management Service (KMS)

AWS Key Management Service (KMS) เป็นบริการจัดการกุญแจเข้ารหัสที่ AWS ให้บริการ โดย KMS ถูกใช้โดยอัตโนมัติในหลายบริการ AWS เมื่อมีการเข้ารหัสเกิดขึ้น ดังนั้นเมื่อพูดถึงการเข้ารหัสใน AWS ส่วนใหญ่จะเกี่ยวข้องกับ KMS

เป้าหมายหลักของ KMS คือการ **จัดการกุญแจเข้ารหัสแทนผู้ใช้งาน** เพื่อลดภาระการจัดการกุญแจด้วยตนเอง

KMS ผนวกการทำงานกับ **AWS Identity and Access Management (IAM)** เพื่อควบคุมสิทธิ์ในการเข้าถึงข้อมูลที่เข้ารหัสอย่างง่ายดาย

อีกฟีเจอร์สำคัญของ KMS คือ **สามารถตรวจสอบ (audit) ทุกการเรียกใช้งาน API ของกุญแจ** ผ่าน AWS CloudTrail ซึ่งมีความสำคัญต่อความปลอดภัยและอาจถูกสอบใน AWS Certification

KMS สามารถผนวกรวมกับบริการ AWS ส่วนใหญ่ เช่น:

* Elastic Block Store (EBS) สำหรับเข้ารหัสข้อมูลที่จัดเก็บ
* Amazon S3, Amazon RDS, Systems Manager (SSM) และบริการอื่น ๆ

นอกจากนี้ผู้ใช้งานยังสามารถใช้ KMS โดยตรงผ่าน API, AWS CLI, หรือ SDK เพื่อเข้ารหัสข้อมูลลับ (secret) ก่อนจัดเก็บในโค้ดหรือ environment variables

## ประเภทของ KMS Keys

KMS Keys (เดิมเรียกว่า Customer Master Keys - CMKs) มี 2 ประเภทหลัก:

1. **Symmetric KMS Keys**

   * ใช้กุญแจเดียวกันทั้งเข้ารหัสและถอดรหัส
   * บริการ AWS ส่วนใหญ่ใช้ symmetric keys
   * ไม่สามารถเข้าถึง key material โดยตรง ต้องเรียกใช้งานผ่าน KMS API

2. **Asymmetric KMS Keys**

   * ประกอบด้วย **public key** สำหรับเข้ารหัส และ **private key** สำหรับถอดรหัส
   * รองรับการเข้ารหัส/ถอดรหัส หรือ sign/verify
   * ผู้ใช้งานสามารถดาวน์โหลด public key แต่ private key จะถูกป้องกันและเข้าถึงได้ผ่าน API เท่านั้น
   * เหมาะกับการเข้ารหัสนอก AWS โดยผู้ใช้ที่ไม่มีสิทธิ์เข้าถึง KMS API

## หมวดหมู่ของ KMS Keys

1. **AWS Owned Keys**

   * ฟรี ใช้ภายในบริการ AWS เช่น SSE-S3 หรือ DynamoDB
   * ผู้ใช้ไม่สามารถเห็น key

2. **AWS Managed Keys**

   * ฟรี สร้างและจัดการโดย AWS สำหรับบริการเฉพาะ เช่น AWS/RDS, AWS/EBS
   * ใช้ได้เฉพาะบริการที่กำหนด

3. **Customer Managed Keys**

   * สร้างและจัดการโดยลูกค้า
   * ค่าบริการประมาณ $1 ต่อเดือน
   * สามารถ import key ได้ ค่าบริการ $1 ต่อเดือน
   * การเรียก KMS API มีค่าใช้จ่าย ~3 cents ต่อ 10,000 ครั้ง

## การหมุนเวียนกุญแจ (Key Rotation)

* **AWS Managed Keys**: หมุนเวียนอัตโนมัติทุกปี
* **Customer Managed Keys**: สามารถเปิดหมุนเวียนอัตโนมัติ หรือหมุนเวียนตามต้องการ
* **Imported Keys**: ต้องหมุนเวียนด้วยตนเอง
* KMS ใช้ **aliases** เพื่ออ้างอิงกุญแจในการหมุนเวียน

## ขอบเขตกุญแจตาม Region

* KMS keys มีขอบเขตเฉพาะ **region**
* การคัดลอก EBS snapshot ที่เข้ารหัสข้าม region ต้อง **เข้ารหัสใหม่ด้วย KMS key ของ region ปลายทาง**
* กุญแจเดิมไม่สามารถอยู่ในหลาย region พร้อมกัน

## นโยบายกุญแจ KMS (KMS Key Policies)

* ควบคุมการเข้าถึง KMS keys เช่นเดียวกับ S3 bucket policy
* หากไม่มี key policy แนบ จะไม่มีใครเข้าถึงกุญแจได้

ประเภทของ Key Policies:

1. **Default Key Policy**

   * สร้างอัตโนมัติ หากไม่ได้กำหนด custom policy
   * ผู้ใช้ในบัญชี AWS สามารถเข้าถึงได้ หากมีสิทธิ์ IAM

2. **Custom Key Policy**

   * กำหนดผู้ใช้หรือ role เฉพาะที่เข้าถึงหรือบริหารกุญแจ
   * เหมาะสำหรับ **cross-account access**

ตัวอย่างการแชร์ snapshot ข้ามบัญชี:

1. สร้าง snapshot เข้ารหัสด้วย customer managed KMS key
2. แนบนโยบาย custom key policy ให้บัญชีอื่นเข้าถึงได้
3. แชร์ snapshot กับบัญชีปลายทาง
4. ในบัญชีปลายทาง สร้าง snapshot ใหม่เข้ารหัสด้วย KMS key ของบัญชีนั้น
5. สร้าง EBS volume จาก snapshot

## สรุป Key Takeaways

* AWS KMS เป็นบริการจัดการกุญแจเข้ารหัส และผนวกกับ IAM สำหรับควบคุมสิทธิ์
* รองรับ **symmetric keys** และ **asymmetric keys**
* ประเภทกุญแจ: AWS Owned, AWS Managed, Customer Managed
* กุญแจมีขอบเขต region; การคัดลอก snapshot ข้าม region ต้องเข้ารหัสใหม่
* Key policies ควบคุมการเข้าถึง; default ให้บัญชีเข้าถึงทั้งหมด, custom สำหรับสิทธิ์ละเอียดและ cross-account
* KMS API สามารถ audit ผ่าน CloudTrail และมีค่าใช้จ่ายต่อการเรียกใช้งาน
* รองรับการหมุนเวียนกุญแจทั้งอัตโนมัติและด้วยตนเอง ขึ้นอยู่กับประเภทกุญแจ