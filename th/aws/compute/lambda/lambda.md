# Lambda 

AWS Lambda คืออะไร และช่วยเราอย่างไร?
มาเริ่มเปรียบเทียบกับ **Amazon EC2** กันก่อน

* **Amazon EC2** ให้บริการเซิร์ฟเวอร์เสมือนในคลาวด์ที่เราต้อง provision เอง
* เราถูกจำกัดด้วย **จำนวน memory และ CPU** ที่เรากำหนด
* เซิร์ฟเวอร์เหล่านี้ต้อง **ทำงานอย่างต่อเนื่อง** ถึงแม้จะไม่มีงานเกิดขึ้น
* เราสามารถใช้ **Auto Scaling** เพื่อปรับจำนวน instance ตามความต้องการ แต่ต้องตั้งค่าเพิ่ม-ลดอัตโนมัติเอง

**AWS Lambda** เสนอโมเดลที่แตกต่างไปจาก EC2

## AWS Lambda คืออะไร?

* Lambda คือ **ฟังก์ชันเสมือนที่ไม่ต้องจัดการเซิร์ฟเวอร์**
* เพียงแค่ให้โค้ด ฟังก์ชันจะทำงาน
* เวลาการทำงานจำกัด **ไม่เกิน 15 นาที** ซึ่งเพียงพอสำหรับหลาย use case
* Lambda **ทำงานตามความต้องการ (on demand)**

  * เมื่อไม่ใช้งาน ฟังก์ชันไม่ทำงาน
  * เราจ่ายเฉพาะเวลาที่ฟังก์ชันทำงานเท่านั้น
* การ **Scaling อัตโนมัติ** หากต้องการ concurrent execution มากขึ้น AWS จะ provision เพิ่มให้

## ประโยชน์ของ AWS Lambda

* **การคิดค่าบริการง่าย**

  * จ่ายตามจำนวน **requests (invocations)** และ **compute time**
  * Free tier:

    * 1 ล้าน requests ต่อเดือน
    * 400,000 **gigabyte-seconds** ต่อเดือน
* Lambda **เชื่อมต่อกับบริการ AWS ได้หลากหลาย**, รองรับหลายภาษา และ monitoring ง่ายผ่าน **CloudWatch**
* Provision RAM ได้สูงสุด **10 GB ต่อฟังก์ชัน** เพิ่มประสิทธิภาพ CPU และ network

## ภาษาที่รองรับและ Container Support

* รองรับภาษา: Node.js, Python, Java, C# (.NET Core), PowerShell, Ruby และภาษาอื่นผ่าน **custom runtime API** เช่น Rust, Golang
* รองรับ **container images** ที่ implement Lambda Runtime API

  * สำหรับการสอบ แนะนำให้รัน container บน **ECS หรือ Fargate** มากกว่า Lambda แม้ Lambda รองรับการ customize Docker image

## การรวมกับบริการ AWS อื่น ๆ

Lambda สามารถรวมกับบริการ AWS หลายตัว เช่น:

* **API Gateway**: สร้าง REST APIs เรียก Lambda
* **Kinesis**: สำหรับ real-time data transformation
* **DynamoDB**: trigger เมื่อ database มีการเปลี่ยนแปลง
* **S3**: trigger เมื่อมีการสร้างไฟล์
* **CloudFront**: ใช้ Lambda@Edge
* **CloudWatch Events / EventBridge**: ตอบสนองต่อ infrastructure events
* **CloudWatch Logs**: stream logs
* **SNS**: ตอบสนองต่อ notification
* **SQS**: ประมวลผลข้อความ queue
* **Cognito**: ตอบสนองต่อ user authentication

## ตัวอย่างการใช้งาน

**1. Serverless Thumbnail Creation**

* อัพโหลดรูปใน S3
* S3 event notification trigger Lambda
* Lambda สร้าง thumbnail และอัพโหลดกลับ S3
* อาจ insert metadata เช่น ชื่อรูป, ขนาด, วันที่สร้าง ลง DynamoDB

**2. Serverless CRON Jobs**

* ปกติ CRON job รันบน EC2 ต้อง instance ทำงานต่อเนื่อง
* Lambda + CloudWatch Event / EventBridge สามารถรันตาม schedule (เช่น ทุกชั่วโมง) **ไม่ต้องรันเซิร์ฟเวอร์ตลอดเวลา**

## การคิดค่าบริการของ AWS Lambda

* **1 ล้าน requests ต่อเดือนแรกฟรี**
* เกินจากนั้น $0.20 ต่อ 1 ล้าน requests
* Compute time คิดเป็น **millisecond**
* **400,000 GB-seconds ต่อเดือนฟรี**

  * ตัวอย่าง:

    * ฟังก์ชัน 1 GB RAM → ได้ 400,000 วินาที
    * ฟังก์ชัน 128 MB RAM → ได้เวลาเพิ่มขึ้น 8 เท่า

**สรุป:** Lambda มักใช้งานได้คุ้มค่าและถูกกว่า EC2 ในหลายกรณี

## สรุป

* AWS Lambda ทำให้ **รันโค้ดโดยไม่ต้องจัดการเซิร์ฟเวอร์**
* ฟังก์ชันรัน **on demand** และ **Scaling อัตโนมัติ**
* เวลารันสูงสุด **15 นาที**
* คิดค่าใช้จ่ายตาม **invocation และ compute time**
* รองรับหลายภาษาและบริการ AWS เช่น API Gateway, S3, DynamoDB, CloudWatch
* ใช้สร้าง **Serverless event-driven workflow** เช่น thumbnail creation และ scheduled CRON jobs **โดยไม่ต้องรันเซิร์ฟเวอร์ต่อเนื่อง**
