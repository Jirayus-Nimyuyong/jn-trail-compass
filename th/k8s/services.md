# Services

Service ใน Kubernetes ใช้สำหรับการเชื่อมต่อ Pods กับผู้ใช้งานหรือ Pods อื่น ๆ โดยทำหน้าที่เป็น Abstraction Layer ระหว่างกลุ่มของ Pods และคลัสเตอร์หรือเครือข่ายภายนอก

## ประเภทของ Services

1. **ClusterIP** (ค่าเริ่มต้น)
   - สร้าง IP ภายในคลัสเตอร์ที่สามารถเข้าถึงได้เฉพาะในคลัสเตอร์
   - ใช้สำหรับการสื่อสารระหว่าง Pods ภายในคลัสเตอร์

2. **NodePort**
   - เปิดพอร์ตเฉพาะบน Node เพื่อให้สามารถเข้าถึงได้จากภายนอกคลัสเตอร์
   - ใช้ร่วมกับ ClusterIP

3. **LoadBalancer**
   - สร้าง Load Balancer ภายนอกเพื่อแจกจ่ายทราฟฟิกไปยัง Pods
   - เหมาะสำหรับการเปิดให้บริการแก่ผู้ใช้งานภายนอกคลัสเตอร์

4. **ExternalName**
   - ใช้สำหรับการแมปชื่อ DNS ภายนอกโดยตรง
   - ไม่ได้สร้าง IP ภายในคลัสเตอร์

---

## การสร้าง Service

### ตัวอย่างไฟล์ YAML สำหรับ ClusterIP
```yaml
apiVersion: v1
kind: Service
metadata:
  name: my-service
spec:
  selector:
    app: my-app
  ports:
  - protocol: TCP
    port: 80
    targetPort: 8080
  type: ClusterIP
```

### การสร้าง Service ด้วย NodePort
```yaml
apiVersion: v1
kind: Service
metadata:
  name: my-service
spec:
  selector:
    app: my-app
  ports:
  - protocol: TCP
    port: 80
    targetPort: 8080
    nodePort: 30007
  type: NodePort
```

### การสร้าง Service ด้วย LoadBalancer
```yaml
apiVersion: v1
kind: Service
metadata:
  name: my-service
spec:
  selector:
    app: my-app
  ports:
  - protocol: TCP
    port: 80
    targetPort: 8080
  type: LoadBalancer
```

### การสร้าง Service ด้วย ExternalName
```yaml
apiVersion: v1
kind: Service
metadata:
  name: external-service
spec:
  type: ExternalName
  externalName: example.com
```

---

## การจัดการ Service

### การสร้าง Service

ใช้คำสั่ง:
```bash
kubectl apply -f my-service.yaml
```

### การดู Service ทั้งหมด

```bash
kubectl get services
```

### การดูรายละเอียดของ Service

```bash
kubectl describe service <service-name>
```

### การลบ Service

```bash
kubectl delete service <service-name>
```

---

## การทำงานของ Services

1. **Selector และ Label Matching**
   - Service ใช้ `selector` เพื่อตรวจสอบ Pods ที่ต้องการเชื่อมต่อ โดยอ้างอิงจาก Labels

2. **Endpoints**
   - Service จะสร้าง Endpoints เพื่อบอกว่า Pods ใดบ้างที่ตรงกับ Selector

3. **การแจกจ่ายทราฟฟิก**
   - ทราฟฟิกจะถูกกระจายไปยัง Pods ที่ตรงกับ Selector แบบ Round Robin (ค่าเริ่มต้น)

---

## ตัวอย่างการใช้งานจริง

1. **สร้าง Deployment และ Service**
   ```yaml
   apiVersion: apps/v1
   kind: Deployment
   metadata:
     name: my-app
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
           image: nginx
           ports:
           - containerPort: 8080
   ---
   apiVersion: v1
   kind: Service
   metadata:
     name: my-service
   spec:
     selector:
       app: my-app
     ports:
     - protocol: TCP
       port: 80
       targetPort: 8080
     type: ClusterIP
   ```
   
2. **ตรวจสอบ Service**
   ```bash
   kubectl get services
   ```

3. **เข้าถึง Service ภายในคลัสเตอร์**
   ใช้ `curl` หรือโปรแกรมอื่น ๆ:
   ```bash
   curl http://<service-name>:80
   ```

---

Service เป็นส่วนสำคัญที่ช่วยจัดการการเชื่อมต่อระหว่าง Pods และระบบเครือข่ายใน Kubernetes การเลือกประเภทของ Service ให้เหมาะสมกับการใช้งานช่วยเพิ่มประสิทธิภาพและความสะดวกในการบริหารจัดการแอปพลิเคชัน
