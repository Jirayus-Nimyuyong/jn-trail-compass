# Docker Volumes and Persistent Storage

## การใช้ Volumes ใน Docker

ใน Docker, **Volumes** เป็นวิธีการที่ใช้ในการจัดเก็บข้อมูลอย่างถาวร ซึ่งช่วยให้ข้อมูลยังคงอยู่แม้ว่า container จะหยุดทำงานหรือถูกลบไป Volumes จะช่วยให้ข้อมูลไม่สูญหายเมื่อต้องมีการอัพเดตหรือรีสตาร์ท container

## ทำไมต้องใช้ Volumes?
- **Persistent Data**: โดยปกติข้อมูลใน Docker Container จะหายไปหาก container ถูกลบหรือหยุดทำงาน แต่ Volumes จะช่วยให้ข้อมูลยังคงอยู่และสามารถเข้าถึงได้
- **Shared Data**: Volumes สามารถแชร์ข้อมูลระหว่างหลายๆ container ได้
- **Backup & Restore**: คุณสามารถสำรองข้อมูลจาก volume และคืนข้อมูลได้อย่างสะดวก
- **Performance**: Volumes มีประสิทธิภาพในการจัดเก็บข้อมูลมากกว่า container filesystem เนื่องจาก Docker จัดการ Volumes ได้ดีกว่า

## ประเภทของ Volumes

1. **Named Volumes**: Volumes ที่มีชื่อเฉพาะ ซึ่ง Docker จะสร้างและจัดการให้
2. **Anonymous Volumes**: Volumes ที่ไม่มีชื่อ แต่ Docker จะสร้างขึ้นชั่วคราวเมื่อ container รัน
3. **Host Volumes (Bind Mounts)**: การเชื่อมต่อระหว่างโฟลเดอร์ในเครื่อง host กับ container โดยตรง

## การสร้างและใช้งาน Docker Volumes

### 1. การสร้าง Named Volume
คุณสามารถสร้าง **named volume** ด้วยคำสั่ง `docker volume create`:
```bash
docker volume create my-volume
```
ในที่นี้ `my-volume` คือชื่อของ volume ที่คุณสร้างขึ้น

### 2. การใช้ Named Volume ในการรัน Docker Container
คุณสามารถใช้ volume ที่สร้างขึ้นใน container ได้ด้วยคำสั่ง `docker run`:
```bash
docker run -d -v my-volume:/data my-image
```
ในที่นี้:
- `-v my-volume:/data` : ใช้ volume ชื่อ `my-volume` และทำการ mount ไปยังโฟลเดอร์ `/data` ภายใน container
- `my-image` : ชื่อของ Docker Image ที่จะใช้ในการสร้าง container

### 3. การดู Volumes ที่มีอยู่
หากคุณต้องการดูรายการของ volumes ที่มีอยู่ในเครื่อง สามารถใช้คำสั่ง `docker volume ls`:
```bash
docker volume ls
```
คำสั่งนี้จะแสดงรายการทั้งหมดของ volumes ที่ Docker สร้างขึ้น

### 4. การดูข้อมูลของ Volume
หากต้องการดูข้อมูลรายละเอียดของ volume สามารถใช้คำสั่ง `docker volume inspect`:
```bash
docker volume inspect my-volume
```
คำสั่งนี้จะแสดงข้อมูลเกี่ยวกับ volume เช่น เส้นทางที่จัดเก็บข้อมูลภายในเครื่อง host และ container ที่ใช้ volume นั้น

### 5. การลบ Docker Volume
เมื่อไม่ต้องการใช้ volume ที่ไม่จำเป็นแล้วสามารถลบได้ด้วยคำสั่ง `docker volume rm`:
```bash
docker volume rm my-volume
```
หาก volume นั้นไม่ถูกใช้งานใน container แล้วจะถูกลบออกจากเครื่อง

### 6. การลบทุกๆ Docker Volumes ที่ไม่ใช้
หากคุณต้องการลบทุกๆ volume ที่ไม่ได้ถูกใช้งานในตอนนี้สามารถใช้คำสั่ง `docker volume prune`:
```bash
docker volume prune
```
คำสั่งนี้จะลบทุก volume ที่ไม่ได้ถูกใช้งาน

## Persistent Storage ด้วย Docker Volumes

**Persistent storage** หมายถึงการเก็บข้อมูลที่ไม่หายไปแม้ว่า container จะหยุดทำงานหรือถูกลบ การใช้ Volumes ใน Docker คือวิธีการจัดการ persistent storage ที่ดีที่สุด เพราะข้อมูลที่เก็บใน volumes จะไม่หายไปเมื่อลบ container

ตัวอย่างเช่น:
```bash
docker run -d -v /host/path:/container/path my-image
```
ในที่นี้:
- `/host/path` คือเส้นทางในเครื่อง host ที่ใช้ในการเก็บข้อมูล
- `/container/path` คือเส้นทางภายใน container ที่ใช้ในการเก็บข้อมูล

**ข้อดี** ของการใช้ Host Volumes:
- **Data Persistence**: ข้อมูลจะไม่หายแม้ว่าจะหยุดหรือรีสตาร์ท container
- **แชร์ข้อมูล**: สามารถแชร์ข้อมูลระหว่าง container และเครื่อง host ได้

## สร้างและใช้งาน Bind Mounts

**Bind Mounts** คือการเชื่อมโยงข้อมูลจากโฟลเดอร์ในเครื่อง host ไปยัง container ตัวอย่างเช่น:
```bash
docker run -d -v /host/path:/container/path my-image
```
ในที่นี้:
- `/host/path` : เส้นทางในเครื่อง host ที่จะทำการ bind mount
- `/container/path` : เส้นทางใน container ที่จะ mount ข้อมูลจากเครื่อง host

**ข้อดี** ของ Bind Mounts:
- ข้อมูลสามารถเข้าถึงได้จากเครื่อง host โดยตรง
- ใช้งานง่ายและสะดวกในการพัฒนา

## สรุป

การใช้ **Volumes** ใน Docker เป็นการจัดการข้อมูลอย่างมีประสิทธิภาพ โดยให้ข้อมูลที่เก็บอยู่ภายใน container สามารถคงอยู่ได้แม้ว่า container จะถูกลบหรือหยุดทำงาน นอกจากนี้ยังสามารถแชร์ข้อมูลระหว่างหลายๆ container และเครื่อง host ได้อย่างสะดวก Volumes มีทั้งประเภท **named volumes**, **anonymous volumes**, และ **host volumes** ที่สามารถเลือกใช้ตามลักษณะการใช้งาน

การใช้ Volumes ยังช่วยให้การสำรองและคืนข้อมูลทำได้ง่ายขึ้น พร้อมทั้งช่วยเพิ่มประสิทธิภาพการทำงานของ Docker Container โดยการเก็บข้อมูลไว้ภายนอก container จึงทำให้สามารถจัดการข้อมูลได้อย่างยืดหยุ่นและปลอดภัย