# Creating and Running Containers

## การสร้างและการรัน Docker Containers คืออะไร?

การสร้างและการรัน **Docker Containers** เป็นกระบวนการในการสร้าง environment ที่แยกออกมาเพื่อรันแอปพลิเคชัน โดย Docker Container เป็นเครื่องมือที่ช่วยให้การพัฒนา, ทดสอบ, และการใช้งานแอปพลิเคชันในหลายๆ สภาพแวดล้อมเป็นไปได้ง่ายดายและรวดเร็ว

## ขั้นตอนการสร้างและรัน Docker Container

### 1. การสร้าง Docker Image
ก่อนที่คุณจะสามารถรัน Docker Container ได้ คุณจะต้องสร้าง **Docker Image** ก่อน หากคุณใช้ **Dockerfile** คุณสามารถใช้คำสั่ง `docker build` เพื่อสร้าง Docker Image ดังนี้:
```bash
docker build -t my-image .
```
ในที่นี้:
- `-t my-image` กำหนดชื่อของ image ที่สร้าง
- `.` คือพาธที่ Dockerfile อยู่ (ในกรณีนี้คือโฟลเดอร์ปัจจุบัน)

### 2. การรัน Docker Container จาก Image
หลังจากที่สร้าง Docker Image แล้ว คุณสามารถรัน Docker Container จาก Image ที่สร้างขึ้นมาได้ โดยใช้คำสั่ง `docker run`:
```bash
docker run -d -p 8080:80 my-image
```
ในที่นี้:
- `-d` ใช้เพื่อรัน container ใน background (detached mode)
- `-p 8080:80` กำหนดพอร์ตที่ container จะรับข้อมูลจากภายนอก (port 8080 บนเครื่อง host map ไปยัง port 80 ของ container)
- `my-image` คือชื่อของ Docker Image ที่จะใช้ในการรัน container

### 3. การรัน Docker Container จาก Official Images
คุณสามารถรัน Docker Container โดยไม่ต้องสร้าง Docker Image ด้วยตนเอง โดยใช้ Docker Images ที่มีอยู่แล้วใน Docker Hub ซึ่งเป็น repository ของ Docker Images ที่พร้อมใช้งาน ตัวอย่างเช่น การรัน **nginx** web server:
```bash
docker run -d -p 8080:80 nginx
```
คำสั่งนี้จะดาวน์โหลด **nginx** image จาก Docker Hub และรันใน container พร้อมเปิดพอร์ต 80 ภายใน container ให้เข้าถึงผ่านพอร์ต 8080 บนเครื่อง host

### 4. การเชื่อมต่อไปยัง Docker Container
หากคุณต้องการเข้าถึง **shell** ภายใน Docker Container เพื่อรันคำสั่งภายใน container สามารถใช้คำสั่ง `docker exec` ดังนี้:
```bash
docker exec -it container_id /bin/bash
```
ในที่นี้:
- `-it` ใช้สำหรับการเปิด interactive terminal
- `container_id` คือ ID ของ container ที่ต้องการเข้าถึง
- `/bin/bash` คือคำสั่งที่ใช้เปิด shell ภายใน container

### 5. การตรวจสอบการทำงานของ Docker Container
หากต้องการตรวจสอบว่ามี Docker Container ใดบ้างที่กำลังทำงานอยู่ สามารถใช้คำสั่ง `docker ps`:
```bash
docker ps
```
คำสั่งนี้จะแสดงรายชื่อของ containers ที่กำลังทำงานอยู่ในขณะนี้ รวมถึงพอร์ตที่เปิดและสถานะของ container

### 6. การดูข้อมูลทั้งหมดของ Container
หากต้องการดูข้อมูลทั้งหมดของ Docker Containers ที่กำลังทำงาน (รวมถึงที่หยุดทำงานแล้ว) ให้ใช้คำสั่ง:
```bash
docker ps -a
```

### 7. การหยุด Docker Container
หากต้องการหยุดการทำงานของ Docker Container ที่กำลังทำงานอยู่ ให้ใช้คำสั่ง `docker stop`:
```bash
docker stop container_id
```
คำสั่งนี้จะหยุดการทำงานของ container ที่มี `container_id` ที่ระบุ

### 8. การลบ Docker Container
หากต้องการลบ Docker Container ที่ไม่จำเป็นออกจากเครื่อง สามารถใช้คำสั่ง `docker rm`:
```bash
docker rm container_id
```
หากต้องการลบหลาย container พร้อมกัน:
```bash
docker rm container_id1 container_id2
```

### 9. การลบ Docker Image
หากต้องการลบ Docker Image ที่ไม่จำเป็นออกจากเครื่อง สามารถใช้คำสั่ง `docker rmi`:
```bash
docker rmi image_id
```
คำสั่งนี้จะลบ Docker Image ที่มี `image_id` ที่ระบุ

### 10. การดู Log ของ Docker Container
หากต้องการดู log ของ Docker Container เพื่อดูข้อความแสดงข้อผิดพลาดหรือข้อมูลต่างๆ ที่เกิดขึ้นใน container สามารถใช้คำสั่ง `docker logs`:
```bash
docker logs container_id
```
คำสั่งนี้จะให้ข้อมูล log ของ container ที่ระบุ

## การทำงานกับ Docker Volumes

### 1. การสร้าง Docker Volume
เพื่อเก็บข้อมูลที่ต้องการใช้ระหว่างหลายๆ Docker Containers หรือเพื่อเก็บข้อมูลที่ไม่ต้องการให้หายไปเมื่อ container หยุดทำงาน สามารถใช้ Docker Volume:
```bash
docker volume create my-volume
```
คำสั่งนี้จะสร้าง volume ชื่อ **my-volume**

### 2. การใช้ Docker Volume กับ Container
เมื่อสร้าง volume แล้ว คุณสามารถเชื่อมต่อ volume นี้กับ Docker Container ได้ โดยใช้คำสั่ง `docker run` และเพิ่ม option `-v`:
```bash
docker run -d -v my-volume:/data my-image
```
ในที่นี้:
- `-v my-volume:/data` คือการเชื่อมต่อ volume ชื่อ **my-volume** ไปยัง path **/data** ภายใน container

### 3. การตรวจสอบ Docker Volumes
หากต้องการดูข้อมูลของ Docker Volumes ที่มีอยู่ในเครื่องของคุณ สามารถใช้คำสั่ง:
```bash
docker volume ls
```

## สรุป

การสร้างและการรัน **Docker Containers** ช่วยให้คุณสามารถสร้างและจัดการสภาพแวดล้อมที่เหมาะสมสำหรับแอปพลิเคชันได้อย่างง่ายดายผ่านคำสั่งพื้นฐานใน Docker CLI เช่น `docker run`, `docker exec`, `docker stop`, และ `docker ps` การใช้งาน Docker Container สามารถทำให้การพัฒนาและการใช้งานแอปพลิเคชันเป็นไปได้เร็วขึ้นและสะดวกยิ่งขึ้น