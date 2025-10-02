# CDK Constructs Overview

**Constructs** ใน CDK มีความสำคัญมาก

* เป็น **ส่วนประกอบ** ที่รวมทุกสิ่งที่ CDK ต้องการเพื่อสร้าง **CloudFormation stack สุดท้าย**
* Construct สามารถเป็น **resource ของ AWS เดียว** เช่น S3 bucket
* หรือเป็น **การรวมหลาย resource ที่เกี่ยวข้องกัน** เช่น SQS worker queue พร้อม compute resources

## การเข้าถึง Constructs

เราจะได้ Constructs มาจากไหน?

1. **Construct Library**: เป็นชุด Constructs ที่รวมอยู่ใน CDK อยู่แล้ว

   * มีสำหรับทุก resource ของ AWS
   * แบ่งเป็น 3 ระดับ: **Level 1, Level 2, Level 3**
2. **Construct Hub**: รวม Constructs จาก AWS, third-party, และ community

   * ช่วยให้สร้าง CDK stack ได้เร็วและง่ายขึ้น

## Level 1 Constructs: CFN Resources

* เรียกว่า **CFN Resources** เพราะแทน resource ที่มีใน **CloudFormation ทั้งหมด**
* ตัวอย่าง: สร้าง bucket → `new s3.CfnBucket`
* ต้องกำหนด property ตาม **CloudFormation Resource Specifications**
* เริ่มต้นด้วย **Cfn** เช่น `CfnBucket`, `CfnSQSQueue`
* เหมาะสำหรับ **ย้ายจาก CloudFormation มายัง CDK แบบทีละ resource**

## Level 2 Constructs: Higher-Level AWS Resources

* แทน resource ของ AWS ใน **ระดับ abstraction ที่สูงกว่า**
* เน้น **intent** มากกว่า property ดิบ
* ตัวอย่าง: `s3.Bucket`
* ไม่เริ่มด้วย `Cfn`
* มี **default values และ boilerplate code** ช่วยให้ไม่ต้องรู้ทุก property
* ตัวอย่างการตั้งค่า:

  ```typescript
  versioned: true
  encryption: s3.BucketEncryption.KMS
  ```

* มี **methods เพิ่มเติม** เช่น `bucket.addLifecycleRule()` ทำให้การเพิ่ม lifecycle rules ง่ายขึ้น

## Level 3 Constructs: Patterns

* เรียกว่า **Patterns** เพราะเป็นการรวม **หลาย resource ที่เกี่ยวข้องกัน** เพื่อทำงานทั่วไป
* ตัวอย่าง:

  1. **Lambda REST API Pattern** → เพิ่ม resource และ HTTP integration ได้ง่าย
  2. **ECS Pattern** → สร้าง **Application Load Balancer + Fargate Service** อัตโนมัติ

     * ไม่ต้องกำหนดทุก resource ด้วย CloudFormation ดิบ
     * CDK จะเชื่อม ALB + Fargate Service พร้อมพอร์ต, security group, listener ให้

## สรุป

* เข้าใจ **ความแตกต่างของแต่ละระดับ Constructs** → เห็นความสามารถของ CDK

1. **Level 1**: เข้าถึง CloudFormation แบบตรง ๆ
2. **Level 2**: Abstraction สูงขึ้น + default + methods
3. **Level 3**: Patterns รวมหลาย resource → ใช้งาน common AWS tasks ง่ายขึ้น

* วิธีนี้ช่วยสร้าง **infrastructure AWS** ได้เร็วขึ้นและซับซ้อนน้อยลง

## Key Takeaways

* Constructs ใน CDK **รวมทุกสิ่งที่ต้องใช้เพื่อสร้าง CloudFormation stack**
* มี 3 ระดับ:

  1. **Level 1 (CFN Resources)** → ตรงกับ CloudFormation resources
  2. **Level 2 (higher-level AWS resources)** → มี default + methods + ง่ายต่อการ config
  3. **Level 3 (Patterns)** → รวมหลาย resource เพื่อทำงาน AWS ทั่วไป เช่น API, ECS services