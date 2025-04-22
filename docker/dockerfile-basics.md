# Dockerfile Basics

## Dockerfile คืออะไร?
**Dockerfile** เป็นไฟล์ข้อความที่มีคำสั่งที่ใช้ในการสร้าง Docker Image โดยการใช้คำสั่งที่ระบุใน Dockerfile นี้ Docker จะทำการสร้างภาพ (Image) ที่ประกอบด้วยซอฟต์แวร์และการตั้งค่าต่างๆ ที่จำเป็นสำหรับแอปพลิเคชัน

Dockerfile สามารถใช้เป็นคำแนะนำในการสร้างสภาพแวดล้อมที่สามารถนำไปใช้รันแอปพลิเคชันใน Docker Container ได้

## โครงสร้างของ Dockerfile

Dockerfile ประกอบด้วยคำสั่งที่ใช้ในการจัดการและตั้งค่า environment สำหรับ Docker Image ที่จะถูกสร้างขึ้น คำสั่งพื้นฐานที่ใช้งานใน Dockerfile มีดังนี้:

### 1. FROM
คำสั่ง `FROM` ใช้ในการกำหนด base image ที่จะใช้ในการสร้าง Docker Image ใหม่ โดยจะต้องระบุชื่อของ image ที่ต้องการนำมาใช้เป็นฐาน ตัวอย่าง:
```dockerfile
FROM ubuntu:20.04
```
ในที่นี้ เรากำหนดว่า Dockerfile นี้จะเริ่มต้นจาก **Ubuntu 20.04** image เป็น base image

### 2. RUN
คำสั่ง `RUN` ใช้ในการรันคำสั่งต่างๆ ในขณะสร้าง image (ในขั้นตอนการสร้าง Docker Image) ตัวอย่างเช่น การติดตั้งซอฟต์แวร์หรือเครื่องมือบางตัวใน image:
```dockerfile
RUN apt-get update && apt-get install -y python3
```
ในที่นี้เราจะติดตั้ง Python 3 ใน Docker Image ที่กำลังสร้าง

### 3. WORKDIR
คำสั่ง `WORKDIR` ใช้ในการกำหนด directory ที่จะใช้เป็น working directory ภายใน container ที่จะรันจาก image นี้:
```dockerfile
WORKDIR /app
```
คำสั่งนี้จะตั้งค่า directory **/app** ให้เป็น working directory ใน container

### 4. COPY
คำสั่ง `COPY` ใช้ในการคัดลอกไฟล์จากเครื่องโฮสต์ (host machine) ไปยัง container หรือ image:
```dockerfile
COPY . /app
```
คำสั่งนี้จะคัดลอกไฟล์ทั้งหมดจากโฟลเดอร์ปัจจุบัน (`.`) ไปยังโฟลเดอร์ **/app** ภายใน Docker Image

### 5. ADD
คำสั่ง `ADD` คล้ายกับ `COPY` แต่สามารถใช้เพื่อคัดลอกไฟล์และ URL หรือไฟล์จาก tarballs และไฟล์ที่บีบอัดโดยอัตโนมัติ:
```dockerfile
ADD myapp.tar.gz /app
```
ในกรณีนี้ `ADD` จะคัดลอกไฟล์ `myapp.tar.gz` และแตกไฟล์ไปยัง directory **/app**

### 6. CMD
คำสั่ง `CMD` ใช้ในการกำหนดคำสั่งที่ต้องการให้รันเมื่อ container เริ่มทำงาน คำสั่งนี้สามารถใช้ได้เพียงครั้งเดียวใน Dockerfile และจะถูกใช้เป็นคำสั่งเริ่มต้นของ container:
```dockerfile
CMD ["python3", "app.py"]
```
คำสั่งนี้จะทำการรัน **app.py** ด้วย **python3** เมื่อ container เริ่มทำงาน

### 7. EXPOSE
คำสั่ง `EXPOSE` ใช้เพื่อบอกว่า container จะฟังที่พอร์ตใด โดยปกติจะใช้ร่วมกับแอปพลิเคชันที่ทำงานใน container:
```dockerfile
EXPOSE 8080
```
คำสั่งนี้จะบอกว่า container นี้จะเปิดพอร์ต **8080** เพื่อรับการเชื่อมต่อจากภายนอก

### 8. ENV
คำสั่ง `ENV` ใช้ในการกำหนดค่า environment variables ภายใน Docker Image:
```dockerfile
ENV APP_ENV=production
```
คำสั่งนี้จะตั้งค่า **APP_ENV** เป็น `production` ภายใน Docker Image

### 9. VOLUME
คำสั่ง `VOLUME` ใช้เพื่อกำหนด volume ที่สามารถใช้แชร์ข้อมูลระหว่าง host และ container:
```dockerfile
VOLUME ["/data"]
```
คำสั่งนี้จะสร้าง volume ที่สามารถเข้าถึงได้จากโฟลเดอร์ **/data** ใน container

### 10. ENTRYPOINT
คำสั่ง `ENTRYPOINT` ใช้กำหนดคำสั่งที่จะรันเมื่อ container เริ่มต้นทำงาน โดยสามารถระบุคำสั่งที่สามารถทำงานได้ตลอดเวลา:
```dockerfile
ENTRYPOINT ["python3", "app.py"]
```
คำสั่งนี้จะตั้งค่าให้ทุกครั้งที่ container เริ่มต้น จะรัน **app.py** โดยใช้ **python3**

## ตัวอย่าง Dockerfile

ต่อไปนี้คือตัวอย่าง Dockerfile สำหรับสร้าง Python Web Application ที่ใช้ Flask:

```dockerfile
# ใช้ official Python base image
FROM python:3.8-slim

# กำหนด working directory
WORKDIR /app

# คัดลอกไฟล์ requirements.txt และติดตั้ง dependencies
COPY requirements.txt /app/
RUN pip install -r requirements.txt

# คัดลอกโค้ดแอปพลิเคชันทั้งหมดไปยัง /app
COPY . /app

# เปิดพอร์ต 5000 สำหรับ Flask web server
EXPOSE 5000

# กำหนดคำสั่งเริ่มต้นที่รันเมื่อ container เริ่มทำงาน
CMD ["python", "app.py"]
```

## สรุป

**Dockerfile** เป็นไฟล์ที่ช่วยให้คุณสร้าง Docker Images ที่สามารถใช้งานได้ตามต้องการ โดยการใช้คำสั่งต่างๆ ใน Dockerfile เช่น `FROM`, `RUN`, `WORKDIR`, `COPY`, `CMD` และอื่นๆ ซึ่งช่วยให้การตั้งค่าและการสร้างสภาพแวดล้อมที่เหมาะสมสำหรับแอปพลิเคชันภายใน Docker Container เป็นไปอย่างง่ายดาย โดยไม่จำเป็นต้องติดตั้งซอฟต์แวร์หรือเครื่องมือที่ต้องการซ้ำๆ ในแต่ละขั้นตอนการพัฒนา