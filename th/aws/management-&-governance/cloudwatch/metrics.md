# CloudWatch Metrics

CloudWatch Metrics ให้ข้อมูลการมอนิเตอร์สำหรับทุกบริการใน AWS การเข้าใจว่าแต่ละ metric หมายถึงอะไรเป็นสิ่งสำคัญ โดยปกติ **ชื่อของ metric** จะบอกชัดเจนถึงวัตถุประสงค์ เช่น CPU Utilization หรือ NetworkIn ช่วยให้เข้าใจพฤติกรรมของบริการและช่วยในการ Troubleshooting

## โครงสร้างของ Metrics

* Metrics จะอยู่ใน **namespace**
* มี attribute ที่เรียกว่า **dimensions** เช่น Instance ID หรือ Environment
* สามารถระบุ dimensions ได้สูงสุด 30 มิติต่อ metric
* แต่ละ metric มี **timestamp** ระบุเวลาที่เก็บข้อมูล
* CloudWatch สามารถสร้าง **Dashboard** เพื่อดูและวิเคราะห์ metrics

## Metrics และการมอนิเตอร์ของ EC2

* EC2 จะเก็บ metrics ทุก **5 นาที** โดยค่าเริ่มต้น
* หากเปิด **Detailed Monitoring** (มีค่าใช้จ่ายเพิ่มเติม) metrics จะเก็บทุก **1 นาที**
* Granularity สูงช่วยให้ตอบสนองต่อการเปลี่ยนแปลงได้เร็วขึ้น เช่น Auto Scaling Groups (ASG) สามารถ scale ได้รวดเร็ว

## Custom Metrics

* บาง metrics เช่น **การใช้งานหน่วยความจำ (RAM)** ของ instance จะ **ไม่ถูกส่งโดยอัตโนมัติ**
* ต้องส่งจาก instance เป็น **Custom Metrics**
* วิธีการส่ง Custom Metrics จะมีอธิบายในส่วนต่อไป

## การใช้งาน CloudWatch Dashboard

* ใน Dashboard ด้านซ้ายมี **Metrics Section** รวม metrics ทั้งหมด
* Metrics ถูกจัดตาม **namespace** ของแต่ละบริการ เช่น ELB, Auto Scaling, EBS, EC2, EFS
* ทำให้สะดวกในการมอนิเตอร์และวิเคราะห์ทรัพยากร

## การดู Metrics ของ EC2

* เลือก **EC2 Metrics** เพื่อดู metrics ต่อ instance
* ตัวอย่าง: ดู **CPU credit balance** สำหรับ instance ใด instance หนึ่ง
* สามารถเลือก **ช่วงเวลา** ที่ต้องการ เช่น 1 เดือน เพื่อวิเคราะห์ข้อมูลย้อนหลัง

## การแสดงผล Metrics

* CloudWatch จะแสดง **data points** ตาม interval ของการมอนิเตอร์

  * แบบปกติ: ทุก 5 นาที
  * Detailed Monitoring: ทุก 1 นาที
* สามารถ **กรอง metrics ตามเวลา** และเลือกสไตล์การแสดงผล เช่น lines, stacked areas, numbers, pie charts
* Metrics สามารถเพิ่มใน **Dashboard**, ดาวน์โหลดเป็น CSV หรือแชร์ได้

## การกรองและการเลือก Region

* CloudWatch สามารถกรอง metrics ตาม **Region, Dimension, Resource**
* ช่วยให้มอนิเตอร์ได้อย่างแม่นยำตามความต้องการ

## CloudWatch Custom Metrics

Metrics ทั้งหมดที่เราเห็นจนถึงตอนนี้ เป็น metrics ที่ได้จากบริการภายใน AWS โดยค่าเริ่มต้น แต่คุณสามารถสร้าง **Custom Metrics** ของตัวเองเพื่อส่งข้อมูลไปยัง CloudWatch ได้

ตัวอย่างเช่น:

* ส่ง **การใช้งานหน่วยความจำ (RAM)** หรือ **พื้นที่ดิสก์**
* ส่ง **จำนวนผู้ใช้งานที่ล็อกอิน** ของแอปพลิเคชัน

คุณจะใช้ API ชื่อ **PutMetricData** ในการส่ง metrics เหล่านี้

## การกำหนด Dimensions ของ Custom Metrics

* คุณสามารถเพิ่ม **dimensions** หรือ attribute ให้ metric ของคุณได้ เช่น `instance.id`, `environment.name` หรือ attribute อื่น ๆ
* คุณสามารถตั้งชื่อ dimensions ตามที่ต้องการ

## Metric Resolution

* สามารถระบุ **storage resolution** ของ metric ได้

  * **Standard Resolution:** ส่ง metric ทุก 60 วินาที (1 นาที)
  * **High Resolution:** ส่ง metric ทุก 1, 5, 10 หรือ 30 วินาที

## การส่ง Metric ในอดีตหรืออนาคต

* สามารถส่ง metric **ย้อนหลังได้สูงสุด 2 สัปดาห์**
* สามารถส่ง metric **ล่วงหน้าได้สูงสุด 2 ชั่วโมง**
* CloudWatch จะรับ metric โดยไม่เกิด error
* สิ่งสำคัญ: ต้องตั้ง **เวลาใน EC2 ให้ถูกต้อง** เพื่อให้ metric สอดคล้องกับเวลาจริงของ AWS

## การส่ง Custom Metric

* ใช้ **PutMetricData API** ผ่าน CLI หรือ CloudShell

* สามารถระบุ:

  * Timestamp (เวลา)
  * Data, Name, Value, Units
  * Dimensions เช่น Instance ID, Instance Type
  * Storage Resolution (Standard หรือ High Resolution)

* ตัวอย่าง: ส่ง metric หนึ่งจุดข้อมูลผ่าน CLI

* หากทำจาก EC2 instance ด้วยสคริปต์ สามารถส่ง metric เป็นประจำได้

* หลังจากส่ง metric จะเกิด **Namespace ใหม่** ของเราเอง เช่น `MyNameSpace`

* ภายใน namespace จะมี **dimensions** ที่ระบุ เช่น `instance ID` และ `instance type`

* Metric จะปรากฏใน CloudWatch ภายใต้ namespace และ dimensions ที่เรากำหนด

## สรุป

* CloudWatch Metrics เป็นเครื่องมือที่ทรงพลังสำหรับมอนิเตอร์บริการ AWS
* การเข้าใจ **ชื่อ metric, namespace, dimension และ granularity** ช่วยให้ติดตามและแก้ไขปัญหาได้อย่างมีประสิทธิภาพ
* **Custom Metrics** ช่วยมอนิเตอร์พารามิเตอร์เพิ่มเติม เช่น การใช้งานหน่วยความจำ
* **Dashboard** มีตัวเลือกการแสดงผลและการกรองที่ยืดหยุ่น
* การสร้าง Custom Metrics ง่ายมาก เพียงใช้ API call `PutMetricData`
* สามารถกำหนด dimensions และ namespace ของตัวเองได้
* Metrics รองรับ **Standard Resolution** และ **High Resolution**
* CloudWatch ยอมรับ metric ที่มี timestamp ย้อนหลัง 2 สัปดาห์ หรือ ล่วงหน้า 2 ชั่วโมง
* ต้องตั้งเวลาของ instance ให้ตรงกับเวลาจริงของ AWS

## Key Takeaways

* CloudWatch มี metrics สำหรับทุกบริการ AWS โดยชื่อ metric ชี้ชัดความหมาย
* Metrics อยู่ใน namespace และสามารถมีได้สูงสุด 30 dimensions เช่น Instance ID หรือ Environment
* EC2 metrics: ค่าเริ่มต้นทุก 5 นาที, Detailed Monitoring ทุก 1 นาที
* Custom metrics เช่น การใช้งาน RAM ต้องส่งจาก instance เอง
* Dashboard สามารถกรอง, แสดงผล และแชร์ metrics ข้าม region และ resource ได้
* Custom Metrics สามารถสร้างและส่งได้ด้วย **PutMetricData API**
* รองรับ dimensions เช่น `instance ID` และ `environment name` ที่สามารถตั้งชื่อเอง
* ส่ง metrics แบบ **Standard** (ทุก 60 วินาที) หรือ **High Resolution** (1, 5, 10, 30 วินาที)
* CloudWatch รับ metric ย้อนหลังสูงสุด 2 สัปดาห์ และล่วงหน้าสูงสุด 2 ชั่วโมงโดยไม่เกิด error
* ต้องตั้งเวลา instance ให้ตรงกับเวลา AWS