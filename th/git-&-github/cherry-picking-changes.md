# Cherry-picking Changes

Cherry-picking เป็นกระบวนการที่ใช้ในการดึง commit เฉพาะจาก branch หนึ่งมาใช้ในอีก branch หนึ่งโดยไม่ต้องรวม (merge) branch ทั้งหมด กระบวนการนี้มีประโยชน์อย่างมากในกรณีที่คุณต้องการดึงการเปลี่ยนแปลงเฉพาะส่วนเข้ามาใน branch ปัจจุบัน เช่น การแก้ไขข้อผิดพลาดที่สำคัญหรือการปรับปรุงเฉพาะส่วน

---

## ประโยชน์ของ Cherry-picking

1. **ดึงการเปลี่ยนแปลงเฉพาะส่วน:** เลือก commit ที่ต้องการโดยไม่ต้องนำการเปลี่ยนแปลงที่ไม่เกี่ยวข้องเข้ามา
2. **ช่วยในสถานการณ์ฉุกเฉิน:** สามารถดึง patch หรือการแก้ไขข้อผิดพลาดสำคัญได้ทันที
3. **ควบคุมประวัติการเปลี่ยนแปลง:** ให้คุณเลือก commit ที่จะเพิ่มเข้าไปใน branch ปัจจุบันได้อย่างแม่นยำ

---

## คำสั่ง Git ที่เกี่ยวข้องกับ Cherry-picking

| คำสั่ง                          | คำอธิบาย                                                       |
|--------------------------------|----------------------------------------------------------------|
| `git cherry-pick <commit-hash>` | ดึง commit เฉพาะที่ระบุด้วย hash เข้ามาใน branch ปัจจุบัน    |
| `git log`                      | ดูประวัติ commit เพื่อค้นหา hash ของ commit ที่ต้องการ        |
| `git cherry-pick --abort`      | ยกเลิก cherry-pick ที่กำลังดำเนินการ                            |
| `git cherry-pick --continue`   | ดำเนินการ cherry-pick ต่อในกรณีที่ต้องแก้ไขความขัดแย้ง (conflict) |

---

## การใช้งาน Cherry-picking

### 1. ค้นหา Commit ที่ต้องการ
ใช้คำสั่ง `git log` เพื่อดูประวัติ commit และค้นหา hash ของ commit ที่ต้องการ cherry-pick:

```bash
git log
```

ตัวอย่าง output:

```
commit abcd1234
Author: Jirayus
Date:   Thu Jan 17 14:25:33 2025

    แก้ไขข้อผิดพลาดในฟังก์ชันการคำนวณ
```

ในที่นี้ hash ของ commit คือ `abcd1234`

---

### 2. Cherry-pick Commit
ใช้คำสั่ง `git cherry-pick` ตามด้วย hash ของ commit ที่ต้องการ:

```bash
git cherry-pick abcd1234
```

ผลลัพธ์:

```
[branch-name abc123] แก้ไขข้อผิดพลาดในฟังก์ชันการคำนวณ
 1 file changed, 10 insertions(+), 2 deletions(-)
```

---

### 3. จัดการความขัดแย้ง (Conflict)
หากเกิด conflict ระหว่าง cherry-pick จะมีข้อความแจ้งเตือนดังนี้:

```
error: could not apply abcd1234... แก้ไขข้อผิดพลาดในฟังก์ชันการคำนวณ
hint: Resolve all conflicts manually, mark them as resolved with
hint: "git add <file>", then run "git cherry-pick --continue".
```

#### วิธีแก้ไข:
1. เปิดไฟล์ที่มี conflict และแก้ไขด้วยตัวเอง
2. เพิ่มไฟล์ที่แก้ไขแล้วด้วยคำสั่ง:

   ```bash
   git add <file>
   ```

3. ดำเนินการ cherry-pick ต่อด้วยคำสั่ง:

   ```bash
   git cherry-pick --continue
   ```

หากต้องการยกเลิก cherry-pick ให้ใช้:

```bash
git cherry-pick --abort
```

---

## ตัวอย่างสถานการณ์

### สถานการณ์:
คุณมี branch `development` และ `main` และต้องการดึง commit เฉพาะที่แก้ไขข้อผิดพลาดจาก branch `development` ไปยัง `main`

#### ขั้นตอน:
1. สลับไปยัง branch `main`:

   ```bash
   git checkout main
   ```

2. ใช้ cherry-pick เพื่อดึง commit:

   ```bash
   git cherry-pick abcd1234
   ```

---

## แนวทางปฏิบัติที่ดีที่สุด

1. **ตรวจสอบความถูกต้องของ commit:** ตรวจสอบ commit ที่ต้องการ cherry-pick เพื่อหลีกเลี่ยงการดึงการเปลี่ยนแปลงที่ไม่ต้องการ
2. **แก้ไข conflict อย่างรอบคอบ:** หากเกิด conflict ให้ตรวจสอบและแก้ไขอย่างละเอียด
3. **หลีกเลี่ยง cherry-pick ซ้ำ:** ใช้คำสั่ง `git log` เพื่อตรวจสอบว่า commit นั้นถูกดึงมาแล้วหรือไม่
4. **รักษาประวัติ commit ให้สะอาด:** เขียนข้อความ commit ที่ชัดเจนเพื่อบันทึกเหตุผลของการ cherry-pick

---

Cherry-picking เป็นเครื่องมือที่ทรงพลังที่ช่วยให้คุณจัดการกับการเปลี่ยนแปลงเฉพาะส่วนในโค้ดได้อย่างมีประสิทธิภาพ เมื่อใช้อย่างระมัดระวัง จะช่วยเพิ่มความยืดหยุ่นและความคล่องตัวในการพัฒนาโครงการของคุณ

