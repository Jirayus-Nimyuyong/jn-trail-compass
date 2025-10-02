# CloudTrail vs CloudWatch vs X-Ray

## ภาพรวมของ CloudTrail, CloudWatch และ X-Ray

ส่วนนี้จะอธิบายความแตกต่างระหว่างบริการ **CloudTrail**, **CloudWatch**, และ **X-Ray** ของ AWS

* **CloudTrail**

  * ใช้สำหรับตรวจสอบ (Audit) การเรียกใช้งาน API (API Calls) ที่เกิดขึ้นในบัญชี AWS ของคุณ
  * การเรียก API เหล่านี้อาจมาจาก **ผู้ใช้ (Users)**, **บริการ (Services)** หรือแม้แต่ **AWS Console**
  * เหมาะสำหรับการตรวจจับการเรียกที่ไม่ได้รับอนุญาต หรือหาสาเหตุของการเปลี่ยนแปลงที่เกิดจาก API Calls

* **CloudWatch**

  * มุ่งเน้นด้าน **Monitoring (การเฝ้าระวังและติดตามสถานะ)**
  * มีองค์ประกอบหลัก ได้แก่:

    * **CloudWatch Metrics** → ใช้ติดตามค่าตัวชี้วัด (Metrics)
    * **CloudWatch Logs** → เก็บบันทึก (Logs) ของแอปพลิเคชัน
    * **CloudWatch Alarms** → ตั้งการแจ้งเตือน (Notifications) หาก Metrics มีค่าผิดปกติ
  * โดยรวมแล้ว CloudWatch ถูกออกแบบมาเพื่อเฝ้าระวังทั้ง **แอปพลิเคชัน** และ **โครงสร้างพื้นฐาน (Infrastructure)**

* **X-Ray**

  * ช่วยในการ **Trace Analysis (การวิเคราะห์การไหลของคำสั่ง)** แบบอัตโนมัติ
  * มีการสร้าง **Service Map แบบรวมศูนย์** ช่วยให้มองเห็นการทำงานของระบบแบบกระจาย (Distributed Systems)
  * เหมาะสำหรับการ Debug และวิเคราะห์ปัญหา เช่น **Latency, Errors, Faults**
  * ยังสามารถ **ติดตาม (Request Tracking)** คำร้องขอ (Requests) ข้ามบริการในระบบที่ซับซ้อนได้

## สรุป:

* **CloudTrail** → ใช้สำหรับ **Audit API Calls**
* **CloudWatch** → ใช้สำหรับ **Monitoring Metrics, Logs, และ Alarms**
* **X-Ray** → ใช้สำหรับ **Trace-oriented Analysis** และการวิเคราะห์เชิงลึกของระบบกระจาย

## Key Takeaways

* **CloudTrail** → ตรวจสอบการเรียก API ที่เกิดขึ้นในบัญชี AWS (จากผู้ใช้, บริการ, หรือ AWS Console)
* **CloudWatch** → ใช้สำหรับเฝ้าระวัง Metrics, เก็บ Logs ของแอปพลิเคชัน และตั้ง Alarms ตาม Metrics
* **X-Ray** → ช่วยวิเคราะห์ Trace อัตโนมัติ และแสดง Service Map สำหรับระบบกระจาย
* แต่ละบริการมีหน้าที่ต่างกัน:

  * CloudTrail = **Auditing**
  * CloudWatch = **Monitoring**
  * X-Ray = **Trace Analysis**
