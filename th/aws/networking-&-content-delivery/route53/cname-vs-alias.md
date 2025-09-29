# Route 53 - CNAME vs Alias

## ความแตกต่างระหว่าง CNAME และ Alias Records

เมื่อคุณมี AWS Resource เช่น **Load Balancer** หรือ **CloudFront Distribution** มันจะมี **hostname** ให้ใช้งาน
คุณอาจต้องการ map hostname นี้เข้ากับโดเมนที่คุณเป็นเจ้าของ ตัวอย่างเช่น map Load Balancer ไปที่ `myapp.mydomain.com` ซึ่งสามารถทำได้สองวิธี:

1. **CNAME Record**

   * ไม่เหมือน A record, CNAME record อนุญาตให้คุณชี้ hostname ไปยัง hostname อื่นได้
   * ตัวอย่าง: `app.mydomain.com → blabla.anything.com`
   * ข้อจำกัด: ใช้ได้เฉพาะ **non-root domain** (เช่น `something.mydomain.com`)
   * ใช้ **ไม่ได้** กับ root domain (`mydomain.com`)

2. **Alias Record**

   * เป็นฟีเจอร์เฉพาะของ **Route 53**
   * อนุญาตให้ชี้ hostname ไปยัง AWS Resource ได้ เช่น `app.mydomain.com → blabla.amazonaws.com`
   * ใช้ได้ทั้ง root domain และ non-root domain (เช่น `mydomain.com`)
   * มีประโยชน์มาก และมักถูกออกสอบใน certification
   * **ฟรีค่าบริการ** และมี **Health Check** ในตัว

## รายละเอียดของ Alias Records

* **ใช้ได้เฉพาะกับ AWS Resources** เท่านั้น
* ตัวอย่าง: ใน Route 53 คุณสามารถสร้าง Alias Record แบบ **A Record** สำหรับ `example.com` โดยชี้ไปที่ **DNS Name ของ Load Balancer**
* หาก **ALB** เปลี่ยน IP address → Alias record จะอัปเดตอัตโนมัติ
* Alias record **ใช้ได้ที่ Zone Apex (root domain)** เช่น `example.com` (ซึ่ง CNAME ใช้ไม่ได้)
* Alias record มีแต่ **A (IPv4)** หรือ **AAAA (IPv6)** เท่านั้น
* ไม่สามารถกำหนด TTL เองได้ → Route 53 จะจัดการให้

## Targets ที่ Alias Record รองรับ

Alias record สามารถชี้ไปยัง AWS Services ได้หลายตัว เช่น:

* Elastic Load Balancers (ELB/ALB/NLB)
* CloudFront Distributions
* API Gateway
* Elastic Beanstalk environments
* S3 Static Website Hosting
* VPC Interface Endpoints
* Global Accelerator
* Route 53 records ใน hosted zone เดียวกัน

> ❌ ข้อจำกัด: Alias record **ไม่สามารถชี้ไปยัง EC2 DNS Name ได้**

## Hands-On: การสร้าง CNAME และ Alias Records

**ตัวอย่าง CNAME Record**

* สร้าง record: `myapp.stephanetheteacher.com`
* เลือก record type = **CNAME**
* Value = DNS Name ของ Application Load Balancer (ALB)
* จากนั้นเข้าผ่าน `myapp.stephanetheteacher.com` → จะ redirect ไปที่ ALB และตอบกลับ (เช่น "Hello World")

ข้อเสีย: เป็นวิธีที่ไม่ native ของ AWS และมีข้อจำกัด

**ตัวอย่าง Alias Record**

* สร้าง record: `myalias.stephanetheteacher.com`
* Record type = **A**
* เลือก "Alias" และเลือกเป้าหมายเป็น ALB
* Route 53 จะ evaluate health ของ target ให้อัตโนมัติ
* ฟรีค่าบริการ และทำงานเหมือน CNAME แต่มีประสิทธิภาพกว่า

## จัดการ Domain Apex ด้วย Alias

* หากต้องการ map **root domain** (`stephanetheteacher.com`) → ALB
* จะ **ไม่สามารถใช้ CNAME ได้** (DNS มาตรฐานไม่อนุญาต)
* ถ้าลองสร้างจะเจอ error: *"CNAME is not permitted at apex of this zone."*
* วิธีแก้: ใช้ **Alias Record แบบ A** ที่ root domain ชี้ไปยัง ALB
* เมื่อสร้างเสร็จ → `stephanetheteacher.com` จะชี้ไปที่ ALB ได้สำเร็จ

## สรุป

* CNAME: ใช้ชี้ hostname ไปยัง hostname อื่น แต่ **ใช้ไม่ได้ที่ root domain**
* Alias: เป็นฟีเจอร์ของ Route 53 → ใช้ชี้ไปยัง AWS Resources ได้โดยตรง (รวม root domain ด้วย)
* Alias: ฟรี, รองรับ health check, อัปเดตอัตโนมัติเมื่อ resource เปลี่ยนแปลง
* Alias รองรับ ELB, CloudFront, API Gateway, S3 Website และอีกมากมาย แต่ **ไม่รองรับ EC2 DNS Name**

## Key Takeaways

* **CNAME:** ชี้ hostname → hostname อื่น / ❌ ใช้ไม่ได้กับ root domain
* **Alias:** ฟีเจอร์ Route 53 / ✅ ใช้ได้กับทั้ง root และ non-root domains
* **Alias:** ฟรี, มี health check ในตัว
* **Alias:** รองรับหลาย AWS Resources (เช่น ELB, CloudFront, API Gateway ฯลฯ)
* **Alias:** ❌ ใช้กับ EC2 DNS Name ไม่ได้