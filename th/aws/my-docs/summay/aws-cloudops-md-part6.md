# AWS CloudOps SOA-C03 — ส่วนที่ 6
## Disaster Recovery / Security & Compliance / Identity

---

# Disaster Recovery

---

## AWS DataSync

- ย้ายข้อมูลจำนวนมากจาก/ไป:
  - **On-premises / cloud อื่น → AWS** (NFS, SMB, HDFS, S3 API) — ต้องมี agent
  - **AWS → AWS** (storage services ต่างกัน) — ไม่ต้องมี agent
- Sync ไป: S3 (ทุก storage classes รวม Glacier), EFS, FSx
- ตั้งเวลา replication: ชั่วโมง, วัน, สัปดาห์
- เก็บ **file permissions และ metadata** (NFS POSIX, SMB)
- 1 agent task ใช้ 10 Gbps, ตั้ง bandwidth limit ได้

---

## AWS Backup

- Fully managed, จัดการ backups จากส่วนกลางข้าม AWS services
- ไม่ต้องเขียน custom scripts

### Supported Services:
EC2, EBS, S3, RDS (ทุก engines), Aurora, DynamoDB, DocumentDB, Neptune, EFS, FSx (Lustre & Windows), Storage Gateway (Volume Gateway)

- Cross-region backups, Cross-account backups
- PITR สำหรับ supported services
- On-Demand และ Scheduled backups
- Tag-based backup policies

### Backup Plans:
- Backup frequency (ทุก 12 ชม., รายวัน, สัปดาห์, เดือน, cron)
- Backup window
- Transition to Cold Storage (Never, Days, Weeks, Months, Years)
- Retention Period (Always, Days, Weeks, Months, Years)

### Vault Lock:
- **WORM** (Write Once Read Many) สำหรับ backups ทั้งหมดใน vault
- ป้องกัน: malicious/inadvertent delete, shorten/alter retention periods
- **แม้แต่ root user ก็ลบ backups ไม่ได้**

---

# Security & Compliance

---

## AWS WAF — Web Application Firewall

- ป้องกัน web applications จาก common web exploits (**Layer 7 — HTTP**)
- Deploy บน: ALB, API Gateway, CloudFront, AppSync GraphQL API, Cognito User Pool

### Web ACL (Web Access Control List) Rules:
| Rule Type | คำอธิบาย |
|-----------|----------|
| IP Set | สูงสุด 10,000 IP addresses (ใช้หลาย Rules สำหรับมากกว่า) |
| HTTP headers/body/URI strings | ป้องกัน SQL injection, XSS |
| Size constraints | จำกัดขนาด |
| Geo-match | block ตามประเทศ |
| Rate-based rules | DDoS protection (นับ occurrences) |

- Web ACL เป็น **Regional** ยกเว้น CloudFront
- Rule group = ชุด rules ที่ reuse ได้

### WAF กับ NLB:
- WAF ไม่รองรับ NLB (Layer 4)
- วิธีแก้: ใช้ **Global Accelerator** (fixed IP) + WAF บน ALB

---

## AWS Shield

- ป้องกัน **DDoS** attacks

| | Shield Standard | Shield Advanced |
|---|----------------|-----------------|
| ค่าใช้จ่าย | ฟรี (ทุก AWS customer) | $3,000/เดือน/organization |
| ป้องกัน | SYN/UDP Floods, Reflection attacks, Layer 3/4 | sophisticated attacks บน EC2, ELB, CloudFront, Global Accelerator, Route 53 |
| เพิ่มเติม | — | 24/7 DRP team, ป้องกันค่าใช้จ่ายสูงจาก DDoS, automatic Layer 7 WAF rules |

---

## AWS Firewall Manager

- จัดการ rules ข้ามทุกบัญชีใน **AWS Organization**
- Security policy (common rules): WAF, Shield Advanced, Security Groups, Network Firewall, Route 53 Resolver DNS Firewall
- Policies สร้างที่ **region level**
- Rules apply กับทรัพยากรใหม่อัตโนมัติ (compliance)

### WAF vs Firewall Manager vs Shield:
- **WAF:** granular protection → ใช้ WAF อย่างเดียว
- **Firewall Manager:** WAF ข้ามบัญชี, automate protection → ใช้ Firewall Manager + WAF
- **Shield Advanced:** dedicated support (SRT), advanced reporting → ซื้อเพิ่มถ้าถูก DDoS บ่อย

---

## Amazon Inspector

- Automated Security Assessments
- **EC2 instances:** ใช้ SSM agent, วิเคราะห์ network accessibility + OS vulnerabilities
- **Container Images (ECR):** ประเมินขณะ push
- **Lambda Functions:** ตรวจ software vulnerabilities ใน code + package dependencies
- Continuous scanning, database ของ CVE
- **Risk score** สำหรับทุก vulnerabilities
- รายงานผสาน Security Hub, ส่ง findings ไป EventBridge

---

## Amazon GuardDuty

- Intelligent Threat discovery ด้วย **ML**, anomaly detection, 3rd party data
- เปิดด้วย 1 คลิก (30 วัน trial), ไม่ต้องติดตั้ง software

### Input data:
- CloudTrail Events Logs (unusual API calls, unauthorized deployments)
- CloudTrail Management Events + S3 Data Events
- VPC Flow Logs (unusual traffic, unusual IPs)
- DNS Logs (compromised EC2 sending encoded data via DNS)
- Optional: EKS Audit Logs, RDS & Aurora, EBS, Lambda, S3 Data Events

- ตั้ง EventBridge rules → Lambda/SNS
- ป้องกัน **CryptoCurrency attacks** (dedicated finding)

---

## Amazon Macie

- Fully managed data security/privacy service ด้วย **ML + pattern matching**
- ค้นหา sensitive data (PII) ใน S3
- แจ้งเตือนผ่าน EventBridge

---

## Trusted Advisor

- วิเคราะห์ AWS accounts ระดับสูง แนะนำใน **6 หมวด:**
  1. Cost optimization
  2. Performance
  3. Security
  4. Fault tolerance
  5. Service limits
  6. Operational Excellence
- Business & Enterprise Support: Full Set of Checks + API access
- ผสาน Security Hub, Config, Compute Optimizer
- **Organizational View:** ดู Trusted Advisor ข้ามทุกบัญชีใน Organization

---

## AWS Security Hub

- ศูนย์กลาง security management ข้ามหลายบัญชี
- รวม alerts จาก: Config, GuardDuty, Inspector, Macie, IAM Access Analyzer, SSM, Firewall Manager, Health, Partner solutions
- Integrated dashboards, automated checks
- ส่ง findings ไป EventBridge → Amazon Detective (investigate)
- **ต้องเปิด AWS Config ก่อน**
- ใช้กับ Organizations: designate Delegated Administrator

---

## AWS Audit Manager

- ประเมิน risk และ compliance ของ AWS workloads
- Prebuilt frameworks: CIS AWS Foundations, GDPR, HIPAA, PCI DSS, SOC 2
- สร้างรายงาน compliance + evidence folders
- Automated evidence collection ต่อเนื่อง

---

## Logging สำหรับ Security & Compliance

| Service Log | คำอธิบาย |
|-------------|----------|
| CloudTrail trails | trace API calls ทั้งหมด |
| Config Rules | config & compliance ตลอดเวลา |
| CloudWatch Logs | full data retention |
| VPC Flow Logs | IP traffic ใน VPC |
| ELB Access Logs | metadata ของ requests |
| CloudFront Logs | web distribution access logs |
| WAF Logs | requests ทั้งหมดที่ analyze |

- วิเคราะห์ด้วย **Athena** (ถ้าเก็บใน S3)
- Encrypt logs ใน S3, IAM & Bucket Policies, MFA
- ย้าย logs ไป Glacier เพื่อประหยัด

---

# AWS KMS (Key Management Service)

---

## KMS — ภาพรวม

- เมื่อไหร่ที่เห็น "encryption" สำหรับ AWS service = ส่วนใหญ่เป็น KMS
- AWS จัดการ encryption keys, ผสานกับ IAM, audit ด้วย CloudTrail
- ผสานกับ EBS, S3, RDS, SSM...
- **อย่าเก็บ secrets ใน plaintext!** → encrypt แล้วเก็บใน code/environment variables

### KMS Key Types:
| ประเภท | คำอธิบาย |
|--------|----------|
| Symmetric (AES-256) | key เดียว encrypt/decrypt, AWS services ใช้, ไม่เข้าถึง key ได้ (ต้องเรียก API) |
| Asymmetric (RSA & ECC) | Public + Private key pair, public key ดาวน์โหลดได้, ใช้ encrypt นอก AWS |

### KMS Key Pricing:
| ประเภท | ค่าใช้จ่าย |
|--------|-----------|
| AWS Owned (SSE-S3, SSE-SQS, SSE-DDB) | ฟรี |
| AWS Managed (aws/service-name) | ฟรี |
| Customer managed (สร้างใน KMS) | $1/เดือน |
| Customer managed (imported) | $1/เดือน |
| + API calls | $0.03/10,000 calls |

### Key Rotation:
| ประเภท | Rotation |
|--------|----------|
| AWS-managed | อัตโนมัติทุก 1 ปี |
| Customer-managed (auto) | 90-2560 วัน (ค่าเริ่มต้น 365) — backing key เปลี่ยน, Key ID เดิม |
| Customer-managed (on-demand) | ไม่ต้องเปิด auto rotation |
| Imported | manual เท่านั้น (ใช้ alias) — Key ID ใหม่ |

---

## KMS — Key Policies

- ควบคุมการเข้าถึง KMS keys (คล้าย S3 bucket policies)
- **ต่างกัน:** ควบคุมการเข้าถึงไม่ได้โดยไม่มี Key Policy
- **Default Key Policy:** full access ให้ root user = entire AWS account
- **Custom Key Policy:** กำหนด users/roles ที่เข้าถึง, ใครจัดการ key, cross-account access

---

## KMS — สำคัญสำหรับสอบ

### Copy Snapshots ข้าม Region:
- EBS Snapshot encrypted ด้วย KMS Key A (Region 1)
- Copy ไป Region 2: **ReEncrypt ด้วย KMS Key B** (Region 2)

### Copy Snapshots ข้ามบัญชี:
1. สร้าง Snapshot encrypted ด้วย Customer Managed Key
2. Attach KMS Key Policy อนุญาต cross-account access
3. แชร์ encrypted snapshot
4. (target) Copy snapshot, encrypt ด้วย CMK ของบัญชีตัวเอง
5. สร้าง volume จาก snapshot

### เปลี่ยน KMS Key ของ EBS Volume:
- **ทำโดยตรงไม่ได้** → สร้าง snapshot → สร้าง volume ใหม่ระบุ KMS key ใหม่

### KMS Key Deletion:
- ตั้งเวลาลบ: waiting period **7-30 วัน**
- สถานะ "Pending deletion" ระหว่างรอ
- ระหว่างรอ: ใช้ encrypt/decrypt ไม่ได้, ไม่ rotate, ยกเลิกการลบได้
- **ถ้าไม่แน่ใจ → disable แทน delete!**
- ใช้ CloudTrail + CloudWatch Logs + Alarm + SNS แจ้งเตือนเมื่อมีคนพยายามใช้ key ที่ pending deletion

### Multi-Region Keys:
- KMS keys เหมือนกันในหลาย AWS Regions (ใช้แทนกันได้)
- same key ID, key material, automatic rotation
- Encrypt ใน Region หนึ่ง, decrypt ใน Region อื่น (ไม่ต้อง re-encrypt)
- **ไม่ใช่ global** (Primary + Replicas, จัดการแยกกัน)

---

# AWS Certificate Manager (ACM)

---

## ACM

- จัดการ TLS Certificates (provision, manage, deploy)
- ให้ in-flight encryption (HTTPS)
- รองรับ public + private TLS certificates
- **Public TLS certificates ฟรี**, automatic renewal

### Integrations:
ELB (CLB, ALB, NLB), CloudFront, API Gateway
- **ใช้กับ EC2 ไม่ได้** (extract ไม่ได้)

### Requesting Public Certificates:
1. ระบุ domain names (FQDN หรือ Wildcard)
2. เลือก Validation: **DNS Validation** (แนะนำ, automation) หรือ Email Validation
3. ใช้เวลาหลายชั่วโมง verify
4. Auto renewal 60 วันก่อนหมดอายุ

### Importing Public Certificates:
- ไม่มี automatic renewal → ต้อง import certificate ใหม่ก่อนหมดอายุ
- ACM ส่ง daily expiration events **45 วัน** ก่อนหมดอายุ → EventBridge
- AWS Config rule: `acm-certificate-expiration-check`

### Integration กับ API Gateway:
- **Edge-Optimized:** TLS Certificate ต้องใน **us-east-1** (เหมือน CloudFront)
- **Regional:** TLS Certificate ต้องใน **Region เดียวกับ API Stage**

---

# AWS Secrets Manager

---

## Secrets Manager

- เก็บ secrets, **บังคับ rotation** ทุก X วัน
- Automate generation ของ secrets เมื่อ rotation (ใช้ Lambda)
- ผสานกับ RDS (MySQL, PostgreSQL, Aurora)
- Secrets encrypted ด้วย KMS
- **เหมาะสำหรับ RDS integration**

### Multi-Region Secrets:
- Replicate Secrets ข้ามหลาย AWS Regions
- Read replicas sync กับ primary Secret
- Promote read replica เป็น standalone Secret
- กรณีใช้งาน: multi-region apps, disaster recovery

### SSM Parameter Store vs Secrets Manager:
| | Secrets Manager ($$$) | SSM Parameter Store ($) |
|---|----------------------|------------------------|
| Rotation | อัตโนมัติด้วย Lambda (Lambda มีให้สำหรับ RDS/Redshift/DocumentDB) | ไม่มี (ตั้ง Lambda + EventBridge เอง) |
| KMS encryption | บังคับ | ทางเลือก |
| CloudFormation | ✅ | ✅ |
| ดึง Secrets Manager secret | — | ✅ ผ่าน SSM Parameter Store API |

### Monitoring:
- **CloudTrail** บันทึก API calls + non-API events (RotationStarted/Succeeded/Failed/Abandoned, Secret version delete events)
- ใช้กับ CloudWatch Logs + Alarms สำหรับ automations

---

# Identity

---

## IAM Permission Boundaries

- ใช้ managed policy กำหนด **สิทธิ์สูงสุด** ที่ IAM entity ได้รับ
- รองรับ users และ roles (ไม่ใช่ groups)
- ใช้ร่วมกับ AWS Organizations SCP ได้

```
  IAM Permission Boundary + IAM Permissions Through IAM Policy = Effective Permissions (intersection)
```

### กรณีใช้งาน:
- Delegate ให้ non-administrators สร้าง IAM users (ภายใน permission boundaries)
- Developers self-assign policies โดยไม่ escalate privileges
- จำกัด user เฉพาะ (แทนทั้ง account ด้วย SCP)

---

## IAM Security Tools

| Tool | ระดับ | คำอธิบาย |
|------|-------|----------|
| IAM Credentials Report | Account | รายงาน users ทั้งหมดและสถานะ credentials |
| IAM Access Advisor | User | แสดง service permissions ที่ granted และเข้าถึงล่าสุดเมื่อไหร่ |

---

## IAM Access Analyzer

- ค้นหา resources ที่แชร์กับภายนอก: S3 Buckets, IAM Roles, KMS Keys, Lambda Functions/Layers, SQS queues, Secrets Manager Secrets
- กำหนด **Zone of Trust** = AWS Account หรือ Organization
- เข้าถึงนอก zone of trust → **findings**

---

## Identity Federation

- ให้ users ภายนอก AWS ได้ temporary role สำหรับเข้าถึง AWS resources
- ใช้ 3rd party authentication: LDAP, Microsoft Active Directory (SAML), SSO, OpenID, Cognito
- **ไม่ต้องสร้าง IAM users** (user management อยู่นอก AWS)

### SAML Federation (Enterprises):
- ผสาน Active Directory / ADFS กับ AWS (SAML 2.0)
- เข้าถึง AWS Console หรือ CLI (temporary credentials)

### Custom Identity Broker (Enterprises):
- ใช้เมื่อ identity provider ไม่เข้ากับ SAML 2.0
- Identity broker กำหนด IAM policy ที่เหมาะสม

### AWS Cognito — Federated Identity Pools (Public Applications):
- ให้ direct access ไป AWS Resources จาก client side
- Login ไป federated identity provider (หรือ anonymous)
- ได้ temporary AWS credentials จาก Federated Identity Pool
- Credentials มี pre-defined IAM policy
- ตัวอย่าง: ให้ temporary access เขียนไป S3 bucket ด้วย Facebook Login

---

## AWS STS — Security Token Service

- ให้ limited, temporary access ไป AWS resources
- Token valid สูงสุด 1 ชั่วโมง (ต้อง refresh)

| API | คำอธิบาย |
|-----|----------|
| AssumeRole | ภายในบัญชีเดียว (enhanced security) หรือ cross-account |
| AssumeRoleWithSAML | credentials สำหรับ users logged ด้วย SAML |
| AssumeRoleWithWebIdentity | credentials สำหรับ users logged ด้วย IdP (แนะนำใช้ Cognito แทน) |
| GetSessionToken | สำหรับ MFA จาก user หรือ root account |

### Cross-Account Access:
1. สร้าง IAM Role ใน production account
2. ให้สิทธิ์ developers group ใน dev account assume role นั้น
3. Developer เรียก AssumeRole → ได้ temporary credentials → เข้าถึง production resources

---

## IAM Policy Simulator

- ทดสอบ IAM policies ก่อน apply ใน AWS environment จริง
- ทำงานกับ: Identity-based Policies, Resource-based Policies, Permission Boundaries, SCPs
- กรณีใช้งาน: ทดสอบ policies ของ User/Group/Role, ทดสอบผลกระทบของ Resource-based Policy, ทดสอบ impact ของ SCP

---

> **จบส่วนที่ 6** — ต่อส่วนที่ 7: Route 53, VPC, Other Services, เตรียมสอบ
