# CloudWatch Logs Encryption

คุณสามารถเข้ารหัส **CloudWatch Logs** โดยใช้ **AWS Key Management Service (KMS) keys**

* การเข้ารหัสนี้จะถูกตั้งค่า **ระดับ log group** ไม่ใช่ระดับ log stream
* หมายความว่าแต่ละ log group สามารถเชื่อมกับ **Customer Master Key (CMK)** เพื่อเข้ารหัสข้อมูลได้

มี 2 วิธีในการเชื่อม CMK กับ log group:

1. เชื่อม CMK กับ **log group ที่มีอยู่แล้ว**
2. สร้าง **log group ใหม่** และเชื่อม CMK โดยตรง

> แต่การเชื่อมนี้ **ไม่สามารถทำผ่าน CloudWatch console** ได้
> ต้องใช้ **CloudWatch Logs API, AWS CLI, หรือ SDK**
> ในบทเรียนนี้จะสาธิตด้วย CLI

## คำสั่ง CLI สำหรับเชื่อม KMS Key

* **associate-kms-key** : เชื่อม KMS key กับ log group ที่มีอยู่
* **create-log-group** : สร้าง log group ใหม่และเชื่อม KMS key โดยตรง

## การสาธิต: เชื่อม KMS Key กับ log group ที่มีอยู่

1. ใน **CloudWatch Logs console** เลือก log groups

   * ตัวอย่าง: `aws/lambda/hello-world` ยังไม่มี KMS key ID
   * UI **ไม่สามารถเชื่อม KMS key** กับ log group นี้ได้

2. ใช้ CLI เพื่อเชื่อม KMS key

   * ใช้ **KMS key ID** ของ key ที่สร้างไว้แล้ว
   * รันคำสั่ง `associate-kms-key` พร้อม log group name, KMS key ID, และ region

3. หากพบ **"Access Denied"**

   * หมายถึง KMS key มีอยู่แต่ **ยังไม่ได้รับสิทธิ์สำหรับ log group นี้**
   * ต้อง **อัปเดต key policy** ให้ CloudWatch Logs สามารถเข้าถึง key ได้

## การอัปเดต KMS Key Policy

1. เข้าไปที่ **KMS console** แล้วเลือก key ของคุณ
2. ไปที่ **policy view** แล้วแก้ไข key policy
3. เพิ่ม statement ให้ **CloudWatch Logs service** ใช้ key ได้

   * รวมถึง action เช่น: encrypt, decrypt, re-encrypt, generate data key, describe
   * ตัวอย่าง principal: `logs.<region>.amazonaws.com` เช่น `logs.eu-west-2.amazonaws.com`
4. บันทึก policy ที่แก้ไขแล้ว

## การรันคำสั่งเชื่อมใหม่

* หลังแก้ key policy แล้ว **รัน `associate-kms-key` อีกครั้ง**
* ครั้งนี้จะสำเร็จ และ log group จะเชื่อมกับ KMS key
* ตรวจสอบใน console จะเห็น **KMS key ID** แสดงว่า log group ถูกเข้ารหัสเรียบร้อย

## การสร้าง log group ใหม่ที่เข้ารหัส

* ใช้ CLI รัน **`create-log-group`** พร้อม log group name และ KMS key ID
* หลังสร้าง refresh log groups list ใน console จะเห็น log group ใหม่พร้อม KMS key ID

## สรุป

* การเข้ารหัส **CloudWatch Logs** ตั้งค่า **ระดับ log group** โดยใช้ KMS keys
* การเชื่อม KMS key ต้องทำผ่าน **CLI หรือ API** ไม่ใช่ console
* ต้อง **แก้ไข KMS key policy** ให้ CloudWatch Logs service สามารถเข้าถึง key ได้
* มี 2 วิธี:

  1. เชื่อม KMS key กับ log group ที่มีอยู่แล้ว
  2. สร้าง log group ใหม่พร้อมเชื่อม KMS key

> การทำเช่นนี้เป็น **แนวทางปฏิบัติด้านความปลอดภัยที่ดี** โดยให้สิทธิ์ service ผ่าน key policy อย่างชัดเจน

## ประเด็นสำคัญ

* CloudWatch Logs encryption **ตั้งค่า log group level** ด้วย KMS keys
* การเชื่อม KMS key ต้องใช้ **CloudWatch Logs API หรือ CLI**
* แก้ไข **KMS key policy** เพื่อให้ CloudWatch Logs service เข้าถึง key ได้สำคัญมาก
* วิธีทำได้ 2 แบบ:

  1. เชื่อม KMS key กับ log group ที่มีอยู่แล้ว
  2. สร้าง log group ใหม่พร้อมเชื่อม KMS key
