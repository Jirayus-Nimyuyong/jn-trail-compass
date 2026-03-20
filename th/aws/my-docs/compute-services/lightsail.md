# Amazon Lightsail Cheat Sheet

**Amazon Lightsail** เป็นแพลตฟอร์มคลาวด์ที่ใช้งานง่าย ซึ่งมีทุกสิ่งที่จำเป็นในการสร้างแอปพลิเคชันหรือเว็บไซต์ พร้อมกับแผนบริการรายเดือนที่คุ้มค่า
* เป็นผู้ให้บริการ Virtual Private Server (VPS) ที่ออกแบบมาสำหรับนักพัฒนา, ธุรกิจขนาดเล็ก, นักเรียน และใครก็ตามที่ต้องการโซลูชันเซิร์ฟเวอร์เสมือนที่ไม่ซับซ้อน
* Lightsail รวมทุกอย่างที่จำเป็นสำหรับเว็บไซต์และเว็บแอปพลิเคชันของคุณไว้ด้วยกัน ได้แก่ Virtual Machine (เลือกได้ทั้ง Linux หรือ Windows), พื้นที่เก็บข้อมูลแบบ SSD, การโอนย้ายข้อมูล, การจัดการ DNS และ Static IP address

---

## คุณสมบัติ (Features)

### Lightsail Instances และ Volumes
* Lightsail ให้บริการเซิร์ฟเวอร์เสมือน (Instances) ที่คุณสามารถเปิดใช้งานเว็บไซต์ หรือโปรเจกต์ของคุณได้ โดยจัดการผ่านคอนโซลหรือ API
* ใช้พื้นที่เก็บข้อมูลแบบ **SSD** โดยดิสก์แต่ละก้อนที่นำมาต่อเพิ่ม (Attach) สามารถมีขนาดได้สูงสุด 16 TB และต่อได้สูงสุด 15 ก้อนต่อหนึ่ง Instance
* รองรับการทำ **Snapshot** ทั้งแบบอัตโนมัติและจัดการเองสำหรับ Instance และ SSD Volumes

### Lightsail Container Service
* ทรัพยากรประมวลผลที่ช่วยให้คุณรัน Container บนคลาวด์ได้
* สามารถติดตั้งใช้งาน (Deploy) Container Image จาก Private Registry ของ Lightsail, Amazon ECR หรือ Public Registry ทั่วไปได้
* ระบบจะจัดเตรียมโครงสร้างพื้นฐานเบื้องหลังให้โดยอัตโนมัติ จัดการ Load Balancing และให้ HTTPS Endpoint ที่ปลอดภัยสำหรับแอปพลิเคชันของคุณ

### Lightsail Object Storage
* ให้บริการจัดเก็บข้อมูลที่มีความพร้อมใช้งานและทนทานสูงสำหรับเนื้อหาที่เป็น Static (รูปภาพ, วิดีโอ, ล็อก)
* สามารถเชื่อมต่อกับ Lightsail Instance หรือ CDN Distribution ได้
* ทำงานร่วมกับ Amazon S3 API ได้ และเป็นทางเลือกที่ง่ายกว่า S3 สำหรับผู้ใช้ Lightsail

### Lightsail Load Balancers
* กระจายทราฟฟิกไปยัง Instance ต่างๆ เพื่อให้เว็บไซต์รองรับทราฟฟิกที่ผันผวนได้ดีขึ้น ป้องกันการหยุดชะงัก และมอบประสบการณ์ที่ดีแก่ผู้เข้าชม
* ใช้การกระจายทราฟฟิกแบบ **Round Robin** ไปยัง Instance ที่มีสถานะปกติ (Healthy)
* รองรับ **Session Persistence** (การคงเซสชัน) สำหรับแอปพลิเคชันที่ต้องการให้ผู้เข้าชมเชื่อมต่อกับ Instance เดิมเพื่อความสอดคล้องของข้อมูล

### Lightsail Certificates
* มีระบบจัดการใบรับรองในตัว ให้บริการใบรับรอง **SSL/TLS ฟรี** ซึ่งสามารถจัดเตรียมและเพิ่มเข้ากับ Load Balancer ได้อย่างรวดเร็ว โดย AWS จะจัดการการต่ออายุให้โดยอัตโนมัติ
* เป็นการยืนยันตัวตนระดับโดเมน (Domain Validated) และรองรับโดเมนหรือซับโดเมนสูงสุด 10 ชื่อต่อหนึ่งใบรับรอง (ปัจจุบันยังไม่รองรับ Wildcard domains)

### Managed Databases (ฐานข้อมูลที่มีการจัดการ)
* สามารถเปิดใช้งานฐานข้อมูล MySQL หรือ PostgreSQL ที่ตั้งค่ามาให้พร้อมใช้งานได้ในไม่กี่นาที
* มีแผนบริการแบบ **Standard** และ **High Availability** (ความพร้อมใช้งานสูง) โดยแบบ HA จะสร้างฐานข้อมูล Standby ไว้ใน AZ อื่นและทำสำเนาข้อมูลแบบ Synchronous เพื่อรองรับการ Failover
* สำรองข้อมูลอัตโนมัติและสามารถกู้คืนข้อมูลย้อนหลังได้สูงสุด 7 วัน (Point-in-time restore)
* สามารถสเกลเพิ่มขนาดได้ (Scale up) แต่ไม่สามารถสเกลลดขนาดลงได้ (Scale down)

### คุณสมบัติอื่นๆ
* **การย้ายไปยัง EC2:** สามารถย้ายโปรเจกต์ไปยัง Amazon EC2 ได้ง่ายๆ โดยการทำ Snapshot และไปเปิดใช้งานในคอนโซลของ EC2
* **Lightsail CDN:** ใช้เครือข่ายของ **Amazon CloudFront** เพื่อช่วยกระจายเนื้อหาให้รวดเร็วขึ้น
* **Dual-stack:** รองรับการเชื่อมต่อทั้ง **IPv4 และ IPv6**

---

## ระบบปฏิบัติการที่รองรับ (Supported Operating Systems)
* Ubuntu, Amazon Linux 2023, Amazon Linux 2, AlmaLinux OS 9, Debian, FreeBSD, OpenSUSE, CentOS
* Windows Server 2016, 2019, และ 2022

## แอปพลิเคชันและ Development Stacks ที่ตั้งค่ามาให้แล้ว
* WordPress, Magento, Drupal, Joomla!, Ghost, Redmine, Plesk, cPanel & WHM, Django, PrestaShop
* Node JS, Gitlab, LAMP, MEAN, Nginx

---

## ค่าบริการ (Amazon Lightsail Pricing)

### สิ่งที่รวมอยู่ในทุกแผนบริการ
* Static IP address (ฟรีหากผูกไว้กับ Instance ที่รันอยู่)
* คอนโซลการจัดการ, ระบบจัดการ DNS, การเข้าถึง Terminal ผ่านเบราว์เซอร์ (SSH/RDP)
* Lightsail API, พื้นที่เก็บข้อมูล SSD, ระบบมอนิเตอร์เซิร์ฟเวอร์

### รายละเอียดแพ็กเกจ (ตัวอย่างราคา Linux/Windows)
* คิดค่าบริการตามแพ็กเกจที่เลือก โดย Windows จะมีราคาสูงกว่า Linux
* หากมีการโอนย้ายข้อมูลขาออกเกินกำหนด (Data Transfer Cap) จะมีค่าใช้จ่ายเพิ่มเติม
* **Managed Databases:** มีค่าบริการแยกต่างหาก หากเลือกแบบ High Availability ราคาจะเพิ่มขึ้นเป็น 2 เท่าจากแผนปกติ
* **Load Balancers:** คิดราคาคงที่ต่อเดือน ไม่ว่าจะใช้แพ็กเกจใด
* **Snapshot Storage:** คิดค่าบริการเพิ่มเติมที่ $0.05 ต่อ GB ต่อเดือน

### Free Tier (สำหรับบัญชี AWS ใหม่)
* **ฟรี 3 เดือนแรก:** สำหรับแผนบริการ Linux ($3.50, $5, $10) และ Windows ($8, $12, $20)
* **ฟรี 3 เดือนแรก:** สำหรับ Container ($10 Micro service) และ Database ($15 Standard)
* **ฟรี 12 เดือนแรก:** สำหรับ Object Storage (แพ็กเกจ $1 - 5 GB)

---

## ข้อจำกัด (Amazon Lightsail Limits)
* ปัจจุบันสร้างได้สูงสุด: 20 Instances, 5 Static IPs, 6 DNS zones, 20 TB Block Storage และ 5 Load Balancers ต่อหนึ่งบัญชี
* สามารถออกใบรับรอง (Certificates) ได้สูงสุด 20 ใบต่อปีปฏิทิน