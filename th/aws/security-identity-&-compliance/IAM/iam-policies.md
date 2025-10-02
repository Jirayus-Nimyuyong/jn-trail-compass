# IAM Policies

มาดู IAM Policies อย่างละเอียดกัน
สมมติว่าเรามีกลุ่มนักพัฒนา: Alice, Bob, และ Charles

* หากแนบ policy ที่ **ระดับกลุ่ม** ทุกคนในกลุ่มจะได้รับสิทธิ์นั้น
* ดังนั้น Alice, Bob, และ Charles จะ **สืบทอด policy** นี้โดยอัตโนมัติ

ถ้ามีกลุ่ม operations อีกกลุ่มหนึ่งพร้อม policy ต่างกัน

* สมาชิกเช่น David และ Edward จะมี policy แตกต่างจากกลุ่ม developers

สำหรับผู้ใช้ที่ไม่อยู่ในกลุ่ม เช่น Fred

* สามารถสร้าง **inline policy** ที่แนบกับผู้ใช้นั้นโดยตรงได้
* หมายความว่าผู้ใช้สามารถมี inline policies ได้ **ไม่ว่าจะอยู่ในกลุ่มหรือไม่ก็ตาม**

นอกจากนี้ หาก Charles และ David อยู่ในทีม audit

* และมี policy แนบกับทีม audit พวกเขาจะสืบทอด policy นั้นด้วย
* ตัวอย่าง:

  * Charles มี policy จาก **developers group** และ **audit team**
  * David มี policy จาก **operations group** และ **audit team**

การสืบทอด policy แบบหลายชั้นนี้ จะเห็นชัดเจนมากขึ้นเมื่อลองปฏิบัติจริง

## โครงสร้างของ IAM Policy

IAM policy เป็น **เอกสาร JSON** ที่ประกอบด้วยหลายส่วนสำคัญ

### ส่วนประกอบหลักของ IAM Policy

* **Version**: เวอร์ชันของภาษา policy เช่น `"2012-10-17"`
* **Id**: ตัวระบุของ policy (ไม่บังคับ)
* **Statement**: รายการ statement หนึ่งหรือมากกว่า ที่กำหนด permissions

แต่ละ statement มีองค์ประกอบสำคัญดังนี้:

* **Sid**: Statement ID (ไม่บังคับ)
* **Effect**: กำหนดว่า statement นี้ **Allow** หรือ **Deny** การเข้าถึง API
* **Principal**: ระบุบัญชี, ผู้ใช้ หรือ role ที่ policy นี้ใช้

  * ตัวอย่าง: ระบุ root account ของบัญชี AWS
* **Action**: รายการ API calls ที่อนุญาตหรือปฏิเสธตาม Effect
* **Resource**: ระบุ resource ที่ action นี้นำไปใช้ เช่น S3 bucket
* **Condition**: เงื่อนไขเสริมเพื่อจำกัดการใช้ statement (ไม่บังคับ)

ตัวอย่าง:

* statement อนุญาตบาง action บน resource bucket เฉพาะ root account
* condition สามารถจำกัดเวลา/สถานการณ์การใช้ statement แต่เป็น optional

## เคล็ดลับเตรียมสอบ

สำหรับการสอบ AWS IAM ควรเข้าใจ **องค์ประกอบสำคัญของ IAM Policy**:

* **Effect**
* **Principal**
* **Action**
* **Resource**

คุณจะเจอแนวคิดเหล่านี้บ่อย ดังนั้นควรมั่นใจและเข้าใจอย่างชัดเจน

## สรุป (Key Takeaways)

* IAM policies สามารถแนบได้หลายระดับ: **groups, users (inline policies), และหลายกลุ่ม**
* Users สืบทอด policies จากทุกกลุ่มที่อยู่ ทำให้สิทธิ์รวมกัน
* โครงสร้าง IAM policy ประกอบด้วย: **version, ID, statements** (effect, principal, action, resource, และ condition แบบ optional)
* การเข้าใจ **effect, principal, action, และ resource** เป็นสิ่งสำคัญทั้งสำหรับการจัดการ IAM และการสอบ AWS