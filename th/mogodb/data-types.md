# ประเภทข้อมูลใน MongoDB (MongoDB Data Types)

## บทนำ
MongoDB รองรับประเภทข้อมูลที่หลากหลาย เพื่อให้สามารถจัดเก็บข้อมูลได้อย่างยืดหยุ่นและเหมาะสมกับการใช้งาน ประเภทข้อมูลเหล่านี้มีบทบาทสำคัญในการจัดการเอกสารในคอลเลคชัน (Collections)

---

## ประเภทข้อมูลพื้นฐานใน MongoDB

### 1. **String**
ใช้สำหรับจัดเก็บข้อความ เช่น ชื่อหรือคำอธิบาย
```javascript
{ "name": "John Doe" }
```

### 2. **Number**
ใช้สำหรับจัดเก็บตัวเลข MongoDB รองรับทั้งจำนวนเต็มและทศนิยม
- ตัวอย่างจำนวนเต็ม (Integer):
  ```javascript
  { "age": 30 }
  ```
- ตัวอย่างทศนิยม (Double):
  ```javascript
  { "price": 19.99 }
  ```

### 3. **Boolean**
ใช้สำหรับจัดเก็บค่าจริง (true) หรือเท็จ (false)
```javascript
{ "isActive": true }
```

### 4. **Array**
ใช้สำหรับจัดเก็บข้อมูลหลายค่าในฟิลด์เดียว
```javascript
{ "tags": ["red", "blue", "green"] }
```

### 5. **Object**
ใช้สำหรับจัดเก็บเอกสารย่อยภายในเอกสารหลัก (Embedded Document)
```javascript
{
  "address": {
    "street": "123 Main St",
    "city": "Bangkok"
  }
}
```

### 6. **Null**
ใช้สำหรับแสดงว่าฟิลด์ไม่มีค่า
```javascript
{ "middleName": null }
```

### 7. **Date**
ใช้สำหรับจัดเก็บวันที่และเวลา
```javascript
{ "createdAt": new Date() }
```

### 8. **ObjectId**
เป็นไอดีเอกลักษณ์ที่ MongoDB สร้างขึ้นสำหรับเอกสารแต่ละรายการ
```javascript
{ "_id": ObjectId("64b7b50c6f2e8b5f3a27c456") }
```

### 9. **Binary Data**
ใช้สำหรับจัดเก็บข้อมูลไบนารี เช่น รูปภาพหรือไฟล์
```javascript
{ "file": BinData(0, "<binary_data>") }
```

### 10. **Regular Expression**
ใช้สำหรับจัดเก็บนิพจน์ปกติ (Regular Expressions)
```javascript
{ "pattern": /abc/i }
```

---

## ประเภทข้อมูลขั้นสูงใน MongoDB

### 1. **Decimal128**
ใช้สำหรับจัดเก็บค่าทศนิยมที่มีความแม่นยำสูง
```javascript
{ "largeDecimal": NumberDecimal("12345.6789") }
```

### 2. **MinKey และ MaxKey**
ใช้สำหรับเปรียบเทียบค่าที่ต่ำที่สุด (MinKey) หรือสูงที่สุด (MaxKey) ใน MongoDB
- ตัวอย่าง MinKey:
  ```javascript
  { "minValue": MinKey() }
  ```
- ตัวอย่าง MaxKey:
  ```javascript
  { "maxValue": MaxKey() }
  ```

### 3. **Code**
ใช้สำหรับจัดเก็บโค้ด JavaScript
```javascript
{ "script": Code("function() { return true; }") }
```

### 4. **Timestamp**
ใช้สำหรับจัดเก็บเวลาที่มีความแม่นยำสูง เหมาะสำหรับการบันทึกเวลาที่เปลี่ยนแปลงในเอกสาร
```javascript
{ "modifiedAt": Timestamp() }
```

---

## ตัวอย่างการใช้งานประเภทข้อมูลในเอกสาร MongoDB
```javascript
{
  "_id": ObjectId("64b7b50c6f2e8b5f3a27c456"),
  "name": "John Doe",
  "age": 30,
  "isActive": true,
  "tags": ["developer", "mongoDB", "data"],
  "address": {
    "street": "123 Main St",
    "city": "Bangkok"
  },
  "createdAt": new Date(),
  "price": NumberDecimal("199.99")
}
```

---

## บทสรุป
การเข้าใจประเภทข้อมูลใน MongoDB เป็นสิ่งสำคัญสำหรับการออกแบบโครงสร้างฐานข้อมูลที่มีประสิทธิภาพ ประเภทข้อมูลที่หลากหลายนี้ช่วยให้คุณสามารถจัดเก็บและประมวลผลข้อมูลได้อย่างยืดหยุ่นและตรงกับความต้องการในงานจริง