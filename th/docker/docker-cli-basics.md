# Docker CLI Basics

## Docker CLI คืออะไร?
**Docker CLI (Command Line Interface)** เป็นเครื่องมือที่ใช้สำหรับการสื่อสารและควบคุมการทำงานของ Docker ผ่านทางคำสั่งในคอมมานด์ไลน์ ผู้ใช้สามารถใช้ Docker CLI ในการสร้าง, รัน, จัดการ Docker Containers, และจัดการ Docker Images ได้

## การติดตั้ง Docker CLI

Docker CLI จะถูกติดตั้งโดยอัตโนมัติเมื่อคุณติดตั้ง Docker ในเครื่องของคุณ โดยไม่ต้องติดตั้งเพิ่มเติม สำหรับผู้ใช้ Linux, Docker CLI สามารถติดตั้งได้โดยการติดตั้ง Docker ตามวิธีการที่เหมาะสมกับระบบปฏิบัติการของคุณ (ดูในขั้นตอนการติดตั้ง Docker)

## คำสั่งพื้นฐานใน Docker CLI

### 1. ตรวจสอบเวอร์ชันของ Docker
เพื่อดูว่า Docker ได้รับการติดตั้งและสามารถใช้งานได้หรือไม่ รวมถึงเวอร์ชันที่ติดตั้ง
```bash
docker --version
```

### 2. รัน Docker Container
การรัน Docker Container จาก Docker Image:
```bash
docker run [OPTIONS] IMAGE [COMMAND] [ARG...]
```
ตัวอย่าง:
```bash
docker run hello-world
```
คำสั่งนี้จะดาวน์โหลดและรัน **hello-world** image เพื่อทดสอบว่า Docker ทำงานได้ถูกต้อง

### 3. ดู Docker Containers ที่กำลังทำงาน
คำสั่งนี้จะแสดงรายการของ containers ที่กำลังทำงานอยู่ในขณะนี้:
```bash
docker ps
```

### 4. ดู Docker Containers ที่หยุดทำงาน
หากต้องการดูทุก container (รวมถึงที่หยุดทำงานแล้ว):
```bash
docker ps -a
```

### 5. สร้าง Docker Image จาก Dockerfile
หากคุณมี **Dockerfile** และต้องการสร้าง Docker Image ใหม่:
```bash
docker build -t my-image .
```
- `-t` ใช้สำหรับระบุชื่อ image ที่จะสร้าง
- `.` คือพาธของ **Dockerfile** (ในที่นี้เป็นโฟลเดอร์ปัจจุบัน)

### 6. ดูรายการ Docker Images
คำสั่งนี้แสดงรายการของ Docker Images ที่อยู่ในเครื่องของคุณ:
```bash
docker images
```

### 7. ลบ Docker Container
หากคุณต้องการลบ Docker Container ที่หยุดทำงานแล้ว:
```bash
docker rm container_id
```
- `container_id` คือหมายเลข ID ของ container ที่ต้องการลบ

### 8. ลบ Docker Image
หากคุณต้องการลบ Docker Image:
```bash
docker rmi image_name
```
- `image_name` คือชื่อของ Docker Image ที่ต้องการลบ

### 9. รัน Docker Container ในโหมด Interactive
หากคุณต้องการรันคอนเทนเนอร์ในโหมด interactive เพื่อให้สามารถพิมพ์คำสั่งภายในคอนเทนเนอร์ได้:
```bash
docker run -it IMAGE /bin/bash
```
ตัวอย่าง:
```bash
docker run -it ubuntu /bin/bash
```
คำสั่งนี้จะรันคอนเทนเนอร์จาก **ubuntu** image และเปิดเชลล์ bash ภายในคอนเทนเนอร์

### 10. ดูข้อมูล Container
หากต้องการดูรายละเอียดของ container ที่กำลังทำงาน:
```bash
docker inspect container_id
```
คำสั่งนี้จะให้ข้อมูลรายละเอียดเกี่ยวกับ container ที่คุณเลือก เช่น พอร์ตที่กำหนดไว้, IP address, เป็นต้น

### 11. คัดลอกไฟล์จาก Container
หากต้องการคัดลอกไฟล์จาก Docker Container ไปยังเครื่องของคุณ:
```bash
docker cp container_id:/path/to/file /path/to/destination
```

### 12. หยุด Docker Container
เพื่อหยุดการทำงานของ Docker Container:
```bash
docker stop container_id
```

### 13. สตาร์ท Docker Container
หากต้องการเริ่มต้น Docker Container ที่หยุดทำงาน:
```bash
docker start container_id
```

### 14. ตรวจสอบ Logs ของ Docker Container
เพื่อดูข้อมูลหรือข้อความแสดงข้อผิดพลาดจากคอนเทนเนอร์:
```bash
docker logs container_id
```

### 15. เชื่อมต่อไปยัง Docker Container
ถ้าคุณต้องการเชื่อมต่อไปยังคอนเทนเนอร์ที่กำลังทำงานในโหมดเชลล์:
```bash
docker exec -it container_id /bin/bash
```
คำสั่งนี้จะเปิดเชลล์ให้คุณสามารถรันคำสั่งภายในคอนเทนเนอร์ได้

## ตัวอย่างการใช้งาน Docker CLI

### 1. รันเว็บแอปพลิเคชัน
สมมติว่าเราต้องการรัน **nginx** web server บน Docker:
```bash
docker run -d -p 8080:80 nginx
```
คำสั่งนี้จะรัน **nginx** web server ในโหมด background และแมปพอร์ต 80 ของคอนเทนเนอร์ไปยังพอร์ต 8080 บนเครื่องโฮสต์

### 2. รัน MySQL Container
รัน MySQL server ภายใน Docker container โดยตั้งค่ารหัสผ่าน root:
```bash
docker run --name mysql-container -e MYSQL_ROOT_PASSWORD=my-secret-pw -d mysql
```
คำสั่งนี้จะรัน MySQL server และกำหนดรหัสผ่าน root เป็น `my-secret-pw`

### 3. ลบ Container และ Image
สมมติว่าคุณต้องการลบคอนเทนเนอร์และภาพที่ใช้แล้ว:
```bash
docker stop container_id
docker rm container_id
docker rmi image_name
```

## สรุป

**Docker CLI** เป็นเครื่องมือที่สำคัญในการจัดการ Docker Containers และ Docker Images ในการพัฒนาแอปพลิเคชัน ผู้ใช้สามารถใช้คำสั่งต่างๆ ใน Docker CLI เพื่อสร้าง, รัน, จัดการ และลบคอนเทนเนอร์ รวมถึงการสร้างและการจัดการ Docker Images การเรียนรู้คำสั่งพื้นฐานเหล่านี้จะช่วยให้การใช้งาน Docker เป็นไปได้อย่างมีประสิทธิภาพมากยิ่งขึ้น