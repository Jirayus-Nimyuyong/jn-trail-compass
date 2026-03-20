# Amazon CloudFront Cheat Sheet

**Amazon CloudFront** เป็นเครือข่ายนำส่งข้อมูลระดับโลก (Content Delivery Network - CDN) ที่ช่วยเร่งการกระจายเนื้อหาเว็บทั้งแบบ Static, Dynamic และ Streaming ผ่านเครือข่าย **Edge Locations** ทั่วโลก โดย CloudFront จะเราต์ผู้ใช้ไปยัง Edge Location ที่มีความหน่วง (Latency) ต่ำที่สุดเพื่อประสิทธิภาพสูงสุด

**จุดเด่นที่สำคัญ:**
* เร่งการส่งข้อมูลทั้งแบบนิ่ง (Static) และแบบเคลื่อนไหว (Dynamic)
* รองรับโปรโตคอล HTTP, HTTPS, WebSocket และ gRPC
* มี **Regional Edge Caches** สำหรับเนื้อหาที่ไม่ค่อยได้รับความนิยม
* ทำงานร่วมกับ Lambda@Edge, CloudFront Functions, MediaPackage, และอื่น ๆ
* เป็นบริการที่รองรับมาตรฐาน HIPAA
* รองรับ TLS 1.2, 1.3 รวมถึงอัลกอริทึมการแลกเปลี่ยนคีย์แบบ Post-quantum
* จ่ายตามการใช้งานจริง (Pay-per-use) พร้อมแผนราคาแบบเหมาจ่าย (Flat-rate)

---

## วิธีที่ CloudFront นำส่งเนื้อหา
1.  **Origin Servers:** แหล่งเก็บข้อมูลต้นทาง เช่น S3 Bucket, ALB, Lambda URL หรือเซิร์ฟเวอร์ HTTP ส่วนตัว
2.  **Distributions:** การตั้งค่าที่ระบุว่า CloudFront จะใช้ต้นทางไหนและนำส่งข้อมูลอย่างไร
3.  **Edge Locations:** CloudFront จะแคช (Cache) เนื้อหาไว้ที่ตำแหน่ง Edge ทั่วโลก
4.  **Routing:** คำขอของผู้ใช้จะวิ่งไปที่ Edge Location ที่มีความหน่วงต่ำที่สุด



---

## คุณสมบัติ (Features)

### 1. การนำส่งเนื้อหาและการทำแคช (Caching)
* วัตถุจะถูกแคชไว้ 24 ชั่วโมงเป็นค่าเริ่มต้น (ปรับแต่งได้ผ่าน TTLs)
* สามารถทำ **Cache Invalidation** (ล้างแคช) ก่อนหมดอายุได้
* รองรับการทำแคชตาม Query String และ Header
* บีบอัดไฟล์อัตโนมัติ (gzip) และมีระบบ **Origin Groups** เพื่อทำ Failover (สำรองข้อมูล)

### 2. การจัดการทราฟฟิกและการเข้าถึง
* **Cache Behaviors:** กำหนดพฤติกรรมตามเส้นทาง (Path), บังคับใช้ HTTPS, และใช้ Signed URLs/Cookies
* **Networking:** รองรับ Anycast Static IPs, Dual-stack IPv4/IPv6, และการแชร์ VPC Origin ข้ามบัญชี
* **TLS & Protocols:** รองรับ TLS เวอร์ชันล่าสุดและอัลกอริทึมการเข้ารหัสขั้นสูง

### 3. การปรับแต่งและการประมวลผลที่ Edge (Edge Compute)
* **Lambda@Edge:** ปรับแต่งคำขอ/การตอบกลับ และรองรับ Node.js 22 / Python 3.13
* **CloudFront Functions:** ทำงานที่ Edge ได้อย่างรวดเร็ว (Lightweight) รองรับ CWT (CBOR Web Tokens) และการเปลี่ยนค่า Origin (Origin Overrides)
* **Media Quality-Aware Resiliency (MQAR):** เลือกต้นทางวิดีโอที่มีคุณภาพดีที่สุดโดยอัตโนมัติ

---

## การตรวจสอบและติดตาม (Monitoring)
* **รายงานการเรียกเก็บเงินและการใช้งาน:** ดูภาพรวมกิจกรรมผ่านกราฟเปรียบเทียบรายชั่วโมง/วัน/เดือน
* **สถิติในคอนโซล:** ดูสถิติแคช, วัตถุยอดนิยม, ผู้เข้าชม และตัวอ้างอิง (Referrers)
* **Amazon CloudWatch:** ติดตามจำนวนคำขอ, ความหน่วง, อัตราข้อผิดพลาด และการจำกัด (Throttling)
* **Headers พิเศษ:** `Server-Timing` (วัดประสิทธิภาพ) และ `CloudFront-Viewer-TLS` (ดูเวอร์ชัน TLS)

---

## ความปลอดภัย (Security)
* **การป้องกันแบบหลายชั้น:** CloudFront + AWS Shield + AWS WAF + Route 53 (ป้องกัน DDoS ทั้งระดับเครือข่ายและแอปพลิเคชัน)
* **Geo-restriction:** จำกัดการเข้าถึงตามประเทศ (Allowlist/Blocklist)
* **การควบคุมการเข้าถึง:** ใช้ **OAC** (Origin Access Control) สำหรับ S3 และ Lambda URL, และรองรับ **Mutual TLS** (การยืนยันตัวตนผู้เข้าชม)
* **Field-Level Encryption:** เข้ารหัสข้อมูลที่ละเอียดอ่อนเฉพาะฟิลด์

---

## กรณีการใช้งาน (Use Cases)
* ลดภาระการดูแลระบบผ่านคอนโซลกลางและการตั้งค่าที่นำกลับมาใช้ใหม่ได้
* เพิ่มประสิทธิภาพด้วย Edge Caching และการเราต์แบบอัจฉริยะ
* ปกป้องเนื้อหา, API และแอปพลิเคชันด้วยความปลอดภัยหลายชั้น
* นำส่งสื่อวิดีโอคุณภาพสูงด้วยระบบ Failover และ MQAR

---

## ค่าบริการ (Pricing)
* ค่าพื้นที่จัดเก็บใน S3 Bucket
* ค่าบริการส่งข้อมูลออกจาก Edge Locations (Data Transfer Out)
* จำนวนคำขอ HTTP/HTTPS
* คำขอทำ Invalidation (ล้างแคช)
* ค่าบริการเสริมสำหรับ Dedicated IP SSL หรือ Field-level encryption

---

## การปฏิบัติตามข้อกำหนด (Compliance)
* ผ่านการตรวจสอบมาตรฐาน PCI DSS, HIPAA, และ SOC