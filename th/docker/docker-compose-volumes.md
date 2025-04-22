# Docker Compose Volumes

## การใช้งาน Volumes ใน Docker Compose

**Volumes** ใน Docker Compose ใช้สำหรับจัดการการเก็บข้อมูลภายใน Docker containers. Volumes ช่วยให้คุณสามารถเก็บข้อมูลในที่ที่ปลอดภัยและสามารถเข้าถึงได้แม้จะมีการหยุดและเริ่มใหม่ของ container. Volumes ใช้เพื่อเก็บข้อมูลที่ไม่ต้องการให้หายไปเมื่อ container ถูกลบหรือสร้างใหม่ เช่น ฐานข้อมูล, ข้อมูลผู้ใช้, หรือข้อมูลแคชต่างๆ.

## การใช้ Volumes ใน Docker Compose

ใน Docker Compose, คุณสามารถกำหนด volumes ในไฟล์ `docker-compose.yml` ได้ทั้งในระดับบริการ (services) และในระดับการกำหนดค่าของโครงสร้าง (top-level).

### การกำหนด Volumes ในไฟล์ `docker-compose.yml`

ตัวอย่างการใช้ volumes ใน Docker Compose:

```yaml
version: '3'

services:
  app:
    image: my-app
    volumes:
      - mydata:/app/data
    networks:
      - frontend

volumes:
  mydata:
    driver: local
```

ในตัวอย่างนี้:
- เรามีบริการ `app` ที่เชื่อมต่อกับ volume ชื่อ `mydata`
- Volume นี้จะถูกผูกเข้ากับ path `/app/data` ภายใน container
- เรากำหนด volume `mydata` ให้ใช้ driver `local` ซึ่งเป็น driver ที่ Docker ใช้ในระบบ local โดยค่าเริ่มต้น

### การเชื่อมต่อ Volume กับ Container

ใน Docker Compose, คุณสามารถกำหนด volumes ให้เชื่อมต่อกับ path ภายใน container โดยใช้โครงสร้าง `volumes` ในบริการ (services) ในไฟล์ `docker-compose.yml`. ตัวอย่างนี้จะแสดงการผูก volume กับ directory ภายใน container:

```yaml
version: '3'

services:
  db:
    image: postgres
    volumes:
      - db-data:/var/lib/postgresql/data
    environment:
      POSTGRES_PASSWORD: example

volumes:
  db-data:
    driver: local
```

ในตัวอย่างนี้:
- `db` เป็นบริการที่ใช้ภาพ `postgres`
- เราผูก volume `db-data` กับ path `/var/lib/postgresql/data` ภายใน container เพื่อเก็บข้อมูลฐานข้อมูล
- `db-data` ใช้ driver `local` ซึ่งเป็นค่ามาตรฐาน

## การใช้ Named Volumes

Docker Compose รองรับการใช้ **named volumes** ซึ่งหมายถึง volume ที่มีชื่อที่คุณกำหนดให้กับมัน. Named volumes จะถูกเก็บและบริหารจัดการโดย Docker.

### การสร้างและใช้ Named Volumes

คุณสามารถกำหนดชื่อ volume ให้กับข้อมูลของ container โดยใช้โครงสร้างในระดับ `top-level` ดังนี้:

```yaml
version: '3'

services:
  web:
    image: nginx
    volumes:
      - web-data:/usr/share/nginx/html

volumes:
  web-data:
    driver: local
```

ในตัวอย่างนี้:
- `web-data` เป็น named volume ที่ Docker จะจัดการให้
- Path `/usr/share/nginx/html` ใน container จะผูกกับ volume `web-data` ที่กำหนด

## การใช้ Anonymous Volumes

**Anonymous Volumes** คือ volumes ที่ไม่ระบุชื่อในไฟล์ `docker-compose.yml`. โดยปกติแล้ว Docker Compose จะสร้าง volume ใหม่เมื่อ container ที่รันไม่ต้องการการเก็บข้อมูลที่เป็น persistent storage.

### การใช้ Anonymous Volumes

ตัวอย่างการใช้ anonymous volumes ใน Docker Compose:

```yaml
version: '3'

services:
  app:
    image: my-app
    volumes:
      - /app/data
```

ในตัวอย่างนี้:
- Docker จะสร้าง anonymous volume โดยอัตโนมัติและผูกกับ path `/app/data` ใน container
- Anonymous volume จะไม่ถูกตั้งชื่อและจะถูกลบออกเมื่อ container ถูกลบ

## การใช้ Bind Mounts

นอกจากการใช้ volumes ที่จัดการโดย Docker แล้ว, คุณยังสามารถใช้ **bind mounts** เพื่อผูก directory บน host machine กับ container. โดยปกติแล้ว bind mounts ใช้ในกรณีที่ต้องการให้ข้อมูลระหว่าง host และ container เชื่อมโยงกัน.

### การใช้ Bind Mounts

ตัวอย่างการใช้ bind mount:

```yaml
version: '3'

services:
  app:
    image: my-app
    volumes:
      - ./data:/app/data
```

ในตัวอย่างนี้:
- เราผูก directory `./data` บนเครื่องโฮสต์กับ `/app/data` ใน container
- การใช้ bind mount จะทำให้ข้อมูลที่เก็บใน `./data` บนเครื่องโฮสต์สามารถเข้าถึงได้จาก container และสามารถแก้ไขได้จากทั้งสองฝั่ง

## การใช้ Volumes ในหลายๆ บริการ

คุณสามารถใช้ volume เดียวกันในหลายๆ บริการ (services) ภายใน Docker Compose ได้ โดยไม่ต้องสร้าง volume หลายๆ ตัว. ตัวอย่างนี้แสดงให้เห็นว่า container `web` และ `app` ใช้ volume เดียวกัน:

```yaml
version: '3'

services:
  web:
    image: nginx
    volumes:
      - shared-data:/usr/share/nginx/html

  app:
    image: my-app
    volumes:
      - shared-data:/app/data

volumes:
  shared-data:
    driver: local
```

ในตัวอย่างนี้:
- `shared-data` เป็น volume ที่ใช้ในทั้งสองบริการ (`web` และ `app`)
- Docker Compose จะใช้ volume เดียวกันสำหรับ container ทั้งสอง ซึ่งหมายความว่าข้อมูลใน `/usr/share/nginx/html` และ `/app/data` จะสามารถแชร์กันได้ระหว่าง container ทั้งสอง

## การจัดการ Volumes

### การดูรายการ Volumes

คุณสามารถใช้คำสั่ง `docker volume ls` เพื่อดูรายการ volumes ที่มีอยู่ในระบบ Docker:

```bash
docker volume ls
```

### การลบ Volumes

หากคุณต้องการลบ volume ที่ไม่ใช้งานแล้ว สามารถใช้คำสั่ง `docker volume rm`:

```bash
docker volume rm volume_name
```

### การลบ Volumes อัตโนมัติเมื่อหยุดการทำงานของ Docker Compose

คุณสามารถตั้งค่าให้ Docker Compose ลบ volumes อัตโนมัติเมื่อหยุดโปรเจกต์ Compose โดยการใช้ `--volumes` หรือ `-v` ในคำสั่ง `docker-compose down`:

```bash
docker-compose down -v
```

คำสั่งนี้จะหยุดบริการทั้งหมดและลบ volumes ที่เกี่ยวข้อง

## สรุป

การใช้ volumes ใน Docker Compose เป็นวิธีที่ดีในการจัดการข้อมูลที่ต้องการเก็บถาวรระหว่างการรัน container. Docker Compose รองรับการใช้ named volumes, anonymous volumes, และ bind mounts ซึ่งแต่ละแบบมีลักษณะและการใช้งานที่แตกต่างกัน. นอกจากนี้ยังมีวิธีการจัดการ volumes เช่น การลบ volumes ที่ไม่ใช้งานแล้ว และการแชร์ volumes ระหว่างหลายๆ บริการใน Docker Compose.