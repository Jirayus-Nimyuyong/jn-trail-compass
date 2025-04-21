# Introduction to Git

Git เป็นระบบควบคุมเวอร์ชัน (Version Control System - VCS) ที่ช่วยให้ผู้พัฒนาสามารถติดตามการเปลี่ยนแปลงของไฟล์ในโครงการ และทำงานร่วมกับทีมได้อย่างมีประสิทธิภาพ

## คุณสมบัติของ Git
1. **Distributed Version Control**: เก็บข้อมูลโค้ดทั้งในเครื่องของผู้ใช้งานและบนเซิร์ฟเวอร์
2. **Branching and Merging**: สนับสนุนการแยกสาขา (Branch) และรวม (Merge) ได้ง่าย
3. **Fast and Efficient**: ทำงานได้รวดเร็วและมีประสิทธิภาพสูง
4. **Support for Collaboration**: เหมาะสำหรับการทำงานร่วมกันในทีม

## คำสั่งพื้นฐานของ Git

### 1. การตั้งค่าเริ่มต้น
ก่อนเริ่มต้นใช้งาน Git คุณต้องตั้งค่าชื่อผู้ใช้และอีเมล:
```bash
git config --global user.name "Your Name"
git config --global user.email "your.email@example.com"
```

### 2. การสร้างหรือเริ่มต้นโครงการ
- **สร้าง repository ใหม่ในเครื่อง:**
```bash
git init
```
- **โคลน repository จากระยะไกล:**
```bash
git clone <repository-url>
```

### 3. การติดตามการเปลี่ยนแปลง
- **ดูสถานะของไฟล์:**
```bash
git status
```
- **เพิ่มไฟล์เข้าสู่ staging area:**
```bash
git add <file>
```
- **บันทึกการเปลี่ยนแปลงใน repository:**
```bash
git commit -m "ข้อความอธิบายการเปลี่ยนแปลง"
```

### 4. การทำงานร่วมกับ Remote Repository
- **เชื่อมต่อ repository ระยะไกล:**
```bash
git remote add origin <repository-url>
```
- **ส่งการเปลี่ยนแปลงไปยัง remote repository:**
```bash
git push origin <branch-name>
```
- **ดึงการเปลี่ยนแปลงจาก remote repository:**
```bash
git pull origin <branch-name>
```

### 5. การจัดการสาขา (Branch)
- **สร้างสาขาใหม่:**
```bash
git branch <branch-name>
```
- **สลับไปยังสาขาใหม่:**
```bash
git checkout <branch-name>
```
- **รวมสาขา (Merge):**
```bash
git merge <branch-name>
```

### 6. การตรวจสอบประวัติ
- **ดูประวัติการเปลี่ยนแปลง:**
```bash
git log
```

## การทำงานร่วมกับทีม
การใช้ Git อย่างมีประสิทธิภาพช่วยให้การทำงานร่วมกันง่ายขึ้น โดยสามารถตรวจสอบและแก้ไขปัญหาความขัดแย้ง (Conflict) ระหว่างการรวมโค้ดได้ง่าย

## สรุป
Git เป็นเครื่องมือสำคัญสำหรับการพัฒนาโปรเจกต์ที่ต้องการการจัดการเวอร์ชันและการทำงานร่วมกันในทีม การเรียนรู้คำสั่งพื้นฐานและการใช้งานจะช่วยให้คุณเริ่มต้นใช้งาน Git ได้อย่างมั่นใจ
