# DynamoDB CLI

ในบทเรียนนี้ เราจะพูดถึงตัวเลือก CLI ของ DynamoDB ที่มักปรากฏในการสอบ ตัวเลือกเหล่านี้ช่วย **เพิ่มประสิทธิภาพการดึงข้อมูล** และ **จัดการชุดข้อมูลขนาดใหญ่** ได้อย่างมีประสิทธิภาพ

## 1. Projection Expression

* ตัวเลือก `projection-expression` ใช้เพื่อระบุ **attribute หรือคอลัมน์ที่ต้องการดึงข้อมูล** จากตาราง
* จุดประสงค์คือ **ไม่ดึงข้อมูลทั้งหมด** แต่ดึงเฉพาะ subset ของข้อมูลที่ต้องการ
* ช่วยลด **ปริมาณข้อมูลที่ส่งกลับ** และเพิ่มประสิทธิภาพ

## 2. Filter Expression

* ตัวเลือก `filter-expression` ใช้เพื่อ **กรอง item** หลังจากการ scan
* เงื่อนไขการกรองจะเกิดขึ้น **client-side หลังจากดึงข้อมูลมาแล้ว**
* ตัวอย่าง: ดึงเฉพาะ item ที่ `user_id = john123`

> หมายเหตุ: หาก attribute เป็น **primary key** การใช้ `query` จะมีประสิทธิภาพมากกว่า scan + filter

## 3. ตัวเลือก Pagination

DynamoDB CLI มีตัวเลือก pagination เพื่อจัดการชุดข้อมูลขนาดใหญ่:

* **page-size**: จำนวน item ต่อ API call

  * ช่วยหลีกเลี่ยง **timeout** โดยแบ่ง dataset ใหญ่เป็นหลาย call
* **max-items**: จำกัดจำนวน item ที่คืนกลับใน CLI response
* **NextToken / starting-token**: ใช้ดึงชุด item ถัดไปใน pagination

**ตัวอย่าง page-size:**

* ตารางมี 10,000 items หากทำ call เดียว อาจ **timeout**
* ระบุ `--page-size 100` → CLI จะทำหลาย API call แต่ละ call ดึง 100 item
* ทำให้ดึงข้อมูลครบโดยไม่ timeout

## 4. ตัวอย่างใช้งานกับตาราง UserPosts

**Projection Expression:**

```bash
aws dynamodb scan --table-name UserPosts --projection-expression "user_id, content"
```

* ตารางมี attributes: `user_id`, `post_timestamp`, `content`
* ผลลัพธ์จะ **ไม่รวม post_timestamp**
* ยืนยันว่า `projection-expression` ทำงานตามต้องการ

**Filter Expression:**

```bash
aws dynamodb scan --table-name UserPosts --filter-expression "user_id = :uid" --expression-attribute-values '{":uid":{"S":"john123"}}'
```

* จะได้เฉพาะ item ของ `user_id = john123`
* การกรองเกิด **client-side หลังจากดึงข้อมูลแล้ว**

**Page-Size:**

* หาก dataset เล็ก → scan ใช้ 1 API call
* ระบุ `--page-size 1` → CLI ทำ 3 API calls แต่คืนผลลัพธ์ครบ 3 items
* ช่วย **หลีกเลี่ยง timeout** สำหรับ dataset ใหญ่

**Max-Items + NextToken:**

* `--max-items 1` → คืน item แค่ 1 และมี NextToken
* ใช้ `--starting-token <NextToken>` ดึง item ถัดไป
* ทำซ้ำเพื่อ **pagination ทีละ item**
* เมื่อไม่มี NextToken → ดึงครบแล้ว

## สรุป

ตัวเลือก CLI ของ DynamoDB ช่วย **เพิ่มประสิทธิภาพการดึงข้อมูล** ได้ดังนี้:

* **projection-expression** → ดึง attribute เฉพาะที่ต้องการ ลดข้อมูลที่ส่งกลับ
* **filter-expression** → กรอง item client-side ตามเงื่อนไข
* **Pagination** → `page-size`, `max-items`, `NextToken` จัดการ dataset ขนาดใหญ่ และหลีกเลี่ยง timeout
* การใช้ `max-items` + `NextToken` → ดึงข้อมูลเป็น chunk แบบมีประสิทธิภาพ

## ข้อสรุปสำคัญ (Key Takeaways)

* `projection-expression` → ลดปริมาณข้อมูลที่ส่งกลับ โดยดึงเฉพาะ attribute ที่ต้องการ
* `filter-expression` → กรอง item client-side เพื่อปรับแต่งผลลัพธ์ scan
* Pagination (`page-size`, `max-items`, `NextToken`) → จัดการ dataset ขนาดใหญ่และหลีกเลี่ยง timeout
* การใช้ `max-items` + `NextToken` → ดึงข้อมูลทีละส่วน ทำให้ CLI retrieval มีประสิทธิภาพ