# MongoDB Architecture

## บทนำ
MongoDB มีสถาปัตยกรรมที่ถูกออกแบบมาให้รองรับการใช้งานที่ยืดหยุ่น มีประสิทธิภาพสูง และสามารถขยายตัวได้ง่าย (Scalable) โดยใช้รูปแบบการจัดเก็บข้อมูลแบบ NoSQL ที่เหมาะสมกับการจัดการข้อมูลที่ซับซ้อนและเปลี่ยนแปลงบ่อย

## องค์ประกอบหลักใน MongoDB Architecture

### 1. MongoDB Server (mongod)
- เป็นกระบวนการหลักที่จัดการกับฐานข้อมูล รับคำสั่งจากผู้ใช้ และประมวลผลข้อมูล
- ทำหน้าที่:
  - การจัดเก็บข้อมูล
  - การประมวลผล Query
  - การจัดการ Replication และ Sharding

### 2. MongoDB Client
- เครื่องมือหรือไลบรารีที่ใช้ในการเชื่อมต่อและส่งคำสั่งไปยัง MongoDB Server เช่น MongoDB Shell (`mongo`), Driver ต่าง ๆ (Node.js, Python, Java, เป็นต้น)

### 3. Databases
- ใน MongoDB หนึ่งฐานข้อมูลสามารถมีหลาย Collections ที่เก็บข้อมูลในรูปแบบ Document

### 4. Collections
- กลุ่มของ Documents ที่มีโครงสร้างและคุณสมบัติคล้ายกัน ตัวอย่างเช่น Collection `users` สำหรับเก็บข้อมูลผู้ใช้

### 5. Documents
- หน่วยพื้นฐานของข้อมูลใน MongoDB ใช้รูปแบบ JSON-like (BSON)
- ตัวอย่าง Document:
```json
{
  "_id": "12345",
  "name": "John Doe",
  "email": "john@example.com",
  "roles": ["admin", "editor"]
}
```

### 6. BSON (Binary JSON)
- รูปแบบที่ MongoDB ใช้จัดเก็บข้อมูล โดยมีโครงสร้างแบบ JSON แต่ปรับปรุงให้มีขนาดเล็กและมีประสิทธิภาพมากขึ้น

### 7. Indexes
- โครงสร้างที่ช่วยเพิ่มประสิทธิภาพการค้นหาและ Query เช่น Index บนฟิลด์ `name` หรือ `email`

### 8. Replica Sets
- กลไก Replication ที่ MongoDB ใช้ในการสร้างสำเนาข้อมูลหลายชุดเพื่อเพิ่มความทนทานและความพร้อมใช้งาน (High Availability)
- ประกอบด้วย:
  - **Primary Node**: รับคำสั่งเขียน (Write Operations)
  - **Secondary Nodes**: เก็บสำเนาของข้อมูลจาก Primary และใช้สำหรับการอ่าน (Read Operations)
  - **Arbiter**: โหนดที่ไม่มีข้อมูล แต่ช่วยในการตัดสินใจเลือก Primary เมื่อเกิดปัญหา

### 9. Sharding
- เทคนิคการกระจายข้อมูลใน MongoDB เพื่อรองรับการขยายตัวในแนวนอน (Horizontal Scaling)
- องค์ประกอบของ Sharding:
  - **Shard**: โหนดที่เก็บข้อมูลจริง
  - **Config Server**: เก็บข้อมูลเมตาเกี่ยวกับ Shards
  - **Query Router (mongos)**: รับคำสั่ง Query และกระจายไปยัง Shards ที่เหมาะสม

### 10. Config Server
- โหนดที่เก็บข้อมูลการกำหนดค่าของ Sharding เช่น Mapping ของข้อมูลในแต่ละ Shard

### 11. Query Router (mongos)
- กระบวนการที่รับคำสั่งจาก Client และส่งต่อคำสั่งไปยัง Shard หรือ Replica Set ที่เกี่ยวข้อง

## การทำงานของ MongoDB
1. **การเขียนข้อมูล**:
   - Client ส่งคำสั่งเขียนไปยัง Primary Node ของ Replica Set
   - Primary Node เขียนข้อมูลและบันทึกการเปลี่ยนแปลงใน OpLog (Operation Log)
   - Secondary Nodes ทำการคัดลอกข้อมูลจาก Primary ผ่าน OpLog

2. **การอ่านข้อมูล**:
   - Client สามารถอ่านข้อมูลได้ทั้งจาก Primary Node หรือ Secondary Node ขึ้นอยู่กับ Read Preference

3. **การกระจายข้อมูล (Sharding)**:
   - ข้อมูลจะถูกกระจายไปยัง Shards ตาม Shard Key ที่กำหนด เช่น ฟิลด์ `user_id`
   - Query Router (mongos) จะเป็นผู้จัดการเส้นทางของคำสั่ง

## ความสัมพันธ์ระหว่าง Replica Sets และ Sharding
- ในระบบ Sharding แต่ละ Shard สามารถเป็น Replica Set ได้เพื่อเพิ่มความทนทานของข้อมูล

## ประโยชน์ของ MongoDB Architecture
1. **Scalability**: รองรับการขยายตัวได้ทั้งแนวนอนและแนวตั้ง
2. **High Availability**: ด้วย Replica Sets ช่วยลด Downtime
3. **Fault Tolerance**: รองรับการเกิดปัญหาของโหนดบางตัวโดยไม่ทำให้ระบบล่ม
4. **Performance**: Query และการจัดการข้อมูลรวดเร็วด้วย Index และ Sharding

## ข้อควรระวัง
- การเลือก Shard Key ที่ไม่เหมาะสมอาจทำให้ข้อมูลไม่กระจายตัวเท่าที่ควร
- ควรตรวจสอบการกำหนดค่า Replica Set และ Sharding เพื่อป้องกันการสูญเสียข้อมูล

## สรุป
MongoDB มีสถาปัตยกรรมที่ยืดหยุ่นและปรับขนาดได้ง่าย โดยใช้ Replica Sets และ Sharding เพื่อเพิ่มความพร้อมใช้งานและรองรับปริมาณข้อมูลขนาดใหญ่ การทำความเข้าใจองค์ประกอบต่าง ๆ จะช่วยให้สามารถออกแบบระบบที่มีประสิทธิภาพได้
