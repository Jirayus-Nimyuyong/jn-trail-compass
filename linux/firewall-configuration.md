# การตั้งค่าฟีวอล (Firewall Configuration) ใน Linux

## บทนำ

ฟีวอล (Firewall) เป็นเครื่องมือสำคัญในการป้องกันและควบคุมการเข้าถึงเครือข่ายของเครื่องคอมพิวเตอร์ ฟีวอลสามารถใช้ในการป้องกันการโจมตีจากภายนอกหรือการเชื่อมต่อที่ไม่พึงประสงค์ รวมทั้งช่วยในการจัดการการรับส่งข้อมูลในระบบเครือข่ายในลักษณะที่มีการควบคุม

ในบทนี้, เราจะเรียนรู้การตั้งค่าและการใช้งานฟีวอลใน Linux โดยใช้เครื่องมือต่างๆ เช่น `iptables`, `ufw`, และ `firewalld`

## 1. การใช้งาน `iptables`

### 1.1 การตรวจสอบสถานะของ `iptables`

ใช้คำสั่งนี้เพื่อตรวจสอบกฎฟีวอลในระบบ:

```bash
sudo iptables -L
```

### 1.2 การตั้งค่า `iptables` เพื่ออนุญาตหรือบล็อกการเชื่อมต่อ

#### การอนุญาตให้เข้าใช้งานพอร์ต 80 (HTTP)

```bash
sudo iptables -A INPUT -p tcp --dport 80 -j ACCEPT
```

#### การบล็อกพอร์ต 22 (SSH)

```bash
sudo iptables -A INPUT -p tcp --dport 22 -j DROP
```

#### การบล็อก IP Address 192.168.1.100

```bash
sudo iptables -A INPUT -s 192.168.1.100 -j DROP
```

### 1.3 การบันทึกกฎ `iptables` ให้ถาวร

การตั้งค่า `iptables` ที่ทำในแต่ละครั้งจะหายไปเมื่อรีบูตเครื่อง หากต้องการให้กฎเหล่านี้คงอยู่ตลอดไป, ให้บันทึกกฎด้วยคำสั่ง:

```bash
sudo iptables-save > /etc/iptables/rules.v4
```

## 2. การใช้งาน `ufw` (Uncomplicated Firewall)

`ufw` เป็นเครื่องมือที่ใช้งานง่ายในการตั้งค่าฟีวอลบนระบบที่ใช้ `iptables` อยู่แล้ว

### 2.1 การตรวจสอบสถานะของ `ufw`

ตรวจสอบสถานะการทำงานของ `ufw`:

```bash
sudo ufw status
```

### 2.2 การตั้งค่า `ufw` เพื่ออนุญาตหรือบล็อกพอร์ต

#### การอนุญาตให้เข้าใช้งานพอร์ต 80 (HTTP)

```bash
sudo ufw allow 80/tcp
```

#### การบล็อกพอร์ต 22 (SSH)

```bash
sudo ufw deny 22/tcp
```

#### การอนุญาตให้เข้าใช้งานจาก IP Address 192.168.1.100

```bash
sudo ufw allow from 192.168.1.100
```

### 2.3 การเปิดใช้งาน `ufw`

เปิดใช้งาน `ufw`:

```bash
sudo ufw enable
```

### 2.4 การปิดการใช้งาน `ufw`

หากไม่ต้องการให้ฟีวอลทำงาน:

```bash
sudo ufw disable
```

## 3. การใช้งาน `firewalld`

`firewalld` เป็นเครื่องมือที่ใช้ในการจัดการฟีวอลในระบบที่รองรับการใช้งานจาก Red Hat-based distributions (เช่น CentOS, Fedora)

### 3.1 การตรวจสอบสถานะของ `firewalld`

ตรวจสอบสถานะของ `firewalld`:

```bash
sudo firewall-cmd --state
```

### 3.2 การอนุญาตหรือบล็อกพอร์ต

#### การอนุญาตให้เข้าใช้งานพอร์ต 80 (HTTP)

```bash
sudo firewall-cmd --zone=public --add-port=80/tcp --permanent
sudo firewall-cmd --reload
```

#### การบล็อกพอร์ต 22 (SSH)

```bash
sudo firewall-cmd --zone=public --remove-port=22/tcp --permanent
sudo firewall-cmd --reload
```

### 3.3 การตั้งค่ากฎ `firewalld` แบบถาวร

ทุกครั้งที่คุณเพิ่มหรือลบกฎจาก `firewalld`, การเปลี่ยนแปลงจะเป็นแบบชั่วคราว หากต้องการให้กฎเหล่านี้คงอยู่หลังจากการรีบูต, คุณต้องใช้ `--permanent` และ `--reload`

```bash
sudo firewall-cmd --reload
```

## 4. การตั้งค่า Default Policy

การตั้งค่า Default Policy ใช้เพื่อกำหนดว่าจะให้อนุญาตหรือบล็อกการเชื่อมต่อทั้งหมดที่ไม่ได้ระบุในกฎฟีวอล

### 4.1 การตั้งค่า Default Policy สำหรับ `iptables`

#### การตั้งค่า Default ให้บล็อกการเชื่อมต่อทั้งหมด

```bash
sudo iptables -P INPUT DROP
sudo iptables -P FORWARD DROP
sudo iptables -P OUTPUT ACCEPT
```

#### การตั้งค่า Default ให้อนุญาตการเชื่อมต่อทั้งหมด

```bash
sudo iptables -P INPUT ACCEPT
sudo iptables -P FORWARD ACCEPT
sudo iptables -P OUTPUT ACCEPT
```

### 4.2 การตั้งค่า Default Policy สำหรับ `ufw`

สำหรับ `ufw`, การตั้งค่า Default Policy สามารถทำได้ดังนี้:

```bash
sudo ufw default deny incoming
sudo ufw default allow outgoing
```

### 4.3 การตั้งค่า Default Policy สำหรับ `firewalld`

สำหรับ `firewalld`, ใช้คำสั่งนี้เพื่อตั้งค่าพื้นฐาน:

```bash
sudo firewall-cmd --set-default-zone=public
```

## 5. การตรวจสอบและการแก้ไขปัญหา

### 5.1 การตรวจสอบฟีวอลที่ทำงานอยู่

ใช้คำสั่ง `systemctl` เพื่อตรวจสอบสถานะของบริการฟีวอล:

```bash
sudo systemctl status ufw
sudo systemctl status firewalld
```

### 5.2 การตรวจสอบบันทึกฟีวอล

บันทึกการทำงานของฟีวอลสามารถพบได้ในไฟล์บันทึก:

```bash
sudo tail -f /var/log/syslog
```

## 6. สรุป

การตั้งค่าฟีวอลใน Linux เป็นการป้องกันระบบจากการโจมตีและการเข้าถึงที่ไม่พึงประสงค์ โดยสามารถใช้เครื่องมือเช่น `iptables`, `ufw`, และ `firewalld` เพื่อควบคุมการรับส่งข้อมูลตามกฎที่คุณกำหนด การใช้ฟีวอลที่ถูกต้องสามารถเพิ่มความปลอดภัยให้กับเครื่องคอมพิวเตอร์ของคุณได้