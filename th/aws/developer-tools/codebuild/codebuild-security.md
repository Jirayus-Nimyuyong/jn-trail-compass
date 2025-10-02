# CodeBuild Security

มาเริ่มกันด้วยบทเรียนสั้น ๆ เกี่ยวกับ **ความปลอดภัยของ CodeBuild**

โดยปกติ CodeBuild จะทำงานอยู่นอก VPC ของคุณ แต่คุณสามารถสั่งให้ CodeBuild ทำงานภายใน VPC ได้ เพื่อเข้าถึงทรัพยากรใน VPC อย่างปลอดภัย

## การจัดการ Secrets ใน CodeBuild

สิ่งสำคัญคือ **ห้ามเก็บ secrets (เช่น รหัสผ่านหรือ API key)** ไว้ใน environment variables แบบ plaintext โดยตรง

คุณมีตัวเลือกที่ปลอดภัย 2 แบบ:

1. ใช้ environment variables ที่อ้างอิงจากค่า **Parameter Store** ใน AWS Systems Manager
2. ใช้ environment variables ที่อ้างอิงจากค่า **Secrets Manager**

## การสร้าง CodeBuild Project และตั้งค่าความปลอดภัย

เมื่อสร้าง build project ใหม่ใน CodeBuild Console หากเลื่อนลงไปที่ส่วน **Additional Configuration** จะพบการตั้งค่าความปลอดภัยที่สำคัญ

### VPC Configuration

คุณสามารถสั่งให้ CodeBuild รันใน VPC โดยระบุ **subnets** และ **security groups** เพื่อให้เข้าถึงทรัพยากรใน VPC ได้อย่างปลอดภัย

### Environment Variables และ Secrets

Environment variables มีความสำคัญต่อความปลอดภัย เช่น หากคุณต้องการเข้าถึงฐานข้อมูล RDS ใน VPC คุณอาจต้องใช้รหัสผ่าน

การตั้งค่าตัวแปรเช่น:

```cli
DB_PASSWORD = "supersecret"
```

ถือว่าไม่ปลอดภัย เพราะเป็นการเก็บรหัสผ่านแบบ plaintext ที่อาจรั่วไหลได้

วิธีที่ถูกต้องคือใช้ค่าใน **Parameter Store** หรือ **Secrets Manager** แทน

## การสร้าง Secure Parameter ใน Parameter Store

1. เข้าไปที่ **Parameter Store Console**
2. สร้าง parameter ใหม่ชื่อ `/CodeBuild/DBPassword`
3. เลือกประเภท parameter เป็น **SecureString**
4. ผูก parameter นี้กับ **KMS key** เช่น AWS managed CMK
5. ใส่ค่าที่เป็นความลับ เช่น `"SuperSecret"` แล้วกดสร้าง

จากนั้นไปที่ CodeBuild Project:

* กำหนด environment variable เช่น `DB_PASSWORD` ให้ชี้ไปที่ parameter `/CodeBuild/DBPassword`
* ตอนรันจริง CodeBuild จะดึงค่า `"SuperSecret"` มาใส่ใน container โดยอัตโนมัติและปลอดภัย

คุณยังสามารถสร้างตัวแปรอื่น ๆ เช่น `DB_PASSWORD_ALT` โดยใช้ Secrets Manager ด้วยวิธีเดียวกัน

อย่าลืมว่า **IAM Role ของ CodeBuild** ต้องมีสิทธิ์เข้าถึงทั้ง Parameter Store และ Secrets Manager

## สรุป

วิธีนี้ช่วยป้องกันไม่ให้ secrets ถูกเก็บเป็น plaintext ใน environment variables และมั่นใจได้ว่าจัดการอย่างปลอดภัยด้วยบริการของ AWS

นี่เป็น **Best Practice ที่สำคัญมาก** โดยเฉพาะอย่างยิ่งสำหรับการสอบ AWS

## Key Takeaways

* CodeBuild สามารถรันใน VPC เพื่อเข้าถึงทรัพยากรภายใน VPC ได้
* ห้ามเก็บ secrets เป็น plaintext environment variables
* ใช้ **Parameter Store** หรือ **Secrets Manager** จัดการ secrets อย่างปลอดภัย
* ให้สิทธิ์ IAM Role ของ CodeBuild ในการเข้าถึง Parameter Store และ Secrets Manager