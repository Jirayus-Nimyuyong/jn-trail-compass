# AWS Secrets Manager

**AWS Secrets Manager** เป็นบริการใหม่ที่ออกแบบมาเพื่อ **จัดเก็บความลับ (secrets) อย่างปลอดภัย**

* แตกต่างจาก **Systems Manager (SSM) Parameter Store** โดยมีความสามารถในการจัดการความลับขั้นสูงมากกว่า
* จุดเด่นคือสามารถ **บังคับหมุนเวียนความลับ (rotation) ทุกจำนวนวันที่กำหนด** ทำให้การจัดการ credentials เป็นระบบและปลอดภัยยิ่งขึ้น

## การหมุนเวียนความลับอัตโนมัติ

* Secrets Manager สามารถ **สร้างความลับใหม่อัตโนมัติ** ในขั้นตอน rotation
* ต้องกำหนด **Lambda function** สำหรับสร้างความลับใหม่ในกระบวนการหมุนเวียน

## การผสานรวมกับบริการ AWS

* Secrets Manager ผสานรวมกับบริการ AWS หลายตัว เช่น **Amazon RDS** (MySQL, PostgreSQL, SQL Server, Aurora)
* Credentials เช่น **username และ password** ของฐานข้อมูลสามารถจัดเก็บใน Secrets Manager ได้โดยตรง
* Credentials เหล่านี้สามารถ **หมุนเวียนอัตโนมัติ** ช่วยลดการจัดการด้วยมือและเพิ่มความปลอดภัย
* ความลับที่จัดเก็บสามารถ **เข้ารหัสด้วย AWS Key Management Service (KMS)** เพื่อป้องกันข้อมูลสำคัญ

> ในการสอบ AWS หากเจอคำว่า **Secrets** หรือการผสานรวมกับ **RDS/Aurora** ให้คิดถึง Secrets Manager เป็นบริการหลัก

## Multi-Region Secrets

* Secrets Manager รองรับ **multi-region secrets**
* สามารถ **ทำสำเนาความลับไปยังหลาย region** ได้
* บริการจะ **ซิงโครไนซ์ความลับสำเนากับความลับหลัก**

  * ตัวอย่าง: หากสร้างความลับใน region หลัก ความลับนั้นจะถูกทำสำเนาอัตโนมัติใน region รอง

### ประโยชน์ของ Multi-Region Secrets

1. **Disaster Recovery**: หากเกิดปัญหาใน region หลัก (เช่น US East 1) สามารถ **promote** ความลับสำเนาใน region รองให้เป็นความลับหลักได้
2. **Multi-Region Applications**: สามารถสร้างแอปที่ทำงานหลาย region โดยใช้ความลับที่ซิงโครไนซ์กัน
3. **เข้าถึงได้สม่ำเสมอ**: หากฐานข้อมูล RDS ถูก replicate ข้าม region สามารถใช้ความลับเดียวกันเข้าถึงฐานข้อมูลแต่ละ region ได้

## SSM Parameter Store vs Secrets Manager

## ความแตกต่างระหว่าง SSM Parameter Store และ Secrets Manager

* **Secrets Manager**

  * ราคาสูงกว่า แต่มีความสามารถ **หมุนเวียนความลับอัตโนมัติ** ผ่าน Lambda functions
  * AWS มี Lambda functions ให้ใช้ **พร้อมใช้งาน** สำหรับ RDS, Redshift, หรือ DocumentDB ซึ่งผสานรวมอย่างแน่นหนากับ Secrets Manager
  * การเข้ารหัสด้วย **KMS** เป็น **ข้อบังคับ**
  * สามารถผสานรวมกับ **CloudFormation** ได้

* **SSM Parameter Store**

  * ใช้งานได้หลากหลายกว่าและ **ราคาถูกกว่า**
  * มี API ใช้งานง่าย
  * **ไม่มีฟีเจอร์หมุนเวียนความลับอัตโนมัติ** แต่สามารถสร้างได้เองโดยใช้ **Lambda function** ร่วมกับ **EventBridge**
  * การเข้ารหัสด้วย KMS **ไม่บังคับ** สามารถเก็บได้ทั้ง parameter ธรรมดาหรือ secrets
  * สามารถดึงความลับจาก Secrets Manager ผ่าน **SSM Parameter Store API** ได้

## การหมุนเวียนความลับ: Parameter Store vs Secrets Manager

* **Secrets Manager**

  * สมมติว่าต้องการหมุนเวียน password ของ **Amazon RDS**
  * สามารถตั้งค่า Secrets Manager ให้เรียก **Lambda function อัตโนมัติทุก 30 วัน**
  * Lambda function สำหรับ RDS ถูกสร้างโดย AWS และติดตั้งในบัญชีคุณให้เรียบร้อย
  * Lambda function จะเปลี่ยน password ของฐานข้อมูล RDS อัตโนมัติ
  * สำหรับความลับทั่วไปที่ไม่ผสานรวมกับ Secrets Manager อย่างลึก คุณต้องเขียน Lambda function เอง แต่ AWS มีเอกสารช่วยเหลือ

* **SSM Parameter Store**

  * ไม่มีฟีเจอร์หมุนเวียนความลับอัตโนมัติ
  * หากเก็บ password ของ RDS ใน Parameter Store สามารถสร้าง **EventBridge rule** ให้ trigger ทุก 30 วัน
  * EventBridge จะเรียก **Lambda function** ที่คุณเขียนเองเพื่อเปลี่ยน password ของ RDS และอัปเดตค่าใน Parameter Store

## สรุป

**AWS Secrets Manager** เป็นโซลูชันที่แข็งแกร่งสำหรับ **การจัดการความลับอย่างปลอดภัย**

* มีฟีเจอร์ **หมุนเวียนอัตโนมัติ**, **เข้ารหัสด้วย KMS**, และ **replicate ข้าม region**
* รองรับกลยุทธ์ **high availability** และ **disaster recovery**

## สรุปความแตกต่าง

| ฟีเจอร์                   | Secrets Manager                       | SSM Parameter Store                                |
| ------------------------- | ------------------------------------- | -------------------------------------------------- |
| ราคาค่าใช้จ่าย            | สูงกว่า                               | ถูกกว่า                                            |
| การหมุนเวียนความลับ       | อัตโนมัติ ใช้ Lambda functions        | ไม่มี native ต้องทำเองด้วย Lambda + EventBridge    |
| การเข้ารหัสด้วย KMS       | บังคับ                                | ไม่บังคับ                                          |
| การใช้งาน                 | เหมาะกับ secrets ที่ต้องหมุนเวียนบ่อย | เหมาะกับ parameter ธรรมดาและ secrets แบบไม่ซับซ้อน |
| การผสานรวม CloudFormation | ใช่                                   | ใช่                                                |

## Key Takeaways

* Secrets Manager เป็นบริการสำหรับ **จัดเก็บและจัดการความลับ** พร้อมความสามารถ **หมุนเวียนอัตโนมัติ**
* รองรับ **forced rotation** ของ secrets ทุกจำนวนวันที่กำหนด
* ผสานรวมกับบริการ AWS เช่น **Amazon RDS** เพื่อเก็บ credentials ฐานข้อมูลอย่างปลอดภัยและหมุนเวียนอัตโนมัติ
* ความลับสามารถเข้ารหัสด้วย **AWS KMS** และรองรับ **multi-region replication** เพื่อ disaster recovery และแอปพลิเคชันหลาย region
* **Secrets Manager**: ราคาสูงกว่า แต่มี **หมุนเวียนความลับอัตโนมัติ** ผ่าน Lambda
* **Parameter Store**: ราคาถูกกว่า, ใช้งานได้หลากหลาย แต่ไม่มีฟีเจอร์หมุนเวียนความลับอัตโนมัติ
* **Secrets Manager** ต้องเข้ารหัสด้วย KMS, Parameter Store เข้ารหัสได้แต่ไม่บังคับ
* การหมุนเวียนความลับใน Parameter Store ต้องสร้างเองด้วย EventBridge + Lambda