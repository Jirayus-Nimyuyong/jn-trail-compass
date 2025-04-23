# Kubectl Commands

`kubectl` เป็นเครื่องมือ CLI สำหรับการจัดการ Kubernetes คลัสเตอร์ คุณสามารถใช้ `kubectl` เพื่อสร้าง อัปเดต ลบ และดูทรัพยากรใน Kubernetes ได้อย่างง่ายดาย

## คำสั่งพื้นฐานของ kubectl

### 1. คำสั่งสำหรับการตรวจสอบคลัสเตอร์

- **ตรวจสอบ Nodes ในคลัสเตอร์**
  ```bash
  kubectl get nodes
  ```

- **ตรวจสอบ Pods ใน Namespace ปัจจุบัน**
  ```bash
  kubectl get pods
  ```

- **ตรวจสอบข้อมูลใน Namespace อื่น**
  ```bash
  kubectl get pods -n <namespace>
  ```

- **ตรวจสอบ Services ทั้งหมด**
  ```bash
  kubectl get services
  ```

- **ตรวจสอบรายละเอียดของ Resource ใดๆ**
  ```bash
  kubectl describe <resource> <name>
  ```
  ตัวอย่าง:
  ```bash
  kubectl describe pod my-pod
  ```

### 2. การจัดการทรัพยากร

- **สร้าง Resource จากไฟล์ YAML/JSON**
  ```bash
  kubectl apply -f <filename>
  ```

- **ลบ Resource**
  ```bash
  kubectl delete <resource> <name>
  ```
  ตัวอย่าง:
  ```bash
  kubectl delete pod my-pod
  ```

- **อัปเดต Resource**
  ```bash
  kubectl apply -f <filename>
  ```

- **รีสตาร์ท Deployment**
  ```bash
  kubectl rollout restart deployment <deployment-name>
  ```

### 3. การดู Logs และ Debugging

- **ดู Logs ของ Pod**
  ```bash
  kubectl logs <pod-name>
  ```

- **ดู Logs ของ Container ใน Pod ที่ระบุ**
  ```bash
  kubectl logs <pod-name> -c <container-name>
  ```

- **เข้าสู่ Pod เพื่อ Debug**
  ```bash
  kubectl exec -it <pod-name> -- /bin/bash
  ```

### 4. การจัดการ Namespace

- **ดู Namespace ทั้งหมด**
  ```bash
  kubectl get namespaces
  ```

- **สร้าง Namespace ใหม่**
  ```bash
  kubectl create namespace <namespace-name>
  ```

- **ลบ Namespace**
  ```bash
  kubectl delete namespace <namespace-name>
  ```

### 5. การปรับแต่ง Output

- **แสดงผลในรูปแบบ Wide (รายละเอียดเพิ่มเติม)**
  ```bash
  kubectl get pods -o wide
  ```

- **แสดงผลในรูปแบบ YAML/JSON**
  ```bash
  kubectl get <resource> <name> -o yaml
  kubectl get <resource> <name> -o json
  ```

### 6. การทำงานกับ Context

- **ดู Context ปัจจุบัน**
  ```bash
  kubectl config current-context
  ```

- **ดู Context ทั้งหมด**
  ```bash
  kubectl config get-contexts
  ```

- **สลับ Context**
  ```bash
  kubectl config use-context <context-name>
  ```

### 7. การจัดการ Label และ Annotation

- **เพิ่ม Label ให้ Resource**
  ```bash
  kubectl label <resource> <name> <key>=<value>
  ```

- **ลบ Label จาก Resource**
  ```bash
  kubectl label <resource> <name> <key>-
  ```

- **เพิ่ม Annotation ให้ Resource**
  ```bash
  kubectl annotate <resource> <name> <key>=<value>
  ```

---

`kubectl` เป็นเครื่องมือที่ทรงพลังสำหรับการจัดการ Kubernetes คลัสเตอร์ การฝึกใช้คำสั่งเหล่านี้จะช่วยให้คุณสามารถจัดการและตรวจสอบระบบได้อย่างมีประสิทธิภาพ
