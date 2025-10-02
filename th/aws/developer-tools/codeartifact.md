# CodeArtifact

**AWS CodeArtifact** เป็นบริการที่ออกแบบมาเพื่อจัดการ **ซอฟต์แวร์ artifacts และ dependencies** อย่างมีประสิทธิภาพ

* เมื่อพัฒนาซอฟต์แวร์ โปรเจกต์มักพึ่งพา **ซอฟต์แวร์หรือไลบรารีอื่น ๆ (dependencies)**
* การจัดการ dependencies และเวอร์ชันเป็นสิ่งสำคัญต่อความเสถียรของการพัฒนา

ก่อนหน้านี้ การจัดการ artifacts ต้องสร้างระบบของตัวเองเพื่อ **เก็บและดึงแพ็กเกจซอฟต์แวร์** ซึ่งซับซ้อนและดูแลรักษายาก

* CodeArtifact เสนอระบบจัดการ artifacts **ปลอดภัย, ขยายได้, และคุ้มค่า** สำหรับการพัฒนาซอฟต์แวร์ใน AWS

## การรวมกับ Dependency Management Tools

CodeArtifact **รวมกับเครื่องมือจัดการ dependencies ยอดนิยม** เช่น:

* Maven, Gradle, npm, yarn, twine, pip, NuGet

* การรวมนี้ช่วยให้ **นักพัฒนาและ AWS CodeBuild ดึง dependencies ได้ตรงจาก CodeArtifact** ภายใน AWS

## สถาปัตยกรรมและการจัดการ Repository

* Artifacts ทั้งหมดจะอยู่ **ภายใน VPC ของคุณใน AWS**
* แตกต่างจาก third-party artifact management หรือ self-hosted ที่อยู่ภายนอก AWS

คุณสามารถสร้าง **domains** ใน CodeArtifact แต่ละ domain จะมี **repositories**

* Repository จะเก็บแพ็กเกจซอฟต์แวร์และ dependencies ของคุณ

## การ Proxy Public Artifact Repositories

CodeArtifact ทำหน้าที่เป็น **proxy สำหรับ public repositories**

* ตัวอย่าง: นักพัฒนา JavaScript ใช้คำสั่ง `npm` ดึง dependencies จาก CodeArtifact แทนที่จะเข้าถึง public repository โดยตรง

**ประโยชน์สองประการ:**

1. **Network Security**: นักพัฒนาเชื่อมต่อเฉพาะ CodeArtifact เท่านั้น
2. **Caching**: Dependencies ที่ดึงมาจะถูก cache ใน CodeArtifact

   * แม้ dependency จะถูกลบจาก public repository แต่ก็ยังใช้ cache ได้
   * ช่วยให้ build มีความเสถียร

รองรับ **หลายประเภทแพ็กเกจ** เช่น: npm, pip, NuGet, Maven

## การ Publish และจัดการ Artifacts ของตัวเอง

* นอกจาก proxy public repository แล้ว คุณยังสามารถ **push artifacts ของตัวเองไปยัง CodeArtifact**
* นักพัฒนาหรือผู้ดูแลสามารถ **publish และ approve แพ็กเกจ** ภายใน repository ได้
* ทำให้ **ทุกโปรเจกต์ใช้แพ็กเกจที่จัดเก็บภายใน VPC อย่างปลอดภัยและเสถียร**

ทั้งนักพัฒนาและ AWS CodeBuild สามารถ **ดึง artifacts จาก CodeArtifact ได้โดยตรง**

* ช่วยให้ **build และ deploy สะดวกขึ้น**

## การรวมกับ AWS Services แบบ Event-Driven

CodeArtifact ส่ง **events** เช่น: การสร้าง, แก้ไข, ลบแพ็กเกจ ไปยัง **AWS EventBridge**

* EventBridge เป็นตัว router ของ events ใน AWS
* ทำให้สามารถรวมกับ Lambda, Step Functions, SNS, SQS, CodePipeline ได้

**ตัวอย่าง workflow:**

1. แพ็กเกจเวอร์ชันใหม่ถูก update → CodeArtifact ส่ง event
2. CodePipeline ตรวจจับ → trigger CodeBuild rebuild แอปพร้อม dependencies ใหม่
3. Deploy แอปใหม่ไป production ด้วย CodeDeploy

* ช่วยให้ builds **รวม dependencies ล่าสุดได้อย่างปลอดภัยและมีประสิทธิภาพ**

## การควบคุมการเข้าถึงและ Cross-Account

* ภายใน AWS account ผู้ใช้และ role สามารถเข้าถึง repository ตาม **IAM policies**

* หากต้องการให้ **ผู้ใช้หรือ role จาก account อื่นเข้าถึง** ต้องใช้ **resource policies**

* การเข้าถึงเป็นแบบ **all-or-nothing** ต่อแพ็กเกจภายใน repository

  * เช่น อนุญาตให้ผู้ใช้ Bob ใน Account B เข้าถึงแพ็กเกจทั้งหมดใน repository ของคุณ

* การแชร์แบบ cross-account โดย resource policies เป็น **pattern ยอดนิยมใน AWS**

## สรุป

CodeArtifact ทำให้การจัดการ artifacts **ง่าย, ปลอดภัย, และ scalable**

* รองรับหลายรูปแบบแพ็กเกจ
* ทำ proxy public repository พร้อม caching
* รองรับการ publish artifacts ของตัวเอง
* รวมกับ event-driven AWS services
* รองรับการเข้าถึงแบบละเอียด รวมถึง cross-account

## ข้อสรุปสำคัญ (Key Takeaways)

* CodeArtifact เป็น **artifact management system** ที่ปลอดภัย, ขยายได้ และคุ้มค่าใน AWS
* รวมกับเครื่องมือ dependency management ยอดนิยม เช่น Maven, Gradle, npm, yarn, twine, pip, NuGet
* ทำหน้าที่ **proxy public repositories พร้อม caching** เพื่อให้ dependency ใช้งานได้เสมอ
* รองรับ **cross-account access ผ่าน resource policies** เพื่อแชร์ artifacts อย่างปลอดภัย