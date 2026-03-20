# Amazon Virtual Private Cloud (VPC) Cheat Sheet

**Amazon VPC** ช่วยให้คุณสร้าง **เครือข่ายเสมือนจริงบนคลาวด์ที่แยกส่วนเฉพาะสำหรับบัญชี AWS ของคุณ** ซึ่งคุณสามารถเปิดใช้งานทรัพยากรต่างๆ ของ AWS ได้ โดย VPC จะทำหน้าที่เป็นชั้นเครือข่ายสำหรับ Amazon EC2 และบริการอื่นๆ

* VPC ครอบคลุมทุก Availability Zones (AZs) ภายในหนึ่งภูมิภาค (Region)
* หลังจากสร้าง VPC แล้ว คุณสามารถเพิ่ม Subnet หนึ่งตัวหรือมากกว่าในแต่ละ AZ ได้



---

## คุณสมบัติเด่น (Features)
* **การระบุช่วง IP:** กำหนดช่วง IPv4 และ IPv6 CIDR สำหรับ VPC และ Subnet
* **ประเภท Subnet:** สร้างได้ทั้งแบบ Public, Private และ VPN-only
* **Security Groups:** ควบคุมในระดับอินสแตนซ์, เป็นแบบ Stateful, รองรับเฉพาะกฎ ALLOW และแชร์ข้ามบัญชีได้
* **Network ACLs:** ควบคุมในระดับ Subnet, เป็นแบบ Stateless, รองรับทั้งกฎ ALLOW และ DENY
* **Flow Logs:** บันทึกข้อมูลทราฟฟิก IP ลงใน CloudWatch หรือ S3 เพื่อตรวจสอบและแก้ไขปัญหา
* **Route Tables:** ตารางเส้นทางประจำ Subnet รองรับทั้ง IPv4, IPv6 และการเราต์แบบไดนามิก
* **Internet Gateway (IGW):** เปิดการสื่อสารกับอินเทอร์เน็ต
* **Egress-only Internet Gateway:** สำหรับทราฟฟิก IPv6 ขาออกเท่านั้น
* **NAT Gateway:** ช่วยให้อินสแตนซ์ใน Private Subnet ออกอินเทอร์เน็ตได้ รองรับการเชื่อมต่อพร้อมกันสูงสุด 55,000 ชุด
* **VPC Peering:** เชื่อมต่อ VPC สองตัวเข้าด้วยกันแบบส่วนตัว (Private) แม้จะอยู่ต่างบัญชีหรือต่างภูมิภาค
* **VPC Endpoints (PrivateLink):** เข้าถึงบริการของ AWS แบบส่วนตัวโดยไม่ต้องผ่านอินเทอร์เน็ตหรือ NAT
* **VPC Traffic Mirroring:** คัดลอกทราฟฟิกเพื่อนำไปตรวจสอบเนื้อหาหรือเฝ้าระวังภัยคุกคาม
* **IPAM (IP Address Manager):** เครื่องมือกลางสำหรับวางแผน ติดตาม และตรวจสอบการใช้ IP ที่ซ้ำซ้อน
* **VPC Block Public Access (BPA):** บล็อกการเข้าถึงอินเทอร์เน็ตในระดับ Subnet หรือ VPC ผ่านนโยบายกลางขององค์กร

---

## แนวคิดหลัก (Key Concepts)

### Subnet (เครือข่ายย่อย)
* **Public Subnet:** เชื่อมต่อกับอินเทอร์เน็ต (ผ่าน Internet Gateway)
* **Private Subnet:** ไม่เชื่อมต่อกับอินเทอร์เน็ตโดยตรง
* **VPN-only Subnet:** เชื่อมต่อกับเครือข่ายภายในองค์กรผ่าน Virtual Private Gateway

### ข้อแตกต่างระหว่าง Default และ Non-Default VPC
* **Default VPC:** มาพร้อมกับ Subnet ในทุก AZ, มี Internet Gateway ให้เลย, อินสแตนซ์ได้รับทั้ง Private และ Public IP โดยอัตโนมัติ
* **Non-Default VPC:** คุณต้องสร้างและตั้งค่า Subnet เอง, ต้องติดตั้ง Internet Gateway เอง และอินสแตนซ์จะได้รับเฉพาะ Private IP (ต้องระบุหากต้องการ Public IP)

---

## การเชื่อมต่อกับเครือข่ายภายนอก (Corporate/Home Network)
* **AWS Managed VPN:** เชื่อมต่อผ่าน IPsec VPN
    * **Virtual Private Gateway (VGW):** ฝั่ง AWS
    * **Customer Gateway (CGW):** ฝั่งลูกค้า (อุปกรณ์จริงหรือซอฟต์แวร์)
* **AWS Transit Gateway:** ช่วยเชื่อมต่อหลาย VPC และเครือข่าย On-premises เข้าด้วยกันอย่างเป็นระบบ

---

## ความปลอดภัยของ Subnet (Subnet Security)

### การเปรียบเทียบ Security Group และ Network ACL
| คุณสมบัติ | Security Group | Network ACL |
| :--- | :--- | :--- |
| **ระดับการทำงาน** | อินสแตนซ์ (Instance level) | เครือข่ายย่อย (Subnet level) |
| **กฎที่รองรับ** | อนุญาต (ALLOW) เท่านั้น | อนุญาต (ALLOW) และ ปฏิเสธ (DENY) |
| **สถานะ (State)** | **Stateful:** ขาเข้าผ่านได้ ขาออกผ่านได้เลยอัตโนมัติ | **Stateless:** ต้องตั้งกฎอนุญาตทั้งขาไปและขากลับ |
| **การประเมินกฎ** | ประเมินทุกกฎก่อนตัดสินใจ | ประเมินตามลำดับหมายเลข (จากน้อยไปมาก) |
| **ผลบังคับใช้** | เฉพาะอินสแตนซ์ที่ระบุ | ทุกทรัพยากรใน Subnet นั้น |



---

## ส่วนประกอบเครือข่ายอื่นๆ

### NAT (Network Address Translation)
* **NAT Gateway:** บริการสำเร็จรูปของ AWS ติดตั้งใน Public Subnet และต้องใช้ Elastic IP
* **NAT Instance:** ใช้เครื่อง EC2 มาทำหน้าที่เป็นตัวผ่านทราฟฟิก (ต้องจัดการเอง)

### VPC Endpoints (PrivateLink)
1. **Interface Endpoints:** เป็นการสร้าง Network Interface (ENI) พร้อม IP ส่วนตัว เพื่อเข้าถึงบริการ (รองรับบริการส่วนใหญ่ของ AWS)
2. **Gateway Endpoints:** เป็นเป้าหมายใน Route Table (รองรับเฉพาะ **S3** และ **DynamoDB**)

---

## การจัดการขั้นสูง (Advanced Management)
* **Amazon VPC Lattice:** บริการจัดการเครือข่ายในระดับแอปพลิเคชัน ช่วยเชื่อมต่อและรักษาความปลอดภัยระหว่างบริการข้าม VPC ได้ง่ายขึ้นโดยไม่ต้องจัดการ Route Table เอง
* **Reachability Analyzer:** เครื่องมือวิเคราะห์เพื่อทดสอบว่าทรัพยากรสองตัวเชื่อมต่อกันได้จริงหรือไม่โดยไม่ต้องส่งข้อมูลจริง
* **Network Access Analyzer:** ช่วยระบุว่ามีการเข้าถึงเครือข่ายที่ไม่ได้ตั้งใจหรือผิดกฎความปลอดภัยหรือไม่

---

## ค่าบริการ (Amazon VPC Pricing)
* **VPC/Subnet:** สร้างฟรี
* **NAT Gateway:** คิดค่าบริการรายชั่วโมง + ค่าประมวลผลข้อมูล (ต่อ GB)
* **VPN Connection:** คิดค่าบริการรายชั่วโมงต่อการเชื่อมต่อ
* **Elastic IP (EIP):** คิดค่าบริการรายชั่วโมงสำหรับ IP ที่ไม่ได้ใช้งาน หรือเชื่อมต่อกับอินสแตนซ์ที่หยุดทำงาน (Public IPv4 ทุกตัวมีค่าธรรมเนียมรายชั่วโมง)
* **Traffic Mirroring / IPAM / VPC Lattice:** มีค่าบริการรายชั่วโมงและตามปริมาณการใช้งานข้อมูล

---
**ต้องการให้ผมช่วยอธิบายการตั้งค่า Route Table สำหรับการทำ NAT Gateway หรือการเขียนกฎสำหรับ Network ACL เพิ่มเติมไหมครับ?**นี่คือคำแปลภาษาไทยของ **Amazon VPC Cheat Sheet** ตามเนื้อหาที่คุณให้มาครับ

---

# Amazon Virtual Private Cloud (VPC) Cheat Sheet

**Amazon VPC** ช่วยให้คุณสร้าง **เครือข่ายเสมือนจริงบนคลาวด์ที่แยกส่วนเฉพาะสำหรับบัญชี AWS ของคุณ** ซึ่งคุณสามารถเปิดใช้งานทรัพยากรต่างๆ ของ AWS ได้ โดย VPC จะทำหน้าที่เป็นชั้นเครือข่ายสำหรับ Amazon EC2 และบริการอื่นๆ

* VPC ครอบคลุมทุก Availability Zones (AZs) ภายในหนึ่งภูมิภาค (Region)
* หลังจากสร้าง VPC แล้ว คุณสามารถเพิ่ม Subnet หนึ่งตัวหรือมากกว่าในแต่ละ AZ ได้



---

## คุณสมบัติเด่น (Features)
* **การระบุช่วง IP:** กำหนดช่วง IPv4 และ IPv6 CIDR สำหรับ VPC และ Subnet
* **ประเภท Subnet:** สร้างได้ทั้งแบบ Public, Private และ VPN-only
* **Security Groups:** ควบคุมในระดับอินสแตนซ์, เป็นแบบ Stateful, รองรับเฉพาะกฎ ALLOW และแชร์ข้ามบัญชีได้
* **Network ACLs:** ควบคุมในระดับ Subnet, เป็นแบบ Stateless, รองรับทั้งกฎ ALLOW และ DENY
* **Flow Logs:** บันทึกข้อมูลทราฟฟิก IP ลงใน CloudWatch หรือ S3 เพื่อตรวจสอบและแก้ไขปัญหา
* **Route Tables:** ตารางเส้นทางประจำ Subnet รองรับทั้ง IPv4, IPv6 และการเราต์แบบไดนามิก
* **Internet Gateway (IGW):** เปิดการสื่อสารกับอินเทอร์เน็ต
* **Egress-only Internet Gateway:** สำหรับทราฟฟิก IPv6 ขาออกเท่านั้น
* **NAT Gateway:** ช่วยให้อินสแตนซ์ใน Private Subnet ออกอินเทอร์เน็ตได้ รองรับการเชื่อมต่อพร้อมกันสูงสุด 55,000 ชุด
* **VPC Peering:** เชื่อมต่อ VPC สองตัวเข้าด้วยกันแบบส่วนตัว (Private) แม้จะอยู่ต่างบัญชีหรือต่างภูมิภาค
* **VPC Endpoints (PrivateLink):** เข้าถึงบริการของ AWS แบบส่วนตัวโดยไม่ต้องผ่านอินเทอร์เน็ตหรือ NAT
* **VPC Traffic Mirroring:** คัดลอกทราฟฟิกเพื่อนำไปตรวจสอบเนื้อหาหรือเฝ้าระวังภัยคุกคาม
* **IPAM (IP Address Manager):** เครื่องมือกลางสำหรับวางแผน ติดตาม และตรวจสอบการใช้ IP ที่ซ้ำซ้อน
* **VPC Block Public Access (BPA):** บล็อกการเข้าถึงอินเทอร์เน็ตในระดับ Subnet หรือ VPC ผ่านนโยบายกลางขององค์กร

---

## แนวคิดหลัก (Key Concepts)

### Subnet (เครือข่ายย่อย)
* **Public Subnet:** เชื่อมต่อกับอินเทอร์เน็ต (ผ่าน Internet Gateway)
* **Private Subnet:** ไม่เชื่อมต่อกับอินเทอร์เน็ตโดยตรง
* **VPN-only Subnet:** เชื่อมต่อกับเครือข่ายภายในองค์กรผ่าน Virtual Private Gateway

### ข้อแตกต่างระหว่าง Default และ Non-Default VPC
* **Default VPC:** มาพร้อมกับ Subnet ในทุก AZ, มี Internet Gateway ให้เลย, อินสแตนซ์ได้รับทั้ง Private และ Public IP โดยอัตโนมัติ
* **Non-Default VPC:** คุณต้องสร้างและตั้งค่า Subnet เอง, ต้องติดตั้ง Internet Gateway เอง และอินสแตนซ์จะได้รับเฉพาะ Private IP (ต้องระบุหากต้องการ Public IP)

---

## การเชื่อมต่อกับเครือข่ายภายนอก (Corporate/Home Network)
* **AWS Managed VPN:** เชื่อมต่อผ่าน IPsec VPN
    * **Virtual Private Gateway (VGW):** ฝั่ง AWS
    * **Customer Gateway (CGW):** ฝั่งลูกค้า (อุปกรณ์จริงหรือซอฟต์แวร์)
* **AWS Transit Gateway:** ช่วยเชื่อมต่อหลาย VPC และเครือข่าย On-premises เข้าด้วยกันอย่างเป็นระบบ

---

## ความปลอดภัยของ Subnet (Subnet Security)

### การเปรียบเทียบ Security Group และ Network ACL
| คุณสมบัติ | Security Group | Network ACL |
| :--- | :--- | :--- |
| **ระดับการทำงาน** | อินสแตนซ์ (Instance level) | เครือข่ายย่อย (Subnet level) |
| **กฎที่รองรับ** | อนุญาต (ALLOW) เท่านั้น | อนุญาต (ALLOW) และ ปฏิเสธ (DENY) |
| **สถานะ (State)** | **Stateful:** ขาเข้าผ่านได้ ขาออกผ่านได้เลยอัตโนมัติ | **Stateless:** ต้องตั้งกฎอนุญาตทั้งขาไปและขากลับ |
| **การประเมินกฎ** | ประเมินทุกกฎก่อนตัดสินใจ | ประเมินตามลำดับหมายเลข (จากน้อยไปมาก) |
| **ผลบังคับใช้** | เฉพาะอินสแตนซ์ที่ระบุ | ทุกทรัพยากรใน Subnet นั้น |



---

## ส่วนประกอบเครือข่ายอื่นๆ

### NAT (Network Address Translation)
* **NAT Gateway:** บริการสำเร็จรูปของ AWS ติดตั้งใน Public Subnet และต้องใช้ Elastic IP
* **NAT Instance:** ใช้เครื่อง EC2 มาทำหน้าที่เป็นตัวผ่านทราฟฟิก (ต้องจัดการเอง)

### VPC Endpoints (PrivateLink)
1. **Interface Endpoints:** เป็นการสร้าง Network Interface (ENI) พร้อม IP ส่วนตัว เพื่อเข้าถึงบริการ (รองรับบริการส่วนใหญ่ของ AWS)
2. **Gateway Endpoints:** เป็นเป้าหมายใน Route Table (รองรับเฉพาะ **S3** และ **DynamoDB**)

---

## การจัดการขั้นสูง (Advanced Management)
* **Amazon VPC Lattice:** บริการจัดการเครือข่ายในระดับแอปพลิเคชัน ช่วยเชื่อมต่อและรักษาความปลอดภัยระหว่างบริการข้าม VPC ได้ง่ายขึ้นโดยไม่ต้องจัดการ Route Table เอง
* **Reachability Analyzer:** เครื่องมือวิเคราะห์เพื่อทดสอบว่าทรัพยากรสองตัวเชื่อมต่อกันได้จริงหรือไม่โดยไม่ต้องส่งข้อมูลจริง
* **Network Access Analyzer:** ช่วยระบุว่ามีการเข้าถึงเครือข่ายที่ไม่ได้ตั้งใจหรือผิดกฎความปลอดภัยหรือไม่

---

## ค่าบริการ (Amazon VPC Pricing)
* **VPC/Subnet:** สร้างฟรี
* **NAT Gateway:** คิดค่าบริการรายชั่วโมง + ค่าประมวลผลข้อมูล (ต่อ GB)
* **VPN Connection:** คิดค่าบริการรายชั่วโมงต่อการเชื่อมต่อ
* **Elastic IP (EIP):** คิดค่าบริการรายชั่วโมงสำหรับ IP ที่ไม่ได้ใช้งาน หรือเชื่อมต่อกับอินสแตนซ์ที่หยุดทำงาน (Public IPv4 ทุกตัวมีค่าธรรมเนียมรายชั่วโมง)
* **Traffic Mirroring / IPAM / VPC Lattice:** มีค่าบริการรายชั่วโมงและตามปริมาณการใช้งานข้อมูล