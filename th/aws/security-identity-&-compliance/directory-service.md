# AWS Directory Services

## แนะนำ Microsoft Active Directory และ AWS Directory Services

**Microsoft Active Directory (AD)** คือซอฟต์แวร์ที่ติดตั้งบน Windows Server พร้อมกับ Active Directory Domain Services

* ทำหน้าที่เป็น **ฐานข้อมูลของ objects** เช่น บัญชีผู้ใช้, เครื่องคอมพิวเตอร์, เครื่องพิมพ์, แชร์ไฟล์, และ security groups
* ผู้ใช้ทั้งหมดในระบบ Microsoft ขององค์กรจะถูกจัดการผ่าน AD
* ช่วยให้การจัดการด้านความปลอดภัยเป็น **ศูนย์กลาง** สามารถสร้างบัญชี, กำหนดสิทธิ์, และจัดระเบียบ objects เป็นโครงสร้างแบบ tree hierarchy
* กลุ่มของ tree จะเรียกว่า **forest**

### ตัวอย่างการใช้งาน Active Directory

* สมมติสร้างบัญชีผู้ใช้ชื่อ “John” รหัสผ่าน “password”
* เครื่อง Windows อื่น ๆ ภายในเครือข่ายจะเชื่อมต่อกับ domain controller
* เมื่อนำรหัสผ่านของ John ใช้บนเครื่องใด เครื่องนั้นจะตรวจสอบกับ domain controller
* หากรหัสถูกต้อง ผู้ใช้สามารถล็อกอินได้
* ทำให้ผู้ใช้สามารถเข้าถึงเครื่องทุกเครื่องในเครือข่ายโดยใช้ **credentials ศูนย์กลาง**

## ภาพรวม AWS Directory Services

**AWS Directory Services** ช่วยให้สร้างและจัดการ Active Directory ใน AWS
มี **สามประเภทหลัก** พร้อมคุณสมบัติและกรณีการใช้งานที่แตกต่างกัน

### 1. AWS Managed Microsoft AD

* สร้าง AD ของตัวเองภายใน AWS
* จัดการผู้ใช้ภายใน AD ได้เอง, รองรับ **MFA**
* สามารถสร้าง **trust relationship** กับ on-premise AD ได้
* ทำให้ผู้ใช้บน on-premise AD สามารถเข้าถึง AWS resources และผู้ใช้ใน AWS AD สามารถเข้าถึง on-premise AD

### 2. AD Connector

* ทำหน้าที่เป็น **gateway proxy** ส่งคำขอ authentication ไปยัง on-premise AD
* รองรับ MFA
* ไม่เก็บข้อมูลผู้ใช้ใด ๆ แต่ส่งคำขอ authentication กลับไปยัง directory เดิม
* เหมาะกับกรณีที่ต้องการเชื่อม AWS resources กับ on-premise AD โดยไม่จำเป็นต้อง replicate user accounts

### 3. Simple AD

* Managed directory ที่เข้ากันได้กับ AD แต่ **ไม่ใช่ Microsoft AD**
* ไม่สามารถเชื่อมต่อกับ on-premise AD
* เหมาะสำหรับกรณีไม่มี on-premise AD ต้องการ standalone AD สำหรับ AWS cloud
* สามารถสร้าง Windows instance ที่ join domain และแชร์ logins/credentials ภายใน AWS

## กรณีใช้งานและคำแนะนำสำหรับสอบ

* ต้องการ **proxy ผู้ใช้ไปยัง on-premise AD** → ใช้ AD Connector
* ต้องการ **จัดการผู้ใช้ใน cloud พร้อม MFA** → ใช้ AWS Managed Microsoft AD
* ไม่มี on-premise AD ต้องการ **standalone directory** → ใช้ Simple AD

## ตัวเลือก AWS Directory Services ใน Console

* **AWS Managed Microsoft AD**:

  * Integrated กับ AWS Cloud, รองรับ trust relationship กับ on-premise AD
  * Standard Edition (สูงสุด 30,000 objects), Enterprise Edition (สูงสุด 500,000 objects)
* **Simple AD**:

  * Standalone managed directory, AD-compatible API, ไม่มี on-premise integration
* **AD Connector**:

  * Proxy ส่งคำขอไปยัง on-premise AD
  * มีสองขนาด: สูงสุด 500 users และ สูงสุด 5,000 users
* **Amazon Cognito User Pool**:

  * ส่งต่อไปยัง Cognito service, ไม่ถือเป็น Directory Services

## สรุป

AWS Directory Services มีตัวเลือกที่ยืดหยุ่นสำหรับสร้างหรือเชื่อม AD ใน cloud

* เข้าใจความแตกต่างระหว่าง **AWS Managed Microsoft AD, AD Connector, และ Simple AD** เป็นสิ่งสำคัญสำหรับการจัดการ user authentication และ directory services ใน AWS

## Key Takeaways

* Microsoft AD เป็น **ฐานข้อมูลศูนย์กลาง** สำหรับจัดการบัญชีผู้ใช้, คอมพิวเตอร์, และ security groups ใน Windows ecosystem
* AWS Directory Services มี 3 ตัวเลือกหลัก: **AWS Managed Microsoft AD, AD Connector, Simple AD**
* AWS Managed Microsoft AD → สร้าง standalone AD ใน AWS, รองรับ trust relationship และ MFA
* AD Connector → Proxy ส่งคำขอ authentication ไปยัง on-premise AD
* Simple AD → Standalone AD-compatible directory, ไม่มีการเชื่อมต่อกับ on-premise AD
