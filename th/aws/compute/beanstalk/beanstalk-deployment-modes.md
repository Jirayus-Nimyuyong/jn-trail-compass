# Elastic Beanstalk Deployment

## ภาพรวมของตัวเลือกการ Deploy บน Elastic Beanstalk

เมื่อคุณอัปเดตแอปพลิเคชันบน Elastic Beanstalk จะมีหลายวิธีในการ Deploy ดังนี้:

* **All at once**: อัปเดตทุก instance พร้อมกัน วิธีนี้เร็วที่สุด แต่จะทำให้เกิด downtime เนื่องจาก instances ไม่พร้อมให้บริการระหว่างการอัปเดต
* **Rolling**: อัปเดตทีละกลุ่ม (bucket) โดยอัปเดตบาง instances ก่อน จากนั้นไปยัง batch ถัดไปเมื่อ batch ก่อนหน้าพร้อมใช้งาน
* **Rolling with additional batch**: คล้าย Rolling แต่มีการสร้าง instance ใหม่เพิ่มเข้ามา เพื่อรักษาความสามารถในการทำงานเต็มรูปแบบระหว่างอัปเดต
* **Immutable**: สร้าง instances ใหม่ใน Auto Scaling Group (ASG) ชั่วคราว พร้อมเวอร์ชันใหม่ เมื่อสุขภาพดีแล้วจึงแทนที่ instances เก่า
* **Blue/Green**: สร้าง Environment ใหม่ทั้งชุด (Green) แล้วเปลี่ยนเส้นทางทราฟฟิกจาก Environment เดิม (Blue) มายัง Green เมื่อพร้อมใช้งาน
* **Traffic splitting**: ใช้สำหรับ Canary Testing โดยส่งทราฟฟิกเพียงบางส่วนไปยัง Deployment ใหม่

## All At Once Deployment

* สมมติว่ามี 4 EC2 instances ที่รันเวอร์ชัน 1 ของแอปพลิเคชัน
* เมื่อ Deploy แบบ All at once → Elastic Beanstalk จะหยุดแอปบนทุก instance พร้อมกัน (กลายเป็น gray)
* จากนั้น Deploy เวอร์ชัน 2 ลงไปในทุก instance

**ข้อดี/ข้อเสีย:**

* เร็วที่สุด แต่เกิด **downtime** ระหว่างอัปเดต
* เหมาะกับการพัฒนา หรือกรณีที่ downtime ยอมรับได้
* ไม่มีค่าใช้จ่ายเพิ่ม

## Rolling Deployment

* การอัปเดตแบบ Rolling จะทำทีละกลุ่ม (bucket)
* เช่น มี 4 instances, bucket ขนาด 2:

  * หยุดและอัปเดต 2 instances แรกเป็นเวอร์ชัน 2
  * อีก 2 instances ยังทำงานเวอร์ชัน 1 อยู่
  * เมื่อ batch แรกพร้อมใช้งาน จึงอัปเดต batch ถัดไป

**ข้อดี/ข้อเสีย:**

* ไม่มีค่าใช้จ่ายเพิ่ม (จำนวน instances คงที่)
* บางช่วงระบบจะรันทั้งเวอร์ชันเก่าและใหม่พร้อมกัน
* แอปจะทำงาน **ต่ำกว่าความสามารถเต็ม** ชั่วคราว
* หาก bucket มีขนาดเล็ก และ instances เยอะ การ deploy อาจใช้เวลานาน

## Rolling with Additional Batch

* Elastic Beanstalk จะสร้าง **instances ใหม่** เพิ่มขึ้นมาเพื่อไม่ให้ระบบทำงานต่ำกว่าความสามารถเต็ม
* ตัวอย่าง: เริ่มจาก 4 instances เวอร์ชัน 1 → สร้าง 2 instances ใหม่ที่รันเวอร์ชัน 2
* จากนั้นอัปเดต batch แรกของ instances เก่า → แล้วอัปเดต batch ถัดไป
* เมื่อเสร็จสิ้น การอัปเดต instances ชุดใหม่จะถูกยกเลิก

**ข้อดี/ข้อเสีย:**

* ไม่มี downtime
* รักษาความสามารถเต็มของระบบระหว่าง deploy
* มีค่าใช้จ่ายเล็กน้อย เนื่องจากต้องสร้าง instances ชั่วคราว
* เหมาะกับ production ที่ต้องการ **zero downtime**

## Immutable Deployment

* สร้าง **Auto Scaling Group (ASG) ชั่วคราว** พร้อม instances เวอร์ชันใหม่
* เริ่มจากสร้าง instance หนึ่งตัวเพื่อตรวจสอบสุขภาพ
* หากผ่าน → สร้าง instances ที่เหลือ
* เมื่อพร้อมทั้งหมด จะนำ instances ใหม่เข้าไปแทนใน ASG เดิม → ทำให้ความสามารถของระบบ **เพิ่มขึ้นเป็นสองเท่า** ชั่วคราว
* จากนั้น terminate instances เก่า และลบ ASG ชั่วคราว

**ข้อดี/ข้อเสีย:**

* ไม่มี downtime
* Rollback ได้รวดเร็ว เพียงแค่ terminate ASG ใหม่
* เหมาะกับ production
* ค่าใช้จ่ายสูงกว่า และใช้เวลามากกว่าวิธีอื่น

## Blue/Green Deployment

* ไม่ใช่ฟีเจอร์ที่ Elastic Beanstalk มีให้ตรง ๆ แต่สามารถทำได้เอง
* สร้าง Environment ใหม่ (Green) พร้อมเวอร์ชัน 2 ขึ้นมาแยกจาก Environment เดิม (Blue)
* Green รันแยกอิสระ ทำให้ทดสอบและตรวจสอบได้เต็มที่
* ใช้ **Route 53** แบ่งทราฟฟิกด้วย Weighted Policy (เช่น 90% → Blue, 10% → Green)
* เมื่อพร้อมใช้งาน → swap URLs เพื่อเปลี่ยน Green เป็น Environment หลัก และปิด Blue

**ข้อดี/ข้อเสีย:**

* ไม่มี downtime
* ทดสอบได้เต็มที่ก่อนเปลี่ยน
* ต้องจัดการและตั้งค่าด้วยตนเอง

## Traffic Splitting (Canary Testing)

* Elastic Beanstalk รองรับ Canary Testing อัตโนมัติ
* สร้าง ASG ชั่วคราว พร้อม instances เวอร์ชันใหม่ ขนาดเท่ากับ ASG หลัก
* เช่น ASG หลักมี 3 instances → ASG ชั่วคราวก็มี 3 instances → ความสามารถรวมเพิ่มขึ้นเป็นสองเท่า
* ตั้งค่า Application Load Balancer (ALB) ให้ส่งทราฟฟิกบางส่วน (เช่น 10%) ไปยัง ASG ใหม่
* ระบบตรวจสอบสุขภาพอัตโนมัติ
* หากพบปัญหา → Rollback อัตโนมัติโดยหยุดส่งทราฟฟิกไปยัง ASG ใหม่
* หากเสถียร → ย้าย instances ใหม่ไปยัง ASG หลัก และ terminate เวอร์ชันเก่า

**ข้อดี/ข้อเสีย:**

* ไม่มี downtime
* เหมาะกับ Canary Test และ Rollback อัตโนมัติ
* ใช้ทรัพยากรมากกว่าชั่วคราว

## สรุปและคำแนะนำ

Elastic Beanstalk มีตารางเปรียบเทียบโหมดการ Deploy โดยดูจาก:

* ผลกระทบเมื่อ Deploy ล้มเหลว
* เวลาในการ Deploy
* ความสามารถในการทำงานแบบ Zero Downtime
* ความต้องการเปลี่ยน DNS
* วิธี Rollback
* เป้าหมายของการ Deploy

**Key Takeaways:**

* Elastic Beanstalk มีหลายวิธีในการ Deploy: All at once, Rolling, Rolling with Additional Batch, Immutable, Blue/Green, และ Traffic Splitting
* **All at once** → เร็วที่สุด แต่มี downtime
* **Rolling** → ไม่มี downtime แต่ทำงานต่ำกว่าความสามารถเต็ม
* **Rolling with additional batch** → รักษาความสามารถเต็ม โดยมีค่าใช้จ่ายเพิ่มเล็กน้อย
* **Immutable** → Zero downtime + Rollback ง่าย แต่แพงและช้า
* **Blue/Green** → สร้าง Environment ใหม่ ทดสอบได้เต็มที่ ก่อนสลับทราฟฟิก
* **Traffic Splitting** → เหมาะกับ Canary Test และ rollback อัตโนมัติ
