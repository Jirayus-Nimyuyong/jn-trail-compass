# Docker Compose Networking

## การจัดการเครือข่ายใน Docker Compose

**Docker Compose** ช่วยให้คุณสามารถจัดการหลายๆ container ที่เชื่อมต่อกันเป็นแอปพลิเคชันเดียวได้อย่างง่ายดาย ผ่านการกำหนดในไฟล์ `docker-compose.yml`. เมื่อคุณใช้งาน Docker Compose, ทุกๆ container ที่รันจากไฟล์ Compose จะถูกเชื่อมต่อใน network เดียวกันโดยอัตโนมัติ หรือคุณสามารถกำหนดเครือข่าย (network) เองได้ตามต้องการเพื่อควบคุมการสื่อสารระหว่าง container.

## Network Modes ใน Docker Compose

Docker Compose รองรับหลายโหมดเครือข่ายที่ช่วยให้คุณสามารถกำหนดรูปแบบการเชื่อมต่อระหว่าง container ได้

### 1. **Bridge Network** (Default)
เมื่อคุณสร้าง container ด้วย Docker Compose โดยไม่ได้กำหนดเครือข่ายเอง, Docker Compose จะเชื่อมต่อ container ทั้งหมดที่รันในโปรเจกต์นั้นๆ ไปยัง **bridge network** ที่ชื่อเดียวกัน (ซึ่งเป็นค่า default). Container ใน bridge network สามารถสื่อสารกันได้ แต่ไม่สามารถสื่อสารกับ container จากโปรเจกต์อื่นๆ ได้.

### 2. **Host Network**
การใช้ host network หมายความว่า container จะใช้เครือข่ายของโฮสต์โดยตรง. การตั้งค่าเครือข่ายนี้จะช่วยให้ container สามารถใช้พอร์ตของโฮสต์ได้เลย แต่จะทำให้ container ไม่มีการแยกเครือข่ายจากโฮสต์.

### 3. **None Network**
หากคุณต้องการให้ container ไม่มีการเชื่อมต่อกับเครือข่ายใดๆ เลย, คุณสามารถเลือกใช้ mode `none`. ในโหมดนี้, container จะไม่มีการเชื่อมต่อเครือข่ายภายนอก

### 4. **Custom Networks**
Docker Compose ยังรองรับการสร้าง **custom networks** ซึ่งคุณสามารถกำหนดรูปแบบการเชื่อมต่อระหว่าง container ได้เอง รวมถึงการตั้งค่าการกำหนด IP address, driver ที่ใช้ และ options อื่นๆ เพื่อควบคุมการทำงานของเครือข่าย.

## การสร้างและกำหนดเครือข่ายใน Docker Compose

การสร้างเครือข่ายใน Docker Compose สามารถทำได้โดยการกำหนดในไฟล์ `docker-compose.yml`. ตัวอย่างนี้จะแสดงวิธีการสร้างและกำหนดเครือข่ายแบบกำหนดเอง (custom network) ในไฟล์ Compose.

### ตัวอย่างการกำหนดเครือข่ายใน `docker-compose.yml`

```yaml
version: '3'

services:
  web:
    image: nginx
    networks:
      - frontend
      - backend

  app:
    image: my-app
    networks:
      - backend

  db:
    image: postgres
    networks:
      - backend

networks:
  frontend:
    driver: bridge
  backend:
    driver: bridge
```

ในตัวอย่างนี้:
- เรากำหนดสองเครือข่าย (networks): `frontend` และ `backend`
- Container `web` จะเชื่อมต่อกับเครือข่ายทั้งสอง (`frontend` และ `backend`)
- Container `app` และ `db` จะเชื่อมต่อกับเครือข่าย `backend` เท่านั้น
- ทั้ง `frontend` และ `backend` ใช้ **bridge driver** ซึ่งเป็นค่า default สำหรับ Docker networks

## วิธีการใช้งานและทดสอบเครือข่ายใน Docker Compose

### 1. **การทดสอบการเชื่อมต่อระหว่าง container**
เมื่อคุณรัน `docker-compose up`, container ที่เชื่อมต่อกับเครือข่ายเดียวกันจะสามารถสื่อสารกันได้ผ่านชื่อบริการในไฟล์ Compose. ตัวอย่างเช่น, หาก container `app` ต้องการเชื่อมต่อกับ container `db`, คุณสามารถใช้ชื่อบริการ `db` เป็น hostname:

```python
import psycopg2

connection = psycopg2.connect(
    host="db",  # ชื่อบริการใน docker-compose.yml
    user="postgres",
    password="password",
    dbname="mydatabase"
)
```

### 2. **การทดสอบการเชื่อมต่อระหว่างเครือข่ายต่างๆ**
หาก container เชื่อมต่อกับหลายเครือข่าย, คุณสามารถตรวจสอบการเชื่อมต่อระหว่าง container ผ่าน `docker network inspect <network_name>`. ตัวอย่างเช่น:

```bash
docker network inspect backend
```

คำสั่งนี้จะให้ข้อมูลเกี่ยวกับเครือข่าย `backend` และ container ที่เชื่อมต่อกับเครือข่ายนี้.

### 3. **การใช้ Docker Compose CLI สำหรับเครือข่าย**
Docker Compose ยังมีคำสั่ง CLI ที่สามารถใช้ตรวจสอบเครือข่ายได้ เช่น:
- `docker-compose ps` เพื่อดูสถานะของ container
- `docker-compose logs` เพื่อดู log ของ container
- `docker-compose down` เพื่อหยุดการทำงานของทุกบริการในโปรเจกต์ Docker Compose

## การกำหนด Port Mapping ใน Docker Compose

เมื่อคุณกำหนดเครือข่ายใน Docker Compose, คุณยังสามารถตั้งค่าการเปิดพอร์ตให้ container เข้าถึงจากภายนอกได้ผ่านการกำหนด `ports` ในบริการที่ต้องการ.

### ตัวอย่างการเปิดพอร์ตใน `docker-compose.yml`

```yaml
services:
  web:
    image: nginx
    ports:
      - "8080:80"  # เปิดพอร์ต 8080 บนเครื่องโฮสต์เพื่อเข้าถึงพอร์ต 80 ของ container
    networks:
      - frontend
```

ในตัวอย่างนี้:
- พอร์ต 8080 ของโฮสต์จะถูกเชื่อมต่อกับพอร์ต 80 ของ container ที่รัน nginx
- Container นี้จะเชื่อมต่อกับเครือข่าย `frontend`

## การใช้ External Networks

นอกจากการสร้างเครือข่ายภายใน Docker Compose แล้ว, คุณยังสามารถใช้เครือข่ายภายนอก (external network) ที่มีอยู่แล้วในระบบได้. ตัวอย่างการใช้ external network:

### ตัวอย่างการใช้ external network

```yaml
version: '3'

services:
  app:
    image: my-app
    networks:
      - external_network

networks:
  external_network:
    external: true
```

ในตัวอย่างนี้, `external_network` คือเครือข่ายที่มีอยู่แล้วใน Docker (อาจจะถูกสร้างขึ้นด้วย `docker network create` หรือโดยการใช้เครือข่ายจากโปรเจกต์ Docker อื่นๆ). เมื่อระบุ `external: true`, Docker Compose จะไม่สร้างเครือข่ายใหม่แต่จะเชื่อมต่อ container กับเครือข่ายที่มีอยู่แล้ว

## สรุป

Docker Compose Networking ช่วยให้คุณสามารถจัดการการเชื่อมต่อระหว่าง container หลายๆ ตัวที่รันในโปรเจกต์เดียวกันได้อย่างมีประสิทธิภาพ. ด้วยการใช้เครือข่าย custom, คุณสามารถควบคุมการสื่อสารระหว่าง container และกำหนดรูปแบบเครือข่ายที่เหมาะสมกับแอปพลิเคชันของคุณ นอกจากนี้ยังสามารถใช้ external networks เพื่อเชื่อมต่อกับเครือข่ายที่มีอยู่แล้วและสามารถทดสอบการเชื่อมต่อระหว่าง container ผ่านคำสั่ง CLI และเครื่องมือ Docker ได้อย่างสะดวก.