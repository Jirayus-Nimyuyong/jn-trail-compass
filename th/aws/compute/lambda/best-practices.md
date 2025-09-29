# Lambda Best Practices

ในส่วนนี้ เราได้เรียนรู้แนวปฏิบัติที่สำคัญสำหรับ Lambda โดยเฉพาะอย่างยิ่งเมื่อเตรียมตัวสอบ

## 1. ปรับแต่งการทำงานของ Function Handler

ควรทำงานที่หนัก ๆ **นอก function handler** เพื่อลดเวลาการทำงานของ handler ให้สั้นที่สุด ตัวอย่างเช่น:

* เชื่อมต่อฐานข้อมูล **นอก function handler**
* ทำการ initialize AWS SDK **นอก handler**
* เตรียม dependencies หรือ datasets **นอก handler**

## 2. ใช้ Environment Variables

ใช้ environment variables สำหรับค่าที่เปลี่ยนแปลงได้ตามเวลา เช่น:

* Database connection strings
* ชื่อ S3 bucket

**ห้ามใส่ค่าคงที่ (hardcode) ในโค้ด** สำหรับรหัสผ่านหรือค่าที่สำคัญ ให้เข้ารหัส environment variables ด้วย **AWS KMS**

## 3. ลดขนาด Deployment Package

* รวมเฉพาะสิ่งที่จำเป็นสำหรับ runtime
* ถ้าฟังก์ชันใหญ่เกินไป ให้แยกเป็นฟังก์ชันย่อย
* คำนึงถึง **ข้อจำกัดของ Lambda เรื่องขนาด package**
* หากต้องการใช้ libraries ซ้ำหลายฟังก์ชัน ให้พิจารณาใช้ **Lambda Layers**

## 4. หลีกเลี่ยง Recursive Lambda Calls

**ห้ามให้ Lambda เรียกตัวเอง** เพราะจะทำให้เกิดผลลัพธ์เสียหายและมีค่าใช้จ่ายสูง

## ข้อสรุปสำคัญ (Key Takeaways)

* ทำงานหนัก ๆ **นอก function handler** เพื่อลดเวลาการทำงาน
* ใช้ **environment variables** สำหรับค่าที่เปลี่ยนแปลง เช่น connection strings และ S3 bucket
* เข้ารหัสค่าที่สำคัญด้วย **AWS KMS**
* ลดขนาด deployment package และพิจารณาใช้ **Lambda Layers** สำหรับ libraries ที่ใช้ซ้ำ
* หลีกเลี่ยงการเรียก Lambda ตัวเองแบบ recursive เพื่อป้องกันความเสียหายและค่าใช้จ่ายสูง
