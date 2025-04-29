# Common Table Expressions (CTEs) ใน PostgreSQL

## บทนำ

**Common Table Expressions (CTEs)** หรือที่เรียกว่า **WITH Clauses** คือกลไกที่ช่วยให้เราสามารถใช้ **SELECT** คำสั่ง SQL แบบชั่วคราวภายในคำสั่งหลักได้ โดย CTE ช่วยให้เราสามารถจัดระเบียบและแยกส่วนของคำสั่ง SQL ที่ซับซ้อนออกเป็นส่วน ๆ ที่เข้าใจง่ายขึ้น CTE มีประโยชน์อย่างยิ่งเมื่อเราต้องใช้คำสั่ง **SELECT** หลายครั้งหรือมีการคำนวณซ้ำๆ ภายในคำสั่ง SQL

การใช้ CTE จะทำให้โค้ด SQL สะอาดและอ่านง่ายขึ้น รวมถึงสามารถใช้ **Recursive Queries** ได้อีกด้วย

## 1. **การใช้ CTE พื้นฐาน**

การสร้าง **CTE** สามารถทำได้โดยการใช้คำสั่ง **WITH** ตามด้วยชื่อของ CTE และคำสั่ง **SELECT** ที่เราต้องการสร้างไว้เป็นข้อมูลชั่วคราว จากนั้นสามารถอ้างอิง CTE นี้ในคำสั่งหลักได้

### ตัวอย่าง:
```sql
WITH employee_salary AS (
    SELECT employee_id, salary
    FROM employees
    WHERE salary > 50000
)
SELECT * FROM employee_salary;
```
ในตัวอย่างนี้ เราสร้าง CTE ชื่อ **employee_salary** ซึ่งเก็บข้อมูลของพนักงานที่มีเงินเดือนมากกว่า 50000 และนำข้อมูลนั้นมาใช้ในคำสั่งหลักเพื่อดึงข้อมูลทั้งหมดจาก **employee_salary**

## 2. **การใช้หลาย CTE**

สามารถสร้างหลาย CTE ในคำสั่งเดียวได้ โดยใช้ **WITH** ตามด้วยการคั่น CTE แต่ละอันด้วยเครื่องหมายจุลภาค (`,`)

### ตัวอย่าง:
```sql
WITH high_salary AS (
    SELECT employee_id, salary
    FROM employees
    WHERE salary > 50000
),
low_salary AS (
    SELECT employee_id, salary
    FROM employees
    WHERE salary <= 50000
)
SELECT * FROM high_salary
UNION
SELECT * FROM low_salary;
```
ในตัวอย่างนี้ เราสร้างสอง CTE ชื่อ **high_salary** และ **low_salary** ซึ่งเก็บข้อมูลของพนักงานที่มีเงินเดือนมากกว่าและน้อยกว่าหรือเท่ากับ 50000 ตามลำดับ จากนั้นเราใช้คำสั่ง **UNION** เพื่อรวมข้อมูลจากทั้งสอง CTE

## 3. **การใช้ CTE กับการคำนวณรวม**

CTE สามารถใช้ในการคำนวณรวม เช่น การคำนวณค่าเฉลี่ยหรือผลรวมจากข้อมูลที่กรองใน CTE

### ตัวอย่าง:
```sql
WITH department_avg_salary AS (
    SELECT department_id, AVG(salary) AS avg_salary
    FROM employees
    GROUP BY department_id
)
SELECT e.employee_id, e.employee_name, e.salary, d.avg_salary
FROM employees e
JOIN department_avg_salary d ON e.department_id = d.department_id
WHERE e.salary > d.avg_salary;
```
ในตัวอย่างนี้, CTE **department_avg_salary** จะคำนวณค่าเฉลี่ยของเงินเดือนสำหรับแต่ละแผนก จากนั้นคำสั่งหลักจะเลือกข้อมูลของพนักงานที่มีเงินเดือนมากกว่าค่าเฉลี่ยในแผนกของตน

## 4. **Recursive CTE**

**Recursive CTE** คือ **CTE** ที่สามารถเรียกใช้ตัวเองภายในคำสั่ง SQL ซึ่งมีประโยชน์มากสำหรับการทำงานกับข้อมูลที่มีโครงสร้างเชิงลำดับ เช่น ข้อมูลที่มีความสัมพันธ์แบบต้นไม้ (hierarchical data) หรือการค้นหาลำดับขั้นของข้อมูล

**Recursive CTE** จะประกอบไปด้วย 2 ส่วนหลัก:
1. **Base Query**: ส่วนที่ใช้ดึงข้อมูลเริ่มต้น (initial result)
2. **Recursive Query**: ส่วนที่ใช้ในการเรียกข้อมูลซ้ำเพื่อดำเนินการเพิ่มเติม

### ตัวอย่าง:
```sql
WITH RECURSIVE employee_hierarchy AS (
    -- Base Query: เลือกพนักงานที่ไม่มีหัวหน้า (manager)
    SELECT employee_id, manager_id, employee_name
    FROM employees
    WHERE manager_id IS NULL
    UNION ALL
    -- Recursive Query: เลือกพนักงานที่มีหัวหน้าเป็นพนักงานที่มีในผลลัพธ์
    SELECT e.employee_id, e.manager_id, e.employee_name
    FROM employees e
    INNER JOIN employee_hierarchy eh ON e.manager_id = eh.employee_id
)
SELECT * FROM employee_hierarchy;
```
ในตัวอย่างนี้, CTE **employee_hierarchy** จะดึงข้อมูลเกี่ยวกับพนักงานและผู้จัดการ โดยเริ่มจากพนักงานที่ไม่มีผู้จัดการ (ไม่มีค่าใน **manager_id**) และจากนั้นจะทำการรวมข้อมูลพนักงานที่มีผู้จัดการ โดยทำการค้นหาซ้ำจนกว่าจะครอบคลุมพนักงานทั้งหมดในลำดับชั้น

## 5. **การใช้ CTE กับการอัปเดตข้อมูล**

เราสามารถใช้ CTE ในการดำเนินการอัปเดตข้อมูลในตาราง โดยการอ้างอิง CTE ในคำสั่ง **UPDATE**

### ตัวอย่าง:
```sql
WITH department_avg_salary AS (
    SELECT department_id, AVG(salary) AS avg_salary
    FROM employees
    GROUP BY department_id
)
UPDATE employees e
SET salary = d.avg_salary
FROM department_avg_salary d
WHERE e.department_id = d.department_id
AND e.salary < d.avg_salary;
```
ในตัวอย่างนี้, **CTE department_avg_salary** คำนวณค่าเฉลี่ยเงินเดือนสำหรับแต่ละแผนก และจากนั้นคำสั่ง **UPDATE** จะอัปเดตเงินเดือนของพนักงานที่มีเงินเดือนต่ำกว่าค่าเฉลี่ยของแผนกให้เท่ากับค่าเฉลี่ย

## 6. **ข้อดีของการใช้ CTE**

- **อ่านง่าย**: CTE ช่วยให้คำสั่ง SQL มีความชัดเจนและเข้าใจง่ายขึ้น โดยการแยกส่วนต่าง ๆ ของคำสั่งออกมาเป็นชิ้นส่วน
- **ลดการซ้ำซ้อน**: CTE ช่วยให้ไม่ต้องเขียนคำสั่ง **SELECT** ซ้ำหลายครั้งในคำสั่งเดียว
- **รองรับ Recursive Queries**: CTE ช่วยให้สามารถใช้การคิวรีแบบ Recursive ได้อย่างสะดวก
- **เพิ่มประสิทธิภาพ**: ช่วยเพิ่มประสิทธิภาพในการจัดการกับข้อมูลที่ซับซ้อน โดยเฉพาะเมื่อมีการใช้ **Recursive CTE**

## 7. **ข้อจำกัดของ CTE**

- **ประสิทธิภาพ**: การใช้ CTE มากเกินไปอาจทำให้ประสิทธิภาพของการคิวรีลดลงโดยเฉพาะเมื่อข้อมูลมีจำนวนมาก
- **ไม่สามารถใช้ใน Subquery**: CTE ไม่สามารถใช้ใน **Subquery** ที่ซ้อนอยู่ภายในคำสั่ง SQL อื่นได้
- **ไม่สามารถใช้งานในทุกกรณี**: CTE อาจไม่เหมาะสมในกรณีที่ต้องการความยืดหยุ่นสูง

## สรุป

**Common Table Expressions (CTEs)** เป็นเครื่องมือที่ทรงพลังในการเขียน SQL ที่ช่วยให้เราสามารถจัดระเบียบคำสั่ง SQL ที่ซับซ้อนให้เข้าใจง่ายขึ้น CTE สามารถใช้ได้ทั้งในกรณีที่ต้องการจัดการข้อมูลหลายส่วนหรือการทำงานกับข้อมูลที่มีความสัมพันธ์เชิงลำดับ (recursive queries) โดย CTE ช่วยเพิ่มความสะดวกในการคิวรีข้อมูลซ้ำ ๆ และทำให้คำสั่ง SQL อ่านง่ายขึ้นและมีประสิทธิภาพมากขึ้น