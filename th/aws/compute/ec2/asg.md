# Auto Scaling Groups (ASG)

* เมื่อต้อง **deploy เว็บไซต์หรือแอปพลิเคชัน** ปริมาณโหลดอาจเปลี่ยนแปลงได้ตามจำนวนผู้ใช้งาน
* ใน AWS สามารถ **สร้างและลบเซิร์ฟเวอร์ (EC2 instances) ได้อย่างรวดเร็ว** ผ่าน API
* **Auto Scaling Group (ASG)** ใช้เพื่อ **ทำให้การปรับขนาดเซิร์ฟเวอร์เป็นอัตโนมัติ**

  * **Scale out** → เพิ่ม EC2 instance เมื่อโหลดสูงขึ้น
  * **Scale in** → ลด EC2 instance เมื่อโหลดต่ำลง
* สามารถกำหนด **จำนวนขั้นต่ำและจำนวนสูงสุดของ EC2 instance** ที่ต้องการให้รันตลอดเวลา
* เมื่อใช้ร่วมกับ **Load Balancer**

  * EC2 instance ใน ASG จะ **เชื่อมต่อกับ Load Balancer**
  * ถ้า instance ใดไม่สมบูรณ์ (unhealthy) → ASG จะ **terminate และสร้าง instance ใหม่อัตโนมัติ**
* **ASG ไม่มีค่าใช้จ่ายเพิ่มเติม** → จ่ายเฉพาะทรัพยากรที่สร้างขึ้น เช่น EC2 instance

## การตั้งค่าความจุของ ASG

* **Minimum capacity** → จำนวน instance ขั้นต่ำ (ตัวอย่าง: 2)

* **Desired capacity** → จำนวน instance ที่ต้องการให้รัน (ตัวอย่าง: 4)

* **Maximum capacity** → จำนวน instance สูงสุดที่อนุญาต (ตัวอย่าง: 7)

* หากปรับ Desired capacity สูงขึ้นแต่ยังไม่เกิน Maximum → ASG จะ **scale out** โดยเพิ่ม EC2 instance ตามความจำเป็น

## การทำงานร่วมกับ Load Balancer

* ASG ทำงานร่วมกับ **Elastic Load Balancer (ELB)**

  * ตัวอย่าง: มี 4 instance ใน ASG → ELB จะ **กระจาย traffic ไปยังทุก instance ทันที**
  * ELB ทำ **Health Check** → ส่งต่อผลไปยัง ASG → ASG จะ **terminate instance ที่ไม่สมบูรณ์**
  * เมื่อต้อง **scale out** → ELB จะกระจาย traffic ไปยัง instance ใหม่ด้วย
* การรวมกันของ **Load Balancer + ASG** ทำให้ **โหลดสมดุลและแอปพร้อมใช้งานตลอดเวลา**

## Launch Templates และ Attribute ของ ASG

* ต้องสร้าง **Launch Template** สำหรับสร้าง EC2 instance ใน ASG

  * เดิมเคยใช้ Launch Configuration → ตอนนี้ Deprecated แล้ว

* Launch Template ประกอบด้วยข้อมูลเช่น:

  * AMI (Amazon Machine Image)
  * ประเภทของ Instance
  * EC2 User Data
  * EBS Volumes
  * Security Groups
  * SSH Key Pair
  * IAM Role สำหรับ EC2
  * Network/Subnet
  * ข้อมูล Load Balancer

* นอกจากนี้ ASG ต้องกำหนด:

  * Minimum size, Maximum size, Initial capacity
  * Scaling policies

## Scaling Policies และ CloudWatch Alarms

* ASG สามารถ **scale in/out อัตโนมัติ** ตาม **CloudWatch Alarms**
* ตัวอย่าง: ASG มี 3 EC2 instance

  * ถ้า CloudWatch Alarm ถูก trigger → เกิด **scale-out**
  * Alarm อาจอิงจาก **Average CPU Utilization**
  * CPU สูง → เพิ่ม EC2 instance อัตโนมัติ
* สามารถสร้าง **Scale-out Policy** → เพิ่มจำนวน instance
* หรือ **Scale-in Policy** → ลดจำนวน instance

## Auto Scaling Groups (ASG) – นโยบายการปรับขนาด (Scaling Policies)

ASG มี **นโยบายการปรับขนาดหลายแบบ** ดังนี้

1. **Dynamic Scaling (การปรับขนาดแบบไดนามิก)**

   * รวมถึง **Target Tracking Scaling**

     * วิธีนี้ตั้งค่าได้ง่าย
     * เรากำหนด metric ที่ต้องการ เช่น **CPU utilization**
     * กำหนดค่าเป้าหมาย เช่น 40% → ASG จะ **scale out หรือ scale in** อัตโนมัติให้ metric อยู่ใกล้ค่าเป้าหมาย
   * ใน Dynamic Scaling ยังมี **Simple/Step Scaling**

     * ใช้ **CloudWatch Alarms** เพื่อ trigger การเพิ่มหรือลดจำนวน instance

2. **Scheduled Scaling (การปรับขนาดตามตารางเวลา)**

   * ใช้เมื่อทราบ **รูปแบบการใช้งานล่วงหน้า**
   * ตัวอย่าง: ทุกวันศุกร์ 17:00 จะมีผู้ใช้มาก → เพิ่ม Minimum capacity เป็น 10

3. **Predictive Scaling (การปรับขนาดเชิงพยากรณ์)**

   * ทำนายโหลดล่วงหน้าและตั้ง scaling actions ตาม forecast
   * ใช้กับ **รูปแบบโหลดซ้ำๆ**
   * ASG วิเคราะห์ **ข้อมูลโหลดย้อนหลัง** → สร้าง forecast → กำหนด scaling actions

### Metrics ที่ใช้สำหรับ Scaling

การเลือก metric ที่เหมาะสมขึ้นอยู่กับพฤติกรรมแอปพลิเคชัน

* **CPU Utilization** → ใช้เมื่อ instance ประมวลผลคำขอ
* **RequestCountPerTarget** → วัดจำนวนคำขอต่อ target

  * ตัวอย่าง: ถ้า EC2 instance รองรับได้ 1,000 requests ต่อ target → ตั้งเป็น scaling target
* **Network In/Out** → เหมาะสำหรับแอปที่ใช้ network หนัก เช่น การอัปโหลด/ดาวน์โหลดไฟล์
* **Custom Metrics** → metric เฉพาะของแอปสามารถ push ไปยัง CloudWatch เพื่อใช้ในการ scaling

### Scaling Cooldown

* **Cooldown period** → ระยะเวลารอหลังการปรับขนาด เช่น เพิ่มหรือลด instance
* ค่า default → **5 นาที (300 วินาที)**
* ในช่วง cooldown → ASG **จะไม่ launch หรือ terminate instance เพิ่มเติม**
* ทำให้ metrics มีเวลาสมดุลและ instance ใหม่พร้อมใช้งานก่อนการปรับขนาดครั้งต่อไป

**Tips เพื่อปรับปรุงความเร็วการ scaling:**

* ใช้ **ready-to-use AMIs** → ลดเวลาในการ config instance
* เปิด **Detailed Monitoring** → update metrics ทุก 1 นาที → ทำให้ scaling ตอบสนองเร็วขึ้น

## Auto Scaling Groups – Instance Refresh

### แนะนำ Instance Refresh

**Instance Refresh** เป็นฟีเจอร์ที่สะดวกมากของ Auto Scaling Groups (ASG)

* ช่วยให้คุณ **อัปเดตทั้ง Auto Scaling Group** ด้วย **launch template ใหม่** ที่สร้างขึ้น
* แทนที่จะต้อง **terminate instance ทีละตัว** และรอให้กลับมาทำงานใหม่
* ฟีเจอร์นี้จะ **ทำงานอัตโนมัติ** ให้ EC2 instance ทั้งหมดใน ASG อัปเดตเป็นรุ่นใหม่

### ตัวอย่างสถานการณ์

* สมมติว่า ASG ของคุณมี EC2 instance ที่สร้างด้วย **launch template รุ่นเก่า**
* คุณอัปเดต **AMI** ของ EC2 instance แล้วสร้าง **launch template ใหม่**
* เรียกใช้ API ชื่อ **Start Instance Refresh** เพื่อเริ่มกระบวนการอัปเดต

### การทำงานของ Instance Refresh

1. เริ่ม Instance Refresh → กำหนด **Minimum Healthy Percentage**

   * ตัวอย่าง: 60%
   * หมายถึง ASG ต้องมี instance ที่พร้อมใช้งานไม่น้อยกว่า 60% ตลอดกระบวนการ refresh
2. ASG จะ **terminate instance รุ่นเก่า** และ **launch instance ใหม่** ด้วย launch template ใหม่
3. กระบวนการนี้จะดำเนินต่อไป **จน instance รุ่นเก่าทั้งหมดถูกแทนที่ด้วย instance รุ่นใหม่**

ดังนั้นจึงเรียกว่า **EC2 Instance Refresh**: instances เก่าถูก terminate → instances ใหม่ถูกสร้างขึ้นด้วยการตั้งค่าอัปเดต

### Warm-up Time

* เพื่อให้ EC2 instance ใหม่มีเวลา **พร้อมใช้งานและรองรับ traffic**
* สามารถกำหนด **warm-up time** → ระยะเวลารอจน instance ใหม่ถือว่าพร้อมใช้งาน

## Key Takeaways

* Auto Scaling Groups เป็นวิธี **ปรับจำนวน EC2 instance อัตโนมัติตามโหลดที่เปลี่ยนแปลง**
* ช่วยให้ **แอปพร้อมใช้งานและใช้ทรัพยากรอย่างมีประสิทธิภาพ**
* ASG **ปรับจำนวน EC2 instance อัตโนมัติเพื่อตอบสนองโหลดที่เปลี่ยนแปลง**
* รองรับ **Scale out (เพิ่ม instance)** และ **Scale in (ลด instance)** ภายในค่า Minimum/Maximum ที่กำหนด
* ทำงานร่วมกับ **Load Balancer** → กระจาย traffic, Health Check และแทนที่ instance ที่ไม่สมบูรณ์อัตโนมัติ
* **Scaling Policies** สามารถถูก trigger โดย **CloudWatch Alarms** เช่น Average CPU Utilization → ทำให้ ASG **scale อัตโนมัติ**
* ASG รองรับ **นโยบายการปรับขนาดหลายแบบ**:
  * Dynamic scaling (Target Tracking, Step Scaling)
  * Scheduled scaling
  * Predictive scaling
* **Target Tracking Scaling** → รักษา metric เช่น CPU ให้อยู่ใกล้ค่าเป้าหมาย
* **Step Scaling** → ใช้ CloudWatch Alarms เพื่อ trigger การเพิ่ม/ลด capacity
* **Scheduled Scaling** → ปรับตามตารางที่ทราบล่วงหน้า
* **Predictive Scaling** → พยากรณ์โหลดล่วงหน้าจากข้อมูลย้อนหลัง
* Metric ที่ใช้บ่อย: CPU, RequestCountPerTarget, Network In/Out, Custom metrics
* **Cooldown period** → ป้องกัน scaling ซ้ำเร็วเกินไป (default 5 นาที)
* ใช้ **AMIs พร้อมใช้งานและ Detailed Monitoring** → ลดเวลา startup และปรับขนาดได้เร็วขึ้น
* **Instance Refresh** → ฟีเจอร์ของ ASG ที่อัปเดต EC2 ทั้งหมดด้วย **launch template ใหม่**
* แทนที่จะ terminate instance ทีละตัว → Instance Refresh ทำงานอัตโนมัติ **terminate เก่า + launch ใหม่**
* กำหนด **Minimum Healthy Percentage** → ควบคุมจำนวน instance ที่สามารถแทนที่ได้พร้อมกัน
* กำหนด **Warm-up Time** → ให้ instance ใหม่มีเวลาเตรียมพร้อมก่อนให้บริการ traffic
