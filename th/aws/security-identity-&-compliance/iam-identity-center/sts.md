# STS Overview

**Security Token Service (STS)** ช่วยให้คุณสามารถขอ **ข้อมูลประจำตัวชั่วคราว (temporary security credentials)** ที่มีอายุสูงสุด **1 ชั่วโมง** ข้อมูลประจำตัวเหล่านี้ทำให้สามารถเข้าถึง **AWS resources** ได้โดยตรง การเข้าใจ **STS API** ที่สำคัญเป็นสิ่งจำเป็นสำหรับการสอบ **AWS Certified Developer**

## STS API Calls สำคัญ

* **AssumeRole**: ใช้เพื่อสวมบทบาท (role) ภายในบัญชี AWS ของคุณเอง หรือข้ามบัญชี ซึ่งเป็นฟังก์ชันพื้นฐาน
* **AssumeRoleWithSAML**: ให้ผู้ใช้ที่เข้าสู่ระบบด้วย **SAML** สามารถขอข้อมูลประจำตัวชั่วคราว
* **AssumeRoleWithWebIdentity**: คืนค่า role สำหรับผู้ใช้ที่เข้าสู่ระบบด้วย **identity provider** เช่น Facebook, Google หรือ OIDC provider (แต่ปัจจุบันมักใช้ Cognito Identity Pools แทน)
* **GetSessionToken**: ใช้เมื่อผู้ใช้หรือบัญชี root ของ AWS เปิดใช้งาน **MFA**
* **GetFederationToken**: ดึงข้อมูลประจำตัวชั่วคราวสำหรับผู้ใช้ federated
* **GetCallerIdentity**: คืนค่ารายละเอียดของ IAM user หรือ role ที่เรียกใช้งาน API ใช้เพื่อตรวจสอบตัวตน
* **DecodeAuthorizationMessage**: ถอดรหัสข้อความ error เมื่อการเรียก AWS API ถูกปฏิเสธ

> API ที่สำคัญสำหรับการสอบ: **AssumeRole, GetSessionToken, GetCallerIdentity, DecodeAuthorizationMessage**

## วิธีการทำงานของ AssumeRole

1. สร้าง **IAM Role** ในบัญชี AWS ของคุณ หรือบัญชีอื่นหากต้องการเข้าถึงข้ามบัญชี
2. กำหนด **principals** ที่สามารถเข้าถึง role ผ่าน **IAM policy**
3. เรียกใช้ **AssumeRole API** ของ STS เพื่อสวมบทบาท IAM role
4. STS จะคืน **temporary credentials** ใช้ได้ตั้งแต่ 15 นาที ถึง 1 ชั่วโมง

## Workflow ของ AssumeRole

1. ผู้ใช้ร้องขอการเข้าถึง role ภายในบัญชีเดียวกันหรือบัญชีอื่น
2. ผู้ใช้เรียก **AssumeRole API**
3. STS ตรวจสอบสิทธิ์
4. STS คืนค่า **temporary credentials**
5. ผู้ใช้สามารถทำงานในบทบาทนั้นได้โดยใช้ข้อมูลประจำตัวชั่วคราว

## การเข้าถึงข้ามบัญชี (Cross-Account Access)

1. สร้าง role ในบัญชีปลายทาง
2. กำหนดสิทธิ์ที่ถูกต้องทั้งบัญชีต้นทางและบัญชีปลายทาง
3. ใช้ **AssumeRole API** เพื่อเข้าถึงบัญชีปลายทาง

* ตัวอย่าง: หาก role อนุญาตให้เข้าถึง **S3 bucket** คุณสามารถเข้าถึง bucket นั้นจากบัญชีของคุณโดยใช้ **assumed role credentials**

## STS กับ Multi-Factor Authentication (MFA)

* ใช้ **GetSessionToken API** หลังจากเข้าสู่ระบบด้วย MFA device
* API จะคืนค่า **temporary credentials** ประกอบด้วย:

  * Access Key ID
  * Secret Access Key
  * Session Token (ต้องใช้ในการเรียก API)

### IAM Policy สำหรับ MFA

* ต้องมี condition: `aws:MultiFactorAuthPresent:true`
* ตัวอย่าง: role อนุญาตให้ **stop/terminate instance** ได้ก็ต่อเมื่อ MFA ถูกเปิดใช้งาน
* เงื่อนไขนี้ช่วยให้การทำงานที่สำคัญปลอดภัยมากขึ้น

## รายละเอียด GetSessionToken

* Access Key ID
* Secret Access Key
* Session Token
* เวลา **หมดอายุ** ของ credentials (ใช้ในการต่ออายุ)

## สรุป

* STS ให้ **temporary security credentials** สูงสุด 1 ชั่วโมง สำหรับเข้าถึง AWS resources
* STS API สำคัญ: **AssumeRole, GetSessionToken, GetCallerIdentity, DecodeAuthorizationMessage**
* **AssumeRole** ช่วยให้ผู้ใช้สวมบทบาท IAM role ภายในบัญชีเดียวกันหรือข้ามบัญชี
* **GetSessionToken** ใช้กับ MFA เพื่อรับ session token พร้อมเงื่อนไข IAM ที่บังคับให้ MFA ถูกเปิดใช้งาน