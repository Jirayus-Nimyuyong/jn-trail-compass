# การใช้คำสั่ง SQL ขั้นสูง (Advanced Queries) ใน PostgreSQL

## บทนำ

คำสั่ง SQL ขั้นสูง (Advanced Queries) ใน PostgreSQL คือการใช้ฟีเจอร์ที่มีความซับซ้อนมากขึ้นใน SQL เช่น การใช้ Subqueries, CTE (Common Table Expressions), Window Functions, และการใช้ฟังก์ชันต่างๆ เพื่อการคำนวณที่ซับซ้อนและการประมวลผลข้อมูลในลักษณะที่มีประสิทธิภาพ. การเรียนรู้คำสั่ง SQL ขั้นสูงจะช่วยให้คุณสามารถจัดการข้อมูลที่ซับซ้อนได้ดียิ่งขึ้นและทำให้การทำงานกับ PostgreSQL มีความยืดหยุ่นสูงขึ้น.

## 1. **Subqueries (การใช้คำสั่งย่อย)**

**Subqueries** คือคำสั่ง SQL ที่ถูกฝังอยู่ในคำสั่ง SQL อื่น โดยสามารถใช้ในการกรองข้อมูล, คำนวณค่าต่างๆ หรือใช้ในการอัปเดตข้อมูล.

### 1.1 **Subqueries ใน SELECT**

```sql
SELECT name, salary 
FROM employees 
WHERE department_id = (SELECT department_id FROM departments WHERE name = 'Sales');
```

ในตัวอย่างนี้, คำสั่งย่อย (Subquery) ใช้ในการหาหมายเลขแผนกที่มีชื่อว่า "Sales" และนำมาใช้ในการกรองพนักงานที่อยู่ในแผนกนั้น.

### 1.2 **Subqueries ใน WHERE**

```sql
SELECT name 
FROM employees 
WHERE salary > (SELECT AVG(salary) FROM employees);
```

คำสั่งนี้จะเลือกพนักงานที่มีเงินเดือนมากกว่าค่าเฉลี่ยของเงินเดือนทั้งหมดในตาราง `employees`.

## 2. **Common Table Expressions (CTEs)**

**CTE** หรือ Common Table Expressions คือการใช้การคิวรีชั่วคราวที่สามารถเรียกใช้ซ้ำภายในคำสั่ง SQL เดียวกัน. CTE จะช่วยให้โค้ดอ่านง่ายและทำให้คำสั่ง SQL ซับซ้อนน้อยลง.

### 2.1 **การใช้ CTE**

```sql
WITH DepartmentSalaries AS (
    SELECT department_id, AVG(salary) AS avg_salary
    FROM employees
    GROUP BY department_id
)
SELECT e.name, e.salary, ds.avg_salary
FROM employees e
JOIN DepartmentSalaries ds ON e.department_id = ds.department_id
WHERE e.salary > ds.avg_salary;
```

ในตัวอย่างนี้, เราใช้ CTE ชื่อ `DepartmentSalaries` เพื่อหาค่าเฉลี่ยของเงินเดือนในแต่ละแผนก แล้วนำไปใช้ในคำสั่ง SELECT เพื่อกรองพนักงานที่มีเงินเดือนสูงกว่าค่าเฉลี่ยของแผนกนั้น.

## 3. **Window Functions (ฟังก์ชันหน้าต่าง)**

**Window Functions** เป็นฟังก์ชันที่ทำการคำนวณบนชุดข้อมูลที่ได้จากการแบ่งกลุ่มข้อมูล (Partition) โดยไม่ต้องรวมข้อมูลในกลุ่มนั้นๆ. ฟังก์ชันเหล่านี้ช่วยให้การคำนวณที่ซับซ้อน เช่น การคำนวณยอดรวมสะสม, ค่าเฉลี่ยสะสม หรือการจัดอันดับข้อมูล.

### 3.1 **การใช้ Window Functions**

```sql
SELECT name, salary, 
       RANK() OVER (ORDER BY salary DESC) AS rank
FROM employees;
```

ในตัวอย่างนี้, ฟังก์ชัน `RANK()` จะใช้ในการจัดอันดับพนักงานตามเงินเดือนจากมากไปหาน้อย.

### 3.2 **การคำนวณยอดรวมสะสมด้วย Window Function**

```sql
SELECT name, salary, 
       SUM(salary) OVER (ORDER BY salary) AS cumulative_salary
FROM employees;
```

ฟังก์ชัน `SUM()` ในตัวอย่างนี้คำนวณยอดรวมสะสมของเงินเดือนจากพนักงานคนแรกจนถึงคนปัจจุบันตามลำดับเงินเดือน.

## 4. **การใช้ GROUP BY และ HAVING**

การใช้ `GROUP BY` ช่วยในการจัดกลุ่มข้อมูล และ `HAVING` ใช้ในการกรองกลุ่มข้อมูลหลังจากที่ได้ทำการจัดกลุ่มแล้ว.

### 4.1 **การใช้ GROUP BY**

```sql
SELECT department_id, AVG(salary)
FROM employees
GROUP BY department_id;
```

คำสั่งนี้จะคำนวณค่าเฉลี่ยของเงินเดือนในแต่ละแผนก.

### 4.2 **การใช้ HAVING**

```sql
SELECT department_id, AVG(salary)
FROM employees
GROUP BY department_id
HAVING AVG(salary) > 50000;
```

คำสั่งนี้จะเลือกแผนกที่มีค่าเฉลี่ยเงินเดือนมากกว่า 50,000 บาท.

## 5. **การใช้ JOINs ที่ซับซ้อน**

การใช้ `JOIN` ในการรวมข้อมูลจากหลายตารางเป็นหนึ่งในฟีเจอร์ที่สำคัญของ SQL. PostgreSQL รองรับการใช้ `INNER JOIN`, `LEFT JOIN`, `RIGHT JOIN`, และ `FULL JOIN` ที่สามารถนำมารวมข้อมูลได้ตามเงื่อนไขต่างๆ.

### 5.1 **การใช้ INNER JOIN**

```sql
SELECT e.name, d.name AS department_name
FROM employees e
INNER JOIN departments d ON e.department_id = d.department_id;
```

ในตัวอย่างนี้, ข้อมูลของพนักงานจะถูกเชื่อมกับข้อมูลแผนกที่เกี่ยวข้องโดยใช้ `INNER JOIN`.

### 5.2 **การใช้ LEFT JOIN**

```sql
SELECT e.name, d.name AS department_name
FROM employees e
LEFT JOIN departments d ON e.department_id = d.department_id;
```

การใช้ `LEFT JOIN` จะดึงข้อมูลของพนักงานทั้งหมด รวมทั้งพนักงานที่ไม่มีแผนก.

## 6. **การใช้ DISTINCT**

คำสั่ง `DISTINCT` ใช้ในการกรองข้อมูลที่ซ้ำซ้อนออกจากผลลัพธ์.

### ตัวอย่างการใช้ DISTINCT

```sql
SELECT DISTINCT department_id
FROM employees;
```

คำสั่งนี้จะแสดงผลลัพธ์เป็นหมายเลขแผนกที่ไม่ซ้ำกันจากตาราง `employees`.

## 7. **การใช้ EXCEPT และ INTERSECT**

`EXCEPT` และ `INTERSECT` ใช้ในการดำเนินการที่เกี่ยวข้องกับผลลัพธ์ของหลายๆ คำสั่ง SELECT.

### 7.1 **การใช้ EXCEPT**

```sql
SELECT department_id FROM employees
EXCEPT
SELECT department_id FROM contractors;
```

คำสั่งนี้จะแสดงแผนกที่มีในตาราง `employees` แต่ไม่มีในตาราง `contractors`.

### 7.2 **การใช้ INTERSECT**

```sql
SELECT department_id FROM employees
INTERSECT
SELECT department_id FROM contractors;
```

คำสั่งนี้จะแสดงแผนกที่มีในทั้งตาราง `employees` และ `contractors`.

## 8. **การใช้ UNION**

`UNION` ใช้ในการรวมผลลัพธ์จากคำสั่ง SELECT หลายๆ ตัวเข้าไว้ด้วยกันโดยไม่ให้ข้อมูลซ้ำกัน.

### ตัวอย่างการใช้ UNION

```sql
SELECT department_id FROM employees
UNION
SELECT department_id FROM contractors;
```

คำสั่งนี้จะแสดงแผนกทั้งหมดที่มีในทั้ง `employees` และ `contractors`, โดยไม่ให้แผนกซ้ำกัน.

## 9. **สรุป**

คำสั่ง SQL ขั้นสูงใน PostgreSQL ช่วยให้สามารถคิวรีข้อมูลที่ซับซ้อนมากขึ้นได้อย่างมีประสิทธิภาพ. การใช้ Subqueries, CTEs, Window Functions, การใช้ JOINs, และฟังก์ชันต่างๆ ช่วยให้คุณสามารถทำการคำนวณที่ซับซ้อนและการประมวลผลข้อมูลได้อย่างมีประสิทธิภาพ. การเรียนรู้และเข้าใจฟีเจอร์เหล่านี้จะช่วยให้การใช้งาน PostgreSQL เป็นไปได้อย่างมีประสิทธิภาพและยืดหยุ่นมากขึ้น.