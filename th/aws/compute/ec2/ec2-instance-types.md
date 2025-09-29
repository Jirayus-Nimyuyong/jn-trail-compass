# EC2 Instance Types

**ประเภทของ EC2 Instance** บน AWS ซึ่งถูกออกแบบมาสำหรับงาน (use case) ที่แตกต่างกัน โดยแต่ละประเภทมีการปรับแต่งให้เหมาะสมกับการใช้งานที่เฉพาะเจาะจง ปัจจุบัน AWS มี **7 ประเภทหลัก** ของ EC2 Instance ที่สามารถดูรายละเอียด ค่าใช้จ่าย และข้อมูลล่าสุดได้จากเว็บไซต์ AWS

## **หลักการตั้งชื่อ EC2 Instance ของ AWS**

AWS ใช้รูปแบบการตั้งชื่อเฉพาะสำหรับ EC2 Instance เช่น:

ตัวอย่าง: **m5.2xlarge**

* **M** → หมายถึง **instance class** (ในที่นี้คือ General Purpose Instance)
* **5** → หมายถึง **generation** หรือรุ่นของ Instance (เช่น m5 → m6 เมื่อฮาร์ดแวร์พัฒนาขึ้น)
* **2xlarge** → หมายถึง **ขนาดของ instance** ภายในคลาสนั้น ๆ โดยมีลำดับตั้งแต่ small, large, 2xlarge, 4xlarge, ไปเรื่อย ๆ

👉 ขนาดของ instance จะสะท้อนถึง **ปริมาณหน่วยความจำ (RAM)** และ **พลังการประมวลผล (CPU)** ที่มากขึ้น

## **ประเภทของ EC2 Instance**

### **General Purpose Instances**

* ใช้งานได้หลากหลาย เหมาะสำหรับงานทั่วไป เช่น **Web Server, Code Repository**
* มีการผสมผสานที่สมดุลระหว่าง **Compute, Memory และ Networking**
* รายการ instance ประเภทนี้มีการอัปเดตตลอดเวลาในเว็บไซต์ AWS

### **Compute Optimized Instances**

* ออกแบบมาสำหรับงานที่ต้องการ **พลังการประมวลผลสูง (CPU-Intensive)**
* **Use Cases**:

  * Batch processing ของข้อมูล
  * Media transcoding
  * High performance web servers
  * High Performance Computing (HPC)
  * Machine Learning
  * Dedicated Gaming Servers
* Instance กลุ่มนี้ระบุด้วย **C Series** เช่น **C5, C6**

### **Memory Optimized Instances**

* ออกแบบมาสำหรับงานที่ต้องการ **ประมวลผลข้อมูลชุดใหญ่ในหน่วยความจำ (RAM)**
* **Use Cases**:

  * ฐานข้อมูล relational และ non-relational ที่ต้องการประสิทธิภาพสูง (โดยเฉพาะ In-memory DB)
  * Distributed cache stores เช่น **ElastiCache**
  * Business Intelligence (BI)
  * Real-time big data analytics
* ตัวอย่าง: **R Series** (R = RAM), **X1**, **High Memory**, **Z1**

### **Storage Optimized Instances**

* เหมาะสำหรับงานที่ต้องเข้าถึง **ข้อมูลขนาดใหญ่จาก local storage บ่อยครั้ง**
* **Use Cases**:

  * High Frequency OLTP systems
  * Relational & NoSQL Databases
  * In-memory cache เช่น Redis
  * Data warehousing
  * Distributed file systems
* ระบุด้วย prefix: **I, D, H1**

## **การเปรียบเทียบ EC2 Instance Types**

ตัวอย่างการเปรียบเทียบ:

* **t2.micro** → 1 vCPU, RAM 1 GB
* **r5.16xlarge** → 16 vCPU, RAM 512 GB (เน้น RAM)
* **c5d.4xlarge** → 16 vCPU, RAM 32 GB (เน้น CPU)

นอกจากนี้ยังแตกต่างกันด้าน **Network Performance และ EBS Bandwidth**

👉 แนะนำเว็บไซต์ **ec2instances.info** สำหรับการเปรียบเทียบสเปกและราคาของ EC2 Instance ทุกรุ่น

## **สรุป (Conclusion)**

* เราได้เรียนรู้ภาพรวมของ **EC2 Instance Types**, หลักการตั้งชื่อ และ use case ของแต่ละประเภท
* สำหรับรายละเอียดเชิงลึกและข้อมูลล่าสุด ควรอ้างอิงจาก **เว็บไซต์ AWS** หรือ **ec2instances.info**