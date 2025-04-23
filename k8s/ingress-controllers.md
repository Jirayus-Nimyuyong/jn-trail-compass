# Kubernetes Ingress Controllers

## Introduction
ใน Kubernetes, **Ingress** เป็นวิธีการในการจัดการการเข้าถึงแอปพลิเคชันที่ทำงานภายใน Cluster จากภายนอก โดยผ่าน HTTP หรือ HTTPS โดยไม่ต้องใช้ Load Balancer แบบเฉพาะเจาะจง แต่จะใช้ Ingress Resource ซึ่งสามารถกำหนดเส้นทาง (Routing) ให้กับการเข้าใช้งานต่าง ๆ ภายใน Cluster

**Ingress Controller** คือส่วนที่รับผิดชอบในการแปลและจัดการคำขอ (Requests) จากภายนอก และส่งต่อไปยัง Service ที่ถูกกำหนดใน Ingress Resource

ในบทนี้, เราจะเรียนรู้เกี่ยวกับการทำงานของ Ingress และวิธีการติดตั้งและใช้งาน Ingress Controllers ใน Kubernetes Cluster

## Key Concepts

1. **Ingress Resource**:
   - **Ingress Resource** คือการตั้งค่าใน Kubernetes ที่ช่วยให้สามารถกำหนดกฎการ routing ของการเชื่อมต่อ HTTP/HTTPS ไปยังบริการที่อยู่ใน Cluster ได้
   - การกำหนด Ingress Resource จะบอกว่าเมื่อมีการเข้าถึง URL หรือ Host เฉพาะจากภายนอก Cluster ให้ทำการ route ไปยัง Service ภายใน Cluster

2. **Ingress Controller**:
   - **Ingress Controller** เป็นตัวกลางที่รับผิดชอบในการประมวลผลและจัดการ Ingress Resource
   - Ingress Controller จะทำหน้าที่รับคำขอจากภายนอกและกำหนดเส้นทาง (Route) ไปยัง Services ที่เกี่ยวข้องภายใน Cluster

3. **Ingress Rules**:
   - **Ingress Rules** เป็นการกำหนดการเชื่อมต่อแบบเส้นทาง (Path-based Routing) และ/หรือ โฮสต์ (Host-based Routing) เพื่อจัดการกับการเข้าถึงที่ต้องการ
   - การกำหนดค่า Ingress Rule ทำให้สามารถชี้แหล่งข้อมูล (Service) ที่ต่างกันภายใน Cluster ตาม URL path หรือ domain name

4. **TLS (Transport Layer Security)**:
   - Ingress รองรับการกำหนดค่า HTTPS ผ่านการใช้งาน TLS ซึ่งช่วยในการเข้ารหัสการส่งข้อมูลระหว่าง Client และ Server

## How Ingress Works

Ingress มี 2 ส่วนหลัก ๆ คือ Ingress Resource และ Ingress Controller

### 1. Ingress Resource

Ingress Resource ใช้ในการกำหนดว่าคำขอ HTTP หรือ HTTPS ที่เข้ามาควรจะถูกส่งไปยังบริการใดใน Cluster โดยมีตัวอย่างดังนี้:

**Example of an Ingress Resource**:
```yaml
apiVersion: networking.k8s.io/v1
kind: Ingress
metadata:
  name: example-ingress
spec:
  rules:
    - host: example.com
      http:
        paths:
          - path: /app1
            pathType: Prefix
            backend:
              service:
                name: app1-service
                port:
                  number: 80
          - path: /app2
            pathType: Prefix
            backend:
              service:
                name: app2-service
                port:
                  number: 80
```

ในตัวอย่างนี้:
- **Host** คือ `example.com`
- **Path-based Routing**: หากมีคำขอไปที่ `example.com/app1` จะถูกส่งไปยัง Service ที่ชื่อ `app1-service`
- หากคำขอเป็น `example.com/app2` จะถูกส่งไปยัง `app2-service`

### 2. Ingress Controller

Ingress Controller เป็นตัวที่ทำหน้าที่ติดตามและตรวจสอบ Ingress Resources ที่ถูกสร้างขึ้นใน Kubernetes Cluster เมื่อมีการเพิ่มหรือแก้ไข Ingress Resource, Ingress Controller จะทำการติดตามและปรับปรุงการตั้งค่าการ Routing ให้สอดคล้อง

ตัวอย่างของ Ingress Controllers ที่นิยมใช้:
- **NGINX Ingress Controller**
- **Traefik**
- **HAProxy Ingress**
- **Contour**

### Example of Installing NGINX Ingress Controller

การติดตั้ง NGINX Ingress Controller โดยใช้ Helm:
```bash
helm install nginx-ingress ingress-nginx/ingress-nginx
```

หลังจากที่ติดตั้ง Ingress Controller แล้ว, Ingress Controller จะเริ่มทำงานและจัดการการเชื่อมต่อจากภายนอก Cluster ไปยัง Service ที่กำหนดใน Ingress Resource

## Features of Ingress Controllers

1. **Routing HTTP and HTTPS Traffic**:
   - Ingress Controller สามารถจัดการการ routing ของ HTTP และ HTTPS โดยไม่จำเป็นต้องใช้ Load Balancer ภายนอก
   - สนับสนุนการกำหนด Path-based และ Host-based Routing

2. **SSL/TLS Termination**:
   - Ingress Controller สามารถทำ SSL/TLS termination ซึ่งหมายความว่า Ingress Controller จะจัดการการเข้ารหัส HTTPS และส่งคำขอที่ไม่มีการเข้ารหัสไปยัง Service ภายใน Cluster

3. **Authentication**:
   - Ingress Controller สามารถกำหนดการยืนยันตัวตนเบื้องต้น (Basic Authentication) หรือการใช้ OAuth ในการควบคุมการเข้าถึงบริการภายใน Cluster

4. **Load Balancing**:
   - Ingress Controllers มักจะมีการทำ Load Balancing ภายใน Cluster เพื่อกระจายคำขอไปยัง Pod ที่อยู่ใน Service ที่กำหนด

5. **Rewrites and Redirects**:
   - Ingress Controller สามารถกำหนดการ rewrite หรือ redirect คำขอ HTTP เช่น การเปลี่ยน URL หรือย้าย path ไปยัง Service อื่น

## Example of TLS Configuration in Ingress

Ingress รองรับการใช้งาน TLS สำหรับการเข้ารหัสการเชื่อมต่อ HTTPS ตัวอย่างการกำหนดค่า TLS ใน Ingress Resource:

```yaml
apiVersion: networking.k8s.io/v1
kind: Ingress
metadata:
  name: tls-example-ingress
spec:
  rules:
    - host: secure.example.com
      http:
        paths:
          - path: /
            pathType: Prefix
            backend:
              service:
                name: secure-app-service
                port:
                  number: 443
  tls:
    - hosts:
        - secure.example.com
      secretName: example-tls-secret
```

ในตัวอย่างนี้:
- คำขอที่มาที่ `secure.example.com` จะถูกเข้ารหัสผ่าน TLS และส่งไปยัง `secure-app-service`
- TLS Certificate ถูกจัดการโดย Secret ที่ชื่อ `example-tls-secret`

## Installing Ingress Controllers with Helm

### NGINX Ingress Controller

1. เพิ่ม Repository ของ Ingress NGINX:
   ```bash
   helm repo add ingress-nginx https://kubernetes.github.io/ingress-nginx
   helm repo update
   ```

2. ติดตั้ง NGINX Ingress Controller:
   ```bash
   helm install nginx-ingress ingress-nginx/ingress-nginx
   ```

### Traefik Ingress Controller

1. เพิ่ม Repository ของ Traefik:
   ```bash
   helm repo add traefik https://helm.traefik.io/traefik
   helm repo update
   ```

2. ติดตั้ง Traefik Ingress Controller:
   ```bash
   helm install traefik traefik/traefik
   ```

## Best Practices for Using Ingress

1. **Use TLS for Secure Connections**:
   - ควรใช้ HTTPS (TLS) ในการเชื่อมต่อทั้งหมดเพื่อให้ข้อมูลที่ส่งไปยัง Cluster ปลอดภัยจากการโจมตี

2. **Path and Host-Based Routing**:
   - ใช้ Path-based หรือ Host-based Routing เพื่อแยกแอปพลิเคชันและจัดการการเชื่อมต่อที่ดีขึ้น

3. **Enable Authentication**:
   - ควรใช้การยืนยันตัวตน (Authentication) สำหรับ Ingress เพื่อควบคุมการเข้าถึงบริการต่าง ๆ ภายใน Cluster

4. **Monitor and Log Ingress Traffic**:
   - ติดตามและบันทึกข้อมูลการใช้งานจาก Ingress เพื่อให้สามารถวิเคราะห์และแก้ไขปัญหาการเข้าถึงได้เร็วขึ้น

## Conclusion

Ingress Controller เป็นเครื่องมือสำคัญในการจัดการการเข้าถึง Kubernetes Cluster จากภายนอก โดยช่วยให้คุณสามารถทำการ routing คำขอ HTTP/HTTPS ไปยัง Services ต่าง ๆ ภายใน Cluster ได้อย่างง่ายดาย โดยไม่จำเป็นต้องใช้ Load Balancer ภายนอก Ingress Controllers ยังสามารถจัดการการเข้ารหัสข้อมูล (TLS), การยืนยันตัวตน, การบันทึกข้อมูล และการทำ Load Balancing ได้อย่างมีประสิทธิภาพ