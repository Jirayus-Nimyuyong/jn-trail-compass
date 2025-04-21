# Git Reset และ Git Checkout

Git Reset และ Git Checkout เป็นคำสั่งสำคัญที่ใช้ในการจัดการสถานะของ repository และ branch ใน Git ซึ่งมีความสามารถและการใช้งานที่แตกต่างกัน

## 1. Git Reset
Git Reset ใช้เพื่อย้ายหัว branch (HEAD) และปรับเปลี่ยน staging area และ/หรือ working directory

### 1.1 การใช้งาน Git Reset
#### (1) `git reset --soft`
ย้าย HEAD โดยไม่เปลี่ยน staging area และ working directory:
```bash
git reset --soft <commit>
```
- **Use case**: ยกเลิก commit แต่เก็บการเปลี่ยนแปลงไว้ใน staging area

#### (2) `git reset --mixed` (ค่าเริ่มต้น)
ย้าย HEAD และลบการเปลี่ยนแปลงออกจาก staging area แต่ยังคงอยู่ใน working directory:
```bash
git reset --mixed <commit>
```
- **Use case**: ยกเลิก commit และนำการเปลี่ยนแปลงกลับมาใน working directory

#### (3) `git reset --hard`
ย้าย HEAD และลบการเปลี่ยนแปลงทั้งหมดออกจาก staging area และ working directory:
```bash
git reset --hard <commit>
```
- **Use case**: ย้อนกลับไปยังสถานะก่อนหน้าของ commit โดยลบการเปลี่ยนแปลงทั้งหมด

### 1.2 ตัวอย่างการใช้งาน Git Reset
```bash
git log --oneline
# Output
abc123 Commit ล่าสุด
789def Commit ก่อนหน้า
456ghi Commit อีกก่อนหน้า

# ย้อนกลับไปยัง commit `789def`
git reset --mixed 789def
```

## 2. Git Checkout
Git Checkout ใช้สำหรับการย้าย HEAD ไปยัง commit หรือ branch ที่ต้องการ และใช้ในการสร้าง branch ใหม่

### 2.1 การใช้งาน Git Checkout
#### (1) สลับ branch
```bash
git checkout <branch_name>
```
- **Use case**: สลับไปยัง branch ที่มีอยู่

#### (2) สร้าง branch ใหม่และสลับไปยัง branch นั้น
```bash
git checkout -b <new_branch_name>
```
- **Use case**: สร้าง branch ใหม่จากสถานะปัจจุบัน

#### (3) เช็คเอาท์ไฟล์เฉพาะ
คืนค่าการเปลี่ยนแปลงในไฟล์ที่ระบุ:
```bash
git checkout -- <file_name>
```
- **Use case**: คืนค่าไฟล์ใน working directory ให้เหมือนกับใน commit ล่าสุด

### 2.2 ตัวอย่างการใช้งาน Git Checkout
```bash
# สลับไปยัง branch main
git checkout main

# สร้าง branch ใหม่ชื่อ feature/authentication และสลับไปยัง branch นั้น
git checkout -b feature/authentication

# คืนค่าไฟล์ example.txt
git checkout -- example.txt
```

## 3. ความแตกต่างระหว่าง Git Reset และ Git Checkout
| Feature           | Git Reset                         | Git Checkout                    |
|-------------------|-----------------------------------|----------------------------------|
| การทำงานกับ commit | ย้าย HEAD ไปยัง commit ที่ระบุ      | สลับไปยัง branch หรือ commit ใหม่ |
| การเปลี่ยน staging area | มีผลต่อ staging area และ working directory | ไม่มีผลต่อ staging area         |
| การใช้กับไฟล์     | ไม่สามารถใช้ได้กับไฟล์เฉพาะเจาะจง | ใช้คืนค่าไฟล์เฉพาะได้            |

## 4. ข้อควรระวัง
- **Git Reset**: การใช้ `--hard` จะลบการเปลี่ยนแปลงทั้งหมดใน working directory
- **Git Checkout**: คำสั่ง `checkout --` สามารถคืนค่าไฟล์ที่ยังไม่ได้ commit ซึ่งอาจทำให้สูญเสียการเปลี่ยนแปลง

## สรุป
Git Reset และ Git Checkout เป็นคำสั่งที่มีความสำคัญและทรงพลัง โดย Reset เหมาะสำหรับการจัดการ commit history และ Checkout เหมาะสำหรับการสลับ branch หรือคืนค่าไฟล์ การเลือกใช้งานคำสั่งนี้ควรพิจารณาอย่างรอบคอบเพื่อหลีกเลี่ยงการสูญเสียข้อมูล
