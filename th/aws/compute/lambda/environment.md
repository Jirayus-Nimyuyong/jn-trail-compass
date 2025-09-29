# Lambda Environment Variables

หลังจากที่เราเรียนรู้เกี่ยวกับ **Lambda invocations** ทั้งหมดแล้ว มาต่อกันที่การตั้งค่าและการ deploy Lambda เพิ่มเติม

## Environment Variables ของ Lambda

* **Environment variables** คือคู่ **key-value** ในรูปแบบ **string**

* ใช้สำหรับปรับพฤติกรรมของ Lambda function โดย **ไม่ต้องแก้ไขโค้ด**

* Environment variables เหล่านี้จะเข้าถึงได้จากโค้ดของคุณ

* นอกจากนี้ Lambda service ยังมี **system environment variables ของตัวเอง** เพิ่มเติมให้อีกด้วย

* การใช้ environment variables เป็นเรื่องปกติในการเขียนโปรแกรม และ Lambda รองรับฟีเจอร์นี้

### การเข้ารหัส Environment Variables

* Lambda สามารถ **เข้ารหัส environment variables** ได้เพื่อความปลอดภัย

* ใช้ **AWS Key Management Service (KMS)** เพื่อเก็บค่า secret อย่างปลอดภัย

* การเข้ารหัสสามารถใช้ได้ทั้ง:

  1. **Lambda service key**
  2. **Customer master key (CMK)** ของคุณเอง

* ฟีเจอร์นี้เหมาะสำหรับจัดการค่า **secret** และ **configuration** อย่างปลอดภัย

## สรุป (Key Takeaways)

* Lambda environment variables คือคู่ key-value ในรูปแบบ string สำหรับปรับพฤติกรรมของฟังก์ชันโดยไม่ต้องแก้ไขโค้ด
* Environment variables เข้าถึงได้จากโค้ดและมี system environment variables ของ Lambda เพิ่มเติม
* Lambda รองรับการเข้ารหัส environment variables ด้วย **AWS KMS** ทั้งแบบ Lambda service key หรือ customer master key
* การใช้ environment variables เป็นแนวปฏิบัติที่ดีสำหรับจัดการ configuration และ secrets ในโปรแกรม