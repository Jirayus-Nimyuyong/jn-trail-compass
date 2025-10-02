# CloudFormation - Rollbacks

## การทำงานของ CloudFormation Rollbacks

เมื่อคุณสร้าง **stack** และเกิดความล้มเหลวในการสร้าง stack คุณมีสองตัวเลือก

1. **ค่าเริ่มต้น (default)**: ระบบจะ **rollback และลบทุก resource** ที่สร้างไปแล้ว

   * คุณสามารถดู **logs การสร้าง stack** เพื่อวิเคราะห์สาเหตุของความล้มเหลวได้
   * แต่คุณ **ไม่สามารถตรวจสอบ resource** ที่ถูกสร้างไปแล้วได้

2. **ปิดการ rollback ระหว่างสร้าง stack**

   * จะช่วยให้คุณ **เก็บ resource ที่สร้างสำเร็จ** ไว้เพื่อตรวจสอบปัญหา
   * มีประโยชน์สำหรับการ debug เมื่อ resource บางตัวสร้างไม่สำเร็จ

## การ rollback เมื่ออัปเดต stack

* ค่าเริ่มต้น: หากอัปเดต stack ล้มเหลว **stack จะ rollback กลับไปยังสถานะที่ใช้งานได้ล่าสุด**
* Resource ที่สร้างใหม่จะถูกลบ
* คุณสามารถตรวจสอบ **logs และข้อความ error** เพื่อวิเคราะห์ความล้มเหลว

## Rollback ล้มเหลว

* หาก **rollback ล้มเหลว** แสดงว่ามีปัญหากับ stack

  * มักเกิดจาก resource ที่ถูกแก้ไขด้วยมือ **นอก CloudFormation**
* วิธีแก้ไข:

  1. แก้ไข resource ด้วยตนเอง
  2. ใช้คำสั่ง **ContinueUpdateRollback** ผ่าน console, API หรือ CLI เพื่อให้ CloudFormation พยายาม rollback อีกครั้ง

## ตัวอย่างการใช้งาน: Triggering Failures

1. สร้าง stack จาก template `trigger-failure.yaml`

   * template นี้มีปัญหา เพราะ **image ID ของ EC2 instance ไม่มีอยู่จริง** → stack creation จะล้มเหลว
2. เมื่อสร้าง stack ชื่อ `TriggerCreationFailure` คุณมีสองตัวเลือก:

   * **Rollback ทุก resource** (default) → ลบทุก resource และกลับไปสถานะก่อนหน้า
   * **Preserve resource ที่สร้างสำเร็จ** → เก็บ resource ที่สร้างสำเร็จไว้ เช่น security group

     * ตัวอย่าง: SSH security group ถูกสร้างสำเร็จและเก็บไว้ แต่ server security group ล้มเหลวเพราะไม่มี description

* หมายเหตุ: หากเลือกเก็บ resource บางตัว **คุณต้องลบ stack ด้วยมือ** ก่อน retry หรือ update stack ใหม่

## ตัวอย่างการ rollback เมื่ออัปเดต stack

1. สร้าง stack จาก template `just-ec2.yaml` ชื่อ `FailureOnUpdate` → สร้างสำเร็จ
2. อัปเดต stack ด้วย template `trigger-failure.yaml` → ล้มเหลวเพราะ AMI ID ไม่ถูกต้อง
3. ในการอัปเดต คุณมีสองตัวเลือก:

   * **Rollback ทุก resource** → ลบ resource ใหม่ทั้งหมด และคืนค่า stack ไปสถานะที่ใช้งานได้ล่าสุด
   * **Preserve resource ที่สร้างสำเร็จ** → resource ที่สร้างก่อนเกิดความล้มเหลวจะยังคงอยู่ ส่วน resource ที่ล้มเหลวจะถูก rollback

* ทั้งสองพฤติกรรมถูกต้อง ขึ้นอยู่กับ **ความต้องการ troubleshoot หรือ operation**
* หลังเสร็จสิ้น อย่าลืม **ลบ stack เพื่อเคลียร์ resource ทั้งหมด**

## สรุป (Key Takeaways)

* การสร้าง stack ล้มเหลว **โดยค่าเริ่มต้นจะ rollback และลบทุก resource**
* การปิด rollback ช่วยให้ **เก็บ resource ที่สร้างสำเร็จ** เพื่อตรวจสอบปัญหา
* การอัปเดต stack ล้มเหลว **จะ rollback กลับไปสถานะที่ใช้งานได้ล่าสุดโดยอัตโนมัติ**
* หาก rollback ล้มเหลว **ต้องแก้ไขด้วยมือ และเรียกใช้ ContinueUpdateRollback API**