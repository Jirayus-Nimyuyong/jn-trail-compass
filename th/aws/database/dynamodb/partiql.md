# PartiQL

**PartiQL** สำหรับ DynamoDB ช่วยให้เราสามารถใช้ **ไวยากรณ์เหมือน SQL** ในการจัดการตาราง DynamoDB ได้ เช่น การ **insert, update, select และ delete** รายการ (items)

PartiQL ถูกออกแบบมาสำหรับผู้ที่คุ้นเคยกับ SQL ทำให้สามารถทำงานกับ DynamoDB ด้วยคำสั่งที่คุ้นเคยได้

## การดำเนินการที่รองรับใน PartiQL

ด้วย PartiQL คุณสามารถ:

* **Insert** ข้อมูลลงในตาราง
* **Update** ข้อมูลที่มีอยู่
* **Select** ข้อมูลด้วย SQL-like queries
* **Delete** ข้อมูลจากตาราง
* ทำ **Batch Operations** เมื่อต้องการ

## การใช้ PartiQL Editor ใน DynamoDB Console

* Console ของ DynamoDB มี **PartiQL Editor** อยู่ด้านซ้าย
* คุณสามารถเปิดตาราง เช่น **users table** และเพิ่ม items ได้

  * ตัวอย่าง: เพิ่ม item `user_id = 123` และ attribute ใหม่ `name = Stephan`
  * เพิ่ม items ในตารางอื่น เช่น `user's post table` (`user_id = 123`, `post_id = 456`)
  * เพิ่ม items ใน demo indexes (`user_id = 123`, `game_time_stamp = 2022`, `game_id = 456`)

## การ Scan และ Query ตาราง

* หลังจากเพิ่ม items แล้ว สามารถใช้ PartiQL Editor เพื่อ **scan ตาราง**
* ตัวอย่าง SQL ที่สร้างขึ้นโดยอัตโนมัติ:

```sql
SELECT * FROM users
```

* คำสั่งนี้จะดึงข้อมูลทั้งหมดในตาราง เช่น user ที่ `user_id = 123`
* ผลลัพธ์สามารถดูได้หลายรูปแบบ และดาวน์โหลดเป็นไฟล์ CSV

## Queries ขั้นสูงและการใช้ Index

* สำหรับ query ขั้นสูง สามารถใส่เงื่อนไขได้
* ตัวอย่าง query บน **demo_indexes table**:

```sql
SELECT * FROM demo_indexes WHERE user_id = 123 AND game_time_stamp = 2022
```

* สามารถ **scan indexes** โดยระบุชื่อ index ใน query เพื่อดึงข้อมูลตาม index ได้

## การ Insert, Update และ Delete Items

* สามารถ run **insert statement** ได้ (UI ไม่สร้างให้อัตโนมัติ)
* การ update item: ระบุ **attribute value, partition key, sort key**
* การ delete item: ใช้ **delete statement**

  * ตัวอย่าง:

```sql
DELETE FROM users WHERE user_id = 123
```

## วัตถุประสงค์ของ PartiQL Editor

* สำหรับผู้ที่ต้องการใช้ SQL บน DynamoDB
* ให้ interface สะดวกในการทำงานหลายอย่างด้วย SQL syntax

## สรุป Key Takeaways

* PartiQL ใช้ไวยากรณ์เหมือน SQL ในการจัดการตาราง DynamoDB (insert, update, select, delete)
* Console ของ DynamoDB มี **PartiQL Editor** สำหรับรัน SQL statements บนตารางและ indexes
* รองรับ **batch operations, table scan, query ด้วยเงื่อนไข**, และดาวน์โหลดผลลัพธ์เป็น CSV
* PartiQL รองรับ **queries ขั้นสูงด้วย indexes** และสามารถ update/delete items เฉพาะเจาะจงจาก editor ได้