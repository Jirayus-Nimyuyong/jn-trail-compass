# Scaling with Swarm

## การทำความเข้าใจเกี่ยวกับ Docker Swarm

**Docker Swarm** คือฟีเจอร์ที่ช่วยให้คุณสามารถจัดการกับ Docker containers ในระดับคลัสเตอร์ (cluster) ได้. โดย Docker Swarm ใช้สำหรับการทำงานแบบ distributed โดยสามารถรวมเครื่องหลายๆ เครื่อง (โหนดหรือ node) เข้าด้วยกันเพื่อทำงานร่วมกัน. เมื่อทำงานกับ Swarm, คุณสามารถขยายหรือปรับลดจำนวน containers ที่ทำงานได้อย่างง่ายดายผ่านคำสั่งที่เรียกว่า **scaling**.

## Docker Swarm Mode

Docker Swarm Mode เป็นโหมดหนึ่งของ Docker ที่ช่วยให้คุณสามารถสร้างและจัดการคลัสเตอร์ของ Docker containers ได้. ใน Swarm mode, โหนดต่างๆ สามารถทำงานร่วมกันเพื่อจัดการกับ containers ที่คุณต้องการรัน, โดยมีการปรับสมดุล (load balancing) และการกระจายการทำงาน.

## การเริ่มต้นใช้งาน Docker Swarm

### การสร้าง Swarm Cluster

ก่อนที่คุณจะเริ่มใช้งาน Swarm, คุณต้องเริ่มต้น Swarm cluster โดยการระบุโหนดที่ต้องการให้เป็น manager node และ worker nodes.

1. **เริ่มต้น Docker Swarm** บน manager node:

```bash
docker swarm init --advertise-addr <MANAGER-IP>
```

คำสั่งนี้จะทำให้เครื่องปัจจุบันกลายเป็น **manager node** และจะได้รับ command ที่ใช้ในการเข้าร่วมกับเครื่องอื่นใน Swarm cluster.

2. **เข้าร่วม Swarm** บน worker node:

หลังจากที่ manager node เริ่มต้นแล้ว, คุณสามารถใช้คำสั่งที่ได้รับจาก `docker swarm init` เพื่อให้ worker node เข้าร่วม Swarm cluster.

```bash
docker swarm join --token <SWARM-TOKEN> <MANAGER-IP>:2377
```

## การ Scaling Containers ด้วย Swarm

การ **scaling** หมายถึงการปรับจำนวน replica ของ containers ที่รันอยู่ใน Swarm cluster เพื่อรองรับปริมาณการใช้งานที่เพิ่มขึ้นหรือลดลง.

### การสร้าง Service

ก่อนที่เราจะสามารถ scale containers ใน Swarm, เราจำเป็นต้องสร้าง **Docker Service** ซึ่งเป็นการกำหนดว่า container ของเราจะทำงานอย่างไรในคลัสเตอร์.

ตัวอย่างการสร้าง service:

```bash
docker service create --name webapp --replicas 3 nginx
```

คำสั่งนี้จะสร้าง service ชื่อ `webapp` โดยมี replica ของ container ที่รัน `nginx` จำนวน 3 ตัว.

### การ Scaling Service

เมื่อคุณสร้าง service แล้ว, คุณสามารถปรับขนาด (scale) จำนวน replica ของ service ได้ทุกเมื่อ.

#### การเพิ่มจำนวน replica:

```bash
docker service scale webapp=5
```

คำสั่งนี้จะเพิ่มจำนวน replica ของ service `webapp` เป็น 5 ตัว.

#### การลดจำนวน replica:

```bash
docker service scale webapp=2
```

คำสั่งนี้จะลดจำนวน replica ของ service `webapp` เหลือ 2 ตัว.

### การตรวจสอบสถานะของ Service

คุณสามารถใช้คำสั่ง `docker service ps` เพื่อดูรายละเอียดของ task และสถานะของแต่ละ replica ใน service.

```bash
docker service ps webapp
```

คำสั่งนี้จะแสดงข้อมูลเกี่ยวกับการทำงานของแต่ละ replica รวมถึงสถานะ, IP ที่กำหนด, และสถานะของการกระจายการทำงาน.

## การใช้ Docker Swarm Load Balancing

Docker Swarm มีการ **load balancing** ที่ทำงานโดยอัตโนมัติ. เมื่อมีการสร้าง service และเพิ่มจำนวน replica, Swarm จะทำการกระจายการทำงานระหว่าง replica ต่างๆ โดยอัตโนมัติ. หากมีการร้องขอเข้ามา, Swarm จะส่งคำขอไปยัง replica ที่ว่างหรือมีความพร้อมสูงสุด.

### การทำงานของ Load Balancing

Swarm ใช้ **round-robin** เพื่อทำการกระจายคำขอที่เข้ามายัง containers แต่ละตัว. ทุกๆ ครั้งที่คำขอเข้ามา, จะมีการส่งคำขอไปยัง container ที่มีการใช้งานน้อยที่สุด หรือหาก container หนึ่งทำงานหนัก, จะมีการส่งคำขอไปยัง container อื่นๆ ที่มีความพร้อม.

## การปรับแต่ง Resource Limits และ Constraints

ในการ scaling กับ Swarm, คุณสามารถกำหนดข้อกำหนดที่เฉพาะเจาะจงสำหรับ containers ที่รันภายใน Swarm cluster เช่นการจำกัด CPU, Memory, หรือการตั้งค่าที่จำกัดโหนดที่ container จะรัน.

### ตัวอย่างการจำกัด CPU และ Memory:

```bash
docker service create --name webapp --replicas 3 --limit-cpu 1 --limit-memory 512m nginx
```

คำสั่งนี้จะสร้าง service `webapp` โดยมี replica 3 ตัว, จำกัด CPU ที่ใช้ไม่เกิน 1 core และหน่วยความจำไม่เกิน 512MB.

### ตัวอย่างการใช้ constraints เพื่อกำหนดให้ container รันบน node ที่กำหนด:

```bash
docker service create --name webapp --replicas 3 --constraint 'node.role == worker' nginx
```

คำสั่งนี้จะจำกัดการรันของ service `webapp` บนเครื่องที่มี role เป็น **worker** เท่านั้น.

## การใช้ Docker Swarm Auto-Scaling (ใช้ร่วมกับ external tools)

Docker Swarm ไม่ได้รองรับ auto-scaling ในตัวเอง แต่คุณสามารถใช้เครื่องมือภายนอก เช่น **Prometheus** และ **Docker Flow** เพื่อเพิ่มการ scaling โดยอัตโนมัติเมื่อปริมาณการใช้งานสูงขึ้น.

เครื่องมือเหล่านี้สามารถช่วยคุณทำการ monitor ปริมาณการใช้งานของ containers และปรับขนาด (scale) โดยอัตโนมัติตามเงื่อนไขที่คุณตั้งไว้.

## สรุป

การ **scaling** ใน Docker Swarm ช่วยให้คุณสามารถปรับจำนวนของ containers ที่รันในคลัสเตอร์ได้อย่างยืดหยุ่นและง่ายดาย. การใช้ Docker Swarm สำหรับ scaling ช่วยให้การจัดการ resources และ load balancing ใน containerized applications เป็นไปอย่างมีประสิทธิภาพ. ด้วยการตั้งค่าที่เหมาะสม เช่น การกำหนดจำนวน replica, การใช้ load balancing, และการควบคุม resource limits คุณสามารถทำให้ระบบ Docker ของคุณสามารถขยายตัวตามความต้องการของแอปพลิเคชันได้อย่างมีประสิทธิภาพ.