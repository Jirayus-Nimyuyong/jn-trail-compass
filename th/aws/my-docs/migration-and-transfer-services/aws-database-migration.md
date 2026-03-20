# AWS Database Migration Service (DMS) Cheat Sheet

**AWS Database Migration Service (DMS)** เป็นบริการแบบ Managed ที่ช่วยให้คุณย้ายฐานข้อมูลไปยัง AWS ได้อย่างรวดเร็วและปลอดภัย โดยฐานข้อมูลต้นทางจะยังคงใช้งานได้ตามปกติในระหว่างการย้ายระบบ เพื่อลดช่วงเวลาหยุดทำงาน (Downtime) ของแอปพลิเคชัน
* รองรับการย้ายระบบแบบ **Homogeneous** (ประเภทเดียวกัน) เช่น Oracle ไป Oracle 
* รองรับการย้ายระบบแบบ **Heterogeneous** (ต่างประเภทกัน) เช่น Oracle หรือ SQL Server ไปยัง Amazon Aurora
* ใช้สำหรับการย้ายข้อมูลแบบครั้งเดียว (One-time) หรือการคัดลอกข้อมูลอย่างต่อเนื่อง (**Continuous Replication**) เพื่อทำฐานข้อมูลสำรอง (High Availability) หรือรวมข้อมูลเข้าสู่ Data Warehouse เช่น Amazon Redshift และ Amazon S3
* **ข้อจำกัด:** ไม่รองรับการคัดลอกข้อมูลระหว่างฐานข้อมูล On-premises ไปยัง On-premises ด้วยกันเอง

---

## แหล่งข้อมูลต้นทางและปลายทางที่รองรับ (Partial List)
* **แหล่งต้นทาง (Sources):** Oracle, SQL Server, MySQL, MariaDB, PostgreSQL, MongoDB, SAP ASE, IBM Db2, Azure SQL, S3, Google Cloud ฯลฯ
* **แหล่งปลายทาง (Targets):** Aurora, MySQL, PostgreSQL, Redshift, S3, DynamoDB, OpenSearch, Kinesis Data Streams, DocumentDB, Neptune, Apache Kafka ฯลฯ

---

## คำศัพท์และแนวคิดหลัก (Terminology and Concepts)
* **Replication Instance:** อินสแตนซ์ EC2 แบบ Managed ที่ติดตั้งซอฟต์แวร์สำหรับประมวลผลการเปลี่ยนแปลงของข้อมูล
* **Endpoints:** อ็อบเจกต์การตั้งค่าที่เก็บข้อมูลการเชื่อมต่อ (IP, พอร์ต, รหัสผ่าน) ของแหล่งข้อมูล
* **Replication Task:** งานที่ผู้ใช้กำหนดเพื่อระบุว่าข้อมูลใดจะถูกย้ายและย้ายอย่างไร (เช่น Full Load - ย้ายทั้งหมด หรือ CDC - ย้ายเฉพาะส่วนที่เปลี่ยนแปลง)
* **Integration:** ทำงานร่วมกับ AWS KMS (การเข้ารหัส), AWS IAM (การควบคุมสิทธิ์) และ AWS Secrets Manager (การเก็บรักษารหัสผ่านฐานข้อมูล)

---

## คุณสมบัติที่สำคัญ
* **AWS DMS Fleet Advisor:** บริการฟรีที่ช่วยทำบัญชีรายชื่อฐานข้อมูล On-premises และวิเคราะห์เพื่อแนะนำขนาดที่เหมาะสมในการย้ายมา AWS (หมายเหตุ: บริการนี้จะ**สิ้นสุดการสนับสนุนในวันที่ 20 พฤษภาคม 2026**)
* **Premigration Assessments:** ตรวจสอบความพร้อมของฐานข้อมูลต้นทางและปลายทางตามกฎที่ตั้งไว้ก่อนเริ่มย้ายจริง เพื่อหาจุดที่อาจล้มเหลว
* **Enhanced Monitoring:** แดชบอร์ดศูนย์กลางสำหรับดูสุขภาพของงานย้ายข้อมูล, สถิติตาราง และมาตรวัดประสิทธิภาพ

---

## ตัวเลือกการติดตั้ง (Deployment Options)
* **DMS Standard:** ผู้ใช้เลือกและจัดการ Replication Instance เอง (เช่น dms.t3.medium)
* **DMS Serverless:** ระบบจะจัดสรรและปรับขนาดทรัพยากร (Capacity Units) อัตโนมัติให้เหมาะกับโหลดงาน เหมาะกับงานที่มีทราฟฟิกไม่แน่นอน
* **Homogeneous Data Migrations:** ตัวเลือก Serverless ที่ปรับแต่งมาเพื่อการย้ายฐานข้อมูลประเภทเดียวกันโดยเฉพาะ (เช่น MySQL ไป RDS MySQL) เพื่อประสิทธิภาพสูงสุด

---

## AWS Schema Conversion Tool (SCT)
ช่วยให้การย้ายฐานข้อมูลต่างประเภทกัน (Heterogeneous) เป็นไปอย่างราบรื่น โดยการแปลง Schema และโค้ดของฐานข้อมูล (เช่น View, Stored Procedure, Function) ให้เป็นฟอร์แมตที่เข้ากันได้กับฐานข้อมูลปลายทาง
* **การแปลง Schema พื้นฐาน (Basic Schema Copy):** DMS สามารถสร้างตารางและคีย์หลัก (Primary Keys) ที่ปลายทางให้โดยอัตโนมัติ แต่จะไม่รวมดัชนีรอง (Secondary Indexes) หรือเงื่อนไข Foreign Keys (ถ้าต้องการความละเอียดสูงให้ใช้ SCT)

---

## ค่าบริการ (Pricing)
* **DMS Standard:** จ่ายตามกำลังประมวลผล (Compute) ที่ใช้ระหว่างการย้ายระบบ และค่าพื้นที่จัดเก็บ Log เพิ่มเติม (การโอนข้อมูลเข้าฟรี)
* **DMS Serverless:** จ่ายตามจำนวน **DMS Capacity Units (DCUs)** ที่ใช้ต่อชั่วโมง (1 DCU = RAM 2GB)
* **Homogeneous Data Migrations:** คิดราคาตามรายชั่วโมงตลอดระยะเวลาที่ใช้งานบริการ