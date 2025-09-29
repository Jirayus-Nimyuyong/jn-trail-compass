# Lambda Monitoring & X-Ray Tracing

เรามาพูดถึงวิธีที่ **AWS Lambda** จัดการกับ **Logging, Monitoring, และ Tracing**

## Logging

* AWS Lambda ผสานกับ **CloudWatch Logs** โดย **ล็อกการทำงานของ Lambda จะถูกเก็บอัตโนมัติ**
* เพื่อให้ทำงานได้ ฟังก์ชัน Lambda ต้องมี **execution role** ที่มี **IAM policy** อนุญาตให้เขียนข้อมูลไปยัง CloudWatch Logs
* โดยปกติจะรวมอยู่ใน **Lambda basic execution role**

## Monitoring

* นอกจากล็อกแล้ว ยังมี **CloudWatch Metrics** แสดงใน **CloudWatch Metrics UI** หรือ **Lambda UI**

* Metrics ให้ข้อมูลเกี่ยวกับ:

  * จำนวนครั้งที่ Lambda ถูกเรียกใช้งาน (Invocations)
  * ระยะเวลาในการทำงาน (Duration)
  * การทำงานพร้อมกัน (Concurrent Executions)
  * จำนวนข้อผิดพลาด (Error Count)
  * อัตราความสำเร็จ (Success Rate)
  * การถูกจำกัด (Throttles)
  * การส่งงานแบบ Asynchronous ล้มเหลว (Async Delivery Failures)

* หาก Lambda อ่านข้อมูลจาก **Kinesis** หรือ **DynamoDB Streams** Metrics ยังรวม **Iterator Age** เพื่อบอกว่า Lambda ทำงานตามข้อมูลใน Stream ช้าหรือเร็ว

## Tracing ด้วย AWS X-Ray

* สามารถเปิด **Tracing** ได้ง่าย ๆ ผ่านการตั้งค่า **Active Tracing** ใน Lambda
* Lambda จะรัน **X-Ray Daemon** ให้โดยอัตโนมัติ
* ในโค้ด ต้องรวม **X-Ray SDK** และฟังก์ชัน Lambda ต้องมี **IAM execution role** ที่สามารถเขียนข้อมูลไปยัง X-Ray
* AWS มี **Managed Policy** ชื่อ **AWSXRayDaemonWriteAccess** สำหรับงานนี้

### Environment Variables ของ X-Ray

* มี **3 environment variables** ใช้สื่อสารกับ X-Ray daemon
* ที่สำคัญที่สุดคือ **AWS_XRAY_DAEMON_ADDRESS** — ระบุ **IP และ Port** ที่ daemon รันอยู่
* Environment variables เหล่านี้เข้าถึงได้ในโค้ดเหมือนกับ environment variables ปกติ

## สรุป (Key Takeaways)

* AWS Lambda ผสานกับ **CloudWatch Logs** โดยอัตโนมัติสำหรับเก็บ execution logs
* **CloudWatch Metrics** ให้ข้อมูลเชิงลึก เช่น จำนวน invocation, duration, errors, throttles, และ stream iterator age
* สามารถเปิด **AWS X-Ray Tracing** ได้ง่ายผ่าน Lambda configuration ด้วย Active Tracing
* ต้องมี **IAM roles** และ **environment variables** ที่ถูกต้อง เพื่อให้ Lambda เขียนข้อมูลไปยัง X-Ray ได้