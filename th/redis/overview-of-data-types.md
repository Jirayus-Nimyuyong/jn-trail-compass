# ภาพรวมของประเภทข้อมูลใน Redis (Redis Overview of Data Types)

## 1. บทนำ
Redis เป็นฐานข้อมูลประเภท Key-Value ที่รองรับโครงสร้างข้อมูลที่หลากหลาย ซึ่งช่วยให้สามารถใช้งานได้กับหลายกรณีศึกษา เช่น การแคชข้อมูล การจัดการเซสชัน และระบบคิวข้อความ

## 2. ประเภทข้อมูลใน Redis
Redis มีประเภทข้อมูลหลักดังต่อไปนี้:

### 2.1 String
- เป็นประเภทข้อมูลพื้นฐานที่สุด
- เก็บข้อมูลเป็นสตริงไบต์ (สูงสุด 512MB ต่อคีย์)
- ใช้สำหรับการเก็บค่า เช่น ค่าแคช ตัวนับ และข้อมูลพื้นฐาน
- ตัวอย่างการใช้งาน:
  ```bash
  SET mykey "Hello, Redis"
  GET mykey
  ```

### 2.2 List
- เป็นลิสต์ของสตริงที่เรียงลำดับตามลำดับการเพิ่มข้อมูล (FIFO)
- เหมาะสำหรับการใช้งานเป็นคิว (Queue) หรือสแตก (Stack)
- ตัวอย่างการใช้งาน:
  ```bash
  LPUSH mylist "A"
  LPUSH mylist "B"
  RPUSH mylist "C"
  LRANGE mylist 0 -1
  ```

### 2.3 Set
- เป็นกลุ่มของสตริงที่ไม่ซ้ำกันและไม่มีลำดับ
- เหมาะสำหรับการเก็บข้อมูลที่ต้องการความเป็นเอกลักษณ์
- ตัวอย่างการใช้งาน:
  ```bash
  SADD myset "A"
  SADD myset "B"
  SADD myset "A"
  SMEMBERS myset
  ```

### 2.4 Sorted Set (Zset)
- คล้ายกับ `Set` แต่มีคะแนน (Score) กำกับแต่ละค่า
- เหมาะสำหรับการจัดอันดับข้อมูล เช่น ระบบ Leaderboard
- ตัวอย่างการใช้งาน:
  ```bash
  ZADD myzset 1 "Alice"
  ZADD myzset 3 "Bob"
  ZADD myzset 2 "Charlie"
  ZRANGE myzset 0 -1 WITHSCORES
  ```

### 2.5 Hash
- ใช้เก็บคู่ค่า (field-value) ภายใต้คีย์เดียว
- เหมาะสำหรับเก็บข้อมูลเช่น ข้อมูลผู้ใช้หรือการตั้งค่า
- ตัวอย่างการใช้งาน:
  ```bash
  HSET user:1001 name "Alice"
  HSET user:1001 age "25"
  HGETALL user:1001
  ```

### 2.6 Bitmap
- ใช้สำหรับเก็บข้อมูลแบบบิต (0 หรือ 1)
- เหมาะสำหรับการเก็บสถานะ เช่น การติดตามพฤติกรรมของผู้ใช้
- ตัวอย่างการใช้งาน:
  ```bash
  SETBIT mybitmap 5 1
  GETBIT mybitmap 5
  ```

### 2.7 HyperLogLog
- ใช้สำหรับประมาณค่าจำนวนเอกลักษณ์ของข้อมูลที่แตกต่างกัน
- มีประโยชน์สำหรับการนับจำนวนผู้ใช้ที่ไม่ซ้ำกันในเว็บไซต์
- ตัวอย่างการใช้งาน:
  ```bash
  PFADD myhll "user1" "user2" "user3"
  PFCOUNT myhll
  ```

### 2.8 Streams
- ใช้สำหรับการจัดการข้อมูลที่เข้ามาแบบต่อเนื่อง (Real-time Data Streaming)
- เหมาะสำหรับการใช้งานระบบข้อความหรือการบันทึกเหตุการณ์
- ตัวอย่างการใช้งาน:
  ```bash
  XADD mystream * sensor-id 1 temperature 22.5
  XRANGE mystream - +
  ```

## 3. สรุป
Redis รองรับโครงสร้างข้อมูลที่หลากหลาย ซึ่งช่วยให้สามารถใช้งานได้ในหลายกรณี เช่น การเก็บข้อมูลแบบแคช ระบบคิว หรือระบบนับคะแนน โดยการเลือกใช้ประเภทข้อมูลที่เหมาะสมจะช่วยให้ระบบมีประสิทธิภาพสูงสุด

