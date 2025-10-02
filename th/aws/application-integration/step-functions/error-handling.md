# Step Functions – Error Handling

## แนะนำ Error Handling ใน Step Functions

Step Functions ทำงานโดยการเรียกใช้ **tasks เล็ก ๆ จำนวนมาก** ที่มักทำงานง่าย ๆ เช่น การเรียก API
หลักการสำคัญคือ:
👉 **การจัดการข้อผิดพลาดควรทำภายนอก Task** โดยให้ Step Functions จัดการ ไม่ใช่ให้โค้ด (เช่น Lambda) จัดการเอง

## เมื่อไหร่ถึงจะเกิด Error?

ข้อผิดพลาด (Errors) สามารถเกิดได้หลายกรณี เช่น:

* การนิยาม state machine ผิด เช่น ไม่มี rule ที่ตรงใน Choice State
* Task ล้มเหลว เช่น Lambda function ขว้าง exception ออกมา
* ความผิดพลาดชั่วคราว (Transient failures) เช่น ปัญหา network

❌ ไม่ควรเขียนโค้ดดักจับ exception ใน Lambda เอง
✅ แต่ควรให้ Step Functions จัดการด้วยกลไก error handling

## ประเภทของ Error Handling ใน Step Functions

มี 2 วิธีหลัก ๆ:

1. **Retry** → ลองรันใหม่เมื่อเจอข้อผิดพลาด
2. **Catch** → ส่งต่อไปยังเส้นทางจัดการข้อผิดพลาด

สิ่งเหล่านี้ควรนิยามใน **State Machine** ไม่ใช่ใน Application Code
ข้อดีคือจะได้ **Execution History** ที่ชัดเจนว่า retry / catch เกิดขึ้นเมื่อใด

## Error Codes ที่ Step Functions มีมาให้

* **States.All** → ตรงกับทุกข้อผิดพลาด
* **States.Timeout** → Task ใช้เวลานานเกิน timeout ที่ตั้งไว้
* **States.TaskFailed** → Task ทำงานล้มเหลว เช่น Lambda ขว้าง exception
* **States.Permissions** → สิทธิ์ไม่เพียงพอที่จะรันโค้ด

## กลไก Retry สำหรับ Tasks หรือ Parallel States

คุณสามารถกำหนด **Retry Rules** ได้ว่า:

* จะลองใหม่กี่ครั้ง
* รอเวลานานแค่ไหนก่อน retry
* จะเพิ่มเวลา delay แบบ exponential backoff หรือไม่

เช่น กรณี Lambda function มี 3 กฎ Retry:

* **ErrorEquals**: จับ error แบบเฉพาะ เช่น `CustomError`, `TaskFailed`, หรือ `States.All`
* **IntervalSeconds**: เวลารอก่อน retry (เช่น 1 วินาที, 30 วินาที, 5 วินาที)
* **BackoffRate**: คูณ delay ในแต่ละครั้ง เช่น 2 → ทำให้เป็น exponential backoff
* **MaxAttempts**: จำนวนครั้งสูงสุดที่จะ retry (เช่น 2, 2, 5)

👉 ถ้า retry ครบแล้วแต่ยังไม่สำเร็จ → จะเข้าสู่ **Catch Block**

## ข้อดีของ Retry Logic ภายนอก

* หลีกเลี่ยงการให้ Lambda ทำงานนานจน timeout
* สามารถเปลี่ยน logic การจัดการ error ได้โดยไม่ต้อง deploy Lambda ใหม่
* ทำให้ Lambda ทำงานเสร็จเร็วขึ้นและ Step Functions จัดการต่อเอง

## กลไก Catch

Catch ใช้เพื่อกำหนดเส้นทางเมื่อ retry ไม่สำเร็จ หรือเมื่อเจอ error เฉพาะ
ลำดับการตรวจสอบจะทำจากบนลงล่าง

ตัวอย่างการตั้งค่า:

* **ErrorEquals**: กำหนด error ที่ต้องการจับ เช่น `CustomError`
* **Next**: จะให้ไป State ถัดไปตัวไหน (เช่น `Fallback State`)
* **ResultPath**: ควบคุมว่าจะส่งข้อมูลอะไรไปยัง state ถัดไป

## ตัวอย่าง Catch

ถ้าเกิด `CustomError` → state machine จะเปลี่ยนไปที่ `CustomErrorFallback`
ซึ่งอาจเป็น Pass State ที่จบ workflow เลย หรือเป็น state ที่ทำงาน error handling เช่น logging, ส่งแจ้งเตือน ฯลฯ

## การเข้าใจ ResultPath

`ResultPath` ควบคุมว่า output ของ state จะรวมกับ input อย่างไร

เช่น input:

```json
{ "foo": "bar" }
```

ถ้าตั้ง `ResultPath` เป็น `.error` → output จะเป็น:

```json
{
  "foo": "bar",
  "error": {
    "Error": "CustomError",
    "Cause": "Something went wrong"
  }
}
```

สิ่งนี้ช่วยให้ state ถัดไปสามารถเอาข้อมูล error ไปใช้ได้ เช่น ส่ง notification หรือ debug

## สรุป

* Step Functions มี **Retry** และ **Catch** เพื่อจัดการ error ได้ยืดหยุ่น
* ควรทำ error handling ภายนอก (ที่ Step Functions) ไม่ใช่ในโค้ดของ Task
* **Retry** → กำหนดจำนวนครั้ง, interval, backoff, max attempts
* **Catch** → กำหนด fallback state, เส้นทางสำรอง และส่ง error ไปต่อด้วย `ResultPath`
* วิธีนี้ช่วยให้โค้ดเรียบง่ายขึ้น ควบคุม workflow ได้ดีขึ้น และเห็นประวัติการทำงานชัดเจน
