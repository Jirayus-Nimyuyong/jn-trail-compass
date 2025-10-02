# CloudFormation - Termination Protection

เพื่อป้องกันการลบ **CloudFormation stack** โดยไม่ได้ตั้งใจ คุณต้องใช้ฟีเจอร์ **Termination Protection** ฟีเจอร์นี้ทำหน้าที่เป็นเกราะป้องกันไม่ให้ stack ถูกลบโดยไม่ตั้งใจ

## การเปิดใช้งาน Termination Protection ผ่าน Console

1. สร้าง stack ใหม่โดยอัปโหลด template ใดก็ได้ เช่น ตั้งชื่อ stack ว่า **EC2-demo**
2. หลังตั้งชื่อ stack ให้คลิก **Next** สองครั้งจนถึงหน้าสร้าง stack
3. อัปโหลด template เพื่อสร้าง stack

## การเปิดใช้งาน Termination Protection

* หลังจากสร้าง stack แล้ว สามารถแก้ไขการตั้งค่า Termination Protection ได้
* ค่าเริ่มต้นจะถูกปิดอยู่
* **เปิดใช้งาน Termination Protection** เพื่อเปิดฟีเจอร์ป้องกัน
* เมื่อเปิดใช้งานเรียบร้อย หากพยายามลบ stack ระบบจะบล็อกไม่ให้ลบ พร้อมแสดงข้อความแจ้งว่า **Termination Protection เปิดอยู่ ต้องปิดก่อนจึงจะลบได้**

## การปิด Termination Protection และลบ Stack

* หากคุณมีสิทธิ์เพียงพอ สามารถ **ปิด Termination Protection**
* หลังจากปิดแล้ว สามารถลบ CloudFormation stack ได้ตามปกติ

## สรุป

* Termination Protection เป็นฟีเจอร์สำคัญเพื่อป้องกันการลบ stack โดยไม่ได้ตั้งใจ
* ควรเปิดใช้งานเมื่อ stack สำคัญ และอย่าลืมปิดก่อนลบ stack

## Key Takeaways

* Termination Protection ป้องกันการลบ stack โดยไม่ตั้งใจ
* สามารถเปิดหรือปิดได้ผ่าน **AWS Management Console**
* เมื่อเปิดใช้งาน การลบ stack จะถูกบล็อกจนกว่าจะปิด Termination Protection
* ต้องมีสิทธิ์เพียงพอในการแก้ไขการตั้งค่า Termination Protection
