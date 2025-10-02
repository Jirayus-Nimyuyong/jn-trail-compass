# การเข้าถึง AWS ด้วย Access Keys, CLI และ SDK

## การแนะนำวิธีการเข้าถึง AWS

เราทราบแล้วว่าการเข้าถึง AWS สามารถทำได้ผ่าน **AWS Management Console** ซึ่งเป็นเว็บอินเทอร์เฟซ
อย่างไรก็ตาม ยังมีอีกสองวิธีหลักที่สามารถเข้าถึง AWS ได้:

1. **Management Console**

   * ใช้เว็บอินเทอร์เฟซ
   * ป้องกันด้วย **username, password** และ **MFA** (ถ้ามี)

2. **CLI (Command Line Interface)**

   * ใช้คำสั่งจาก terminal หรือ command-line shell
   * ป้องกันด้วย **access keys** ซึ่งเราสามารถดาวน์โหลดมาใช้บนเครื่องคอมพิวเตอร์ของเรา

3. **SDK (Software Development Kit)**

   * ใช้เมื่อเรียก API ของ AWS จาก **ภายในโค้ดของแอปพลิเคชัน**
   * ใช้ **access keys** เหมือนกันกับ CLI

## การสร้างและจัดการ Access Keys

* Access keys ถูกสร้างจาก **Management Console**
* ผู้ใช้แต่ละคนรับผิดชอบ access keys ของตัวเอง
* Access keys เป็นความลับเหมือนรหัสผ่าน **ห้ามแชร์กับผู้อื่น**
* เปรียบเทียบ:

  * **Access Key ID** → เหมือน username
  * **Secret Access Key** → เหมือน password
* ใน Console มีปุ่มให้สร้าง access keys และดาวน์โหลดทันที

**คำเตือน:**

* อย่าแชร์ access keys เพราะเป็นข้อมูลส่วนตัวของคุณ
* การแชร์ keys อาจทำให้ผู้อื่นเข้าถึง AWS account ของคุณได้

## ความเข้าใจเกี่ยวกับ AWS CLI

* CLI = **Command Line Interface**
* AWS CLI เป็นเครื่องมือที่ช่วยให้คุณโต้ตอบกับบริการ AWS ผ่านคำสั่งบน command line
* ทุกคำสั่งของ AWS CLI จะเริ่มด้วย `aws` เช่น: `aws s3 cp`
* CLI ให้ **เข้าถึง API ของ AWS โดยตรง**
* ใช้สำหรับสร้าง **สคริปต์** เพื่อจัดการทรัพยากรและ **อัตโนมัติงาน**
* CLI เป็นโอเพ่นซอร์ส มีโค้ดบน GitHub
* บางคนใช้ CLI อย่างเดียวโดยไม่เปิด Management Console

## ภาพรวมของ AWS SDK

* SDK = **Software Development Kit**
* เป็นชุด **ไลบรารีสำหรับภาษาโปรแกรม**
* SDK ช่วยให้เรียกใช้งานและจัดการบริการ AWS **ภายในโค้ดของแอปพลิเคชัน**
* รองรับหลายภาษา เช่น **JavaScript, Python, PHP, .NET, Ruby, Java, Go, Node.js, C++**
* มี SDK สำหรับ **มือถือ (Android, iOS)** และ **IoT devices**

**ตัวอย่าง:**

* AWS CLI ที่เราใช้ในคอร์สนี้สร้างขึ้นบน **AWS SDK for Python (Boto)**

## สรุป

* AWS เข้าถึงได้ผ่าน **3 วิธีหลัก**: Management Console, CLI, SDK
* **Access keys** เป็นข้อมูลสำคัญสำหรับ CLI และ SDK ต้องเก็บเป็นความลับ
* AWS CLI ช่วยให้จัดการ AWS ผ่าน **คำสั่งและสคริปต์**
* AWS SDK ช่วยให้แอปพลิเคชันโต้ตอบกับ AWS แบบ **โปรแกรมมิ่ง**