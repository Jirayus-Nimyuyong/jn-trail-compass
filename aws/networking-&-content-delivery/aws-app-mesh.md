# AWS App Mesh

**AWS App Mesh** คือบริการ **service mesh** ที่ช่วยให้คุณสามารถควบคุมการสื่อสารระหว่าง **microservices** ภายใน **Amazon ECS, EKS หรือ EC2** ได้อย่างมีประสิทธิภาพ โดยไม่ต้องแก้ไขโค้ดของ service เหล่านั้นโดยตรง

App Mesh ช่วยให้คุณสามารถทำสิ่งเหล่านี้ได้:

* ตรวจสอบ (monitoring)
* การควบคุมทราฟฟิก (traffic control)
* การจัดการ version และ deployment
* การตรวจสอบ (observability)
* การกำหนดนโยบายการสื่อสาร (routing policies)
* การ recover หรือ retry อัตโนมัติ

## องค์ประกอบหลักของ AWS App Mesh

### **Mesh**

* คือขอบเขตของการสื่อสารที่ App Mesh จัดการ
* Microservices ที่อยู่ภายใต้ mesh เดียวกันจะสามารถสื่อสารกันตามกฎของ mesh ได้

### **Virtual Service**

* เป็นการแทน service จริง ๆ ในระบบ เช่น `orders.svc.cluster.local`
* ใช้เพื่อระบุปลายทางของ traffic ที่จะส่งไป

### **Virtual Node**

* แทนตัว service instance เช่น ECS task, EKS pod หรือ EC2 instance
* ต้องกำหนด `service discovery` (เช่น DNS) เพื่อให้ App Mesh หาเจอ

### **Virtual Router**

* ทำหน้าที่เป็น **load balancer** ภายใน mesh
* รองรับการกำหนดเส้นทาง (routing) ของ traffic ไปยัง `Virtual Node` ต่าง ๆ

### **Route**

* กำหนดวิธีการ **match request** แล้วส่งไปยัง Virtual Node ที่เหมาะสม
* รองรับการทำ **traffic splitting**, **blue/green deployment**, **canary deployment**

### **Virtual Gateway**

* ช่วยรับทราฟฟิกจากภายนอกเข้า mesh
* ใช้ร่วมกับ API Gateway, NLB, หรือ Ingress Controller

### **Envoy Proxy**

* ทุก microservice จะต้องติดตั้ง sidecar ที่เป็น **Envoy proxy**
* Envoy ทำหน้าที่ intercept และควบคุม traffic ตาม policy ที่ App Mesh กำหนด

---

## การใช้งานเบื้องต้น

### ติดตั้ง Envoy Sidecar

* ทุก service ที่ต้องการให้ App Mesh ควบคุมจะต้องใช้ **Envoy container** ควบคู่กัน

### สร้าง Mesh

```bash
aws appmesh create-mesh --mesh-name my-mesh
```

### กำหนด Virtual Node

```json
{
  "virtualNodeName": "orders-node",
  "serviceDiscovery": {
    "dns": {
      "hostname": "orders.svc.cluster.local"
    }
  }
}
```

### กำหนด Virtual Service และ Router

* กำหนดว่า service ไหนจะรับ traffic และส่งไปยัง node ไหน
* สามารถตั้งค่าให้รองรับ version ใหม่แบบ Canary ได้

---

## แนวทางการใช้งาน

| Use Case          | การตั้งค่าใน App Mesh                                               |
| ----------------- | ------------------------------------------------------------------- |
| Canary Deployment | สร้าง Route ที่แบ่ง traffic เช่น 80% ไป version A, 20% ไป version B |
| Service Discovery | ใช้ DNS หรือ Cloud Map                                              |
| Observability     | ผสานกับ CloudWatch, X-Ray, Prometheus                               |
| Retry             | ตั้งค่า policy บน Virtual Node หรือ Route                           |
| Circuit Breaker   | ทำร่วมกับ Envoy configuration                                       |

---

## ความปลอดภัย

* รองรับ **mTLS (Mutual TLS)** สำหรับการเข้ารหัส traffic
* สามารถใช้ IAM policy เพื่อควบคุมการเข้าถึง Mesh และ resource ต่าง ๆ

---

## Monitoring & Logging

* ใช้งานร่วมกับ:

  * **AWS CloudWatch**
  * **AWS X-Ray**
  * **Prometheus + Grafana** (โดยการเปิด Envoy stats endpoint)

---

## ประโยชน์ของ App Mesh

| ข้อดี           | รายละเอียด                                   |
| --------------- | -------------------------------------------- |
| **Visibility**  | เห็นการสื่อสารระหว่าง services ทั้งหมด       |
| **Reliability** | รองรับ retry, timeout, failover              |
| **Control**     | จัดการ routing ได้ละเอียดระดับ request       |
| **Security**    | รองรับ mTLS และ IAM integration              |
| **Flexibility** | รองรับ ECS, EKS, EC2 และ hybrid environments |

---

## กรณีการใช้งานที่เหมาะสม

* ระบบ microservices ที่ต้องการ **zero-downtime deployment**
* แอปที่มีการสื่อสารข้ามหลาย service และต้องการ **monitoring / tracing**
* แพลตฟอร์มที่ต้องการ **observability** และการ **ควบคุม traffic** อย่างละเอียด
