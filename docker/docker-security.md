# Docker Security

## การทำความเข้าใจเกี่ยวกับ Docker Security

การรักษาความปลอดภัยใน Docker เป็นสิ่งสำคัญในการใช้เทคโนโลยี container เพื่อป้องกันการโจมตี, การเข้าถึงที่ไม่ได้รับอนุญาต, และป้องกันการรั่วไหลของข้อมูล. Docker Security เกี่ยวข้องกับการปกป้อง Docker containers, Docker images, Docker networks, และการจัดการสิทธิ์การเข้าถึงเพื่อให้สามารถใช้งานได้อย่างปลอดภัยในทุกขั้นตอน.

## ความเสี่ยงที่เกี่ยวข้องกับ Docker

Docker มีความเสี่ยงหลายด้านที่อาจเกิดขึ้น เช่น:

1. **การเข้าถึงที่ไม่ได้รับอนุญาต**: บุคคลที่ไม่ได้รับอนุญาตอาจเข้าถึง Docker daemon หรือ Docker containers.
2. **การโจมตีจาก containers**: Containers ที่ไม่ได้รับการแยกอย่างถูกต้องอาจถูกโจมตีโดย container อื่นๆ ที่ทำงานในโฮสต์เดียวกัน.
3. **การใช้งาน image ที่ไม่ปลอดภัย**: Docker images ที่ไม่ได้รับการตรวจสอบความปลอดภัยอาจรวมถึงโค้ดที่เป็นอันตราย.
4. **การติดตั้ง software ที่ไม่ได้รับอนุญาตใน containers**: การติดตั้งซอฟต์แวร์ใน Docker container ที่มีช่องโหว่ทำให้เกิดการโจมตีได้.

## แนวทางในการรักษาความปลอดภัยของ Docker

### 1. การควบคุมการเข้าถึง Docker Daemon

Docker daemon (`dockerd`) เป็นส่วนที่รัน Docker engine และรับคำสั่งจาก Docker client. การเปิดเผย Docker daemon ให้สามารถเข้าถึงได้จากภายนอกสามารถเป็นจุดเสี่ยงที่ทำให้เกิดการโจมตี. ดังนั้น, ควรปิดการเข้าถึง Docker daemon จากภายนอก.

#### วิธีการควบคุมการเข้าถึง:

- ใช้ **TLS** (Transport Layer Security) สำหรับการเข้าถึง Docker daemon เพื่อเข้ารหัสข้อมูล.
- จำกัดการเข้าถึง Docker daemon โดยใช้ไฟร์วอลล์หรือการควบคุม IP.
- ใช้การตรวจสอบสิทธิ์ (Authentication) และการกำหนดสิทธิ์ (Authorization) สำหรับการเข้าถึง Docker daemon.

### 2. การใช้ Docker User Namespaces

**Docker User Namespaces** ช่วยให้สามารถแยก user และ group IDs ของ containers ออกจากระบบโฮสต์ได้. วิธีนี้ช่วยป้องกันไม่ให้ผู้โจมตีสามารถเข้าถึง root ของโฮสต์จากภายใน container.

#### การเปิดใช้งาน User Namespaces:

```bash
"USERNS"="true"  # เปิดใช้งาน User Namespaces
```

การเปิดใช้งานฟีเจอร์นี้ทำให้การเข้าถึง container มีความปลอดภัยมากขึ้น เพราะ containers จะทำงานใน namespace ที่แยกออกจากโฮสต์.

### 3. การใช้ Docker Content Trust (DCT)

**Docker Content Trust (DCT)** เป็นฟีเจอร์ที่ช่วยป้องกันการดาวน์โหลด Docker images ที่ไม่ได้รับการเซ็นต์รับรอง. เมื่อเปิดใช้งาน DCT, Docker จะตรวจสอบว่า images ที่ถูกดึงมามีลายเซ็นต์ที่ถูกต้องและเชื่อถือได้.

#### การเปิดใช้งาน Docker Content Trust:

```bash
export DOCKER_CONTENT_TRUST=1
```

การเปิดใช้งาน DCT ช่วยป้องกันไม่ให้ดาวน์โหลด Docker images ที่ถูกดัดแปลงหรือไม่ปลอดภัย.

### 4. การตรวจสอบความปลอดภัยของ Docker Images

การตรวจสอบความปลอดภัยของ Docker images เป็นสิ่งที่สำคัญ เพื่อป้องกันไม่ให้ภาพที่คุณใช้งานมีช่องโหว่. Docker Hub และเครื่องมืออื่นๆ เช่น **Clair** หรือ **Trivy** สามารถช่วยตรวจสอบ vulnerabilities ใน Docker images.

#### ตัวอย่างการใช้ Trivy:

```bash
trivy image my_image:tag
```

คำสั่งนี้จะสแกน Docker image เพื่อตรวจหาช่องโหว่ด้านความปลอดภัย.

### 5. การใช้ Docker Secrets

**Docker Secrets** ใช้สำหรับการจัดการข้อมูลที่เป็นความลับ เช่น รหัสผ่าน, คีย์ API, หรือการตั้งค่าเซิร์ฟเวอร์ที่ต้องการความปลอดภัยสูง. Docker Secrets ช่วยให้คุณสามารถเก็บข้อมูลลับได้ในที่ปลอดภัยและสามารถเข้าถึงได้จาก Docker Swarm mode.

#### ตัวอย่างการสร้าง Docker Secret:

```bash
echo "my_secret" | docker secret create my_secret -
```

### 6. การใช้ Docker Swarm และการจัดการการเข้าถึง

Docker Swarm ใช้สำหรับการจัดการ containers แบบคลัสเตอร์. การรักษาความปลอดภัยใน Docker Swarm รวมถึงการใช้ **role-based access control (RBAC)** และการเข้ารหัสการสื่อสารระหว่างโหนดในคลัสเตอร์.

#### ตัวอย่างการเปิดใช้งานการเข้ารหัสการสื่อสารใน Docker Swarm:

```bash
docker swarm init --advertise-addr <MANAGER-IP> --listen-addr <MANAGER-IP>:2377 --task-history-limit 5 --default-addr-pool 10.0.0.0/24
```

การเปิดใช้งานการเข้ารหัสการสื่อสารช่วยป้องกันการโจมตีจากภายนอก.

### 7. การใช้ Docker Bench for Security

**Docker Bench for Security** เป็นเครื่องมือที่ช่วยตรวจสอบการตั้งค่าความปลอดภัยของ Docker engine และ container. การใช้เครื่องมือนี้สามารถช่วยหาช่องโหว่ที่อาจจะถูกมองข้าม.

#### ตัวอย่างการใช้งาน Docker Bench:

```bash
docker run -it --net host --pid host --privileged --userns host --rm --name docker-bench -v /var/run/docker.sock:/var/run/docker.sock --cap-add=NET_ADMIN docker/docker-bench-security
```

เครื่องมือนี้จะทำการตรวจสอบการตั้งค่า Docker และแนะนำการปรับปรุงที่ช่วยเพิ่มความปลอดภัย.

## สรุป

การรักษาความปลอดภัยของ Docker เป็นสิ่งที่สำคัญในการใช้งานในสภาพแวดล้อมจริง การควบคุมการเข้าถึง Docker daemon, การใช้ Docker User Namespaces, Docker Content Trust, การตรวจสอบความปลอดภัยของ Docker images, การจัดการ Docker secrets, และการใช้เครื่องมือต่างๆ เช่น Docker Bench for Security จะช่วยเพิ่มความปลอดภัยให้กับระบบ Docker ของคุณ. การรักษาความปลอดภัยควรเป็นส่วนสำคัญในการพัฒนาและใช้งาน Docker containers ในทุกๆ ขั้นตอน.