# ประเภทของ EBS Volume

## บทนำเกี่ยวกับประเภท EBS Volume

EBS (Elastic Block Store) มีหลายประเภท **ปัจจุบันมี 6 ประเภท** ซึ่งสามารถจัดกลุ่มได้ดังนี้:

1. **gp2 และ gp3** – General Purpose SSD

   * สมดุลระหว่าง **ราคาและประสิทธิภาพ** สำหรับงานทั่วไป
   * ใช้ได้ทั้งงานระบบและการทดสอบ
2. **io1 และ io2 Block Express** – Provisioned IOPS SSD

   * ประสิทธิภาพสูงสุด
   * เหมาะสำหรับงาน **mission-critical**, **low-latency**, หรือ **high-throughput**
3. **st1** – Throughput Optimized HDD

   * ราคาต่ำ
   * เหมาะกับงานที่เข้าถึงบ่อยและต้องการ **throughput สูง** เช่น big data หรือ log processing
4. **sc1** – Cold HDD

   * ราคาต่ำที่สุด
   * เหมาะกับงาน **เข้าถึงข้อมูลไม่บ่อย** หรือ archive

## การกำหนดค่า EBS Volume

EBS volume ถูกกำหนดโดยปัจจัยหลัก:

* ขนาด (Size)
* Throughput
* IOPS (Input/Output Operations Per Second)

> สำหรับ EC2 instance **เฉพาะ gp2, gp3, io1, io2** สามารถใช้เป็น **boot volume** (ที่ติดตั้ง OS) ได้

## General Purpose SSD: gp2 และ gp3

* **gp2**

  * storage ราคาประหยัด, latency ต่ำ
  * เหมาะกับ boot volume, virtual desktop, development/test
  * ขนาด: 1 GB – 16 TB
  * IOPS ขึ้นอยู่กับขนาด: 3 IOPS ต่อ 1 GB, สูงสุด 16,000 IOPS
* **gp3**

  * รุ่นใหม่กว่า
  * ให้ baseline IOPS 3,000 และ throughput 125 MB/s
  * สามารถปรับ IOPS สูงสุด 16,000 และ throughput สูงสุด 1,000 MB/s **แยกจากกันได้**

> gp2 ผูกขนาด volume กับ IOPS ส่วน gp3 สามารถปรับแยกได้

## Provisioned IOPS SSD: io1 และ io2

* ใช้กับ **งานสำคัญที่ต้องการ IOPS สูงหรือสม่ำเสมอ** เช่น database
* **io1**

  * ขนาด: 4 – 16 TB
  * IOPS สูงสุด: 64,000 สำหรับ Nitro EC2, 32,000 สำหรับ instance อื่น
* **io2 Block Express**

  * ขนาด: สูงสุด 64 TB
  * Latency ต่ำกว่า 1 มิลลิวินาที
  * IOPS สูงสุด 256,000, อัตรา IOPS ต่อ GB = 1,000:1
* รองรับ **multi-attach** เพื่อใช้ volume เดียวกับหลาย instance

## Throughput Optimized และ Cold HDD: st1 และ sc1

* **ไม่สามารถใช้เป็น boot volume**
* ขนาดสูงสุด 16 TB
* **st1 (Throughput Optimized HDD)**

  * เหมาะกับ big data, data warehouse, log processing
  * Throughput สูงสุด 500 MB/s, IOPS สูงสุด 500
* **sc1 (Cold HDD)**

  * เหมาะกับข้อมูล archive, เข้าถึงไม่บ่อย
  * ราคาต่ำที่สุด, Throughput สูงสุด 250 MB/s, IOPS สูงสุด 250

> สำหรับสอบไม่ต้องจำตัวเลขทั้งหมด แค่เข้าใจ **ภาพรวมและการใช้งาน**

## Key Takeaways

* EBS มี 6 ประเภท: **gp2, gp3, io1, io2 Block Express, st1, sc1**
* **gp2, gp3** – General Purpose SSD, สมดุลราคาและประสิทธิภาพ; gp3 ปรับ IOPS และ throughput แยกได้
* **io1, io2** – Provisioned IOPS SSD, สำหรับงาน mission-critical, ประสิทธิภาพสูง, IOPS สูง
* **st1, sc1** – HDD สำหรับ throughput และราคาต่ำ แต่ **ไม่สามารถใช้เป็น boot volume**
