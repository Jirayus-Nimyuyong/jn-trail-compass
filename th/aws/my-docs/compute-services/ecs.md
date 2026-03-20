# Amazon Elastic Container Service (ECS) Cheat Sheet

**Amazon Elastic Container Service (Amazon ECS)** เป็นบริการจัดการ Container Orchestration แบบครบวงจร (Fully Managed) ที่ช่วยให้การติดตั้งใช้งาน (Deploy) การจัดการ และการสเกลแอปพลิเคชันที่รันบน Container เป็นเรื่องง่าย
* ช่วยสร้างประสบการณ์การสร้างและติดตั้งใช้งานที่สอดคล้องกัน ช่วยให้คุณจัดการและสเกลงานประเภท Batch และ ETL รวมถึงสร้างสถาปัตยกรรมแอปพลิเคชันที่ซับซ้อนในรูปแบบ Microservices
* Amazon ECS เป็นบริการระดับภูมิภาค (**Regional Service**)

---

## คุณสมบัติ (Features)
* คุณสามารถสร้าง ECS Cluster ภายใน VPC ใหม่หรือที่มีอยู่แล้วได้
* หลังจาก Cluster เริ่มทำงานแล้ว คุณสามารถกำหนด **Task Definitions** (คำจำกัดความของงาน) และ **Services** (บริการ) เพื่อระบุว่าจะรัน Docker Container Image ใดใน Cluster
* AWS Compute SLA รับประกันความพร้อมใช้งานรายเดือน (Monthly Uptime) อย่างน้อย 99.99% สำหรับ Amazon ECS
* **Amazon ECS Exec:** เป็นวิธีที่ช่วยให้ลูกค้าสามารถรันคำสั่งภายใน Container ที่รันบน Amazon EC2 หรือ AWS Fargate ได้ โดยให้การเข้าถึงแบบ Interactive Shell หรือรันคำสั่งเดียวไปยัง Container ที่กำลังทำงานอยู่
* **Amazon ECS Anywhere:** ช่วยให้คุณรัน ECS Task บนโครงสร้างพื้นฐาน On-premises ของคุณเอง (VM หรือ Bare Metal) ได้ โดยจัดการผ่านคอนโซลและ API มาตรฐานของ AWS ECS
* **Amazon ECS Service Connect:** ให้การสื่อสารระหว่างบริการแบบ Managed ที่ช่วยให้การตั้งค่าเครือข่ายง่ายขึ้นและเพิ่มความทนทาน โดยไม่ต้องใช้ Sidecar Proxy ที่ซับซ้อน
* **Task Scale-in Protection:** ช่วยให้คุณปกป้อง Task สำคัญ (เช่น งาน Batch ที่รันนาน) ไม่ให้ถูกปิดการทำงานในช่วงที่เกิดเหตุการณ์ Auto-scaling แบบ Scale-in (ลดจำนวนเครื่อง)

---

## ส่วนประกอบ (Components)

### คอนเทนเนอร์และอิมเมจ (Containers and Images)
* ส่วนประกอบของแอปพลิเคชันต้องถูกออกแบบให้รันใน **Containers** ซึ่งประกอบด้วยทุกสิ่งที่ซอฟต์แวร์ต้องการในการทำงาน: โค้ด, Runtime, เครื่องมือระบบ, ไลบรารี ฯลฯ
* Container ถูกสร้างจากเทมเพลตแบบ Read-only ที่เรียกว่า **Image** ซึ่งมักสร้างจาก **Dockerfile**
* อิมเมจจะถูกเก็บไว้ใน **Registry** (เช่น ECR) เพื่อดาวน์โหลดมารันใน Cluster
* คุณสามารถส่ง **User Data** ไปยัง Container Instance เพื่อรันสคริปต์หรือตั้งค่าอัตโนมัติขณะบูตเครื่องได้
* **Docker Volumes** สามารถเป็น Instance Store, EBS หรือ EFS โดยเชื่อมต่อผ่าน Docker Drivers และ Plugins

### ส่วนประกอบของงาน (Task Components)
* **Task Definitions:** ไฟล์ JSON ที่ระบุพารามิเตอร์ต่างๆ ของแอปพลิเคชัน (ระบุ Container ได้สูงสุด 10 ตัวต่อหนึ่งงาน) ประกอบด้วย:
    * **Task Family:** ชื่อของงาน ซึ่งแต่ละ Family สามารถมีหลาย Revision (เวอร์ชัน) ได้
    * **IAM Task Role:** ระบุสิทธิ์ที่ Container ในงานนั้นควรได้รับ
    * **Network Mode:** กำหนดรูปแบบเครือข่ายสำหรับ Container
    * **Container Definitions:** ระบุอิมเมจที่จะใช้, CPU/Memory ที่ได้รับจัดสรร ฯลฯ
    * **Volumes:** ใช้แชร์ข้อมูลระหว่าง Container หรือเก็บข้อมูลไว้แม้ Container จะหยุดทำงานไปแล้ว
    * **Task Placement Constraints:** ปรับแต่งวิธีการวาง Task ภายในโครงสร้างพื้นฐาน
    * **Launch Types:** กำหนดโครงสร้างพื้นฐานที่จะใช้รัน Task

### งานและการจัดตารางเวลา (Tasks and Scheduling)
* **Task:** คือการนำ Task Definition มาทำงานจริงภายใน Cluster
* สำหรับการรันแบบ **Fargate** แต่ละ Task จะมีขอบเขตการแยกตัว (Isolation) ของตัวเอง ไม่ใช้ Kernel, CPU, Memory หรือ ENI ร่วมกับ Task อื่น
* **Task Scheduler:** รับผิดชอบในการวาง Task ใน Cluster มีตัวเลือกดังนี้:
    * **REPLICA:** รักษาระดับจำนวน Task ตามที่ต้องการให้คงที่ โดยปกติจะกระจายตาม Availability Zones
    * **DAEMON:** ติดตั้ง Task หนึ่งตัวในทุกๆ Container Instance ที่ใช้งานอยู่และตรงตามเงื่อนไข
* หากมีการอัปเดตเวอร์ชันใหม่ของ Task Definition ตัว Scheduler จะเริ่มรัน Container ใหม่ด้วยอิมเมจอัปเดตและหยุด Container เวอร์ชันเก่าโดยอัตโนมัติ
* Task ที่รันบน EC2 และ Fargate สามารถ Mount ระบบไฟล์ **Amazon EFS** ได้

### คลัสเตอร์ (Clusters)
* เป็นการจัดกลุ่มทรัพยากรในเชิงตรรกะ (Logical Grouping) และเป็นบริการระดับภูมิภาค (Region-specific)
* **Launch Types:** Cluster สามารถประกอบด้วย Task ที่ใช้ Fargate, EC2 และ External (ECS Anywhere) พร้อมกันได้
* **Capacity Providers (Cluster Auto-Scaling):** อินเทอร์เฟซสมัยใหม่สำหรับจัดการโครงสร้างพื้นฐานเบื้องหลัง ช่วยให้ ECS สเกล EC2 Auto Scaling Groups (ASG) เข้า-ออกตามความต้องการจริงของ Task (Managed Scaling)
* **Amazon ECS Anywhere:** ต้องการการติดตั้ง **Amazon SSM Agent** และ **ECS Container Agent** บนเซิร์ฟเวอร์ On-premises และต้องการการเชื่อมต่อขาออก (Outbound) ไปยัง AWS API

### บริการ (Services)
* ช่วยให้รันและรักษาจำนวนชุดของ Task Definition ตามที่ระบุไว้ และสามารถรันอยู่หลัง Load Balancer ได้
* **กลยุทธ์การติดตั้งใช้งาน (Deployment Strategies):**
    * **Rolling Update:** ค่อยๆ แทนที่เวอร์ชันเก่าด้วยเวอร์ชันใหม่ตามจำนวนขั้นต่ำ/สูงสุดที่กำหนด
    * **Blue/Green Deployment (with AWS CodeDeploy):** ช่วยให้ตรวจสอบเวอร์ชันใหม่ได้ก่อนจะส่งทราฟฟิกจริงไปหา

### คอนเทนเนอร์เอเจนต์ (Container Agent)
* รันบนทรัพยากรโครงสร้างพื้นฐานภายใน ECS Cluster เพื่อส่งข้อมูลสถานะการทำงานและการใช้ทรัพยากรกลับไปยัง ECS
* **รองรับเฉพาะบนอินสแตนซ์ Amazon EC2 เท่านั้น**

### การทำ Load Balancing ของบริการ
* รองรับ ALB, NLB และ Classic Load Balancer
* **Application Load Balancer (ALB):** รองรับ **Dynamic Port Mapping** ทำให้สามารถรัน Task หลายตัวจากบริการเดียวกันบน Container Instance ตัวเดียวได้
* **หมายเหตุ:** บริการที่ใช้โหมดเครือข่าย `awsvpc` (เช่น Fargate) ไม่รองรับ Classic Load Balancer

---

## AWS Fargate
* รัน Container ได้โดยไม่ต้องจัดการเซิร์ฟเวอร์หรือ Cluster ของ EC2 (Serverless)
* รองรับเฉพาะอิมเมจจาก **ECR** หรือ **Docker Hub** เท่านั้น
* **Task Definitions สำหรับ Fargate:**
    * ต้องใช้โหมดเครือข่ายแบบ `awsvpc` (แต่ละ Task จะมี ENI ของตัวเอง)
    * ต้องระบุ CPU และ Memory ในระดับ Task
    * รองรับเฉพาะ Log Driver แบบ `awslogs` เพื่อส่งล็อกไปยัง CloudWatch
    * พื้นที่เก็บข้อมูลเป็นแบบชั่วคราว (**Ephemeral**) โดยเริ่มต้นที่ 20 GiB (ปรับได้สูงสุด 200 GiB)
    * รองรับโปรเซสเซอร์ **AWS Graviton2 (ARM64)**

---

## การตรวจสอบ (Monitoring)
* ส่งข้อมูลล็อกไปยัง **CloudWatch Logs** ได้
* ใช้ **CloudWatch Alarms** เพื่อแจ้งเตือนหรือดำเนินการตามเกณฑ์ที่กำหนด
* ทำงานร่วมกับ **AWS CloudTrail** เพื่อบันทึกการเรียกใช้งาน API

---

## ค่าบริการ (Pricing)
* **Fargate:** จ่ายตามจำนวน vCPU และ Memory ที่เรียกใช้ (คำนวณตั้งแต่เริ่มดึงอิมเมจจนถึง Task หยุดทำงาน)
* **EC2 Launch Type:** ไม่มีค่าบริการเพิ่มเติมสำหรับ ECS แต่จ่ายตามทรัพยากร AWS ที่ใช้ (เช่น EC2, EBS)
* **Amazon ECS Anywhere:** จ่ายค่าธรรมเนียมรายชั่วโมงแบบคงที่ต่อหนึ่ง Managed Instance ที่ลงทะเบียนไว้ (ประมาณ $0.01025 ต่อชั่วโมงต่ออินสแตนซ์) โดยไม่เสียค่าประมวลผลของเครื่อง On-premises ให้กับ AWS