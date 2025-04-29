# การเรียนรู้ MongoDB Validation Rules

## บทนำ
Validation Rules ใน MongoDB เป็นฟีเจอร์ที่ช่วยให้สามารถกำหนดเงื่อนไขหรือข้อจำกัดในการจัดเก็บข้อมูลในคอลเลคชันได้ การใช้ Validation Rules ช่วยให้มั่นใจได้ว่าข้อมูลที่จัดเก็บมีความถูกต้องและสอดคล้องกับโครงสร้างที่กำหนดไว้ 

---

## หลักการทำงานของ Validation Rules
- Validation Rules จะถูกกำหนดในระดับคอลเลคชัน (Collection Level)
- ใช้การนิยามเงื่อนไขผ่าน **JSON Schema** ซึ่งเป็นมาตรฐานสำหรับการกำหนดโครงสร้างข้อมูล
- เมื่อเพิ่มหรือแก้ไขเอกสารในคอลเลคชัน MongoDB จะตรวจสอบข้อมูลตามกฎที่กำหนดไว้

---

## การสร้าง Validation Rules

### 1. **การสร้างคอลเลคชันพร้อม Validation Rules**
ใช้คำสั่ง `db.createCollection()` เพื่อสร้างคอลเลคชันพร้อมกฎการตรวจสอบ

#### ตัวอย่าง:
```javascript
// สร้างคอลเลคชัน "products" พร้อม Validation Rules
 db.createCollection("products", {
   validator: {
     $jsonSchema: {
       bsonType: "object",
       required: ["name", "price", "category"],
       properties: {
         name: {
           bsonType: "string",
           description: "ต้องเป็นข้อความและห้ามเว้นว่าง"
         },
         price: {
           bsonType: "double",
           minimum: 0,
           description: "ต้องเป็นตัวเลขและมากกว่าหรือเท่ากับ 0"
         },
         category: {
           bsonType: "string",
           description: "ต้องเป็นข้อความ"
         }
       }
     }
   }
 });
```

### 2. **การเพิ่ม Validation Rules ให้กับคอลเลคชันที่มีอยู่แล้ว**
ใช้คำสั่ง `collMod` เพื่อเพิ่มหรือแก้ไข Validation Rules

#### ตัวอย่าง:
```javascript
// เพิ่ม Validation Rules ให้คอลเลคชัน "orders"
db.runCommand({
  collMod: "orders",
  validator: {
    $jsonSchema: {
      bsonType: "object",
      required: ["orderId", "customerName", "items"],
      properties: {
        orderId: {
          bsonType: "string",
          description: "ต้องเป็นข้อความและไม่เว้นว่าง"
        },
        customerName: {
          bsonType: "string",
          description: "ต้องเป็นข้อความ"
        },
        items: {
          bsonType: "array",
          items: {
            bsonType: "object",
            required: ["productId", "quantity"],
            properties: {
              productId: {
                bsonType: "string",
                description: "ต้องเป็นข้อความ"
              },
              quantity: {
                bsonType: "int",
                minimum: 1,
                description: "ต้องเป็นจำนวนเต็มและมากกว่าหรือเท่ากับ 1"
              }
            }
          }
        }
      }
    }
  }
});
```

---

## ระดับความเข้มงวดของ Validation Rules
- **`strict`** (ค่าเริ่มต้น): เอกสารทั้งหมดในคอลเลคชันต้องเป็นไปตาม Validation Rules
- **`moderate`**: เอกสารใหม่ต้องเป็นไปตาม Validation Rules แต่เอกสารเก่าจะไม่ถูกบังคับให้ปรับตาม

#### ตัวอย่างการกำหนดระดับความเข้มงวด:
```javascript
// กำหนดระดับความเข้มงวดเป็น "moderate"
db.runCommand({
  collMod: "products",
  validationLevel: "moderate"
});
```

---

## การลบ Validation Rules
หากต้องการลบ Validation Rules ออกจากคอลเลคชัน สามารถตั้งค่า `validator` ให้เป็นว่างได้

#### ตัวอย่าง:
```javascript
// ลบ Validation Rules ออกจากคอลเลคชัน "products"
db.runCommand({
  collMod: "products",
  validator: {}
});
```

---

## ตัวอย่างการใช้งานจริง

### การเพิ่มข้อมูลที่ไม่ผ่าน Validation Rules
#### ตัวอย่าง:
```javascript
// เพิ่มเอกสารที่ไม่ตรงกับ Validation Rules
db.products.insertOne({
  name: "Laptop",
  price: -100,
  category: "Electronics"
});

// ผลลัพธ์: MongoDB จะปฏิเสธการเพิ่มเอกสารและแสดงข้อผิดพลาด
```

---

## เคล็ดลับในการใช้ Validation Rules
1. **ออกแบบ Schema ให้เหมาะสมกับการใช้งาน:**
   - คำนึงถึงโครงสร้างข้อมูลและความยืดหยุ่นที่ต้องการ
2. **ทดสอบ Validation Rules ก่อนใช้งานจริง:**
   - ใช้เครื่องมือเช่น MongoDB Compass หรือสคริปต์ทดสอบ
3. **กำหนดระดับความเข้มงวดอย่างเหมาะสม:**
   - ใช้ "moderate" หากต้องการเพิ่ม Validation Rules โดยไม่กระทบกับข้อมูลเก่า

---

## สรุป
การใช้ Validation Rules ใน MongoDB ช่วยเพิ่มความถูกต้องของข้อมูลและลดข้อผิดพลาดในการจัดเก็บข้อมูล การออกแบบ Validation Rules ที่ดีควรคำนึงถึงโครงสร้างข้อมูลและความยืดหยุ่นของระบบ การทำความเข้าใจและใช้งานฟีเจอร์นี้อย่างถูกต้องจะช่วยให้ระบบฐานข้อมูลของคุณมีความน่าเชื่อถือและมีประสิทธิภาพมากขึ้น
