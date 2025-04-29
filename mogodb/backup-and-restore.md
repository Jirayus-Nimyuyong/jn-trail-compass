# การเรียนรู้ MongoDB Backup and Restore

## บทนำ
การสำรองข้อมูล (Backup) และการกู้คืนข้อมูล (Restore) เป็นกระบวนการที่สำคัญสำหรับการปกป้องข้อมูลในฐานข้อมูล MongoDB การมีแผนสำรองและกู้คืนข้อมูลที่เหมาะสมช่วยลดความเสี่ยงของการสูญเสียข้อมูลจากเหตุการณ์ที่ไม่คาดคิด เช่น ข้อผิดพลาดของระบบหรือความเสียหายของข้อมูล

---

## วิธีการสำรองข้อมูล (Backup)

### 1. **การสำรองข้อมูลแบบใช้ `mongodump`**
`mongodump` เป็นเครื่องมือในตัวที่ MongoDB จัดเตรียมไว้สำหรับการสำรองข้อมูล โดยจะสร้างไฟล์สำรองในรูปแบบ BSON

#### คำสั่ง:
```bash
mongodump --uri="mongodb://<username>:<password>@<host>:<port>/<database>" --out=<output_directory>
```

#### ตัวอย่าง:
```bash
mongodump --uri="mongodb://admin:password@localhost:27017/mydatabase" --out=/backup/mydatabase_backup
```

### ตัวเลือกที่สำคัญของ `mongodump`:
- `--uri` : URL สำหรับเชื่อมต่อกับฐานข้อมูล
- `--out` : โฟลเดอร์ที่ใช้จัดเก็บข้อมูลสำรอง
- `--gzip` : บีบอัดไฟล์สำรองเพื่อประหยัดพื้นที่

---

### 2. **การสำรองข้อมูลแบบ Snapshot (สำหรับ Replica Set หรือ Sharded Cluster)**
การสำรองข้อมูลแบบ Snapshot ใช้สำหรับการสำรองข้อมูลที่มีขนาดใหญ่หรือมีการเปลี่ยนแปลงบ่อย

#### ขั้นตอน:
1. หยุดการเขียนข้อมูลลงฐานข้อมูลชั่วคราว
2. สร้าง Snapshot โดยใช้ระบบจัดเก็บข้อมูล เช่น LVM หรือบริการคลาวด์
3. เปิดใช้งานฐานข้อมูลอีกครั้ง

---

## วิธีการกู้คืนข้อมูล (Restore)

### 1. **การกู้คืนข้อมูลแบบใช้ `mongorestore`**
`mongorestore` เป็นเครื่องมือสำหรับกู้คืนข้อมูลที่สำรองไว้ด้วย `mongodump`

#### คำสั่ง:
```bash
mongorestore --uri="mongodb://<username>:<password>@<host>:<port>/<database>" <backup_directory>
```

#### ตัวอย่าง:
```bash
mongorestore --uri="mongodb://admin:password@localhost:27017/mydatabase" /backup/mydatabase_backup
```

### ตัวเลือกที่สำคัญของ `mongorestore`:
- `--drop` : ลบข้อมูลเก่าก่อนทำการกู้คืน
- `--gzip` : ใช้สำหรับไฟล์สำรองที่ถูกบีบอัด
- `--nsInclude` : ระบุคอลเลคชันเฉพาะที่ต้องการกู้คืน

---

## ตัวอย่างการใช้งาน

### การสำรองและกู้คืนฐานข้อมูลทั้งหมด
#### สำรองข้อมูล:
```bash
mongodump --uri="mongodb://localhost:27017" --out=/backup/full_backup
```

#### กู้คืนข้อมูล:
```bash
mongorestore --uri="mongodb://localhost:27017" /backup/full_backup
```

### การสำรองและกู้คืนเฉพาะคอลเลคชัน
#### สำรองคอลเลคชัน:
```bash
mongodump --uri="mongodb://localhost:27017" --db=mydatabase --collection=mycollection --out=/backup/collection_backup
```

#### กู้คืนคอลเลคชัน:
```bash
mongorestore --uri="mongodb://localhost:27017" --db=mydatabase --collection=mycollection /backup/collection_backup/mydatabase/mycollection.bson
```

---

## เคล็ดลับและข้อควรระวัง
1. **ตรวจสอบความสม่ำเสมอของข้อมูล:**
   - ใช้คำสั่ง `--oplog` กับ `mongodump` เพื่อสำรองข้อมูล oplog สำหรับความสม่ำเสมอใน Replica Set

2. **ทดสอบแผนการกู้คืน:**
   - ทดสอบการกู้คืนข้อมูลเป็นประจำเพื่อให้แน่ใจว่าไฟล์สำรองสามารถใช้งานได้

3. **จัดเก็บข้อมูลสำรองในที่ปลอดภัย:**
   - เก็บข้อมูลสำรองในที่ตั้งหลายแห่ง เช่น คลาวด์และดิสก์สำรอง

4. **ติดตั้งการสำรองข้อมูลอัตโนมัติ:**
   - ใช้เครื่องมือเช่น `cron` หรือบริการคลาวด์เพื่อทำการสำรองข้อมูลตามกำหนดเวลา

---

## สรุป
การสำรองและกู้คืนข้อมูลใน MongoDB เป็นกระบวนการที่สำคัญเพื่อป้องกันความเสียหายหรือการสูญเสียข้อมูล การใช้งานเครื่องมือ `mongodump` และ `mongorestore` ร่วมกับการจัดการไฟล์สำรองอย่างเหมาะสมจะช่วยให้ข้อมูลของคุณปลอดภัยและสามารถกู้คืนได้เมื่อจำเป็น
