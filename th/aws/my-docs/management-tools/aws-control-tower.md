# AWS Control Tower Cheat Sheet

บริการสำหรับกำหนดค่าและจัดการสภาพแวดล้อม AWS แบบหลายบัญชี (Multi-account)

### แนวคิดหลักของ AWS Control Tower

**1. Landing Zone**
สภาพแวดล้อมแบบหลายบัญชีที่ถูกออกแบบตามหลัก Well-Architected และยึดตามแนวทางปฏิบัติที่ดีที่สุดด้านความปลอดภัยและการปฏิบัติตามข้อกำหนด
* แต่ละองค์กรสามารถมีได้เพียง 1 Landing Zone
* **โครงสร้างของ Landing Zone:**
    * **Root:** ตัวแม่ที่บรรจุทุก Organizational Units (OUs)
    * **Security OU:** บรรจุบัญชีส่วนกลางที่ใช้งานร่วมกัน (Shared accounts)
    * **Sandbox OU:** บรรจุบัญชีที่ลงทะเบียนไว้เพื่อให้ผู้ใช้รันเวิร์กโหลด AWS
    * **IAM Identity Center:** ใช้จัดการสิทธิ์และตัวตนของผู้ใช้จากส่วนกลาง

**2. Guardrails (กฎควบคุม)**
กฎหรือนโยบายระดับสูงที่ใช้กำกับดูแลสภาพแวดล้อม AWS ของคุณ มีผลทั้งระดับ OU และบัญชีภายใน OU
* **จำแนกตามพฤติกรรม (Behavior):**
    * **Preventive (ป้องกัน):** ห้ามการกระทำที่ละเมิดนโยบาย (ใช้ SCPs ของ AWS Organizations)
    * **Detective (ตรวจจับ):** ตรวจหาทรัพยากรที่ไม่ปฏิบัติตามกฎและแจ้งเตือนผ่านแดชบอร์ด (ใช้กฎของ AWS Config)
    * **Proactive (เชิงรุก):** สแกนทรัพยากรก่อนการจัดสรร (ใช้ CloudFormation Hooks)
* **จำแนกตามคำแนะนำ (Guidance):**
    * **Mandatory:** บังคับใช้เสมอ
    * **Strongly recommended:** แนะนำอย่างยิ่งตามแนวทางปฏิบัติที่ดีที่สุด
    * **Elective:** ติดตามการกระทำที่มักถูกจำกัดโดยทั่วไป

**3. Account Factory**
ระบบอัตโนมัติในการจัดสรรบัญชีใหม่ ช่วยให้การสร้างบัญชีเป็นมาตรฐานเดียวกันผ่านการตั้งค่าที่ได้รับอนุมัติล่วงหน้า
* **บัญชีส่วนกลาง (Shared accounts):**
    * **Management account:** ใช้สำหรับการเรียกเก็บเงิน, จัดสรรบัญชี, จัดการ OUs และ Guardrails
    * **Log Archive account:** คลังเก็บ Log ของกิจกรรม API และการตั้งค่าทรัพยากรจากทุกบัญชี
    * **Audit account:** บัญชีจำกัดสิทธิ์สำหรับทีมความปลอดภัยและการตรวจสอบ

---

### คุณสมบัติด้านเครือข่ายและการจัดการ
* **VPC:** แต่ละ VPC ที่สร้างโดย Control Tower จะมี 3 Availability Zones โดยแต่ละ AZ จะมี 1 Public Subnet และ 2 Private Subnets (คนละตัวกับ Default VPC ของ AWS)
* **Region Deny Guardrail:** บล็อกการเรียกใช้ API ในภูมิภาคที่ไม่ได้รับการดูแล (Non-governed Regions)
* **Account Factory Customizations (AFC):** ช่วยให้ปรับแต่งการจัดสรรบัญชีผ่าน CI/CD pipelines, CodePipeline หรือ Terraform ได้
* **Drift Detection:** ตรวจจับการเปลี่ยนแปลงของการตั้งค่าที่หลุดไปจากมาตรฐาน (Configuration Drift) และมีคำแนะนำในการอัปเดตเวอร์ชันของ Landing Zone

---

### การตรวจสอบและติดตาม (Monitoring)
* **Log Archive Account:** บัญชีเฉพาะสำหรับรวบรวม Log ทั้งหมดไว้ที่ส่วนกลาง
* **AWS CloudTrail:** บันทึกการกระทำและเหตุการณ์ของ AWS Control Tower
* **Lifecycle Events:** บันทึกเหตุการณ์วงจรชีวิต (เช่น การสร้างบัญชีสำเร็จหรือไม่) โดยเหตุการณ์เหล่านี้จะถูกส่งไปยัง **Amazon EventBridge** และสามารถคิวรีได้ผ่าน CloudWatch Logs Insights

---

### ค่าบริการ (Pricing)
* **ไม่มีค่าธรรมเนียมสำหรับตัวบริการ AWS Control Tower โดยตรง**
* คุณจะถูกเรียกเก็บเงินตาม **ค่าบริการของ AWS ที่ถูกเรียกใช้** เพื่อตั้งค่า Landing Zone และ Guardrails (เช่น ค่า AWS Config, Service Catalog, CloudTrail และ S3)
* **หมายเหตุ:** คุณจะถูกคิดเงินโดย AWS Config สำหรับการบันทึกการเปลี่ยนแปลงการตั้งค่าของทรัพยากรชั่วคราว (Ephemeral workloads) ที่เกิดขึ้นระหว่างกระบวนการจัดการ