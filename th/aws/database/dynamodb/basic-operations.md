# DynamoDB – Writing Data

## ภาพรวมการดำเนินการพื้นฐานของ DynamoDB

ในการสอบ คุณจะเจอ **ชื่อ API calls ของ DynamoDB** ดังนั้นควรทำความคุ้นเคยกับแต่ละคำสั่ง

## การเขียนข้อมูล (Write Data)

1. **PutItem**

   * สร้างหรือ **แทนที่ item ทั้งหมด** ที่มี Primary Key เดียวกัน
   * ใช้ **Write Capacity Units (WCU)**
   * ใช้เมื่อคุณต้องการเขียน item ใหม่หรือ **แทนที่ทั้งหมดของ item เดิม**

2. **UpdateItem**

   * แก้ไข **เฉพาะ attributes** ของ item ที่มีอยู่ หรือเพิ่ม item ใหม่ถ้าไม่มี
   * ไม่แทนที่ item ทั้งหมด
   * สามารถใช้กับ **Atomic Counters**

3. **Conditional Writes**

   * เขียน, แก้ไข หรือ ลบ **ตามเงื่อนไขที่กำหนด**
   * ช่วยควบคุมการเข้าถึงข้อมูลพร้อมกัน (concurrent access)

## การอ่านข้อมูล (Read Data)

1. **GetItem**

   * อ่าน item ตาม **Primary Key** (Partition Key หรือ Partition + Sort Key)
   * มี 2 โหมดความสอดคล้อง (Consistency Mode):

     1. **Eventually Consistent Read (default)**
     2. **Strongly Consistent Read** → ต้องระบุ explicitly, ใช้ RCU มากกว่าเล็กน้อย, latency อาจสูงขึ้น
   * สามารถใช้ **Projection Expression** เพื่อดึงเฉพาะ attributes ที่ต้องการ

2. **Query**

   * คืนค่า items ตาม **Key Condition Expression**
   * ต้องรวม **Partition Key** ด้วย operator เท่ากับ (=)
   * สามารถเพิ่ม **Sort Key Condition** (เช่น =, <, >, begins_with, between)
   * สามารถเพิ่ม **FilterExpression** เพื่อกรองข้อมูล **หลัง query** แต่ไม่ใช้กับ HASH/RANGE key
   * สามารถจำกัดจำนวน item ด้วย `limit` และ paginate ถ้ามีข้อมูลเกิน
   * Query ทำได้ทั้ง **Table, Local Secondary Index, Global Secondary Index**

3. **Scan**

   * อ่าน **ทั้ง table**
   * ใช้ Filter client-side ได้ แต่ **ไม่ efficient**
   * แต่ละครั้งคืนค่า **สูงสุด 1 MB** → ต้อง paginate เพื่ออ่านเพิ่ม
   * ใช้ RCU มาก → ควรจำกัดผลลัพธ์หรือเว้นช่วงระหว่าง scans
   * สามารถใช้ **Parallel Scan** เพื่อสแกนหลาย segment พร้อมกัน → เพิ่ม throughput แต่ใช้ RCU มากขึ้น
   * ใช้ร่วมกับ **ProjectionExpression และ FilterExpression** เพื่อเลือก attributes และกรอง server-side

## การลบข้อมูล (Delete Data)

1. **DeleteItem**

   * ลบ **item เดียว**
   * สามารถลบแบบ conditional เช่น ลบเฉพาะถ้า attribute `money = 0`

2. **DeleteTable**

   * ลบ **ทั้ง table และทุก item**
   * เร็วกว่าการ scan แล้วลบทีละ item
   * เป็น operation ที่ควรรู้สำหรับสอบ

## การทำ Batch Operations

* ลด latency และจำนวน API calls

1. **BatchWriteItem**

   * ทำได้ **สูงสุด 25 operations** (PutItem/ DeleteItem) ในครั้งเดียว
   * ขนาดรวมสูงสุด 16 MB, item ไม่เกิน 400 KB
   * **UpdateItem ไม่รองรับ**
   * ถ้ามี item ล้มเหลว → จะปรากฏใน `UnprocessedItems` → retry ด้วย exponential backoff หรือเพิ่ม WCU

2. **BatchGetItem**

   * ดึง items จาก table หลาย ๆ table พร้อมกัน
   * สูงสุด 100 items หรือ 16 MB
   * items ดึงพร้อมกันเพื่อลด latency
   * ถ้า item หาย → ปรากฏใน `UnprocessedKeys` → retry ด้วยวิธีเดียวกัน

## PartiQL – SQL สำหรับ DynamoDB

* ใช้ syntax SQL มาตรฐานเพื่อ query DynamoDB table
* สามารถทำ **select, insert, update, delete** เหมือน API ปกติ
* **ไม่รองรับ joins**
* สามารถ run ผ่าน: AWS Console, NoSQL Workbench, API, CLI, SDK
* จุดประสงค์: ให้ผู้ใช้ที่คุ้นกับ SQL เขียน query DynamoDB ได้ง่ายขึ้น

## สรุป

* DynamoDB มี API calls หลัก: **PutItem, UpdateItem, GetItem, Query, Scan, DeleteItem, DeleteTable**
* **PutItem** → แทนที่ทั้งหมดหรือสร้างใหม่
* **UpdateItem** → แก้ไขเฉพาะ attribute หรือเพิ่ม item ใหม่
* **Query** → ใช้ Key Condition Expression + Optionally Sort Key, FilterExpression สำหรับ non-key
* **Scan** → อ่านทั้ง table, Parallel Scan เพิ่ม throughput
* **Batch Operations** → BatchWriteItem, BatchGetItem ลด API calls, ต้อง retry สำหรับ UnprocessedItems/Keys
* **PartiQL** → ใช้ SQL syntax ทำ select, insert, update, delete โดยไม่ต้องใช้ joins