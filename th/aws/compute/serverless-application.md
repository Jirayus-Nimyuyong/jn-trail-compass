# AWS Serverless Application Model (SAM)

* **AWS SAM** (Serverless Application Model) คือ **framework สำหรับพัฒนาและ deploy แอปพลิเคชันแบบ serverless**
* ชื่อ SAM ยังหมายถึง **กระรอกน้อย** แต่ในที่นี้หมายถึง framework
* ด้วย SAM คุณเขียน **โค้ดแอปพลิเคชัน** และ **กำหนด infrastructure** ผ่านไฟล์ **YAML** ตามข้อกำหนดของ SAM
* SAM จะ **สร้าง CloudFormation template แบบซับซ้อนให้โดยอัตโนมัติ** จากไฟล์ YAML ที่ง่ายของคุณ

## การทำงานร่วมกับ CloudFormation

* SAM รองรับฟีเจอร์ทั้งหมดของ CloudFormation

  * เช่น **outputs, mappings, parameters, resources**
* คุณสามารถใช้พลังเต็มของ CloudFormation พร้อมกับ syntax ที่ **ง่ายขึ้นด้วย SAM**

## การทดสอบและ Deployment

* SAM สามารถใช้ **CodeDeploy** เพื่อ deploy Lambda functions
* SAM รองรับการ **รัน Lambda, API Gateway, และ DynamoDB แบบ local** เพื่อช่วยในการ debug และทดสอบ
* SAM มุ่งเน้นไปที่ **serverless applications** ทำให้คุณสามารถ debug แบบ local และ deploy ไป AWS ได้เร็ว

## โครงสร้าง Template ของ SAM

* ที่ด้านบนของ template จะมี **Transform header** เพื่อบอกว่าเป็น **SAM template**
* SAM ใช้ construct เฉพาะที่ง่ายกว่า CloudFormation เช่น:

  1. **Serverless Function** → Lambda function
  2. **Serverless API** → API Gateway
  3. **Serverless SimpleTable** → DynamoDB table

## Deployment Workflow

* ใช้คำสั่ง `sam deploy` เพื่อ **package และ deploy แอปพลิเคชันไป AWS**
* ก่อนหน้านี้ต้องใช้สองคำสั่ง: `sam package` และ `sam deploy`
* ปัจจุบัน `sam deploy` ทำ **ทั้งสองขั้นตอนในคำสั่งเดียว**

## กระบวนการ Deployment ของ SAM

1. แอปประกอบด้วย **โค้ดและ SAM YAML template**
2. สร้างแอป locally ด้วย `sam build`

   * แปลง SAM template เป็น CloudFormation template
   * เตรียมโค้ดแอป
3. Deploy ด้วย `sam deploy`

   * zip และอัปโหลดโค้ดไปยัง **S3 bucket**
   * Execute **CloudFormation ChangeSet** เพื่อสร้างหรือ update stack

* Stack ของคุณอาจประกอบด้วย **Lambda, API Gateway, DynamoDB**

## SAM Accelerate

* SAM Accelerate เป็น **ฟีเจอร์ลดเวลา deployment**
* คำสั่งหลักคือ `sam sync`

  * สามารถ **ข้าม CloudFormation** หากมีการเปลี่ยนแค่โค้ด
  * อัปเดต Lambda ได้ **เร็วมาก**
* ตัวเลือกเพิ่มเติม:

  * `sam sync --code` → อัปเดตแค่โค้ด ไม่ยุ่งกับ infrastructure
  * ระบุ **resource เฉพาะ** เช่น Lambda function และ dependency
  * `--watch` → monitor การเปลี่ยนแปลงไฟล์และ sync อัตโนมัติ

**สรุป:**

* ถ้าเปลี่ยน config ใช้ `sam sync`
* ถ้าเปลี่ยนแค่โค้ด ใช้ `sam sync --code` เพื่อ deploy เร็ว

## SAM Policy Templates

* **SAM policy templates** หรือ **serverless application model policy templates** เป็นสิ่งสำคัญสำหรับ **จัดการสิทธิ์ (permissions) ของ Lambda functions**
* Templates เหล่านี้อาจเจอในข้อสอบ และช่วย **ทำให้การกำหนดสิทธิ์ง่ายขึ้น**
* SAM policy templates คือ **ชุดสิทธิ์ที่กำหนดล่วงหน้า** ที่สามารถนำไปใช้กับ Lambda function ได้ทันที
* Templates เหล่านี้ช่วยให้คุณเข้าใจว่า Lambda function สามารถทำอะไรได้บ้างโดยไม่ต้องสร้าง IAM role เอง

## ตัวอย่าง SAM Policy Templates

1. **S3ReadPolicy**

   * ให้ **สิทธิ์อ่าน (read-only)** กับ object ใน Amazon S3
   * เข้าใจง่ายและตรงไปตรงมา

2. **SQSPollerPolicy**

   * ให้ Lambda function สามารถ **poll ข้อมูลจาก Amazon SQS queue**

3. **DynamoDBCrudPolicy**

   * CRUD = Create, Read, Update, Delete
   * Lambda function สามารถทำ **ทุก operation กับ DynamoDB table**

* เมื่อเห็น templates เหล่านี้ คุณจะเข้าใจจุดประสงค์ได้ทันที

## การกำหนด Lambda Function ด้วย SAM Policy Template

* สมมติคุณสร้าง Lambda function รัน **Python 2.7** และต้องการอ่านจาก **SQS queue**
* แทนที่จะ **สร้าง IAM role เอง**, คุณสามารถกำหนด **SQSPollerPolicy** ใน SAM template
* ใน SAM template:

  * สร้าง policy ชื่อ **SQSPollerPolicy**
  * ระบุ **ชื่อ queue**
  * เมื่อ SAM ประมวลผล template → policy จะถูก **แปลงเป็น IAM policy ที่ attach กับ Lambda function**

**ข้อดีสำคัญ:**

* **ง่ายขึ้นมาก** ไม่ต้องกังวลเกี่ยวกับรายละเอียดการสร้าง IAM role
* ลดความผิดพลาดจากการกำหนด permission เอง

## SAM กับ CodeDeploy

* การบูรณาการ **SAM** กับ **CodeDeploy** ช่วยให้ Lambda function อัปเดตได้ด้วย **traffic shifting ผ่าน aliases**
* สามารถกำหนด **pre-traffic และ post-traffic hooks** เป็น Lambda function เพื่อ **ตรวจสอบการ deploy**
* สามารถตั้งค่า **rollback อัตโนมัติ** โดยใช้ **CloudWatch alarms**

## โฟลว์การ deploy

1. Lambda alias ชี้ไปยัง **version 1** ของ Lambda function
2. เมื่อ deploy ผ่าน CodeDeploy (ผ่าน CI/CD pipeline หรือ SAM) → alias จะชี้ไปยัง **version 2**
3. **Pre-traffic hook** Lambda function อาจทำงานเพื่อตรวจสอบการ deploy
4. **Traffic shifting** ตามกลยุทธ์ที่กำหนด
5. **CloudWatch alarm** ตรวจสอบความเสถียร
6. หลัง traffic shifting → **Post-traffic hook** Lambda function ทำงานเพื่อตรวจสอบเพิ่มเติม
7. หากสำเร็จ → version 1 และ alias เก่า ถูกลบ → เหลือเพียง **version 2**

## การตั้งค่า SAM Template YAML สำหรับ CodeDeploy

Key element สำคัญ:

1. **AutoPublishAlias**

   * SAM ตรวจสอบ deployment ใหม่
   * สร้าง Lambda function version ใหม่และอัปเดต alias อัตโนมัติ

2. **DeploymentPreference**

   * กำหนด **ความเร็วและวิธี deployment**
   * เช่น **Canary**, **Linear**, **AllAtOnce**
   * ตัวอย่าง: `Canary10Percent10Minutes` → เลื่อน traffic 10% เป็นเวลา 10 นาที ก่อน deploy เสร็จ

3. **Alarms**

   * รายการ CloudWatch alarms เพื่อตรวจสอบ deployment
   * หากเกิน threshold → trigger **rollback อัตโนมัติ**

4. **Hooks**

   * Lambda function ทำงาน **ก่อนหรือหลัง traffic shifting**
   * ใช้ตรวจสอบหรือรันโค้ดเพิ่มเติม

## ตัวอย่างปฏิบัติ: Deploy Lambda ด้วย SAM + CodeDeploy

1. สร้าง directory ใหม่ `sam-codedeploy`
2. สร้าง SAM app ใหม่ (Python 3.7, Hello World template)
3. เข้าไปใน `sam-app` directory
4. **Build** SAM app: `sam build`
5. ตรวจสอบโค้ด `HelloWorldFunction` (ส่งกลับ "hello world")
6. ดู `template.yaml` → สร้าง Lambda function และ API Gateway
7. เพิ่ม **CodeDeploy integration YAML**
8. **Rebuild** SAM app
9. Deploy: `sam deploy --guided`
10. ตรวจสอบการสร้าง resource และ CodeDeploy service role

## การตรวจสอบการ deploy

* เปิด **AWS Management Console → Lambda**
* หา Lambda function ที่ deploy (ชื่อ prefix `HelloWorld`)
* ตรวจสอบ **Qualifiers tab** → alias ชี้ไปยัง version 1
* ทดสอบ function → ควรตอบกลับ "hello world"

## การอัปเดต Lambda function และ deploy ด้วย CodeDeploy

1. แก้ไข `app.py` → เปลี่ยน response เป็น "hello world v2"
2. **Build** ใหม่: `sam build`
3. Deploy: `sam deploy --guided`
4. ยืนยัน deployment parameters (stack name, region, permissions)
5. ระบบจะสร้าง **changeset**, อัปเดต alias และ Lambda version
6. Deployment นี้จะทำ **canary deployment** พร้อม traffic shifting

## การติดตาม Deployment ใน CodeDeploy

* Refresh alias page → สังเกต **traffic shifting** ระหว่าง version 1 และ 2 (เช่น 90% → 1, 10% → 2)
* ไปที่ **CodeDeploy console** → ดูรายละเอียด deployment
* ตรวจสอบ pre-deployment validation (ถ้ามี)
* Monitor traffic shifting ตาม `Canary10Percent10Minutes` (~10 นาที)
* หลังเสร็จ → post-deployment validation (ถ้ามี)
* alias จะชี้ **เต็มไปยัง version 2** → deployment เสร็จสมบูรณ์

## ความสามารถในการทำงานแบบ Local ของ SAM

* **SAM framework** มีความสามารถในการทำงาน **Lambda แบบ local** เพื่อพัฒนาและทดสอบบนเครื่องของคุณเอง
* สามารถจำลองสภาพแวดล้อมของ Lambda เพื่อการทดสอบและพัฒนาได้อย่างมีประสิทธิภาพ

## เริ่ม Lambda function แบบ local

* ใช้คำสั่ง:

  ```bash
  sam local start-lambda
  ```
  
* ทำให้ Lambda function ของคุณ **พร้อมใช้งานเป็น local endpoint** บนเครื่อง
* สามารถรัน **automated tests** กับ Lambda function โดยไม่ต้อง deploy ไปยัง AWS

## เรียกใช้ Lambda function แบบ local

* ใช้คำสั่ง:

  ```bash
  sam local invoke
  ```

* รัน Lambda function พร้อม payload ที่กำหนด แล้ว **exit หลังรันเสร็จ**
* เหมาะสำหรับ **สร้าง test cases**
* หาก Lambda function เรียกใช้ AWS service เช่น DynamoDB → ระบุ **AWS profile** ด้วย `--profile` เพื่อให้เรียกใช้ environment ที่ถูกต้อง

## เริ่ม Local API Gateway

* ใช้คำสั่ง:

  ```bash
  sam local start-api
  ```

* จะเริ่ม **HTTP server แบบ local** ที่โฮสต์ APIs และ Lambda function ทั้งหมด
* เมื่อแก้ไขโค้ด Lambda → server **reload อัตโนมัติ** → API อัปเดตทันที
* ช่วยให้พัฒนาและทดสอบเร็วขึ้น

## สร้าง Sample Event Payload

* ใช้คำสั่ง:

  ```bash
  sam local generate-event
  ```

* ตัวอย่างเช่น → สร้าง event สำหรับ **Amazon S3 bucket put** และ pipe เข้า `sam local invoke` เพื่อทดสอบ Lambda
* รองรับ event หลายชนิด เช่น:

  * Amazon S3
  * API Gateway
  * SNS
  * Kinesis
  * DynamoDB
  * และอื่น ๆ

## การจัดการหลาย Environment ด้วย SAM

## ภาพรวม

* **SAM** ช่วยให้จัดการหลาย environment ภายใน development stack ได้ง่าย
* ตัวอย่างเช่น คุณอาจ deploy **SAM templates** ไปยัง environment สำหรับ **development** บางครั้ง และไปยัง **production** บางครั้ง

## ไฟล์ `samconfig.toml`

* SAM ใช้ไฟล์ **samconfig.toml** ในรูปแบบ **TOML** สำหรับกำหนดพารามิเตอร์ต่าง ๆ สำหรับแต่ละ environment
* ตัวอย่างเช่น:

  * **dev stack** → กำหนด `deploy` parameter เช่น stack name, S3 bucket, prefix, region, capabilities, และ parameter overrides ว่าเป็น environment **development**
  * กำหนด `sync` parameters สำหรับ dev เช่นเดียวกัน
  * **prod stack** → กำหนด `deploy` parameter สำหรับ production และ `sync` parameters

## ตัวอย่างโครงสร้าง `samconfig.toml`

```toml
[dev.deploy.parameters]
stack_name = "dev-stack"
s3_bucket = "dev-bucket"
prefix = "dev-prefix"
region = "us-east-1"
capabilities = "CAPABILITY_IAM"
parameter_overrides = "Environment=development"

[dev.sync.parameters]
# sync parameters สำหรับ dev

[prod.deploy.parameters]
stack_name = "prod-stack"
s3_bucket = "prod-bucket"
region = "us-east-1"
parameter_overrides = "Environment=production"

[prod.sync.parameters]
# sync parameters สำหรับ prod
```

## การ deploy ไปยัง environment ที่ระบุ

* หลังตั้งค่า `samconfig.toml` เสร็จ สามารถรันคำสั่ง deploy ได้ดังนี้:

```bash
sam deploy --config-env dev
```

* SAM CLI จะอ่านพารามิเตอร์จากไฟล์ TOML และ deploy resources ไปยัง **dev environment**

* หากต้องการ deploy ไป **production**:

```bash
sam deploy --config-env prod
```

* สามารถสร้าง environment เพิ่มได้ตามต้องการ

## สรุป

* AWS SAM เป็น **framework สำหรับพัฒนาและ deploy serverless**
* SAM แปลง **YAML template ง่าย ๆ** เป็น **CloudFormation template ซับซ้อน**
* SAM Accelerate ทำให้ deploy **โค้ด Lambda เร็วมาก** โดยไม่ต้องรัน CloudFormation ถ้า infrastructure ไม่เปลี่ยน
* Workflow:
  1. `sam build` → สร้าง locally
  2. `sam deploy` → zip, upload ไป S3 และ execute ChangeSet
* SAM policy templates ช่วย **จัดการสิทธิ์ Lambda function** โดยรวม permissions ที่เกี่ยวข้องเข้าด้วยกัน
* ตัวอย่างที่สำคัญ:
  1. **S3ReadPolicy** → อ่าน S3
  2. **SQSPollerPolicy** → poll SQS
  3. **DynamoDBCrudPolicy** → CRUD DynamoDB
* การใช้ templates **ไม่ต้องสร้าง IAM role เอง**
* การเข้าใจชื่อและจุดประสงค์ของ template ช่วยให้เข้าใจผลของสิทธิ์ Lambda ได้เร็ว
* การ deploy Lambda ด้วย **SAM + CodeDeploy** ทำให้การอัปเดตปลอดภัยและควบคุมได้
* รองรับ **versioning อัตโนมัติ**, **alias management**, **traffic shifting**, และ **deployment validation hooks**
* สามารถ rollback อัตโนมัติด้วย CloudWatch alarms
* SAM ช่วยให้พัฒนา Lambda ได้ **เร็วและสะดวก** โดย:

  * สร้าง **local endpoint** สำหรับ Lambda
  * **Invoke Lambda** ด้วย payload สำหรับทดสอบ
  * เริ่ม **local API Gateway** พร้อม reload อัตโนมัติ
  * สร้าง **sample events** จากแหล่ง event ต่าง ๆ
* ฟีเจอร์นี้เป็นสิ่งที่อาจเจอใน **exam**
* SAM ช่วยจัดการหลาย environment ได้ง่าย
* ไฟล์ `samconfig.toml` ใช้กำหนด configuration สำหรับ stack แต่ละตัว เช่น **dev** และ **prod**
* การ deploy สามารถระบุ environment เฉพาะด้วย `--config-env`
* ช่วย automate การ deploy resources ไปยัง environment ที่ถูกต้อง และขยายได้หลาย environment

## Key Takeaways

* AWS SAM → พัฒนาและ deploy serverless ด้วย YAML ง่าย ๆ
* SAM แปลง YAML template เป็น CloudFormation template พร้อมใช้ฟีเจอร์เต็มของ CloudFormation
* SAM Accelerate → deploy โค้ดเร็วขึ้นโดย sync กับ Lambda โดยตรง
* Deployment workflow → build local ด้วย `sam build` → deploy ด้วย `sam deploy`
* SAM policy templates ทำให้การจัดการสิทธิ์ Lambda **ง่ายและปลอดภัย**
* ตัวอย่าง template: S3ReadPolicy, SQSPollerPolicy, DynamoDBCrudPolicy
* ใช้ template → ไม่ต้องสร้าง IAM role เอง
* เข้าใจชื่อและจุดประสงค์ของ template → เข้าใจผลลัพธ์ของสิทธิ์ Lambda ได้ทันที
* SAM + CodeDeploy → อัปเดต Lambda function ด้วย **traffic shifting ผ่าน alias**
* สามารถกำหนด **pre-traffic/post-traffic Lambda hooks** สำหรับตรวจสอบ deployment
* **Rollback อัตโนมัติ** ด้วย CloudWatch alarms
* Deployment preferences เช่น `Canary10Percent10Minutes` → กำหนดความเร็วและกลยุทธ์ traffic shifting
* **SAM CLI** ทำให้การ build และ deploy Lambda + CodeDeploy ง่ายขึ้น
* SAM สามารถเริ่ม Lambda function แบบ local เป็น **endpoint บนเครื่อง**
* สามารถเรียกใช้ Lambda function แบบ local พร้อม payload ด้วย `sam local invoke`
* SAM รองรับการเริ่ม **local API Gateway** ที่โฮสต์ APIs และ functions พร้อม reload อัตโนมัติ
* สามารถสร้าง **sample event payload** สำหรับ event source หลายชนิดด้วย `sam local generate-event`
* SAM รองรับการจัดการหลาย environment ใน development stack ได้สะดวก
* ไฟล์ `samconfig.toml` เป็นไฟล์ TOML สำหรับกำหนด configuration ของแต่ละ stack
* ใช้ `--config-env` กับ SAM CLI เพื่อ deploy ไปยัง environment เฉพาะ
* ช่วย automate การ deploy resources ไป environment ที่ถูกต้อง และขยายได้ตามจำนวน environment ที่ต้องการ