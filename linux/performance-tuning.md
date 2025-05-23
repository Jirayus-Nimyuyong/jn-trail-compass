# Performance Tuning ในการใช้ Linux

## บทนำ

การปรับแต่งประสิทธิภาพ (Performance Tuning) ของระบบ Linux เป็นกระบวนการที่ช่วยเพิ่มประสิทธิภาพการทำงานของระบบ โดยการปรับการตั้งค่าและการจัดการทรัพยากรให้เหมาะสมกับลักษณะการใช้งานของระบบ ในบทนี้, เราจะพูดถึงวิธีการและเครื่องมือที่สามารถใช้ในการปรับแต่งประสิทธิภาพของระบบ Linux

## 1. การปรับแต่ง CPU

### 1.1 การตรวจสอบการใช้งาน CPU

การตรวจสอบการใช้งาน CPU จะช่วยให้คุณรู้ว่าโปรเซสใดที่ใช้พลังงาน CPU มากที่สุดและปรับการใช้งานให้เหมาะสม

```bash
# การดูการใช้งาน CPU ในรูปแบบกราฟ
top

# การตรวจสอบการใช้ CPU โดยใช้ mpstat
mpstat -P ALL 1
```

### 1.2 การตั้งค่า CPU Governor

CPU Governor ใช้ในการจัดการการปรับความเร็วของ CPU เพื่อให้เหมาะสมกับการใช้งาน

```bash
# การตรวจสอบ CPU Governor ที่ใช้งาน
cat /sys/devices/system/cpu/cpu*/cpufreq/scaling_governor

# การตั้งค่า CPU Governor เป็น performance
echo performance | sudo tee /sys/devices/system/cpu/cpu*/cpufreq/scaling_governor
```

### 1.3 การใช้ `taskset` สำหรับการตั้งค่า CPU Affinity

การตั้งค่า CPU Affinity ช่วยให้โปรเซสทำงานกับ CPU ที่เฉพาะเจาะจง เพื่อเพิ่มประสิทธิภาพการทำงาน

```bash
# การตั้งค่า CPU Affinity สำหรับโปรเซส
taskset -c 0,1 <command>
```

## 2. การปรับแต่งหน่วยความจำ (Memory Tuning)

### 2.1 การตรวจสอบการใช้งานหน่วยความจำ

การตรวจสอบการใช้งานหน่วยความจำเป็นการติดตามการใช้งานของระบบที่สามารถช่วยให้คุณหาจุดบกพร่องในการใช้งานหน่วยความจำ

```bash
# การดูการใช้งานหน่วยความจำ
free -h

# การดูการใช้งาน swap
swapon --show
```

### 2.2 การตั้งค่า Swappiness

ค่าของ swappiness ควบคุมว่าเมื่อไรระบบจะใช้ swap memory ซึ่งมีผลต่อประสิทธิภาพการทำงาน

```bash
# การตรวจสอบค่า swappiness
cat /proc/sys/vm/swappiness

# การตั้งค่า swappiness ให้เป็น 10
sudo sysctl vm.swappiness=10
```

### 2.3 การใช้ `numactrl` สำหรับการจัดการหน่วยความจำ

การใช้ `numactrl` ช่วยในการปรับการจัดการหน่วยความจำในระบบที่มีหลายหน่วยความจำ

```bash
# การใช้งาน numactrl เพื่อดูการตั้งค่าหน่วยความจำ
numactrl --hardware
```

## 3. การปรับแต่ง I/O Performance

### 3.1 การตรวจสอบการใช้งาน I/O

การตรวจสอบการใช้งาน I/O เป็นการดูว่าโปรเซสใดที่ใช้งานดิสก์มากที่สุด

```bash
# การใช้ iostat เพื่อตรวจสอบ I/O
iostat -x 1
```

### 3.2 การใช้ `tuned` สำหรับการปรับแต่ง I/O

`Tuned` เป็นเครื่องมือที่ช่วยปรับแต่งระบบให้เหมาะสมกับการใช้งานต่างๆ เช่น การตั้งค่าระบบให้เหมาะสมกับการใช้งานที่ต้องการประสิทธิภาพ I/O

```bash
# การติดตั้ง tuned
sudo apt install tuned

# การเริ่มต้นใช้โปรไฟล์ tuned
sudo tuned-adm profile throughput-performance
```

## 4. การปรับแต่งการจัดการไฟล์ (File System Tuning)

### 4.1 การใช้ SSD

หากคุณใช้ SSD บนระบบ Linux คุณสามารถปรับแต่งเพื่อให้ได้ประสิทธิภาพที่ดีที่สุด

```bash
# การเปิดใช้งาน TRIM สำหรับ SSD
sudo systemctl enable fstrim.timer
```

### 4.2 การปรับแต่งการใช้งานระบบไฟล์

การเลือกระบบไฟล์ที่เหมาะสมกับการใช้งานจะช่วยให้ประสิทธิภาพดีขึ้น เช่น การใช้ `ext4` หรือ `xfs` ตามความเหมาะสม

```bash
# การตรวจสอบชนิดของระบบไฟล์
df -T

# การตั้งค่าระบบไฟล์ ext4 ให้มีประสิทธิภาพสูงสุด
sudo tune2fs -o journal_data_writeback /dev/sda1
```

## 5. การปรับแต่งการจัดการโปรเซส

### 5.1 การตรวจสอบโปรเซสที่ทำงานอยู่

การตรวจสอบโปรเซสที่ทำงานอยู่ช่วยให้คุณเห็นว่าโปรเซสใดใช้พลังงานมากที่สุด

```bash
# การใช้ top เพื่อดูโปรเซส
top

# การใช้ htop เพื่อดูโปรเซส
htop
```

### 5.2 การใช้ `nice` และ `renice` สำหรับการตั้งค่า priority

การตั้งค่าความสำคัญของโปรเซสด้วย `nice` หรือ `renice` จะช่วยให้โปรเซสทำงานได้เร็วขึ้นหรือลดผลกระทบจากโปรเซสที่มี priority ต่ำ

```bash
# การใช้ nice ในการเริ่มโปรเซส
nice -n 10 <command>

# การใช้ renice สำหรับการเปลี่ยน priority ของโปรเซส
sudo renice -n 10 -p <PID>
```

## 6. การปรับแต่ง Network Performance

### 6.1 การตรวจสอบการใช้งานเครือข่าย

การตรวจสอบการใช้งานเครือข่ายช่วยให้คุณเห็นว่าโปรเซสใดที่ใช้แบนด์วิธมากที่สุด

```bash
# การใช้ netstat เพื่อดูการเชื่อมต่อเครือข่าย
netstat -tuln

# การใช้ ifstat เพื่อตรวจสอบการใช้งานเครือข่าย
ifstat
```

### 6.2 การตั้งค่า TCP Parameters

การปรับแต่งค่า TCP บางประการสามารถช่วยเพิ่มประสิทธิภาพของเครือข่ายได้

```bash
# การตรวจสอบ TCP parameters
sysctl net.ipv4.tcp_rmem
sysctl net.ipv4.tcp_wmem

# การตั้งค่าค่า TCP buffer ให้มีขนาดใหญ่ขึ้น
sudo sysctl -w net.ipv4.tcp_rmem="4096 87380 6291456"
```

## 7. การใช้งาน System Monitoring Tools

### 7.1 การติดตั้งเครื่องมือ Monitoring

การติดตั้งเครื่องมือสำหรับตรวจสอบประสิทธิภาพของระบบเช่น `sar`, `dstat`, `sysstat` จะช่วยให้คุณสามารถติดตามการใช้งานของระบบได้อย่างละเอียด

```bash
# การติดตั้ง sysstat
sudo apt install sysstat

# การใช้งาน sar เพื่อตรวจสอบการใช้งาน CPU
sar -u 1 5
```

## สรุป

การปรับแต่งประสิทธิภาพ (Performance Tuning) ของระบบ Linux เป็นกระบวนการที่ต้องใช้เครื่องมือและการตั้งค่าที่หลากหลาย เพื่อให้มั่นใจว่าระบบจะทำงานได้อย่างมีประสิทธิภาพสูงสุด การตรวจสอบการใช้งาน CPU, หน่วยความจำ, I/O, และเครือข่าย รวมถึงการปรับแต่งการตั้งค่าระบบไฟล์และโปรเซสจะช่วยเพิ่มประสิทธิภาพและทำให้ระบบทำงานได้ดีขึ้น