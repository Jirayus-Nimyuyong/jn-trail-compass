# Kubernetes StatefulSets

## Introduction
ใน Kubernetes, **StatefulSet** เป็น Resource ที่ใช้ในการจัดการการใช้งาน Pods ที่ต้องการสถานะคงที่และการติดตามการระบุตัว (Identity) สำหรับแต่ละ Pod ที่ถูกสร้างขึ้นใน Cluster โดยที่แต่ละ Pod จะมีชื่อที่ไม่ซ้ำกันและสามารถมีการเก็บข้อมูลใน **Persistent Volumes** ซึ่งเป็นการรับประกันความสมบูรณ์ของข้อมูลสำหรับแอปพลิเคชันที่ต้องการสถานะหรือการจำแนกที่ไม่เปลี่ยนแปลง

StatefulSet ถูกออกแบบมาสำหรับแอปพลิเคชันที่มีการเก็บข้อมูล (stateful applications) เช่น databases, caches, หรืออื่น ๆ ที่ต้องการให้แต่ละ Pod มีการระบุตัวเฉพาะและข้อมูลที่คงที่เมื่อมีการปรับขนาดหรือการกระจาย Pod ใหม่

ในบทนี้, เราจะเรียนรู้เกี่ยวกับ **StatefulSet** การทำงานของมัน และวิธีการติดตั้งและใช้งานใน Kubernetes Cluster

## Key Concepts

1. **StatefulSet**:
   - **StatefulSet** เป็นการจัดการ Pods ที่มีสถานะและต้องการการติดตามการระบุตัว (Stable Network Identity) โดยที่ Pods แต่ละตัวจะมีชื่อที่แตกต่างกันและสามารถเก็บข้อมูลใน Persistent Volume ที่เชื่อมโยงกับแต่ละ Pod ได้
   - StatefulSet จะแตกต่างจาก Deployment ตรงที่มันช่วยให้สามารถรักษาความสมบูรณ์ของข้อมูลและการตั้งค่าเช่นชื่อ, hostname, และ Persistent Volumes ที่ใช้โดย Pod

2. **Stable Network Identity**:
   - Pods ที่ถูกจัดการโดย StatefulSet จะมีชื่อที่ไม่ซ้ำกันและสามารถเข้าถึงได้ผ่าน DNS ที่มีรูปแบบ `pod-name.statefulset-name.default.svc.cluster.local`
   - ชื่อนี้จะไม่เปลี่ยนแปลง แม้ว่าจะมีการเพิ่มหรือลบ Pod ภายใน StatefulSet

3. **Persistent Storage**:
   - StatefulSet รองรับการใช้ Persistent Volumes เพื่อให้แอปพลิเคชันสามารถเก็บข้อมูลในลักษณะที่ไม่หายไปเมื่อ Pod ถูกลบหรือถูกแทนที่ใหม่
   - การใช้ Persistent Volume Claims (PVC) ใน StatefulSet ช่วยให้แต่ละ Pod สามารถเชื่อมต่อกับ Volume เฉพาะของมันเองได้

4. **Scaling StatefulSets**:
   - การขยาย (Scaling) StatefulSet จะค่อย ๆ เพิ่ม Pods โดยไม่ทำให้มีการเปลี่ยนแปลงในลำดับการทำงานหรือระบุตัว (Identity)
   - Pods ใหม่จะถูกสร้างขึ้นและตั้งชื่อตามลำดับ เช่น `pod-name-0`, `pod-name-1`, `pod-name-2` เป็นต้น

## How StatefulSets Work

StatefulSet จะสร้างและจัดการ Pods โดยทำตามลำดับที่กำหนด (ตามเลขลำดับ) และรักษาการระบุตัว (Identity) ที่ไม่ซ้ำกันสำหรับแต่ละ Pod การตั้งค่าของ StatefulSet จะถูกกำหนดในรูปแบบของ YAML Manifest ซึ่งจะกำหนดข้อมูลเช่น:

- จำนวน Replica ของ Pods
- ชื่อของ StatefulSet
- Persistent Volume Claims (PVCs)
- เงื่อนไขที่เกี่ยวข้องกับการ Deploy และการ Scaling Pods

### Example of StatefulSet Resource

```yaml
apiVersion: apps/v1
kind: StatefulSet
metadata:
  name: web-app
spec:
  serviceName: "web-app"
  replicas: 3
  selector:
    matchLabels:
      app: web-app
  template:
    metadata:
      labels:
        app: web-app
    spec:
      containers:
      - name: web-app-container
        image: nginx:latest
        volumeMounts:
        - name: web-app-storage
          mountPath: /usr/share/nginx/html
  volumeClaimTemplates:
  - metadata:
      name: web-app-storage
    spec:
      accessModes: [ "ReadWriteOnce" ]
      resources:
        requests:
          storage: 1Gi
```

ในตัวอย่างนี้:
- **serviceName** คือ `web-app` ซึ่งเป็นชื่อของ Service ที่จะจัดการการเข้าถึง Pods
- **replicas** กำหนดจำนวน Pods ที่ต้องการสร้าง (ในที่นี้คือ 3 Pods)
- **volumeClaimTemplates** ใช้ในการสร้าง Persistent Volume Claims สำหรับแต่ละ Pod

### Key Features of StatefulSet

1. **Stable Pod Names**:
   - Pods ที่ถูกสร้างโดย StatefulSet จะมีชื่อที่คงที่ เช่น `web-app-0`, `web-app-1`, `web-app-2`, ซึ่งทำให้แอปพลิเคชันสามารถระบุตัว Pods ได้อย่างชัดเจน

2. **Ordered Deployment and Scaling**:
   - เมื่อมีการเพิ่มหรือปรับขนาด StatefulSet, Pods จะถูกสร้างในลำดับและลำดับการลบหรือปรับขนาดจะถูกกำหนดตามลำดับที่ Pod ถูกสร้างขึ้น
   - ตัวอย่าง: เมื่อมีการเพิ่มจำนวน replicas, Pod `web-app-0` จะถูกสร้างขึ้นก่อน `web-app-1` ตามลำดับ

3. **Persistent Storage**:
   - Persistent Volumes จะถูกสร้างขึ้นสำหรับแต่ละ Pod และจะไม่สูญหายแม้ว่า Pod จะถูกลบหรือล้มเหลว
   - การใช้ PVC ใน StatefulSet ช่วยให้แต่ละ Pod สามารถเข้าถึง Persistent Volume เฉพาะตัว

4. **Headless Service**:
   - StatefulSet มักจะใช้งาน **Headless Service** ซึ่งเป็น Service ที่ไม่ใช่ Load Balancer, แต่สามารถให้ DNS สำหรับแต่ละ Pod
   - ตัวอย่างของ Headless Service:

```yaml
apiVersion: v1
kind: Service
metadata:
  name: web-app
spec:
  clusterIP: None
  selector:
    app: web-app
  ports:
    - port: 80
      targetPort: 80
```

## Differences Between StatefulSet and Deployment

| Feature            | StatefulSet                         | Deployment                        |
|--------------------|-------------------------------------|-----------------------------------|
| Identity           | Stable and unique names for Pods    | No guarantee of stable identities |
| Scaling            | Pods are created and deleted in order | Pods can be created or deleted randomly |
| Persistent Storage | Each Pod gets its own Persistent Volume | Pods do not have Persistent Volumes |
| Pod Restart Policy | Ordered and controlled              | Pods are created and destroyed randomly |

StatefulSet เหมาะสำหรับแอปพลิเคชันที่ต้องการการระบุตัวที่คงที่และการเก็บข้อมูลที่ต้องการคงอยู่ (stateful applications) เช่นฐานข้อมูลหรือแอปพลิเคชันที่ต้องการการจัดเก็บข้อมูลใน Persistent Volumes

## Scaling StatefulSets

ในการขยายหรือย่อขนาด StatefulSet สามารถทำได้โดยการแก้ไขจำนวน **replicas** ในการกำหนดค่า StatefulSet:

```bash
kubectl scale statefulset web-app --replicas=5
```

การเพิ่มหรือลดจำนวน replicas จะทำให้ Pods ใหม่ถูกสร้างขึ้นหรือลบไปตามลำดับ

## Best Practices for StatefulSets

1. **Use Persistent Volumes**:
   - ใช้ Persistent Volumes และ Persistent Volume Claims เพื่อให้แน่ใจว่าแอปพลิเคชันสามารถเก็บข้อมูลได้แม้ว่า Pods จะถูกลบหรือแทนที่

2. **Headless Service**:
   - ใช้ **Headless Service** เพื่อให้สามารถเข้าถึง Pods ได้โดยตรงผ่าน DNS และรักษาการระบุตัว (Identity) ของ Pods

3. **Ordered Deployment**:
   - ใช้ลำดับการปรับขนาด (Scaling) และการเปิด/ปิด (Rolling Updates) เพื่อให้การเปลี่ยนแปลง Pod เป็นไปอย่างราบรื่นและปลอดภัย

4. **Use Stateful Applications**:
   - ใช้ StatefulSet สำหรับแอปพลิเคชันที่ต้องการการระบุตัว (Stable Identity) และข้อมูลที่ต้องคงอยู่ เช่นฐานข้อมูล, caches, หรือระบบที่ต้องมีการเก็บข้อมูล

## Conclusion

StatefulSet เป็น Resource ที่สำคัญสำหรับการจัดการแอปพลิเคชันที่มีสถานะ (stateful applications) ใน Kubernetes โดยช่วยให้สามารถจัดการกับ Pods ที่มีการเก็บข้อมูลและจำเป็นต้องมีการระบุตัวที่คงที่ พร้อมทั้งสามารถใช้ Persistent Volumes สำหรับการจัดการข้อมูลที่ไม่สูญหายเมื่อ Pods ถูกลบหรือแทนที่ นอกจากนี้ยังรองรับการปรับขนาด (Scaling) ที่เป็นลำดับและการใช้งาน Headless Service เพื่อให้แอปพลิเคชันสามารถเข้าถึงแต่ละ Pod ได้โดยตรง