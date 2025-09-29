
# การย้าย Storage Class ของ S3 ด้วย Lifecycle Rules และ S3 Analytics

## การย้าย Storage Class ของ Object

คุณสามารถย้าย **objects** ระหว่าง **storage classes** ต่าง ๆ ของ Amazon S3 ผ่าน **transitions**

ตัวอย่างการย้าย:

* Standard → Standard-Infrequent Access (Standard IA) → Intelligent-Tiering → One-Zone IA
* จาก One-Zone IA → Glacier Flexible Retrieval หรือ Glacier Deep Archive

ถ้า objects เข้าถึงไม่บ่อย → ย้ายไป Standard IA
ถ้าเพื่อเก็บระยะยาว/archiving → ย้ายไป Glacier หรือ Deep Archive

* การย้ายสามารถทำแบบ manual ได้ แต่ **Lifecycle Rules** ช่วยทำให้อัตโนมัติ

## ภาพรวม Lifecycle Rules

Lifecycle rules ประกอบด้วยหลายส่วน:

1. **Transition actions** – ย้าย object ไป storage class อื่น

   * เช่น ย้ายไป Standard IA หลังสร้าง 60 วัน
   * หรือย้ายไป Glacier หลัง 6 เดือน
2. **Expiration actions** – ลบ object หลังครบเวลาที่กำหนด

   * เช่น ลบ access log หลัง 365 วัน
3. **Version expiration** – ลบเวอร์ชันเก่าของ object ถ้าเปิด versioning
4. **Incomplete multipart uploads** – ลบ multipart uploads ที่ไม่สมบูรณ์เกิน 2 สัปดาห์

**ขอบเขตการใช้ rule:**

* ทั้ง bucket
* Prefix เฉพาะ (path)
* Objects ที่มี tag เฉพาะ

## ตัวอย่าง: จัดการ Source Images และ Thumbnails

* EC2 application สร้าง **thumbnails** หลังผู้ใช้ upload profile photo ไป S3
* Thumbnails เข้าถึงไม่บ่อย → เก็บแค่ 60 วัน
* Source images → ต้องเข้าถึงได้ทันที 60 วัน หลังจากนั้น retrieval อาจใช้เวลาสูงสุด 6 ชั่วโมง

**การออกแบบ:**

* Source images → Standard → transition ไป Glacier หลัง 60 วัน
* Thumbnails → One-Zone IA → expire (ลบ) หลัง 60 วัน
* ใช้ **prefix** แยก source images กับ thumbnails

## ตัวอย่าง: การเก็บ Deleted Objects ด้วย Versioning

* นโยบายบริษัท: ลบ objects แล้วต้อง recover ได้ทันที 30 วัน หลังจากนั้น recover ได้ภายใน 48 ชั่วโมง สูงสุด 365 วัน

**การทำงาน:**

* เปิด **S3 versioning** → objects ที่ลบจะถูกซ่อนด้วย **delete marker** แต่ recover ได้
* สร้าง **lifecycle rule** → ย้าย non-current versions ไป Standard IA
* ต่อมาถ้าเป็น long-term → ย้ายไป Glacier Deep Archive

## การใช้ S3 Analytics เพื่อเพิ่มประสิทธิภาพ

* การกำหนดจำนวนวันที่เหมาะสมสำหรับการย้าย objects ระหว่าง storage classes อาจทำยาก
* **S3 Analytics** ช่วยแนะนำว่า objects ควรย้ายจาก Standard → Standard IA เมื่อไร
* ไม่รองรับ One-Zone IA หรือ Glacier
* Analytics สร้าง **CSV report** ประกอบด้วยสถิติและคำแนะนำ
* ข้อมูลเริ่มแสดงภายใน 24–48 ชั่วโมง

รายงานนี้ช่วยเป็นจุดเริ่มต้นในการสร้างหรือปรับปรุง **lifecycle rules** ให้เหมาะกับ pattern การใช้งานของคุณ

## Key Takeaways

* **S3 lifecycle rules** → ทำให้การย้าย objects ระหว่าง storage classes เป็นอัตโนมัติ ตามอายุหรือรูปแบบการใช้งาน
* Rules ประกอบด้วย **transition actions**, **expiration actions** และสามารถใช้กับ prefix หรือ tag เฉพาะ
* การใช้ **versioning + lifecycle rules** → จัดการเวอร์ชันเก่าและ recovery ของ objects ที่ลบได้
* **Amazon S3 Analytics** → ให้คำแนะนำตามข้อมูลจริง เพื่อปรับ transitions ระหว่าง Standard และ Standard IA
