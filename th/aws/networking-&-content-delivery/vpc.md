# Virtual Private Cloud (VPC)

Virtual Private Cloud (VPC) คือการสร้างเครือข่ายเสมือน (virtual network) ภายใน AWS ที่คุณสามารถควบคุมได้เต็มรูปแบบ เช่น การเลือกช่วง IP (CIDR block), การสร้าง Subnet, Routing, Firewall Rules และอื่น ๆ

* รองรับการแยกทรัพยากรและควบคุม Security อย่างละเอียด
* สามารถเชื่อมต่อกับเครือข่ายภายนอก เช่น On-premise ผ่าน VPN หรือ Direct Connect ได้

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

* แต่ละ Subnet อยู่ใน Availability Zone เดียว
* แบ่งออกเป็น Public Subnet (สามารถเข้าถึง Internet ได้) และ Private Subnet (ไม่สามารถเข้าถึง Internet โดยตรง)
* ใช้ควบคุม Resource ให้กระจายอยู่ในหลาย Zone เพื่อเพิ่มความทนทาน

- Public Subnet:
  - เชื่อมต่อ Internet ผ่าน Internet Gateway
  - เหมาะสำหรับ Load Balancer, Bastion Host

- Private Subnet:
  - ไม่สามารถเข้าถึงอินเทอร์เน็ตได้โดยตรง
  - ใช้ NAT Gateway/NAT Instance หากต้องการ outbound access
  - เหมาะสำหรับ Application Servers, DB Servers

- การใช้งานแบบ Multi-AZ:
  - เพื่อเพิ่ม availability ควรสร้าง subnet หลายอันใน AZ ที่แตกต่างกัน

## Route Tables

Route Table คือชุดของกฎ (rules) ที่ระบุว่า traffic จาก Subnet หรือ Gateway ควรถูกส่งไปที่ใด

* Route Table อย่างน้อย 1 ชุดต่อ VPC
* Subnet หนึ่งสามารถมี Route Table ได้เพียงชุดเดียว
* ใช้กำหนดเส้นทาง เช่น ส่งไปยัง Internet Gateway, NAT Gateway, หรือ Transit Gateway

## Internet Gateways

Internet Gateway (IGW) เป็นอุปกรณ์ที่ทำให้ Instance ภายใน Public Subnet สามารถติดต่อกับ Internet ได้โดยตรง

* ต้องแนบ IGW กับ VPC เท่านั้นจึงจะสามารถใช้งานได้
* ต้องมีเส้นทางใน Route Table ที่ชี้ไปยัง IGW ด้วย

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

## NAT Gateways

NAT Gateway ใช้ใน Private Subnet เพื่อให้ Instance ภายในสามารถ access Internet ได้โดยไม่ต้องมี Public IP

* รองรับ high availability
* คิดค่าใช้จ่ายตาม traffic และชั่วโมงใช้งาน

## Peering Connections

เชื่อมต่อ VPC สองชุดเข้าด้วยกันให้สามารถสื่อสารได้โดยตรง (แบบ point-to-point)

* ไม่สามารถ transit traffic ได้ (เช่น VPC A → VPC B → VPC C ไม่ได้)
* ใช้ร่วมกับ Route Table เพื่อควบคุมเส้นทางระหว่าง VPC

## Security

### Network ACLs

* ทำงานในระดับ Subnet แบบ Stateless (ทุก request ต้องมี response rule ตรงกัน)
* เหมาะกับการควบคุม traffic แบบกว้าง ๆ เช่น บล็อกทั้ง IP range
* สนับสนุน allow และ deny rule

### Security Groups

* ทำงานในระดับ Instance แบบ Stateful (จำการตอบกลับได้)
* สนับสนุนเฉพาะ allow rule เท่านั้น
* นิยมใช้ควบคุม access ที่ละเอียดกว่า ACL เช่น เปิดเฉพาะพอร์ต 443 ให้เฉพาะ subnet หรือ IP

## PrivateLink and Lattice

### Endpoints

VPC Endpoint คือจุดเชื่อมต่อแบบ private ไปยังบริการของ AWS เช่น S3, DynamoDB โดยไม่ต้องออก Internet

* ประหยัดค่า Data Transfer
* เพิ่มความปลอดภัย

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

## Transit Gateways

### Transit Gateways

* เป็น Hub สำหรับเชื่อมต่อ VPC, VPN และ Direct Connect หลายตัวเข้าด้วยกัน

### Transit Gateway Attachments

* การแนบทรัพยากรเข้ากับ TGW เช่น VPC-A → TGW

### Transit Gateway Policy Tables

* ใช้ควบคุมการ access ระหว่าง attachments ตาม policy

### Transit Gateway Route Tables

* ใช้ routing ระหว่างเครือข่ายที่เชื่อมต่อ TGW

### Transit Gateway Multicast

* รองรับ Multicast traffic สำหรับ workload แบบ real-time เช่น IPTV หรือ Video streaming

## Traffic Mirroring

### Mirror Sessions

* ตั้งค่าการทำ mirroring เช่น mirrored traffic from ENI-A to ENI-B

### Mirror Targets

* ปลายทางของ traffic ที่ถูก mirrored เช่น EC2 ที่ติดตั้ง IDS

### Mirror Filters

* กำหนดเงื่อนไข traffic ที่ต้องการ mirror เช่น port 443 เท่านั้น

https://docs.aws.amazon.com/vpc/latest/userguide/VPC_Internet_Gateway.html

https://docs.aws.amazon.com/vpc/latest/userguide/VPC_Internet_Gateway.html

https://docs.aws.amazon.com/vpc/latest/userguide/Carrier_Gateway.html

https://docs.aws.amazon.com/vpc/latest/userguide/how-it-works.html#what-is-privatelink

https://docs.aws.amazon.com/vpc/latest/userguide/VPC_Subnets.html

https://docs.aws.amazon.com/vpc/latest/userguide/egress-only-internet-gateway.html

https://docs.aws.amazon.com/vpc/latest/userguide/Carrier_Gateway.html

https://docs.aws.amazon.com/vpc/latest/userguide/VPC_Internet_Gateway.html

https://aws.amazon.com/vpc/faqs/

https://docs.aws.amazon.com/vpc/latest/userguide/VPC_Scenario2.html

https://docs.aws.amazon.com/vpc/latest/userguide/how-it-works.html#what-is-route-tables

https://docs.aws.amazon.com/vpc/latest/userguide/VPC_SecurityGroups.html

https://docs.aws.amazon.com/vpc/latest/userguide/vpc-network-acls.html

https://docs.aws.amazon.com/vpn/latest/s2svpn/VPC_VPN.html

https://docs.aws.amazon.com/vpc/latest/userguide/vpc-nat-gateway.html

https://docs.aws.amazon.com/vpc/latest/userguide/vpc-nat-comparison.html

https://docs.aws.amazon.com/vpc/latest/userguide/vpc-nat-gateway.html

https://docs.aws.amazon.com/vpc/latest/userguide/vpc-nat-gateway.html

https://docs.aws.amazon.com/vpc/latest/userguide/vpc-nat-comparison.html

https://docs.aws.amazon.com/vpc/latest/peering/what-is-vpc-peering.html

https://docs.aws.amazon.com/vpc/latest/userguide/VPC_Route_Tables.html

https://docs.aws.amazon.com/vpc/latest/userguide/vpc-nat-comparison.html

https://docs.aws.amazon.com/vpc/latest/userguide/VPC_SecurityGroups.html

https://docs.aws.amazon.com/vpc/latest/userguide/vpc-network-acls.html

https://docs.aws.amazon.com/vpc/latest/userguide/VPC_Scenario2.html

https://docs.aws.amazon.com/vpc/latest/userguide/flow-logs-troubleshooting.html

https://docs.aws.amazon.com/vpc/latest/userguide/flow-logs.html#flow-log-records

https://docs.aws.amazon.com/vpc/latest/userguide/vpc-network-acls.html

https://docs.aws.amazon.com/vpc/latest/userguide/VPC_SecurityGroups.html

https://docs.aws.amazon.com/vpc/latest/userguide/vpc-network-acls.html#Rules
