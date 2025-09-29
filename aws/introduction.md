# Introduction to AWS

Amazon Web Services (AWS) คือผู้ให้บริการ Cloud Computing รายใหญ่ที่สุดในโลก ซึ่งนำเสนอบริการด้านโครงสร้างพื้นฐานและแพลตฟอร์มให้แก่องค์กรและนักพัฒนาทั่วโลกในรูปแบบ **Pay-as-you-go** (จ่ายเท่าที่ใช้)

## ประวัติของ AWS Cloud

AWS ถูกเปิดตัวภายใน Amazon.com ตั้งแต่ปี 2002 เพราะพวกเขาตระหนักว่าแผนก IT สามารถทำให้เป็นบริการภายนอกได้ โครงสร้างพื้นฐานของ Amazon เป็นหนึ่งในจุดแข็งหลักของบริษัท และพวกเขาคิดว่า “บางทีเราอาจทำ IT ให้กับคนอื่นได้”

AWS เปิดตัวบริการแรกต่อสาธารณะคือ **SQS** ในปี 2004 และในปี 2006 ก็ขยายบริการโดยเปิดตัว **SQS, S3 และ EC2** อย่างเป็นทางการ (เราจะได้เรียนรู้บริการเหล่านี้ในคอร์สนี้)

หลังจากนั้น AWS ก็ขยายออกไปนอกสหรัฐอเมริกา เช่น ยุโรป และปัจจุบัน แอปพลิเคชันใหญ่ ๆ จำนวนมากเคยรันหรือยังคงรันอยู่บน AWS เช่น **Dropbox, Netflix, Airbnb และ NASA**

## AWS ในปัจจุบัน

หากดูจาก **Magic Quadrant ของ Gartner** จะเห็นว่า AWS เป็นผู้นำตลาดต่อเนื่องมาหลายปีแล้ว โดยมีรายได้กว่า **90 พันล้านดอลลาร์สหรัฐในปี 2023** ครองส่วนแบ่งตลาดประมาณ **31% ในไตรมาส 1 ปี 2024** ตามมาด้วย Microsoft ที่ 25%

AWS เป็นผู้บุกเบิกและผู้นำในตลาดมาแล้วกว่า **13 ปีติดต่อกัน** และมีผู้ใช้งานมากกว่า **1 ล้านคน** การเรียนรู้ AWS จึงเป็นการปูทางที่มั่นคงสู่ความสำเร็จในโลกคลาวด์

## สามารถสร้างอะไรได้บ้างบน AWS?

เกือบทุกอย่าง AWS ทำให้คุณสามารถสร้างแอปพลิเคชันที่ซับซ้อนและขยายได้ (scalable) ซึ่งนำไปใช้ได้ในอุตสาหกรรมที่หลากหลาย ตัวอย่างเช่น **Netflix, McDonald's, 21st Century Fox, Activision** ต่างก็ใช้คลาวด์

Use case ที่พบบ่อย ได้แก่:

* ย้ายระบบ IT ขององค์กรขึ้นคลาวด์
* ใช้คลาวด์เพื่อ **สำรองข้อมูลและเก็บ storage**
* **Big Data Analytics**
* โฮสต์เว็บไซต์
* ทำ backend สำหรับ Mobile หรือ Social Apps
* รัน **Game Server** เต็มรูปแบบ
* รันเว็บไซต์หรือแอปพลิเคชันผ่าน EC2 หรือ Beanstalk
* เก็บไฟล์และแบ็กอัปข้อมูลไว้บน S3
* ใช้ Lambda รันฟังก์ชันแบบไม่ต้องเปิดเซิร์ฟเวอร์
* ติดตั้งระบบ Monitoring และ Alert ผ่าน CloudWatch
* ใช้ IAM จัดการสิทธิ์การเข้าถึงของผู้ใช้และบริการ

## ทำไมต้องใช้ AWS?

- **ความยืดหยุ่นสูง**: สามารถเพิ่มหรือลดทรัพยากรได้ตามต้องการ
- **ขยายระบบได้ง่าย**: รองรับผู้ใช้งานระดับโลก
- **ความปลอดภัยมาตรฐานสากล**: ผ่านการรับรองด้าน Compliance หลากหลายมาตรฐาน
- **ลดค่าใช้จ่ายด้านโครงสร้างพื้นฐาน**: ไม่ต้องลงทุนในเซิร์ฟเวอร์หรือฮาร์ดแวร์

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

## แนวคิดพื้นฐานของ AWS

- **Region** – พื้นที่ให้บริการ (เช่น `us-east-1`, `ap-southeast-1`)
- **Availability Zone (AZ)** – ศูนย์ข้อมูลย่อยใน Region
- **Resource** – สิ่งที่สร้างหรือใช้งานบน AWS (เช่น EC2, S3 Bucket)
- **Pay-as-you-go** – จ่ายเท่าที่ใช้ ใช้เท่าไหร่จ่ายเท่านั้น
- **Scalability** – การขยายขนาดระบบตามโหลด

## โครงสร้างพื้นฐานระดับโลกของ AWS (AWS Global Infrastructure)

AWS เป็นระบบระดับโลก โดยมีองค์ประกอบหลัก ได้แก่:

* **Regions**
* **Availability Zones (AZs)**
* **Data Centers**
* **Edge Locations และ Points of Presence (PoPs)**

บนเว็บไซต์ AWS คุณจะเห็นแผนที่โครงสร้างพื้นฐานโลกของ AWS ซึ่ง Regions แสดงเป็นสีส้ม เช่น **Paris, Spain, Ohio, Sao Paulo, Cape Town, Mumbai** และอื่น ๆ

แต่ละ Region เชื่อมต่อกันด้วย **เครือข่ายส่วนตัว (private network) ของ AWS** และใน Region หนึ่ง ๆ เช่น Cape Town จะมี Availability Zones แสดงเป็นจุดสีน้ำเงิน

## AWS Regions

Region คือกลุ่มของ Data Center ที่ตั้งอยู่ใกล้ ๆ กัน เช่น **Ohio, Singapore, Sydney, Tokyo**

* ชื่อ Region จะอยู่ในรูปแบบ เช่น **us-east-1** หรือ **eu-west-3**
* ส่วนใหญ่แล้ว บริการ AWS จะผูกกับ Region (region-scoped)
* การใช้บริการใน Region หนึ่ง จะ **ไม่เกี่ยวข้อง** กับการใช้บริการใน Region อื่น

## ปัจจัยในการเลือก Region

1. **Compliance (ข้อกำหนดทางกฎหมาย)**: บางประเทศบังคับให้ข้อมูลต้องอยู่ภายในประเทศ เช่น ฝรั่งเศส → ข้อมูลต้องอยู่ใน Region ฝรั่งเศส
2. **Latency (ความหน่วง)**: วางระบบใกล้ผู้ใช้งานเพื่อลด Latency เช่น หากผู้ใช้อยู่ในอเมริกา แต่คุณวางระบบที่ออสเตรเลีย → จะเกิดการ lag
3. **Service Availability (ความพร้อมของบริการ)**: ไม่ใช่ทุก Region จะมีทุกบริการ ต้องเช็กก่อน
4. **Pricing (ราคา)**: ราคาต่างกันไปตาม Region ต้องตรวจสอบจากหน้า Pricing

## Availability Zones (AZs)

* แต่ละ Region มี **3 – 6 Availability Zones**
* ตัวอย่าง: **Sydney (ap-southeast-2)** มี **3 AZs** คือ ap-southeast-2A, ap-southeast-2B, ap-southeast-2C
* AZ หนึ่งประกอบด้วย **Data Center แยกออกจากกัน** พร้อมระบบไฟฟ้า, เครือข่าย, การเชื่อมต่อที่สำรอง
* AZs ถูกออกแบบให้ **แยกความเสียหายกัน** → หาก AZ หนึ่งล่ม อีก AZ จะไม่กระทบ
* เชื่อมต่อกันด้วย **เครือข่ายความเร็วสูง (High Bandwidth, Ultra-Low Latency)**

## Points of Presence (PoPs) และ Edge Locations

AWS มี **มากกว่า 400 PoPs** ใน **90 เมือง ครอบคลุม 40 ประเทศ**

* ใช้สำหรับ **Content Delivery** ใกล้ผู้ใช้มากที่สุด
* ลด Latency
* จะเจาะลึกในหัวข้อ Global Section

## AWS Console Overview

* **Global Services (ใช้ได้ทั่วโลก)**: IAM, Route 53, CloudFront, WAF
* **Region-Scoped Services (ขึ้นกับ Region)**: EC2, Elastic Beanstalk, Lambda, Rekognition

หากต้องการเช็กว่า **บริการไหนมีใน Region ไหน** ให้ดูที่ **AWS Region Table** ใน Console

## เริ่มต้นกับ AWS อย่างไร?

1. สมัครบัญชีที่ [https://aws.amazon.com](https://aws.amazon.com)
2. ทดลองใช้ **Free Tier** สำหรับบริการต่าง ๆ ฟรีใน 12 เดือนแรก
3. ติดตั้ง AWS CLI และฝึกใช้ผ่าน Terminal
4. ลองสร้าง EC2 Instance แรกของคุณ
5. ศึกษาเพิ่มเติมผ่าน AWS Skill Builder หรือคอร์สออนไลน์

> **หมายเหตุ:** AWS มีบริการมากกว่า 200 รายการ ผู้ใช้งานสามารถเลือกใช้เฉพาะส่วนที่ต้องการได้ตามความเหมาะสมของงาน

## แหล่งเรียนรู้เพิ่มเติม

- [AWS Official Docs](https://docs.aws.amazon.com)
- [AWS Skill Builder](https://skillbuilder.aws)
- [AWS Free Tier](https://aws.amazon.com/free)