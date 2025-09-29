# Lambda Concurrency and Throttling

## Lambda Concurrency และการจำกัดการทำงานพร้อมกัน

* เมื่อเราเรียกใช้งาน Lambda บ่อยขึ้น จำนวน **Concurrent Executions** (การทำงานพร้อมกัน) จะเพิ่มขึ้น

* Lambda ถูกออกแบบมาให้ **ขยายตัวได้อย่างรวดเร็วและมีประสิทธิภาพ**

  * ตัวอย่าง: เมื่อเรียกใช้งานน้อย → อาจมี 2 concurrent executions
  * เรียกใช้งานสูง → อาจมีถึง 1000 concurrent executions ทำงานพร้อมกัน

* **การจัดการการขยายตัว**

  * แนะนำให้ตั้ง **Reserved Concurrency** ระดับฟังก์ชัน
  * ตัวอย่าง: ตั้ง reserved concurrency = 50 → ฟังก์ชันนั้นทำงานพร้อมกันได้สูงสุด 50 concurrent executions
  * หากเกินขีดจำกัด → จะเกิด **Throttling**

## พฤติกรรม Throttling

* **Synchron
ous Invocations** → หากถูก throttled, Lambda ส่ง **Throttle Error 429**

* **Asynchronous Invocations** → Event ที่ถูก throttled จะ **retry อัตโนมัติ** และหาก retry ไม่สำเร็จ จะถูกส่งไปยัง **Dead Letter Queue (DLQ)**

* หากต้องการเกิน 1000 concurrent executions → ต้องเปิด **Support Ticket** กับ AWS

## ผลกระทบหากไม่ตั้ง Reserved Concurrency

* หากไม่ตั้ง reserved concurrency → concurrency จะ **แชร์ร่วมกันระหว่างทุกฟังก์ชันในบัญชี AWS**

* ตัวอย่าง:

  * ALB เรียก Lambda 1
  * API Gateway เรียก Lambda 2
  * AWS SDK/CLI เรียก Lambda 3

* เมื่อปริมาณการเรียกใช้งานสูง → Lambda ของ ALB อาจใช้ concurrency ทั้งหมด (1000) → ฟังก์ชันอื่นอาจถูก throttled

**ข้อสำคัญ:**

* Concurrency limit เป็น **ระดับบัญชีรวมทุกฟังก์ชัน**
* การจัดการ concurrency สำคัญเพื่อหลีกเลี่ยง throttling ที่ไม่ตั้งใจ

## Concurrency กับ Asynchronous Invocations

* ตัวอย่าง: S3 Event Notification → เรียก Lambda แบบ asynchronous เมื่อมีการอัปโหลดไฟล์หลายไฟล์พร้อมกัน → เกิด concurrent executions จำนวนมาก
* หากฟังก์ชันไม่สามารถขยายตัวได้เนื่องจาก concurrency limit → request เพิ่มเติมจะถูก throttled
* สำหรับ asynchronous invocations → Lambda **retry อัตโนมัติสูงสุด 6 ชั่วโมง**
* **Retry Interval** → เพิ่มขึ้นแบบ exponential backoff (1 วินาที → สูงสุด 5 นาที) → Lambda จะ retry จนกว่ามี concurrency ว่าง

## Cold Starts และ Provisioned Concurrency

* **Cold Start:** เกิดเมื่อสร้าง Lambda instance ใหม่ → โหลดโค้ดและ run initialization code ก่อน handler → latency สูง

* **ผลกระทบ:** request แรกจาก instance ใหม่ช้า → ส่งผลต่อ UX

* **Provisioned Concurrency:**

  * Pre-allocate execution environments ก่อน invoke
  * ลด cold start → ทุก invocation latency ต่ำ
  * สามารถจัดการผ่าน **Application Auto Scaling** → ตั้ง schedule หรือ target จำนวน reserved Lambda instances

## ปรับปรุง Cold Start สำหรับ Lambda ใน VPC

* ก่อนหน้านี้ Lambda ใน VPC → cold start ช้า
* AWS ปรับปรุงปลายปี 2019 → **ลดเวลา cold start สำหรับ Lambda ใน VPC**
* ลดผลกระทบของ cold start สำหรับ Lambda ที่อยู่ใน VPC

## สรุป (Key Takeaways)

* Lambda สามารถขยายตัวได้ถึง **หลายพัน concurrent executions** แต่สามารถตั้ง concurrency limit เพื่อควบคุมได้
* **Reserved Concurrency:** จำกัดสูงสุดของ concurrent executions → เกิด throttling เมื่อเกิน
* Throttling behavior:

  * Synchronous → error 429
  * Asynchronous → retry อัตโนมัติ และ DLQ
* **Provisioned Concurrency:** pre-allocate execution environment → ลด cold start
* Concurrency limit **แชร์ระหว่างทุกฟังก์ชันในบัญชี** → ฟังก์ชันหนึ่งใช้งานสูง → ฟังก์ชันอื่นถูก throttled
* AWS ปรับปรุง cold start สำหรับ Lambda ใน VPC → latency ต่ำลง
