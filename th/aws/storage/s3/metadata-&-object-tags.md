# S3 Object Tags & Metadata

## Metadata ของผู้ใช้ (User-Defined Object Metadata)

* เมื่อคุณสร้างหรืออัปโหลด **object** ไปยัง S3 คุณสามารถกำหนด **metadata** ให้กับ object ได้
* **Metadata** คือ **คู่ key-value** ที่แนบมากับ object
* **User-defined metadata** ต้องเริ่มต้นด้วย `x-amz-meta-` เพราะ AWS จะสร้าง metadata บางอย่างให้อัตโนมัติ

**ตัวอย่าง:**

* AWS metadata อัตโนมัติ เช่น `Content-Length` = 7.5 KB, `Content-Type` = html

* User-defined metadata เช่น `x-amz-meta-origin: paris` → เป็นข้อมูลที่คุณกำหนดเอง

* Metadata จะสามารถเรียกดูได้เมื่อดึง object มา

## S3 Object Tags (แท็กของ object)

* **Object tags** คือ **คู่ key-value** ที่แนบมากับ object เช่นเดียวกับ metadata
* ใช้สำหรับ:

  * **สิทธิ์เข้าถึงแบบละเอียด** (Fine-grained permissions) → ให้สิทธิ์เข้าถึงเฉพาะ object ที่มีแท็กเฉพาะ
  * **วิเคราะห์ข้อมูล** เช่น ใช้กับ **S3 Analytics** เพื่อจัดกลุ่มข้อมูลตามแท็ก

**ตัวอย่างแท็ก:**

* `Project: Blue`

* `PHI: True` → แสดงว่าเป็นข้อมูลสุขภาพส่วนบุคคล

* แท็กช่วยเพิ่มข้อมูลเสริมที่คุณต้องการแนบกับ object

## ข้อควรจำเกี่ยวกับการค้นหา

* **Metadata และ tags ไม่สามารถค้นหาหรือกรองได้โดยตรงใน S3**
* หากต้องการค้นหาตาม metadata หรือ tags → ต้องสร้าง **external index** เช่น **DynamoDB** หรือฐานข้อมูลอื่น

**ตัวอย่างสถาปัตยกรรม:**

1. เก็บ metadata และ tags ของทุก object ลงใน DynamoDB
2. ค้นหาใน DynamoDB → ได้ผลลัพธ์ที่อ้างอิง object ใน S3

> นี่เป็นแนวคิดสำคัญและมักเป็นคำถามสอบ

## Key Takeaways

* Metadata ของผู้ใช้ต้องเริ่มต้นด้วย `x-amz-meta-`
* S3 object tags ใช้สำหรับ **สิทธิ์เข้าถึงแบบละเอียด** และ **วิเคราะห์ข้อมูล**
* Metadata และ tags ไม่สามารถค้นหาหรือกรองโดยตรงใน S3
* หากต้องการค้นหา ต้องใช้ **external index** เช่น DynamoDB