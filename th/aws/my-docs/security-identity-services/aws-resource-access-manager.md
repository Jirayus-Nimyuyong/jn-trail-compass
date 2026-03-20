# AWS Resource Access Manager (AWS RAM) Cheat Sheet

**AWS Resource Access Manager (AWS RAM)** เป็นบริการที่ช่วยให้คุณแชร์ทรัพยากร AWS ระหว่างบัญชี (Accounts), หน่วยองค์กร (OUs) หรือทั่วทั้งองค์กร (AWS Organization) ได้อย่างปลอดภัย ช่วยลดความจำเป็นในการสร้างทรัพยากรซ้ำซ้อนในหลายบัญชี ทำให้การจัดการง่ายขึ้นและรักษาความปลอดภัยรวมถึงความสอดคล้องของข้อมูลได้ดีขึ้น

* เฉพาะ **Master Account** เท่านั้นที่สามารถเปิดใช้งานการแชร์ร่วมกับ AWS Organizations ได้
* องค์กรจะต้องเปิดใช้งานชุดคุณสมบัติแบบ **All Features**
* **3 ขั้นตอนง่ายๆ ในการแชร์:** 1. สร้าง Resource Share -> 2. ระบุทรัพยากร -> 3. ระบุบัญชีที่จะแชร์ให้
* คุณสามารถหยุดแชร์ทรัพยากรได้ทุกเมื่อโดยการลบการแชร์ (Share) ใน AWS RAM

---

## บริการที่รองรับการแชร์ (ตัวอย่าง)
| บริการ | ทรัพยากรที่แชร์ได้ |
| :--- | :--- |
| **Amazon Aurora** | DB Clusters |
| **AWS CodeBuild** | Projects, Report Groups |
| **Amazon EC2** | Capacity Reservations, Dedicated Hosts, Subnets, Transit Gateways |
| **Route 53** | Forwarding rules, Resolver Profiles |
| **VPC Lattice** | Resource configurations |
| **SageMaker** | Model Registry, JumpStart hubs, Model Cards |

---

## คุณสมบัติเด่น (Features)

### 1. การแชร์ทรัพยากร (Resource Sharing)
* แชร์กับบัญชี AWS เฉพาะเจาะจง, OU หรือทั้งองค์กร
* **ตอบรับอัตโนมัติ:** หากแชร์ภายในองค์กรเดียวกัน ระบบจะตอบรับทรัพยากรที่แชร์ให้โดยอัตโนมัติ
* **ระบบคำเชิญ (Invitation):** สำหรับการแชร์ให้กับบัญชี AWS ภายนอกองค์กร

### 2. การจัดการแบบศูนย์กลาง (Centralized Management)
* สร้างทรัพยากรเพียงครั้งเดียวและแชร์ให้หลายบัญชีใช้งานได้โดยไม่ต้องสร้างซ้ำ
* เจ้าของทรัพยากรยังคงมีอำนาจควบคุมสูงสุดในขณะที่อนุญาตให้บัญชีอื่นใช้งานได้
* รองรับโครงสร้างขนาดใหญ่ที่มีการกำกับดูแลจากส่วนกลาง

### 3. การขยายขอบเขตทรัพยากรที่รองรับ
* **เครือข่าย:** แชร์ VPC Subnets, Security Groups, Transit Gateways, Network Firewall และ VPC Lattice
* **Edge & DNS:** แชร์ CloudFront VPC Origins และชื่อโดเมนแบบกำหนดเองของ API Gateway
* **AI & ML:** แชร์โมเดล Bedrock, SageMaker Partner Apps และทรัพยากรใน Model Registry
* **การกำกับดูแลและความปลอดภัย:** แชร์ AWS Backup vaults แบบ Air-gapped และแผนการกู้คืนระบบ (Recovery plans)

### 4. การจัดการสิทธิ์ (Permission Management)
* ใช้ **Managed Permissions** หรือแบบกำหนดเองเพื่อควบคุมว่าผู้รับแชร์ทำอะไรได้บ้าง
* รองรับ **ABAC (Attribute-Based Access Control)** โดยใช้แท็ก (Tags) ในการกำหนดสิทธิ์
* เจ้าของทรัพยากรยังคงเป็นเจ้าของโดยสมบูรณ์และมีอำนาจบริหารจัดการทั้งหมด

### 5. การตรวจสอบ (Visibility & Auditability)
* ติดตามการใช้งานทรัพยากรที่แชร์ผ่าน **AWS CloudTrail**
* ตรวจสอบกิจกรรมการเข้าถึงโดยใช้ **Amazon CloudWatch**

---

## กรณีการใช้งาน (Use Cases)
* **การแชร์ทรัพยากรข้ามบัญชี:** แชร์ VPC Subnets ส่วนกลางหรือ Transit Gateways เพื่อใช้เครือข่ายร่วมกันในองค์กร
* **การเพิ่มประสิทธิภาพต้นทุน:** หลีกเลี่ยงการสร้างทรัพยากรซ้ำซ้อน ช่วยลดภาระการดูแลและประหยัดค่าใช้จ่าย
* **ความร่วมมือกับบุคคลภายนอก:** แชร์ทรัพยากรกับบัญชี AWS ภายนอกอย่างปลอดภัยผ่านระบบคำเชิญ

---

## ความปลอดภัย (Security)
* **IAM-Based Access:** ใช้นโยบาย IAM ควบคุมว่าใครสามารถแชร์หรือรับทรัพยากรได้
* **Managed Permissions:** กำหนดสิทธิ์การใช้งานที่ละเอียดผ่านสิทธิ์ที่ AWS จัดการให้
* **Ownership Retention:** บัญชีที่เป็นเจ้าของทรัพยากรจะรักษาความเป็นเจ้าของและการควบคุมไว้อย่างสมบูรณ์
* **PrivateLink:** รองรับการเข้าถึง AWS RAM ผ่าน VPC Interface Endpoints แบบส่วนตัว

---

## ค่าบริการ (Pricing)
**ไม่มีค่าใช้จ่ายเพิ่มเติม** ในการใช้งาน AWS Resource Access Manager (จ่ายเฉพาะค่าทรัพยากรที่ถูกแชร์ตามปกติ)