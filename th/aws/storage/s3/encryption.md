# Amazon S3 – Object Encryption

คุณสามารถเข้ารหัส **object** ใน S3 ได้หลายวิธี ดังนี้:

1. **Server-side encryption (SSE)** มีหลายประเภท:

   * **SSE-S3** → ใช้กุญแจที่ AWS จัดการให้
   * **SSE-KMS** → ใช้กุญแจจาก AWS KMS (Key Management Service)
   * **SSE-C** → ใช้กุญแจที่ลูกค้าให้เอง
2. **Client-side encryption** → เข้ารหัสที่ฝั่งลูกค้าก่อนอัปโหลด

## SSE-S3: Server-Side Encryption ด้วย S3-Managed Keys

* ใช้ **AES-256**
* กุญแจถูกจัดการโดย AWS และคุณไม่สามารถเข้าถึงกุญแจนี้ได้
* เปิดใช้งาน SSE-S3 ด้วย header:

  ```cli
  x-amz-server-side-encryption: AES256
  ```

* **SSE-S3 ถูกเปิดโดยค่าเริ่มต้น** สำหรับ bucket และ object ใหม่

**ขั้นตอนการทำงาน**

1. ผู้ใช้ส่งไฟล์พร้อม header ที่ถูกต้อง
2. S3 สร้าง object
3. AWS จับคู่ object กับกุญแจที่จัดการโดย S3
4. ทำการเข้ารหัสแล้วเก็บไฟล์เข้าบัคเก็ต

## SSE-KMS: Server-Side Encryption ด้วย AWS KMS Keys

* คุณสามารถ **ควบคุมกุญแจเอง** ผ่าน AWS KMS
* ข้อดี:

  * ควบคุมการเข้าถึงกุญแจได้
  * มีการบันทึกการใช้กุญแจผ่าน **CloudTrail**
* เปิดใช้งานด้วย header:

  ```cli
  x-amz-server-side-encryption: aws:kms
  ```

  (สามารถระบุกุญแจ KMS ได้)

**ขั้นตอนการทำงาน**

1. อัปโหลด object พร้อมระบุ KMS key
2. AWS ใช้กุญแจ KMS เพื่อเข้ารหัส object
3. การอ่านไฟล์ต้องมีสิทธิ์ทั้ง object และ KMS key

**ข้อจำกัด**

* ต้องใช้ API ของ KMS เช่น `GenerateDataKey` และ `Decrypt`
* การเรียก API มี quota จำกัด (5,000–30,000 request/วินาที)
* Bucket ที่มี throughput สูงอาจเจอ **throttling**

## SSE-C: Server-Side Encryption ด้วย Customer-Provided Keys

* กุญแจจัดการ **นอก AWS**
* AWS ใช้กุญแจจากลูกค้าเพื่อเข้ารหัส object **แต่ไม่เก็บกุญแจไว้**
* ต้องส่งกุญแจทุกครั้งผ่าน HTTPS

**ขั้นตอนการทำงาน**

1. ผู้ใช้ส่งไฟล์พร้อมกุญแจที่จัดการนอก AWS
2. S3 ใช้กุญแจจากลูกค้าเข้ารหัส object
3. การอ่านไฟล์ต้องใช้กุญแจเดียวกัน

## Client-Side Encryption

* ลูกค้าทำการเข้ารหัสไฟล์ก่อนอัปโหลด
* การจัดการกุญแจและการถอดรหัสทั้งหมดเกิดขึ้น **นอก AWS**
* ใช้ library เช่น Client-Side Encryption Library

**ขั้นตอนการทำงาน**

1. ลูกค้ามีไฟล์และกุญแจอยู่แล้ว
2. เข้ารหัสไฟล์
3. อัปโหลดไฟล์เข้ารหัสไป S3
4. ถอดรหัสไฟล์ก็เกิดขึ้นที่ client

## การเข้ารหัสขณะส่งข้อมูล (Encryption in Transit / SSL/TLS)

* ใช้เพื่อ **ป้องกันข้อมูลระหว่าง client กับ S3**
* S3 รองรับ endpoint:

  * HTTP (ไม่เข้ารหัส)
  * HTTPS (เข้ารหัส) → แนะนำให้ใช้ HTTPS
* หากใช้ **SSE-C ต้องใช้ HTTPS**

**บังคับใช้การเข้ารหัสขณะส่ง**

* ใช้ **Bucket Policy**:

  * ปฏิเสธ `GetObject` ถ้า `aws:SecureTransport` = false
  * ถ้าใช้ HTTPS → ถูกอนุญาต, HTTP → ถูกบล็อก

ได้เลย นี่คือการแปลไทยแบบเข้าใจง่าย 🌟

## S3 Default Encryption

### ภาพรวมของ Default Encryption และ Bucket Policies

* โดยค่าเริ่มต้น **S3 bucket ใหม่ทุกตัว** จะมีการเข้ารหัสเริ่มต้น (default encryption) เปิดใช้งานด้วย **SSE-S3**
* การเข้ารหัสนี้จะถูกใช้ **โดยอัตโนมัติ** กับ object ใหม่ที่อัปโหลดเข้า bucket
* คุณสามารถเปลี่ยนวิธีเข้ารหัสเริ่มต้นเป็นวิธีอื่น เช่น **SSE-KMS** ได้ตามต้องการ

### การบังคับเข้ารหัสด้วย Bucket Policies

* นอกจาก default encryption แล้ว คุณสามารถ **บังคับให้ต้องเข้ารหัส** ด้วย **bucket policy**
* Bucket policy สามารถปฏิเสธคำขอ PUT object ที่ไม่ได้มี header ระบุการเข้ารหัสที่ถูกต้อง

**ตัวอย่างการใช้งาน**

* ถ้าคำขอ PUT object ไม่มี header ระบุ **AWS KMS (SSE-KMS)** → จะถูกปฏิเสธ
* ถ้าไม่ได้ระบุอัลกอริทึมเข้ารหัสฝั่งลูกค้า (SSE-C) → จะถูกปฏิเสธ

💡 **สรุป:** Bucket policy ช่วยให้คุณบังคับใช้การเข้ารหัสอย่างเข้มงวด และทำงาน **ก่อนการตั้งค่า default encryption**

## สรุป Key Takeaways

* S3 มี 4 วิธีหลักในการเข้ารหัส object: **SSE-S3, SSE-KMS, SSE-C, Client-side encryption**
* **SSE-S3** → AWS จัดการกุญแจให้, เปิดโดย default
* **SSE-KMS** → คุณควบคุมกุญแจเองผ่าน KMS, มี logging และข้อจำกัด API
* **SSE-C** → ใช้กุญแจลูกค้า, AWS ไม่เก็บ, ต้องใช้ HTTPS
* **Client-side encryption** → เข้ารหัสและถอดรหัสที่ client ทั้งหมด
* การเข้ารหัสขณะส่งข้อมูล → ใช้ HTTPS และสามารถบังคับผ่าน bucket policy
* S3 bucket ใหม่ทุกตัวมี **default encryption เปิดด้วย SSE-S3**
* สามารถเปลี่ยน default encryption เป็นวิธีอื่น เช่น **SSE-KMS**
* Bucket policy สามารถบังคับเข้ารหัสได้ โดยปฏิเสธ PUT request ที่ไม่มี header การเข้ารหัสถูกต้อง
* Bucket policy ถูกประเมิน **ก่อนการตั้งค่า default encryption**