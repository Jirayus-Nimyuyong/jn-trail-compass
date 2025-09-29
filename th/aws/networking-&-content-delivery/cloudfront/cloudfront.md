# Amazon CloudFront

Amazon CloudFront คือบริการ Content Delivery Network (CDN) ของ AWS ที่ช่วยเร่งความเร็วในการส่งเนื้อหา (Content) ให้กับผู้ใช้งาน โดยกระจายเนื้อหาผ่าน Edge Location ที่อยู่ทั่วโลก

มันช่วยปรับปรุงประสิทธิภาพการอ่าน (read performance) โดยการ **แคช (cache)** เนื้อหาของเว็บไซต์ไว้ที่ **Edge Location** หลายแห่งทั่วโลก ทำให้ผู้ใช้เข้าถึงเนื้อหาได้รวดเร็วขึ้นด้วย **latency ที่ต่ำลง** และประสบการณ์ใช้งานที่ดีขึ้น

CloudFront ประกอบไปด้วย **จุดให้บริการ (Points of Presence: PoP)** จำนวนหลายร้อยแห่งทั่วโลก ซึ่งรวมทั้ง Edge Location และ Cache

## Edge Locations และการป้องกัน DDoS

การที่กระจายเนื้อหาทั่วโลกยังช่วย **ป้องกันการโจมตีแบบ DDoS** ได้อีกด้วย

* **DDoS Attack** คือการที่เซิร์ฟเวอร์ถูกโจมตีพร้อมกันจากหลาย ๆ ที่ทั่วโลก
* CloudFront จะช่วยลดความเสี่ยงนี้ด้วยการกระจายโหลดทั่วโลก
* นอกจากนี้ยังใช้บริการด้านความปลอดภัยเพิ่มเติม เช่น **AWS Shield** และ **Web Application Firewall (WAF)**

## ตัวอย่าง: S3 เป็น Origin และผู้ใช้ทั่วโลก

สมมติว่าเรามี **S3 Bucket** และโฮสต์เว็บไซต์ไว้ที่ออสเตรเลีย แต่มีผู้ใช้จากอเมริกา

* ผู้ใช้จะเรียกข้อมูลจาก **Edge Location ในอเมริกา** ผ่าน CloudFront
* ครั้งแรก Edge จะไปดึงข้อมูลจาก S3 ที่ออสเตรเลีย
* ครั้งต่อไปที่มีผู้ใช้อเมริกาขอข้อมูลเดียวกัน Edge ก็สามารถ **ส่งจากแคชได้เลย** ไม่ต้องย้อนกลับไปที่ออสเตรเลีย

ถ้ามีผู้ใช้อยู่ที่จีน ก็จะไปที่ **Point of Presence ในจีน** และข้อมูลจะถูกแคชไว้ใกล้ผู้ใช้นั้นเช่นกัน

## วิธีทำงานของ CloudFront (มุมมองระดับสูง)

1. ผู้ใช้ (Client) ส่ง HTTP Request มาที่ **Edge Location**
2. **Edge Location ตรวจสอบ Cache** ว่ามีไฟล์อยู่แล้วหรือไม่

   * ถ้ามี → ส่งไฟล์จาก Cache ได้เลย
   * ถ้าไม่มี → ไปดึงไฟล์จาก **Origin** เช่น S3 หรือ HTTP Server
3. เมื่อได้ไฟล์แล้ว Edge จะ **เก็บใน Cache** เพื่อให้ผู้ใช้ถัดไปเข้าถึงได้เร็วขึ้น

ตัวอย่าง:

* ถ้า Origin อยู่ใน S3 ที่สิงคโปร์
* ผู้ใช้ที่ Los Angeles จะเข้าผ่าน Edge ในอเมริกา
* Edge จะดึงไฟล์จาก S3 (ผ่านเครือข่ายส่วนตัวและ OAC) และเก็บไฟล์นั้นไว้ใน Cache

## Origins — แหล่งข้อมูลสำหรับ CloudFront

CloudFront รองรับหลายประเภทของ **Origin** (แหล่งข้อมูล):

* **Amazon S3** → ใช้สำหรับแจกจ่ายไฟล์ พร้อมเชื่อมต่อผ่าน **Origin Access Control (OAC)** เพื่อความปลอดภัย
* **VPC Origins** → เช่น **ALB, NLB, หรือ EC2** ที่อยู่ใน Private Subnet
* **Custom HTTP Origin** → อะไรก็ตามที่รองรับ HTTP เช่นเว็บไซต์ที่เปิดผ่าน S3 (static website hosting) หรือเว็บสาธารณะนอก AWS

## CloudFront vs S3 Cross Region Replication

**CloudFront**

* ใช้เครือข่าย Edge ทั่วโลก (กว่า 216 จุด)
* ไฟล์ที่แคชจะเก็บไว้ใน Edge ชั่วคราว เช่น 1 วัน
* เหมาะกับ **Static Content** ที่ต้องการกระจายไปทั่วโลก

**S3 Cross Region Replication (CRR)**

* ต้องกำหนด Region ที่ต้องการ Replicate ด้วยตัวเอง
* ไฟล์ถูก Replicate แบบ **เกือบ real-time**
* ไม่มีการ Cache → ข้อมูลถูกคัดลอกเป็น **read-only copies**
* เหมาะกับ **Dynamic Content** ที่เปลี่ยนบ่อย และต้องการให้ใช้ได้เร็วใน Region ที่เลือกไว้เท่านั้น

## องค์ประกอบของ CloudFront

## CloudFront

* เป็นบริการ CDN ที่กระจาย Static และ Dynamic Content เช่น HTML, CSS, JavaScript, รูปภาพ, API response
* รองรับ HTTPS, Caching, Compression และ Security แบบครบวงจร
* ทำงานร่วมกับ S3, EC2, Elastic Load Balancer, API Gateway และบริการอื่น ๆ

## Distributions

* Distribution คือการตั้งค่า CloudFront สำหรับการกระจายเนื้อหา
* แบ่งเป็น 2 ประเภท:

  * **Web**: ใช้สำหรับเว็บไซต์ปกติ
  * **RTMP (Deprecated)**: สำหรับ streaming media (เลิกใช้แล้ว)
* ต้องกำหนด Origin (ที่มาของเนื้อหา) และ Behavior (พฤติกรรมการตอบสนอง)

## Policies

* ใช้ควบคุมการเข้าถึง (Cache Policy, Origin Request Policy, Response Headers Policy)
* สามารถใช้ร่วมกับ Lambda\@Edge หรือ CloudFront Functions ได้

## Functions

* CloudFront Functions ใช้รันโค้ด JavaScript ที่ Edge Location สำหรับแปลง Request/Response
* เบากว่า Lambda\@Edge แต่เหมาะกับงานง่าย ๆ เช่น URL rewrites หรือ header injection

## Static IPs

* CloudFront โดยปกติใช้ IP แบบ Dynamic (เปลี่ยนแปลงได้)
* แต่สามารถใช้ร่วมกับ AWS Global Accelerator เพื่อได้ IP แบบคงที่ (Static IP)

## VPC Origins

* CloudFront สามารถเข้าถึง Origin ที่อยู่ใน VPC ได้ผ่าน PrivateLink หรือ VPC Link (สำหรับ API Gateway)

## SaaS

* SaaS Providers ใช้ CloudFront ในการกระจาย multi-tenant application

## Multi-tenant Distributions

* คือการใช้ CloudFront เดียวกันรองรับลูกค้าหลายราย
* จัดการ access, cache และ logging แบบแยกลูกค้าได้ด้วย header, path, หรือ host-based routing

## Distribution Tenants

* แต่ละ tenant (ลูกค้า) อาจมี behavior หรือ origin ของตนเองภายใต้ Distribution เดียว
* ใช้ path pattern หรือ custom header เพื่อแยก tenant

## Telemetry

* CloudFront มีระบบ telemetry (การวัดค่าต่าง ๆ) สำหรับ performance และ security

## Monitoring

* รองรับ CloudWatch สำหรับดู Metrics ต่าง ๆ เช่น Request Count, Latency, Error Rate

## Alarms

* สามารถตั้งค่า Alarm เมื่อ Request Rate หรือ Error Rate สูงผิดปกติ

## Logs

* Access Logs สามารถเก็บไว้ใน S3 เพื่อวิเคราะห์ย้อนหลัง
* รองรับการเชื่อมกับ Athena, QuickSight, หรือ CloudWatch Logs

## Reports & Analytics

* มีรายงานด้าน performance, usage และ geographic location
* สามารถใช้ร่วมกับ CloudWatch Dashboard

## Cache Statistics

* รายงานการ hit/miss, cache TTL และ object usage

## Popular Objects

* แสดงรายการ object ที่ถูกเรียกใช้บ่อยที่สุด

## Top Referrers

* บอกว่ามี traffic มาจาก domain ไหนบ้าง

## Usage

* รายงาน bandwidth, data transfer, request count รายวัน/เดือน

## Viewers

* วิเคราะห์ประเภทของผู้ใช้งาน เช่น browser, device type, location

## Security

### Origin Access

* ป้องกันไม่ให้เข้าถึง S3 โดยตรง
* ใช้ **Origin Access Identity (OAI)** หรือ **Origin Access Control (OAC)** เพื่อควบคุมสิทธิ์

### Field-level Encryption

* เข้ารหัสข้อมูลเฉพาะฟิลด์ที่ sensitive เช่น credit card หรือข้อมูลส่วนตัว
* ทำงานร่วมกับ public key และ field pattern

### Key Management

* ใช้ AWS KMS หรือระบบ key management อื่น ๆ สำหรับจัดการ key ที่ใช้ในการเข้ารหัส

### Public Keys

* สำหรับ Field-level Encryption หรือใช้กับ Signed URLs/Signed Cookies

### Key Groups

* กลุ่มของ public keys เพื่อให้จัดการง่ายในการใช้ร่วมกับหลาย distribution

## Savings Bundle

* เป็น package แบบ commit usage ล่วงหน้าเพื่อประหยัดค่าใช้จ่าย CloudFront และ AWS Shield

## Inventory

* ดูรายการ distribution และ resource ที่เชื่อมโยง เช่น origin, policy, function

## Purchase

* การซื้อ Savings Bundle หรือบริการเสริมผ่าน Cost Explorer หรือ Billing Dashboard