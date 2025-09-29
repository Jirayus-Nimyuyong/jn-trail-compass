# Amazon S3 – Static Website Hosting

## แนะนำการโฮสต์เว็บไซต์บน Amazon S3

* Amazon S3 สามารถใช้สร้างเว็บไซต์ได้ โดยรองรับ **static website** ที่เข้าถึงผ่านอินเทอร์เน็ต
* URL ของเว็บไซต์ขึ้นอยู่กับ **region ของ S3 bucket** ที่สร้าง
* URL อาจต่างกันเพียงเล็กน้อย เช่น มี dash (-) หรือ dot (.) แต่ไม่ใช่เรื่องสำคัญมาก

## การตั้งค่า S3 Bucket สำหรับโฮสต์เว็บไซต์

1. สร้าง S3 bucket ที่เก็บไฟล์เว็บไซต์ เช่น HTML, รูปภาพ
2. เปิดใช้งาน bucket ให้สามารถโฮสต์เว็บไซต์ได้

* เมื่อตั้งค่าเรียบร้อยแล้ว เว็บไซต์จะมี **URL ของตัวเอง** เพื่อให้ผู้ใช้เข้าถึงเนื้อหาใน bucket ได้

## ความสำคัญของ Public Read Permissions

* เว็บไซต์จะ **ไม่ทำงาน** หากไม่มีการอนุญาต public read บน S3 bucket
* หากเจอ **403 Forbidden** หลังจากเปิด bucket สำหรับอ่าน → แสดงว่า bucket ยังไม่เป็น public
* ต้องแนบ **S3 bucket policy** ที่อนุญาตให้ public access

## สรุป Key Takeaways

* Amazon S3 สามารถโฮสต์ **static websites** ผ่านอินเทอร์เน็ตได้
* URL ของเว็บไซต์ขึ้นอยู่กับ **region ของ S3 bucket**
* ต้องเปิด **public read permissions** บน bucket เพื่อให้เว็บไซต์เข้าถึงได้
* การใช้ **S3 bucket policies** สำคัญเพื่ออนุญาต public access และป้องกัน 403 forbidden
