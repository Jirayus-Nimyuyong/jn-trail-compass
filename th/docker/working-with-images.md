# Working with Docker Images

## การทำงานกับ Docker Images

**Docker Images** เป็นพื้นฐานที่สำคัญสำหรับการทำงานใน Docker เนื่องจาก Docker Container ถูกสร้างจาก Docker Images ที่กำหนดลักษณะและการตั้งค่าของ container การทำงานกับ Docker Images รวมถึงการสร้าง, แก้ไข, และจัดการกับ images เพื่อให้คุณสามารถใช้งานแอปพลิเคชันได้ในทุกสภาพแวดล้อม

## คำสั่งพื้นฐานในการทำงานกับ Docker Images

### 1. ดู Docker Images ที่มีอยู่ในเครื่อง
คำสั่ง `docker images` ใช้เพื่อดูรายการ Docker Images ที่มีอยู่ในเครื่อง:
```bash
docker images
```
คำสั่งนี้จะแสดงข้อมูลเกี่ยวกับ images ที่มีอยู่ในเครื่องของคุณ เช่น:
- `REPOSITORY` : ชื่อของ Docker Image
- `TAG` : เวอร์ชันของ Docker Image
- `IMAGE ID` : หมายเลข ID ของ Docker Image
- `CREATED` : วันที่ Docker Image ถูกสร้าง
- `SIZE` : ขนาดของ Docker Image

### 2. การดึง Docker Image จาก Docker Hub
คุณสามารถดึง Docker Image จาก **Docker Hub** ซึ่งเป็น registry ของ Docker โดยใช้คำสั่ง `docker pull`:
```bash
docker pull ubuntu:20.04
```
ในที่นี้:
- `ubuntu:20.04` คือชื่อของ Docker Image ที่คุณต้องการดึงจาก Docker Hub
- หากไม่ระบุเวอร์ชัน (tag) Docker จะดึง `latest` tag โดยอัตโนมัติ

### 3. การสร้าง Docker Image จาก Dockerfile
หากคุณมี **Dockerfile** ที่ใช้สำหรับสร้าง Docker Image คุณสามารถใช้คำสั่ง `docker build` เพื่อสร้าง Docker Image จาก Dockerfile ดังนี้:
```bash
docker build -t my-image .
```
ในที่นี้:
- `-t my-image` ใช้ในการตั้งชื่อให้กับ Docker Image ที่จะสร้าง
- `.` คือที่อยู่ของ Dockerfile (ในที่นี้คือโฟลเดอร์ปัจจุบัน)

### 4. การลบ Docker Image
หากคุณต้องการลบ Docker Image ที่ไม่ใช้แล้วจากเครื่องสามารถใช้คำสั่ง `docker rmi`:
```bash
docker rmi image_id
```
ในที่นี้ `image_id` คือ ID ของ Docker Image ที่คุณต้องการลบ

หากต้องการลบหลาย images พร้อมกัน:
```bash
docker rmi image_id1 image_id2
```

### 5. การค้นหา Docker Images บน Docker Hub
หากคุณต้องการค้นหา Docker Images ที่มีอยู่ใน **Docker Hub** สามารถใช้คำสั่ง `docker search`:
```bash
docker search nginx
```
คำสั่งนี้จะค้นหา Docker Images ที่เกี่ยวข้องกับ **nginx** บน Docker Hub และแสดงรายชื่อของ images ที่ตรงกับคำค้น

### 6. การสร้าง Docker Image จาก Container
หากคุณมี Docker Container ที่กำลังทำงานอยู่และต้องการสร้าง Docker Image จาก container นั้น สามารถใช้คำสั่ง `docker commit`:
```bash
docker commit container_id my-new-image
```
ในที่นี้:
- `container_id` คือ ID ของ container ที่คุณต้องการสร้าง image จาก
- `my-new-image` คือชื่อของ Docker Image ใหม่ที่จะถูกสร้าง

### 7. การดูข้อมูล Docker Image
หากต้องการดูข้อมูลรายละเอียดของ Docker Image เช่น ข้อมูลเกี่ยวกับ layers หรือการตั้งค่าของ image สามารถใช้คำสั่ง `docker inspect`:
```bash
docker inspect image_id
```
คำสั่งนี้จะแสดงรายละเอียดทั้งหมดของ Docker Image ที่ระบุ เช่น พาธของไฟล์, ขนาด, และข้อมูลการตั้งค่าภายใน

### 8. การสร้าง Docker Image ด้วยคำสั่ง `docker save`
หากต้องการบันทึก Docker Image ลงในไฟล์ tar สามารถใช้คำสั่ง `docker save`:
```bash
docker save -o my-image.tar my-image
```
ในที่นี้:
- `-o my-image.tar` กำหนดให้บันทึก Docker Image ลงในไฟล์ **my-image.tar**
- `my-image` คือชื่อของ Docker Image ที่ต้องการบันทึก

### 9. การโหลด Docker Image จากไฟล์ tar
หากคุณต้องการโหลด Docker Image จากไฟล์ tar ที่บันทึกไว้ สามารถใช้คำสั่ง `docker load`:
```bash
docker load -i my-image.tar
```
คำสั่งนี้จะโหลด Docker Image จากไฟล์ **my-image.tar** ที่คุณบันทึกไว้

## การใช้งาน Docker Image ในการสร้าง Container

### 1. การรัน Container จาก Docker Image
คุณสามารถใช้ Docker Image ที่มีอยู่เพื่อรัน Docker Container ด้วยคำสั่ง `docker run`:
```bash
docker run -d -p 8080:80 my-image
```
ในที่นี้:
- `-d` ใช้เพื่อรัน container ใน background (detached mode)
- `-p 8080:80` ทำการแมปพอร์ต 8080 บนเครื่อง host ไปยังพอร์ต 80 ของ container
- `my-image` คือชื่อของ Docker Image ที่จะใช้ในการสร้าง container

### 2. การดูข้อมูลเกี่ยวกับ Layers ของ Docker Image
Docker Images ถูกสร้างขึ้นจาก layers แต่ละ layer จะเป็นการเพิ่มข้อมูลบางอย่างเข้าไปใน image โดยใช้คำสั่ง `docker history`:
```bash
docker history my-image
```
คำสั่งนี้จะแสดงประวัติของ Docker Image และรายละเอียดเกี่ยวกับ layers ที่ประกอบขึ้นมาเป็น image นั้น

### 3. การบีบอัด Docker Image
หากคุณต้องการบีบอัด Docker Image เพื่อให้มีขนาดเล็กลง สามารถใช้คำสั่ง `docker export` เพื่อบีบอัด container:
```bash
docker export container_id | gzip > my-container.tar.gz
```
คำสั่งนี้จะทำการบีบอัด **container_id** และบันทึกเป็นไฟล์ **my-container.tar.gz**

## สรุป

การทำงานกับ **Docker Images** ช่วยให้คุณสามารถจัดการกับภาพ (image) ที่ใช้ในการสร้าง Docker Containers ได้อย่างสะดวกและมีประสิทธิภาพ โดยใช้คำสั่งต่างๆ เช่น `docker pull`, `docker build`, `docker rmi`, `docker commit`, และ `docker save` เพื่อสร้าง, แก้ไข, และจัดการกับ Docker Images คุณสามารถใช้ Docker Images เพื่อสร้าง environment ที่พร้อมใช้งานสำหรับแอปพลิเคชันของคุณในทุกๆ สภาพแวดล้อมที่ต้องการ