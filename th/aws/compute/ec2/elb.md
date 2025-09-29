# Elastic Load Balancing (ELB)

**Load Balancer** คือ เซิร์ฟเวอร์หรือกลุ่มเซิร์ฟเวอร์ที่ทำหน้าที่ **กระจายทราฟฟิกที่เข้ามาไปยังหลาย ๆ EC2 instance หรือเซิร์ฟเวอร์เบื้องหลัง**

ตัวอย่างเช่น:
สมมติว่ามี EC2 instance 3 เครื่องอยู่เบื้องหลัง **Elastic Load Balancer (ELB)**

* ผู้ใช้คนแรกเชื่อมต่อกับ ELB → ทราฟฟิกถูกส่งไปยัง EC2 instance เครื่องที่ 1
* ผู้ใช้คนที่สอง → ทราฟฟิกถูกส่งไปยัง EC2 instance เครื่องที่ 2
* ผู้ใช้คนที่สาม → ทราฟฟิกถูกส่งไปยัง EC2 instance เครื่องที่ 3

เมื่อจำนวนผู้ใช้เพิ่มขึ้น **Load Balancer จะกระจายโหลดไปยังทุก instance อย่างเหมาะสม**

ผู้ใช้ไม่ทราบว่าเชื่อมต่อกับ instance ไหน พวกเขาเชื่อมต่อเพียงกับ **Elastic Load Balancer** ซึ่งเป็น **endpoint เดียว**

## ประโยชน์ของการใช้ Load Balancer

* ให้ **จุดเชื่อมต่อเดียว** กับแอปพลิเคชันของคุณ
* จัดการ **ความล้มเหลวของ instance เบื้องหลัง** ผ่าน **Health Check**
* รองรับการตรวจสอบสถานะของ instance
* ให้บริการ **SSL termination** เพื่อรองรับ HTTPS
* สามารถกำหนด **Stickiness ด้วย Cookies**
* เพิ่ม **High Availability** ข้าม Availability Zones
* แยกทราฟฟิกสาธารณะ (Public) และส่วนตัว (Private)

## Elastic Load Balancer ในฐานะ Managed Service

* ELB เป็น **บริการที่ AWS บริหารจัดการให้**
* AWS ดูแล **การอัปเกรด, การบำรุงรักษา, และความพร้อมใช้งานสูง**
* สามารถปรับแต่งการทำงานของ Load Balancer ได้
* คุ้มค่ากว่าการตั้ง Load Balancer เอง เพราะการจัดการ Load Balancer ของตัวเองทำได้ยากเมื่อระบบขยายตัว
* ELB เชื่อมต่อกับหลายบริการของ AWS เช่น EC2, Auto Scaling, ECS, Certificate Manager, CloudWatch, Route 53, WAF, Global Accelerator เป็นต้น

## Health Checks

* ตรวจสอบว่า EC2 instance **ทำงานปกติหรือไม่**
* หาก instance ไม่พร้อมใช้งาน → ELB จะ **ไม่ส่งทราฟฟิกไปยัง instance นั้น**
* Health Check ใช้พอร์ตและ route เพื่อตรวจสอบ endpoint เช่น

  * Protocol: HTTP
  * Port: 4567
  * Endpoint: /health
* หาก instance ไม่ตอบกลับ HTTP 200 → ถือว่า **Unhealthy**

## ประเภทของ Load Balancer ที่ AWS จัดการให้

1. **Classic Load Balancer (CLB)** – รุ่นเก่า, รองรับ HTTP, HTTPS, TCP, SSL, Security CP. แนะนำไม่ให้ใช้แล้ว
2. **Application Load Balancer (ALB)** – รุ่นใหม่ (2016), รองรับ HTTP, HTTPS, WebSocket
3. **Network Load Balancer (NLB)** – รุ่นใหม่ (2017), รองรับ TCP, TLS, Security CP, UDP
4. **Gateway Load Balancer (GWLB)** – รุ่นใหม่ (2020), ทำงานที่ network layer, รองรับ IP protocol

* Load Balancer สามารถตั้งเป็น **Internal (Private)** หรือ **External (Public)**

## ข้อควรระวังด้านความปลอดภัย

* ผู้ใช้สามารถเข้าถึง Load Balancer ได้จากทุกที่ผ่าน HTTP/HTTPS
* Security Group ของ Load Balancer → อนุญาต inbound port 80 หรือ 443 จาก **0.0.0.0/0**
* EC2 instance → อนุญาต inbound port 80 **จาก Security Group ของ Load Balancer เท่านั้น**
  → ช่วยให้ instance รับทราฟฟิก **เฉพาะจาก Load Balancer** เพิ่มความปลอดภัย

## Elastic Load Balancer – Sticky Sessions

**Sticky sessions** หรือที่เรียกว่า **session affinity** คือฟีเจอร์ของ ELB ที่ทำให้ **ผู้ใช้ที่ส่งคำขอหลายครั้งไปยัง Load Balancer ถูกส่งไปยัง backend instance เดิมทุกครั้ง**

ตัวอย่าง:

* สมมติว่า ALB มี EC2 instance 2 เครื่อง และมีผู้ใช้ 3 คน
* ผู้ใช้คนที่ 1 ส่งคำขอ → ถูกส่งไปยัง EC2 instance เครื่องที่ 1
* เมื่อผู้ใช้คนที่ 1 ส่งคำขอครั้งต่อไป → จะยังถูกส่งไปยัง instance เดิม
* ผู้ใช้คนที่ 2 → ถูกส่งไปยัง instance เครื่องที่ 2 ตลอด
* ผู้ใช้คนที่ 3 → ถูกส่งไปยัง instance ที่กำหนดตลอด

ฟีเจอร์นี้สามารถใช้ได้กับ **CLB, ALB, และ NLB**

### การทำงานของ Sticky Sessions

Sticky sessions ใช้ **Cookie** ที่ส่งมาพร้อมกับคำขอจากผู้ใช้ไปยัง Load Balancer

* Cookie จะเก็บข้อมูลการ "stickiness" และมีวันหมดอายุ
* เมื่อ Cookie หมดอายุ ผู้ใช้อาจถูกส่งไปยัง instance อื่น

**ประโยชน์หลัก:**

* ทำให้ผู้ใช้เชื่อมต่อกับ **backend instance เดิม** ตลอดเวลา
* ป้องกันการสูญหายของข้อมูล session เช่น ข้อมูลการล็อกอิน
  **ข้อควรระวัง:**
* การเปิด stickiness อาจทำให้ **โหลดไม่สมดุล** หากบาง instance มีผู้ใช้ที่ sticky มาก

### ประเภทของ Cookies สำหรับ Sticky Sessions

1. **Application-based Cookies**
2. **Duration-based Cookies**

**Application-based Cookies**

* สร้างโดย **target application**
* สามารถใส่ attribute ที่ต้องการเองได้
* ต้องกำหนดชื่อ Cookie สำหรับแต่ละ target group
* **ห้ามใช้ชื่อสำรอง:** AWSALB, AWSALBAPP, AWSALBTG

**Duration-based Cookies**

* สร้างโดย **Load Balancer**
* ชื่อ Cookie:

  * ALB → AWSALB
  * CLB → AWSELB
* มีวันหมดอายุตามที่ Load Balancer กำหนด
* ต่างจาก application-based ที่กำหนดโดย application

> ไม่จำเป็นต้องจำชื่อ Cookie แบบละเอียด แต่ควรจำว่า **มีสองประเภทหลัก: application-based และ duration-based**

### การเปิดใช้งาน Sticky Sessions บน Load Balancer

1. ไปที่ Load Balancer และเปิดในแท็บใหม่
2. ที่ **Target Group** → เลือก **Actions → Edit Attributes**
3. ที่ **Target selection configuration** → เปิด **Stickiness**
4. เลือกประเภท Cookie:

   * **Load balancer generated cookie** (กำหนดระยะเวลา 1 วินาที – 7 วัน)
   * **Application-based cookie** (กำหนดชื่อ Cookie เช่น MYCUSTOMCOOKIEAPP)
5. แนะนำให้เลือก **Load balancer generated cookie** โดยใช้ค่าเริ่มต้น 1 วัน → บันทึก

### การสังเกต Sticky Sessions

* เปิด **Developer Tools** → แท็บ **Network** → รีเฟรชหน้าเว็บหลายครั้ง
* จะเห็นคำขอถูกส่งไปยัง **instance เดิม** ตลอด
* ตรวจสอบ GET request → ดู **Cookies** → จะเห็น expiration, path, และค่า Cookie
* Browser จะส่ง Cookie กลับในคำขอต่อไป ทำให้ **sticky session ทำงานต่อเนื่อง**

### หมายเหตุเพิ่มเติม

* การเข้าถึง Developer Tools: **Web Developer → Web Developer Tools**
* ต้องการปิด sticky → ไปที่ target group → Edit Attributes → ปิด stickiness → กลับไปใช้ load balancing แบบปกติ

## Elastic Load Balancer – Cross Zone Load Balancing

Cross zone load balancing คือการกระจายทราฟฟิกข้าม **Availability Zones (AZs)** เพื่อให้โหลดถูกกระจายอย่างสมดุล

ตัวอย่าง:

* สมมติว่ามี **สอง Availability Zones**

  * AZ แรก มี Load Balancer + EC2 2 เครื่อง
  * AZ ที่สอง มี Load Balancer + EC2 8 เครื่อง
* ผู้ใช้เข้าถึง Load Balancers เหล่านี้

### การทำงานของ Cross Zone Load Balancing

* **เปิดใช้งาน cross zone** → Load Balancer แต่ละตัวจะกระจายทราฟฟิกไปยัง **ทุก EC2 instance** ที่ลงทะเบียนในทุก AZ
* ตัวอย่าง:

  * ผู้ใช้ส่ง 50% ของทราฟฟิกไปยัง ALB ตัวแรก และ 50% ไปยัง ALB ตัวที่สอง
  * ALB แต่ละตัวจะกระจายทราฟฟิกไปยัง **ทุก EC2 instance** ทั้ง 10 เครื่อง
  * ในตัวอย่างนี้ แต่ละ instance จะได้รับ 10% ของทราฟฟิกทั้งหมด → **กระจายสมดุล**

### กรณีไม่ได้เปิด Cross Zone Load Balancing

* Load Balancer จะกระจายทราฟฟิก **เฉพาะภายใน AZ ของตัวเอง**
* ตัวอย่าง:

  * ผู้ใช้ส่ง 50% ของทราฟฟิกไปยัง AZ แรก, 50% ไปยัง AZ ที่สอง
  * ALB ใน AZ แรก ส่งทราฟฟิกเฉพาะไปยัง EC2 2 เครื่อง → เครื่องละ 25% ของทราฟฟิกรวม
  * ALB ใน AZ ที่สอง ส่งทราฟฟิกเฉพาะไปยัง EC2 8 เครื่อง → เครื่องละ 6.25% ของทราฟฟิกรวม
* ผล: ถ้าแต่ละ AZ มีจำนวน EC2 ไม่เท่ากัน → บาง instance อาจได้รับทราฟฟิกมากกว่าบาง instance

> ไม่มีถูกผิด ขึ้นอยู่กับ use case ว่าต้องการกระจายข้าม AZ หรือไม่

### การตั้งค่าเริ่มต้นและค่าใช้จ่าย

* **Application Load Balancer (ALB)**

  * เปิด cross zone โดยค่าเริ่มต้น
  * **ไม่มีค่าใช้จ่าย** สำหรับทราฟฟิกข้าม AZ
* **Network Load Balancer (NLB) และ Gateway Load Balancer (GWLB)**

  * ปิด cross zone โดยค่าเริ่มต้น
  * หากเปิดใช้งาน → อาจมีค่าใช้จ่ายสำหรับทราฟฟิกข้าม AZ
* **Classic Load Balancer (CLB)**

  * ปิด cross zone โดยค่าเริ่มต้น
  * หากเปิดใช้งาน → **ไม่เสียค่าใช้จ่าย**

### การปรับตั้งค่า Load Balancer

* Network, Gateway Load Balancer → ไปที่ **Attributes** → เปิด/ปิด Cross Zone
* Application Load Balancer → เปิด cross zone **โดยค่าเริ่มต้น**

  * ที่ target group → สามารถแก้ไขได้ว่าจะใช้ค่า default, บังคับเปิด หรือปิดสำหรับ target group นั้น

### Classic Load Balancer

* เป็น Load Balancer รุ่นเก่า กำลังจะถูกยกเลิก
* ไม่จำเป็นต้องใช้หรือเน้นสำหรับการสอบ

## Elastic Load Balancer – SSL Certificates

### บทนำเกี่ยวกับ SSL และ TLS Certificates

* SSL/TLS Certificates ใช้เข้ารหัสทราฟฟิกระหว่าง **ผู้ใช้งาน (clients)** กับ **Load Balancer** ขณะส่งข้อมูล (in-flight encryption)
* SSL = Secure Sockets Layer (เวอร์ชันเก่า)
* TLS = Transport Layer Security (เวอร์ชันใหม่ของ SSL แต่คนมักเรียก SSL เพื่อความง่าย)
* Public SSL Certificates ออกโดย Certificate Authorities เช่น Comodo, Symantec, GoDaddy, GlobalSign, Digicert, Letsencrypt
* การติดตั้ง SSL บน Load Balancer → ข้อมูลระหว่างผู้ใช้กับ Load Balancer ถูกเข้ารหัส
* หากเว็บไซต์แสดงไอคอนล็อคสีเขียว → การเชื่อมต่อถูกเข้ารหัส
* SSL Certificates มีวันหมดอายุ ต้องต่ออายุเพื่อยืนยันความถูกต้อง

### SSL Certificates กับ Load Balancer

* ผู้ใช้เชื่อมต่อผ่าน HTTPS → ใช้ SSL Certificates เข้ารหัสข้อมูล
* Load Balancer ทำ **SSL Termination**:

  * ถอดรหัสข้อมูลเข้ารหัส (HTTPS) ที่เข้ามา
  * ส่งข้อมูลไปยัง backend EC2 instances ผ่าน HTTP (ไม่เข้ารหัส แต่ภายใน VPC ปลอดภัย)
* Load Balancer โหลด X.509 certificate (SSL/TLS Server Certificate)
* สามารถจัดการผ่าน **AWS Certificate Manager (ACM)** หรืออัปโหลดเองได้
* ตั้งค่า HTTPS Listener ต้องกำหนด **Default Certificate**
* สามารถเพิ่มรายการ Certificates รองรับหลายโดเมนได้
* **Server Name Indication (SNI)** → ระบุ hostname ที่ client ต้องการเชื่อมต่อ

### Server Name Indication (SNI)

* SNI แก้ปัญหา **การใช้งานหลาย SSL Certificates บน Server ตัวเดียว**
* Client ระบุ hostname ในขั้นตอน SSL Handshake → Server เลือก SSL Certificate ที่เหมาะสม
* SNI ใช้ได้กับ:

  * Application Load Balancer (ALB)
  * Network Load Balancer (NLB)
  * CloudFront
* ไม่รองรับ Classic Load Balancer (รุ่นเก่า)

**ตัวอย่าง ALB + SNI**

* ALB มี 2 Target Groups: `www.mycorp.com` และ `Domain1.example.com`
* ALB มี 2 SSL Certificates สำหรับแต่ละโดเมน
* Client ขอเชื่อมต่อ `www.mycorp.com` → ALB ใช้ SNI เลือก Certificate ของ `www.mycorp.com` และส่งต่อไป Target Group ที่ถูกต้อง
* Client ขอเชื่อมต่อ `Domain1.example.com` → ALB ใช้ Certificate ของ `Domain1.example.com`

### การรองรับ SSL Certificates ของ Load Balancer แต่ละประเภท

| Load Balancer                   | จำนวน SSL Certificates | หมายเหตุ                              |
| ------------------------------- | ---------------------- | ------------------------------------- |
| Classic Load Balancer           | 1                      | หากต้องการหลายโดเมน ต้องใช้หลาย CLB   |
| Application Load Balancer (ALB) | หลายใบ ผ่าน SNI        | รองรับหลาย Listener หลาย Certificates |
| Network Load Balancer (NLB)     | หลายใบ ผ่าน SNI        | รองรับหลาย Listener หลาย Certificates |

## Elastic Load Balancer – Connection Draining

* **Connection Draining** เป็นฟีเจอร์ของ Load Balancer ที่อาจเจอในข้อสอบ
* ขึ้นอยู่กับประเภทของ Load Balancer:

  * **Classic Load Balancer (CLB)** → เรียกว่า **Connection Draining**
  * **Application Load Balancer (ALB) / Network Load Balancer (NLB)** → เรียกว่า **Deregistration Delay**
* หลักการสำคัญ: ให้เวลา EC2 instance ทำงานคำสั่งหรือเชื่อมต่อที่กำลังดำเนินอยู่ให้เสร็จก่อนที่ instance จะถูก **deregister** หรือถูกทำเครื่องหมายว่าไม่พร้อมใช้งาน

### การทำงานของ Connection Draining

* เมื่อ instance อยู่ในสถานะ **draining** → ELB จะ **ไม่ส่งคำขอใหม่** ไปยัง instance นั้น
* ผู้ใช้ที่เชื่อมต่ออยู่แล้วจะได้รับเวลา (draining period) เพื่อทำงานให้เสร็จ
* หลังจากการเชื่อมต่อเดิมเสร็จ → instance ถูกตัดการเชื่อมต่อ
* ผู้ใช้ใหม่จะถูกส่งไปยัง EC2 instances ที่ **healthy** และไม่อยู่ในสถานะ draining

**ตัวอย่าง**

* มี 3 EC2 instances ข้างหลัง Load Balancer
* ตั้ง instance หนึ่งเป็น draining → ผู้ใช้เดิมบน instance นั้นยังสามารถทำงานต่อจนเสร็จ
* ผู้ใช้ใหม่จะถูกส่งไปยัง 2 EC2 instances ที่เหลือ

### การตั้งค่า Connection Draining

* สามารถกำหนดระยะเวลา **draining period** ได้ตั้งแต่ **1 – 3,600 วินาที**
* ค่าเริ่มต้น = 300 วินาที (5 นาที)
* หากต้องการปิดฟีเจอร์นี้ → ตั้งค่าเป็น 0 วินาที
* คำแนะนำ:

  * **คำขอสั้น** (เช่น <1 วินาที) → ตั้ง draining time ต่ำ เช่น 30 วินาที
  * **คำขอยาว** (เช่น upload ขนาดใหญ่ หรือ session ยาว) → ตั้ง draining time สูง เพื่อให้ instance ยังทำงานจนเสร็จ

## Key Takeaways

* Load Balancer กระจายทราฟฟิกไปยังหลาย backend EC2 instance
* ELB ให้ **endpoint เดียว** สำหรับผู้ใช้
* Health Checks ช่วยให้การส่งทราฟฟิก **เชื่อถือได้**
* ใช้ Load Balancer รุ่นใหม่เพื่อ **ฟีเจอร์ครบและการรวมบริการ AWS ที่ดี**
* Load Balancer ช่วย **กระจายทราฟฟิกไปยังหลาย instance** เพื่อเพิ่มประสิทธิภาพและความทนทาน
* Elastic Load Balancer ให้ **endpoint เดียวซ่อนความซับซ้อนของ backend**
* Health Check ช่วยให้ Load Balancer **ส่งทราฟฟิกไปยัง instance ที่พร้อมใช้งานเท่านั้น**
* AWS มีหลายประเภท Load Balancer, แนะนำใช้รุ่นใหม่เพื่อฟีเจอร์และการรวมบริการที่ดีกว่า
* Sticky sessions ทำให้ **คำขอของผู้ใช้ถูกส่งไปยัง backend instance เดิม**
* ใช้ได้กับ **CLB, ALB, NLB** ผ่าน **Cookie**
* **สองประเภท Cookie:**

  1. Application-based → สร้างโดย target application
  2. Duration-based → สร้างโดย Load Balancer
* การเปิดใช้งาน sticky อาจทำให้ **โหลดไม่สมดุล** หากผู้ใช้บางคนมี session ที่ sticky มาก
* Cross zone load balancing → กระจายทราฟฟิก **ทั่วทุก AZ** ให้ EC2 instance สมดุล
* หากไม่เปิด → ทราฟฟิกจะกระจายเฉพาะภายใน AZ → อาจเกิด imbalance
* ALB → เปิด cross zone โดยค่าเริ่มต้น, ไม่มีค่าใช้จ่าย
* NLB, GWLB → ปิด cross zone โดยค่าเริ่มต้น, เปิดแล้วอาจเสียค่าใช้จ่าย
* CLB → กำลังจะถูกยกเลิก ไม่แนะนำใช้
* SSL Certificates → เข้ารหัสทราฟฟิกระหว่างผู้ใช้กับ Load Balancer (In-flight encryption)
* TLS = เวอร์ชันใหม่ของ SSL แต่ยังเรียกว่า SSL เพื่อความง่าย
* **SNI** → รองรับหลาย SSL Certificates บน Load Balancer ตัวเดียว → รองรับหลายโดเมน
* ALB & NLB → รองรับหลาย SSL Certificates ด้วย SNI
* CLB → รองรับเพียง 1 SSL Certificate
* Connection Draining → ให้ instance ทำคำขอที่ active เสร็จ ก่อน deregistration
* CLB → เรียกว่า **Connection Draining**
* ALB / NLB → เรียกว่า **Deregistration Delay**
* กำหนด draining period ได้ **1 – 3600 วินาที**, ค่า default = 300 วินาที
* คำขอสั้น → ใช้ draining time ต่ำ, คำขอยาว → ใช้ draining time สูง
* **Connection Draining / Deregistration Delay** → ช่วยให้ instance จัดการคำขอที่กำลังดำเนินอยู่ได้อย่างราบรื่นก่อนถูก deregister
* การตั้งค่าให้เหมาะสมขึ้นอยู่กับ **ความยาวของคำขอ** และ **เวลาที่ต้องการให้ instance ถูกแทนที่**
