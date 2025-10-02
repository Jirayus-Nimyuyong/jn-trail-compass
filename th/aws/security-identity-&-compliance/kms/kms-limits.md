# KMS Limits

KMS เป็นบริการภายใน AWS จึงมีการกำหนด **request quotas** สำหรับ API ต่าง ๆ เช่น การเข้ารหัส (encrypt) หรือถอดรหัส (decrypt)

* หากเกินโควตา จะเจอ **ThrottlingException**
* ข้อความผิดพลาดที่เจอบ่อย:
  `"Status Code: 400; Error Code: ThrottlingException; you are exceeding the rate at which you can call KMS."`

## การจัดการ ThrottlingException

* ใช้เทคนิค **exponential backoff** คือการรอเป็นเวลาที่เพิ่มขึ้นแบบทวีคูณก่อน retry API call

## โควตรวมสำหรับการทำ Cryptographic Operations

* ทุกการทำงานเข้ารหัส เช่น encrypt, decrypt, GenerateDataKey, GenerateRandom **แชร์โควตาเดียวกัน**
* หมายความว่า ทุก service ที่เรียกใช้คีย์ของเรา เช่น AWS S3 ที่ใช้ SSE-KMS จะนับรวมในโควตานี้
* หากใช้เกิน จะเกิด ThrottlingException

## วิธีแก้ปัญหาเพื่อหลีกเลี่ยง Throttling

1. **Data Encryption Key (DEK) Caching**

   * เมื่อใช้ **GenerateDataKey API** ให้เก็บ DEK ไว้ local เพื่อลดจำนวน API calls
   * ฟีเจอร์นี้รวมอยู่ใน **AWS Encryption SDK**

2. **Request Quota Increase**

   * หากโควตาถูกเกินบ่อย ๆ สามารถขอเพิ่มโควตาได้ ผ่าน API หรือ support ticket ของ AWS

## การเข้าใจ Shared Quota

* ทุก cryptographic operation เช่น decrypt, encrypt, GenerateDataKey, GenerateRandom **แชร์โควตาเดียวกัน**
* จำนวนโควตาขึ้นกับ region

ตัวอย่างโควตาสำหรับ **symmetric Customer Master Keys (CMKs)**:

* บาง region: 5,500 requests/sec

* บาง region: สูงสุด 10,000 requests/sec

* บาง region: สูงสุด 30,000 requests/sec

* โควตานี้ **รวมทุก API call ของ cryptographic operations**

* หากถึงขีดจำกัด ต้องขอ **service limit increase** เพื่อเพิ่มโควตา

## สรุป: 3 วิธีจัดการ KMS Throttling

1. **Exponential Backoff** – ใช้เมื่อ throttling เป็นชั่วคราว
2. **ลดจำนวน API Calls** – ใช้ envelope encryption SDK และ DEK caching
3. **Request Limit Increase** – ติดต่อ AWS เพื่อขอโควตาเพิ่ม

## Key Takeaways

* KMS มี **request quotas** สำหรับ cryptographic operations; เกินโควตาจะเจอ ThrottlingException
* ทุก operation แชร์โควตาเดียวกันต่อ account ต่อ region รวมถึง request จาก service เช่น S3 ที่ใช้ SSE-KMS
* วิธีแก้ปัญหา: ใช้ exponential backoff, cache DEK ผ่าน Encryption SDK, หรือขอเพิ่มโควตาจาก AWS
* โควตาแตกต่างกันตาม region: ประมาณ 5,500 – 30,000 requests/sec สำหรับ symmetric CMKs