# AWS Glue Cheat Sheet
บริการ Extract, Transform, and Load (ETL) แบบ Managed เต็มรูปแบบ เพื่อเตรียมข้อมูลสำหรับการวิเคราะห์ ช่วยให้ค้นหาและสืบค้นข้อมูลข้ามชุดข้อมูลต่างๆ ของ AWS ได้โดยไม่ต้องเคลื่อนย้ายข้อมูล

### ส่วนประกอบหลักของ AWS Glue
* **Central Metadata Repository:** คลังเก็บข้อมูลเมทาดาตาส่วนกลาง (Data Catalog)
* **ETL Engine:** เอนจินสำหรับประมวลผล Python หรือ Scala
* **Flexible Scheduler:** ระบบจัดตารางเวลาที่ยืดหยุ่น

---

### คุณสมบัติและอัปเดตสำคัญ (Features)
* **Runtime & Engine:** รองรับเวอร์ชัน 5.0 และ 5.1 (Apache Spark 3.5.x) เพิ่มประสิทธิภาพสำหรับ Data Lake สมัยใหม่
* **Open Table Formats:** รองรับ Apache Iceberg (เวอร์ชัน 3), Delta Lake และ Apache Hudi อย่างเต็มรูปแบบ
* **Zero-ETL:** รองรับการรวมข้อมูลโดยไม่ต้องสร้างหรือดูแล Pipeline เอง ช่วยให้วิเคราะห์ข้อมูลจากแหล่งต้นทางได้ทันที
* **Worker Types:** เพิ่มประเภท Worker ใหม่ (G.12X, G.16X และตระกูล R ที่ปรับแต่งหน่วยความจำ) เพื่อรองรับงานที่หลากหลาย
* **Generative AI:** มีเครื่องมือที่ขับเคลื่อนด้วย AI เพื่อช่วยอัปเกรด Spark Job และช่วยในการแก้ปัญหา (Troubleshooting) สำหรับนักพัฒนา

---

### แนวคิดหลัก (Concepts)

#### 1. AWS Glue Data Catalog
* คลังเก็บเมทาดาตาที่คงอยู่ถาวร (Hive Metastore) ใช้เก็บ Schema และข้อมูลตาราง
* **Table & Database:** ตาราง (Table) คือนิยามของข้อมูล ส่วนฐานข้อมูล (Database) คือกลุ่มของตาราง
* **PartitionIndex:** ช่วยลดปริมาณการโอนถ่ายข้อมูลและเพิ่มความเร็วในการคิวรี

#### 2. Crawler & Classifier
* **Crawler:** ทำหน้าที่สำรวจแหล่งข้อมูล (S3, JDBC, DynamoDB ฯลฯ) เพื่อสร้างตารางใน Data Catalog โดยอัตโนมัติ
* **Classifier:** ตัวช่วยในการจำแนกรูปแบบข้อมูล (JSON, CSV, XML ฯลฯ) เพื่อกำหนด Schema

#### 3. ETL Job & Script
* **Job:** งานประมวลผลข้อมูล มี 3 ประเภทหลัก: Spark, Streaming ETL และ Python shell
* **Job Bookmark:** ช่วยจำสถานะการทำงานเพื่อป้องกันการประมวลผลข้อมูลซ้ำ
* **Dynamic Frame:** ตารางแบบกระจายตัวที่รองรับข้อมูลแบบ Nested และ Semi-structured (คล้าย Spark DataFrame แต่ยืดหยุ่นกว่า)

#### 4. Workflows & Triggers
* **Workflow:** ระบบประสานงาน (Orchestration) เพื่อร้อยเรียง Job, Crawler และ Trigger เข้าด้วยกัน
* **Trigger:** ตัวสั่งให้งานเริ่มทำงาน (ตามเวลา, ตามเหตุการณ์ หรือสั่งเอง)

---

### บริการย่อยในตระกูล Glue

* **Glue DataBrew:** เครื่องมือเตรียมข้อมูลแบบ Visual (ไม่ต้องเขียนโค้ด) มีสูตรสำเร็จ (Transformations) กว่า 250 แบบ
* **Glue Flex:** ตัวเลือกประหยัดค่าใช้จ่าย (ลดลง 35%) สำหรับงานที่ไม่ด่วน โดยรันบนทรัพยากรประมวลผลส่วนเกิน
* **Glue Data Quality:** ตรวจสอบและควบคุมคุณภาพข้อมูลโดยใช้ภาษา DQDL (อิงจาก DeeQu framework)
* **Sensitive Data Detection:** ตรวจจับข้อมูลส่วนบุคคล (PII) อัตโนมัติด้วย ML และสามารถจัดการ (Mask/Redact) ข้อมูลเหล่านั้นได้
* **Glue for Ray:** เฟรมเวิร์กประมวลผลแบบกระจายตัวสำหรับ Python โดยเฉพาะ เหมาะสำหรับงานที่เน้น Python Library ทั่วไป
* **Glue Schema Registry:** จัดการและควบคุมเวอร์ชันของ Schema สำหรับข้อมูลสตรีมมิ่ง (Kafka, Kinesis)

---

### การตรวจสอบและการรักษาความปลอดภัย (Monitoring & Security)
* **Monitoring:** ใช้ CloudWatch (Logs/Metrics), CloudTrail (ประวัติ API) และ Spark UI เพื่อ debug งาน
* **Security:** * เข้ารหัสข้อมูลที่จัดเก็บ (At rest) ด้วย SSE-S3 หรือ SSE-KMS
    * เข้ารหัสข้อมูลระหว่างรับส่ง (In transit) ด้วย SSL
    * รองรับการเชื่อมต่อผ่าน VPC และการทำ Cross-account access

---

### ค่าบริการ (Pricing)
* **ETL Jobs & Crawlers:** จ่ายรายชั่วโมงตามจำนวน DPU (Data Processing Units) ที่ใช้งาน
* **Data Catalog:** * เก็บข้อมูลเกิน 1 ล้านออบเจ็กต์ต่อเดือนมีค่าใช้จ่าย
    * เรียกใช้ API เกิน 1 ล้านครั้งต่อเดือนมีค่าใช้จ่าย
* **Flexible Jobs:** ราคาประหยัดกว่าปกติอยู่ที่ $0.29 ต่อ DPU-Hour