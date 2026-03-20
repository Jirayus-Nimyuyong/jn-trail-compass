# AWS CloudOps SOA-C03 — ส่วนที่ 2
## High Availability & Scalability / CloudFormation / Lambda

---

# High Availability & Scalability
## Load Balancer และ Auto Scaling Groups

---

## Scalability & High Availability

- **Scalability** หมายความว่าแอป/ระบบสามารถรองรับ load ที่มากขึ้นโดยการปรับตัว
- มี 2 ประเภท:
  - **Vertical Scalability** (เพิ่มขนาด)
  - **Horizontal Scalability** = elasticity (เพิ่มจำนวน)
- Scalability เชื่อมโยงแต่แตกต่างจาก High Availability

### Vertical Scalability
- เพิ่มขนาดของ instance เช่น t2.micro → t2.large
- ใช้กับระบบที่ไม่กระจาย เช่น database (RDS, ElastiCache)
- มีขีดจำกัด (hardware limit)

### Horizontal Scalability
- เพิ่มจำนวน instances/systems
- ใช้กับ web applications / modern applications
- ง่ายใน cloud ด้วย Amazon EC2

### High Availability
- รันแอปในอย่างน้อย 2 data centers (= Availability Zones)
- เป้าหมาย: อยู่รอดแม้ data center ล่ม
- Passive (เช่น RDS Multi AZ) หรือ Active (horizontal scaling)

---

## High Availability & Scalability สำหรับ EC2

| ประเภท | วิธีการ |
|--------|---------|
| Vertical Scaling | เพิ่มขนาด instance (scale up/down) เช่น t2.nano → u-12tb1.metal |
| Horizontal Scaling | เพิ่มจำนวน instances (scale out/in) ด้วย ASG + Load Balancer |
| High Availability | รัน instances ข้าม multi-AZ ด้วย ASG multi-AZ + Load Balancer multi-AZ |

---

## Load Balancing คืออะไร?

```
                    ┌──────────────┐
   Users ──────────→│ Elastic Load │──→ EC2 Instance
                    │  Balancer    │──→ EC2 Instance
                    │              │──→ EC2 Instance
                    └──────────────┘
```

Load Balancers คือ servers ที่ forward traffic ไปยัง servers หลายตัว (เช่น EC2 instances) ข้างหลัง

---

## ทำไมต้องใช้ Load Balancer?

- กระจาย load ไปยังหลาย downstream instances
- เปิดเผยจุดเข้าถึงเดียว (DNS) สำหรับแอป
- จัดการ failure ของ downstream instances ได้อย่างราบรื่น
- ตรวจสุขภาพ instances เป็นประจำ
- จัดเตรียม SSL termination (HTTPS) สำหรับเว็บไซต์
- บังคับ stickiness ด้วย cookies
- High availability ข้ามโซน
- แยก public traffic จาก private traffic

---

## ทำไมต้องใช้ Elastic Load Balancer?

- เป็น **managed** load balancer — AWS รับรองว่าทำงานได้
- AWS ดูแล upgrades, maintenance, high availability
- AWS ให้ configuration knobs ไม่กี่ตัว
- ตั้ง load balancer เองถูกกว่า แต่ต้องดูแลเองมากกว่ามาก
- ผสานกับ: EC2, EC2 ASG, ECS, ACM, CloudWatch, Route 53, WAF, Global Accelerator

---

## Health Checks

```
  Elastic Load Balancer ──Health Check──→ EC2 Instance
                          Protocol: HTTP
                          Port: 4567
                          Endpoint: /health
```

- สำคัญมากสำหรับ Load Balancers
- ถ้า response ไม่ใช่ 200 (OK) instance จะเป็น unhealthy

---

## ประเภท Load Balancer บน AWS

| Load Balancer | ปี | Protocol | Layer |
|--------------|-----|----------|-------|
| Classic (CLB) v1 | 2009 | HTTP, HTTPS, TCP, SSL | 4/7 |
| Application (ALB) v2 | 2016 | HTTP, HTTPS, WebSocket | 7 |
| Network (NLB) v2 | 2017 | TCP, TLS, UDP | 4 |
| Gateway (GWLB) | 2020 | IP Protocol | 3 |

- แนะนำให้ใช้รุ่นใหม่เพราะมี features มากกว่า
- บาง load balancers ตั้งเป็น internal (private) หรือ external (public) ได้

---

## Load Balancer Security Groups

```
  Users ──HTTPS/HTTP──→ LOAD BALANCER ──HTTP──→ EC2
          (from anywhere)  (Load Balancer SG)     (Application SG)
                                                   Allow traffic only
                                                   from Load Balancer
```

---

## Application Load Balancer (ALB) v2

- Layer 7 (HTTP)
- Load balancing ไปยังหลาย HTTP applications ข้าม machines (target groups)
- Load balancing ไปยังหลาย applications บนเครื่องเดียว (เช่น containers)
- รองรับ HTTP/2 และ WebSocket
- รองรับ redirects (เช่น HTTP → HTTPS)

### Routing:
- ตาม path ใน URL (example.com/users & example.com/posts)
- ตาม hostname ใน URL (one.example.com & other.example.com)
- ตาม Query String, Headers (example.com/users?id=123&order=false)

### Target Groups:
- EC2 instances (managed by ASG) — HTTP
- ECS tasks (managed by ECS) — HTTP
- Lambda functions — HTTP request แปลงเป็น JSON event
- IP Addresses — ต้องเป็น private IPs

### ข้อควรรู้:
- Fixed hostname (XXX.region.elb.amazonaws.com)
- Application servers ไม่เห็น IP ของ client โดยตรง
- True IP อยู่ใน header **X-Forwarded-For**
- Port ใน **X-Forwarded-Port**, protocol ใน **X-Forwarded-Proto**

---

## Network Load Balancer (NLB) v2

- Layer 4: forward TCP & UDP traffic
- รองรับหลายล้าน request ต่อวินาที
- Ultra-low latency
- **1 static IP ต่อ AZ**, รองรับ Elastic IP (เหมาะสำหรับ whitelist IP)
- ใช้สำหรับ extreme performance, TCP หรือ UDP traffic

### Target Groups:
- EC2 instances
- IP Addresses (ต้องเป็น private IPs)
- Application Load Balancer
- Health Checks รองรับ TCP, HTTP และ HTTPS Protocols

### Request Routing: Flow Hash Algorithm
- เลือก target ตาม protocol, source/destination IP, source/destination port, TCP sequence number
- แต่ละ TCP/UDP connection route ไป target เดียวตลอดอายุ connection

---

## Gateway Load Balancer (GWLB)

```
  Users (source) ──traffic──→ Gateway Load Balancer
                                    │
                               Route Table
                                    │
                                    ▼
                              Target Group
                    3rd Party Security Virtual Appliances
                                    │
                               traffic
                                    ▼
                          Application (destination)
```

- Deploy, scale, จัดการ fleet ของ 3rd party network virtual appliances
- ตัวอย่าง: Firewalls, Intrusion Detection/Prevention, Deep Packet Inspection, payload manipulation
- ทำงานที่ **Layer 3 (Network Layer) — IP Packets**
- รวมสองฟังก์ชัน:
  - **Transparent Network Gateway** — single entry/exit สำหรับ traffic ทั้งหมด
  - **Load Balancer** — กระจาย traffic ไปยัง virtual appliances
- ใช้ **GENEVE protocol บนพอร์ต 6081**

---

## Sticky Sessions (Session Affinity)

- สามารถทำ stickiness เพื่อให้ client เดียวกันถูก redirect ไป instance เดียวกันเสมอ
- ใช้ได้กับ CLB, ALB, NLB
- "cookie" สำหรับ stickiness มีวันหมดอายุที่คุณควบคุม
- กรณีใช้งาน: ไม่ให้ user สูญเสีย session data
- ⚠️ การเปิด stickiness อาจทำให้ load ไม่สมดุล

### Cookie Names:
| ประเภท | สร้างโดย | ชื่อ Cookie |
|--------|----------|------------|
| Custom cookie | Target (application) | กำหนดเอง (ห้ามใช้ AWSALB, AWSALBAPP, AWSALBTG) |
| Application cookie | Load balancer | AWSALBAPP |
| Duration-based (ALB) | Load balancer | AWSALB |
| Duration-based (CLB) | Load balancer | AWSELB |

---

## Cross-Zone Load Balancing

**เปิด Cross-Zone:** แต่ละ LB instance กระจาย traffic เท่าเทียมไปทุก Instance ทุก AZ

**ปิด Cross-Zone:** Requests กระจายเฉพาะ instances ใน AZ ของ LB node นั้น

| Load Balancer | ค่าเริ่มต้น | ค่า inter AZ data |
|---------------|-------------|-------------------|
| ALB | เปิด (ปิดได้ที่ Target Group) | ไม่เสียค่า |
| NLB & GWLB | ปิด | เสียค่า ($) ถ้าเปิด |
| CLB | ปิด | ไม่เสียค่า ถ้าเปิด |

---

## SSL/TLS

- SSL Certificate อนุญาตให้ traffic ระหว่าง clients กับ load balancer ถูก encrypted (in-flight encryption)
- SSL = Secure Sockets Layer, TLS = Transport Layer Security (ใหม่กว่า)
- Public SSL certificates ออกโดย Certificate Authorities (CA): Comodo, Symantec, GoDaddy, Letsencrypt ฯลฯ
- SSL certificates มีวันหมดอายุและต้อง renew

### SNI (Server Name Indication):
- โหลดหลาย SSL certificates บน web server เดียว
- Client ระบุ hostname ใน initial SSL handshake
- Server หา certificate ที่ถูกต้อง
- **ใช้ได้กับ ALB, NLB, CloudFront เท่านั้น** (ไม่ได้กับ CLB)

| Load Balancer | SSL Certificates |
|---------------|-----------------|
| CLB | 1 SSL certificate เท่านั้น |
| ALB | หลาย listeners + หลาย SSL certificates (SNI) |
| NLB | หลาย listeners + หลาย SSL certificates (SNI) |

---

## Connection Draining / Deregistration Delay

- **CLB:** Connection Draining / **ALB & NLB:** Deregistration Delay
- เวลาให้ "in-flight requests" เสร็จสมบูรณ์ขณะ instance de-registering หรือ unhealthy
- หยุดส่ง request ใหม่ไปยัง EC2 instance ที่กำลัง de-register
- ค่า: 1 ถึง 3600 วินาที (ค่าเริ่มต้น: 300 วินาที)
- ปิดได้ (ตั้งค่า = 0)
- ตั้งค่าต่ำถ้า requests ของคุณสั้น

---

## ELB Health Checks

**Target Health Status:**
- Initial: กำลังลงทะเบียน target
- Healthy
- Unhealthy
- Unused: target ไม่ได้ลงทะเบียน
- Draining: กำลัง de-register target
- Unavailable: health checks ปิด

| Setting | ค่า | คำอธิบาย |
|---------|------|----------|
| HealthCheckProtocol | HTTP | Protocol สำหรับ health checks |
| HealthCheckPort | 80 | Port สำหรับ health checks |
| HealthCheckPath | / | Destination สำหรับ health checks |
| HealthCheckTimeoutSeconds | 5 | ถือว่า fail ถ้าไม่ตอบใน 5 วินาที |
| HealthCheckIntervalSeconds | 30 | ส่ง health check ทุก 30 วินาที |
| HealthyThresholdCount | 3 | ถือว่า healthy หลัง 3 ครั้งสำเร็จ |
| UnhealthyThresholdCount | 5 | ถือว่า unhealthy หลัง 5 ครั้งล้มเหลว |

> ⚠️ ถ้า target group มีเฉพาะ unhealthy targets, ELB จะ route requests ไปยัง unhealthy targets ทั้งหมด

---

## Load Balancer Error Codes

| Code | ความหมาย |
|------|----------|
| 200 | สำเร็จ |
| 400 | Bad Request |
| 401 | Unauthorized |
| 403 | Forbidden |
| 460 | Client ปิด connection |
| 463 | X-Forwarded For header มี >30 IP |
| 500 | Internal Server Error (ปัญหาที่ ELB เอง) |
| 502 | Bad Gateway |
| 503 | Service Unavailable |
| 504 | Gateway Timeout (ปัญหาที่ server) |
| 561 | Unauthorized |

---

## Load Balancers Monitoring — CloudWatch Metrics

- BackendConnectionErrors
- HealthyHostCount / UnHealthyHostCount
- HTTPCode_Backend_2XX (สำเร็จ), 3XX (redirect)
- HTTPCode_ELB_4XX (client error), 5XX (server error จาก LB)
- Latency
- RequestCount / RequestCountPerTarget
- **SurgeQueueLength:** จำนวน requests ที่รอ routing ไป healthy instance (สูงสุด 1024) — ช่วย scale out ASG
- **SpilloverCount:** จำนวน requests ที่ถูกปฏิเสธเพราะ surge queue เต็ม

---

## Load Balancer Troubleshooting

- HTTP 400 BAD_REQUEST: client ส่ง malformed request
- HTTP 503 Service Unavailable: ตรวจให้มี healthy instances ในทุก AZ — ดู HealthyHostCount ใน CloudWatch
- HTTP 504 Gateway Timeout: ตรวจ keep-alive settings บน EC2 instances ให้เปิด และ keep-alive timeout ต้องมากกว่า idle timeout ของ load balancer

---

## Load Balancers Access Logs

Access logs สามารถเก็บใน S3 ประกอบด้วย:
- Time, Client IP address, Latencies, Request paths, Server response, Trace Id
- จ่ายเฉพาะ S3 storage
- มีประโยชน์สำหรับ compliance
- มีประโยชน์สำหรับเก็บ access data แม้ ELB หรือ EC2 instances ถูก terminate
- Access Logs ถูก encrypted อยู่แล้ว

---

## ALB Request Tracing

- ทุก HTTP request มี custom header **'X-Amzn-Trace-Id'**
- ตัวอย่าง: X-Amzn-Trace-Id: Root=1-67891233-abcdef012345678912345678
- มีประโยชน์ใน logs / distributed tracing platform เพื่อติดตาม single request
- ALB ยังไม่ผสานกับ X-Ray

---

## Target Group Settings

| Setting | คำอธิบาย |
|---------|----------|
| deregistration_delay.timeout_seconds | เวลาที่ LB รอก่อน deregister target |
| slow_start.duration_seconds | เวลาให้ target warm up |
| load_balancing.algorithm.type | Round Robin หรือ Least Outstanding Requests |
| stickiness.enabled | เปิด/ปิด stickiness |
| stickiness.type | application-based หรือ duration-based cookie |

---

## Slow Start Mode

- ค่าเริ่มต้น: target ได้รับ full share ของ requests ทันทีที่ลงทะเบียน
- Slow Start Mode: ให้เวลา target warm up ก่อนส่ง full share
- LB เพิ่มจำนวน requests แบบ linear
- Target ออกจาก Slow Start เมื่อ: duration หมด หรือ target unhealthy
- ปิดโดยตั้ง Slow start duration = 0

---

## Request Routing Algorithms

| Algorithm | คำอธิบาย | ใช้กับ |
|-----------|----------|--------|
| Least Outstanding Requests | ส่งไป instance ที่มี pending requests น้อยสุด | ALB, CLB (HTTP/HTTPS) |
| Round Robin | เลือก targets เท่าเทียม | ALB, CLB (TCP) |
| Flow Hash | เลือกตาม protocol, src/dest IP, src/dest port, TCP seq no. | NLB |

---

## ALB Listener Rules

- ประมวลผลตามลำดับ (มี Default Rule)
- Supported Actions: forward, redirect, fixed-response
- Rule Conditions: host-header, http-request-method, path-pattern, source-ip, http-header, query-string

---

## Target Group Weighting

- กำหนด weight สำหรับแต่ละ Target Group บน Rule เดียว
- ตัวอย่าง: multiple versions ของ app, blue/green deployment

```
  Users ──→ ALB ──80%──→ Target Group 1 (Blue)
                 ──20%──→ Target Group 2 (Green)
```

---

## Auto Scaling Group (ASG) คืออะไร?

- Scale out (เพิ่ม EC2 instances) เมื่อ load เพิ่ม
- Scale in (ลด EC2 instances) เมื่อ load ลด
- รักษาจำนวน EC2 minimum และ maximum ที่ทำงาน
- ลงทะเบียน instances ใหม่กับ load balancer อัตโนมัติ
- สร้าง EC2 instance ใหม่ถ้าตัวก่อนถูก terminate (เช่น unhealthy)
- ASG ฟรี (จ่ายเฉพาะ EC2 instances ที่ใช้)

```
  ├── Minimum Capacity ──────────┤
  ├── Desired Capacity ──────────────────┤
  ├── Maximum Capacity ──────────────────────────────┤
       Scale Out as Needed ──────────→
```

---

## ASG Attributes

**Launch Template** ประกอบด้วย:
- AMI + Instance Type
- EC2 User Data
- EBS Volumes
- Security Groups
- SSH Key Pair
- IAM Roles สำหรับ EC2 Instances
- Network + Subnets Information
- Load Balancer Information
- Min Size / Max Size / Initial Capacity
- Scaling Policies

---

## ASG — Scaling Policies

### Dynamic Scaling:
- **Target Tracking:** ตั้งเป้า เช่น CPU เฉลี่ย 40%
- **Simple / Step Scaling:** เมื่อ CloudWatch alarm trigger → เพิ่ม/ลด units
- **Scheduled Scaling:** ตั้งเวลาล่วงหน้า เช่น เพิ่ม min capacity วันศุกร์ 17:00

### Predictive Scaling:
- คาดการณ์ load ต่อเนื่อง แล้วตั้งเวลา scaling ล่วงหน้า

### Good Metrics to Scale On:
- CPUUtilization
- RequestCountPerTarget
- Average Network In/Out
- Any custom metric (CloudWatch)

---

## ASG — Scaling Cooldowns

- หลัง scaling activity จะอยู่ใน **cooldown period** (ค่าเริ่มต้น 300 วินาที)
- ระหว่าง cooldown ASG จะไม่ launch หรือ terminate instances เพิ่ม (เพื่อให้ metrics เสถียร)
- คำแนะนำ: ใช้ ready-to-use AMI เพื่อลดเวลา configuration → ให้บริการ request เร็วขึ้น → ลด cooldown period

---

## ASG — Instance Refresh

- เป้าหมาย: อัพเดต launch template แล้วสร้าง EC2 instances ใหม่ทั้งหมด
- ใช้ native feature **Instance Refresh**
- ตั้ง **minimum healthy percentage**
- กำหนด **warm-up time** (นานแค่ไหนก่อน instance พร้อมใช้)

---

## ASG — Warm Pools

```
  Auto Scaling Group
  Max. Capacity = 6
  Desired Capacity = 3
  
  ┌─────────────────┐    ┌─────────────────┐
  │  EC2 Instances   │    │   Warm Pools    │
  │  (Active)        │←──│  (Size = 3)     │
  │                  │    │  Pre-initialized │
  │  ■ ■ ■          │    │  ■ ■ ■          │
  └─────────────────┘    └─────────────────┘
                          scale-out →
```

- ลด latency ในการ scale out ด้วย pool ของ pre-initialized instances
- เมื่อ scale out ASG ใช้ pre-initialized instances จาก Warm Pool แทน launch ใหม่
- Warm Pool Instance State: **Running, Stopped, Hibernated**
- Warm Pools instances **ไม่นับ** ใน ASG metrics ที่ส่งผลต่อ Scaling Policies

---

## ASG — Lifecycle Hooks

```
  Scale Out:
  Pending → Pending:Wait (Lifecycle Hook) → Pending:Proceed → InService
  
  Scale In:
  Terminating → Terminating:Wait (Lifecycle Hook) → Terminating:Proceed → Terminated
  
  Lifecycle event → trigger → EventBridge / SNS / SQS → invoke → Lambda
```

- ทำงานเพิ่มก่อน instance เข้า service (Pending state) — รัน script
- ทำงานก่อน instance ถูก terminate (Terminating state) — troubleshoot
- กรณีใช้งาน: cleanup, log extraction, special health checks

---

## Launch Configuration vs. Launch Template

| | Launch Configuration (legacy) | Launch Template (ใหม่กว่า) |
|---|------|------|
| แก้ไข | ต้องสร้างใหม่ทุกครั้ง | หลาย versions ได้ |
| Parameters subsets | ไม่ได้ | ได้ (partial config, inheritance) |
| On-Demand + Spot mix | ไม่ได้ | ได้ |
| Placement Groups, Capacity Reservations | ไม่ได้ | ได้ |
| T2 unlimited | ไม่ได้ | ได้ |

> **AWS แนะนำ Launch Template**

---

## ASG Health Checks

- ต้องมีอย่างน้อย 2 instances ข้าม 2 AZ (multi-AZ ASG)
- Health checks ที่ใช้ได้:
  - EC2 Status Checks
  - ELB Health Checks
  - Custom Health Checks (ส่ง health ด้วย AWS CLI/SDK)
- ASG จะ launch instance ใหม่หลัง terminate unhealthy instance
- **ASG จะไม่ reboot unhealthy hosts**
- CLI: `set-instance-health` (ใช้กับ Custom Health Checks), `terminate-instance-in-auto-scaling-group`

---

## Troubleshooting ASG

- "instance(s) are already running. Launching EC2 instance failed."
  → ASG ถึง MaximumCapacity แล้ว → อัพเดตค่า maximum capacity
- Launching EC2 instances ล้มเหลว:
  - Security group ไม่มีอยู่ (อาจถูกลบ)
  - Key pair ไม่มีอยู่ (อาจถูกลบ)
- ถ้า ASG launch instance ไม่สำเร็จเกิน 24 ชั่วโมง จะ **suspend processes อัตโนมัติ** (administration suspension)

---

## CloudWatch Metrics สำหรับ ASG

- เก็บทุก 1 นาที
- **ASG-level metrics (opt-in):** GroupMinSize, GroupMaxSize, GroupDesiredCapacity, GroupInServiceInstances, GroupPendingInstances, GroupStandbyInstances, GroupTerminatingInstances, GroupTotalInstances
- ต้อง **enable metric collection** เพื่อเห็น metrics เหล่านี้
- **EC2-level metrics (enabled):** CPU Utilization ฯลฯ
  - Basic monitoring: 5 นาที
  - Detailed monitoring: 1 นาที

---

## AWS Auto Scaling

Backbone service สำหรับ scalable resources ใน AWS:
- Amazon EC2 ASG: Launch/terminate EC2 instances
- Amazon EC2 Spot Fleet requests
- Amazon ECS: ปรับ ECS service desired count
- Amazon DynamoDB: WCU & RCU
- Amazon Aurora: Dynamic Read Replicas Auto Scaling

### Scaling Plans:
- **Dynamic scaling:** target tracking policy
  - Optimize for availability → 40%
  - Balance → 50%
  - Optimize for cost → 70%
  - Custom → เลือกเอง
- **Predictive scaling:** คาดการณ์ load แล้วตั้งเวลาล่วงหน้า

---

# AWS CloudFormation
## จัดการ Infrastructure เป็น Code

---

## AWS CloudFormation

- ประกาศ AWS Infrastructure แบบ **declarative** สำหรับทรัพยากรทั้งหมด (ส่วนใหญ่รองรับ)
- ตัวอย่าง: ใน CloudFormation template คุณบอกว่า:
  - ต้องการ security group
  - ต้องการ EC2 instances 2 ตัวที่ใช้ security group นี้
  - ต้องการ Elastic IPs 2 ตัวสำหรับ instances
  - ต้องการ S3 bucket
  - ต้องการ load balancer (ELB) หน้า instances
- CloudFormation สร้างให้ **ตามลำดับที่ถูกต้อง** ด้วย configuration ที่คุณกำหนด

---

## ประโยชน์ของ CloudFormation

**Infrastructure as code:**
- ไม่ต้องสร้างทรัพยากรด้วยมือ → ควบคุมได้ดี
- Code version controlled ด้วย Git
- การเปลี่ยนแปลง infrastructure review ผ่าน code

**ค่าใช้จ่าย:**
- ทุกทรัพยากรใน stack ถูก tagged → เห็นค่าใช้จ่ายต่อ stack
- ประมาณค่าใช้จ่ายจาก template ได้
- กลยุทธ์ประหยัด: ลบ templates ตอน 17:00 สร้างใหม่ตอน 08:00

**ผลิตภาพ:**
- ลบและสร้าง infrastructure ใหม่ได้ทันที
- สร้าง Diagram อัตโนมัติจาก templates
- Declarative programming (ไม่ต้องคิดเรื่องลำดับ)
- แยกส่วน: VPC stacks, Network stacks, App stacks

---

## CloudFormation ทำงานอย่างไร

```
  Template ──upload──→ S3 bucket ──reference──→ AWS CloudFormation
                                                       │
                                                  create Stack
                                                       │
                                                       ▼
                                                Create AWS Resources
```

- Templates ต้อง upload ไป S3 แล้ว reference ใน CloudFormation
- อัพเดต template: ต้อง upload version ใหม่ (แก้ไขตัวเก่าไม่ได้)
- Stacks ระบุด้วยชื่อ
- ลบ stack → ลบทุก artifact ที่ CloudFormation สร้าง

---

## ส่วนประกอบของ Template

| ส่วน | คำอธิบาย |
|------|----------|
| AWSTemplateFormatVersion | ระบุ capabilities "2010-09-09" |
| Description | คำอธิบาย template |
| **Resources (บังคับ)** | AWS resources ที่ประกาศใน template |
| Parameters | dynamic inputs |
| Mappings | static variables |
| Outputs | references ไปสิ่งที่สร้างแล้ว |
| Conditionals | เงื่อนไขในการสร้างทรัพยากร |

---

## CloudFormation — Parameters

- วิธีให้ inputs กับ template
- สำคัญเมื่อ: ต้องใช้ template ซ้ำข้ามบริษัท, inputs คาดเดาล่วงหน้าไม่ได้
- ถ้า configuration อาจเปลี่ยนในอนาคต → ทำเป็น parameter

### Parameter Settings:
- Type: String, Number, CommaDelimitedList, List Number, AWS-Specific, SSM Parameter
- Description, ConstraintDescription
- Min/MaxLength, Min/MaxValue
- Default, AllowedValues (array), AllowedPattern (regex)
- NoEcho (Boolean)

### Reference: `!Ref ParameterName`

---

## CloudFormation — Pseudo Parameters

| Reference | ตัวอย่างค่าที่ return |
|-----------|----------------------|
| AWS::AccountId | 123456789012 |
| AWS::Region | us-east-1 |
| AWS::StackId | arn:aws:cloudformation:... |
| AWS::StackName | MyStack |
| AWS::NotificationARNs | [arn:aws:sns:...] |
| AWS::NoValue | ไม่ return ค่า |

---

## CloudFormation — Mappings

- ตัวแปรคงที่ภายใน template
- เหมาะสำหรับแยก environments (dev/prod), regions, AMI types
- ค่าทั้งหมด hardcode ใน template
- ใช้ `!FindInMap [MapName, TopLevelKey, SecondLevelKey]` เพื่อดึงค่า

### เมื่อไหร่ใช้ Mappings vs Parameters?
- **Mappings:** รู้ค่าทั้งหมดล่วงหน้า (Region, AZ, Account, Environment) → ควบคุมได้ดีกว่า
- **Parameters:** ค่าเฉพาะ user จริงๆ

---

## CloudFormation — Outputs

- ประกาศ output values ที่สามารถ import เข้า stacks อื่นได้
- ดูใน AWS Console หรือ CLI
- เหมาะสำหรับ collaboration ข้าม stack
- ใช้ `Fn::ImportValue` เพื่อ import ค่าจาก stack อื่น
- **ลบ underlying stack ไม่ได้จนกว่าทุก references จะถูกลบ**

---

## CloudFormation — Conditions

- ควบคุมการสร้างทรัพยากรตามเงื่อนไข
- เงื่อนไขทั่วไป: Environment (dev/test/prod), AWS Region, ค่า parameter

### Intrinsic Functions สำหรับ Conditions:
- Fn::And, Fn::Equals, Fn::If, Fn::Not, Fn::Or

---

## CloudFormation — Intrinsic Functions (ต้องรู้)

| Function | คำอธิบาย |
|----------|----------|
| **!Ref** | อ้างอิง parameter (return ค่า) หรือ resource (return physical ID) |
| **!GetAtt** | ดึง attribute ของ resource |
| **!FindInMap** | หาค่าจาก mapping |
| **!ImportValue** | import ค่าจาก stack อื่น |
| **!Join** | รวม strings |
| **!Sub** | แทนที่ตัวแปรใน string |
| **!Base64** | แปลงเป็น Base64 |
| **Condition Functions** | !If, !Not, !Equals ฯลฯ |

---

## CloudFormation — Rollbacks

| สถานการณ์ | ค่าเริ่มต้น | ตัวเลือก |
|-----------|-------------|----------|
| สร้าง Stack ล้มเหลว | rollback ทั้งหมด (ลบ) ดู log ได้ | ปิด rollback เพื่อ troubleshoot |
| อัพเดต Stack ล้มเหลว | rollback ไปสถานะก่อนหน้าอัตโนมัติ | ดู log และ error messages |
| Rollback ล้มเหลว | — | แก้ไขทรัพยากรด้วยมือ → ContinueUpdateRollback API |

### Stack Creation Failure Options:
- OnFailure=ROLLBACK (ค่าเริ่มต้น)
- OnFailure=DO_NOTHING
- OnFailure=DELETE

---

## CloudFormation — Service Role

```
  User ──→ CloudFormation ──→ Stack ──→ S3 bucket
  Permissions:               Service Role:
  - cloudformation:*         - s3:*Bucket
  - iam:PassRole
```

- IAM role ที่อนุญาต CloudFormation สร้าง/อัพเดต/ลบ stack resources แทนคุณ
- ให้ users สร้าง/อัพเดต/ลบ stack resources แม้ไม่มีสิทธิ์ตรงกับทรัพยากร
- กรณีใช้งาน: least privilege principle
- User ต้องมี **iam:PassRole** permissions

---

## CloudFormation — Capabilities

| Capability | เมื่อไหร่ต้องใช้ |
|-----------|-----------------|
| CAPABILITY_IAM / CAPABILITY_NAMED_IAM | template สร้าง/อัพเดต IAM resources |
| CAPABILITY_AUTO_EXPAND | template มี Macros หรือ Nested Stacks |

- **InsufficientCapabilitiesException:** เกิดเมื่อไม่ได้ acknowledge capabilities

---

## CloudFormation — DeletionPolicy

| Policy | คำอธิบาย |
|--------|----------|
| **Delete** (ค่าเริ่มต้น) | ลบทรัพยากร ⚠️ S3 bucket ที่ไม่ว่างลบไม่ได้ |
| **Retain** | เก็บทรัพยากรไว้ ใช้กับทุกทรัพยากร |
| **Snapshot** | สร้าง snapshot ก่อนลบ (EBS, ElastiCache, RDS, Redshift, Neptune, DocumentDB) |

---

## CloudFormation — UpdateReplacePolicy

- ควบคุมสิ่งที่เกิดขึ้นเมื่ออัพเดต property ที่มี update behavior เป็น Replacement

| Policy | คำอธิบาย |
|--------|----------|
| Delete (ค่าเริ่มต้น) | ลบ resource เก่า สร้างใหม่ |
| Retain | เก็บ resource เก่าไว้ (ออกจาก scope ของ CloudFormation) |
| Snapshot | สร้าง snapshot ก่อนลบ |

### UpdateReplacePolicy vs DeletionPolicy:
- **UpdateReplacePolicy:** ใช้เมื่อ resource ถูก replace ระหว่าง stack update
- **DeletionPolicy:** ใช้เมื่อ stack ถูกลบ หรือ resource definition ถูกลบจาก template

---

## CloudFormation — Stack Policies

- ค่าเริ่มต้น: อนุญาตทุก update actions บนทุก resources
- Stack Policy เป็น JSON document กำหนด update actions ที่อนุญาตบน resources เฉพาะ
- ป้องกันทรัพยากรจาก unintentional updates
- เมื่อตั้ง Stack Policy **ทุก resources ถูก protect ค่าเริ่มต้น**
- ต้องระบุ explicit ALLOW สำหรับ resources ที่ต้องการอนุญาตให้อัพเดต

---

## CloudFormation — Custom Resources

- ใช้สำหรับ:
  - ทรัพยากรที่ CloudFormation ยังไม่รองรับ
  - Custom provisioning logic (on-premises, 3rd party)
  - รัน Lambda functions ระหว่าง create/update/delete (เช่น ล้าง S3 bucket ก่อนลบ)
- กำหนดใน template: `AWS::CloudFormation::CustomResource` หรือ `Custom::MyCustomResourceTypeName`
- Backed by **Lambda function** (ส่วนใหญ่) หรือ SNS topic

---

## CloudFormation — Dynamic References

```
  CloudFormation ──get value──→ SSM Parameter Store
  (create/update)              Secrets Manager
  
  Format: `{{resolve:service-name:reference-key}}
```
| Type | Format |
|------|--------|
| ssm | `\{\{resolve:ssm:parameter-name:version\}\}` |
| ssm-secure | `\{\{resolve:ssm-secure:parameter-name:version\}\}` |
| secretsmanager | `\{\{resolve:secretsmanager:secret-id:secret-string:json-key:version-stage:version-id\}\}` |

---

## CloudFormation — Nested Stacks

- Stacks เป็นส่วนหนึ่งของ stacks อื่น
- แยก repeated patterns / common components ใน stacks แยก แล้วเรียกจาก stacks อื่น
- ตัวอย่าง: Load Balancer config ที่ใช้ซ้ำ, Security Group ที่ใช้ซ้ำ
- **Best practice:** ใช้ Nested stacks
- อัพเดต nested stack ต้องอัพเดตที่ parent (root stack) เสมอ

### Cross Stacks vs Nested Stacks:
- **Cross Stacks:** lifecycles ต่างกัน, ใช้ Outputs Export + Fn::ImportValue, แชร์ค่าไปหลาย stacks
- **Nested Stacks:** components ต้อง re-use, สำคัญเฉพาะกับ higher-level stack

---

## CloudFormation — StackSets

- สร้าง/อัพเดต/ลบ stacks ข้าม **หลายบัญชีและ regions** ด้วย operation/template เดียว
- Administrator account สร้าง StackSets
- Target accounts สร้าง/อัพเดต/ลบ stack instances
- อัพเดต stack set → อัพเดตทุก associated stack instances ทุกบัญชีทุก Region
- ใช้กับ AWS Organizations ได้

### Permission Models:
| Model | คำอธิบาย |
|-------|----------|
| Self-managed | สร้าง IAM roles เอง (trust relationship) ทั้ง admin และ target accounts |
| Service-managed | deploy ไปบัญชีใน AWS Organizations, สร้าง IAM roles อัตโนมัติ, Automatic Deployments |

---

## CloudFormation — Drift Detection

- CloudFormation ไม่ป้องกัน manual configuration changes
- ใช้ **CloudFormation Drift** เพื่อตรวจจับ
- ตรวจ drift ได้ทั้ง stack และทรัพยากรแต่ละตัว
- **StackSet Drift Detection:** ตรวจจับ drift ข้ามทุก stack instances ใน StackSet
- ถ้าสถานะปัจจุบันต่างจาก expected state → drifted

---

## CloudFormation — Troubleshooting

- **DELETE_FAILED:**
  - S3 buckets ต้องว่างก่อนลบ → ใช้ Custom Resources + Lambda
  - Security Groups ลบไม่ได้จนกว่า EC2 instances ทั้งหมดจะหายไป
  - ใช้ DeletionPolicy=Retain เพื่อข้ามการลบ
- **UPDATE_ROLLBACK_FAILED:**
  - ทรัพยากรเปลี่ยนนอก CloudFormation, สิทธิ์ไม่พอ, ASG ไม่ได้รับ signals
  - แก้ไข error ด้วยมือ → ContinueUpdateRollback
- Template ทำงานใน Region หนึ่งแต่ไม่ทำงานใน Region อื่น:
  - ตรวจ service availability ใน Region
  - ตรวจ AMI IDs (AMIs เป็น regional)
  - ตรวจ hardcoded region-specific values (เช่น ARNs)

---

## CloudFormation — cfn-init&cfn-signal

### cfn-init:
- ดึงและตีความ resource metadata, ติดตั้ง packages, สร้าง files, เริ่ม services
- ทำให้ EC2 configuration ซับซ้อนอ่านง่าย
- Logs: /var/log/cfn-init.log

### cfn-signal:
- บอก CloudFormation ว่า resource สร้างสำเร็จ/ล้มเหลว
- รันหลัง cfn-init
- ใช้กับ **WaitCondition** เพื่อ block template จนได้รับ signal
- **CreationPolicy** กำหนด Count (จำนวน signals ที่ต้องการ)

### Troubleshooting ถ้าไม่ได้รับ signals:
- AMI มี helper scripts หรือไม่
- cfn-init & cfn-signal รันสำเร็จหรือไม่ (ดู logs)
- ปิด rollback on failure เพื่อ debug
- Instance มี Internet connection หรือไม่

---

# AWS Lambda
## โลก Serverless

---

## ทำไมต้อง AWS Lambda

| Amazon EC2 | AWS Lambda |
|-----------|-----------|
| Virtual Servers ใน Cloud | Virtual functions — ไม่ต้องจัดการ server! |
| จำกัด RAM และ CPU | จำกัดเวลา — short executions |
| ทำงานตลอดเวลา | Run on-demand |
| Scaling ต้องแทรกแซง | Scaling อัตโนมัติ! |

---

## ประโยชน์ของ Lambda

- **Pricing ง่าย:** จ่ายต่อ request + compute time
- Free tier: 1,000,000 requests + 400,000 GB-seconds ของ compute time
- ผสานกับ AWS suite ทั้งหมด
- ผสานกับหลายภาษา
- Monitoring ง่ายผ่าน CloudWatch
- ทรัพยากรถึง 10GB of RAM (เพิ่ม RAM = เพิ่ม CPU + network!)

---

## Lambda ภาษาที่รองรับ

Node.js (JavaScript), Python, Java, C# (.NET Core) / Powershell, Ruby, Custom Runtime API (เช่น Rust, Golang), Lambda Container Image (ต้อง implement Lambda Runtime API — แนะนำ ECS/Fargate สำหรับ arbitrary Docker images)

---

## Lambda Integrations หลัก

API Gateway, Kinesis, DynamoDB, S3, CloudFront, CloudWatch Events / EventBridge, SNS, SQS, Cognito, CloudWatch Logs

---

## ตัวอย่าง: Serverless Thumbnail Creation

```
  New image in S3 ──trigger──→ AWS Lambda Function
                                (Creates Thumbnail)
                                    │
                            ┌───────┴───────┐
                            ▼               ▼
                    New thumbnail     DynamoDB
                    in S3            (Image name, size,
                                     creation date ฯลฯ)
```

---

## ตัวอย่าง: Serverless CRON Job

```
  CloudWatch Events / EventBridge ──Trigger──→ AWS Lambda Function
  (ทุก 1 ชั่วโมง)                              (Perform a task)
```

---

## Lambda Pricing

- **จ่ายต่อ calls:** 1,000,000 requests แรกฟรี → $0.20 ต่อ 1 ล้าน request
- **จ่ายต่อ duration:** (ทีละ 1 ms)
  - 400,000 GB-seconds/เดือน ฟรี
  - = 400,000 วินาที ถ้า function 1GB RAM
  - = 3,200,000 วินาที ถ้า function 128 MB RAM
  - หลังจากนั้น $1.00 ต่อ 600,000 GB-seconds
- **ปกติถูกมากที่จะรัน Lambda!**

---

## S3 Events Notifications กับ Lambda

- S3:ObjectCreated, S3:ObjectRemoved, S3:ObjectRestore, S3:Replication...
- กรอง Object name ได้ (*.jpg)
- กรณีใช้งาน: สร้าง thumbnails ของรูปที่ upload ไป S3
- S3 event notifications ปกติส่งภายในวินาที แต่บางครั้งนานกว่า 1 นาที
- ถ้าเขียน 2 ครั้งพร้อมกันไป single non-versioned object อาจได้ event notification แค่ 1 ครั้ง
- เปิด **versioning** เพื่อให้แน่ใจว่าทุก write ได้ event notification

---

> **จบส่วนที่ 2** — ต่อส่วนที่ 3: EC2 Storage, S3, S3 Advanced, S3 Security 