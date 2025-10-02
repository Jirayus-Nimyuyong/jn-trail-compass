# Amazon Cognito

**Amazon Cognito** เป็นบริการที่ออกแบบมาเพื่อ **มอบตัวตน (identity) ให้กับผู้ใช้** สำหรับการใช้งานเว็บและแอปพลิเคชันมือถือ

* ผู้ใช้เหล่านี้มัก **อยู่นอกบัญชี AWS ของเรา** จึงเป็นที่มาของชื่อ Cognito ที่หมายถึงการมอบตัวตนให้กับผู้ใช้ที่เรายังไม่รู้จัก

## ส่วนประกอบของ Amazon Cognito

Amazon Cognito ประกอบด้วย **สองบริการหลัก**

1. **Cognito User Pool**
2. **Cognito Identity Pool**

### Cognito User Pool

* ให้ฟังก์ชัน **การเข้าสู่ระบบ (sign-in)** สำหรับผู้ใช้แอปพลิเคชัน
* ทำงานร่วมกับ **API Gateway** และ **Application Load Balancer** ได้อย่างมีประสิทธิภาพ

### Cognito Identity Pool

* เดิมชื่อ **Federated Identity**
* ให้ **AWS credentials ชั่วคราว (temporary AWS credentials)** แก่ผู้ใช้ที่ลงทะเบียนในแอปพลิเคชันของเรา
* ทำให้ผู้ใช้สามารถ **เข้าถึงทรัพยากร AWS บางส่วนโดยตรง**
* มีการ **integrate อย่างแน่นหนากับ Cognito User Pools**

## Cognito vs IAM Users

* คุณอาจสงสัยว่า “เราไม่ได้มีผู้ใช้ใน IAM อยู่แล้วหรือ?”
* คำตอบคือ **มี** แต่ **Cognito ถูกออกแบบสำหรับผู้ใช้แอปพลิเคชันเว็บและมือถือที่อยู่นอก AWS**
* ให้พิจารณา Cognito เมื่อคุณมีคำสำคัญ เช่น **ผู้ใช้จำนวนมาก (hundreds of users), ผู้ใช้มือถือ, หรือการยืนยันตัวตนด้วย SAML**

## สรุป

* Amazon Cognito ให้ **การจัดการตัวตนผู้ใช้** สำหรับเว็บและมือถือ
* ประกอบด้วย **สองส่วนหลัก**:

  * **User Pools** สำหรับการเข้าสู่ระบบ
  * **Identity Pools** สำหรับมอบ AWS credentials ชั่วคราว
* Cognito User Pools ทำงานร่วมกับ **API Gateway และ Application Load Balancer** ได้ดี
* Cognito ถูกออกแบบสำหรับผู้ใช้นอก AWS ต่างจาก **IAM users** ที่ใช้จัดการผู้ใช้ในบัญชี AWS

## Key Takeaways

* Amazon Cognito ให้ **user identity management** สำหรับเว็บและมือถือ
* มีสองส่วนหลัก: **User Pools** และ **Identity Pools**
* User Pools ใช้สำหรับ sign-in และ integrate กับ API Gateway / ALB
* Cognito เหมาะกับผู้ใช้นอก AWS ในขณะที่ IAM users เหมาะกับผู้ใช้ในบัญชี AWS
