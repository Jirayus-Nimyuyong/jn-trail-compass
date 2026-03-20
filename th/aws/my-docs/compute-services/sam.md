# AWS Serverless Application Model (SAM) Cheat Sheet

**AWS Serverless Application Model (AWS SAM)** เป็นโอเพนซอร์สเฟรมเวิร์กสำหรับสร้างแอปพลิเคชันแบบ Serverless โดยมีไวยากรณ์ (Syntax) แบบย่อเพื่อใช้กำหนดค่า Functions, APIs, ฐานข้อมูล และการเชื่อมโยงแหล่งที่มาของเหตุการณ์ (Event source mappings)
* เป็นส่วน**ขยายของ AWS CloudFormation** หมายความว่าทรัพยากรใดๆ ที่ประกาศใน SAM Template จะถูกแปลงเป็นทรัพยากร CloudFormation มาตรฐานในระหว่างการติดตั้งใช้งาน (Deployment)
* คุณสามารถสร้างเทมเพลตการตั้งค่าในรูปแบบ **JSON** หรือ **YAML** เพื่อจำลองโมเดลของแอปพลิเคชัน

---

## ส่วนประกอบของ AWS SAM
* **AWS SAM Template:** ส่วนขยายของ CloudFormation ที่มีไวยากรณ์ที่เรียบง่ายขึ้นสำหรับการกำหนดทรัพยากร Serverless
* **AWS SAM CLI:** เครื่องมือที่จำลองสภาพแวดล้อมการทำงานเหมือน Lambda เพื่อให้คุณสามารถ Build, Test และ Debug แอปพลิเคชันในเครื่อง (Local) ได้ รวมถึงใช้ในการ Deploy แอปพลิเคชันขึ้น AWS
* **โครงสร้างเทมเพลต (Template Anatomy):**
    * **Transform:** จำเป็นต้องระบุส่วนนี้หากเขียน SAM Template แยกต่างหาก (ไม่ใช่ผ่าน CloudFormation) เพื่อบอกให้ AWS ทราบว่าต้องใช้ SAM ในการประมวลผล
    * **Globals:** ส่วนเฉพาะของ SAM สำหรับกำหนดคุณสมบัติร่วมที่ใช้ร่วมกันในทุกๆ Functions และ APIs (เช่น Runtime หรือ Timeout เดียวกัน)
    * **Resources:** ส่วนที่ประกาศทรัพยากร ซึ่งสามารถผสมกันได้ระหว่างทรัพยากรแบบ CloudFormation มาตรฐาน และทรัพยากรแบบ AWS SAM

---

## เมื่อไหร่ที่ควรใช้ SAM
* **แอปพลิเคชัน Serverless:** กำหนดค่า Lambda, API Gateway, DynamoDB ได้อย่างรวดเร็วด้วยโค้ดที่สั้นลง
* **การปรับปรุง CloudFormation:** สามารถรวม SAM เข้ากับเทมเพลต CloudFormation เดิมที่มีอยู่เพื่อเพิ่มส่วนประกอบ Serverless เข้าไปในโครงสร้างพื้นฐานแบบดั้งเดิม
* **การพัฒนาและทดสอบในเครื่อง:** ใช้ SAM CLI เพื่อทดสอบ Lambda, จำลอง API Gateway และ Debug แอปพลิเคชันบนเครื่องคอมพิวเตอร์ของคุณก่อน Deploy จริง
* **CI/CD สำหรับ Serverless:** สร้างไปป์ไลน์การติดตั้งใช้งานที่สร้างโครงสร้างพื้นฐาน CloudFormation โดยอัตโนมัติสำหรับสภาพแวดล้อม Staging และ Production
* **การย้ายทรัพยากรจาก Console:** แปลง Lambda หรือ API Gateway ที่เคยสร้างผ่านหน้าเว็บ (Management Console) ให้กลายเป็น Infrastructure as Code (IaC)

---

## ภาพรวมของไวยากรณ์ (Syntax Overview)
* **AWS::Serverless::Function:** ใช้กำหนดค่าสำหรับการสร้าง Lambda Function และระบุ Event Source (เช่น S3, DynamoDB Streams)
* **AWS::Serverless::Api:** ใช้กำหนดทรัพยากร API Gateway (เหมาะสำหรับกรณีที่ต้องการการควบคุมและยืดหยุ่นสูง)
* **AWS::Serverless::HttpApi:** ใช้กำหนด API Gateway แบบ HTTP API (ซึ่งเร็วกว่าและถูกกว่า REST API)
* **AWS::Serverless::SimpleTable:** ไวยากรณ์แบบง่ายสำหรับสร้างตาราง DynamoDB
* **AWS::Serverless::Application:** ใช้ฝังแอปพลิเคชัน Serverless อื่นๆ (Nested Applications) จาก S3 หรือ Serverless Application Repository
* **AWS::Serverless::LayerVersion:** สร้าง Lambda Layer สำหรับเก็บไลบรารีหรือโค้ดที่ต้องใช้ร่วมกัน
* **AWS::Serverless::StateMachine:** ใช้กำหนด AWS Step Functions สำหรับจัดการเวิร์กโฟลว์
* **AWS::Serverless::Connector:** ช่วยลดความยุ่งยากในการจัดการสิทธิ์ IAM โดยกำหนดความสัมพันธ์ระหว่างทรัพยากร (เช่น จาก Function ไปยัง Table)

---

## คำสั่ง SAM CLI ที่ใช้บ่อย
* `sam init`: สร้างโปรเจกต์ใหม่พร้อมเทมเพลตเริ่มต้น
* `sam build`: เตรียมแอปพลิเคชันสำหรับการ Deploy โดยการจัดการ Dependency และจัดระเบียบ Artifacts
* `sam local`: ใช้สำหรับเรียกใช้งาน (Invoke) และทดสอบ Lambda หรือ API ในเครื่องคอมพิวเตอร์
* `sam package` & `sam deploy`: รวมโค้ดแอปพลิเคชันและติดตั้งขึ้นไปยัง AWS Cloud
* `sam sync`: เฝ้าดูการเปลี่ยนแปลงในเครื่องและอัปเดตโค้ดขึ้น AWS โดยตรง (AWS SAM Accelerate) เพื่อความรวดเร็วในการพัฒนา
* `sam validate`: ตรวจสอบความถูกต้องของเทมเพลต SAM
* `sam logs`: ดึงและแสดงล็อกของ Lambda Function
* `sam publish`: นำแอปพลิเคชันขึ้นไปยัง AWS Serverless Application Repository

---

## การควบคุมการเข้าถึง API
* **Lambda Authorizer:** ใช้ Lambda Function ที่คุณเขียนเองเพื่อควบคุมการเข้าถึง API (มีทั้งแบบ Token-based และ Request parameter-based)
* **Amazon Cognito User Pools:** ใช้ระบบจัดการผู้ใช้ของ Cognito เพื่อยืนยันตัวตนก่อนเข้าถึง API

---

## การแปลงทรัพยากร (Transform)
ส่วน **Transform** ใน CloudFormation เทมเพลตจะระบุมาโครที่ AWS CloudFormation ใช้ในการประมวลผล โดยมาโคร `AWS::Serverless` จะเป็นตัวระบุเวอร์ชันของ AWS SAM ที่ใช้งาน และกำหนดว่า CloudFormation จะต้องประมวลผลไวยากรณ์ SAM เหล่านั้นอย่างไรเพื่อเปลี่ยนให้เป็นทรัพยากรมาตรฐาน
