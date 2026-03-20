# AWS Directory Service Cheat Sheet

**AWS Directory Service** มอบวิธีการที่หลากหลายในการใช้ Microsoft Active Directory (AD) หรือโครงสร้างไดเรกทอรีอื่นๆ ร่วมกับบริการของ AWS ช่วยให้เวิร์กโหลดที่รองรับ AD (เช่น EC2, RDS สำหรับ SQL Server และ WorkSpaces) สามารถใช้งาน Managed Active Directory บน AWS Cloud ได้

### แนวคิดหลัก (Concepts)
* **โครงสร้างพื้นฐานแบบ Managed:** AWS จะสร้าง **Domain Controllers (DCs) 2 ตัว** ไว้ใน Subnet ที่ต่างกัน (คนละ AZ) ภายใน VPC ของคุณ
    * *หมายเหตุ:* คุณ**ไม่มี**สิทธิ์ระดับ Root/Admin ในการเข้าถึงตัวเครื่อง EC2 ที่รัน DC เหล่านี้ (ไม่สามารถ RDP, SSH หรือ Telnet เข้าไปได้)
* **การมอบอำนาจบริหารจัดการ (Delegated Administration):** คุณจะได้รับบัญชี "Admin" เฉพาะที่มีสิทธิ์จัดการภายใน Organizational Unit (OU) ที่กำหนด แต่คุณจะไม่ได้สิทธิ์ "Enterprise Admin" หรือ "Domain Admin" ของทั้ง Forest
* **วิธีการจัดการ:**
    * **วิธีสมัยใหม่ (ใหม่):** ใช้ **Directory Service Data** เพื่อจัดการผู้ใช้และกลุ่มโดยตรงผ่าน AWS Console หรือ API โดยไม่ต้องเปิดเครื่อง EC2
    * **วิธีดั้งเดิม:** เปิดเครื่อง "Management EC2", Join Domain และติดตั้ง RSAT เพื่อใช้งานเครื่องมือมาตรฐานอย่าง ADUC หรือ Group Policy Management

---

### คุณสมบัติเด่น (Features)
* **ความพร้อมใช้งานสูง (High Availability):** ติดตั้งแบบ Multi-AZ เป็นค่าเริ่มต้น และรุ่น Enterprise สามารถทำ **Multi-Region Replication** เพื่อการเข้าถึงที่รวดเร็วทั่วโลกและรองรับการ Failover อัตโนมัติ
* **ความสัมพันธ์แบบเชื่อถือ (Trust Relationships):** รองรับ Forest Trust ทั้งแบบ **One-Way** และ **Two-Way** เพื่อให้ผู้ใช้จาก On-premises สามารถล็อกอินเข้า AWS ด้วยรหัสผ่านเดิมของบริษัทได้
* **Seamless Domain Join:** อินสแตนซ์ EC2 ใหม่ (ทั้ง Windows และ Linux) สามารถ Join Domain ได้ **อัตโนมัติ** ขณะเปิดเครื่อง (ต้องมี IAM Role ที่ระบุ `AmazonSSMDirectoryServiceAccess`)
* **การขยาย Schema:** สามารถขยาย AD Schema ได้โดยการอัปโหลดไฟล์ **LDIF** เพื่อรองรับแอปพลิเคชันที่มี Attributes เฉพาะตัว

---

### ประเภทของบริการ (Directory Options)

#### 1. AWS Managed Microsoft AD
รันบน **Windows Server 2019 ของจริง** และเป็นตัวเลือกที่มีฟีเจอร์ครบถ้วนที่สุด
* รองรับ Trust Relationships กับ AD ในศูนย์ข้อมูล (On-prem)
* **Application Support:** เป็นตัวเลือกเดียวที่รองรับการยืนยันตัวตนสำหรับ **Amazon RDS for SQL Server** และ AWS WorkSpaces (ในระดับสเกลใหญ่)
* **Hybrid Edition:** รวม AD ที่จัดการเองเข้ากับ AWS Managed AD เพื่อสร้างสภาพแวดล้อมอัตลักษณ์เดียวข้าม Hybrid Cloud
* **แบ่งเป็น 2 รุ่น:**
    * **Standard Edition:** สำหรับธุรกิจขนาดเล็ก/กลาง (รองรับสูงสุด 30,000 วัตถุ, ไม่รองรับ Multi-region)
    * **Enterprise Edition:** สำหรับองค์กรขนาดใหญ่ (รองรับสูงสุด 500,000 วัตถุ, รองรับ Multi-region)

#### 2. AD Connector (ตัวกลาง/Proxy)
เป็นเกตเวย์ที่ส่งต่อคำขอไปยัง Microsoft AD ที่ On-premises โดย**ไม่มีการเก็บข้อมูล**ใดๆ ไว้บนคลาวด์
* **ไม่มีข้อมูลบนคลาวด์:** ไม่เก็บรหัสผ่านผู้ใช้ไว้บน AWS แต่จะส่งผ่านคำขอไปยัง DC ที่ On-prem ผ่าน VPN หรือ Direct Connect
* **รองรับ MFA:** ใช้ร่วมกับโครงสร้างพื้นฐาน MFA เดิมที่มีอยู่ได้
* **ข้อจำกัด:** **ไม่รองรับ RDS SQL Server** และ VPC ต้องเป็นแบบ Default Tenancy เท่านั้น

#### 3. Simple AD (ใช้ Samba 4)
เป็นไดเรกทอรีแบบ Standalone ราคาประหยัดที่ทำงานร่วมกับ AD ได้เบื้องต้น
* เหมาะสำหรับการจัดการผู้ใช้ทั่วไป หรือเวิร์กโหลด Windows/Linux ที่ไม่ซับซ้อน
* **ข้อจำกัดสำคัญ:** **ไม่สามารถ** ทำ Trust กับ AD ภายนอกได้, **ไม่รองรับ** RDS SQL Server และ **ไม่รองรับ** MFA

#### 4. Amazon Cloud Directory
ไดเรกทอรีแบบ Cloud-native สำหรับนักพัฒนาแอปที่ต้องจัดการข้อมูลลำดับขั้น (Hierarchical) ปริมาณมหาศาล
* รองรับความสัมพันธ์ข้อมูลที่ซับซ้อน (เช่น พนักงานหนึ่งคนรายงานตรงต่อทั้ง Manager และ Project Lead)
* สเกลได้ถึงระดับร้อยล้านวัตถุ

---

### เครือข่ายและความปลอดภัย
* **IPv6 Support:** รองรับการอัปเกรดจาก IPv4 อย่างเดียวเป็น **Dual-stack (IPv4/IPv6)**
* **AWS PrivateLink:** เข้าถึงเอนด์พอยต์ของไดเรกทอรีได้แบบส่วนตัวโดยไม่ต้องผ่านอินเทอร์เน็ตสาธารณะ
* **Service Linked Role:** ใช้บทบาท `AWSServiceRoleForDirectoryService` เพื่อให้ AWS ช่วยตรวจสอบและจัดการ Domain Controllers แทนคุณ
* **การปฏิบัติตามข้อกำหนด:** ได้รับมาตรฐาน HIPAA และ PCI DSS; ข้อมูลใน EBS Volume ที่ใช้จะถูกเข้ารหัสเสมอ

---

### ค่าบริการ (Pricing)
* **รายชั่วโมง:** จ่ายตามประเภทของไดเรกทอรี (Simple AD ถูกที่สุด, Managed AD Enterprise แพงที่สุด)
* **ค่าแชร์ไดเรกทอรี:** หากแชร์ Managed AD ไปยังบัญชี AWS อื่น (เพื่อเลี่ยงการสร้างไดเรกทอรีซ้ำซ้อนในทุกบัญชี) จะมีค่าธรรมเนียมการแชร์รายชั่วโมงเพิ่มเติมต่อบัญชี
