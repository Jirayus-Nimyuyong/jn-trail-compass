# Database and Collections

## บทนำ
ใน MongoDB การจัดเก็บข้อมูลแบ่งออกเป็นสองระดับหลัก คือ **Database** และ **Collection** ซึ่งมีความยืดหยุ่นสูงและสามารถปรับเปลี่ยนให้เหมาะสมกับความต้องการของแอปพลิเคชันได้

## Database ใน MongoDB
- **Database** เป็นกลุ่มของ Collections ที่มีความสัมพันธ์กัน
- ในหนึ่ง MongoDB Server สามารถมีหลาย Databases ได้
- ฐานข้อมูลที่สำคัญ:
  - `admin`: ฐานข้อมูลสำหรับการดูแลระบบ
  - `local`: เก็บข้อมูลที่เกี่ยวข้องกับเครื่องเซิร์ฟเวอร์โดยตรง เช่น การ Replication
  - `config`: เก็บข้อมูลการกำหนดค่าของ Sharding

### คำสั่งที่เกี่ยวข้องกับ Database

#### สร้างหรือเปลี่ยนฐานข้อมูล
```javascript
use myDatabase
```
> หมายเหตุ: หากฐานข้อมูล `myDatabase` ยังไม่มีอยู่ จะถูกสร้างขึ้นเมื่อมีการเพิ่มข้อมูลลงไป

#### ดูฐานข้อมูลทั้งหมด
```javascript
show dbs
```

#### ลบฐานข้อมูล
```javascript
db.dropDatabase()
```

## Collection ใน MongoDB
- **Collection** เป็นกลุ่มของ Documents ที่มีลักษณะหรือโครงสร้างข้อมูลคล้ายกัน
- ไม่มีโครงสร้างที่ตายตัว (Schema-less)
- Collection จะถูกสร้างขึ้นเมื่อมีการเพิ่มข้อมูล Document แรก

### คำสั่งที่เกี่ยวข้องกับ Collection

#### สร้าง Collection
```javascript
db.createCollection("users")
```

#### ดู Collections ทั้งหมดใน Database ปัจจุบัน
```javascript
show collections
```

#### ลบ Collection
```javascript
db.users.drop()
```

## ความสัมพันธ์ระหว่าง Database และ Collections
- ฐานข้อมูลหนึ่งสามารถมีหลาย Collections
- Collections ภายในฐานข้อมูลเดียวกันสามารถมี Documents ที่มีโครงสร้างข้อมูลต่างกันได้ เช่น:
  - Collection `users`:
    ```json
    {
      "_id": "12345",
      "name": "Alice",
      "age": 30
    }
    ```
  - Collection `orders`:
    ```json
    {
      "_id": "67890",
      "product": "Laptop",
      "quantity": 1
    }
    ```

## ตัวอย่างการใช้งาน

### เพิ่ม Document ลงใน Collection
```javascript
db.users.insertOne({
  name: "John",
  age: 25,
  email: "john@example.com"
})
```

### ค้นหา Document ใน Collection
```javascript
db.users.find({ name: "John" })
```

### อัปเดต Document ใน Collection
```javascript
db.users.updateOne(
  { name: "John" },
  { $set: { age: 26 } }
)
```

### ลบ Document ใน Collection
```javascript
db.users.deleteOne({ name: "John" })
```

## การออกแบบ Database และ Collections
1. **จัดกลุ่มข้อมูลที่สัมพันธ์กัน**: เก็บข้อมูลที่มีความเกี่ยวข้องกันใน Collection เดียวกัน
2. **ใช้ชื่อที่สื่อความหมาย**: เช่น `users`, `products`, `orders`
3. **พิจารณาโครงสร้างข้อมูล**: การเก็บข้อมูลที่ซับซ้อนใน Document เดียวอาจช่วยลดจำนวน Query
4. **สร้าง Index ที่เหมาะสม**: เพื่อเพิ่มประสิทธิภาพในการค้นหา

## สรุป
Database และ Collections เป็นส่วนสำคัญในการจัดการข้อมูลใน MongoDB โดยมีความยืดหยุ่นสูงและสามารถปรับให้เหมาะสมกับการใช้งานในหลายสถานการณ์ การออกแบบและใช้งานอย่างถูกต้องจะช่วยให้การจัดการข้อมูลเป็นไปอย่างมีประสิทธิภาพและง่ายต่อการปรับขยายในอนาคต
