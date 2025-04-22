# การใช้ Docker

## Docker คืออะไร?
**Docker** คือแพลตฟอร์มที่ใช้ในการพัฒนา, ขนส่ง, และรันแอปพลิเคชันในรูปแบบของ **คอนเทนเนอร์** (Containers) ซึ่งสามารถช่วยให้การติดตั้ง, การจัดการ และการสเกลแอปพลิเคชันต่างๆ เป็นไปได้ง่ายขึ้น Docker ช่วยให้การทำงานกับแอปพลิเคชันในสภาพแวดล้อมที่แยกออกจากกันและกันได้อย่างมีประสิทธิภาพ

## การติดตั้ง Docker

### บน Windows
1. ดาวน์โหลด Docker Desktop จากเว็บไซต์ [Docker](https://www.docker.com/products/docker-desktop).
2. ติดตั้งโปรแกรมตามขั้นตอนในหน้าจอ.
3. เปิดโปรแกรม Docker Desktop หลังจากติดตั้งเสร็จ.

### บน macOS
1. ดาวน์โหลด Docker Desktop จากเว็บไซต์ [Docker](https://www.docker.com/products/docker-desktop).
2. เปิดไฟล์ DMG ที่ดาวน์โหลดมาและลาก Docker ลงในโฟลเดอร์ Applications.
3. เปิดโปรแกรม Docker Desktop.

### บน Linux
สำหรับ Ubuntu:
```bash
sudo apt-get update
sudo apt-get install apt-transport-https ca-certificates curl software-properties-common
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo apt-key add -
sudo add-apt-repository "deb [arch=amd64] https://download.docker.com/linux/ubuntu $(lsb_release -cs) stable"
sudo apt-get update
sudo apt-get install docker-ce
```

## คำสั่งพื้นฐานของ Docker

### 1. เช็คสถานะ Docker
```bash
docker --version
```

### 2. รัน Docker Container
```bash
docker run [OPTIONS] IMAGE [COMMAND] [ARG...]
```
ตัวอย่าง:
```bash
docker run hello-world
```
คำสั่งนี้จะดาวน์โหลดและรันภาพ `hello-world` ซึ่งจะทำการทดสอบว่า Docker ทำงานได้ถูกต้อง

### 3. ดู Docker Containers ที่กำลังทำงาน
```bash
docker ps
```

### 4. ดูทุก Container (รวมถึงที่หยุดทำงานแล้ว)
```bash
docker ps -a
```

### 5. สร้าง Docker Image จาก Dockerfile
สร้างไฟล์ `Dockerfile` ซึ่งระบุขั้นตอนในการสร้างภาพของแอปพลิเคชัน ตัวอย่างของ `Dockerfile`:
```Dockerfile
FROM ubuntu:20.04
RUN apt-get update && apt-get install -y python3
COPY . /app
CMD ["python3", "/app/my_script.py"]
```
หลังจากนั้นให้ใช้คำสั่ง:
```bash
docker build -t my-image .
```
คำสั่งนี้จะสร้าง Docker Image ชื่อ `my-image`

### 6. รัน Docker Container จาก Image
```bash
docker run -d --name my-container my-image
```

### 7. สตาร์ทและหยุด Container
- สตาร์ท:
  ```bash
  docker start my-container
  ```
- หยุด:
  ```bash
  docker stop my-container
  ```

### 8. ลบ Docker Containers
- ลบ container ที่หยุดทำงาน:
  ```bash
  docker rm my-container
  ```

### 9. ลบ Docker Image
```bash
docker rmi my-image
```

## Docker Compose

**Docker Compose** คือเครื่องมือที่ช่วยให้สามารถกำหนดและรันแอปพลิเคชันที่ประกอบด้วยหลายๆ คอนเทนเนอร์

### ขั้นตอนในการใช้ Docker Compose

1. สร้างไฟล์ `docker-compose.yml` สำหรับกำหนดคอนเทนเนอร์หลายตัวในแอปพลิเคชัน
   ตัวอย่างของ `docker-compose.yml`:
   ```yaml
   version: '3'
   services:
     web:
       image: nginx
       ports:
         - "80:80"
     db:
       image: mysql
       environment:
         MYSQL_ROOT_PASSWORD: example
   ```

2. รัน Docker Compose
   ```bash
   docker-compose up
   ```

3. หยุดและลบ Docker Compose
   ```bash
   docker-compose down
   ```

## การใช้งาน Docker ในการพัฒนา

1. **การสร้าง Dockerfile**: ใช้สำหรับกำหนดวิธีการสร้าง Docker Image สำหรับแอปพลิเคชันของคุณ
2. **การสร้าง Docker Container**: เมื่อคุณมี Docker Image แล้ว, คุณสามารถสร้างและรัน Container เพื่อทำงานกับแอปพลิเคชันของคุณ
3. **การใช้ Docker Compose**: เมื่อแอปพลิเคชันของคุณประกอบไปด้วยหลายๆ คอนเทนเนอร์, Docker Compose จะช่วยให้คุณสามารถจัดการกับคอนเทนเนอร์เหล่านั้นได้ง่ายขึ้น

## ข้อดีของการใช้ Docker
- **การพัฒนาแบบแยกส่วน**: ช่วยให้แต่ละส่วนของแอปพลิเคชันทำงานในคอนเทนเนอร์แยกกัน โดยไม่กระทบกัน
- **การย้ายแอปพลิเคชันระหว่างสภาพแวดล้อม**: สามารถย้ายแอปพลิเคชันจากเครื่องหนึ่งไปยังเครื่องอื่นได้อย่างง่ายดาย
- **การตั้งค่าสภาพแวดล้อมแบบคงที่**: คุณสามารถกำหนดสภาพแวดล้อมที่ใช้งานใน Docker Image และมั่นใจว่าทุกครั้งที่รันแอปพลิเคชันนั้นจะมีสภาพแวดล้อมเดียวกัน
- **การทำงานร่วมกับ CI/CD**: Docker เหมาะกับการใช้งานร่วมกับกระบวนการ CI/CD เพื่อให้สามารถสร้างและทดสอบแอปพลิเคชันได้อย่างรวดเร็ว

## สรุป

Docker เป็นเครื่องมือที่ช่วยในการสร้างและจัดการแอปพลิเคชันที่ใช้เทคโนโลยีคอนเทนเนอร์ ทำให้สามารถพัฒนาและใช้งานแอปพลิเคชันได้ง่ายขึ้น ทั้งในแง่ของการติดตั้งและการใช้งาน Docker ช่วยให้การทำงานกับแอปพลิเคชันที่ซับซ้อนมีความยืดหยุ่นและง่ายดายมากยิ่งขึ้น โดยเฉพาะในงานที่เกี่ยวข้องกับการย้ายแอปพลิเคชันไปยังสภาพแวดล้อมที่ต่างกัน
```

ไฟล์นี้จะให้ข้อมูลที่ครอบคลุมเกี่ยวกับการใช้ Docker รวมถึงการติดตั้ง, การใช้คำสั่งพื้นฐาน, การใช้งาน Docker Compose และข้อดีต่างๆ ที่ Docker สามารถมอบให้กับนักพัฒนา