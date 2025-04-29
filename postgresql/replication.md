# การทำ Replication ใน PostgreSQL

## บทนำ

การทำ **Replication** คือกระบวนการในการทำสำเนาข้อมูลจากฐานข้อมูลต้นฉบับ (Primary) ไปยังฐานข้อมูลสำรอง (Replica) เพื่อให้สามารถทำการสำรองข้อมูลและเพิ่มความพร้อมใช้งานของระบบฐานข้อมูลได้. ใน PostgreSQL, การทำ Replication ช่วยให้ระบบสามารถทนทานต่อความล้มเหลวและเพิ่มประสิทธิภาพในการอ่านข้อมูลจากหลายๆ เครื่อง.

ใน PostgreSQL, มีการทำ Replication หลักๆ อยู่ 2 แบบ คือ:

- **Streaming Replication**: การทำสำเนาข้อมูลในลักษณะของการส่งข้อมูลแบบ real-time ระหว่าง Primary และ Replica.
- **Logical Replication**: การทำสำเนาข้อมูลโดยใช้การถอดรหัสและการจัดการข้อมูลที่สามารถเลือกได้ตามต้องการ.

## 1. **Streaming Replication**

Streaming Replication เป็นการทำ Replication ในแบบที่ข้อมูลจากฐานข้อมูล Primary จะถูกส่งไปยังฐานข้อมูล Replica โดยตรงในรูปแบบของการถ่ายทอดข้อมูล (streaming) แบบ real-time.

### 1.1 **การตั้งค่า Primary Server**

1. เปิดการใช้งาน `wal_level` และตั้งค่าการ Replication:

```plaintext
wal_level = replica
```

2. ตั้งค่า `max_wal_senders` เพื่อให้ Primary สามารถส่งข้อมูลไปยัง Replica ได้:

```plaintext
max_wal_senders = 3
```

3. เปิดการใช้งานการอนุญาตให้เชื่อมต่อจาก Replica ด้วยการเพิ่มคำสั่งนี้ในไฟล์ `pg_hba.conf`:

```plaintext
host    replication     all             192.168.1.100/32            md5
```

4. รีสตาร์ท PostgreSQL:

```bash
sudo systemctl restart postgresql
```

### 1.2 **การตั้งค่า Replica Server**

1. สร้างการสำรองข้อมูลจาก Primary ไปยัง Replica:

```bash
pg_basebackup -h <primary_ip> -D /var/lib/postgresql/12/main -U replication -P --wal-method=stream
```

2. ตั้งค่าการเชื่อมต่อจาก Replica ไปยัง Primary โดยการเพิ่มคำสั่งนี้ในไฟล์ `recovery.conf`:

```plaintext
standby_mode = 'on'
primary_conninfo = 'host=<primary_ip> port=5432 user=replication password=yourpassword'
trigger_file = '/tmp/postgresql.trigger.5432'
```

3. รีสตาร์ท PostgreSQL บน Replica:

```bash
sudo systemctl restart postgresql
```

## 2. **Logical Replication**

Logical Replication ให้ความยืดหยุ่นมากขึ้นโดยสามารถเลือกได้ว่าจะแชร์ข้อมูลจากตารางใดบ้างและยังสามารถเลือกได้ว่าต้องการใช้คำสั่ง SQL แบบไหนในการ Replicate ข้อมูล.

### 2.1 **การตั้งค่า Primary Server สำหรับ Logical Replication**

1. เปิดใช้งาน `wal_level` เป็น `logical`:

```plaintext
wal_level = logical
```

2. ตั้งค่า `max_replication_slots` และ `max_wal_senders`:

```plaintext
max_replication_slots = 4
max_wal_senders = 4
```

3. รีสตาร์ท PostgreSQL:

```bash
sudo systemctl restart postgresql
```

### 2.2 **การสร้าง Publication บน Primary Server**

ในขั้นตอนนี้, คุณจะสร้าง **Publication** ที่จะใช้ในการ Replicate ข้อมูลจาก Primary ไปยัง Replica.

```sql
CREATE PUBLICATION my_publication FOR TABLE employees, departments;
```

### 2.3 **การตั้งค่า Replica Server สำหรับ Logical Replication**

1. สร้าง **Subscription** บน Replica โดยเชื่อมต่อกับ Primary:

```sql
CREATE SUBSCRIPTION my_subscription
CONNECTION 'dbname=postgres host=<primary_ip> user=replication password=yourpassword'
PUBLICATION my_publication;
```

2. เมื่อทำการสร้าง Subscription, ข้อมูลจากตาราง `employees` และ `departments` จะถูก Replicate มายัง Replica โดยอัตโนมัติ.

## 3. **การจัดการกับ Replication Slots**

Replication Slots คือเครื่องมือที่ใช้ในการจัดการการถ่ายโอนข้อมูลระหว่าง Primary และ Replica. มันช่วยให้การทำ Replication มีความเสถียร โดยจะป้องกันไม่ให้ข้อมูลสูญหายหาก Replica ไม่สามารถรับข้อมูลได้ทันที.

### 3.1 **การสร้าง Replication Slot**

```sql
SELECT pg_create_physical_replication_slot('my_slot');
```

### 3.2 **การตรวจสอบ Replication Slot**

```sql
SELECT * FROM pg_replication_slots;
```

### 3.3 **การลบ Replication Slot**

```sql
SELECT pg_drop_replication_slot('my_slot');
```

## 4. **ข้อดีของการทำ Replication**

- **เพิ่มความพร้อมใช้งาน**: หาก Primary Server ล้มเหลว, Replica จะสามารถทำหน้าที่เป็น Server หลักแทนได้.
- **การเพิ่มประสิทธิภาพการอ่านข้อมูล**: โดยการกระจายการอ่านข้อมูลไปยังหลายๆ Replica.
- **การสำรองข้อมูล**: ทำให้การสำรองข้อมูลสามารถทำได้โดยไม่กระทบกับระบบการทำงานของ Primary Server.

## 5. **ข้อเสียของการทำ Replication**

- **ความซับซ้อนในการตั้งค่า**: การตั้งค่า Replication โดยเฉพาะการทำ Logical Replication อาจจะยุ่งยากและต้องการความระมัดระวัง.
- **การทำงานที่ไม่สมบูรณ์แบบ**: อาจเกิดปัญหากับข้อมูลที่ไม่ได้รับการ Replicate หากเกิดข้อผิดพลาดในการเชื่อมต่อ.
- **การใช้ทรัพยากร**: การทำ Replication ต้องการการใช้ทรัพยากรทั้งจากเครื่องต้นฉบับและเครื่องสำรอง.

## 6. **สรุป**

การทำ Replication ใน PostgreSQL เป็นวิธีการที่มีประโยชน์มากในการเพิ่มความเสถียรและประสิทธิภาพของระบบฐานข้อมูล. โดยมีทั้ง **Streaming Replication** ที่เหมาะกับการสำรองข้อมูลแบบ real-time และ **Logical Replication** ที่ให้ความยืดหยุ่นมากขึ้นในการเลือกข้อมูลที่จะทำ Replicate. ทั้งนี้, การตั้งค่าและดูแลรักษาระบบ Replication ต้องการการจัดการที่เหมาะสมเพื่อให้ระบบทำงานได้อย่างมีประสิทธิภาพ.