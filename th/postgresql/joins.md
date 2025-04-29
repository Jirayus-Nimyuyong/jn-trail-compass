# การเชื่อมตาราง (Joins)

## บทนำ

การเชื่อมตาราง (Joins) ใน SQL เป็นกระบวนการในการรวมข้อมูลจากสองหรือมากกว่าตารางเข้าด้วยกัน โดยอ้างอิงความสัมพันธ์ระหว่างตารางต่าง ๆ ผ่านคอลัมน์ที่มีค่าตรงกัน การใช้คำสั่ง **JOIN** ช่วยให้เราสามารถดึงข้อมูลที่เกี่ยวข้องจากหลายตารางในครั้งเดียวได้ การใช้ **JOIN** อย่างถูกต้องสามารถทำให้การดึงข้อมูลเป็นไปอย่างมีประสิทธิภาพ

## 1. **ประเภทของ JOIN**

### 1.1 **INNER JOIN**

**INNER JOIN** จะดึงข้อมูลที่มีความสัมพันธ์ระหว่างตารางทั้งสอง โดยจะคืนผลลัพธ์เฉพาะแถวที่มีค่าในคอลัมน์ที่ทำการเชื่อมโยงตรงกันในทั้งสองตาราง

### ตัวอย่าง:
```sql
SELECT orders.order_id, customers.customer_name
FROM orders
INNER JOIN customers ON orders.customer_id = customers.customer_id;
```
ในตัวอย่างนี้ **INNER JOIN** จะเชื่อมตาราง **orders** และ **customers** โดยใช้คอลัมน์ **customer_id** เป็นตัวเชื่อม และจะคืนผลลัพธ์เฉพาะแถวที่มีข้อมูลตรงกันในทั้งสองตาราง

### 1.2 **LEFT JOIN** หรือ **LEFT OUTER JOIN**

**LEFT JOIN** หรือ **LEFT OUTER JOIN** จะดึงข้อมูลจากตารางทางซ้าย (left table) และข้อมูลที่ตรงกันจากตารางทางขวา (right table) ถ้าหากไม่พบข้อมูลตรงกันในตารางขวา ก็จะคืนค่าเป็น **NULL** สำหรับคอลัมน์จากตารางขวา

### ตัวอย่าง:
```sql
SELECT orders.order_id, customers.customer_name
FROM orders
LEFT JOIN customers ON orders.customer_id = customers.customer_id;
```
ในตัวอย่างนี้ **LEFT JOIN** จะดึงข้อมูลทั้งหมดจากตาราง **orders** และเชื่อมข้อมูลที่ตรงกันจากตาราง **customers** ถ้าไม่มีข้อมูลตรงกันใน **customers** คอลัมน์ **customer_name** จะเป็น **NULL**

### 1.3 **RIGHT JOIN** หรือ **RIGHT OUTER JOIN**

**RIGHT JOIN** หรือ **RIGHT OUTER JOIN** จะดึงข้อมูลจากตารางทางขวา (right table) และข้อมูลที่ตรงกันจากตารางทางซ้าย (left table) ถ้าหากไม่พบข้อมูลตรงกันในตารางซ้าย ก็จะคืนค่าเป็น **NULL** สำหรับคอลัมน์จากตารางซ้าย

### ตัวอย่าง:
```sql
SELECT orders.order_id, customers.customer_name
FROM orders
RIGHT JOIN customers ON orders.customer_id = customers.customer_id;
```
ในตัวอย่างนี้ **RIGHT JOIN** จะดึงข้อมูลทั้งหมดจากตาราง **customers** และเชื่อมข้อมูลที่ตรงกันจากตาราง **orders** ถ้าไม่มีข้อมูลตรงกันใน **orders** คอลัมน์ **order_id** จะเป็น **NULL**

### 1.4 **FULL JOIN** หรือ **FULL OUTER JOIN**

**FULL JOIN** หรือ **FULL OUTER JOIN** จะดึงข้อมูลทั้งหมดจากทั้งสองตาราง โดยจะคืนค่าข้อมูลที่ตรงกันจากทั้งสองตาราง ถ้าหากไม่มีข้อมูลตรงกันในตารางใดตารางหนึ่ง จะคืนค่าเป็น **NULL** สำหรับคอลัมน์จากตารางที่ไม่มีข้อมูลตรงกัน

### ตัวอย่าง:
```sql
SELECT orders.order_id, customers.customer_name
FROM orders
FULL JOIN customers ON orders.customer_id = customers.customer_id;
```
ในตัวอย่างนี้ **FULL JOIN** จะดึงข้อมูลทั้งหมดจากทั้งสองตาราง **orders** และ **customers** โดยจะเชื่อมข้อมูลที่ตรงกัน หากไม่มีข้อมูลตรงกันในตารางใดตารางหนึ่ง ค่าจะเป็น **NULL**

### 1.5 **CROSS JOIN**

**CROSS JOIN** จะคืนผลลัพธ์ทั้งหมดจากการรวมข้อมูลทุกแถวจากทั้งสองตาราง โดยไม่สนใจความสัมพันธ์ของข้อมูล ข้อมูลที่ได้จากการเชื่อมจะเป็นการคูณจำนวนแถวจากตารางที่หนึ่งกับจำนวนแถวจากตารางที่สอง (Cartesian Product)

### ตัวอย่าง:
```sql
SELECT employees.employee_name, departments.department_name
FROM employees
CROSS JOIN departments;
```
ในตัวอย่างนี้ **CROSS JOIN** จะทำให้ได้ผลลัพธ์เป็นการคูณทุกแถวจากตาราง **employees** กับทุกแถวจากตาราง **departments**

## 2. **การใช้หลาย Join**

เราสามารถใช้ **JOIN** หลายตัวในคำสั่งเดียว เพื่อเชื่อมตารางหลาย ๆ ตารางพร้อมกันได้

### ตัวอย่าง:
```sql
SELECT orders.order_id, customers.customer_name, products.product_name
FROM orders
INNER JOIN customers ON orders.customer_id = customers.customer_id
INNER JOIN order_items ON orders.order_id = order_items.order_id
INNER JOIN products ON order_items.product_id = products.product_id;
```
ในตัวอย่างนี้ เรากำลังเชื่อมตาราง **orders**, **customers**, **order_items**, และ **products** โดยใช้ **INNER JOIN** เพื่อดึงข้อมูลการสั่งซื้อจากตารางทั้งหมดที่เกี่ยวข้อง

## 3. **การใช้ Alias กับ Join**

การใช้ **Alias** ช่วยให้การเขียน SQL ง่ายขึ้น โดยการตั้งชื่อย่อให้กับตาราง เพื่อทำให้คำสั่งดูสั้นและเข้าใจง่าย

### ตัวอย่าง:
```sql
SELECT o.order_id, c.customer_name
FROM orders AS o
INNER JOIN customers AS c ON o.customer_id = c.customer_id;
```
ในตัวอย่างนี้ **orders** ถูกตั้งชื่อย่อเป็น **o** และ **customers** ถูกตั้งชื่อย่อเป็น **c** เพื่อให้คำสั่งดูสั้นลงและเข้าใจง่ายขึ้น

## สรุป

การใช้ **Joins** ใน SQL เป็นเครื่องมือที่สำคัญในการดึงข้อมูลจากหลายตารางในครั้งเดียว โดยการเชื่อมข้อมูลจากคอลัมน์ที่เกี่ยวข้องในตารางต่าง ๆ ช่วยให้เราสามารถดูข้อมูลที่สัมพันธ์กันได้ในแบบเดียวกัน การเลือกประเภทของ **JOIN** ที่เหมาะสม เช่น **INNER JOIN**, **LEFT JOIN**, **RIGHT JOIN**, **FULL JOIN**, และ **CROSS JOIN** ขึ้นอยู่กับความต้องการของข้อมูลที่ต้องการดึงออกมา