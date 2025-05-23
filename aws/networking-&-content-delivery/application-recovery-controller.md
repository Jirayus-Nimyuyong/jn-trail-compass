# Application Recovery Controller

**Amazon Route 53 Application Recovery Controller (ARC)** คือบริการในกลุ่ม Route 53 ที่ช่วยให้คุณ **ตรวจสอบและควบคุมความพร้อมใช้งาน (availability)** ของแอปพลิเคชันในระบบที่มีหลาย Region หรือหลาย Availability Zone เพื่อให้คุณสามารถสลับเส้นทาง (routing) ไปยังระบบสำรองได้ **อย่างปลอดภัยและแม่นยำ** ในกรณีเกิดเหตุขัดข้อง

---

## สรุปภาพรวม

Application Recovery Controller ประกอบด้วย 2 ความสามารถหลัก:

1. **Readiness Check**
   ตรวจสอบว่าระบบสำรอง (standby) พร้อมที่จะรับ traffic หรือไม่ (ทั้งด้าน infrastructure และ configuration)

2. **Routing Control**
   ควบคุมการส่ง traffic (เช่นเปลี่ยน DNS routing policy บน Route 53) เพื่อสลับจาก Region หลัก → Region สำรอง

---

## ส่วนประกอบหลักของ ARC

| องค์ประกอบ                | รายละเอียด                                                                                  |
| ------------------------- | ------------------------------------------------------------------------------------------- |
| **Readiness Check**       | ตรวจสอบว่า resources ที่จำเป็นเช่น ELB, ASG, RDS, Route 53 อยู่ในสถานะที่พร้อมใช้งานหรือยัง |
| **Resource Set**          | กลุ่มของ resource ที่ต้องตรวจสอบ เช่น Network Load Balancer, ECS Service                    |
| **Routing Control**       | ปุ่มควบคุม traffic ที่ใช้สลับเส้นทาง DNS หรือ Application Load Balancer                     |
| **Safety Rules**          | กฎเพื่อป้องกันไม่ให้การสลับ routing ส่งผลร้าย เช่น ต้องมีอย่างน้อย 1 Region รับ traffic     |
| **Control Panel**         | ชุดของ Routing Control ที่สามารถเปิด/ปิดการสลับ routing ได้                                 |
| **Cluster**               | ศูนย์ควบคุม routing control แบบ distributed (multi-AZ) เพื่อความทนทานสูง                    |
| **Routing Control State** | สถานะของ routing (ON / OFF) ที่กำหนดว่า endpoint ไหนจะรับ traffic                           |

---

## กรณีใช้งาน (Use Cases)

### 1. **Disaster Recovery (DR) แบบ Active-Passive**

* Region A ให้บริการปกติ
* Region B เป็นสำรอง
* หาก Region A ล่ม → ใช้ ARC routing control สั่งเปลี่ยนเส้นทางไปยัง Region B

### 2. **Multi-Region Application**

* ใช้ ARC ควบคุมว่า region ไหนกำลัง active อยู่
* ป้องกันการส่ง traffic ไปยัง region ที่ยัง boot ไม่เสร็จหรือระบบยังไม่พร้อม

---

## ตัวอย่างการทำงาน

1. สร้าง `Readiness Check` ให้กับ:

   * Application Load Balancer
   * Auto Scaling Group
   * RDS

2. สร้าง `Routing Control` สำหรับ:

   * Route 53 Failover Record
   * ALB Listener Rule

3. ตั้ง `Safety Rule` ว่า:

   * ห้ามปิด routing ของทุก region พร้อมกัน
   * ต้องมีอย่างน้อย 1 routing control เปิด

4. เมื่อเกิดเหตุการณ์ล่ม:

   * ตรวจสอบ Readiness ของ region สำรอง
   * หากพร้อม → เปิด routing control ของ region สำรอง
   * ARC จะเปลี่ยนเส้นทาง DNS/ALB ไปยัง region ที่พร้อม

---

## ความปลอดภัยและความมั่นคง

* ARC สร้าง Cluster แบบ distributed ใน 5 AZ เพื่อให้แน่ใจว่าการควบคุม routing จะไม่ล่มตามแอปพลิเคชัน
* รองรับ **manual switch**, **auto switch**, และ **API integration** กับ Incident Response Tools เช่น AWS Systems Manager หรือ external automation

---

## เปรียบเทียบกับ Route 53 Health Check ธรรมดา

| ฟีเจอร์                       | Route 53 Health Check | ARC             |
| ----------------------------- | --------------------- | --------------- |
| ตรวจสอบ instance              | ✅                     | ✅               |
| ตรวจสอบ readiness ระดับ infra | ❌                     | ✅               |
| ป้องกัน human error           | ❌                     | ✅ (Safety rule) |
| ควบคุม DNS routing            | ✅                     | ✅               |
| รองรับ Multi-region failover  | บางส่วน               | ✅ เต็มรูปแบบ    |

---

## การติดตามผลและ Audit

* คุณสามารถดูสถานะของ routing control แบบ real-time ได้
* มี integration กับ Amazon CloudWatch และ CloudTrail เพื่อดู logs และ events
* รองรับการใช้ร่วมกับ Systems Manager Automation สำหรับสคริปต์ failover

---

## ราคา

ARC มีการคิดค่าบริการแยกตาม:

* จำนวน **Readiness Checks**
* จำนวน **Routing Controls**
* การใช้ Cluster และ Control Panel

---

## เหมาะกับใคร?

* องค์กรที่ต้องการ **High Availability (HA)** และ **Disaster Recovery (DR)**
* แอปพลิเคชันที่ต้องการ multi-region architecture
* ทีม SRE/DevOps ที่ต้องการควบคุม failover แบบ manual หรือ automatic ได้อย่างปลอดภัย

---
