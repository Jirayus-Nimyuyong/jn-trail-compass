# Git Rebase

Git Rebase เป็นเครื่องมือที่ใช้ในการจัดการ commit history โดยสามารถรวมการเปลี่ยนแปลงจาก branch หนึ่งไปยังอีก branch หนึ่งในลักษณะที่ทำให้ประวัติ commit ดูเรียบร้อยและเข้าใจง่าย

## 1. ความแตกต่างระหว่าง Git Rebase และ Git Merge
- **Git Merge**: รวม commit history ของ branch ต่าง ๆ โดยสร้าง commit ใหม่สำหรับการ merge
- **Git Rebase**: ย้าย commit จาก branch หนึ่งไปยังอีก branch หนึ่ง โดย "เขียนใหม่" ประวัติของ commit

| Feature           | Git Merge                  | Git Rebase              |
|-------------------|----------------------------|--------------------------|
| ประวัติการเปลี่ยนแปลง | เก็บประวัติทั้งหมด             | เขียนประวัติใหม่          |
| ใช้งาน            | ง่ายต่อการติดตามในทีม         | ใช้เพื่อปรับปรุง commit history |

## 2. การใช้ Git Rebase

### 2.1 Rebase Branch
ย้าย commit ของ branch หนึ่งไปยัง base branch:
```bash
git checkout feature/login
git rebase main
```
ในตัวอย่างนี้ `feature/login` จะถูก "เขียนใหม่" โดยใช้ `main` เป็นฐาน

### 2.2 Interactive Rebase
ใช้ `--interactive` เพื่อปรับแต่ง commit history:
```bash
git rebase -i HEAD~3
```
คำสั่งนี้จะเปิดหน้าต่างให้คุณปรับแต่ง commit ล่าสุด 3 รายการ

ตัวอย่างการปรับแต่งใน interactive rebase:
```plaintext
pick 1234567 เพิ่มฟีเจอร์ A
squash 89abcde แก้ไขฟีเจอร์ A
reword fghijkl ปรับข้อความ commit
```
- `pick`: เก็บ commit ไว้
- `squash`: รวม commit เข้ากับ commit ก่อนหน้า
- `reword`: แก้ไขข้อความ commit

### 2.3 การแก้ไข Conflict ระหว่าง Rebase
หากเกิด conflict ระหว่างการ rebase:
1. ตรวจสอบไฟล์ที่มีปัญหา:
   ```bash
   git status
   ```
2. แก้ไขไฟล์ที่มี conflict
3. เพิ่มไฟล์เข้า staging area:
   ```bash
   git add <ชื่อไฟล์>
   ```
4. ดำเนินการ rebase ต่อ:
   ```bash
   git rebase --continue
   ```
หากต้องการยกเลิก rebase:
```bash
git rebase --abort
```

## 3. การใช้ Rebase เพื่อดึงการเปลี่ยนแปลงล่าสุด
ใช้ rebase เพื่อดึงการเปลี่ยนแปลงจาก branch ปลายทาง:
```bash
git checkout feature/login
git pull --rebase origin main
```

## 4. การป้องกันปัญหาจาก Git Rebase
- หลีกเลี่ยงการ rebase branch ที่แชร์กับคนอื่น
- ใช้ rebase บน branch ส่วนตัวหรือ branch ที่ยังไม่ได้ push เท่านั้น

## 5. ข้อดีของ Git Rebase
- ทำให้ commit history เรียบร้อยและอ่านง่าย
- ลดจำนวน merge commit ใน repository

## 6. ข้อควรระวัง
- การใช้ rebase เขียนประวัติใหม่ ซึ่งอาจสร้างปัญหาใน branch ที่แชร์กับทีม
- หาก rebase branch ที่มีการ push ไปแล้ว ให้ใช้ `git push --force` ซึ่งอาจลบการเปลี่ยนแปลงของคนอื่นได้

## สรุป
Git Rebase เป็นเครื่องมือที่ทรงพลังในการจัดการ commit history แต่ต้องใช้อย่างระมัดระวังและเหมาะสมกับสถานการณ์ เพื่อหลีกเลี่ยงความสับสนในทีมพัฒนา
