# Amazon EventBridge Cheat Sheet

**Amazon EventBridge** เป็นบริการที่ช่วยให้แอปพลิเคชันสื่อสารกันได้โดยใช้ข้อมูลจากแหล่งต่างๆ แบบเรียลไทม์ เป็นระบบบัสเหตุการณ์ (Event Bus) แบบ Serverless ที่ทำหน้าที่เป็นศูนย์กลางในการรับเหตุการณ์ (Events) จากแหล่งต่างๆ และส่งต่อไปยังแอปพลิเคชันหรือบริการที่เหมาะสม

### แนวคิดหลัก (Concepts)
* **Events (เหตุการณ์):** ข้อมูลในรูปแบบ JSON ที่แสดงถึงการเปลี่ยนแปลงสถานะหรือการเกิดขึ้นของเหตุการณ์ในระบบ (เช่น Timestamp, ประเภทเหตุการณ์, Resource ID)
* **Event Patterns (รูปแบบเหตุการณ์):** ใช้สำหรับกรองเหตุการณ์ โดยระบุฟิลด์และค่าที่ต้องการให้ตรงกัน (Match) กับโครงสร้าง JSON ของเหตุการณ์ที่เข้ามา
* **Event Bus (บัสเหตุการณ์):** กลไกในการรับและส่งต่อเหตุการณ์
    * **Default Event Bus:** มีให้ทุกบัญชี AWS เพื่อรับเหตุการณ์จากบริการของ AWS (EC2, S3 ฯลฯ)
    * **Custom Event Bus:** สร้างขึ้นเองเพื่อรับเหตุการณ์จากแอปพลิเคชันหรือบริการภายนอก (Third-party)
* **Cross-Account Event Bus:** การส่งและรับเหตุการณ์ข้ามบัญชี AWS โดยต้องแก้ไข Permission ที่ฝั่งผู้รับ (Resource-based policy) และสร้าง Rule ที่ฝั่งผู้ส่ง
* **Event Rule (กฎ):** ตัวรับเหตุการณ์และส่งต่อไปยังเป้าหมาย (Targets)
    * **Event Pattern Rule:** กรองตามเนื้อหาข้อมูล (เช่น กรองเฉพาะ EC2 ที่สถานะเป็น "running")
    * **Schedule Rule:** ทำงานตามความถี่ที่กำหนด (เช่น ทุกๆ 1 ชั่วโมง)
* **Global Endpoints:** ส่งเหตุการณ์ไปยัง EventBridge ใน Region ใดก็ได้ เพื่อเพิ่มความทนทาน (Resilience)
* **Archives and Replays:** การจัดเก็บเหตุการณ์ย้อนหลัง (Archive) และการส่งเหตุการณ์ซ้ำ (Replay) เพื่อใช้ในการทดสอบหรือกู้คืนระบบ
* **Security:** ใช้ทั้ง Identity-based policies (กำหนดที่ผู้ใช้/Role) และ Resource-based policies (กำหนดที่ตัว Event Bus) เพื่อควบคุมการเข้าถึงทรัพยากร

---

### 1. EventBridge Pipes
เป็นตัวเชื่อมต่อระหว่าง "ผู้ผลิต" (Sources) และ "ผู้บริโภค" (Targets) แบบจุดต่อจุด (Point-to-point) โดยไม่ต้องเขียนโค้ดเอง
* **Pipe:** ท่อส่งข้อมูลที่เชื่อม 1 แหล่งต้นทาง เข้ากับ 1 เป้าหมายปลายทาง
* **ความสามารถ:** * **Filter:** กรองเฉพาะข้อมูลที่ต้องการ
    * **Enrichment:** เพิ่มข้อมูลหรือปรับแต่งข้อมูลก่อนส่งถึงปลายทาง (เช่น เรียก Lambda เพื่อดึงข้อมูลเพิ่ม)
* **แหล่งข้อมูลยอดนิยม:** SQS, Kinesis, DynamoDB Streams, Kafka, MQ

---

### 2. EventBridge Scheduler
บริการจัดตารางเวลางานแบบ Serverless ที่มีความสามารถสูงกว่า Schedule Rule แบบเดิม
* **ข้อดีที่เหนือกว่า:**
    * สร้างตารางงานได้โดยไม่ต้องสร้าง Event Bus หรือ Rule แยกต่างหาก
    * รองรับ **Time Zones**, ปรับขนาดได้มหาศาล (หลักพันล้านงาน), กำหนด Payload เองได้ และมีแดชบอร์ดตรวจสอบสถานะ
    * จัดการกลุ่มของตารางงาน (Schedule Groups) ได้ง่ายขึ้น

---

### 3. Schema Registry
ที่เก็บโครงสร้างข้อมูล (JSON Schemas) เพื่อให้ผู้ส่งและผู้รับเข้าใจรูปแบบข้อมูลตรงกัน
* **Schema Discovery:** ตรวจจับโครงสร้างข้อมูลจากเหตุการณ์ที่วิ่งผ่านบัสโดยอัตโนมัติ และสร้าง Code Bindings (เช่น Java, Python) เพื่อให้เรียกใช้งานได้ง่ายในรูปแบบ Object
* **ประเภท Registry:**
    * **AWS event schema registry:** สำหรับบริการของ AWS (แก้ไขไม่ได้)
    * **Discovered schema registry:** สำหรับเหตุการณ์ที่ระบบตรวจพบอัตโนมัติ
    * **Custom registry:** สำหรับแอปพลิเคชันที่สร้างขึ้นเอง

---

### กรณีการใช้งาน (Use Cases)
* **Application Integration:** เชื่อมต่อ Microservices แบบ Event-driven
* **Serverless Development:** เชื่อมต่อ API เข้ากับ AWS Lambda
* **Automation:** เช่น สั่งเริ่ม EC2 อัตโนมัติเมื่อมีการอัปโหลดไฟล์ไปที่ S3
* **Data Processing:** ส่งข้อมูลสตรีมมิ่งจาก Kinesis ไปยังเครื่องมือวิเคราะห์
* **Third-party Integration:** รับส่งข้อมูลกับ SaaS ภายนอกผ่าน API Destinations

---

### แนวทางปฏิบัติที่ดีที่สุด (Best Practices)
* **High Availability:** เปิดใช้งานการจำลองเหตุการณ์ (Event Replication) ข้าม Region
* **Throttling:** ตรวจสอบ Metrics การจำกัดปริมาณ (Throttling) และปรับแต่ง Rule ให้เหมาะสม
* **Dead-letter Queues (DLQ):** ใช้ SQS เพื่อเก็บเหตุการณ์ที่ส่งไม่สำเร็จและตั้งค่า Retry Policy
* **Filtering:** ตั้งกฎการกรองให้แม่นยำเพื่อไม่ให้เป้าหมายรับภาระหนักเกินไป

---

### ค่าบริการ (Pricing)
* **Events:** คิดตามจำนวนล้านเหตุการณ์ที่รับเข้ามา
* **Schema Discovery/Registry:** คิดตามจำนวนล้าน API calls
* **EventBridge Pipes:** คิดตามปริมาณข้อมูลที่ประมวลผล
* **EventBridge Scheduler:** คิดตามจำนวนครั้งที่มีการเรียกใช้งาน (Invocations)