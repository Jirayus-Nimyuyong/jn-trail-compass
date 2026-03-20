# AWS Auto Scaling Cheat Sheet

**AWS Auto Scaling** ช่วยให้คุณกำหนดค่าการปรับขนาดทรัพยากร AWS โดยอัตโนมัติได้อย่างรวดเร็วผ่าน Scaling Plan ที่ใช้ทั้ง **Dynamic Scaling** (ปรับตามสถานการณ์จริง) และ **Predictive Scaling** (ปรับตามการคาดการณ์)

* เลือกปรับให้เหมาะสมกับความพร้อมใช้งาน (Availability), ต้นทุน (Cost), หรือความสมดุลของทั้งสองอย่าง
* **Scaling Out:** การเพิ่มจำนวนทรัพยากรในกลุ่ม / **Scaling In:** การลดจำนวนทรัพยากรในกลุ่ม
* **เหมาะสำหรับ:** ทราฟฟิกที่เป็นรอบเวลา (Cyclical), ทราฟฟิกแบบมาๆ หายๆ (On and off), หรือทราฟฟิกที่แปรผันไม่แน่นอน (Variable)
* เป็นบริการที่ขึ้นอยู่กับภูมิภาค (**Region specific**)

---

## คุณสมบัติเด่น (Features)
* **Amazon EC2:** เพิ่มหรือลดอินสแตนซ์ใน Auto Scaling Group หรือจัดการผ่าน Spot Fleet
* **Amazon ECS:** ปรับจำนวน Desired count ของบริการ ECS ตามภาระงาน
* **Amazon DynamoDB:** ปรับความจุ Read/Write เพื่อรองรับทราฟฟิกโดยไม่เกิดการ Throttling
* **Amazon Aurora:** ปรับจำนวน Read Replicas ตามการเชื่อมต่อหรือเวิร์กโหลด
* **Predictive Scaling:** วิเคราะห์ข้อมูลย้อนหลังเพื่อคาดการณ์โหลดในอนาคต (ใช้ได้เฉพาะ EC2 Auto Scaling Groups เท่านั้น)
* **Warm Pool:** ช่วยลด Latency สำหรับแอปพลิเคชันที่ใช้เวลา Boot นาน โดยการเตรียมอินสแตนซ์ที่พร้อมใช้งานไว้ล่วงหน้า
* **Instance Refresh:** อัปเดตอินสแตนซ์ในกลุ่มโดยอัตโนมัติ รองรับการย้อนกลับ (Rollback) หากตรวจพบปัญหาผ่าน CloudWatch Alarm

---

## Amazon EC2 Auto Scaling
จัดการเพื่อให้มีจำนวนอินสแตนซ์ที่ถูกต้องในการรองรับโหลดผ่าน **Auto Scaling Groups (ASG)**

### ส่วนประกอบสำคัญ
1.  **Groups:** หน่วยตรรกะที่รวมอินสแตนซ์ที่มีลักษณะคล้ายกันเข้าด้วยกัน
2.  **Configuration Templates:** ใช้ **Launch Template** (แนะนำ) หรือ Launch Configuration เพื่อระบุรายละเอียดอินสแตนซ์ (AMI, ประเภท, Security Group)
3.  **Scaling Options:** วิธีการปรับขนาด เช่น ตามตารางเวลา หรือตามความต้องการ

### วงจรชีวิต (Lifecycle)
* **Lifecycle Hooks:** หยุดกระบวนการ Launch หรือ Terminate ชั่วคราวเพื่อดำเนินการบางอย่างก่อน (Custom actions)
* **Cooldown Period:** ช่วงเวลาพักเพื่อรอให้การปรับขนาดครั้งก่อนมีผลก่อนจะเริ่มครั้งใหม่ (ใช้กับ Simple Scaling)

### ประเภทนโยบายการปรับขนาด (Scaling Policy Types)
* **Target Tracking:** ปรับขนาดเพื่อให้ค่า Metric อยู่ในจุดที่กำหนด (เช่น รักษา CPU ที่ 50%)
* **Step Scaling:** ปรับขนาดตามลำดับขั้นของค่า Alarm ที่เกินออกมา
* **Simple Scaling:** ปรับขนาดตามการตั้งค่าเดียวเมื่อเกิด Alarm

---

## นโยบายการปิดอินสแตนซ์ (Termination Policy)
เมื่อมีการ Scaling In ระบบจะเลือกปิดอินสแตนซ์ตามนโยบาย:
* **Default:** พยายามรักษาสมดุลระหว่าง AZ และเลือกอินสแตนซ์ที่ใช้ Launch Configuration เก่าที่สุด
* **Custom:** `OldestInstance` (เก่าสุด), `NewestInstance` (ใหม่สุด), `OldestLaunchConfiguration` (ใช้ Template เก่าสุด)
* **Instance Protection:** ป้องกันไม่ให้อินสแตนซ์เฉพาะเจาะจงถูกปิดโดยอัตโนมัติ

---

## Application Auto Scaling
รองรับการปรับขนาดสำหรับบริการอื่นๆ นอกเหนือจาก EC2 เช่น:
* Amazon ECS, Spot Fleet, EMR, ElastiCache (Redis), Neptune, DynamoDB, Aurora Replicas, SageMaker, Lambda (Provisioned Concurrency), และ Kafka (MSK)

---

## การตรวจสอบและติดตาม (Monitoring)
* **Health Checks:** ระบุอินสแตนซ์ที่ไม่สมบูรณ์ (Unhealthy) โดยใช้ EC2 Status Checks (ค่าเริ่มต้น), ELB Health Checks หรือ Custom
* **CloudWatch Metrics:** ติดตามข้อมูลทางสถิติของกลุ่ม Auto Scaling
* **SNS Notifications:** ส่งการแจ้งเตือนเมื่อมีการเปิดหรือปิดอินสแตนซ์
* **CloudTrail:** บันทึกประวัติการเรียกใช้ API ของ Auto Scaling

---

## ค่าบริการ (Pricing)
* **ไม่มีค่าใช้จ่ายเพิ่มเติม** สำหรับการใช้บริการ AWS Auto Scaling
* คุณจ่ายเพียงแค่ **ค่าทรัพยากร AWS** ที่ระบบจัดการให้ (เช่น ค่าเครื่อง EC2, ค่า DynamoDB Capacity)
* Scaling policies และ Predictive scaling **ใช้งานฟรี**
* อาจมีค่าใช้จ่ายเพิ่มเติมจาก CloudWatch Alarms หรือ Custom Metrics ที่นำมาใช้ประกอบนโยบาย