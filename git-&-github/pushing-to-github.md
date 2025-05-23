# การอัปโหลด Repository ท้องถิ่นไปยัง GitHub

GitHub เป็นแพลตฟอร์มที่ช่วยให้คุณสามารถจัดเก็บและแชร์โค้ดของคุณกับผู้อื่น รวมถึงการทำงานร่วมกันอย่างง่ายดาย การอัปโหลดโค้ดจากเครื่องของคุณไปยัง GitHub เป็นกระบวนการสำคัญที่ทำให้โครงการของคุณพร้อมใช้งานบนคลาวด์และเปิดให้ผู้คนร่วมพัฒนาได้

---

## ขั้นตอนการอัปโหลด Repository ไปยัง GitHub

### 1. **เตรียมโครงการในเครื่องของคุณ**
   - สร้างโฟลเดอร์สำหรับโครงการใหม่ หรือใช้โครงการที่มีอยู่แล้ว
   - เปิด Terminal หรือ Command Prompt และนำทางไปยังโฟลเดอร์โครงการของคุณ

### 2. **เริ่มต้น Git ในโฟลเดอร์โครงการ**
   - ใช้คำสั่งต่อไปนี้เพื่อเริ่มต้น Git:
     ```bash
     git init
     ```
   - คำสั่งนี้จะสร้างโฟลเดอร์ `.git` ที่เก็บข้อมูลเกี่ยวกับเวอร์ชันของโค้ด

### 3. **เพิ่มไฟล์ในโครงการของคุณลงใน Git**
   - เพิ่มไฟล์ทั้งหมด:
     ```bash
     git add .
     ```
   - หรือเพิ่มไฟล์เฉพาะ:
     ```bash
     git add <ชื่อไฟล์>
     ```

### 4. **สร้าง Commit แรก**
   - ใช้คำสั่งนี้เพื่อบันทึกการเปลี่ยนแปลงในโครงการ:
     ```bash
     git commit -m "Initial commit"
     ```

### 5. **สร้าง Repository ใหม่บน GitHub**
   - ไปที่ [GitHub](https://github.com) และเข้าสู่ระบบ
   - คลิกที่ปุ่ม "+" (มุมขวาบน) และเลือก **New repository**
   - กรอกข้อมูล เช่น ชื่อ repository และตั้งค่าเป็น **Public** หรือ **Private** ตามต้องการ
   - คลิก **Create repository**

### 6. **เชื่อมโยง Repository ท้องถิ่นกับ GitHub**
   - คัดลอก URL ของ repository ใหม่จากหน้า GitHub
   - ใช้คำสั่งนี้เพื่อเชื่อมโยง repository:
     ```bash
     git remote add origin <repository-url>
     ```
   - ตรวจสอบว่าการเชื่อมโยงสำเร็จโดยใช้คำสั่ง:
     ```bash
     git remote -v
     ```

### 7. **Push โค้ดไปยัง GitHub**
   - ใช้คำสั่งนี้เพื่ออัปโหลดโค้ด:
     ```bash
     git push -u origin main
     ```
   - หาก branch หลักของคุณชื่อ `master` ให้เปลี่ยน `main` เป็น `master`

---

## คำสั่งที่ใช้บ่อย

| คำสั่ง                           | คำอธิบาย                                      |
|-----------------------------------|------------------------------------------------|
| `git init`                        | เริ่มต้น repository ในเครื่อง                 |
| `git add .`                       | เพิ่มไฟล์ทั้งหมดลงใน staging area             |
| `git commit -m "message"`        | บันทึกการเปลี่ยนแปลงใน repository            |
| `git remote add origin <url>`     | เชื่อมโยง repository ท้องถิ่นกับ GitHub       |
| `git push -u origin <branch>`     | Push โค้ดไปยัง branch ที่ระบุใน GitHub         |
| `git status`                      | ตรวจสอบสถานะของไฟล์ใน repository              |

---

การอัปโหลดโค้ดของคุณไปยัง GitHub ไม่เพียงช่วยให้โค้ดของคุณปลอดภัย แต่ยังเปิดโอกาสให้คุณทำงานร่วมกับนักพัฒนาคนอื่นๆ และจัดการโครงการของคุณได้อย่างมีประสิทธิภาพ หากคุณพร้อมแล้ว ลองเริ่มต้นและสนุกกับการใช้งาน GitHub ได้เลย!

