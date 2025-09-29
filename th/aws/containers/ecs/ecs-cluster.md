# การสร้าง ECS Cluster

จากนั้นไปที่ส่วน **Clusters** เพื่อสร้างคลัสเตอร์แรกของเรา เราจะตั้งชื่อคลัสเตอร์นี้ว่า **DemoCluster** และใช้ค่า **namespace** เริ่มต้นตามที่ระบบกำหนด

## ตัวเลือกโครงสร้างพื้นฐาน (Infrastructure Options)

มีตัวเลือกโครงสร้างพื้นฐานสามแบบให้เลือก:

1. **AWS Fargate**:

   * เราเพียงแค่ส่ง containers ให้ AWS
   * AWS จะรัน containers เหล่านี้ตามความต้องการ
   * เป็นตัวเลือกแบบ **serverless** ที่ AWS จัดการทรัพยากรคอมพิวต์ทั้งหมด

2. **Amazon EC2 Instances**:

   * เราต้องจัดเตรียม EC2 instances ของเราเองเพื่อรัน containers

3. **External Instances (ECS Anywhere)**:

   * สามารถรัน ECS containers บน **data center ของตัวเอง** หรือ infrastructure ภายนอก

สำหรับตัวอย่างนี้ เราจะใช้ **ทั้ง Fargate และ Amazon EC2 instances** พร้อมสร้าง **Auto Scaling Group** ใหม่สำหรับ EC2 instances

## การตั้งค่า EC2 Instance

* **Operating System:** Amazon Linux 2 (หรือ Amazon Linux 2023 เป็นทางเลือก)
* **EC2 Instance Type:** t2.micro (สามารถใช้ free tier ได้)
* **Desired Capacity:** Minimum 0, Maximum 5
* **SSH Key Pair:** ไม่มีการตั้งค่า
* **Root EBS Volume Size:** ใช้ค่าเริ่มต้น

## การตั้งค่า Network

* **VPC:** Default VPC
* **Subnets:** 3 Subnets ที่มีอยู่
* **Security Group:** ใช้ default security group
* **Auto-assign Public IP:** ใช้ค่า default ของ subnet

เราไม่ปรับการตั้งค่า **monitoring** หรือ **tags**

หลังจากกำหนดค่าเสร็จ คลิก **Create** เพื่อเริ่มสร้างคลัสเตอร์

## การตรวจสอบ Auto Scaling Group

ขณะที่คลัสเตอร์กำลังสร้าง เราสามารถดู **Auto Scaling Group** ใน AWS Console

* Auto Scaling Group ที่ชื่อ **Infra-ECS-Cluster** จะถูกสร้างขึ้น

  * Desired Capacity: 0
  * Minimum Capacity: 0
  * Maximum Capacity: 5
* กลุ่มนี้ครอบคลุม **3 Availability Zones** เพื่อให้ ECS tasks สามารถรันได้ข้าม AZ

เมื่อคลัสเตอร์สร้างเสร็จ เราสามารถเข้าไปสำรวจ **DemoCluster** ได้ ตอนแรกจะมี **services และ tasks = 0** เพราะยังไม่มีการรันอะไร

## โครงสร้างพื้นฐานของ ECS Cluster

ในคลัสเตอร์ ภายใต้ส่วน **infrastructure** จะพบ **3 capacity providers**

1. **FARGATE:** รัน Fargate tasks บน ECS cluster
2. **FARGATE_SPOT:** รัน Fargate tasks แบบ spot instances
3. **ASGProvider:** รัน EC2 instances ผ่าน Auto Scaling Group (ASG)

* ปัจจุบัน ASGProvider มี **Managed Scaling Size = 0** ซึ่งสามารถปรับได้
* เพื่อสาธิต เราสามารถแก้ **Desired Capacity ของ ASGProvider = 1**

  * จะสร้าง **EC2 instance** ที่ลงทะเบียนกับ **DemoCluster** เป็น **container instance**

เมื่อ EC2 instance รันและลงทะเบียนเรียบร้อย จะปรากฏใน **Container Instances** ของคลัสเตอร์

* ตัวอย่าง instance: t2.micro

  * CPU units: 1,024
  * Memory: 982 MB
* สามารถรัน ECS tasks บน instance นี้จนกว่าความจุเต็ม

## สรุป

เราได้สร้าง **ECS Cluster** พร้อม **หลาย capacity providers** และลงทะเบียน **EC2 container instances** เรียบร้อยแล้ว

* ECS tasks สามารถรันได้ทั้งบน **Fargate** หรือ **EC2 instances** ที่จัดการโดย Auto Scaling Group