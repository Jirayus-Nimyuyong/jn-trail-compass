# Amazon RDS

**Amazon RDS (Relational Database Service)** คือบริการฐานข้อมูลแบบ **Managed** ที่ออกแบบมาสำหรับฐานข้อมูลที่ใช้ **SQL** เป็นภาษาคำสั่งในการสอบถามข้อมูล (Query Language)

* SQL เป็นภาษาที่มีโครงสร้างและใช้กันอย่างแพร่หลายในหลายระบบฐานข้อมูล
* ด้วย Amazon RDS คุณสามารถสร้างฐานข้อมูลใน **Cloud** ที่ **AWS บริหารจัดการให้ทั้งหมด** ซึ่งมีข้อดีหลายประการ

## **Database Engines ที่รองรับ**

Amazon RDS รองรับฐานข้อมูลหลายชนิด เช่น:

* PostgreSQL
* MySQL
* MariaDB
* Oracle
* Microsoft SQL Server
* IBM DB2
* Aurora (ฐานข้อมูลเฉพาะของ AWS ที่จะศึกษาเชิงลึกต่อไป)

## **ทำไมควรใช้ RDS แทนการจัดการฐานข้อมูลเอง**

แม้ว่าคุณสามารถติดตั้งฐานข้อมูลบน EC2 เองได้ แต่ Amazon RDS มีข้อดีดังนี้:

* **Provisioning อัตโนมัติ** ของฐานข้อมูล
* **Patch ระบบปฏิบัติการอัตโนมัติ**
* **สำรองข้อมูลต่อเนื่อง (Continuous Backup)** และสามารถกู้คืนไปยังเวลาใดก็ได้ (**Point in Time Restore**)
* **Monitoring Dashboard** สำหรับตรวจสอบประสิทธิภาพฐานข้อมูล
* **Read Replicas** เพื่อเพิ่มประสิทธิภาพการอ่าน
* **Multi-AZ Deployment** สำหรับ Disaster Recovery
* **Maintenance Windows** สำหรับอัปเกรดฐานข้อมูล
* **Scaling** ทั้งแนวตั้ง (เพิ่ม instance type) และแนวนอน (เพิ่ม read replicas)
* **Storage** ใช้ Elastic Block Store (EBS)

> ข้อจำกัด: ไม่สามารถ SSH เข้าไปยัง RDS instance ได้ เพราะ AWS บริหารจัดการ infrastructure ให้แล้ว ซึ่งเป็นข้อดีเพราะไม่ต้องจัดการ EC2 เอง

## **RDS Storage Auto Scaling**

ฟีเจอร์สำคัญของ Amazon RDS คือ **Storage Auto Scaling**

* เมื่อสร้างฐานข้อมูล RDS จะระบุ **ขนาด Storage เริ่มต้น** เช่น 20 GB
* หากฐานข้อมูลใกล้เต็ม Storage → RDS สามารถ **เพิ่มขนาด Storage อัตโนมัติ** โดยไม่ต้องทำเองและไม่มี Downtime
* เหมาะกับแอปพลิเคชันที่มี **Workload ไม่แน่นอน**

**เงื่อนไขการทำงานของ Storage Auto Scaling**:

1. Free storage น้อยกว่า 10% ของ allocated storage
2. สถานะ low storage คงอยู่ **มากกว่า 5 นาที**
3. ผ่านไปอย่างน้อย **6 ชั่วโมงหลังการแก้ไข storage ครั้งล่าสุด**

* รองรับทุก Database Engine ของ Amazon RDS

### **สรุป**

Amazon RDS คือ **Managed Relational Database Service** ที่มีการอัตโนมัติในด้าน:

* การสร้างฐานข้อมูล (Provisioning)
* การบำรุงรักษาและ Patch
* การสำรองข้อมูลและกู้คืน
* การปรับขนาด Storage และ Scaling

> แม้จะไม่สามารถเข้าถึง Instance โดยตรง แต่ความเป็น Managed ของ RDS ทำให้การใช้งานและดูแลฐานข้อมูลง่ายและสะดวกขึ้นมาก

## **RDS Read Replicas vs Multi-AZ**

การเข้าใจความแตกต่างระหว่าง **Read Replicas** และ **Multi-AZ** เป็นเรื่องสำคัญ โดยเฉพาะสำหรับการสอบ AWS

### **RDS Read Replicas**

* Read Replicas ใช้เพื่อ **เพิ่มประสิทธิภาพการอ่านข้อมูล** (scale read operations)

* ตัวอย่าง: แอปเชื่อมต่อ RDS instance หลักเพื่ออ่านและเขียน เมื่อโหลดสูง → สามารถสร้าง **Read Replicas ได้สูงสุด 15 ตัว**

* Deployment options:

  * ใน **Availability Zone เดียวกัน**
  * ข้าม **Availability Zones**
  * ข้าม **Regions**

* การทำ replication เป็น **แบบ asynchronous** → ข้อมูลไม่อัปเดตทันที เรียกว่า **eventually consistent**

* Read Replicas สามารถ **promote** ให้เป็น **standalone database** เพื่อรองรับ write ได้

**Use Case**:

* หากต้องการทำ reporting หรือ analytics โดยไม่กระทบ production → สร้าง Read Replica สำหรับงานเหล่านี้
* **ข้อจำกัด:** ใช้เฉพาะ **SELECT** (อ่าน) ไม่สามารถ INSERT, UPDATE, DELETE ได้

**ค่าใช้จ่าย Network:**

* ข้าม AZ ใน region เดียวกัน → replication ฟรี
* ข้าม Region → มีค่าใช้จ่าย network

### **RDS Multi-AZ**

* ใช้เพื่อ **disaster recovery**
* แอปเชื่อมต่อ **Master database** ใน AZ A → synchronous replication ไปยัง **standby instance** ใน AZ B
* **ทุกการเขียนต้อง replicate ไปยัง standby ก่อนจึงยอมรับ**
* ใช้ **DNS ชื่อเดียว** → หาก Master fail → auto failover ไปยัง standby
* **ข้อจำกัด:** ไม่ใช้เพื่อเพิ่มการอ่าน (อ่านไม่ได้จาก standby)

### **การรวม Read Replicas กับ Multi-AZ**

* สามารถสร้าง Read Replicas และตั้งค่า Multi-AZ เพื่อ disaster recovery ได้
* การแปลงจาก **Single AZ → Multi AZ** เป็น **zero downtime**:

  * RDS จะ snapshot master → restore เป็น standby → establish synchronization
  * แอปยังคงทำงานระหว่าง process

### **Key Takeaways: RDS**

* Read Replicas → เพิ่มการอ่าน, asynchronous replication, สูงสุด 15 replicas, สามารถ promote เป็น standalone
* Multi-AZ → synchronous replication, automatic failover, เพิ่ม availability แต่ไม่เพิ่ม read capacity
* Single AZ → Multi-AZ เป็น zero downtime operation

## **Amazon Aurora**

### **แนะนำ Amazon Aurora**

* Aurora เป็น **ฐานข้อมูลเฉพาะของ AWS** (proprietary)
* **Compatible** กับ PostgreSQL และ MySQL → ใช้ driver เดียวกัน
* **ประสิทธิภาพสูง:**

  * เร็วกว่า MySQL RDS ประมาณ 5 เท่า
  * เร็วกว่า PostgreSQL RDS ประมาณ 3 เท่า

### **Storage Auto-Scaling**

* เริ่มที่ **10GB → ขยายได้สูงสุด 128TB**
* ไม่ต้องคอย monitor disk เอง

### **High Availability & Read Scaling**

* Aurora เก็บ **6 copies ของข้อมูล** ใน **3 AZs**
* **Writes:** ต้องใช้ 4/6 copies → หาก AZ ใดล่ม write ยังทำงานได้
* **Reads:** ต้องใช้ 3/6 copies → high availability
* **Self-healing:** ซ่อมแซมข้อมูลเสียผ่าน peer-to-peer replication

### **Aurora Architecture**

* **Master instance** → handle writes
* **Failover** < 30 วินาที
* **Read replicas** สูงสุด 15 ตัว → รองรับ scaling reads และ cross-region replication
* **Writer endpoint** → DNS name ชี้ไปยัง master
* **Reader endpoint** → load balance การเชื่อมต่อ read replicas

### **คุณสมบัติสำคัญ**

* Writer endpoint → seamless write operations
* Reader endpoint → connection load balancing
* Auto scaling read replicas → match workload
* Shared storage auto-expands 10GB → 128TB
* High availability & self-healing

**Additional Features:**

* Automatic failover, backup & recovery, security & compliance, auto patching, advanced monitoring
* **Backtrack:** restore ข้อมูลไปยังจุดเวลาใดก็ได้โดยไม่ต้องใช้ backup แบบเดิม

### **Key Takeaways: Aurora**

* Aurora → cloud-optimized, proprietary, compatible PostgreSQL/MySQL
* Storage auto grows 10GB → 128TB
* เก็บ 6 copies ใน 3 AZ → high availability & self-healing
* รองรับ read replicas สูงสุด 15 ตัว → fast replication & failover
* Writer & Reader endpoints → manage connections seamlessly

## **RDS และ Aurora – ความปลอดภัย**

### **แนะนำความปลอดภัยของ RDS และ Aurora**

บทเรียนนี้เป็นภาพรวมสั้น ๆ ของฟีเจอร์ด้านความปลอดภัยสำหรับฐานข้อมูล RDS และ Aurora

### **การเข้ารหัสข้อมูลขณะจัดเก็บ (Data Encryption at Rest)**

* สามารถเข้ารหัสข้อมูล **at-rest** บน RDS และ Aurora
* ข้อมูลจะถูกเข้ารหัสบน storage volume
* ทั้ง master database และ read replicas จะถูกเข้ารหัสโดยใช้ **AWS Key Management Service (KMS)**
* ต้องกำหนดการเข้ารหัส **ตั้งแต่สร้าง database ครั้งแรก**

**ข้อสำคัญ:**

* หาก master database ไม่ได้เข้ารหัสตั้งแต่เริ่ม → read replicas ก็ไม่สามารถเข้ารหัสได้
* การเข้ารหัสฐานข้อมูลที่ไม่เข้ารหัสแล้ว → ต้องทำ **snapshot** และ **restore snapshot เป็น encrypted database**

### **การเข้ารหัสข้อมูลระหว่างส่ง (Data Encryption in Transit)**

* RDS และ Aurora รองรับ **in-flight encryption** โดยค่าเริ่มต้น
* ข้อมูลที่ส่งระหว่าง client และ database จะถูกเข้ารหัส
* Clients ต้องใช้ **TLS root certificates** ของ AWS (ดาวน์โหลดจากเว็บไซต์ AWS)

### **วิธีการตรวจสอบสิทธิ์ฐานข้อมูล (Database Authentication Methods)**

* รองรับ **username + password** แบบดั้งเดิม
* รองรับ **IAM roles** สำหรับ AWS services

  * ตัวอย่าง: EC2 ที่มี IAM role สามารถ authenticate กับ database โดยไม่ต้องใช้ username/password
  * ช่วยบริหารจัดการความปลอดภัยแบบรวมศูนย์ผ่าน IAM

### **การควบคุมการเข้าถึงเครือข่าย (Network Access Control)**

* ใช้ **Security Groups** เพื่ออนุญาตหรือบล็อกพอร์ต, IP, หรือ security group อื่น ๆ
* จำกัดการเข้าถึง database อย่างเหมาะสม

### **ข้อจำกัดการเข้าถึงและ SSH**

* RDS และ Aurora **ไม่อนุญาต SSH access** เพราะเป็น managed services
* ยกเว้นใช้ **RDS Custom** ที่อาจให้การควบคุมมากขึ้น

### **Audit Logs**

* ใช้ตรวจสอบกิจกรรมฐานข้อมูล เช่น queries และ events
* Logs จะเก็บได้ระยะเวลาจำกัด
* หากต้องการเก็บระยะยาว → ส่ง logs ไปยัง **AWS CloudWatch Logs**

### **สรุป**

ฟีเจอร์ความปลอดภัยของ RDS และ Aurora ประกอบด้วย:

* การเข้ารหัสข้อมูลทั้ง at-rest และ in-transit
* วิธีการตรวจสอบสิทธิ์หลากหลาย
* การควบคุมการเข้าถึงเครือข่าย
* ความสามารถในการบันทึก Audit Logs และส่งต่อไป CloudWatch

### **Key Takeaways**

* **Data at-rest encryption** ใช้ KMS และต้องกำหนดตอนสร้าง database
* **In-flight encryption** เปิดโดยค่าเริ่มต้น → ต้องใช้ AWS TLS root certificates
* **Database authentication** รองรับทั้ง username/password และ IAM roles
* **Network access** ควบคุมผ่าน security groups
* **Audit logs** สามารถส่งไป CloudWatch Logs เพื่อเก็บระยะยาว

## **ภาพรวม Amazon RDS Proxy**

### **แนะนำ Amazon RDS Proxy**

Amazon RDS Proxy เป็น **database proxy แบบ fully managed** สำหรับ Amazon RDS ซึ่งสามารถใช้งานภายใน **Virtual Private Cloud (VPC)** ของคุณได้

แทนที่แต่ละแอปพลิเคชันจะเชื่อมต่อโดยตรงกับ RDS database instance แอปพลิเคชันจะเชื่อมต่อกับ **RDS Proxy**
Proxy จะ **pool และแชร์การเชื่อมต่อฐานข้อมูล** ที่สร้างขึ้นกับ database โดยรวมหลาย ๆ การเชื่อมต่อของแอปพลิเคชันให้เหลือการเชื่อมต่อกับฐานข้อมูลไม่กี่ตัว

วิธีนี้ช่วยให้ฐานข้อมูลทำงานมีประสิทธิภาพมากขึ้น ลดความกดดันต่อทรัพยากร เช่น CPU และ RAM ลดจำนวนการเชื่อมต่อที่เปิดค้าง และลดปัญหา timeout

### **คุณสมบัติของ RDS Proxy**

* **Serverless และ Auto-Scaling** ไม่ต้องจัดการ capacity เอง
* **Highly available** รองรับหลาย Availability Zones (AZs)
* **Failover Handling** ลดเวลา failover ได้ถึง **66%** สำหรับ RDS และ Aurora

  * ในระหว่างเหตุการณ์ failover เช่น การสลับจาก primary → standby instance
  * RDS Proxy จะจัดการ failover ให้โดยที่แอปพลิเคชันไม่ต้องรับรู้

### **Database Engines ที่รองรับ**

* MySQL
* PostgreSQL
* MariaDB
* Microsoft SQL Server
* Aurora (ทั้ง MySQL และ PostgreSQL)

> การใช้ RDS Proxy **ไม่ต้องแก้ไขโค้ดของแอปพลิเคชัน**
> เพียงเปลี่ยนจากเชื่อมต่อ RDS/Aurora โดยตรงเป็นเชื่อมต่อ **RDS Proxy endpoint**

### **การปรับปรุงความปลอดภัย**

* RDS Proxy สามารถ **บังคับใช้ IAM authentication** สำหรับการเชื่อมต่อ database

  * รับรองเฉพาะผู้ใช้ที่มีสิทธิ์เท่านั้น
  * Credentials ถูกจัดการอย่างปลอดภัยผ่าน **AWS Secrets Manager**
* RDS Proxy **ไม่สามารถเข้าถึงจากภายนอกอินเทอร์เน็ต**

  * เข้าถึงได้เฉพาะใน VPC ของคุณเท่านั้น → เพิ่มความปลอดภัย

### **กรณีใช้งาน: AWS Lambda Functions**

* Lambda สามารถสร้าง instance จำนวนมากเมื่อเกิด event → การเชื่อมต่อไปยัง RDS โดยตรงมากเกินไป → เกิด timeout และปัญหาประสิทธิภาพ
* ใช้ **RDS Proxy** → Lambda เชื่อมต่อกับ proxy แทน

  * Proxy จะ pool การเชื่อมต่อ → ลดจำนวนการเชื่อมต่อไปยัง database instance
  * แก้ปัญหา connection overload ได้

### **สรุป**

* RDS Proxy **pool และลดจำนวนการเชื่อมต่อ** ไปยัง RDS database instance
* ลดเวลา failover ได้ **สูงสุด 66%** โดยจัดการ failover แบบโปร่งใส
* บังคับใช้ **IAM authentication** และจัดเก็บ credentials อย่างปลอดภัยใน **Secrets Manager**
* เพิ่มความปลอดภัย → เข้าถึงได้เฉพาะภายใน VPC
* เหมาะสำหรับสถาปัตยกรรม serverless เช่น **AWS Lambda**


• RDS stands for Relational Database Service
• It’s a managed DB service for DB use SQL as a query language.
• It allows you to create databases in the cloud that are managed by AWS
• Postgres
• MySQL
• MariaDB
• Oracle
• Microsoft SQL Server
• IBM DB2
• Aurora (AWS Proprietary database)

Advantage over using RDS versus deploying
DB on EC2
• RDS is a managed service:
• Automated provisioning, OS patching
• Continuous backups and restore to specific timestamp (Point in Time Restore)!
• Monitoring dashboards
• Read replicas for improved read performance
• Multi AZ setup for DR (Disaster Recovery)
• Maintenance windows for upgrades
• Scaling capability (vertical and horizontal)
• Storage backed by EBS
• BUT you can’t SSH into your instances

RDS – Storage Auto Scaling
• Helps you increase storage on your RDS DB instance
dynamically
• When RDS detects you are running out of free database
storage, it scales automatically
• Avoid manually scaling your database storage
• You have to set Maximum Storage Threshold (maximum
limit for DB storage)
• Automatically modify storage if:
• Free storage is less than 10% of allocated storage
• Low-storage lasts at least 5 minutes
• 6 hours have passed since last modification
• Useful for applications with unpredictable workloads
• Supports all RDS database engines

RDS Read Replicas for read scalability
• Up to 15 Read Replicas
• Within AZ, Cross AZ or
Cross Region
• Replication is ASYNC,
so reads are eventually
consistent
• Replicas can be
promoted to their own
DB
• Applications must
update the connection
string to leverage read
replicas

RDS Read Replicas – Use Cases
• You have a production database
that is taking on normal load
• You want to run a reporting
application to run some analytics
• You create a Read Replica to run
the new workload there
• The production application is
unaffected
• Read replicas are used for SELECT
(=read) only kind of statements
(not INSERT, UPDATE, DELETE)

RDS Read Replicas – Network Cost
• In AWS there’s a network cost when data goes from one AZ to another
• For RDS Read Replicas within the same region, you don’t pay that fee

RDS Multi AZ (Disaster Recovery)
• SYNC replication
• One DNS name – automatic app
failover to standby
• Increase availability
• Failover in case of loss of AZ, loss of
network, instance or storage failure
• No manual intervention in apps
• Not used for scaling
• Note: The Read Replicas be setup as
Multi AZ for Disaster Recovery (DR)

RDS – From Single-AZ to Multi-AZ
• Zero downtime operation (no
need to stop the DB)
• Just click on “modify” for the
database
• The following happens internally:
• A snapshot is taken
• A new DB is restored from the
snapshot in a new AZ
• Synchronization is established
between the two databases

Amazon Aurora
• Aurora is a proprietary technology from AWS (not open sourced)
• Postgres and MySQL are both supported as Aurora DB (that means your
drivers will work as if Aurora was a Postgres or MySQL database)
• Aurora is “AWS cloud optimized” and claims 5x performance improvement
over MySQL on RDS, over 3x the performance of Postgres on RDS
• Aurora storage automatically grows in increments of 10GB, up to 128 TB.
• Aurora can have up to 15 replicas and the replication process is faster than
MySQL (sub 10 ms replica lag)
• Failover in Aurora is instantaneous. It’s HA (High Availability) native.
• Aurora costs more than RDS (20% more) – but is more efficient

Aurora High Availability and Read Scaling

• 6 copies of your data across 3 AZ:
• 4 copies out of 6 needed for writes
• 3 copies out of 6 need for reads
• Self healing with peer-to-peer replication
• Storage is striped across 100s of volumes
• One Aurora Instance takes writes (master)
• Automated failover for master in less than
30 seconds
• Master + up to 15 Aurora Read Replicas
serve reads
• Suppor t for Cross Region Replication

Aurora DB Cluster

Features of Aurora
• Automatic fail-over
• Backup and Recovery
• Isolation and security
• Industry compliance
• Push-button scaling
• Automated Patching with Zero Downtime
• Advanced Monitoring
• Routine Maintenance
• Backtrack: restore data at any point of time without using backups

RDS & Aurora Security
• At-rest encryption:
• Database master & replicas encryption using AWS KMS – must be defined as launch time
• If the master is not encrypted, the read replicas cannot be encrypted
• To encrypt an un-encrypted database, go through a DB snapshot & restore as encrypted
• In-flight encryption: TLS-ready by default, use the AWS TLS root certificates client-side
• IAM Authentication: IAM roles to connect to your database (instead of username/pw)
• Security Groups: Control Network access to your RDS / Aurora DB
• No SSH available except on RDS Custom
• Audit Logs can be enabled and sent to CloudWatch Logs for longer retention

Amazon RDS Proxy
• Fully managed database proxy for RDS
• Allows apps to pool and share DB connections
established with the database
• Improving database efficiency by reducing the
stress on database resources (e.g., CPU, RAM) and
minimize open connections (and timeouts)
• Serverless, autoscaling, highly available (multi-AZ)
• Reduced RDS & Aurora failover time by up 66%
• Supports RDS (MySQL, PostgreSQL, MariaDB, MS
SQL Server) and Aurora (MySQL, PostgreSQL)
• No code changes required for most apps
• Enforce IAM Authentication for DB, and securely
store credentials in AWS Secrets Manager
• RDS Proxy is never publicly accessible (must be
accessed from VPC)

---

---

---

---
