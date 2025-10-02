# CloudFormation – Dynamic References

**Option 1 – ManageMasterUserPassword**

* ManageMasterUserPassword – จะสร้าง **admin secret** โดยอัตโนมัติ
* สำหรับ RDS หรือ Aurora จะมีการจัดการ secret ใน Secrets Manager และทำการ **rotate password** อัตโนมัติ

## CloudFormation - Secrets Manager & SSM Integration

### แนะนำ Dynamic References ใน CloudFormation

**Dynamic references** ใน CloudFormation ช่วยให้คุณดึงค่าที่เก็บอยู่ใน **Systems Manager Parameter Store** หรือ **Secrets Manager** โดยตรงภายใน template ของ CloudFormation ได้

* CloudFormation จะดึงค่าของ reference ที่ระบุระหว่างการ **create**, **update**, หรือ **delete** stack

### บริการที่รองรับ Dynamic References

CloudFormation รองรับ 3 ประเภท dynamic references:

1. ssm – สำหรับค่าธรรมดา (plaintext) ที่เก็บใน Systems Manager Parameter Store
2. ssm-secure – สำหรับ **secure strings** ที่เก็บใน Systems Manager Parameter Store
3. secretsmanager – สำหรับค่าลับ (secret) ที่เก็บใน Secrets Manager

### ไวยากรณ์ของ Dynamic References

```cli
{{resolve:service-name:reference-key}}
```

สำหรับ SSM:

```cli
{{resolve:ssm:parameter-name:version}}
```

### ตัวอย่างการอ้างอิง SSM Parameter Store และ Secrets Manager

* ถ้ามี Amazon S3 bucket และต้องการตั้งค่า access control ให้ดึงค่าจาก SSM Parameter Store
* สำหรับค่าที่เข้ารหัส ให้ใช้ ssm-secure
* ตัวอย่างการดึงรหัสผ่าน IAM user จาก Parameter Store:

```cli
{{resolve:ssm-secure:/my/secure-parameter:1}}
```

* ตัวอย่างการดึง master username และ password ของ RDS Database จาก Secrets Manager:

```cli
{{resolve:secretsmanager:mysecret:SecretString:password}}
```

### การรวม CloudFormation, Secrets Manager และ RDS

* เมื่อสร้าง stack สำหรับ RDS Database cluster เช่น Aurora และตั้งค่า ManageMasterUserPassword: true
* Secret สำหรับ Aurora database จะถูกสร้าง **โดยอัตโนมัติ**
* RDS จะสร้าง secret ใน Secrets Manager เพื่อจัดการ Master User Password และทำ **rotation** อัตโนมัติ

### การดึงค่า Secret ARN

* ใช้ฟังก์ชัน Fn::GetAtt เพื่อดึง **Secret ARN** จาก Master User secret:

```cli
Fn::GetAtt: [MyDBCluster, MasterUserSecret.SecretArn]
```

### การสร้างและอ้างอิง Secret โดยตรงใน CloudFormation

* สามารถสร้าง secret ภายใน template ของ CloudFormation ได้
* ใช้ GenerateStringKey สำหรับรหัสผ่าน เพื่อให้ CloudFormation สร้างรหัสผ่านให้โดยอัตโนมัติ
* Database instance จะอ้างอิง secret ผ่าน dynamic reference โดยดึงค่าจาก Secrets Manager

### การเชื่อมโยง Secrets และเปิดใช้งาน Password Rotation

* สร้าง secret RDS attachment เพื่อเชื่อม database กับ secret ใน Secrets Manager
* ช่วยให้ secret สามารถ **rotate password** อัตโนมัติ และ RDS Database จะอัปเดตรหัสผ่านตามโดยอัตโนมัติ

## สรุป

* Dynamic references เป็นเครื่องมือสำคัญสำหรับจัดการค่าที่ละเอียดอ่อนอย่างปลอดภัยใน CloudFormation
* ช่วยให้ integrate กับ Parameter Store และ Secrets Manager ได้อย่างราบรื่น
* รองรับการจัดการ secret และ rotation สำหรับบริการเช่น RDS

## Key Takeaways

* Dynamic references ใน CloudFormation ช่วยดึงค่าอย่างปลอดภัยจาก SSM Parameter Store และ Secrets Manager
* ไวยากรณ์: resolve:service-name:reference-key
* CloudFormation สามารถรวมกับ RDS และ Secrets Manager เพื่อจัดการ secret อัตโนมัติและทำ rotation
* Secret สามารถอ้างอิงโดยตรงหรือจัดการโดย RDS อัตโนมัติได้
