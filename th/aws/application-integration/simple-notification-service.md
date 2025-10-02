# Amazon SNS

Amazon SNS (Simple Notification Service) เป็นบริการส่งข้อความแบบ **Pub/Sub (Publish-Subscribe)** ที่ช่วยให้สามารถส่งข้อความเพียงครั้งเดียวแต่กระจายไปยังผู้รับหลาย ๆ คนพร้อมกันได้

## ความท้าทายของการส่งข้อความไปยังผู้รับหลายคน

ถ้าเราต้องการส่งข้อความเดียวไปหาหลายบริการ เช่น

* บริการซื้อ (Buying Service) ส่งอีเมลแจ้งเตือน
* ส่งข้อความไปที่ Fraud Service
* ส่งข้อความไปที่ Shipping Service
* ส่งต่อเข้า SQS Queue

วิธีนี้ยุ่งยากมาก เพราะทุกครั้งที่มีการเพิ่มบริการผู้รับใหม่ จะต้องเขียนการเชื่อมต่อ (integration) เพิ่มเองตลอด

## รูปแบบ **Publish-Subscribe (Pub/Sub Pattern)**

Amazon SNS แก้ปัญหานี้โดยใช้รูปแบบ **Pub/Sub**

* แอปซื้อขายจะ **Publish** ข้อความไปยัง **SNS Topic**
* **Topic** จะมีผู้สมัคร (Subscribers) หลายคน
* ทุกคนที่ Subscribe Topic นั้น จะได้รับข้อความทั้งหมด

> SNS ยังสามารถทำ **Message Filtering** ได้ เพื่อให้ผู้รับบางคนรับเฉพาะข้อความที่ต้องการ

## ขีดความสามารถในการขยาย (Scalability Limits)

* **Subscribers ต่อ 1 Topic**: มากกว่า **12,000,000 รายชื่อ**
* **จำนวน Topics ต่อบัญชี**: ได้สูงสุด **100,000** (สามารถขอเพิ่มได้)

## ประเภทของ Subscribers ใน SNS

SNS สามารถส่งข้อความไปยัง:

* **Email**
* **SMS / การแจ้งเตือนมือถือ**
* **HTTP / HTTPS Endpoint**
* **AWS Services**

  * **SQS** → ส่งเข้าคิว
  * **Lambda** → เรียกใช้โค้ดอัตโนมัติ
  * **Kinesis Data Firehose** → ส่งต่อไปยัง S3 หรือ Redshift

## การเชื่อมต่อกับ AWS Services

หลายบริการของ AWS สามารถส่ง Notification เข้า SNS ได้โดยตรง เช่น:

* CloudWatch Alarms
* Auto Scaling Group
* CloudFormation
* Budgets
* S3 Buckets
* DMS, Lambda, DynamoDB, RDS Events

## วิธีการทำงานของ SNS

1. สร้าง **Topic**
2. สร้าง **Subscriptions** (หลายตัวก็ได้)
3. **Publish** ข้อความไปที่ Topic
4. ผู้สมัครทุกคนจะได้รับข้อความอัตโนมัติ

SNS ยังรองรับ **Direct Publish สำหรับ Mobile Apps** ผ่าน SDK (Google GCM, Apple APNS, Amazon ADM)

## ความปลอดภัยของ Amazon SNS

* **Encryption**

  * ข้อมูลถูกเข้ารหัสระหว่างทาง (In-Flight)
  * ข้อมูลถูกเข้ารหัสเมื่อถูกเก็บ (At-Rest) ด้วย KMS
  * รองรับ Client-Side Encryption
* **IAM Policies**

  * ควบคุมการเข้าถึง SNS APIs
  * รองรับ **SNS Access Policies** คล้าย S3 Bucket Policy
  * ใช้สำหรับ Cross-Account Access หรือให้บริการ AWS อื่นเขียนเข้า SNS

## Amazon SNS และ SQS – Fan-Out Pattern

**SNS + SQS Fan-Out Pattern** ถูกออกแบบมาเพื่อส่งข้อความไปยังหลาย SQS Queues ได้อย่างมีประสิทธิภาพ แทนที่จะส่งข้อความแยกกันไปยังแต่ละคิว ซึ่งอาจทำให้เกิดปัญหาเช่น แอปล่ม, ส่งข้อความไม่สำเร็จ, หรือยุ่งยากเมื่อต้องเพิ่มคิวใหม่

แนวคิดหลักคือ **ส่งข้อความเพียงครั้งเดียวไปยัง SNS Topic** แล้วให้หลาย SQS Queues **subscribe** กับ Topic นั้น เพื่อรับข้อความทั้งหมดอย่างอิสระ

**ตัวอย่าง:**

* บริการซื้อขาย (Buying Service) ต้องการส่งข้อความไปยัง 2 คิว SQS
* ส่งข้อความไปยัง SNS Topic เพียงครั้งเดียว
* Fraud Service และ Shipping Service แต่ละบริการมี SQS Queue ของตัวเอง Subscribe กับ Topic
* ทั้งสองคิวสามารถอ่านข้อความทั้งหมดได้อิสระ

รูปแบบนี้ **Decoupled** อย่างสมบูรณ์ ลดความเสี่ยงการสูญหายของข้อมูล

* SQS รองรับ **Data Persistence**
* รองรับ **Delayed Processing** และ **Retries**
* สามารถเพิ่ม SQS Queue ใหม่ในอนาคตได้ง่าย

> หมายเหตุ: SQS Queue ต้องมี **Access Policy** อนุญาตให้ SNS Topic เขียนข้อมูลเข้า Queue

## การประยุกต์กับ S3 Events

S3 Event Rule มีข้อจำกัด เช่น สำหรับ Event Type + Prefix สามารถมีได้ **หนึ่ง Rule ต่อการตั้งค่า**

* หากต้องการส่ง S3 Event เดียวไปหลาย SQS Queue → ใช้ **Fan-Out Pattern**
* เมื่อสร้าง Object ใน S3 → Event ถูกส่งไปยัง SNS Topic
* SQS Queues หลายตัว Subscribe Topic → รับข้อความ Event ได้หลายปลายทาง
* สามารถส่งต่อไปยัง Email, Lambda หรือแอปพลิเคชันอื่นได้

## การเชื่อมต่อกับ Kinesis Data Firehose

* SNS สามารถเชื่อมต่อกับ **Kinesis Data Firehose (KDF)**
* บริการซื้อขายส่งข้อมูลไป SNS Topic → KDF รับและส่งต่อไปยังปลายทาง เช่น S3 Bucket หรือบริการอื่นที่รองรับ KDF
* ทำให้เก็บข้อความจาก SNS Topic ได้อย่างยืดหยุ่น

## Fan-Out กับ FIFO Topics และ Queues

* SNS รองรับ **FIFO Topics** → รักษาลำดับข้อความ
* Producer ส่งข้อความเป็นลำดับ (1,2,3,4) → Subscribers (ต้องเป็น **SQS FIFO Queues**) จะได้รับข้อความตามลำดับ
* คุณสมบัติของ SNS FIFO:

  * **Message Group ID** → จัดลำดับ
  * **Deduplication ID** หรือ **Content-based Deduplication** → ป้องกันส่งซ้ำ

> ทั้ง SQS Standard และ FIFO สามารถเป็น Subscribers ได้ แต่ Throughput ถูกจำกัดตาม SQS FIFO Queue

ตัวอย่าง: Buying Service ส่งข้อความไป **SNS FIFO Topic** → Fan-Out ไปยัง 2 SQS FIFO Queues → Fraud Service และ Shipping Service อ่านจาก FIFO Queues

## Message Filtering ใน SNS

* SNS รองรับ **Message Filtering** → ใช้นโยบาย JSON กรองข้อความสำหรับ Subscription
* หาก Subscription ไม่มี Filter Policy → จะได้รับข้อความทั้งหมด

**ตัวอย่าง:**

* Buying Service ส่ง Transaction ไป SNS Topic
* แต่ละ Transaction มีฟิลด์: order number, product, quantity, state
* ต้องการให้ SQS Queue รับเฉพาะคำสั่ง **Placed** → กำหนด Filter Policy `{state: "Placed"}`
* SQS Queue อื่นสามารถตั้ง Filter Policy สำหรับ **Canceled**
* Subscription Email สามารถใช้ Filter Policy เดียวกันสำหรับ Canceled Order
* SQS Queue ที่ไม่มี Filter Policy → รับข้อความทั้งหมด

## สรุป (Key Takeaways)

* Amazon SNS ใช้รูปแบบ **Pub/Sub** ส่งข้อความจากแหล่งเดียวไปหาผู้รับหลายคน
* รองรับผู้รับหลายประเภท: Email, SMS, HTTP(S), SQS, Lambda, Kinesis Firehose
* ผสานการทำงานกับหลายบริการใน AWS ได้โดยตรง
* มีระบบความปลอดภัยทั้งการเข้ารหัส (in-flight & at-rest), client-side encryption และการควบคุมสิทธิ์ด้วย IAM
* SNS + SQS Fan-Out Pattern → ส่งข้อความครั้งเดียวไปหลาย SQS Queue อย่างเชื่อถือได้ และ Decoupled
* SNS Topic สามารถมีหลาย SQS Queues Subscribe → รองรับการกระจายข้อความที่ยืดหยุ่น พร้อม Data Persistence และ Retry
* รองรับ **Cross-Region Delivery** และเชื่อมต่อกับบริการอื่น เช่น S3 Events, Kinesis Data Firehose
* SNS FIFO Topic + SQS FIFO Queue → ส่งข้อความตามลำดับ พร้อม Deduplication และสามารถกรองข้อความเฉพาะที่ต้องการ