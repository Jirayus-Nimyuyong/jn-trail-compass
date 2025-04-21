# Git Commit และ History

Git Commit และ History เป็นฟีเจอร์สำคัญของ Git ที่ช่วยให้คุณบันทึกสถานะของโครงการและตรวจสอบประวัติการเปลี่ยนแปลงได้อย่างง่ายดาย

## 1. Git Commit

`git commit` ใช้สำหรับบันทึกการเปลี่ยนแปลงที่อยู่ใน staging area เข้าไปใน repository อย่างถาวร

### การใช้งาน
- **Commit พร้อมข้อความ:**
```bash
git commit -m "ข้อความอธิบายการเปลี่ยนแปลง"
```

- **Commit แบบเปิดหน้าต่างแก้ไขข้อความ:**
```bash
git commit
```

### ตัวอย่าง
```bash
git add example.txt
git commit -m "เพิ่มไฟล์ example.txt"
```

ผลลัพธ์: การเปลี่ยนแปลงในไฟล์ `example.txt` จะถูกบันทึกใน repository พร้อมข้อความอธิบาย

### การ Commit หลายไฟล์
หากคุณมีการเปลี่ยนแปลงหลายไฟล์และต้องการ commit ทั้งหมดพร้อมกัน:
```bash
git add .
git commit -m "อัพเดตหลายไฟล์"
```

## 2. Git History

`git log` ใช้สำหรับดูประวัติการ commit ใน repository

### การใช้งาน
- **แสดงประวัติ commit ทั้งหมด:**
```bash
git log
```

- **แสดงประวัติแบบย่อ:**
```bash
git log --oneline
```

- **แสดงประวัติพร้อมกราฟ:**
```bash
git log --graph --oneline
```

### ตัวอย่างผลลัพธ์
```plaintext
commit 1a2b3c4d5e6f7g8h9i0j (HEAD -> main, origin/main)
Author: Jirayus <jirayus@example.com>
Date:   Fri Jan 17 10:00:00 2025 +0700

    เพิ่มไฟล์ตัวอย่าง

commit 2b3c4d5e6f7g8h9i0j1a
Author: Jirayus <jirayus@example.com>
Date:   Thu Jan 16 15:30:00 2025 +0700

    แก้ไข README.md
```

### การค้นหา Commit
หากต้องการค้นหา commit ที่มีคำค้นหาเฉพาะในข้อความ:
```bash
git log --grep="คำค้นหา"
```

### การดูรายละเอียดการเปลี่ยนแปลงใน Commit
```bash
git show <commit-hash>
```
ตัวอย่าง:
```bash
git show 1a2b3c4d5e6f7g8h9i0j
```

## 3. การย้อนกลับ Commit
หากต้องการย้อนกลับไปยังสถานะก่อนหน้าหรือยกเลิก commit:
- **Soft Reset (เก็บการเปลี่ยนแปลงใน staging area):**
```bash
git reset --soft <commit-hash>
```

- **Hard Reset (ลบการเปลี่ยนแปลงทั้งหมด):**
```bash
git reset --hard <commit-hash>
```

### หมายเหตุ
การใช้ `--hard` จะลบการเปลี่ยนแปลงทั้งหมดใน working directory และ staging area ดังนั้นควรใช้อย่างระมัดระวัง

## สรุป
Git Commit และ History เป็นเครื่องมือสำคัญในการติดตามและบันทึกการเปลี่ยนแปลงของโครงการ คุณสามารถใช้ `git commit` เพื่อบันทึกสถานะและ `git log` เพื่อตรวจสอบประวัติการเปลี่ยนแปลง ซึ่งช่วยให้คุณจัดการโครงการได้อย่างมีประสิทธิภาพ
