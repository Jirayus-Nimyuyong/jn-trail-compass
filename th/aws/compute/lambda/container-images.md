# Lambda Container Images

## แนะนำ Lambda Container Images

AWS Lambda ตอนนี้รองรับ **container images** ซึ่งเป็นฟีเจอร์ใหม่ที่ช่วยให้คุณสามารถ deploy Lambda functions เป็น **container images ขนาดสูงสุด 10 GB** จาก **Amazon Elastic Container Registry (ECR)**

* ฟีเจอร์นี้ช่วยให้สามารถแพ็กเกจ dependencies ขนาดใหญ่และซับซ้อนอยู่ใน container ได้

**แนวคิด:**

* ใช้ **Docker** เพื่อรวมโค้ด, dependencies, และชุดข้อมูลที่ต้องใช้ทั้งหมดบน base image
* **Base image** ต้อง **implement Lambda Runtime API** เพื่อให้ Lambda รันได้
* Lambda จะรัน container เป็นเหมือน virtual machine
* คุณสามารถใช้ base image ของ Lambda, เพิ่มโค้ดและ dependencies ของคุณ แล้วแพ็กเป็น container image ที่ Lambda สามารถรันได้

AWS มี **base images** สำหรับหลายภาษา เช่น Python, Node.js, Java, .NET, Go, Ruby

* คุณสามารถสร้าง base image ของคุณเองได้ หาก implement **Lambda Runtime API** ตามเอกสาร

สามารถ **ทดสอบ container locally** ด้วย **Lambda Runtime Interface Emulator**

* การใช้ Lambda container images ทำให้ workflow การ publish แอปเหมือนกันกับ container ของ ECS → build, push ไปที่ ECR → deploy บน Lambda

## ตัวอย่าง Lambda Container Image

1. เลือก base image ที่ implement Lambda Runtime API เช่น `amazon/aws-lambda-nodejs:12`
2. คัดลอกโค้ดและไฟล์แอป เช่น `app.js` และ `package.json` เข้าไปใน container
3. ติดตั้ง dependencies ภายใน container เช่น `npm install`
4. ระบุฟังก์ชันที่จะรันเมื่อ Lambda ถูก invoke เช่น `app.lambdaHandler`

**ข้อดี:**

* ลดความซับซ้อนเรื่อง dependency และการคอมไพล์
* เป็นทางเลือกที่ดีแทนการสร้าง Lambda Layers ของตัวเอง

## Best Practices สำหรับ Lambda Container Images

1. **ใช้ AWS-provided base images**

   * สร้างบน Amazon Linux 2
   * Lambda service cache ไว้ → ลดปริมาณข้อมูลที่ต้องดึง

2. **ใช้ multi-stage builds**

   * Build ขั้นตอนซับซ้อนใน image ใหญ่ก่อน → copy artifacts ที่จำเป็นไป image สุดท้าย → ลดขนาด final image

3. **Build images เป็น layers จาก stable → เปลี่ยนบ่อย**

   * ใส่ component ที่เสถียร เช่น base packages ตอนต้น
   * ส่วนที่เปลี่ยนบ่อยไว้ตอนท้าย → optimize caching และ build efficiency

4. **เก็บ functions ที่มี large layers ใน repository เดียว**

   * Amazon ECR จะเปรียบเทียบ layers → ลด duplication → ประหยัด storage และเวลา upload

## Use Case สำหรับ Lambda ขนาดใหญ่

* เหมาะกับ Lambda function ขนาดใหญ่สูงสุด 10 GB
* แทนการ push code โดยตรง → สร้าง container image ขนาดใหญ่แล้วใช้เป็นฐานสำหรับ Lambda

## Lambda Container Images – แนวทางปฏิบัติที่ดีที่สุด

**กลยุทธ์ในการเพิ่มประสิทธิภาพของ container images:**

* **ใช้ AWS-provided Base Images**

  * เสถียร สร้างบน Amazon Linux 2
  * Lambda service ทำการ cache ไว้ → ลดเวลาในการดึง image

* **ใช้ Multi-Stage Builds**

  * สร้างโค้ดและ build ขั้นตอนซับซ้อนใน image ขนาดใหญ่
  * คัดลอกเฉพาะ artifacts ที่ต้องการไปยัง **final container image**
  * ละทิ้งขั้นตอน preliminary ที่ไม่จำเป็น

* **Build จากส่วนที่เสถียรไปยังส่วนที่เปลี่ยนบ่อย**

  * ทำให้ส่วนที่มีการเปลี่ยนบ่อยที่สุดอยู่ท้ายสุดของ Dockerfile → เพิ่มประสิทธิภาพ caching และ build

* **ใช้ repository เดียวสำหรับ functions ที่มี layers ขนาดใหญ่**

  * Amazon ECR จะเปรียบเทียบแต่ละ layer ของ container image เมื่อ push เพื่อหลีกเลี่ยงการอัปโหลดและเก็บข้อมูลซ้ำ

* **ใช้วิธีนี้สำหรับการอัปโหลด Lambda Functions ขนาดใหญ่**

  * รองรับ Lambda function ขนาดสูงสุด **10 GB**

## สรุป (Key Takeaways)

* Lambda รองรับ **container images ขนาดสูงสุด 10 GB** → deploy แอปซับซ้อนพร้อม dependencies ขนาดใหญ่ได้
* Container image ต้องใช้ **base image ที่ implement Lambda Runtime API** → มีหลายภาษาให้เลือก
* ใช้ **AWS base images + multi-stage builds** → ลดขนาด container และเพิ่มประสิทธิภาพ deployment
* เก็บ functions ที่มี layers ขนาดใหญ่ใน repository เดียว → ลด duplication และเพิ่ม efficiency ของ Amazon ECR