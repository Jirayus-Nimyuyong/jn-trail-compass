# Gateway Load Balancer (GWLB)

* **Gateway Load Balancer (GWLB)** เป็น **Load Balancer รุ่นใหม่ล่าสุด**
* ใช้สำหรับ **deploy, scale, และจัดการกลุ่มอุปกรณ์เครือข่ายของผู้ให้บริการภายนอก (third-party appliances) ใน AWS**
* เหมาะกับกรณีที่ต้องการให้ **ทุก traffic ผ่านระบบ firewall, IDPS (Intrusion Detection/Prevention System), หรือ Deep Packet Inspection**
* หรือกรณีที่ต้องการ **ปรับเปลี่ยน payload บนระดับ network**

## การไหลของ traffic โดยไม่ใช้ GWLB

* ผู้ใช้เข้าถึงแอปโดยตรงผ่าน **Load Balancer เช่น ALB**
* Traffic ไหลตรงจากผู้ใช้ → ALB → Application

## การไหลของ traffic เมื่อใช้ GWLB

* ถ้าต้องการให้ **ทุก traffic ถูกตรวจสอบก่อนเข้าถึงแอป** → ใช้ GWLB
* วิธีทำงาน:

  1. สร้าง **Gateway Load Balancer**
  2. **Route Table ใน VPC** จะอัปเดตให้ traffic ต้องผ่าน GWLB ก่อน
  3. GWLB กระจาย traffic ไปยัง **Target Group ของ Virtual Appliances**
  4. Virtual Appliances ตรวจสอบ traffic (เช่น Firewall หรือ IDPS)

     * ถ้า traffic ผ่าน → ส่งกลับไปยัง GWLB → GWLB ส่งต่อไปยังแอป
     * ถ้า traffic ไม่ผ่าน → สามารถทิ้ง traffic ได้
* กระบวนการทั้งหมด **โปร่งใสต่อแอป**

## สรุปการทำงานของ GWLB

* **Gateway โปร่งใส** → Traffic ทั้งหมดใน VPC ผ่านจุดเข้า-ออกเดียวคือ GWLB
* **ทำหน้าที่เหมือน Load Balancer** → กระจาย traffic ไปยัง Virtual Appliances ใน Target Group
* ทำงานที่ **Layer 3 (Network Layer)** สำหรับ **IP Packets**
* ใช้ **โปรโตคอล GENEVE** บน **Port 6081** สำหรับ Encapsulate traffic

## Target Groups ของ GWLB

* ประกอบด้วย **Third-Party Appliances**

  * EC2 Instances (ลงทะเบียนด้วย Instance ID)
  * หรือ Private IP (สำหรับ Appliances ในเครือข่ายภายในหรือ On-Premises)

## ข้อควรพิจารณา

* การตั้งค่า **GWLB แบบ Hands-on** ทำได้ยาก
* สิ่งสำคัญคือ **เข้าใจแนวคิดและ flow ของ GWLB**
* สำหรับสอบ → เน้น **ความเข้าใจในภาพรวมและหลักการทำงาน**

## Key Takeaways

* GWLB ใช้สำหรับ **deploy, scale, และจัดการกลุ่มอุปกรณ์เครือข่ายของ third-party ใน AWS**
* ช่วยให้ **ทุก traffic ถูกตรวจสอบโดย virtual appliances** ก่อนเข้าถึงแอป
* ทำงานที่ **Network Layer (Layer 3)** → เป็น **gateway โปร่งใสและ load balancer**
* ใช้ **GENEVE protocol บน Port 6081**
* Target Groups รองรับ **EC2 Instances** หรือ **Private IP Addresses**