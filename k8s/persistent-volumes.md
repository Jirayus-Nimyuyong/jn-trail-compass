# Kubernetes Persistent Volumes (PV)

## Introduction
Kubernetes Persistent Volumes (PV) เป็นฟีเจอร์ที่ช่วยให้สามารถจัดการข้อมูลที่ต้องการเก็บรักษาในระยะยาว โดยไม่ขึ้นกับการทำงานของ Pod และการจัดการข้อมูลนี้สามารถแยกออกจาก Pod และ Node ได้ เพื่อให้ข้อมูลมีความเสถียรและปลอดภัยในกรณีที่ Pod ถูกลบหรือย้าย

## Key Concepts

1. **Persistent Volume (PV)**: 
   - PV คือแหล่งข้อมูลที่ถูกสร้างขึ้นจากแหล่งเก็บข้อมูลภายนอก เช่น NFS, Cloud Storage หรือ Volume แบบดั้งเดิมที่มีอยู่ในโฮสต์ Kubernetes
   - PV เป็นทรัพยากรที่สามารถจัดสรรได้ในคลัสเตอร์ Kubernetes ซึ่งสามารถใช้ร่วมกันโดยหลายๆ Pod

2. **Persistent Volume Claim (PVC)**:
   - PVC คือคำร้องขอจากผู้ใช้หรือแอปพลิเคชันให้ใช้ Persistent Volume
   - PVC ระบุขนาด, ชนิดของการเข้าถึงข้อมูล (Access Mode), และลักษณะของ Storage ที่ต้องการ

3. **Storage Class**:
   - Storage Class ใช้ในการกำหนดประเภทของ PV และวิธีการจัดสรร PV
   - Storage Class สามารถกำหนดว่า PV จะใช้ Storage แบบใด เช่น SSD, HDD หรือ Cloud Provider ต่าง ๆ

4. **Access Modes**:
   - `ReadWriteOnce (RWO)`: สามารถเข้าถึงได้จากโหนดเดียวและสามารถเขียนได้
   - `ReadOnlyMany (ROX)`: สามารถเข้าถึงได้จากหลายๆ โหนด แต่ไม่สามารถเขียนได้
   - `ReadWriteMany (RWX)`: สามารถเข้าถึงได้จากหลายๆ โหนดและสามารถเขียนได้

5. **Reclaim Policy**:
   - `Retain`: ปล่อยให้ PV อยู่ในสภาพเดิมเมื่อ PVC ถูกลบ
   - `Recycle`: ทำการลบข้อมูลใน PV เมื่อ PVC ถูกลบ
   - `Delete`: ลบ PV และข้อมูลทั้งหมดเมื่อ PVC ถูกลบ

## Working with Persistent Volumes

### Creating a Persistent Volume

การสร้าง Persistent Volume (PV) ใน Kubernetes สามารถทำได้ด้วยการกำหนดค่าในไฟล์ YAML ดังนี้:

```yaml
apiVersion: v1
kind: PersistentVolume
metadata:
  name: my-pv
spec:
  capacity:
    storage: 10Gi
  accessModes:
    - ReadWriteOnce
  persistentVolumeReclaimPolicy: Retain
  storageClassName: standard
  hostPath:
    path: "/mnt/data"
```

ในตัวอย่างนี้:
- `capacity`: กำหนดขนาดของ Volume
- `accessModes`: กำหนดโหมดการเข้าถึง (เช่น `ReadWriteOnce`)
- `persistentVolumeReclaimPolicy`: กำหนดการจัดการ PV หลังจาก PVC ถูกลบ (เช่น `Retain`)
- `hostPath`: กำหนดแหล่งข้อมูลในโฮสต์ที่ PV จะใช้

### Creating a Persistent Volume Claim (PVC)

หลังจากที่สร้าง PV แล้ว ผู้ใช้สามารถสร้าง PVC ที่จะร้องขอการใช้ PV ได้:

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
      storage: 10Gi
  storageClassName: standard
```

ในตัวอย่างนี้:
- `accessModes`: กำหนดโหมดการเข้าถึงที่ต้องการ
- `resources.requests.storage`: กำหนดขนาดของ Volume ที่ต้องการ
- `storageClassName`: ระบุชื่อของ Storage Class ที่ใช้

### Binding PVC to PV

เมื่อ PVC ถูกสร้างขึ้น, Kubernetes จะทำการจับคู่ PVC กับ PV ที่มีขนาดและคุณสมบัติตรงกันโดยอัตโนมัติ

### Mounting PVC in a Pod

เมื่อ PV ถูกผูกกับ PVC แล้ว, สามารถทำการเชื่อมโยง PVC เข้ากับ Pod โดยใช้ `volumeMounts` และ `volumes` ดังนี้:

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
    persistentVolumeClaim:
      claimName: my-pvc
```

ในตัวอย่างนี้:
- `persistentVolumeClaim.claimName`: ระบุชื่อของ PVC ที่ต้องการใช้

## Reclaiming Persistent Volumes

Kubernetes สามารถจัดการกับ PV ที่ถูกลบหรือไม่ถูกใช้งานได้โดยใช้ `reclaimPolicy`:
- `Retain`: PV จะไม่ถูกลบ และสามารถนำกลับมาใช้ใหม่ได้
- `Recycle`: ระบบจะทำการลบข้อมูลและเตรียม PV ให้พร้อมใช้งานใหม่
- `Delete`: ระบบจะทำการลบทั้ง PV และข้อมูลใน PV

## Conclusion

Kubernetes Persistent Volumes (PV) ช่วยให้การจัดการข้อมูลระยะยาวใน Kubernetes เป็นเรื่องง่าย โดยการใช้ PV และ PVC คุณสามารถแยกการจัดการข้อมูลออกจาก Pod และจัดเก็บข้อมูลที่มีความยืดหยุ่นและปลอดภัย การเลือกใช้ PV และการตั้งค่า `storageClass` ช่วยให้ระบบของคุณสามารถขยายตัวได้อย่างง่ายดายและมีประสิทธิภาพ