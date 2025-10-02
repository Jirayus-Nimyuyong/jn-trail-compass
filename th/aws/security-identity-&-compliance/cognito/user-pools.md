# Cognito User Pools

**Cognito User Pools (CUP)** เป็นบริการที่ให้ **ฐานข้อมูลแบบ serverless** สำหรับผู้ใช้เว็บและแอปพลิเคชันมือถือของคุณ

## ฐานข้อมูลแบบ Serverless คืออะไร?

* หมายถึงผู้ใช้สามารถ **ยืนยันตัวตน (authenticate)** ด้วยข้อมูลล็อกอินง่าย ๆ เช่น **username หรือ email + password** เพื่อเข้าถึงแอปของคุณ
* Cognito User Pools ยังรองรับการ **รีเซ็ตรหัสผ่าน (password reset)**
* รองรับการ **ยืนยันอีเมลและเบอร์โทรศัพท์, Multi-Factor Authentication (MFA), และ Federated Identities** ให้ผู้ใช้ล็อกอินผ่านผู้ให้บริการ เช่น Google, Facebook หรือ SAML

## Federated Identities

* Federated Identities ช่วยให้ผู้ใช้ล็อกอินผ่าน **third-party identity providers** เช่น Google หรือ Facebook
* เป็นรูปแบบการล็อกอินแบบที่เห็นทั่วไปบนเว็บไซต์: สร้าง username/password หรือใช้ social login
* มีฟีเจอร์ด้านความปลอดภัย: **บล็อกผู้ใช้ที่มี credential ถูก compromise** AWS ตรวจสอบ credential ที่ถูก compromise ทั่วเว็บและแจ้ง Cognito User Pools

## Authentication Tokens

* เมื่อผู้ใช้ล็อกอินผ่าน Cognito User Pools API จะส่ง **JSON Web Token (JWT)**
* JWT นี้ใช้สำหรับ **ยืนยันตัวตนในคำขอถัดไป**

## สถาปัตยกรรมของ Cognito User Pools

* Cognito User Pools มี **ฐานข้อมูลผู้ใช้ภายใน**
* แอปเว็บและมือถือทำการ authenticate กับ user pool
* หลังจากล็อกอินสำเร็จ ผู้ใช้จะได้รับ **JWT** จาก pool

## Social และ Third-Party Logins

* รองรับการล็อกอินผ่านผู้ให้บริการ Social เช่น **Amazon, Google, Facebook**
* รองรับ **SAML และ OpenID Connect** สำหรับ identity providers ที่รองรับ OpenID Connect

## การเชื่อมต่อ AWS กับ Cognito User Pools

### API Gateway Integration

* ผู้ใช้ authenticate กับ Cognito User Pool และได้รับ **JWT**
* JWT จะถูกส่งไปยัง **API Gateway** เพื่อ **ตรวจสอบ token** ก่อนให้สิทธิ์เข้าถึง backend services

### Application Load Balancer Integration

* ใช้ **ALB listeners และ rules** เพื่อ authenticate ผู้ใช้กับ Cognito User Pools
* หลังจาก authenticate สำเร็จ request จะถูกส่งต่อไปยัง **backend target groups** เช่น EC2, Lambda, หรือ ECS containers

## Cognito User Pools – อื่น ๆ

## Lambda Triggers ใน Cognito User Pools

* Cognito User Pools รองรับ **Lambda triggers** เพื่อเรียกใช้งานฟังก์ชัน Lambda แบบ synchronous เมื่อเกิดเหตุการณ์เฉพาะ

* Trigger ที่สำคัญเกี่ยวข้องกับ **authentication events** เช่น

  * **Pre-authentication**
  * **Post-authentication**
  * **Pre-token generation**

* ตัวอย่าง: Lambda trigger สามารถ **ยอมรับหรือปฏิเสธการ sign-in**, บันทึกเหตุการณ์หลังการ authenticate สำเร็จสำหรับการวิเคราะห์, หรือปรับแต่งและลบ/เพิ่ม claims ใน token

* สำหรับ **sign-up process** มี trigger:

  * **Pre sign-up**
  * **Post confirmation**
  * **Migrate user**

* ใช้ส่ง **ข้อความต้อนรับ (welcome messages)** หรือบันทึกเหตุการณ์หลังผู้ใช้สมัครสำเร็จ

* สามารถปรับแต่ง **ข้อความส่งถึงผู้ใช้** และแก้ไข **token creation** ได้ เช่น เพิ่มหรือลบ attributes ใน ID token

## Hosted Authentication UI

* Cognito User Pools มี **hosted authentication UI** ช่วยให้ไม่ต้องเขียน UI ในแอปเอง
* UI นี้จัดการ **sign-up และ sign-in workflow**
* รองรับการ **social login, OpenID Connect (OIDC), และ SAML**
* สามารถปรับแต่งด้วย **logo และ CSS** ให้ตรงกับ branding ของเว็บไซต์

## Custom Domains สำหรับ Hosted UI

* หากต้องการใช้ **domain ของตัวเอง** ต้องตั้งค่า **custom domain**
* การใช้ custom domain ต้องมี **HTTPS certificate** ใน **AWS Certificate Manager (ACM)** อยู่ใน region **us-east-1**
* domain นี้ต้องกำหนดใน **app integration section** ของ Cognito User Pools เพื่อให้ configuration ใช้กับทุก app client

## Adaptive Authentication

* ผู้ใช้สามารถ sign-in ด้วย username/password ปกติ
* หากการ sign-in ถูกประเมินว่า **น่าสงสัย**, ระบบสามารถ **บล็อกหรือเรียกใช้ MFA**
* Cognito จะให้ **risk score** เป็น low, medium, หรือ high
* ถ้า risk score สูง อาจต้อง **ยืนยันด้วย MFA**

  * ตัวอย่าง: login จาก device/location ปกติ → ใช้ password ปกติ
  * login จาก location ใหม่ → ต้อง MFA
* Risk score ประเมินจาก **device recognition, location, IP, และอื่น ๆ**
* หาก credential ถูก compromise ระบบป้องกัน account takeover จะใช้ **phone และ email verification**
* กิจกรรมทั้งหมดถูกบันทึกใน **CloudWatch**

## JSON Web Tokens (JWT) ใน Cognito User Pools

* เมื่อผู้ใช้ login ผ่าน Cognito User Pools ระบบจะส่ง **JWT**
* Token เป็น **Base64 encoded** มี 3 ส่วน:

  1. Header
  2. Payload
  3. Signature
* **Payload** มีข้อมูลสำคัญเกี่ยวกับผู้ใช้
* เพื่อตรวจสอบความถูกต้อง ต้อง **verify signature** หาก signature ถูกต้อง payload เชื่อถือได้
* Payload ประกอบด้วย:

  * **sub UUID**: user ID ใน Cognito User Pool
  * ข้อมูลเพิ่มเติม เช่น email, given name, phone number, custom attributes
  * Fields อื่น ๆ: username, Cognito groups, เวลา token หมดอายุ
* หากต้องการข้อมูลเพิ่ม สามารถ query **Cognito user pool database** โดยใช้ user ID

## สรุป

* Cognito User Pools เป็น **serverless database** สำหรับจัดการผู้ใช้เว็บและมือถือ
* รองรับการ **authentication** ด้วย username/password, social logins, และ federated identities (SAML, OpenID Connect)
* ฟีเจอร์ประกอบด้วย: password reset, email/phone verification, MFA, และ compromised credential blocking
* สามารถ integrate กับ **AWS API Gateway และ ALB** เพื่อให้เข้าถึง backend ได้อย่างปลอดภัย
* Cognito User Pools รองรับ **Lambda triggers**, **hosted UI**, **custom domains**, **adaptive authentication**, และ **JWT token structure**
* ทำให้สามารถสร้างระบบ authentication ที่ **ยืดหยุ่นและปรับแต่งได้** สำหรับแอปพลิเคชัน

## Key Takeaways

* Cognito User Pools (CUP) เป็น serverless database สำหรับจัดการผู้ใช้
* รองรับ authentication ผ่าน username/password, social logins และ federated identities
* ฟีเจอร์สำคัญ: password reset, email/phone verification, MFA, และ credential compromise blocking
* Integrate กับ API Gateway และ ALB เพื่อเข้าถึง backend อย่างปลอดภัย
* Lambda triggers ช่วยเรียกใช้งาน Lambda ใน **authentication และ sign-up events**
* Hosted authentication UI ปรับแต่งได้, รองรับ **social logins, OIDC, และ SAML**
* Custom domains ต้องมี **HTTPS certificate** ใน ACM region **us-east-1**
* Adaptive authentication ประเมิน **risk score** เพื่อเรียกใช้ MFA เมื่อมีพฤติกรรม login น่าสงสัย
