# Amazon CloudFront

Amazon CloudFront คือบริการ Content Delivery Network (CDN) ของ AWS ที่ช่วยเร่งความเร็วในการส่งเนื้อหา (Content) ให้กับผู้ใช้งาน โดยกระจายเนื้อหาผ่าน Edge Location ที่อยู่ทั่วโลก

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