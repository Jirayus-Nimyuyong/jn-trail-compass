# AWS Certified CloudOps Engineer Associate (SOA-C03)
## คอร์สเตรียมสอบ โดย Stéphane Maarek — แปลภาษาไทย

---

# สารบัญ

**ส่วนที่ 1:** Amazon EC2 สำหรับ SysOps / Amazon Machine Image (AMI) / การจัดการ EC2 ในระดับใหญ่ (Systems Manager)

**ส่วนที่ 2:** High Availability & Scalability / AWS CloudFormation / AWS Lambda

**ส่วนที่ 3:** EC2 Storage & Data Management / Amazon S3 / S3 ขั้นสูง / S3 Security

**ส่วนที่ 4:** Advanced Storage Solutions / Amazon CloudFront / Databases ใน AWS

**ส่วนที่ 5:** AWS Monitoring, Audit & Performance / AWS Account Management

**ส่วนที่ 6:** Disaster Recovery / Security & Compliance / Identity

**ส่วนที่ 7:** Amazon Route 53 / Amazon VPC / Other Services / เตรียมสอบ

---

# ยินดีต้อนรับ!

- เราจะเตรียมตัวสำหรับข้อสอบ CloudOps SOA-C03
- เป็นใบรับรองที่ท้าทาย คอร์สนี้จะยาวและน่าสนใจ
- โครงสร้างคอร์ส:
  - วิดีโอนำเข้าจากคอร์ส Cloud Practitioner เช่น [CCP] EC2 Instances Launch Types
  - วิดีโอนำเข้าจากคอร์ส Solutions Architect Associate เช่น [SAA] EC2 Hibernate Hands On
  - วิดีโอนำเข้าจากคอร์ส Developer Associate เช่น [DVA] CloudFormation Drift
  - วิดีโอเฉพาะ CloudOps (ไม่มี [...] นำหน้า)

---

# Amazon EC2 สำหรับ CloudOps
## จัดการ EC2 จากมุมมอง CloudOps

---

## EC2 การเปลี่ยน Instance Type

- ใช้ได้เฉพาะ Instance ที่ใช้ EBS เท่านั้น
- ขั้นตอน:
  1. หยุด Instance (Stop)
  2. Instance Settings → Change Instance Type
  3. เริ่ม Instance (Start)

```
ตัวอย่าง:  t2.micro  →  t2.small
```

---

## Placement Groups

บางครั้งคุณต้องการควบคุมกลยุทธ์การวาง EC2 Instance กลยุทธ์นี้กำหนดโดย Placement Groups

เมื่อสร้าง Placement Group คุณเลือก 1 ใน 3 กลยุทธ์:

| กลยุทธ์ | คำอธิบาย |
|---------|----------|
| **Cluster** | รวม Instance ใน AZ เดียว, latency ต่ำ |
| **Spread** | กระจายไปยัง hardware ต่างกัน (สูงสุด 7 ต่อ AZ) — แอปสำคัญ |
| **Partition** | กระจายไปยัง partition ต่างกัน (rack ต่างกัน) ภายใน AZ รองรับ 100+ EC2 (Hadoop, Cassandra, Kafka) |

---

## Placement Groups — Cluster

```
         ┌─────────────────────────────────┐
         │         AZ เดียว (Same AZ)        │
         │                                   │
         │  ┌──┐ ┌──┐ ┌──┐ ┌──┐ ┌──┐ ┌──┐  │
         │  │EC│ │EC│ │EC│ │EC│ │EC│ │EC│  │
         │  │2 │ │2 │ │2 │ │2 │ │2 │ │2 │  │
         │  └──┘ └──┘ └──┘ └──┘ └──┘ └──┘  │
         │       Placement Group Cluster      │
         │       Low latency / 10 Gbps        │
         └─────────────────────────────────┘
```

- **ข้อดี:** Network ดีมาก (10 Gbps bandwidth ระหว่าง Instance ที่เปิด Enhanced Networking — แนะนำ)
- **ข้อเสีย:** ถ้า AZ ล่ม ทุก Instance จะล่มพร้อมกัน
- **กรณีใช้งาน:**
  - Big Data job ที่ต้องเสร็จเร็ว
  - แอปพลิเคชันที่ต้องการ latency ต่ำมากและ network throughput สูง

---

## Placement Groups — Spread

```
  us-east-1a          us-east-1b          us-east-1c
 ┌──────────┐       ┌──────────┐       ┌──────────┐
 │Hardware 1│       │Hardware 3│       │Hardware 5│
 │  ┌──┐    │       │  ┌──┐    │       │  ┌──┐    │
 │  │EC2│   │       │  │EC2│   │       │  │EC2│   │
 │  └──┘    │       │  └──┘    │       │  └──┘    │
 │Hardware 2│       │Hardware 4│       │Hardware 6│
 │  ┌──┐    │       │  ┌──┐    │       │  ┌──┐    │
 │  │EC2│   │       │  │EC2│   │       │  │EC2│   │
 │  └──┘    │       │  └──┘    │       │  └──┘    │
 └──────────┘       └──────────┘       └──────────┘
```

- **ข้อดี:**
  - ครอบคลุมหลาย Availability Zone (AZ)
  - ลดความเสี่ยงที่จะล่มพร้อมกัน
  - EC2 Instance อยู่บน physical hardware ต่างกัน
- **ข้อเสีย:** จำกัด 7 Instance ต่อ AZ ต่อ placement group
- **กรณีใช้งาน:**
  - แอปที่ต้อง maximize high availability
  - แอปสำคัญที่แต่ละ Instance ต้องแยก failure จากกัน

---

## Placement Groups — Partition

```
        us-east-1a                    us-east-1b
 ┌─────────────────────────┐  ┌─────────────────────┐
 │ Partition 1 │ Partition 2│  │ Partition 3          │
 │ ┌──┐ ┌──┐  │ ┌──┐ ┌──┐ │  │ ┌──┐ ┌──┐ ┌──┐      │
 │ │EC│ │EC│  │ │EC│ │EC│ │  │ │EC│ │EC│ │EC│      │
 │ │2 │ │2 │  │ │2 │ │2 │ │  │ │2 │ │2 │ │2 │      │
 │ └──┘ └──┘  │ └──┘ └──┘ │  │ └──┘ └──┘ └──┘      │
 │ ┌──┐ ┌──┐  │ ┌──┐ ┌──┐ │  │ ┌──┐ ┌──┐ ┌──┐      │
 │ │EC│ │EC│  │ │EC│ │EC│ │  │ │EC│ │EC│ │EC│      │
 │ │2 │ │2 │  │ │2 │ │2 │ │  │ │2 │ │2 │ │2 │      │
 │ └──┘ └──┘  │ └──┘ └──┘ │  │ └──┘ └──┘ └──┘      │
 └─────────────────────────┘  └─────────────────────┘
```

- สูงสุด 7 partition ต่อ AZ
- ครอบคลุมหลาย AZ ใน Region เดียวกัน
- รองรับ EC2 หลายร้อยตัว
- Instance ใน partition ต่างกันไม่แชร์ rack กัน
- ถ้า partition หนึ่งล่ม จะกระทบหลาย EC2 แต่ไม่กระทบ partition อื่น
- EC2 Instance เข้าถึงข้อมูล partition ได้ผ่าน metadata
- **กรณีใช้งาน:** HDFS, HBase, Cassandra, Kafka

---

## EC2 การแก้ปัญหา SSH

- ตรวจสอบให้แน่ใจว่า private key (ไฟล์ pem) บนเครื่อง Linux มีสิทธิ์ 400 มิเช่นนั้นจะเจอ error "Unprotected private key file"
- ตรวจสอบ username ของ OS ให้ถูกต้องเมื่อ login ผ่าน SSH มิเช่นนั้นจะเจอ "Host key not found", "Permission denied" หรือ "Connection closed by [instance] port 22"
- สาเหตุที่เป็นไปได้ของ "Connection timed out":
  - SG ไม่ได้ตั้งค่าถูกต้อง
  - NACL ไม่ได้ตั้งค่าถูกต้อง
  - ตรวจ Route Table ของ subnet (routes traffic ไป IGW)
  - Instance ไม่มี public IPv4
  - CPU load ของ Instance สูง

---

## SSH vs. EC2 Instance Connect

### เชื่อมต่อด้วย SSH

```
User (IPv4: 1.2.3.4) ──SSH──→ EC2 Instance
                                Security Group:
                                Type: SSH | Protocol: TCP | Port: 22
                                Source: 1.2.3.4/32

User (IPv4: 5.6.7.8) ──SSH──→ ❌ blocked
```

### เชื่อมต่อด้วย EC2 Instance Connect

```
User ──→ EC2 Console / EC2 Instance Connect CLI
              │
              ▼
    EC2 Instance Connect API
    (push one-time SSH public key, ใช้ได้ 60 วินาที)
              │
              ▼
         EC2 Instance
         Security Group:
         Type: SSH | Protocol: TCP | Port: 22
         Source: 18.206.107.24/29  (AWS IP Range)
```

- ข้อมูล IP Range: https://ip-ranges.amazonaws.com/ip-ranges.json

---

## EC2 Instance Connect (EIC) Endpoint

```
                        Region
    ┌──────────────────────────────────────┐
    │    EC2 Instance Connect              │
    │    Endpoint Service                  │
    │              │                       │
    │         ┌────┴────┐                  │
    │         │   VPC   │                  │
    │    ┌────┴────┐ ┌──┴──────┐           │
    │    │Private  │ │Private  │           │
    │    │Subnet   │ │Subnet   │           │
    │    │         │ │         │           │
    │    │Instance │ │Instance │           │
    │    └─────────┘ └─────────┘           │
    └──────────────────────────────────────┘
              ▲
    Administrator (ไม่ต้องผ่าน Internet)
```

- เชื่อมต่อกับ EC2 Instance ใน Private Subnet ได้อย่างปลอดภัย
- ไม่ต้องใช้ Internet Gateway, NAT Gateway, ไม่ต้องมี Internet
- EIC Endpoint Security Group: ต้องอนุญาต outbound SSH traffic ไปยัง target instances
- EC2 Instance Security Group: ต้องอนุญาต inbound SSH traffic จาก EIC Endpoint Security Group

---

## CloudWatch Metrics สำหรับ EC2

**AWS จัดให้ (AWS pushes them):**
- Basic Monitoring (ค่าเริ่มต้น): เก็บข้อมูลทุก 5 นาที
- Detailed Monitoring (เสียเงิน): เก็บข้อมูลทุก 1 นาที
- รวม CPU, Network, Disk และ Status Check Metrics

**Custom metric (คุณส่งเอง):**
- Basic Resolution: 1 นาที
- High Resolution: ถึง 1 วินาที
- รวม RAM, application level metrics
- ต้องตรวจสอบ IAM permissions บน EC2 instance role ให้ถูกต้อง!

---

## EC2 Metrics ที่รวมอยู่

| หมวด | Metrics |
|------|---------|
| CPU | CPU Utilization + Credit Usage / Balance |
| Network | Network In / Out |
| Status Check | Instance status = ตรวจ EC2 VM |
| | System status = ตรวจ hardware ที่อยู่ข้างใต้ |
| | Attached EBS status = ตรวจ EBS volumes ที่แนบอยู่ |
| Disk | Read / Write สำหรับ Ops / Bytes (เฉพาะ instance store เท่านั้น) |

> ⚠️ **RAM ไม่รวมอยู่ใน AWS EC2 metrics**

---

## Unified CloudWatch Agent

```
   Corporate Data Center              AWS Cloud
   ┌─────────────────┐
   │ Server with     │──push logs──→  CloudWatch
   │ Unified CW Agent│──push metrics→
   └─────────────────┘

   ┌─────────────────┐
   │ EC2 Instance    │──push logs──→  CloudWatch
   │ with Unified    │──push metrics→
   │ CW Agent        │
   └─────────────────┘
```

- สำหรับ virtual servers (EC2 instances, on-premises servers, ...)
- เก็บ metrics ระดับระบบเพิ่มเติม เช่น RAM, processes, disk space ที่ใช้ ฯลฯ
- เก็บ logs ส่งไป CloudWatch Logs
- ไม่มี logs จากภายใน EC2 instance ส่งไป CloudWatch Logs โดยไม่ใช้ agent
- ตั้งค่าจากส่วนกลางผ่าน SSM Parameter Store
- ต้องตรวจสอบ IAM permissions ให้ถูกต้อง
- Default namespace สำหรับ metrics: **CWAgent** (ตั้งค่า/เปลี่ยนได้)

---

## Unified CloudWatch Agent — procstat Plugin

- เก็บ metrics และ monitor การใช้ทรัพยากรของ process แต่ละตัว
- รองรับทั้ง Linux และ Windows servers
- ตัวอย่าง: เวลา CPU ที่ process ใช้, memory ที่ process ใช้, ...
- เลือก process ที่จะ monitor โดย:
  - **pid_file**: ชื่อไฟล์ process identification number (PID)
  - **exe**: ชื่อ process ที่ตรงกับ string ที่กำหนด (RegEx)
  - **pattern**: command line ที่ใช้เริ่ม process (RegEx)
- Metrics ที่เก็บโดย procstat plugin ขึ้นต้นด้วย **"procstat"** (เช่น procstat_cpu_time, procstat_cpu_usage, ...)

---

## Status Checks

ตรวจสอบอัตโนมัติเพื่อระบุปัญหา hardware และ software

### System Status Checks
- Monitor ปัญหากับ AWS systems (software/hardware ของ physical host, ไฟดับ, ...)
- ตรวจ Personal Health Dashboard สำหรับ scheduled critical maintenance
- **แก้ไข:** Stop แล้ว Start instance (instance ย้ายไป host ใหม่)

### Instance Status Checks
- Monitor software/network configuration ของ instance (network config ผิด, memory เต็ม, ...)
- **แก้ไข:** Reboot instance หรือเปลี่ยน instance configuration

### Attached EBS Status Checks
- Monitor EBS volumes ที่แนบอยู่ (เข้าถึงได้ & I/O operations สมบูรณ์)
- **แก้ไข:** Reboot instance หรือเปลี่ยน EBS volume ที่มีปัญหา

```
   Host 1                Host 2
   ┌─────┐    Stop &     ┌─────┐
   │ EC2 │───Start──────→│ EC2 │  (ย้ายไป host ใหม่)
   │     │  Hardware     │     │
   └─────┘  failure      └─────┘
      ▲
    User
```

---

## Status Checks — CW Metrics & Recovery

CloudWatch Metrics (ทุก 1 นาที):
- StatusCheckFailed_System
- StatusCheckFailed_Instance
- StatusCheckFailed_AttachedEBS
- StatusCheckFailed (สำหรับทั้งหมด)

### ตัวเลือก 1: CloudWatch Alarm

```
EC2 Instance ──monitor──→ CloudWatch
                          (StatusCheckFailed_System)
                               │
                               ▼
                         CloudWatch Alarm
                          ┌────┴────┐
                          │         │
                    Action:       Send notification
                    recover       ──→ Amazon SNS
```

- กู้คืน EC2 instance พร้อมเก็บ private/public IP, EIP, metadata, Placement Group

### ตัวเลือก 2: Auto Scaling Group
- ตั้ง min/max/desired = 1 เพื่อกู้คืน instance แต่จะไม่เก็บ private และ elastic IP เดิม

---

## EC2 Hibernate (จำศีล)

สิ่งที่เรารู้เกี่ยวกับ stop, terminate:
- **Stop** — ข้อมูลบน disk (EBS) จะคงอยู่ในการ start ครั้งถัดไป
- **Terminate** — EBS volumes (root) ที่ตั้งค่าให้ลบจะหายไป

เมื่อ start:
- ครั้งแรก: OS boot & EC2 User Data script ทำงาน
- ครั้งถัดไป: OS boot up
- จากนั้นแอปเริ่มทำงาน, caches warm up → ใช้เวลา!

### แนะนำ EC2 Hibernate:

```
   ┌─────────┐   Hibernate    ┌─────────┐
   │ Running │──────────────→│ Stopping │
   │  (RAM)  │               │          │
   └─────────┘               └────┬─────┘
                                  │ เขียน RAM ลง
                                  │ Root EBS Volume
                                  ▼           (Encrypted)
                             ┌─────────┐
                             │ Stopped │
                             └────┬────┘
                                  │ Start
                                  ▼
                             ┌─────────┐
                             │ Running │ (โหลด RAM กลับมา)
                             │  (RAM)  │
                             └─────────┘
```

- สถานะ in-memory (RAM) ถูกเก็บรักษาไว้
- Instance boot เร็วขึ้นมาก! (OS ไม่ถูก stop / restart)
- ภายใน: RAM state ถูกเขียนลงไฟล์ใน root EBS volume
- Root EBS volume ต้อง encrypted

**กรณีใช้งาน:**
- Long-running processing
- บันทึก RAM state
- Services ที่ใช้เวลานานในการ initialize

---

## EC2 Hibernate — ข้อควรรู้

- Supported Instance Families: C3, C4, C5, I3, M3, M4, R3, R4, T2, T3, ...
- Instance RAM Size: ต้องน้อยกว่า 150 GB
- Instance Size: ไม่รองรับ bare metal instances
- AMI: Amazon Linux 2, Linux AMI, Ubuntu, RHEL, CentOS & Windows...
- Root Volume: ต้องเป็น EBS, encrypted, ไม่ใช่ instance store, และขนาดใหญ่พอ
- รองรับ On-Demand, Reserved และ Spot Instances
- **ไม่สามารถ hibernate เกิน 60 วัน**

---

## Instance Scheduler บน AWS

```
  Instance Scheduler
  (CloudFormation Solution)
         │
    ┌────┴────┐
    │ Lambda  │──ใช้ tags──→ EC2 Instances
    │Function │              ASG
    └────┬────┘              RDS Instances
         │
    DynamoDB Table
    (ตารางเวลา)
```

- โซลูชัน AWS ที่ deploy ผ่าน CloudFormation (ไม่ใช่ service)
- หยุด/เริ่ม AWS services อัตโนมัติเพื่อลดค่าใช้จ่าย (ประหยัดถึง 70%)
- ตัวอย่าง: หยุด EC2 instances ของบริษัทนอกเวลาทำงาน
- รองรับ EC2 instances, EC2 Auto Scaling Groups, และ RDS instances
- จัดการตารางเวลาใน DynamoDB table
- ใช้ tags ของทรัพยากรและ Lambda เพื่อหยุด/เริ่ม instances
- รองรับ cross-account และ cross-region resources

---

# Amazon Machine Image (AMI)

---

## AMI ภาพรวม

- AMI = Amazon Machine Image
- AMI คือการปรับแต่งของ EC2 instance
- คุณเพิ่ม software, configuration, OS, monitoring ของคุณเองได้
- Boot / configuration เร็วขึ้นเพราะ software ทั้งหมดถูก pre-package แล้ว
- AMI สร้างสำหรับ Region เฉพาะ (สามารถ copy ข้าม Region ได้)
- คุณสามารถ launch EC2 instances จาก:
  - **Public AMI:** AWS จัดให้
  - **AMI ของคุณเอง:** คุณสร้างและดูแลเอง
  - **AWS Marketplace AMI:** AMI ที่คนอื่นสร้าง (และอาจขาย)

---

## กระบวนการสร้าง AMI (จาก EC2 instance)

```
    US-EAST-1A                      US-EAST-1B
   ┌──────────┐                    ┌──────────┐
   │   EC2    │──Create AMI──→     │   EC2    │
   │ Instance │           Custom   │ Instance │
   └──────────┘            AMI     └──────────┘
                            │       Launch from AMI
                            ▼
                       ┌─────────┐
                       │Custom   │
                       │AMI      │
                       └─────────┘
```

1. เริ่ม EC2 instance แล้วปรับแต่ง
2. หยุด instance (เพื่อความสมบูรณ์ของข้อมูล)
3. สร้าง AMI — จะสร้าง EBS snapshots ด้วย
4. Launch instances จาก AMI อื่นๆ

---

## AMI ตัวเลือก No-Reboot

สร้าง AMI โดยไม่ปิด instance ได้

### เมื่อ No-Reboot ปิด (ค่าเริ่มต้น):

```
EC2 Instance (running) → shut down → EC2 Instance (stopped)
    │                                       │
    │                               Attached EBS Volume
    │                                       │
    └───────────────────────────────→ EBS Snapshot → AMI
```

### เมื่อ No-Reboot เปิด:

```
EC2 Instance (running) ─────→ Attached EBS Volume
                                     │
                               EBS Snapshot → AMI
                               
⚠️ หมายเหตุ: OS Buffers ไม่ถูก flush ก่อน snapshot
```

ค่าเริ่มต้น: ไม่เลือก (AWS จะปิด instance ก่อนสร้าง AMI เพื่อรักษา file system integrity)

---

## AWS Backup Plans สำหรับ AMI

```
  AWS Backup ──Create AMI──→ Amazon EC2 AMI
               --no-reboot     (ไม่รับประกัน integrity)

  EventBridge ──invoke──→ Lambda Function ──Create AMI──→ Amazon EC2 AMI
  Rule (schedule)                              --reboot    (รับประกัน integrity)
                                              EC2 (rebooting)
```

- AWS Backup ไม่ reboot instances ขณะถ่าย EBS snapshots (no-reboot behavior)
- ไม่ช่วยสร้าง AMI ที่รับประกัน file system integrity เพราะต้อง reboot instance
- เพื่อรักษา integrity ต้องส่ง reboot parameter ขณะถ่ายภาพ
- ใช้ EventBridge + Lambda + CreateImage API พร้อม reboot

---

## การย้าย EC2 Instance ข้าม AZ

```
                    us-east-1
    us-east-1a                    us-east-1b
   ┌──────────┐                  ┌──────────┐
   │   EC2    │                  │   EC2    │
   │ Instance │                  │ Instance │
   │  ┌───┐  │   create    AMI  │  ┌───┐  │
   │  │EBS│  │──image──→  ┌──┐  │  │EBS│  │
   │  │Vol│  │            │  │──│→ │Vol│  │
   │  └───┘  │            └──┘  │  └───┘  │
   └──────────┘  launch/restore  └──────────┘
```

---

## การแชร์ AMI ข้ามบัญชี

```
   Account A                    Account B
   ┌──────────┐    Share with   ┌──────────┐
   │Source AMI │───Account B──→│          │
   │          │                │ EC2      │
   │          │                │ Instance │
   │          │                │(AMI:     │
   │          │                │Source AMI│
   └──────────┘                └──────────┘
```

- คุณสามารถแชร์ AMI กับบัญชี AWS อื่นได้
- การแชร์ AMI ไม่เปลี่ยนความเป็นเจ้าของ AMI
- คุณสามารถแชร์ได้เฉพาะ AMI ที่มี volumes ไม่ encrypted และ volumes ที่ encrypted ด้วย customer managed key
- ถ้าคุณแชร์ AMI ที่มี encrypted volumes ต้องแชร์ customer managed keys ที่ใช้ encrypt ด้วย

---

## การแชร์ AMI พร้อม KMS Encryption

```
   Account A                      Account B
   ┌────────────────┐            ┌────────────────┐
   │ Custom AMI     │            │                │
   │ us-east-1      │──share──→  │ us-east-1      │
   │                │            │                │
   │ EBS Snapshot   │            │ EC2 Instance   │
   │ (encrypted)    │            │ (AMI: Custom   │
   │                │            │  AMI)          │
   │ CMK - A        │            │                │
   └────────────────┘            └────────────────┘
                                  IAM Permissions:
                                  kms:DescribeKey
                                  kms:CreateGrant
                                  kms:Decrypt
                                  kms:GenerateDataKey
                                  kms:ReEncrypt
```

---

## การ Copy AMI ข้ามบัญชี

- ถ้าคุณ copy AMI ที่แชร์มากับบัญชีคุณ คุณเป็นเจ้าของ AMI เป้าหมายในบัญชีคุณ
- เจ้าของ AMI ต้นทางต้องให้สิทธิ์อ่าน storage ที่สำรอง AMI (EBS Snapshot)
- ถ้า AMI ที่แชร์มีมี encrypted snapshots เจ้าของต้องแชร์ key ด้วย
- สามารถ encrypt AMI ด้วย CMK ของคุณเองขณะ copy ได้

### Cross-Region / Cross-Account Encrypted AMI Copy:

```
  Account A (Source)                 Account B (Target)
  Custom AMI (us-east-1)            Custom AMI (us-east-1)
  EBS Snapshot (encrypted)    ──→   EBS Snapshot (encrypted)
  CMK - A                          CMK - B
                                    
  copy to us-east-1:
  Decrypt: CMK - A
  Encrypt: CMK - B
```

---

## EC2 Image Builder

```
  EC2 Image Builder
        │
        ▼
  Builder EC2 Instance ──→ Build Components applied
  (create)                 (customize software)
        │
        ▼
  New AMI (create) ──→ Test EC2 Instance
                       Test suite is run
                       (AMI ทำงานได้? ปลอดภัย?)
                              │
                              ▼
                       AMI is distributed
                       (หลาย regions ได้)
```

- ใช้สร้าง Virtual Machines หรือ container images อัตโนมัติ
- สร้าง, ดูแล, ตรวจสอบ และทดสอบ EC2 AMI อัตโนมัติ
- รันตามตาราง (รายสัปดาห์, เมื่อ packages อัพเดต ฯลฯ)
- **บริการฟรี** (จ่ายเฉพาะทรัพยากรที่ใช้)

---

## AMI ใน Production

```
                    IAM Permissions
  AMI (approved)  ──launch──→ EC2 Instance ✅
  Tag: Environment=Prod

  AMI (not approved) ──launch──→ ❌ ถูกปฏิเสธ

  ─── AWS Config ───
  AMI (approved)  → launch → EC2 Instance → COMPLIANT ✅
  AMI (not approved) → launch → EC2 Instance → NON_COMPLIANT ❌
```

- คุณสามารถบังคับให้ users launch EC2 instances จาก AMI ที่อนุมัติแล้วเท่านั้น (AMI ที่ tagged ด้วย tags เฉพาะ) โดยใช้ IAM policies
- ใช้ร่วมกับ AWS Config เพื่อตรวจหา EC2 instance ที่ไม่ comply (instances ที่ launch จาก AMI ที่ไม่อนุมัติ)

---

# การจัดการ EC2 ในระดับใหญ่
## Systems Manager

---

## AWS Systems Manager ภาพรวม

- ช่วยจัดการ EC2 และ On-Premises systems ในระดับใหญ่
- ดู operational insights เกี่ยวกับสถานะ infrastructure
- ตรวจจับปัญหาได้ง่าย
- Patching อัตโนมัติเพื่อ compliance ที่ดีขึ้น
- ทำงานกับทั้ง Windows และ Linux OS
- ผสานกับ CloudWatch metrics / dashboards
- ผสานกับ AWS Config
- **บริการฟรี**

---

## AWS Systems Manager Features

| Node Tools | Change Management | Application Tools | Operations Tools |
|------------|-------------------|-------------------|------------------|
| Fleet Manager | Automation | Application Manager | Explorer |
| Compliance | Change Calendar | AppConfig | OpsCenter |
| Inventory | Maintenance Windows | Parameter Store | CloudWatch Dashboard |
| Hybrid Activations | Documents | Resource Groups | |
| Session Manager | Quick Setup | | |
| Run Command | | | |
| State Manager | | | |
| Patch Manager | | | |
| Distributor | | | |

---

## Systems Manager ทำงานอย่างไร

```
   ┌──────────────┐
   │EC2 Instance  │
   │(SSM Agent)   │──────┐
   └──────────────┘      │
                         ▼
   ┌──────────────┐   AWS Systems
   │EC2 Instance  │   Manager
   │(SSM Agent)   │──────┤
   └──────────────┘      │
                         │
   ┌──────────────┐      │
   │On-premise    │      │
   │Server/VM     │──────┘
   │(SSM Agent)   │
   └──────────────┘
   
   ทุกตัวต้องมี IAM Permissions
```

- ต้องติดตั้ง SSM agent บน systems ที่เราควบคุม
- ติดตั้งมาแล้วใน Amazon Linux 2 AMI & บาง Ubuntu AMI
- ถ้า instance ควบคุมด้วย SSM ไม่ได้ อาจเป็นปัญหากับ SSM agent!
- ตรวจสอบให้แน่ใจว่า EC2 instances มี IAM role ที่เหมาะสมเพื่ออนุญาต SSM actions

---

## AWS Tags

- เพิ่ม text key-value pairs เรียกว่า Tags ไปยัง AWS resources ได้หลายตัว
- ใช้กันมากใน EC2
- ตั้งชื่อได้อิสระ, tags ทั่วไป: Name, Environment, Team ...
- ใช้สำหรับ:
  - จัดกลุ่มทรัพยากร
  - Automation
  - จัดสรรค่าใช้จ่าย
- **มี tags มากเกินไปดีกว่ามีน้อยเกินไป!**

---

## Resource Groups

- สร้าง, ดู หรือจัดการ logical group ของทรัพยากรด้วย tags
- สร้าง logical groups เช่น:
  - Applications
  - ชั้นต่างๆ ของ application stack
  - Production vs Development environments
- Regional service
- ทำงานกับ EC2, S3, DynamoDB, Lambda ฯลฯ

---

## SSM — Documents

- Documents เขียนเป็น JSON หรือ YAML
- กำหนด parameters
- กำหนด actions
- มี documents สำเร็จรูปจาก AWS จำนวนมาก
- ใช้กับ: Run Command, State Manager, Patch Manager, Automation, Parameter Store

---

## SSM — Run Command

```
   EventBridge Event ──trigger──→ Run Command
                                      │
                              ┌───────┼───────┐
                              ▼       ▼       ▼
                            EC2     EC2     EC2
                              │
                         ┌────┴────┐
                         ▼         ▼
                    Amazon S3   CloudWatch Logs
                    (output)    (output)
                         │
                         ▼
                    Amazon SNS
                    (notification)
```

- รัน document (= script) หรือแค่รันคำสั่ง
- รันคำสั่งข้ามหลาย instances (ใช้ resource groups)
- Rate Control / Error Control
- ผสานกับ IAM & CloudTrail
- **ไม่ต้องใช้ SSH**
- Command Output แสดงใน Console, ส่งไป S3 bucket หรือ CloudWatch Logs
- ส่งแจ้งเตือนไป SNS เรื่องสถานะคำสั่ง (In progress, Success, Failed, ...)
- เรียกใช้ผ่าน EventBridge ได้

---

## SSM — Automation

```
  AWS Console / AWS SDK / Maintenance Windows / EventBridge / AWS Config Remediation
                              │
                              ▼
                    SSM Automation
                    (Automation Documents / Runbooks)
                              │
                    execute automation
                    (เช่น AWS-RestartEC2Instance)
                              │
                    ┌─────────┼─────────┐
                    ▼         ▼         ▼
               EC2 Instances  EBS  AMI  RDS ...
```

- ลดความซับซ้อนของงานบำรุงรักษาและ deployment ทั่วไปของ EC2 instances และ AWS resources อื่นๆ
- ตัวอย่าง: restart instances, สร้าง AMI, EBS snapshot
- **Automation Runbook:** SSM Documents ประเภท Automation
  - กำหนด actions ที่ทำบน EC2 instances หรือ AWS resources
  - มี pre-defined runbooks (AWS) หรือสร้าง custom runbooks
- สามารถ trigger ได้จาก:
  - ด้วยมือผ่าน AWS Console, AWS CLI หรือ SDK
  - จาก Amazon EventBridge
  - ตามตาราง Maintenance Windows
  - จาก AWS Config สำหรับ rules remediations

---

## SSM — Automation — Patch AMI & Update ASG

```
  1. Source AMI ──launch──→ EC2 Instance
  2. Run Command: AWS-RunPatchBaseline ──install patches──→ EC2 Instance
  3. Stop EC2 Instance
  4. Create Image ──→ Patched AMI
  5. Terminate instance
  6. Run Python Script
  7. Update Auto Scaling Group
  8. Launch Template (new) ──→ EC2 instance refresh
  
  ทั้งหมดจัดการโดย Automation + IAM Role
```

---

## SSM Parameter Store

```
                    SSM Parameter Store
                           │
              ┌────────────┼────────────┐
              ▼            ▼            ▼
         Plaintext    Encrypted     Applications
         config       config        (Check IAM
                         │          permissions)
                         ▼
                       AWS KMS
                       (Decryption)
```

- เก็บ configuration และ secrets อย่างปลอดภัย
- Seamless Encryption ด้วย KMS (ทางเลือก)
- Serverless, scalable, durable, SDK ใช้ง่าย
- Version tracking ของ configurations / secrets
- Security ผ่าน IAM
- แจ้งเตือนผ่าน Amazon EventBridge
- ผสานกับ CloudFormation

---

## SSM Parameter Store Hierarchy

```
  /my-department/
      my-app/
          dev/
              db-url
              db-password
          prod/
              db-url
              db-password
      other-app/
  /other-department/
  /aws/reference/secretsmanager/secret_ID_in_Secrets_Manager
  /aws/service/ami-amazon-linux-latest/amzn2-ami-hvm-x86_64-gp2 (public)
```

- Dev Lambda Function → GetParameters หรือ GetParametersByPath API
- Prod Lambda Function → GetParameters หรือ GetParametersByPath API

---

## Standard vs Advanced Parameter Tiers

| | Standard | Advanced |
|---|---------|----------|
| จำนวน parameters สูงสุด (ต่อ account/Region) | 10,000 | 100,000 |
| ขนาดสูงสุดของ parameter value | 4 KB | 8 KB |
| Parameter policies | ไม่มี | มี |
| ค่าใช้จ่าย | ฟรี | $0.05 ต่อ advanced parameter ต่อเดือน |

---

## Parameters Policies (สำหรับ advanced parameters)

กำหนด TTL ให้ parameter (วันหมดอายุ) เพื่อบังคับให้อัพเดตหรือลบข้อมูลสำคัญ เช่น passwords

สามารถกำหนดหลาย policies พร้อมกัน:

| Policy | คำอธิบาย |
|--------|----------|
| Expiration | ลบ parameter เมื่อหมดอายุ |
| ExpirationNotification | แจ้งเตือนผ่าน EventBridge ก่อนหมดอายุ |
| NoChangeNotification | แจ้งเตือนผ่าน EventBridge ถ้าไม่มีการเปลี่ยนแปลง |

---

## SSM — Fleet Manager

```
   Fleet Manager
       │
  ┌────┼────┬──────────┬──────────┐
  ▼    ▼    ▼          ▼          ▼
 EC2  On-Premises  Virtual    Edge & IoT
 Instance  Server   Machine    Devices
 (SSM     (SSM     (SSM       (SSM
 Agent)   Agent)   Agent)     Agent)
```

- จัดการ nodes จากส่วนกลางและระยะไกล
- รวมถึง EC2 instances, on-premises servers/VMs, edge devices, IoT devices
- รองรับ OS ต่างกัน (Windows, Linux)
- ทุก nodes ต้องติดตั้ง SSM agent
- ต้องมี AmazonSSMManagedInstanceCore permissions หรือใช้ DHMC
- กรณีใช้งาน: ติดตามสถานะ/สุขภาพ/ประสิทธิภาพ, troubleshooting, Windows RDP, Session Manager

---

## SSM IAM Permissions

**AmazonSSMManagedInstanceCore** policy ให้สิทธิ์ที่จำเป็นสำหรับ:
- ลงทะเบียน instance กับ Systems Manager
- เข้าถึง Session Manager, SSM Documents, SSM Parameters
- รับคำสั่ง (Run Command)
- อนุญาต Patching operations (Patch Manager)
- รายงานข้อมูลไป Inventory, Compliance, และสถานะ config ไป SSM
- ส่ง heartbeat signals

---

## Default Host Management Configuration (DHMC)

```
   Systems Manager (DHMC enabled)
              │
              ▼
        EC2 Instance
              │
        Instance Identity Role
        (identify EC2 to AWS Services)
              │
              ▼
   AWSSystemsManagerDefaultEC2InstanceManagementRole
```

- เมื่อเปิด จะตั้งค่า EC2 instances เป็น managed instances อัตโนมัติโดยไม่ต้องใช้ EC2 Instance Profile
- **Instance Identity Role** — IAM Role ที่ไม่มี permissions นอกจากระบุตัว EC2 instance
- EC2 instances ต้องเปิด **IMDSv2** และติดตั้ง **SSM Agent** (ไม่รองรับ IMDSv1)
- เปิด Session Manager, Patch Manager, และ Inventory อัตโนมัติ
- อัพเดต SSM Agent อัตโนมัติ
- ต้องเปิดแยกแต่ละ AWS Region

---

## SSM — Inventory

- เก็บ metadata จาก managed instances (EC2/On-premises)
- Metadata รวมถึง: software ที่ติดตั้ง, OS drivers, configurations, installed updates, running services ...
- ดูข้อมูลใน AWS Console หรือเก็บใน S3 แล้ว query ด้วย Athena และ QuickSight
- กำหนดความถี่ในการเก็บ metadata (นาที, ชั่วโมง, วัน)
- Query ข้อมูลจากหลาย AWS accounts และ regions
- สร้าง Custom Inventory สำหรับ custom metadata (เช่น ตำแหน่ง rack)

---

## SSM — State Manager

- ทำให้กระบวนการรักษาสถานะของ managed instances (EC2/On-premises) เป็นอัตโนมัติ
- กรณีใช้งาน: bootstrap instances ด้วย software, patch OS/software updates ตามตาราง ...
- **State Manager Association:**
  - กำหนดสถานะที่ต้องการรักษาบน managed instances
  - ตัวอย่าง: พอร์ต 22 ต้องปิด, antivirus ต้องติดตั้ง ...
  - กำหนดตารางเวลาที่ configuration จะถูกใช้
  - ใช้ SSM Documents เพื่อสร้าง Association (เช่น SSM Document สำหรับตั้งค่า CW Agent)

---

## SSM — Patch Manager

- Patch OS, applications, security อัตโนมัติ
- รองรับทั้ง EC2 instances และ on-premises servers
- รองรับ Linux, macOS, และ Windows
- Patch on-demand หรือตามตาราง Maintenance Windows
- สแกน instances และสร้างรายงาน patch compliance (patches ที่ขาด)
- ส่งรายงาน patch compliance ไป S3 ได้

### Patch Baseline
- กำหนด patches ที่ควรและไม่ควรติดตั้ง
- สร้าง custom Patch Baselines ได้ (ระบุ approved/rejected patches)
- Patches สามารถ auto-approve ภายในจำนวนวันหลัง release
- ค่าเริ่มต้น: ติดตั้งเฉพาะ critical patches และ patches ที่เกี่ยวกับ security

### Patch Group
- เชื่อมโยงกลุ่ม instances กับ Patch Baseline เฉพาะ
- ตัวอย่าง: สร้าง Patch Groups สำหรับ environments ต่างกัน (dev, test, prod)
- Instances ใช้ tag key **Patch Group** เพื่อระบุกลุ่ม
- Instance อยู่ได้ใน Patch Group เดียวเท่านั้น
- Patch Group ลงทะเบียนกับ Patch Baseline เดียวเท่านั้น

---

## SSM — Patch Manager Patch Baselines

**Pre-Defined Patch Baseline:**
- จัดการโดย AWS สำหรับ OS ต่างกัน (แก้ไขไม่ได้)
- AWS-RunPatchBaseline (SSM Document) — apply ทั้ง OS และ application patches (Linux, macOS, Windows Server)

**Custom Patch Baseline:**
- สร้าง Patch Baseline ของคุณเอง เลือก patches ที่จะ auto-approve
- OS, allowed patches, rejected patches, ...
- สามารถระบุ custom และ alternative patch repositories

---

## SSM — Patch Manager (แผนภาพ)

```
  EC2 Instances (with SSM Agent)
  Tags: OS=Windows, Patch Group=Dev
         │
  Patch Manager ──Run Command──→ run Document: AWS-RunPatchBaseline
         │
  SSM Agent query for Patch Baselines
         │
  Patch Baselines:
  ┌──────────────────────────────────────────────┐
  │ Baseline ID              │ Patch Group │ Default │
  │ pb-0123456789abcdef0     │ Default     │ Yes     │
  │ pb-9876543210abcdef0     │ Dev         │ No      │
  └──────────────────────────────────────────────┘
  
  Instances ที่มี Patch Group=Dev → ใช้ pb-9876543210abcdef0
  Instances ที่ไม่มี Patch Group  → ใช้ pb-0123456789abcdef0 (Default)
  
  เมื่อใช้ Maintenance Windows ใช้ Rate Control
  เพื่อกำหนดจำนวน/เปอร์เซ็นต์สูงสุดที่รันพร้อมกัน
```

---

## SSM — Maintenance Windows

- กำหนดตารางเวลาเมื่อจะทำ actions บน instances
- ตัวอย่าง: OS patching, อัพเดต drivers, ติดตั้ง software, ...
- Maintenance Window ประกอบด้วย:
  - Schedule (ตารางเวลา)
  - Duration (ระยะเวลา)
  - Set of registered instances (ชุด instances ที่ลงทะเบียน)
  - Set of registered tasks (ชุด tasks ที่ลงทะเบียน)

---

## SSM — Session Manager

```
   User ──IAM Permissions──→ Session Manager
                                    │
                              Execute commands
                                    │
                                    ▼
                             EC2 Instance
                             (SSM Agent)
                                    │
                         ┌──────────┼──────────┐
                         ▼                     ▼
                    CloudWatch Logs         Amazon S3
                    (session log data)    (session log data)
```

- เปิด secure shell บน EC2 และ on-premises servers
- เข้าถึงผ่าน AWS Console, AWS CLI, หรือ Session Manager SDK
- **ไม่ต้องใช้ SSH access, bastion hosts, หรือ SSH keys**
- รองรับ Linux, macOS, และ Windows
- บันทึก connections และ executed commands
- Session log data ส่งไป S3 หรือ CloudWatch Logs
- CloudTrail บันทึก StartSession events

---

## SSH vs. SSM Session Manager

| | SSH | SSM Session Manager |
|---|-----|---------------------|
| Security Group | ต้องเปิดพอร์ต 22, ระบุ source IP | ไม่ต้องเปิด Inbound port ใดเลย |
| Authentication | SSH Key Pair | IAM Permissions |
| ข้อกำหนด | Public IP | IAM Instance Profile: AmazonSSMManagedInstanceCore |
| Session Logging | ไม่มี built-in | CloudWatch Logs + Amazon S3 |
| เครื่องมือ | SSH client | AWS Console, CLI, SDK |

---

## SSM — Distributor

```
                    Distributor
                        │
                   ┌────┴────┐
                   ▼         ▼
              Run Command  State Manager
              (one-time)   (on a schedule)
                   │         │
                   ▼         ▼
              EC2 Instance
              (install Package)
```

- Package และ deploy software ไปยัง managed instances
- สร้าง Distributor Package (SSM Document) แล้ว deploy ไปยัง platforms ต่างกัน (Windows, Linux)
- **Distributor Package:**
  - Contents เก็บใน S3
  - Zip file ต่อ target OS platform (install script, uninstall script, executable file)
  - JSON manifest file ที่อธิบาย package content
- ใช้ AWS-provided packages, 3rd party packages, หรือสร้าง package เอง
- ติดตั้ง package:
  - **ครั้งเดียว** — ใช้ Run Command
  - **ตามตาราง** — ใช้ State Manager (Document: AWS-ConfigureAWSPackage)

---

## Systems Manager — OpsCenter

```
  CloudWatch & Application Insights ──┐
  EventBridge ─────────────────────────┤
  Config ──────────────────────────────┤──trigger──→ OpsCenter
  SSM Incident Manager ───────────────┤
  DevOps Guru ─────────────────────────┤
  Security Hub ────────────────────────┤
  SNS ─────────────────────────────────┘
```

- ดู, สืบสวน, และแก้ไขปัญหาในที่เดียว (ไม่ต้อง navigate ข้าม AWS services)
- ปัญหา security (Security Hub), ปัญหา performance (DynamoDB throttle), failures (ASG failed launch instance)...
- ลดเวลาแก้ไขปัญหา
- **OpsItems:** ปัญหา operational ที่ต้องสืบสวนและแก้ไข
  - Event, resource, AWS Config changes, CloudTrail logs, EventBridge...
  - แนะนำ Runbooks เพื่อแก้ไขปัญหา
- รองรับทั้ง EC2 instances และ on-premises managed nodes

---

## OpsCenter — ลดค่าใช้จ่ายโดยลบ Orphaned EBS Volumes

```
  EventBridge ──invoke──→ Lambda Function (periodically)
                               │
                    list EBS volumes &
                    search for aged EBS volumes
                               │
                               ▼
                          OpsCenter
                    create OpsItems
                    (EBS Volumes older than 45 days)
                               │
                               ▼
                          Automation
                    Run Document:
                    AWS-CreateSnapshot
                    or Delete Snapshot
                               │
                               ▼
                          Amazon EC2
```

---

> **จบส่วนที่ 1** — ต่อส่วนที่ 2: High Availability & Scalability, CloudFormation, Lambda
