# การเรียนรู้ MongoDB Advanced Aggregations

## บทนำ
MongoDB Advanced Aggregations เป็นฟีเจอร์ที่ช่วยให้สามารถประมวลผลข้อมูลแบบซับซ้อนในฐานข้อมูล MongoDB ได้ โดยใช้ Aggregation Framework ซึ่งเป็นเครื่องมือทรงพลังที่ประกอบด้วย Pipeline หลายขั้นตอน เพื่อทำงานกับข้อมูล เช่น การกรอง การคำนวณ การจัดกลุ่ม และการแปลงข้อมูล

---

## ส่วนประกอบสำคัญของ Aggregation Framework

### 1. **Aggregation Pipeline**
Pipeline ประกอบด้วยหลาย Stage ที่ทำงานเรียงลำดับ โดยแต่ละ Stage จะประมวลผลข้อมูลและส่งผลลัพธ์ไปยัง Stage ถัดไป

#### ตัวอย่าง:
```javascript
db.orders.aggregate([
  { $match: { status: "completed" } },
  { $group: { _id: "$customerId", totalAmount: { $sum: "$amount" } } },
  { $sort: { totalAmount: -1 } }
]);
```

---

## Advanced Aggregation Stages

### 1. **$lookup**
ใช้ในการ Join ข้อมูลจาก Collection อื่น

#### ตัวอย่าง:
```javascript
db.orders.aggregate([
  {
    $lookup: {
      from: "customers",
      localField: "customerId",
      foreignField: "_id",
      as: "customerDetails"
    }
  }
]);
```

### 2. **$facet**
ใช้ในการสร้าง Pipeline หลายชุดและส่งผลลัพธ์พร้อมกัน

#### ตัวอย่าง:
```javascript
db.products.aggregate([
  {
    $facet: {
      priceSummary: [
        { $group: { _id: null, avgPrice: { $avg: "$price" }, maxPrice: { $max: "$price" } } }
      ],
      productCount: [
        { $count: "totalProducts" }
      ]
    }
  }
]);
```

### 3. **$graphLookup**
ใช้ในการ Query ข้อมูลแบบ Recursion เช่น การค้นหาโครงสร้างข้อมูลแบบ Tree

#### ตัวอย่าง:
```javascript
db.employees.aggregate([
  {
    $graphLookup: {
      from: "employees",
      startWith: "$managerId",
      connectFromField: "managerId",
      connectToField: "_id",
      as: "subordinates"
    }
  }
]);
```

### 4. **$bucket** และ **$bucketAuto**
ใช้ในการจัดกลุ่มข้อมูลเป็นช่วงๆ (Buckets)

#### ตัวอย่างการใช้ $bucket:
```javascript
db.sales.aggregate([
  {
    $bucket: {
      groupBy: "$amount",
      boundaries: [0, 100, 200, 300],
      default: "Other",
      output: { totalSales: { $sum: 1 } }
    }
  }
]);
```

#### ตัวอย่างการใช้ $bucketAuto:
```javascript
db.sales.aggregate([
  {
    $bucketAuto: {
      groupBy: "$amount",
      buckets: 3,
      output: { totalSales: { $sum: 1 } }
    }
  }
]);
```

---

## Advanced Operators

### 1. **Array Operators**
- `$arrayElemAt`: ดึงข้อมูลจากตำแหน่งใน Array
- `$concatArrays`: รวม Array หลายอัน

#### ตัวอย่าง:
```javascript
db.products.aggregate([
  {
    $project: {
      firstTag: { $arrayElemAt: ["$tags", 0] },
      allTags: { $concatArrays: ["$tags", ["new"]] }
    }
  }
]);
```

### 2. **String Operators**
- `$toUpper`: แปลงข้อความเป็นตัวพิมพ์ใหญ่
- `$concat`: รวมข้อความหลายส่วนเข้าด้วยกัน

#### ตัวอย่าง:
```javascript
db.users.aggregate([
  {
    $project: {
      fullName: { $concat: ["$firstName", " ", "$lastName"] },
      upperCaseName: { $toUpper: "$firstName" }
    }
  }
]);
```

### 3. **Date Operators**
- `$year`, `$month`, `$dayOfMonth`: ดึงส่วนของวันที่
- `$dateToString`: แปลงวันที่เป็นข้อความ

#### ตัวอย่าง:
```javascript
db.orders.aggregate([
  {
    $project: {
      orderYear: { $year: "$orderDate" },
      formattedDate: { $dateToString: { format: "%Y-%m-%d", date: "$orderDate" } }
    }
  }
]);
```

---

## การปรับแต่งประสิทธิภาพใน Aggregation Framework

### 1. **ใช้ Index อย่างเหมาะสม**
- สร้าง Index บนฟิลด์ที่ใช้ใน `$match` เพื่อเพิ่มความเร็ว

### 2. **Pipeline Optimization**
- นำ `$match` และ `$limit` ไว้ต้น Pipeline เพื่อลดขนาดข้อมูล

### 3. **Avoid Unnecessary Stages**
- ใช้ `$project` เพื่อลดจำนวนฟิลด์ที่ส่งผ่านแต่ละ Stage

---

## สรุป
MongoDB Advanced Aggregations ช่วยให้การทำงานกับข้อมูลซับซ้อนใน MongoDB เป็นเรื่องง่ายและมีประสิทธิภาพ การเข้าใจการใช้ Stages และ Operators อย่างลึกซึ้งจะช่วยให้คุณสามารถจัดการและวิเคราะห์ข้อมูลได้อย่างมืออาชีพ
