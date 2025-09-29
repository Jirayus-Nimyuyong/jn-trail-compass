# Amazon ECS

Amazon ECS ย่อมาจาก **Elastic Container Service** เมื่อคุณรัน Docker containers บน AWS จะถือว่าคุณกำลังรัน **ECS Task** บน **ECS Cluster** ซึ่ง ECS Cluster ประกอบด้วยหลายองค์ประกอบ ขึ้นอยู่กับ **Launch Type** ที่คุณเลือก

## EC2 Launch Type

ใน EC2 Launch Type, ECS Cluster ประกอบด้วย **EC2 instances** คุณต้องจัดเตรียมและดูแลโครงสร้างพื้นฐานด้วยตัวเอง

* แต่ละ EC2 instance จะรัน **ECS Agent** ซึ่งทำหน้าที่ลงทะเบียน instance เข้ากับ ECS service และ ECS Cluster ที่ระบุ
* เมื่อ setup เสร็จสิ้น คุณสามารถเริ่มหรือหยุด ECS tasks ได้ ระบบจะจัดวาง containers บน EC2 instances โดยอัตโนมัติ
* สรุป: ใน EC2 Launch Type, Docker containers จะถูกรันบน EC2 instances ที่คุณ provision ไว้

## Fargate Launch Type

Fargate Launch Type ให้คุณรัน Docker containers บน AWS **โดยไม่ต้องจัดการ infrastructure**

* ไม่มี EC2 instances ให้จัดการ เป็นแบบ **serverless**
* คุณสร้าง **Task Definitions** เพื่อกำหนด ECS tasks
* AWS จะรัน ECS tasks ตาม CPU และ RAM ที่คุณระบุ
* เมื่อรัน container ใหม่ คุณไม่ต้องรู้ว่ามันรันที่ไหน และไม่ต้องสร้าง EC2 instance
* การ scaling ง่าย: เพียงเพิ่มจำนวน tasks โดยไม่ต้องจัดการ EC2

**ข้อดี:** Fargate เหมาะสำหรับ serverless และการจัดการง่าย

## IAM Roles สำหรับ ECS Tasks

**EC2 Instance Profile Role**

* ใน EC2 Launch Type, EC2 instances แต่ละตัวที่รัน ECS Agent จะใช้ EC2 Instance Profile
* Profile นี้ช่วยให้ ECS Agent เรียก API ของ ECS, เขียน logs ไปยัง CloudWatch, ดึง Docker images จาก ECR, และเข้าถึง Secrets หรือ Parameter Store

**ECS Task Roles**

* ECS tasks แต่ละ task มี ECS Task Role ของตัวเอง ใช้ได้ทั้ง EC2 และ Fargate
* ตัวอย่าง: Task A มี Task Role A, Task B มี Task Role B
* Task Role ต่างกันช่วยให้ tasks เข้าถึง AWS services ต่างกัน เช่น Task A เข้าถึง S3, Task B เข้าถึง DynamoDB
* กำหนด Task Role ใน **Task Definition** ของ ECS service

**ข้อสำคัญ:** แยกความต่างระหว่าง **EC2 Instance Profile Role** สำหรับ ECS Agent และ **ECS Task Role** สำหรับ ECS tasks

## Load Balancer Integration

* ทั้ง EC2 และ Fargate สามารถรันหลาย ECS tasks ใน Cluster เดียวได้
* หากต้องการ expose tasks เป็น HTTP/HTTPS endpoint สามารถใช้ **Application Load Balancer (ALB)**
* ผู้ใช้เชื่อมต่อ ALB → ALB ส่ง traffic ไปยัง ECS tasks
* ALB เหมาะกับการใช้งานส่วนใหญ่
* **Network Load Balancer (NLB)** ใช้กับกรณี throughput สูง หรือใช้งานกับ PrivateLink
* **Classic Load Balancer** ใช้ได้ แต่ไม่แนะนำ เพราะฟีเจอร์จำกัด และไม่เชื่อมกับ Fargate
* ALB ใช้ได้ทั้ง EC2 และ Fargate

## Data Persistence บน Amazon ECS

* สำหรับ storage แบบถาวร ใช้ **Data Volumes**
* ตัวเลือกที่นิยมคือ **Amazon EFS** (Elastic File System)

  * เป็น network file system รองรับทั้ง EC2 และ Fargate
  * สามารถ mount filesystem ไปยัง ECS tasks ได้
  * Tasks ใน Availability Zone ต่าง ๆ สามารถแชร์ข้อมูลผ่าน filesystem
* การผสมที่แนะนำ: ใช้ **Fargate** รัน ECS tasks แบบ serverless + **EFS** สำหรับ storage ถาวร
* EFS เป็น serverless, จ่ายตามการใช้งาน (pay-as-you-go)
* Use case: storage ถาวรที่แชร์หลาย AZ สำหรับ containers

## ข้อสรุปสำคัญ (Key Takeaways)

* Amazon ECS รองรับ **สอง Launch Type**: EC2 Launch Type และ Fargate Launch Type
* **EC2 Launch Type** ต้อง provision และดูแล EC2 instances ที่รัน ECS Agent
* **Fargate Launch Type** เป็น serverless ไม่ต้องจัดการ infrastructure
* ECS ใช้ IAM roles:

  * **EC2 Instance Profile** สำหรับ ECS Agents
  * **ECS Task Roles** สำหรับ tasks แต่ละตัว
* **Application Load Balancer** แนะนำสำหรับ ECS tasks, NLB ใช้กับกรณี throughput สูง
* **Amazon EFS** ให้ storage ถาวรที่แชร์ได้ รองรับทั้ง EC2 และ Fargate