# API Gateway – Deployment Stages

## การ Deploy บน API Gateway

เมื่อเราสร้าง API แรกผ่าน API Gateway แล้ว จะต้อง **Deploy ไปยัง Stage** เสมอถึงจะใช้งานได้จริง การเปลี่ยนแปลงใด ๆ บน API Gateway จะไม่ถูกนำไปใช้จนกว่าจะมีการ **Deploy** ซึ่งจุดนี้มักเป็นสาเหตุของความสับสน หลายคนแก้ไข API Gateway แต่ลืม Deploy ทำให้ API ยังไม่ Live

## Deployment Stages และการใช้งาน

* การเปลี่ยนแปลงถูก Deploy ไปยัง **Stage**
* สามารถสร้าง Stage ได้ไม่จำกัด พร้อมตั้งชื่อได้อิสระ เช่น `dev`, `test`, `prod` หรือ `v1`, `v2`, `v3`
* แต่ละ Stage มี **ค่าการตั้งค่าเฉพาะของตัวเอง** และยังสามารถ Rollback ได้ง่าย เพราะมีประวัติการ Deploy ครบถ้วน

## ตัวอย่าง: การจัดการ Breaking API Changes ด้วย Stages

สมมุติว่ามี 2 Stages และต้องการเปลี่ยน API ครั้งใหญ่

* **Stage v1** → ใช้ฟังก์ชัน Lambda เวอร์ชันเก่า (v1) ที่ Deploy แล้ว
* กำลังพัฒนา **Lambda v2** ซึ่งมีรูปแบบข้อมูลใหม่ ไม่เข้ากับ v1

ถ้า Deploy ลง **Stage v1** จะทำให้ลูกค้าเก่าพัง ดังนั้นควรสร้าง **Stage v2** ที่ชี้ไปยัง Lambda v2 แทน

🔗 ตัวอย่าง URL:

* `api.example.com/v1` → ใช้ฟังก์ชัน v1
* `api.example.com/v2` → ใช้ฟังก์ชัน v2

ลูกค้าสามารถเลือกใช้งานได้ทั้งสองเวอร์ชัน และเมื่อไม่มีใครใช้ v1 แล้ว ก็สามารถปิดได้ วิธีนี้ช่วยให้ Migration ทำได้อย่างราบรื่น

## Stage Variables

**Stage Variables** คล้ายกับ Environment Variables แต่ใช้เฉพาะใน API Gateway Stages

* ช่วยเปลี่ยนค่าการตั้งค่า **โดยไม่ต้อง Redeploy**
* ใช้งานได้กับ Lambda ARN, HTTP Endpoint, Mapping Template และอื่น ๆ
* ใช้ในการส่งค่าพารามิเตอร์เข้า Lambda ผ่าน Context Object

📌 การเรียกใช้งาน:

```cli
stageVariables.variableName
```

### Use Cases ของ Stage Variables

* กำหนด HTTP Endpoint ให้เหมาะกับแต่ละ Stage เช่น dev, test, prod
* ส่งค่าการตั้งค่าไปยัง Lambda Function ผ่าน Mapping Template
* ชี้ไปยัง Lambda Function ที่ถูกต้องตาม Stage

## การใช้ Stage Variables กับ Lambda Aliases

หนึ่งใน Pattern ที่พบบ่อยคือการใช้ Stage Variables ร่วมกับ **Lambda Aliases**

### ตัวอย่างการใช้งาน

* **dev stage** → ชี้ไปยัง Alias `dev` ที่ส่ง 100% Traffic ไปยัง Lambda เวอร์ชันล่าสุด
* **test stage** → ชี้ไปยัง Alias `test` ที่ส่ง Traffic ไปยัง Lambda เวอร์ชัน `v2`
* **prod stage** → ชี้ไปยัง Alias `prod` ที่ส่ง Traffic 95% ไปยัง `v1` และ 5% ไปยัง `v2`

ในกรณีนี้ สามารถปรับสัดส่วน Traffic บน Lambda Alias ได้โดยตรง **โดยไม่ต้องแก้ไข API Gateway** ทำให้การจัดการเวอร์ชันทำได้สะดวกมาก

## Key Takeaways

* API Gateway ต้อง **Deploy ไปยัง Stage** ก่อนการเปลี่ยนแปลงถึงจะมีผล
* สามารถมีหลาย Stage พร้อมกันเพื่อทำ Versioning และ Migration ของลูกค้าได้ราบรื่น
* Stage Variables ช่วยให้เปลี่ยนค่าการตั้งค่าได้โดยไม่ต้อง Redeploy
* การใช้ **Stage Variables + Lambda Aliases** ช่วยจัดการ Traffic และเวอร์ชันได้อย่างยืดหยุ่น โดยไม่ต้องอัปเดต API Gateway

API Gateway Stage Variables & Lambda Aliases

• We create a stage variable to indicate the corresponding Lambda alias
• Our API gateway will automatically invoke the right Lambda function!