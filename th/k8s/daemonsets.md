# Kubernetes DaemonSets

## Introduction
ใน Kubernetes, **DaemonSet** เป็น Resource ที่ช่วยให้คุณสามารถรัน Pods จำนวนหนึ่งบนทุก ๆ Node ใน Cluster หรือบน Nodes ที่ตรงตามเงื่อนไขที่กำหนด โดยปกติจะใช้สำหรับการทำงานที่ต้องการให้มี Pod รันอยู่บนทุก ๆ Node เช่นการติดตั้งเครื่องมือตรวจสอบ (Monitoring), การจัดการ Log, หรือการติดตั้ง Network Plugin

DaemonSet มีประโยชน์อย่างมากในกรณีที่คุณต้องการให้บริการหรือแอปพลิเคชันเฉพาะทำงานบนแต่ละ Node ภายใน Cluster และสามารถจัดการกับ Nodes ใหม่ที่ถูกเพิ่มเข้ามาใน Cluster โดยอัตโนมัติ

ในบทนี้, เราจะเรียนรู้เกี่ยวกับ **DaemonSet**, การทำงานของมัน และวิธีการติดตั้งและใช้งานใน Kubernetes Cluster

## Key Concepts

1. **DaemonSet**:
   - **DaemonSet** คือ Resource ที่ช่วยให้ Kubernetes สร้างและรักษา Pod ให้ทำงานอยู่บนทุก Node หรือบน Nodes ที่ตรงตามเงื่อนไขที่กำหนด เช่น Nodes ที่มี label หรือประเภทที่เฉพาะเจาะจง
   - เมื่อ Node ใหม่ถูกเพิ่มเข้ามาใน Cluster, DaemonSet จะทำการสร้าง Pod ที่เกี่ยวข้องให้ทำงานบน Node นั้นโดยอัตโนมัติ

2. **Use Cases of DaemonSets**:
   - **Logging Agents**: ใช้ DaemonSet เพื่อรัน Agents ที่เก็บ Log จากทุก Node
   - **Monitoring Agents**: ใช้ DaemonSet สำหรับการรันเครื่องมือที่ติดตามสถานะของ Node และ Cluster
   - **Network Plugins**: เช่น Flannel, Calico ซึ่งทำงานกับ Node ทุกตัวใน Cluster
   - **Storage Daemons**: ใช้ DaemonSet สำหรับการจัดการกับ Storage หรือ Data Processing ที่ต้องการทำงานบนทุก Node

3. **Pod Scheduling**:
   - DaemonSet จะทำการกำหนดการทำงานของ Pods บน Node ทุกตัวใน Cluster แต่สามารถจำกัดการทำงานให้กับ Nodes บางประเภทหรือ Nodes ที่มี label เฉพาะ

4. **Node Affinity**:
   - DaemonSet สามารถกำหนด **Node Affinity** เพื่อให้ Pods สามารถทำงานบน Nodes ที่ตรงตามเงื่อนไขที่กำหนด เช่น Nodes ที่มี label เฉพาะ

## How DaemonSets Work

DaemonSet จะสร้าง Pods และรัน Pods ดังกล่าวบน Nodes ทุกตัวที่มีอยู่ใน Cluster โดยไม่จำเป็นต้องกำหนดจำนวน **replicas** แบบเดียวกับ Deployment หรือ StatefulSet

เมื่อ Node ใหม่ถูกเพิ่มเข้ามาใน Cluster, DaemonSet จะทำการสร้าง Pod ใหม่บน Node นั้นโดยอัตโนมัติและรักษาการทำงานของ Pods บน Node ทุกตัว

### Example of DaemonSet Resource

```yaml
apiVersion: apps/v1
kind: DaemonSet
metadata:
  name: log-collector
spec:
  selector:
    matchLabels:
      app: log-collector
  template:
    metadata:
      labels:
        app: log-collector
    spec:
      containers:
      - name: log-collector
        image: fluent/fluentd:v1.12
        volumeMounts:
        - name: varlog
          mountPath: /var/log
  volumes:
  - name: varlog
    hostPath:
      path: /var/log
      type: Directory
```

ในตัวอย่างนี้:
- **matchLabels** ใช้ในการเลือก Pods ที่จะถูกจัดการโดย DaemonSet
- **volumeMounts** ใช้สำหรับการมองเห็นข้อมูลจาก `/var/log` ของ Node และทำการเก็บ Log โดย Fluentd
- **hostPath** ใช้สำหรับการเข้าถึงโฟลเดอร์ในเครื่อง Node เพื่อดึงข้อมูล Log

### Key Features of DaemonSet

1. **Automatic Pod Creation on New Nodes**:
   - เมื่อ Node ใหม่ถูกเพิ่มเข้ามาใน Cluster, DaemonSet จะสร้าง Pod สำหรับ Node ใหม่โดยอัตโนมัติ
   - ทำให้คุณไม่ต้องกังวลเกี่ยวกับการสร้าง Pods ใหม่เมื่อมี Node เพิ่มเข้ามาใน Cluster

2. **Node Affinity and Tolerations**:
   - DaemonSet รองรับการกำหนด **Node Affinity** และ **Tolerations** ซึ่งช่วยให้คุณสามารถกำหนดได้ว่า Pod จะทำงานบน Node ที่ตรงตามเงื่อนไขหรือไม่
   - ตัวอย่างเช่น หากคุณต้องการให้ Pod ทำงานเฉพาะบน Nodes ที่มี label `disk=ssd` สามารถใช้ Node Affinity ได้

3. **One Pod per Node**:
   - DaemonSet จะทำการสร้างและรัน **หนึ่ง Pod ต่อหนึ่ง Node** โดยสามารถมีหลาย DaemonSet ที่รันบน Nodes ต่าง ๆ แต่ละ DaemonSet จะจัดการกับ Pod ของตัวเอง

4. **Updates and Rollbacks**:
   - DaemonSet รองรับการอัปเดต Pod โดยไม่ต้องหยุดการทำงานของ Node ทุกตัวใน Cluster
   - เมื่อมีการอัปเดต DaemonSet, Pods ที่อยู่ใน Node จะได้รับการอัปเดตตามลำดับ

5. **Custom Node Selection**:
   - สามารถเลือกให้ DaemonSet ทำงานเฉพาะกับ Node ที่มี label หรือคุณสมบัติที่เฉพาะเจาะจง เช่น การเลือก Node ที่มี label `role=worker`

## Differences Between DaemonSet and Deployment

| Feature            | DaemonSet                            | Deployment                        |
|--------------------|--------------------------------------|-----------------------------------|
| Pod Distribution   | One Pod per Node in the Cluster      | Pods can be scheduled on any available Node |
| Scaling            | Automatically scales with new Nodes  | Must manually scale Pod replicas |
| Use Case           | Ideal for system services like logging, monitoring, or network plugins | Ideal for stateless applications that can run on any Node |
| Updates            | Rolling updates across Nodes         | Rolling updates across Pods      |

DaemonSet เหมาะสำหรับการทำงานที่ต้องการให้มี Pod รันอยู่บนทุก ๆ Node เช่นการเก็บ Log, การติดตั้ง Network Plugins, หรือการติดตามสถานะของ Node

## Managing DaemonSet

### Scale DaemonSet

DaemonSet ไม่สามารถปรับขนาดโดยการเปลี่ยนจำนวน replicas ได้เหมือนกับ Deployment แต่จะทำงานอัตโนมัติบนทุก ๆ Node ที่มีอยู่ใน Cluster หรือบน Nodes ที่ตรงตามเงื่อนไขที่กำหนด

ถ้าคุณต้องการให้ DaemonSet ทำงานเฉพาะบาง Node หรือบางประเภท, คุณสามารถใช้ **Node Selector**, **Node Affinity**, หรือ **Tolerations**

### Example of Node Affinity in DaemonSet

```yaml
apiVersion: apps/v1
kind: DaemonSet
metadata:
  name: log-collector
spec:
  selector:
    matchLabels:
      app: log-collector
  template:
    metadata:
      labels:
        app: log-collector
    spec:
      nodeSelector:
        disk: ssd
      containers:
      - name: log-collector
        image: fluent/fluentd:v1.12
        volumeMounts:
        - name: varlog
          mountPath: /var/log
  volumes:
  - name: varlog
    hostPath:
      path: /var/log
      type: Directory
```

ในตัวอย่างนี้:
- **nodeSelector** ใช้เพื่อให้ DaemonSet ทำงานเฉพาะบน Nodes ที่มี label `disk=ssd`

## Best Practices for DaemonSets

1. **Use for System-Level Services**:
   - DaemonSet เหมาะสำหรับการจัดการกับบริการระดับระบบที่ต้องทำงานบนทุก ๆ Node เช่น Logging, Monitoring, หรือ Network Plugins

2. **Limit Node Selection**:
   - ใช้ Node Affinity หรือ Node Selector เพื่อจำกัดว่า DaemonSet ควรทำงานบน Node แบบใด โดยเฉพาะสำหรับบริการที่ไม่จำเป็นต้องรันบนทุก Node

3. **Monitor DaemonSet Pods**:
   - ควรติดตามสถานะของ Pods ที่รันโดย DaemonSet เพื่อให้แน่ใจว่า Pods ทำงานได้ตามที่คาดหวัง

4. **Use Rolling Updates**:
   - ใช้การอัปเดตแบบ Rolling สำหรับการอัปเดต DaemonSet เพื่อไม่ให้เกิดการหยุดชะงักในบริการที่มีการทำงานบนทุก ๆ Node

## Conclusion

DaemonSet เป็นเครื่องมือที่สำคัญสำหรับการจัดการกับ Pods ที่ต้องทำงานบนทุก ๆ Node หรือ Nodes ที่ตรงตามเงื่อนไขที่กำหนดใน Kubernetes Cluster ใช้ได้อย่างดีสำหรับการรันบริการที่จำเป็นต้องทำงานในระดับ Node เช่นการเก็บ Log, การตรวจสอบสถานะของ Node, หรือการใช้ Network Plugins การตั้งค่าและการปรับแต่ง DaemonSet สามารถทำได้ผ่าน Node Selector, Node Affinity และ Tolerations เพื่อให้การทำงานบน Node เฉพาะที่คุณต้องการ