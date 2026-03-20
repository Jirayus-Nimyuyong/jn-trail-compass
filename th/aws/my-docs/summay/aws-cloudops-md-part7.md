# AWS CloudOps SOA-C03 — ส่วนที่ 7
## Route 53 / VPC / Other Services / เตรียมสอบ

---

# Amazon Route 53

---

## DNS คืออะไร?

- Domain Name System: แปลง hostnames เป็น machine IP addresses
- www.google.com → 172.217.18.36
- DNS เป็นกระดูกสันหลังของ Internet

### DNS Terminologies:
- **Domain Registrar:** Amazon Route 53, GoDaddy, ...
- **DNS Records:** A, AAAA, CNAME, NS, ...
- **Zone File:** มี DNS records
- **Name Server:** resolve DNS queries (Authoritative/Non-Authoritative)
- **TLD (Top Level Domain):** .com, .us, .in, .gov, .org
- **SLD (Second Level Domain):** amazon.com, google.com

---

## Amazon Route 53

- Highly available, scalable, fully managed, **Authoritative** DNS
- Route 53 เป็น **Domain Registrar** ด้วย
- ตรวจสุขภาพทรัพยากรได้
- **AWS service เดียวที่ให้ 100% availability SLA**
- ชื่อ Route 53 มาจาก DNS port 53

---

## Route 53 — Records

แต่ละ record ประกอบด้วย:
- Domain/subdomain Name, Record Type, Value, Routing Policy, TTL

### Record Types:
| Type | คำอธิบาย |
|------|----------|
| **A** | maps hostname → IPv4 |
| **AAAA** | maps hostname → IPv6 |
| **CNAME** | maps hostname → hostname อื่น (ใช้กับ Zone Apex ไม่ได้) |
| **NS** | Name Servers สำหรับ Hosted Zone |

---

## Route 53 — Hosted Zones

| ประเภท | คำอธิบาย | ตัวอย่าง |
|--------|----------|---------|
| Public | route traffic บน Internet | application1.mypublicdomain.com |
| Private | route traffic ภายใน VPC | application1.company.internal |

- ค่าใช้จ่าย: $0.50/เดือน/hosted zone

---

## CNAME vs Alias

- AWS Resources เปิดเผย hostname (lb1-1234.us-east-2.elb.amazonaws.com) แต่คุณต้องการ myapp.mydomain.com

| | CNAME | Alias |
|---|-------|-------|
| ชี้ไป | hostname ใดก็ได้ | AWS Resource เท่านั้น |
| Zone Apex (root domain) | ❌ | ✅ |
| ค่าใช้จ่าย | มี | **ฟรี** |
| Health check | ❌ (native) | ✅ |
| TTL | กำหนดได้ | กำหนดไม่ได้ |
| Type | — | A/AAAA เท่านั้น |

### Alias Record Targets:
ELB, CloudFront, API Gateway, Elastic Beanstalk, S3 Websites, VPC Interface Endpoints, Global Accelerator, Route 53 record (same hosted zone)
- ⚠️ **ชี้ไป EC2 DNS name ไม่ได้**

---

## Route 53 — TTL (Time To Live)

- **High TTL (เช่น 24 ชม.):** traffic น้อยบน Route 53, records อาจ outdated
- **Low TTL (เช่น 60 วินาที):** traffic มากบน Route 53 ($$), records outdated น้อย, เปลี่ยน records ง่าย
- Alias records: TTL กำหนดไม่ได้

---

## Route 53 — Routing Policies

| Policy | คำอธิบาย | Health Check |
|--------|----------|-------------|
| **Simple** | ไปทรัพยากรเดียว (หลายค่า→client เลือก random) | ❌ |
| **Weighted** | กระจายตาม weight (%) | ✅ |
| **Latency-based** | ไปที่ latency ต่ำสุดใกล้ user | ✅ (failover) |
| **Failover** | Active/Passive (mandatory health check บน primary) | ✅ (บังคับ) |
| **Geolocation** | ตามตำแหน่ง user (ทวีป/ประเทศ/US State) ต้องมี Default record | ✅ |
| **Geoproximity** | ตามตำแหน่ง + bias (ใช้ Traffic Flow) | — |
| **Multi-Value** | คืนหลายค่า (สูงสุด 8 healthy records) ไม่ใช่ ELB | ✅ |
| **IP-based** | ตาม client IP (CIDR → endpoint mapping) | — |

---

## Route 53 — Health Checks

สำหรับ **public resources เท่านั้น**

### 3 ประเภท:

**1. Monitor an Endpoint:**
- 15 global health checkers, >18% report healthy = Healthy
- Interval: 30 วินาที (10 วินาที = ค่าใช้จ่ายสูง)
- Protocol: HTTP, HTTPS, TCP
- Health check pass เมื่อ 2xx/3xx status codes
- ตรวจ text ใน first 5120 bytes ของ response ได้
- ต้อง allow incoming requests จาก Route 53 Health Checkers IP range

**2. Calculated Health Checks:**
- รวมหลาย Health Checks (AND/OR/NOT)
- สูงสุด 256 Child Health Checks
- กำหนดจำนวนที่ต้อง pass เพื่อให้ parent pass
- กรณีใช้งาน: maintenance โดยไม่ทำให้ทุก health checks fail

**3. Monitor CloudWatch Alarm:**
- สร้าง CloudWatch Metric + Alarm → Health Check ตรวจ alarm
- **เหมาะสำหรับ private resources** (health checkers อยู่นอก VPC)

---

## Route 53 — DNS Records สำหรับ Email

| Record | หน้าที่ |
|--------|---------|
| MX | Mail Exchange — บอกว่าส่ง inbound mail ไปไหน |
| TXT (SPF) | Sender Policy Framework — authorize servers ที่ส่ง mail ได้ |
| TXT (DKIM) | DomainKeys Identified Mail — cryptographic signature |
| TXT (DMARC) | กำหนด handling policy สำหรับ messages ที่ fail SPF/DKIM |

---

## Route 53 — Hybrid DNS

- Route 53 Resolver ตอบ DNS queries อัตโนมัติสำหรับ: local domain names, Private Hosted Zones, public Name Servers
- **Hybrid DNS:** resolve DNS queries ระหว่าง VPC (Route 53 Resolver) กับ networks อื่น (VPC Peering, On-premises via DX/VPN)

### Resolver Endpoints:

**Inbound Endpoint:**
- ให้ on-premises DNS Resolvers resolve ชื่อ AWS resources + Private Hosted Zones
- On-premises → DNS Query → Resolver Inbound Endpoint → Route 53 Resolver → Private Hosted Zone

**Outbound Endpoint:**
- Route 53 Resolver forwards DNS queries ไป on-premises DNS Resolvers
- EC2 → DNS Query → Route 53 Resolver → Resolver Outbound Endpoint → On-premises DNS

---

## Route 53 — DNS Query Logging & Resolver Query Logging

| | DNS Query Logging | Resolver Query Logging |
|---|-------------------|----------------------|
| ขอบเขต | Public Hosted Zones | VPC (Private Hosted Zones, Resolver Endpoints, DNS Firewall) |
| ส่ง logs ไป | CloudWatch Logs (export ไป S3) | CloudWatch Logs, S3, Kinesis Data Firehose |
| แชร์ข้ามบัญชี | — | ✅ ด้วย AWS RAM |

---

## Route 53 — Resolver DNS Firewall

- Managed firewall กรอง **outbound DNS requests** ผ่าน Route 53 Resolver
- Blacklist malicious domains หรือ Whitelist trusted domains
- ป้องกัน **DNS exfiltration** (compromised app ส่งข้อมูลออกผ่าน DNS)
- จัดการจาก AWS Firewall Manager
- ส่ง logs ไป CloudWatch Logs + Resolver Query Logs

---

## Route 53 — Application Recovery Controller

- Automate application recovery ข้าม AZs และ Regions
- **Readiness checks:** ตรวจ standby/replica infra พร้อมต่อเนื่อง
- **Routing controls + DNS integration:** ปิด/เปิด "traffic switches" เพื่อ reroute users
- **Zonal Shift / Region Switch:** เลื่อน traffic ออกจาก impaired AZ หรือ full Region failover

---

## Route 53 — Profiles & Cross-Account

- **Profiles:** จัดการ Route 53 configuration จากส่วนกลางข้ามหลาย VPCs/accounts (Private Hosted Zones, Resolver Rules, DNS Firewall, VPC Endpoints) แชร์ด้วย AWS RAM
- **Cross-Account Private Hosted Zone:** associate Private Hosted Zone กับ VPC ในบัญชีอื่นได้ (สร้าง VPC Association Authorization → สร้าง VPC Association)

---

# Amazon VPC

---

## VPC พื้นฐาน

- **VPC = Virtual Private Cloud**
- สูงสุด 5 VPC ต่อ Region (soft limit)
- สูงสุด 5 CIDR ต่อ VPC (min /28 = 16 IPs, max /16 = 65,536 IPs)
- เฉพาะ Private IPv4 ranges: 10.0.0.0/8, 172.16.0.0/12, 192.168.0.0/16
- VPC CIDR ห้ามซ้อนกับ networks อื่น (เช่น corporate)

### CIDR Quick Reference:
| CIDR | IPs | หมายเหตุ |
|------|-----|----------|
| /32 | 1 | IP เดียว |
| /24 | 256 | octet สุดท้ายเปลี่ยนได้ |
| /16 | 65,536 | 2 octets สุดท้ายเปลี่ยนได้ |
| /0 | ทั้งหมด | ทุก IPs |

### Subnet — AWS สงวน 5 IP (แรก 4 + สุดท้าย 1):
ตัวอย่าง CIDR 10.0.0.0/24:
- 10.0.0.0 (Network Address), 10.0.0.1 (VPC router), 10.0.0.2 (Amazon DNS), 10.0.0.3 (future use), 10.0.0.255 (Broadcast)
- ⚠️ ต้องการ 29 IPs → /27 (32-5=27) ไม่พอ → ต้องใช้ **/26** (64-5=59)

---

## VPC Troubleshooting

- **แก้ไข IPv4 CIDR ของ VPC ที่มีอยู่ไม่ได้** → ลบ+เพิ่ม CIDR ใหม่, เพิ่ม secondary CIDR, หรือสร้าง VPC ใหม่
- **แก้ไข IPv4 CIDR ของ Subnet ที่มีอยู่ไม่ได้** → สร้าง Subnet ใหม่ด้วย CIDR ที่ใหญ่กว่า

---

## Internet Gateway (IGW)

- ให้ resources ใน VPC เชื่อมต่อ Internet
- Scales horizontally, highly available, redundant
- สร้างแยกจาก VPC (1 VPC = 1 IGW)
- ต้องแก้ไข **Route Tables** ด้วย!

---

## NAT Gateway vs NAT Instance

| | NAT Gateway | NAT Instance |
|---|-------------|--------------|
| จัดการ | AWS-managed | คุณจัดการเอง |
| Availability | Highly available ใน AZ | ต้องตั้ง ASG + script |
| Bandwidth | สูงสุด 100 Gbps | ขึ้นกับ EC2 instance type |
| Security Groups | ไม่ต้อง | ต้องจัดการ |
| ค่าใช้จ่าย | ต่อชั่วโมง + data | ต่อชั่วโมง + instance type + network |
| Elastic IP | ✅ | ✅ |

- NAT Gateway สร้างในแต่ละ AZ (สร้างหลายตัวข้าม AZ สำหรับ fault-tolerance)
- NAT Instance ต้อง **ปิด Source/Destination Check**

---

## DNS Resolution ใน VPC

- **enableDnsSupport** (DNS Resolution): ให้ query Amazon DNS (169.254.169.253) — True ค่าเริ่มต้น
- **enableDnsHostnames** (DNS Hostnames): ให้ EC2 instance มี public hostname — True (default VPC), False (VPC ใหม่)
- **ทั้งสองต้องเป็น true** เพื่อใช้ custom DNS domain names ใน Private Hosted Zone

---

## Security Groups vs NACLs

| | Security Groups | NACLs |
|---|----------------|-------|
| ระดับ | Instance | Subnet |
| Rules | Allow เท่านั้น | Allow + Deny |
| Stateful/Stateless | **Stateful** (return traffic auto allow) | **Stateless** (ต้อง allow return traffic) |
| การประเมิน | ทุก rules ก่อนตัดสินใจ | ตามลำดับ (ต่ำสุดก่อน, match แรกชนะ) |

### Default NACL: accepts ทุกอย่าง inbound/outbound → **อย่าแก้ไข Default NACL** สร้าง custom แทน

### Ephemeral Ports:
- Client เชื่อมต่อ defined port → คาดหวัง response บน ephemeral port
- Windows: 49152-65535, Linux: 32768-60999

---

## VPC Peering

- เชื่อมต่อ 2 VPCs ผ่าน AWS network (private)
- ทำตัวเหมือนอยู่ใน network เดียวกัน
- CIDR ห้ามซ้อน
- **ไม่ transitive** (A↔B, B↔C ไม่หมายความว่า A↔C)
- ต้องอัพเดต route tables ทั้งสอง VPCs
- ข้ามบัญชี/Region ได้
- Reference security group ใน peered VPC ได้ (cross accounts, same region)

---

## VPC Endpoints (AWS PrivateLink)

- เชื่อมต่อ AWS services ผ่าน **private network** แทน public Internet
- Redundant, scale horizontally
- ไม่ต้องใช้ IGW, NATGW

### ประเภท:
| | Interface Endpoint | Gateway Endpoint |
|---|-------------------|-----------------|
| ขับเคลื่อนโดย | PrivateLink (ENI + Security Group) | Gateway ใน route table |
| Services | ส่วนใหญ่ AWS services | **S3 และ DynamoDB เท่านั้น** |
| ค่าใช้จ่าย | $/ชม. + $/GB | **ฟรี** |

> **Gateway Endpoint มักเป็นคำตอบในข้อสอบ** (ฟรี)
> Interface ใช้เมื่อเข้าจาก on-premises, VPC อื่น, Region อื่น

---

## VPC Flow Logs

- บันทึก IP traffic: VPC Flow Logs, Subnet Flow Logs, ENI Flow Logs
- ส่งไป S3, CloudWatch Logs, Kinesis Data Firehose
- บันทึก traffic จาก AWS managed interfaces ด้วย (ELB, RDS, ElastiCache ฯลฯ)

### Troubleshoot SG & NACL (ดู ACTION field):
| สถานการณ์ | หมายถึง |
|-----------|---------|
| Inbound REJECT | NACL หรือ SG |
| Inbound ACCEPT, Outbound REJECT | **NACL** |
| Outbound REJECT | NACL หรือ SG |
| Outbound ACCEPT, Inbound REJECT | **NACL** |

- Query ด้วย Athena (S3) หรือ CloudWatch Logs Insights

---

## VPC — การเชื่อมต่อ

### Site-to-Site VPN:
- **VGW** (Virtual Private Gateway): VPN concentrator ฝั่ง AWS
- **CGW** (Customer Gateway): device ฝั่ง customer
- ⚠️ เปิด **Route Propagation** ใน route table + เพิ่ม **ICMP protocol** ใน SG สำหรับ ping

### AWS VPN CloudHub:
- เชื่อมหลาย sites (multiple VPN connections บน same VGW)
- Hub-and-spoke model ผ่าน public Internet

### AWS Client VPN:
- เชื่อมจากคอมพิวเตอร์ด้วย OpenVPN ไป private VPC network + on-premises
- ผ่าน public Internet

### Direct Connect (DX):
- Dedicated **private** connection จาก remote network ไป VPC
- ต้อง setup ที่ AWS Direct Connect locations
- ใช้ VGW บน VPC
- เข้าถึง public resources (S3) และ private (EC2) บน connection เดียว

| Connection Type | Bandwidth |
|----------------|-----------|
| Dedicated | 1/10/100 Gbps |
| Hosted | 50 Mbps - 10 Gbps |

- Lead times: **>1 เดือน** สำหรับ connection ใหม่
- Data in transit ไม่ encrypted แต่ private → เพิ่ม VPN สำหรับ IPsec encryption
- **Direct Connect Gateway:** เชื่อม DX ไปหลาย VPCs ในหลาย Regions

### Transit Gateway:
- Transitive peering ระหว่าง **1000s VPCs** + on-premises (hub-and-spoke)
- Regional resource, ข้าม Region ได้ (peer Transit Gateways)
- Route Tables จำกัด VPC-to-VPC communication
- ทำงานกับ DX Gateway, VPN
- รองรับ **IP Multicast**
- **ECMP:** multiple Site-to-Site VPN connections เพิ่ม bandwidth (2.5 Gbps ต่อ VPN ผ่าน TGW)

---

## AWS PrivateLink (VPC Endpoint Services)

- ปลอดภัยและ scalable ที่สุดเพื่อ expose service ไปยัง 1000s VPCs
- ไม่ต้อง VPC peering, IGW, NAT, route tables
- ต้องมี **NLB** (Service VPC) + **ENI** (Customer VPC)
- ถ้า NLB หลาย AZ + ENIs หลาย AZ = **fault tolerant**

---

## VPC — Features เพิ่มเติม

| Feature | คำอธิบาย |
|---------|----------|
| **Reachability Analyzer** | Diagnostic tool ตรวจ connectivity ระหว่าง 2 endpoints (ไม่ส่ง packets จริง) |
| **Block Public Access (BPA)** | Block ingress/egress Internet access ของ VPCs/Subnets ส่วนกลาง |
| **Traffic Mirroring** | Capture + inspect network traffic (ส่งไป ENI/NLB) สำหรับ security appliances |
| **IPAM** | จัดการ IP address spaces จากส่วนกลาง, monitor, detect overlapping |
| **Managed Prefix List** | ชุด CIDRs สำหรับ Security Groups/Route Tables (customer-managed + AWS-managed) |

---

## IPv6 ใน VPC

- ทุก IPv6 เป็น **public** และ Internet-routable
- IPv4 ปิดไม่ได้ → ทำงานแบบ **dual-stack** (private IPv4 + public IPv6)
- **Egress-only Internet Gateway:** สำหรับ IPv6 เท่านั้น (คล้าย NAT Gateway แต่สำหรับ IPv6)
  - อนุญาต outbound connections, ป้องกัน inbound จาก Internet

---

## AWS Network Firewall

- ป้องกัน VPC ทั้งหมด **Layer 3 ถึง Layer 7**
- ทุกทิศทาง: VPC↔VPC, outbound/inbound Internet, DX/VPN
- ใช้ AWS Gateway Load Balancer ภายใน
- จัดการข้ามบัญชีด้วย Firewall Manager
- รองรับ 1000s rules: IP/port filtering, protocol blocking, domain list, regex matching
- Traffic filtering: Allow, drop, alert
- Active flow inspection (intrusion prevention)
- Logs ไป S3, CloudWatch Logs, Kinesis Data Firehose

---

# Other Services

---

## Amazon SQS — Standard Queue

- Fully managed message queue, decouple applications
- Unlimited throughput, unlimited messages
- Retention: ค่าเริ่มต้น 4 วัน, สูงสุด 14 วัน
- Low latency (<10 ms), max 256KB/message
- อาจมี duplicate messages (at least once), อาจไม่เรียงลำดับ (best effort)
- **Visibility Timeout:** หลัง poll, message มองไม่เห็นสำหรับ consumers อื่น (ค่าเริ่มต้น 30 วินาที)
- **Dead Letter Queue (DLQ):** messages ที่ process ไม่สำเร็จหลัง MaximumReceives
- **Access Policy:** Resource-based Policy (คล้าย S3 Bucket Policy)

---

## Amazon SNS

- Pub/Sub messaging: 1 message → หลาย receivers
- สูงสุด 12,500,000 subscriptions/topic, 100,000 topics
- Subscribers: SQS, Lambda, Kinesis Data Firehose, HTTP(S), SMS, Email
- **Filter Policy:** JSON object กำหนด messages ที่ subscriber รับ
- **Cross-Region Subscriber:** ส่ง notifications ไป SQS/Lambda ใน Region อื่นได้

---

## Amazon ECS

- Elastic Container Service: launch Docker containers บน AWS

### Launch Types:
- **EC2:** คุณ provision + maintain EC2 instances (ติดตั้ง ECS Agent)
- **Fargate:** Serverless, ไม่ต้องจัดการ infrastructure

### IAM Roles:
- **EC2 Instance Profile:** ใช้โดย ECS agent (API calls, logs, pull images, secrets)
- **ECS Task Role:** role เฉพาะแต่ละ task (กำหนดใน task definition)

### Features:
- Load Balancer: ALB (แนะนำ), NLB (high throughput/PrivateLink), CLB (ไม่แนะนำ)
- Data Volumes: Mount **EFS** (EC2 + Fargate, multi-AZ shared storage)
- **Service Auto Scaling:** CPU, Memory, ALB Request Count → Target Tracking / Step / Scheduled
- **EC2 Auto Scaling:** ASG Scaling หรือ ECS Cluster Capacity Provider
- **Rolling Updates:** ควบคุม min healthy %, max %
- **Ephemeral Storage (Fargate):** 20-200 GB, encrypted AES-256
- **Logs:** FireLens (Fluent Bit/Fluentd) sidecar container → CloudWatch/3rd party

---

## Amazon EKS

- Managed Kubernetes: auto deployment, scaling, management ของ containerized apps
- ทางเลือกแทน ECS (different API), cloud-agnostic
- 1 EKS cluster ต่อ Region, logs ด้วย CloudWatch Container Insights

### Node Types:
- **Managed Node Groups:** ASG managed by EKS, On-Demand/Spot
- **Self-Managed Nodes:** คุณสร้างเอง, prebuilt AMI
- **AWS Fargate:** ไม่ต้องจัดการ nodes

### Logging:
- **Control Plane Logging:** API Server, Audit, Authenticator, Controller Manager, Scheduler → CloudWatch Logs
- **Nodes & Containers Logging:** Fluent Bit/Fluentd → CloudWatch Logs, Container Insights

### AutoScaling:
- **Cluster AutoScaler:** ปรับจำนวน nodes (ใช้ ASG)
- **Karpenter:** launch right-sized compute resources <1 นาที
- **EKS Auto Mode:** AWS-managed Karpenter

### EKS สำหรับ CloudOps:
- **Cluster Insights:** Configuration Insights (misconfiguration) + Upgrade Insights (upgrade issues)
- Upgrade Cluster: Review insights → Update Control Plane → Update Components

---

## AWS X-Ray

- Visual analysis ของ applications
- Debugging distributed services
- Troubleshoot performance (bottlenecks), understand dependencies
- Review request behavior, find errors/exceptions
- ตรวจ SLA, throttling, users ที่ได้รับผลกระทบ

### ECS + X-Ray Integration:
- X-Ray Container as **Daemon** (EC2 launch type)
- X-Ray Container as **Side Car** (EC2 หรือ Fargate — แนะนำสำหรับ Fargate)

---

## Amazon Managed Grafana & Prometheus

### Managed Grafana:
- Fully managed Grafana: dashboards สำหรับ metrics, logs, traces
- สร้าง **Workspaces** สำหรับ dashboards
- ผสาน CloudWatch, Prometheus, X-Ray, OpenSearch + third-party

### Managed Prometheus:
- Serverless, Prometheus-compatible สำหรับ container metrics
- Auto scales ingestion/storage/query, replicated ข้าม 3 AZ
- **PromQL** query language
- ทำงานกับ EKS + self-managed Kubernetes
- Retention: สูงสุด 3 ปี (ค่าเริ่มต้น 150 วัน)

---

## AWS Resource Access Manager (RAM)

- แชร์ AWS resources ข้ามบัญชี (ภายใน Organization หรือบัญชีใดก็ได้)
- หลีกเลี่ยง resource duplication
- ทรัพยากรที่แชร์ได้: VPC Subnets, Transit Gateway, Route53 Resolver Rules, License Manager
- **VPC Subnets:** ทุก resources launch ใน subnets เดียวกัน, แต่ละบัญชีจัดการ resources ตัวเอง, ดู/แก้ไข/ลบ resources บัญชีอื่นไม่ได้

---

# เตรียมสอบ

---

## รูปแบบข้อสอบ SOA-C03

ข้อสอบมี **2 ส่วน:**

### ส่วนที่ 1: Multiple Choice / Multiple Response
- ทำให้เสร็จก่อน (**กลับมาแก้ไม่ได้** เมื่อเสร็จส่วนนี้แล้ว)

### ส่วนที่ 2: Exam Labs (3 labs)
- แต่ละ lab แนะนำใช้เวลา **20 นาที**
- ทำงานจริงใน AWS Console
- ต้องเสร็จ lab หนึ่งก่อนไป lab ถัดไป (กลับไม่ได้)

### ตัวอย่าง Lab:
บริษัทกำลัง deploy web application ใหม่ ให้ตั้งค่า MySQL 8.0 database แบบ HA:
1. สร้าง custom DB parameter group ตั้ง event_scheduler=true
2. สร้าง custom KMS key ใช้ตอนสร้าง DB instance
3. สร้าง VPC security group อนุญาต TCP port 3306 จาก CIDR 192.168.1.0/24
4. Launch RDS DB instance
5. ถ่าย manual RDS DB snapshot

---

## เส้นทาง AWS Certification

```
  Foundational (ไม่ต้องมีประสบการณ์)
       │
       ▼
  Associate (แนะนำประสบการณ์ cloud/on-premises)
  ├── Solutions Architect Associate
  ├── Developer Associate
  └── CloudOps Engineer Associate  ← คุณอยู่ที่นี่!
       │
       ▼
  Professional (แนะนำ 2 ปีประสบการณ์ AWS)
  ├── Solutions Architect Professional
  └── DevOps Engineer Professional
       │
       ▼
  Specialty (เฉพาะทาง)
  ├── Advanced Networking
  ├── Machine Learning
  ├── Security
  ├── Data Analytics
  └── SAP on AWS
```

---

# ยินดีด้วย! 🎉

- จบคอร์สแล้ว!
- ขอให้สอบผ่านอย่างราบรื่น!
- ขอให้คุณเป็น **AWS SysOps ที่เยี่ยมยอด**มากๆ

---

> **จบส่วนที่ 7 — จบเอกสารทั้งหมด**
