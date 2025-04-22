# Managing Resources in Docker

## การจัดการทรัพยากรใน Docker

เมื่อคุณรัน container บน Docker, คุณสามารถจัดการและควบคุมทรัพยากรที่ container ใช้งานได้ เช่น CPU, RAM, disk space และเครือข่าย เพื่อให้แน่ใจว่าแอปพลิเคชันที่รันอยู่ภายใน container ไม่ใช้ทรัพยากรเกินไปและสามารถทำงานได้อย่างมีประสิทธิภาพ Docker ให้เครื่องมือและตัวเลือกต่างๆ ในการจำกัดและจัดสรรทรัพยากรเหล่านี้ให้กับ container เพื่อป้องกันไม่ให้เกิดปัญหาด้านประสิทธิภาพและความเสถียร

## การจำกัดการใช้ CPU

Docker มีตัวเลือกในการจำกัดการใช้ CPU ของ container เพื่อให้สามารถควบคุมการใช้งานทรัพยากร CPU ได้ โดยสามารถกำหนดจำนวนของ CPU ที่จะให้ container ใช้งานได้หรือการจำกัดการใช้ CPU แบบจำเพาะเจาะจงได้

### การจำกัดการใช้ CPU

1. **กำหนดจำนวน CPU ที่ใช้**:

   คุณสามารถจำกัดจำนวน CPU ที่ container ใช้งานโดยใช้ `--cpus`:

   ```bash
   docker run --cpus="1.5" my-image
   ```

   คำสั่งนี้จะจำกัดการใช้ CPU ของ container ให้ไม่เกิน 1.5 CPU cores

2. **การกำหนด CPU shares**:

   คุณสามารถกำหนดสัดส่วนการใช้ CPU ของ container ด้วย `--cpu-shares`. ค่า default คือ 1024 ซึ่งหมายถึง container จะใช้ CPU ตามสัดส่วนที่ตั้งค่าไว้เมื่อมี container อื่นๆ รันอยู่:

   ```bash
   docker run --cpu-shares=512 my-image
   ```

   ถ้า container อื่นๆ ใช้ 1024 CPU shares, container นี้จะใช้ครึ่งหนึ่งของการประมวลผล (50%) ของ CPU ที่ container ใช้

3. **การจำกัด CPU cores**:

   ใช้ `--cpuset-cpus` เพื่อกำหนดว่า container จะทำงานบน CPU cores ใด:

   ```bash
   docker run --cpuset-cpus="0,1" my-image
   ```

   คำสั่งนี้จะจำกัดให้ container ทำงานบน CPU core 0 และ 1 เท่านั้น

## การจำกัดการใช้ Memory

การจำกัดการใช้ memory ของ container สามารถทำได้ผ่านตัวเลือก `--memory` และ `--memory-swap`. นี่จะช่วยป้องกันไม่ให้ container ใช้หน่วยความจำเกินกว่าที่กำหนด

### การจำกัดการใช้ Memory

1. **จำกัดหน่วยความจำที่ใช้**:

   ใช้ `--memory` เพื่อจำกัดจำนวนหน่วยความจำที่ container สามารถใช้ได้:

   ```bash
   docker run --memory="512m" my-image
   ```

   คำสั่งนี้จะจำกัดให้ container ใช้หน่วยความจำไม่เกิน 512 MB

2. **การตั้งค่า memory swap**:

   ใช้ `--memory-swap` เพื่อกำหนดการใช้ swap memory สำหรับ container เมื่อหน่วยความจำหลักไม่เพียงพอ:

   ```bash
   docker run --memory="512m" --memory-swap="1g" my-image
   ```

   คำสั่งนี้จะให้ container ใช้หน่วยความจำหลักสูงสุด 512 MB และใช้ swap ได้สูงสุด 1 GB

3. **การตั้งค่า memory reservation**:

   ใช้ `--memory-reservation` เพื่อกำหนดค่าการสำรองหน่วยความจำสำหรับ container:

   ```bash
   docker run --memory-reservation="256m" my-image
   ```

   คำสั่งนี้จะตั้งค่าหน่วยความจำที่ใช้ได้ขั้นต่ำที่ 256 MB

## การจำกัด Disk I/O

การควบคุมการใช้ disk I/O สำหรับ container สามารถทำได้ด้วยการใช้ตัวเลือก `--blkio-weight` และ `--device-read-bps`, `--device-write-bps` เพื่อจำกัดความเร็วในการอ่านและเขียนข้อมูลบน disk

### การจำกัด Disk I/O

1. **การตั้งค่าค่า blkio-weight**:

   `--blkio-weight` เป็นตัวเลือกที่ใช้ในการกำหนดน้ำหนักในการใช้งาน disk I/O ของ container:

   ```bash
   docker run --blkio-weight=500 my-image
   ```

   คำสั่งนี้จะตั้งค่าน้ำหนักในการใช้งาน disk I/O ของ container เป็น 500 (ค่าสูงสุดคือ 1000)

2. **การจำกัดอัตราการอ่านและเขียนข้อมูล**:

   สามารถใช้ `--device-read-bps` และ `--device-write-bps` เพื่อจำกัดอัตราการอ่านและเขียนข้อมูลจาก disk:

   ```bash
   docker run --device-read-bps /dev/sda:1mb --device-write-bps /dev/sda:1mb my-image
   ```

   คำสั่งนี้จะจำกัดการอ่านและเขียนข้อมูลจาก disk `/dev/sda` ที่ 1 MB ต่อวินาที

## การจัดการเครือข่าย

การจัดการเครือข่ายใน Docker สามารถทำได้ผ่านตัวเลือก `--network` ซึ่งใช้กำหนดว่า container จะเชื่อมต่อกับเครือข่ายใดบ้าง

### การกำหนดเครือข่าย

1. **การกำหนดเครือข่ายสำหรับ container**:

   สามารถเชื่อมต่อ container กับเครือข่ายที่กำหนดเองได้:

   ```bash
   docker run --network=my_network my-image
   ```

   คำสั่งนี้จะให้ container เชื่อมต่อกับเครือข่ายที่ชื่อว่า `my_network`

2. **การสร้างเครือข่ายใหม่**:

   ใช้คำสั่ง `docker network create` เพื่อสร้างเครือข่ายใหม่:

   ```bash
   docker network create my_network
   ```

   หลังจากนั้นสามารถเชื่อมต่อ container กับเครือข่ายนี้ได้

## การใช้ Docker Swarm และ Kubernetes สำหรับการจัดการทรัพยากร

เมื่อทำงานในสภาพแวดล้อมที่ต้องการการจัดการหลายๆ container และคอนเทนเนอร์หลายๆ โฮสต์, **Docker Swarm** หรือ **Kubernetes** จะช่วยจัดการการกระจายทรัพยากรและการสเกลการทำงานได้

### Docker Swarm

Docker Swarm เป็นฟีเจอร์การจัดการ container ที่ช่วยให้สามารถสร้าง cluster ของ Docker containers และทำให้สามารถจัดการการกระจายงานได้อัตโนมัติ

### Kubernetes

Kubernetes เป็นระบบ orchestration ที่รองรับการจัดการ container ขนาดใหญ่และการกระจายงานบนหลายๆ โฮสต์ ทำให้สามารถจัดการทรัพยากรของ container และการสเกลได้อย่างมีประสิทธิภาพ

## สรุป

การจัดการทรัพยากรใน Docker เป็นสิ่งสำคัญในการสร้างแอปพลิเคชันที่มีประสิทธิภาพและเสถียร. Docker ให้ตัวเลือกที่หลากหลายในการจำกัดการใช้ CPU, memory, disk I/O, และการจัดการเครือข่าย ซึ่งจะช่วยให้การรัน container เป็นไปอย่างมีประสิทธิภาพและไม่กระทบต่อระบบโดยรวม นอกจากนี้, การใช้ Docker Swarm และ Kubernetes จะช่วยให้การจัดการหลายๆ container ในสภาพแวดล้อมที่มีการกระจายงานเป็นเรื่องง่ายและมีประสิทธิภาพ