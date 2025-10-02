# AWS AppConfig

**AWS AppConfig** ช่วยให้คุณสามารถจัดการ **configuration ของแอปพลิเคชันแบบ dynamic** แยกจากโค้ดของแอปพลิเคชันเอง

* แทนที่จะรวม configuration ไว้กับแอปหรือใช้ environment variables
* AppConfig ช่วยให้คุณ **สร้าง, ตรวจสอบความถูกต้อง, และ deploy configuration แบบ dynamic** ได้อย่างอิสระ

ด้วย AppConfig คุณสามารถเปลี่ยนแปลง configuration ได้โดยที่ **แอปพลิเคชันจะปรับตัวเองโดยไม่ต้อง deploy โค้ดใหม่หรือ restart**

* คุณลักษณะนี้ทำให้สามารถอัปเดตได้อย่างราบรื่นและยืดหยุ่น

## Feature Flags

การใช้งานทั่วไปคือ **Feature Flags**

* ตัวอย่าง: หากแอปของคุณมีฟีเจอร์ใหม่ที่ต้องการปิดไว้ก่อน

  * คุณสามารถ deploy แอปพร้อม **feature flag ตั้งค่าเป็น false** ใน AppConfig
  * เมื่อต้องการทดสอบหรือเปิดใช้งานฟีเจอร์นั้น เพียง **อัปเดต flag ใน AppConfig**
  * แอปจะเปิดฟีเจอร์ให้อัตโนมัติ **โดยไม่ต้อง redeploy**

นอกจากนี้ AppConfig ยังสามารถปรับค่า configuration แบบ dynamic อื่น ๆ ได้ เช่น:

* ปรับ performance ของแอป
* แก้ไข IP block/allow list แบบ real-time
* ทั้งหมดนี้ **ไม่ต้องแก้ไขโค้ดของแอปพลิเคชัน**

AppConfig เหมาะสำหรับแอปพลิเคชันที่รันบน:

* EC2, AWS Lambda, ECS, EKS และ environment ที่คล้ายกัน

## Gradual Deployment และ Rollback

เมื่อทำการ deploy การเปลี่ยนแปลง configuration เช่น การเปิด feature flag

* คุณอาจไม่ต้องการ release ให้ทุก instance พร้อมกัน
* AppConfig รองรับ **gradual deployment** เพื่อ monitor ปัญหา
* หากพบปัญหา สามารถ **rollback configuration กลับไปเวอร์ชันก่อนหน้าได้อัตโนมัติ**

## แหล่งที่มาของ Configuration

AppConfig รองรับหลายแหล่งของ configuration เช่น:

* Parameter Store
* SSM Documents
* S3 Bucket
* และอื่น ๆ

แอปพลิเคชันที่รันบน EC2 หรือ compute service อื่น ๆ จะ **poll แหล่งเหล่านี้เพื่อตรวจสอบการอัปเดต configuration เป็นระยะ**

## การ Monitoring และ Validation

* เมื่อมีการเปลี่ยนแปลง configuration **CloudWatch จะ monitor แอป**

* หากเกิด alarm, AppConfig สามารถ **rollback configuration อัตโนมัติ** เพื่อรักษา stability

* ก่อน deploy configuration สามารถ **ตรวจสอบความถูกต้อง (validation)** ได้ด้วย:

  * JSON Schema → ตรวจสอบ data type และ structure
  * Lambda function → สำหรับ logic การตรวจสอบที่ซับซ้อนกว่า

## สรุป

**AWS AppConfig** เป็นโซลูชันที่แข็งแรงสำหรับการจัดการ **configuration ของแอปแบบ dynamic**

* รองรับการจัดการ feature flag
* Gradual rollout
* Validation
* Monitoring
* ทั้งหมดโดยไม่ต้อง redeploy หรือ restart แอปพลิเคชัน

## Key Takeaways

* AWS AppConfig ช่วยจัดการ **configuration แบบ dynamic แยกจากโค้ดแอป**
* Feature flags สามารถ **toggle แบบ real-time** โดยไม่ต้อง redeploy หรือ restart แอป
* การเปลี่ยนแปลง configuration สามารถ **deploy แบบ gradual** พร้อม monitor และ rollback อัตโนมัติ
* Configuration สามารถ **validate** ด้วย JSON Schema หรือ Lambda ก่อน deployment
