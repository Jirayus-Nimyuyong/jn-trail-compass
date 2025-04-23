# ConfigMaps

ConfigMap ใน Kubernetes เป็นวิธีการจัดเก็บค่าคอนฟิกูเรชันที่ไม่ใช่ข้อมูลลับ (non-confidential) เช่น ค่าพารามิเตอร์ของแอปพลิเคชัน เพื่อให้สามารถแยกการตั้งค่าคอนฟิกออกจากโค้ดของแอปพลิเคชันได้

---

## คุณสมบัติของ ConfigMap

1. **แยกคอนฟิกออกจากโค้ด**
   - ลดความยุ่งยากในการอัปเดตและจัดการคอนฟิก

2. **รองรับการใช้งานหลายรูปแบบ**
   - ค่าสตริง
   - ไฟล์คอนฟิก
   - ตัวแปรสิ่งแวดล้อม (Environment Variables)

3. **ผสานรวมกับ Pod**
   - ConfigMap สามารถเชื่อมต่อกับ Pod เพื่อให้บริการคอนฟิกที่ต้องการ

---

## วิธีการสร้าง ConfigMap

### 1. การสร้างจากไฟล์ YAML

```yaml
apiVersion: v1
kind: ConfigMap
metadata:
  name: example-configmap
  namespace: default
  labels:
    app: my-app
data:
  app.name: "My Application"
  app.version: "1.0.0"
  database.url: "http://localhost:5432/db"
```

ใช้คำสั่งต่อไปนี้เพื่อสร้าง ConfigMap:
```bash
kubectl apply -f example-configmap.yaml
```

### 2. การสร้างจากคำสั่ง kubectl

```bash
kubectl create configmap example-configmap --from-literal=key1=value1 --from-literal=key2=value2
```

### 3. การสร้างจากไฟล์

```bash
kubectl create configmap example-configmap --from-file=path/to/config-file
```

---

## วิธีการใช้งาน ConfigMap

### 1. ใช้เป็น Environment Variables

ตัวอย่างการใช้งาน ConfigMap ใน Pod:

```yaml
apiVersion: v1
kind: Pod
metadata:
  name: example-pod
spec:
  containers:
  - name: example-container
    image: nginx
    env:
    - name: APP_NAME
      valueFrom:
        configMapKeyRef:
          name: example-configmap
          key: app.name
    - name: APP_VERSION
      valueFrom:
        configMapKeyRef:
          name: example-configmap
          key: app.version
```

### 2. ใช้เป็นไฟล์คอนฟิก

ConfigMap สามารถเมานต์เป็น Volume ได้:

```yaml
apiVersion: v1
kind: Pod
metadata:
  name: example-pod
spec:
  containers:
  - name: example-container
    image: nginx
    volumeMounts:
    - name: config-volume
      mountPath: /etc/config
  volumes:
  - name: config-volume
    configMap:
      name: example-configmap
```

### 3. ใช้ใน Command หรือ Arguments

```yaml
apiVersion: v1
kind: Pod
metadata:
  name: example-pod
spec:
  containers:
  - name: example-container
    image: nginx
    command: ["sh", "-c"]
    args: ["echo $(APP_NAME) version $(APP_VERSION)"]
    env:
    - name: APP_NAME
      valueFrom:
        configMapKeyRef:
          name: example-configmap
          key: app.name
    - name: APP_VERSION
      valueFrom:
        configMapKeyRef:
          name: example-configmap
          key: app.version
```

---

## การจัดการ ConfigMap

### ดูรายการ ConfigMap

```bash
kubectl get configmaps
```

### ดูรายละเอียด ConfigMap

```bash
kubectl describe configmap <configmap-name>
```

### ลบ ConfigMap

```bash
kubectl delete configmap <configmap-name>
```

---

ConfigMap เป็นเครื่องมือสำคัญที่ช่วยให้การจัดการคอนฟิกใน Kubernetes มีความยืดหยุ่นและง่ายต่อการปรับปรุง การใช้งาน ConfigMap ร่วมกับ Pods ทำให้สามารถเปลี่ยนแปลงค่าคอนฟิกได้โดยไม่จำเป็นต้องสร้าง Pods ใหม่
