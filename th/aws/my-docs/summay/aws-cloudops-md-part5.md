# AWS CloudOps SOA-C03 — ส่วนที่ 5
## AWS Monitoring, Audit & Performance / AWS Account Management

---

# AWS Monitoring, Audit & Performance
## CloudWatch, CloudTrail & AWS Config

---

## CloudWatch Metrics

- CloudWatch ให้ metrics สำหรับทุก service ใน AWS
- **Metric** = ตัวแปรที่ monitor (CPUUtilization, NetworkIn...)
- Metrics อยู่ใน **Namespaces**
- **Dimension** = attribute ของ metric (instance id, environment ฯลฯ) สูงสุด 30 ต่อ metric
- Metrics มี timestamps
- สร้าง CloudWatch dashboards ได้

### EC2 Detailed Monitoring:
- ค่าเริ่มต้น: metrics ทุก 5 นาที
- Detailed monitoring: ทุก 1 นาที (ใช้ scale ASG เร็วขึ้น!)
- Free Tier: 10 detailed monitoring metrics
- ⚠️ **EC2 Memory usage ไม่ push ค่าเริ่มต้น** (ต้อง push เป็น custom metric)

---

## CloudWatch Custom Metrics

- กำหนดและส่ง custom metrics ไป CloudWatch เอง
- ตัวอย่าง: memory (RAM), disk space, logged in users
- ใช้ API call **PutMetricData**
- ใช้ dimensions (attributes) เพื่อแบ่ง metrics (Instance.id, Environment.name)
- **Storage Resolution:**
  - Standard: 1 นาที (60 วินาที)
  - High Resolution: 1/5/10/30 วินาที (ค่าใช้จ่ายสูงกว่า)
- ⚠️ รับ metric data points ย้อนหลัง 2 สัปดาห์ และล่วงหน้า 2 ชั่วโมง

---

## CloudWatch Anomaly Detection

- วิเคราะห์ metrics ต่อเนื่องเพื่อหา baselines ปกติและ anomalies ด้วย **ML**
- สร้าง model ของค่าที่คาดหวังจากข้อมูลอดีต
- แสดงค่าที่อยู่นอก normal range
- สร้าง Alarms ตาม expected value (แทน Static Threshold)
- ยกเว้นช่วงเวลา/events เฉพาะจาก training ได้

---

## CloudWatch Dashboards

- ตั้ง custom dashboards สำหรับ key metrics และ alarms
- Dashboards เป็น **global** (รวม graphs จากหลาย accounts/regions)
- เปลี่ยน time zone & time range, auto refresh
- **แชร์** กับคนที่ไม่มี AWS account (public, email, 3rd party SSO via Cognito)
- Pricing: 3 dashboards (50 metrics) ฟรี, $3/dashboard/เดือน หลังจากนั้น

---

## CloudWatch Logs

- **Log groups:** ชื่อ arbitrary, ปกติแทนแอป
- **Log streams:** instances/log files/containers ภายในแอป
- **Log expiration:** never expire ถึง 10 ปี
- ส่ง logs ไป: S3 (exports), Kinesis Data Streams/Firehose, Lambda, OpenSearch
- Encrypted ค่าเริ่มต้น (ตั้ง KMS ได้)

### Sources:
SDK, CloudWatch Logs Agent, Unified Agent, Elastic Beanstalk, ECS, Lambda, VPC Flow Logs, API Gateway, CloudTrail, Route53

### Logs Insights:
- ค้นหาและวิเคราะห์ log data ใน CloudWatch Logs
- ภาษา query เฉพาะ, ค้นพบ fields อัตโนมัติ
- Query หลาย Log Groups ข้ามบัญชีได้
- บันทึก queries และเพิ่มใน Dashboards
- **เป็น query engine, ไม่ใช่ real-time engine**

### S3 Export:
- Log data ใช้เวลาถึง 12 ชม. ก่อนพร้อม export
- API: CreateExportTask
- ไม่ใช่ near-real time → ใช้ **Logs Subscriptions** แทน

### Logs Subscriptions:
- ได้ real-time log events สำหรับ processing
- ส่งไป Kinesis Data Streams, Kinesis Data Firehose, Lambda
- **Subscription Filter** กรอง log events
- รวม Multi-Account & Multi Region ผ่าน Kinesis → S3

---

## CloudWatch Logs Data Protection

- ตรวจจับและ mask sensitive log data ด้วย **ML**
- Data Protection Policy: ระบุ Data Identifier(s) เช่น email, password, credit card, SSN
- 100+ Data Identifiers สำเร็จรูป + Custom Data Identifier
- ส่ง audit reports ไป CloudWatch Log Group, S3, Kinesis Data Firehose
- แจ้งเตือนผ่าน metric **LogEventsWithFindings** → CloudWatch Alarm → SNS
- Sensitive data ถูก mask ใน: Logs Insights, Metric Filters, Subscription Filters
- เฉพาะ users ที่มี **logs:Unmask** เห็นข้อมูลจริง

---

## CloudWatch Alarms

- Trigger notifications สำหรับ metric ใดก็ได้
- **Alarm States:** OK, INSUFFICIENT_DATA, ALARM
- **Period:** ระยะเวลาประเมิน metric (วินาที)
- High resolution custom metrics: 10/30 วินาที หรือ ผ่าน 60 วินาที

### Alarm Targets:
- Stop, Terminate, Reboot, Recover EC2 Instance
- Trigger Auto Scaling Action
- Send notification ไป SNS

### Composite Alarms:
- Monitor states ของ **หลาย alarms** ด้วย AND/OR
- ลด "alarm noise" ด้วย complex composite alarms

### EC2 Instance Recovery:
- Monitor StatusCheckFailed_System → CloudWatch Alarm → Recovery
- Recovery: เก็บ Same Private, Public, Elastic IP, metadata, placement group

### ข้อควรรู้:
- สร้าง alarms จาก CloudWatch Logs **Metrics Filters** ได้
- ทดสอบ alarm: `aws cloudwatch set-alarm-state --alarm-name "myalarm" --state-value ALARM --state-reason "testing"`

---

## CloudWatch Synthetics Canary

- Script ที่ตั้งค่าได้เพื่อ monitor APIs, URLs, Websites
- จำลองสิ่งที่ลูกค้าทำ programmatically
- ตรวจ availability และ latency, เก็บ screenshots
- ผสานกับ CloudWatch Alarms
- เขียนด้วย Node.js หรือ Python (headless Google Chrome)
- รันครั้งเดียว หรือตามตาราง

### Blueprints:
| Blueprint | คำอธิบาย |
|-----------|----------|
| Heartbeat Monitor | load URL, เก็บ screenshot + HTTP archive |
| API Canary | ทดสอบ read/write ของ REST APIs |
| Broken Link Checker | ตรวจ links ทั้งหมดใน URL |
| Visual Monitoring | เปรียบเทียบ screenshot กับ baseline |
| Canary Recorder | บันทึก actions บนเว็บ → สร้าง script |
| GUI Workflow Builder | ทดสอบ actions บนหน้าเว็บ (เช่น login form) |

---

## CloudWatch Container Insights

- เก็บ, รวม, สรุป container metrics และ logs
- รองรับ **ECS, Fargate, EKS, ROSA**
- CPU, memory, tasks, services, network, disk
- ไม่ต้องใช้ sidecars
- เปิดได้ที่ระดับ account หรือ cluster
- **Enhanced Visibility:** metrics ที่ task และ container level

---

## CloudWatch Internet Monitor

- Monitor ผลกระทบของ internet issues ต่อแอปบน AWS กับ end users
- ใช้ internet data จาก AWS global network
- Global view ของ traffic patterns และ health events
- แนะนำการปรับปรุง end-user experience
- Publish ไป CloudWatch Logs & Metrics
- ส่ง global health events ไป EventBridge

---

## CloudWatch Network Synthetic Monitor

- Monitor network issues ระหว่างแอปบน AWS กับ on-premises data center
- ระบุ network performance degradation (packet loss, latency, jitter)
- ไม่ต้องติดตั้ง agents
- ทดสอบ ICMP/TCP traffic ผ่าน Direct Connect หรือ S2S VPN
- Publish ไป CloudWatch Metrics

---

# Amazon EventBridge

---

## EventBridge (เดิมคือ CloudWatch Events)

- **Schedule:** Cron jobs (scheduled scripts)
- **Event Pattern:** react ต่อ service events

### Example Sources:
EC2 Instance (start), CodeBuild (failed build), S3 Event (upload), Trusted Advisor (finding), CloudTrail (API call), Schedule/Cron

### Example Destinations:
Lambda, AWS Batch, ECS Task, SQS, SNS, Kinesis Data Streams, Step Functions, CodePipeline, CodeBuild, SSM, EC2 Actions

---

## EventBridge — Features

- **Event buses:** เข้าถึงข้ามบัญชีด้วย Resource-based Policies
- **Archive events:** ทั้งหมดหรือกรอง (indefinitely หรือตามระยะ)
- **Replay archived events**
- **Schema Registry:** วิเคราะห์ events → infer schema → generate code
- **Resource-based Policy:** จัดการ permissions สำหรับ event bus เฉพาะ
- **Pipes:** เชื่อม source กับ target แบบ no-code (Filter → Enrichment → Target)
- **Retries & DLQs:** Retry Policy (default 24 ชม., 185 attempts) + SQS Dead Letter Queue
- **Cross-account Targets:** EventBridge Bus, SQS, SNS, Lambda, API Gateway, Kinesis

---

## Service Quotas CloudWatch Alarms

- แจ้งเตือนเมื่อใกล้ถึง service quota threshold
- สร้าง CloudWatch Alarms ใน Service Quotas console
- ตัวอย่าง: Lambda concurrent executions
- **ทางเลือก:** Trusted Advisor + CloudWatch Alarms (จำกัด ~50 Service Limits checks)

---

# AWS CloudTrail

---

## CloudTrail

- Governance, compliance, audit สำหรับ AWS Account
- **เปิดค่าเริ่มต้น!**
- บันทึก events / API calls จาก: Console, SDK, CLI, AWS Services
- ส่ง logs ไป CloudWatch Logs หรือ S3
- Trail ใช้กับ **ทุก Regions** (ค่าเริ่มต้น) หรือ Region เดียว
- **ถ้าทรัพยากรถูกลบ → ตรวจ CloudTrail ก่อน!**

### Event Types:
| ประเภท | คำอธิบาย | ค่าเริ่มต้น |
|--------|----------|-------------|
| Management Events | การดำเนินการบนทรัพยากร (IAM AttachRolePolicy, EC2 CreateSubnet) | เปิด |
| Data Events | S3 object-level, Lambda invocations | ปิด (volume สูง) |
| Insights Events | ตรวจจับกิจกรรมผิดปกติจาก write events | ต้องเปิด |

### CloudTrail Insights:
- วิเคราะห์ normal management events สร้าง baseline
- วิเคราะห์ write events ต่อเนื่องเพื่อหา unusual patterns
- Anomalies: CloudTrail console, S3, EventBridge

### Events Retention:
- เก็บ **90 วัน** ใน CloudTrail
- เก็บนานขึ้น: log ไป S3 → query ด้วย Athena

### Log File Integrity Validation:
- Digest Files: reference log files ชั่วโมงล่าสุด + hash ของแต่ละไฟล์
- ตรวจว่า log file ถูก modified/deleted หลัง CloudTrail deliver
- Hashing: SHA-256, Digital Signing: SHA-256 with RSA
- ป้องกัน S3 bucket: bucket policy, versioning, MFA Delete, encryption, object lock

### Organizations Trails:
- Trail ที่ log events สำหรับ **ทุก AWS accounts ใน Organization**
- สร้างใน management account
- Member accounts ดูได้อย่างเดียว (remove/modify ไม่ได้)

---

## CloudTrail — ไม่ใช่ "real-time":
- ส่ง event ภายใน **15 นาที** หลัง API call
- ส่ง log files ไป S3 ทุก **5 นาที**

---

# AWS Config

---

## AWS Config

- ช่วย **audit และบันทึก compliance** ของ AWS resources
- บันทึก configurations และ changes ตลอดเวลา
- คำถามที่ Config ตอบได้:
  - มี unrestricted SSH access ไปยัง security groups หรือไม่?
  - buckets มี public access หรือไม่?
  - ALB configuration เปลี่ยนอย่างไรตลอดเวลา?
- รับ alerts ผ่าน SNS
- **Per-region service** (รวมข้าม regions/accounts ได้)
- เก็บ configuration data ใน S3 (วิเคราะห์ด้วย Athena)

---

## Config Rules

- AWS managed rules (75+) หรือ custom (Lambda)
- ตัวอย่าง: EBS disk เป็น gp2 หรือไม่, EC2 instance เป็น t2.micro หรือไม่
- Evaluate: ทุก config change และ/หรือ ตามเวลา
- **Config Rules ไม่ป้องกัน actions (ไม่มี deny)**
- Pricing: $0.003/config item, $0.001/rule evaluation

### Remediations:
- แก้ไขทรัพยากรที่ไม่ comply อัตโนมัติด้วย **SSM Automation Documents**
- AWS-Managed หรือ custom Automation Documents
- ตั้ง Remediation Retries ได้
- ตัวอย่าง: ปิด incoming SSH port 22, เปิด S3 bucket logging

### Notifications:
- **EventBridge** trigger เมื่อ resource non-compliant
- **SNS** สำหรับทุก events (configuration changes, compliance state)

### Aggregators:
- รวม rules, resources ข้าม **หลายบัญชีและ Regions**
- ถ้าใช้ AWS Organizations ไม่ต้อง individual Authorization
- สร้าง rules ในแต่ละ source account
- Deploy rules ข้ามบัญชีด้วย CloudFormation StackSets

---

## CloudWatch vs CloudTrail vs Config

| | CloudWatch | CloudTrail | Config |
|---|-----------|-----------|--------|
| หน้าที่ | Performance monitoring, metrics, dashboards, events, alerting, log analysis | บันทึก API calls ทั้งหมด (ใครทำอะไร) | บันทึก configuration changes, ตรวจ compliance |

### ตัวอย่าง: Elastic Load Balancer
- **CloudWatch:** monitor incoming connections, visualize error codes, dashboard ของ LB performance
- **Config:** track security group rules, track configuration changes, ตรวจ SSL certificate
- **CloudTrail:** track ใครแก้ไข LB ด้วย API calls

---

# AWS Account Management

---

## AWS Health Dashboard

### Service History:
- แสดงสถานะทุก regions, ทุก services
- ข้อมูลย้อนหลังรายวัน, RSS feed

### Your Account (เดิม Personal Health Dashboard):
- แจ้งเตือนเมื่อ AWS events กระทบ**คุณ**โดยเฉพาะ
- Personalized view, remediation guidance
- Proactive notification สำหรับ scheduled activities
- รวมข้อมูลจาก AWS Organization ได้

### Health Event Notifications:
- ใช้ EventBridge react ต่อ AWS Health events
- ตัวอย่าง: email เมื่อ EC2 instances scheduled for updates
- ใช้งาน: ส่ง notifications, capture event info, take corrective action
- ตัวอย่าง: ลบ exposed IAM Access Keys อัตโนมัติ, restart instances scheduled for retirement

---

## AWS Organizations

- จัดการ **หลายบัญชี AWS**
- Management account + Member accounts (1 organization เท่านั้น)
- **Consolidated Billing:** single payment, volume discounts
- Shared reserved instances + Savings Plans ข้ามบัญชี
- API สร้าง AWS account อัตโนมัติ

### SCP (Service Control Policies):
- IAM policies ใช้กับ OU หรือ Accounts เพื่อจำกัด Users/Roles
- **ไม่มีผลกับ management account**
- ต้องมี **explicit ALLOW** จาก root ผ่านทุก OU ไปยัง target account
- ไม่ allow อะไรค่าเริ่มต้น (เหมือน IAM)

### Tag Policies:
- Standardize tags ข้ามทรัพยากรใน Organization
- กำหนด tag keys และ allowed values
- ป้องกัน non-compliant tagging operations
- สร้างรายงาน tagged/non-compliant resources

### Reserved Instances:
- ทุกบัญชีใน organization ได้รับ hourly cost benefit ของ RI ที่บัญชีใดก็ได้ซื้อ
- Payer account ปิด RI/Savings Plans sharing สำหรับบัญชีเฉพาะได้

### IAM Policies:
- ใช้ `aws:PrincipalOrgID` ใน resource-based policies เพื่อจำกัดเฉพาะ principals จากบัญชีใน Organization

---

## AWS Control Tower

- ตั้งค่า secure, compliant multi-account environment ตาม best practices ได้ง่าย
- Automate setup, ongoing policy management ด้วย guardrails
- Detect policy violations, remediate, monitor compliance ผ่าน dashboard
- ทำงานบน AWS Organizations

---

## AWS Service Catalog

- Portal สำหรับ launch ผลิตภัณฑ์ที่ได้รับอนุมัติแล้ว (VMs, databases, storage)
- **Admin:** สร้าง Products (CloudFormation Templates) → Portfolio → IAM Permissions
- **User:** ดู Product List → Launch → Provisioned Products (properly configured + tagged)
- แชร์ portfolios ข้ามบัญชี/Organization (reference sync หรือ copy)
- **TagOptions Library:** จัดการ tags บน provisioned products

---

## Cost Management

| Service | คำอธิบาย |
|---------|----------|
| **Billing Alarms** | Billing data metric ใน CloudWatch us-east-1, worldwide costs |
| **Cost Explorer** | วิเคราะห์ costs/usage, custom reports, monthly/hourly/resource level, คาดการณ์ 18 เดือน, Savings Plan recommendations |
| **AWS Budgets** | สร้าง budget + alarms (Usage, Cost, Reservation, Savings Plans), สูงสุด 5 SNS ต่อ budget |
| **Cost Allocation Tags** | ติดตาม costs ละเอียด (aws: auto, user: กำหนดเอง) |
| **Cost & Usage Reports** | ชุดข้อมูล cost/usage ครบถ้วนที่สุด, export รายวันไป S3, ผสาน Athena/Redshift/QuickSight |
| **Compute Optimizer** | แนะนำ optimal resources ด้วย ML (EC2, ASG, EBS, Lambda, ECS, Aurora, RDS) ประหยัดถึง 25% |
| **Billing Conductor** | ปรับแต่งการแสดง billing (group accounts, markups/discounts, pro forma bills) |

### Compute Optimizer สำหรับ CloudOps:
- ต้องมี IAM policy **ComputeOptimizerReadOnlyAccess**
- EC2 ไม่แสดงใน Compute Optimizer? → instance ใหม่เกินไป → รอ **30 ชม.** ขึ้นไป

---

> **จบส่วนที่ 5** — ต่อส่วนที่ 6: Disaster Recovery, Security & Compliance, Identity
