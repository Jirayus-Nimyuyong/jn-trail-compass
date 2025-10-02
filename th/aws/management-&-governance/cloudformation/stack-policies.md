# CloudFormation - Stack Policy

## แนะนำ Stack Policies ของ CloudFormation

ในการอัปเดต **CloudFormation Stack** โดยค่าเริ่มต้น จะอนุญาตให้ทำ **action ใด ๆ กับ resources ทั้งหมด** ได้ ซึ่งหมายความว่าคุณสามารถเปลี่ยนแปลง stack ได้ตามต้องการ

## วัตถุประสงค์ของ Stack Policies

บางครั้งคุณอาจต้องการ **ปกป้อง stack หรือบางส่วนของ stack** จากการอัปเดต ซึ่งตรงนี้เองที่ **Stack policies** มีประโยชน์

* Stack policies เป็น **เอกสาร JSON** ที่ระบุว่า action การอัปเดตใดบ้างที่อนุญาตกับ resource เฉพาะระหว่างการอัปเดต stack

## ตัวอย่าง Stack Policy

* **Statement แรก** → อนุญาตให้อัปเดตทุกอย่าง หมายความว่า **resources ทั้งหมดใน stack** สามารถอัปเดตได้
* **Statement ที่สอง** → ปฏิเสธการอัปเดตกับ resource ที่ชื่อว่า `"Production Database"`

  * หมายความว่า **Production Database** จะถูกปกป้องไม่ให้มีการอัปเดตใด ๆ
  * ทำให้ฐานข้อมูล production ของคุณปลอดภัย

## จุดประสงค์หลักของ Stack Policies

* ปกป้อง resources จากการอัปเดตโดยไม่ตั้งใจ
* เมื่อคุณตั้ง **Stack policy** โดยค่าเริ่มต้น **resources ทั้งหมดจะถูกปกป้อง**
* ดังนั้นคุณต้องระบุ **explicit allow** สำหรับ resources ที่ต้องการให้อัปเดต

## สรุป

* Stack policies ใช้เพื่อกำหนดว่า resources ใดสามารถอัปเดตได้หรือไม่ได้ในขณะ update stack
* โดยค่าเริ่มต้น resources ทั้งหมดสามารถอัปเดตได้ หากไม่มี Stack policy มาจำกัด
* Stack policies ช่วยปกป้อง resource สำคัญ เช่น production database จากการอัปเดตโดยไม่ตั้งใจ
* เมื่อกำหนด Stack policy แล้ว **resources ทั้งหมดจะถูกปกป้องโดยค่าเริ่มต้น** ต้องระบุ statement “allow” สำหรับ resource ที่ต้องการให้อัปเดต

## Key Takeaways

* **Stack policies** เป็น JSON document กำหนด action ที่อนุญาตในการอัปเดต resources
* โดยค่าเริ่มต้น resources ทั้งหมดสามารถอัปเดตได้ ยกเว้นถูกจำกัดด้วย Stack policy
* Stack policies ปกป้อง resources สำคัญจากการอัปเดตโดยไม่ตั้งใจ
* ต้องระบุ explicit allow สำหรับ resources ที่ต้องการให้อัปเดตเมื่อกำหนด Stack policy
