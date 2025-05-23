# AWS API Gateway

Amazon API Gateway คือบริการ Fully Managed ที่ช่วยให้คุณสร้าง เผยแพร่ รักษาความปลอดภัย และจัดการ API ได้ทั้งแบบ RESTful และ WebSocket โดยไม่ต้องจัดการโครงสร้างพื้นฐานเซิร์ฟเวอร์

## APIs

API Gateway รองรับ 3 รูปแบบหลัก:

* **REST API** – เหมาะกับระบบเดิม รองรับ caching และ stages
* **HTTP API** – Lightweight และราคาถูกกว่า REST API เหมาะกับ use-case ทั่วไป
* **WebSocket API** – สำหรับ real-time communication เช่น chat, gaming

### ขั้นตอนการใช้งาน:

1. สร้าง Resource เช่น `/users`
2. สร้าง Method เช่น `GET`, `POST`
3. เชื่อมกับ Integration เช่น Lambda, HTTP Endpoint หรือ AWS Service
4. Deploy ไปยัง Stage เช่น `dev`, `prod`

### แนวทางแก้ปัญหา:

* **Method Not Allowed:** ตรวจสอบว่ามี Method นั้น ๆ อยู่ใน Resource
* **CORS Error:** เปิดใช้งาน CORS ใน Method Response และ Integration Response

## Custom Domain Names

* ใช้เชื่อม API Gateway กับโดเมนของคุณเอง เช่น `api.example.com`
* รองรับ ACM Certificate และ Route 53 Alias

### แนวทางการกำหนดค่า:

1. สร้าง SSL Certificate ผ่าน ACM
2. เพิ่ม Custom Domain Name ใน API Gateway
3. สร้าง Base Path Mapping ไปยัง API/Stage
4. ตั้งค่า DNS (CNAME หรือ Alias)

## Domain Name Access Associations

* ใช้ควบคุมการเข้าถึงของ IAM Principal กับ Custom Domain
* ตัวอย่างเช่น API จาก Account A เชื่อมผ่าน Custom Domain ของ Account B

## VPC Links

* ใช้สำหรับเชื่อม API Gateway กับ Private Resources ใน VPC เช่น ALB หรือ ECS
* รองรับเฉพาะ **HTTP API** และ **REST API**

### ขั้นตอนการเชื่อมต่อ:

1. สร้าง Network Load Balancer ที่ชี้ไปยัง Private Resource
2. สร้าง VPC Link แล้วเชื่อมกับ NLB
3. ใช้ Integration Type: VPC Link ใน API Gateway

### ข้อควรระวัง:

* อย่าลืม Security Group และ Routing ของ NLB ให้รับจาก API Gateway

## Usage Plans

* ใช้ควบคุม Rate limit และ Quota ต่อ API Key เช่น:

  * `rateLimit: 100 req/sec`
  * `quota: 1,000,000 req/month`

### แนวทางการตั้งค่า:

1. สร้าง Usage Plan
2. ตั้งค่า Rate และ Quota
3. เชื่อมกับ API Stages และ API Keys

### แนวทางปฏิบัติ:

* แยก Plan สำหรับ Free และ Premium Users
* ใช้ร่วมกับ API Key เพื่อติดตามการใช้งานต่อ client

## API Keys

* ใช้ระบุตัวตนของ client สำหรับ track usage และ enforce usage plans
* ไม่ใช้เพื่อ Authentication จริงจัง (ควรใช้ IAM, Cognito หรือ OAuth ร่วมด้วย)

### แนวทางการจัดการ:

1. สร้าง API Key
2. เชื่อมกับ Usage Plan
3. ผูกกับ Stage
4. ลูกค้าต้องส่ง Header `x-api-key`

## Client Certificates

* ใช้สำหรับ Mutual TLS (mTLS) ระหว่าง API Gateway และ backend
* รองรับเฉพาะ REST API

### แนวทางการใช้งาน:

1. สร้าง Client Certificate ใน API Gateway
2. ดาวน์โหลดและติดตั้งใน backend
3. กำหนด Integration ให้ require certificate

## Settings

* ค่าการตั้งค่า API Gateway เช่น:

  * **CloudWatch Logging**: กำหนดระดับ Log `INFO`, `ERROR`
  * **Execution Timeout**: สูงสุด 29 วินาที
  * **Binary Media Types**: สำหรับรองรับ Content-Type เช่น `application/octet-stream`

### แนวทางการตั้งค่า:

* เปิด CloudWatch Logs เพื่อตรวจสอบ error หรือ latency
* ตั้ง Timeout ให้สอดคล้องกับ Lambda/backend
