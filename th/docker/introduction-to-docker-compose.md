# Introduction to Docker Compose

## Docker Compose คืออะไร?

**Docker Compose** เป็นเครื่องมือที่ใช้ในการจัดการหลายๆ container ในรูปแบบของแอปพลิเคชันเดียวโดยการกำหนดค่าผ่านไฟล์ `docker-compose.yml`. Docker Compose ช่วยให้คุณสามารถรันและจัดการหลายๆ container ที่มีความสัมพันธ์กัน เช่น ระบบที่ประกอบไปด้วย web server, database, และ service อื่นๆ ในขั้นตอนเดียว โดยไม่ต้องรันคำสั่ง `docker run` ทีละตัวแยกกัน

## ทำไมต้องใช้ Docker Compose?

เมื่อแอปพลิเคชันของคุณประกอบไปด้วยหลายๆ service (เช่น database, web server, cache server), การตั้งค่าและการรัน container ต่างๆ ทีละตัวสามารถทำให้กระบวนการทำงานยุ่งยากและไม่สะดวก Docker Compose ทำให้การจัดการหลายๆ container เป็นเรื่องง่าย เพราะคุณสามารถกำหนดทุกอย่างในไฟล์ `docker-compose.yml` และใช้คำสั่งเดียวเพื่อจัดการทั้งหมด

## วิธีการทำงานของ Docker Compose

Docker Compose ใช้ไฟล์ `docker-compose.yml` ที่ประกอบไปด้วยการกำหนดค่าเกี่ยวกับบริการต่างๆ เช่น ภาพ Docker (Docker images), พอร์ตที่เปิดใช้งาน, environment variables, volume ที่ใช้, และเครือข่าย (networks). โดยในไฟล์นี้คุณสามารถกำหนดทุกสิ่งที่จำเป็นเพื่อสร้างและรัน container ในลำดับขั้นตอนเดียว

## ติดตั้ง Docker Compose

Docker Compose สามารถติดตั้งได้ง่ายๆ ผ่านคำสั่งในเครื่องที่ติดตั้ง Docker แล้ว:

1. **Windows / macOS**: Docker Compose จะถูกติดตั้งมาพร้อมกับ Docker Desktop.
2. **Linux**: สามารถติดตั้ง Docker Compose ด้วยคำสั่ง:
    ```bash
    sudo curl -L "https://github.com/docker/compose/releases/download/1.29.2/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
    sudo chmod +x /usr/local/bin/docker-compose
    ```

3. ตรวจสอบการติดตั้ง:
    ```bash
    docker-compose --version
    ```

## การสร้างไฟล์ docker-compose.yml

ไฟล์ `docker-compose.yml` คือไฟล์ที่ใช้กำหนดบริการต่างๆ ใน Docker Compose ซึ่งในไฟล์นี้คุณจะระบุบริการที่ต้องการใช้งาน, พอร์ตที่ต้องการเชื่อมต่อ, เครือข่ายที่ใช้, และ volume ที่แชร์กันระหว่าง container ต่างๆ

### ตัวอย่างของไฟล์ docker-compose.yml:

```yaml
version: '3'
services:
  web:
    image: nginx
    ports:
      - "8080:80"
  db:
    image: mysql:5.7
    environment:
      MYSQL_ROOT_PASSWORD: example
    volumes:
      - db-data:/var/lib/mysql
volumes:
  db-data:
```

ในตัวอย่างนี้:
- เรามี 2 บริการ: `web` และ `db`
- บริการ `web` ใช้ Docker image ของ `nginx` และเปิดพอร์ต 80 ภายใน container มาเชื่อมต่อกับพอร์ต 8080 บน host
- บริการ `db` ใช้ Docker image ของ `mysql:5.7` และตั้งค่ารหัสผ่านสำหรับ root user ผ่าน environment variable
- บริการ `db` ยังใช้ volume `db-data` เพื่อเก็บข้อมูลที่สามารถใช้งานได้ระหว่างการรัน container หลายๆ ครั้ง

## การใช้งาน Docker Compose

หลังจากที่คุณได้สร้างไฟล์ `docker-compose.yml` แล้ว คุณสามารถใช้คำสั่งต่างๆ ของ Docker Compose เพื่อจัดการ container หลายๆ ตัวได้ง่ายๆ

### การรัน Docker Compose
```bash
docker-compose up
```
คำสั่งนี้จะสร้างและรัน container ทุกตัวที่ระบุในไฟล์ `docker-compose.yml` โดยอัตโนมัติ

- ถ้าคุณต้องการรันใน background สามารถใช้ `-d` (detached mode):
  ```bash
  docker-compose up -d
  ```

### การหยุดการทำงานของ Docker Compose
```bash
docker-compose down
```
คำสั่งนี้จะหยุดและลบ container ที่กำลังรัน รวมถึง network และ volume ที่สร้างขึ้นในระหว่างการรัน

### การดู log ของ container
```bash
docker-compose logs
```
คำสั่งนี้จะช่วยให้คุณสามารถดู log ของบริการทั้งหมดที่กำลังรัน

### การหยุดบริการบางตัว
```bash
docker-compose stop <service_name>
```
คุณสามารถหยุดบริการบางตัวโดยระบุชื่อบริการที่ต้องการ

## Docker Compose กับการทำงานในสภาพแวดล้อมการพัฒนา

Docker Compose มักจะถูกใช้ในสภาพแวดล้อมการพัฒนาเพื่อให้การตั้งค่าบริการต่างๆ ที่ซับซ้อนเป็นเรื่องง่าย ตัวอย่างเช่น คุณสามารถใช้ Docker Compose เพื่อสร้างสภาพแวดล้อมการพัฒนาแบบครบวงจรที่มีทั้ง web server, database, และ cache server ในคำสั่งเดียว

### ตัวอย่างการใช้งาน Docker Compose ในการพัฒนาเว็บแอป

สมมติว่าเรากำลังพัฒนาเว็บแอปที่ต้องการใช้งานฐานข้อมูล MySQL และ Redis, ไฟล์ `docker-compose.yml` อาจมีลักษณะดังนี้:

```yaml
version: '3'
services:
  web:
    build: .
    ports:
      - "5000:5000"
    environment:
      - FLASK_ENV=development
  db:
    image: mysql:5.7
    environment:
      MYSQL_ROOT_PASSWORD: mysecretpassword
    volumes:
      - db-data:/var/lib/mysql
  redis:
    image: redis
volumes:
  db-data:
```

ในตัวอย่างนี้:
- บริการ `web` จะถูกสร้างจาก Dockerfile ในไดเรกทอรีปัจจุบันและจะเปิดพอร์ต 5000
- บริการ `db` ใช้ MySQL image และตั้งค่า password สำหรับ root user
- บริการ `redis` ใช้ Redis image

เมื่อคุณรัน `docker-compose up`, Docker Compose จะสร้างและรัน container ที่เกี่ยวข้องทั้งหมดโดยอัตโนมัติ

## สรุป

**Docker Compose** เป็นเครื่องมือที่ช่วยให้การจัดการหลายๆ container ที่ทำงานร่วมกันในแอปพลิเคชันเดียวเป็นเรื่องง่ายและสะดวก โดยการกำหนดค่าบริการต่างๆ ผ่านไฟล์ `docker-compose.yml`. Docker Compose ช่วยให้คุณสามารถเริ่มต้นการพัฒนาและทดสอบแอปพลิเคชันที่มีหลายๆ บริการได้อย่างรวดเร็ว ด้วยคำสั่งไม่กี่คำสั่งเดียว