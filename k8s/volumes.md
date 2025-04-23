# Kubernetes Volumes

## Introduction
Kubernetes Volumes เป็นเครื่องมือที่ใช้ในการจัดการข้อมูลที่ต้องการให้มีการเก็บรักษาใน Pod ที่อยู่ใน Kubernetes ซึ่งช่วยให้ข้อมูลเหล่านี้สามารถอยู่รอดข้ามการรีสตาร์ทหรือการย้าย Pod ไปยังโหนดอื่น ๆ ได้ โดย Kubernetes รองรับหลายประเภทของ Volume ที่สามารถเลือกใช้ตามความต้องการของระบบ

## Types of Volumes

1. **emptyDir**
   - `emptyDir` คือ Volume ที่ถูกสร้างขึ้นใหม่เมื่อ Pod ถูกสร้างขึ้น และจะถูกลบเมื่อ Pod หยุดทำงานหรือถูกลบ
   - ใช้ในการเก็บข้อมูลที่ไม่จำเป็นต้องเก็บรักษาระยะยาว

2. **hostPath**
   - `hostPath` ทำให้ Pod สามารถเข้าถึงไฟล์ระบบของโหนดที่โฮสต์ Pod อยู่
   - ใช้เมื่อคุณต้องการให้ Pod เข้าถึงไฟล์หรือข้อมูลในโฮสต์

3. **nfs**
   - `nfs` ใช้การแชร์ไฟล์ระหว่างหลาย Pod ผ่าน NFS Server
   - ใช้ในการทำงานร่วมกันระหว่าง Pod หลายตัวที่ต้องการเข้าถึงข้อมูลเดียวกัน

4. **persistentVolumeClaim (PVC)**
   - PVC คือการร้องขอ Volume จาก `PersistentVolume` (PV) ที่มีการจัดการภายนอก Kubernetes เช่น บริการ Cloud Storage
   - เป็นวิธีการที่มีความยืดหยุ่นและเหมาะสมสำหรับการเก็บข้อมูลระยะยาว

5. **configMap**
   - ใช้ในการเก็บข้อมูลที่ไม่ใช่ไฟล์ (เช่น ค่าคอนฟิกต่างๆ) ที่ Pod สามารถเข้าถึงได้
   - ช่วยให้ข้อมูลที่เป็นคอนฟิกสามารถแชร์ระหว่าง Pod ต่างๆ ได้

6. **secret**
   - ใช้สำหรับเก็บข้อมูลที่เป็นความลับ เช่น รหัสผ่านหรือ API keys
   - ข้อมูลใน `Secret` จะถูกเข้ารหัสและสามารถเข้าถึงได้เฉพาะโดย Pod ที่ต้องการ

## Using Volumes in Pods

ตัวอย่างการใช้ `volume` ภายใน `Pod` คือการแสดงในไฟล์ YAML ของ Kubernetes

```yaml
apiVersion: v1
kind: Pod
metadata:
  name: volume-example
spec:
  containers:
  - name: myapp
    image: myapp-image
    volumeMounts:
    - mountPath: /data
      name: my-volume
  volumes:
  - name: my-volume
    emptyDir: {}
```

ในตัวอย่างนี้ `volumeMounts` คือการเชื่อมต่อ Volume กับ Path ภายในคอนเทนเนอร์ และ `volumes` เป็นการกำหนดประเภทของ Volume ที่จะใช้

## Persistent Storage

ใน Kubernetes การเก็บข้อมูลระยะยาวจะใช้ `Persistent Volumes` (PV) และ `Persistent Volume Claims` (PVC) เพื่อจัดการข้อมูลที่ไม่สามารถลบหายไปเมื่อ Pod หยุดทำงาน

### Example of PVC with PV

```yaml
apiVersion: v1
kind: PersistentVolumeClaim
metadata:
  name: my-pvc
spec:
  accessModes:
    - ReadWriteOnce
  resources:
    requests:
      storage: 1Gi
```

ตัวอย่างนี้เป็นการร้องขอ Persistent Volume ที่มีขนาด 1Gi

## Conclusion

Kubernetes Volumes เป็นเครื่องมือสำคัญในการจัดการข้อมูลของแอปพลิเคชันใน Kubernetes โดยช่วยให้ข้อมูลสามารถอยู่รอดข้ามการรีสตาร์ท Pod หรือการย้ายโหนดต่าง ๆ ได้ การเลือกประเภท Volume ที่เหมาะสมจะช่วยให้ระบบทำงานได้มีประสิทธิภาพมากยิ่งขึ้น