# Building Docker Images

## การสร้าง Docker Images

การสร้าง **Docker Image** เป็นกระบวนการที่สำคัญในการใช้งาน Docker เพราะ Docker Image คือรากฐานที่ใช้ในการสร้าง Docker Container ซึ่งเป็นที่ที่คุณเก็บแอปพลิเคชันและการตั้งค่าทั้งหมดเอาไว้ในรูปแบบที่สามารถใช้งานได้ทุกที่ การสร้าง Docker Image ช่วยให้คุณสามารถควบคุมการตั้งค่าและลักษณะของ container ได้อย่างเต็มที่

## กระบวนการในการสร้าง Docker Image

การสร้าง Docker Image มักจะทำผ่าน **Dockerfile** ซึ่งเป็นไฟล์ที่บอกขั้นตอนในการสร้าง image โดยการระบุคำสั่งที่จำเป็นในการตั้งค่าระบบภายใน container

### ขั้นตอนการสร้าง Docker Image ด้วย Dockerfile

1. สร้างไฟล์ **Dockerfile** ในโฟลเดอร์ที่ต้องการสร้าง Docker Image
2. เขียนคำสั่งใน Dockerfile ที่ระบุขั้นตอนในการตั้งค่าภายใน container
3. ใช้คำสั่ง `docker build` เพื่อสร้าง Docker Image

## ตัวอย่าง Dockerfile

```Dockerfile
# เลือก base image
FROM ubuntu:20.04

# ตั้งค่า environment variable
ENV DEBIAN_FRONTEND=noninteractive

# ติดตั้งแพ็กเกจที่จำเป็น
RUN apt-get update && apt-get install -y \
    curl \
    git \
    vim

# คัดลอกไฟล์จากโฟลเดอร์ปัจจุบันไปยัง container
COPY . /app

# ตั้งค่า directory ที่จะใช้ภายใน container
WORKDIR /app

# รันคำสั่งที่ต้องการภายใน container
RUN make /app

# กำหนดพอร์ตที่จะเปิดให้เข้าถึง
EXPOSE 8080

# คำสั่งที่รันเมื่อ container เริ่มทำงาน
CMD ["python3", "app.py"]
```

ในที่นี้:
- `FROM ubuntu:20.04` : เลือก **base image** เป็น Ubuntu 20.04
- `RUN apt-get install -y curl git vim` : ติดตั้งเครื่องมือที่จำเป็น
- `COPY . /app` : คัดลอกไฟล์จากโฟลเดอร์ปัจจุบันไปยัง container
- `WORKDIR /app` : ตั้งค่า directory ภายใน container
- `EXPOSE 8080` : เปิดพอร์ต 8080 ให้สามารถเข้าถึงได้จากภายนอก
- `CMD ["python3", "app.py"]` : คำสั่งที่รันเมื่อ container เริ่มทำงาน

### 2. การสร้าง Docker Image จาก Dockerfile

หลังจากที่คุณสร้าง **Dockerfile** เสร็จแล้ว คุณสามารถสร้าง Docker Image ได้โดยใช้คำสั่ง `docker build` ดังนี้:
```bash
docker build -t my-image .
```
ในที่นี้:
- `-t my-image` : กำหนดชื่อให้กับ Docker Image ที่จะสร้าง
- `.` : ระบุว่า Dockerfile อยู่ในโฟลเดอร์ปัจจุบัน

Docker จะทำตามคำสั่งใน Dockerfile ทีละขั้นตอน ตั้งแต่การติดตั้งโปรแกรมที่จำเป็นไปจนถึงการตั้งค่า container

### 3. ตรวจสอบ Docker Image ที่สร้างขึ้น

หลังจากที่ Docker Image ถูกสร้างเสร็จแล้ว คุณสามารถใช้คำสั่ง `docker images` เพื่อดูรายการ Docker Images ที่มีอยู่ในเครื่องของคุณ:
```bash
docker images
```
คำสั่งนี้จะแสดงข้อมูลเกี่ยวกับ images ที่มีในเครื่อง เช่น ชื่อ image, tag, และขนาดของ image

### 4. การใช้ Docker Image ที่สร้างขึ้น

เมื่อสร้าง Docker Image เสร็จแล้ว คุณสามารถใช้ image นี้ในการสร้าง Docker Container ด้วยคำสั่ง `docker run`:
```bash
docker run -d -p 8080:80 my-image
```
ในที่นี้:
- `-d` : รัน container ใน background
- `-p 8080:80` : ทำการแมปพอร์ตจากเครื่อง host (8080) ไปยังพอร์ตใน container (80)
- `my-image` : ใช้ Docker Image ที่ชื่อว่า `my-image` เพื่อสร้าง container

### 5. การบันทึก Docker Image ลงในไฟล์

หากคุณต้องการบันทึก Docker Image ลงในไฟล์เพื่อใช้หรือส่งไปยังเครื่องอื่น สามารถใช้คำสั่ง `docker save`:
```bash
docker save -o my-image.tar my-image
```
คำสั่งนี้จะบันทึก Docker Image ที่ชื่อ `my-image` ลงในไฟล์ **my-image.tar**

### 6. การโหลด Docker Image จากไฟล์

หากคุณมี Docker Image ที่บันทึกเป็นไฟล์ tar และต้องการโหลดเข้ามาในเครื่องของคุณ สามารถใช้คำสั่ง `docker load`:
```bash
docker load -i my-image.tar
```
คำสั่งนี้จะโหลด Docker Image จากไฟล์ **my-image.tar** เข้ามาในระบบ

### 7. การลบ Docker Image

หากคุณไม่ต้องการใช้ Docker Image ที่มีอยู่แล้วในเครื่อง สามารถใช้คำสั่ง `docker rmi` เพื่อลบ Docker Image:
```bash
docker rmi my-image
```
คำสั่งนี้จะลบ Docker Image ที่ชื่อว่า `my-image`

## ข้อดีของการใช้ Dockerfile ในการสร้าง Images

- **การทำงานอัตโนมัติ**: Dockerfile เป็นการกำหนดขั้นตอนทั้งหมดในการสร้าง Docker Image ทำให้กระบวนการสร้าง image เป็นอัตโนมัติและไม่ต้องทำซ้ำ
- **ความสามารถในการพกพา**: Docker Images สามารถแชร์และใช้งานได้ในทุกที่ที่รองรับ Docker
- **การทำงานร่วมกัน**: Dockerfile สามารถแชร์ให้กับทีมเพื่อให้ทุกคนสร้าง container ที่มีลักษณะเดียวกัน

## สรุป

การสร้าง **Docker Images** เป็นกระบวนการที่สำคัญในการใช้งาน Docker โดยคุณสามารถกำหนดขั้นตอนในการติดตั้งและตั้งค่าระบบภายใน Docker Container ได้โดยใช้ **Dockerfile** การใช้คำสั่ง `docker build`, `docker save`, และ `docker load` ช่วยให้คุณสามารถสร้าง, บันทึก, และใช้งาน Docker Images ได้อย่างสะดวก นอกจากนี้ Docker Images ยังช่วยให้คุณสามารถใช้งานแอปพลิเคชันในทุกสภาพแวดล้อมที่รองรับ Docker ได้อย่างมีประสิทธิภาพ