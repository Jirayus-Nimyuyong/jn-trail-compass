# Docker Registry

## การทำความเข้าใจเกี่ยวกับ Docker Registry

**Docker Registry** คือที่เก็บ Docker images ที่สามารถเข้าถึงได้โดย Docker client. Docker Registry ช่วยให้คุณสามารถจัดเก็บและแชร์ Docker images ได้ง่ายๆ ทั้งในรูปแบบ public หรือ private registry. การใช้ Docker Registry ช่วยให้คุณสามารถทำงานร่วมกับทีม, แชร์ Docker images ระหว่าง environments และจัดการเวอร์ชันของ images ได้อย่างสะดวก.

## Docker Hub

**Docker Hub** คือ public Docker registry ที่ได้รับความนิยมมากที่สุด. Docker Hub เป็นบริการที่ให้คุณสามารถเก็บ, แชร์, และดาวน์โหลด Docker images ฟรี. นอกจากนี้, Docker Hub ยังมี features เช่น automated builds, webhooks, และการสนับสนุนสำหรับการสร้าง teams.

### การใช้งาน Docker Hub

การใช้งาน Docker Hub นั้นง่ายมาก. คุณสามารถทำการ log in ด้วยบัญชี Docker และดึงหรือ push Docker images ได้จากหรือไปยัง Docker Hub.

### ตัวอย่างการ pull image จาก Docker Hub:

```bash
docker pull nginx
```

คำสั่งนี้จะดึง image ของ `nginx` จาก Docker Hub มาที่เครื่องของคุณ.

### ตัวอย่างการ push image ไปยัง Docker Hub:

1. ให้แน่ใจว่าคุณได้ login เข้าสู่ Docker Hub:

```bash
docker login
```

2. สร้าง tag ให้กับ Docker image ของคุณ:

```bash
docker tag my_image username/my_image:tag
```

3. Push image ไปยัง Docker Hub:

```bash
docker push username/my_image:tag
```

## Docker Registry ภายในองค์กร

นอกจาก Docker Hub แล้ว, คุณสามารถตั้ง Docker Registry ภายในองค์กรของคุณเองเพื่อเก็บ Docker images ที่ต้องการ. การตั้งค่า Docker Registry ภายในองค์กรจะช่วยเพิ่มความปลอดภัย, การควบคุมเวอร์ชัน, และสามารถจัดการ images ที่ต้องการใช้เฉพาะภายในองค์กรได้.

### การตั้งค่า Docker Registry

1. การตั้งค่า Docker Registry สามารถทำได้โดยใช้ `docker run` เพื่อรัน Docker Registry ภายในเครื่อง:

```bash
docker run -d -p 5000:5000 --name registry --restart always registry:2
```

คำสั่งนี้จะดาวน์โหลดและรัน Docker Registry instance บนพอร์ต 5000.

2. หลังจากรัน Docker Registry แล้ว, คุณสามารถ push หรือ pull Docker images ไปยัง registry ที่คุณสร้างขึ้นเองได้.

### ตัวอย่างการ push image ไปยัง private registry:

```bash
docker tag my_image localhost:5000/my_image:tag
docker push localhost:5000/my_image:tag
```

ในที่นี้, `localhost:5000` คือ URL ของ private Docker registry ที่เราสร้างขึ้น.

### การดึง Docker image จาก private registry:

```bash
docker pull localhost:5000/my_image:tag
```

## Docker Registry API

Docker Registry API ช่วยให้คุณสามารถทำการ interact กับ Docker Registry ผ่าน HTTP requests. API นี้จะใช้ในการจัดการ images, repositories, และ tags. การใช้ Docker Registry API จะช่วยให้คุณสามารถสร้าง automation ในการจัดการ Docker images ของคุณได้.

### ตัวอย่างการใช้ API:

การค้นหาบริการหรือ repositories สามารถทำได้ผ่านคำสั่ง GET บน API:

```bash
curl https://registry.hub.docker.com/v2/repositories/nginx/tags/
```

คำสั่งนี้จะให้ข้อมูลเกี่ยวกับ tags ของ image `nginx` บน Docker Hub.

## Security ใน Docker Registry

เมื่อทำงานกับ Docker Registry, ควรพิจารณาด้านความปลอดภัยเป็นพิเศษ:

### 1. ใช้ HTTPS

ควรตั้งค่า Docker Registry ให้ใช้ HTTPS เพื่อเข้ารหัสข้อมูลระหว่างการส่งและรับ Docker images เพื่อป้องกันการโจมตีจาก man-in-the-middle.

### 2. การใช้งาน Authentication และ Authorization

เมื่อคุณตั้งค่า Docker Registry ภายในองค์กร, คุณสามารถใช้การตรวจสอบสิทธิ์ (Authentication) และการกำหนดสิทธิ์ (Authorization) เพื่อตรวจสอบผู้ใช้งานที่สามารถเข้าถึง Docker images ใน registry ได้.

- การใช้ **basic authentication** สามารถทำได้ด้วยการตั้งค่าผ่านไฟล์ `htpasswd` และการกำหนดสิทธิ์ที่เหมาะสม.
- คุณสามารถใช้ **OAuth** หรือระบบตรวจสอบสิทธิ์อื่นๆ เพื่อเพิ่มความปลอดภัยได้.

### 3. การตั้งค่า Webhooks

Docker Registry สามารถตั้งค่า webhooks เพื่อแจ้งเตือนเมื่อมีการ push หรือ pull images ไปยัง registry. Webhooks ช่วยให้คุณสามารถสร้างระบบการแจ้งเตือนหรือการกระทำอื่นๆ เมื่อมีการเปลี่ยนแปลงใน Docker Registry.

## การลบ Docker Images และ Tags

การลบ Docker images และ tags ใน Docker Registry ทำได้โดยใช้คำสั่ง `docker rmi` ในกรณีที่คุณต้องการลบ Docker images ที่ไม่ต้องการอีกต่อไป.

### ตัวอย่างการลบ Docker image:

```bash
docker rmi my_image:tag
```

การลบ tag ภายใน Docker Registry อาจต้องใช้คำสั่ง API หรือการจัดการภายใน Docker Registry เอง.

## สรุป

Docker Registry เป็นที่เก็บ Docker images ที่ช่วยให้คุณสามารถจัดการและแชร์ Docker images ได้อย่างมีประสิทธิภาพ. การใช้งาน Docker Hub หรือ Docker Registry ภายในองค์กรจะช่วยให้การพัฒนาและการจัดการ Docker containers เป็นไปได้อย่างรวดเร็วและปลอดภัย. การใช้ Docker Registry API, การตั้งค่า authentication และการตั้งค่าความปลอดภัยเป็นสิ่งที่จำเป็นเพื่อให้การใช้งาน Docker Registry มีความปลอดภัยและมีประสิทธิภาพมากยิ่งขึ้น.