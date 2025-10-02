# SQS Queue Access Policy

นโยบายการเข้าถึง SQS Queue (SQS Queue Access Policies) มีลักษณะคล้ายนโยบายของ S3 Bucket เพราะเป็น **Resource Policies** ซึ่งอยู่ในรูปแบบ **JSON IAM Policy** ที่แนบโดยตรงกับ **SQS Queue** โดยมีวัตถุประสงค์หลัก 2 อย่างคือ:

## **Use Case 1: การเข้าถึงข้ามบัญชี (Cross-Account Access)**

ในกรณีที่คุณมี SQS Queue อยู่ในบัญชี AWS หนึ่ง และมีอีกบัญชีหนึ่งที่ต้องการเข้าถึง Queue นี้ (เช่น EC2 instance ในอีกบัญชีที่ต้องการดึงข้อความจากคิว) คุณต้องสร้าง **Queue Access Policy** ขึ้นมา และแนบนโยบายนี้กับ SQS Queue ที่อยู่ในบัญชีแรก

ตัวอย่างเช่น:

* Queue Access Policy อนุญาตให้ **Account ID 111122223333** มีสิทธิ์ใช้ action `sqs:ReceiveMessage` บน SQS Queue นั้น
* ผลลัพธ์คือ EC2 instance ที่อยู่ในอีกบัญชีสามารถดึงข้อความจาก SQS Queue ได้

## **Use Case 2: การให้ S3 Bucket ส่ง Event Notifications มาที่ SQS Queue**

อีกกรณีที่ใช้บ่อย คือเมื่อ **S3 Bucket** ต้องการส่ง **event notification** ไปยัง SQS Queue เช่น เวลามีการอัปโหลดไฟล์ใหม่เข้า S3 Bucket คุณอาจอยากให้มีข้อความอัตโนมัติถูกส่งไปที่ SQS Queue

เพื่อทำแบบนี้ได้:

* SQS Queue ต้องอนุญาตให้ S3 Bucket เขียนข้อความลงไปได้
* ต้องสร้าง **Queue Access Policy** ที่อนุญาตให้ทำ action `sqs:SendMessage`
* โดยใน policy จะมีเงื่อนไขว่า:

  * **Source ARN** ต้องตรงกับ ARN ของ S3 Bucket (เช่น `arn:aws:s3:::bucket1`)
  * **Source Account** ต้องเป็นเจ้าของ S3 Bucket นั้น

## **การสร้าง SQS Queue และกำหนด Access Policies**

ตัวอย่าง:

1. สร้าง SQS Queue ชื่อ **events-from-s3** เพื่อรองรับ Event จาก S3
2. ภายในการตั้งค่า Queue คุณสามารถเลือกได้ว่าใครสามารถส่งข้อความเข้ามาได้

   * วิธีพื้นฐาน (Basic): อนุญาตเฉพาะเจ้าของ Queue
   * วิธีขั้นสูง (Advanced): กำหนดบัญชี, IAM users, หรือ roles ที่ส่งข้อความได้ (เหมาะกับ cross-account)
3. กำหนดสิทธิ์ว่าใครสามารถดึงข้อความ (receive messages) จาก Queue ได้

## **การตั้งค่า Event Notifications ใน S3 → SQS**

1. ไปที่ Amazon S3 แล้วสร้าง bucket ชื่อ **demo-sqs-queue-access-policy**
2. ไปที่ **Properties → Event Notifications** ของ bucket
3. สร้าง event notification ชื่อ **NewObjects**

   * เลือก event type: "All object create events"
   * กำหนดปลายทาง (destination) เป็น SQS Queue: **events-from-s3**
4. เมื่อกดบันทึก อาจเจอ error เพราะยังไม่ได้ปรับ **Queue Access Policy** ให้อนุญาต S3 เขียนเข้าไป

## **การแก้ไข SQS Queue Access Policy**

1. ไปแก้ไข Queue Access Policy ให้อนุญาต S3 Bucket เขียนข้อความเข้าได้
2. Policy ต้องมี:

   * Action: `sqs:SendMessage`
   * Resource: ARN ของ SQS Queue
   * Condition: `SourceArn` ต้องตรงกับ ARN ของ S3 Bucket
   * `SourceAccount` ต้องตรงกับ Account ID ของคุณ
3. อัปเดต Policy และบันทึก

## **การตรวจสอบผลลัพธ์**

* หลังแก้ไข Policy ให้กลับไปบันทึก Event Notification ใน S3 อีกครั้ง คราวนี้จะบันทึกได้สำเร็จ
* จากนั้นลองตรวจสอบใน SQS Queue จะพบว่าเมื่ออัปโหลดไฟล์ใหม่ไปที่ S3 จะมีข้อความใหม่ถูกส่งเข้ามาใน Queue ทันที

## **สรุป**

* **SQS Queue Access Policy** คือ **Resource-based IAM Policy** ที่แนบตรงกับ SQS Queue
* ใช้เพื่อ:

  * อนุญาต Cross-Account Access (เช่น EC2 จากอีกบัญชีมาดึงข้อความ)
  * อนุญาตให้บริการอื่น (เช่น S3) ส่ง Event Notification เข้ามาใน SQS
* ต้องตั้งค่า Policy ให้ถูกต้อง เพื่อให้การสื่อสารระหว่างบริการทำงานได้สำเร็จ

## **Key Takeaways**

* SQS Queue Access Policies คือ **JSON IAM Policy แบบ Resource-based**
* ใช้เพื่อควบคุมสิทธิ์ทั้งการ **ส่ง (SendMessage)** และ **รับ (ReceiveMessage)** ข้อความ
* จำเป็นสำหรับ **Cross-Account Access** และ **S3 → SQS Event Notification**
* การตั้งค่า Policy ถูกต้องเป็นสิ่งสำคัญมากในการเชื่อมต่อบริการ AWS เข้าด้วยกัน
