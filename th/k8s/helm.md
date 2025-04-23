# Helm

## บทนำ
Helm เป็นเครื่องมือจัดการแพ็กเกจ (Package Manager) สำหรับ Kubernetes ที่ช่วยลดความซับซ้อนในการติดตั้งและจัดการแอปพลิเคชันใน Kubernetes Cluster Helm ใช้แนวคิดของ Charts ซึ่งเป็นชุดคำสั่งและไฟล์ที่อธิบายวิธีการ Deploy แอปพลิเคชัน

## คุณสมบัติของ Helm
1. **การติดตั้งที่ง่าย**: ใช้คำสั่งเดียวเพื่อ Deploy แอปพลิเคชันที่ซับซ้อน
2. **การอัปเกรดและย้อนกลับ (Rollback)**: สามารถอัปเกรดหรือย้อนกลับเวอร์ชันของแอปพลิเคชันได้ง่าย
3. **การแชร์แอปพลิเคชัน**: สามารถใช้ Charts ที่สร้างขึ้นใหม่หรือที่มีอยู่แล้วจาก Helm Repository
4. **การกำหนดค่าที่ง่าย**: รองรับการตั้งค่าแบบ Custom ผ่านไฟล์ `values.yaml`

## แนวคิดหลักใน Helm

### 1. Charts
- เป็นชุดของไฟล์ที่ใช้กำหนดแอปพลิเคชัน รวมถึง Kubernetes Resources ต่าง ๆ
- ประกอบด้วยไฟล์สำคัญ เช่น
  - `Chart.yaml`: ข้อมูลเกี่ยวกับ Chart เช่น ชื่อและเวอร์ชัน
  - `values.yaml`: ค่าพื้นฐานที่ใช้สำหรับการตั้งค่า
  - เทมเพลตในโฟลเดอร์ `templates/`: ไฟล์ YAML ที่สามารถกำหนดค่าแบบไดนามิก

### 2. Releases
- การ Deploy ของ Chart จะเรียกว่า Release
- สามารถสร้างหลาย Release จาก Chart เดียวกันได้

### 3. Repositories
- ที่เก็บ Charts ที่สามารถค้นหาและดาวน์โหลดได้ เช่น [ArtifactHub](https://artifacthub.io/)

## การติดตั้ง Helm
### 1. ติดตั้ง Helm CLI
#### บน Linux
```bash
curl -fsSL https://raw.githubusercontent.com/helm/helm/main/scripts/get-helm-3 | bash
```

#### บน macOS
```bash
brew install helm
```

#### บน Windows
```powershell
choco install kubernetes-helm
```

### 2. ยืนยันการติดตั้ง
```bash
helm version
```

## การใช้งาน Helm เบื้องต้น

### 1. เพิ่ม Repository
```bash
helm repo add bitnami https://charts.bitnami.com/bitnami
```

### 2. ค้นหา Charts
```bash
helm search repo bitnami
```

### 3. ติดตั้ง Chart
```bash
helm install my-release bitnami/nginx
```

### 4. ตรวจสอบสถานะ Release
```bash
helm list
```

### 5. อัปเกรด Release
```bash
helm upgrade my-release bitnami/nginx
```

### 6. ลบ Release
```bash
helm uninstall my-release
```

## การสร้าง Custom Chart

### 1. สร้าง Chart ใหม่
```bash
helm create my-chart
```

### 2. แก้ไขไฟล์ใน `my-chart`
- เพิ่มการตั้งค่าใน `values.yaml`
- ปรับแต่งเทมเพลตใน `templates/`

### 3. ติดตั้ง Chart ที่สร้างขึ้น
```bash
helm install my-release ./my-chart
```

## การจัดการค่า Config ด้วยไฟล์ `values.yaml`
- แก้ไขไฟล์ `values.yaml` เพื่อปรับแต่งค่าที่ใช้ในเทมเพลต
- ตัวอย่าง:
```yaml
replicaCount: 2
image:
  repository: nginx
  tag: latest
service:
  type: ClusterIP
  port: 80
```

### การ Override ค่า
```bash
helm install my-release ./my-chart --set replicaCount=3
```

## Best Practices สำหรับการใช้งาน Helm
1. **ใช้ Repository ที่น่าเชื่อถือ**: ตรวจสอบแหล่งที่มาของ Charts ก่อนใช้งาน
2. **กำหนดค่าผ่าน `values.yaml`**: เพื่อความเป็นระเบียบและติดตามการเปลี่ยนแปลงได้ง่าย
3. **ใช้ Helm Secrets**: สำหรับจัดการข้อมูลที่สำคัญ เช่น API Keys
4. **ทดสอบ Charts ใหม่ใน Environment แยก**: เพื่อลดความเสี่ยง
5. **อัปเดต Charts และ Helm CLI อย่างสม่ำเสมอ**: เพื่อให้ได้ฟีเจอร์ใหม่และความปลอดภัย

## สรุป
Helm ช่วยลดความซับซ้อนในการจัดการ Kubernetes Applications โดยการใช้ Charts ที่สามารถปรับแต่งได้ การเรียนรู้และใช้งาน Helm อย่างถูกต้องสามารถช่วยเพิ่มประสิทธิภาพและความคล่องตัวในการทำงานใน Kubernetes Cluster
