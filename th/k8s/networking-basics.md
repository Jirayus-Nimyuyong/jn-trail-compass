# Kubernetes Networking Basics

## Introduction
Kubernetes Networking เป็นส่วนที่สำคัญในการเชื่อมต่อและจัดการการสื่อสารระหว่าง Pods, Services, และทรัพยากรอื่น ๆ ภายใน Kubernetes Cluster โดย Kubernetes ใช้แนวคิดของ **Flat Network** ซึ่งหมายความว่า ทุก Pod ภายใน Cluster สามารถเชื่อมต่อถึงกันได้โดยตรง โดยไม่ต้องใช้ NAT หรือการแปลที่อยู่ IP

ในบทนี้, เราจะเรียนรู้เกี่ยวกับพื้นฐานของการทำงานของเครือข่ายใน Kubernetes รวมถึงการตั้งค่า Pods, Services, Network Policies และ DNS ภายใน Kubernetes

## Key Concepts

1. **Pod Networking**:
   - ทุก Pod ใน Kubernetes จะได้รับ IP Address เฉพาะตัว โดยไม่ขึ้นอยู่กับ Node ที่มันถูกติดตั้ง
   - Kubernetes ใช้ **CNI (Container Network Interface)** เพื่อติดตั้งและจัดการเครือข่ายของ Pods

2. **Cluster Networking**:
   - ทุก Pod ใน Kubernetes สามารถสื่อสารกับ Pod อื่นใน Cluster ได้ โดยใช้ IP Address ของ Pod
   - Cluster networking ถูกออกแบบให้มีเสถียรภาพและสามารถรองรับการสื่อสารระหว่าง Pods โดยตรงในระดับ IP

3. **Service Networking**:
   - **Service** เป็นการ Abstraction ของชุด Pod ที่ทำงานใน Kubernetes เพื่อให้สามารถเข้าถึงได้จากภายนอก Cluster
   - Service มี IP Address ของตัวเองที่เป็น **Virtual IP** ซึ่ง Kubernetes จะทำการโหลดบาลานซ์การเข้าถึงไปยัง Pods ที่เกี่ยวข้อง

4. **DNS in Kubernetes**:
   - Kubernetes มีระบบ DNS ภายใน Cluster ที่ช่วยให้คุณสามารถเข้าถึง Services โดยการใช้ชื่อ (DNS Name) แทน IP Address
   - ตัวอย่างเช่น, Service ชื่อ `my-service` สามารถเข้าถึงได้จาก Pod อื่นๆ โดยการใช้ชื่อ `my-service.default.svc.cluster.local`

5. **Network Policies**:
   - **Network Policies** ช่วยให้คุณสามารถกำหนดกฎเกณฑ์การเข้าถึงระหว่าง Pods ใน Cluster โดยการกำหนดการอนุญาตการสื่อสารระหว่าง Pods โดยใช้ Labels และ Selectors

## Kubernetes Networking Model

### Flat Network

ใน Kubernetes, ทุก Pod จะได้รับ IP Address เฉพาะ และสามารถสื่อสารระหว่างกันได้โดยตรง ไม่ว่าพวกมันจะอยู่ใน Node ไหนก็ตาม

- **No NAT (Network Address Translation)**: Kubernetes ไม่ใช้ NAT เพื่อแปลง IP Address ของ Pods
- **Pod-to-Pod Communication**: Pods สามารถสื่อสารกันได้โดยตรงจาก Pod หนึ่งไปยังอีก Pod หนึ่ง

### Kubernetes Services

Kubernetes Services ช่วยให้การเชื่อมต่อระหว่าง Pods สามารถทำได้ง่ายขึ้น โดยการสร้าง Virtual IP (ClusterIP) ซึ่งจะถูกโหลดบาลานซ์ไปยัง Pods ที่เกี่ยวข้อง

#### Types of Services

1. **ClusterIP**:
   - เป็น Service Default ที่ให้ IP ภายใน Cluster และสามารถเข้าถึงได้จากภายใน Cluster เท่านั้น
   - เหมาะสำหรับการสื่อสารระหว่าง Pods ภายใน Cluster

   Example of ClusterIP Service:
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

2. **NodePort**:
   - ทำให้สามารถเข้าถึง Service จากภายนอก Cluster ได้ผ่าน Node IP และ Port ที่ระบุ

   Example of NodePort Service:
   ```yaml
   apiVersion: v1
   kind: Service
   metadata:
     name: my-nodeport-service
   spec:
     selector:
       app: my-app
     ports:
       - protocol: TCP
         port: 80
         targetPort: 8080
         nodePort: 30001
     type: NodePort
   ```

3. **LoadBalancer**:
   - ใช้สำหรับการเชื่อมต่อกับ Service จากภายนอก Cluster โดยการใช้ Load Balancer ที่มี IP Address สาธารณะ
   - ใช้งานได้ในคลัสเตอร์ที่รองรับการใช้งาน Load Balancer (เช่น บน Cloud)

   Example of LoadBalancer Service:
   ```yaml
   apiVersion: v1
   kind: Service
   metadata:
     name: my-loadbalancer-service
   spec:
     selector:
       app: my-app
     ports:
       - protocol: TCP
         port: 80
         targetPort: 8080
     type: LoadBalancer
   ```

### DNS in Kubernetes

Kubernetes มี DNS ที่ช่วยในการเข้าถึง Services โดยใช้ชื่อแทนการใช้ IP Address โดยไม่จำเป็นต้องรู้จัก IP Address ของ Service

- **Service DNS**: Service ที่ชื่อ `my-service` ใน Namespace `default` จะสามารถเข้าถึงได้ที่ `my-service.default.svc.cluster.local`
- **Pod DNS**: Pod สามารถใช้ชื่อ `Pod-name.Namespace-name.svc.cluster.local` เพื่อเชื่อมต่อกับ Pod อื่นใน Namespace เดียวกัน

#### Example of DNS Resolution

- Pod ใน `default` Namespace ต้องการเชื่อมต่อกับ Service ที่ชื่อ `my-service`:
  ```bash
  curl my-service.default.svc.cluster.local
  ```

### Network Policies

**Network Policies** ช่วยในการควบคุมการเข้าถึงเครือข่ายภายใน Kubernetes Cluster โดยการกำหนดกฎเกณฑ์การอนุญาตการสื่อสารระหว่าง Pods โดยใช้ Labels และ Selectors

#### Example of a Network Policy

```yaml
apiVersion: networking.k8s.io/v1
kind: NetworkPolicy
metadata:
  name: allow-front-end-to-back-end
  namespace: default
spec:
  podSelector:
    matchLabels:
      role: front-end
  ingress:
    - from:
        - podSelector:
            matchLabels:
              role: back-end
```

ในตัวอย่างนี้, Pods ที่มี label `role: front-end` สามารถรับการเชื่อมต่อจาก Pods ที่มี label `role: back-end` เท่านั้น

## Best Practices for Kubernetes Networking

1. **Use DNS Names for Service Discovery**:
   - ควรใช้ชื่อ DNS แทน IP Address สำหรับการเชื่อมต่อกับ Services เพื่อความยืดหยุ่นและความสามารถในการจัดการที่ดีขึ้น

2. **Isolate Traffic with Network Policies**:
   - ใช้ Network Policies เพื่อควบคุมการเข้าถึงระหว่าง Pods และป้องกันไม่ให้ Pods ที่ไม่เกี่ยวข้องกันสามารถสื่อสารกันได้

3. **Use Services for Load Balancing**:
   - ใช้ Services เพื่อจัดการการโหลดบาลานซ์การเข้าถึง Pods และทำให้การสื่อสารภายใน Cluster เป็นไปอย่างราบรื่น

4. **Ensure Proper Network Configuration**:
   - ตรวจสอบให้แน่ใจว่า CNI (Container Network Interface) ที่ใช้ในคลัสเตอร์ได้รับการกำหนดค่าอย่างถูกต้องเพื่อให้สามารถรองรับการเชื่อมต่อระหว่าง Pods ได้

## Conclusion

Kubernetes Networking เป็นพื้นฐานสำคัญในการทำงานของ Cluster Kubernetes การเข้าใจการทำงานของ Pods, Services, DNS และ Network Policies จะช่วยให้คุณสามารถจัดการเครือข่ายใน Kubernetes ได้อย่างมีประสิทธิภาพ โดยสามารถเชื่อมต่อ Pods และบริการต่าง ๆ ได้อย่างราบรื่นและปลอดภัย