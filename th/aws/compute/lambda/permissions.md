# Lambda Permissions – IAM Roles & Resource Policies

## Lambda Execution Roles และ Permissions

เรามาพูดถึง **Lambda execution roles** และ **permissions** กันอีกครั้ง แม้ว่าเราเคยเรียนรู้ผ่านการทำ hands-on ไปแล้ว การทบทวนทฤษฎีจะช่วยให้เข้าใจลึกขึ้น

* **IAM Role** ต้องถูกแนบกับ Lambda function ของคุณ
* Role นี้จะให้สิทธิ์ Lambda function ในการเข้าถึง **AWS services** และ **resources**

### ตัวอย่าง Managed Policies สำหรับ Lambda

AWS มี **policies ที่จัดการให้พร้อมใช้งาน (managed policies)** ซึ่งเราสามารถนำมาใช้ได้ เช่น:

* **BasicExecutionRole**: อนุญาตให้ Lambda อัปโหลด logs ไปยัง CloudWatch
* **KinesisExecutionRole**: ให้สิทธิ์อ่านข้อมูลจาก Kinesis
* **DynamoDBExecutionRole**: อนุญาตให้ Lambda อ่านจาก DynamoDB Streams
* **SQSQueueExecutionRole**: ให้สิทธิ์อ่านจาก SQS
* **LambdaVPCAccessExecutionRole**: อนุญาตให้ deploy Lambda function ภายใน VPC
* **XrayDaemonWriteAccess**: อนุญาตให้ Lambda อัปโหลด trace data ไปยัง AWS X-Ray

นอกจากนี้ เรายังสามารถสร้าง **custom policies** สำหรับ Lambda function ของเราเองได้

* เมื่อเราใช้ **event source mapping** เพื่อเรียก Lambda function

  * Lambda ต้องอ่านข้อมูลจาก source ดังนั้นจึงต้องใช้ **execution role**
* แต่หาก Lambda ถูกเรียกโดย service อื่น อาจไม่จำเป็นต้องมี IAM Role พิเศษ

**Best Practice:** สร้าง **Lambda execution role หนึ่งอันต่อ Lambda function หนึ่งอัน**

* ทั้งสำหรับ **event source mappings**
* หรือกรณี Lambda ต้องเรียกใช้ service อื่น

## Resource-Based Policies สำหรับ Lambda

กรณี Lambda function ถูกเรียกโดย service อื่น

* ใช้ **resource-based policies** เพื่อให้ AWS accounts หรือ services อื่นสามารถเข้าถึง Lambda ของคุณได้ เช่น การ invoke function
* คล้ายกับ **S3 bucket policy**

**กฎทั่วไป:** IAM principal สามารถเข้าถึง Lambda function ได้ หากมีเงื่อนไขใดเงื่อนไขหนึ่ง:

1. **IAM policy** ที่แนบกับ principal อนุญาตการเข้าถึง

   * ตัวอย่าง: IAM user ที่มี full permissions สามารถเข้าถึง Lambda ได้
2. **Resource-based policy** อนุญาตการเข้าถึง Lambda function

   * มีประโยชน์มากสำหรับ **service-to-service access**
   * ตัวอย่าง: Amazon S3 ต้องการ invoke Lambda function ของเรา จะต้องได้รับสิทธิ์จาก resource-based policy

* AWS Management Console จะจัดการเรื่องนี้ให้อัตโนมัติ
* หากทำ integration เอง จะต้องตั้งค่า policy เหล่านี้ด้วยตัวเอง

## สรุป (Key Takeaways)

* Lambda functions ต้องการ **IAM execution role** เพื่อเข้าถึง AWS services และ resources
* AWS มี **managed policies** เช่น BasicExecutionRole, KinesisExecutionRole สำหรับ Lambda permissions ทั่วไป
* Best practice: สร้าง **execution role หนึ่งอันต่อ Lambda function หนึ่งอัน**
* **Resource-based policies** ช่วยให้ AWS accounts หรือ services อื่นสามารถ invoke Lambda function ได้ ทำให้เกิด **service-to-service access**