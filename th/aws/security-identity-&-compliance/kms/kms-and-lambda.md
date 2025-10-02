# KMS and AWS Lambda

ในการฝึกนี้ เราจะเรียนรู้วิธีการใช้ **AWS Lambda** ร่วมกับ **Key Management Service (KMS)** เพื่อจัดการข้อมูลลับ เช่น รหัสผ่านฐานข้อมูล ให้ปลอดภัยภายใน Lambda function โดยใช้ KMS สำหรับการเข้ารหัส

## การสร้าง Lambda Function และระบุปัญหา

* เริ่มจากสร้าง Lambda function ใหม่ ตั้งชื่อว่า `Lambda KMS` และเลือก runtime เป็น **Python**
* โฟกัสที่การเข้ารหัส **environment variables** ภายใน Lambda โดยใช้ KMS key ที่สร้างไว้ก่อนหน้า

ตัวอย่างปัญหา:

* Lambda ต้องใช้รหัสผ่านฐานข้อมูล
* วิธีง่าย ๆ คือเขียนรหัสผ่านลงใน code เช่น `DB_PASSWORD = 'super_secret'`
* ปัญหา: ใครก็ตามที่เข้าถึง code จะเห็นรหัสผ่านได้ → **ไม่ปลอดภัย**

## การใช้ Environment Variables สำหรับเก็บ Secrets

* วิธีที่ดีกว่าคือเก็บรหัสผ่านใน **environment variable**
* ตัวอย่าง Python:

```python
import os
db_password = os.getenv('DB_PASSWORD')
```

* ตั้งค่า environment variable `DB_PASSWORD` ใน Lambda configuration เป็น `super_secret`
* ข้อดี: รหัสผ่านไม่อยู่ใน code
* ข้อเสีย: ใครเข้าถึง Lambda configuration ก็ยังเห็นรหัสผ่านแบบ plain text

## การเข้ารหัส Environment Variables ด้วย KMS

* Lambda มีฟีเจอร์เข้ารหัส environment variables
* สามารถเลือก **KMS key** เพื่อเข้ารหัสค่าที่เก็บอยู่
* หลังจากกด encrypt → environment variable จะถูกเข้ารหัส

## การถอดรหัส Environment Variable ใน Lambda

* ใน Lambda function เราต้องถอดรหัสด้วย **AWS SDK**
* ตัวอย่าง Python:

```python
import boto3
import os
import base64

def decrypt_env_var():
    encrypted = os.environ['DB_PASSWORD']
    kms_client = boto3.client('kms')
    decrypted = kms_client.decrypt(
        CiphertextBlob=base64.b64decode(encrypted),
        EncryptionContext={'LambdaFunctionName': os.environ['AWS_LAMBDA_FUNCTION_NAME']}
    )['Plaintext'].decode('utf-8')
    return decrypted
```

* สามารถ print ค่าที่เข้ารหัสและถอดรหัสเพื่อยืนยัน
* Deploy และทดสอบ Lambda ด้วย sample events

## การจัดการ Timeout และ IAM Permissions

* หาก Lambda timeout (เช่น 3 วินาที) → เพิ่มเป็น 10 วินาที
* หากเจอ **access denied** → Lambda role ไม่มีสิทธิ์ถอดรหัส KMS

## การมอบสิทธิ์ KMS Decrypt ให้ Lambda Role

* ไปที่ Lambda configuration → Permissions → แก้ไข execution role
* เพิ่ม inline policy สำหรับ **kms:Decrypt** ของ KMS key ที่กำหนด

ตัวอย่าง JSON Policy:

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Action": "kms:Decrypt",
      "Resource": "<KMS_KEY_ARN>"
    }
  ]
}
```

* หลังจากแนบ policy → ทดสอบ Lambda อีกครั้ง → ถอดรหัส environment variable ได้สำเร็จ

## การตรวจสอบผลลัพธ์

* ตรวจสอบ Lambda logs
* จะเห็น environment variable ที่เข้ารหัสและค่าที่ถอดรหัส (`super_secret`)
* วิธีนี้ทำให้ **code และ configuration ปลอดภัย** และถอดรหัสได้เฉพาะผู้ที่มีสิทธิ์เข้าถึง KMS key

## สรุป

* การเก็บรหัสผ่านหรือข้อมูลลับตรง ๆ ใน Lambda code หรือ environment variables **ไม่ปลอดภัย**
* Lambda สามารถ **เข้ารหัส environment variables ด้วย KMS key**
* การถอดรหัสใน Lambda ต้องมี **IAM permission** สำหรับ KMS key
* การรวม Lambda กับ KMS ทำให้ข้อมูลลับถูกปกป้องทั้งใน code และ configuration

## Key Takeaways

1. เก็บข้อมูลลับใน code หรือ environment variables แบบ plain text ไม่ปลอดภัย
2. Lambda รองรับการเข้ารหัส environment variables ด้วย KMS
3. การถอดรหัสต้องมี IAM permission สำหรับ KMS key
4. การรวม Lambda กับ KMS ช่วยปกป้อง secrets ทั้งใน code และ configuration