# CodePipeline

CodePipeline เป็นเครื่องมือแบบ Visual Workflow ที่ช่วยให้คุณสามารถจัดการกระบวนการ **CI/CD (Continuous Integration และ Continuous Delivery)** บน AWS ได้อย่างเป็นระบบและอัตโนมัติ

## ผู้ให้บริการ Source ที่รองรับ

คุณสามารถกำหนดแหล่งที่มาของซอร์สโค้ด (Source) ได้หลายแบบ เช่น:

* **CodeCommit repositories**
* **Docker images** ที่เก็บใน Amazon Elastic Container Registry (ECR)
* **Code** ที่เก็บใน Amazon S3
* **เครื่องมือภายนอก** เช่น Bitbucket หรือ GitHub

## ตัวเลือกในขั้นตอน Build

หลังจากดึงซอร์สโค้ดแล้ว คุณสามารถเข้าสู่ขั้นตอน Build ได้ โดยรองรับเครื่องมือต่าง ๆ เช่น:

* **AWS CodeBuild**
* **Jenkins**
* **CloudBees**
* **TeamCity**

## ขั้นตอน Testing

เมื่อผ่านการ Build แล้ว คุณสามารถเพิ่มขั้นตอนการทดสอบโค้ดได้ ตัวเลือกการทดสอบ เช่น:

* **AWS CodeBuild**
* **AWS Device Farm** (เหมาะสำหรับแอปมือถือ iOS และ Android)
* **เครื่องมือทดสอบของ third-party อื่น ๆ** ที่คุณเลือกใช้

## ขั้นตอน Deployment

เมื่อการทดสอบเสร็จสิ้น การ Deployment สามารถจัดการได้ด้วยบริการต่าง ๆ เช่น:

* **AWS CodeDeploy**
* **AWS Elastic Beanstalk**
* **AWS CloudFormation**
* **Amazon ECS**
* **Amazon S3**

นอกจากนี้ยังสามารถเรียกใช้งาน **AWS Lambda functions** หรือ **Step Functions** เป็นส่วนหนึ่งของการ Deployment ได้เช่นกัน

## Pipeline Stages และ Actions

คุณสามารถสร้าง Pipeline ที่มีหลาย Stage โดยแต่ละ Stage มี Action ที่ทำงาน **แบบลำดับ (sequential)** หรือ **ขนาน (parallel)** ได้ เช่น:

1. Build
2. Test
3. Deploy ไปยัง Staging
4. ทำ Load Testing บน Staging
5. Deploy ไป Production

คุณยังสามารถใส่ **ขั้นตอนการอนุมัติแบบ Manual (Manual Approval)** ใน Pipeline ได้ เช่น ก่อนจะ Deploy ไป Production ต้องให้คนตรวจสอบก่อน

## การทำงานภายในของ CodePipeline

ลองพิจารณา Pipeline ที่มี 3 ขั้นตอน: Source, Build, Deploy

* **Source**: ใช้ CodeCommit
* **Build**: ใช้ CodeBuild
* **Deploy**: ใช้ CodeDeploy

การทำงานคือ:

1. นักพัฒนาทำการ Push โค้ดไปที่ CodeCommit
2. CodePipeline ดึงโค้ดและสร้าง **Artifact** เก็บไว้ใน **S3 bucket**
3. CodeBuild ถูกเรียกใช้งานโดยรับ Artifact จาก S3 (ไม่ได้เข้าถึง CodeCommit โดยตรง)
4. CodeBuild ทำการ Build โค้ดและสร้าง Deployment Artifact
5. Artifact ที่ได้จะถูกเก็บกลับไปยัง S3 โดย CodePipeline
6. CodeDeploy จะนำ Artifact จาก S3 ไป Deploy ต่อ

การทำงานระหว่างแต่ละ Stage จะถูกเชื่อมโยงกันผ่าน **Artifacts ที่เก็บใน Amazon S3**

## การแก้ไขปัญหา (Troubleshooting CodePipeline)

* ใช้ **Amazon CloudWatch Events** และ **EventBridge** เพื่อติดตามการทำงานของ Pipeline และการเปลี่ยนสถานะของ Stage
* ตั้งค่า **การแจ้งเตือน (Notifications)** สำหรับ Pipeline ที่ล้มเหลวหรือถูกยกเลิก เช่น การส่งอีเมล
* ดูรายละเอียดปัญหาได้จาก **CodePipeline Console**
* ตรวจสอบ **IAM Service Role** ของ CodePipeline ว่ามีสิทธิ์เพียงพอ เช่น การเรียก CodeBuild หรือเข้าถึง CodeCommit
* ใช้ **AWS CloudTrail** เพื่อตรวจสอบ API Calls และหาสาเหตุของการถูกปฏิเสธสิทธิ์ (Denied Requests)

## สรุป

การเข้าใจองค์ประกอบและการทำงานของ CodePipeline เป็นสิ่งสำคัญสำหรับการออกแบบและจัดการ CI/CD Pipeline ที่มีประสิทธิภาพบน AWS การได้ทดลองปฏิบัติจริงจะช่วยให้เข้าใจลึกซึ้งมากยิ่งขึ้น

## Key Takeaways

* **AWS CodePipeline** เป็นเครื่องมือ Visual Workflow สำหรับจัดการ CI/CD Pipeline
* รองรับหลาย Source Provider, Build Tools, Test Phase และ Deployment Options
* **Artifacts** จะถูกเก็บใน **Amazon S3** และส่งต่อระหว่างแต่ละ Stage
* การแก้ปัญหาสามารถทำได้ด้วย **CloudWatch Events, EventBridge, IAM Role และ CloudTrail**