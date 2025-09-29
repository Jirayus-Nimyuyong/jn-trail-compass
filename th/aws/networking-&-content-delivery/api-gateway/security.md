# Security

## 1. การใช้ IAM Permissions เพื่อเข้าถึง API Gateway

วิธีแรกคือการใช้ **IAM Permissions** ในการเข้าถึง API Gateway

* ต้องแนบ **IAM Policy** กับผู้ใช้หรือ IAM Role เพื่อให้สามารถเรียกใช้งาน API Gateway ได้
* **Authentication** จัดการโดย IAM และ **Authorization** ถูกกำหนดโดย IAM Policy
* เหมาะกับการใช้งานภายใน AWS Account ของเรา เช่น EC2, Lambda, IAM Users

**การทำงาน:**

* ใช้ **Signature Version 4 (SigV4)** ในการส่ง IAM Credentials ใน HTTP headers
* ตัวอย่าง: API Gateway ถูก Deploy ไปยัง Stage และตั้งค่าใช้ IAM Permissions

  * Client ส่ง REST API request พร้อม SigV4 headers
  * API Gateway ตรวจสอบสิทธิ์กับ IAM Policy
  * หากผ่าน → API Gateway เรียก Lambda backend และส่งผลลัพธ์กลับให้ Client

## 2. Resource Policies

* Resource Policies คล้ายกับ Lambda resource policies
* ใช้กำหนดว่า **ใครหรืออะไรสามารถเข้าถึง API Gateway ได้**
* เหมาะกับ **Cross-account access**
* สามารถกรองการเข้าถึงด้วย **IP address** หรือจำกัดเข้าผ่าน **VPC Endpoint**
* เพิ่มการควบคุมความปลอดภัยอีกชั้นนอกเหนือจาก IAM

## 3. Cognito User Pools

* จัดการ **ฐานข้อมูลผู้ใช้และวงจรชีวิตผู้ใช้**
* Cognito ออก **Tokens** ที่หมดอายุอัตโนมัติ
* API Gateway ตรวจสอบตัวตนของผู้ใช้ด้วย **Cognito Tokens** โดยไม่ต้องเขียนโค้ดเอง

**การทำงาน:**

1. ผู้ใช้ยืนยันตัวตนกับ Cognito User Pool เพื่อรับ Token
2. ส่ง Token ไปยัง API Gateway ใน API Request
3. API Gateway ตรวจสอบ Token กับ Cognito
4. หาก Token ถูกต้อง → อนุญาตเข้าถึง Lambda backend

* การกำหนดสิทธิ์ (Authorization) ถูกตั้งค่าที่ระดับ Method ของ API Gateway

## 4. Lambda Authorizer (Custom Authorizer)

* Token-based authorization แบบยืดหยุ่นที่สุด แต่ต้องทำเอง
* ใช้ **Bearer Tokens** เช่น JWT หรือ OAuth tokens
* Request parameters, headers, หรือ query strings ถูกส่งไปยัง Lambda Authorizer
* Lambda ประเมิน Token และส่งกลับ **IAM Policy** ให้ API Gateway
* Policy นี้ถูก **cache** เพื่อประสิทธิภาพ

**Flow:**

1. Client ยืนยันตัวตนกับ Third-party เช่น Auth0 → ได้ Token
2. ส่ง Token ไป API Gateway
3. API Gateway เรียก Lambda Authorizer เพื่อตรวจสอบ Token
4. หาก Token ถูกต้อง → Lambda Authorizer ส่ง IAM principal + policy (cache)
5. API Gateway เรียก Lambda backend

## การตั้งค่าใน Console

* เลือก Resource → Method → Method Request → ตั้ง **Authorization Type**

  * IAM → ใช้ SigV4 ตรวจสอบ IAM Users/Role
* Resource Policies → กำหนด Cross-account, IP blacklist, VPC whitelist
* Authorizers → สามารถสร้างใหม่ได้

  1. Lambda Authorizer → กำหนด Lambda + Cache
  2. Cognito User Pool → กำหนด ARN ของ User Pool

## สรุปสำหรับการสอบ (Exam Prep)

* **IAM Permissions** → ดีสำหรับผู้ใช้และ Role ภายใน AWS Accounts
* **Resource Policies** → ใช้สำหรับ cross-account access และกรอง IP/VPC
* **Lambda Authorizers** → เหมาะสำหรับ Third-party auth ต้องเขียน logic เอง
* **Cognito User Pools** → จัดการ token verification อัตโนมัติ ไม่ต้องเขียนโค้ดเอง

## Key Takeaways

* **IAM Permissions** → ปลอดภัยที่สุดสำหรับ AWS Accounts ใช้ SigV4
* **Resource Policies** → ควบคุม cross-account access และ IP/VPC filtering
* **Cognito User Pools** → จัดการวงจรชีวิตผู้ใช้และตรวจสอบ Token โดยไม่ต้องเขียนโค้ด
* **Lambda Authorizers** → ยืดหยุ่น ใช้ token-based auth ต้องเขียน Lambda และรองรับระบบ Authentication ภายนอก