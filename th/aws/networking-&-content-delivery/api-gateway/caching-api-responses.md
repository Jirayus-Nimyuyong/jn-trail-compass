# Caching API Gateway

**Caching** ใน API Gateway คือเทคนิคที่ใช้เพื่อลดจำนวนการเรียกไปยัง backend โดยตรง

* เมื่อ client ส่ง request มาที่ API Gateway → ระบบจะตรวจสอบ cache ก่อน
* ถ้ามีผลลัพธ์ที่ถูก cache ไว้ → จะถูกส่งกลับทันที
* ถ้าไม่มี (cache miss) → API Gateway จะส่ง request ต่อไปยัง backend เพื่อดึง response

แนวทางนี้ช่วย **ลดภาระของ backend** ได้อย่างมาก

## ค่า TTL (Time To Live) ของ Cache

* ค่าเริ่มต้น (default) = **300 วินาที (5 นาที)**
* ค่า **ต่ำสุด** = 0 (หมายถึงไม่ใช้ cache เลย)
* ค่า **สูงสุด** = 3,600 วินาที (1 ชั่วโมง)

การตั้งค่า cache ถูกกำหนดที่ **ระดับ stage** (1 stage ต่อ 1 cache)
แต่สามารถ override การตั้งค่าได้ใน **ระดับ method** เช่น บาง method สามารถปิดการ cache ได้

**คุณสมบัติเพิ่มเติมของ Cache**

* สามารถ **เข้ารหัสข้อมูลใน cache** ได้
* ขนาด cache มีตั้งแต่ **0.5 GB จนถึง 237 GB**
* เนื่องจาก cache มีค่าใช้จ่ายสูง → แนะนำให้ใช้ใน **production** มากกว่า dev/test

## Cache Invalidation (การลบข้อมูล Cache)

* สามารถ **ลบ cache ทั้งหมดทันที** ได้จากหน้า Console ของ API Gateway
* Client เองสามารถ invalid cache ได้โดยใส่ header:

  ```cli
  Cache-Control: max-age=0
  ```

* แต่ **Client ต้องมีสิทธิ์ IAM** ที่เหมาะสมถึงจะ invalidate cache ได้

## การตั้งค่า Cache (Hands-On)

วิธีเปิดใช้งาน cache:

1. ไปที่ **production stage**
2. แก้ไข **stage details**
3. เปิดใช้งาน cache และเลือกขนาด (capacity)

   * ถ้ามีหลาย API calls → แนะนำให้เลือกขนาดใหญ่ขึ้น
4. เลือกว่าจะ **เข้ารหัส cache** หรือไม่
5. ตั้งค่า **TTL** (0 – 3600 วินาที, ค่า default = 300 วินาที)

นอกจากนี้ยังมี **Per-key cache invalidation** สำหรับลบ cache เฉพาะรายการตาม key ได้
แต่ฟีเจอร์นี้ค่อนข้างเสี่ยง → ควรบังคับให้มีการ authorization

หาก request ไม่มีสิทธิ์ → สามารถเลือกได้ว่า:

* เพิกเฉย (ignore)
* ตอบกลับด้วย **403 error**
* หรือส่ง warning กลับมา

เมื่อบันทึกการตั้งค่าแล้ว → caching จะเปิดใช้งานทั้ง API
และสามารถ **ปรับแต่งในระดับ method ได้** เช่น override TTL สำหรับ `GET` method บางตัว

👉 ถ้าไม่มี IAM Policy ที่กำหนดสิทธิ์ → ใครก็สามารถลบ cache ได้ → ซึ่งอาจทำให้เกิดปัญหา

## การทดสอบ Cache

1. เรียก stage endpoint ครั้งแรก → จะไปเรียก Lambda backend และส่งผลลัพธ์กลับมา เช่น `"hello from Lambda"`
2. เรียกครั้งถัดไป ด้วย route + arguments เดิม → จะได้ผลลัพธ์จาก cache โดยตรง **ไม่เรียก Lambda ซ้ำ**

ผลลัพธ์คือช่วยลดการเรียก backend ที่ซ้ำ ๆ ลงได้มาก

## บทสรุป

* อย่าลืมปิด cache เมื่อไม่ใช้งานแล้ว → เพื่อหลีกเลี่ยงค่าใช้จ่ายที่ไม่จำเป็น
* Caching เป็นฟีเจอร์ที่ทรงพลังในการ **เพิ่มประสิทธิภาพ API และลดภาระ backend** โดยเฉพาะใน **production environment**

## Key Takeaways

* Caching ของ API Gateway ช่วยลดการเรียก backend โดยการเก็บ response ไว้เพื่อใช้ซ้ำ
* การตั้งค่า cache ประกอบด้วย **TTL (default 300s)**, **ขนาด (0.5–237 GB)** และ **การเข้ารหัสข้อมูล**
* Cache ถูกกำหนดในระดับ **stage** แต่สามารถ override ได้ใน **ระดับ method**
* การลบ cache (cache invalidation) ต้องมีสิทธิ์ IAM เพื่อป้องกันการลบโดยไม่ได้รับอนุญาต
