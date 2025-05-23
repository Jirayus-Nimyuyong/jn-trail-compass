# คำสั่งพื้นฐานใน Linux

## บทนำ

Linux เป็นระบบปฏิบัติการที่มีการใช้งานคำสั่งที่หลากหลายในการจัดการไฟล์, โฟลเดอร์, ระบบ, และกระบวนการต่าง ๆ คำสั่งเหล่านี้ทำให้คุณสามารถทำงานกับระบบได้อย่างมีประสิทธิภาพ ในบทนี้เราจะเรียนรู้เกี่ยวกับคำสั่งพื้นฐานที่ใช้บ่อยใน Linux

## 1. การจัดการไฟล์และไดเรกทอรี

### 1.1 `ls` - แสดงรายการไฟล์และไดเรกทอรี

คำสั่ง `ls` ใช้เพื่อแสดงรายการไฟล์และไดเรกทอรีในไดเรกทอรีปัจจุบัน

```bash
ls
```

ตัวเลือกที่นิยมใช้กับคำสั่ง `ls`:
- `ls -l`: แสดงรายละเอียดของไฟล์ (เช่น สิทธิ์การเข้าถึง, ขนาดไฟล์, วันเวลาที่แก้ไข)
- `ls -a`: แสดงไฟล์ที่ซ่อนอยู่
- `ls -lh`: แสดงรายละเอียดของไฟล์ในรูปแบบที่อ่านง่าย

### 1.2 `cd` - เปลี่ยนไดเรกทอรี

คำสั่ง `cd` ใช้เพื่อเปลี่ยนไดเรกทอรีที่ทำงานอยู่

```bash
cd /path/to/directory
```

คำสั่งนี้จะพาคุณไปยังไดเรกทอรีที่ระบุ

### 1.3 `pwd` - แสดงตำแหน่งที่ตั้งปัจจุบัน

คำสั่ง `pwd` ใช้เพื่อแสดงตำแหน่งที่ตั้งของไดเรกทอรีปัจจุบัน

```bash
pwd
```

### 1.4 `mkdir` - สร้างไดเรกทอรีใหม่

คำสั่ง `mkdir` ใช้ในการสร้างไดเรกทอรีใหม่

```bash
mkdir new_directory
```

### 1.5 `rmdir` - ลบไดเรกทอรีที่ว่างเปล่า

คำสั่ง `rmdir` ใช้ในการลบไดเรกทอรีที่ว่างเปล่า

```bash
rmdir empty_directory
```

### 1.6 `rm` - ลบไฟล์หรือไดเรกทอรี

คำสั่ง `rm` ใช้ในการลบไฟล์หรือไดเรกทอรี

```bash
rm file.txt
```

ตัวเลือกที่ใช้กับ `rm`:
- `rm -r`: ลบไดเรกทอรีและไฟล์ทั้งหมดภายใน
- `rm -f`: บังคับลบไฟล์โดยไม่แสดงคำเตือน

## 2. การจัดการไฟล์

### 2.1 `cp` - คัดลอกไฟล์หรือไดเรกทอรี

คำสั่ง `cp` ใช้ในการคัดลอกไฟล์หรือไดเรกทอรีจากที่หนึ่งไปยังที่อื่น

```bash
cp source_file destination
```

ตัวเลือกที่นิยมใช้กับคำสั่ง `cp`:
- `cp -r`: คัดลอกไดเรกทอรีและไฟล์ภายใน
- `cp -i`: ถามก่อนลบไฟล์ที่ซ้ำกัน

### 2.2 `mv` - ย้ายหรือเปลี่ยนชื่อไฟล์/ไดเรกทอรี

คำสั่ง `mv` ใช้ในการย้ายหรือเปลี่ยนชื่อไฟล์หรือไดเรกทอรี

```bash
mv old_name new_name
```

### 2.3 `cat` - แสดงเนื้อหาของไฟล์

คำสั่ง `cat` ใช้ในการแสดงเนื้อหาของไฟล์บนหน้าจอ

```bash
cat file.txt
```

### 2.4 `more` และ `less` - อ่านไฟล์ในลักษณะหน้าๆ

คำสั่ง `more` และ `less` ใช้เพื่อดูเนื้อหาของไฟล์ทีละหน้า

```bash
more file.txt
less file.txt
```

## 3. การจัดการผู้ใช้งาน

### 3.1 `whoami` - แสดงชื่อผู้ใช้ปัจจุบัน

คำสั่ง `whoami` ใช้เพื่อแสดงชื่อผู้ใช้ที่กำลังล็อกอินอยู่ในระบบ

```bash
whoami
```

### 3.2 `useradd` - เพิ่มผู้ใช้ใหม่

คำสั่ง `useradd` ใช้เพื่อเพิ่มผู้ใช้ใหม่ในระบบ

```bash
sudo useradd new_user
```

### 3.3 `passwd` - เปลี่ยนรหัสผ่านของผู้ใช้

คำสั่ง `passwd` ใช้เพื่อเปลี่ยนรหัสผ่านของผู้ใช้

```bash
sudo passwd username
```

### 3.4 `who` - แสดงข้อมูลเกี่ยวกับผู้ใช้งานที่ล็อกอินอยู่

คำสั่ง `who` ใช้เพื่อแสดงข้อมูลเกี่ยวกับผู้ใช้งานที่ล็อกอินอยู่ในระบบ

```bash
who
```

## 4. การจัดการกระบวนการ (Process Management)

### 4.1 `ps` - แสดงกระบวนการที่กำลังทำงาน

คำสั่ง `ps` ใช้เพื่อแสดงรายการกระบวนการที่กำลังทำงานอยู่

```bash
ps
```

ตัวเลือกที่นิยมใช้:
- `ps -aux`: แสดงกระบวนการทั้งหมดในระบบ
- `ps -ef`: แสดงกระบวนการในรูปแบบที่มีรายละเอียดมากขึ้น

### 4.2 `top` - แสดงการใช้งานระบบ

คำสั่ง `top` ใช้เพื่อแสดงข้อมูลการใช้งานระบบ เช่น การใช้งาน CPU, หน่วยความจำ, และกระบวนการที่กำลังทำงาน

```bash
top
```

### 4.3 `kill` - ยุติกระบวนการ

คำสั่ง `kill` ใช้ในการยุติกระบวนการที่กำลังทำงานอยู่

```bash
kill process_id
```

## 5. การจัดการเครือข่าย

### 5.1 `ping` - ตรวจสอบการเชื่อมต่อเครือข่าย

คำสั่ง `ping` ใช้เพื่อทดสอบการเชื่อมต่อกับ host อื่นในเครือข่าย

```bash
ping example.com
```

### 5.2 `ifconfig` - แสดงข้อมูลการตั้งค่าเครือข่าย

คำสั่ง `ifconfig` ใช้เพื่อแสดงข้อมูลเกี่ยวกับการตั้งค่าของการ์ดเครือข่าย

```bash
ifconfig
```

### 5.3 `netstat` - แสดงการเชื่อมต่อเครือข่าย

คำสั่ง `netstat` ใช้เพื่อแสดงการเชื่อมต่อเครือข่ายที่กำลังทำงาน

```bash
netstat -tuln
```

## 6. การใช้งานดิสก์และพื้นที่จัดเก็บ

### 6.1 `df` - แสดงพื้นที่ดิสก์ที่ใช้

คำสั่ง `df` ใช้เพื่อแสดงข้อมูลเกี่ยวกับพื้นที่ดิสก์ในระบบ

```bash
df -h
```

### 6.2 `du` - แสดงการใช้พื้นที่ในไดเรกทอรี

คำสั่ง `du` ใช้เพื่อแสดงการใช้พื้นที่ของไฟล์หรือไดเรกทอรี

```bash
du -sh directory
```

## สรุป

คำสั่งพื้นฐานใน Linux ช่วยให้คุณสามารถจัดการไฟล์, กระบวนการ, และระบบได้อย่างมีประสิทธิภาพ การรู้จักคำสั่งเหล่านี้เป็นสิ่งสำคัญสำหรับการทำงานในระบบ Linux ไม่ว่าจะเป็นในด้านการจัดการระบบ, การพัฒนาโปรแกรม หรือการใช้งานประจำวัน