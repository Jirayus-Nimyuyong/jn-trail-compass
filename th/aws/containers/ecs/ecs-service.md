# การสร้าง ECS Service

เราจะสร้าง Task Definition ใหม่จาก **Task Definition Panel** และตั้งชื่อว่า **nginxdemos-hello**

* Task Definition นี้ใช้ **Docker Image** ชื่อ `nginxdemohello` จาก **Docker Hub**
* ชื่อ Task Definition จึงตั้งให้ตรงกับ image

ต่อมาเลือก **Infrastructure Requirements**

* เราตัดสินใจว่าจะรันบน **Fargate** หรือ **Amazon EC2 instances**
* เราเปิดใช้งาน **Fargate** เพื่อให้สามารถรันแบบ serverless ได้

เลือก **Operating System และ Architecture**

* ใช้ Linux
* ระบุขนาดของ Task สำหรับ Fargate container

  * ตัวอย่าง: 0.5 หรือ 1 vCPU และปรับ memory ตามความเหมาะสม
* เพื่อความประหยัด เลือก **0.5 vCPU และ 1 GB memory**

**Task Role**

* เป็น IAM role ที่ assigned ให้ task หากต้องการเรียก AWS API
* ตัวอย่างนี้ไม่จำเป็น จึงไม่ระบุ
* **Task Execution Role** ใช้ค่า default หากไม่มี ECS จะสร้างให้โดยอัตโนมัติ

**การตั้งค่า Container**

* ชื่อ container: `nginxdemos-hello`
* Image URL: `nginxdemoshello/hello` (ดึงจาก Docker Hub อัตโนมัติ)
* **Port Mapping:** map port 80 ของ container → port 80 ของ host (ค่า default สำหรับ nginx)
* ค่าอื่น ๆ เช่น resource limits, environment variables, logging ใช้ค่า default
* Fargate ephemeral storage ตั้งค่า default 21 GB

หลังจากสร้างเสร็จ จะได้ **Task Definition Version 2** (สำหรับผู้เริ่มใหม่จะเป็น Version 1)

## การ Launch ECS Service

* ไปที่ **Clusters** เลือก DemoCluster
* ภายใต้ **Services** คลิกสร้าง **New Service**
* ระบุ Task Definition family: `nginxdemoshello` และ **Latest Revision**: 2
* ตั้งชื่อ service ตามต้องการ
* สำหรับ compute configuration ใช้ **Default Capacity Provider Strategy** กับ Fargate
* Platform version: Latest
* Deployment configuration: **1 desired task** (ลดค่าใช้จ่าย, สามารถเพิ่มได้ เช่น 4 tasks สำหรับ scaling)
* Availability zone rebalancing และ deployment options ใช้ค่า default
* Networking: เลือก Subnets และสร้าง Security Group ใหม่ **อนุญาต HTTP traffic จากทุกที่ไป port 80**
* เปิดใช้งาน **Public IP assignment**
* Load Balancing: เปิดใช้งาน, สร้าง **Application Load Balancer** ชื่อ DemoALBForECS พร้อม listener port 80
* สร้าง **Target Group** ชื่อ nginxdemosTG port 80
* ไม่ตั้งค่า VPC Lattice, Service Auto Scaling หรือ Volumes ในตอนนี้

**ผลลัพธ์**

* Service ถูก deploy สำเร็จ
* แสดง **1 desired task running**
* Service เชื่อมกับ **Target Group** และ **Application Load Balancer**
* Target Group แสดง **Private IP ของ container**
* Load Balancer active → ใช้ DNS name เข้าถึงหน้า nginx welcome page ได้
* ดูรายละเอียด Task: configuration, revision, launch location, private IP, container logs
* Service events: task start, registered in target group, deployment complete, steady state
* ทดสอบเข้าด้วย URI ต่าง ๆ → nginx ทำงานตามคาด

## การ Scaling ECS Service

* อัปเดต **desired number of tasks** เช่น 3 (หนึ่งต่อ Availability Zone)
* Task Definition และ compute configuration ไม่เปลี่ยน
* ECS จะ provision **Fargate tasks** เพิ่ม 2 task อัตโนมัติ
* Tasks transition: pending → activating → running
* Refresh หน้า service → IP address เปลี่ยนตาม ALB distributing load

**ผลลัพธ์:** ECS + Fargate สามารถ scale services ได้อัตโนมัติ

## การ Scaling Down และการจัดการค่าใช้จ่าย

* อัปเดต service → **0 desired tasks**
* Service configuration ยังอยู่ แต่ไม่มี container รัน
* ตั้ง **Desired Capacity ของ Auto Scaling Group = 0** → ไม่มี EC2 instance รันสำหรับ ECS
* ตรวจสอบว่าทุก task หยุดแล้ว และ review service events

## สรุป

* สร้าง **ECS Cluster**
* สร้าง **Task Definition**
* Launch **ECS Service** บน Fargate
* Scale service ขึ้นและลง
* ตรวจสอบ **Load Balancing** และ **Cost Management**

## Key Takeaways

* สร้าง ECS Task Definition `nginxdemos-hello` ใช้ Docker image จาก Docker Hub
* ตั้งค่า Task ให้รันบน **AWS Fargate** พร้อม vCPU และ memory ที่กำหนด
* Launch ECS Service **1 task** และเชื่อมกับ **Application Load Balancer port 80**
* สาธิต **การ Scale Service** → เพิ่มจำนวน tasks และตรวจสอบ Load Balancing
* แสดง **การ Scale Down Service** เป็น 0 tasks เพื่อลดค่าใช้จ่าย แต่ยังเก็บ configuration ไว้