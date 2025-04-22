# การใช้ Docker กับ Linux

## บทนำ

Docker เป็นเครื่องมือที่ช่วยในการจัดการคอนเทนเนอร์ในระบบ Linux โดยการสร้างและจัดการแอปพลิเคชันในรูปแบบคอนเทนเนอร์ที่สามารถทำงานได้ในทุกที่ การใช้ Docker บน Linux ช่วยให้คุณสามารถสร้างและจัดการคอนเทนเนอร์ได้อย่างง่ายดายในสภาพแวดล้อมที่ต่างกัน การใช้ Docker บน Linux สามารถเพิ่มประสิทธิภาพในการพัฒนาและการปรับใช้แอปพลิเคชันได้อย่างมาก

## 1. การติดตั้ง Docker บน Linux

### 1.1 การติดตั้ง Docker บน Ubuntu

เพื่อเริ่มต้นใช้งาน Docker บน Ubuntu, คุณต้องทำการติดตั้ง Docker โดยใช้คำสั่งต่อไปนี้:

```bash
# อัพเดตฐานข้อมูลแพ็คเกจ
sudo apt update

# ติดตั้ง dependencies ที่จำเป็น
sudo apt install apt-transport-https ca-certificates curl software-properties-common

# เพิ่ม GPG key ของ Docker
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo apt-key add -

# เพิ่ม Docker repository
sudo add-apt-repository "deb [arch=amd64] https://download.docker.com/linux/ubuntu $(lsb_release -cs) stable"

# อัพเดตฐานข้อมูลแพ็คเกจ
sudo apt update

# ติดตั้ง Docker
sudo apt install docker-ce
```

### 1.2 การติดตั้ง Docker บน CentOS

```bash
# ติดตั้ง dependencies ที่จำเป็น
sudo yum install -y yum-utils device-mapper-persistent-data lvm2

# เพิ่ม Docker repository
sudo yum-config-manager --add-repo https://download.docker.com/linux/centos/docker-ce.repo

# ติดตั้ง Docker
sudo yum install docker-ce docker-ce-cli containerd.io

# เริ่มบริการ Docker
sudo systemctl start docker
sudo systemctl enable docker
```

## 2. การใช้งาน Docker เบื้องต้น

### 2.1 การตรวจสอบสถานะของ Docker

หลังจากติดตั้ง Docker แล้ว คุณสามารถตรวจสอบสถานะของ Docker service ได้โดยใช้คำสั่ง:

```bash
sudo systemctl status docker
```

### 2.2 การตรวจสอบเวอร์ชันของ Docker

คุณสามารถตรวจสอบเวอร์ชันของ Docker ที่ติดตั้งในระบบได้ด้วยคำสั่ง:

```bash
docker --version
```

### 2.3 การดึง Docker Image

ในการใช้งาน Docker, คุณสามารถดึง Docker image จาก Docker Hub หรือ registry อื่นๆ ด้วยคำสั่ง `docker pull`:

```bash
docker pull ubuntu:latest
```

### 2.4 การสร้าง Docker Container

คุณสามารถสร้างและรันคอนเทนเนอร์จาก image ที่คุณดึงมา:

```bash
docker run -it ubuntu:latest bash
```

คำสั่งนี้จะทำการรันคอนเทนเนอร์จาก image `ubuntu:latest` และเข้าสู่ shell ของคอนเทนเนอร์

## 3. การจัดการ Docker Container

### 3.1 การดูคอนเทนเนอร์ที่กำลังรัน

คุณสามารถดูคอนเทนเนอร์ที่กำลังรันอยู่ในระบบได้โดยใช้คำสั่ง:

```bash
docker ps
```

### 3.2 การดูคอนเทนเนอร์ทั้งหมด (รวมถึงที่หยุดการทำงานแล้ว)

```bash
docker ps -a
```

### 3.3 การหยุดคอนเทนเนอร์

หากคุณต้องการหยุดการทำงานของคอนเทนเนอร์ที่กำลังทำงานอยู่, ใช้คำสั่ง:

```bash
docker stop <container_id>
```

### 3.4 การลบคอนเทนเนอร์

การลบคอนเทนเนอร์ที่หยุดทำงานแล้ว:

```bash
docker rm <container_id>
```

### 3.5 การลบ Docker Image

หากคุณต้องการลบ Docker image:

```bash
docker rmi <image_id>
```

## 4. การสร้าง Dockerfile และการสร้าง Docker Image

### 4.1 การสร้าง Dockerfile

Dockerfile คือไฟล์ที่ใช้ในการกำหนดขั้นตอนการสร้าง Docker image ด้วยคำสั่งต่างๆ เช่น การติดตั้งซอฟต์แวร์ และการคอนฟิกการทำงาน

ตัวอย่าง Dockerfile สำหรับสร้างแอปพลิเคชัน Node.js:

```dockerfile
# ใช้ base image ของ Node.js
FROM node:14

# กำหนด working directory
WORKDIR /app

# คัดลอกไฟล์ package.json และ package-lock.json
COPY package*.json ./

# ติดตั้ง dependencies
RUN npm install

# คัดลอกไฟล์โปรเจคทั้งหมด
COPY . .

# เปิดพอร์ตที่แอปพลิเคชันจะใช้
EXPOSE 3000

# เรียกใช้งานคำสั่งในการเริ่มแอปพลิเคชัน
CMD ["npm", "start"]
```

### 4.2 การสร้าง Docker Image

หลังจากสร้าง Dockerfile แล้ว คุณสามารถใช้คำสั่ง `docker build` เพื่อสร้าง Docker image:

```bash
docker build -t my-node-app .
```

## 5. การใช้ Docker Compose

### 5.1 การติดตั้ง Docker Compose

Docker Compose ช่วยให้คุณสามารถจัดการกับหลายๆ คอนเทนเนอร์ในครั้งเดียว คุณสามารถติดตั้ง Docker Compose ได้ดังนี้:

```bash
# ดาวน์โหลดไฟล์ Docker Compose
sudo curl -L "https://github.com/docker/compose/releases/download/1.29.2/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose

# เปลี่ยนสิทธิ์การเข้าถึงไฟล์
sudo chmod +x /usr/local/bin/docker-compose
```

### 5.2 การใช้งาน Docker Compose

การใช้ Docker Compose ช่วยให้คุณสามารถกำหนดหลายคอนเทนเนอร์ในไฟล์ `docker-compose.yml` และรันทั้งหมดได้ในคำสั่งเดียว ตัวอย่างไฟล์ `docker-compose.yml`:

```yaml
version: '3'
services:
  web:
    image: nginx:latest
    ports:
      - "80:80"
  db:
    image: postgres:latest
    environment:
      POSTGRES_PASSWORD: example
```

จากนั้นใช้คำสั่ง `docker-compose` เพื่อรันทั้งสองคอนเทนเนอร์:

```bash
docker-compose up
```

## 6. การรักษาความปลอดภัยของ Docker

### 6.1 การใช้ Docker ในโหมดไม่สามารถเข้าถึงได้

เพื่อเพิ่มความปลอดภัย, ควรใช้ Docker ในโหมดที่จำกัดการเข้าถึงจากผู้ใช้ภายนอก:

```bash
sudo docker run --security-opt=no-new-privileges -it ubuntu bash
```

### 6.2 การตั้งค่าการเข้าถึง Docker

การกำหนดให้ผู้ใช้สามารถใช้งาน Docker โดยไม่ต้องใช้ `sudo`:

```bash
sudo usermod -aG docker $USER
```

## สรุป

Docker เป็นเครื่องมือที่มีประสิทธิภาพในการจัดการคอนเทนเนอร์และช่วยให้การพัฒนาและการปรับใช้งานแอปพลิเคชันทำได้ง่ายและเร็วขึ้น ด้วยการใช้งาน Docker บน Linux คุณสามารถสร้างและจัดการแอปพลิเคชันที่ทำงานในคอนเทนเนอร์ได้อย่างมีประสิทธิภาพและปลอดภัย