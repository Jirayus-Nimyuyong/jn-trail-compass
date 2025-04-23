# Secrets

Secrets ใน Kubernetes เป็นวิธีการจัดเก็บข้อมูลที่มีความลับ เช่น รหัสผ่าน คีย์ API หรือข้อมูลรับรองต่าง ๆ อย่างปลอดภัย โดยข้อมูลเหล่านี้จะถูกเข้ารหัสแบบ Base64 และสามารถใช้ร่วมกับ Pods ได้อย่างยืดหยุ่น

---

## คุณสมบัติของ Secrets

1. **การจัดเก็บข้อมูลที่มีความลับ**
   - เช่น รหัสผ่าน ข้อมูลรับรอง หรือคีย์การเข้าถึง

2. **ความปลอดภัย**
   - ข้อมูลจะถูกเข้ารหัสแบบ Base64
   - สามารถกำหนดสิทธิ์การเข้าถึงได้ผ่าน RBAC (Role-Based Access Control)

3. **รองรับการใช้งานหลายรูปแบบ**
   - Environment Variables
   - Volume Mounts
   - การดึงค่าโดยตรงในแอปพลิเคชัน

---

## วิธีการสร้าง Secrets

### 1. การสร้างจากไฟล์ YAML

```yaml
apiVersion: v1
kind: Secret
metadata:
  name: example-secret
  namespace: default
data:
  username: dXNlcm5hbWU=   # "username" เข้ารหัสด้วย Base64
  password: cGFzc3dvcmQ=   # "password" เข้ารหัสด้วย Base64
```

ใช้คำสั่งเพื่อสร้าง Secret:
```bash
kubectl apply -f example-secret.yaml
```

### 2. การสร้างจากคำสั่ง kubectl

```bash
kubectl create secret generic example-secret \
  --from-literal=username=username \
  --from-literal=password=password
```

### 3. การสร้างจากไฟล์

```bash
kubectl create secret generic example-secret --from-file=path/to/secret-file
```

---

## วิธีการใช้งาน Secrets

### 1. ใช้เป็น Environment Variables

ตัวอย่างการใช้งาน Secret ใน Pod:

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
    - name: USERNAME
      valueFrom:
        secretKeyRef:
          name: example-secret
          key: username
    - name: PASSWORD
      valueFrom:
        secretKeyRef:
          name: example-secret
          key: password
```

### 2. ใช้เป็น Volume Mount

เมานต์ Secret เป็นไฟล์คอนฟิกใน Pod:

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
    - name: secret-volume
      mountPath: /etc/secret
      readOnly: true
  volumes:
  - name: secret-volume
    secret:
      secretName: example-secret
```

### 3. ใช้ดึงข้อมูลโดยตรงในแอปพลิเคชัน

ในแอปพลิเคชันสามารถดึงค่าจาก Secret ผ่านการอ่านไฟล์ใน `/etc/secret/` หรือผ่าน Environment Variables

---

## การจัดการ Secrets

### ดูรายการ Secrets

```bash
kubectl get secrets
```

### ดูรายละเอียดของ Secret

```bash
kubectl describe secret <secret-name>
```

### การดูค่าที่เข้ารหัส

```bash
kubectl get secret <secret-name> -o yaml
```

### ลบ Secret

```bash
kubectl delete secret <secret-name>
```

---

## ข้อควรรู้เกี่ยวกับ Secrets

1. **Base64 ไม่ใช่การเข้ารหัสที่ปลอดภัย**
   - Base64 เป็นเพียงการเข้ารหัสเพื่อการจัดเก็บที่ง่ายต่อการแปลงกลับ ไม่ใช่การป้องกันข้อมูล

2. **ควรใช้ Secrets อย่างระมัดระวัง**
   - ใช้ RBAC เพื่อควบคุมการเข้าถึง Secrets
   - เปิดใช้ฟีเจอร์ Encryption at Rest สำหรับ Kubernetes

3. **จัดการ Secrets ใน CI/CD**
   - หลีกเลี่ยงการเก็บ Secrets ในซอร์สโค้ด ใช้ Kubernetes Secrets แทน

---

Secrets ช่วยเพิ่มความปลอดภัยในการจัดการข้อมูลลับใน Kubernetes และเหมาะสำหรับการใช้งานที่ต้องการการแยกข้อมูลลับออกจากโค้ด การใช้งาน Secrets อย่างถูกต้องช่วยลดความเสี่ยงที่อาจเกิดขึ้นจากการรั่วไหลของข้อมูล
