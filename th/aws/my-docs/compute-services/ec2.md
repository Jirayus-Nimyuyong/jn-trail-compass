# Amazon EC2 Cheat Sheet (ฉบับแปลภาษาไทย)

**Amazon EC2** คือ Virtual Server (เซิร์ฟเวอร์เสมือน) ที่รองรับทั้งระบบปฏิบัติการ Linux, Windows และ Mac ที่คุณสามารถจัดเตรียมใช้งานได้
* คุณถูกจำกัดการรัน On-Demand Instance ตามขีดจำกัด vCPU, การซื้อ Reserved Instance ได้ 20 เครื่อง และการขอ Spot Instance ตามขีดจำกัดแบบไดนามิกในแต่ละภูมิภาค (Region)
* **Amazon Elastic Compute Cloud (Amazon EC2)** เป็นบริการเว็บที่ให้กำลังการประมวลผลที่ปลอดภัยและปรับขนาดได้บนคลาวด์
* ช่วยให้การคำนวณบนคลาวด์ในระดับเว็บสเกลง่ายขึ้นสำหรับนักพัฒนา และให้การควบคุมทรัพยากรการประมวลผลของคุณอย่างสมบูรณ์

## ไฮไลท์สำคัญ (Key Highlights)
* **การเข้าถึงทั่วโลก (Global Reach):** ติดตั้งใช้งานได้มากกว่า 30+ Regions และ Local Zones
* **ปลอดภัย (Secure):** ตรวจสอบการบูตด้วย NitroTPM และการแยกเครือข่ายผ่าน VPC
* **ยืดหยุ่น (Flexible):** เลือกโปรเซสเซอร์ได้หลากหลาย (Intel, AMD, Graviton) และรูปแบบการซื้อ (Spot, On-Demand, Savings Plans)

---

## คุณสมบัติของ Amazon EC2 (Amazon EC2 Features)

* **AWS Nitro System:** แพลตฟอร์มพื้นฐานสำหรับ EC2 ยุคใหม่ โดยการแยกหน้าที่ของ Hypervisor (การจัดการ CPU, Storage, Networking) ไปไว้ที่ฮาร์ดแวร์และซอฟต์แวร์เฉพาะทาง ช่วยลดต้นทุนและเพิ่มประสิทธิภาพให้ใกล้เคียงกับ Bare Metal (เครื่องจริง) มากกว่า Xen Hypervisor แบบเดิม
* **Instances:** สภาพแวดล้อมของเซิร์ฟเวอร์เสมือน
* **Amazon Machine Images (AMIs):** เทมเพลตที่รวม OS และซอฟต์แวร์ต่างๆ เพื่อนำไปสร้าง Instance ซ้ำได้
* **Instance Types:** รูปแบบการกำหนดค่า CPU, หน่วยความจำ และพื้นที่เก็บข้อมูล:
    * **t-type และ m-type:** สำหรับการใช้งานทั่วไป (General Purpose)
    * **c-type:** สำหรับการประมวลผลประสิทธิภาพสูง (Compute Optimized)
    * **r-type, x-type, และ z-type:** สำหรับงานที่เน้นหน่วยความจำ (Memory Optimized)
    * **d-type, h-type, และ i-type:** สำหรับงานที่เน้นการจัดเก็บข้อมูล (Storage Optimized)
    * **f-type, g-type, p-type, trn-type, และ inf-type:** สำหรับการเร่งการประมวลผล (Accelerated Computing/AI/ML)
* **EC2 Instance Attestation:** ฟีเจอร์ความปลอดภัยที่ใช้ **NitroTPM** เพื่อตรวจสอบความถูกต้องของซอฟต์แวร์และตัวตนของ Instance (Attestable AMIs)
* **EC2 Instance Connect:** วิธีเชื่อมต่อกับ Instance ผ่าน SSH หรือ RDP ที่ง่ายและปลอดภัยโดยไม่ต้องจัดการ Key Pairs เอง
* **Key Pairs:** ข้อมูลล็อกอินที่ปลอดภัยสำหรับ Instance
* **Instance Store Volumes:** พื้นที่เก็บข้อมูลชั่วคราวที่จะ **ถูกลบออก** เมื่อเครื่องถูกหยุด (STOP) หรือถูกยกเลิก (TERMINATE)
* **Elastic Block Store (EBS) Volumes:** พื้นที่เก็บข้อมูลแบบถาวร (Persistent)
* **Security Groups:** ไฟร์วอลล์เสมือนเพื่อกำหนดโปรโตคอล, พอร์ต และช่วง IP ที่เข้าถึง Instance ได้
* **Elastic IP addresses:** ที่อยู่ IPv4 แบบคงที่ (Static) สำหรับการใช้งานคลาวด์แบบไดนามิก
* **User-data:** สคริปต์ที่จะรันอัตโนมัติเมื่อเริ่มบูตเครื่องครั้งแรก
* **EC2 Hibernation (การจำศีล):** บันทึกสถานะข้อมูลในหน่วยความจำ (RAM) ลงใน EBS Volume เมื่อเปิดเครื่องกลับมาสถานะเดิมจะยังคงอยู่ (รองรับเฉพาะ EBS-backed ที่มีการเข้ารหัส)

---

## สถานะของ Instance (Instance States)



1.  **Start:** รัน Instance ปกติ และเริ่มคิดค่าบริการ
2.  **Stop:** การปิดเครื่องปกติ ข้อมูลใน EBS จะยังอยู่ แต่ข้อมูลใน Instance Store จะถูกลบ ไม่คิดค่าบริการรายชั่วโมงในสถานะนี้
3.  **Hibernate:** เขียนสถานะในหน่วยความจำลงไฟล์ใน Root EBS volume แล้วปิดเครื่อง จ่ายค่าบริการเฉพาะ EBS และ Elastic IP ที่เชื่อมต่ออยู่
4.  **Terminate:** ปิดเครื่องถาวรและถูกลบออก ไม่สามารถเริ่มรันใหม่ได้ โดยปกติ Root Volume จะถูกลบตามไปด้วย (เว้นแต่จะตั้งค่าไว้)

---

## รูปแบบพื้นที่เก็บข้อมูล Root (Root Device Volumes)

* **Instance Store-backed:** ข้อมูลจะสูญหายทันทีหาก Instance ถูกยกเลิก หรือหากไดรฟ์พื้นฐานมีปัญหา (ไม่รองรับการสั่ง Stop)
* **Amazon EBS-backed:** สามารถสั่ง Stop และ Restart ได้โดยข้อมูลไม่หาย สามารถเปลี่ยนขนาดเครื่อง (Instance Size) หรืออัปเดต Kernel ได้ในขณะที่เครื่องหยุดทำงาน

---

## ประเภทของ AMI

* **Backed by Amazon EBS:** Root device เป็น EBS volume รองรับการเข้ารหัส (Encryption)
* **Backed by Instance Store:** Root device เป็น Instance store ที่สร้างจากเทมเพลตใน S3

| คุณลักษณะ | EBS-backed AMI | Instance Store-backed AMI |
| :--- | :--- | :--- |
| เวลาในการบูต | ปกติน้อยกว่า 1 นาที | ปกติน้อยกว่า 5 นาที |
| ความจุสูงสุดของ Root | 64 TiB | 10 GiB |
| ความคงทนของข้อมูล | ข้อมูลใน EBS จะคงอยู่ (หากไม่ตั้งให้ลบตอน Terminate) | ข้อมูลหายเมื่อจบวงจรชีวิตเครื่อง |
| สถานะ Stopped | ทำได้ | ทำไม่ได้ (มีแค่ Running หรือ Terminated) |

---

## การกำหนดราคา (Amazon EC2 Pricing)

* **Savings Plans:** จ่ายล่วงหน้า/สัญญาการใช้งาน 1 หรือ 3 ปี (ลดสูงสุด 72%) ครอบคลุม EC2, Fargate, และ Lambda
* **On-Demand:** จ่ายตามจริงเป็นวินาที ไม่ต้องมีข้อผูกมัด
* **Reserved Instances (RI):** สัญญาการใช้งาน 1 หรือ 3 ปี เพื่อรับส่วนลด:
    * **Standard RI:** ส่วนลดสูงสุด แต่ปรับเปลี่ยนคุณสมบัติได้จำกัด
    * **Convertible RI:** ส่วนลดน้อยกว่า แต่แลกเปลี่ยนเป็นรุ่นอื่นในตระกูลที่ต่างกันได้
* **Spot Instances:** ประมูลทรัพยากรที่ว่างอยู่ (ลดสูงสุด 90%) แต่อาจถูก AWS ดึงทรัพยากรคืนได้ (มีการแจ้งเตือนล่วงหน้า 2 นาที)
* **Dedicated Hosts:** เช่าเครื่อง Server ทางกายภาพทั้งเครื่อง เหมาะสำหรับซอฟต์แวร์ที่มีไลเซนส์แบบ per-core/per-socket
* **On-Demand Capacity Reservations:** จองพื้นที่ใน AZ ที่ระบุ เพื่อรับประกันว่าจะมีทรัพยากรพร้อมใช้งานแน่นอน

---

## ความปลอดภัย (Amazon EC2 Security)

* ใช้ **IAM** เพื่อควบคุมการเข้าถึงทรัพยากร (Roles/Policies)
* **Security Groups:**
    * เป็น Stateful (ถ้าอนุญาตขาเข้า ขาออกจะได้รับอนุญาตอัตโนมัติ)
    * กฎเป็นแบบ Permissive (อนุญาตเท่านั้น ไม่สามารถสั่ง Deny เจาะจงได้)
    * โดยปกติจะอนุญาต Outbound ทั้งหมด
* ควรปิดการล็อกอินด้วย Password และใช้ Key Pairs แทน

---

## การเครือข่าย (Amazon EC2 Networking)

* **Elastic IP:** Static IPv4 ที่ย้ายไปผูกกับเครื่องอื่นได้ทันทีเมื่อเครื่องเดิมเสีย
* **Elastic Network Interface (ENI):** การ์ดแลนเสมือน (eth0 คือตัวหลัก ลบไม่ได้)
* **Enhanced Networking:** ให้ประสิทธิภาพแบนด์วิดท์และ PPS (Packet Per Second) สูงขึ้น
* **Elastic Fabric Adapter (EFA):** การ์ดเครือข่ายพิเศษสำหรับงาน HPC (High Performance Computing) และ Machine Learning

---

## ตำแหน่งการวางเครื่อง (Placement Groups)

* **Cluster:** วางเครื่องไว้ใกล้กันใน AZ เดียวกัน (Low-latency/High-throughput)
* **Spread:** วางเครื่องแยกฮาร์ดแวร์กัน เพื่อลดความเสี่ยงเมื่อฮาร์ดแวร์ตัวใดตัวหนึ่งเสีย (สูงสุด 7 เครื่องต่อ AZ)
* **Partition:** แบ่งเครื่องออกเป็นส่วนๆ (Partition) ไม่ให้ใช้ฮาร์ดแวร์ร่วมกัน เหมาะสำหรับงาน Distributed Workloads (HDFS, HBase, Cassandra)

---

## ส่วนขยาย Amazon ECS (ECS Anywhere & Service Connect)

* **Amazon ECS Anywhere:** รัน Container บน Server ของคุณเอง (On-premises) โดยใช้หน้าจอควบคุม (Control Plane) ของ AWS ECS
* **Amazon ECS Service Connect:** ช่วยให้ Container คุยกันเองได้ง่ายขึ้น มีระบบ Service Discovery (ค้นหาชื่อบริการ) และการตรวจสอบทราฟฟิก (Observability) โดยไม่ต้องติดตั้ง Service Mesh ให้ยุ่งยาก
