# Amazon OpenSearch Service

**Amazon OpenSearch Service** คือบริการที่ต่อยอดมาจาก **Amazon ElasticSearch** (ชื่อเก่า) โดยมีการเปลี่ยนชื่อเนื่องจากปัญหาเรื่องลิขสิทธิ์ (Licensing Issues)

## การเปรียบเทียบกับ DynamoDB

* ใน **DynamoDB** คุณสามารถ query ได้เฉพาะผ่าน **Primary Key** หรือ Index ที่สร้างไว้
* แต่ใน **OpenSearch** คุณสามารถค้นหาข้อมูลจาก **ทุกฟิลด์** ได้ รวมถึง **Partial Matches (ค้นหาบางส่วนของคำ)**
  ➡ ทำให้ OpenSearch เป็นที่นิยมในการเพิ่มความสามารถในการ **Search** ให้กับแอปพลิเคชัน

## การใช้งานร่วมกับฐานข้อมูล

OpenSearch ไม่ได้มาแทนฐานข้อมูล แต่ใช้เป็น **ตัวเสริม (Complement)**

* ใช้สำหรับ **Search**
* ใช้สำหรับ **Analytics Query** บนข้อมูลที่มีอยู่

## การ Provision OpenSearch Cluster

คุณสามารถสร้าง Cluster ได้ 2 แบบ:

1. **Managed Cluster** – AWS Provision instance ให้คุณ (เห็นเครื่องจริง)
2. **Serverless Cluster** – AWS จัดการให้ทั้งหมด ทั้งการ Scale และการดำเนินงาน

## ภาษาสำหรับ Query และการ Ingest Data

* OpenSearch มี **Query Language ของตัวเอง** (ไม่รองรับ SQL โดยตรง)
* หากต้องการใช้ SQL → เปิดใช้งานผ่าน **Plugin SQL Compatibility**
* การ Ingest ข้อมูลทำได้จากหลายแหล่ง เช่น:

  * **Kinesis Data Firehose**
  * **IoT**
  * **CloudWatch Logs**
  * หรือ **แอปพลิเคชัน Custom**

## ความปลอดภัย (Security)

* รองรับการเชื่อมต่อกับ **Cognito** และ **IAM**
* มี **Encryption at Rest** และ **Encryption in Transit** เพื่อปกป้องข้อมูล

## Analytics และ Visualization

สามารถทำ **Analytics** ได้บน OpenSearch และใช้ **OpenSearch Dashboards** เพื่อสร้าง Visualization และ Dashboard สำหรับข้อมูล

## รูปแบบการใช้งานทั่วไป (Usage Patterns)

ตัวอย่างที่พบบ่อย:

* ใช้ **DynamoDB** เป็น Data Store หลัก (Insert, Update, Delete)
* **DynamoDB Streams** จะเก็บการเปลี่ยนแปลงของข้อมูล
* **Lambda Function** จะอ่าน Stream แล้วส่งข้อมูลเข้า **Amazon OpenSearch** แบบ Real-Time
  ➡ ทำให้แอปพลิเคชันสามารถทำ **Partial Search** เช่น ค้นหาชื่อสินค้า → ได้ Item ID → ดึงข้อมูลเต็มจาก DynamoDB

## การ Ingest ข้อมูลจาก CloudWatch Logs

2 วิธีหลัก:

1. ใช้ **CloudWatch Log Subscription Filter** → ส่งข้อมูลแบบ Real-Time ไปที่ Lambda (ที่ AWS จัดการให้) → ส่งเข้า OpenSearch
2. ใช้ **CloudWatch Logs Subscription Filter + Kinesis Data Firehose** → อ่านข้อมูลแล้วส่งเข้า OpenSearch แบบ Near Real-Time

## การ Ingest ข้อมูลจาก Kinesis Data Streams

2 กลยุทธ์:

1. ใช้ **Kinesis Data Firehose** → Near Real-Time Ingestion (+ Lambda สำหรับ Transform Data ถ้าต้องการ)
2. ใช้ **Kinesis Data Streams + Lambda** → Lambda อ่าน Stream แบบ Real-Time และเขียนโค้ด Custom เพื่อส่งข้อมูลเข้า OpenSearch

## สรุป

Amazon OpenSearch เป็นบริการที่ช่วยเพิ่มความสามารถด้าน **Search และ Analytics** โดยใช้ควบคู่กับฐานข้อมูลและบริการ AWS อื่น ๆ ได้อย่างมีประสิทธิภาพ

## Key Takeaways

* **Amazon OpenSearch Service** เป็นรุ่นต่อจาก **Amazon ElasticSearch** (เปลี่ยนชื่อเพราะปัญหาลิขสิทธิ์)
* สามารถค้นหาข้อมูลในทุกฟิลด์ รวมถึง Partial Matches → ใช้เสริมกับฐานข้อมูลอย่าง DynamoDB ได้ดี
* รองรับ **Managed Cluster** และ **Serverless Cluster**
* Data ingestion ทำได้ผ่านหลายบริการ AWS เช่น **DynamoDB Streams, CloudWatch Logs, Kinesis Data Firehose, Lambda**
