# Deployments

Deployment เป็น Kubernetes Resource ที่ใช้สำหรับการจัดการและปรับใช้แอปพลิเคชันอย่างมีประสิทธิภาพ Deployment ช่วยให้คุณสามารถอัปเดต Pod, ควบคุมจำนวน Replica และทำการ Rollback ไปยังเวอร์ชันก่อนหน้าได้

## คุณสมบัติของ Deployment

1. **การปรับจำนวน Replica**
   - Deployment สามารถควบคุมจำนวน Replica (สำเนา) ของ Pods ที่ต้องการรัน

2. **การอัปเดตแบบ Rolling Update**
   - Deployment รองรับการอัปเดตแบบ Rolling Update เพื่อเปลี่ยนแปลงแอปพลิเคชันโดยไม่ทำให้การให้บริการหยุดชะงัก

3. **การทำ Rollback**
   - สามารถย้อนกลับไปยังเวอร์ชันก่อนหน้าได้หากการอัปเดตล้มเหลว

4. **การจัดการอัตโนมัติ**
   - Kubernetes จะจัดการ Pods และ ReplicaSets ให้ตรงกับการตั้งค่าใน Deployment

## การใช้งาน Deployment

### ตัวอย่างไฟล์ YAML ของ Deployment

```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: my-deployment
  labels:
    app: my-app
spec:
  replicas: 3
  selector:
    matchLabels:
      app: my-app
  template:
    metadata:
      labels:
        app: my-app
    spec:
      containers:
      - name: my-container
        image: nginx:1.21
        ports:
        - containerPort: 80
```

### การสร้าง Deployment

ใช้คำสั่ง `kubectl apply`:
```bash
kubectl apply -f my-deployment.yaml
```

### การตรวจสอบสถานะ Deployment

- **ดู Deployment ทั้งหมด**
  ```bash
  kubectl get deployments
  ```

- **ดูรายละเอียดของ Deployment**
  ```bash
  kubectl describe deployment <deployment-name>
  ```

- **ดู Pods ที่เกี่ยวข้องกับ Deployment**
  ```bash
  kubectl get pods -l app=my-app
  ```

### การปรับจำนวน Replica

- แก้ไขไฟล์ YAML หรือใช้คำสั่ง:
  ```bash
  kubectl scale deployment <deployment-name> --replicas=5
  ```

### การอัปเดต Deployment

1. **แก้ไขไฟล์ YAML (เช่นเปลี่ยน image)**
   ```yaml
   containers:
   - name: my-container
     image: nginx:1.22
   ```

2. **อัปเดต Deployment ด้วยคำสั่ง**
   ```bash
   kubectl apply -f my-deployment.yaml
   ```

3. **ตรวจสอบสถานะการอัปเดต**
   ```bash
   kubectl rollout status deployment <deployment-name>
   ```

### การ Rollback Deployment

- **Rollback ไปยังเวอร์ชันก่อนหน้า**
  ```bash
  kubectl rollout undo deployment <deployment-name>
  ```

- **ดูประวัติของการเปลี่ยนแปลง**
  ```bash
  kubectl rollout history deployment <deployment-name>
  ```

### การลบ Deployment

- **ลบ Deployment และ Pods ที่เกี่ยวข้อง**
  ```bash
  kubectl delete deployment <deployment-name>
  ```

---

## การทำงานเบื้องหลังของ Deployment

1. **Deployment Controller**
   - จัดการการสร้าง ReplicaSets และควบคุม Pods ให้ตรงตามจำนวนที่กำหนด

2. **ReplicaSet**
   - เป็นตัวควบคุมจำนวน Replica ของ Pods

3. **Rolling Update**
   - Deployment จะสร้าง ReplicaSet ใหม่และลบ ReplicaSet เก่าออกทีละขั้นตอน เพื่อให้การเปลี่ยนแปลงไม่มี Downtime

---

Deployment เป็นเครื่องมือสำคัญสำหรับการจัดการแอปพลิเคชันใน Kubernetes การเข้าใจวิธีการใช้งานและคำสั่งต่าง ๆ จะช่วยให้คุณจัดการคลัสเตอร์ได้อย่างมีประสิทธิภาพ
