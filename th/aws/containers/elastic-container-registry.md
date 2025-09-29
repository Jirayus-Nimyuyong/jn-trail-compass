# Amazon ECR

## บทนำเกี่ยวกับ Amazon ECR

* **Amazon ECR (Elastic Container Registry)** คือบริการสำหรับ **เก็บและจัดการ Docker images บน AWS**
* ปกติเราใช้ repository ออนไลน์อย่าง **Docker Hub** แต่เราสามารถเก็บ Docker images ของเราเองบน **Amazon ECR** ได้

## ประเภทของ Repository

1. **Private Repository**

   * เก็บ images เฉพาะบัญชีของเรา หรือบัญชีที่เรากำหนด
2. **Public Repository**

   * เก็บ images แบบสาธารณะ และเผยแพร่ใน **Amazon ECR Public Gallery**

## การทำงานร่วมกับ Amazon ECS

* Amazon ECR **integrated กับ ECS เต็มรูปแบบ**
* Images จะถูกเก็บ **เบื้องหลังบน Amazon S3**
* ECS Cluster เช่น EC2 instance อาจต้อง **pull images จาก ECR**

  * เราต้องกำหนด **IAM role** ให้ EC2 instance
  * IAM role นี้จะอนุญาตให้ instance **ดึง Docker images ได้อย่างปลอดภัย**
* หลังจากดึง images เสร็จแล้ว container จะถูก **รันบน EC2 instance**
* นี่คือวิธีที่ ECS และ ECR ทำงานร่วมกัน

## ข้อดีของ Amazon ECR

* รองรับ **image vulnerability scanning**
* รองรับ **versioning**
* รองรับ **image tags**
* รองรับ **image lifecycle management**

## Key Takeaways

1. Amazon ECR คือบริการสำหรับ **เก็บและจัดการ Docker images บน AWS**
2. รองรับ **private repository** สำหรับบัญชีผู้ใช้ และ **public repository** สำหรับเผยแพร่สาธารณะ
3. Integrated กับ ECS โดย images จะถูกเก็บเบื้องหลังบน **Amazon S3**
4. การเข้าถึง ECR ถูกปกป้องด้วย **IAM roles** เพื่อให้ EC2 instances ใน ECS cluster ดึง Docker images ได้อย่างปลอดภัย
5. รองรับ **vulnerability scanning, versioning, image tags และ image lifecycle management**