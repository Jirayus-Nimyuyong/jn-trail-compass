# AWS CodeBuild Cheat Sheet

**AWS CodeBuild** เป็นบริการ Continuous Integration (CI) แบบ Managed เต็มรูปแบบ ทำหน้าที่คอมไพล์ซอร์สโค้ด, รันการทดสอบ และสร้างแพ็กเกจซอฟต์แวร์ที่พร้อมสำหรับการ Deploy

### แนวคิดหลัก (Concepts)
* **Build Project:** ตัวกำหนดว่า CodeBuild จะรันงานอย่างไร รวมถึงข้อมูลแหล่งที่มาของโค้ด (Source code), สภาพแวดล้อมที่ใช้ (Build environment), คำสั่งที่ต้องรัน และที่เก็บไฟล์ผลลัพธ์ (Output)
* **Build Environment:** การรวมกันของระบบปฏิบัติการ (OS), รันไทม์ของภาษาโปรแกรม และเครื่องมือต่างๆ ที่ CodeBuild ใช้ในการรันงาน
* **Build Specification (buildspec.yml):** ไฟล์ YAML ที่ใช้กำหนดคำสั่งที่ต้องการให้รันในแต่ละขั้นตอน (Phases) ของการ Build หากไม่มีไฟล์นี้ CodeBuild จะไม่สามารถสร้างผลลัพธ์หรือระบุตำแหน่งของ Artifact ได้ โดยปกติไฟล์นี้ต้องวางไว้ที่ Root ของไดเรกทอรีซอร์สโค้ด
* **Build Input/Output Artifacts:** ไฟล์ขาเข้าเรียกว่า Input Artifacts และซอฟต์แวร์เวอร์ชันที่พร้อม Deploy เรียกว่า Output Artifact



---

### คุณสมบัติเด่น (Features)
* **สภาพแวดล้อมสำเร็จรูป:** รองรับภาษา Java, Python, Node.js, Ruby, Go, Android, .NET Core (Linux) และ Docker
* **การจัดเก็บผลลัพธ์:** เก็บ Artifact ไว้ใน **Amazon S3** หรือใช้คำสั่งอัปโหลดไปยังคลังเก็บ Artifact (Repository) อื่นๆ
* **ระดับกำลังประมวลผล (Compute Capacity):** เลือกได้ 3 ระดับตามขนาด Memory และ vCPU:
    * **small:** 3GB RAM, 2 vCPU
    * **medium:** 7GB RAM, 4 vCPU
    * **large:** 15GB RAM, 8 vCPU
* **การเชื่อมต่อ:** เชื่อมต่อกับ CodeCommit, S3, GitHub, GitHub Enterprise และ Bitbucket
* **Docker Support:** สามารถใช้ Docker Image จากบัญชี AWS อื่น หรือจาก Private Registry ใดๆ ก็ได้ (เดิมรองรับแค่ DockerHub และ Amazon ECR)
* **CI/CD Integration:** ทำงานร่วมกับ **AWS CodePipeline** เพื่อสร้างกระบวนการ Release อัตโนมัติ หรือใช้ร่วมกับ Jenkins

---

### ขั้นตอนในกระบวนการ Build
1. CodeBuild สร้างคอนเทนเนอร์ประมวลผลชั่วคราวตามประเภทที่กำหนด
2. โหลดรันไทม์ (Runtime Environment) ที่ระบุ
3. ดาวน์โหลดซอร์สโค้ด
4. รันคำสั่งตามที่ตั้งค่าไว้ในโปรเจกต์
5. อัปโหลด Artifact ที่สร้างได้ไปยัง S3 Bucket
6. ทำลายคอนเทนเนอร์ทิ้งหลังจบงาน
* **ระยะเวลาการ Build:** คิดเป็นนาที (ปัดขึ้นเป็นนาทีที่ใกล้ที่สุด) นับตั้งแต่เริ่มส่งงานจนถึงจบงาน

---

### การใช้ระบบแคช (Caching) เพื่อประหยัดเวลา
* **Amazon S3:** เก็บแคชไว้ใน S3 เหมาะสำหรับ Artifact ขนาดเล็กที่สร้างยากแต่ดาวน์โหลดง่าย
* **Local Cache:** เก็บแคชไว้บนเครื่องที่รัน Build โดยตรง เหมาะสำหรับ Artifact ขนาดใหญ่เพราะไม่ต้องผ่านเน็ต มี 3 โหมด: **Source cache, Docker layer cache และ Custom cache**

---

### การตรวจสอบและความปลอดภัย (Monitoring & Security)
* **การเข้ารหัส:** ใช้คีย์จาก **AWS KMS** เพื่อเข้ารหัส Artifact
* **CloudWatch:** ติดตามสถานะการ Build และแจ้งเตือนเมื่อเกิดข้อผิดพลาด สามารถดู Metrics ได้ทั้งระดับโปรเจกต์ (**ProjectName**) และระดับบัญชี AWS
* **ความปลอดภัยระดับคอนเทนเนอร์:** มีการป้องกันความเสี่ยงจากการรั่วไหลของหน่วยความจำ (Memory dump) ในการ Build แบบคอนเทนเนอร์

---

### ค่าบริการ (Pricing)
* จ่ายตามทรัพยากรประมวลผลที่ใช้ตาม **ระยะเวลาที่รัน (นาที)** ราคาต่อนาทีขึ้นอยู่กับประเภทของ Compute ที่เลือก
* มีการคิดราคาสำหรับอินสแตนซ์ประเภท CUSTOM และ Windows รุ่น XL/2XL โดยสามารถใช้ **Reserved Capacity** เพื่อลดค่าใช้จ่ายรายนาทีสำหรับเวิร์กโหลดที่คาดการณ์ได้