# การเรียนรู้ MongoDB Common Errors and Debugging

## บทนำ
การทำงานกับ MongoDB อาจพบข้อผิดพลาดต่างๆ ที่เกิดจากการตั้งค่า การเขียนคำสั่ง หรือการจัดการฐานข้อมูล การเรียนรู้วิธีแก้ไขและ Debugging เป็นสิ่งสำคัญที่จะช่วยให้สามารถจัดการกับปัญหาได้อย่างมีประสิทธิภาพ

---

## ข้อผิดพลาดที่พบบ่อย (Common Errors)

### 1. **Connection Errors**
#### อาการ:
- ไม่สามารถเชื่อมต่อกับ MongoDB ได้
- ข้อความแสดงข้อผิดพลาด: `Failed to connect to server` หรือ `Connection refused`

#### สาเหตุ:
- เซิร์ฟเวอร์ MongoDB ไม่ได้ทำงาน
- การตั้งค่า IP หรือพอร์ตไม่ถูกต้อง
- Firewall บล็อกการเชื่อมต่อ

#### วิธีแก้ไข:
- ตรวจสอบสถานะ MongoDB ด้วยคำสั่ง:
  ```bash
  systemctl status mongod
  ```
- ตรวจสอบการตั้งค่าพอร์ตในไฟล์ `mongod.conf`
- ตรวจสอบว่า IP ของไคลเอนต์ได้รับอนุญาตให้เข้าถึง

---

### 2. **Authentication Errors**
#### อาการ:
- ไม่สามารถล็อกอินหรือดำเนินการได้เนื่องจากสิทธิ์ไม่เพียงพอ
- ข้อความแสดงข้อผิดพลาด: `Authentication failed` หรือ `Unauthorized`

#### สาเหตุ:
- ใช้ชื่อผู้ใช้หรือรหัสผ่านผิด
- ผู้ใช้ไม่ได้รับสิทธิ์ที่เหมาะสม

#### วิธีแก้ไข:
- ตรวจสอบผู้ใช้ด้วยคำสั่ง:
  ```javascript
  db.getUsers();
  ```
- แก้ไขสิทธิ์ของผู้ใช้ด้วย:
  ```javascript
  db.grantRolesToUser("username", [{ role: "readWrite", db: "yourDatabase" }]);
  ```

---

### 3. **Query Errors**
#### อาการ:
- การ Query ข้อมูลไม่ได้ผลลัพธ์ตามที่ต้องการ
- ข้อความแสดงข้อผิดพลาด: `Field does not exist` หรือ `Type mismatch`

#### สาเหตุ:
- ใช้ฟิลด์ที่ไม่ถูกต้องใน Query
- การใช้ Operator ไม่เหมาะสม

#### วิธีแก้ไข:
- ตรวจสอบโครงสร้างข้อมูลด้วยคำสั่ง:
  ```javascript
  db.collection.findOne();
  ```
- ตรวจสอบ Operator ที่ใช้งานในเอกสาร [MongoDB Query Operators](https://www.mongodb.com/docs/manual/reference/operator/query/)

---

### 4. **Write Errors**
#### อาการ:
- การเพิ่มหรือแก้ไขข้อมูลล้มเหลว
- ข้อความแสดงข้อผิดพลาด: `Duplicate key error` หรือ `Write conflict`

#### สาเหตุ:
- มีการเพิ่มข้อมูลที่มีค่าซ้ำในฟิลด์ที่กำหนด Unique Index
- การแข่งขันในการเขียนข้อมูล (Write Conflict)

#### วิธีแก้ไข:
- ตรวจสอบ Unique Index ด้วยคำสั่ง:
  ```javascript
  db.collection.getIndexes();
  ```
- แก้ไขข้อมูลที่ซ้ำซ้อนก่อนเพิ่มข้อมูลใหม่

---

### 5. **Aggregation Errors**
#### อาการ:
- Pipeline ไม่ทำงานหรือผลลัพธ์ไม่ถูกต้อง
- ข้อความแสดงข้อผิดพลาด: `Unrecognized expression` หรือ `Invalid pipeline stage`

#### สาเหตุ:
- ใช้ Stage ที่ไม่รองรับหรือเขียนผิดพลาด
- การจัดลำดับของ Stages ไม่เหมาะสม

#### วิธีแก้ไข:
- ตรวจสอบว่าแต่ละ Stage ถูกต้องตาม [เอกสาร Aggregation Pipeline](https://www.mongodb.com/docs/manual/core/aggregation-pipeline/)
- ใช้ `$project` เพื่อตรวจสอบข้อมูลที่ส่งผ่านในแต่ละ Stage

---

## การ Debugging ใน MongoDB

### 1. **ตรวจสอบ Logs**
- Logs ของ MongoDB เป็นแหล่งข้อมูลสำคัญสำหรับ Debugging
- ตำแหน่งไฟล์ Logs:
  ```bash
  /var/log/mongodb/mongod.log
  ```

#### ตัวอย่างคำสั่งตรวจสอบ Logs:
```bash
tail -n 100 /var/log/mongodb/mongod.log
```

### 2. **ใช้คำสั่ง Diagnostic**
#### ตัวอย่าง:
- ตรวจสอบสถานะเซิร์ฟเวอร์:
  ```javascript
  db.serverStatus();
  ```
- ตรวจสอบการเชื่อมต่อ:
  ```javascript
  db.runCommand({ connectionStatus: 1 });
  ```

### 3. **Profiler**
- MongoDB Profiler ใช้ในการวิเคราะห์ Query ที่ช้า
- เปิดใช้งาน Profiler:
  ```javascript
  db.setProfilingLevel(2);
  ```
- ดูผลลัพธ์ Profiler:
  ```javascript
  db.system.profile.find().sort({ ts: -1 }).limit(10);
  ```

---

## แนวทางป้องกันปัญหา

### 1. **ตรวจสอบการตั้งค่า**
- ตั้งค่า `mongod.conf` ให้เหมาะสม เช่น การตั้งค่า Binding IP, Authentication และ Logging

### 2. **ใช้ Index อย่างเหมาะสม**
- สร้าง Index บนฟิลด์ที่ใช้บ่อยใน Query

### 3. **สำรองข้อมูล**
- ใช้คำสั่ง `mongodump` และ `mongorestore` สำหรับการสำรองและกู้คืนข้อมูล

---

## สรุป
การเข้าใจข้อผิดพลาดและวิธี Debugging ใน MongoDB จะช่วยให้สามารถจัดการและแก้ไขปัญหาได้อย่างมีประสิทธิภาพ รวมถึงป้องกันไม่ให้เกิดปัญหาในอนาคต การใช้เครื่องมือ เช่น Logs, Profiler และ Diagnostic Commands จะช่วยเพิ่มความมั่นใจในการทำงานกับฐานข้อมูล MongoDB
