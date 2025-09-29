# DynamoDB Basic APIs

## ภาพรวมของการเรียก API ของ DynamoDB

เรามาดู **API calls** ที่สามารถทำบน table ของ DynamoDB ได้

* ในตัวอย่างนี้ เราอยู่ในส่วน **Scan**
* เลือก table แล้วคลิก **Run** → จะทำการ **Scan table ทั้งหมด** และคืนค่า items หลายรายการ

## การสร้าง Item ด้วย PutItem

* เพื่อสร้าง item เรากำหนด **user ID** เช่น `Alice456`
* กำหนด **timestamp** เช่น `2021-05-06T00:00`
* เพิ่ม content เช่น `"Alice blog"`
* จากนั้นใช้ **PutItem** → จะส่ง item ใหม่เข้าไปใน DynamoDB

  * หาก item มีอยู่แล้ว จะ **แทนที่ทั้งหมด**
  * หาก item ใหม่ → สร้าง item ใหม่

## การแก้ไข Item ด้วย UpdateItem

* เลือก **Actions → Edit**
* แก้ไข attribute เฉพาะ เช่น เปลี่ยน content เป็น `"Alice blog edited"`
* คลิก **Save changes** → จะเป็นการเรียก **UpdateItem API**

  * จะ **แก้ไขเฉพาะ attributes ที่เปลี่ยน**
  * ไม่แทนที่ item ทั้งหมด

## การดึง Item ด้วย GetItem

* คลิก row ที่ต้องการ → เปิด **Item editor**
* ด้านหลัง → เรียก **GetItem API** เพื่อดึงข้อมูล item ที่เลือก

## Batch Actions: Batch Delete

* สามารถทำ batch actions เช่น **ลบหลาย item พร้อมกัน**

  * เลือก **Actions → Delete Items** → เป็นการเรียก **Batch Delete**
* ถ้าต้องการลบข้อมูลทั้งหมดใน table:

  1. ทำ **Scan → Batch Delete** → **ไม่ efficient**
  2. หรือ **ลบ table ทั้งหมด** → ลบข้อมูลทั้งหมดทันที

## ความแตกต่างระหว่าง Scan กับ Query

1. **Scan**

   * คืนค่า **ทุก item ใน table**
   * สามารถใช้ filter ได้ แต่ **กรองบน client-side** (เว็บเบราว์เซอร์)
   * ไม่ efficient

2. **Query**

   * **มีประสิทธิภาพกว่า Scan**
   * สามารถกำหนด **Partition Key** เช่น user ID เพื่อดึงทุก item ของ user นั้น
   * สามารถกำหนด **เงื่อนไข Sort Key** เช่น post timestamp

     * เงื่อนไขได้แก่: =, <=, >=, between, begins_with
   * ตัวอย่าง:

     * Query posts หลัง `"2021-11"` → คืนค่า 1 item
     * Query posts หลัง `"2021-09"` → คืนค่า 2 items

## ข้อจำกัดของ Query

* Query ใช้ได้ **เฉพาะ Partition Key และ Sort Key**
* ไม่สามารถ query ตาม attribute อื่น เช่น content
* แม้สามารถใช้ filter บน content ได้ → จะ **กรองหลังจากดึงข้อมูลแล้วบน client-side**

> นี่แสดงถึงความสำคัญของ **Partition Key (hash key)** และ **Sort Key** ใน DynamoDB เพื่อการดึงข้อมูลอย่างมีประสิทธิภาพ

## สรุป

* ครอบคลุม **API พื้นฐานของ DynamoDB**:

  * Scan, PutItem, UpdateItem, GetItem, BatchDelete, Query
* แสดง **ความแตกต่างระหว่าง Scan กับ Query**
* เน้นว่า **Filter บน client-side** เกิดหลัง Scan ไม่ใช่ใน DynamoDB
* เน้นความสำคัญของ **Partition Key และ Sort Key** สำหรับการดึงข้อมูลอย่างมีประสิทธิภาพ

## Key Takeaways

* สาธิตการใช้งาน **DynamoDB API พื้นฐาน**: Scan, PutItem, UpdateItem, GetItem, BatchDelete, Query
* Query มีประสิทธิภาพมากกว่า Scan เพราะใช้ **Partition + Sort Keys**
* การกรอง client-side เกิดหลัง Scan ไม่ใช่บน DynamoDB
* Partition Key และ Sort Key สำคัญต่อการดึงข้อมูลเร็วและ efficient