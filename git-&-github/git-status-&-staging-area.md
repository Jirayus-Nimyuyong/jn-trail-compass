# Git Status และ Staging Area

Git Status และ Staging Area เป็นหัวใจสำคัญของการใช้งาน Git ที่ช่วยให้คุณจัดการไฟล์และตรวจสอบสถานะของการเปลี่ยนแปลงในโครงการของคุณได้อย่างมีประสิทธิภาพ

## 1. Git Status

คำสั่ง `git status` ใช้สำหรับตรวจสอบสถานะของไฟล์ใน repository โดยสามารถบอกได้ว่าไฟล์ใดที่:
- ถูกติดตาม (Tracked)
- ไม่ถูกติดตาม (Untracked)
- อยู่ใน staging area
- มีการเปลี่ยนแปลงที่ยังไม่ได้บันทึก

### การใช้งาน
```bash
git status
```

### ตัวอย่างผลลัพธ์
```plaintext
On branch main
Your branch is up to date with 'origin/main'.

Changes not staged for commit:
  (use "git add <file>..." to update what will be committed)

        modified:   example.txt

Untracked files:
  (use "git add <file>..." to include in what will be committed)

        newfile.txt

no changes added to commit (use "git add" and/or "git commit -a")
```

### คำอธิบายผลลัพธ์
- **Changes not staged for commit:** ไฟล์ที่มีการเปลี่ยนแปลงแต่ยังไม่ได้เพิ่มไปยัง staging area
- **Untracked files:** ไฟล์ใหม่ที่ยังไม่ได้รับการติดตาม

## 2. Staging Area

Staging Area เป็นพื้นที่ที่ใช้สำหรับเตรียมไฟล์ที่ต้องการบันทึกในการ commit ครั้งถัดไป คุณสามารถเลือกเพิ่มไฟล์ที่เปลี่ยนแปลงแล้วไปยัง staging area ได้ด้วยคำสั่ง `git add`.

### การเพิ่มไฟล์ไปยัง Staging Area
- **เพิ่มไฟล์เฉพาะไฟล์:**
```bash
git add <file>
```

- **เพิ่มไฟล์ทั้งหมด:**
```bash
git add .
```

### การลบไฟล์ออกจาก Staging Area
หากคุณเพิ่มไฟล์เข้า staging area แล้วแต่ต้องการยกเลิก ให้ใช้คำสั่ง:
```bash
git restore --staged <file>
```

### ตัวอย่างการใช้งาน
```bash
git add example.txt
git status
```
ผลลัพธ์จะเปลี่ยนสถานะของไฟล์จาก `Changes not staged for commit` เป็น `Changes to be committed`:

```plaintext
Changes to be committed:
  (use "git restore --staged <file>..." to unstage)

        modified:   example.txt
```

## 3. สรุปขั้นตอนการใช้งาน Git Status และ Staging Area
1. ใช้ `git status` เพื่อตรวจสอบสถานะของไฟล์
2. ใช้ `git add` เพื่อเพิ่มไฟล์ที่ต้องการเข้าสู่ staging area
3. ใช้ `git restore --staged` เพื่อลบไฟล์ออกจาก staging area หากต้องการ

## สรุป
Git Status และ Staging Area ช่วยให้คุณจัดการการเปลี่ยนแปลงในโครงการได้อย่างมีระเบียบ คุณสามารถตรวจสอบสถานะไฟล์และเตรียมไฟล์สำหรับการ commit ได้อย่างง่ายดาย ซึ่งเป็นพื้นฐานที่สำคัญในการใช้งาน Git อย่างมีประสิทธิภาพ
