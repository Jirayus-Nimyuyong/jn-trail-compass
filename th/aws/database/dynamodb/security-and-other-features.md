# DynamoDB – Security & Other Features

เรามาดูเรื่อง **ความปลอดภัยของ DynamoDB** และฟีเจอร์เพิ่มเติมกัน

## VPC Endpoints

* สามารถเข้าถึง DynamoDB โดย **ไม่ต้องใช้อินเทอร์เน็ตสาธารณะ**
* การรับส่งข้อมูลทั้งหมดอยู่ภายใน VPC ของคุณ

## การควบคุมการเข้าถึง (Access Control)

* การเข้าถึง DynamoDB ถูกควบคุมโดย **IAM**
* ทำให้ DynamoDB เป็นตัวเลือกฐานข้อมูลที่ปลอดภัยใน AWS

## การเข้ารหัส (Encryption)

* **Encryption at rest**: ใช้ AWS KMS
* **Encryption in transit**: ใช้ SSL/TLS

## การสำรองและกู้คืนข้อมูล (Backup and Restore)

มี 2 ฟีเจอร์หลัก:

1. **Point-in-time recovery (PITR)**: เหมือน RDS และไม่มีผลกระทบต่อประสิทธิภาพ
2. **Standard backup and restore**

## Global Tables

* **Global Tables** เป็นตารางที่ทำงานหลายภูมิภาค (multi-region), multi-active, replication เต็มรูปแบบ, ประสิทธิภาพสูง
* การเปิด Global Tables ต้อง **เปิด DynamoDB Streams ก่อน**

## DynamoDB Local

* แม้ว่า DynamoDB เป็นบริการคลาวด์ แต่สามารถจำลอง **DynamoDB Local** บนเครื่องคอมพิวเตอร์ได้
* ช่วยในการพัฒนาและทดสอบโดยไม่ต้องใช้ DynamoDB จริง

## การย้ายข้อมูล (Data Migration)

* ใช้ **AWS Database Migration Service** เพื่อย้ายข้อมูลเข้า/ออก DynamoDB
* ตัวอย่างเช่น ย้ายจาก MongoDB, Oracle, MySQL, S3 เป็นต้น

## การควบคุมการเข้าถึงแบบละเอียด (Fine-Grained Access Control)

### ปัญหา

* ให้ IAM permissions หรือ roles โดยตรงกับ client/web/mobile app **ไม่ปลอดภัยและไม่สะดวก**

### วิธีแก้ไข

* ใช้ **Identity Provider** เช่น

  * Amazon Cognito User Pools
  * Google Login, Facebook Login
  * OpenID Connect, SAML
* ผู้ใช้ล็อกอินกับ identity provider แล้วแลกเป็น **Temporary AWS Credentials**

### Temporary Credentials

* **ปลอดภัยมากกว่า** เพราะมีอายุจำกัด
* เชื่อมโยงกับ **IAM Role** ที่กำหนดขอบเขตการเข้าถึงให้เฉพาะข้อมูลของผู้ใช้เท่านั้น

## การใช้ Fine-Grain Access Control

1. ทำ **federated login** เพื่อรับ temporary credentials
2. สร้าง IAM Role พร้อม **Condition** ที่จำกัดสิทธิ์ตาม:

   * **Leading key ของ primary key** → จำกัด row-level access
   * **Attribute** → จำกัด attribute-level access

### ตัวอย่าง IAM Policy

* อนุญาต actions เช่น GetItem, BatchGetItem, Query, PutItem, UpdateItem, DeleteItem, BatchWriteItem บนตารางที่กำหนด
* มีเงื่อนไขที่จำกัดการเข้าถึง **row-level** ตาม primary key ของผู้ใช้
* สามารถกำหนดเงื่อนไขเพื่อจำกัด **attribute-level** ได้ด้วย

## สรุป

* Fine-grain access control ทำได้ด้วย **federated login + IAM Role + Conditions**
* จำกัดสิทธิ์ **row-level** และ **attribute-level** ให้ผู้ใช้เข้าถึงเฉพาะข้อมูลที่เป็นของตน

## ข้อสรุปสำคัญ (Key Takeaways)

* ความปลอดภัยของ DynamoDB รวม VPC endpoints, การควบคุมด้วย IAM, และการเข้ารหัสทั้ง at rest และ in transit
* การสำรองและกู้คืนมีทั้ง **point-in-time recovery** และ **standard backup** โดยไม่มีผลกระทบต่อประสิทธิภาพ
* **Global Tables** รองรับ multi-region, multi-active, replication เต็มรูปแบบ และประสิทธิภาพสูง
* **Fine-grained access control** ใช้ federated login, temporary AWS credentials, และ IAM role conditions เพื่อจำกัดการเข้าถึงตาม primary key หรือ attribute
