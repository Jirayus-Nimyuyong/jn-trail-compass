# AWS Route 53

## Route 53 คืออะไร?

AWS Route 53 คือบริการ DNS (Domain Name System) ที่มีความยืดหยุ่นและสามารถปรับขนาดได้สูง โดยออกแบบมาเพื่อให้สามารถเชื่อมต่อชื่อโดเมน (เช่น `example.com`) กับทรัพยากรต่าง ๆ ใน AWS หรือภายนอกได้อย่างมีประสิทธิภาพ

Route 53 ประกอบด้วย 3 ความสามารถหลัก:

1. Domain registration (การจดโดเมน)
2. DNS routing (การชี้ชื่อโดเมนไปยังทรัพยากร)
3. Health checking (การตรวจสอบสถานะของ endpoint)

---

## Hosted Zones

* คือพื้นที่ที่ใช้เก็บ DNS records ของโดเมน
* มี 2 ประเภท:

  * **Public hosted zone**: สำหรับโดเมนสาธารณะ เช่น `example.com`
  * **Private hosted zone**: สำหรับใช้กับ VPC ภายใน (internal DNS)

---

## Health Checks

* ใช้ตรวจสอบว่าสถานะของ resource เช่น web server หรือ API ยังทำงานอยู่หรือไม่
* Protocol ที่รองรับ: HTTP, HTTPS, TCP
* ใช้ร่วมกับ routing policy เช่น failover, latency, weighted routing

---

## Profiles (ใหม่)

* Profiles คือการตั้งค่าคอนฟิกที่แชร์ได้ข้ามหลาย hosted zones
* ใช้ช่วยให้การจัดการ DNS record ข้ามหลายโดเมนง่ายขึ้น

---

## IP-based Routing

* การชี้ DNS ตาม IP address ranges หรือ prefix
* ใช้ร่วมกับ CIDR collections เพื่อควบคุม traffic ตาม location/IP ที่เข้ามา

---

## CIDR Collections

* ชุดของ IP ranges (CIDR blocks) ที่สามารถจัดกลุ่มเพื่อใช้กับ IP-based routing

---

## Traffic Flow

* เครื่องมือ visual สำหรับสร้าง routing policies ได้ง่ายและซับซ้อน
* ตัวอย่าง: weighted + geo-proximity + failover

### Traffic Policies

* เป็น logic ที่ใช้ในการกำหนดเส้นทางให้กับ DNS
* ประเภท policy:

  * Simple
  * Weighted
  * Latency
  * Failover
  * Geolocation
  * Geoproximity
  * IP-based

### Policy Records

* เป็น DNS record ที่เชื่อมโยงกับ traffic policy
* ใช้เพื่อเปิดใช้งาน traffic policy บน hosted zone

---

## Domains

### Registered Domains

* Route 53 รองรับการจดโดเมนโดยตรง
* รองรับ TLD (.com, .org, .dev ฯลฯ)
* มีบริการ WHOIS และ DNSSEC

### Requests

* แสดงข้อมูลการร้องขอ API ต่าง ๆ เช่น CreateHostedZone, ListRecords

---

## Resolver

Route 53 Resolver คือระบบ **DNS สำหรับภายใน VPC**

### VPCs

* คุณสามารถกำหนด Private Hosted Zones ให้ทำงานกับ VPC ได้โดยตรง

### Inbound Endpoints

* ให้ DNS server ภายนอกสามารถ query DNS records ภายใน AWS ได้
* ใช้ใน hybrid cloud หรือ On-prem → AWS

### Outbound Endpoints

* ให้ instance ภายใน AWS ส่ง query DNS ไปยัง DNS server ภายนอก
* ใช้ใน AWS → On-prem หรือ third-party DNS

### Rules

* ใช้ควบคุมการ forward DNS queries ตาม domain หรือ subdomain ที่กำหนด เช่น `corp.internal`

### Query Logging

* เก็บ log ของ DNS queries ผ่าน CloudWatch Logs, S3, หรือ Kinesis
* วิเคราะห์ความปลอดภัย หรือ debug DNS ได้

---

## Outposts

* รองรับการใช้งาน Route 53 Resolver ร่วมกับ AWS Outposts
* ให้คุณใช้ DNS resolution ภายในระบบ On-premise ที่ต่อเชื่อมกับ AWS ได้

---

## สรุป

Route 53 เป็นเครื่องมือสำคัญในโครงสร้างพื้นฐาน AWS ที่ให้ทั้งการจดโดเมน, การจัดการ DNS อย่างละเอียด, และการควบคุม routing traffic ตามสถานะและเงื่อนไขที่ยืดหยุ่นสูง สามารถใช้ได้ทั้งกับระบบสาธารณะและระบบภายในองค์กร (VPC)
