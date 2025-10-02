# Amazon Managed Service for Apache Flink

ตอนนี้เราจะพูดถึง **Amazon Managed Service for Apache Flink**

* ก่อนหน้านี้ชื่อว่า **Kinesis Data Analytics for Apache Flink**
* ปัจจุบันถูกเรียกว่า **Managed Service for Apache Flink**

## Apache Flink คืออะไร?

**Flink** เป็น **framework** สำหรับ **ประมวลผลข้อมูลสตรีมแบบเรียลไทม์ (real-time data stream processing)**

* รองรับการเขียนโปรแกรมด้วย **Java, SQL, หรือ Scala**
* ใช้ในการ **ประมวลผลข้อมูลที่ไหลเข้ามาอย่างต่อเนื่อง**

## แหล่งข้อมูลและการเชื่อมต่อ (Data Sources & Integration)

Amazon Managed Service for Apache Flink สามารถ **อ่านข้อมูลจาก:**

* **Kinesis Data Streams**
* **Amazon MSK (Managed Apache Kafka)**

> หมายเหตุ: Amazon MSK เป็นบริการ managed สำหรับ Apache Kafka ของ AWS ซึ่งใช้สำหรับ **data streams แบบเรียลไทม์**

## การรัน Apache Flink Applications บน AWS

* บริการนี้ทำให้คุณสามารถ **รัน Flink application บน managed cluster ของ AWS ได้**
* AWS จะ **จัดสรร compute resources ให้, รองรับการประมวลผลแบบขนาน (parallel computation), และปรับขนาดอัตโนมัติ (auto scaling)**

## คุณสมบัติการจัดการแอปพลิเคชัน (Application Management Features)

* AWS จะดูแล **backup ของแอปพลิเคชัน** ซึ่ง implement เป็น **checkpoints และ snapshots**
* สามารถใช้ **ฟีเจอร์ของ Apache Flink ในการแปลงข้อมูล** ได้อย่างอิสระ

## หมายเหตุสำคัญเกี่ยวกับแหล่งข้อมูล

* Flink **สามารถอ่านจาก Kinesis Data Streams**
* Flink **ไม่สามารถอ่านจาก Amazon Data Firehose**

> ข้อนี้มักเป็น **exam trick** ที่ควรจำ

## สรุป

* **Amazon Managed Service for Apache Flink** ใช้สำหรับ **ประมวลผลข้อมูลสตรีมเท่านั้น**
* บริการนี้ **จัดการ compute resources, parallel computation, auto scaling, และ backup แอปพลิเคชัน** ให้โดย AWS

## Key Takeaways

* เป็นบริการ **managed สำหรับรัน Apache Flink บน AWS**
* รองรับ **การประมวลผลข้อมูลสตรีมแบบเรียลไทม์** ด้วย **Java, SQL, หรือ Scala**
* สามารถดึงข้อมูลจาก **Kinesis Data Streams และ Amazon MSK (Apache Kafka)**
* AWS ดูแล **compute resources, parallel computation, auto scaling, และ backup ผ่าน checkpoints และ snapshots**
