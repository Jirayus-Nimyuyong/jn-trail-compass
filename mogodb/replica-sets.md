# การเรียนรู้ MongoDB Replica Sets

## บทนำ
MongoDB Replica Sets เป็นฟีเจอร์สำคัญที่ช่วยเพิ่มความทนทาน (High Availability) และความเสถียรของระบบฐานข้อมูล โดยการสร้างชุดสำเนาของข้อมูลในหลายเซิร์ฟเวอร์ Replica Sets ยังช่วยสนับสนุนการอ่านข้อมูล (Read) และการกู้คืนข้อมูล (Failover) ในกรณีที่เซิร์ฟเวอร์หลักล้มเหลว

---

## ส่วนประกอบของ Replica Sets

### 1. **Primary**
- เป็นสมาชิกหลักใน Replica Set ที่รับผิดชอบการเขียน (Write) และการอ่าน (Read)
- ข้อมูลที่เขียนลง Primary จะถูกทำสำเนาไปยัง Secondary

### 2. **Secondary**
- เป็นสมาชิกที่ทำสำเนาข้อมูลจาก Primary
- สามารถกำหนดให้รองรับการอ่านข้อมูลได้ แต่ไม่สามารถเขียนข้อมูลได้

### 3. **Arbiter**
- ไม่มีข้อมูล แต่ช่วยโหวตในการเลือก Primary ใหม่ในกรณีที่ Primary ล้มเหลว
- ใช้ในกรณีที่ต้องการเพิ่มจำนวนสมาชิกเพื่อให้เกิดเสียงโหวตข้างมาก

---

## การตั้งค่า Replica Set

### 1. **การเริ่มต้น Replica Set**
#### ขั้นตอน:
1. เปิดใช้งาน MongoDB บนเซิร์ฟเวอร์ที่ต้องการ โดยเพิ่ม `--replSet` ในคำสั่งเริ่มต้น
   ```bash
   mongod --replSet "rs0" --port 27017 --dbpath /data/db1
   mongod --replSet "rs0" --port 27018 --dbpath /data/db2
   mongod --replSet "rs0" --port 27019 --dbpath /data/db3
   ```

2. เชื่อมต่อกับ MongoDB ผ่าน `mongo` shell
   ```bash
   mongo --port 27017
   ```

3. เริ่มต้น Replica Set
   ```javascript
   rs.initiate({
     _id: "rs0",
     members: [
       { _id: 0, host: "localhost:27017" },
       { _id: 1, host: "localhost:27018" },
       { _id: 2, host: "localhost:27019" }
     ]
   });
   ```

### 2. **ตรวจสอบสถานะของ Replica Set**
ใช้คำสั่ง `rs.status()` เพื่อตรวจสอบสถานะของสมาชิกใน Replica Set

#### ตัวอย่าง:
```javascript
rs.status();
```

---

## คุณสมบัติของ Replica Sets

### 1. **Automatic Failover**
- หาก Primary ล้มเหลว สมาชิก Secondary จะถูกเลือกให้เป็น Primary ใหม่โดยอัตโนมัติ

### 2. **Data Redundancy**
- ข้อมูลใน Replica Set จะถูกทำสำเนาไปยังทุก Secondary เพื่อป้องกันการสูญหายของข้อมูล

### 3. **Read Scalability**
- สามารถกำหนดให้ Secondary รองรับการอ่านข้อมูล เพื่อกระจายโหลดจาก Primary

---

## การกำหนดค่าขั้นสูง

### 1. **Priority**
กำหนดลำดับความสำคัญของสมาชิก เพื่อควบคุมว่าต้องการให้เซิร์ฟเวอร์ใดเป็น Primary

#### ตัวอย่าง:
```javascript
rs.reconfig({
  _id: "rs0",
  members: [
    { _id: 0, host: "localhost:27017", priority: 2 },
    { _id: 1, host: "localhost:27018", priority: 1 },
    { _id: 2, host: "localhost:27019", priority: 0 }
  ]
});
```

### 2. **Hidden Members**
สมาชิกที่ถูกซ่อนไม่ให้รับการอ่านข้อมูล แต่ยังคงทำสำเนาข้อมูลจาก Primary

#### ตัวอย่าง:
```javascript
rs.reconfig({
  _id: "rs0",
  members: [
    { _id: 0, host: "localhost:27017" },
    { _id: 1, host: "localhost:27018" },
    { _id: 2, host: "localhost:27019", hidden: true }
  ]
});
```

---

## ข้อดีและข้อเสียของ Replica Sets

### ข้อดี:
1. เพิ่มความพร้อมใช้งานของระบบ (High Availability)
2. รองรับการขยายการอ่านข้อมูล (Read Scalability)
3. ป้องกันการสูญหายของข้อมูลด้วยการสำรองข้อมูลแบบเรียลไทม์

### ข้อเสีย:
1. ต้องการทรัพยากรมากขึ้น เนื่องจากต้องมีหลายเซิร์ฟเวอร์
2. มีความซับซ้อนในการตั้งค่าและจัดการ

---

## การใช้งาน Replica Sets ในสถานการณ์จริง
- ใช้ในระบบที่ต้องการความพร้อมใช้งานสูง เช่น แอปพลิเคชันออนไลน์, ระบบ E-Commerce
- รองรับการสำรองข้อมูลและการกู้คืนข้อมูลในกรณีฉุกเฉิน
- กระจายโหลดการอ่านข้อมูลในระบบที่มีการอ่านข้อมูลสูง

---

## สรุป
MongoDB Replica Sets เป็นฟีเจอร์ที่ช่วยให้ระบบฐานข้อมูลมีความเสถียรและรองรับการทำงานแบบ High Availability การตั้งค่าและใช้งาน Replica Sets อย่างเหมาะสมจะช่วยเพิ่มประสิทธิภาพและความมั่นคงของระบบฐานข้อมูลในองค์กรได้
