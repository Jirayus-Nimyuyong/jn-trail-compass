# การเรียนรู้ MongoDB Transactions

## บทนำ
MongoDB Transactions ช่วยให้สามารถจัดการชุดของการดำเนินการ (operations) หลายรายการได้ในลักษณะของ "atomicity" (การทำงานทั้งหมดสำเร็จหรือไม่สำเร็จเลย) ทำให้มั่นใจได้ว่าข้อมูลมีความถูกต้องและสอดคล้องกัน การใช้งาน Transactions มีความสำคัญในแอปพลิเคชันที่ต้องการความแม่นยำของข้อมูล เช่น ระบบการเงินหรือระบบการจอง

---

## คุณสมบัติของ MongoDB Transactions
- **Atomicity:** ทุกการดำเนินการใน Transaction จะสำเร็จพร้อมกันหรือยกเลิกทั้งหมด
- **Consistency:** ข้อมูลจะอยู่ในสถานะที่สอดคล้องกันตลอดเวลา
- **Isolation:** การดำเนินการใน Transaction หนึ่งจะไม่ส่งผลกระทบต่อ Transaction อื่น
- **Durability:** การเปลี่ยนแปลงข้อมูลใน Transaction จะถูกบันทึกอย่างถาวร

---

## การใช้งาน Transactions ใน MongoDB

### ข้อกำหนดเบื้องต้น
1. MongoDB Transactions รองรับเฉพาะใน **Replica Set** หรือ **Sharded Cluster**
2. MongoDB เวอร์ชัน 4.0 ขึ้นไป รองรับ Transactions สำหรับ Replica Set
3. MongoDB เวอร์ชัน 4.2 ขึ้นไป รองรับ Transactions สำหรับ Sharded Cluster

---

## ขั้นตอนการใช้งาน Transactions

### 1. สร้าง Session
การใช้งาน Transactions ต้องเริ่มต้นด้วยการสร้าง **session**
```javascript
// เริ่มต้น session
const session = db.getMongo().startSession();
```

---

### 2. เริ่มต้น Transaction
ใช้คำสั่ง `session.startTransaction()` เพื่อเริ่มต้น Transaction
```javascript
// เริ่มต้น transaction
session.startTransaction();
```

---

### 3. ดำเนินการคำสั่งใน Transaction
ดำเนินการคำสั่งที่ต้องการใน Transaction ผ่าน session
```javascript
try {
  // ดำเนินการคำสั่งใน transaction
  session.getDatabase("myDatabase").myCollection.insertOne(
    { name: "John Doe", balance: 1000 },
    { session }
  );

  session.getDatabase("myDatabase").myCollection.updateOne(
    { name: "John Doe" },
    { $inc: { balance: -500 } },
    { session }
  );

  // ยืนยัน Transaction
  session.commitTransaction();
  console.log("Transaction สำเร็จ");
} catch (error) {
  // ยกเลิก Transaction หากเกิดข้อผิดพลาด
  session.abortTransaction();
  console.error("Transaction ล้มเหลว:", error);
} finally {
  // ปิด session
  session.endSession();
}
```

---

## ตัวอย่างการใช้งานจริง

### ตัวอย่าง: ระบบโอนเงินระหว่างบัญชี
```javascript
const session = db.getMongo().startSession();

try {
  session.startTransaction();

  const accounts = session.getDatabase("bank").accounts;

  // หักเงินจากบัญชีผู้โอน
  accounts.updateOne(
    { accountNumber: "123456" },
    { $inc: { balance: -500 } },
    { session }
  );

  // เพิ่มเงินให้บัญชีผู้รับ
  accounts.updateOne(
    { accountNumber: "654321" },
    { $inc: { balance: 500 } },
    { session }
  );

  // ยืนยัน Transaction
  session.commitTransaction();
  console.log("Transaction สำเร็จ");
} catch (error) {
  // ยกเลิก Transaction หากเกิดข้อผิดพลาด
  session.abortTransaction();
  console.error("Transaction ล้มเหลว:", error);
} finally {
  session.endSession();
}
```

---

## ข้อควรระวังในการใช้งาน Transactions
1. **ประสิทธิภาพ:**
   - การใช้ Transactions อาจทำให้การดำเนินการช้าลง เนื่องจากต้องรอการยืนยันและการล็อกข้อมูล
2. **ขนาด Transaction:**
   - Transaction มีข้อจำกัดเรื่องขนาดสูงสุดของเอกสารที่สามารถเปลี่ยนแปลงได้ (16MB)
3. **Timeout:**
   - Transaction ที่ใช้เวลานานเกินไปอาจถูกยกเลิกโดยอัตโนมัติ (ค่าเริ่มต้นคือ 60 วินาที)

---

## สรุป
MongoDB Transactions ช่วยเพิ่มความน่าเชื่อถือของข้อมูลในแอปพลิเคชันที่ต้องการความแม่นยำสูง การเข้าใจและใช้งาน Transactions อย่างเหมาะสมจะช่วยให้การจัดการข้อมูลในระบบมีประสิทธิภาพและปลอดภัยมากขึ้น