# Lambda External Dependencies

## บทนำเกี่ยวกับ External Dependencies ของ Lambda

* จนถึงตอนนี้ในคอร์ส เราได้ทำงานกับ **Lambda ฟังก์ชันง่าย ๆ**

  * ฟังก์ชันเหล่านี้มีแค่โค้ด **ไม่ต้องพึ่งพา external dependencies**

* ในโลกจริง แอปพลิเคชันมักต้องการ **dependencies เพิ่มเติม**

  * เช่น ไลบรารี X-Ray SDK, database clients และอื่น ๆ
  * ต้องติดตั้งแพ็กเกจเหล่านี้ **พร้อมกับโค้ด** และทำเป็น **zip file** รวมกัน

## การจัดแพ็กเกจ Dependencies ตามภาษา

* **JavaScript:** ใช้ **NPM** และโฟลเดอร์ **node_modules**
* **Python:** ใช้ **PIP** กับตัวเลือก **--target**
* **Java:** รวมไฟล์ **.jar** ที่เกี่ยวข้อง
* **แต่ละภาษา** มีวิธีจัดการและแพ็กเกจ dependencies ของตัวเอง

## การจัด Deployment Packaging

* สิ่งสำคัญที่ต้องจำ:

  * ทำ **zip** ของโค้ดและ dependencies รวมกัน
  * ถ้าไฟล์ zip **เล็กกว่า 50 MB** → อัปโหลดตรงเข้า Lambda ได้เลย
  * ถ้าไฟล์ใหญ่กว่า 50 MB → อัปโหลดเข้า **Amazon S3** ก่อน แล้วอ้างอิงจาก Lambda

## Native Libraries

* สำหรับ **native libraries**

  * ต้อง **compile บน Amazon Linux** ก่อน ถึงจะใช้งานได้ใน Lambda

## AWS SDK

* **AWS SDK** มาพร้อมกับ Lambda ทุกฟังก์ชันโดย default

  * ดังนั้นถ้าใช้แค่ AWS SDK → **ไม่ต้องแพ็ก SDK แยก**

## สรุป (Key Takeaways)

* Lambda มักต้องการ **external dependencies** นอกเหนือจากโค้ดง่าย ๆ
* Dependencies ต้อง **แพ็กพร้อมโค้ด** เป็นไฟล์ zip สำหรับ deployment
* แต่ละภาษา **มีวิธีจัดการและแพ็ก dependencies ของตัวเอง**
* AWS SDK **รวมมาให้แล้ว** ใน Lambda → ไม่ต้องแพ็กเพิ่ม