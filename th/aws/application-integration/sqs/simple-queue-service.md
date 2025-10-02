# Amazon SQS

หัวใจหลักของ **Amazon SQS (Simple Queue Service)** คือ **Queue** หรือคิวสำหรับเก็บข้อความ (messages)

* **Producer (ผู้ผลิตข้อความ):** เป็นตัวที่ส่งข้อความเข้ามาใน SQS Queue อาจมี 1 หรือหลาย producer ส่งข้อความพร้อมกันก็ได้ เช่น “process this order” หรือ “process this video”
* **Consumer (ผู้บริโภคข้อความ):** เป็นตัวที่ดึงข้อความออกจากคิวเพื่อนำไปประมวลผล โดย consumer จะ **poll** คิว (ถามว่ามีข้อความไหม) ถ้ามี คิวจะส่งข้อความให้ Consumer นำไปใช้ → หลังประมวลผลเสร็จ consumer ต้อง **ลบข้อความออกจากคิว** เพื่อป้องกันไม่ให้ข้อความถูกประมวลผลซ้ำ

SQS ทำหน้าที่เป็น **buffer** ที่ช่วย **decouple (แยกการทำงาน)** ระหว่าง producer และ consumer

## ภาพรวมของ SQS Standard Queues

* SQS เป็นหนึ่งในบริการที่เก่าและเสถียรที่สุดของ AWS (กว่า 10 ปี)
* เป็นบริการแบบ **fully managed**
* ใช้เพื่อ **decouple application** (แยกการทำงานระหว่างระบบ frontend และ backend)

## คุณสมบัติหลักของ SQS Standard Queues

* **Throughput ไม่จำกัด:** ส่งข้อความได้กี่ล้านข้อความต่อวินาทีก็ได้ คิวเก็บได้ไม่จำกัด
* **Message retention (การเก็บข้อความ):** ค่าเริ่มต้น 4 วัน, สูงสุด 14 วัน
* **Latency ต่ำ:** ส่งและรับข้อความเร็ว น้อยกว่า 10 ms
* **Message size:** จำกัดไม่เกิน **256 KB** ต่อข้อความ
* **At-least-once delivery:** ข้อความอาจถูกส่งซ้ำ (ต้องจัดการ duplicate เอง)
* **Best-effort ordering:** ลำดับข้อความ **ไม่รับประกันว่าจะเรียงถูกต้อง**

## Producers (ผู้ผลิตข้อความ)

* ส่งข้อความได้สูงสุด 256 KB ต่อข้อความ
* ใช้ **AWS SDKs / SendMessage API**
* ข้อความถูกเก็บไว้ใน SQS จนกว่า consumer จะอ่านและลบออก

## Consumers (ผู้บริโภคข้อความ)

* เป็นแอปที่คุณเขียนขึ้นมาประมวลผลข้อความ
* ทำงานได้บน **EC2, Lambda, หรือเซิร์ฟเวอร์ On-Premises**
* Poll ได้ครั้งละ **สูงสุด 10 ข้อความ**
* หลังประมวลผล ต้องลบข้อความออกจากคิวด้วย **DeleteMessage API**
* รองรับ **หลาย consumers พร้อมกัน** → scale ได้ตามปริมาณข้อความ

## การ Scale Consumers ด้วย Auto Scaling Group (ASG)

* ใช้ **CloudWatch Metric: ApproximateNumberOfMessages** เพื่อตรวจสอบความยาวของคิว
* ตั้ง **CloudWatch Alarm** → หากคิวมีข้อความเยอะ ให้เพิ่มจำนวน EC2 ใน ASG อัตโนมัติ
* ช่วยให้ระบบรองรับ traffic พุ่งสูง เช่น ช่วง flash sale หรือ peak load

## ตัวอย่าง Use Case (Application Decoupling)

* ระบบ **Video Processing**:

  * Frontend → ส่งข้อความไปที่ SQS เมื่อมี video รอประมวลผล
  * Backend (อยู่ใน ASG) → ดึงข้อความจากคิว ประมวลผล และเก็บผลลัพธ์ไว้ใน S3
  * Frontend กับ Backend scale แยกกันได้ → ระบบเสถียรและยืดหยุ่นกว่า

## ความปลอดภัย (Security Features)

* **Encryption in transit:** ใช้ HTTPS API ในการส่งและรับข้อความ
* **Encryption at rest:** ใช้ **KMS Key** ของ AWS เข้ารหัสข้อมูลที่จัดเก็บ
* **Client-side encryption:** ให้ client เข้ารหัส/ถอดรหัสเอง (SQS ไม่ทำให้โดยตรง)
* **Access control:**

  * ใช้ **IAM Policies** ควบคุมการเข้าถึง API
  * ใช้ **SQS Access Policies** (คล้าย S3 bucket policies) เพื่อเปิด cross-account หรือให้ service อื่น (เช่น SNS, S3) เขียนข้อความเข้าคิว

## Key Takeaways

* **Amazon SQS** เป็นบริการคิวแบบ fully managed สำหรับ **decoupling** ระบบ
* รองรับ **throughput ไม่จำกัด** และเก็บข้อความได้สูงสุด **14 วัน**
* มี **at-least-once delivery** และ **best-effort ordering** → ต้องจัดการ duplicate และการเรียงลำดับเอง
* ผนวกกับ **Auto Scaling Group** เพื่อขยาย consumer ตามปริมาณข้อความได้
* ใช้ได้ดีกับระบบที่ต้องการ **ความยืดหยุ่นและการ scale แยกกัน** เช่น Video Processing, Order Processing
