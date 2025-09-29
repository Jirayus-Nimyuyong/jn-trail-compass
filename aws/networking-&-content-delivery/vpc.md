# Virtual Private Cloud (VPC)

Virtual Private Cloud (VPC) คือการสร้างเครือข่ายเสมือน (virtual network) ภายใน AWS ที่คุณสามารถควบคุมได้เต็มรูปแบบ เช่น การเลือกช่วง IP (CIDR block), การสร้าง Subnet, Routing, Firewall Rules และอื่น ๆ ที่ช่วยให้คุณสามารถปรับใช้ (deploy) ทรัพยากรได้อย่างปลอดภัย โดย VPC เป็น **ทรัพยากรระดับ Region** หมายความว่าหากมี 2 Region แต่ละ Region จะมี VPC ของตัวเองแยกออกจากกัน

ภายใน VPC ซึ่งเป็น **โครงสร้างเชิงตรรกะ (logical construct)** สามารถสร้าง **Subnets** เพื่อแบ่งเครือข่ายภายใน VPC ได้ โดย **Subnets ถูกกำหนดในระดับ Availability Zone (AZ)**

* มี **Default VPC หนึ่งตัวต่อหนึ่ง Region**
* ในหนึ่ง AZ สามารถมีหลาย Subnet ได้
* Subnet แรกที่เราจะสร้างคือ **Public Subnet** → สามารถเข้าถึงได้จากอินเทอร์เน็ต (ทั้งเข้าและออกไปยังเว็บได้)
* อีกประเภทคือ **Private Subnet** → ไม่สามารถเข้าถึงได้จากอินเทอร์เน็ต (จะกำหนดการเข้าถึงในภายหลัง)

เพื่อควบคุมการเข้าถึงอินเทอร์เน็ตและระหว่าง Subnets เราใช้ **Route Tables** ภายใน VPC → Route Tables จะกำหนดว่า Traffic จะไหลอย่างไรระหว่าง Subnets ต่าง ๆ

* EC2 Instance ใน **Public Subnet** → เข้าถึงอินเทอร์เน็ตได้
* EC2 Instance ใน **Private Subnet** → ไม่มีการเข้าถึงอินเทอร์เน็ต และอินเทอร์เน็ตก็ไม่สามารถเข้าถึงได้

การออกแบบเช่นนี้ช่วยเสริมความปลอดภัยและความเป็นส่วนตัว

* รองรับการแยกทรัพยากรและควบคุม Security อย่างละเอียด
* สามารถเชื่อมต่อกับเครือข่ายภายนอก เช่น On-premise ผ่าน VPN หรือ Direct Connect ได้

## ภาพรวมสถาปัตยกรรม VPC

ถ้ามองภาพรวมที่ใหญ่ขึ้น เรามีโครงสร้างพื้นฐานคลาวด์หนึ่ง Region ที่มี VPC อยู่ VPC จะมี **CIDR Range** ซึ่งคือชุดของ IP ที่กำหนดว่า VPC นี้จะใช้ IP อะไรได้บ้าง

ตัวอย่างเช่น มี 2 AZ แต่ละ AZ มีทั้ง **Public Subnet และ Private Subnet** → คุณสามารถเปิด EC2 Instance ใน Subnet ใดก็ได้

นี่เป็นสถาปัตยกรรมทั่วไปใน AWS โดยปกติ **Default VPC** ที่ AWS สร้างมาให้ในแต่ละ Region จะมีแค่ **Public Subnets (1 ต่อ AZ)** และจะ **ไม่มี Private Subnet**

## สถาปัตยกรรมแบบ Three-Tier

ทำไมถึงต้องอธิบายเรื่อง VPC ทั้งหมดก่อนหน้านี้?
เพราะจะช่วยให้เข้าใจ **สถาปัตยกรรมแบบสามชั้น (Three-Tier Solution Architecture)** ได้ชัดเจนขึ้นครับ

ผู้ใช้ของเราต้องการเข้าถึงเว็บแอปพลิเคชัน ดังนั้นเราจึงออกแบบโดยใช้ **Elastic Load Balancer (ELB)** ที่กระจายตัวอยู่ในหลาย Availability Zone (AZ)

เนื่องจาก ELB ต้องถูกเข้าถึงจากอินเทอร์เน็ต มันจึงต้องถูกติดตั้งใน **Public Subnet** นี่คือเหตุผลที่เราจัดโครงสร้างเครือข่ายในรูปแบบนี้

เพื่อเข้าถึง ELB จะต้องมี **DNS Query** เพื่อหาตำแหน่งของมัน เราใช้ **Route 53** เพื่อให้ผู้ใช้สื่อสารกับ ELB ได้โดยตรง

ELB จะกระจายทราฟฟิกไปยัง **EC2 Instances** ที่อยู่ใน **Auto Scaling Group** เนื่องจากอินสแตนซ์เหล่านี้ไม่จำเป็นต้องเปิดสู่สาธารณะ เราจึงวางไว้ใน **Private Subnet**

เราจะกระจาย EC2 Instances ไปยัง 3 AZ (AZ1, AZ2, AZ3) โดยมีอินสแตนซ์ในแต่ละ AZ และให้ ELB ส่งทราฟฟิกจาก Public Subnet เข้าสู่ Private Subnet ผ่าน Route Table

การออกแบบนี้ช่วยแยกชั้น **Compute Layer** ให้อยู่ใน Private Subnet เพื่อเพิ่มความปลอดภัย

ต่อไป เราต้องเก็บข้อมูลของเรา เราจึงสร้าง **Private Subnet ชั้นที่สอง (Data Subnet)** ซึ่งเป็นชั้นที่สามของสถาปัตยกรรม Three-Tier

ภายใน Data Subnet เราใช้ **Amazon RDS** เป็นฐานข้อมูลสำหรับอ่าน/เขียนข้อมูล โดย EC2 Instances จะเชื่อมต่อกับ RDS

นอกจากนี้ เรายังสามารถใช้ **ElastiCache** ภายใน Data Subnet เพื่อแคชข้อมูลจาก RDS หรือเก็บ Session Data ในหน่วยความจำสำหรับ EC2 Instances ที่รันเว็บแอป

ทั้งหมดนี้รวมกันคือ **สถาปัตยกรรม Three-Tier แบบมาตรฐาน** ที่มักเจอในโจทย์สอบ

นี่คือเหตุผลที่ก่อนหน้านี้เราต้องปูพื้นเรื่อง VPC และ Subnet เพื่อให้เข้าใจโครงสร้างนี้ได้ง่ายขึ้นครับ

## องค์ประกอบของ VPC

## CIDR Block

CIDR (Classless Inter-Domain Routing) Block คือการกำหนดช่วงของ IP Address ที่ใช้ใน VPC หรือ Subnet โดยมีรูปแบบเช่น 10.0.0.0/16, 192.168.1.0/24

* ตัวเลข /16, /24 เรียกว่า subnet mask ซึ่งบอกขนาดของ IP ที่สามารถใช้ได้

* ตัวอย่าง 10.0.0.0/16 จะมี IP ทั้งหมด 65,536 IP (แต่ AWS จะสำรองไว้ 5 IP ต่อ Subnet)

การกำหนด CIDR มีข้อควรระวัง:

* ไม่สามารถเปลี่ยน CIDR ของ VPC ได้หลังจากสร้าง

* ต้องวางแผนให้เพียงพอกับจำนวน Subnet และ EC2 ที่จะใช้ในอนาคต

* สามารถเพิ่ม Secondary CIDR ได้หากต้องการขยาย IP ภายหลัง

## Subnets

Subnet คือการแบ่งพื้นที่ของ VPC ออกเป็นส่วนย่อย ๆ โดยมีคุณสมบัติสำคัญคือ

### Subnets และ Availability Zones

* Subnet คือการแบ่งเครือข่ายภายใน VPC
* Subnet จะผูกอยู่กับ Availability Zone ใด Zone หนึ่ง
* แต่ละ Subnet อยู่ใน Availability Zone เดียว
* แบ่งออกเป็น Public Subnet (สามารถเข้าถึง Internet ได้) และ Private Subnet (ไม่สามารถเข้าถึง Internet โดยตรง)
* ใช้ควบคุม Resource ให้กระจายอยู่ในหลาย Zone เพื่อเพิ่มความทนทาน

* Public Subnet:
  * เชื่อมต่อ Internet ผ่าน Internet Gateway
  * เหมาะสำหรับ Load Balancer, Bastion Host

* **Public Subnet** → ใช้ **Internet Gateway (IGW)**

  * IGW ช่วยให้ Instances ใน Subnet เชื่อมต่ออินเทอร์เน็ตได้
  * Public Subnet จะมี **Route ไปยัง IGW** → ทำให้สามารถติดต่ออินเทอร์เน็ตได้โดยตรง

* Private Subnet:
  * ไม่สามารถเข้าถึงอินเทอร์เน็ตได้โดยตรง
  * ใช้ NAT Gateway/NAT Instance หากต้องการ outbound access
  * เหมาะสำหรับ Application Servers, DB Servers

* **Private Subnet** → ใช้ **NAT Gateway หรือ NAT Instance**

  * บางครั้ง Instance ใน Private Subnet ต้องการเข้าถึงอินเทอร์เน็ต เช่น โหลด Software Updates
  * แต่เรา **ไม่ต้องการให้อินเทอร์เน็ตเข้ามาเชื่อมต่อกับ Instance ได้โดยตรง**
  * วิธีแก้คือใช้ **NAT Gateway (managed by AWS)** หรือ **NAT Instance (self-managed)**
  * ทั้งสองทำหน้าที่ **Network Address Translation (NAT)** ให้ Private Subnet → ทำให้ Private Instance ออกไปอินเทอร์เน็ตได้ แต่ไม่มีใครจากอินเทอร์เน็ตเข้ามาได้  

* โครงสร้าง:

  * NAT Gateway/Instance จะถูกวางใน **Public Subnet**
  * Private Subnet จะมี Route → ชี้ไปที่ NAT
  * NAT จะมี Route → ไปที่ IGW
  * สุดท้าย Private Instance จึงออกอินเทอร์เน็ตได้ แต่ยังคงความเป็นส่วนตัว  

นี่คือสถาปัตยกรรมทั่วไปที่ใช้ใน AWS (โดยเฉพาะเมื่อใช้งาน Lambda และ Service อื่น ๆ)

* การใช้งานแบบ Multi-AZ:
  * เพื่อเพิ่ม availability ควรสร้าง subnet หลายอันใน AZ ที่แตกต่างกัน

## Route Tables

Route Table คือชุดของกฎ (rules) ที่ระบุว่า traffic จาก Subnet หรือ Gateway ควรถูกส่งไปที่ใด

* Route Table อย่างน้อย 1 ชุดต่อ VPC
* Subnet หนึ่งสามารถมี Route Table ได้เพียงชุดเดียว
* ใช้กำหนดเส้นทาง เช่น ส่งไปยัง Internet Gateway, NAT Gateway, หรือ Transit Gateway

## Internet Gateways

Internet Gateway (IGW) เป็นอุปกรณ์ที่ทำให้ Instance ภายใน Public Subnet สามารถติดต่อกับ Internet ได้โดยตรง

* Internet Gateway ทำหน้าที่ให้ **Public Subnet** เชื่อมต่อกับอินเทอร์เน็ต
* ต้องแนบ IGW กับ VPC เท่านั้นจึงจะสามารถใช้งานได้
* ต้องมีเส้นทางใน Route Table ที่ชี้ไปยัง IGW ด้วย
* ถูกกำหนดในระดับ VPC

## Egress-only Internet Gateways

ใช้เฉพาะกับ IPv6 เพื่อให้ Instance ใน Subnet สามารถส่งข้อมูลออกสู่ Internet ได้ แต่ไม่สามารถรับการเชื่อมต่อจากภายนอกเข้ามาได้

* เพิ่มความปลอดภัยในการใช้งาน IPv6

## DHCP Option Sets

เป็นชุดของค่าที่ใช้กำหนด Default ค่า DHCP สำหรับ EC2 เช่น:

* DNS server ที่ใช้งาน (เช่น AmazonProvidedDNS หรือ custom DNS)
* Domain name
* NTP server

## Elastic IPs

Elastic IP Address เป็น Public IPv4 ที่มีค่าแน่นอน (static)

* ใช้สำหรับ EC2 หรือ NAT Gateway ที่ต้องมี IP คงที่
* สามารถย้าย Elastic IP จาก Resource หนึ่งไปยังอีก Resource หนึ่งได้

## Managed Prefix Lists

คือรายการของ CIDR block ที่สร้างขึ้นและจัดการผ่าน AWS

* ใช้ร่วมกับ Route Table หรือ Security Group
* ตัวอย่างเช่น prefix list สำหรับบริการของ AWS เช่น S3 หรือ DynamoDB

## NAT Gateways และ NAT Instances

NAT Gateway และ NAT Instances ใช้ใน Private Subnet เพื่อให้ Instance ภายในสามารถ access Internet ได้โดยไม่ต้องมี Public IP

* รองรับ high availability
* คิดค่าใช้จ่ายตาม traffic และชั่วโมงใช้งาน
* ใช้เพื่อให้ **Private Subnet** ออกอินเทอร์เน็ตได้
* การเชื่อมต่อนี้ผ่าน **NAT Gateway** หรือ **NAT Instance** ที่อยู่ใน **Public Subnet**

## Peering Connections

เชื่อมต่อ VPC สองชุดเข้าด้วยกันให้สามารถสื่อสารได้โดยตรง (แบบ point-to-point)

* ใช้เชื่อมต่อ **2 VPC** (ต่าง Region หรือ ต่าง Account ก็ได้) → ให้สื่อสารกันได้เหมือนอยู่ใน Network เดียวกัน
* ไม่สามารถ transit traffic ได้ → ถ้า A peering กับ B, และ A peering กับ C → B จะไม่สามารถสื่อสารกับ C ได้ ต้องสร้าง Peering Connection เพิ่มเอง
* ใช้ร่วมกับ Route Table เพื่อควบคุมเส้นทางระหว่าง VPC
* เงื่อนไข: **CIDR/IP Range ต้องไม่ทับกัน** → ไม่งั้นจะเกิด Routing Conflict

## Security

ภายใน VPC ของเรา ซึ่งมี Public Subnet และ EC2 Instance หนึ่งเครื่อง เราสามารถสร้าง **Network ACL (NACL)** ขึ้นมา ซึ่งทำหน้าที่เป็น **firewall** ที่ควบคุม **การรับ–ส่ง Traffic เข้าออก Subnet** โดย NACL สามารถกำหนดได้ทั้ง **Allow Rule** (อนุญาต) และ **Deny Rule** (ปฏิเสธ) อย่างชัดเจน

### Network ACLs

NACL ถือเป็น **ด่านป้องกันแรก (first line of defense)** สำหรับ Subnets

* ทำงานในระดับ Subnet แบบ Stateless (ทุก request ต้องมี response rule ตรงกัน)
* เหมาะกับการควบคุม traffic แบบกว้าง ๆ เช่น บล็อกทั้ง IP range
* สนับสนุน allow และ deny rule
* Rule ของ NACLs ใช้ **IP Address เท่านั้น**

เช่น อนุญาตหรือปฏิเสธ Traffic จากบาง IP Address ได้

### Security Groups

Security Group ทำหน้าที่เป็น Firewall เช่นกัน แต่ควบคุม **Traffic เข้า–ออก Instance (หรือ ENI)** โดยตรง
**SGs ถูกผูกกับ EC2 Instance โดยตรง** → ถือเป็น **ด่านป้องกันชั้นที่สอง**

* ทำงานในระดับ Instance แบบ Stateful (จำการตอบกลับได้)
* ต่างจาก NACLs ตรงที่ **SGs มีแต่ Allow Rule เท่านั้น** (ไม่มี Deny)
* สนับสนุนเฉพาะ allow rule เท่านั้น
* Rule ของ SGs อ้างอิงได้ทั้ง **IP Address** และ **Security Group อื่น**
* นิยมใช้ควบคุม access ที่ละเอียดกว่า ACL เช่น เปิดเฉพาะพอร์ต 443 ให้เฉพาะ subnet หรือ IP

สรุปความต่าง:

* **NACL** → Subnet-level, Stateless, มี Allow/Deny Rules
* **SG** → Instance-level, Stateful, มีแต่ Allow Rules

## PrivateLink and Lattice

### Endpoints

VPC Endpoint คือจุดเชื่อมต่อแบบ private ไปยังบริการของ AWS เช่น S3, DynamoDB โดยไม่ต้องออก Internet

* ใช้เชื่อมต่อ AWS Services ผ่าน **Private Network** แทนการออกอินเทอร์เน็ต
* ปกติแล้ว AWS Services (เช่น S3, DynamoDB, CloudWatch) เข้าถึงผ่าน **Public Internet**
* ถ้า EC2 อยู่ใน Private Subnet → ใช้ **VPC Endpoint** เพื่อเข้าถึงบริการเหล่านี้ได้โดยตรง (ไม่ผ่านอินเทอร์เน็ต)
* ประหยัดค่า Data Transfer
* เพิ่มความปลอดภัย

ประเภท:

* **Gateway Endpoints** → สำหรับ **S3 และ DynamoDB**
* **Interface Endpoints** → สำหรับบริการอื่น ๆ (ใช้ ENI ใน Subnet)

### Endpoint Services

บริการที่สร้างเพื่อเปิดให้ VPC อื่นมาเชื่อมต่อผ่าน PrivateLink

* เช่น สร้าง Network Load Balancer และแชร์ผ่าน Endpoint Service

### Service Networks

ใช้ใน AWS VPC Lattice เพื่อ grouping services ที่สามารถเข้าถึงกันได้ภายใน VPC

### Lattice Services

* บริการระดับ application layer ที่รวม network routing และ security ไว้ในที่เดียว
* รองรับ Zero Trust Model

## Resource Configurations

### Resource Gateways

* จุดเชื่อมกลางที่ใช้สำหรับเชื่อมกับ resource ภายนอก เช่น S3 Gateway Endpoint

### Target Groups

* กลุ่มของเป้าหมายที่ Load Balancer ส่ง traffic ไปยัง
* รองรับ Instance ID, IP Address หรือ Lambda

## DNS Firewall

### Rule Groups

* กำหนดว่าจะให้ DNS query ใดถูกอนุญาตหรือบล็อก
* รองรับ Logging

### Domain Lists

* รายการโดเมน เช่น example.com ที่จะใช้ใน Rule Group

## Network Firewall

### Firewalls

* เป็น stateful firewall ระดับ managed service
* รองรับ packet inspection, intrusion detection, deep packet inspection (DPI)

### Firewall Policies

* ระบุว่า traffic แบบใดที่ควรถูกบล็อกหรืออนุญาต (เช่น deny port 23/telnet)

### Network Firewall Rule Groups

* สามารถมีทั้ง Stateless และ Stateful rule
* แต่ละ group ระบุ protocol, port, direction ได้อย่างละเอียด

### TLS Inspection Configurations

* ตรวจสอบ encrypted traffic ด้วยการทำ man-in-the-middle (ใช้ CA certificate)
* ใช้เพื่อป้องกัน malware ที่ซ่อนใน HTTPS

### Network Firewall Resource Groups

* รวมกลุ่ม subnet หรือ ENI ที่ต้องการให้ Firewall ควบคุม

## Virtual Private Network (VPN)

### Customer Gateways

* อุปกรณ์หรือซอฟต์แวร์ฝั่งลูกค้า เช่น Cisco, pfSense, FortiGate ที่ใช้เชื่อมต่อกับ AWS

### Virtual Private Gateways

* Gateway ฝั่ง AWS ที่รองรับ Site-to-Site VPN
* แนบกับ VPC เพื่อให้รับการเชื่อมต่อจาก Customer Gateway

### Site-to-Site VPN Connections

* เชื่อมต่อเครือข่าย On-premise เข้ากับ AWS แบบ IPsec VPN tunnel
* รองรับ 2 tunnel เพื่อความ redundant
* เชื่อมต่อ **On-premises Data Center ↔ AWS VPC**
* ใช้ **VPN Appliance** ขององค์กรเชื่อมกับ AWS VPN Gateway
* การเชื่อมต่อถูก **เข้ารหัส (Encrypted)** แต่ยังวิ่งผ่าน **Public Internet**
* ตั้งค่าได้เร็ว ใช้เวลาไม่กี่นาที

### Client VPN Endpoints

* ให้ผู้ใช้ทั่วไปเชื่อมต่อ AWS VPC ได้ผ่าน SSL VPN (OpenVPN compatible)
* เหมาะกับ Remote Work

## AWS Verified Access

### Verified Access Instances

* รวมบริการต่าง ๆ ที่ควบคุมด้วย policy
* รองรับการแยกบริการตามนโยบายความปลอดภัย

### Verified Access Trust Providers

* ใช้เพื่อระบุแหล่งที่ยืนยันตัวตน เช่น IAM Identity Center, Okta

### Verified Access Groups

* กลุ่มผู้ใช้หรืออุปกรณ์ที่ใช้ร่วมกันใน policy

### Verified Access Endpoints

* URL หรือ domain ที่ผู้ใช้จะเข้าเพื่อเข้าถึงแอปพลิเคชันที่กำหนด

## Direct Connect

* วิธีเชื่อมต่อที่ **เหมือน VPN** แต่เป็น **สายเชื่อมตรงแบบ Physical (Private Line)**
* ไม่วิ่งผ่านอินเทอร์เน็ต → ความปลอดภัยและความเร็วสูงกว่า
* ข้อเสีย: ใช้เวลาติดตั้งนาน (อย่างน้อย 1 เดือน) เพราะต้องทำเรื่องโครงสร้างสายเชื่อม

## Transit Gateways

* เป็น Hub สำหรับเชื่อมต่อ VPC, VPN และ Direct Connect หลายตัวเข้าด้วยกัน

### Transit Gateway Attachments

* การแนบทรัพยากรเข้ากับ TGW เช่น VPC-A → TGW

### Transit Gateway Policy Tables

* ใช้ควบคุมการ access ระหว่าง attachments ตาม policy

### Transit Gateway Route Tables

* ใช้ routing ระหว่างเครือข่ายที่เชื่อมต่อ TGW

### Transit Gateway Multicast

* รองรับ Multicast traffic สำหรับ workload แบบ real-time เช่น IPTV หรือ Video streaming

## VPC Flow Logs

เมื่อมี Traffic วิ่งผ่าน NACL และ SG แล้ว เราอาจสงสัยว่า “สามารถดู Log ของ Traffic ได้หรือไม่?” คำตอบคือ **VPC Flow Logs**

* Flow Logs เก็บข้อมูลของ Traffic ทุกชนิดที่เข้า–ออก **Network Interfaces**
* สามารถสร้าง Flow Logs ได้ทั้งในระดับ **VPC, Subnet, หรือ ENI**
* Logs ใช้สำหรับ **Monitoring & Troubleshooting** เช่น

  * Subnet ออกอินเทอร์เน็ตไม่ได้
  * สื่อสารระหว่าง Subnets ล้มเหลว
* Logs เก็บข้อมูลจาก AWS-managed services ด้วย เช่น **ELB, ElastiCache, RDS, Aurora**
* สามารถส่ง Logs ไปเก็บที่ **Amazon S3, CloudWatch Logs หรือ Kinesis Data Firehose** เพื่อวิเคราะห์ต่อได้

## Traffic Mirroring

### Mirror Sessions

* ตั้งค่าการทำ mirroring เช่น mirrored traffic from ENI-A to ENI-B

### Mirror Targets

* ปลายทางของ traffic ที่ถูก mirrored เช่น EC2 ที่ติดตั้ง IDS

### Mirror Filters

* กำหนดเงื่อนไข traffic ที่ต้องการ mirror เช่น port 443 เท่านั้น