# Amazon API Gateway Cheat Sheet

**Amazon API Gateway** เป็นบริการที่มีการจัดการเต็มรูปแบบ (Fully Managed) สำหรับการสร้าง, เผยแพร่, ดูแลรักษา, รักษาความปลอดภัย และปรับขนาด API ทั้งในรูปแบบ REST, HTTP และ WebSocket ทำหน้าที่เป็นจุดทางเข้า (Entry Point) สำหรับเวิร์กโหลดที่เป็น Serverless, Container, On-premises และ Hybrid

**จุดเด่นที่สำคัญ:**
* เป็นบริการที่รองรับมาตรฐาน HIPAA
* ให้บริการผ่านเอนด์พอยต์ HTTPS เท่านั้น
* จ่ายตามการใช้งานจริง (Pay-per-use)
* เชื่อมต่ออย่างใกล้ชิดกับ AWS Lambda และบริการอื่น ๆ ของ AWS

---

## แนวคิดหลัก (Concepts)

### 1. API Deployment
* เป็นการบันทึกสถานะทรัพยากร (Resources) และเมธอด (Methods) ของ API ณ เวลาใดเวลาหนึ่ง (Snapshot)
* ต้องเชื่อมโยงกับ API Stage อย่างน้อยหนึ่งขั้นเพื่อให้สามารถเรียกใช้งานได้

### 2. API Endpoint
* ชื่อโฮสต์ (Hostname) สำหรับเรียกใช้งาน API
* รูปแบบ: `https://{rest-api-id}.execute-api.{region}.amazonaws.com`

### 3. API Key
* รหัสระบุตัวตน (Alphanumeric) สำหรับไคลเอนต์ของ API
* ใช้ร่วมกับ Usage Plans เพื่อบังคับใช้การจำกัดปริมาณการเรียกใช้งาน (Throttling) และโควตา (Quotas)

### 4. API Stage
* การอ้างอิงเชิงตรรกะถึงสถานะวงจรชีวิตของ API (เช่น dev, test, prod)
* ระบุด้วย API ID + ชื่อ Stage

### 5. Model
* กำหนดโครงสร้างข้อมูล (Schema) สำหรับตรวจสอบความถูกต้องของข้อมูลที่ส่งมา (Payload validation) ทั้งฝั่ง Request และ Response

### 6. Private API
* เปิดให้เข้าถึงผ่าน Interface VPC Endpoints เท่านั้น
* แยกตัวออกจากอินเทอร์เน็ตสาธารณะโดยสิ้นเชิง
* รองรับการตั้งชื่อโดเมนแบบกำหนดเอง (Custom domain names)

---

## การเชื่อมต่อ (Integrations)

### Private Integration
* ช่วยให้ API Gateway เข้าถึงทรัพยากรภายใน VPC ของลูกค้าได้
* ไม่มีการเปิดเผยต่ออินเทอร์เน็ตสาธารณะ
* รองรับ Application Load Balancer (ALB) สำหรับ REST APIs



### Proxy Integration
* ช่วยให้การเชื่อมต่อหลังบ้านง่ายขึ้นโดยการส่งต่อคำขอ (Request) ทั้งหมดไปที่หลังบ้าน
* **HTTP Proxy Integration:** ส่งต่อทั้ง Request และ Response ระหว่างไคลเอนต์และ HTTP Backend
* **Lambda Proxy Integration:** ส่งคำขอทั้งหมดเป็น Input ให้กับฟังก์ชัน Lambda โดยที่ฟังก์ชันจะเป็นผู้ควบคุมรูปแบบการตอบกลับ (Response)

---

## แผนการใช้งาน (Usage Plans)
กำหนดสิทธิ์การเข้าถึง API ที่เผยแพร่แล้วให้กับกลุ่มลูกค้าที่เลือก โดยสามารถบังคับใช้:
* **Request Throttling:** จำกัดจำนวนคำขอต่อวินาที (RPS) และช่วงกระชาก (Burst)
* **Quota Limits:** จำกัดจำนวนครั้งรวมที่ใช้ได้ต่อช่วงเวลา
* โดยจะนำไปปรับใช้เป็นราย **API Key**

---

## ประเภทของ API Endpoint
1. **Edge-Optimized Endpoint:** (ค่าเริ่มต้น) ใช้ Amazon CloudFront เพื่อส่งต่อคำขอไปยังจุด Edge ที่ใกล้ที่สุด เหมาะสำหรับการเข้าถึงจากทั่วโลก
2. **Regional Endpoint:** เข้าถึง Region ของ AWS โดยตรง ไม่ผ่าน CloudFront (โดยค่าเริ่มต้น) เหมาะสำหรับการเข้าถึงภายใน Region เดียวกันและรองรับการทำ Latency-based routing
3. **Private Endpoint:** เข้าถึงได้เฉพาะจากภายใน VPC เท่านั้น โดยทราฟฟิกจะไม่ไหลออกไปยังอินเทอร์เน็ตสาธารณะ

---

## คุณสมบัติเด่น (Features)
* **เป้าหมายการเรียกใช้งาน (Invocation Targets):** รองรับ Lambda, Step Functions, EventBridge, SQS, Kinesis, EC2 และ HTTP Endpoints อื่น ๆ
* **การจัดการทราฟฟิก:** มีระบบ Throttling ในระดับเมธอด
* **การทำแคช (Caching):** สามารถตั้งค่า Cache Keys และ TTL เพื่อลดภาระของระบบหลังบ้าน
* **วงจรชีวิต API:** สามารถรัน API หลายเวอร์ชันพร้อมกันได้ และรองรับการ Deploy แบบ Canary เพื่อการทดสอบ
* **การสร้างรายได้:** แพ็ก API รวมใน Usage Plans และขายเป็น SaaS ผ่าน AWS Marketplace
* **การจัดการ Response:** REST APIs รองรับการส่งข้อมูลแบบ Streaming และมีกฎการเราต์ (Routing rules) ตาม Header หรือ URL Path

---

## HTTP APIs (รุ่นปรับปรุงใหม่)
ออกแบบมาเพื่อความหน่วงต่ำ (Low Latency) และต้นทุนที่ถูกลง (ถูกกว่า REST APIs สูงสุดถึง 71%)
* รองรับการเราต์ไปที่: Private ELBs, AppConfig, EventBridge, Step Functions, Kinesis, SQS
* รองรับบริการที่เป็น IP-based ผ่าน AWS Cloud Map

---

## การรักษาความปลอดภัย (Authentication & Protection)
* **การยืนยันตัวตน:** รองรับ IAM (SigV4), Lambda Authorizers, Amazon Cognito User Pools และ Mutual TLS (mTLS)
* **การป้องกัน:** เชื่อมต่อกับ AWS WAF, Resource Policies และ VPC Endpoint Policies
* **ความปลอดภัยในการขนส่ง:** รองรับ TLS 1.2 และ 1.3

---

## การตรวจสอบและการบันทึก Log (Monitoring & Logging)
* **Amazon CloudWatch:** ติดตามจำนวนการเรียกใช้งาน, ความหน่วง (Latency) และอัตราข้อผิดพลาด (4XX / 5XX)
* **Logging:** บันทึกทั้ง Execution logs และ Access logs
* **Tracing:** ใช้ AWS X-Ray เพื่อดูเส้นทางการทำงานของคำขอแบบครบวงจร

---

## ค่าบริการ (Pricing)
* จ่ายตามจำนวนครั้งที่มีการเรียกใช้งาน API และปริมาณการถ่ายโอนข้อมูลออก (Data Transfer Out)
* มีค่าบริการเพิ่มเติมสำหรับระบบแคช (คิดตามรายชั่วโมงและขนาดแคช)
* **Free Tier:** ฟรี 1 ล้านคำขอต่อเดือน เป็นเวลา 12 เดือนแรก
* HTTP APIs มีราคาประหยัดกว่า REST APIs สูงสุด 71%