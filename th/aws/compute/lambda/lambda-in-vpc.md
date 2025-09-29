# Lambda in VPC

## แนะนำเรื่องเครือข่ายของ Lambda

โดยปกติ **Lambda functions** จะถูก launch นอก **VPC** ของคุณ ซึ่ง Lambda จะรันใน VPC ของ AWS เอง ทำให้ Lambda ไม่สามารถเข้าถึง resources ภายใน VPC ของคุณโดยตรง

## VPC คืออะไร และทำไมต้องใช้?

VPC ของคุณอาจมี resources เช่น:

* EC2 instances
* RDS databases
* ElastiCache clusters
* Internal Elastic Load Balancers

โดยค่าเริ่มต้น Lambda ทำงานดังนี้:

* รันอยู่บนคลาวด์ **นอก VPC ของคุณ**
* สามารถเข้าถึง **public websites**
* สามารถเข้าถึง **external APIs**
* สามารถเข้าถึง **AWS services** เช่น DynamoDB

แต่ถ้าคุณมี VPC ของตัวเองที่มี **private subnets** และ resources เช่น **RDS database** Lambda จะเข้าถึง resources เหล่านี้ **ไม่ได้โดยค่าเริ่มต้น**

## การ Deploy Lambda ภายใน VPC

เพื่อให้ Lambda เข้าถึง resources ภายใน VPC ได้:

1. ระบุ **VPC ID**
2. ระบุ **subnets**
3. กำหนด **security group** ให้กับ Lambda function

Lambda จะสร้าง **Elastic Network Interface (ENI)** ใน subnets ที่เลือกโดยอัตโนมัติ

* การสร้าง ENI ต้องใช้ **Lambda VPC Access Execution Role**

## การเข้าถึง resources ภายใน VPC

ตัวอย่าง: Private subnet มี **RDS database** ป้องกันด้วย RDS security group

* เมื่อ Lambda ถูกตั้งค่าให้เข้าถึง VPC:

  * Lambda สร้าง ENI และกำหนด Lambda security group
  * Lambda เข้าถึง RDS ผ่าน ENI
* สิ่งนี้เกิดขึ้น **เบื้องหลัง** โดยอัตโนมัติ
* **ข้อสำคัญ:** Security group ของ RDS ต้องอนุญาตการเข้าถึงจาก Lambda security group

## การเข้าถึง Internet ของ Lambda ใน VPC

ข้อควรระวัง: Lambda ที่ deploy ใน VPC **ไม่มี internet access โดยค่าเริ่มต้น**

คำถามที่พบบ่อย:

> ถ้า deploy Lambda ใน public subnet จะสามารถเข้าถึงอินเทอร์เน็ตได้ไหม?

* ไม่ใช่แบบเดียวกับ EC2
* Lambda ใน public subnet **ไม่ได้รับ public IP และไม่สามารถเข้าถึงอินเทอร์เน็ตโดยตรง**

### การเปิด Internet Access ให้ Lambda ใน VPC

วิธีทำ: ใช้ **NAT gateway** หรือ **NAT instance**

* Lambda อยู่ใน private subnet
* ต้องการเข้าถึง external APIs → traffic ต้องผ่าน NAT gateway/instance ใน public subnet
* NAT จะสื่อสารกับ **Internet Gateway** ของ VPC
* Internet Gateway ให้ Lambda เข้าถึงอินเทอร์เน็ต
* การตั้งค่านี้ทำผ่าน **route tables** และการตั้งค่า VPC

## การเข้าถึง DynamoDB จาก Lambda ใน VPC

มี 2 วิธี:

1. ผ่าน public route + internet gateway (ต้องใช้ NAT device)
2. ผ่าน **VPC endpoints** (เข้าถึง AWS services ภายในแบบ private ไม่ต้องใช้ NAT หรือ Internet Gateway)

   * สำหรับ DynamoDB → สร้าง **VPC endpoint แบบ Gateway**
   * Lambda ใช้ endpoint นี้เข้าถึง DynamoDB แบบ private

### ข้อสังเกตเพิ่มเติม

* Lambda ใน private subnet → **CloudWatch Logs ยังทำงานได้** แม้ไม่มี VPC endpoints หรือ NAT gateway

## สรุป

* Lambda รัน **นอก VPC โดยค่าเริ่มต้น** → เข้าถึง resources ภายใน VPC ไม่ได้
* หากต้องการเข้าถึง resources ภายใน VPC เช่น RDS → ต้องกำหนด **VPC ID, subnets, security groups** → Lambda จะสร้าง ENI
* Lambda ใน VPC **ไม่มี internet access โดยค่าเริ่มต้น** → ต้องใช้ NAT gateway/instance
* ใช้ **VPC endpoints** → Lambda เข้าถึง AWS services เช่น DynamoDB แบบ private ได้โดยไม่ต้องใช้อินเทอร์เน็ต