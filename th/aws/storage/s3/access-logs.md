# S3 Access Logs

* สำหรับ **วัตถุประสงค์ด้านการตรวจสอบ (audit)** คุณอาจต้องการเก็บ **บันทึกการเข้าถึง (access logs)** ของ S3
* หมายถึง **ทุกคำขอที่เกิดขึ้นกับ S3 bucket** ไม่ว่าจะได้รับอนุญาตหรือถูกปฏิเสธ จะถูกบันทึกเป็นไฟล์ใน **S3 bucket อื่น**
* ข้อมูลเหล่านี้สามารถนำไปวิเคราะห์ด้วยเครื่องมือ เช่น **Amazon Athena**

## ข้อกำหนดของ Logging Bucket

* **Logging bucket** ต้องอยู่ใน **region เดียวกัน** กับ bucket ที่ต้องการตรวจสอบ

## การทำงานของ S3 Access Logging

* คุณทำคำขอ (requests) กับ S3 bucket และเปิดใช้งาน access logs
* **ทุกคำขอจะถูกบันทึก** ลงใน logging bucket ที่กำหนด

## รูปแบบของ Log

* Access logs มี **รูปแบบเฉพาะ**
* รายละเอียดสามารถดูได้ที่:
  [S3 Log Format](https://docs.aws.amazon.com/AmazonS3/latest/dev/LogFormat.html)

## คำเตือนสำคัญเกี่ยวกับ Logging Bucket

* **ห้ามตั้ง logging bucket ให้เหมือนกับ bucket ที่กำลังตรวจสอบ**
* หากทำเช่นนั้นจะเกิด **logging loop ไม่มีที่สิ้นสุด** → ขนาด bucket จะเพิ่มขึ้นอย่างรวดเร็ว

## อธิบาย Logging Loop

* ถ้า bucket แอปพลิเคชันและ logging bucket เป็น **bucket เดียวกัน**
* ทุก object ที่ใส่ใน bucket จะสร้าง log entry ซึ่งตัว log เองก็เป็น object ที่ใส่ใน bucket เดิม
* ทำให้เกิด **ลูปซ้ำไม่สิ้นสุด** → การบันทึกจะเกิดขึ้นเรื่อย ๆ และค่าใช้จ่ายสูงมาก

### สรุป

* S3 Access Logs บันทึก **ทุกคำขอที่เกิดขึ้นกับ S3 bucket** ทั้งที่อนุญาตและปฏิเสธ
* Access logs ถูกเก็บเป็น **ไฟล์ใน S3 bucket อื่น** ใน region เดียวกัน
* ไฟล์ log มี **รูปแบบเฉพาะ** ตามเอกสารของ AWS
* **ห้ามใช้ bucket เดียวกันกับที่ตรวจสอบ** เพื่อป้องกัน logging loop และค่าใช้จ่ายสูง

## Key Takeaways

* S3 Access Logs ช่วยบันทึกทุกคำขอเข้า bucket
* ไฟล์ log ต้องเก็บใน bucket แยกใน region เดียวกัน
* ตรวจสอบรูปแบบ log ตามเอกสาร AWS
* อย่าตั้ง logging bucket เป็น bucket เดียวกับ bucket ที่ตรวจสอบ