# ภาพรวม SSM Parameter Store

## แนะนำ SSM Parameter Store

**SSM Parameter Store** เป็นโซลูชันสำหรับเก็บ **configuration และ secrets** อย่างปลอดภัย โดยสามารถเลือกเข้ารหัสค่าต่าง ๆ ให้เป็น secret ได้ด้วยการใช้บริการ **KMS**

SSM Parameter Store เป็นแบบ **serverless**, **scalable**, และ **durable** ใช้งาน SDK ได้ง่าย และเมื่อมีการอัปเดต parameter จะมี **version tracking** ให้ด้วย

ด้านความปลอดภัย ใช้ **IAM** และในบางกรณีสามารถรับ notification ผ่าน **Amazon EventBridge** ได้ นอกจากนี้ SSM Parameter Store ยัง **integrate กับ CloudFormation** ทำให้ CloudFormation สามารถดึงค่าจาก Parameter Store มาใช้เป็น input parameter ของ stack ได้

## ตัวอย่างการใช้งาน

* สามารถเก็บ configuration เป็น **plain text** ได้ โดยการตรวจสอบสิทธิ์จะใช้ IAM ของ application เช่น role ของ EC2 instance
* หากเก็บเป็น **ค่าที่เข้ารหัส** Parameter Store จะเข้ารหัสด้วย **KMS** และจำเป็นต้องให้สิทธิ์ application เข้าถึง **KMS key** สำหรับการเข้ารหัสและถอดรหัส

## Parameter Hierarchy

* สามารถจัด parameter เป็น **hierarchy** เช่น:

  * `/my/department/My-app/Dev/Dev-DB-URL`
  * `/my/department/My-app/Dev/DB-password`
* สามารถสร้าง hierarchy สำหรับ **production** เช่น:

  * `/my/department/My-app/Prod/Prod-DB-URL`
  * `/my/department/My-app/Prod/Prod-DB-password`
* การจัด hierarchy ทำให้ **IAM policy ง่ายขึ้น** เพราะสามารถกำหนดสิทธิ์ให้ application เข้าถึงทั้ง department, ทั้ง app หรือ environment-specific path ได้

## การเข้าถึง Secrets และ Public Parameters

* สามารถเข้าถึง **Secrets Manager** ผ่าน Parameter Store โดยใช้ **reference syntax**
* มี **Public Parameters** จาก AWS ให้ใช้ เช่น Amazon Linux 2 AMI ล่าสุดตาม region
* ตัวอย่าง: Lambda function สำหรับ development สามารถเข้าถึง DB-URL และ DB-password ของ development path ได้ ในขณะที่ Lambda function ของ production สามารถเข้าถึง parameter ของ production path ได้

## Parameter Tiers

* SSM มี **2 tier**: **Standard** และ **Advanced**

  * **Standard:** รองรับ parameter ขนาดสูงสุด 4 KB, ไม่มี parameter policies, **ฟรี**
  * **Advanced:** รองรับ parameter ขนาดสูงสุด 8 KB, มี parameter policies, ค่าใช้จ่าย $0.05 ต่อเดือน

## Parameter Policies

* ใช้ได้เฉพาะ **Advanced parameters**
* สามารถกำหนด **Time-to-Live (TTL)** หรือวันหมดอายุของ parameter เช่น password
* สามารถกำหนด **หลาย policy พร้อมกัน** เช่น กำหนดวันหมดอายุ และรับ notification ผ่าน EventBridge
* สามารถตั้ง **no-change notification** เช่น ถ้า parameter ไม่ได้อัปเดต 20 วัน จะได้รับ notification

## สรุป

* SSM Parameter Store เป็นเครื่องมือที่ทรงพลังสำหรับเก็บ **configuration และ secrets** อย่างปลอดภัยและมีประสิทธิภาพ
* รองรับการเข้ารหัสด้วย **KMS**, ใช้ **IAM** สำหรับ security, และ **EventBridge** สำหรับ notification
* สามารถจัด parameter เป็น hierarchy เพื่อให้ง่ายต่อการบริหารและควบคุมสิทธิ์
* Advanced parameters มีฟีเจอร์ เช่น **parameter policies** สำหรับหมดอายุและการแจ้งเตือนการเปลี่ยนแปลง

## Key Takeaways

* SSM Parameter Store เป็น storage ที่ปลอดภัย, scalable และ durable สำหรับ configuration และ secrets
* รองรับการเข้ารหัสด้วย KMS และ integrate กับ IAM และ EventBridge
* สามารถจัด parameter เป็น hierarchy เพื่อความสะดวกในการเข้าถึงและจัดการ
* Advanced parameters มีฟีเจอร์ policy สำหรับวันหมดอายุและ notification การเปลี่ยนแปลง
