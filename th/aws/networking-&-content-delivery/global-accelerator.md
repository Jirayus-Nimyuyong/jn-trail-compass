# AWS Global Accelerator 

**AWS Global Accelerator** คือบริการ **เครือข่ายความเร็วสูง (high-performance network service)** ที่ช่วยให้คุณปรับปรุง **ความพร้อมใช้งาน (availability)** และ **ประสิทธิภาพ (performance)** ของแอปพลิเคชันที่ใช้งานผ่านอินเทอร์เน็ต โดยใช้ **เครือข่ายระดับโครงสร้างพื้นฐานของ AWS (AWS Global Network)**

> โดยสรุป: **Global Accelerator** จะให้ **Static IP Address แบบ Global** สำหรับเข้าถึงบริการของคุณ และทำหน้าที่เป็น **entry point ที่ใกล้ผู้ใช้งานมากที่สุด** แล้วส่งต่อ request ผ่าน **เครือข่าย AWS ที่มี latency ต่ำ** ไปยังปลายทางจริง (เช่น EC2, ALB, NLB)

---

## องค์ประกอบของ Global Accelerator

### **Accelerator**

* คือสิ่งที่ผู้ใช้งานสร้างขึ้นเพื่อใช้เร่งความเร็วให้กับแอป
* ประกอบด้วย static IP สองชุด (เพื่อความ redundancy)
* ทำหน้าที่รับ request จากผู้ใช้ แล้วส่งผ่านไปยัง endpoint ที่เหมาะสมที่สุด

### **Listeners**

* ระบุพอร์ตที่ Accelerator จะรับ traffic เช่น TCP/UDP บนพอร์ต 80 หรือ 443
* คล้ายกับ listener ของ Load Balancer

### *Endpoint Groups**

* เป็นการกำหนด **AWS Region** ปลายทาง (เช่น us-east-1, ap-southeast-1)
* แต่ละ Region มี weight และ health check ของตัวเอง
* Endpoint Group จะรวม endpoint หลาย ๆ ตัวเข้าด้วยกัน

### **Endpoints**

* คือทรัพยากรที่รับ traffic จริง เช่น:

  * **Elastic IP (EC2)**
  * **Application Load Balancer (ALB)**
  * **Network Load Balancer (NLB)**
  * **Amazon EC2 Instance (เฉพาะแบบ Public IP)**
  * **Elastic IP address ใน on-prem ผ่าน Direct Connect**

---

## การทำงานเบื้องหลัง

1. ผู้ใช้งานจากประเทศใดก็ตามจะถูก route ไปยัง **AWS edge location** ที่ใกล้ที่สุด
2. Accelerator จะใช้ **Anycast** เพื่อให้ IP เดียวสามารถ route ไปได้หลาย edge
3. Request จะถูกส่งผ่านเครือข่าย AWS โดยตรง (แทนการใช้อินเทอร์เน็ตสาธารณะ)
4. Global Accelerator จะเลือก Region และ Endpoint ที่ **สุขภาพดีที่สุด** และ **เร็วที่สุด**

---

## ประโยชน์ของ AWS Global Accelerator

| คุณสมบัติ                   | รายละเอียด                                                   |
| --------------------------- | ------------------------------------------------------------ |
| **Static Global IPs**       | ใช้ IP เดียวสำหรับแอปทุกภูมิภาค ลดความซับซ้อนในการจัดการ DNS |
| **Latency-based Routing**   | เลือกเส้นทางที่เร็วที่สุดผ่านเครือข่าย AWS                   |
| **Health Check & Failover** | หาก endpoint ใดล่ม ระบบจะเปลี่ยนเส้นทางให้อัตโนมัติ          |
| **Cross-region Failover**   | รองรับการย้าย traffic ข้าม Region ได้                        |
| **Improved Availability**   | รองรับ high availability โดย design                          |
| **DDoS Protection**         | ทำงานร่วมกับ AWS Shield Standard โดยอัตโนมัติ                |

---

## วิธีการใช้งาน (การตั้งค่าเบื้องต้น)

1. สร้าง Accelerator
2. กำหนด Listener (พอร์ต + protocol)
3. สร้าง Endpoint Group สำหรับแต่ละ Region ที่รองรับ
4. กำหนด Load Balancer หรือ EC2 ที่เป็น endpoint
5. เชื่อมต่อ DNS หรือ CDN ของคุณกับ static IP ของ Accelerator

> คุณสามารถใช้ร่วมกับ Route 53 ได้ แต่ไม่จำเป็น เพราะ Global Accelerator มีระบบ routing ในตัว

---

## Use Cases ที่เหมาะกับ Global Accelerator

| Use Case                           | ประโยชน์ที่ได้                     |
| ---------------------------------- | ---------------------------------- |
| **Global Web Application**         | เพิ่ม performance ให้ผู้ใช้ทั่วโลก |
| **Gaming Platform**                | ลด latency สำคัญมากใน real-time    |
| **SaaS with Multi-Region Backend** | Failover ได้เร็วมาก                |
| **Disaster Recovery (DR)**         | รองรับ cross-region failover       |

---

## ความปลอดภัย

* IP ของ Accelerator ไม่เปลี่ยน ทำให้สามารถใส่ใน **Firewall Whitelist** ได้ง่าย
* ใช้ร่วมกับ **AWS WAF, Shield และ Security Groups** ได้
* ไม่มีการเก็บข้อมูลของผู้ใช้ (stateless routing)

---

## การ Monitoring

* รองรับ Amazon CloudWatch:

  * Request Count
  * Healthy / Unhealthy Endpoints
  * Client IPs
* รองรับการเก็บ log ผ่าน VPC Flow Logs และ ALB/NLB access logs

---

## ค่าใช้จ่าย

* คิดค่าบริการตาม:

  * จำนวน **Accelerator** ที่สร้าง
  * **Traffic ที่ส่งผ่าน AWS Global Network**
  * ข้อมูลที่รับส่งไปยัง endpoints

---

## เปรียบเทียบกับ Route 53 และ CloudFront

| บริการ                 | จุดเด่น                                                          |
| ---------------------- | ---------------------------------------------------------------- |
| **Route 53**           | DNS-based routing, ใช้ latency หรือ geolocation                  |
| **CloudFront**         | CDN, caching content ใกล้ผู้ใช้                                  |
| **Global Accelerator** | Performance networking, TCP/UDP, static IPs, low latency routing |

>  *ใช้ Global Accelerator คู่กับ CloudFront จะช่วยให้ทั้ง static และ dynamic content เร็วขึ้น*