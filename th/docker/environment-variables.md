# Environment Variables in Docker

## การใช้ Environment Variables ใน Docker

**Environment Variables** คือค่าที่สามารถตั้งค่าและนำไปใช้ใน container หรือ application โดยทั่วไปแล้วจะใช้ในการตั้งค่าพารามิเตอร์ต่างๆ ที่สามารถปรับเปลี่ยนได้โดยไม่ต้องแก้ไขโค้ดของโปรแกรมโดยตรง การใช้ **Environment Variables** ช่วยให้สามารถจัดการและคอนฟิกค่าเหล่านี้ได้ง่ายขึ้น โดยเฉพาะในสภาพแวดล้อมที่ต้องการความยืดหยุ่น เช่น การตั้งค่าผ่านการรัน container ใน Docker

## วิธีการตั้งค่า Environment Variables

Docker ให้ความสามารถในการตั้งค่า **Environment Variables** เมื่อรัน container ด้วยคำสั่ง `-e` หรือ `--env`

### Syntax:
```bash
docker run -e <VARIABLE_NAME>=<value> <image_name>
```
ตัวอย่าง:
```bash
docker run -e MY_APP_ENV=production my-app
```
ในตัวอย่างนี้:
- `MY_APP_ENV` เป็นตัวแปรสภาพแวดล้อม (environment variable)
- `production` คือค่าของตัวแปร
- `my-app` คือ Docker image ที่จะรัน

### การใช้หลายๆ Environment Variables

คุณสามารถตั้งค่าได้หลายตัวแปรพร้อมกันโดยใช้คำสั่ง `-e` หลายครั้ง:

```bash
docker run -e MY_APP_ENV=production -e DATABASE_URL=mongodb://localhost:27017 my-app
```

### การใช้ไฟล์ `.env` สำหรับ Environment Variables

หากคุณมีหลายตัวแปรที่ต้องการตั้งค่า, การใช้ไฟล์ `.env` อาจทำให้การตั้งค่ารวดเร็วและจัดการได้ง่ายขึ้น โดยไฟล์ `.env` จะประกอบด้วยตัวแปรต่างๆ ในรูปแบบ `KEY=VALUE`

ตัวอย่างไฟล์ `.env`:
```bash
MY_APP_ENV=production
DATABASE_URL=mongodb://localhost:27017
SECRET_KEY=my-secret-key
```

จากนั้น, คุณสามารถใช้คำสั่ง `--env-file` เพื่อนำไฟล์นี้มาใช้ในการรัน container:
```bash
docker run --env-file .env my-app
```

## การใช้ Environment Variables ภายใน Dockerfile

คุณสามารถใช้ **Environment Variables** ภายใน Dockerfile โดยใช้คำสั่ง `ENV`. คำสั่งนี้จะตั้งค่าตัวแปรภายใน container และสามารถใช้ในการกำหนดค่าต่างๆ ที่จะถูกใช้ในระหว่างการสร้าง container หรือเมื่อ container รัน

### ตัวอย่างการใช้ `ENV` ใน Dockerfile:
```Dockerfile
FROM node:14

# ตั้งค่าตัวแปรสภาพแวดล้อม
ENV NODE_ENV=production
ENV PORT=3000

# ติดตั้ง dependencies และรันแอปพลิเคชัน
WORKDIR /app
COPY . .
RUN npm install
CMD ["npm", "start"]
```
ในที่นี้:
- ตัวแปร `NODE_ENV` ถูกตั้งค่าเป็น `production`
- ตัวแปร `PORT` ถูกตั้งค่าเป็น `3000`

เมื่อ container ถูกรัน, ตัวแปรเหล่านี้จะสามารถใช้ได้ภายใน container

## การเรียกใช้ Environment Variables ในภาษาต่างๆ

หลังจากที่ได้ตั้งค่า **Environment Variables** แล้ว คุณสามารถเรียกใช้ตัวแปรเหล่านี้ในแอปพลิเคชันของคุณได้ โดยขึ้นอยู่กับภาษาการพัฒนาและเทคโนโลยีที่ใช้งาน

### ตัวอย่างใน Node.js:
```javascript
const environment = process.env.NODE_ENV;
const port = process.env.PORT || 3000;

console.log(`App is running in ${environment} mode on port ${port}`);
```

### ตัวอย่างใน Python:
```python
import os

environment = os.getenv('NODE_ENV')
port = os.getenv('PORT', 3000)

print(f"App is running in {environment} mode on port {port}")
```

### ตัวอย่างใน Bash:
```bash
echo "App is running in $NODE_ENV mode on port $PORT"
```

## ข้อดีของการใช้ Environment Variables

1. **ความยืดหยุ่น**: คุณสามารถปรับเปลี่ยนค่าของ environment variables ได้โดยไม่ต้องแก้ไขโค้ดของแอปพลิเคชัน
2. **ความปลอดภัย**: สามารถใช้ environment variables ในการเก็บข้อมูลที่สำคัญเช่น API keys, passwords, หรือ tokens แทนการเก็บในโค้ด
3. **การจัดการง่าย**: การใช้ไฟล์ `.env` ช่วยให้การตั้งค่าตัวแปรต่างๆ ง่ายและสะดวกในการจัดการ

## การตรวจสอบ Environment Variables

หากคุณต้องการตรวจสอบค่าของ environment variables ที่ถูกตั้งค่าใน container ที่กำลังรันอยู่, คุณสามารถใช้คำสั่ง `docker exec` เพื่อลงใน container และใช้คำสั่ง `env` หรือ `printenv`

```bash
docker exec -it <container_id> env
```

การแสดงผลจะเป็นค่าต่างๆ ที่ถูกตั้งไว้ใน container เช่น:
```
MY_APP_ENV=production
DATABASE_URL=mongodb://localhost:27017
SECRET_KEY=my-secret-key
```

## สรุป

การใช้ **Environment Variables** ใน Docker ช่วยให้การตั้งค่าระบบและแอปพลิเคชันใน container เป็นไปได้ง่ายและยืดหยุ่นมากขึ้น คุณสามารถตั้งค่า environment variables ทั้งในขณะรัน container โดยใช้คำสั่ง `-e`, ใน Dockerfile ด้วยคำสั่ง `ENV`, หรือใช้ไฟล์ `.env` เพื่อจัดการค่าต่างๆ ในการรัน Docker container ได้อย่างสะดวก การใช้ environment variables ยังช่วยเพิ่มความปลอดภัยในการจัดการข้อมูลสำคัญและสามารถทำให้แอปพลิเคชันทำงานได้ในหลายๆ สภาพแวดล้อม