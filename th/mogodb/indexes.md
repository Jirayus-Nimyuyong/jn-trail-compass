# ดัชนีใน MongoDB (MongoDB Indexes)

## บทนำ
ดัชนี (Indexes) ใน MongoDB เป็นโครงสร้างข้อมูลที่ช่วยเพิ่มประสิทธิภาพในการสืบค้นข้อมูล ดัชนีช่วยลดเวลาที่ใช้ในการดึงข้อมูล โดยการชี้ไปยังข้อมูลที่ต้องการโดยตรง แทนที่จะต้องสแกนผ่านเอกสารทั้งหมดในคอลเลคชัน

---

## ประเภทของดัชนีใน MongoDB

### 1. **Single Field Index**
ดัชนีที่สร้างบนฟิลด์เดียว เหมาะสำหรับการสืบค้นข้อมูลที่มีฟิลด์เฉพาะ
```javascript
// การสร้างดัชนีบนฟิลด์ "name"
db.collection.createIndex({ name: 1 });
```

### 2. **Compound Index**
ดัชนีที่สร้างบนหลายฟิลด์ เหมาะสำหรับการสืบค้นข้อมูลที่ต้องใช้ฟิลด์หลายฟิลด์ร่วมกัน
```javascript
// การสร้างดัชนีบนฟิลด์ "firstName" และ "lastName"
db.collection.createIndex({ firstName: 1, lastName: 1 });
```

### 3. **Multikey Index**
ดัชนีที่สร้างบนฟิลด์ที่มีค่าเป็นอาเรย์ ช่วยเพิ่มประสิทธิภาพในการสืบค้นข้อมูลในอาเรย์
```javascript
// การสร้างดัชนีบนฟิลด์ "tags" ที่เป็นอาเรย์
db.collection.createIndex({ tags: 1 });
```

### 4. **Text Index**
ดัชนีที่ใช้สำหรับการค้นหาข้อความแบบเต็มรูปแบบ (Full-Text Search)
```javascript
// การสร้างดัชนีข้อความบนฟิลด์ "description"
db.collection.createIndex({ description: "text" });
```

### 5. **Geospatial Index**
ดัชนีที่ใช้สำหรับการค้นหาข้อมูลเชิงพื้นที่ (Geospatial Data)
- **2D Index** สำหรับข้อมูลที่ใช้พิกัดแบบสองมิติ
  ```javascript
  db.collection.createIndex({ location: "2d" });
  ```
- **2DSphere Index** สำหรับข้อมูลพิกัดแบบทรงกลม
  ```javascript
  db.collection.createIndex({ location: "2dsphere" });
  ```

### 6. **Hashed Index**
ดัชนีที่ใช้แฮชค่าของฟิลด์ เหมาะสำหรับการกระจายข้อมูลอย่างสม่ำเสมอ
```javascript
// การสร้างดัชนีแฮชบนฟิลด์ "userId"
db.collection.createIndex({ userId: "hashed" });
```

---

## การจัดการดัชนี

### 1. **แสดงดัชนีทั้งหมดในคอลเลคชัน**
```javascript
// แสดงรายการดัชนีทั้งหมด
db.collection.getIndexes();
```

### 2. **ลบดัชนี**
- ลบดัชนีเฉพาะ:
  ```javascript
  db.collection.dropIndex("index_name");
  ```
- ลบดัชนีทั้งหมดในคอลเลคชัน:
  ```javascript
  db.collection.dropIndexes();
  ```

### 3. **ตรวจสอบประสิทธิภาพของดัชนี**
MongoDB มีเครื่องมือ `explain()` ที่ช่วยวิเคราะห์ Query และดูว่าดัชนีถูกใช้งานหรือไม่
```javascript
// ตรวจสอบ Query
const result = db.collection.find({ name: "John" }).explain("executionStats");
printjson(result);
```

---

## การเพิ่มประสิทธิภาพด้วยดัชนี

### 1. **เลือกฟิลด์ที่เหมาะสม**
เลือกฟิลด์ที่ใช้ในการสืบค้นบ่อยที่สุดและมีข้อมูลที่หลากหลาย

### 2. **หลีกเลี่ยงการสร้างดัชนีมากเกินไป**
ดัชนีที่มากเกินไปอาจทำให้การเขียนข้อมูลช้าลง

### 3. **ใช้ Compound Index อย่างเหมาะสม**
ควรจัดลำดับฟิลด์ใน Compound Index ตามลำดับที่ใช้ใน Query

---

## ตัวอย่างการใช้งานดัชนี

### สร้างคอลเลคชันตัวอย่าง
```javascript
// เพิ่มเอกสารในคอลเลคชัน
const data = [
  { name: "Alice", age: 25, location: [40.7128, -74.0060] },
  { name: "Bob", age: 30, location: [34.0522, -118.2437] },
  { name: "Charlie", age: 35, location: [51.5074, -0.1278] }
];
data.forEach(doc => db.users.insertOne(doc));
```

### การสร้างดัชนี
```javascript
// สร้างดัชนี
// 1. ดัชนีบนฟิลด์ "name"
db.users.createIndex({ name: 1 });

// 2. ดัชนีเชิงพื้นที่บนฟิลด์ "location"
db.users.createIndex({ location: "2dsphere" });
```

### การสืบค้นข้อมูล
```javascript
// สืบค้นข้อมูลผู้ใช้ที่ชื่อ "Alice"
db.users.find({ name: "Alice" });

// สืบค้นผู้ใช้ที่อยู่ในพื้นที่เฉพาะ
const query = {
  location: {
    $near: {
      $geometry: {
        type: "Point",
        coordinates: [40.7128, -74.0060]
      },
      $maxDistance: 10000
    }
  }
};
db.users.find(query);
```

---

## บทสรุป
การใช้งานดัชนีใน MongoDB ช่วยให้การสืบค้นข้อมูลมีประสิทธิภาพมากขึ้น อย่างไรก็ตาม ควรใช้ดัชนีอย่างระมัดระวังเพื่อไม่ให้กระทบต่อประสิทธิภาพการเขียนข้อมูล การทำความเข้าใจประเภทและการจัดการดัชนีจะช่วยเพิ่มประสิทธิภาพของระบบได้อย่างมาก
