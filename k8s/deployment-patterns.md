# Kubernetes Deployment Patterns

## บทนำ
ใน Kubernetes การ **Deployment** เป็นกระบวนการที่ใช้ในการจัดการการปรับใช้และอัปเดตแอปพลิเคชันที่รันอยู่ใน Cluster การใช้ Deployment Patterns ที่เหมาะสมช่วยให้แอปพลิเคชันสามารถรองรับการเปลี่ยนแปลงได้อย่างราบรื่น ลด Downtime และเพิ่มความมั่นใจในการปรับปรุงระบบ

## Deployment Patterns หลักใน Kubernetes

### 1. Recreate Deployment
- **ลักษณะการทำงาน**:
  - หยุด Pods ที่ใช้งานอยู่ก่อน จากนั้นจึงสร้าง Pods ใหม่
- **ข้อดี**:
  - เรียบง่าย เหมาะสำหรับแอปพลิเคชันที่ไม่ต้องการการรันพร้อมกัน
- **ข้อเสีย**:
  - เกิด Downtime ระหว่างการหยุดและเริ่มใหม่

```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: recreate-deployment
spec:
  replicas: 3
  strategy:
    type: Recreate
  template:
    metadata:
      labels:
        app: example
    spec:
      containers:
      - name: app
        image: nginx
```

### 2. Rolling Update Deployment
- **ลักษณะการทำงาน**:
  - อัปเดต Pods ทีละกลุ่ม โดยสร้าง Pods ใหม่ก่อนที่จะลบ Pods เก่า
- **ข้อดี**:
  - ไม่มี Downtime
  - ราบรื่นสำหรับการอัปเดตแอปพลิเคชัน
- **ข้อเสีย**:
  - ใช้เวลาเพิ่มขึ้นเมื่อเทียบกับ Recreate

```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: rolling-update-deployment
spec:
  replicas: 3
  strategy:
    type: RollingUpdate
    rollingUpdate:
      maxUnavailable: 1
      maxSurge: 1
  template:
    metadata:
      labels:
        app: example
    spec:
      containers:
      - name: app
        image: nginx
```

### 3. Blue-Green Deployment
- **ลักษณะการทำงาน**:
  - สร้างสภาพแวดล้อมใหม่ทั้งหมด (Blue หรือ Green) แล้วเปลี่ยนการรับส่งทราฟฟิกไปยังสภาพแวดล้อมใหม่เมื่อพร้อม
- **ข้อดี**:
  - ง่ายต่อการ Rollback
  - ลดความเสี่ยงระหว่างการอัปเดต
- **ข้อเสีย**:
  - ต้องการทรัพยากรเพิ่มสำหรับสภาพแวดล้อมใหม่

การใช้งาน Blue-Green Deployment มักใช้ร่วมกับ **Services** หรือ **Ingress** เพื่อจัดการการเปลี่ยนทราฟฟิก

### 4. Canary Deployment
- **ลักษณะการทำงาน**:
  - ปล่อยอัปเดตให้กับผู้ใช้บางส่วนก่อน (Canary) แล้วค่อยเพิ่มการใช้งาน
- **ข้อดี**:
  - ทดสอบอัปเดตในส่วนเล็ก ๆ ของผู้ใช้ก่อน
  - ลดผลกระทบจากการเปลี่ยนแปลง
- **ข้อเสีย**:
  - การตั้งค่าซับซ้อน

ตัวอย่างการจัดการด้วย **Labels** และ **Selectors** เพื่อแยก Canary และ Production Pods:

```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: canary-deployment
spec:
  replicas: 2
  template:
    metadata:
      labels:
        app: example
        version: canary
    spec:
      containers:
      - name: app
        image: nginx:1.21
```

### 5. A/B Testing Deployment
- **ลักษณะการทำงาน**:
  - ทดสอบฟีเจอร์ใหม่ในแอปพลิเคชันกับกลุ่มผู้ใช้ที่กำหนด
- **ข้อดี**:
  - ช่วยวัดผลและเปรียบเทียบระหว่างเวอร์ชัน
- **ข้อเสีย**:
  - ต้องใช้การตั้งค่าที่ซับซ้อน เช่น การจัดการทราฟฟิกในระดับแอปพลิเคชัน

### 6. Shadow Deployment
- **ลักษณะการทำงาน**:
  - ส่งสำเนาทราฟฟิกที่แท้จริงไปยังแอปพลิเคชันใหม่เพื่อทดสอบโดยไม่กระทบกับผู้ใช้จริง
- **ข้อดี**:
  - ทดสอบแอปพลิเคชันใหม่ในสถานการณ์จริง
- **ข้อเสีย**:
  - ต้องการทรัพยากรเพิ่ม และอาจต้องตั้งค่าการจัดการทราฟฟิกพิเศษ

## Best Practices
1. **เลือก Deployment Pattern ที่เหมาะสม**:
   - พิจารณา Downtime และความซับซ้อนที่ยอมรับได้

2. **ทดสอบก่อนการอัปเดต**:
   - ใช้ Canary หรือ Blue-Green Deployment เพื่อลดความเสี่ยง

3. **วางแผน Rollback**:
   - เตรียมกลยุทธ์ Rollback ที่รวดเร็ว เช่น ใช้ `kubectl rollout undo`

4. **ติดตามผลลัพธ์**:
   - ใช้เครื่องมือ Monitoring เช่น Prometheus และ Grafana เพื่อตรวจสอบประสิทธิภาพของแอปพลิเคชันหลังการอัปเดต

5. **จัดการทรัพยากรอย่างมีประสิทธิภาพ**:
   - ใช้ Auto Scaling และ Resource Quotas เพื่อเพิ่มความยืดหยุ่น

## สรุป
การเลือก Deployment Patterns ที่เหมาะสมใน Kubernetes เป็นสิ่งสำคัญที่ช่วยให้แอปพลิเคชันสามารถพัฒนาและปรับปรุงได้อย่างมั่นคงและปลอดภัย การปรับใช้กลยุทธ์ที่เหมาะสมกับความต้องการของระบบจะช่วยลดความเสี่ยงและเพิ่มความน่าเชื่อถือของแอปพลิเคชันใน Production
