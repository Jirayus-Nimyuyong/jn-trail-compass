# AWS ParallelCluster Cheat Sheet

**AWS ParallelCluster** เป็นเครื่องมือจัดการคลัสเตอร์แบบ Open-source ที่ได้รับการสนับสนุนจาก AWS ซึ่งช่วยให้การติดตั้งใช้งานและจัดการคลัสเตอร์สำหรับการประมวลผลประสิทธิภาพสูง (High Performance Computing - HPC) บน AWS เป็นเรื่องง่าย
* AWS ParallelCluster จะจัดเตรียม **Master Instance** สำหรับการสร้างและควบคุม, **Compute Instances** สำหรับการประมวลผล, **Shared Filesystem** (ระบบไฟล์แชร์) และ **Batch Scheduler** (ตัวจัดตารางงาน)
* คุณสามารถขยายและปรับแต่งการใช้งานได้ผ่านสคริปต์ **Bootstrap** ทั้งแบบ Pre-install และ Post-install

---

## รูปแบบการทำงาน (How It Works)
* **Scheduler ที่รองรับ:** มี 4 ตัวเลือกหลักที่ใช้ร่วมกับ ParallelCluster ได้แก่ **Slurm**, **AWS Batch** (และตัวเลือกอื่นๆ ตามเวอร์ชัน)
* **ประเภทอินสแตนซ์:** รองรับทั้ง On-Demand, Reserved และ Spot Instances

---

## การเครือข่าย (Networking)
* ใช้ **Amazon VPC** ในการเชื่อมต่อ โดย VPC ต้องตั้งค่า DNS Resolution และ DNS Hostnames เป็น "Yes"
* **รูปแบบการตั้งค่า Subnet:**
    1. Subnet เดียวกันทั้งสำหรับ Master และ Compute Instances
    2. แยกสอง Subnet โดยให้ Master อยู่ใน Public Subnet และ Compute อยู่ใน Private Subnet
* รองรับการใช้งานผ่าน **HTTP Proxy** สำหรับการเรียกใช้ AWS requests ทั้งหมด
* รองรับ **Elastic Fabric Adapter (EFA)** ในอินสแตนซ์รุ่นที่กำหนด เพื่อให้ได้ความหน่วง (Latency) ที่ต่ำและสม่ำเสมอ และมี Throughput สูงสำหรับการสื่อสารระหว่างอินสแตนซ์

---

## การจัดเก็บข้อมูล (Storage)
* **ค่าเริ่มต้น:** ระบบจะกำหนดค่า EBS volume ขนาด 15 GB ต่อเข้ากับ Master Node และแชร์ไปยัง Compute Nodes ผ่านทาง **NFS**
* **บริการที่รองรับ:** ทำงานร่วมกับ Amazon EBS, EFS, FSx for ONTAP, FSx for OpenZFS, FSx for Lustre และ Amazon File Cache ได้
* สามารถใช้ **Amazon S3** เป็นแหล่งข้อมูลขาเข้า (Input) หรือที่เก็บผลลัพธ์ (Output) ของงานได้

---

## การตั้งค่าคลัสเตอร์ (Cluster Configuration)
* ใช้ไฟล์ **YAML** ที่ชื่อว่า `cluster-config.yaml` ในการกำหนดทรัพยากร, คิว (Queues) และการตั้งค่าต่างๆ
* **คุณสมบัติที่สำคัญ:**
    * **Region:** ระบุภูมิภาค AWS ที่จะรันคลัสเตอร์
    * **CustomS3Bucket:** ระบุชื่อ S3 Bucket เพื่อเก็บทรัพยากรของคลัสเตอร์ (เช่น ไฟล์ Config, Log)
    * **AdditionalResources:** ระบุเทมเพลต AWS CloudFormation เพิ่มเติมเพื่อรันพร้อมกับคลัสเตอร์ สำหรับทรัพยากรภายนอกที่เกี่ยวข้อง

---

## ระบบหลายคิวและอินสแตนซ์แบบผสม (Multiple Queues & Mixed Instances)
* **Multiple Queues:** กำหนดคิวงานได้สูงสุด 50 คิวต่อหนึ่งคลัสเตอร์ โดยแต่ละคิวจะจับคู่กับ Partition ใน Slurm
* **Mixed Instance Types:** สามารถผสมประเภทอินสแตนซ์ที่แตกต่างกันในคลัสเตอร์เดียวได้ (สูงสุด 50 Compute Resources ต่อคิว) เช่น ในคิวเดียวมีทั้ง `c5.large` (On-Demand) และ `c5.xlarge` (Spot)
* **Prioritization:** กำหนดลำดับความสำคัญของคิวได้ เพื่อให้งานวิกฤตได้รับทรัพยากรก่อน
* **Multi-AZ Support:** คิวสามารถครอบคลุมหลาย Availability Zones เพื่อเข้าถึงทรัพยากรได้มากขึ้น (แต่อาจส่งผลต่อความหน่วงในงานที่ต้องเชื่อมต่อกันอย่างใกล้ชิด)

---

## กระบวนการทำงานของคลัสเตอร์ (Cluster Processes)
เมื่อคลัสเตอร์รันอยู่ (โดยเฉพาะกับ Slurm) จะมี Daemon เฉพาะคอยจัดการ:
* **clustermgtd:** รันบน Head Node จัดการวงจรชีวิตของ Compute Fleet (เปิด/ปิดเครื่อง) และตรวจสอบสุขภาพของระบบ
* **clusterstatusmgtd:** รันบน Head Node ดึงสถานะจาก DynamoDB ทุกนาที และประมวลผลคำสั่งเริ่ม/หยุดคลัสเตอร์
* **computemgtd:** รันบนแต่ละ Compute Node คอยตรวจสอบสุขภาพของ Head Node ทุกๆ 5 นาที หากติดต่อ Head Node ไม่ได้ มันจะสั่งปิดตัวเองโดยอัตโนมัติ

---

## ค่าบริการ (Pricing)
* **ไม่มีค่าธรรมเนียมเพิ่มเติมสำหรับ AWS ParallelCluster** คุณจ่ายเฉพาะค่าทรัพยากร AWS ที่ใช้ในการรันแอปพลิเคชันของคุณเท่านั้น

---

## ข้อจำกัด (Limitations)
* **ไม่รองรับ Windows:** ทั้ง Head Node และ Compute Fleet ต้องเป็นระบบปฏิบัติการ Linux เท่านั้น
* **ข้อจำกัด Multi-AZ:** แม้จะตั้งค่าคิวข้าม AZ ได้ แต่จะไม่รองรับ **Elastic Fabric Adapter (EFA)** และ **Placement Groups** ในคิวลักษณะนี้เนื่องจากข้อจำกัดด้านความหน่วง (Latency)
