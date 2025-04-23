# Pods

Pod เป็นหน่วยพื้นฐานที่เล็กที่สุดใน Kubernetes สำหรับการจัดการและปรับใช้คอนเทนเนอร์ Pod สามารถมีคอนเทนเนอร์หนึ่งตัวหรือหลายตัวที่ทำงานร่วมกันในกลุ่มเดียวกัน และแชร์ทรัพยากรบางอย่าง เช่น Network และ Storage

## คุณสมบัติของ Pods

1. **Single IP Address**
   - Pod แต่ละตัวจะมี IP Address ของตัวเอง ซึ่งใช้ร่วมกันระหว่างคอนเทนเนอร์ภายใน Pod

2. **Shared Storage**
   - คอนเทนเนอร์ใน Pod เดียวกันสามารถแชร์ Volume ได้

3. **การสื่อสารระหว่างคอนเทนเนอร์**
   - คอนเทนเนอร์ภายใน Pod เดียวกันสามารถสื่อสารกันผ่าน localhost

4. **Lifecycle**
   - Pod มีวงจรชีวิตของตัวเอง ตั้งแต่การเริ่มต้นจนถึงการหยุดทำงาน

## การใช้งาน Pods

### การสร้าง Pod ด้วย YAML

ตัวอย่างไฟล์ YAML สำหรับการสร้าง Pod:
```yaml
apiVersion: v1
kind: Pod
metadata:
  name: my-pod
  labels:
    app: my-app
spec:
  containers:
  - name: my-container
    image: nginx
    ports:
    - containerPort: 80
```
คำสั่งสำหรับสร้าง Pod:
```bash
kubectl apply -f my-pod.yaml
```

### การตรวจสอบสถานะของ Pods

- **ดูรายการ Pods ทั้งหมด**
  ```bash
  kubectl get pods
  ```

- **ดูรายละเอียดของ Pod**
  ```bash
  kubectl describe pod <pod-name>
  ```

- **ดู Logs ของ Pod**
  ```bash
  kubectl logs <pod-name>
  ```

### การลบ Pod

- **ลบ Pod ด้วยชื่อ**
  ```bash
  kubectl delete pod <pod-name>
  ```

- **ลบ Pod ด้วยไฟล์ YAML**
  ```bash
  kubectl delete -f my-pod.yaml
  ```

### การ Debug Pod

- **เข้าสู่ Pod เพื่อ Debug**
  ```bash
  kubectl exec -it <pod-name> -- /bin/bash
  ```

### การปรับแต่ง Pod

1. **Environment Variables**
   กำหนดค่า Environment Variables ในคอนเทนเนอร์:
   ```yaml
   env:
   - name: ENV_VAR_NAME
     value: "value"
   ```

2. **Volumes**
   กำหนด Volume สำหรับแชร์ข้อมูลระหว่างคอนเทนเนอร์ใน Pod:
   ```yaml
   volumes:
   - name: shared-data
     emptyDir: {}
   ```

3. **Liveness และ Readiness Probes**
   ใช้ตรวจสอบสุขภาพของคอนเทนเนอร์:
   ```yaml
   livenessProbe:
     httpGet:
       path: /healthz
       port: 8080
     initialDelaySeconds: 3
     periodSeconds: 5
   readinessProbe:
     httpGet:
       path: /ready
       port: 8080
     initialDelaySeconds: 3
     periodSeconds: 5
   ```

## Pod Lifecycle

1. **Pending**
   - Pod ถูกสร้าง แต่ยังไม่ได้เริ่มคอนเทนเนอร์

2. **Running**
   - คอนเทนเนอร์ใน Pod กำลังทำงาน

3. **Succeeded**
   - คอนเทนเนอร์ทั้งหมดใน Pod หยุดทำงานและสำเร็จ

4. **Failed**
   - คอนเทนเนอร์ใน Pod หยุดทำงานและล้มเหลว

5. **Unknown**
   - Kubernetes ไม่สามารถตรวจสอบสถานะของ Pod ได้

---

Pods เป็นหัวใจหลักของ Kubernetes การเข้าใจโครงสร้างและการทำงานของ Pod จะช่วยให้คุณสามารถปรับใช้และจัดการแอปพลิเคชันใน Kubernetes ได้อย่างมีประสิทธิภาพ
