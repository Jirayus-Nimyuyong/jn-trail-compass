# Triggers ใน PostgreSQL

## บทนำ

**Triggers** คือกลไกใน PostgreSQL ที่ช่วยให้สามารถทำการดำเนินการบางอย่างโดยอัตโนมัติเมื่อมีการกระทำบางอย่างเกิดขึ้นในตาราง เช่น การ **INSERT**, **UPDATE**, หรือ **DELETE**. เมื่อเกิดเหตุการณ์เหล่านี้, PostgreSQL สามารถเรียกใช้ฟังก์ชันที่กำหนดไว้ล่วงหน้าโดยอัตโนมัติ, ช่วยให้การจัดการข้อมูลสะดวกและมีประสิทธิภาพมากยิ่งขึ้น

Triggers เป็นเครื่องมือที่มีประโยชน์ในการตรวจสอบ, ป้องกัน, หรือปรับปรุงข้อมูลโดยอัตโนมัติเมื่อมีการเปลี่ยนแปลงในฐานข้อมูล

## 1. **ประเภทของ Triggers**

Triggers ใน PostgreSQL สามารถแบ่งออกเป็น 3 ประเภทหลักๆ ตามช่วงเวลาที่ทำการตรวจสอบหรือดำเนินการ:

- **BEFORE Trigger**: ทำงานก่อนที่จะมีการดำเนินการ **INSERT**, **UPDATE**, หรือ **DELETE**
- **AFTER Trigger**: ทำงานหลังจากที่มีการดำเนินการ **INSERT**, **UPDATE**, หรือ **DELETE**
- **INSTEAD OF Trigger**: ใช้แทนที่การดำเนินการเดิม เช่น แทนที่ **INSERT**, **UPDATE**, หรือ **DELETE**

## 2. **การสร้าง Trigger**

การสร้าง **Trigger** ใน PostgreSQL สามารถทำได้โดยการใช้คำสั่ง `CREATE TRIGGER` ซึ่งจะกำหนดฟังก์ชันที่ต้องการให้ทำงานเมื่อมีการกระทำตามที่กำหนด

### รูปแบบของการสร้าง Trigger:
```sql
CREATE TRIGGER trigger_name
{ BEFORE | AFTER | INSTEAD OF } 
{ INSERT | UPDATE | DELETE } 
ON table_name
[ FOR EACH ROW ]
[ WHEN condition ]
EXECUTE FUNCTION function_name();
```

- `trigger_name`: ชื่อของ Trigger
- `BEFORE | AFTER | INSTEAD OF`: ช่วงเวลาที่ Trigger จะทำงาน
- `INSERT | UPDATE | DELETE`: กำหนดเหตุการณ์ที่ Trigger จะทำงานเมื่อเกิดเหตุการณ์เหล่านี้
- `table_name`: ชื่อตารางที่ Trigger จะทำงาน
- `FOR EACH ROW`: กำหนดให้ Trigger ทำงานสำหรับแต่ละแถวที่มีการเปลี่ยนแปลง
- `WHEN condition`: เงื่อนไขที่ Trigger จะทำงานเมื่อเงื่อนไขนั้นตรง
- `function_name()`: ชื่อฟังก์ชันที่จะถูกเรียกใช้เมื่อ Trigger ทำงาน

## 3. **ตัวอย่างการใช้งาน Trigger**

### 3.1 **BEFORE Trigger**

Trigger ประเภทนี้จะทำงานก่อนที่จะมีการกระทำในตาราง เช่น ก่อนที่จะ **INSERT**, **UPDATE**, หรือ **DELETE** ข้อมูล

#### ตัวอย่าง: **BEFORE INSERT Trigger**
```sql
CREATE OR REPLACE FUNCTION check_salary() RETURNS TRIGGER AS $$
BEGIN
    IF NEW.salary < 10000 THEN
        RAISE EXCEPTION 'Salary must be greater than 10000';
    END IF;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER before_insert_employee
BEFORE INSERT ON employees
FOR EACH ROW
EXECUTE FUNCTION check_salary();
```
ในตัวอย่างนี้, Trigger `before_insert_employee` จะทำงานก่อนการ **INSERT** ข้อมูลลงในตาราง **employees** หากเงินเดือนต่ำกว่า 10000 จะเกิดข้อผิดพลาด

### 3.2 **AFTER Trigger**

Trigger ประเภทนี้จะทำงานหลังจากที่มีการกระทำในตาราง เช่น หลังจากการ **INSERT**, **UPDATE**, หรือ **DELETE** ข้อมูล

#### ตัวอย่าง: **AFTER INSERT Trigger**
```sql
CREATE OR REPLACE FUNCTION log_insert_employee() RETURNS TRIGGER AS $$
BEGIN
    INSERT INTO employee_log (employee_id, action)
    VALUES (NEW.employee_id, 'INSERT');
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER after_insert_employee
AFTER INSERT ON employees
FOR EACH ROW
EXECUTE FUNCTION log_insert_employee();
```
ในตัวอย่างนี้, Trigger `after_insert_employee` จะทำงานหลังจากที่มีการ **INSERT** ข้อมูลลงในตาราง **employees** และจะบันทึกข้อมูลการกระทำในตาราง **employee_log**

### 3.3 **INSTEAD OF Trigger**

Trigger ประเภทนี้จะทำงานแทนที่การกระทำที่เกิดขึ้น เช่น หากมีการ **DELETE** ข้อมูล เราสามารถสร้าง **INSTEAD OF DELETE Trigger** เพื่อแทนที่การลบข้อมูลด้วยการทำสิ่งอื่นๆ

#### ตัวอย่าง: **INSTEAD OF DELETE Trigger**
```sql
CREATE OR REPLACE FUNCTION prevent_delete_employee() RETURNS TRIGGER AS $$
BEGIN
    RAISE EXCEPTION 'Cannot delete employee';
    RETURN NULL;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER instead_of_delete_employee
INSTEAD OF DELETE ON employees
FOR EACH ROW
EXECUTE FUNCTION prevent_delete_employee();
```
ในตัวอย่างนี้, Trigger `instead_of_delete_employee` จะทำงานแทนการ **DELETE** ข้อมูลจากตาราง **employees** โดยจะแสดงข้อผิดพลาดแทนการลบข้อมูล

## 4. **การลบ Trigger**

หากต้องการลบ Trigger ที่สร้างไว้สามารถทำได้โดยใช้คำสั่ง `DROP TRIGGER`:

```sql
DROP TRIGGER trigger_name ON table_name;
```

ตัวอย่าง:
```sql
DROP TRIGGER before_insert_employee ON employees;
```

## 5. **การใช้ Trigger เพื่อเพิ่มความปลอดภัยและการตรวจสอบ**

Triggers สามารถใช้ในการเพิ่มความปลอดภัยและตรวจสอบข้อมูล เช่น การตรวจสอบความถูกต้องของข้อมูลก่อนที่จะมีการบันทึกลงในฐานข้อมูล, การล็อกข้อมูลทุกครั้งที่มีการกระทำต่างๆ, หรือการป้องกันการลบข้อมูลที่สำคัญ

### ตัวอย่าง: การตรวจสอบข้อมูลก่อนการ **UPDATE**
```sql
CREATE OR REPLACE FUNCTION prevent_salary_update() RETURNS TRIGGER AS $$
BEGIN
    IF OLD.salary = NEW.salary THEN
        RAISE EXCEPTION 'Salary cannot be the same';
    END IF;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER before_update_salary
BEFORE UPDATE ON employees
FOR EACH ROW
EXECUTE FUNCTION prevent_salary_update();
```
ในตัวอย่างนี้, Trigger `before_update_salary` จะทำงานก่อนการ **UPDATE** ข้อมูลในตาราง **employees** โดยจะไม่อนุญาตให้ทำการอัปเดตเงินเดือนหากเงินเดือนเดิมและใหม่เป็นค่าเดียวกัน

## 6. **ข้อดีของการใช้ Trigger**

- **อัตโนมัติ**: ทำให้การกระทำบางอย่างเกิดขึ้นโดยอัตโนมัติเมื่อมีการกระทำที่กำหนดไว้
- **ความปลอดภัย**: สามารถใช้เพื่อป้องกันหรือควบคุมการกระทำบางอย่างในฐานข้อมูล
- **การตรวจสอบ**: ใช้ตรวจสอบข้อมูลก่อนหรือหลังการทำธุรกรรม

## 7. **ข้อควรระวังในการใช้ Trigger**

- **ประสิทธิภาพ**: การใช้ Trigger มากเกินไปอาจทำให้การดำเนินการในฐานข้อมูลช้าลง เพราะ Trigger จะทำงานทุกครั้งที่มีการกระทำที่เกี่ยวข้อง
- **ความซับซ้อน**: การใช้ Trigger อาจทำให้ฐานข้อมูลมีความซับซ้อนและยากต่อการบำรุงรักษา
- **ความคาดหวัง**: ผู้ใช้บางคนอาจไม่ทราบว่า Trigger ได้ทำงานอยู่เบื้องหลัง ทำให้เกิดการคาดหวังที่ไม่ตรงกัน

## สรุป

**Triggers** เป็นเครื่องมือที่มีประโยชน์ในการจัดการกับเหตุการณ์ที่เกิดขึ้นในฐานข้อมูลโดยอัตโนมัติ ช่วยให้สามารถตรวจสอบข้อมูล, ป้องกันการกระทำที่ไม่ต้องการ, หรือเพิ่มการทำงานเพิ่มเติมในระหว่างการทำธุรกรรม เช่น การ **INSERT**, **UPDATE**, หรือ **DELETE** ข้อมูล การใช้ Trigger ใน PostgreSQL สามารถเพิ่มความยืดหยุ่นและความปลอดภัยให้กับระบบฐานข้อมูลของคุณได้