# CDK - Commands & Bootstrapping

ในบทเรียนนี้ เราจะเรียนรู้ **คำสั่งสำคัญของ AWS Cloud Development Kit (CDK)**
ซึ่งช่วยให้คุณจัดการ **CDK applications** ได้อย่างมีประสิทธิภาพ

## คำสั่งหลักของ CDK

1. **ติดตั้ง CDK CLI และไลบรารี**

   * ช่วยให้คุณเริ่มเขียน CDK stack ได้

2. **`cdk init`**

   * ใช้เริ่มต้นแอปจาก template ที่ระบุ
   * เลือกภาษาได้ เช่น Python, JavaScript เป็นต้น

3. **`cdk synth`**

   * สังเคราะห์และพิมพ์ **CloudFormation template**
   * แปลง CDK stack ที่เขียนด้วยโค้ดให้เป็น CloudFormation template

4. **`cdk bootstrap`**

   * จะอธิบายรายละเอียดในส่วนต่อไป

5. **`cdk deploy`**

   * ใช้ deploy stack หลังจากได้ CloudFormation template

6. **`cdk diff`**

   * ดูความแตกต่างระหว่าง **โค้ด CDK ในเครื่อง** กับ **สิ่งที่ deploy อยู่บน CloudFormation**

7. **`cdk destroy`**

   * ใช้ลบหรือทำลาย stack ที่ deploy ไปแล้ว

## การเข้าใจ CDK Bootstrapping

### Bootstrapping คืออะไร?

* Bootstrapping ใน CDK คือ **กระบวนการสร้าง resource ที่จำเป็น** ก่อน deploy CDK applications ไปยัง environment ของ AWS

### AWS Environment ใน CDK คืออะไร?

* Environment = **AWS account + Region**
* ก่อน deploy ไปยัง environment ใด ๆ ต้องทำ **bootstrapping** สำหรับ environment นั้นก่อน

### เกิดอะไรขึ้นระหว่าง Bootstrapping?

* รันคำสั่ง:

  ```bash
  cdk bootstrap aws://aws_account/aws_region
  ```

* CDK จะทำการสร้าง **CloudFormation stack ชื่อ CDKToolkit**
* Stack นี้จะสร้าง:

  * **S3 bucket**
  * **IAM role**
* Resource เหล่านี้เป็น **prerequisite** สำหรับ deploy CDK stack ใด ๆ

### ความสำคัญของ Bootstrapping

* หาก deploy stack โดยไม่ bootstrap จะเกิด error

  * ข้อความ error เช่น **policy contains a statement with one or more invalid principals**
  * สาเหตุ: IAM role ที่จำเป็นยังไม่มี

* ดังนั้น Bootstrapping จึง **จำเป็นเพื่อให้การ deploy มีสิทธิ์และ resource ครบถ้วน**

## สรุป

* CDK CLI มีคำสั่งสำคัญ เช่น:

  * `cdk init`, `cdk synth`, `cdk deploy`, `cdk diff`, `cdk destroy`, `cdk bootstrap`
* `cdk init` → เริ่มแอป CDK ใหม่จาก template ที่ระบุ
* `cdk synth` → แปลง CDK stack เป็น CloudFormation template
* `cdk bootstrap` → สร้าง resource สำคัญ เช่น S3 bucket และ IAM role ใน AWS environment ก่อน deploy
* การ deploy **โดยไม่ bootstrap** → จะเกิด error เนื่องจาก IAM role ขาด
* Bootstrapping เป็นขั้นตอนสำคัญก่อน deploy เพื่อป้องกันปัญหาในการ deploy