# Kubernetes Custom Resource Definitions (CRDs)

## Introduction
ใน Kubernetes, **Custom Resource Definitions (CRDs)** เป็นฟีเจอร์ที่ช่วยให้คุณสามารถสร้าง **Custom Resources (CRs)** ของคุณเองที่สามารถใช้งานร่วมกับ Kubernetes API ได้ CRD ช่วยให้คุณสามารถขยาย Kubernetes API เพื่อรองรับการจัดการกับ resource ใหม่ๆ ที่ไม่อยู่ในกลุ่ม resources พื้นฐานเช่น Pod, Service หรือ Deployment โดยการสร้างชนิดข้อมูลที่เหมาะสมกับแอปพลิเคชันหรือการใช้งานเฉพาะ

การใช้งาน **CRD** จะทำให้ Kubernetes สามารถรับรู้และจัดการ Custom Resources ของคุณเหมือนกับทรัพยากรอื่นๆ ใน Kubernetes เช่นเดียวกับ Pod หรือ Service

## Key Concepts

1. **Custom Resource (CR)**:
   - **Custom Resource (CR)** คือ Resource ใหม่ที่คุณสร้างขึ้นภายใต้ Kubernetes API ซึ่งสามารถมีการตั้งค่าและชนิดข้อมูลที่เฉพาะเจาะจงตามความต้องการของแอปพลิเคชันของคุณ
   - การสร้าง CR จะต้องสร้างผ่าน **Custom Resource Definition (CRD)** ซึ่งกำหนดว่า CR ของคุณมีลักษณะอย่างไร

2. **Custom Resource Definition (CRD)**:
   - **CRD** คือชนิดของ Resource ที่ใช้ในการสร้าง Custom Resource ใหม่ ๆ ภายใต้ Kubernetes API โดย CRD จะระบุรายละเอียดของ Custom Resource รวมถึงฟิลด์และการตั้งค่าที่สามารถใช้งานได้
   - เมื่อ CRD ถูกสร้างขึ้น, Kubernetes จะสร้าง API endpoint ใหม่สำหรับ Custom Resources ที่เกี่ยวข้อง

3. **Kinds**:
   - ใน CRD, `kind` ของ Resource จะถูกกำหนดเพื่อบ่งชี้ถึงชื่อและประเภทของ Resource ที่คุณต้องการสร้าง
   - `kind` นี้จะถูกใช้ในคำสั่ง kubectl เพื่อจัดการกับ Custom Resource

4. **Validation**:
   - CRD รองรับการ **Validation** ของข้อมูลที่ถูกส่งเข้าไปใน Custom Resources ซึ่งช่วยให้สามารถกำหนดกฎเกณฑ์ของข้อมูลที่จะถูกใช้ใน Custom Resources

5. **Scope**:
   - CRD สามารถกำหนด **scope** เป็น `Namespaced` หรือ `Cluster` เพื่อกำหนดว่า Custom Resource ของคุณจะถูกใช้งานเฉพาะภายใน namespace เดียวหรือสามารถใช้ได้ทั่วทั้ง Cluster

## How CRDs Work

### Creating a Custom Resource Definition (CRD)

การสร้าง **Custom Resource Definition (CRD)** จะใช้ `kubectl` หรือไฟล์ YAML เพื่อสร้างการตั้งค่า CRD ที่ต้องการ

#### Example of a CRD YAML

```yaml
apiVersion: apiextensions.k8s.io/v1
kind: CustomResourceDefinition
metadata:
  name: examples.mycompany.com
spec:
  group: mycompany.com
  names:
    kind: Example
    plural: examples
    singular: example
    shortNames:
      - ex
  scope: Namespaced
  versions:
    - name: v1
      served: true
      storage: true
      schema:
        openAPIV3Schema:
          type: object
          properties:
            spec:
              type: object
              properties:
                field1:
                  type: string
                field2:
                  type: integer
```

ในตัวอย่างนี้:
- **group**: ชื่อกลุ่มของ Custom Resource ที่คุณต้องการสร้าง (`mycompany.com`)
- **names**: ชื่อของ Custom Resource ที่จะใช้กับ `kubectl` เช่น `example` หรือ `examples`
- **scope**: กำหนดว่า Custom Resource นี้จะถูกใช้งานภายใน namespace (`Namespaced`) หรือทั่วทั้ง Cluster (`Cluster`)
- **versions**: กำหนดเวอร์ชันของ CRD, ซึ่งในตัวอย่างนี้มีเวอร์ชันเดียวคือ `v1`
- **schema**: กำหนดโครงสร้างของข้อมูลที่อนุญาตใน Custom Resource โดยใช้ OpenAPI v3

### Creating a Custom Resource (CR)

เมื่อ CRD ถูกสร้างขึ้นแล้ว, คุณสามารถสร้าง **Custom Resource (CR)** ที่ตรงตาม CRD ที่คุณกำหนด

#### Example of a Custom Resource YAML

```yaml
apiVersion: mycompany.com/v1
kind: Example
metadata:
  name: example1
spec:
  field1: "Hello, World!"
  field2: 42
```

ในตัวอย่างนี้:
- `apiVersion` จะใช้กลุ่มและเวอร์ชันที่คุณกำหนดใน CRD
- `kind` จะใช้ `Example` ซึ่งถูกกำหนดใน CRD
- `spec` จะมีข้อมูลที่เกี่ยวข้องกับ Custom Resource ของคุณ

### Accessing and Managing Custom Resources

หลังจากที่คุณสร้าง CRD และ CR แล้ว, คุณสามารถใช้งาน **kubectl** เพื่อจัดการ Custom Resources เหล่านั้น เช่น การสร้าง, ดูข้อมูล, อัปเดต, หรือลบ Custom Resource

```bash
# Create a Custom Resource
kubectl apply -f example-cr.yaml

# List Custom Resources
kubectl get examples

# View a specific Custom Resource
kubectl get example example1 -o yaml

# Delete a Custom Resource
kubectl delete example example1
```

### Custom Controllers

หลังจากที่คุณสร้าง Custom Resource, คุณสามารถสร้าง **Custom Controllers** ที่จะช่วยในการจัดการหรือทำงานกับ Custom Resources ของคุณได้
- **Custom Controllers** คือโปรแกรมที่ทำงานใน Kubernetes Cluster เพื่อสังเกตและจัดการ Custom Resources ตามที่คุณต้องการ
- **Operator** คือรูปแบบหนึ่งของ Custom Controller ที่ใช้เพื่อจัดการ Resource และให้การทำงานอัตโนมัติสำหรับการตั้งค่าและดูแลรักษาแอปพลิเคชัน

## Best Practices for CRDs

1. **Versioning**:
   - ใช้ versioning สำหรับ CRD เพื่อจัดการการเปลี่ยนแปลงที่เกิดขึ้นใน Custom Resource เมื่อแอปพลิเคชันเติบโตและมีการปรับปรุง

2. **Validation**:
   - กำหนด schema validation สำหรับ Custom Resource เพื่อให้แน่ใจว่าข้อมูลที่ถูกส่งเข้าไปมีความถูกต้องตามที่ต้องการ

3. **Naming Conventions**:
   - ใช้ชื่อที่มีความหมายและตรงตามมาตรฐานในกลุ่มและชนิดของ Custom Resource เพื่อให้ง่ายในการจัดการและบำรุงรักษา

4. **Avoid Overuse**:
   - ใช้ CRD สำหรับกรณีที่จำเป็นต้องขยาย Kubernetes API เพื่อให้เหมาะสมกับแอปพลิเคชันของคุณ แต่อย่าใช้ CRD มากเกินไปเพราะอาจทำให้ Kubernetes Cluster ซับซ้อนเกินไป

5. **Monitor and Audit**:
   - ควรตั้งค่าและใช้งานเครื่องมือที่ช่วยในการตรวจสอบและตรวจสอบการใช้ Custom Resources และการเปลี่ยนแปลงใน CRDs เพื่อความปลอดภัยและการบำรุงรักษา

## Conclusion

**Custom Resource Definitions (CRDs)** ช่วยให้คุณสามารถขยาย Kubernetes API เพื่อสร้าง Custom Resources ที่เหมาะสมกับความต้องการของแอปพลิเคชันหรือการใช้งานของคุณ การใช้ CRD ทำให้ Kubernetes สามารถจัดการกับทรัพยากรใหม่ๆ ที่ไม่ได้มีอยู่ใน Kubernetes โดยเริ่มต้น CRD รองรับการจัดการทรัพยากรที่เฉพาะเจาะจงและสามารถกำหนด Validation และ Schema ได้