# SQS - FIFO Queues

**SQS FIFO queues** ของ Amazon ให้การรับประกัน **การเรียงลำดับข้อความแบบ First-In, First-Out (FIFO)**

* หมายความว่าเมื่อ Producer ส่งข้อความตามลำดับ เช่น 1, 2, 3, 4
* Consumer ที่ Poll ข้อความจาก FIFO Queue จะได้รับข้อความตามลำดับเดียวกัน
* การรับประกันการเรียงลำดับนี้เป็นฟีเจอร์สำคัญของ FIFO queues แตกต่างจาก **Standard queues** ที่ข้อความอาจถูกรับออกมาไม่เรียงลำดับ

## ข้อจำกัด Throughput และ Exactly-Once Delivery

* เนื่องจาก FIFO ต้องรักษาลำดับข้อความ จึงมีข้อจำกัด **Throughput**:

  * ประมาณ 300 ข้อความต่อวินาที **โดยไม่ใช้ batching**
  * สูงสุด 3,000 ข้อความต่อวินาที **เมื่อใช้ batching**
* FIFO queues รองรับ **Exactly-Once Delivery** โดยลบข้อความซ้ำที่ระดับคิว

  * ทุกข้อความต้องมี **Deduplication ID**
  * หากมี Deduplication ID ซ้ำกันภายในหน้าต่างเวลา 5 นาที ระบบจะลบข้อความซ้ำอัตโนมัติ

## Message Group ID และการรับประกันลำดับ

* ข้อความจะถูกประมวลผลตามลำดับโดย Consumer
* การรับประกันลำดับใช้ **ในระดับ Message Group ID**
* ทุกข้อความที่ส่งเข้าคิว FIFO ต้องมี **Message Group ID**
* ข้อความทั้งหมดที่อยู่ใน **Group ID เดียวกัน** จะถูกประมวลผลตามลำดับที่ส่ง

## การสร้าง FIFO Queue ใน Console

* เมื่อต้องการสร้าง FIFO Queue ใน AWS Console **ชื่อคิวต้องลงท้ายด้วย .fifo**
* การตั้งค่าคล้ายกับ Standard Queue แต่มีออปชันเพิ่มเติมคือ **Content-Based Deduplication**

  * อนุญาตให้คิวลบข้อความซ้ำ หากข้อความเดียวกันถูกส่งซ้ำภายใน 5 นาที
* การตั้งค่าอื่น ๆ เช่น **Access Policy** และ **Encryption** เหมือน Standard Queue

## การส่งข้อความไปยัง FIFO Queue

* เมื่อต้องส่งข้อความ ต้องระบุ **Message Group ID**
* แต่ละข้อความต้องมี **Deduplication ID** เพื่อเปิดใช้งานการตรวจจับข้อความซ้ำ
* ตัวอย่าง: ส่งข้อความ "Hello World 1", "Hello World 2", "Hello World 3", "Hello World 4"

  * ใช้ **Message Group ID = demo**
  * Deduplication ID = 1, 2, 3, 4 ตามลำดับ

## การรับข้อความและตรวจสอบลำดับ

* หลังจากส่งข้อความ ข้อความจะพร้อมให้รับ
* เมื่อ Poll ข้อความ 4 ข้อความ จะได้รับข้อความ **ตามลำดับที่ส่งไป**

  * ข้อความแรก: "Hello World 1"
  * ตามด้วย "Hello World 2", "Hello World 3", "Hello World 4"
* หลังประมวลผลแล้วสามารถ **ลบข้อความออกจากคิว** ได้

## SQS - FIFO Queues ขั้นสูง

## แนวคิดขั้นสูงสำหรับ SQS FIFO

เราจะมาทำความเข้าใจแนวคิดขั้นสูงเกี่ยวกับ **Amazon SQS FIFO queues**

## Deduplication Interval

* FIFO queues มี **Deduplication Interval** 5 นาที
* หมายความว่า หากส่งข้อความซ้ำภายใน 5 นาที ข้อความที่สองจะถูกปฏิเสธ

## วิธีการ Deduplication

มี 2 วิธีหลักในการลบข้อความซ้ำ:

1. **Content-based deduplication**

   * เมื่อส่งข้อความไปยัง SQS จะมีการสร้าง **SHA-256 hash** จากเนื้อหาของข้อความ
   * หากข้อความเดียวกันถูกส่งซ้ำ จะได้ hash เดิม ทำให้ข้อความซ้ำถูกปฏิเสธ

2. **Explicit deduplication ID**

   * สามารถระบุ **deduplication ID** เองเมื่อส่งข้อความ
   * หากใช้ ID เดิมซ้ำ ข้อความที่สองจะถูกปฏิเสธ

## ตัวอย่าง Content-Based Deduplication

* สมมติเรามี FIFO queue ที่เปิดใช้งาน content-based deduplication
* ส่งข้อความ `"hello world"`
* Queue จะสร้าง SHA-256 hash เช่น:

  ```cli
  f572d396fae9206628714fb2ce00f72e94f2258f
  ```

* หากส่งข้อความเดียวกันอีกครั้ง hash จะเหมือนเดิม และ queue จะปฏิเสธข้อความซ้ำ

## Message Grouping

* **Message Group ID** เป็นสิ่งจำเป็นสำหรับ FIFO queues
* ข้อความที่มี **Group ID เดียวกัน** จะถูกประมวลผลตามลำดับโดย **consumer หนึ่งตัว**
* หากต้องการ ordering ภายใน subsets ของข้อความ ให้กำหนด **Group ID ต่างกัน**
* แต่การเรียงลำดับระหว่าง Group ต่างกัน **ไม่ถูกรับประกัน**

## ตัวอย่าง Message Grouping

* สมมติมี 3 Group: A, B, C

| Group | Messages       | Consumer   |
| ----- | -------------- | ---------- |
| A     | A1, A2, A3     | Consumer 1 |
| B     | B1, B2, B3, B4 | Consumer 2 |
| C     | C1, C2         | Consumer 3 |

* Ordering ถูกรับประกัน **ภายในแต่ละ Group** แต่ไม่ข้าม Group

## Use Case ของ Message Grouping

* หากต้องการรักษาลำดับข้อความสำหรับลูกค้าแต่ละราย
* สามารถใช้ **Customer ID** เป็น **Message Group ID**
* ทำให้มีหลาย consumers ประมวลผลข้อความพร้อมกันได้ โดยแต่ละ user มีลำดับข้อความของตัวเอง

## Demonstration ของ Deduplication และ Grouping

* เปิดใช้งาน **content-based deduplication** ใน FIFO queue
* ส่งข้อความ `"hello world"` พร้อม **Message Group ID = demo**
* Deduplication ID เป็น optional เพราะ content-based deduplication เปิดใช้งาน
* หากส่งข้อความซ้ำหลายครั้ง จะมีข้อความเพียงหนึ่งอันใน queue
* หากส่งข้อความใหม่ `"hello world two"` จะเพิ่มข้อความที่สองใน queue

**Explicit Deduplication ID Example**

* ส่งข้อความพร้อม deduplication ID `"1-2-3"`
* หากส่งข้อความซ้ำพร้อม ID เดิม ข้อความจะถูก deduplicate เหลือเพียงอันเดียวใน queue

**Message Group ID Example**

* User "user123" ซื้อ apple, banana, strawberries → ใช้ **Message Group ID = user123**

  * ข้อความจะประมวลผลตามลำดับสำหรับ user นี้

* User "user234" ซื้อ green apple → ใช้ Group ID ต่างกัน

  * ข้อความจะเรียงลำดับสำหรับ user นี้โดยแยกจาก user123

* ทำให้หลาย consumers ประมวลผลข้อความพร้อมกัน โดยแต่ละ consumer ดึงข้อความจาก Group ID ต่างกัน

## สรุป

**Amazon SQS FIFO Queues** ช่วยให้มั่นใจได้ว่า:

* ข้อความถูกประมวลผลตามลำดับ (FIFO)
* ข้อความถูกส่ง **exactly-once** ภายใน Message Group
* เหมาะกับแอปพลิเคชันที่ต้องการลำดับข้อความเข้มงวดและการลบข้อความซ้ำ
* เมื่อดึงข้อความจาก queue สามารถประมวลผลและลบข้อความหลังการประมวลผลได้
* FIFO queues ขั้นสูงช่วยให้การจัดการ **ข้อความซ้ำ** และ **การเรียงลำดับ** เป็นไปอย่างมีประสิทธิภาพ

## Key Takeaways

* FIFO Queues รับประกัน **ลำดับข้อความแบบ First-In-First-Out**
* รองรับ **Exactly-Once Delivery** โดยใช้ Deduplication ID
* การเรียงลำดับข้อความถูกรักษาในแต่ละ **Message Group ID**
* Throughput ของ FIFO Queue:

  * 300 ข้อความ/วินาที **โดยไม่ใช้ batching**
  * 3,000 ข้อความ/วินาที **เมื่อใช้ batching**
* FIFO queues มี **Deduplication Interval 5 นาที** เพื่อป้องกันข้อความซ้ำ
* **Content-based deduplication** ใช้ SHA-256 hash ของข้อความเพื่อระบุข้อความซ้ำ
* สามารถระบุ **Message Deduplication ID** เองเพื่อควบคุมการ deduplicate
* **Message Group IDs** ช่วยให้ข้อความในแต่ละ group ประมวลผลตามลำดับ และอนุญาตให้ประมวลผลขนานกันระหว่าง groups