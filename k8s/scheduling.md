# Kubernetes Scheduling

## Introduction
ใน Kubernetes, **Scheduling** หมายถึงกระบวนการในการตัดสินใจเลือก Node ที่จะรัน Pods ที่ถูกสร้างขึ้นโดย Controller เช่น Deployment หรือ StatefulSet โดยการ **Scheduler** ของ Kubernetes จะทำงานเพื่อตัดสินใจว่าควรจะจัดสรร Pod ไปยัง Node ไหนใน Cluster ตามนโยบายและข้อกำหนดต่างๆ

การเข้าใจการทำงานของ Scheduler และกลยุทธ์การ Scheduling จะช่วยให้คุณสามารถปรับแต่ง Cluster ของคุณได้ดียิ่งขึ้นเพื่อให้การทำงานของแอปพลิเคชันมีประสิทธิภาพและเสถียร

## Key Concepts

1. **Scheduler**:
   - **Kubernetes Scheduler** คือคอมโพเนนต์ที่รับผิดชอบในการเลือก Node ที่จะรัน Pod ภายใน Cluster
   - Scheduler จะพิจารณาปัจจัยต่างๆ เช่น resource availability, taints, tolerations, affinities, and anti-affinities ก่อนที่จะเลือก Node ที่จะรัน Pod

2. **Node**:
   - **Node** คือเครื่องที่ Kubernetes ใช้ในการรัน Pods ที่ประกอบด้วยทรัพยากรเช่น CPU, memory, และ storage
   - Node จะเป็นตัวเลือกที่ Kubernetes Scheduler ใช้ในการกำหนดว่า Pod จะรันที่ไหน

3. **Pod**:
   - **Pod** คือหน่วยงานที่เล็กที่สุดใน Kubernetes ซึ่งเป็นที่เก็บ container หรือแอปพลิเคชันที่รันภายใน Kubernetes

4. **Affinity and Anti-Affinity**:
   - **Affinity** คือการกำหนดเงื่อนไขในการให้ Pods ถูกรันบน Node ที่มีเงื่อนไขเฉพาะ เช่น การกำหนดให้ Pod รันบน Node ที่มี label หรือการตั้งค่าอื่นๆ
   - **Anti-Affinity** คือการป้องกันไม่ให้ Pods รันบน Node ที่มี Pod อื่นที่ไม่ต้องการร่วมกัน

5. **Taints and Tolerations**:
   - **Taints** คือการทำเครื่องหมายบน Node ว่าไม่สามารถรัน Pods ที่ไม่ได้ **Tolerate** ค่าของ taint ได้
   - **Tolerations** คือการกำหนดเงื่อนไขให้ Pods สามารถรับการทำเครื่องหมาย taint ของ Node ที่พวกเขาต้องการรันได้

6. **Resource Requests and Limits**:
   - **Resource Requests** คือทรัพยากรขั้นต่ำที่ Pod ต้องการในการรัน
   - **Resource Limits** คือทรัพยากรสูงสุดที่ Pod สามารถใช้งานได้
   - Scheduler ใช้ข้อมูลเหล่านี้ในการเลือก Node ที่มีทรัพยากรเพียงพอ

## How Scheduling Works

### Default Scheduling Behavior

โดยปกติ, Kubernetes Scheduler จะทำงานโดยอัตโนมัติและเลือก Node ที่เหมาะสมที่สุดในการรัน Pods ตามปัจจัยต่างๆ ที่กล่าวถึงข้างต้น เช่น resource availability, taints, affinities, etc. กระบวนการ Scheduling มีขั้นตอนหลักๆ ดังนี้:

1. **Scheduling Policy**: 
   - Kubernetes Scheduler จะตรวจสอบการตั้งค่าของ Pod เช่น resource requests, taints, และ affinities เพื่อเลือก Node ที่เหมาะสม

2. **Node Filtering**:
   - เมื่อมี Pod ที่ต้องการการ scheduling, Scheduler จะทำการกรอง Node ที่ไม่ตรงตามเงื่อนไข เช่น Node ที่ไม่มีทรัพยากรเพียงพอ หรือ Node ที่มี taints ที่ไม่ตรงกับ tolerations ของ Pod

3. **Score Nodes**:
   - หลังจากที่ทำการกรอง Node ออกไปแล้ว, Scheduler จะทำการให้คะแนน Node ที่เหลือจากการตรวจสอบคุณสมบัติต่างๆ เช่น ความใกล้ชิดกับ Node อื่นๆ (affinity) หรือทรัพยากรที่มีอยู่

4. **Schedule Pod**:
   - Scheduler จะเลือก Node ที่ได้คะแนนสูงที่สุดในการรัน Pod

### Configuring Scheduling with Affinity and Taints

#### Affinity Example

คุณสามารถใช้ **Affinity** เพื่อกำหนดเงื่อนไขในการเลือก Node โดยการใช้งาน labels บน Node:

```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: my-app
spec:
  replicas: 2
  selector:
    matchLabels:
      app: my-app
  template:
    metadata:
      labels:
        app: my-app
    spec:
      affinity:
        nodeAffinity:
          requiredDuringSchedulingIgnoredDuringExecution:
            nodeSelectorTerms:
            - matchExpressions:
              - key: "disktype"
                operator: In
                values:
                - "ssd"
      containers:
      - name: my-app
        image: my-app:v1
```

ในตัวอย่างนี้, **nodeAffinity** ถูกใช้ในการกำหนดว่า Pod ควรจะรันบน Node ที่มี label `"disktype": "ssd"`

#### Anti-Affinity Example

ในทางตรงข้าม, **Anti-Affinity** ช่วยให้คุณสามารถกำหนดเงื่อนไขที่ต้องการหลีกเลี่ยงการรัน Pods บน Node ที่มี Pods อื่นๆ:

```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: my-app
spec:
  replicas: 2
  selector:
    matchLabels:
      app: my-app
  template:
    metadata:
      labels:
        app: my-app
    spec:
      affinity:
        podAntiAffinity:
          requiredDuringSchedulingIgnoredDuringExecution:
            - labelSelector:
                matchExpressions:
                  - key: "app"
                    operator: In
                    values:
                    - "other-app"
              topologyKey: "kubernetes.io/hostname"
      containers:
      - name: my-app
        image: my-app:v1
```

ในตัวอย่างนี้, **podAntiAffinity** ถูกใช้เพื่อหลีกเลี่ยงการรัน Pod นี้บน Node ที่มี Pod อื่นๆ ที่มี label `app=other-app`

#### Taints and Tolerations Example

**Taints** และ **Tolerations** ช่วยในการจัดการว่า Pod ควรรันบน Node หรือไม่ตามการทำเครื่องหมายของ Node

```yaml
apiVersion: v1
kind: Pod
metadata:
  name: my-app
spec:
  tolerations:
  - key: "key1"
    operator: "Equal"
    value: "value1"
    effect: "NoSchedule"
  containers:
  - name: my-app
    image: my-app:v1
```

ในตัวอย่างนี้, **toleration** ถูกใช้เพื่อให้ Pod สามารถรันบน Node ที่มี **taint** ที่มี key-value `key1=value1` และ effect `NoSchedule`

## Best Practices for Scheduling

1. **Use Affinity and Anti-Affinity**:
   - ใช้ **affinity** และ **anti-affinity** เพื่อล็อค Pod ไว้บน Node ที่ต้องการหรือหลีกเลี่ยงการรัน Pod บน Node ที่ไม่ต้องการ

2. **Proper Resource Requests and Limits**:
   - กำหนด **resource requests** และ **limits** อย่างรอบคอบเพื่อให้ Kubernetes Scheduler สามารถเลือก Node ที่มีทรัพยากรเพียงพอในการรัน Pod

3. **Taints and Tolerations**:
   - ใช้ **taints** และ **tolerations** เพื่อให้แน่ใจว่า Pods ที่มีลักษณะเฉพาะสามารถรันบน Node ที่เหมาะสมได้

4. **Monitor Node Resources**:
   - ตรวจสอบและจัดการการใช้ทรัพยากรของ Node เพื่อให้มั่นใจว่าไม่มี Node ใดเต็มหรือขาดทรัพยากรในการรัน Pods

5. **Use Node Selectors Sparingly**:
   - ใช้ **node selectors** อย่างระมัดระวัง เนื่องจากการใช้มากเกินไปอาจทำให้เกิดความซับซ้อนและทำให้ไม่สามารถใช้ Node ที่เหมาะสมได้

## Conclusion

**Kubernetes Scheduling** เป็นกระบวนการที่สำคัญในการจัดสรร Pods ไปยัง Nodes ใน Cluster โดยการใช้ **Affinity**, **Anti-Affinity**, **Taints**, **Tolerations**, และ **Resource Requests** ช่วยให้สามารถปรับแต่งการทำงานของ Scheduler ได้ตามความต้องการ การเข้าใจและใช้กลยุทธ์เหล่านี้จะช่วยให้คุณสามารถเพิ่มประสิทธิภาพและความยืดหยุ่นในการจัดการแอปพลิเคชันใน Kubernetes Cluster