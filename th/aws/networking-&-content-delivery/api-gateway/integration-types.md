# API Gateway Integration Types & Mappings

## ประเภทของ API Gateway Integration และการทำงานกับ Mapping

ในการบรรยายนี้ เราจะพูดถึงวิธีการต่าง ๆ ที่ API Gateway ใช้เชื่อมต่อกับบริการ Backend การทำความเข้าใจประเภทของ Integration เหล่านี้เป็นสิ่งสำคัญสำหรับการตั้งค่า API Gateway อย่างมีประสิทธิภาพ

## MOCK Integration

**MOCK integration** จะส่งค่าตอบกลับโดยไม่ต้องส่งคำขอไปยัง backend เหมาะสำหรับการพัฒนาและทดสอบเมื่อ backend ยังไม่มีการพัฒนาเสร็จสมบูรณ์ แต่ไม่เหมาะสำหรับการใช้งานจริง (Production)

## HTTP และ AWS Lambda Integration

API Gateway สามารถส่งคำขอไปยัง **HTTP endpoint** หรือ **AWS Lambda** ได้

* ในกรณีนี้ ต้องกำหนดทั้ง *integration request* และ *integration response*
* สามารถใช้ **mapping templates** เพื่อแก้ไขคำขอที่ส่งไป backend และคำตอบที่ส่งกลับมาถึง client
* Mapping templates ทำให้เราสามารถเปลี่ยนชื่อ ฟิลด์ หรือโครงสร้างข้อมูลให้ backend เข้าใจได้

**ตัวอย่าง**: เมื่อสร้าง REST API เราสามารถ map การเรียก REST API ให้กลายเป็นการเรียก API ของ **SQS Queue** ได้ เพียงปรับรูปแบบของ request ให้เหมาะสม

## AWS Lambda Proxy Integration

ใน **Lambda Proxy integration** คำขอจาก client จะถูกส่งตรงไปยัง Lambda function โดยไม่ถูกแก้ไข (ไม่มี mapping templates)

* Lambda function จะต้องรับผิดชอบการประมวลผลคำขอและสร้าง response เอง
* ข้อมูลที่ Lambda ได้รับจะมีรายละเอียด เช่น resource, path, HTTP method, headers, query string parameters, stage variables และ body
* Lambda ต้องส่งค่าตอบกลับพร้อม **status code, headers และ body**
* API Gateway ทำหน้าที่เป็นเพียง proxy ที่ส่งคำขอและคำตอบผ่านไปมา

## HTTP Proxy Integration

คล้ายกับ Lambda Proxy แต่เป็นการส่งต่อคำขอไปยัง backend **HTTP endpoint** โดยตรง โดยไม่มีการแก้ไขข้อมูล

* คำตอบจาก backend จะถูกส่งกลับไปยัง client ตรง ๆ
* API Gateway สามารถใส่ **HTTP header** เพิ่มเติม (เช่น API key) ระหว่าง Gateway และ backend ได้ เพื่อความปลอดภัย โดย client จะไม่ทราบถึงรายละเอียดนี้

**ตัวอย่าง**: Client ส่ง HTTP request → API Gateway → Backend (เช่น Application Load Balancer) โดย API Gateway สามารถเพิ่ม API key เพื่อยืนยันตัวตนกับ backend ได้

## Mapping Templates

Mapping templates จะใช้ได้เฉพาะกรณีที่ Integration **ไม่ใช่ proxy mode**

* ใช้สำหรับแก้ไข request/response เช่น เปลี่ยนชื่อ query string parameters, แก้ไข body content, เพิ่ม/เปลี่ยน headers
* ใช้ **Velocity Template Language (VTL)** ซึ่งรองรับโครงสร้างเชิงโปรแกรม เช่น loop และ conditional statements ทำให้สามารถแปลงข้อมูลที่ซับซ้อนได้
* ต้องกำหนด **Content-Type** เป็น `application/json` หรือ `application/xml`

## กรณีศึกษา: การเชื่อมต่อกับ SOAP API

* SOAP ใช้ **XML** แต่ REST API ส่วนใหญ่ใช้ **JSON**
* API Gateway สามารถใช้ mapping templates แปลง JSON → XML (SOAP message) และแปลง XML response → JSON
* ขั้นตอน: API Gateway จะดึงข้อมูลจาก path, payload หรือ headers → สร้าง SOAP message → เรียก SOAP service → รับ XML response → แปลงกลับเป็น JSON เพื่อตอบ client

## ตัวอย่าง: Mapping Query String Parameters

สมมติว่า client ส่งคำขอ:

```cli
?name=foo&other=bar
```

และ API Gateway เชื่อมกับ Lambda (ไม่ใช่ proxy)

* Mapping template สามารถเปลี่ยนชื่อ parameter ก่อนส่งไปที่ Lambda ได้
* เช่น แปลง `name` → `foo` และ `other` → `bar`
* ทำให้ Lambda ได้รับข้อมูลในรูปแบบที่เหมาะสมกับโครงสร้างที่ต้องการ
Mapping Example: Query String parameters

## สรุปสิ่งสำคัญ (Key Takeaways)

* API Gateway รองรับ Integration หลายประเภท ได้แก่ MOCK, HTTP, AWS Lambda, และ HTTP Proxy
* **Mapping templates** ใช้สำหรับแก้ไขและแปลง request/response เช่น การแปลง JSON ↔ XML สำหรับ SOAP API
* **Proxy integrations** จะส่งข้อมูลตรง ๆ โดยไม่แก้ไข ทำให้ backend ต้องจัดการเองทั้งหมด
* **Velocity Template Language (VTL)** เป็นภาษาสคริปต์ที่ใช้ใน mapping templates เพื่อควบคุมการแปลงข้อมูล