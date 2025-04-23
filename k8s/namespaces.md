# Kubernetes Namespaces

## Introduction
Kubernetes Namespaces เป็นฟีเจอร์ที่ช่วยให้คุณสามารถแบ่งแยกทรัพยากรภายในคลัสเตอร์ Kubernetes ออกเป็นกลุ่มต่างๆ เพื่อให้การจัดการและการเข้าถึงง่ายขึ้น โดยการใช้ Namespaces, ผู้ใช้งานสามารถแยกแยะระหว่างแอปพลิเคชันต่างๆ หรือแยกแยะแหล่งข้อมูลตามลักษณะการใช้งานหรือความต้องการของทีมงาน

## Key Concepts

1. **Namespace**:
   - Namespace เป็นการแบ่งแยกของ Kubernetes คลัสเตอร์ โดยใช้ในการแยกทรัพยากรต่างๆ เช่น Pods, Services, Deployments, และอื่นๆ
   - การใช้ Namespace ช่วยให้สามารถจัดการและควบคุมการเข้าถึงทรัพยากรได้ง่ายขึ้นในคลัสเตอร์ที่มีหลายแอปพลิเคชันหรือทีมงาน

2. **Default Namespace**:
   - หากคุณไม่กำหนด Namespace สำหรับทรัพยากร Kubernetes จะถูกสร้างขึ้นใน `default` namespace โดยอัตโนมัติ

3. **Resource Isolation**:
   - Kubernetes ใช้ Namespaces เพื่อแยกแอปพลิเคชันและทรัพยากรระหว่างกัน เช่น จำกัดการเข้าถึงเครือข่ายและการใช้งานทรัพยากร

4. **Namespacing for Multi-Tenancy**:
   - Namespaces มีประโยชน์ในการทำงานร่วมกันระหว่างหลายทีม หรือหลายโครงการในคลัสเตอร์เดียว โดยสามารถตั้งชื่อแยกตามแต่ละทีม/โครงการและจำกัดสิทธิ์การเข้าถึง

5. **Quota and Limits**:
   - Kubernetes สามารถกำหนดการใช้ทรัพยากร (เช่น CPU, Memory) ต่อ Namespace ด้วยการใช้ ResourceQuotas ซึ่งช่วยให้การควบคุมการใช้ทรัพยากรภายในคลัสเตอร์เป็นไปอย่างยุติธรรม

## Creating and Managing Namespaces

### Create a Namespace

คุณสามารถสร้าง Namespace ใหม่ได้ด้วยคำสั่ง `kubectl` หรือการใช้ไฟล์ YAML:

```bash
kubectl create namespace my-namespace
```

หรือใช้ไฟล์ YAML ดังนี้:

```yaml
apiVersion: v1
kind: Namespace
metadata:
  name: my-namespace
```

หลังจากที่สร้าง Namespace แล้ว, คุณสามารถตรวจสอบได้ว่ามี Namespace อะไรบ้างในคลัสเตอร์:

```bash
kubectl get namespaces
```

### Use a Namespace in a Pod

เมื่อสร้าง Pod หรือทรัพยากร Kubernetes อื่นๆ, คุณสามารถระบุว่าให้ใช้ Namespace ไหนได้ในไฟล์ YAML เช่น:

```yaml
apiVersion: v1
kind: Pod
metadata:
  name: mypod
  namespace: my-namespace
spec:
  containers:
  - name: nginx
    image: nginx
```

ในตัวอย่างนี้, Pod `mypod` จะถูกสร้างใน `my-namespace`

### Set a Default Namespace for kubectl

เพื่อหลีกเลี่ยงการระบุ Namespace ทุกครั้งที่ใช้คำสั่ง `kubectl`, คุณสามารถตั้งค่าการใช้ Namespace เริ่มต้นได้ด้วยคำสั่ง:

```bash
kubectl config set-context --current --namespace=my-namespace
```

หลังจากตั้งค่าแล้ว, ทุกคำสั่ง `kubectl` จะใช้ `my-namespace` โดยอัตโนมัติ

### Resource Quotas in Namespaces

เพื่อป้องกันไม่ให้ Namespace ใช้ทรัพยากรมากเกินไป, คุณสามารถกำหนด ResourceQuotas ภายใน Namespace ได้:

```yaml
apiVersion: v1
kind: ResourceQuota
metadata:
  name: my-quota
  namespace: my-namespace
spec:
  hard:
    requests.cpu: "4"
    requests.memory: 8Gi
    limits.cpu: "10"
    limits.memory: 16Gi
```

ในตัวอย่างนี้, Namespace `my-namespace` จะมีการกำหนดข้อจำกัดในการใช้ CPU และ Memory

### Network Policies for Namespaces

Kubernetes รองรับการตั้งค่า **Network Policies** ที่ใช้ในการควบคุมการเข้าถึงเครือข่ายระหว่าง Pods ในแต่ละ Namespace ตัวอย่างเช่น:

```yaml
apiVersion: networking.k8s.io/v1
kind: NetworkPolicy
metadata:
  name: allow-traffic
  namespace: my-namespace
spec:
  podSelector:
    matchLabels:
      role: frontend
  ingress:
    - from:
      - podSelector:
          matchLabels:
            role: backend
```

ในตัวอย่างนี้, Pods ใน `my-namespace` ที่มี label `role: frontend` สามารถรับการเชื่อมต่อจาก Pods ที่มี label `role: backend` เท่านั้น

## Common Use Cases for Namespaces

1. **Multi-Tenancy**:
   - ใช้ Namespaces เพื่อแยกการทำงานของหลายทีมในคลัสเตอร์เดียวกัน เช่น ทีม A และทีม B อาจจะทำงานใน Namespace ที่แยกกัน เพื่อไม่ให้การทำงานของแต่ละทีมไปกระทบกัน

2. **Environment Segregation**:
   - ใช้ Namespaces ในการแยกแอปพลิเคชันที่ทำงานในแต่ละสภาพแวดล้อม เช่น การแยกระหว่าง development, staging, และ production

3. **Resource Management**:
   - ใช้ Namespaces เพื่อจัดการทรัพยากรให้เป็นระเบียบและจำกัดการใช้ทรัพยากรตามทีมงานหรือแอปพลิเคชัน

## Conclusion

Kubernetes Namespaces เป็นฟีเจอร์ที่มีความสำคัญสำหรับการจัดการทรัพยากรและแยกแอปพลิเคชันต่างๆ ภายในคลัสเตอร์เดียวกัน โดยการใช้ Namespaces คุณสามารถเพิ่มความยืดหยุ่นในการจัดการทรัพยากร เช่น การตั้งค่าการใช้ทรัพยากร (ResourceQuota), การจัดการเครือข่าย, และการแบ่งแยกการทำงานระหว่างหลายทีมได้อย่างง่ายดายและปลอดภัย