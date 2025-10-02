# AWS CodeDeploy

AWS CodeDeploy คือบริการสำหรับการ **ปรับใช้ (deployment)** แอปพลิเคชันโดยอัตโนมัติ ทำให้สามารถอัปเกรดแอปจากเวอร์ชัน 1 ไปเวอร์ชัน 2 ได้อย่างราบรื่น

## เป้าหมายการปรับใช้ (Deployment Targets)

คุณสามารถปรับใช้แอปไปยังเป้าหมายเหล่านี้ได้:

* EC2 instances
* เซิร์ฟเวอร์ On-premises
* Lambda functions
* ECS services

*หมายเหตุ: EC2 และ on-premises ใช้วิธี deployment แบบเดียวกัน*

## ฟีเจอร์ของ CodeDeploy

* รองรับ **การอัปเดตแอปพลิเคชันอัตโนมัติ**
* มีฟีเจอร์ **rollback อัตโนมัติ** หากการปรับใช้ล้มเหลวหรือมี alarm ถูก trigger
* ควบคุมความเร็วการปรับใช้ได้ เช่น ทีละเครื่อง, ครึ่งหนึ่ง, ทั้งหมด, หรือใช้ **Blue/Green Deployment**

การปรับใช้ถูกควบคุมด้วยไฟล์ **appspec.yml** ซึ่งกำหนดว่า deployment จะทำงานอย่างไร

## Deployment บน EC2 และ On-Premises

รองรับการปรับใช้ 2 แบบ:

1. **In-place deployment**
2. **Blue/green deployment**

> **เงื่อนไข**: ต้องติดตั้ง **CodeDeploy agent** บน instance เป้าหมาย เพื่อให้ agent ทำการอัปเดตแอป

## ความเร็วของการปรับใช้ (Deployment Speed Options)

* **AllAtOnce**: อัปเดตทุก instance พร้อมกัน → downtime สูงสุด
* **HalfAtATime**: อัปเดตทีละครึ่ง → ลด downtime ได้
* **OneAtATime**: อัปเดตทีละเครื่อง → downtime น้อยที่สุด แต่ช้าที่สุด
* สามารถกำหนดค่า custom เองได้

**ตัวอย่าง In-Place Deployment แบบ HalfAtATime**

* แอปเวอร์ชัน 1 รันอยู่บน EC2 4 เครื่อง
* ปรับใช้แบบครึ่งต่อครึ่ง → หยุด 2 เครื่อง → อัปเกรดเป็นเวอร์ชัน 2 → เสร็จแล้วทำกับอีก 2 เครื่อง
* เป็นการปรับใช้แบบค่อย ๆ ลด downtime

## Blue/Green Deployment

* รัน **สองเวอร์ชันพร้อมกัน**
* Load Balancer ชี้ไปยังกลุ่ม instance เวอร์ชัน 1 (blue)
* สร้าง Auto Scaling group ใหม่สำหรับเวอร์ชัน 2 (green)
* Load Balancer ค่อย ๆ ย้าย traffic จาก blue → green
* หลังจากเสร็จสิ้น traffic shift → terminate instance เวอร์ชันเก่า
* ช่วยให้ **ปรับใช้แบบ Zero Downtime**

## การติดตั้ง CodeDeploy Agent

Agent ต้องติดตั้งบน EC2 ก่อนจึงจะ deploy ได้

* ติดตั้งด้วยคำสั่ง Linux (manual)
* หรือใช้ AWS Systems Manager (อัตโนมัติ)

**สิทธิ์ IAM ของ EC2 instance**: ต้องมีสิทธิ์เข้าถึง **S3 bucket** ที่เก็บ application revisions เพื่อให้ agent โหลดไฟล์ deployment มาติดตั้ง

## CodeDeploy กับ Lambda

* CodeDeploy สามารถ **traffic shifting สำหรับ Lambda aliases** ได้
* เช่น PROD alias จากเวอร์ชัน 1 → เวอร์ชัน 2
* ค่า **X (0 → 100)** ใช้บอกสัดส่วน traffic ที่ถูกย้ายจากเวอร์ชันเก่าไปใหม่

**กลยุทธ์การย้าย traffic (Traffic Shifting Strategies):**

* **Linear** → เพิ่ม traffic แบบเปอร์เซ็นต์คงที่ทุก ๆ N นาที
* **Canary** → ส่ง traffic น้อย ๆ ไปทดสอบก่อน (เช่น 10% 5 นาที) ถ้าผ่านค่อยย้ายทั้งหมด
* **AllAtOnce** → ย้าย traffic ทั้งหมดในครั้งเดียว

## CodeDeploy กับ ECS

* รองรับเฉพาะ **Blue/Green Deployment**
* การทำงาน:

  * Load Balancer route traffic ไปยัง target group ที่มี ECS tasks
  * CodeDeploy สร้าง target group ใหม่ (green) สำหรับ task definition ใหม่
  * รัน tasks ใหม่ใน cluster ด้วยความจุเท่าเดิม
  * ค่อย ๆ ย้าย traffic จาก blue → green
  * ใช้กลยุทธ์ linear, canary หรือ all-at-once เช่นเดียวกับ Lambda

## CodeDeploy สำหรับ EC2 และ Auto Scaling Group (ASG)

เมื่อทำการปรับใช้ (deploy) ไปยัง EC2 instance คุณจะต้องมีไฟล์ **appspec.yml** ที่วางไว้ที่ root ของ code repository ไฟล์นี้จะกำหนดกลยุทธ์การปรับใช้ (deployment strategy) และ **hooks** ที่ใช้สำหรับตรวจสอบความถูกต้องหลังจากแต่ละขั้นตอนของการปรับใช้

## กลยุทธ์ In-Place Deployment

* เป็นกลยุทธ์ที่ใช้บ่อยที่สุด
* จะอัปเดต EC2 instances ที่มีอยู่โดยตรง
* ตัวอย่างเช่น กำหนดการปรับใช้แบบ **HalfAtATime** → หยุดทำงานครึ่งหนึ่งของ instances เพื่ออัปเกรดเป็นเวอร์ชัน 2 จากนั้นอัปเกรดอีกครึ่งหนึ่ง

## การปรับใช้ร่วมกับ Auto Scaling Groups (ASG)

กรณีที่ปรับใช้กับ ASG จะมีความซับซ้อนมากขึ้น โดยมี 2 ตัวเลือกหลัก:

1. **In-Place Deployment**

   * คล้ายกับการปรับใช้ EC2 ปกติ → อัปเดต instances ที่มีอยู่โดยตรง

2. **Blue/Green Deployment**

   * CodeDeploy จะสร้าง Auto Scaling Group (ASG) ใหม่ที่คัดลอกค่าการตั้งค่าเดิมมา
   * จากนั้นสามารถกำหนดระยะเวลาเก็บ ASG เก่าไว้ได้
   * Elastic Load Balancer (ELB) จะสลับการรับส่งข้อมูล (traffic) จากกลุ่มเก่าไปยังกลุ่มใหม่

## In-Place Deployment ร่วมกับ ASG

* หาก ASG สร้าง EC2 instances ใหม่ขึ้นมาโดยอัตโนมัติ CodeDeploy จะปรับใช้แอปพลิเคชันลงใน instances ใหม่เหล่านั้นโดยอัตโนมัติ
* คุณสมบัตินี้ช่วยเพิ่มความสามารถและความยืดหยุ่นอย่างมากให้กับกระบวนการปรับใช้

## Workflow ของ Blue/Green Deployment

สมมติว่ามีการปรับใช้แบบ Blue/Green:

1. เริ่มต้น ELB จะส่ง traffic ไปยัง EC2 instances ที่รันด้วย **เวอร์ชัน 1 (V1)** ภายใน ASG
2. CodeDeploy ทำการปรับใช้แอปเวอร์ชัน V1 บน instances เหล่านี้
3. เมื่ออัปเกรดเป็น **เวอร์ชัน 2 (V2)** → จะสร้าง instances ใหม่ขึ้นมาจาก **launch template V2**
4. CodeDeploy จะปรับใช้แอป V2 บน instances เหล่านี้
5. ELB จะส่ง traffic ไปยังทั้ง V1 และ V2 ชั่วระยะเวลาหนึ่ง
6. หากทุกอย่างทำงานปกติ → V1 instances จะถูก terminate → การปรับใช้เสร็จสมบูรณ์

## การ Redeploy และ Rollback

Rollback = กระบวนการนำเวอร์ชันก่อนหน้าที่ใช้งานได้ (known good revision) มาปรับใช้อีกครั้งเพื่อย้อนกลับไปสู่สถานะที่มั่นคง

มี 2 วิธี:

* **อัตโนมัติ (Automatic)** → เกิดขึ้นเมื่อการปรับใช้ล้มเหลวหรือ CloudWatch Alarms แจ้งเตือน
* **ด้วยตนเอง (Manual)** → ผู้ใช้เป็นคนสั่ง rollback

> ❗ ถ้า rollback ถูกปิดใช้งาน (disabled) → จะไม่มีการ rollback

## กลไกการ Rollback ของ CodeDeploy

* เมื่อ rollback เกิดขึ้น **CodeDeploy จะไม่กู้คืน (restore) deployment เดิมในที่เดิม**
* แต่จะ **สร้างการปรับใช้ใหม่** โดยใช้ **last known good revision**
* กล่าวคือ rollback = การ deploy เวอร์ชันที่เสถียรอีกครั้ง ไม่ใช่การย้อนกลับไปสู่สถานะเก่าแบบ snapshot

นี่เป็นรายละเอียดที่สำคัญและอาจถูกถามในข้อสอบ

## สรุป

* CodeDeploy คือบริการที่ช่วยปรับใช้แอปบน **EC2, on-premises, Lambda, และ ECS**
* รองรับทั้ง **in-place** และ **blue/green** deployment
* ปรับแต่งความเร็วในการ deploy ได้ เช่น one-at-a-time, half-at-a-time, all-at-once
* มีระบบ **rollback อัตโนมัติ** เพื่อความปลอดภัย
* Lambda และ ECS รองรับการ **traffic shifting** (linear, canary, all-at-once)
* CodeDeploy ใช้ไฟล์ **appspec.yml** ที่ root ของ code เพื่อกำหนดกลยุทธ์และ hooks
* **In-place deployment** → อัปเดต EC2 instances ที่มีอยู่
* **Blue/Green deployment** → สร้าง ASG ใหม่และ ELB จะสลับ traffic ให้
* หากมี EC2 ใหม่ถูกสร้างจาก ASG → CodeDeploy จะ deploy ให้โดยอัตโนมัติ
* Rollback = การ deploy เวอร์ชันที่ดีล่าสุดอีกครั้ง (ไม่ใช่การกู้คืนสถานะเก่า)
* Rollback อาจเกิดขึ้น **อัตโนมัติ** หรือ **ด้วยตนเอง**

## Key Takeaways

* CodeDeploy = ระบบปรับใช้แอปอัตโนมัติ
* รองรับ: EC2, On-premises, Lambda, ECS
* มีกลยุทธ์: in-place, blue/green
* ความเร็ว deploy: AllAtOnce, HalfAtATime, OneAtATime
* Rollback อัตโนมัติเมื่อเกิดปัญหา
* Traffic shifting ใช้ Linear, Canary, หรือ AllAtOnce
* **appspec.yml** = ไฟล์หลักสำหรับกำหนดการปรับใช้
* In-place = อัปเดต instance เดิม
* Blue/Green = สร้าง ASG ใหม่ + ELB switch traffic
* ASG instances ใหม่ → CodeDeploy deploy ให้ทันที
* Rollback = redeploy เวอร์ชันเสถียร ไม่ใช่ restore deployment เก่า