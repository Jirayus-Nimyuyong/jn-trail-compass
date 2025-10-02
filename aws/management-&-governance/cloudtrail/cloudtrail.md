# CloudTrail

## ภาพรวมของ CloudTrail

CloudTrail เป็นบริการที่ให้การกำกับดูแล (governance), การปฏิบัติตามข้อกำหนด (compliance), และการตรวจสอบ (auditing) สำหรับบัญชี AWS ของคุณ โดยเปิดใช้งานเป็นค่าเริ่มต้น ทำให้คุณสามารถเข้าถึงประวัติของ **เหตุการณ์ (events) และ API calls** ทั้งหมดที่เกิดขึ้นในบัญชี AWS ได้

การเรียกใช้งาน (calls) เหล่านี้สามารถมาจาก **AWS Management Console, SDKs, CLI หรือบริการ AWS อื่น ๆ** และทั้งหมดจะถูกบันทึกไว้ใน CloudTrail

คุณสามารถกำหนดค่าให้ CloudTrail ส่ง log เหล่านี้ไปที่ **CloudWatch Logs** หรือ **Amazon S3** ได้ อีกทั้งยังสามารถสร้าง trail ที่ใช้ได้กับทุก Region หรือเฉพาะ Region เดียว เพื่อรวบรวมประวัติของ events จากทุก Region ไว้ใน S3 bucket เดียว

📌 ตัวอย่าง: หากมีคนลบ EC2 instance และคุณอยากทราบว่าใครเป็นคนทำ CloudTrail จะบันทึก API call ที่เกี่ยวข้อง ทำให้คุณสามารถตรวจสอบว่าใครทำอะไร และเมื่อไร

## CloudTrail ในฐานะเครื่องมือตรวจสอบกลาง (Central Audit Tool)

CloudTrail จะทำหน้าที่อยู่ตรงกลางระหว่างการกระทำต่าง ๆ ไม่ว่าจะผ่าน SDK, CLI, Console, IAM User, IAM Role หรือบริการอื่น ๆ โดย CloudTrail จะบันทึกการกระทำเหล่านั้นทั้งหมดลงใน **CloudTrail Console** เพื่อให้คุณตรวจสอบได้ว่าเกิดอะไรขึ้น

หากต้องการเก็บรักษา event เกินกว่า 90 วัน คุณสามารถส่งไปที่ **CloudWatch Logs** หรือ **Amazon S3** เพื่อเก็บระยะยาวได้

## ประเภทของ Events ใน CloudTrail

CloudTrail แบ่งประเภทของ Events ออกเป็น 3 ประเภทหลัก ๆ ได้แก่:

### 1. **Management Events**

เป็นการปฏิบัติการที่ทำกับทรัพยากร (resources) ในบัญชี AWS ของคุณ เช่น:

* การตั้งค่าความปลอดภัยด้วยการเรียก IAM AttachRolePolicy API
* การสร้าง subnet
* การตั้งค่า logging

ค่าเริ่มต้น (default) ของ trail จะถูกตั้งให้บันทึก **Management Events**

Management Events แบ่งออกเป็น:

* **Read Events** → ไม่เปลี่ยนแปลง resource เช่น list IAM users, list EC2 instances
* **Write Events** → เปลี่ยนแปลง resource เช่น ลบ DynamoDB table (สำคัญมากกว่าเพราะอาจสร้างความเสียหายได้)

### 2. **Data Events**

เป็นเหตุการณ์ที่เกี่ยวข้องกับการทำงานระดับ **object-level** และ **ไม่ถูกบันทึกโดยค่าเริ่มต้น** เพราะมีปริมาณข้อมูลสูง ตัวอย่างเช่น:

* Amazon S3 → `GetObject`, `PutObject`, `DeleteObject`
* AWS Lambda → การเรียกใช้งานฟังก์ชันด้วย `Invoke` API

Data Events ก็แบ่งเป็น **Read** และ **Write** เช่นเดียวกับ Management Events

* **Read Event** → `GetObject`
* **Write Event** → `PutObject`, `DeleteObject`

### 3. **CloudTrail Insights Events**

CloudTrail Insights เป็นฟีเจอร์ที่ช่วยวิเคราะห์ **Management Events** เพื่อหาความผิดปกติ (unusual activity) โดยต้องเปิดใช้งานและมีค่าใช้จ่ายเพิ่ม

สามารถตรวจจับสิ่งผิดปกติ เช่น:

* การสร้างทรัพยากรผิดพลาด
* ใช้ทรัพยากรเกิน limit
* การทำ IAM actions จำนวนมากผิดปกติ
* ช่วงเวลาที่ไม่มีการบำรุงรักษาตามรอบปกติ

**การทำงานของ Insights:**

* CloudTrail จะเรียนรู้กิจกรรมปกติของระบบเป็น baseline
* วิเคราะห์ events ใหม่ ๆ อย่างต่อเนื่อง
* หากตรวจพบความผิดปกติ → สร้าง Insights Event

Insights Events จะแสดงใน CloudTrail Console และยังสามารถส่งต่อไปยัง **Amazon EventBridge** เพื่อให้คุณสร้าง automation เช่น ส่งอีเมลแจ้งเตือนเมื่อพบ anomaly

## การเก็บรักษา Events ของ CloudTrail

* ค่าเริ่มต้น → เก็บ events **90 วัน** หลังจากนั้นจะถูกลบ
* หากต้องการเก็บระยะยาว → ต้องส่งไปเก็บใน **Amazon S3**
* เมื่อเก็บใน S3 แล้ว สามารถใช้ **Amazon Athena** (บริการ query แบบ serverless) เพื่อวิเคราะห์ log ที่เก็บไว้นั้นได้

## Key Takeaways (สรุปสำคัญ)

* CloudTrail ให้ **การกำกับดูแล, ความปลอดภัย, และการตรวจสอบ** โดยการบันทึก API calls และ events
* มี **3 ประเภทของ events**:

  1. Management Events
  2. Data Events
  3. CloudTrail Insights Events
* CloudTrail Insights ใช้ตรวจจับ **กิจกรรมผิดปกติ** จากการวิเคราะห์ Management Events
* ค่าเริ่มต้นเก็บ events **90 วัน** ถ้าต้องการเก็บนานกว่านี้ต้องส่งไปยัง **S3** และใช้ **Athena** ในการ query
