# การใช้งาน MongoDB Shell

## บทนำ
MongoDB Shell (mongosh) เป็นอินเทอร์เฟซบรรทัดคำสั่งที่ใช้สำหรับการโต้ตอบกับ MongoDB ช่วยให้ผู้ใช้งานสามารถจัดการฐานข้อมูล สืบค้นข้อมูล และดำเนินการคำสั่งต่างๆ ได้อย่างสะดวก 

---

## การติดตั้ง MongoDB Shell
1. ดาวน์โหลด MongoDB Shell ได้จากเว็บไซต์ [MongoDB Download Center](https://www.mongodb.com/try/download/shell)
2. ติดตั้งไฟล์ที่ดาวน์โหลดมา ตามคำแนะนำสำหรับระบบปฏิบัติการของคุณ
3. ตรวจสอบการติดตั้งโดยรันคำสั่งในเทอร์มินัล:
    ```bash
    mongosh --version
    ```

---

## การเริ่มต้นใช้งาน MongoDB Shell

1. เปิดเทอร์มินัลหรือคอมมานด์ไลน์
2. เชื่อมต่อกับ MongoDB ด้วยคำสั่ง:
    ```bash
    mongosh "mongodb://localhost:27017"
    ```
   - เปลี่ยน `localhost:27017` เป็น URL ของเซิร์ฟเวอร์ MongoDB ของคุณ
3. หากเชื่อมต่อสำเร็จ คุณจะเข้าสู่ MongoDB Shell พร้อมข้อความต้อนรับ

---

## คำสั่งพื้นฐานใน MongoDB Shell

### 1. **ดูฐานข้อมูลที่มีอยู่**
   ```javascript
   show dbs
   ```
   จะแสดงรายการฐานข้อมูลทั้งหมดในเซิร์ฟเวอร์ MongoDB

### 2. **เลือกฐานข้อมูล**
   ```javascript
   use <database_name>
   ```
   ตัวอย่าง:
   ```javascript
   use myDatabase
   ```

### 3. **ดูคอลเลคชันในฐานข้อมูล**
   ```javascript
   show collections
   ```

### 4. **เพิ่มเอกสารลงในคอลเลคชัน**
   ```javascript
   db.collection_name.insertOne({ key: "value" })
   ```
   ตัวอย่าง:
   ```javascript
   db.users.insertOne({ name: "John Doe", age: 30 })
   ```

### 5. **สืบค้นข้อมูล**
   - ดึงข้อมูลทั้งหมด:
     ```javascript
     db.collection_name.find()
     ```
   - ดึงข้อมูลพร้อมเงื่อนไข:
     ```javascript
     db.collection_name.find({ key: "value" })
     ```

### 6. **อัปเดตข้อมูล**
   ```javascript
   db.collection_name.updateOne(
     { filter_key: "filter_value" },
     { $set: { key_to_update: "new_value" } }
   )
   ```
   ตัวอย่าง:
   ```javascript
   db.users.updateOne(
     { name: "John Doe" },
     { $set: { age: 31 } }
   )
   ```

### 7. **ลบข้อมูล**
   - ลบเอกสารหนึ่งรายการ:
     ```javascript
     db.collection_name.deleteOne({ key: "value" })
     ```
   - ลบเอกสารหลายรายการ:
     ```javascript
     db.collection_name.deleteMany({ key: "value" })
     ```

### 8. **ลบคอลเลคชัน**
   ```javascript
   db.collection_name.drop()
   ```

### 9. **ลบฐานข้อมูล**
   ```javascript
   db.dropDatabase()
   ```

---

## ฟีเจอร์เพิ่มเติมของ MongoDB Shell

### 1. **การใช้นิพจน์ JavaScript**
   MongoDB Shell รองรับ JavaScript ทำให้สามารถใช้โค้ด JavaScript ในการดำเนินการต่างๆ ได้ ตัวอย่างเช่น:
   ```javascript
   for (let i = 0; i < 5; i++) {
     db.users.insertOne({ name: `User${i}`, age: 20 + i });
   }
   ```

### 2. **การใช้ Pipeline**
   สามารถใช้ Aggregate Pipeline เพื่อการวิเคราะห์ข้อมูลที่ซับซ้อนได้ ตัวอย่าง:
   ```javascript
   db.sales.aggregate([
     { $match: { status: "completed" } },
     { $group: { _id: "$product", total: { $sum: "$amount" } } }
   ])
   ```

---

## บทสรุป
MongoDB Shell เป็นเครื่องมือสำคัญสำหรับการจัดการฐานข้อมูล MongoDB การเรียนรู้คำสั่งพื้นฐานและฟีเจอร์เพิ่มเติมจะช่วยเพิ่มความสะดวกและประสิทธิภาพในการทำงานกับ MongoDB ได้อย่างมาก
