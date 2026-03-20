# AWS Step Functions Cheat Sheet

**AWS Step Functions** เป็นบริการเว็บที่ทำหน้าที่เป็น **Serverless Orchestration** (การประสานงานแบบไร้เซิร์ฟเวอร์) สำหรับแอปพลิเคชันสมัยใหม่ ช่วยให้คุณรวบรวมส่วนประกอบของแอปพลิเคชันแบบกระจายตัวและ Microservices เข้าด้วยกันโดยใช้เวิร์กโฟลว์แบบภาพ (Visual Workflows)

### แนวคิดหลัก (Concepts)
Step Functions ใช้แนวคิดของ **ภารกิจ (Tasks)** และ **เครื่องสถานะ (State Machines)**:
* **Task:** การทำงานหนึ่งหน่วย โดยใช้ Activity, AWS Lambda หรือเรียก API ของบริการอื่น
* **Finite State Machine:** การแสดงอัลกอริทึมในรูปแบบของ "สถานะ" (States), ความสัมพันธ์ระหว่างกัน, ข้อมูลขาเข้า (Input) และขาออก (Output)
* **Amazon States Language (ASL):** ภาษาโครงสร้างพื้นฐาน JSON ที่ใช้กำหนด State Machine

#### ประเภทของสถานะ (8 Types of States):
1.  **Task state:** หน่วยงานหนึ่งหน่วย (เช่น เรียก Lambda, เขียนไฟล์ลง DynamoDB)
2.  **Choice state:** การตัดสินใจเลือกระหว่างเส้นทางการทำงาน (Branch)
3.  **Fail state:** หยุดการทำงานและทำเครื่องหมายว่า "ล้มเหลว"
4.  **Succeed state:** หยุดการทำงานและทำเครื่องหมายว่า "สำเร็จ"
5.  **Pass state:** ส่งข้อมูล Input ไปยัง Output โดยตรง หรือเติมข้อมูลคงที่บางอย่างเข้าไป
6.  **Wait state:** หน่วงเวลาตามระยะเวลาที่กำหนด หรือจนถึงวันเวลาที่ระบุ
7.  **Parallel state:** เริ่มการทำงานหลายเส้นทางพร้อมกัน
8.  **Map state:** เพิ่มเงื่อนไขการวนลูป (For-each)

---

### คุณสมบัติเด่น (Features)
* **Visual Workflows:** เปลี่ยนโค้ดที่ซับซ้อนให้กลายเป็นแผนภาพและคำสั่งที่เข้าใจง่าย
* **Separation of Logic:** แยกตรรกะการประสานงาน (Coordination) ออกจากการนำไปใช้งาน (Implementation) ทำให้ปรับเปลี่ยนขั้นตอนได้โดยไม่ต้องแก้ Business Logic
* **State Management:** จัดเก็บสถานะและข้อมูลที่วิ่งระหว่างขั้นตอนให้โดยอัตโนมัติ ไม่ต้องจัดการฐานข้อมูลเพื่อเก็บสถานะเอง
* **Error Handling:** มีระบบ **Try/Catch และ Retry** ในตัว สามารถกำหนดการรันใหม่เมื่อเกิดข้อผิดพลาดหรือ Timeout ได้อย่างละเอียด
* **Scalability & Availability:** ปรับขนาดอัตโนมัติตามปริมาณงาน และมีความทนทานต่อความเสียหาย (Fault Tolerance) กระจายอยู่ในหลาย Availability Zones
* **Service Integration:** เชื่อมต่อกับบริการ AWS อื่นๆ ได้โดยตรง (Service Tasks) และรองรับการเชื่อมต่อผ่าน HTTPS กับแอปพลิเคชันที่โฮสต์ที่ใดก็ได้
* **Callback Patterns:** รองรับขั้นตอนที่ต้องรอเหตุการณ์จากภายนอกหรือการตัดสินใจจากมนุษย์ (Human activities)

---

### ข้อแตกต่างระหว่าง Standard และ Express Workflow

| คุณสมบัติ | Standard Workflow | Express Workflow |
| :--- | :--- | :--- |
| **ระยะเวลาทำงานสูงสุด** | 1 ปี | 5 นาที |
| **ความทนทานของสถานะ** | สูง (เหมาะสำหรับกระบวนการทางธุรกิจที่ยาวนาน) | ไม่เน้นการเก็บสถานะถาวร (เน้นความเร็ว) |
| **การรันใหม่ (Retries)** | อัตโนมัติและรองรับการอนุมัติโดยมนุษย์ | ไม่มีระบบรันให้อัตโนมัติในตัว |
| **ปริมาณงาน (Throughput)** | ปกติ | สูงมาก (High-throughput) และ Latency ต่ำ |
| **ราคา** | คิดตามจำนวน State Transition | ราคาถูกกว่า (คิดตามเวลาและทรัพยากรที่ใช้) |

---

### การทำงานของ Step Functions
* **Orchestration:** จัดการเวิร์กโฟลว์จากส่วนกลางโดยแบ่งเป็นขั้นตอน ย้ายข้อมูล Input/Output ระหว่างกัน และบันทึกประวัติ (Event Log)
* **Data Filtering:** ใช้ `InputPath`, `ResultPath` และ `OutputPath` เพื่อกรองและแปลงข้อมูล JSON ในแต่ละสถานะ
* **Monitoring:** รวมเข้ากับ **CloudWatch (Logs/Metrics)** และ **AWS CloudTrail** เพื่อตรวจสอบสถานะและวิเคราะห์ปัญหา รวมถึงรองรับ **AWS X-Ray** เพื่อติดตามเส้นทาง (Tracing)

### ความปลอดภัย (Security)
* ใช้ **IAM Role** เพื่อให้สิทธิ์ Step Functions เข้าถึงทรัพยากรอื่นๆ
* รองรับมาตรฐานด้านความปลอดภัยระดับสากล เช่น **HIPAA, SOC, PCI, และ FedRAMP**

---

### กรณีการใช้งานทั่วไป (Common Use Cases)
* **ETL Orchestration:** จัดลำดับงานประมวลผลข้อมูล (Data processing) ให้ทำงานตามลำดับจนจบ
* **Microservices Orchestration:** รวมหลายๆ Lambda หรือ Microservices เข้าเป็นแอปพลิเคชันเดียว
* **Automation:** ทำงานซ้ำๆ อัตโนมัติ เช่น การ Patch ระบบ หรือการประสานข้อมูล (Data synchronization)
* **Modernizing Monoliths:** ค่อยๆ เปลี่ยนแอปพลิเคชันขนาดใหญ่ (Monolithic) ให้กลายเป็น Microservices ทีละส่วน