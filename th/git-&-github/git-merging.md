# Git Merging

Git Merging เป็นกระบวนการรวมการเปลี่ยนแปลงจาก branch หนึ่งไปยังอีก branch หนึ่งใน repository โดยทั่วไปมักใช้เพื่อรวมการพัฒนาจาก branch ย่อย (feature branch) เข้าสู่ branch หลัก (main/master)

## 1. ประเภทของ Merge
1. **Fast-Forward Merge**
   - ใช้เมื่อ branch ปลายทาง (เช่น `main`) ไม่มี commit ใหม่ที่แตกต่างจาก branch ต้นทาง
   - การ merge จะเลื่อน pointer ของ branch ปลายทางไปยัง commit ล่าสุดของ branch ต้นทาง

2. **Three-Way Merge**
   - ใช้เมื่อ branch ปลายทางและ branch ต้นทางมี commit ใหม่ที่แตกต่างกัน
   - Git จะสร้าง commit ใหม่ที่รวมการเปลี่ยนแปลงจากทั้งสอง branch

## 2. การทำ Merge

### Fast-Forward Merge
```bash
git checkout main
git merge feature/login
```
ในกรณีนี้ pointer ของ `main` จะเลื่อนไปยัง commit ล่าสุดของ `feature/login`

### Three-Way Merge
```bash
git checkout main
git merge feature/login
```
หากมี commit ใหม่ในทั้งสอง branch Git จะสร้าง commit ใหม่เพื่อรวมการเปลี่ยนแปลงเข้าด้วยกัน

## 3. Merge Conflict

**Merge Conflict** เกิดขึ้นเมื่อมีการเปลี่ยนแปลงในไฟล์เดียวกันใน branch ทั้งสอง Git ไม่สามารถรวมการเปลี่ยนแปลงได้โดยอัตโนมัติ คุณต้องแก้ไขความขัดแย้งด้วยตนเอง

### ขั้นตอนการแก้ไข Merge Conflict
1. ตรวจสอบไฟล์ที่มีความขัดแย้ง:
   ```bash
   git status
   ```
2. แก้ไขไฟล์ที่มีความขัดแย้ง โดย Git จะเพิ่มเครื่องหมายพิเศษในไฟล์ เช่น:
   ```plaintext
   <<<<<<< HEAD
   โค้ดใน branch ปลายทาง
   =======
   โค้ดใน branch ต้นทาง
   >>>>>>> feature/login
   ```
3. แก้ไขไฟล์ให้ถูกต้องตามที่ต้องการ แล้วบันทึกการเปลี่ยนแปลง
4. เพิ่มไฟล์ที่แก้ไขแล้วเข้า staging area:
   ```bash
   git add <ชื่อไฟล์>
   ```
5. ทำการ commit เพื่อบันทึกการแก้ไข:
   ```bash
   git commit
   ```

### ตัวอย่างการแก้ไข
สมมติว่าไฟล์ `example.txt` มี conflict:
```plaintext
<<<<<<< HEAD
ข้อความใน branch main
=======
ข้อความใน branch feature/login
>>>>>>>
```
แก้ไขเป็น:
```plaintext
ข้อความที่แก้ไขรวมจากทั้งสอง branch
```
แล้วทำตามขั้นตอนข้างต้นเพื่อบันทึกการแก้ไข

## 4. การยกเลิก Merge
หาก merge แล้วเกิดปัญหา คุณสามารถยกเลิก merge ได้:
- **ยกเลิก merge ที่ยังไม่ได้ commit:**
```bash
git merge --abort
```
- **ย้อนกลับ commit ที่เป็นผลจาก merge:**
```bash
git revert -m 1 <commit-hash>
```

## 5. การ Merge แบบไม่สร้าง Commit ใหม่
ใช้ `--squash` เพื่อรวมการเปลี่ยนแปลงแต่ไม่สร้าง commit ใหม่อัตโนมัติ:
```bash
git merge --squash feature/login
```
หลังจากนั้น คุณต้อง commit ด้วยตนเอง:
```bash
git commit -m "รวมการเปลี่ยนแปลงจาก feature/login"
```

## สรุป
Git Merging เป็นเครื่องมือสำคัญสำหรับการรวมการเปลี่ยนแปลงจาก branch ต่าง ๆ เข้าด้วยกัน โดยการจัดการความขัดแย้งและการเลือกประเภทของ merge ที่เหมาะสม จะช่วยให้การพัฒนาร่วมกันในทีมมีประสิทธิภาพมากยิ่งขึ้น
