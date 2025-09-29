# Beanstalk Extensions

## แนะนำ Elastic Beanstalk Extensions

เมื่อคุณสร้างไฟล์ **zip** สำหรับการ Deploy ไปยัง Elastic Beanstalk ไฟล์นั้นจะบรรจุโค้ดของแอปพลิเคชันคุณไว้ แต่คุณยังสามารถใส่ **Elastic Beanstalk (EB) Extensions** เข้าไปได้ด้วย ซึ่ง Extensions เหล่านี้ช่วยให้คุณสามารถตั้งค่าพารามิเตอร์ได้แบบโปรแกรม (programmatically) คล้ายกับการปรับแต่งค่าผ่าน **Elastic Beanstalk Console**

## โครงสร้างโฟลเดอร์ EB Extensions และรูปแบบไฟล์

* ไฟล์ตั้งค่าทั้งหมดของ EB Extensions ต้องถูกวางไว้ใน **โฟลเดอร์ชื่อ `.ebextensions/`** ที่อยู่ **root ของ source code**
* ไฟล์ต้องอยู่ในรูปแบบ **YAML หรือ JSON**
* แต่ไม่ว่ารูปแบบจะเป็นอะไร ไฟล์ต้องลงท้ายด้วยนามสกุล **`.config`**

  * ตัวอย่างเช่น: `logging.config`

## การแก้ไขค่าพื้นฐานและการเพิ่มทรัพยากร

* คุณสามารถแก้ไข **ค่า default** ได้โดยใช้เอกสาร **option_settings** ภายใน EB Extensions
* EB Extensions ยังสามารถใช้เพื่อเพิ่มทรัพยากร AWS อื่น ๆ ได้ เช่น:

  * **RDS**
  * **ElastiCache**
  * **DynamoDB**
* ซึ่งบางทรัพยากรอาจไม่สามารถตั้งค่าได้โดยตรงผ่าน Beanstalk Console

## วงจรชีวิตของทรัพยากรที่ถูกจัดการโดย EB Extensions

* **ทรัพยากรใด ๆ ที่ถูกสร้างขึ้นโดย EB Extensions จะถูกลบออกทันทีหาก Elastic Beanstalk Environment ถูก Terminate**
* เช่น หากคุณสร้าง **ElastiCache instance** เป็นส่วนหนึ่งของ Environment และคุณลบ Environment นั้น → ElastiCache instance จะถูกลบไปด้วย

## ตัวอย่างการใช้งานจริง: การตั้งค่า Environment Variables ด้วย EB Extensions

* ในโฟลเดอร์โค้ด มีโฟลเดอร์ชื่อ `nodejs-v3-ebextensions`
* ภายในมีโฟลเดอร์ **`.ebextensions`** และไฟล์ชื่อ `environment-variables.config`

  * ไฟล์นี้ใช้ **YAML format** แต่ลงท้ายด้วย **.config**
* ในไฟล์มีการใช้ **option_settings** เพื่อกำหนด Environment Variables เช่น:

  * `DB_URL`
  * `DB_USER`
* ซึ่งค่าพวกนี้สามารถใช้สำหรับเชื่อมต่อกับทรัพยากรภายนอก เช่น **RDS Postgres Database**

## การ Deploy แอปพลิเคชันที่มี EB Extensions

* แอปพลิเคชันพร้อมโฟลเดอร์ `.ebextensions/` และไฟล์ config ทั้งหมดจะถูกบีบอัดเป็นไฟล์ `nodejs-v3-ebextensions.zip`
* จากนั้นอัปโหลดไปยัง Elastic Beanstalk Environment เพื่อ Deploy
* การ Deploy จะทำบน **Development Environment** เพื่ออัปเดตได้เร็วขึ้น
* หลังจาก Deploy เสร็จสิ้น Environment จะถูกอัปเดตเป็นเวอร์ชันใหม่ที่รวม EB Extensions ด้วย

## การตรวจสอบว่า EB Extensions ถูกนำไปใช้แล้วหรือยัง

* ไปที่ **Configuration page** ของ Elastic Beanstalk Environment
* เลื่อนลงไปที่ส่วน **Environment Properties**
* คุณจะพบ Environment Variables เช่น `DB_URL` และ `DB_USER` ถูกตั้งค่าไว้
* ซึ่งค่าพวกนี้ไม่ได้ถูกตั้งไว้เองใน Console แต่ถูกนำเข้ามาจาก EB Extensions ที่ Deploy ไปแล้ว

สิ่งนี้แสดงให้เห็นถึง **พลังและความยืดหยุ่นของ EB Extensions** ในการจัดการการตั้งค่าและทรัพยากรต่าง ๆ

## บทสรุป

เนื้อหานี้เป็นการแนะนำการใช้ **Elastic Beanstalk Extensions** สำหรับ:

* การตั้งค่า Environment Variables
* การจัดการทรัพยากร AWS แบบโปรแกรม (programmatically)

ถึงแม้จะเป็นเพียงระดับเบื้องต้น แต่ก็ครอบคลุมความรู้สำคัญสำหรับการจัดการ Elastic Beanstalk Environments อย่างมีประสิทธิภาพ

## Key Takeaways (สรุปใจความสำคัญ)

* **Elastic Beanstalk Extensions** ช่วยให้ตั้งค่าพารามิเตอร์ได้ผ่านโค้ด โดยใช้ไฟล์ `.config`
* ไฟล์ต้องอยู่ในโฟลเดอร์ **`.ebextensions/`** และใช้รูปแบบ **YAML หรือ JSON**
* Extensions สามารถใช้ตั้งค่า Environment Variables และเพิ่มทรัพยากร AWS (เช่น RDS, ElastiCache) ได้
* ทรัพยากรที่ถูกสร้างโดย EB Extensions จะถูกลบออกเมื่อ Environment ถูก Terminate
