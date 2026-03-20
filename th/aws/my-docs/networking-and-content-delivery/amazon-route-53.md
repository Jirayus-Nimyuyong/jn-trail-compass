# Amazon Route 53 Cheat Sheet

**Amazon Route 53** เป็นบริการเว็บ DNS ที่มีความพร้อมใช้งานสูงและปรับขนาดได้ สำหรับการจดทะเบียนโดเมน, การเราต์ DNS และการตรวจสอบสถานะ (Health Checking)
* รองรับ Hybrid DNS ผ่าน Resolver Endpoints เพื่อเชื่อมต่อกับ On-premises และ Private VPC DNS
* **Alias Records:** เราต์ทราฟฟิกไปยังทรัพยากรของ AWS เช่น CloudFront, S3, App Runner, VPC Lattice, OpenSearch และ ELB
* **DNS Firewall:** บล็อกโดเมนที่เป็นอันตรายและป้องกันภัยคุกคามเช่น DNS Tunneling และ DGA
* รองรับ **DNS over HTTPS (DoH)** เพื่อการคิวรี DNS แบบเข้ารหัส
* **Route 53 Profiles:** ช่วยจัดการ DNS ข้ามบัญชีและการบริหารจัดการแบบศูนย์กลาง
* รองรับ IPv4/IPv6 Dual-stack สำหรับสถาปัตยกรรมแบบไฮบริด

---

## คุณสมบัติหลัก (Key Features)

### 1. Resolver
* ตอบคำถาม DNS สำหรับชื่อโดเมนภายใน VPC
* รองรับ Inbound/Outbound Endpoints, การส่งต่อคำขอ (Forwarding) และ Split-view DNS
* ทำการค้นหาแบบ Recursive สำหรับโดเมนสาธารณะ
* จัดการ DNS ข้ามบัญชีด้วย Route 53 Profiles

### 2. Traffic Flow
* เครื่องมือแก้ไขแบบภาพ (Visual Editor) เพื่อสร้างนโยบายการเราต์โดยใช้ Geolocation, Geoproximity, Weighted, Latency, Failover และ Multivalue

### 3. ตัวเลือกการเราต์ (Routing Options)
* Simple, Failover, Geolocation, Geoproximity, Latency, Weighted, Multivalue, และ IP-based

### 4. การตรวจสอบสถานะ (Health Checks)
* ตรวจสอบเอนด์พอยต์ผ่าน HTTP, HTTPS, TCP และการจับคู่ข้อความ (String matching)
* รูปแบบ Failover: **Active-Active** (ทำงานพร้อมกัน) และ **Active-Passive** (ตัวหลักเสียค่อยใช้ตัวสำรอง)

### 5. การจดทะเบียนโดเมน (Domain Registration)
* จดโดเมนใหม่หรือย้ายโดเมน พร้อมการตั้งค่า DNS อัตโนมัติ
* รองรับการลงลายมือชื่อ **DNSSEC** และการต่ออายุอัตโนมัติ

---

## รูปแบบระเบียน (Records) และนโยบายการเราต์

### Alias Records vs CNAME Records
| หัวข้อเปรียบเทียบ | CNAME Records | Alias Records |
| :--- | :--- | :--- |
| **Zone Apex (โดเมนหลัก)** | สร้างไม่ได้ (เช่น example.com) | **สร้างได้**ที่ Zone Apex |
| **ค่าบริการ** | คิดค่าคิวรีตามปกติ | **ฟรี** เมื่อเราต์ไปยังทรัพยากร AWS |
| **การตอบกลับ** | เปลี่ยนเส้นทางชื่อโดเมนเสมอ | ตอบกลับตามประเภทระเบียนที่ระบุ (เช่น A หรือ AAAA) |
| **เป้าหมาย** | ชี้ไปยัง DNS ใดก็ได้ทั่วโลก | ชี้ได้เฉพาะทรัพยากร AWS หรือระเบียนอื่นในโซนเดียวกัน |

### นโยบายการเราต์ (Routing Policies)
* **Simple:** เราต์ไปยังทรัพยากรเดียว (ใส่หลาย IP ในระเบียนเดียวได้)
* **Failover:** ใช้สำหรับการตั้งค่า Active-Passive
* **Geolocation:** เราต์ตามตำแหน่งที่ตั้งของผู้ใช้งาน
* **Geoproximity:** เราต์ตามตำแหน่งของทรัพยากรและผู้ใช้ (ปรับแต่งได้ด้วยค่า **Bias**)
* **Latency:** เราต์ไปยังภูมิภาคที่ให้ความหน่วงต่ำที่สุดสำหรับผู้ใช้
* **IP-based:** เราต์ตามที่มาของ IP Address ของผู้ใช้
* **Multivalue Answer:** สุ่มตอบกลับด้วยระเบียนที่สถานะดี (Healthy) สูงสุด 8 ระเบียน
* **Weighted:** เราต์ทราฟฟิกตามสัดส่วนร้อยละที่กำหนด

---

## ประเภทของ Hosted Zones
* **Public Hosted Zone:** เราต์ทราฟฟิกอินเทอร์เน็ตไปยังทรัพยากร AWS
* **Private Hosted Zone:** เราต์ทราฟฟิกภายใน VPC (ต้องเปิด `enableDnsHostnames` และ `enableDnsSupport`)
* **Split-view DNS:** ให้ผลลัพธ์ DNS ต่างกันระหว่างคำขอที่มาจากภายใน VPC และภายนอก

---

## การตรวจสอบสถานะ (Route 53 Health Checks)
* **วิธีการทำงาน:** ระบุเอนด์พอยต์ (IP หรือ Domain) -> เลือกโปรโตคอล -> ตั้งค่าช่วงเวลา (Interval) -> กำหนดเกณฑ์ความล้มเหลว (Failure Threshold)
* **ประเภท:** ตรวจสอบทรัพยากรโดยตรง, ตรวจสอบสถานะ Health Check อื่น ๆ, หรือตรวจสอบตาม CloudWatch Alarm

---

## ความปลอดภัยและการตรวจสอบ (Security & Monitoring)
* **DNS Firewall:** ใช้ Allowlist/Blocklist เพื่อควบคุมโดเมนที่อนุญาต
* **Logging:** บันทึก Resolver Query Logging ลงใน CloudWatch หรือ EventBridge
* **Dashboard:** แสดงสถานะการจดทะเบียนโดเมน, การโอนย้าย และวันหมดอายุ

---

## ค่าบริการ (Pricing)
* **Hosted Zone:** คิดค่าบริการรายเดือนต่อโซน (ลบทิ้งภายใน 12 ชม. แรกไม่คิดค่าโซน แต่คิดค่าคิวรี)
* **คิวรี DNS:** คิดตามจำนวนพันล้านครั้งต่อเดือน (**ยกเว้น Alias Records** ที่ชี้ไปยังทรัพยากร AWS ส่วนใหญ่จะฟรี)
* **Health Checks:** คิดค่าบริการต่อรายการตรวจเช็คต่อเดือน
* **โดเมน:** ราคาขึ้นอยู่กับดามสกุลโดเมน (TLD)