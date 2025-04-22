# Inspecting Containers

## การตรวจสอบ Docker Containers

การตรวจสอบ **Docker Containers** ช่วยให้คุณสามารถดูข้อมูลเกี่ยวกับ container ที่กำลังทำงานอยู่ รวมถึงการตรวจสอบสถานะ, พอร์ตที่เปิด, และการตั้งค่าต่างๆ ของ container ทำให้คุณสามารถตรวจสอบและแก้ไขปัญหาได้ง่ายขึ้น

## คำสั่งพื้นฐานในการตรวจสอบ Containers

### 1. ดูรายการ Docker Containers ที่กำลังทำงานอยู่
คำสั่ง `docker ps` จะให้ข้อมูลเกี่ยวกับ containers ที่กำลังทำงานในขณะนั้น:
```bash
docker ps
```
คำสั่งนี้จะแสดงข้อมูลต่างๆ ของ container เช่น:
- `CONTAINER ID` : หมายเลข ID ของ container
- `IMAGE` : ชื่อ image ที่ container ใช้
- `COMMAND` : คำสั่งที่ container กำลังรัน
- `STATUS` : สถานะของ container
- `PORTS` : พอร์ตที่เปิดใน container
- `NAMES` : ชื่อของ container

### 2. ดูรายการ Docker Containers ทั้งหมด (รวมถึงที่หยุดทำงานแล้ว)
หากต้องการดูทุกๆ container (รวมถึงที่หยุดทำงานแล้ว) ใช้คำสั่ง `docker ps -a`:
```bash
docker ps -a
```
คำสั่งนี้จะแสดง container ทั้งหมดในเครื่องของคุณ

### 3. ดูข้อมูลรายละเอียดของ Docker Container
คำสั่ง `docker inspect` จะให้ข้อมูลรายละเอียดเกี่ยวกับ container ที่ระบุ เช่น ข้อมูลเครือข่าย, พอร์ตที่เปิด, การตั้งค่าภายใน container:
```bash
docker inspect container_id
```
ในที่นี้ `container_id` คือหมายเลข ID ของ container ที่คุณต้องการตรวจสอบ

ตัวอย่าง:
```bash
docker inspect my-container
```
คำสั่งนี้จะให้ข้อมูลทั้งหมดเกี่ยวกับ **my-container** เช่น ข้อมูลเกี่ยวกับเครือข่าย, ข้อมูลเกี่ยวกับ volume, การตั้งค่า environment variables และอื่นๆ

### 4. ดูข้อมูลเฉพาะบางส่วนของ Container
หากคุณต้องการดึงข้อมูลเฉพาะบางส่วนของ container เช่น IP address, พอร์ตที่เปิด, หรือ environment variables สามารถใช้ `--format` เพื่อกรองข้อมูลที่ต้องการ:
```bash
docker inspect --format '{{.NetworkSettings.IPAddress}}' container_id
```
ในที่นี้:
- `--format` ใช้ในการจัดรูปแบบข้อมูล
- `{{.NetworkSettings.IPAddress}}` ใช้เพื่อดึงข้อมูล IP address ของ container

ตัวอย่างอื่นๆ:
- การดึงชื่อของ container:
  ```bash
  docker inspect --format '{{.Name}}' container_id
  ```
- การดึงค่าของ environment variable:
  ```bash
  docker inspect --format '{{range .Config.Env}}{{println .}}{{end}}' container_id
  ```

### 5. การดู Logs ของ Docker Container
คำสั่ง `docker logs` ใช้ในการดู log ของ container เพื่อดูข้อความแสดงข้อผิดพลาดหรือข้อมูลที่เกิดขึ้นภายใน container:
```bash
docker logs container_id
```
คำสั่งนี้จะให้ข้อมูล log ที่ container กำลังสร้างขึ้น โดยคุณสามารถใช้ flag ต่างๆ เพื่อควบคุมการแสดง log ได้ เช่น:
- `-f` : ใช้สำหรับการติดตาม log ที่ใหม่ๆ
- `--tail` : ใช้เพื่อดู log ล่าสุดตามจำนวนที่กำหนด

ตัวอย่าง:
```bash
docker logs -f --tail 100 container_id
```
คำสั่งนี้จะแสดง log ล่าสุด 100 บรรทัด และจะติดตามการแสดง log ใหม่ๆ

### 6. การดูสถานะของ Docker Container
คำสั่ง `docker stats` ใช้ในการดูสถานะการทำงานของ containers ทั้งหมดในระบบ เช่น การใช้ CPU, RAM, และข้อมูลอื่นๆ ที่เกี่ยวข้อง:
```bash
docker stats
```
คำสั่งนี้จะแสดงข้อมูลในรูปแบบ real-time ของการใช้งานทรัพยากรในทุกๆ container ที่กำลังทำงานอยู่

### 7. ตรวจสอบ Network ของ Docker Container
หากคุณต้องการดูข้อมูลเกี่ยวกับเครือข่ายที่ container กำลังใช้งาน เช่น IP address หรือชื่อเครือข่ายที่เชื่อมต่อ สามารถใช้คำสั่ง `docker network inspect`:
```bash
docker network inspect network_name
```
ในที่นี้ `network_name` คือชื่อของ network ที่ container เชื่อมต่อ

## ตัวอย่างการใช้งานคำสั่ง `docker inspect`

### ตัวอย่างที่ 1: ดู IP address ของ container
สมมติว่าเราต้องการดู IP address ของ container ชื่อ **my-container**:
```bash
docker inspect --format '{{.NetworkSettings.IPAddress}}' my-container
```
คำสั่งนี้จะแสดง IP address ของ **my-container**

### ตัวอย่างที่ 2: ดูข้อมูลเกี่ยวกับการตั้งค่า environment variables
หากต้องการดู environment variables ที่ตั้งไว้ภายใน container:
```bash
docker inspect --format '{{range .Config.Env}}{{println .}}{{end}}' my-container
```
คำสั่งนี้จะแสดงค่าของ environment variables ที่ตั้งไว้ใน **my-container**

### ตัวอย่างที่ 3: ดูรายละเอียดของทุกๆ container
หากต้องการดูข้อมูลทั้งหมดเกี่ยวกับทุกๆ container ที่มีอยู่:
```bash
docker inspect $(docker ps -q)
```
คำสั่งนี้จะใช้คำสั่ง `docker ps -q` เพื่อดึงหมายเลข ID ของทุกๆ container ที่กำลังทำงานอยู่และใช้ `docker inspect` เพื่อดูรายละเอียด

## สรุป

การตรวจสอบ **Docker Containers** เป็นขั้นตอนสำคัญในการจัดการและแก้ไขปัญหาที่เกิดขึ้นใน container โดยใช้คำสั่งต่างๆ เช่น `docker ps`, `docker inspect`, `docker logs`, และ `docker stats` ซึ่งช่วยให้คุณสามารถดูข้อมูลเกี่ยวกับสถานะ, เครือข่าย, และทรัพยากรของ container ได้ รวมถึงการดึงข้อมูลเฉพาะที่ต้องการ เช่น IP address หรือ environment variables เพื่อให้คุณสามารถควบคุมและจัดการ Docker Containers ได้อย่างมีประสิทธิภาพ