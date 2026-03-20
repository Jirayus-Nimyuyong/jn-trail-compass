# AWS Elastic Beanstalk Cheat Sheet

**AWS Elastic Beanstalk** ช่วยให้คุณสามารถติดตั้งใช้งาน (Deploy) และจัดการแอปพลิเคชันบน AWS Cloud ได้อย่างรวดเร็ว โดยไม่ต้องกังวลเกี่ยวกับโครงสร้างพื้นฐานที่ใช้รันแอปพลิเคชันเหล่านั้น
* Elastic Beanstalk จะจัดการรายละเอียดต่างๆ ให้โดยอัตโนมัติ ทั้งการจัดเตรียมทรัพยากร (Capacity Provisioning), การทำ Load Balancing, การสเกล (Scaling) และการตรวจสอบสุขภาพของแอปพลิเคชัน (Health Monitoring)
* เป็นบริการประเภท **Platform-as-a-Service (PaaS)**
* **รองรับภาษาต่างๆ ดังนี้:** Go, Java (รวมถึง Corretto), .NET, Node.js, PHP, Python, Ruby
* **รองรับ Web Containers ดังนี้:** Tomcat, Passenger, Puma
* **รองรับ Docker Containers:** ทั้งแบบ Single Container และ Multi-container
* **รูปแบบโดเมนเนมของแอปพลิเคชัน:** `subdomain.region.elasticbeanstalk.com`

---

## หน้าจัดการสภาพแวดล้อม (Environment Pages)
* **Configuration:** แสดงทรัพยากรที่ถูกจัดเตรียมไว้สำหรับสภาพแวดล้อมนี้ และใช้สำหรับตั้งค่าทรัพยากรเหล่านั้น
* **Health:** แสดงสถานะและข้อมูลสุขภาพโดยละเอียดของอินสแตนซ์ EC2 ที่รันแอปพลิเคชันอยู่
* **Monitoring:** แสดงสถิติต่างๆ เช่น ค่าความหน่วงเฉลี่ย (Latency) และการใช้งาน CPU รวมถึงใช้สร้างการแจ้งเตือน (Alarms)
* **Events:** แสดงข้อความแจ้งเตือนหรือข้อผิดพลาดจากบริการต่างๆ ที่สภาพแวดล้อมนี้ใช้งานอยู่
* **Tags:** แสดง Key-value pairs ที่ใช้กับทรัพยากรในสภาพแวดล้อมเพื่อการจัดระเบียบ

---

## แนวคิดหลักของ AWS Elastic Beanstalk (Concepts)
* **Application:** กลุ่มของส่วนประกอบต่างๆ ใน Elastic Beanstalk (เปรียบเสมือนโฟลเดอร์ที่เก็บ Environment และ Version)
* **Application Version:** เวอร์ชันของโค้ดที่พร้อมใช้งาน ซึ่งจะชี้ไปยัง Object ใน **Amazon S3** ที่เก็บโค้ดนั้นไว้
* **Environment:** เวอร์ชันที่ถูกติดตั้งใช้งานจริงบนทรัพยากรของ AWS (หนึ่ง Environment รันได้เพียงหนึ่งเวอร์ชันในเวลาเดียวกัน)
* **Environment Tier:**
    * **Web Server Environment:** สำหรับแอปพลิเคชันที่รองรับ HTTP requests
    * **Worker Environment:** สำหรับแอปพลิเคชันที่ดึงงานจากคิว (Amazon SQS) มาประมวลผล
* **Environment Configuration:** ชุดพารามิเตอร์ที่กำหนดพฤติกรรมของสภาพแวดล้อมและทรัพยากรที่เกี่ยวข้อง
* **Platform:** การผสมผสานของ OS, Language Runtime, Web/Application Server และส่วนประกอบของ Elastic Beanstalk
* **Lifecycle Policy:** นโยบายที่ช่วยลบแอปพลิเคชันเวอร์ชันเก่าๆ โดยอัตโนมัติเพื่อไม่ให้เกินขีดจำกัดจำนวนเวอร์ชันที่กำหนดไว้

---

## ประเภทของสภาพแวดล้อม (Environment Types)
1. **Load-balancing, Autoscaling Environment:** เพิ่มอินสแตนซ์อัตโนมัติเพื่อรองรับโหลดที่เพิ่มขึ้น
2. **Single-Instance Environment:** มีอินสแตนซ์ EC2 เพียงตัวเดียวพร้อม Elastic IP address

---

## การตั้งค่าสภาพแวดล้อม (Environment Configurations)
* **Auto Scaling group:** รับประกันว่าจะมีอินสแตนซ์รันอยู่เสมอ และช่วยสเกลจำนวนเครื่องตามโหลด
* **Elastic Load Balancing:** กระจายทราฟฟิกไปยังอินสแตนซ์ต่างๆ (เมื่อเปิดใช้งาน Load Balancing)
* **Database Integration:** รองรับการเชื่อมต่อกับ **Amazon RDS** (MySQL, PostgreSQL, Oracle, SQL Server) โดยระบบจะส่งข้อมูลการเชื่อมต่อ (Host, User, Pass) ผ่านทาง Environment Properties
* **Environment Properties:** ใช้สำหรับส่งข้อมูลลับ (Secrets), Endpoints หรือการตั้งค่า Debug ไปยังแอปพลิเคชัน
* **Amazon SNS:** ใช้แจ้งเตือนเหตุการณ์สำคัญที่ส่งผลกระทบต่อแอปพลิเคชัน
* **Deployment Policies (นโยบายการติดตั้งใช้งาน):**
    * **All at once:** ลงเวอร์ชันใหม่พร้อมกันทุกเครื่อง (แอปจะหยุดทำงานชั่วครู่)
    * **Rolling:** ทยอยลงเวอร์ชันใหม่เป็นชุดๆ (Batch)
    * **Rolling with additional batch:** ทยอยลงเป็นชุด แต่เริ่มจากการสร้างอินสแตนซ์ชุดใหม่ก่อนเพื่อรักษาระดับ Capacity
    * **Immutable:** ลงเวอร์ชันใหม่บนอินสแตนซ์ชุดใหม่ทั้งหมด (ปลอดภัยที่สุด)
    * **Traffic splitting:** แบ่งทราฟฟิกบางส่วนไปยังเวอร์ชันใหม่เพื่อทดสอบ (Canary Deployment)
* **Managed Platform Updates:** อัปเดต OS หรือ Runtime อัตโนมัติในช่วงเวลาบำรุงรักษาที่กำหนดไว้
* **ข้อแนะนำเกี่ยวกับ Database:** สำหรับสภาพแวดล้อมจริง (Production) **ควรสร้าง RDS แยกต่างหาก** (ภายนอก Beanstalk) เพื่อป้องกันไม่ให้ฐานข้อมูลถูกลบโดยไม่ตั้งใจหากมีการลบ Environment

---

## การตรวจสอบและความปลอดภัย (Monitoring & Security)
* **Enhanced health reporting:** ฟีเจอร์ที่ช่วยรวบรวมข้อมูลทรัพยากรเชิงลึกเพื่อให้เห็นภาพรวมสุขภาพของระบบได้แม่นยำขึ้น
* **IAM Roles ที่สำคัญ:**
    1. **Service Role:** (เช่น `AWSElasticBeanstalkService`) อนุญาตให้ Beanstalk จัดการทรัพยากรแทนคุณ
    2. **Instance Profile:** อนุญาตให้อินสแตนซ์ดึงโค้ดจาก S3, อัปโหลดล็อก หรือใช้งาน X-Ray/SSM

---

## ค่าบริการ (Pricing)
* **ไม่มีค่าธรรมเนียมเพิ่มเติมสำหรับ Elastic Beanstalk** คุณจ่ายเฉพาะค่าทรัพยากร AWS ที่แอปพลิเคชันของคุณใช้งานจริงเท่านั้น (เช่น ค่า EC2, S3, RDS)

---