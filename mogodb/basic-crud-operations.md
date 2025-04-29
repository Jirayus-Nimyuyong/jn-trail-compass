# การดำเนินการพื้นฐาน CRUD ใน MongoDB

## บทนำ
CRUD หมายถึง **Create** (สร้าง), **Read** (อ่าน), **Update** (อัปเดต) และ **Delete** (ลบ) ซึ่งเป็นการดำเนินการพื้นฐานที่ใช้กับฐานข้อมูล MongoDB ซึ่งเป็นฐานข้อมูล NoSQL ให้วิธีการดำเนินการที่ง่ายและทรงพลัง

---

## 1. **Create** (สร้าง)
ใช้เมธอด `insertOne` และ `insertMany` เพื่อเพิ่มเอกสารลงในคอลเลคชัน

### ตัวอย่าง:
```javascript
// เพิ่มเอกสารหนึ่งรายการ
const { MongoClient } = require('mongodb');
const uri = "your_connection_string";
const client = new MongoClient(uri);

async function createDocument() {
  try {
    await client.connect();
    const database = client.db('exampleDB');
    const collection = database.collection('exampleCollection');

    const document = { name: "John Doe", age: 30, city: "New York" };
    const result = await collection.insertOne(document);

    console.log(`เพิ่มเอกสารด้วย _id: ${result.insertedId}`);
  } finally {
    await client.close();
  }
}

createDocument().catch(console.error);
```

### เพิ่มหลายรายการ:
```javascript
const documents = [
  { name: "Jane Doe", age: 28, city: "Los Angeles" },
  { name: "Mark Smith", age: 35, city: "Chicago" }
];
const result = await collection.insertMany(documents);
console.log(`เพิ่ม ${result.insertedCount} เอกสารเรียบร้อยแล้ว`);
```

---

## 2. **Read** (อ่าน)
ใช้เมธอด `find` เพื่อดึงเอกสารจากคอลเลคชัน

### ตัวอย่าง:
```javascript
async function readDocuments() {
  try {
    await client.connect();
    const database = client.db('exampleDB');
    const collection = database.collection('exampleCollection');

    const query = { city: "New York" };
    const cursor = collection.find(query);

    const results = await cursor.toArray();
    console.log("เอกสารที่พบ:", results);
  } finally {
    await client.close();
  }
}

readDocuments().catch(console.error);
```

---

## 3. **Update** (อัปเดต)
ใช้เมธอด `updateOne` และ `updateMany` เพื่อปรับปรุงเอกสารที่มีอยู่

### ตัวอย่าง:
```javascript
// อัปเดตเอกสารหนึ่งรายการ
async function updateDocument() {
  try {
    await client.connect();
    const database = client.db('exampleDB');
    const collection = database.collection('exampleCollection');

    const filter = { name: "John Doe" };
    const update = { $set: { age: 31 } };

    const result = await collection.updateOne(filter, update);
    console.log(`${result.matchedCount} เอกสารที่ตรงกัน, ${result.modifiedCount} เอกสารที่ถูกอัปเดต.`);
  } finally {
    await client.close();
  }
}

updateDocument().catch(console.error);
```

---

## 4. **Delete** (ลบ)
ใช้เมธอด `deleteOne` และ `deleteMany` เพื่อลบเอกสารออกจากคอลเลคชัน

### ตัวอย่าง:
```javascript
// ลบเอกสารหนึ่งรายการ
async function deleteDocument() {
  try {
    await client.connect();
    const database = client.db('exampleDB');
    const collection = database.collection('exampleCollection');

    const query = { name: "John Doe" };
    const result = await collection.deleteOne(query);

    console.log(`${result.deletedCount} เอกสารถูกลบ.`);
  } finally {
    await client.close();
  }
}

deleteDocument().catch(console.error);
```

---

## บทสรุป
การดำเนินการ CRUD ใน MongoDB นั้นง่ายและทรงพลัง การเรียนรู้การดำเนินการเหล่านี้จะช่วยให้คุณจัดการฐานข้อมูลของคุณได้อย่างมีประสิทธิภาพและสามารถดำเนินการแก้ไขข้อมูลได้หลากหลายรูปแบบ
