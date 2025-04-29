# คำสั่ง SQL พื้นฐาน (Basic SQL Commands)

## บทนำ

**SQL (Structured Query Language)** คือภาษาที่ใช้ในการจัดการและสืบค้นข้อมูลจากฐานข้อมูลเชิงสัมพันธ์ เช่น PostgreSQL, MySQL, SQL Server และอื่น ๆ SQL ใช้สำหรับการสั่งการฐานข้อมูล เช่น การดึงข้อมูล, การเพิ่มข้อมูล, การแก้ไขข้อมูล และการลบข้อมูล ในบทความนี้เราจะเรียนรู้คำสั่ง SQL พื้นฐานที่ใช้ในการทำงานกับฐานข้อมูล

## 1. **SELECT** - การเลือกข้อมูล

คำสั่ง **SELECT** ใช้ในการดึงข้อมูลจากตารางในฐานข้อมูล และแสดงผลลัพธ์ที่ตรงตามเงื่อนไขที่กำหนด

### การใช้งาน:
```sql
SELECT column1, column2, ... FROM table_name;
```

### ตัวอย่าง:
```sql
SELECT name, age FROM students;
```

### การเลือกทุกคอลัมน์:
```sql
SELECT * FROM students;
```
การใช้ `*` หมายถึงการเลือกทุกคอลัมน์ในตาราง

## 2. **INSERT** - การเพิ่มข้อมูล

คำสั่ง **INSERT** ใช้ในการเพิ่มข้อมูลใหม่เข้าไปในตาราง

### การใช้งาน:
```sql
INSERT INTO table_name (column1, column2, ...)
VALUES (value1, value2, ...);
```

### ตัวอย่าง:
```sql
INSERT INTO students (name, age) VALUES ('John Doe', 20);
```

## 3. **UPDATE** - การปรับปรุงข้อมูล

คำสั่ง **UPDATE** ใช้ในการปรับปรุงข้อมูลที่มีอยู่ในตาราง

### การใช้งาน:
```sql
UPDATE table_name
SET column1 = value1, column2 = value2, ...
WHERE condition;
```

### ตัวอย่าง:
```sql
UPDATE students
SET age = 21
WHERE name = 'John Doe';
```

## 4. **DELETE** - การลบข้อมูล

คำสั่ง **DELETE** ใช้ในการลบข้อมูลจากตาราง

### การใช้งาน:
```sql
DELETE FROM table_name WHERE condition;
```

### ตัวอย่าง:
```sql
DELETE FROM students WHERE name = 'John Doe';
```

## 5. **CREATE TABLE** - การสร้างตาราง

คำสั่ง **CREATE TABLE** ใช้ในการสร้างตารางใหม่ในฐานข้อมูล

### การใช้งาน:
```sql
CREATE TABLE table_name (
    column1 datatype,
    column2 datatype,
    ...
);
```

### ตัวอย่าง:
```sql
CREATE TABLE students (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100),
    age INT
);
```

## 6. **ALTER TABLE** - การปรับปรุงโครงสร้างตาราง

คำสั่ง **ALTER TABLE** ใช้ในการปรับปรุงโครงสร้างของตาราง เช่น การเพิ่มคอลัมน์ใหม่ หรือการแก้ไขชื่อคอลัมน์

### การใช้งาน:
```sql
ALTER TABLE table_name ADD column_name datatype;
```

### ตัวอย่าง:
```sql
ALTER TABLE students ADD email VARCHAR(100);
```

## 7. **DROP TABLE** - การลบตาราง

คำสั่ง **DROP TABLE** ใช้ในการลบตารางจากฐานข้อมูล

### การใช้งาน:
```sql
DROP TABLE table_name;
```

### ตัวอย่าง:
```sql
DROP TABLE students;
```

## 8. **WHERE** - การระบุเงื่อนไขในการสืบค้นข้อมูล

คำสั่ง **WHERE** ใช้ในการระบุเงื่อนไขในการเลือก, อัปเดต, หรือลบข้อมูลจากตาราง

### ตัวอย่าง:
```sql
SELECT * FROM students WHERE age > 18;
```

### ตัวอย่างการใช้กับ **AND** และ **OR**:
```sql
SELECT * FROM students WHERE age > 18 AND name = 'John Doe';
```

## 9. **ORDER BY** - การเรียงลำดับข้อมูล

คำสั่ง **ORDER BY** ใช้ในการเรียงลำดับข้อมูลในผลลัพธ์ที่ได้จากคำสั่ง SELECT

### การใช้งาน:
```sql
SELECT * FROM table_name ORDER BY column_name ASC|DESC;
```

### ตัวอย่าง:
```sql
SELECT * FROM students ORDER BY age DESC;
```

## 10. **LIMIT** - การจำกัดจำนวนแถวที่ดึงข้อมูล

คำสั่ง **LIMIT** ใช้ในการจำกัดจำนวนแถวของข้อมูลที่ต้องการแสดง

### การใช้งาน:
```sql
SELECT * FROM table_name LIMIT number;
```

### ตัวอย่าง:
```sql
SELECT * FROM students LIMIT 5;
```

## 11. **JOIN** - การเชื่อมข้อมูลจากหลายตาราง

คำสั่ง **JOIN** ใช้ในการเชื่อมข้อมูลจากหลายตารางโดยการใช้คีย์ร่วม

### ตัวอย่าง:
```sql
SELECT students.name, courses.course_name
FROM students
JOIN courses ON students.id = courses.student_id;
```

## สรุป

คำสั่ง SQL ที่กล่าวถึงในบทความนี้เป็นคำสั่งพื้นฐานที่ใช้ในการจัดการข้อมูลในฐานข้อมูล SQL ไม่ว่าจะเป็นการดึงข้อมูล (SELECT), การเพิ่มข้อมูล (INSERT), การปรับปรุงข้อมูล (UPDATE), การลบข้อมูล (DELETE), การสร้างตาราง (CREATE TABLE) และอื่น ๆ คำสั่งเหล่านี้เป็นเครื่องมือสำคัญในการทำงานกับฐานข้อมูลและสามารถนำไปใช้งานในหลายสถานการณ์ได้