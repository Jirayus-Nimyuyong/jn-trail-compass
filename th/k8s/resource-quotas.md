# Kubernetes Resource Quotas

## Introduction
Kubernetes Resource Quotas เป็นฟีเจอร์ที่ช่วยให้คุณสามารถจำกัดการใช้งานทรัพยากรในแต่ละ Namespace ได้ โดยสามารถควบคุมการใช้งาน CPU, Memory, Storage, และทรัพยากรอื่น ๆ ภายใน Kubernetes Cluster การใช้ Resource Quotas ช่วยให้การบริหารจัดการทรัพยากรในคลัสเตอร์มีความยุติธรรมและมีประสิทธิภาพ โดยเฉพาะในกรณีที่มีหลายทีม หรือหลายแอปพลิเคชันที่ทำงานในคลัสเตอร์เดียวกัน

## Key Concepts

1. **Resource Quota**:
   - Resource Quota ใช้เพื่อกำหนดขีดจำกัดของการใช้งานทรัพยากรใน Namespace
   - การใช้ Resource Quota จะช่วยให้แต่ละทีมหรือแอปพลิเคชันสามารถจำกัดการใช้งานทรัพยากรในระบบ และป้องกันไม่ให้แอปพลิเคชันใด ๆ ใช้ทรัพยากรมากเกินไปจนกระทบกับแอปพลิเคชันอื่น

2. **Resource Types**:
   - คุณสามารถกำหนดขีดจำกัดของทรัพยากรประเภทต่าง ๆ ใน Resource Quotas เช่น:
     - **CPU**: ใช้เพื่อจำกัดการใช้งาน CPU โดยระบุเป็นค่า `cpu` (เช่น `1`, `500m`)
     - **Memory**: ใช้เพื่อจำกัดการใช้งาน Memory โดยระบุเป็นค่า `memory` (เช่น `1Gi`, `512Mi`)
     - **Storage**: ใช้เพื่อจำกัดการใช้ Persistent Volume (PV) โดยระบุเป็น `storage`
     - **Pod**: ใช้เพื่อจำกัดจำนวน Pod ที่สามารถสร้างใน Namespace
     - **Service**: ใช้เพื่อจำกัดจำนวน Services ใน Namespace

3. **Hard and Soft Limits**:
   - **Hard Limits**: เป็นข้อกำหนดที่ไม่สามารถเกินได้ เช่น ขีดจำกัดจำนวน Pod หรือการใช้ CPU
   - **Soft Limits**: เป็นขีดจำกัดที่ Kubernetes สามารถให้การเตือนเมื่อถึงหรือเกินขีดจำกัด แต่จะไม่ปฏิเสธการสร้างทรัพยากร

## Creating Resource Quotas

### Resource Quota YAML Example

คุณสามารถสร้าง Resource Quota โดยการใช้ไฟล์ YAML ดังนี้:

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
    pods: "10"
    services: "5"
    persistentvolumeclaims: "5"
    configmaps: "10"
    secrets: "20"
```

ในตัวอย่างนี้:
- `requests.cpu`: กำหนดขีดจำกัดของการใช้งาน CPU โดยใช้ค่า `requests` และ `limits` สำหรับ CPU
- `requests.memory`: กำหนดขีดจำกัดการใช้งาน Memory
- `pods`: จำนวน Pod สูงสุดที่สามารถสร้างใน Namespace
- `services`: จำนวน Services สูงสุดที่สามารถสร้างใน Namespace
- `persistentvolumeclaims`: จำนวน PVC ที่สามารถสร้างใน Namespace
- `configmaps`, `secrets`: จำนวน ConfigMaps และ Secrets ที่สามารถสร้างใน Namespace

### Applying the Resource Quota

หลังจากที่คุณสร้างไฟล์ YAML สำหรับ Resource Quota แล้ว, คุณสามารถนำไปใช้ใน Kubernetes Cluster ได้ด้วยคำสั่ง:

```bash
kubectl apply -f resource-quota.yaml
```

### Checking Resource Quota Usage

คุณสามารถตรวจสอบการใช้งาน Resource Quota ใน Namespace ได้ด้วยคำสั่ง:

```bash
kubectl get resourcequota -n my-namespace
```

การใช้คำสั่งนี้จะแสดงข้อมูลเกี่ยวกับการใช้ทรัพยากรใน Namespace ที่คุณเลือก รวมถึงการใช้ CPU, Memory, และทรัพยากรอื่น ๆ

## Resource Quotas with LimitRange

**LimitRange** เป็นอีกหนึ่งทรัพยากรที่ช่วยกำหนดขีดจำกัดการใช้งานทรัพยากรในแต่ละ Pod ใน Namespace เพื่อให้มั่นใจว่า Pod ทุกตัวมีการตั้งค่าขีดจำกัดในการใช้ทรัพยากร

### Example of LimitRange

```yaml
apiVersion: v1
kind: LimitRange
metadata:
  name: my-limit-range
  namespace: my-namespace
spec:
  limits:
  - max:
      memory: 2Gi
      cpu: "2"
    min:
      memory: 128Mi
      cpu: "250m"
    type: Container
```

ในตัวอย่างนี้:
- `max`: กำหนดขีดจำกัดสูงสุดของการใช้ CPU และ Memory
- `min`: กำหนดขีดจำกัดต่ำสุดของการใช้ CPU และ Memory
- `type: Container`: กำหนดขีดจำกัดสำหรับ Container ใน Pod

การใช้ LimitRange และ Resource Quota ร่วมกันช่วยให้คุณสามารถควบคุมทรัพยากรได้ทั้งในระดับ Namespace และระดับ Pod

## Best Practices for Resource Quotas

1. **Define Quotas Based on Application Needs**:
   - ตั้งค่าขีดจำกัดที่เหมาะสมกับการใช้งานของแอปพลิเคชันในแต่ละ Namespace เช่น จำนวน Pod, CPU, และ Memory
   - คำนึงถึงความต้องการทรัพยากรที่แตกต่างกันระหว่างแอปพลิเคชันที่ทำงานในคลัสเตอร์เดียวกัน

2. **Monitor Quota Usage**:
   - คอยตรวจสอบการใช้ทรัพยากรในแต่ละ Namespace อย่างสม่ำเสมอ เพื่อให้แน่ใจว่าไม่มีการใช้งานเกินขีดจำกัดที่กำหนด
   - ใช้เครื่องมือเช่น Prometheus หรือ Grafana ในการติดตามการใช้ทรัพยากรใน Kubernetes

3. **Avoid Over-Provisioning**:
   - อย่ากำหนดขีดจำกัดที่สูงเกินไปเพื่อหลีกเลี่ยงการที่ระบบจะไม่สามารถรองรับการทำงานที่มีประสิทธิภาพได้
   - ควรคำนึงถึงการใช้ทรัพยากรของทุกทีมในคลัสเตอร์

4. **Set Default Resource Requests and Limits**:
   - การตั้งค่า default requests และ limits สำหรับ CPU และ Memory ช่วยให้ Pods ทุกตัวมีการตั้งค่าขีดจำกัดทรัพยากรอย่างเหมาะสม

## Conclusion

Kubernetes Resource Quotas เป็นเครื่องมือที่มีประสิทธิภาพในการจำกัดและจัดการการใช้ทรัพยากรในคลัสเตอร์ Kubernetes โดยสามารถป้องกันไม่ให้แอปพลิเคชันใดๆ ใช้ทรัพยากรมากเกินไป การใช้ Resource Quotas ร่วมกับ LimitRange จะช่วยให้การควบคุมการใช้งานทรัพยากรทั้งในระดับ Namespace และ Pod เป็นไปอย่างราบรื่นและมีประสิทธิภาพ