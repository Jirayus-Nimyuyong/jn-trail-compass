# การรวม S3 Event Notifications กับ Lambda

## การแนะนำ

เรามาดูกันว่าการรวม **S3 event notifications** เข้ากับ **AWS Lambda** ทำอย่างไร

## ภาพรวมของ S3 Event Notifications

* S3 event notifications ช่วยให้เราทราบเมื่อมีการ **สร้าง ลบ กู้คืน หรือทำ replication** ของ object ใน S3 bucket
* สามารถกรอง notifications โดยใช้ **prefix** และ **suffix** เพื่อกำหนดเฉพาะ object ที่สนใจ

**ตัวอย่างใช้งาน:** สร้าง thumbnail ให้กับรูปภาพทุกครั้งที่อัปโหลดขึ้น Amazon S3

## ปลายทางของ S3 Event Notifications

S3 สามารถส่ง event notifications ไปยัง 3 ปลายทางหลัก:

1. **SNS (Simple Notification Service)**

   * สามารถใช้ pattern แบบ **fan-out** เพื่อส่ง notifications ไปยังหลาย SQS queues

2. **SQS (Simple Queue Service)**

   * ส่ง notifications ไปที่ SQS queue โดยตรง แล้ว Lambda function สามารถ poll และประมวลผล

3. **Lambda Function**

   * สามารถเรียก Lambda function โดยตรงแบบ **asynchronous**

## การจัดการข้อผิดพลาดด้วย Dead-Letter Queues (DLQ)

* หาก Lambda function ประมวลผล event ไม่สำเร็จ สามารถตั้งค่า **DLQ** เช่น SQS queue เพื่อเก็บ events ที่ล้มเหลวไว้ทำการวิเคราะห์หรือประมวลผลซ้ำในภายหลัง

## เวลาการส่ง Event และ Versioning

* โดยปกติ S3 event notifications จะส่ง events ภายในไม่กี่วินาที แต่บางครั้งอาจใช้เวลาถึงหนึ่งนาทีหรือมากกว่า
* เพื่อให้มั่นใจว่า **ไม่มี event สูญหาย** ควรเปิด **versioning** ของ S3 bucket

  * หาก versioning ปิดและมีการเขียน object เดียวกันพร้อมกันสองครั้ง คุณอาจได้รับ notification แค่ครั้งเดียวแทนที่จะเป็นสองครั้ง
* นี่เป็นสิ่งสำคัญเมื่อออกแบบ **event-driven architecture**

## รูปแบบการประมวลผล Event แบบง่าย

* ตัวอย่าง pattern ทั่วไป: S3 bucket **trigger** Lambda function เมื่อมีไฟล์ใหม่
* Lambda function สามารถประมวลผลไฟล์นั้น และบันทึกข้อมูลลงใน **DynamoDB** หรือ **RDS**
* Pattern นี้ง่ายและมีประสิทธิภาพสำหรับ workflow การประมวลผลข้อมูลแบบ serverless หลายกรณี

## Key Takeaways

* S3 event notifications แจ้งเมื่อมีการสร้าง ลบ กู้คืน หรือ replicate ของ object
* สามารถกรอง notifications ด้วย prefix และ suffix เพื่อกำหนด object เฉพาะ
* S3 event notifications สามารถส่ง events ไปยัง **SNS, SQS** หรือเรียก **Lambda function แบบ asynchronous**
* เพื่อหลีกเลี่ยงการสูญหายของ notifications ควรเปิด **versioning** ของ S3 bucket โดยเฉพาะเมื่อมีการเขียนหลายครั้งพร้อมกัน