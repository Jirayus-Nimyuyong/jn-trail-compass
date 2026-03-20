# AWS CodePipeline Cheat Sheet

**AWS CodePipeline** เป็นบริการ Continuous Delivery (CD) แบบ Managed เต็มรูปแบบ ที่ช่วยให้คุณสร้างกระบวนการปล่อยซอฟต์แวร์ (Release Pipelines) สำหรับการอัปเดตแอปพลิเคชันและโครงสร้างพื้นฐาน (Infrastructure) ให้เป็นอัตโนมัติ
* สามารถรวมเข้ากับบริการภายนอก เช่น GitHub หรือใช้ Custom Plugin ของคุณเองได้อย่างง่ายดาย

### แนวคิดหลัก (Concepts)
* **Pipeline:** ตัวกำหนดเวิร์กโฟลว์ของกระบวนการปล่อยซอฟต์แวร์ โดยระบุว่าการเปลี่ยนแปลงโค้ดใหม่จะผ่านขั้นตอนต่างๆ อย่างไร
* **Stages:** ขั้นตอนต่างๆ ใน Pipeline (เช่น Build, Test, Deploy) ซึ่งเป็นการแบ่งเวิร์กโฟลว์ในเชิงตรรกะ
    * Pipeline ต้องมี **อย่างน้อย 2 Stage** โดย Stage แรกต้องเป็น **Source Stage** และต้องมีอย่างน้อยอีก 1 Stage ที่เป็น Build หรือ Deployment
* **Declarative JSON:** คุณสามารถกำหนดโครงสร้าง Pipeline ผ่านเอกสาร JSON เพื่อใช้เป็นเทมเพลตหรืออัปเดต Pipeline ที่มีอยู่ได้
* **Revision:** การเปลี่ยนแปลงที่เกิดขึ้น ณ ตำแหน่ง Source (เช่น ซอร์สโค้ด, ไฟล์คอนฟิก) ซึ่ง Pipeline สามารถมีหลาย Revision วิ่งอยู่พร้อมกันได้
* **Action:** งานที่ดำเนินการกับ Revision ในแต่ละ Stage (รันแบบ Serial หรือ Parallel ก็ได้) มี 6 ประเภทหลัก:
    1. **Source** (ต้นทาง)
    2. **Build** (สร้าง/คอมไพล์)
    3. **Test** (ทดสอบ)
    4. **Deploy** (ติดตั้ง)
    5. **Approval** (อนุมัติด้วยตนเอง)
    6. **Invoke** (เรียกใช้บริการอื่น เช่น Lambda)
* **Artifacts:** ไฟล์หรือชุดไฟล์ที่เกิดขึ้นเมื่อ Action ทำงาน โดยจะถูกเก็บไว้ใน **S3 Artifact Store** ใน Region เดียวกับ Pipeline เพื่อให้ Action ถัดไปนำไปใช้งานต่อ
* **Transitions:** ตัวเชื่อมต่อระหว่าง Stage ซึ่งสามารถสั่ง "เปิด" หรือ "ปิด" ได้ หากเปิดทั้งหมด Pipeline จะรันต่อเนื่องจนจบ
* **Approval Action:** ใช้หยุด Pipeline ไว้ก่อนจะไปขั้นตอนถัดไปจนกว่าจะได้รับการอนุมัติ เหมาะสำหรับการรีวิวโค้ดก่อน Deploy จริง

---

### คุณสมบัติเด่น (Features)
* **GUI:** มีหน้าจออินเทอร์เฟซแบบกราฟิกเพื่อให้จัดการ Pipeline ได้ง่าย
* **ระบบอัตโนมัติ:** Pipeline เริ่มทำงานอัตโนมัติเมื่อตรวจพบการเปลี่ยนแปลงที่ Source หรือจะสั่งรันด้วยตัวเอง (Manual) ก็ได้
* **Parallel Execution:** สามารถสั่งให้ขั้นตอน Build, Test หรือ Deploy รันไปพร้อมๆ กันเพื่อเพิ่มความเร็ว
* **การเชื่อมต่อ:**
    * **Source:** ดึงโค้ดจาก CodeCommit, GitHub, Amazon ECR หรือ S3
    * **Build/Test:** รันผ่าน **AWS CodeBuild** หรือใช้ Jenkins (ผ่าน Plugin)
    * **Deploy:** ติดตั้งผ่าน CodeDeploy, Elastic Beanstalk, ECS, Fargate, S3, Service Catalog, CloudFormation หรือ OpsWorks
* **Webhook:** เมื่อเชื่อมต่อกับ GitHub ระบบจะสร้าง Webhook เพื่อตรวจจับเหตุการณ์ใน Repository และเริ่มรัน Pipeline ทันที
* **ความปลอดภัย:**
    * รองรับ **VPC Endpoints (AWS PrivateLink)** เพื่อเชื่อมต่อกับ CodePipeline ผ่านเครือข่ายส่วนตัว
    * รองรับการใช้ **AWS Secrets Manager** ใน Commands actions โดยดึงความลับมาเป็น Environment Variables
* **ความสามารถใหม่ๆ:**
    * **Commands actions:** รองรับคำสั่ง Windows และอินสแตนซ์ขนาดใหญ่สำหรับงานที่ซับซ้อน
    * **Cross-account & Trigger:** Pipeline หนึ่งสามารถเรียกใช้งานอีก Pipeline หนึ่งได้ (รองรับข้ามบัญชี)
    * **Stage-level conditions:** กำหนดเงื่อนไขระดับ Stage เพื่อบังคับการทดสอบ, รันสคริปต์ Cleanup หรือทำ Rollback อัตโนมัติเมื่อตรวจพบความล้มเหลว
* **ประวัติการทำงาน:** ดูรายละเอียดการรันย้อนหลังได้สูงสุด 12 เดือน

---

### ขีดจำกัด (Limits)
* จำนวน Pipeline สูงสุดต่อ Region ในหนึ่งบัญชี: **300 รายการ**
* จำนวน Stage ในหนึ่ง Pipeline: **ขั้นต่ำ 2, สูงสุด 10**

### ค่าบริการ (Pricing)
* คิดค่าบริการต่อ **Active Pipeline** ในแต่ละเดือน
* **ฟรี:** สำหรับ Pipeline ที่สร้างใหม่ในช่วง 30 วันแรก