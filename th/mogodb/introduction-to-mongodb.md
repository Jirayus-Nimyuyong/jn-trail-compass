# Introduction to MongoDB

## บทนำ
MongoDB เป็นฐานข้อมูล NoSQL ชนิดหนึ่งที่มีความยืดหยุ่นและใช้งานง่าย ใช้รูปแบบการเก็บข้อมูลแบบเอกสาร (Document-oriented) ซึ่งช่วยให้สามารถจัดเก็บและดึงข้อมูลได้อย่างรวดเร็ว และเหมาะสำหรับการพัฒนาแอปพลิเคชันที่ต้องการความเร็วและการปรับขนาด (scalability)

## คุณสมบัติของ MongoDB
1. **NoSQL Database**: เก็บข้อมูลในรูปแบบ JSON-like (BSON)
2. **Schema-less**: ไม่มีโครงสร้างข้อมูลที่ตายตัว ช่วยเพิ่มความยืดหยุ่น
3. **Scalability**: รองรับการกระจายข้อมูล (Sharding) และการขยายตัวของฐานข้อมูล
4. **High Performance**: รองรับการเขียนและอ่านข้อมูลอย่างรวดเร็ว
5. **Rich Query Language**: รองรับการค้นหาและจัดการข้อมูลที่ซับซ้อน

## แนวคิดหลักใน MongoDB

### 1. Documents
- เป็นหน่วยข้อมูลพื้นฐานใน MongoDB
- มีโครงสร้างแบบ JSON-like ตัวอย่าง:
```json
{
  "_id": "12345",
  "name": "John Doe",
  "age": 30,
  "skills": ["JavaScript", "Python", "MongoDB"]
}
```

### 2. Collections
- กลุ่มของ Documents ที่มีลักษณะคล้ายกัน เช่น Collection `users` เก็บข้อมูลผู้ใช้

### 3. Database
- ที่เก็บ Collections หลายตัว

### 4. BSON
- Binary JSON: รูปแบบที่ MongoDB ใช้สำหรับการจัดเก็บข้อมูล มีขนาดเล็กและประสิทธิภาพสูง

### 5. Indexes
- ช่วยเพิ่มความเร็วในการค้นหา โดยสามารถสร้าง Index บนฟิลด์ที่ต้องการ

### 6. Replication
- ช่วยสร้างสำเนาข้อมูลในหลายเครื่องเพื่อเพิ่มความทนทาน (fault tolerance)

### 7. Sharding
- การกระจายข้อมูลไปยังหลายเครื่องเพื่อรองรับการขยายตัว

## การติดตั้ง MongoDB
### 1. บน Linux
```bash
sudo apt update
sudo apt install -y mongodb
```

### 2. บน macOS
```bash
brew tap mongodb/brew
brew install mongodb-community
```

### 3. บน Windows
1. ดาวน์โหลดจาก [MongoDB Download Center](https://www.mongodb.com/try/download/community)
2. ติดตั้งตามขั้นตอนใน Wizard

### 4. ตรวจสอบการติดตั้ง
```bash
mongod --version
```

## การใช้งานเบื้องต้น

### 1. เริ่มต้น MongoDB Server
```bash
mongod
```

### 2. เชื่อมต่อกับ MongoDB Shell
```bash
mongo
```

### 3. สร้าง Database
```javascript
use myDatabase
```

### 4. สร้าง Collection
```javascript
db.createCollection("users")
```

### 5. เพิ่ม Document
```javascript
db.users.insertOne({
  name: "Alice",
  age: 25,
  skills: ["Node.js", "React"]
})
```

### 6. ค้นหา Document
```javascript
db.users.find({ name: "Alice" })
```

### 7. อัปเดต Document
```javascript
db.users.updateOne({ name: "Alice" }, { $set: { age: 26 } })
```

### 8. ลบ Document
```javascript
db.users.deleteOne({ name: "Alice" })
```

## การออกแบบฐานข้อมูลที่ดีใน MongoDB
1. **ออกแบบ Schema ให้เหมาะสม**: เลือกเก็บข้อมูลในรูปแบบที่สัมพันธ์กับการใช้งานจริง
2. **สร้าง Index ที่เหมาะสม**: เพื่อเพิ่มประสิทธิภาพการค้นหา
3. **ใช้ Replication และ Sharding**: สำหรับระบบที่ต้องการความทนทานและรองรับการขยายตัว
4. **ตรวจสอบ Query Performance**: ใช้ `explain()` เพื่อตรวจสอบประสิทธิภาพการค้นหา

## สรุป
MongoDB เป็นฐานข้อมูล NoSQL ที่ทรงพลังและเหมาะสำหรับการพัฒนาแอปพลิเคชันยุคใหม่ การเรียนรู้พื้นฐานและการนำไปใช้งานอย่างถูกต้องช่วยเพิ่มประสิทธิภาพและความยืดหยุ่นในการจัดการข้อมูลได้อย่างมาก
