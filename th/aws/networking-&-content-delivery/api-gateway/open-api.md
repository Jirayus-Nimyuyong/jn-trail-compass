# API Gateway - Open API spec

API Gateway มีการทำงานร่วมกับ **OpenAPI specification** อย่างแนบแน่น

## OpenAPI Specification คืออะไร?

OpenAPI เป็นมาตรฐานที่ใช้กันอย่างแพร่หลายในการกำหนด **REST API** โดยที่ **การกำหนด API จะอยู่ในรูปแบบของโค้ด**

* คุณสามารถสร้างสเปกนี้โดยใช้ **OpenAPI model 3.0** แล้วนำเข้า (import) ไปยัง API Gateway
* ภายในสเปกนี้ คุณสามารถกำหนด:

  * methods
  * method request
  * integration request
  * method response
  * รวมถึง AWS extensions ที่สามารถตั้งค่าให้กับ API Gateway

คุณสามารถกำหนดการตั้งค่าทั้งหมดของ AWS extensions เหล่านี้ได้โดยตรงจากในไฟล์สเปก

นอกจากนี้ นอกจากจะนำสเปกเข้ามาใน API Gateway ได้แล้ว คุณยังสามารถ **ส่งออก (export)** API ที่มีอยู่ใน API Gateway ให้อยู่ในรูปแบบ **OpenAPI specification** ได้ด้วย

## ทำไมต้องทำแบบนี้?

เพราะสเปกนี้สามารถนำไปใช้เพื่อ **สร้าง client code อัตโนมัติ** ได้

* OpenAPI specification เขียนได้ทั้งแบบ **YAML** และ **JSON**
* เมื่อใช้แล้ว คุณสามารถสร้าง **client SDK** ได้ทันที

นอกจากนี้ ยังมี **one-to-one mapping** ระหว่าง API Gateway และ OpenAPI specification

## Request Validation ด้วย OpenAPI

คุณสามารถใช้ OpenAPI specification เพื่อทำ **request validation** ภายใน API Gateway ได้

แนวคิดคือ:

* แทนที่จะส่ง payload ตรงไปยัง backend ทันที
* API Gateway จะตรวจสอบก่อนว่า payload นั้นเป็นไปตาม schema ที่กำหนดหรือไม่

ถ้า payload ไม่ตรงตาม validation → **API Gateway จะตอบกลับ 400 error ทันที** ทำให้ลดจำนวนคำขอที่ไม่จำเป็นที่จะไปถึง backend

สิ่งที่สามารถตรวจสอบได้ เช่น:

* ตรวจสอบว่า request parameters อยู่ใน URI หรือ query string หรือไม่
* ตรวจสอบว่า headers มีอยู่จริงและไม่ว่างเปล่า
* ตรวจสอบว่า payload ตรงตาม **JSON Schema model** ที่กำหนดสำหรับ method นั้นหรือไม่

สิ่งนี้ช่วยให้มั่นใจว่า backend จะไม่เจอปัญหาในการ parse และใช้ payload ที่รับมา

## วิธีการตั้งค่า Request Validation

* คุณต้องสร้างไฟล์ **OpenAPI definitions file**
* ภายในไฟล์ให้ใส่ **x-amazon-apigateway-request-validator extension**

ในนั้นคุณสามารถกำหนดสิ่งที่จะตรวจสอบได้ เช่น:

* ตรวจสอบ body
* ตรวจสอบ parameters
* เลือกว่าจะใช้กับ methods ทั้งหมดหรือเฉพาะบาง method

**ตัวอย่าง:**

* เปิดใช้ validator ที่ตรวจสอบเฉพาะ parameters บนทุก methods
* หรือเปิด validator แบบครบ (body + parameters) เฉพาะ method `POST /validation`

สิ่งนี้ให้ความยืดหยุ่นในการตรวจสอบข้อมูลตามที่คุณต้องการบน API

## สรุปสิ่งสำคัญ (Key Takeaways)

* API Gateway ทำงานร่วมกับ OpenAPI specification ได้อย่างแนบแน่น ทำให้สามารถกำหนด API ได้เหมือนเขียนโค้ด
* OpenAPI specification สามารถ import หรือ export เข้า/ออกจาก API Gateway ได้ในรูปแบบ **YAML** หรือ **JSON**
* OpenAPI specification ทำให้ API Gateway สามารถทำ **request validation** ได้ → ลดการเรียก backend โดยไม่จำเป็น เพราะ reject request ที่ไม่ถูกต้องตั้งแต่ต้น
* การตรวจสอบ (validation) สามารถปรับแต่งได้ยืดหยุ่นต่อ method แต่ละตัว เช่น ตรวจสอบ parameters, headers หรือ payload โดยใช้ `x-amazon-apigateway-request-validator`