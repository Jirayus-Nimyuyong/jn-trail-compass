# AWS Cloud Map

**AWS Cloud Map** คือบริการ **service discovery** ที่ให้คุณสามารถลงทะเบียนทรัพยากรในแอปพลิเคชัน เช่น microservices, databases, queues ฯลฯ และให้บริการอื่น ๆ ค้นหาและเชื่อมต่อกับทรัพยากรเหล่านั้นโดยอัตโนมัติ ผ่าน DNS หรือ API

Cloud Map ช่วยให้ระบบของคุณสามารถรับรู้การเปลี่ยนแปลงของ endpoint ได้แบบ **dynamic** โดยไม่ต้องแก้ไขคอนฟิกด้วยตนเอง เช่น เมื่อมีการปรับขนาดหรือเปลี่ยน IP ของ service instance

---

## หลักการทำงานของ AWS Cloud Map

1. **สร้าง namespace**

   * เป็นพื้นที่ชื่อหลัก (เหมือน domain) เช่น `myapp.local`
   * แบ่งได้เป็น:

     * **Private DNS namespace**: ใช้ใน VPC (e.g., `service.local`)
     * **Public DNS namespace**: ใช้แบบสาธารณะ (e.g., `service.example.com`)

2. **ลงทะเบียน service**

   * เช่น `auth`, `inventory`, `orders`
   * แต่ละ service จะมี:

     * Health check (optional)
     * Service discovery method (DNS/HTTP)

3. **ลงทะเบียน instance ของ service**

   * เช่น `auth-service-1` → 10.0.1.15
   * Cloud Map จะรู้ว่า `auth.service.local` ชี้ไปที่ IP เหล่านี้

4. **Clients ทำการค้นหา**

   * โดย query DNS หรือใช้ API เพื่อหา endpoint ที่พร้อมใช้งาน

---

## ฟีเจอร์หลัก

| ฟีเจอร์                                 | รายละเอียด                                                        |
| --------------------------------------- | ----------------------------------------------------------------- |
| **DNS-based service discovery**         | ใช้ Route 53 DNS เพื่อ resolve ชื่อ service เป็น IP address       |
| **API-based service discovery**         | ใช้ Cloud Map API เพื่อค้นหา metadata เช่น port, protocol         |
| **Health check integration**            | ตรวจสอบว่า instance ยังพร้อมใช้งานหรือไม่ก่อนให้ client เชื่อมต่อ |
| **Multi-AZ และ Multi-instance support** | กระจาย traffic ไปยังหลาย instance                                 |
| **Custom attributes**                   | สามารถแนบ metadata เช่น version, zone, weight ได้                 |

---

## กรณีใช้งาน

1. **Microservices**

   * บริการต่าง ๆ ภายใน ECS, EKS หรือ EC2 ที่ต้องค้นหากันเอง
2. **Service mesh (App Mesh)**

   * ใช้ Cloud Map เพื่อ register service endpoint ให้ App Mesh ควบคุม
3. **Hybrid architecture**

   * ใช้ Cloud Map ในการ register service ทั้งจาก on-premise และ cloud
4. **Dynamic scaling**

   * เมื่อมีการ autoscale หรือ deploy ใหม่ จะ register/retire instance อัตโนมัติ

---

## เปรียบเทียบกับ Route 53 ตรง ๆ

| คุณสมบัติ                | Route 53    | Cloud Map       |
| ------------------------ | ----------- | --------------- |
| DNS Resolution           | ✅           | ✅               |
| API Lookup               | ❌           | ✅               |
| Custom Metadata          | ❌           | ✅               |
| Dynamic Registration     | ❌           | ✅               |
| Health check integration | ✅ (พื้นฐาน) | ✅ (ละเอียดกว่า) |

---

## ตัวอย่างการใช้

```bash
# สร้าง namespace
aws servicediscovery create-private-dns-namespace \
  --name myapp.local \
  --vpc vpc-123456

# สร้าง service
aws servicediscovery create-service \
  --name auth \
  --dns-config NamespaceId=ns-123456,RoutingPolicy=WEIGHTED,DnsRecords=[{Type=A,TTL=60}]

# ลงทะเบียน instance
aws servicediscovery register-instance \
  --service-id srv-123456 \
  --instance-id auth-1 \
  --attributes AWS_INSTANCE_IPV4=10.0.1.15,AWS_INSTANCE_PORT=8080
```

---

## ปัญหาที่พบบ่อย

| ปัญหา                           | วิธีแก้                                                            |
| ------------------------------- | ------------------------------------------------------------------ |
| DNS ไม่ resolve                 | ตรวจว่า namespace ถูกสร้างใน VPC และ security group เปิดให้ lookup |
| Instance ไม่ online             | ตรวจว่า health check ไม่ fail                                      |
| ใช้ร่วมกับ ECS แล้วไม่ register | ตรวจว่า task definition มีการกำหนด `service discovery`             |
| มี latency                      | ลด TTL หรือเปิด caching                                            |

---

## ความปลอดภัย

* ควบคุมการเข้าถึง API ด้วย IAM policy
* DNS query ภายใน VPC เท่านั้น (ถ้าใช้ private namespace)
* เข้ารหัสการสื่อสารกับ API ด้วย HTTPS

---

หากคุณต้องการ Diagram เชิงภาพ, Terraform config, หรือการเชื่อมต่อ Cloud Map เข้ากับ ECS/EKS/App Mesh บอกได้เลยครับ!
