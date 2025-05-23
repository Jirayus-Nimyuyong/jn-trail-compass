# บทนำสู่ GitHub

GitHub เป็นแพลตฟอร์มที่ใช้บนเว็บซึ่งพัฒนาขึ้นจาก Git ซึ่งเป็นระบบควบคุมเวอร์ชัน (Version Control System) เพื่อจัดการและทำงานร่วมกันในโครงการซอฟต์แวร์ มันมีเครื่องมือที่ช่วยให้นักพัฒนาทำงานร่วมกัน ติดตามการเปลี่ยนแปลงในโค้ด และโฮสต์ repository บนคลาวด์ ไม่ว่าคุณจะทำงานคนเดียวหรือเป็นทีม GitHub ช่วยให้การควบคุมเวอร์ชันและการทำงานร่วมกันง่ายขึ้น

---

## คุณสมบัติหลักของ GitHub

1. **Repositories**
   - Repository (หรือ "repo") คือที่เก็บไฟล์โครงการของคุณและประวัติการแก้ไขทั้งหมด
   - Repository แบบสาธารณะ (Public) สามารถเข้าถึงได้โดยทุกคน ในขณะที่ Repository แบบส่วนตัว (Private) จะเข้าถึงได้เฉพาะผู้ใช้งานที่กำหนดเท่านั้น

2. **Branches**
   - Branch ช่วยให้คุณสร้างเวอร์ชันแยกของโค้ดเพื่อการทดสอบและพัฒนาโดยไม่กระทบต่อโค้ดหลัก
   - Branch ที่พบบ่อย ได้แก่:
     - `main` หรือ `master`: เป็น branch หลัก
     - Branch สำหรับฟีเจอร์: ใช้สำหรับพัฒนาฟีเจอร์เฉพาะ

3. **Pull Requests (PRs)**
   - PRs เป็นวิธีการเสนอและพูดคุยเกี่ยวกับการเปลี่ยนแปลงโค้ด
   - สมาชิกทีมสามารถรีวิว แสดงความคิดเห็น และอนุมัติการเปลี่ยนแปลงก่อนการผสาน (merge) ลงใน branch หลัก

4. **Commits**
   - Commit คือ snapshot ของโค้ดในช่วงเวลาหนึ่ง โดยแต่ละ commit จะมี ID เฉพาะ ข้อความอธิบายการเปลี่ยนแปลง และการปรับปรุงที่เกิดขึ้นจริง

5. **Issues**
   - Issues ใช้เพื่อติดตามงาน การปรับปรุง ข้อบกพร่อง หรืองานอื่นๆ ที่เกี่ยวข้องกับโครงการของคุณ

6. **Actions**
   - GitHub Actions ช่วยให้อัตโนมัติเช่นการรันการทดสอบหรือการปรับใช้โค้ดเมื่อเกิดเหตุการณ์บางอย่าง (เช่น การ push โค้ดลง branch)

7. **Wiki**
   - Wiki ช่วยให้คุณสร้างเอกสารเกี่ยวกับโครงการและให้รายละเอียดสำหรับนักพัฒนาและผู้ใช้

---

## เริ่มต้นใช้งาน GitHub

### 1. **สร้างบัญชี GitHub**
   - สมัครใช้งานที่ [github.com](https://github.com)
   - เลือกชื่อผู้ใช้และสร้างโปรไฟล์ของคุณ

### 2. **สร้าง Repository**
   1. คลิกปุ่ม "+" ที่มุมขวาบนและเลือก **New repository**
   2. ใส่ชื่อสำหรับ repository ของคุณ
   3. ตัดสินใจว่าจะเป็นแบบสาธารณะหรือส่วนตัว
   4. เพิ่มไฟล์ README (ตัวเลือกเสริม)

### 3. **โคลน Repository**
   - หากคุณต้องการทำงานบน repository ในเครื่องของคุณ ให้โคลนลงเครื่อง:
     ```bash
     git clone <repository-url>
     ```

### 4. **แก้ไขและ Commit การเปลี่ยนแปลง**
   - แก้ไขไฟล์ใน repository บนเครื่องของคุณ
   - จัดเตรียมการเปลี่ยนแปลง:
     ```bash
     git add .
     ```
   - Commit การเปลี่ยนแปลง:
     ```bash
     git commit -m "ข้อความการ commit ของคุณ"
     ```

### 5. **Push การเปลี่ยนแปลงไปยัง GitHub**
   - อัปโหลดการเปลี่ยนแปลงของคุณไปยัง repository บน GitHub:
     ```bash
     git push origin <branch-name>
     ```

### 6. **ทำงานร่วมกันด้วย Pull Request**
   1. สร้าง branch ใหม่สำหรับฟีเจอร์หรือการแก้ไขของคุณ:
      ```bash
      git checkout -b <branch-name>
      ```
   2. Push branch ไปยัง GitHub:
      ```bash
      git push origin <branch-name>
      ```
   3. เปิด pull request บน GitHub เพื่อเสนอการผสานการเปลี่ยนแปลงของคุณ

---

## คำสั่ง GitHub ที่พบบ่อย

| คำสั่ง                            | คำอธิบาย                                      |
|----------------------------------|--------------------------------------------------|
| `git clone <repo-url>`           | โคลน repository ลงในเครื่องของคุณ             |
| `git add <file>`                 | จัดเตรียมการเปลี่ยนแปลงสำหรับ commit          |
| `git commit -m "message"`        | สร้าง commit ใหม่พร้อมข้อความ                  |
| `git push origin <branch>`       | Push การเปลี่ยนแปลงไปยัง repository ระยะไกล    |
| `git pull origin <branch>`       | ดึงการเปลี่ยนแปลงจาก repository ระยะไกล       |
| `git branch`                     | แสดงรายการ branch ใน repository               |
| `git checkout <branch>`          | สลับไปยัง branch อื่น                          |
| `git merge <branch>`             | รวม branch หนึ่งเข้ากับ branch ปัจจุบัน        |

---

## แนวทางปฏิบัติที่ดีที่สุดสำหรับการใช้ GitHub

1. **เขียนข้อความ Commit อย่างชัดเจน**
   - ทำให้ข้อความ commit ชัดเจนและกระชับเพื่ออธิบายสิ่งที่เปลี่ยนแปลงและเหตุผล

2. **ใช้ Branch อย่างมีประสิทธิภาพ**
   - รักษา branch `main` ให้คงที่และสามารถปรับใช้ได้
   - สร้าง branch แยกสำหรับฟีเจอร์ การแก้ไขข้อผิดพลาด หรือการทดลอง

3. **รีวิวโค้ดอย่างละเอียด**
   - ใช้ pull request สำหรับการรีวิวจากเพื่อนร่วมทีมเพื่อรักษาคุณภาพของโค้ด

4. **จัดทำเอกสารโครงการของคุณ**
   - จัดทำไฟล์ README ให้ครบถ้วน
   - ใช้ Wiki เพื่อเอกสารข้อมูลเชิงลึก

5. **ทำงานอัตโนมัติด้วย Workflows**
   - ใช้ GitHub Actions เพื่อทำให้งานต่างๆ เช่น การทดสอบและการปรับใช้อัตโนมัติ

---

GitHub ช่วยให้นักพัฒนาสามารถทำงานร่วมกันได้อย่างมีประสิทธิภาพ รักษาคุณภาพโค้ด และปรับปรุงกระบวนการพัฒนา ด้วยเครื่องมือและฟีเจอร์ที่หลากหลาย GitHub ได้กลายเป็นแกนหลักของการพัฒนาซอฟต์แวร์ในยุคปัจจุบัน

