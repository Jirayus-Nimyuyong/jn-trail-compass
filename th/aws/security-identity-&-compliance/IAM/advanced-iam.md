# Advanced IAM

## การประเมินสิทธิ์ (Authorization Model and Policy Evaluation)

การประเมินสิทธิ์ใน IAM มีหลักการง่าย ๆ ดังนี้:

1. ถ้ามี **Explicit DENY** ในนโยบายใด ๆ → การตัดสินใจสุดท้ายคือ **DENY**
2. ถ้ามี **Explicit ALLOW** และไม่มี DENY → การตัดสินใจสุดท้ายคือ **ALLOW**
3. ถ้าไม่มีทั้ง ALLOW และ DENY → ค่า **Default คือ DENY**

**ตัวอย่าง:**
ผู้ใช้พยายามสร้าง DynamoDB table → เริ่มจาก DENY เป็นค่าเริ่มต้น → ตรวจสอบนโยบายทั้งหมดที่แนบกับผู้ใช้:

* ถ้านโยบายใด ๆ **ปฏิเสธอย่างชัดเจน** → DENY
* ถ้าไม่มี DENY → ตรวจสอบ ALLOW
* ถ้ามี ALLOW → ALLOW, ไม่เช่นนั้นยังคง DENY

**หมายเหตุ:** ถ้ามีทั้ง ALLOW และ DENY → **DENY ชัดเจนจะมีผลเหนือกว่า**

## การทำงานร่วมกันระหว่าง IAM Policies และ S3 Bucket Policies

* **IAM Policies**: แนบกับ **ผู้ใช้, กลุ่ม, หรือ Roles**
* **S3 Bucket Policies**: แนบตรงกับ **S3 Bucket**

เมื่อ IAM principal (ผู้ใช้, Role, หรือกลุ่ม) ทำงานกับ S3 Bucket → **สิทธิ์ที่ได้จริงจะเป็นผลรวม (union) ของ IAM Policies และ S3 Bucket Policies**

**ตัวอย่างการรวม IAM กับ S3 Policies:**

1. **IAM Role RW ให้ EC2, ไม่มี S3 Bucket Policy** → EC2 อ่าน/เขียนได้
2. **IAM Role RW ให้ EC2, S3 Bucket Policy มี Explicit DENY** → EC2 ถูกปฏิเสธ
3. **IAM Role ไม่มีสิทธิ์ S3, S3 Bucket Policy ให้ RW** → EC2 อ่าน/เขียนได้
4. **IAM Role Explicit DENY, S3 Bucket Policy ให้ RW** → EC2 ถูกปฏิเสธ

## Dynamic Policies ใน IAM

เพื่อให้การจัดการสิทธิ์แบบ **สเกลใหญ่** ง่ายขึ้น เราสามารถใช้ **Policy Variables** เช่น `{aws:username}`

**ตัวอย่าง:**
ต้องการให้ผู้ใช้แต่ละคนเข้าถึงโฟลเดอร์ของตนเองใน S3 (`/home/<username>`)

* วิธีเก่า: สร้างนโยบายแยกสำหรับแต่ละผู้ใช้ → ไม่สามารถสเกลได้
* วิธี Dynamic: ใช้นโยบายเดียวกับ `{aws:username}` → runtime แทนค่าด้วยชื่อผู้ใช้จริง → สามารถใช้สำหรับผู้ใช้หลายคนได้

## ประเภทของ IAM Policies

1. **AWS Managed Policy**

   * ดูแลโดย AWS
   * ใช้สำหรับ Power Users / Admins
   * อัปเดตอัตโนมัติเมื่อต้องรองรับบริการหรือ API ใหม่

2. **Customer Managed Policy**

   * สร้างและจัดการโดยผู้ใช้เอง
   * ใช้ซ้ำได้หลาย principal
   * มี version control, rollback และ audit
   * **ถือเป็น Best Practice**

3. **Inline Policy**

   * แนบตรงกับ principal หนึ่ง ๆ
   * ลบทันทีถ้า principal ถูกลบ
   * จำกัดขนาดและจัดการยาก

## แนวปฏิบัติที่ดี (IAM Best Practices)

### General

* **ห้ามใช้ Root Credentials** นอกจากตั้งค่า AWS Account → เปิด MFA สำหรับ Root
* ให้สิทธิ์ **Least Privilege**
* กลุ่ม / ผู้ใช้ / Role → มีสิทธิ์ **ขั้นต่ำสุดที่จำเป็น**
* **ห้ามให้สิทธิ์ “*” ครอบคลุมทั้งบริการ**
* ตรวจสอบ API calls ผ่าน **CloudTrail** (โดยเฉพาะ Denied calls)
* **อย่าเก็บ IAM keys บนเครื่องใด ๆ นอกจากเครื่องส่วนตัวหรือ On-prem server**
* On-prem server → ใช้ **STS** เพื่อรับ temporary credentials

### IAM Roles

* EC2, Lambda, ECS Tasks → ควรมี **Role ของตัวเอง**
* CodeBuild → สร้าง **Service Role ของตัวเอง**
* ให้สิทธิ์ **Least Privilege** กับทุก Role
* สร้าง Role แยกตาม application / Lambda function → **ไม่ควร reuse**

### Cross Account Access

* กำหนด Role สำหรับ account อื่นเข้าถึง
* ระบุว่า account ใดเข้าถึงได้
* ใช้ **AWS STS (AssumeRole API)** เพื่อรับ credentials ชั่วคราว
* Temporary credentials → ใช้ได้ **15 นาที – 1 ชั่วโมง**