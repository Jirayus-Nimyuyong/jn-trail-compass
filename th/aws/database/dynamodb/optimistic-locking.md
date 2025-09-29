# DynamoDB Optimistic Locking

DynamoDB มีฟีเจอร์ที่เรียกว่า **Optimistic Locking**
ฟีเจอร์นี้ช่วยให้คุณสามารถทำ **Conditional Writes** ใน DynamoDB ได้

**Conditional Writes** คือการเขียนหรือแก้ไขข้อมูล **เฉพาะเมื่อเงื่อนไขบางอย่างเป็นจริง** ฟีเจอร์นี้ช่วยให้มั่นใจได้ว่า **item นั้นไม่ได้ถูกแก้ไขระหว่างที่คุณอ่านและเขียน**

แนวคิดนี้เรียกว่า **Optimistic Locking**

## วิธีการทำงานของ Optimistic Locking

* แต่ละ item จะมี attribute หนึ่งทำหน้าที่เป็น **version number**
* เมื่อทำการ update จะต้องตรวจสอบ **เงื่อนไขความเท่ากัน (equality)** ของ version number เพื่อให้แน่ใจว่า **ค่า version ไม่เปลี่ยนตั้งแต่ครั้งล่าสุดที่อ่าน**

## ตัวอย่างสถานการณ์

สมมติว่าเรามี table ที่มี item ดังนี้:

| user_id | first_name | version |
| ------- | ---------- | ------- |
| 123     | Alice      | 1       |

* **Client 1** ต้องการเปลี่ยน first_name เป็น "John" เฉพาะเมื่อ version = 1
* **Client 2** ต้องการเปลี่ยน first_name เป็น "Lisa" เฉพาะเมื่อ version = 1

สมมติว่า request ของ Client 2 ถึง DynamoDB ก่อน:

* DynamoDB จะอัปเดต first_name เป็น "Lisa" และเพิ่ม version เป็น 2

## ผลลัพธ์สำหรับการอัปเดตพร้อมกัน

* **Client 1** จะอัปเดตไม่สำเร็จ เพราะ version ไม่ตรงตามเงื่อนไขแล้ว
* DynamoDB จะส่ง **error** กลับว่า ข้อมูลล้าสมัย
* Client 1 ต้อง **ดึง item ล่าสุด** และลองอัปเดตอีกครั้งหากต้องการ

## สรุป

* **Optimistic Locking** เป็นวิธีจัดการการแก้ไขพร้อมกันอย่างปลอดภัย **โดยไม่ต้องล็อกข้อมูล**
* ใช้ **Conditional Writes** เพื่อรับประกันความสอดคล้องของข้อมูล
* ใช้ **version number** เพื่อตรวจสอบการแก้ไขพร้อมกัน
* การอัปเดตเกิดขึ้นเฉพาะเมื่อ version ตรงกับค่าที่คาดหวัง
* ถ้าเงื่อนไข version ไม่ผ่าน Client จะได้รับ error และต้องดึงข้อมูลล่าสุดก่อน retry

## Key Takeaways

* DynamoDB รองรับ **Optimistic Locking** ผ่าน **Conditional Writes** เพื่อให้ข้อมูลสอดคล้อง
* ใช้ **version attribute** ตรวจสอบการแก้ไขพร้อมกัน
* การอัปเดตเกิดขึ้นเฉพาะเมื่อ version ตรงตามที่กำหนด
* ถ้า version ไม่ตรง Client จะได้รับ error และต้องดึงข้อมูลล่าสุดก่อนทำซ้ำ
