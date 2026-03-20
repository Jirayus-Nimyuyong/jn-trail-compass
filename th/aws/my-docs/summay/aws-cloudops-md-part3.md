# AWS CloudOps SOA-C03 — ส่วนที่ 3
## EC2 Storage & Data Management / Amazon S3 / S3 ขั้นสูง / S3 Security

---

# Amazon EC2 Storage & Data Management
## EBS, Instance Store & EFS

---

## EBS Volume คืออะไร?

- EBS (Elastic Block Store) Volume คือ **network drive** ที่ attach กับ instances ขณะทำงาน
- ข้อมูลคงอยู่แม้ terminate instance
- mount ได้กับ 1 instance ในเวลาเดียว (ระดับ CCP)
- ผูกกับ **AZ เฉพาะ** (ย้ายข้าม AZ ต้อง snapshot)
- เป็น network drive (ไม่ใช่ physical) → อาจมี latency เล็กน้อย
- Detach แล้ว attach กับ instance อื่นได้เร็ว
- Provisioned capacity (size GBs + IOPS) → จ่ายตาม provisioned ทั้งหมด
- เพิ่ม capacity ได้เรื่อยๆ

---

## ประเภท EBS Volume

| ประเภท | ชนิด | คำอธิบาย | Boot Volume |
|--------|------|----------|-------------|
| gp2/gp3 | SSD | General purpose, สมดุลราคา/ประสิทธิภาพ | ✅ |
| io1/io2 Block Express | SSD | ประสิทธิภาพสูงสุด, mission-critical | ✅ |
| st1 | HDD | ราคาถูก, throughput-intensive | ❌ |
| sc1 | HDD | ราคาถูกที่สุด, เข้าถึงไม่บ่อย | ❌ |

### General Purpose SSD (gp2/gp3):
- กรณีใช้งาน: System boot volumes, Virtual desktops, Dev/test
- 1 GiB - 16 TiB
- **gp3:** Baseline 3,000 IOPS + 125 MiB/s, เพิ่มได้ถึง 16,000 IOPS + 1000 MiB/s **แยกกัน**
- **gp2:** IOPS เชื่อมกับขนาด (3 IOPS/GiB), burst ถึง 3,000, สูงสุด 16,000 IOPS ที่ 5,334 GiB

### Provisioned IOPS SSD (io1/io2):
- กรณีใช้งาน: databases ที่ต้องการ >16,000 IOPS
- **io1:** Max 64,000 IOPS (Nitro) / 32,000 (อื่นๆ)
- **io2 Block Express:** Sub-millisecond latency, Max 256,000 IOPS, รองรับ Multi-attach

### Hard Disk Drives (HDD):
- ไม่ใช้เป็น boot volume ได้, 125 GiB - 16 TiB
- **st1:** Max throughput 500 MiB/s, 500 IOPS (Big Data, Log Processing)
- **sc1:** Max throughput 250 MiB/s, 250 IOPS (เข้าถึงไม่บ่อย, ราคาถูกที่สุด)

---

## EBS Snapshots

- Backup ของ EBS volume ณ จุดเวลาหนึ่ง
- แนะนำให้ detach volume แต่ไม่จำเป็น
- Copy snapshots ข้าม AZ หรือ Region ได้

### Features:
| Feature | คำอธิบาย |
|---------|----------|
| Snapshot Archive | ย้ายไป archive tier ถูกกว่า 75%, กู้คืน 24-72 ชม. |
| Recycle Bin | กู้คืน snapshot ที่ลบ (retention 1 วัน - 1 ปี) |
| Fast Snapshot Restore (FSR) | volume จาก snapshot initialized เต็มที่ทันที, เปิดใน AZ เฉพาะ (**แพงมาก $$$**) |

---

## Amazon Data Lifecycle Manager

- สร้าง, เก็บ, ลบ EBS snapshots และ EBS-backed AMIs อัตโนมัติ
- ตั้งตาราง backups, cross-account snapshot copies, ลบ outdated backups
- ใช้ **resource tags** เพื่อระบุทรัพยากร (EC2 instances, EBS volumes)
- ใช้ไม่ได้กับ snapshots/AMIs ที่สร้างนอก DLM
- ใช้ไม่ได้กับ instance-store backed AMIs

---

## Amazon EFS — Elastic File System

- Managed NFS ที่ mount ได้กับหลาย EC2 ข้ามหลาย AZ
- Highly available, scalable, แพง (3x gp2), จ่ายตามใช้จริง
- กรณีใช้งาน: content management, web serving, data sharing, WordPress
- ใช้ NFSv4.1 protocol
- ใช้ security group ควบคุมการเข้าถึง
- **เข้ากันได้กับ Linux เท่านั้น** (ไม่ใช่ Windows)
- Encryption at rest ด้วย KMS
- POSIX file system, standard file API
- File system scale อัตโนมัติ, ไม่ต้อง capacity planning

### Performance & Storage Classes:
- **Performance Mode:** General Purpose (ค่าเริ่มต้น, latency ต่ำ) หรือ Max I/O (throughput สูง, parallel)
- **Throughput Mode:** Bursting, Provisioned, Elastic (สูงสุด 3GiB/s reads, 1GiB/s writes)
- **Storage Tiers:** Standard → Infrequent Access (EFS-IA) → Archive (ถูกกว่า 50%)
- **Availability:** Standard (Multi-AZ) หรือ One Zone (ประหยัด >90%)

---

## EBS vs EFS

| | EBS | EFS |
|---|-----|-----|
| Instances | 1 instance (ยกเว้น multi-attach io1/io2) | 100+ instances ข้าม AZ |
| AZ | ผูกกับ AZ | ทำงานข้าม AZ |
| ย้ายข้าม AZ | Snapshot → Restore | Mount ได้ทั้งสอง AZ |
| OS | Windows + Linux | Linux เท่านั้น (POSIX) |
| ราคา | ตาม provisioned | จ่ายตามใช้จริง (แพงกว่า) |

---

# Amazon S3

---

## Amazon S3 — พื้นฐาน

- เก็บ objects (files) ใน "buckets" (directories)
- ชื่อ bucket ต้อง **globally unique** (ข้ามทุก regions ทุก accounts)
- Buckets สร้างใน region เฉพาะ

### Objects:
- มี **Key** (full path): `s3://my-bucket/my_folder1/another_folder/my_file.txt`
- Key = prefix + object name
- ไม่มี concept "directories" จริงๆ (แค่ keys ที่มี slashes)
- **Max Object Size: 5TB** (>5GB ต้องใช้ multi-part upload)
- Metadata, Tags (สูงสุด 10), Version ID

### กรณีใช้งาน:
Backup, Disaster Recovery, Archive, Hybrid Cloud storage, Application hosting, Media hosting, Data lakes, Software delivery, Static website

---

## Amazon S3 — Security

**User-Based:** IAM Policies

**Resource-Based:**
- Bucket Policies — bucket wide rules, cross-account
- Object ACL — finer grain (ปิดได้)
- Bucket ACL — less common (ปิดได้)

**เข้าถึงได้ถ้า:**
(IAM permissions ALLOW **หรือ** resource policy ALLOWS) **และ** ไม่มี explicit DENY

**Encryption:** encrypt objects ด้วย encryption keys

### Bucket Policies:
- JSON based: Resources, Effect (Allow/Deny), Actions, Principal
- ใช้สำหรับ: grant public access, force encryption at upload, cross-account access
- **Block Public Access:** ป้องกัน company data leaks, ตั้งได้ที่ระดับ account

### Advanced Bucket Policy Conditions:
- `aws:PrincipalOrgID` — จำกัดเฉพาะ accounts ใน AWS Organization
- `s3:x-amz-server-side-encryption` — ป้องกัน unencrypted uploads
- `NotIpAddress` — จำกัด IP addresses
- `MultiFactorAuthPresent` — ต้อง MFA

---

## Amazon S3 — Versioning

- เปิดที่ระดับ bucket
- Same key overwrite → เปลี่ยน version: 1, 2, 3...
- **Best practice** ให้เปิด versioning
- ป้องกันการลบโดยไม่ตั้งใจ, roll back ง่าย
- ไฟล์ที่ไม่ versioned ก่อนเปิด → version "null"
- หยุด versioning ไม่ลบ versions ก่อนหน้า

### Troubleshooting:
- เปิด Versioning ครั้งแรกต้อง **รอ 15 นาที** ก่อน fully propagated
- หลังเปิด Versioning อาจเจอ HTTP 404 NoSuchKey → รอ 15 นาทีก่อน write

---

## Amazon S3 — Replication (CRR & SRR)

- ต้องเปิด **Versioning** ทั้งต้นทางและปลายทาง
- **CRR** (Cross-Region Replication): compliance, lower latency, cross-account
- **SRR** (Same-Region Replication): log aggregation, live replication prod/test
- Buckets ข้ามบัญชีได้, copy แบบ **asynchronous**
- ต้องให้ IAM permissions ที่เหมาะสม

### หมายเหตุ:
- เฉพาะ **objects ใหม่** ที่ replicate (ใช้ S3 Batch Replication สำหรับ objects เดิม)
- Delete markers replicate ได้ (optional)
- Deletions with version ID **ไม่** replicate (ป้องกัน malicious deletes)
- **ไม่มี chaining:** bucket 1→2→3, objects ใน 1 ไม่ replicate ไป 3

### Cross-account Replication:
- ค่าเริ่มต้น: เจ้าของ source object เป็นเจ้าของ replica
- เปลี่ยนได้ด้วย owner override option + s3:ObjectOwnerOverrideToBucketOwner

### Replication Time Control (RTC):
- 99.99% ของ objects ใหม่ replicate ภายใน 15 นาที
- CloudWatch metrics สำหรับ monitoring
- มีค่าใช้จ่ายเพิ่ม

---

# Amazon S3 — ขั้นสูง

---

## S3 Storage Classes & Lifecycle Rules

### การย้ายระหว่าง Storage Classes:
```
Standard → Standard IA → Intelligent Tiering → One-Zone IA
    → Glacier Instant Retrieval → Glacier Flexible Retrieval → Glacier Deep Archive
```

### Lifecycle Rules:
- **Transition Actions:** ย้าย objects ไป class อื่น (เช่น Standard IA หลัง 60 วัน, Glacier หลัง 6 เดือน)
- **Expiration Actions:** ลบ objects (เช่น access logs หลัง 365 วัน, old versions, incomplete multi-part uploads)
- กำหนดได้ตาม prefix หรือ object Tags

### Lifecycle Rules Scenarios:
**Scenario 1:** Images thumbnails ที่สร้างใหม่ได้ เก็บ 60 วัน, source images เข้าถึงทันทีใน 60 วัน หลังจากนั้นรอ 6 ชม.
→ Source: Standard + transition ไป Glacier หลัง 60 วัน, Thumbnails: One-Zone IA + expire หลัง 60 วัน

**Scenario 2:** กู้คืน deleted objects ภายใน 30 วัน ทันที, หลัง 30-365 วัน กู้คืนภายใน 48 ชม.
→ เปิด Versioning, noncurrent versions → Standard IA → Glacier Deep Archive

---

## S3 Analytics — Storage Class Analysis

- ช่วยตัดสินใจเมื่อไหร่ควรย้าย objects ไป storage class ที่เหมาะสม
- แนะนำสำหรับ Standard และ Standard IA
- **ไม่ทำงาน** กับ One-Zone IA หรือ Glacier
- Report อัพเดตรายวัน, เริ่มเห็นข้อมูลใน 24-48 ชม.
- เป็นขั้นตอนแรกที่ดีในการสร้าง Lifecycle Rules

---

## S3 Event Notifications

- S3:ObjectCreated, S3:ObjectRemoved, S3:ObjectRestore, S3:Replication...
- กรอง Object name ได้ (*.jpg)
- ส่งไป: Lambda Function, SQS, SNS
- ต้องใช้ **Resource (Access) Policy** ที่เหมาะสม

### กับ Amazon EventBridge:
- ทุก events ส่งไป EventBridge
- Advanced filtering ด้วย JSON rules (metadata, object size, name...)
- 18+ AWS services เป็น destinations
- Archive, Replay Events, Reliable delivery

---

## S3 — Baseline Performance

- Amazon S3 scales อัตโนมัติถึง high request rates, latency 100-200 ms
- **3,500 PUT/COPY/POST/DELETE** หรือ **5,500 GET/HEAD** requests ต่อวินาทีต่อ prefix
- ไม่จำกัดจำนวน prefixes

### S3 Performance Optimizations:
| เทคนิค | คำอธิบาย |
|--------|----------|
| Multi-Part Upload | แนะนำ >100MB, บังคับ >5GB, parallelize uploads |
| S3 Transfer Acceleration | ส่งไฟล์ไป edge location → forward ไป S3 ผ่าน private AWS |
| S3 Byte-Range Fetches | parallelize GETs, ดาวน์โหลดบางส่วน |

---

## S3 Batch Operations

- ทำงานกับ S3 objects จำนวนมากด้วย single request
- ตัวอย่าง: modify metadata, copy objects, encrypt, modify ACLs/tags, restore จาก Glacier, invoke Lambda
- จัดการ retries, tracks progress, sends notifications, generate reports
- ใช้ **S3 Inventory** ดึงรายชื่อ objects + **Athena** กรอง

---

## S3 Inventory

- List objects และ metadata (ทางเลือกแทน S3 List API)
- ตัวอย่างใช้งาน: audit replication/encryption status, นับ objects, total storage ของ old versions
- สร้างรายงานรายวันหรือรายสัปดาห์
- Output: CSV, ORC, Apache Parquet
- Query ด้วย Athena, Redshift, Presto, Hive, Spark

---

## S3 Multi-Part Upload — Deep Dive

- Upload objects ขนาดใหญ่เป็นส่วนๆ (ลำดับใดก็ได้)
- แนะนำ >100MB, บังคับ >5GB
- สูงสุด 10,000 parts
- ล้มเหลว: restart เฉพาะ parts ที่ล้มเหลว
- ใช้ Lifecycle Policy ลบ parts ที่ไม่สำเร็จหลัง x วัน

---

## Amazon Athena

- Serverless query service วิเคราะห์ข้อมูลใน S3
- ใช้ SQL (Presto), รองรับ CSV, JSON, ORC, Avro, Parquet
- $5.00 ต่อ TB of data scanned
- ใช้กับ QuickSight สำหรับ dashboards
- กรณีใช้งาน: BI/analytics, วิเคราะห์ VPC Flow Logs, ELB Logs, CloudTrail trails

### Performance Improvement:
- ใช้ columnar data (Parquet/ORC) → ใช้ Glue แปลง
- Compress data
- Partition datasets ใน S3
- ใช้ไฟล์ใหญ่ (>128 MB)

---

# Amazon S3 — Security

---

## S3 MFA Delete

- ต้องใช้ MFA ก่อน: ลบ object version ถาวร, หยุด Versioning
- ไม่ต้องใช้ MFA สำหรับ: เปิด Versioning, list deleted versions
- ต้องเปิด Versioning ก่อน
- **เฉพาะ bucket owner (root account) เท่านั้น** ที่เปิด/ปิด MFA Delete

---

## S3 Access Logs

- บันทึกทุก request ไปยัง S3 bucket (ทุกบัญชี, authorized หรือ denied)
- log ไป S3 bucket อื่น (ต้องอยู่ใน Region เดียวกัน)
- ⚠️ **อย่าตั้ง logging bucket เป็น monitored bucket** (จะเกิด logging loop!)

---

## S3 Glacier Vault Lock

- WORM model (Write Once Read Many)
- สร้าง Vault Lock Policy → lock ไม่ให้แก้ไข/ลบอีก
- เหมาะสำหรับ compliance และ data retention

---

## S3 Object Lock (ต้องเปิด Versioning)

- WORM model: block object version deletion ตามเวลาที่กำหนด
- **Retention mode — Compliance:** ไม่มีใครแก้ไข/ลบ/เปลี่ยน retention ได้ แม้แต่ root user
- **Retention mode — Governance:** user ส่วนใหญ่ทำไม่ได้ แต่บาง users มีสิทธิ์พิเศษ
- **Retention Period:** ป้องกัน object ตามระยะเวลา (ขยายได้)
- **Legal Hold:** ป้องกันไม่มีกำหนด (ต้องมี s3:PutObjectLegalHold)

---

## VPC Gateway Endpoint สำหรับ S3

```
  VPC (DNS Support: Enabled)
  ┌──────────────────────────────┐
  │ Private Subnet               │
  │ ┌────────────────┐           │
  │ │EC2 Instance    │           │
  │ │Security Group  │           │
  │ │(Allow Outbound)│           │
  │ └───────┬────────┘           │
  │         │                    │
  │    VPC Gateway               │
  │    Endpoint for S3           │
  │         │                    │
  │    Route Table               │
  └─────────┼────────────────────┘
            │
            ▼
        Amazon S3
```

- ฟรี, เข้าถึงได้เฉพาะทรัพยากรใน VPC
- ต้องเปิด "DNS Support"
- ตรวจสอบ Outbound rules ของ SG อนุญาต traffic ไป S3

---

## VPC Interface Endpoint สำหรับ S3

- ENI(s) deploy ใน Subnets (Security Groups แนบกับ ENIs)
- เข้าถึงจาก on-premises (VPN หรือ Direct Connect) ได้
- ค่าใช้จ่าย $0.01/ชม./AZ
- ทั้ง "Enable DNS hostnames" และ "Enable DNS Support" ต้องเป็น 'true'

### Gateway vs Interface Endpoint:
- **Gateway** มักเป็นคำตอบในข้อสอบ (ฟรี)
- **Interface** ใช้เมื่อต้องเข้าจาก on-premises, VPC อื่น, หรือ Region อื่น

---

## IAM Access Analyzer สำหรับ S3

- ตรวจให้แน่ใจว่าเฉพาะคนที่ตั้งใจเท่านั้นที่เข้าถึง S3 buckets
- ตัวอย่าง: publicly accessible bucket, bucket แชร์กับบัญชีอื่น
- ประเมิน S3 Bucket Policies, S3 ACLs, S3 Access Point Policies
- ขับเคลื่อนโดย IAM Access Analyzer

---

> **จบส่วนที่ 3** — ต่อส่วนที่ 4: Advanced Storage, CloudFront, Databases
