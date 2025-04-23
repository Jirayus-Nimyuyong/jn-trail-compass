# Kubernetes Advanced Deployments

## Introduction
การทำ **Advanced Deployments** ใน Kubernetes เป็นขั้นตอนสำคัญในการจัดการและปรับปรุงการให้บริการแอปพลิเคชันที่มีความซับซ้อนมากขึ้น เมื่อคุณต้องการการควบคุมที่ยืดหยุ่นในการเผยแพร่แอปพลิเคชัน, ปรับแต่งพฤติกรรมของ Pods และบำรุงรักษาแอปพลิเคชันที่มีอยู่ การทำงานเหล่านี้สามารถทำได้โดยการใช้ **Deployments**, **Rollout Strategies**, **Blue/Green Deployment**, **Canary Deployments**, และ **Rolling Updates**

ในบทนี้, เราจะเรียนรู้เกี่ยวกับ **Advanced Deployment** Strategies ใน Kubernetes ซึ่งรวมถึงวิธีการใช้ **Rolling Updates**, **Blue/Green Deployments**, **Canary Deployments**, และการจัดการ **Deployment Rollbacks**

## Key Concepts

1. **Rolling Updates**:
   - **Rolling Updates** เป็นกลยุทธ์ที่ใช้ในการอัปเดตแอปพลิเคชันโดยไม่ทำให้แอปพลิเคชันหยุดทำงานทั้งหมดในเวลาเดียวกัน Kubernetes จะค่อยๆ แทนที่ Pods เก่าไปด้วย Pods ใหม่ทีละตัว
   - Rolling Updates จะมีความสำคัญมากในกรณีที่ต้องการอัปเดตแอปพลิเคชันที่ไม่มี downtime

2. **Blue/Green Deployment**:
   - **Blue/Green Deployment** เป็นกลยุทธ์ที่คุณจะมีสองชุดของสภาพแวดล้อม (Environment): สภาพแวดล้อม **Blue** (เวอร์ชันเก่า) และ **Green** (เวอร์ชันใหม่)
   - ในการทำ **Blue/Green Deployment**, คุณจะเปลี่ยนการกำหนดค่า Load Balancer หรือ Ingress จากเวอร์ชันเก่า (Blue) ไปยังเวอร์ชันใหม่ (Green) เมื่อพร้อม
   - เมื่อการสลับไปยัง **Green** เสร็จสิ้น, สภาพแวดล้อม **Blue** จะสามารถลบออกได้

3. **Canary Deployments**:
   - **Canary Deployments** เป็นกลยุทธ์ที่คุณทำการอัปเดตแอปพลิเคชันในจำนวนเล็กน้อย (หรือบางส่วน) ก่อนที่จะแพร่กระจายไปยังทุก Node หรือ Pod
   - สร้าง **Canary Pods** ที่จะใช้งานเวอร์ชันใหม่ แล้วทดสอบกับผู้ใช้หรือการจราจรเพียงเล็กน้อยเพื่อให้แน่ใจว่าไม่มีปัญหาก่อนการปล่อยเวอร์ชันใหม่ไปยังผู้ใช้ทั้งหมด

4. **Deployment Rollbacks**:
   - Kubernetes รองรับการ **Rollback** ซึ่งหมายถึงการย้อนกลับการอัปเดต Deployment ไปยังเวอร์ชันก่อนหน้า หากพบปัญหาหลังจากการอัปเดต
   - คุณสามารถใช้คำสั่ง `kubectl rollout undo` เพื่อทำการย้อนกลับการเปลี่ยนแปลง Deployment

## How Advanced Deployments Work

### Rolling Updates

ใน Kubernetes, การอัปเดตแบบ **Rolling Update** จะทำการอัปเดต Pod ทีละตัวโดยไม่หยุดการทำงานของแอปพลิเคชัน ดังนั้นผู้ใช้จะไม่ประสบปัญหาการหยุดทำงาน การตั้งค่าการอัปเดตที่สามารถปรับแต่งได้รวมถึง:
- **maxSurge**: จำนวน Pods ที่สามารถเพิ่มขึ้นในระหว่างการอัปเดต
- **maxUnavailable**: จำนวน Pods ที่สามารถไม่พร้อมใช้งานในระหว่างการอัปเดต

#### Example of Rolling Update Deployment

```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: my-app
spec:
  replicas: 3
  strategy:
    type: RollingUpdate
    rollingUpdate:
      maxSurge: 1
      maxUnavailable: 1
  selector:
    matchLabels:
      app: my-app
  template:
    metadata:
      labels:
        app: my-app
    spec:
      containers:
      - name: my-app
        image: my-app:v2
        ports:
        - containerPort: 8080
```

ในตัวอย่างนี้:
- **maxSurge** กำหนดให้สามารถเพิ่ม Pods ใหม่ได้ 1 ตัวในระหว่างการอัปเดต
- **maxUnavailable** กำหนดให้สามารถลด Pods ที่ใช้งานอยู่ได้สูงสุด 1 ตัว

### Blue/Green Deployment

ใน **Blue/Green Deployment**, คุณจะใช้สองเวอร์ชันของแอปพลิเคชัน: เวอร์ชัน **Blue** (เวอร์ชันเก่า) และ **Green** (เวอร์ชันใหม่) หลังจากที่คุณพร้อมที่จะย้ายไปยังเวอร์ชันใหม่, คุณจะเปลี่ยนการกำหนดค่า Load Balancer หรือ Ingress จาก Blue ไปยัง Green

#### Example of Blue/Green Deployment

```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: my-app-blue
spec:
  replicas: 3
  selector:
    matchLabels:
      app: my-app
      version: blue
  template:
    metadata:
      labels:
        app: my-app
        version: blue
    spec:
      containers:
      - name: my-app
        image: my-app:v1
        ports:
        - containerPort: 8080
```

```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: my-app-green
spec:
  replicas: 3
  selector:
    matchLabels:
      app: my-app
      version: green
  template:
    metadata:
      labels:
        app: my-app
        version: green
    spec:
      containers:
      - name: my-app
        image: my-app:v2
        ports:
        - containerPort: 8080
```

ในตัวอย่างนี้:
- คุณจะมีสอง Deployment ที่มี labels ต่างกัน: **version: blue** และ **version: green**
- เมื่อคุณพร้อมที่จะย้ายไปยังเวอร์ชันใหม่, เพียงแค่เปลี่ยนค่า Ingress หรือ Load Balancer จาก **blue** ไปเป็น **green**

### Canary Deployment

**Canary Deployment** ช่วยให้คุณสามารถทดสอบแอปพลิเคชันเวอร์ชันใหม่กับกลุ่มผู้ใช้จำนวนน้อยก่อนที่จะเผยแพร่ให้กับทุกคน วิธีนี้ช่วยให้คุณมั่นใจว่าเวอร์ชันใหม่ไม่มีข้อผิดพลาดหรือปัญหาที่ส่งผลกระทบต่อผู้ใช้ส่วนใหญ่

#### Example of Canary Deployment

```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: my-app
spec:
  replicas: 5
  strategy:
    type: RollingUpdate
    rollingUpdate:
      maxSurge: 2
      maxUnavailable: 1
  selector:
    matchLabels:
      app: my-app
  template:
    metadata:
      labels:
        app: my-app
    spec:
      containers:
      - name: my-app
        image: my-app:v2
        ports:
        - containerPort: 8080
```

ในตัวอย่างนี้:
- คุณจะเริ่มต้นการอัปเดตแค่ 1 Pod หรือ 2 Pods จากทั้งหมด 5 Pods (โดยใช้ **maxSurge** และ **maxUnavailable**)
- สามารถปรับขนาดการอัปเดตได้ตามความจำเป็นและตรวจสอบปัญหาก่อนการเผยแพร่ไปยังทุก Pod

### Rollback Deployments

ในกรณีที่มีข้อผิดพลาดหลังจากการอัปเดต, Kubernetes รองรับการ **Rollback** Deployment ไปยังเวอร์ชันก่อนหน้าได้:

```bash
kubectl rollout undo deployment/my-app
```

คำสั่งนี้จะทำการย้อนกลับ Deployment ไปยังสถานะก่อนหน้าที่ทำงานได้อย่างสมบูรณ์

## Best Practices for Advanced Deployments

1. **Monitor Rollouts**:
   - ควรตรวจสอบการดำเนินการของ Deployment ระหว่างการอัปเดตทุกครั้ง โดยใช้คำสั่ง `kubectl rollout status` เพื่อตรวจสอบสถานะของ Deployment

2. **Use Readiness and Liveness Probes**:
   - ใช้ **Readiness** และ **Liveness Probes** เพื่อตรวจสอบสถานะของ Pods ในระหว่างการทำการอัปเดตเพื่อให้มั่นใจว่า Pods ที่ไม่พร้อมจะไม่ถูกส่งคำขอ

3. **Ensure Zero Downtime**:
   - เลือกกลยุทธ์การอัปเดตที่เหมาะสม (Rolling Updates, Blue/Green, Canary) เพื่อให้การอัปเดตแอปพลิเคชันมีการทำงานโดยไม่มี downtime

4. **Test Canary Deployments**:
   - ใช้ **Canary Deployment** เพื่อทดสอบเวอร์ชันใหม่ในกลุ่มผู้ใช้จำนวนน้อยก่อนการเผยแพร่ไปยังผู้ใช้ทั้งหมด

5. **Backup Before Update**:
   - ควรทำการสำรองข้อมูลและคอนฟิกก่อนที่จะทำการอัปเดต Deployment เพื่อให้สามารถย้อนกลับได้หากเกิดปัญหาขึ้น

## Conclusion

**Advanced Deployments** ใน Kubernetes เป็นเครื่องมือที่สำคัญในการปรับปรุงการเผยแพร่แอปพลิเคชันให้มีความยืดหยุ่นและไม่มี downtime โดยการใช้ **Rolling Updates**, **Blue/Green Deployments**, และ **Canary Deployments** ช่วยให้สามารถควบคุมกระบวนการอัปเดตแอปพลิเคชันได้อย่างมีประสิทธิภาพและปลอดภัย การใช้ **Rollback** ช่วยให้คุณสามารถย้อนกลับการเปลี่ยนแปลงได้ง่ายในกรณีที่เกิดปัญหาหลังจากการอัปเดต