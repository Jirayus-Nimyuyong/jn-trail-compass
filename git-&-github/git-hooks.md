# การใช้งาน Git Hooks

Git Hooks เป็นสคริปต์ที่สามารถกำหนดให้รันโดยอัตโนมัติเมื่อเกิดเหตุการณ์บางอย่างใน Git เช่น การ commit, push หรือ merge สคริปต์เหล่านี้ช่วยให้คุณสามารถปรับแต่งและเพิ่มกระบวนการต่าง ๆ ในการทำงานของ Git ได้

---

## ประเภทของ Git Hooks

Git Hooks แบ่งออกเป็น 2 ประเภทหลัก:

1. **Client-Side Hooks**
   - ใช้สำหรับกระบวนการที่ทำงานในเครื่องของผู้พัฒนา เช่น การตรวจสอบโค้ดก่อน commit หรือการป้องกัน push
   - ตัวอย่าง:
     - `pre-commit`: รันก่อนที่ commit จะถูกสร้างขึ้น
     - `prepare-commit-msg`: รันก่อนที่ข้อความ commit จะถูกแก้ไขหรือบันทึก
     - `pre-push`: รันก่อนที่จะ push ไปยัง remote repository

2. **Server-Side Hooks**
   - ใช้ใน repository บนเซิร์ฟเวอร์สำหรับการจัดการเหตุการณ์ เช่น การตรวจสอบก่อนที่จะรับ push หรือการจัดการกระบวนการต่าง ๆ หลัง push
   - ตัวอย่าง:
     - `pre-receive`: รันก่อนที่จะยอมรับ push
     - `post-receive`: รันหลังจาก push เสร็จสิ้น
     - `update`: รันเมื่อ branch หรือ ref ถูกอัปเดต

---

## การตั้งค่า Git Hooks

1. **ค้นหาไดเรกทอรี Hooks**
   - ไดเรกทอรี `hooks` อยู่ภายใต้ `.git` ใน repository ของคุณ:
     ```bash
     cd .git/hooks
     ```

2. **สร้างหรือแก้ไข Hook**
   - ไฟล์ hook จะต้องไม่มีนามสกุล และต้องมีสิทธิ์ในการรันเป็น executable:
     ```bash
     touch pre-commit
     chmod +x pre-commit
     ```

3. **เขียนสคริปต์ใน Hook**
   - ตัวอย่างการตรวจสอบว่าโค้ดไม่มีข้อผิดพลาดก่อน commit:
     ```bash
     #!/bin/sh

     # รันคำสั่ง lint
     npm run lint

     if [ $? -ne 0 ]; then
       echo "Linting failed. Commit aborted."
       exit 1
     fi

     exit 0
     ```

4. **ทดสอบ Hook**
   - ลอง commit หรือ push เพื่อดูว่า hook ทำงานตามที่คาดหวังหรือไม่

---

## ตัวอย่าง Git Hooks ที่พบบ่อย

### 1. `pre-commit`
   - ตรวจสอบโค้ดก่อน commit:
     ```bash
     #!/bin/sh

     echo "Running pre-commit checks..."
     npm test
     ```

### 2. `prepare-commit-msg`
   - เพิ่มข้อความเริ่มต้นใน commit message:
     ```bash
     #!/bin/sh

     echo "[PREFIX] " > $1
     cat $1
     ```

### 3. `pre-push`
   - ป้องกัน push หากการทดสอบล้มเหลว:
     ```bash
     #!/bin/sh

     echo "Running tests before pushing..."
     npm test

     if [ $? -ne 0 ]; then
       echo "Tests failed. Push aborted."
       exit 1
     fi

     exit 0
     ```

### 4. `post-merge`
   - ติดตั้ง dependencies หลังจาก merge:
     ```bash
     #!/bin/sh

     echo "Installing dependencies..."
     npm install
     ```

---

## ข้อควรระวังในการใช้ Git Hooks

1. **ไม่ควรบังคับใช้ Hook ในทีม**
   - Hooks ที่กำหนดในเครื่องของคุณจะไม่ถูกแชร์ไปยังสมาชิกทีม ดังนั้นอย่าพึ่งพา hooks สำหรับกระบวนการสำคัญ เช่น การตรวจสอบโค้ด

2. **จัดเก็บ Hook ในที่ที่เข้าถึงได้**
   - ใช้เครื่องมืออย่าง Husky หรือกำหนดโครงสร้างที่ช่วยให้ทุกคนในทีมสามารถติดตั้ง hooks ได้ง่าย

3. **ตรวจสอบประสิทธิภาพ**
   - อย่าเขียน hook ที่ทำงานช้าจนเกินไป เพราะอาจทำให้กระบวนการพัฒนาเสียเวลา

---

Git Hooks เป็นเครื่องมือที่มีประสิทธิภาพสำหรับการเพิ่มกระบวนการอัตโนมัติและการควบคุมคุณภาพใน workflow ของ Git หากใช้อย่างถูกต้องจะช่วยให้การพัฒนาซอฟต์แวร์ราบรื่นและมีประสิทธิภาพมากขึ้น

