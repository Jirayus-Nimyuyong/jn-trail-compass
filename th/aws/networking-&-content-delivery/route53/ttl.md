# Route 53 - TTL

## การทำความเข้าใจ TTL (Time To Live) ใน DNS

**TTL ของ A record** คือค่าระยะเวลา (Time To Live) ที่กำหนดไว้กับ DNS record แต่ละตัว
สมมติว่ามี client ที่เข้าถึง **DNS Route 53** และ **Web Server** เมื่อมีการร้องขอ DNS สำหรับ `myapp.example.com` ระบบ DNS จะตอบกลับมาด้วย **A record** ซึ่งมี **IP address** และ **TTL value** เช่น `300 seconds`

TTL จะบอก client ให้เก็บ (cache) ผลลัพธ์นี้ตามเวลาที่กำหนด ตัวอย่างเช่น ถ้า TTL = 300 วินาที client จะเก็บ response ไว้ 300 วินาที
ในช่วงเวลานี้ ถ้า client ขอชื่อ host เดิมอีกครั้ง มันจะไม่ query ไปที่ DNS system เพราะมีคำตอบ cache อยู่แล้ว

กลไกการ cache นี้ช่วยลดจำนวนครั้งที่ต้อง query DNS (เพราะ DNS records โดยปกติไม่ได้เปลี่ยนบ่อย) ทำให้ client ใช้ข้อมูลที่ cache ไว้เพื่อเข้าถึง web server และทำการสื่อสาร HTTP ได้เลย

## กรณีสุดขั้วของค่า TTL

**1. TTL สูง (เช่น 24 ชั่วโมง):**

* ลดจำนวน DNS queries ไปยัง Route 53 → ทำให้ traffic ลดลง
* Client cache record ไว้นาน → อาจใช้ record ที่เก่า หากมีการเปลี่ยนแปลง
* ถ้า record มีการเปลี่ยนแปลง → client อาจต้องรอสูงสุด 24 ชั่วโมงกว่าจะได้รับข้อมูลใหม่

**2. TTL ต่ำ (เช่น 60 วินาที):**

* เพิ่มปริมาณ DNS query → ทำให้ค่าใช้จ่ายสูงขึ้น (เพราะ Route 53 คิดค่าบริการต่อ request)
* Record เก่าอยู่ไม่นาน → การเปลี่ยนแปลงจะ propagate ได้เร็วกว่า
* ง่ายต่อการ update records แบบรวดเร็ว

## วิธีเลือกค่า TTL

การเลือก TTL ที่เหมาะสมขึ้นอยู่กับความต้องการ

* ถ้าวางแผนจะเปลี่ยนค่า record:

  1. ลด TTL ลงก่อนล่วงหน้า (เช่น 24 ชั่วโมงก่อนการเปลี่ยน)
  2. รอจน client เก็บ cache ค่า TTL ใหม่ที่ต่ำกว่าแล้ว
  3. เปลี่ยนค่าของ record → จะ propagate ได้เร็วขึ้น
  4. หลังจากนั้น เพิ่มค่า TTL ขึ้นอีกครั้งเพื่อลด traffic

> หมายเหตุ: TTL เป็นค่าบังคับสำหรับทุก DNS record **ยกเว้น Alias records** (ซึ่งจะเรียนในหัวข้อถัดไป)

## การสาธิต TTL ใน AWS Route 53 Console

* สร้าง DNS record ใหม่ชื่อ `demo.stephanetheteacher.com` ชี้ไปที่ EC2 instance ใน region `eu-central-1`
* ตั้งค่า TTL = 120 วินาที (2 นาที)
* เมื่อสร้างเสร็จ จะได้ A record ชี้ไปยัง IP ที่กำหนด

**การตรวจสอบ:**

* ใช้ Google Chrome เปิด `demo.stephanetheteacher.com` → จะไปยัง instance ใน `eu-central-1`
* ใช้ CloudShell รันคำสั่ง DNS เช่น:

  * `nslookup demo.stephanetheteacher.com` → ได้ IP address ที่ถูกต้อง
  * `dig demo.stephanetheteacher.com` → จะแสดงค่า TTL (เช่น 115 วินาที เหลืออยู่จาก 120)
* ถ้ารัน `dig` ซ้ำ TTL จะลดลงเรื่อย ๆ (เช่น 98 วินาที) → แสดงว่าคำตอบยังถูก cache อยู่

**กรณีเปลี่ยนค่า DNS Record อย่างรวดเร็ว:**

* เปลี่ยนให้ชี้ไป instance ใหม่ใน `ap-southeast-1`
* ถ้า query DNS ทันที → client ยังได้ค่าเก่า เพราะ TTL เดิมยังไม่หมด (เช่น 66 วินาทีเหลืออยู่)
* ต้องรอให้ TTL หมดก่อน → จากนั้น client จึงจะ query ใหม่ และได้ IP address ที่ update แล้ว

## สรุป

TTL เป็น parameter สำคัญของ DNS ที่ช่วย balance ระหว่าง:

* **ลด DNS query traffic** (TTL สูง)
* **การ propagate การเปลี่ยนแปลงอย่างรวดเร็ว** (TTL ต่ำ)

การจัดการ TTL แบบมีกลยุทธ์ เช่น ลด TTL ก่อนเปลี่ยน แล้วค่อยเพิ่มกลับภายหลัง จะช่วยให้ระบบทำงานมีประสิทธิภาพมากขึ้น

## Key Takeaways

* TTL คือค่าที่บอก client ให้ cache DNS response ตามเวลาที่กำหนด
* TTL สูง → DNS traffic น้อยลง แต่ propagation ของการเปลี่ยน record ช้า
* TTL ต่ำ → DNS traffic มากขึ้น ค่าใช้จ่ายสูงขึ้น แต่ propagation เร็ว
* กลยุทธ์ที่ใช้บ่อย: ลด TTL ก่อนทำการเปลี่ยน → ทำการเปลี่ยน → แล้วเพิ่ม TTL กลับเพื่อ optimize
