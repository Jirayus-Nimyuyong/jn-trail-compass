# การเรียนรู้ความสัมพันธ์ใน MongoDB (MongoDB Relationships)

## บทนำ
MongoDB เป็นฐานข้อมูลแบบ NoSQL ที่ใช้การจัดเก็บข้อมูลในรูปแบบของเอกสาร (Document) ซึ่งสามารถจัดการกับความสัมพันธ์ระหว่างข้อมูลได้ 2 รูปแบบหลัก คือ **Embedded Documents** และ **Referenced Documents** การเลือกใช้รูปแบบใดขึ้นอยู่กับโครงสร้างข้อมูลและการใช้งานที่เหมาะสม

---

## ประเภทของความสัมพันธ์ใน MongoDB

### 1. **Embedded Documents**
ความสัมพันธ์แบบ Embedded ใช้สำหรับรวมข้อมูลที่เกี่ยวข้องไว้ในเอกสารเดียว เหมาะสำหรับข้อมูลที่มีโครงสร้างแบบ "1 ต่อ 1" หรือ "1 ต่อหลาย" ที่ไม่ซับซ้อนมาก

#### ตัวอย่าง:
```javascript
// เอกสารแบบ Embedded
{
  _id: 1,
  name: "John Doe",
  address: {
    street: "123 Main St",
    city: "Bangkok",
    postalCode: "10110"
  }
}
```

#### ข้อดี:
- การดึงข้อมูลทำได้รวดเร็ว (ไม่ต้อง Join หรือ Lookup)
- โครงสร้างข้อมูลชัดเจน

#### ข้อเสีย:
- ไม่เหมาะสำหรับข้อมูลที่มีการเปลี่ยนแปลงบ่อย
- ขนาดเอกสารอาจใหญ่เกินไป

---

### 2. **Referenced Documents**
ความสัมพันธ์แบบ Referenced ใช้สำหรับเชื่อมโยงข้อมูลในเอกสารต่าง ๆ ผ่านการอ้างอิง (Reference) โดยใช้ `_id` เหมาะสำหรับข้อมูลที่ซับซ้อนหรือข้อมูลที่มีความสัมพันธ์แบบ "หลายต่อหลาย"

#### ตัวอย่าง:
```javascript
// เอกสารผู้ใช้ (Users)
{
  _id: 1,
  name: "John Doe"
}

// เอกสารคำสั่งซื้อ (Orders)
{
  _id: 101,
  userId: 1,
  items: [
    { product: "Laptop", quantity: 1 },
    { product: "Mouse", quantity: 2 }
  ]
}
```

#### ข้อดี:
- การจัดเก็บข้อมูลที่มีการเปลี่ยนแปลงหรือมีความสัมพันธ์ซับซ้อนได้ดี
- ข้อมูลมีความยืดหยุ่นและปรับเปลี่ยนง่าย

#### ข้อเสีย:
- ต้องใช้ `$lookup` หรือ Join ในการดึงข้อมูลที่สัมพันธ์กัน ซึ่งอาจส่งผลต่อประสิทธิภาพ

---

## การใช้งาน `$lookup` ใน MongoDB
`$lookup` ใช้สำหรับการดึงข้อมูลจากคอลเลคชันที่สัมพันธ์กัน (Referenced Documents)

#### ตัวอย่าง:
```javascript
// การใช้ $lookup เพื่อดึงข้อมูลคำสั่งซื้อพร้อมรายละเอียดผู้ใช้

db.orders.aggregate([
  {
    $lookup: {
      from: "users",          // ชื่อคอลเลคชันที่ต้องการเชื่อมโยง
      localField: "userId",   // ฟิลด์ในคอลเลคชันปัจจุบัน
      foreignField: "_id",    // ฟิลด์ในคอลเลคชันที่เชื่อมโยง
      as: "userDetails"       // ชื่อฟิลด์ผลลัพธ์
    }
  }
]);
```

#### ผลลัพธ์ตัวอย่าง:
```javascript
[
  {
    _id: 101,
    userId: 1,
    items: [
      { product: "Laptop", quantity: 1 },
      { product: "Mouse", quantity: 2 }
    ],
    userDetails: [
      {
        _id: 1,
        name: "John Doe"
      }
    ]
  }
]
```

---

## รูปแบบความสัมพันธ์ที่นิยมใช้

### 1. **One-to-One**
การจัดเก็บข้อมูลแบบหนึ่งต่อหนึ่งสามารถใช้ได้ทั้ง Embedded และ Referenced ขึ้นอยู่กับการใช้งาน

#### ตัวอย่าง:
**Embedded:**
```javascript
{
  _id: 1,
  name: "John Doe",
  profile: {
    age: 30,
    gender: "Male"
  }
}
```

**Referenced:**
```javascript
// Users
{
  _id: 1,
  name: "John Doe"
}

// Profiles
{
  userId: 1,
  age: 30,
  gender: "Male"
}
```

### 2. **One-to-Many**
เหมาะสำหรับข้อมูลที่มีความสัมพันธ์แบบหนึ่งต่อหลาย

#### ตัวอย่าง:
**Embedded:**
```javascript
{
  _id: 1,
  name: "John Doe",
  orders: [
    { product: "Laptop", quantity: 1 },
    { product: "Mouse", quantity: 2 }
  ]
}
```

**Referenced:**
```javascript
// Users
{
  _id: 1,
  name: "John Doe"
}

// Orders
{
  userId: 1,
  product: "Laptop",
  quantity: 1
}
```

### 3. **Many-to-Many**
เหมาะสำหรับข้อมูลที่แต่ละรายการมีความสัมพันธ์กับหลายรายการ เช่น ระบบผู้ใช้กับบทบาท (Roles)

#### ตัวอย่าง:
```javascript
// Users
{
  _id: 1,
  name: "John Doe",
  roleIds: [101, 102]
}

// Roles
{
  _id: 101,
  roleName: "Admin"
}
{
  _id: 102,
  roleName: "Editor"
}
```

---

## สรุป
การเลือกใช้ความสัมพันธ์ใน MongoDB ขึ้นอยู่กับโครงสร้างข้อมูลและลักษณะการใช้งานจริง ความเข้าใจเกี่ยวกับ Embedded Documents และ Referenced Documents รวมถึงการใช้งาน `$lookup` จะช่วยเพิ่มประสิทธิภาพในการจัดการข้อมูลในฐานข้อมูล MongoDB ได้อย่างมาก
