# การเรียนรู้ MongoDB Sharding

## บทนำ
MongoDB Sharding เป็นเทคนิคการแบ่งข้อมูล (Data Partitioning) สำหรับกระจายข้อมูลในหลายเซิร์ฟเวอร์ เพื่อรองรับการจัดเก็บและประมวลผลข้อมูลขนาดใหญ่ รวมถึงเพิ่มประสิทธิภาพในการทำงานของระบบฐานข้อมูลในแง่ของความเร็วและความสามารถในการขยายระบบ (Scalability)

---

## คำศัพท์พื้นฐานเกี่ยวกับ Sharding

### 1. **Shard**
- เป็นส่วนหนึ่งของข้อมูลในฐานข้อมูลที่ถูกจัดเก็บในเซิร์ฟเวอร์หนึ่งๆ
- แต่ละ Shard เป็น MongoDB Instance ที่ทำงานเป็น Replica Set เพื่อความมั่นคงของข้อมูล

### 2. **Shard Key**
- คีย์ที่ใช้ในการกำหนดวิธีการกระจายข้อมูลไปยังแต่ละ Shard
- เลือก Shard Key อย่างระมัดระวัง เนื่องจากส่งผลต่อประสิทธิภาพของระบบ

### 3. **Config Server**
- เซิร์ฟเวอร์ที่จัดเก็บ Metadata เกี่ยวกับการกระจายข้อมูลของ Shard
- มีบทบาทสำคัญในการจัดการและตรวจสอบการกระจายข้อมูล

### 4. **Query Router (Mongos)**
- ตัวกลางที่รับคำสั่ง Query จากผู้ใช้และกระจายไปยัง Shard ที่เกี่ยวข้อง
- ทำหน้าที่รวบรวมผลลัพธ์จากหลาย Shard และส่งกลับไปยังผู้ใช้

---

## การตั้งค่า MongoDB Sharding

### 1. **การเริ่มต้น Config Server**
Config Server ควรทำงานในรูปแบบ Replica Set
```bash
mongod --configsvr --replSet "configReplSet" --port 27019 --dbpath /data/configdb
```

### 2. **การเริ่มต้น Shard Server**
แต่ละ Shard ควรตั้งค่าให้ทำงานในรูปแบบ Replica Set
```bash
mongod --shardsvr --replSet "shardReplSet1" --port 27020 --dbpath /data/shard1
mongod --shardsvr --replSet "shardReplSet2" --port 27021 --dbpath /data/shard2
```

### 3. **การเริ่มต้น Query Router (Mongos)**
Query Router จะเชื่อมต่อกับ Config Server และ Shard Server
```bash
mongos --configdb configReplSet/localhost:27019 --port 27017
```

### 4. **การเพิ่ม Shard ลงใน Cluster**
ใช้คำสั่ง `sh.addShard()` เพื่อเพิ่ม Shard ลงใน Cluster
```javascript
sh.addShard("shardReplSet1/localhost:27020");
sh.addShard("shardReplSet2/localhost:27021");
```

---

## การเลือก Shard Key

### คุณสมบัติของ Shard Key ที่ดี:
1. **กระจายข้อมูลอย่างสม่ำเสมอ**
   - ช่วยหลีกเลี่ยงการโหลดไม่สมดุล (Hotspot)
2. **รองรับการ Query ที่มีประสิทธิภาพ**
   - ช่วยลดการ Query ข้าม Shard

### ตัวอย่างการตั้งค่า Shard Key:
```javascript
sh.enableSharding("myDatabase"); // เปิดใช้งาน Sharding บนฐานข้อมูล
sh.shardCollection("myDatabase.myCollection", { userId: 1 }); // กำหนด Shard Key
```

---

## การจัดการ Sharding

### การตรวจสอบสถานะของ Cluster
ใช้คำสั่ง `sh.status()` เพื่อตรวจสอบสถานะของ Sharding Cluster
```javascript
sh.status();
```

### การลบ Shard ออกจาก Cluster
ใช้คำสั่ง `sh.removeShard()`
```javascript
sh.removeShard("shardReplSet2");
```

---

## ข้อดีและข้อเสียของ Sharding

### ข้อดี:
1. รองรับข้อมูลขนาดใหญ่ (Big Data)
2. เพิ่มประสิทธิภาพการทำงานของระบบ
3. รองรับการขยายระบบแบบแนวนอน (Horizontal Scalability)

### ข้อเสีย:
1. ความซับซ้อนในการตั้งค่าและจัดการ
2. การเลือก Shard Key ไม่เหมาะสมอาจทำให้เกิดปัญหาโหลดไม่สมดุล

---

## การใช้งาน Sharding ในสถานการณ์จริง
- ใช้ในระบบที่มีปริมาณข้อมูลขนาดใหญ่ เช่น ระบบ E-Commerce, Social Media, IoT
- เหมาะสำหรับแอปพลิเคชันที่ต้องการรองรับการขยายตัวในอนาคต

---

## สรุป
MongoDB Sharding เป็นฟีเจอร์ที่สำคัญสำหรับการจัดการข้อมูลขนาดใหญ่ โดยการตั้งค่า Sharding และการเลือก Shard Key อย่างเหมาะสมจะช่วยเพิ่มประสิทธิภาพและความสามารถในการขยายระบบได้อย่างมีประสิทธิภาพ
