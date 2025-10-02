# CloudFormation - Deletion Policy

**DeletionPolicy** เป็นการตั้งค่าที่สามารถใช้กับ resources ใน CloudFormation templates เพื่อควบคุมว่า **จะเกิดอะไรขึ้นกับ resource** เมื่อมันถูกลบออกจาก template หรือเมื่อ **CloudFormation stack ถูกลบ** ฟีเจอร์นี้ช่วยให้คุณสามารถ **เก็บรักษาและสำรองข้อมูลของ resource** ได้

โดยค่าเริ่มต้น เมื่อคุณลบ CloudFormation stack **resources ทั้งหมดภายใน stack จะถูกลบด้วย**

* นั่นหมายความว่า **ค่า DeletionPolicy เริ่มต้นคือ Delete**
* คุณไม่จำเป็นต้องระบุอย่างชัดเจน แต่บางครั้งก็ระบุเพื่อความชัดเจน

ตัวอย่าง:

* ถ้าคุณมี EC2 instance และตั้ง `DeletionPolicy: Delete` → EC2 instance จะถูกลบเมื่อ stack ถูกลบ

## DeletionPolicy กับ S3 Buckets

* ถ้าคุณมี S3 bucket และตั้ง `DeletionPolicy: Delete` → จะลบ bucket ได้ **ก็ต่อเมื่อ bucket ว่าง**
* ถ้า bucket ไม่ว่าง → การลบจะล้มเหลว
* วิธีแก้ไข:

  1. ลบ object ทั้งหมดใน bucket ก่อนลบ stack
  2. ใช้ custom resource เพื่อลบเนื้อหาทั้งหมดโดยอัตโนมัติก่อนลบ bucket

## DeletionPolicy Retain

* `Retain` คือการระบุว่า **resource ไหนต้องการเก็บไว้** แม้ stack ถูกลบ
* ตัวอย่าง: DynamoDB table

  * ปกติจะถูกลบเมื่อ stack ถูกลบ
  * ถ้าต้องการเก็บข้อมูล → ตั้ง `DeletionPolicy: Retain`
  * table จะยังคงอยู่หลัง stack ถูกลบ
* นโยบายนี้ใช้ได้กับ **ทุก resource**

## DeletionPolicy Snapshot

* `Snapshot` คือการ **สร้าง snapshot สุดท้ายก่อนลบ resource**
* รองรับกับ resources เช่น:

  * EBS volumes
  * ElastiCache clusters / replication groups
  * RDS DB instances / clusters
  * Redshift, Neptune, DocumentDB เป็นต้น
* ตัวอย่าง: ถ้าใช้ `DeletionPolicy: Snapshot` กับ RDS instance → resource จะถูกลบ แต่ก่อนลบจะสร้าง snapshot สำรองก่อน

## ตัวอย่าง: DeletionPolicy ใน template

* ในไฟล์ `deletionpolicy.yaml`

  * มี **Security Group** ตั้ง `DeletionPolicy: Retain` → ถ้า stack ถูกลบ security group จะยังคงอยู่
  * มี **EBS Volume** ตั้ง `DeletionPolicy: Snapshot` → volume จะถูกลบ แต่สร้าง snapshot ก่อน

## การสาธิต: การสร้างและลบ stack

* สร้าง stack ชื่อ `DeletionPolicyDemo` จาก template
* stack มี 2 resource: EBS volume และ EC2 security group
* สร้างสำเร็จทั้งสอง

**เมื่อทำการลบ stack:**

* Security group → ไม่ถูกลบ (เนื่องจาก Retain) ต้องลบเองหากไม่ต้องการใช้ต่อ
* EBS volume → ถูกลบ แต่สร้าง snapshot สำเร็จก่อนลบ

  * Snapshot ID จะปรากฏ
  * Snapshot สามารถดูได้ในรายการ snapshots

**การทำความสะอาดเพิ่มเติม:**

* ต้องลบ snapshot ที่สร้างจาก EBS volume เอง
* ลบ security group ที่เก็บไว้เอง หากไม่ต้องการใช้ต่อ

**สรุป:**

* DeletionPolicy ให้ความยืดหยุ่นและควบคุมได้ว่า resources จะถูกลบ เก็บไว้ หรือ snapshot ก่อนลบ

## Key Takeaways

* **DeletionPolicy** ควบคุมชะตากรรมของ resources เมื่อ stack ถูกลบ
* **ค่าเริ่มต้น: Delete** → ลบ resource พร้อม stack
* **Retain** → เก็บ resource ไว้หลัง stack ถูกลบ (ต้องลบเอง)
* **Snapshot** → สร้าง snapshot สุดท้ายก่อนลบ resource (ใช้สำรองข้อมูล)
