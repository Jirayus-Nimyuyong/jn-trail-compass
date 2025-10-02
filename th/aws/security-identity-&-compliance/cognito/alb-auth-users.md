# Application Load Balancer - User Authentication

เราทราบกันดีว่าสามารถใช้ **Amazon Cognito** ร่วมกับ **API Gateway** เพื่อยืนยันตัวตนผู้ใช้ได้ แต่จริง ๆ แล้วสามารถทำเช่นเดียวกันกับ **Application Load Balancer (ALB)** ได้ด้วย ALB สามารถยืนยันตัวตนผู้ใช้อย่างปลอดภัย ทำให้แอปพลิเคชันไม่ต้องรับผิดชอบเรื่องนี้โดยตรง และสามารถมุ่งเน้นไปที่ **business logic** ของตัวเองได้

## วิธีการยืนยันตัวตนที่ ALB รองรับ

คุณสามารถยืนยันตัวตนผู้ใช้ด้วย ALB ได้หลายวิธี เช่น

* **ผู้ให้บริการยืนยันตัวตนที่รองรับ OpenID Connect (OIDC)**
* **Cognito User Pools**

Cognito User Pools รองรับผู้ให้บริการ **social identity** เช่น Amazon login, Facebook login, Google login และยังรองรับ **corporate identity** ที่เข้ากันได้กับ SAML, LDAP หรือ Microsoft Active Directory

มีสองตัวเลือกหลัก:

1. **เชื่อมต่อโดยตรงกับ OIDC-compliant identity provider** โดยไม่ใช้ Cognito User Pools
2. **ใช้ Cognito User Pools**

## การตั้งค่าการยืนยันตัวตนบน ALB

* ต้องตั้งค่า **HTTPS listener** (ตัว S หมายถึง secure)
* จากนั้นกำหนด **rules** เป็น `authenticate-oidc` หรือ `authenticate-cognito`
* ใน ALB listener จะมี **default action** ให้ authenticate ก่อน แล้วจึง forward request ไปยัง backend

## การจัดการผู้ใช้ที่ยังไม่ได้ authenticate

มี 3 ตัวเลือก:

1. **Authenticate** – ตัวเลือกเริ่มต้น ให้ผู้ใช้ทำการยืนยันตัวตน
2. **Deny** – ปฏิเสธ request โดยตรง
3. **Allow** – อนุญาตให้ request ผ่านโดยไม่ต้อง authenticate

   * ตัวเลือก Allow เหมาะสำหรับ **login page** เพราะผู้ใช้ต้องเข้าถึงได้โดยไม่ต้อง authenticate ก่อน

## ตัวอย่าง: ALB กับ Amazon Cognito Integration

* สมมติ ALB เชื่อมกับ **Amazon ECS**
* ต้องการให้ผู้ใช้ login ผ่าน Amazon Cognito
* เมื่อผู้ใช้ทำ **GET request ไปที่ /api/data**

  * ALB ตั้งค่า HTTPS และ action เป็น `authenticate-cognito`
  * Cognito ยืนยันตัวตนผู้ใช้
  * Request payload จะถูกส่งต่อไปยัง ECS พร้อมข้อมูลผู้ใช้จาก Cognito
* ทำให้แอปพลิเคชันสามารถ **ใช้ข้อมูลผู้ใช้ตอบสนองแบบเฉพาะบุคคล** ได้

## การตั้งค่า Cognito User Pools สำหรับ ALB

1. เข้าไปที่ **ALB user interface**
2. สร้าง **Cognito User Pool, client, และ domain**
3. ตรวจสอบให้ **ID token (JWT)** ถูกส่งกลับ (ค่า default ของ Cognito)
4. เชื่อมต่อ User Pool กับ social/corporate identity provider (ถ้าต้องการ)
5. ตั้งค่า **URL redirection และ callback URLs** สำหรับ User Pool
6. เชื่อม User Pool กับ ALB สำหรับ app client ที่เฉพาะเจาะจง

## การใช้ OIDC Authentication กับ ALB

* หากใช้ **OIDC โดยไม่ใช้ Cognito** จะต้องทำงานเพิ่มเล็กน้อย
* สามารถเชื่อมต่อกับ **OIDC-compliant identity provider ใดก็ได้**

**Flow:**

1. ผู้ใช้ทำ HTTP request
2. ALB redirect ไปยัง authentication endpoint ของ identity provider
3. ผู้ให้บริการยืนยันตัวตนส่ง **authorization code**
4. ALB ส่ง code ไปที่ **token endpoint**
5. แลก code เป็น **ID token และ access token**
6. ALB ขอ **user claims** จาก user info endpoint โดยใช้ access token
7. User claims เช่น **user ID และ attributes**
8. Request ส่งไปยัง ECS พร้อมข้อมูลผู้ใช้
9. Response ส่งกลับไปยังผู้ใช้

**การตั้งค่าเพิ่มเติมสำหรับ OIDC:**

* Authorization endpoint
* Token endpoint
* User info endpoint
* Client ID และ client secret
* URL redirection ที่ถูกต้อง

## สรุป

คุณสามารถยืนยันตัวตนผู้ใช้ผ่าน ALB ได้ 2 วิธี:

1. ใช้ **Cognito User Pools**
2. เชื่อมตรงกับ **OIDC-compliant identity providers**

ทั้งสองวิธีช่วยให้ ALB ยืนยันตัวตนผู้ใช้อย่างปลอดภัย และส่งข้อมูลผู้ใช้ไปยัง backend เช่น Amazon ECS

## Key Takeaways

* ALB สามารถ **ยืนยันตัวตนผู้ใช้อย่างปลอดภัย** ลดภาระของแอปพลิเคชัน
* รองรับการยืนยันตัวตนผ่าน **OIDC-compliant identity providers หรือ Cognito User Pools**
* การตั้งค่า ALB authentication ต้องใช้ **HTTPS listener และกฎการ authenticate**
* การใช้ Cognito ทำให้ **ยืนยันตัวตนง่ายขึ้น และส่งข้อมูลผู้ใช้ไปยัง backend ได้ทันที**