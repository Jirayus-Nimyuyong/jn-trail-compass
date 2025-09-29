# S3 CORS

* **CORS** ย่อมาจาก **Cross-Origin Resource Sharing**
* เป็นกลไกด้านความปลอดภัยของเว็บเบราว์เซอร์ ที่ใช้ **ควบคุมว่าเว็บไซต์หนึ่งสามารถเรียกข้อมูลจากอีกเว็บไซต์หนึ่งได้หรือไม่**
* เป็นเรื่องสำคัญ โดยเฉพาะสำหรับการสอบ AWS อาจมีคำถามเกี่ยวกับ CORS อย่างน้อยหนึ่งข้อ

## การทำความเข้าใจ Origin

* **Origin** ถูกกำหนดโดยการรวมกันของ:

  * Scheme (โปรโตคอล เช่น HTTP หรือ HTTPS)
  * Host / Domain
  * Port

**ตัวอย่าง:** URL `https://www.example.com`

* Protocol: HTTPS
* Domain: [www.example.com](http://www.example.com)
* Port (โดยปริยาย): 443

## Same Origin Policy

* เว็บเบราว์เซอร์ถือว่า **สอง URL มี origin เดียวกัน** หากมี scheme, host, และ port **เหมือนกัน**

* ตัวอย่างของสอง URL ที่มี origin เดียวกัน:

  * `https://www.example.com/page1`
  * `https://www.example.com/page2`

* หาก origin ต่างกัน เช่น:

  * `https://www.example.com`
  * `https://other.example.com`
    → จะถือว่าเป็น **different origin**

## Cross-Origin Requests และข้อจำกัด

* หากเบราว์เซอร์พยายามเข้าถึง resource จาก origin อื่น (cross-origin)
* การร้องขอจะ **ไม่ถูกตอบ** หาก origin นั้นไม่ได้อนุญาตอย่างชัดเจนผ่าน **CORS headers**
* Header ที่ใช้คือ **Access-Control-Allow-Origin**

## วิธีการทำงานของ CORS (อธิบายแบบ diagram)

สมมติมีองค์ประกอบ:

1. เว็บเซิร์ฟเวอร์ต้นทาง: `https://www.example.com`
2. เว็บเบราว์เซอร์
3. เว็บเซิร์ฟเวอร์ปลายทาง cross-origin: `https://www.other.com`

ขั้นตอน:

1. เบราว์เซอร์ร้องขอไฟล์ HTML จากเว็บต้นทาง
2. HTML ชี้ให้เบราว์เซอร์โหลด resource เพิ่มเติม เช่น รูปภาพจากเว็บปลายทาง
3. เบราว์เซอร์ทำ **pre-flight OPTIONS request** ไปยังเว็บปลายทาง เพื่อตรวจสอบว่า **อนุญาต cross-origin หรือไม่**
4. เว็บปลายทางตอบ header ที่ระบุว่า **อนุญาต method และ origin ใดบ้าง**
5. หาก header ถูกต้อง เบราว์เซอร์จึงร้องขอ resource จริง ๆ

## การใช้งาน CORS กับ Amazon S3

* เมื่อ client ทำ **cross-origin request** ไปยัง S3 bucket
* **ต้องกำหนด CORS headers ใน bucket** เพื่อให้ request ผ่าน
* วิธีง่าย ๆ คือ อนุญาต origin ที่เจาะจง หรืออนุญาตทุก origin (`*`)

**ตัวอย่าง:**

1. เว็บเบราว์เซอร์โหลด `index.html` จาก S3 bucket (เช่น `my-bucket-html`)
2. `index.html` อ้างอิงรูปภาพจาก bucket อื่น (เช่น `my-bucket-assets`)
3. เบราว์เซอร์ส่ง cross-origin request ไปยัง bucket ที่สอง
4. ถ้า bucket ที่สองไม่ได้ตั้ง CORS headers → request ถูกปฏิเสธ
5. ถ้า bucket ตั้ง CORS headers ถูกต้อง → เบราว์เซอร์โหลดรูปได้สำเร็จ

## สรุป

* **CORS** เป็นฟีเจอร์ความปลอดภัยของเว็บเบราว์เซอร์
* ควบคุมว่า resource เช่น รูปหรือไฟล์จาก origin หนึ่ง สามารถเข้าถึงจาก origin อื่นได้หรือไม่
* การตั้งค่า **CORS headers** ใน S3 สำคัญมากสำหรับ **Static Website Hosting** และ **การแชร์ assets**

## Key Takeaways

* CORS เป็นกลไกด้านความปลอดภัยที่ควบคุม request ระหว่าง origin ต่าง ๆ
* Origin ประกอบด้วย scheme, host, domain, และ port; การร้องขอข้าม origin ต้องมี header อนุญาตชัดเจน
* เบราว์เซอร์ทำ **pre-flight OPTIONS request** เพื่อตรวจสอบสิทธิ์ก่อน
* การตั้งค่า CORS ใน S3 ให้ถูกต้องช่วยให้ cross-origin requests ผ่าน โดยเฉพาะกับ static website และ asset sharing