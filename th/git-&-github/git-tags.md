# Git Tags

Git tags ใช้เพื่อสร้างเครื่องหมายในประวัติการเปลี่ยนแปลง (history) ของ repository ที่ช่วยระบุจุดสำคัญ เช่น การออกเวอร์ชันซอฟต์แวร์ใหม่ Git tags สามารถช่วยให้เรากลับไปยังจุดที่กำหนดได้ง่ายๆ และยังช่วยในการจัดการ release ต่างๆ ของโปรเจกต์

---

## ประเภทของ Git Tags

1. **Lightweight Tags**
   - เป็น tag ที่ง่ายและไม่มี metadata เพิ่มเติมนอกจาก commit ID ที่เชื่อมโยง
   - ใช้สำหรับการ tag อย่างง่ายและไม่ต้องการข้อมูลเพิ่มเติม

2. **Annotated Tags**
   - มี metadata เพิ่มเติม เช่น ชื่อผู้สร้าง tag วันที่ และข้อความอธิบาย
   - เก็บเป็นวัตถุ (object) ใน Git database ทำให้มีความยืดหยุ่นมากกว่า

---

## การสร้าง Git Tags

### 1. Lightweight Tag
สร้าง tag แบบ lightweight โดยใช้คำสั่ง:
```bash
git tag <tag_name>
```
ตัวอย่าง:
```bash
git tag v1.0.0
```

### 2. Annotated Tag
สร้าง tag แบบ annotated พร้อมเพิ่มข้อความอธิบาย:
```bash
git tag -a <tag_name> -m "Tag message"
```
ตัวอย่าง:
```bash
git tag -a v1.0.0 -m "Initial release"
```

---

## การดูรายการ Git Tags
แสดงรายการ tag ทั้งหมดใน repository:
```bash
git tag
```

ดูรายละเอียดของ tag แบบ annotated:
```bash
git show <tag_name>
```
ตัวอย่าง:
```bash
git show v1.0.0
```

---

## การแชร์ Tags ไปยัง Remote Repository

Tag ที่สร้างขึ้นในเครื่องจะไม่ถูก push ไปยัง remote โดยอัตโนมัติ คุณต้อง push tag โดยใช้คำสั่งต่อไปนี้:

### Push Tag เดี่ยว:
```bash
git push origin <tag_name>
```
ตัวอย่าง:
```bash
git push origin v1.0.0
```

### Push Tags ทั้งหมด:
```bash
git push origin --tags
```

---

## การลบ Git Tags

### ลบ Tag ในเครื่อง:
```bash
git tag -d <tag_name>
```
ตัวอย่าง:
```bash
git tag -d v1.0.0
```

### ลบ Tag ใน Remote:
1. ลบ tag ในเครื่อง:
   ```bash
   git tag -d <tag_name>
   ```
2. ลบ tag ใน remote:
   ```bash
   git push origin --delete <tag_name>
   ```
ตัวอย่าง:
```bash
git push origin --delete v1.0.0
```

---

## การใช้งาน Git Tags สำหรับ Release
Git tags ช่วยให้การจัดการ release ง่ายขึ้น โดยสามารถใช้ tag เพื่อสร้าง release บนแพลตฟอร์มอย่าง GitHub หรือ GitLab ได้ ตัวอย่าง:

1. สร้าง tag เช่น `v1.0.0`:
   ```bash
   git tag -a v1.0.0 -m "Initial release"
   ```

2. Push tag ไปยัง remote:
   ```bash
   git push origin v1.0.0
   ```

3. ไปที่ GitHub/GitLab และสร้าง release โดยอ้างอิง tag ที่สร้างไว้

---

## แนวทางปฏิบัติที่ดีที่สุดสำหรับ Git Tags

- ใช้ **Semantic Versioning** (เช่น v1.0.0, v1.1.0, v2.0.0) เพื่อให้ง่ายต่อการจัดการเวอร์ชัน
- ใช้ **Annotated Tags** สำหรับการ release หรือเหตุการณ์สำคัญที่ต้องการ metadata
- เพิ่มข้อความอธิบาย tag เพื่อให้เข้าใจจุดประสงค์ได้ง่ายขึ้น
- Push tag ไปยัง remote เพื่อให้ทีมสามารถเข้าถึงได้

Git tags เป็นเครื่องมือที่ทรงพลังสำหรับการจัดการและติดตาม release ในโครงการของคุณ การใช้งาน tags อย่างเหมาะสมจะช่วยให้ทีมพัฒนาทำงานได้อย่างเป็นระบบมากขึ้น

