# IAM

**IAM (Identity and Access Management)** เป็นบริการระดับ **global** ของ AWS เพราะใน IAM เราสร้างผู้ใช้ (users) และจัดกลุ่มผู้ใช้ (groups) ได้

เราเคยใช้ IAM โดยไม่รู้ตัวเมื่อสร้างบัญชี AWS ตอนนั้น **root account** ถูกสร้างขึ้นโดยอัตโนมัติ

* Root user คือผู้ใช้หลักของบัญชี
* Root user ควรใช้เพียงเพื่อ **ตั้งค่าบัญชีเริ่มต้น** เท่านั้น หลังจากนั้นไม่ควรใช้งานหรือแชร์ root account

## การสร้างผู้ใช้และกลุ่มใน IAM

แทนที่จะใช้ root user เราควรสร้าง **ผู้ใช้แต่ละคน (individual users)**

* แต่ละ user แทนบุคคลหนึ่งในองค์กร

ผู้ใช้สามารถจัดเป็น **กลุ่ม (groups)** ได้
ตัวอย่าง:

* องค์กรมี 6 คน: Alice, Bob, Charles, David, Edward, Fred
* Alice, Bob, Charles → ทำงานเป็น developers → สร้างกลุ่ม “developers”
* David, Edward → ทำงานฝ่าย operations → สร้างกลุ่ม “operations”

**ข้อสำคัญ:**

* กลุ่มสามารถมี **users เท่านั้น** ไม่สามารถมีกลุ่มอื่นอยู่ในกลุ่ม
* ผู้ใช้บางคนอาจไม่อยู่ในกลุ่มก็ได้ (เช่น Fred)
* ผู้ใช้สามารถอยู่ได้ **หลายกลุ่ม** เช่น Charles และ David เป็นส่วนหนึ่งของทีม audit → สร้างกลุ่มที่สาม

ความยืดหยุ่นนี้ช่วยให้สามารถจัดการ IAM ได้หลากหลาย

## จุดประสงค์ของ Users และ Groups

ทำไมต้องสร้าง users และ groups?

* เพื่อให้ผู้ใช้เข้าถึง AWS account ได้
* ต้องมอบ **permissions** ให้

**Permissions** มอบผ่าน **IAM policy**

* IAM policy เป็นเอกสาร **JSON**
* ไม่ต้องเป็นโปรแกรมเมอร์ก็เข้าใจได้
* Policy อธิบายว่า **ผู้ใช้หรือกลุ่มอนุญาตทำอะไรได้บ้าง**

ตัวอย่าง policy:

* อนุญาตใช้ EC2 และ perform describe actions
* ใช้ Elastic Load Balancing และ describe
* ใช้ CloudWatch

JSON document นี้กำหนดสิทธิ์ของผู้ใช้

* ไม่ควรให้ทุกคนทำทุกอย่าง เพราะอาจก่อให้เกิดค่าใช้จ่ายสูงหรือปัญหาด้านความปลอดภัย

AWS ใช้ **Principle of Least Privilege**

* ให้สิทธิ์ **เท่าที่จำเป็น**
* หากผู้ใช้ต้องใช้เพียง 3 service → ให้สิทธิ์เฉพาะ 3 service นั้น

## สรุป (Key Takeaways)

* IAM = Identity and Access Management, บริการ global ของ AWS สำหรับจัดการผู้ใช้และกลุ่ม
* Root user สร้างอัตโนมัติ ใช้เพียงตั้งค่าบัญชีเริ่มต้น
* Users แทนบุคคล และสามารถจัดเป็นกลุ่มได้; กลุ่มมีได้เฉพาะ users
* Permissions กำหนดผ่าน **IAM policy (JSON)** ตาม **principle of least privilege** เพื่อเพิ่มความปลอดภัยและควบคุมค่าใช้จ่าย