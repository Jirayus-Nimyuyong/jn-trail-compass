# X-Ray with Beanstalk

ในบทเรียนนี้ เราจะดูวิธีการ **รวม AWS X-Ray กับ Elastic Beanstalk**

* แพลตฟอร์ม Beanstalk มี **X-Ray daemon** รวมมาแล้วโดยค่าเริ่มต้น
* จึงไม่จำเป็นต้องติดตั้งเอง
* เพียงเปิดใช้งานผ่าน **คอนโซล Beanstalk** หรือใช้ไฟล์ **EB extensions** ก็เพียงพอ

## การเปิดใช้งาน X-Ray Daemon

มีสองวิธีหลัก:

1. **ผ่าน Beanstalk console**

   * เพียงตั้งค่าออปชัน X-Ray daemon ในส่วน monitoring ของ platform software
   * X-Ray daemon จะรันบน EC2 instances โดยอัตโนมัติ

2. **ผ่าน EB extensions**

   * สร้างไฟล์ชื่อ `x-ray-daemon.config` ในโฟลเดอร์ `.ebextensions`
   * ใส่ `.config` extension
   * บรรทัดเดียวที่เปิดใช้งาน X-Ray daemon ก็เพียงพอ

## สิ่งสำคัญเกี่ยวกับ IAM

* EC2 instance ต้องมี **instance profile** พร้อม **IAM permissions** ที่ถูกต้อง
* Permissions เหล่านี้จำเป็นเพื่อให้ daemon สามารถเขียนข้อมูลไปยัง X-Ray ได้
* ถ้าใช้ **custom role** แทน default role ต้องตรวจสอบให้แน่ใจว่ามี permission สำหรับ X-Ray ครบ

## การสร้าง Beanstalk Application พร้อม X-Ray

ขั้นตอนตัวอย่าง:

1. สร้าง **web server environment**
2. ตั้งชื่อ application และเลือก **Node.js platform**
3. ใช้ค่าตั้งต้น (default) ทั้งหมดและเลือก **single instance environment**
4. เลือก **existing service role** และ **key pair**
5. ข้ามการตั้งค่า VPC, instance traffic และ scaling
6. ในส่วน monitoring ให้เลื่อนลงไปที่ **Amazon X-Ray**
7. เปิดใช้งาน X-Ray daemon
8. คลิก **next** แล้ว **submit** เพื่อเปิด environment
9. ตอนนี้ X-Ray ถูกเปิดใช้งานแล้ว และ Beanstalk จะรัน environment พร้อม X-Ray

## ตรวจสอบ IAM Role สำหรับ X-Ray

* ตรวจสอบ **EC2 instance profile** ที่ใช้ (เช่น `AWS Elastic Beanstalk EC2 Role`)
* ตรวจสอบ IAM console ว่ามี **Elastic Beanstalk Web Tier Policy** แนบอยู่
* Policy นี้มี permission สำหรับให้ daemon ส่งข้อมูลและดึงข้อมูลจาก X-Ray
* หากใช้ custom role ต้องมั่นใจว่า **มี permission สำหรับ X-Ray ครบ**

## การดู X-Ray Traces

* หากแอปพลิเคชันมีฟังก์ชันมากกว่าแค่หน้า congratulations
* และถูก instrument ด้วย **X-Ray SDK**
* จะสามารถดู **traces** ได้ใน **X-Ray console**
* ขั้นต่ำที่สุด คุณก็ได้เห็นวิธีเปิดใช้งาน X-Ray ใน Beanstalk

## สรุปข้อสำคัญ (Key Takeaways)

* **Elastic Beanstalk** มี X-Ray daemon รวมมาแล้ว
* การเปิดใช้งาน X-Ray ทำได้ง่ายผ่าน **Beastalk console** หรือ **.ebextensions/x-ray-daemon.config**
* EC2 instance profile ต้องมี IAM permissions ที่ถูกต้องเพื่อให้ daemon ส่งข้อมูล
* แอปพลิเคชันต้อง **instrumented ด้วย X-Ray SDK** เพื่อส่ง trace data สำหรับมอนิเตอร์