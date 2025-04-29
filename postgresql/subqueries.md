# Subqueries ใน PostgreSQL

## บทนำ

**Subquery** หรือ **คำสั่งย่อย** คือคำสั่ง SQL ที่ถูกซ้อนอยู่ภายในคำสั่ง SQL อื่น ๆ ซึ่งจะช่วยให้สามารถดึงข้อมูลที่ต้องการจากหลายแหล่งข้อมูลหรือใช้ผลลัพธ์จากการคิวรีหนึ่งในการคิวรีอีกคำสั่งหนึ่งได้ การใช้ **Subquery** เป็นเครื่องมือที่ทรงพลังในการดำเนินการกับข้อมูลที่ซับซ้อน เช่น การค้นหาข้อมูลที่สัมพันธ์กันจากตารางต่าง ๆ หรือการกรองข้อมูลที่ไม่สามารถทำได้โดยตรงในคำสั่ง **WHERE** หรือ **SELECT**

## 1. **ประเภทของ Subqueries**

### 1.1 **Subquery ใน WHERE Clause**

**Subquery** ใน **WHERE** ใช้เพื่อกรองข้อมูลโดยการใช้ผลลัพธ์จากคำสั่งย่อยในเงื่อนไขของ **WHERE** ตัวอย่างเช่น การเลือกข้อมูลจากตารางหนึ่งโดยใช้ข้อมูลจากตารางอีกตารางหนึ่ง

### ตัวอย่าง:
```sql
SELECT employee_id, employee_name
FROM employees
WHERE department_id IN (SELECT department_id FROM departments WHERE department_name = 'Sales');
```
ในตัวอย่างนี้ คำสั่งย่อยจะดึง **department_id** ที่เกี่ยวข้องกับ **department_name** 'Sales' จากตาราง **departments** และใช้ผลลัพธ์นั้นในเงื่อนไข **IN** เพื่อกรองข้อมูลจากตาราง **employees**

### 1.2 **Subquery ใน SELECT Clause**

เราสามารถใช้ **Subquery** ใน **SELECT** เพื่อดึงข้อมูลจากตารางอื่นหรือคำนวณค่าเฉพาะในผลลัพธ์ของการเลือก

### ตัวอย่าง:
```sql
SELECT employee_name,
       (SELECT department_name FROM departments WHERE departments.department_id = employees.department_id) AS department_name
FROM employees;
```
ในตัวอย่างนี้ **Subquery** ใช้ในการดึงชื่อแผนกจากตาราง **departments** โดยเชื่อมโยงกับ **department_id** ของตาราง **employees**

### 1.3 **Subquery ใน FROM Clause**

**Subquery** ใน **FROM** ช่วยให้เราสามารถสร้าง **virtual table** เพื่อใช้ในการคิวรีข้อมูลเพิ่มเติมจากตารางนั้น โดยไม่ต้องสร้างตารางใหม่

### ตัวอย่าง:
```sql
SELECT department_id, AVG(salary) AS average_salary
FROM (SELECT department_id, salary FROM employees WHERE salary > 50000) AS high_salary
GROUP BY department_id;
```
ในตัวอย่างนี้ **Subquery** ใน **FROM** จะเลือกข้อมูลจากตาราง **employees** ที่มี **salary** มากกว่า 50000 แล้วทำการคำนวณค่าเฉลี่ยของ **salary** สำหรับแต่ละแผนก

### 1.4 **Correlated Subquery**

**Correlated Subquery** คือ **Subquery** ที่อ้างอิงถึงค่าจากคำสั่งหลัก (outer query) ซึ่งหมายความว่า **Subquery** จะทำการประมวลผลใหม่ทุกครั้งที่มันถูกใช้ในคำสั่งหลัก

### ตัวอย่าง:
```sql
SELECT employee_id, employee_name
FROM employees e1
WHERE salary > (SELECT AVG(salary) FROM employees e2 WHERE e1.department_id = e2.department_id);
```
ในตัวอย่างนี้ **Subquery** จะคำนวณค่าเฉลี่ยของ **salary** สำหรับแต่ละแผนกโดยอ้างอิงถึง **department_id** ของแถวหลักที่กำลังถูกประมวลผล

### 1.5 **Scalar Subquery**

**Scalar Subquery** คือ **Subquery** ที่คืนค่าเดียว (หนึ่งแถวหนึ่งคอลัมน์) ซึ่งสามารถใช้ในที่ที่ต้องการค่าเดี่ยว เช่น ใน **SELECT**, **WHERE**, หรือ **HAVING** clause

### ตัวอย่าง:
```sql
SELECT employee_name, salary
FROM employees
WHERE salary > (SELECT AVG(salary) FROM employees);
```
ในตัวอย่างนี้ **Subquery** จะคำนวณค่าเฉลี่ยของ **salary** จากตาราง **employees** แล้วเปรียบเทียบกับ **salary** ของแต่ละพนักงาน

## 2. **การใช้ Subquery กับ Aggregate Functions**

**Subquery** สามารถใช้ร่วมกับ **Aggregate Functions** เช่น **COUNT()**, **SUM()**, **AVG()**, **MIN()**, และ **MAX()** เพื่อคำนวณค่าที่ต้องการจากข้อมูลที่กรองโดยคำสั่งย่อย

### ตัวอย่าง:
```sql
SELECT department_id, COUNT(*) AS num_employees
FROM employees
WHERE department_id IN (SELECT department_id FROM departments WHERE location = 'New York')
GROUP BY department_id;
```
ในตัวอย่างนี้ **Subquery** จะดึง **department_id** ที่เกี่ยวข้องกับ **location** 'New York' และใช้ในเงื่อนไข **IN** เพื่อกรองข้อมูลจากตาราง **employees**

## 3. **การใช้ Subquery กับ EXISTS**

**EXISTS** เป็นคำสั่งที่ใช้ใน **Subquery** เพื่อเช็คว่าผลลัพธ์จาก **Subquery** มีข้อมูลหรือไม่ โดยจะคืนค่าผลลัพธ์เป็น **TRUE** หรือ **FALSE**

### ตัวอย่าง:
```sql
SELECT employee_name
FROM employees e1
WHERE EXISTS (SELECT 1 FROM departments WHERE department_id = e1.department_id AND location = 'New York');
```
ในตัวอย่างนี้ **EXISTS** จะตรวจสอบว่ามีแผนกที่มี **location** เป็น 'New York' หรือไม่ ซึ่งจะช่วยให้เราค้นหาพนักงานที่ทำงานในแผนกดังกล่าว

## 4. **ข้อดีและข้อเสียของการใช้ Subquery**

### ข้อดี:
- **Subquery** ช่วยให้เราสามารถเขียนคำสั่ง SQL ที่ซับซ้อนได้โดยไม่ต้องสร้างตารางหรือมุมมองเพิ่มเติม
- สามารถทำให้การคิวรีข้อมูลจากหลายตารางทำได้ง่ายขึ้นและชัดเจน
- สามารถใช้ในการกรองข้อมูลที่มีความซับซ้อน

### ข้อเสีย:
- **Subquery** อาจทำให้ประสิทธิภาพการคิวรีลดลงโดยเฉพาะในกรณีที่มีการใช้ **Subquery** ซ้อนหลายระดับหรือคิวรีข้อมูลจากหลายตาราง
- หากมีการใช้ **Correlated Subquery** อาจทำให้การประมวลผลช้าลงเนื่องจากต้องประมวลผลใหม่ทุกครั้งที่มีการอ้างอิงถึงข้อมูลในคำสั่งหลัก

## สรุป

**Subquery** เป็นเครื่องมือที่มีประโยชน์ในการเขียน SQL โดยช่วยให้สามารถคิวรีข้อมูลที่มีความซับซ้อนได้ง่ายขึ้น การใช้ **Subquery** ใน **WHERE**, **SELECT**, **FROM**, หรือ **EXISTS** ช่วยให้เราสามารถกรองข้อมูลหรือเชื่อมโยงข้อมูลจากหลายแหล่งได้อย่างมีประสิทธิภาพ แม้ว่า **Subquery** จะมีประโยชน์มาก แต่ก็มีข้อจำกัดในเรื่องประสิทธิภาพในการคิวรีข้อมูลที่ซับซ้อน ดังนั้นควรใช้ให้เหมาะสมตามความต้องการ