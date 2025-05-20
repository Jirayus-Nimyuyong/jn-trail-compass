# Introduction to AWS

Amazon Web Services (AWS) คือผู้ให้บริการ Cloud Computing รายใหญ่ที่สุดในโลก ซึ่งนำเสนอบริการด้านโครงสร้างพื้นฐานและแพลตฟอร์มให้แก่องค์กรและนักพัฒนาทั่วโลกในรูปแบบ **Pay-as-you-go** (จ่ายเท่าที่ใช้)

## ทำไมต้องใช้ AWS?

- ✅ **ความยืดหยุ่นสูง**: สามารถเพิ่มหรือลดทรัพยากรได้ตามต้องการ
- ✅ **ขยายระบบได้ง่าย**: รองรับผู้ใช้งานระดับโลก
- ✅ **ความปลอดภัยมาตรฐานสากล**: ผ่านการรับรองด้าน Compliance หลากหลายมาตรฐาน
- ✅ **ลดค่าใช้จ่ายด้านโครงสร้างพื้นฐาน**: ไม่ต้องลงทุนในเซิร์ฟเวอร์หรือฮาร์ดแวร์

---

## หมวดหมู่บริการหลักของ AWS

### 1. Compute
- **Amazon EC2 (Elastic Compute Cloud)** – เครื่องเซิร์ฟเวอร์เสมือน
- **AWS Lambda** – รันโค้ดแบบไม่ต้องจัดการเซิร์ฟเวอร์ (Serverless)
- **Elastic Beanstalk** – Platform สำหรับ Deploy Application อัตโนมัติ

### 2. Storage
- **Amazon S3 (Simple Storage Service)** – บริการเก็บไฟล์แบบ Object Storage
- **Amazon EBS (Elastic Block Store)** – ดิสก์สำหรับ EC2
- **Amazon Glacier** – เก็บข้อมูลระยะยาว ราคาประหยัด

### 3. Networking
- **Amazon VPC (Virtual Private Cloud)** – เครือข่ายเสมือนส่วนตัว
- **Security Groups & NACLs** – ควบคุมการเข้าออกของทราฟฟิก
- **Amazon Route 53** – ระบบจัดการ DNS
- **Amazon CloudFront** – Content Delivery Network (CDN)

### 4. Security & Identity
- **IAM (Identity and Access Management)** – จัดการผู้ใช้และสิทธิ์เข้าถึง
- **KMS (Key Management Service)** – การจัดการคีย์เข้ารหัส
- **AWS CloudTrail** – บันทึกกิจกรรมการใช้งานทั้งหมด

### 5. Monitoring & Management
- **Amazon CloudWatch** – ตรวจสอบทรัพยากร, สร้าง Alert
- **AWS Config** – ตรวจสอบ Compliance ของ Resource
- **Trusted Advisor** – แนะนำการปรับปรุงด้านความปลอดภัยและต้นทุน

---

## แนวคิดพื้นฐานของ AWS

- **Region** – พื้นที่ให้บริการ (เช่น `us-east-1`, `ap-southeast-1`)
- **Availability Zone (AZ)** – ศูนย์ข้อมูลย่อยใน Region
- **Resource** – สิ่งที่สร้างหรือใช้งานบน AWS (เช่น EC2, S3 Bucket)
- **Pay-as-you-go** – จ่ายเท่าที่ใช้ ใช้เท่าไหร่จ่ายเท่านั้น
- **Scalability** – การขยายขนาดระบบตามโหลด

---

## ตัวอย่างการใช้งาน AWS

- ✅ รันเว็บไซต์หรือแอปพลิเคชันผ่าน EC2 หรือ Beanstalk
- ✅ เก็บไฟล์และแบ็กอัปข้อมูลไว้บน S3
- ✅ ใช้ Lambda รันฟังก์ชันแบบไม่ต้องเปิดเซิร์ฟเวอร์
- ✅ ติดตั้งระบบ Monitoring และ Alert ผ่าน CloudWatch
- ✅ ใช้ IAM จัดการสิทธิ์การเข้าถึงของผู้ใช้และบริการ

---

## เริ่มต้นกับ AWS อย่างไร?

1. สมัครบัญชีที่ [https://aws.amazon.com](https://aws.amazon.com)
2. ทดลองใช้ **Free Tier** สำหรับบริการต่าง ๆ ฟรีใน 12 เดือนแรก
3. ติดตั้ง AWS CLI และฝึกใช้ผ่าน Terminal
4. ลองสร้าง EC2 Instance แรกของคุณ
5. ศึกษาเพิ่มเติมผ่าน AWS Skill Builder หรือคอร์สออนไลน์

---

> **หมายเหตุ:** AWS มีบริการมากกว่า 200 รายการ ผู้ใช้งานสามารถเลือกใช้เฉพาะส่วนที่ต้องการได้ตามความเหมาะสมของงาน

---

## แหล่งเรียนรู้เพิ่มเติม

- [AWS Official Docs](https://docs.aws.amazon.com)
- [AWS Skill Builder](https://skillbuilder.aws)
- [AWS Free Tier](https://aws.amazon.com/free)
