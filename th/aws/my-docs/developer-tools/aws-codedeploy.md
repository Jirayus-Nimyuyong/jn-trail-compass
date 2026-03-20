# AWS CodeDeploy Cheat Sheet

**AWS CodeDeploy** เป็นบริการ Deploy ซอฟต์แวร์แบบ Managed เต็มรูปแบบที่ช่วยเปลี่ยนกระบวนการ Deploy ให้เป็นอัตโนมัติ โดยรองรับบริการประมวลผลหลากหลาย เช่น **Amazon EC2, AWS Fargate, AWS Lambda** และเซิร์ฟเวอร์ **On-premises** ของคุณ

### แนวคิดหลัก (Concepts)
* **Application:** ชื่อที่ใช้ระบุแอปพลิเคชันที่คุณต้องการ Deploy ซึ่งทำหน้าที่เป็นตัวบรรจุ (Container) เพื่อให้แน่ใจว่ามีการอ้างอิงชุดข้อมูล Revision, การตั้งค่าการ Deploy และกลุ่มการ Deploy ที่ถูกต้อง
* **Compute platform:** แพลตฟอร์มที่ CodeDeploy ใช้รันแอปพลิเคชัน (EC2, ECS, Lambda, On-premises)
* **Deployment configuration:** ชุดกฎเกณฑ์และเงื่อนไขความสำเร็จ/ล้มเหลวที่ CodeDeploy ใช้ระหว่างการ Deploy
* **Deployment group:** กลุ่มของเป้าหมายที่จะ Deploy เช่น อินสแตนซ์ที่ติดแท็ก (Tagged), Auto Scaling groups หรือ ECS Service
* **Revision:**
    * **Lambda/ECS:** ไฟล์ AppSpec ในรูปแบบ YAML หรือ JSON ที่ระบุรายละเอียดฟังก์ชันหรือ Task definition
    * **EC2/On-Premises:** ไฟล์ Archive ที่มีซอร์สโค้ดและไฟล์ AppSpec โดยเก็บไว้ใน **Amazon S3** หรือ GitHub
* **Deployment lifecycle events:** ขั้นตอนที่กำหนดไว้ล่วงหน้า (เช่น *BeforeInstall, AfterInstall, ValidateService*) ซึ่งเปิดโอกาสให้คุณรันโค้ดสคริปต์ในแต่ละช่วงได้

---

### คุณสมบัติเด่น (Features)
* **ลด Downtime:** ใช้การอัปเดตแบบ Rolling updates และติดตามความสมบูรณ์ (Health tracking) ของการ Deploy
* **ไม่จำกัดภาษา:** รองรับทุกภาษาโปรแกรมและทุกแพลตฟอร์ม
* **การรวมระบบ:** ทำงานร่วมกับ **Auto Scaling** และ **Elastic Load Balancing** เพื่อให้แน่ใจว่าอินสแตนซ์ใหม่ได้รับการลงโปรแกรมก่อนรับทราฟฟิก
* **ประเภทการ Deploy:**
    1.  **In-place deployment:** หยุดแอปเดิมบนอินสแตนซ์เดิมแล้วลงตัวใหม่ (ใช้ได้เฉพาะ EC2/On-Premises)
    2.  **Blue/Green deployment:** สลับทราฟฟิกจากสภาพแวดล้อมเก่า (Blue) ไปยังสภาพแวดล้อมใหม่ (Green) ที่เตรียมไว้แล้ว

---

### AppSpec File (Application Specification)
ใช้จัดการลำดับเหตุการณ์ (Lifecycle hooks) ในการ Deploy:
* **ECS/Lambda:** ระบุชื่อ Service, Container, Port และฟังก์ชันที่ใช้ทำ Validation tests
* **EC2/On-Premises:** เขียนด้วย YAML เสมอ เพื่อแมปไฟล์ต้นทางไปยังปลายทางบนอินสแตนซ์, กำหนดสิทธิ์ไฟล์ และระบุสคริปต์ที่จะรันในแต่ละขั้นตอน

---

### การ Deploy และการย้อนกลับ (Deployments & Rollbacks)
* **การหยุดงาน:** สามารถสั่ง Stop deployment ได้ผ่าน Console หรือ CLI (สถานะจะเป็น Succeeded, Pending หรือ Error)
* **การ Rollback:**
    * **Lambda/EC2:** ทำการ Deploy Revision เก่าซ้ำเข้าไปใหม่เป็นงานใหม่
    * **ECS:** ทำการเปลี่ยนเส้นทางทราฟฟิกกลับไปยัง Task set เดิม
* **CodeDeploy Agent:** ซอฟต์แวร์ที่ต้องติดตั้งบน EC2/On-premises (เวอร์ชัน 1.8.0 รองรับ Amazon Linux 2023, Windows 2022, RHEL 9 และ Ubuntu 22.04 แต่ยังไม่รองรับ Ubuntu 24.04 ARM64 อย่างเป็นทางการ)

---

### กลยุทธ์การสลับทราฟฟิก (Traffic Shifting) สำหรับ Lambda/ECS
* **Canary:** สลับทราฟฟิกเป็น 2 ช่วง (เช่น สลับไป 10% ก่อน แล้วรอ X นาทีค่อยสลับส่วนที่เหลือทั้งหมด)
* **Linear:** สลับทราฟฟิกทีละส่วนเท่าๆ กันตามช่วงเวลาที่กำหนด (เช่น เพิ่มทีละ 10% ทุก 3 นาที)
* **All-at-once:** สลับทราฟฟิกทั้งหมดไปยังเวอร์ชันใหม่ทันที

---

### การตั้งค่าการ Deploy (Deployment Configurations)
| การตั้งค่า | คำอธิบาย |
| :--- | :--- |
| **AllAtOnce** | พยายาม Deploy ทุกอินสแตนซ์พร้อมกัน สำเร็จเมื่อมีอย่างน้อย 1 เครื่องใช้งานได้ |
| **HalfAtATime** | Deploy ทีละไม่เกินครึ่งหนึ่งของจำนวนเครื่องทั้งหมดพร้อมกัน |
| **OneAtATime** | Deploy ทีละ 1 เครื่องจนครบ (ถ้าเครื่องสุดท้ายล้มเหลว งานอาจยังถือว่าสำเร็จในบางเงื่อนไข) |

---

### การตรวจสอบและการคิดราคา (Monitoring & Pricing)
* **เครื่องมือตรวจสอบ:** Amazon CloudWatch (Alarms/Logs), AWS CloudTrail, Amazon SNS
* **การคิดราคา:**
    * **ฟรี:** สำหรับการ Deploy ไปยัง Amazon EC2 หรือ AWS Lambda
    * **มีค่าใช้จ่าย:** คิดตามจำนวนการอัปเดตอินสแตนซ์ **On-premises**