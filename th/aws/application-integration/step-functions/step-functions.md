# AWS Step Functions

AWS Step Functions ช่วยให้คุณสามารถ **ออกแบบ workflow เป็น state machine** ได้ โดย **หนึ่ง workflow = หนึ่ง state machine**
สามารถนำมาใช้กับหลายกรณี เช่น การจัดการคำสั่งซื้อ (order fulfillment), การประมวลผลข้อมูล (data processing), แอปพลิเคชันเว็บ หรือ workflow ที่ต้องการทำงานอัตโนมัติ

แนวคิดคือคุณกำหนดว่า **จะเกิดอะไรขึ้น ขั้นตอนถัดไปคืออะไร และจะเกิดอะไรถ้ามีเงื่อนไขบางอย่าง** → เพื่อนิยามเป็น workflow

เช่น ตัวอย่าง workflow แบบภาพ (visual workflow):

* เริ่มจากการตัดสินใจ Yes/No
* ถ้า "No" → ไปที่ End
* ถ้า "Yes" → รอ 3 วินาที → แสดงข้อความ “Hello” และ “World” → รวมเป็น “Hello World” → ไปที่ End

คุณจะนิยาม workflow ในรูปแบบ **JSON** ซึ่งจะทำให้คุณเห็น **ภาพรวมแบบ visualization** และยังดู **ประวัติการรัน (execution history)** ได้ด้วย

ทุกขั้นตอนเล็ก ๆ ใน workflow อาจเป็น:

* Lambda function
* การเพิ่มข้อมูลลง DynamoDB
* การรันงาน ECS Task
  AWS Step Functions จะช่วย orchestrate (ควบคุมการไหล) ของ workflow ให้คุณ

## การเริ่มต้น Workflow

คุณสามารถเริ่ม workflow ได้หลายวิธี เช่น:

* ผ่าน SDK API Call
* API Gateway
* CloudWatch Events / Amazon EventBridge
* หรือกดเริ่ม workflow ด้วยมือผ่าน AWS Console

## Task State

Step Functions มี **กล่องงาน (task boxes)** เรียกว่า **Task State** ซึ่งใช้สำหรับทำงานจริงใน state machine เช่น:

* เรียกใช้ Lambda function
* รันงาน AWS Batch
* รัน ECS Task และรอจนเสร็จ
* เขียนข้อมูลลง DynamoDB
* ส่งข้อความไป SNS หรือ SQS
* หรือแม้กระทั่ง **เรียก Step Function อีกอัน**

นอกจากนี้ Task อาจจะเป็น **Activity** → ซึ่งเป็น instance/app server (เช่น EC2, ECS task, หรือ server on-premise) ที่ **ดึงงานจาก Step Functions** มาทำเอง แล้วส่งผลลัพธ์กลับไป (เหมือน AWS SWF)

### ตัวอย่าง Task State ที่เรียก Lambda Function

คุณจะกำหนด JSON object เช่น:

* `"Name": "Invoke Lambda function"`
* `"Type": "Task"`
* `"Resource":` การเรียก Lambda function
* `"Parameters":` ชื่อ function + payload
* `"Next":` state ถัดไป
* `"TimeoutSeconds":` เวลารอ

## ประเภทของ States ใน Step Functions

* **Choice State** → เช็คเงื่อนไขแล้วเลือกเส้นทาง
* **Fail / Succeed State** → จบ workflow แบบล้มเหลวหรือสำเร็จ
* **Pass State** → ส่ง input ไป output โดยตรง (หรือใส่ค่าคงที่)
* **Wait State** → หน่วงเวลาตามที่กำหนด
* **Map State** → รันขั้นตอนแบบวนลูป/ไดนามิก
* **Parallel State** → รันขั้นตอนแบบขนาน (parallel branches)

👉 สำหรับการสอบ ให้เน้นจำ **Parallel** และ **Task State**

## ตัวอย่าง Workflow การรันจริง (Visual Execution)

สมมุติคุณส่งงานเข้าไป → รอ X วินาที → เช็คสถานะงาน

* ถ้างานยังไม่เสร็จ → รออีก (วน loop)
* ถ้างานเสร็จ → ดึงสถานะสุดท้าย
* ถ้าล้มเหลว → handle error → จบ

ในหน้าจอคุณจะเห็น workflow แสดงเป็นสีน้ำเงิน → loop ตอนรอ → จบเมื่อเสร็จ

## Key Takeaways

* **AWS Step Functions** = สร้าง workflow แบบ state machine (หนึ่ง workflow ต่อหนึ่ง state machine)
* Workflows กำหนดด้วย **JSON** → แสดงผลแบบ visual + ติดตาม execution ได้
* **Task State** ใช้เรียก Lambda, Batch, ECS, DynamoDB, SNS, SQS, หรือแม้แต่ Step Function อื่น ๆ
* รองรับหลาย state type เช่น Choice, Fail, Succeed, Pass, Wait, Map, Parallel เพื่อควบคุม workflow ได้อย่างยืดหยุ่น