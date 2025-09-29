# Serverless

**Serverless** เป็นแนวคิดใหม่ในคลาวด์คอมพิวติ้ง เมื่อผู้พัฒนาใช้บริการแบบ serverless พวกเขาไม่ต้องจัดการเซิร์ฟเวอร์โดยตรง

* ไม่ได้หมายความว่าเซิร์ฟเวอร์หายไป
* เพียงแต่ **การจัดการเซิร์ฟเวอร์ถูกซ่อนจากผู้พัฒนา**
* ผู้พัฒนาแค่ deploy โค้ด มักเป็น **ฟังก์ชัน (functions)**

เดิมที serverless หมายถึง **Function as a Service (FaaS)**

## AWS Lambda

AWS Lambda เป็นผู้บุกเบิกแนวคิด serverless

* Lambda ทำให้ผู้พัฒนาสามารถรันโค้ดโดยไม่ต้องจัดการเซิร์ฟเวอร์
* แนวคิด serverless ปัจจุบันขยายไปยังบริการที่ **จัดการโดยผู้ให้บริการระยะไกล** (remotely managed services)

  * เช่น ฐานข้อมูล, ระบบ messaging, บริการ storage
* **สิ่งที่ Serverless หมายถึง:**

  * ไม่ต้อง provision หรือจัดการเซิร์ฟเวอร์
  * เซิร์ฟเวอร์ยังมีอยู่ แต่ผู้พัฒนาไม่เห็น
  * **บริการ scale อัตโนมัติตามความต้องการ**
  * จ่ายเฉพาะสิ่งที่ใช้จริง

## ตัวอย่างสถาปัตยกรรม AWS Serverless

ตัวอย่างการสร้างแอปแบบ serverless บน AWS:

1. ผู้ใช้เข้าถึง **static content** บน **Amazon S3**
2. การส่งเนื้อหาเร็วขึ้นโดยใช้ **Amazon CloudFront**
3. การจัดการผู้ใช้และการยืนยันตัวตนโดย **Amazon Cognito**
4. ผู้ใช้เรียก **REST API** ผ่าน **Amazon API Gateway**
5. API Gateway **trigger** ฟังก์ชัน **AWS Lambda**
6. Lambda ทำงานกับ **Amazon DynamoDB** เพื่อเก็บและดึงข้อมูล

> สถาปัตยกรรมนี้แสดงให้เห็นการทำงานร่วมกันของบริการ AWS เพื่อสร้างแอปพลิเคชันแบบ serverless เต็มรูปแบบ

## บริการ AWS Serverless เพิ่มเติม

นอกจาก Lambda และ DynamoDB ยังมีบริการ serverless อื่น ๆ เช่น:

* **Amazon S3**: สำหรับจัดเก็บ object และ static content
* **Amazon SNS และ SQS**: บริการ messaging scale อัตโนมัติ
* **Amazon Kinesis Data Firehose**: สำหรับ data streaming ที่ scale ตาม throughput
* **Amazon Aurora Serverless**: ฐานข้อมูล relational ที่ scale ตามต้องการ
* **AWS Step Functions**: บริการ orchestration สำหรับ workflow serverless
* **AWS Fargate**: Serverless compute engine สำหรับ container ไม่ต้อง provision infrastructure

บริการเหล่านี้ช่วยให้ผู้พัฒนามุ่งเน้นไปที่ **logic ของแอป** โดยไม่ต้องจัดการเซิร์ฟเวอร์เบื้องหลัง

## สรุป

* Serverless ทำให้ผู้พัฒนา **ไม่ต้องจัดการเซิร์ฟเวอร์** แม้เซิร์ฟเวอร์ยังมีอยู่
* เดิมหมายถึง **FaaS** ที่ AWS Lambda เป็นผู้บุกเบิก
* ปัจจุบันรวมบริการจัดการอื่น ๆ เช่น database, messaging, storage
* ตัวอย่างสถาปัตยกรรม AWS Serverless:

  * **Lambda, DynamoDB, API Gateway, Cognito, S3, SNS, SQS, Kinesis Data Firehose, Aurora Serverless, Step Functions, Fargate**