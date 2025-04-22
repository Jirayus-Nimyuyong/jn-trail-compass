# Docker Networking Basics

## การทำความเข้าใจ Docker Networking

**Docker Networking** เป็นฟีเจอร์ที่สำคัญใน Docker ที่ช่วยให้ container สามารถสื่อสารกับกันได้และกับโลกภายนอก Docker engine. การเชื่อมต่อเครือข่ายระหว่าง container สามารถทำได้หลายรูปแบบ ขึ้นอยู่กับลักษณะการใช้งาน เช่น การเชื่อมต่อระหว่าง container ภายใน Docker, การเชื่อมต่อกับ container อื่นๆ หรือการเชื่อมต่อกับเครือข่ายภายนอก.

## ประเภทของ Docker Networks

Docker รองรับหลายประเภทของ network ซึ่งแต่ละประเภทมีลักษณะการทำงานที่แตกต่างกันไป ดังนี้:

### 1. **Bridge Network** (Default Network)
- **Bridge network** เป็น network ที่ Docker สร้างขึ้นโดยอัตโนมัติเมื่อ Docker ถูกติดตั้ง
- ใช้สำหรับการเชื่อมต่อ container ในเครื่องเดียวกัน
- ทุก container ที่เชื่อมต่อกับ bridge network จะได้รับ IP address ที่ถูกกำหนดไว้ภายในเครือข่ายนี้
- **Bridge network** เป็น network default ที่จะถูกใช้เมื่อคุณไม่กำหนด network อื่นๆ ใน `docker run` หรือ `docker-compose.yml`

#### ตัวอย่างการใช้งาน Bridge Network:

```bash
docker network create --driver bridge my_bridge_network
```

ในตัวอย่างนี้:
- สร้าง **bridge network** ชื่อ `my_bridge_network`

### 2. **Host Network**
- **Host network** จะทำให้ container ใช้ IP address ของ host machine โดยตรง
- การใช้ **host network** ทำให้ container ไม่สามารถแยกออกจาก host machine ได้
- ใช้ในกรณีที่ต้องการให้ container ใช้ port ของ host โดยตรง

#### ตัวอย่างการใช้งาน Host Network:

```bash
docker run --network host nginx
```

ในตัวอย่างนี้:
- Container จะใช้ host network โดยตรงและสามารถเข้าถึงพอร์ตของ host ได้

### 3. **None Network**
- **None network** ทำให้ container ไม่สามารถเชื่อมต่อกับเครือข่ายใดๆ ได้เลย
- การใช้ **none network** มีประโยชน์ในกรณีที่ต้องการให้ container ทำงานในลักษณะ isolated และไม่สามารถเข้าถึงเครือข่ายภายนอกได้

#### ตัวอย่างการใช้งาน None Network:

```bash
docker run --network none nginx
```

ในตัวอย่างนี้:
- Container จะไม่ได้รับการเชื่อมต่อกับ network ใดๆ

### 4. **Overlay Network**
- **Overlay network** ใช้สำหรับการเชื่อมต่อ container ที่รันอยู่ในหลายๆ Docker host
- โดย Overlay network จะใช้ในกรณีที่คุณทำการรัน Docker Swarm หรือ Docker Cluster
- Overlay network ทำให้ container ที่รันใน host ต่างๆ สามารถสื่อสารกันได้

#### ตัวอย่างการใช้งาน Overlay Network:

```bash
docker network create --driver overlay my_overlay_network
```

ในตัวอย่างนี้:
- สร้าง **overlay network** ชื่อ `my_overlay_network` สำหรับการเชื่อมต่อ container ในหลายๆ host

### 5. **Macvlan Network**
- **Macvlan network** ช่วยให้ container สามารถมี MAC address และ IP address ที่สามารถเห็นได้ใน network ของ physical network interface
- เหมาะสำหรับกรณีที่ต้องการให้ container มี IP address ที่อยู่ใน subnet เดียวกับ network ที่เชื่อมต่ออยู่

#### ตัวอย่างการใช้งาน Macvlan Network:

```bash
docker network create -d macvlan --subnet=192.168.1.0/24 --gateway=192.168.1.1 my_macvlan_network
```

ในตัวอย่างนี้:
- สร้าง **macvlan network** ชื่อ `my_macvlan_network` ที่ใช้ subnet `192.168.1.0/24` และ gateway `192.168.1.1`

## การเชื่อมต่อ Container กับ Network

เมื่อคุณสร้าง network แล้ว, คุณสามารถเชื่อมต่อ container เข้ากับ network ได้โดยการใช้ตัวเลือก `--network` ในคำสั่ง `docker run` หรือภายในไฟล์ `docker-compose.yml`.

### ตัวอย่างการเชื่อมต่อ Container กับ Network ผ่านคำสั่ง `docker run`:

```bash
docker run -d --name my_container --network my_bridge_network nginx
```

ในตัวอย่างนี้:
- Container ชื่อ `my_container` จะเชื่อมต่อกับ `my_bridge_network`

### ตัวอย่างการเชื่อมต่อ Container กับ Network ผ่าน `docker-compose.yml`:

```yaml
version: '3'

services:
  web:
    image: nginx
    networks:
      - my_bridge_network

networks:
  my_bridge_network:
    driver: bridge
```

ในตัวอย่างนี้:
- บริการ `web` ใช้ `bridge network` ที่ชื่อ `my_bridge_network`

## การดูข้อมูลของ Network

คุณสามารถใช้คำสั่ง `docker network ls` เพื่อลิสต์รายการของ networks ทั้งหมดที่มีในระบบ Docker:

```bash
docker network ls
```

และใช้คำสั่ง `docker network inspect` เพื่อตรวจสอบรายละเอียดของ network ที่ต้องการ:

```bash
docker network inspect my_bridge_network
```

## การเชื่อมต่อ Container ในหลายๆ Network

Docker อนุญาตให้ container เชื่อมต่อกับหลายๆ networks ได้ในเวลาเดียวกัน. คุณสามารถใช้คำสั่ง `docker network connect` เพื่อลงทะเบียน container ลงใน network อื่นๆ ที่ต้องการ.

### ตัวอย่างการเชื่อมต่อ Container กับหลายๆ Networks:

```bash
docker network connect my_bridge_network my_container
docker network connect my_overlay_network my_container
```

ในตัวอย่างนี้:
- `my_container` เชื่อมต่อกับ `my_bridge_network` และ `my_overlay_network` พร้อมกัน

## การเชื่อมต่อ Container กับ Network แบบ Insulated

ในบางกรณี คุณอาจต้องการให้ container สื่อสารกันภายใน network เดียวกันโดยไม่สามารถเข้าถึงภายนอกได้ คุณสามารถใช้ **Docker Compose** ในการตั้งค่า network ที่มีการจำกัดการเชื่อมต่อกับภายนอก.

### ตัวอย่างการตั้งค่า Insulated Network:

```yaml
version: '3'

services:
  app1:
    image: app1
    networks:
      - isolated_network
  app2:
    image: app2
    networks:
      - isolated_network

networks:
  isolated_network:
    driver: bridge
```

ในตัวอย่างนี้:
- `app1` และ `app2` เชื่อมต่อกับ `isolated_network` ซึ่งทำให้ทั้งสอง container สามารถสื่อสารกันได้ แต่ไม่สามารถเข้าถึงเครือข่ายอื่นๆ

## สรุป

Docker networking เป็นเครื่องมือที่สำคัญในการจัดการการเชื่อมต่อระหว่าง containers และการเชื่อมต่อกับภายนอก. Docker รองรับหลายประเภทของ network เช่น **bridge**, **host**, **overlay**, **macvlan**, และ **none** ซึ่งสามารถเลือกใช้งานตามลักษณะของการใช้งานที่ต้องการ. Docker Compose ช่วยให้คุณสามารถกำหนดการตั้งค่า network ได้ง่ายขึ้นในหลายๆ บริการ และสามารถเชื่อมต่อ container หลายๆ ตัวเข้าด้วยกันผ่าน network ที่กำหนด.