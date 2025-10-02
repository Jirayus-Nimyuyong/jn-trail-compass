# CDK - Unit Testing

บทเรียนนี้ให้ภาพรวมสั้น ๆ เกี่ยวกับ **การทดสอบใน AWS Cloud Development Kit (CDK)**
เนื่องจาก CDK ใช้โค้ดในการสร้าง Infrastructure คุณจึงสามารถทดสอบโค้ดโครงสร้างพื้นฐานได้เหมือนกับโค้ด Python หรือ JavaScript ปกติ

ใน **CDK applications** จะมี **assertion modules** ซึ่งรวมกับ **framework การทดสอบยอดนิยม** เช่น:

* **Jest** สำหรับ JavaScript
* **Pytest** สำหรับ Python

โมดูลเหล่านี้ช่วยให้เรายืนยันว่า **resource, rule, condition, หรือ parameter** ตรงตามความต้องการหรือไม่

ตัวอย่างเช่น การทดสอบว่า **CDK application สังเคราะห์ (synthesize) ถูกต้อง**

* ตรวจสอบว่า CloudFormation template ที่สร้างขึ้นมี resource และ configuration ที่จำเป็นครบถ้วน

## ประเภทของการทดสอบใน CDK

1. **Fine-grained assertions**

   * ทดสอบว่ามี **resource เฉพาะ** ที่มี property ตามที่คาดหวัง

2. **Snapshot tests**

   * เปรียบเทียบ CloudFormation template ปัจจุบันกับ **baseline template ที่เก็บไว้ก่อนหน้า**

### Fine-Grained Assertions

* ตัวอย่าง:

  * ตรวจสอบว่า Lambda function มี handler และ runtime ถูกต้อง เช่น `nodejs14.x`
  * ตรวจสอบว่า SNS topic มีจำนวน subscription = 1
* การทดสอบนี้ช่วยยืนยันว่า **property ของ resource แต่ละตัวตรงตามที่คาดหวัง**

### Snapshot Tests

* Snapshot tests ตรวจสอบ **CloudFormation template ทั้งหมด** กับ baseline ที่เก็บไว้
* ใช้เพื่อให้แน่ใจว่า resource สำคัญ เช่น **DynamoDB table** ยังอยู่และมี property ตามที่คาด
* ช่วยตรวจจับ **การเปลี่ยนแปลงที่ไม่ตั้งใจ** ใน template

## วิธีทดสอบ CloudFormation Templates

มี **สองวิธีหลัก**:

1. **`fromStack`**

   * นำเข้า CDK stack ที่เขียนในโค้ด และสร้าง template สำหรับทดสอบ
   * ตัวอย่าง: `Template.fromStack(MyStack)`

2. **`fromString`**

   * นำเข้า CloudFormation template ในรูปแบบ string
   * ตัวอย่าง: `Template.fromString(myString)`
   * เหมาะกับการทดสอบ template ที่อยู่นอก CDK code

> การจำ **สองวิธีนี้ (`fromStack` และ `fromString`)** สำคัญ โดยเฉพาะสำหรับการสอบ

## สรุป

* การทดสอบ CDK ช่วยให้แน่ใจว่า **โค้ด infrastructure ทำงานตามที่คาด**
* ตรวจสอบว่า **CloudFormation template ถูกสร้างอย่างถูกต้อง**

## ข้อสรุปสำคัญ (Key Takeaways)

* CDK สามารถทดสอบ **infrastructure code** เหมือนโค้ด Python หรือ JavaScript ปกติ
* Assertion modules ของ CDK รองรับ **framework การทดสอบยอดนิยม** เช่น Jest และ Pytest
* **Fine-grained assertions** → ตรวจสอบ property ของ resource เฉพาะ
* **Snapshot tests** → เปรียบเทียบ CloudFormation template ปัจจุบันกับ baseline เพื่อหาการเปลี่ยนแปลง
