# AWS CloudOps SOA-C03 — ส่วนที่ 4
## Advanced Storage Solutions / CloudFront / Databases

---

# Advanced Storage Solutions

---

## Amazon FSx — ภาพรวม

Launch 3rd party high-performance file systems บน AWS (fully managed):

| FSx Type | Protocol | กรณีใช้งาน |
|----------|----------|------------|
| FSx for Windows File Server | SMB, NTFS | Windows file shares, Active Directory |
| FSx for Lustre | POSIX | HPC, ML, Video Processing |
| FSx for NetApp ONTAP | NFS, SMB, iSCSI | ย้าย NAS workloads มา AWS |
| FSx for OpenZFS | NFS v3/v4 | ย้าย ZFS workloads มา AWS |

---

## FSx for Windows File Server
- SMB protocol & Windows NTFS, Active Directory integration
- Mount บน Linux EC2 ได้, รองรับ DFS Namespaces
- Scale ถึง 10s GB/s, millions IOPS, 100s PB
- Storage: SSD (latency sensitive) หรือ HDD (broad spectrum)
- เข้าถึงจาก on-premises (VPN/Direct Connect)
- Multi-AZ ได้, backup รายวันไป S3

## FSx for Lustre
- Parallel distributed file system สำหรับ large-scale computing
- ML, HPC, Video Processing, Financial Modeling
- Scale ถึง 100s GB/s, millions IOPS, sub-ms latencies
- ผสานกับ S3: "อ่าน S3" เป็น file system, เขียน output กลับ S3
- **Scratch:** ชั่วคราว, ไม่ replicate, burst สูง (6x, 200MBps/TiB)
- **Persistent:** ระยะยาว, replicate ใน AZ เดียว, replace failed files ภายในนาที

## FSx for SysOps:
- Windows Single-AZ: replicate ใน AZ (2 generations)
- Windows Multi-AZ: replicate ข้าม AZ (synchronous), standby + automatic failover

---

## Hybrid Cloud Storage

### AWS Storage Cloud Native Options:
| Block | File | Object |
|-------|------|--------|
| Amazon EBS, EC2 Instance Store | Amazon EFS, Amazon FSx | Amazon S3, Amazon Glacier |

---

## AWS Storage Gateway

- สะพานระหว่าง on-premises data กับ cloud data
- กรณีใช้งาน: disaster recovery, backup & restore, tiered storage, on-premises cache

| ประเภท | Protocol | Backend | คำอธิบาย |
|--------|----------|---------|----------|
| S3 File Gateway | NFS, SMB | S3 (Standard, IA, One Zone IA, Intelligent Tiering) → Glacier via Lifecycle | cache ข้อมูลล่าสุด, AD integration |
| Volume Gateway | iSCSI | S3 → EBS Snapshots | Cached volumes (ล่าสุดเท่านั้น) หรือ Stored volumes (ทั้งหมดบน-premise) |
| Tape Gateway | iSCSI | S3 + Glacier | Virtual Tape Library สำหรับ backup ด้วย tape |

### SysOps Notes:
- File Gateway เป็น POSIX compliant
- Reboot File Gateway: restart VM ได้เลย
- Reboot Volume/Tape Gateway: Stop service → Reboot VM → Start service
- Activation: ต้องเปิดพอร์ต 80 + sync เวลากับ NTP server

---

# Amazon CloudFront

---

## Amazon CloudFront

- Content Delivery Network (CDN)
- Cache เนื้อหาที่ edge locations ทั่วโลก (100+ Points of Presence)
- ปรับปรุง read performance, user experience
- ป้องกัน DDoS (Shield, WAF)

### Origins:
- **S3 bucket:** distributing files, uploading files, ป้องกันด้วย OAC (Origin Access Control)
- **VPC Origin:** Private ALB/NLB/EC2 ใน VPC private subnets
- **Custom Origin (HTTP):** S3 website, public HTTP backend

---

## CloudFront Caching

- Cache อยู่ที่ edge location, ระบุด้วย **Cache Key**
- เพิ่ม Cache Hit ratio → ลด requests ไป origin
- Invalidate cache ด้วย CreateInvalidation API (`/*` ทั้งหมด หรือ `/images/*`)

### Cache Policy:
- Cache ตาม: HTTP Headers, Cookies, Query Strings
- ควบคุม TTL (0 วินาที ถึง 1 ปี)
- สร้าง policy เอง หรือใช้ Predefined Managed Policies

---

## CloudFront — Origin Shield

- Extra caching layer ระหว่าง Regional Edge Location กับ Origin
- ลด load ที่ origin, รวม requests สำหรับ object เดียวกัน

---

## CloudFront vs S3 Cross Region Replication

| CloudFront | S3 CRR |
|-----------|--------|
| Global Edge network | ต้องตั้งค่าแต่ละ Region |
| Cache ตาม TTL | อัพเดตเกือบ real-time |
| เหมาะกับ static content ทุกที่ | Read only, เหมาะกับ dynamic content ใน Region เฉพาะ |

---

## CloudFront — ALB/EC2 as Origin

### VPC Origins (ใหม่):
- ส่ง traffic ไป private: ALB, NLB, EC2 Instances ใน VPC private subnets
- ไม่ต้อง expose บน Internet

### Public Network:
- ALB ต้องเป็น Public, EC2 ต้องเป็น Public
- Security Groups ต้อง allow Public IPs ของ Edge Locations

---

## CloudFront — Features สำคัญ

- **Geo Restriction:** Allowlist/Blocklist ตามประเทศ (ใช้ Geo-IP database)
- **Access Logs:** log ทุก request ไป S3 (หรือ CloudWatch Logs, Kinesis Data Firehose)
- **Reports:** Cache Statistics, Popular Objects, Top Referrers, Usage, Viewers
- **Troubleshooting:** cache 4xx/5xx errors, 403=ไม่มีสิทธิ์, 404=ไม่พบ, 5xx=gateway issues
- **ALB Sticky Sessions:** forward/whitelist AWSALB cookie, ตั้ง TTL น้อยกว่า auth cookie expiry

---

## AWS Global Accelerator

- ใช้ AWS internal network route traffic ไปแอป
- 2 **Anycast IP** สำหรับแอป → traffic ไป Edge Locations → ไปแอป
- ทำงานกับ Elastic IP, EC2, ALB, NLB (public/private)
- Consistent Performance, health checks, failover <1 นาที
- DDoS protection ด้วย AWS Shield

### CloudFront vs Global Accelerator:
- **CloudFront:** cacheable + dynamic content, content served at edge
- **Global Accelerator:** TCP/UDP wide range, proxy packets at edge, static IP, non-HTTP (gaming/IoT/VoIP), fast regional failover

---

# Databases ใน AWS

---

## Amazon RDS ภาพรวม

- Managed Relational Database Service: Postgres, MySQL, MariaDB, Oracle, SQL Server, IBM DB2, Aurora
- Auto provisioning, OS patching, continuous backups (PITR), monitoring dashboards
- Read replicas, Multi AZ, scaling, storage backed by EBS
- **ไม่สามารถ SSH เข้า instances**

---

## RDS — Storage Auto Scaling

- เพิ่ม storage อัตโนมัติเมื่อใกล้เต็ม
- ตั้ง **Maximum Storage Threshold**
- Auto modify ถ้า: free storage <10%, low-storage ≥5 นาที, ≥6 ชม. หลัง modification ล่าสุด

---

## RDS — Read Replicas

- สูงสุด 15 Read Replicas (within AZ, Cross AZ, Cross Region)
- Replication แบบ **ASYNC** → reads เป็น eventually consistent
- Promote replica เป็น DB อิสระได้
- ใช้สำหรับ **SELECT** เท่านั้น (ไม่ใช่ INSERT/UPDATE/DELETE)
- **Network Cost:** Cross-Region เสียค่า, Same Region ไม่เสีย

---

## RDS — Multi AZ (Disaster Recovery)

- **SYNC** replication
- DNS name เดียว → automatic failover ไป standby
- เพิ่ม availability, ไม่ใช่สำหรับ scaling
- Failover เมื่อ: primary failed, OS patching, network loss, instance type changed, AZ outage, manual reboot with failover

### เปลี่ยนจาก Single-AZ เป็น Multi-AZ:
- **Zero downtime** (ไม่ต้องหยุด DB)
- คลิก "modify" → snapshot → restore ไป AZ ใหม่ → sync

---

## RDS — Backup vs Snapshots

| | Backups | Snapshots |
|---|---------|-----------|
| ลักษณะ | Continuous, PITR | จุดเวลาเดียว |
| Retention | 0-35 วัน | ไม่หมดอายุ (manual) |
| ผลกระทบ | ระหว่าง maintenance window | IO operations หยุด DB ชั่วคราว (Multi AZ ไม่กระทบ master) |
| แชร์ได้ | ไม่ได้ (automated) | ได้ (manual) |
| Restore | สร้าง DB Instance ใหม่ | สร้าง DB Instance ใหม่ |

### Snapshot Sharing with KMS:
- แชร์ unencrypted หรือ encrypted ด้วย customer managed key
- ถ้า encrypted ต้องแชร์ KMS key + IAM Permissions

---

## RDS — Events & Monitoring

- **RDS Events:** DB instances, snapshots, parameter groups, security groups
- **Event Subscriptions:** subscribe ผ่าน SNS (source + category)
- **RDS delivers events ไป EventBridge**

### CloudWatch Metrics:
- DatabaseConnections, SwapUsage, ReadIOPS/WriteIOPS, ReadLatency/WriteLatency, ReadThroughPut/WriteThroughPut, DiskQueueDepth, FreeStorageSpace
- **Enhanced Monitoring:** จาก agent บน DB instance, 50+ CPU/memory/disk I/O metrics

### RDS Performance Insights:
- วิเคราะห์ database performance
- กรองตาม: Waits (bottleneck), SQL statements, Hosts, Users
- DBLoad = จำนวน active sessions

---

## Amazon Aurora

- AWS proprietary (รองรับ MySQL & PostgreSQL drivers)
- เร็วกว่า MySQL 5x, PostgreSQL 3x บน RDS
- Storage เพิ่มอัตโนมัติ 10GB ถึง **256 TB**
- สูงสุด 15 replicas (replication <10 ms lag)
- Failover ทันที, HA native, แพงกว่า RDS 20%

### High Availability:
- **6 copies ข้าม 3 AZ** (4/6 สำหรับ writes, 3/6 สำหรับ reads)
- Self healing, storage striped ข้าม 100s volumes
- Automated failover <30 วินาที

### Endpoints:
- **Writer Endpoint:** ชี้ไป master
- **Reader Endpoint:** connection load balancing ข้าม read replicas

### Features:
- Automatic fail-over, backup, isolation, compliance, push-button scaling, zero downtime patching
- **Backtrack:** restore data ณ จุดเวลาใดก็ได้โดยไม่ใช้ backups (in-place, สูงสุด 72 ชม., MySQL เท่านั้น)
- **Database Cloning:** copy-on-write protocol, เหมาะสำหรับ test environment

### Aurora Serverless:
- Auto database instantiation + auto-scaling ตามใช้จริง
- ไม่ต้อง capacity planning, จ่ายต่อวินาที

### Aurora Global Database:
- 1 Primary Region (read/write) + สูงสุด 10 secondary regions (read-only)
- Replication lag <1 วินาที, 16 Read Replicas ต่อ secondary region
- Promote region: RTO <1 นาที

### Aurora CloudWatch Metrics:
- AuroraReplicaLag / LagMaximum / LagMinimum
- DatabaseConnections, InsertLatency

---

## Amazon RDS Proxy

- Fully managed database proxy
- Pool + share DB connections → ลด stress บน DB (CPU, RAM), ลด open connections
- Serverless, autoscaling, highly available (multi-AZ)
- ลด RDS & Aurora failover time **66%**
- รองรับ RDS (MySQL, PostgreSQL, MariaDB, MS SQL Server) + Aurora
- บังคับ **IAM Authentication**, เก็บ credentials ใน Secrets Manager
- **ไม่เข้าถึงจาก public ได้** (ต้องจาก VPC)

---

## Amazon ElastiCache

- Managed Redis หรือ Memcached (in-memory databases)
- ลด load จาก databases สำหรับ read intensive workloads
- ทำแอป stateless

### Redis vs Memcached:
| | Redis | Memcached |
|---|-------|-----------|
| Multi AZ | ✅ Auto-Failover | ❌ |
| Read Replicas | ✅ | ❌ |
| Persistence | ✅ AOF | ❌ |
| Backup/Restore | ✅ | ✅ (Serverless) |
| Data Structures | Sets, Sorted Sets | ❌ |
| Threading | Single | Multi-threaded |
| Sharding | Cluster Mode | ✅ |

### Redis Scaling:
- **Cluster Mode Disabled:** Horizontal (เพิ่ม/ลบ read replicas สูงสุด 5), Vertical (เปลี่ยน node type)
- **Cluster Mode Enabled:** Resharding (เพิ่ม/ลบ shards), Shard Rebalancing, Online/Offline Scaling

### Metrics สำคัญ (ทั้ง Redis & Memcached):
| Metric | คำอธิบาย | แก้ไข |
|--------|----------|-------|
| Evictions | items ถูกลบเพื่อให้พื้นที่ (memory เต็ม) | eviction policy, scale up/out |
| CPUUtilization | CPU ของ host | scale up/out |
| SwapUsage | ไม่ควรเกิน 50 MB | ตรวจ reserved memory |
| CurrConnections | concurrent connections | ตรวจ application behavior |

---

> **จบส่วนที่ 4** — ต่อส่วนที่ 5: Monitoring, Audit, Performance, Account Management
