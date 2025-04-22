# Multi-Container Applications in Docker

## Multi-Container Applications คืออะไร?

**Multi-Container Applications** คือแอปพลิเคชันที่ใช้หลายๆ container ในการทำงานร่วมกันเพื่อให้บริการหรือทำงานต่างๆ ในระบบเดียว ตัวอย่างเช่น การใช้หลายๆ container สำหรับ web server, database, cache server, หรือ service อื่นๆ ในการสร้างแอปพลิเคชันที่มีการทำงานร่วมกัน ใน Docker, Multi-Container Applications จะถูกจัดการโดยใช้ **Docker Compose** ที่ช่วยให้สามารถรันและจัดการหลายๆ container ได้ง่ายและสะดวก

## ทำไมต้องใช้ Multi-Container Applications?

การใช้ Multi-Container Applications ช่วยให้คุณสามารถแยกการทำงานของแต่ละส่วนของแอปพลิเคชันออกจากกันอย่างชัดเจน ซึ่งมีข้อดีหลายประการ เช่น:

1. **การแยกความรับผิดชอบ**: แต่ละบริการหรือฟังก์ชันสามารถแยกออกจากกันใน container ต่างๆ ทำให้การจัดการและการพัฒนาเป็นไปได้ง่ายขึ้น
2. **ความยืดหยุ่น**: คุณสามารถเลือกใช้ container ที่เหมาะสมกับแต่ละบริการ เช่น ใช้ Redis สำหรับ caching, MySQL หรือ PostgreSQL สำหรับฐานข้อมูล
3. **การปรับขนาดได้**: คุณสามารถปรับขนาดของแต่ละบริการได้แยกจากกัน เช่น เพิ่มจำนวน container ของ database หรือ web server เพื่อรองรับการใช้งานที่มากขึ้น
4. **การพัฒนาและการทดสอบง่ายขึ้น**: การพัฒนาแอปพลิเคชันที่ใช้หลายบริการจะง่ายขึ้นเมื่อแต่ละส่วนทำงานใน container แยกกันและสามารถทดสอบได้แยกต่างหาก

## การใช้ Docker Compose สำหรับ Multi-Container Applications

**Docker Compose** เป็นเครื่องมือที่ช่วยในการจัดการ Multi-Container Applications โดยการใช้ไฟล์ `docker-compose.yml` เพื่อกำหนดการทำงานของบริการต่างๆ ภายในแอปพลิเคชันเดียว

### ตัวอย่างไฟล์ docker-compose.yml สำหรับ Multi-Container Application

สมมติว่าเราต้องการสร้างเว็บแอปพลิเคชันที่มี 3 บริการ:
1. **Web server**: บริการที่ให้บริการแอปพลิเคชัน
2. **Database**: ใช้ MySQL ในการจัดการข้อมูล
3. **Cache**: ใช้ Redis สำหรับ caching

ไฟล์ `docker-compose.yml` จะมีลักษณะดังนี้:

```yaml
version: '3'

services:
  web:
    image: my-web-app
    ports:
      - "8080:80"
    environment:
      - DATABASE_HOST=db
      - CACHE_HOST=cache
    depends_on:
      - db
      - cache

  db:
    image: mysql:5.7
    environment:
      MYSQL_ROOT_PASSWORD: rootpassword
      MYSQL_DATABASE: myapp
    volumes:
      - db-data:/var/lib/mysql

  cache:
    image: redis
    ports:
      - "6379:6379"

volumes:
  db-data:
```

ในตัวอย่างนี้:
- บริการ `web` เป็นเว็บเซิร์ฟเวอร์ที่เชื่อมต่อกับฐานข้อมูล `db` และ Redis `cache`
- บริการ `db` ใช้ MySQL และตั้งรหัสผ่านของ root user
- บริการ `cache` ใช้ Redis และเปิดพอร์ต 6379
- Docker Compose จะจัดการความสัมพันธ์ของบริการเหล่านี้เพื่อให้สามารถรันพร้อมกันได้

### คำอธิบายคำสั่งในไฟล์ `docker-compose.yml`:
- `depends_on`: กำหนดให้บริการ `web` ขึ้นอยู่กับบริการ `db` และ `cache`, Docker Compose จะรันบริการเหล่านี้ในลำดับที่ถูกต้อง
- `volumes`: กำหนด volume `db-data` สำหรับบริการ `db` เพื่อเก็บข้อมูลที่จำเป็น
- `environment`: ใช้สำหรับตั้งค่าตัวแปรสภาพแวดล้อมสำหรับแต่ละบริการ

## การรัน Multi-Container Application

หลังจากที่ได้สร้างไฟล์ `docker-compose.yml` แล้ว คุณสามารถใช้คำสั่ง `docker-compose up` เพื่อรันทั้ง 3 container ได้พร้อมกัน:

```bash
docker-compose up
```

คำสั่งนี้จะทำการดึง Docker images ที่จำเป็น, สร้าง container, และรันบริการทั้งหมดตามที่กำหนดในไฟล์ `docker-compose.yml`.

- หากต้องการรันใน background (detached mode):
  ```bash
  docker-compose up -d
  ```

## การเชื่อมต่อระหว่าง Containers

ใน Multi-Container Applications, containers สามารถเชื่อมต่อกันได้ผ่าน **Docker networking**. Docker Compose จะสร้าง network ที่เชื่อมต่อ container แต่ละตัวเข้าด้วยกันโดยอัตโนมัติเมื่อรัน `docker-compose up`. ดังนั้น, บริการต่างๆ สามารถเชื่อมต่อกันผ่านชื่อของบริการที่ระบุในไฟล์ `docker-compose.yml`.

ในตัวอย่างนี้:
- `web` จะเชื่อมต่อกับ `db` ผ่าน `DATABASE_HOST=db`
- `web` จะเชื่อมต่อกับ `cache` ผ่าน `CACHE_HOST=cache`

## การทำงานกับ Database และ Cache ใน Multi-Container Applications

### ตัวอย่างการเชื่อมต่อ Web Application กับ Database

เมื่อคุณพัฒนาแอปพลิเคชันที่ใช้หลายๆ container คุณสามารถตั้งค่าการเชื่อมต่อไปยังฐานข้อมูลในไฟล์ `docker-compose.yml` โดยใช้ environment variables เช่นในตัวอย่างด้านบนที่กำหนดตัวแปร `DATABASE_HOST=db`.

ในแอปพลิเคชัน, คุณสามารถเข้าถึงฐานข้อมูลโดยใช้ชื่อของบริการ `db` (ตามที่กำหนดใน Compose file) แทนการใช้ IP address ของ container เช่น:

```python
import mysql.connector

# การเชื่อมต่อไปยังฐานข้อมูล
db_connection = mysql.connector.connect(
    host="db",
    user="root",
    password="rootpassword",
    database="myapp"
)

# ทำงานกับฐานข้อมูล
cursor = db_connection.cursor()
cursor.execute("SELECT * FROM users")
```

### การใช้ Redis Cache

ในกรณีที่แอปพลิเคชันของคุณใช้ Redis สำหรับ caching, คุณสามารถใช้ชื่อของบริการ `cache` เพื่อเชื่อมต่อกับ Redis จากภายใน container ของ `web`.

ตัวอย่างการเชื่อมต่อ Redis:
```python
import redis

cache = redis.StrictRedis(host='cache', port=6379, db=0)

# การใช้ Redis ในการเก็บข้อมูล
cache.set('user:1', 'John Doe')
user = cache.get('user:1')
```

## การตรวจสอบและจัดการ Multi-Container Applications

Docker Compose ให้คำสั่งที่ช่วยให้คุณสามารถตรวจสอบสถานะของบริการและจัดการ container ที่กำลังรันได้ง่ายๆ:

- ดูสถานะของบริการทั้งหมด:
  ```bash
  docker-compose ps
  ```

- ดู log ของบริการ:
  ```bash
  docker-compose logs
  ```

- หยุดบริการทั้งหมด:
  ```bash
  docker-compose down
  ```

- หยุดบริการบางตัว:
  ```bash
  docker-compose stop <service_name>
  ```

## สรุป

**Multi-Container Applications** ใน Docker ช่วยให้การจัดการหลายๆ container ที่ทำงานร่วมกันเป็นเรื่องง่ายโดยใช้ **Docker Compose**. คุณสามารถกำหนดบริการต่างๆ ที่ต้องการใช้ภายในแอปพลิเคชันเดียวในไฟล์ `docker-compose.yml`, ซึ่งช่วยให้การสร้างและจัดการบริการต่างๆ เช่น web server, database, และ cache เป็นไปอย่างสะดวกและยืดหยุ่น Docker Compose ยังทำให้การพัฒนา, ทดสอบ, และรันแอปพลิเคชันที่ใช้หลายๆ container ในขั้นตอนเดียวเป็นไปได้ง่ายและรวดเร็ว