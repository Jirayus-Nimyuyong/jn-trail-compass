# Stored Procedures ใน PostgreSQL

## บทนำ

**Stored Procedure** (หรือที่เรียกว่า **Procedure**) คือชุดคำสั่ง SQL ที่ถูกเก็บไว้ในฐานข้อมูลและสามารถเรียกใช้ซ้ำได้เมื่อจำเป็น โดยที่ไม่ต้องเขียนคำสั่ง SQL ใหม่ทุกครั้งที่ต้องการดำเนินการบางอย่าง โดยการใช้ **Stored Procedure** ช่วยให้สามารถดำเนินการที่ซับซ้อนได้อย่างมีประสิทธิภาพและสามารถจัดการการทำงานในฐานข้อมูลได้ดีขึ้น

ใน PostgreSQL, **Stored Procedures** สามารถใช้ภาษา **PL/pgSQL** หรือภาษาที่รองรับอื่น ๆ เช่น **PL/Python**, **PL/Perl** สำหรับการเขียนคำสั่ง

## 1. **การสร้าง Stored Procedure**

ในการสร้าง **Stored Procedure** เราจะใช้คำสั่ง **CREATE PROCEDURE** ตามด้วยชื่อของโปรซีเจอร์และรายการของพารามิเตอร์ที่ใช้ในโปรซีเจอร์นั้น

### ตัวอย่าง:
```sql
CREATE PROCEDURE update_employee_salary(employee_id INT, new_salary NUMERIC)
LANGUAGE plpgsql
AS $$
BEGIN
  UPDATE employees
  SET salary = new_salary
  WHERE id = employee_id;
END;
$$;
```
ในตัวอย่างนี้ เรากำลังสร้าง **Stored Procedure** ชื่อ **update_employee_salary** ที่จะอัปเดต **salary** ของพนักงานในตาราง **employees** โดยการรับค่า **employee_id** และ **new_salary** เป็นพารามิเตอร์

## 2. **การเรียกใช้ Stored Procedure**

เมื่อสร้าง **Stored Procedure** เสร็จแล้ว เราสามารถเรียกใช้มันได้โดยใช้คำสั่ง **CALL** ตามด้วยชื่อโปรซีเจอร์และพารามิเตอร์ที่ต้องการ

### ตัวอย่าง:
```sql
CALL update_employee_salary(101, 60000);
```
ในตัวอย่างนี้ เรากำลังเรียกใช้ **Stored Procedure** ชื่อ **update_employee_salary** เพื่ออัปเดต **salary** ของพนักงานที่มี **employee_id** เท่ากับ 101 เป็น 60000

## 3. **การใช้ Output Parameters**

**Stored Procedure** สามารถรับและส่งค่าผลลัพธ์ (output) ผ่านพารามิเตอร์ได้ โดยสามารถกำหนดให้พารามิเตอร์เป็น **IN**, **OUT**, หรือ **INOUT** เพื่อบอกทิศทางของข้อมูล

- **IN** ใช้สำหรับพารามิเตอร์ที่รับค่าเข้า
- **OUT** ใช้สำหรับพารามิเตอร์ที่ส่งค่าออก
- **INOUT** ใช้สำหรับพารามิเตอร์ที่รับค่าเข้าและส่งค่าผลลัพธ์ออก

### ตัวอย่าง:
```sql
CREATE PROCEDURE get_employee_salary(employee_id INT, OUT salary NUMERIC)
LANGUAGE plpgsql
AS $$
BEGIN
  SELECT employee_salary INTO salary
  FROM employees
  WHERE id = employee_id;
END;
$$;
```
ในตัวอย่างนี้, **salary** จะเป็นพารามิเตอร์แบบ **OUT** ที่จะส่งค่าผลลัพธ์กลับจาก **Stored Procedure**

### การเรียกใช้:
```sql
CALL get_employee_salary(101, salary);
```
ในตัวอย่างนี้, ผลลัพธ์ของเงินเดือนพนักงานที่มี **employee_id** เท่ากับ 101 จะถูกเก็บในตัวแปร **salary**

## 4. **การใช้ EXCEPTION Handling**

**Stored Procedure** ใน PostgreSQL สามารถใช้ **exception handling** เพื่อจัดการกับข้อผิดพลาดที่อาจเกิดขึ้นระหว่างการประมวลผล โดยใช้คำสั่ง **BEGIN ... EXCEPTION ... END**

### ตัวอย่าง:
```sql
CREATE PROCEDURE safe_update_employee_salary(employee_id INT, new_salary NUMERIC)
LANGUAGE plpgsql
AS $$
BEGIN
  UPDATE employees
  SET salary = new_salary
  WHERE id = employee_id;

  IF NOT FOUND THEN
    RAISE EXCEPTION 'Employee not found with id %', employee_id;
  END IF;
EXCEPTION
  WHEN OTHERS THEN
    RAISE NOTICE 'An error occurred while updating salary: %', SQLERRM;
END;
$$;
```
ในตัวอย่างนี้, หากไม่พบพนักงานที่มี **employee_id** ที่ระบุ, จะมีการยกข้อผิดพลาดโดยใช้คำสั่ง **RAISE EXCEPTION**

## 5. **การแก้ไขและลบ Stored Procedure**

- การแก้ไข **Stored Procedure** ใน PostgreSQL สามารถทำได้โดยการลบ **Stored Procedure** เดิมแล้วสร้างใหม่
- การลบ **Stored Procedure** ใช้คำสั่ง **DROP PROCEDURE**

### ตัวอย่างการลบ:
```sql
DROP PROCEDURE update_employee_salary;
```

## 6. **การใช้ Stored Procedure ในการทำงานแบบ Batch**

การใช้ **Stored Procedure** ช่วยให้สามารถทำงานที่ซับซ้อนได้ง่ายขึ้น เช่น การอัปเดตข้อมูลหลาย ๆ รายการในคราวเดียว โดยการใช้ **Stored Procedure** เพื่อดำเนินการแบบ batch

### ตัวอย่าง:
```sql
CREATE PROCEDURE update_multiple_salaries()
LANGUAGE plpgsql
AS $$
BEGIN
  UPDATE employees SET salary = salary * 1.1 WHERE department_id = 101;
  UPDATE employees SET salary = salary * 1.05 WHERE department_id = 102;
  -- เพิ่มคำสั่งอื่น ๆ ได้
END;
$$;
```
ในตัวอย่างนี้, **Stored Procedure** จะทำการอัปเดตเงินเดือนของพนักงานในแผนก 101 และ 102 ในคราวเดียว

## 7. **ข้อดีและข้อเสียของการใช้ Stored Procedure**

### ข้อดี:
- **ลดการเขียน SQL ซ้ำ ๆ**: ช่วยให้สามารถใช้คำสั่ง SQL ที่ซับซ้อนซ้ำ ๆ ได้โดยไม่ต้องเขียนใหม่ทุกครั้ง
- **ประสิทธิภาพดีขึ้น**: ลดจำนวนการส่งคำสั่ง SQL ไปยังฐานข้อมูลโดยตรง
- **การจัดการที่ดีขึ้น**: การแยก logic การทำงานออกจากแอปพลิเคชันทำให้การบำรุงรักษาระบบทำได้ง่ายขึ้น

### ข้อเสีย:
- **ความซับซ้อน**: การสร้างและบำรุงรักษา **Stored Procedure** อาจทำให้ระบบมีความซับซ้อนมากขึ้น
- **ข้อจำกัดในบางกรณี**: การใช้ **Stored Procedure** อาจไม่เหมาะสมสำหรับกรณีที่ต้องการความยืดหยุ่นสูง หรือการเปลี่ยนแปลงที่บ่อย

## สรุป

**Stored Procedure** เป็นเครื่องมือที่มีประโยชน์ใน PostgreSQL ที่ช่วยให้การดำเนินการที่ซับซ้อนและการจัดการฐานข้อมูลเป็นไปได้อย่างมีประสิทธิภาพ โดยสามารถเก็บคำสั่ง SQL ที่ใช้งานบ่อย ๆ ไว้ในฐานข้อมูลและเรียกใช้ได้หลายครั้ง การใช้ **Stored Procedure** ช่วยลดความซ้ำซ้อนในการเขียน SQL และสามารถจัดการกับข้อผิดพลาดและการทำงานที่ซับซ้อนได้อย่างมีระเบียบ