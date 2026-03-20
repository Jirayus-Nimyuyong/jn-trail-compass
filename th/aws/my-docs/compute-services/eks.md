# Amazon EKS Cheat Sheet (ฉบับแปลภาษาไทย)

**Amazon EKS** คือบริการ Managed Service ที่ช่วยให้คุณสามารถรัน Kubernetes บน AWS ได้โดยไม่ต้องติดตั้ง ดำเนินการ หรือดูแลรักษา Kubernetes Control Plane หรือ Node ของคุณเอง
* ให้บริการ Control Plane ของ Kubernetes ที่มีการจัดการเต็มรูปแบบและได้รับการรับรองมาตรฐาน (Certified Kubernetes-conformant) ทำให้ง่ายต่อการสร้าง รักษาความปลอดภัย และดูแลรักษา Cluster
* มีการทำงานร่วมกับบริการต่างๆ ของ AWS เพื่อเพิ่มความสามารถในการสเกลและความปลอดภัยให้กับแอปพลิเคชันของคุณ:
    * **Amazon ECR** สำหรับ Container Images
    * **Elastic Load Balancing** สำหรับการกระจายโหลด
    * **IAM** สำหรับการยืนยันตัวตน
    * **Amazon VPC** สำหรับการแยกส่วนเครือข่าย

---

## ส่วนประกอบของ Amazon EKS (Amazon EKS Components)

### Clusters
EKS Cluster ประกอบด้วยส่วนประกอบหลัก 2 ส่วน:

**1. EKS Control Plane**
* ประกอบด้วยโหนดที่รันซอฟต์แวร์ Kubernetes (API server & etcd)
* แต่ละ Cluster เป็นแบบ Single-tenant และมีความเฉพาะตัว รันบนชุดอินสแตนซ์ EC2 ของตัวเอง
* Cluster Control Plane ถูกติดตั้งแบบกระจายตัวในหลาย Availability Zones (AZs) และมี Network Load Balancer (ELB) อยู่ด้านหน้า
* ใช้ AWS KMS เพื่อเข้ารหัสข้อมูลที่เก็บโดยโหนด etcd และ EBS volumes ที่เกี่ยวข้อง

**2. EKS Nodes**
* Cluster ประกอบด้วยโหนด EC2 หนึ่งโหนดขึ้นไป หรือ AWS Fargate compute ที่ใช้สำหรับวางตารางเวลาการทำงานของ Pods
* เชื่อมต่อกับ Control Plane ของ Cluster ผ่าน API server endpoint
* โดยปกติ API server endpoint จะเป็นสาธารณะ (Public) แต่คุณสามารถเปิดการเข้าถึงแบบส่วนตัว (Private access) เพื่อให้การสื่อสารระหว่างโหนดและ API server อยู่ภายใน VPC เท่านั้น
* EKS รองรับผลิตภัณฑ์การสเกลอัตโนมัติ (Autoscaling) 2 รูปแบบ:
    * **Cluster Autoscaler** – ใช้ AWS Auto Scaling groups
    * **Karpenter** – ทำงานโดยตรงกับ Amazon EC2 Fleet
* ตามค่าเริ่มต้น ล็อกของ Cluster Control Plane จะไม่ถูกส่งไปยัง CloudWatch Logs หากต้องการส่งล็อก คุณต้องเปิดใช้งานล็อกแต่ละประเภทด้วยตนเอง
* EKS Cluster ใช้ IAM / OIDC สำหรับการยืนยันตัวตน (Authentication) และใช้ Kubernetes RBAC สำหรับการกำหนดสิทธิ์ (Authorization)
* **EKS Pod Identity** เป็นทางเลือกที่เรียบง่ายกว่า IRSA ในการมอบสิทธิ์ AWS ให้กับ Pods ช่วยให้คุณเชื่อมโยง IAM roles กับ Kubernetes service accounts ได้โดยไม่ต้องตั้งค่า OIDC provider

---

### Nodes (โหนด)
* โหนดต้องอยู่ใน VPC เดียวกันกับ Subnets ที่คุณเลือกตอนสร้าง Cluster
* ในมุมมองของ Kubernetes API โหนดคือทรัพยากรการประมวลผลที่จัดเตรียมไว้สำหรับ Cluster
* **Taints และ Tolerations** ช่วยป้องกันไม่ให้ Pods ถูกวางบนโหนดที่ไม่ถูกต้อง

**Self-managed nodes (โหนดที่จัดการเอง)**
* Cluster หนึ่งสามารถมี Node groups ได้หลายกลุ่ม
* Node group คือกลุ่มของอินสแตนซ์ EC2 ที่ติดตั้งใน Amazon EC2 Auto Scaling group
* อินสแตนซ์ใน Node group เดียวกันต้องมีคุณสมบัติดังนี้:
    * Instance type เดียวกัน
    * รัน AMI เดียวกัน
    * ใช้ EKS node IAM role เดียวกัน
* ในหนึ่ง Cluster สามารถมี Node groups ที่มี Instance type และระบบปฏิบัติการที่แตกต่างกันได้
* มี 2 วิธีในการอัปเดต Self-managed node groups เพื่อใช้ AMI ใหม่:
    1. การย้ายไปยัง Node group ใหม่ (Migrating)
    2. การอัปเดต Node group เดิมที่มีอยู่

**Managed node groups (โหนดที่ AWS จัดการให้)**
* ช่วยจัดการการจัดเตรียม (Provisioning) และวงจรชีวิต (Lifecycle) ของโหนดใน EKS clusters อัตโนมัติ
* ทุกโหนดจะถูกจัดเตรียมเป็นส่วนหนึ่งของ Amazon EC2 Auto Scaling group
* เมื่อโหนดถูกรันใน Managed node group จะมีการติด Tag อัตโนมัติเพื่อให้ Kubernetes Cluster Autoscaler ค้นพบได้เอง
* ใช้ Node group ในการใส่ Kubernetes labels ให้กับโหนด
* สามารถมี Managed node groups หลายกลุ่มใน Cluster เดียวได้
* เลือกได้ว่าจะใช้ On-Demand หรือ Spot instances
* เพื่อให้แอปพลิเคชันใช้งานได้อย่างต่อเนื่อง การอัปเดตและสิ้นสุดการทำงานของโหนดจะมีการ Drain โหนดโดยอัตโนมัติ

**AWS Fargate**
* คุณต้องกำหนด Fargate profile ก่อนที่จะรัน Pods บน Fargate
* หาก Pod ตรงกับ Fargate profile มากกว่าหนึ่งโปรไฟล์ EKS จะสุ่มเลือกหนึ่งอัน
* Fargate profiles ไม่สามารถแก้ไขได้ (Immutable) และประกอบด้วย:
    * Pod execution role
    * Subnets
    * Selectors (Namespace, Labels)
* Fargate รันเพียง 1 Pod ต่อ 1 Node
* พื้นที่เก็บข้อมูลของ Pod เป็นแบบชั่วคราว (Ephemeral) และข้อมูลถูกเข้ารหัสด้วย AWS Fargate managed keys

---

### Amazon EKS Auto Mode
* เป็นโหมดการทำงานใหม่สำหรับ EKS clusters (รัน Kubernetes 1.29 ขึ้นไป)
* จัดการ Cluster แบบอัตโนมัติเต็มรูปแบบ ทั้งการจัดเตรียมโครงสร้างพื้นฐาน, การสเกล, การจัดการ Add-ons หลัก และการเพิ่มประสิทธิภาพต้นทุน
* AWS รับผิดชอบในการดูแลความปลอดภัย, การตั้งค่า และการจัดการโครงสร้างพื้นฐาน AWS (EC2 instances) ใน Cluster
* แนะนำสำหรับ EKS clusters ใหม่เพราะช่วยลดความยุ่งยากในการดำเนินงาน

---

### Workloads (ภาระงาน)
* ถูกติดตั้งใน Containers และกำหนดแอปพลิเคชันที่รันบน Kubernetes cluster
* หนึ่ง Pod สามารถมีได้หนึ่งหรือหลาย Containers
* **Vertical Pod Autoscaler** ปรับการจอง CPU และหน่วยความจำของ Pod
* **Horizontal Pod Autoscaler** ปรับจำนวน Pod ตามการใช้งาน CPU

---

### EKS Connector
* ช่วยให้คุณสามารถลงทะเบียนและเชื่อมต่อ Kubernetes cluster ใดๆ เข้ากับ AWS
* คุณสามารถดูสถานะ, การตั้งค่า และ Workloads ของ Cluster ในคอนโซล Amazon EKS ได้หลังจากเชื่อมต่อแล้ว

---

## การจัดเก็บข้อมูล (Amazon EKS Storage)
**Container Storage Interface (CSI)** ช่วยให้ผู้ให้บริการจัดเก็บข้อมูลภายนอกสามารถสร้าง Plugin ใน Kubernetes เพื่อระบบจัดเก็บข้อมูลทางเลือก

* **Amazon EBS CSI driver:** จัดการวงจรชีวิตของ Persistent volumes เช่น EBS โดยต้องมีสิทธิ์ IAM ในการเรียกใช้ AWS APIs (รันบน Fargate ได้ แต่ Mount volume เข้ากับ Fargate pods ไม่ได้)
* **Amazon EFS CSI driver:** จัดการระบบไฟล์ EFS ไม่รองรับ Container ที่เป็น Windows ส่วนโหนด Fargate รองรับเฉพาะ Static provisioning เท่านั้น
* **Amazon FSx for Lustre CSI driver:** จัดการวงจรชีวิตระบบไฟล์ FSx (Fargate ไม่รองรับ)
* **Amazon FSx for NetApp ONTAP CSI driver:** บริการจัดเก็บข้อมูลสำหรับระบบไฟล์ ONTAP
* **Amazon FSx for OpenZFS CSI driver:** อินเทอร์เฟซ CSI สำหรับจัดการระบบไฟล์ OpenZFS
* **Amazon File Cache:** ใช้กับ CSI driver เพื่อเป็น Cache ความเร็วสูงสำหรับข้อมูลใน S3 หรือระบบไฟล์อื่นๆ

---

## การเครือข่าย (Amazon EKS Networking)
มี 3 วิธีในการสร้าง VPC สำหรับ EKS cluster:
1.  **Private subnets:** เข้าถึงอินเทอร์เน็ตผ่าน NAT Gateway/Instance ส่วน Cluster endpoint เข้าถึงได้เฉพาะใน VPC เท่านั้น
2.  **Public subnets:** โหนดมี Public IP และเข้าถึงอินเทอร์เน็ตผ่าน Internet Gateway ส่วน Cluster endpoint เข้าถึงได้จากภายนอก VPC
3.  **Public and private subnets:** โหนดอยู่ใน Private subnets แต่มี Load balancers อยู่ใน Public subnets เพื่อรับทราฟฟิก

**ส่วนประกอบเครือข่ายอื่นๆ:**
* **VPC CNI plugin:** มอบหมาย IP จริงจาก VPC ให้กับแต่ละ Pod
* **AWS Load Balancer Controller:** จัดการ ALB (สำหรับ Ingress) และ NLB (สำหรับ Service type LoadBalancer)
* **CoreDNS:** บริการค้นหาชื่อภายใน Cluster
* **Kube-proxy:** จัดการกฎเครือข่ายบนแต่ละโหนด EC2
* **Calico:** เอนจินสำหรับทำ Network policy และการแยกส่วนเน็ตเวิร์ก

---

## ความปลอดภัย (Amazon EKS Security)
* ผู้สร้าง Cluster จะได้รับสิทธิ์ `system:masters` โดยอัตโนมัติ
* การเพิ่มผู้ใช้ต้องแก้ไข **aws-auth ConfigMap** (หรือใช้ EKS Pod Identity สำหรับสิทธิ์ระดับ Pod)
* รองรับ **Envelope encryption** สำหรับ Kubernetes secrets โดยใช้ AWS KMS
* **AWS Secrets and Configuration Provider (ASCP):** แสดงข้อมูลลับจาก Secrets Manager หรือ Parameter Store เป็นไฟล์ที่ Mount ใน Pod

---

## การตรวจสอบ (Amazon EKS Monitoring)
* **Control Plane Logging:** ส่งล็อก API, Audit, Authenticator, Controller manager และ Scheduler ไปยัง CloudWatch Logs
* **Amazon EKS Dashboard:** มุมมองรวมศูนย์บนหน้าคอนโซลเพื่อดูสถานะ Cluster, เวอร์ชัน และพยากรณ์ค่าใช้จ่าย
* **AWS CloudTrail:** บันทึกการเรียกใช้งาน API ทั้งหมด

---

## ทางเลือกการติดตั้ง (Amazon EKS Deployment Options)
1.  **Amazon EKS cluster:** รันในบัญชี AWS (EC2 หรือ Fargate)
2.  **Amazon EKS on AWS Outposts:** รันบนฮาร์ดแวร์ physical ในศูนย์ข้อมูลของคุณเอง
3.  **Amazon EKS Anywhere:** รัน Cluster บนโครงสร้างพื้นฐานของคุณเองโดยได้รับการสนับสนุนจาก AWS
4.  **Amazon EKS Distro:** ชุดซอฟต์แวร์ Kubernetes แบบ Open-source ตัวเดียวกับที่ AWS ใช้
5.  **Amazon EKS Hybrid Nodes:** ใช้ทรัพยากร On-premises เป็น Worker nodes เชื่อมต่อกับ Managed control plane บน Cloud

---

## ค่าบริการและส่วนขยาย (Pricing & Support)
* คิดค่าบริการ Cluster รายชั่วโมง บวกกับค่าทรัพยากรประมวลผล (EC2 หรือ Fargate)
* **Amazon EKS Extended Support:** ให้การสนับสนุนมาตรฐาน 14 เดือน หลังจากนั้นสามารถซื้อการสนับสนุนเพิ่มเติมได้อีก 12 เดือน (รวมเป็น 26 เดือน) โดยจะมีค่าธรรมเนียมรายชั่วโมงที่เพิ่มขึ้น
