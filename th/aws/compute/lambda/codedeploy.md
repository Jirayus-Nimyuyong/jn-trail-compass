# Lambda & CodeDeploy

**CodeDeploy** สามารถทำงานร่วมกับ **AWS Lambda** เพื่อช่วย **อัตโนมัติการเปลี่ยน traffic ของ Lambda aliases** ได้ การรวมนี้ใช้พื้นฐานจาก **Lambda versions และ aliases** เพื่อให้สามารถทำการ deploy แบบควบคุมได้

แม้ว่าในบทเรียนนี้เราจะยังไม่ได้ทำ hands-on แต่ **CodeDeploy** ถูกผนวกอยู่ใน **Serverless Application Model (SAM)** framework และเมื่อเรียน SAM เราจะได้ฝึก deploy Lambda ด้วย CodeDeploy

## ตัวอย่าง Traffic Shifting

สมมติว่าเรามี **PROD alias** ชี้ไปที่ **Lambda Version 1**
เราต้องการอัปเกรดเป็น **Version 2** โดย **เปลี่ยน traffic ไปยัง Version 2 แบบค่อยเป็นค่อยไป**

* CodeDeploy จะจัดการ traffic โดยเพิ่มสัดส่วน traffic ไปยัง Version 2 ทีละขั้นจนถึง 100%
* ตัวอย่าง: เริ่มที่ 10% traffic → Version 2 และ 90% → Version 1
* ต่อมาอาจเปลี่ยนเป็น 50% / 50%
* สุดท้าย traffic ทั้งหมดไป Version 2 และ Version 1 เหลือ 0%

### กลยุทธ์ Traffic Shifting ของ CodeDeploy

* **Linear:** เพิ่ม traffic ทีละเปอร์เซ็นต์คงที่ทุก N นาที จนถึง 100%

  * ตัวอย่าง: `Linear10PercentEvery3Minutes`, `Linear10PercentEvery10Minutes`
* **Canary:** ส่ง traffic ไปยังสัดส่วนเล็ก ๆ ช่วงเวลาหนึ่ง แล้วเปลี่ยนทันทีเป็น 100%

  * ตัวอย่าง: `Canary10Percent5Minutes`, `Canary10PercentEvery30Minutes`
* **AllAtOnce:** เปลี่ยน traffic จาก Version 1 → Version 2 ทันที

  * เร็วที่สุด แต่เสี่ยงที่สุด หาก Version 2 ยังไม่ได้ทดสอบ

### กลไก Rollback

* สามารถสร้าง **pre-traffic** และ **post-traffic hooks** เพื่อตรวจสอบสุขภาพ Lambda ในระหว่าง deploy
* หากเกิดปัญหา เช่น traffic hooks ล้มเหลว หรือ CloudWatch alarms แจ้งเตือน
* CodeDeploy จะตรวจจับและ **rollback** traffic กลับไปยัง **เวอร์ชันที่เสถียร (Version 1)**

### พารามิเตอร์ใน AppSpec.yml สำหรับ Lambda Deployment

เมื่อใช้ CodeDeploy กับ Lambda ผ่าน **AppSpec.yml** ต้องระบุพารามิเตอร์สำคัญดังนี้:

* `Name` : ชื่อ Lambda function ที่จะ deploy
* `Alias` : ชื่อ alias ของ Lambda function (จำเป็น)
* `CurrentVersion` : เวอร์ชันที่ traffic ชี้ไปอยู่ปัจจุบัน
* `TargetVersion` : เวอร์ชันที่จะให้ traffic ชี้ไป
* CodeDeploy จะอัปเดต alias จาก CurrentVersion → TargetVersion ตามกลยุทธ์ traffic shifting ที่เลือก

### สรุป

* **CodeDeploy** ทำงานร่วมกับ Lambda เพื่อ **อัตโนมัติการเปลี่ยน traffic สำหรับ aliases**
* กลยุทธ์การ shift traffic ได้แก่ **Linear, Canary, AllAtOnce** แต่ละแบบมีเวลาและความเสี่ยงต่างกัน
* **Pre/Post traffic hooks** และ **CloudWatch alarms** ใช้ตรวจสอบสุขภาพและ rollback อัตโนมัติ
* **AppSpec.yml** กำหนดพารามิเตอร์สำคัญ เช่น ชื่อฟังก์ชัน, alias, เวอร์ชันปัจจุบัน และเวอร์ชันเป้าหมาย เพื่อควบคุมการอัปเดต
