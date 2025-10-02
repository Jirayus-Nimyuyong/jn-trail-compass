# Pass Role

## แนะนำการส่ง Role ใน AWS

อีกฟีเจอร์สำคัญของ IAM คือความสามารถในการ **ส่ง Role ให้บริการ AWS** ซึ่งเป็นแนวคิดสำคัญในการเข้าใจการจัดการสิทธิ์และการทำงานร่วมกันของบริการ AWS

เมื่อเรากำหนดค่าบริการ AWS หลาย ๆ ตัว บริการเหล่านั้นจะใช้ **IAM Role** ที่เราสร้างขึ้น **Role จะถูกส่งไปยังบริการ** โดยปกติจะทำในขั้นตอนการตั้งค่าเริ่มต้น เมื่อบริการมี Role แล้ว บริการนั้นสามารถ **Assume Role** และทำงานที่ต้องการได้

**ตัวอย่าง:**

* สร้าง EC2 Instance Role → แนบกับ EC2 Instance → EC2 ใช้ Role เพื่อเข้าถึงทรัพยากร
* สร้าง IAM Role สำหรับ Lambda Function → Lambda สามารถเรียก S3 ได้
* ใช้กับ ECS Tasks หรือ CodePipeline → เพื่อให้สามารถเรียกบริการอื่นได้

## สิทธิ์ที่ต้องใช้ในการส่ง Role

* **iam:PassRole** → จำเป็นต้องใช้เพื่อส่ง Role ไปยังบริการอื่น
* **iam:GetRole** → มักใช้เพื่อดูข้อมูล Role ที่จะส่ง

**สรุป:** การส่ง Role ต้องมี **iam:PassRole**

## ตัวอย่าง IAM Policy สำหรับการส่ง Role

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Action": "ec2:*",
      "Resource": "*"
    },
    {
      "Effect": "Allow",
      "Action": "iam:PassRole",
      "Resource": "arn:aws:iam::account-id:role/S3Access"
    }
  ]
}
```

* Statement แรก → อนุญาตทุกการกระทำของ EC2 เช่น สร้างหรือยุติ instance
* Statement ที่สอง → อนุญาตส่ง Role ชื่อ **S3Access** ไปยัง EC2 Instance
* **หมายเหตุ:** Role ที่ส่งได้จะต้องเป็น **S3Access** เท่านั้น และต้องมีสิทธิ์ **iam:PassRole**

## Trust Policy และการ Assume Role

ไม่ใช่ทุก Role จะส่งไปยังบริการใดก็ได้ **Role สามารถถูกส่งได้ตาม Trust Policy ของมันเท่านั้น**

**ตัวอย่าง Trust Policy:**

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Principal": {
        "Service": "ec2.amazonaws.com"
      },
      "Action": "sts:AssumeRole"
    }
  ]
}
```

* กำหนดว่า **เฉพาะ EC2 (ec2.amazonaws.com)** เท่านั้นที่สามารถ Assume Role นี้ได้
* การกำหนด Trust Relationship สามารถดูและแก้ไขได้ใน **IAM Console → Roles → Trust Relationships**

## การดู Trusted Entities ใน IAM

ใน IAM Console:

* เลือก Role → ดู **Trusted entity** → ระบุว่าบริการใดสามารถ Assume Role
* ตัวอย่าง:

  * CodePipeline Role → Trusted entity: **codepipeline.amazonaws.com**
  * Lambda Role → Trusted entity: **lambda.amazonaws.com**
* สามารถดู JSON ของ Trust Relationship ในแท็บ **Trust relationships**

## สรุปการส่ง Role

1. สร้าง **Trust Relationship** ให้บริการเป้าหมายสามารถ Assume Role
2. ตรวจสอบให้ผู้ใช้หรือบริการมีสิทธิ์ **iam:PassRole** เพื่อส่ง Role

## Key Takeaways

* การส่ง Role ไปยังบริการ AWS ต้องมี **iam:PassRole**
* **Trust Policy** ของ Role กำหนดว่า AWS Service ใดสามารถ Assume Role ได้
* Role จะส่งไปยังบริการได้ **เฉพาะ Role ที่มี Trust Relationship ถูกต้อง**
* IAM Policies และ Trust Relationships ทำงานร่วมกันเพื่อควบคุมการเข้าถึงและสิทธิ์ใน AWS
