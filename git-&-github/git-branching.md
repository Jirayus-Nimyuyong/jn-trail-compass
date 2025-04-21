# Working with Branches: Git Branching

Git Branching เป็นฟีเจอร์สำคัญที่ช่วยให้คุณสามารถจัดการการพัฒนาแบบคู่ขนานได้ โดยการแยกการพัฒนาในส่วนต่างๆ ออกจากกัน ทำให้การทำงานร่วมกันในทีมมีความยืดหยุ่นและมีประสิทธิภาพมากขึ้น

## 1. ความหมายของ Branch
Branch คือ "กิ่ง" หรือ "สายการพัฒนา" ที่คุณสามารถแยกออกจากสายหลัก (main/master) เพื่อพัฒนา ฟีเจอร์ หรือแก้ไขปัญหาโดยไม่กระทบกับโค้ดในสายหลัก

## 2. คำสั่งพื้นฐานเกี่ยวกับ Git Branching

### สร้าง Branch ใหม่
```bash
git branch <ชื่อ-branch>
```
ตัวอย่าง:
```bash
git branch feature/login
```

### ตรวจสอบ Branch ที่มีอยู่
```bash
git branch
```
ตัวอย่างผลลัพธ์:
```plaintext
* main
  feature/login
```
สัญลักษณ์ `*` แสดงว่าอยู่ใน branch ไหนในขณะนั้น

### สลับไปยัง Branch อื่น
```bash
git checkout <ชื่อ-branch>
```
ตัวอย่าง:
```bash
git checkout feature/login
```

### สร้างและสลับไปยัง Branch ใหม่ทันที
```bash
git checkout -b <ชื่อ-branch>
```
ตัวอย่าง:
```bash
git checkout -b feature/register
```

### ลบ Branch
- **ลบ Branch ที่ยังไม่ได้ merge:**
```bash
git branch -d <ชื่อ-branch>
```
- **ลบ Branch แบบบังคับ:**
```bash
git branch -D <ชื่อ-branch>
```

### ตรวจสอบ Branch แบบ Remote
```bash
git branch -r
```

## 3. การ Merge Branch
การ Merge คือการรวมการเปลี่ยนแปลงจาก Branch หนึ่งเข้าสู่ Branch ปัจจุบัน

### Merge แบบปกติ
```bash
git merge <ชื่อ-branch>
```
ตัวอย่าง:
```bash
git checkout main
git merge feature/login
```

### Merge Conflict
ในกรณีที่มีความขัดแย้งระหว่าง Branch คุณจะต้องแก้ไขไฟล์ที่ขัดแย้งและทำการ commit ใหม่:
1. แก้ไขไฟล์ที่ขัดแย้ง
2. เพิ่มไฟล์เข้า staging area:
   ```bash
   git add <ชื่อไฟล์>
   ```
3. ทำการ commit:
   ```bash
   git commit -m "แก้ไข merge conflict"
   ```

## 4. การ Push Branch ขึ้น Remote Repository

### Push Branch ใหม่
```bash
git push -u origin <ชื่อ-branch>
```
ตัวอย่าง:
```bash
git push -u origin feature/login
```

### Pull การเปลี่ยนแปลงจาก Remote
```bash
git pull origin <ชื่อ-branch>
```

## 5. การทำงานกับ Tracking Branch
Tracking Branch เป็น Branch ใน Local ที่ถูกตั้งค่าให้เชื่อมกับ Branch ใน Remote

### ตั้งค่า Tracking Branch
```bash
git branch --set-upstream-to=origin/<ชื่อ-branch>
```
ตัวอย่าง:
```bash
git branch --set-upstream-to=origin/feature/login
```

## สรุป
Git Branching ช่วยให้คุณจัดการการพัฒนาได้อย่างเป็นระบบ คุณสามารถแยกสายการทำงานออกจากกันเพื่อทดลอง พัฒนา หรือแก้ไขปัญหา และรวมการเปลี่ยนแปลงเมื่อเสร็จสิ้น การใช้งาน branch อย่างถูกวิธีจะช่วยให้การทำงานร่วมกันในทีมมีประสิทธิภาพและลดปัญหาความขัดแย้งในโค้ดได้อย่างมาก
