# Amazon S3 Storage Classes

ในบทเรียนนี้เราจะพูดถึง **Storage Classes** ต่าง ๆ ของ Amazon S3 ได้แก่:

* **Amazon S3 Standard – General Purpose**
* **Amazon S3 Infrequent Access (Standard-IA)**
* **Amazon S3 One Zone-Infrequent Access (One Zone-IA)**
* **Glacier Instant Retrieval**
* **Glacier Flexible Retrieval**
* **Glacier Deep Archive**
* **Amazon S3 Intelligent-Tiering**

คุณสามารถเลือก Storage Class เมื่อสร้าง **object** ใน S3 หรือปรับเปลี่ยนภายหลังได้ นอกจากนี้ยังมี **S3 Lifecycle** สำหรับย้าย objects ระหว่าง storage classes อัตโนมัติตามนโยบาย

## Durability และ Availability

* **Durability** = ความทนทานของข้อมูล (โอกาสสูญหายของ object)

  * S3 มีความทนทานสูงมาก เรียกว่า **11 nines** (99.999999999%)
  * เช่น เก็บ 10 ล้าน object → คาดว่าจะสูญหาย 1 object ทุก 10,000 ปี
* **Availability** = ความพร้อมใช้งานของข้อมูล

  * S3 Standard: 99.99% availability → ประมาณ 53 นาที downtime ต่อปี

## Amazon S3 Standard

* เหมาะกับ **ข้อมูลที่เข้าถึงบ่อย**
* Default storage class
* Low latency, high throughput
* รองรับการเสียของ facility 2 แห่งพร้อมกัน
* Use cases: Big data analytics, mobile/gaming apps, content distribution

## Amazon S3 Infrequent Access (Standard-IA)

* สำหรับข้อมูลที่เข้าถึง **ไม่บ่อย** แต่ต้องการเข้าถึงเร็วเมื่อจำเป็น
* ราคาถูกกว่า Standard แต่มี **ค่าดึงข้อมูล (retrieval fee)**
* Key features: 99.9% availability, เหมาะกับ backup และ disaster recovery

## Amazon S3 One Zone-Infrequent Access (One Zone-IA)

* เก็บข้อมูลใน **Availability Zone เดียว**
* ราคาถูกกว่า Standard-IA
* มีความทนทานสูง **ภายใน AZ เดียว**
* Key features: 99.5% availability, เหมาะกับ backup รอง หรือข้อมูลที่สามารถสร้างใหม่ได้

## Glacier Storage Classes

**Glacier** = Storage ราคาถูกสำหรับ **archival และ backup**
มี 3 ประเภท:

1. **Glacier Instant Retrieval**

   * Retrieval: milliseconds
   * เหมาะกับข้อมูลที่เข้าถึง 1 ครั้งต่อไตรมาส
   * Minimum storage: 90 วัน

2. **Glacier Flexible Retrieval** (เดิมคือ Amazon S3 Glacier)

   * Retrieval options:

     * Expedited: 1–5 นาที
     * Standard: 3–5 ชั่วโมง
     * Bulk: 5–12 ชั่วโมง (ฟรี)
   * Minimum storage: 90 วัน

3. **Glacier Deep Archive**

   * สำหรับเก็บข้อมูล **ระยะยาว**
   * Retrieval options: Standard: 12 ชั่วโมง, Bulk: 48 ชั่วโมง
   * Minimum storage: 180 วัน
   * ราคาถูกที่สุด

## Amazon S3 Intelligent-Tiering

* **ย้าย objects อัตโนมัติระหว่าง access tiers ตามรูปแบบการใช้งาน**
* มีค่าบริการ **monitoring และ auto-tiering เล็กน้อย**
* ไม่มีค่าดึงข้อมูล
* Tiers:

  * Frequent Access (default)
  * Infrequent Access (ไม่ถูกเข้าถึง 30 วัน)
  * Archive Instant Access (ไม่ถูกเข้าถึง 90 วัน)
  * Archive Access (optional, 90–700+ วัน)
  * Deep Archive Access (optional, 180–700+ วัน)
* เหมาะกับการตั้งค่า “**set and forget**” ให้ S3 จัดการ storage ให้เอง

## สรุปและการเปรียบเทียบ

* **Durability** ทุก Storage Class = 11 nines
* **Availability** ลดลงเมื่อจำนวน Availability Zones ลดลง
* **Minimum storage duration** และ **retrieval times** แตกต่างกันตามแต่ละ class
* ไม่จำเป็นต้องจำทุกตัวเลข แต่ควรเข้าใจ **คุณสมบัติและ use case** ของแต่ละ class

## Key Takeaways

* S3 มีหลาย Storage Classes สำหรับ **รูปแบบการเข้าถึงและต้นทุนต่างกัน**
* ทุก Storage Class มี **durability 11 nines**
* Availability แตกต่างตาม class → Standard 99.99%
* ใช้ **Lifecycle configuration** ย้าย objects อัตโนมัติ
* Glacier classes = storage ราคาถูกสำหรับ archival, มีเวลาการดึงข้อมูลและ minimum storage ต่างกัน
* Intelligent-Tiering = ย้าย objects อัตโนมัติตาม usage, มีค่าบริการ monitoring เล็กน้อย, ไม่มี retrieval fee