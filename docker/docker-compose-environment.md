# Docker Compose Environment

## การใช้งาน Environment Variables ใน Docker Compose

**Environment variables** เป็นเครื่องมือที่มีประโยชน์ในการกำหนดค่าต่างๆ ใน Docker Compose, ซึ่งสามารถใช้ในการตั้งค่าเช่นพอร์ต, การเชื่อมต่อฐานข้อมูล, หรือข้อมูลการกำหนดค่าอื่นๆ ที่อาจแตกต่างกันระหว่างการพัฒนา, การทดสอบ, และการผลิต (production). การใช้ environment variables ทำให้โปรเจกต์ของคุณยืดหยุ่นและสามารถนำไปใช้ในสภาพแวดล้อมที่ต่างกันได้ง่ายขึ้น.

## การตั้งค่า Environment Variables ใน Docker Compose

คุณสามารถกำหนด environment variables ได้ในไฟล์ `docker-compose.yml` ภายใต้ `environment` section ของแต่ละบริการ (service). นอกจากนี้, Docker Compose ยังรองรับการใช้ไฟล์ `.env` เพื่อจัดการกับ environment variables ได้อีกด้วย.

### การกำหนด Environment Variables ใน `docker-compose.yml`

ตัวอย่างการกำหนด environment variables ในไฟล์ `docker-compose.yml`:

```yaml
version: '3'

services:
  web:
    image: nginx
    environment:
      - NGINX_HOST=localhost
      - NGINX_PORT=80
```

ในตัวอย่างนี้:
- เรากำหนด environment variables `NGINX_HOST` และ `NGINX_PORT` สำหรับบริการ `web` ที่ใช้ภาพ `nginx`
- ตัวแปรเหล่านี้จะถูกใช้ภายใน container เพื่อกำหนดค่าต่างๆ เช่น โฮสต์และพอร์ตของ nginx

### การใช้ Environment Variables จากไฟล์ `.env`

การใช้ไฟล์ `.env` ช่วยให้คุณจัดการ environment variables ได้สะดวกยิ่งขึ้นโดยไม่ต้องเขียนลงในไฟล์ `docker-compose.yml` โดยตรง. Docker Compose จะโหลดไฟล์ `.env` อัตโนมัติเมื่อรันคำสั่ง.

#### ตัวอย่างไฟล์ `.env`:

```env
NGINX_HOST=localhost
NGINX_PORT=80
```

#### ตัวอย่างการใช้งานใน `docker-compose.yml`:

```yaml
version: '3'

services:
  web:
    image: nginx
    environment:
      - NGINX_HOST=${NGINX_HOST}
      - NGINX_PORT=${NGINX_PORT}
```

ในตัวอย่างนี้:
- Docker Compose จะโหลด environment variables จากไฟล์ `.env` และใช้ค่าที่กำหนดในไฟล์นั้นใน `docker-compose.yml`
- `${NGINX_HOST}` และ `${NGINX_PORT}` จะถูกแทนที่ด้วยค่าที่กำหนดในไฟล์ `.env`

### การตั้งค่าพร้อมค่าเริ่มต้น (Default Values) ด้วย `env_file`

คุณสามารถใช้ตัวเลือก `env_file` เพื่อโหลด environment variables จากไฟล์ `.env` หรือไฟล์อื่นๆ ที่คุณต้องการ โดยไม่จำเป็นต้องใช้ทุกตัวแปรใน `docker-compose.yml`.

#### ตัวอย่างการใช้งาน `env_file`:

```yaml
version: '3'

services:
  web:
    image: nginx
    env_file:
      - .env
```

ในตัวอย่างนี้:
- Docker Compose จะโหลด environment variables ทั้งหมดจากไฟล์ `.env` และใช้ค่าที่กำหนดให้กับบริการ `web`

## การใช้ Environment Variables ในคำสั่ง `docker-compose` CLI

คุณยังสามารถใช้ environment variables ได้ในคำสั่ง `docker-compose` โดยการกำหนดค่าในบรรทัดคำสั่งโดยตรง. ตัวอย่างเช่น:

```bash
export NGINX_HOST=localhost
export NGINX_PORT=80

docker-compose up
```

ในกรณีนี้, environment variables ที่ถูกกำหนดในเทอร์มินัลจะถูกใช้งานโดย Docker Compose ในขณะรันคำสั่ง.

## การใช้ Environment Variables ใน Volume หรือ Network

คุณสามารถใช้ environment variables ได้ในส่วนของ volumes หรือ networks ภายใน `docker-compose.yml`. ตัวอย่างเช่น:

### ตัวอย่างการใช้ Environment Variables ใน Volume

```yaml
version: '3'

services:
  app:
    image: my-app
    volumes:
      - ${APP_DATA_PATH}:/app/data
```

ในตัวอย่างนี้:
- Docker Compose จะใช้ environment variable `APP_DATA_PATH` เพื่อกำหนด path ที่ใช้สำหรับ mount volume ไปยัง `/app/data` ภายใน container

### ตัวอย่างการใช้ Environment Variables ใน Network

```yaml
version: '3'

services:
  web:
    image: nginx
    networks:
      - ${NETWORK_NAME}

networks:
  ${NETWORK_NAME}:
    driver: bridge
```

ในตัวอย่างนี้:
- Docker Compose จะใช้ environment variable `NETWORK_NAME` เพื่อกำหนดชื่อของ network ที่จะเชื่อมต่อกับบริการ `web`

## การ Override ค่า Environment Variables

คุณสามารถใช้ environment variables ที่กำหนดไว้ในไฟล์ `.env`, คำสั่ง CLI, หรือใน `docker-compose.yml` ได้ แต่ Docker Compose จะให้ความสำคัญกับการกำหนดค่าในลำดับดังนี้:
1. Environment variables ที่ถูกกำหนดในคำสั่ง `docker-compose` CLI
2. Environment variables ที่ถูกกำหนดในไฟล์ `.env`
3. Environment variables ที่ถูกกำหนดใน `docker-compose.yml`

หากมีการกำหนด environment variable ซ้ำกันในหลายแหล่ง, ค่าที่อยู่ในลำดับสูงสุดจะถูกนำมาใช้

## การใช้งาน Environment Variables กับ Docker Secrets

สำหรับการใช้งานกับข้อมูลที่เป็นความลับ เช่น รหัสผ่าน, คีย์ API, หรือข้อมูลที่ต้องการความปลอดภัยสูง, คุณสามารถใช้ **Docker Secrets** ร่วมกับ environment variables เพื่อจัดการข้อมูลที่มีความปลอดภัย. Docker Secrets ช่วยให้คุณสามารถจัดการกับข้อมูลที่ต้องการความปลอดภัยสูงได้โดยไม่ต้องเขียนข้อมูลเหล่านั้นในไฟล์ `docker-compose.yml`.

การใช้งาน Docker Secrets สามารถทำได้โดยการใช้ Docker Swarm หรือ Docker Compose ที่รองรับ Docker Secrets ในเวอร์ชันที่สูงขึ้น.

## สรุป

การใช้ **environment variables** ใน Docker Compose ทำให้คุณสามารถจัดการการตั้งค่าภายใน container ได้ยืดหยุ่นและสะดวกยิ่งขึ้น. คุณสามารถใช้ environment variables จากไฟล์ `.env`, กำหนดค่าผ่าน CLI, หรือกำหนดค่าภายใน `docker-compose.yml` เอง. นอกจากนี้ยังสามารถใช้ environment variables ในการตั้งค่าการเชื่อมต่อ volume, networks, และในหลายๆ บริการภายในโปรเจกต์ Docker Compose ของคุณ.