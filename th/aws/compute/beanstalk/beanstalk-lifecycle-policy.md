## Lifecycle Policy

### ข้อจำกัดของ Application Version และ Lifecycle Policy ของ Beanstalk

Elastic Beanstalk สามารถเก็บ **Application Version** ได้สูงสุด **1,000 เวอร์ชันต่อหนึ่งบัญชี** หากคุณไม่ลบเวอร์ชันเก่าออก คุณจะ **ไม่สามารถ Deploy แอปพลิเคชันใหม่ได้อีก** ดังนั้นจึงจำเป็นต้องลบเวอร์ชันเก่าออกเป็นระยะ ๆ ซึ่งสามารถทำได้โดยใช้ **Lifecycle Policy** ของ Beanstalk

Lifecycle Policy สามารถตั้งค่าได้ 2 แบบ:

* **ตามเวลา (Age-based):** ลบเวอร์ชันเก่าหลังจากผ่านไปตามระยะเวลาที่กำหนด
* **ตามจำนวน (Count-based):** ลบเวอร์ชันเก่าเมื่อมีจำนวนเกินที่กำหนด

> หมายเหตุ:

* **เวอร์ชันที่กำลังถูกใช้งาน (active)** จะไม่ถูกลบ แม้ว่าจะเก่าหรือใช้พื้นที่มากเกินไปก็ตาม
* คุณสามารถเลือก **ไม่ลบ Source Bundle ใน Amazon S3** เพื่อป้องกันการสูญหายของข้อมูล หากต้องการกู้คืนเวอร์ชันในอนาคต
* ปัจจุบัน Lifecycle Policy จะลบเฉพาะเวอร์ชันออกจาก **Beanstalk Console/Interface** เท่านั้น

## การลงมือทำ Lifecycle Policy

1. ไปที่ **Application Versions** ภายใต้แอปพลิเคชัน เช่น `MyApplication`

   * ที่นี่คุณจะเห็นรายการเวอร์ชันที่ถูก Deploy เช่น `MyApplication-blue` พร้อมรายละเอียดว่าใช้ Label ไหน, มาจาก Source ไหน และเก็บไว้ที่ไหน

2. หากคลิกที่ Source จะเป็นการ **ดาวน์โหลด Application Version**
   แต่ในที่นี้เราจะเข้าไปดูที่ **Amazon S3** เพื่อสำรวจว่า Source Bundle ถูกเก็บไว้ที่ใด

## การตรวจสอบ Source Bundles ใน Amazon S3

* ใน Amazon S3 จะมี **Bucket ที่สร้างโดย Beanstalk** สำหรับเก็บ Application Versions ของคุณ
* ตัวอย่างเช่น หากคุณอยู่ใน Region **EU Central-1** คุณจะพบ Bucket ที่ตั้งชื่ออ้างอิงกับ Region นั้น ๆ
* ทุกเวอร์ชันที่ถูก Upload ไปยัง Beanstalk จะถูกเก็บใน S3 นี้ และจะถูก Register ไว้ใน Beanstalk เพื่อควบคุมการใช้งานและจำนวนเวอร์ชันที่คงอยู่

## การตั้งค่า Lifecycle Policy ของ Application

* ใน Beanstalk Settings คุณสามารถ **เปิดใช้งาน Lifecycle Policy** ได้

* คุณสามารถเลือก:

  * **จำกัดตามจำนวน** เช่น เก็บไว้สูงสุด **200 เวอร์ชัน**
  * **จำกัดตามอายุ** เช่น เก็บเฉพาะเวอร์ชัน **180 วันล่าสุด**

* **เวอร์ชันที่กำลังใช้งาน** จะไม่ถูกลบ

* เวอร์ชันที่ไม่ใช้งานและไม่ตรงตามกฎ Lifecycle จะถูกลบออกจาก Beanstalk

## การจัดการ Source Bundles ใน Amazon S3 เมื่อมีการลบ

เมื่อมีการลบเวอร์ชันออกจาก Beanstalk คุณมี 2 ตัวเลือกสำหรับ Source Bundle ใน Amazon S3:

1. **เก็บไว้ (Retain)** – เพื่อใช้กู้คืนในอนาคต
2. **ลบออก (Delete)** – เพื่อลดการใช้พื้นที่เก็บข้อมูล

> หมายเหตุ: การลบไฟล์ออกจาก S3 จำเป็นต้องมี **AWS Elastic Beanstalk Service Role** เพื่ออนุญาตการลบ

## สรุป

* Elastic Beanstalk เก็บได้สูงสุด **1,000 Application Versions** ต่อบัญชี → ต้องลบเวอร์ชันเก่าเพื่อสามารถ Deploy ต่อได้
* **Lifecycle Policy** ช่วยจัดการการลบอัตโนมัติ ทั้งแบบจำกัดจำนวนหรือตามระยะเวลา
* Application Versions จะถูกเก็บไว้ใน **Amazon S3** และคุณสามารถเลือกว่าจะลบหรือเก็บ Source Bundle ไว้เมื่อมีการลบออกจาก Beanstalk
* การลบ Source Bundle ต้องใช้ **Service Role ของ Beanstalk**

👉 Key Takeaways ภาษาไทย:

* Beanstalk จำกัดเวอร์ชันไว้ที่ 1,000 ต่อบัญชี ต้องลบของเก่าออกเพื่อ Deploy ต่อได้
* Lifecycle Policy ช่วยลบเวอร์ชันเก่าอัตโนมัติ โดยยึดตามจำนวนหรืออายุเวอร์ชัน
* Source Bundle จะเก็บใน S3 และสามารถเลือกได้ว่าจะเก็บหรือไม่เมื่อเวอร์ชันถูกลบออก
* การลบต้องอาศัย Service Role ของ Beanstalk