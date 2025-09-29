# Route 53 – Health Checks

Route 53 Health Checks ช่วยให้คุณ **ตรวจสอบสถานะสุขภาพของ Resource สาธารณะเป็นหลัก**

* แต่ก็สามารถตรวจสอบ **Resource ส่วนตัว** ได้เช่นกัน
* ตัวอย่างเช่น: มี **Load Balancer สาธารณะ 2 ตัว** ในสองภูมิภาค

  * แอปพลิเคชันของเราทำงานในทั้งสองภูมิภาค → เพื่อให้มี **High Availability ระดับภูมิภาค**
* เราใช้ Route 53 สร้าง DNS Records

  * เช่น ผู้ใช้เข้าถึง `mydomain.com` → ถูกส่งไปยัง Load Balancer ที่ใกล้ที่สุด
  * ใช้ **Latency-based Record**

**ปัญหา:** หากภูมิภาคใดล่ม

* เราไม่ต้องการให้ผู้ใช้ถูกส่งไปยังภูมิภาคนั้น
* **วิธีแก้:** สร้าง Health Checks ใน Route 53 สำหรับแต่ละภูมิภาค (เช่น `us-east-1` และ `eu-west-1`)
* Health Checks เหล่านี้เชื่อมกับ DNS Record เพื่อให้ **DNS Failover อัตโนมัติ** → Traffic จะไปที่ Resource ที่ Healthy เท่านั้น

## **ประเภทของ Route 53 Health Checks**

1. **Endpoint Health Checks:** ตรวจสอบ Resource สาธารณะ เช่น แอปพลิเคชัน เซิร์ฟเวอร์ หรือ AWS Resource
2. **Calculated Health Checks:** ตรวจสอบหลาย Health Checks พร้อมกัน และรวมผลลัพธ์
3. **CloudWatch Alarm Health Checks:** ตรวจสอบ Alarm ของ CloudWatch → ใช้สำหรับ Resource ส่วนตัว

> Health Checks แต่ละแบบมี **Metric** ของตัวเอง → ดูได้ใน CloudWatch

## **การทำงานของ Endpoint Health Checks**

* ตัวอย่าง: Health Check ของ **ALB** ใน `eu-west-1`
* AWS Health Checkers ประมาณ 15 ตัว **กระจายทั่วโลก** → ส่ง request ไปยัง endpoint สาธารณะที่กำหนด
* หากได้รับ **200 OK** หรือ success code ที่กำหนด → Resource ถือว่า **Healthy**

**การตั้งค่าเพิ่มเติม:**

* กำหนด **threshold** และ **interval**

  * ปกติ 30 วินาที, แบบเร็ว 10 วินาที (ค่าใช้จ่ายสูงกว่า)
* รองรับ **HTTP, HTTPS, TCP**
* หาก **Health Checker > 18 ตัว** รายงาน Healthy → Route 53 ถือ Resource Healthy
* สามารถเลือก **ภูมิภาคที่ Health Checkers ออกจาก**
* ตรวจสอบ **5,120 bytes แรก** ของ response เพื่อค้นหา **text string**

**ข้อสำคัญ:**

* Health Checkers ต้องเข้าถึง Resource ได้ → ต้องอนุญาต **IP ของ Route 53 Health Checkers**

## **Calculated Health Checks**

* รวมผลของหลาย Health Checks เป็น Health Check เดียว
* ตัวอย่าง: มี 3 EC2 → สร้าง **Child Health Checks** 3 ตัว
* สร้าง **Parent Health Check**

  * ใช้เงื่อนไข **OR, AND, NOT** เพื่อกำหนดสถานะ
  * สามารถตรวจสอบ **Child Health Checks สูงสุด 256 ตัว**
  * กำหนดจำนวนที่ต้อง Healthy → Parent ถือ Healthy
* ใช้ในกรณี เช่น ทำ Maintenance โดยไม่ให้ Health Check ทั้งหมดล้ม

## **ตรวจสอบ Resource ส่วนตัว**

* Health Check ของ Route 53 ใช้ **อินเทอร์เน็ตสาธารณะ** → เข้าถึง Resource ใน VPC หรือ On-premise ไม่ได้
* วิธีแก้:

  1. สร้าง **CloudWatch Metric** สำหรับ Resource
  2. สร้าง **CloudWatch Alarm** จาก Metric
  3. เชื่อม Alarm กับ **Route 53 Health Check**
* ตัวอย่าง: ตรวจสอบ EC2 ใน **Private Subnet**

  * หาก Metric เกิน Threshold → Alarm → Health Check จะเป็น **Unhealthy**

> วิธีนี้ช่วยให้สามารถตรวจสอบ Resource ส่วนตัวได้

## **สรุป**

* Route 53 Health Checks ช่วยตรวจสอบ **Resource สาธารณะและส่วนตัว**
* ทำให้ **DNS Failover อัตโนมัติ**
* ประเภท Health Checks: **Endpoint, Calculated, CloudWatch Alarm**
* Endpoint Health Check → ตรวจสอบ Resource ผ่าน HTTP/HTTPS/TCP ด้วย Health Checkers ทั่วโลก
* Resource ส่วนตัว → ใช้ CloudWatch Metric + Alarm

### **Key Takeaways**

* Health Checks → ตรวจสอบสุขภาพ Resource เพื่อให้ **DNS Failover อัตโนมัติ**
* มี 3 ประเภท:

  1. Endpoint Health Check
  2. Calculated Health Check
  3. CloudWatch Alarm Health Check
* Endpoint Health Check → ใช้ Health Checkers ทั่วโลก ตรวจสอบ HTTP/HTTPS/TCP
* Resource ส่วนตัว → เชื่อม CloudWatch Metrics + Alarm