# การเปรียบเทียบประเภทของ AWS Load Balancer

| คุณสมบัติ (Feature) | Application Load Balancer (ALB) | Network Load Balancer (NLB) | Gateway Load Balancer (GWLB) |
| :--- | :--- | :--- | :--- |
| **โปรโตคอล (Protocols)** | HTTP, HTTPS, gRPC | TCP, UDP, TLS | IP |
| **แพลตฟอร์ม (Platforms)** | VPC | VPC | VPC |
| **การตรวจสอบสถานะ (Health checks)** | HTTP, HTTPS, gRPC | TCP, HTTP, HTTPS | TCP, HTTP, HTTPS |
| **CloudWatch Metrics** | มี | มี | มี |
| **การบันทึก Log (Logging)** | มี | มี | มี |
| **Zonal Failover** | รองรับ | รองรับ | รองรับ |
| **Connection Draining** | รองรับ | รองรับ | รองรับ |
| **ส่งโหลดไปหลายพอร์ตใน Instance เดียว** | รองรับ | รองรับ | รองรับ |
| **ใช้ IP address เป็นเป้าหมาย (Targets)** | รองรับ | รองรับ (TCP, TLS) | รองรับ |
| **ระบบป้องกันการลบ (Deletion protection)** | มี | มี | มี |
| **ตั้งค่าเวลา Idle connection timeout** | รองรับ | - | - |
| **Cross-zone load balancing** | รองรับ | รองรับ | รองรับ |
| **Sticky sessions** | รองรับ | รองรับ | รองรับ |
| **Static IP** | - | **รองรับ** | - |
| **Elastic IP address** | - | **รองรับ** | - |
| **รักษาค่า Source IP ต้นทาง** | รองรับ | รองรับ | รองรับ |
| **สิทธิ์ IAM ตามทรัพยากร/แท็ก** | รองรับ | รองรับ | รองรับ |
| **Slow start** | รองรับ | - | - |
| **Web sockets** | รองรับ | รองรับ | รองรับ |
| **รองรับ PrivateLink** | - | รองรับ (TCP, TLS) | รองรับ (GWLBE) |
| **Routing ตาม Source IP CIDR** | รองรับ | - | - |
| **เลเยอร์ 7 (Layer 7)** | | | |
| **Path-based routing** | **รองรับ** | - | - |
| **Host-based routing** | **รองรับ** | - | - |
| **Native HTTP/2** | **รองรับ** | - | - |
| **การเปลี่ยนเส้นทาง (Redirects)** | **รองรับ** | - | - |
| **Fixed Response** | **รองรับ** | - | - |
| **ใช้ Lambda Functions เป็นเป้าหมาย** | **รองรับ** | - | - |
| **HTTP header-based routing** | **รองรับ** | - | - |
| **HTTP method-based routing** | **รองรับ** | - | - |
| **Query parameter-based routing** | **รองรับ** | - | - |
| **ความปลอดภัย (Security)** | | | |
| **SSL offloading** | รองรับ | รองรับ | - |
| **Server Name Indication (SNI)** | รองรับ | รองรับ | - |
| **การเข้ารหัสฝั่ง Back-end server** | รองรับ | รองรับ | - |
| **การยืนยันตัวตนผู้ใช้ (User auth)** | **รองรับ** | - | - |
| **Session resumption** | - | รองรับ | รองรับ |
| **ยุติการไหลของข้อมูล/พฤติกรรม Proxy** | ใช่ | ใช่ | ใช่ |



### **คุณสมบัติที่เหมือนกันระหว่าง Load Balancer ทั้ง 3 ประเภท:**
* มีฟีเจอร์ตรวจสอบสถานะ (Health check) ของ Instance
* มีระบบตรวจสอบ CloudWatch ในตัว
* มีฟีเจอร์การบันทึก Log
* รองรับ Zonal failover (การสลับการทำงานเมื่อโซนมีปัญหา)
* รองรับ Connection draining (การรอให้การเชื่อมต่อเดิมสิ้นสุดก่อนถอนทรัพยากร)
* รองรับ Cross-zone load balancing (กระจายทราฟฟิกไปยัง Instance ในทุก AZ ที่เปิดใช้งานอย่างเท่าเทียม)
* รองรับนโยบายสิทธิ์ IAM แบบอ้างอิงทรัพยากร (Resource-based) และแบบอ้างอิงแท็ก (Tag-based)
* **Flow stickiness** – แพ็กเก็ตข้อมูลทั้งหมดจะถูกส่งไปยังเป้าหมายเดียว และส่งทราฟฟิกขากลับมาจากเป้าหมายเดียวกันนั้นเสมอ