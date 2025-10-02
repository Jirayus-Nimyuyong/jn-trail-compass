# Cloud Development Kit (CDK)

**AWS Cloud Development Kit (CDK)** ช่วยให้คุณสามารถ **กำหนดโครงสร้างพื้นฐานบนคลาวด์ (cloud infrastructure)** ด้วย **ภาษาโปรแกรมที่คุ้นเคย** เช่น JavaScript, TypeScript, Python, Java และ .NET

หลายคนอาจสงสัยว่า CDK เกี่ยวข้องกับ **CloudFormation** อย่างไร

* CloudFormation ให้คุณกำหนดโครงสร้างพื้นฐานด้วย **YAML หรือ JSON**
* CDK **เหนือกว่า CloudFormation** เพราะช่วยให้กำหนดโครงสร้างพื้นฐานด้วย **ภาษาโปรแกรม** ได้

## การกำหนด Infrastructure ด้วย CDK

ตัวอย่างการใช้ **TypeScript** กำหนด constructs เช่น **VPC, ECS Cluster, และ Fargate Service พร้อม Load Balancer**

ตัวอย่าง:

1. สร้าง **VPC** ใหม่ พร้อมชื่อและ 3 Availability Zones
2. สร้าง **ECS Cluster** ชื่อ MyCluster เชื่อมกับ VPC
3. สร้าง **Fargate Service** พร้อม Application Load Balancer

   * กำหนด CPU, จำนวน Tasks, Task image options, memory limits
   * ตั้งค่า ALB ให้เป็น public

* ทั้งหมดนี้กำหนดผ่าน **ภาษาโปรแกรม**
* หากโค้ดไม่ compile → จะเกิด error และไม่สามารถสร้าง CloudFormation template ได้
* หากโค้ด compile สำเร็จ → จะถูก **แปลงเป็น CloudFormation template** ในรูปแบบ JSON หรือ YAML

ดังนั้น CDK ใช้สำหรับ **สร้าง CloudFormation templates ใน backend**

* ให้ความยืดหยุ่นมากขึ้นเพราะใช้ภาษาโปรแกรม
* สามารถ deploy **infrastructure + runtime code ของแอป** พร้อมกัน เช่น Lambda หรือ Docker containers บน ECS/EKS

## ข้อดีของ CDK เมื่อเทียบกับ CloudFormation

* CloudFormation เป็น YAML → ไม่ type-safe → ข้อผิดพลาดอาจเจอแค่ตอน deploy
* CDK ใช้ constructs + ภาษาโปรแกรม → **type safety** → ตรวจจับข้อผิดพลาดได้เร็วขึ้น

## สถาปัตยกรรมและ Workflow ของ CDK

1. Constructs ของแอป เช่น Lambda, DynamoDB, S3, ECS, Step Functions
2. รองรับภาษาโปรแกรม: Python, TypeScript, Java, .NET
3. เขียนโค้ด CDK → **synthesize ด้วย CDK CLI** → ได้ CloudFormation template
4. ใช้ CloudFormation deploy template → สร้าง infrastructure

สรุป: **CDK เป็น layer บน CloudFormation** ทำให้ง่ายต่อการจัดการโครงสร้างพื้นฐาน

## การเปรียบเทียบ CDK กับ AWS SAM

| CDK                              | AWS SAM                            |
| -------------------------------- | ---------------------------------- |
| รองรับทุกบริการ AWS              | เน้น serverless (Lambda)           |
| ใช้ภาษาโปรแกรมกำหนดโครงสร้าง     | ใช้ declarative JSON/YAML template |
| แปลงเป็น CloudFormation template | CloudFormation อยู่เบื้องหลัง      |

## การผสม CDK และ SAM

* สามารถใช้ **SAM CLI** ทดสอบ CDK แอปพลิเคชันแบบ local

1. รัน `cdk synth` → สร้าง CloudFormation template
2. ใช้ SAM CLI เรียก Lambda local โดยอ้างอิง template ที่สร้าง

* การรวมนี้ช่วยใช้ **จุดแข็งของทั้งสองเครื่องมือ**

## ตัวอย่าง Hands-On CDK (ต่อไป)

* สร้าง S3 bucket ให้ผู้ใช้ upload รูปภาพ
* Trigger Lambda function เมื่อมีการ upload
* Lambda ใช้ Amazon Rekognition วิเคราะห์รูป
* บันทึกผลวิเคราะห์ลง DynamoDB
* ทั้งหมดกำหนดผ่าน **CDK script**

## Key Takeaways

* **CDK** ช่วยกำหนดโครงสร้างพื้นฐานด้วยภาษาโปรแกรม เช่น TypeScript, Python, Java, .NET
* CDK แปลงโค้ดเป็น CloudFormation template → **type safety** และตรวจข้อผิดพลาดเร็วกว่า YAML
* รองรับทุก AWS service และสามารถ deploy **infrastructure + runtime code** พร้อมกัน
* สามารถรวม **CDK + SAM** เพื่อทดสอบ Lambda local โดย CDK สร้าง template ให้ SAM CLI เรียกใช้งาน