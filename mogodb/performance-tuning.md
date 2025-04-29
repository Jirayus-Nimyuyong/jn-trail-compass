# การเรียนรู้ Performance Tuning

## บทนำ
การปรับแต่งประสิทธิภาพ (Performance Tuning) ใน MongoDB เป็นกระบวนการที่ช่วยเพิ่มประสิทธิภาพของฐานข้อมูลให้สามารถทำงานได้อย่างรวดเร็วและรองรับการทำงานในปริมาณมากขึ้น โดยจะเกี่ยวข้องกับการปรับแต่งตั้งแต่ระดับโครงสร้างข้อมูล การตั้งค่าระบบ ไปจนถึงการปรับแต่งฮาร์ดแวร์

---

## การปรับแต่งประสิทธิภาพใน MongoDB

### 1. **การออกแบบ Schema ที่เหมาะสม**

#### คำแนะนำ:
- **Denormalization:** ใช้การออกแบบแบบฝังข้อมูล (Embedded Documents) เมื่อข้อมูลมีการใช้งานร่วมกันบ่อย
- **Indexing:** สร้าง Index เพื่อเพิ่มความเร็วในการ Query
- **Shard Key:** เลือก Shard Key ที่กระจายข้อมูลอย่างเหมาะสมในระบบ Sharded Cluster

#### ตัวอย่างการออกแบบ Schema แบบ Embedded:
```javascript
{
  "userId": "12345",
  "name": "John Doe",
  "orders": [
    { "orderId": "1", "amount": 500 },
    { "orderId": "2", "amount": 300 }
  ]
}
```

### 2. **การใช้ Index อย่างมีประสิทธิภาพ**

#### คำแนะนำ:
- ใช้ **Compound Index** สำหรับ Query ที่มีหลายเงื่อนไข
- ใช้ **TTL Index** สำหรับข้อมูลที่ต้องการหมดอายุ เช่น Logs หรือ Session
- ตรวจสอบ Index ที่ไม่ได้ใช้งานและลบออกเพื่อลด Overhead

#### ตัวอย่างการสร้าง Compound Index:
```javascript
// สร้าง Index บนฟิลด์ "userId" และ "orderDate"
db.orders.createIndex({ "userId": 1, "orderDate": -1 });
```

### 3. **การจัดการ Query**

#### คำแนะนำ:
- ใช้คำสั่ง `explain()` เพื่อตรวจสอบแผนการทำงานของ Query
- หลีกเลี่ยงการ Query ด้วยฟิลด์ที่ไม่มี Index
- ใช้ Projection เพื่อลดข้อมูลที่ส่งกลับ

#### ตัวอย่างการใช้ `explain()`:
```javascript
db.orders.find({ "userId": "12345" }).explain("executionStats");
```

### 4. **การปรับแต่ง Configurations**

#### คำแนะนำ:
- ปรับขนาด **WiredTiger Cache** เพื่อให้เหมาะสมกับปริมาณข้อมูล
- ใช้ **Connection Pooling** เพื่อจัดการการเชื่อมต่อจากไคลเอนต์
- กำหนด **Journaling** ให้เหมาะสมกับการใช้งานที่ต้องการความเร็วหรือความปลอดภัยของข้อมูล

#### ตัวอย่างการปรับค่า Cache:
```yaml
# เพิ่ม Cache Size สำหรับ WiredTiger
storage:
  wiredTiger:
    engineConfig:
      cacheSizeGB: 2
```

### 5. **การใช้งาน Aggregation Framework**

#### คำแนะนำ:
- ใช้ **Pipeline Optimization** เพื่อรวมการประมวลผล
- หลีกเลี่ยงการใช้ `$lookup` หรือ `$unwind` ในกรณีที่ไม่จำเป็น

#### ตัวอย่างการใช้ Aggregation Pipeline:
```javascript
db.orders.aggregate([
  { $match: { "status": "completed" } },
  { $group: { _id: "$userId", total: { $sum: "$amount" } } }
]);
```

### 6. **การตรวจสอบและติดตามผลการทำงาน**

#### คำแนะนำ:
- ใช้คำสั่ง `mongostat` และ `mongotop` เพื่อติดตามการทำงานของ MongoDB
- เปิดใช้งาน Profiler เพื่อตรวจสอบ Query ที่ช้าหรือมีการใช้งานทรัพยากรสูง

#### ตัวอย่างการเปิด Profiler:
```javascript
db.setProfilingLevel(2, { slowms: 100 });
```

---

## การปรับแต่งฮาร์ดแวร์

### คำแนะนำ:
1. **เพิ่ม RAM** เพื่อรองรับข้อมูลที่ใช้บ่อยใน Cache
2. ใช้ **SSD** แทน HDD เพื่อเพิ่มความเร็วในการอ่านและเขียนข้อมูล
3. ปรับจำนวน CPU Core ให้เหมาะสมกับการใช้งานแบบ Multi-Thread

---

## เครื่องมือสำหรับตรวจสอบและวิเคราะห์ประสิทธิภาพ

1. **MongoDB Compass**
   - ใช้ตรวจสอบ Index และ Query Performance

2. **Atlas Performance Advisor**
   - ให้คำแนะนำในการปรับแต่ง Query และ Index บน MongoDB Atlas

3. **Monitoring Tools (e.g., Prometheus, Grafana)**
   - ใช้ติดตามเมตริกของ MongoDB เช่น การใช้งาน CPU, Memory และ Disk I/O

---

## สรุป
การปรับแต่งประสิทธิภาพ MongoDB ต้องเริ่มต้นจากการออกแบบ Schema ที่เหมาะสม การใช้ Index และ Query อย่างมีประสิทธิภาพ รวมถึงการปรับแต่งฮาร์ดแวร์และการตั้งค่าระบบ การใช้เครื่องมือตรวจสอบอย่างสม่ำเสมอจะช่วยให้คุณสามารถรักษาประสิทธิภาพของฐานข้อมูลในระยะยาวได้
