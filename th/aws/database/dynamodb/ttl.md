# DynamoDB TTL

**Time To Live (TTL)** ช่วยให้คุณสามารถ **ลบ item อัตโนมัติหลังจากถึงเวลาหมดอายุ**

* แนวคิดคือคุณกำหนด **คอลัมน์หนึ่ง** เป็นเวลาเมื่อ item หมดอายุ
* เมื่อเวลาปัจจุบันเกินค่านี้ **item จะถูกลบออก**
* การลบ item ด้วย TTL **ไม่ใช้ Write Capacity Units (WCU)** จึงไม่มีค่าใช้จ่ายเพิ่มเติม

**ข้อกำหนดของ timestamp**

* ต้องเป็นตัวเลขที่แทนค่า **Unix Epoch timestamp**
* Item ที่หมดอายุจะถูกลบภายใน **ไม่กี่วันหลังจากหมดอายุ**

## การทำงานของ TTL ในตาราง

ตัวอย่าง: ตารางเก็บข้อมูล session มีสองคอลัมน์คือ **User ID** และ **Session ID**

* เพิ่ม attribute สำหรับกำหนด **เวลา expiration** ของแต่ละ session (TTL)

**ขั้นตอนการลบ:**

1. DynamoDB ตรวจสอบเวลาปัจจุบันและสแกนตารางเพื่อหาข้อมูลที่ TTL < เวลาปัจจุบัน
2. กระบวนการถัดไปสแกนและลบ item ที่หมดอายุ

> หมายเหตุ:
>
> * Item ที่หมดอายุแต่ยังไม่ถูกลบ **ยังปรากฏในการอ่าน, query, และ scan**
> * หากไม่ต้องการเห็น item เหล่านี้ ต้องทำ **client-side filtering**
> * อาจใช้เวลาถึง 40 ชั่วโมงกว่าที่ item จะถูกลบ

**ผลกระทบต่อ indexes และ streams:**

* Item ที่ถูกลบจะถูกเอาออกจาก **LSI/ GSI**
* การลบแต่ละครั้งจะเข้าสู่ **DynamoDB Stream** ทำให้สามารถกู้คืน item ได้

## กรณีการใช้งาน (Use Cases)

* ลดปริมาณข้อมูลเก็บในตาราง โดยเก็บเฉพาะ item ปัจจุบัน
* ปฏิบัติตามข้อกำหนดด้านกฎระเบียบ
* ตัวอย่าง: **session data** เหมาะกับ TTL เพราะไม่จำเป็นต้องเก็บนาน

## ตัวอย่างการใช้งาน TTL (Hands-On)

1. สร้างตาราง **DemoTTL**

   * Partition key: `user_id`
   * ไม่ใช้ sort key
   * ปิด **provisioned capacity และ auto scaling**
   * กำหนด **1 RCU และ 1 WCU**

2. เพิ่ม item พร้อม attribute หมดอายุ (expire_on)

   * ตัวอย่าง:

     ```text
     user_id: john_123, name: John, expire_on: <timestamp 5 นาทีถัดไป>
     user_id: alice_456, name: Alice, expire_on: <timestamp 1 ชั่วโมงถัดไป>
     ```

   * ใช้ **epoch converter** เพื่อสร้าง timestamp

3. เปิดใช้งาน TTL

   * ไปที่ **Additional Settings → Time To Live → Enable**
   * ระบุ attribute name เป็น `expire_on`
   * สามารถ preview item ที่จะถูกลบตามเวลาปัจจุบันหรือเวลาจำลอง

4. การเปิดใช้งาน TTL และการตรวจสอบ

   * Item จะหมดอายุและถูกลบ **อัตโนมัติ**
   * ตรวจสอบจำนวน item ที่ถูกลบใน **24 ชั่วโมงล่าสุด** ผ่าน **CloudWatch metrics**

## สรุป

* **TTL** ช่วยลบ item หมดอายุโดยอัตโนมัติบนค่า Unix Epoch timestamp
* ลดค่าใช้จ่ายในการเก็บข้อมูลและช่วยรักษามาตรฐานข้อมูล
* แม้ item หมดอายุอาจปรากฏใน query ชั่วคราว แต่สุดท้ายจะถูกลบและเอาออกจาก indexes และ streams
* การลบสามารถ monitor และกู้คืนได้

## ข้อสรุปสำคัญ (Key Takeaways)

* TTL ลบ item อัตโนมัติหลังหมดอายุโดย **ไม่ใช้ WCU เพิ่ม**
* ต้องใช้ **ตัวเลข Unix Epoch timestamp** ในการกำหนด expiration
* Item หมดอายุอาจยังปรากฏใน query สูงสุด 40 ชั่วโมง ต้องทำ **client-side filtering** หากต้องการ
* การลบ TTL จะปรากฏใน **DynamoDB Stream และ CloudWatch metrics** ทำให้สามารถตรวจสอบและกู้คืนได้