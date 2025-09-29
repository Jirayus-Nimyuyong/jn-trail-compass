# Route 53 – Routing Policies

## Routing Policies ใน Route 53

มาพูดถึง **Routing Policy** ใน Route 53 กันครับ
Routing Policy คือวิธีที่ Route 53 ใช้ในการตอบสนองต่อ DNS Queries

⚠️ สิ่งที่ควรระวังคือ อย่าสับสนกับ **routing ของ Load Balancer**

* Load Balancer มีหน้าที่ส่งต่อ traffic ไปยัง EC2 instances ด้านหลัง
* แต่ Route 53 ทำงานในมุมของ **DNS** → DNS ไม่ได้ “route traffic” โดยตรง แต่เพียงตอบคำถาม (queries) เพื่อบอก client ว่าควรส่ง HTTP request ไปที่ไหน
* DNS ช่วยแปลง **hostname** → **endpoint จริง** เพื่อให้ client ใช้ในการเชื่อมต่อ

## Routing Policies ที่ Route 53 รองรับ

Route 53 มีหลายแบบ ได้แก่:

* Simple
* Weighted
* Failover
* Latency-based
* Geolocation
* Multi-value answer
* Geoproximity

## Simple Routing Policy

* ใช้เพื่อชี้ traffic ไปที่ **resource เดียว**
* เช่น client ขอ `foo.example.com` → Route 53 ตอบกลับด้วย IP address ผ่าน **A record**

➡️ สามารถกำหนด **หลาย IP addresses** ใน record เดียวได้

* หากมีหลายค่า → client จะ **เลือกแบบสุ่ม** หนึ่งค่า

**ตัวอย่าง**

* client ขอ `foo.example.com`
* Route 53 ตอบกลับด้วย 3 IP ใน A record
* client จะสุ่มเลือก IP ใด IP หนึ่งไปใช้

📌 หากใช้ **Alias Record** ร่วมกับ Simple Policy → สามารถกำหนด target AWS Resource ได้เพียง **หนึ่งตัว** เท่านั้น
📌 Simple Policy เรียกว่า "simple" เพราะตรงไปตรงมา และ **ไม่รองรับ health check**

### การสร้าง Simple Routing Policy Record ใน Console

* ชื่อ record: `simple.stephanetheteacher.com`
* ประเภท: **A Record**
* ชี้ไปที่ instance ใน region `ap-southeast-1`
* TTL: 20 วินาที (ค่าต่ำเพื่อทดสอบ)
* เลือก routing policy = **Simple**

### การตรวจสอบ Simple Routing Policy

* เมื่อเข้าผ่าน `simple.stephanetheteacher.com` → ได้ผลลัพธ์ `"Hello World from my instance in ap-southeast-1b"`
* ใช้คำสั่ง `dig` → เห็น A record ที่ TTL = 20 วินาที ชี้ไปยัง IP ที่ตั้งไว้

📌 หากเพิ่มหลาย IP → DNS จะตอบกลับมาพร้อมกัน (เช่น IP จาก `ap-southeast-1` และ `us-east-1`)
📌 Client จะสุ่มเลือก 1 IP → ทำให้ refresh หน้าเว็บอาจสลับไปมาระหว่าง region ต่างๆ

## Weighted Routing Policy

นโยบายการกำหนดเส้นทางแบบถ่วงน้ำหนัก (Weighted Routing Policy) ช่วยให้เราควบคุมเปอร์เซ็นต์ของคำขอ (requests) ที่จะถูกส่งไปยัง resource ใด ๆ ได้ โดยการกำหนด “น้ำหนัก” (weight) ให้กับแต่ละ resource

ยกตัวอย่างเช่น เรามี EC2 Instances จำนวน 3 เครื่อง โดยกำหนด weight เป็น 70, 20 และ 10 ตามลำดับ ถึงแม้ตัวเลขนี้รวมกันเป็น 100 แต่ในความเป็นจริงไม่จำเป็นต้องรวมกันได้ 100 ก็ได้ ค่า weight จะเป็นตัวกำหนด “สัดส่วน” ของ DNS response ที่ Route 53 จะส่งกลับมายัง client → เช่น 70% ของ traffic จะไปยัง instance แรก, 20% ไป instance ที่สอง และ 10% ไป instance ที่สาม

ในเชิงเทคนิค แต่ละ DNS record จะถูกกำหนดด้วยค่า weight จากนั้น Route 53 จะคำนวณเปอร์เซ็นต์การส่งต่อว่า record ไหนจะถูกเลือกโดยใช้สูตร:

```
Traffic % = (Weight ของ record นั้น) ÷ (ผลรวมของ weights ทั้งหมด)
```

🔑 หมายเหตุ:

* ค่า weight ไม่จำเป็นต้องรวมกันเป็น 100
* สิ่งที่สำคัญคือ “สัดส่วน” ระหว่าง weight ของแต่ละ record
* DNS records ที่ใช้ weighted routing ต้องมี **ชื่อ (Name)** และ **ชนิด (Type)** เหมือนกันทั้งหมด
* records แต่ละตัวสามารถเชื่อมโยงกับ health check ได้ (จะอธิบายภายหลัง)

### กรณีใช้งาน (Use Cases)

นโยบายการถ่วงน้ำหนักมักถูกนำมาใช้ในสถานการณ์ต่าง ๆ เช่น:

* การกระจายโหลด (Load Balancing) ข้ามหลาย Region
* การทดสอบ version ใหม่ของแอป โดยส่ง traffic ไป version ใหม่เพียงบางส่วน
* การกำหนด weight = 0 เพื่อหยุดส่ง traffic ไปยัง resource ใด ๆ ชั่วคราว
* ค่อย ๆ ปรับ traffic distribution แบบ dynamic ได้ (เช่น จากเวอร์ชันเก่าไปเวอร์ชันใหม่ทีละน้อย)

หากทุก record มีค่า weight = 0 → Route 53 จะส่งคืนทุก record แบบ “equal distribution” (เท่ากันหมด)

### การตั้งค่า Weighted Records ใน AWS Console

สมมติว่าเราจะสร้าง DNS records แบบ weighted ดังนี้:

* สร้าง 3 records ภายใต้ชื่อ **weighted.stephanetheteacher.com**
* ชนิดเป็น **A record**
* กำหนด Routing Policy เป็น **Weighted**

รายละเอียดของแต่ละ record:

1. Record แรก → ชี้ไปยัง IP ของ region **ap-southeast-1** (น้ำหนัก 10)
2. Record ที่สอง → ชี้ไปยัง IP ของ region **us-east-1** (น้ำหนัก 70)
3. Record ที่สาม → ชี้ไปยัง IP ของ region **eu-central-1** (น้ำหนัก 20)

เพื่อให้เห็นผลเร็ว ๆ กำหนด TTL ต่ำมาก (เช่น 3 วินาที) — แต่ไม่แนะนำใน production

แต่ละ record ยังสามารถใส่ health check ได้ (ในตัวอย่างนี้ยังไม่ใส่)
Route 53 จะสร้าง **Record ID** ไม่ซ้ำกัน เช่น southeast, us-east, EU เพื่อให้ระบุได้ว่า record ไหนคือ record ไหน

เมื่อสร้างเสร็จ เราจะเห็นตารางที่แสดง records พร้อม weight → 10, 20 และ 70 ตามลำดับ

### การสังเกตพฤติกรรมของ Weighted Routing

* เมื่อเข้าผ่าน URL **weighted.stephanetheteacher.com** ส่วนใหญ่แล้วจะได้ response จาก region **us-east-1a** (เพราะ weight = 70)
* ถ้า refresh หน้าเว็บทุก ๆ 3 วินาที อาจเห็น response จาก region อื่น ๆ ด้วย สะท้อนการกระจายแบบ weighted
* เมื่อใช้คำสั่ง **dig** จะเห็นว่า TTL = 3 วินาที และโดยมากจะคืน IP จาก us-east-1 แต่บางครั้งก็จะได้ IP จาก eu-central-1 (weight 20) หรือ ap-southeast-1 (weight 10)

สรุปคือ weighted routing จะ “กระจาย” DNS response ส่วนใหญ่ไปยัง resource ที่มีน้ำหนักสูงที่สุด และบางส่วนไปยัง resource อื่น ๆ ตามสัดส่วน

### บทสรุป

นโยบายแบบ Weighted ช่วยให้เราควบคุมการกระจาย traffic ไปยังหลาย resource ได้ตามต้องการ เหมาะสำหรับการทำ load balancing, การ rollout แบบค่อย ๆ เพิ่มสัดส่วน, หรือการจัดการ traffic แบบยืดหยุ่น

## Latency-Based Routing Policy

นโยบายการกำหนดเส้นทางแบบ Latency มีแนวคิดที่เข้าใจง่ายมาก คือการ **ส่งผู้ใช้ไปยัง resource ที่มี latency ต่ำที่สุด** หรือก็คือ resource ที่ใกล้ที่สุดในเชิงเครือข่าย

วิธีนี้มีประโยชน์มากหากความเร็วในการตอบสนอง (latency) เป็นสิ่งสำคัญที่สุดสำหรับเว็บไซต์หรือแอปพลิเคชัน

Latency ถูกวัดจากความเร็วในการเชื่อมต่อผู้ใช้ไปยัง region ของ AWS ที่ใกล้ที่สุดสำหรับ DNS record นั้น ๆ
ตัวอย่างเช่น หากผู้ใช้อยู่ที่ประเทศเยอรมนี แต่ resource ที่ latency ต่ำที่สุดอยู่ที่สหรัฐอเมริกา → ผู้ใช้จะถูกส่งไปยัง resource ในสหรัฐฯ แทน

นโยบายนี้ยังสามารถใช้ร่วมกับ **Health Checks** ได้ (ซึ่งจะอธิบายในภายหลัง)

### การทำงานของ Latency Routing ในการ Deploy แบบ Global

สมมติว่าเรามีการ deploy แอปไว้ใน 2 region ได้แก่:

* **us-east-1** (อเมริกา)
* **ap-southeast-1** (สิงคโปร์)

Route 53 จะใช้ latency เป็นตัวตัดสินใจว่าใครควรถูกส่งไปที่ไหน:

* ผู้ใช้ที่อยู่ใกล้ **us-east-1** → จะถูกส่งไปยัง ALB ใน us-east-1
* ผู้ใช้ที่อยู่ใกล้ **ap-southeast-1** → จะถูกส่งไปยัง ALB ใน ap-southeast-1

### การสร้าง Latency-Based DNS Records ใน Route 53

เราจะสร้าง record ใหม่ชื่อ **latency.stephanetheteacher.com**

1. เพิ่มค่าแรก → IP address ของ region **ap-southeast-1**

   * กำหนด Routing Policy เป็น **Latency**
   * ระบุ region = ap-southeast-1 (สิงคโปร์)
   * ใส่ Record ID เช่น `ap-southeast-1`
   * สามารถเลือกผูก Health Check ได้ (ไม่บังคับ)

2. ทำซ้ำขั้นตอนสำหรับ **us-east-1** และ **eu-central-1** โดยใส่ IP, region, และ Record ID ของแต่ละอัน

❗ หมายเหตุ:
หากใช้ **IP address** เราต้องระบุ region เอง เพราะ Alias record จะไม่รู้ว่า IP นั้นอยู่ใน region ไหน → การระบุ region จึงช่วยให้ Route 53 เลือก latency ได้ถูกต้อง

### การทดสอบ Latency-Based Routing

เมื่อสร้าง records ครบแล้ว เราสามารถทดสอบพฤติกรรมการทำงาน:

* หากเข้าจากยุโรป → จะถูกส่งไปยัง instance ที่ **eu-central-1**
* ใช้ **CloudShell ในยุโรป** แล้วรัน `dig` → จะเห็น IP ของ instance ใน eu-central-1 ตลอด เพราะ latency ไม่เปลี่ยน

การทดสอบจาก region อื่น ๆ สามารถทำได้ด้วย **VPN**:

* VPN → แคนาดา → จะถูกส่งไปยัง **us-east-1**
* VPN → ฮ่องกง → จะถูกส่งไปยัง **ap-southeast-1**

เมื่อเปลี่ยน VPN ควร refresh browser เพื่อเคลียร์ DNS cache เพื่อให้ routing ใหม่ทำงาน

ผลลัพธ์แสดงให้เห็นว่า latency-based routing ช่วยปรับปรุงประสบการณ์ผู้ใช้ได้จริง โดยส่ง traffic ไปยัง AWS region ที่ใกล้และตอบสนองเร็วที่สุด

## Failover Routing Policy

ในการตั้งค่านี้ Route 53 จะทำหน้าที่เป็นบริการ DNS โดยมี **EC2 instance 2 ตัว**:

* ตัวแรกเป็น **Primary instance** (หลัก)
* ตัวที่สองเป็น **Secondary instance** หรือ **Disaster Recovery (DR)**

Record ของ **Primary** จะต้องถูกผูกกับ **Health Check (บังคับ)**

* ถ้า Health Check พบว่า Primary ไม่พร้อมใช้งาน → Route 53 จะ **สลับ (failover)** ไปยัง Secondary โดยอัตโนมัติ และเริ่มส่ง traffic ไปที่มันแทน

Record ของ **Secondary** สามารถเลือกที่จะผูกกับ Health Check ก็ได้ แต่ไม่บังคับ
❗ ใน Failover configuration จะมีได้เพียง **1 Primary และ 1 Secondary** เท่านั้น

เมื่อผู้ใช้ส่ง DNS Request → Route 53 จะตอบกลับด้วย record ที่สุขภาพดีที่สุด (healthy resource):

* ถ้า Primary ยัง Healthy → จะตอบ Primary
* ถ้า Primary ล้มเหลว (unhealthy) → จะตอบ Secondary ทันที เพื่อให้บริการไม่สะดุด

### การสร้าง Failover Record (Hands-On)

เราจะสร้าง record ชื่อ **failover.stephanetheteacher.com**

1. **สร้าง Primary Record**

   * Type: A record → ชี้ไปที่ EC2 instance ใน **eu-central-1** (ใกล้เรา)
   * Routing Policy: Failover
   * TTL: 60 วินาที (เพื่อให้ DNS อัปเดตเร็วตอน failover)
   * เลือก Role: **Primary**
   * ต้องผูกกับ Health Check → ตั้งชื่อว่า `EU-central-1` พร้อม Record ID `E`

2. **สร้าง Secondary Record**

   * Name เดิม: **failover.stephanetheteacher.com**
   * Type: A record → ชี้ไปที่ EC2 instance ใน **us-east-1**
   * Routing Policy: Failover
   * TTL: 60 วินาที
   * เลือก Role: **Secondary**
   * Health Check: เลือกจะผูกหรือไม่ก็ได้ (ในตัวอย่างนี้เลือกผูกกับ Health Check `US-East-1`, Record ID `US`)

หลังจากสร้างเสร็จ → เราจะเห็น Health Check ของทั้งคู่เป็น **Healthy**

เมื่อเข้า URL `failover.stephanetheteacher.com` → จะได้ response จาก **eu-central-1 (Primary)** เพราะยังทำงานปกติ

### การจำลอง Failover

เพื่อทดสอบ failover → เราจำลองความล้มเหลวของ Primary โดย:

1. ไปแก้ **Security Group** ของ instance ใน eu-central-1
2. ลบ **Inbound rule** ของ port 80 → ทำให้ Health Checker เข้ามาไม่ได้

ผลลัพธ์:

* Health Check ของ eu-central-1 เปลี่ยนจาก Healthy → Unhealthy
* Route 53 จะ **สลับไปใช้ Secondary อัตโนมัติ**
* เมื่อ refresh URL → จะได้ response จาก **us-east-1 (Secondary)**

จากนั้นเมื่อแก้ Security Group กลับ (เพิ่ม HTTP Inbound rule กลับเข้าไป) → Health Check จะกลับมา Healthy อีกครั้ง
Route 53 จะ **failback** กลับไปที่ Primary โดยอัตโนมัติ

## Geolocation Routing Policy

ตอนนี้เราจะมาพูดถึง **การกำหนดเส้นทางแบบ Geolocation** ซึ่งแตกต่างจาก **การกำหนดเส้นทางแบบ Latency** อย่างชัดเจน เพราะนโยบายนี้จะกำหนดเส้นทางผู้ใช้งานตาม **ตำแหน่งที่ตั้งทางกายภาพจริง** ของผู้ใช้

ตัวอย่างเช่น คุณสามารถกำหนดกฎการกำหนดเส้นทางตามทวีป ประเทศ หรือแม้กระทั่งในระดับที่เจาะจงมากขึ้น เช่น รัฐในสหรัฐอเมริกา โดยระบบจะเลือกตำแหน่งที่ตรงที่สุดก่อน แล้วจึงกำหนดเส้นทางไปยัง IP ที่เกี่ยวข้อง

สิ่งสำคัญคือ ควรสร้าง **default record** เพื่อรองรับกรณีที่ไม่มีตำแหน่งที่ตรงกับกฎ

### **กรณีการใช้งาน (Use Cases)**

* การปรับแต่งเว็บไซต์ตามท้องถิ่น (Website localization)
* การจำกัดการกระจายคอนเทนต์ (Content distribution restrictions)
* การกระจายโหลด (Load balancing)

นอกจากนี้ record ประเภทนี้ยังสามารถผูกกับ **health check** ได้เพื่อให้มั่นใจว่าเป้าหมายพร้อมให้บริการ

### **ตัวอย่างการใช้งาน**

สมมติว่ามีแผนที่ยุโรป คุณสามารถสร้าง geolocation record สำหรับ **เยอรมนี** เพื่อให้ผู้ใช้ในเยอรมนีถูกส่งไปยัง IP ที่โฮสต์เวอร์ชันเยอรมันของแอปพลิเคชัน ส่วนผู้ใช้ใน **ฝรั่งเศส** จะถูกส่งไปยัง IP ที่โฮสต์เวอร์ชันฝรั่งเศส และผู้ใช้จากที่อื่นจะถูกส่งไปยัง **default IP** ที่อาจเป็นเวอร์ชันภาษาอังกฤษ

นี่คือวิธีที่ **Geolocation Routing** ถูกนำไปใช้จริง

### **การสร้าง Geolocation Record**

1. เริ่มจากสร้าง **A record** โดยตั้งค่า Routing Policy เป็น **Geolocation**

   * เช่น สร้าง record ชี้ไปที่ region `ap-southeast-1`
   * กำหนด location เป็น **Asia ทั้งหมด** → ผู้ใช้ที่อยู่ในเอเชียจะถูกส่งไปยัง EC2 instance ใน `ap-southeast-1`
   * (สามารถผูก health check และใส่ Record ID ได้ด้วย)

2. เพิ่ม record อื่น ๆ เช่น:

   * **us-east-1 (United States)** → ระบุ location เป็น "United States" พร้อม Record ID = `"US"`
   * **eu-central-1 (Default)** → กำหนดเป็น **default record** สำหรับผู้ใช้ที่ไม่ตรงกับ Asia หรือ U.S. → Record ID = `"Default EU"`

### **การทดสอบการกำหนดเส้นทาง**

* หากคุณไม่ได้อยู่ใน U.S. หรือ Asia → ระบบจะส่งคุณไปที่ `eu-central-1` (Default)

* หากคุณใช้ VPN ไปที่เอเชีย เช่น **อินเดีย** → ระบบจะส่งไปที่ `ap-southeast-1`

  * ถ้า timeout มักเกิดจาก **Security Group** (เช่น ลบ HTTP inbound rule ออกไป) → ต้องเพิ่ม rule กลับมา
  * เมื่อแก้ไขแล้ว refresh หน้า → จะแสดงผลจาก instance ใน Asia ได้ตามคาด

* หากคุณเชื่อมต่อจาก **U.S.** → จะถูกส่งไปที่ instance ใน `us-east-1a`

* หากคุณเชื่อมต่อจากประเทศใกล้เคียงที่ไม่ได้กำหนดไว้ เช่น **เม็กซิโก** → จะถูกส่งไปที่ **default location** (`eu-central-1c`)

## Geoproximity Routing Policy

### **แนะนำ Geoproximity Routing**

Geoproximity Routing เป็นคุณสมบัติที่ช่วยกำหนดเส้นทางการรับส่งข้อมูล (traffic) ไปยังทรัพยากรของคุณ โดยอิงจาก **ตำแหน่งทางภูมิศาสตร์ของผู้ใช้และทรัพยากร** ซึ่งแนวคิดนี้อาจดูซับซ้อนเล็กน้อย แต่เมื่อมี **แผนภาพและตัวอย่าง** จะเข้าใจง่ายขึ้น

### **วัตถุประสงค์ของ Geoproximity Routing**

นโยบายนี้ช่วยให้คุณสามารถ **ปรับเปลี่ยนปริมาณ traffic** ที่ไปยังทรัพยากรในตำแหน่งใดตำแหน่งหนึ่งได้ โดยใช้พารามิเตอร์ที่เรียกว่า **Bias**

* การปรับค่า bias จะทำให้ **พื้นที่ทางภูมิศาสตร์** ที่ทรัพยากรนั้นรองรับ **ขยายหรือหดตัว**

### **Bias ส่งผลต่อการกระจาย Traffic อย่างไร?**

* **เพิ่มค่า bias (ค่าบวก)** → ขยายพื้นที่ที่ทรัพยากรรองรับ → ดึงดูด traffic มากขึ้น
* **ลดค่า bias (ค่าลบ)** → ลดขนาดพื้นที่ → ทราฟฟิกที่วิ่งเข้ามาจะน้อยลง

### **การระบุที่ตั้งของทรัพยากร (Resource Locations)**

* **สำหรับทรัพยากรใน AWS** → เพียงระบุ Region ที่ใช้งาน AWS จะคำนวณตำแหน่งให้อัตโนมัติ
* **สำหรับทรัพยากรนอก AWS (On-premises)** → ต้องระบุ **latitude และ longitude** เพื่อให้ AWS รู้ตำแหน่งที่แน่นอน

### **การใช้งานผ่าน Advanced Route 53 Traffic Flow**

หากต้องการใช้ฟีเจอร์ **Bias** ใน Geoproximity Routing ต้องใช้งานผ่าน **Route 53 Traffic Flow (advanced)**

### **ตัวอย่างสถานการณ์: ทรัพยากร 2 แห่งใน Region ต่างกัน**

สมมติว่ามีทรัพยากรสองแห่ง:

* แห่งแรกใน **us-west-1**
* อีกแห่งใน **us-east-1**
  และทั้งคู่ตั้งค่า bias = 0

ผลลัพธ์:

* ผู้ใช้ฝั่งตะวันตกของเส้นแบ่ง → ถูกส่งไปที่ **us-west-1**
* ผู้ใช้ฝั่งตะวันออกของเส้นแบ่ง → ถูกส่งไปที่ **us-east-1**

กล่าวคือ ผู้ใช้จะถูกส่งไปยังทรัพยากรที่ **ใกล้ที่สุด** เมื่อ bias = 0

### **ผลกระทบของ Bias ต่อ Routing**

หากกำหนด bias = 0 ที่ **us-west-1**
แต่เพิ่ม bias (เช่น +50) ที่ **us-east-1** → เส้นแบ่งจะขยับไปทางซ้าย

ผลลัพธ์:

* ผู้ใช้ฝั่งซ้ายของเส้นใหม่ → ไปที่ **us-west-1**
* ผู้ใช้ฝั่งขวาของเส้นใหม่ → ไปที่ **us-east-1**
* ค่า bias ที่เป็นบวกใน us-east-1 จะดึงดูดผู้ใช้และ traffic มายัง region นี้มากขึ้น

### **การใช้ Bias ในทางปฏิบัติ**

คุณสามารถตั้งค่าทรัพยากรไว้หลายแห่งทั่วโลก และใช้ **Geoproximity Routing** เพื่อ **ดึง traffic ไปยัง region ใด region หนึ่งมากขึ้น** โดยการเพิ่มค่า bias ของ region นั้น → ทำให้ผู้ใช้จำนวนมากขึ้นถูกส่งไปยังตำแหน่งเป้าหมาย

### **สรุป**

Geoproximity Routing มีประโยชน์อย่างยิ่งเมื่อคุณต้องการ **ย้าย traffic จาก region หนึ่งไปยังอีก region หนึ่ง** เพียงปรับค่า bias ก็สามารถควบคุมการกระจาย traffic ได้อย่างละเอียด

## Route 53 – Traffic flow Hands-On

### **แนะนำ Traffic Flow และ Geoproximity Records**

เรามาดูวิธีสร้าง **Geoproximity Records** แบบซับซ้อนด้วยฟีเจอร์ที่เรียกว่า **Traffic Flow** ฟีเจอร์นี้ไม่ได้จำกัดเฉพาะ Geoproximity แต่สามารถใช้กับนโยบายการกำหนดเส้นทางแบบอื่น ๆ ได้ด้วย
แนวคิดคือการใช้ **UI แบบ Visual Editor** เพื่อจัดการ **Decision Tree** ของ Routing อย่างชัดเจน

UI นี้ช่วยให้คุณสามารถกำหนดกฎการกำหนดเส้นทางต่าง ๆ แบบ **เห็นภาพ** แทนการสร้าง DNS Record ทีละตัว

* การตั้งค่าจะถูกบันทึกเป็น **Traffic Flow Policies**
* สามารถ **Versioned**
* ใช้กับ **Hosted Zones หลายตัว**
* แก้ไขและนำไปใช้ได้ง่าย

### **การสร้าง Traffic Policy**

1. ไปที่แถบด้านซ้าย และเลือก **Traffic Policies**
2. สร้าง **Traffic Policy ใหม่** ตั้งชื่อ เช่น `DemoGeoPolicy` แล้วคลิก **Next**
3. ระบุประเภทของ DNS Record เช่น **A, AAAA หรือ CNAME**

   * ตัวอย่างนี้เลือก **A record**
4. จากนั้นเชื่อมต่อ Record กับ **Routing Rule**

**Routing Rules ที่มีให้เลือก:**

* Weighted

* Failover

* Geolocation

* Latency

* Multivalue

* Geoproximity

* Endpoint แบบตรง

* สำหรับ Record แบบง่าย สามารถชี้ตรงไปยัง Endpoint IP Address ได้เลย

* สำหรับ Policy แบบซับซ้อน สามารถเชื่อมต่อกับ Weighted, Failover ฯลฯ

UI แบบ Visual ทำให้เข้าใจภาพรวมของ Route 53 ได้ง่าย

### **การสร้าง Geoproximity Rule**

1. สร้าง **Geoproximity Rule**
2. UI จะแสดง **แผนที่โลก** เพื่อให้เห็นผลของ Routing
3. ระบุ Region แรกและ Region ที่สอง สำหรับ Geoproximity Routing

**สำหรับ Endpoint แรก:**

* สามารถระบุ **พิกัดเอง** หรือเลือกจาก **AWS Region**
* ตัวอย่างเลือก **US-East-1** และตั้งค่า **Bias**

  * Bias ส่งผลต่อพื้นที่ที่ผู้ใช้จะถูกส่งไปยัง Instance นั้น
* เชื่อมต่อกับ **Endpoint IP ของ EC2 US-East-1**
* ค่า Bias เริ่มต้น = 0

**สำหรับ Endpoint ที่สอง:**

* ระบุพิกัดหรือเลือก Region เช่น **AP-Southeast-1 (Singapore)**
* เชื่อมต่อกับ IP ของ EC2 ที่สอดคล้อง

### **การแสดงผล Geoproximity Map**

* คลิก **Show Map** → จะเห็นแผนที่แบ่งพื้นที่ผู้ใช้ตาม Instance

  * ผู้ใช้ฝั่งสีน้ำเงิน → เชื่อมต่อกับ Instance แรก
  * ผู้ใช้ฝั่งสีส้ม → เชื่อมต่อกับ Instance ที่สอง

**การปรับ Bias:**

* เพิ่ม Bias ของ US-East-1 → ขยายพื้นที่ผู้ใช้ไปยัง Instance นี้

* ลด Bias → Shift Traffic ไปยัง Instance อีกตัว

* สามารถเพิ่ม Location เพิ่ม เช่น **Frankfurt (EU-Central-1)** และกำหนด Endpoint

* แผนที่จะอัปเดตตามการปรับ Bias

### **การสร้างและ Deploy Traffic Policy**

1. สร้าง Traffic Policy เสร็จ → Deploy ไปยัง **Hosted Zone** เช่น `stephanetheteacher.com`
2. ระบุชื่อ Record เช่น `proximity.stephanetheteacher.com` และตั้งค่า TTL

> หมายเหตุ: การสร้าง Traffic Policy Record มีค่าใช้จ่าย **\$50 ต่อเดือน** (คิดตามวันใช้งาน)
>
> * หากต้องการอยู่ใน **Free Tier** → หลีกเลี่ยงการสร้างโดยไม่จำเป็น

3. Policy สามารถ **Versioned**, แก้ไข และ Deploy ใหม่เป็น Version ใหม่ได้
4. Record ที่สร้างโดย Policy สามารถตรวจสอบและแก้ไขได้

### **ทดสอบ Geoproximity Routing**

* ผู้ใช้ในยุโรป → เชื่อมต่อกับ **EU-Central-1**

* ผู้ใช้ในบราซิล → เชื่อมต่อกับ **US-East-1**

* ผู้ใช้ในเอเชีย → เชื่อมต่อกับ **AP-Southeast-1**

* การทดสอบสามารถตรวจสอบ DNS Record จาก Location ต่าง ๆ

* Record Proximity จะชี้ไปยัง Traffic Policy Record โดยตรง

* การแก้ไข Record → กลับไปยัง UI ของ Traffic Policy เพื่อปรับเปลี่ยน

> หลังทดสอบแล้ว → **ลบ Traffic Policy Record** เพื่อลดค่าใช้จ่าย

## IP-based Routing Policy

เรามาพูดถึง **นโยบายการกำหนดเส้นทางแบบ IP-based** นโยบายนี้เข้าใจง่าย เพราะกำหนดการส่งต่อทราฟฟิกตาม **IP ของลูกค้า**

* ใน Route 53 เราจะระบุ **รายการ CIDR** ซึ่งเป็นช่วง IP ของลูกค้า
* จากนั้นกำหนดว่า **ทราฟฟิกจาก CIDR ไหน จะถูกส่งไปยังที่ไหน**

**กรณีการใช้งาน:**

* เพิ่มประสิทธิภาพการทำงาน เพราะเรารู้ IP ล่วงหน้า
* ลดค่าใช้จ่ายด้านเครือข่าย เพราะทราฟฟิกมาจาก IP ที่ทราบแล้ว

**ตัวอย่าง:**

* ถ้ารู้ว่า ISP บางรายใช้ CIDR ของ IP เฉพาะ เราสามารถส่งทราฟฟิกไปยัง Endpoint เฉพาะสำหรับ ISP นั้นได้

### **ตัวอย่างการตั้งค่าใน Route 53**

* กำหนด 2 Location พร้อม **CIDR Block** ต่างกัน

  * Location 1 → CIDR เริ่มต้นด้วย 203
  * Location 2 → CIDR เริ่มต้นด้วย 200
* เชื่อมต่อ Location เหล่านี้กับ **DNS Records**

**ตัวอย่าง:**

* สำหรับ `example.com`

  * Location 1 (CIDR 203.x.x.x) → ส่งไปยัง IP 1.2.3.4
  * Location 2 (CIDR 200.x.x.x) → ส่งไปยัง IP 5.6.7.8

> IP เหล่านี้แทน **Public IP ของ EC2 Instance** 2 ตัว

### **พฤติกรรมการกำหนดเส้นทาง**

* ถ้าผู้ใช้มี IP อยู่ใน **CIDR แรก (Location 1)** → ถูกส่งไปยัง EC2 ที่ IP 1.2.3.4
* ถ้าผู้ใช้มี IP อยู่ใน **CIDR ที่สอง (Location 2)** → ถูกส่งไปยัง EC2 ที่ IP 5.6.7.8

### **สรุป**

IP-based Routing เป็นนโยบายที่เรียบง่ายแต่มีประสิทธิภาพ โดยกำหนดการส่งต่อทราฟฟิกตาม **IP ของลูกค้า**

## Multi-Value Routing Policy

นโยบาย **Multi-Value** ใช้เมื่อคุณต้องการส่งทราฟฟิกไปยัง **หลาย ๆ Resource**

* Route 53 จะ **ส่งค่าหลายค่า (หลาย IP หรือ Resource) กลับไปให้ลูกค้า**
* สามารถเชื่อมต่อ Resource เหล่านี้กับ **Health Checks**

  * ระบบจะส่งกลับเฉพาะ Resource ที่ **ผ่านการตรวจสอบสุขภาพ (Healthy)**
  * แต่ละครั้งจะส่งกลับได้ **สูงสุด 8 records**

> แม้จะคล้ายกับ **Elastic Load Balancer (ELB)** แต่ Multi-Value ไม่ใช่ตัวแทนของ ELB
>
> * มันเป็น **Client-side Load Balancing** คือ ให้ลูกค้าเลือก Resource เองจากค่าที่ Route 53 ส่งกลับ

### **ตัวอย่างการตั้งค่า**

* สร้าง **หลาย A Records** สำหรับ domain `example.com`
* เชื่อมต่อกับ **Health Checks**
* เมื่อมี Multi-Value query ลูกค้าจะได้ **สูงสุด 8 records**
* ลูกค้าจะเลือกใช้หนึ่งในนั้น
* ด้วย Health Checks ทำให้แน่ใจว่า **ทุกค่าเป็น Resource ที่ Healthy**

> ต่างจาก **Simple Routing** ที่มีหลายค่า แต่ไม่สามารถใช้ Health Checks ได้
>
> * ดังนั้น Simple Routing อาจส่ง Resource ที่ไม่ Healthy กลับไปให้ลูกค้า

### **การสร้าง Multi-Value Records ใน UI**

1. สร้าง record ชื่อ `multi` → region `us-east-1`

   * Routing policy → **Multi-Value**
   * Health Check → `us-east-1`
   * Record ID → `US`
   * TTL → 60 วินาที

2. สร้าง record ชื่อ `multi routing` → region `ap-southeast-1`

   * Routing policy → **Multi-Value answer**
   * Health Check → `ap-southeast-1`
   * Record ID → `Asia`
   * TTL → 1 นาที

3. สร้าง record ชื่อ `multi` → region `eu-central-1`

   * Routing policy → **Multi-Value answer**
   * Health Check → `eu-central-1`
   * Record ID → `EU`
   * TTL → 1 นาที

### **ทดสอบ Multi-Value Records**

* ใช้ CloudShell รันคำสั่ง `dig`
* ผลลัพธ์จะได้ **3 IPs** เพราะ Health Checks ทั้งหมด Healthy
* หากเปลี่ยน Health Check ของ `eu-central-1` เป็น Unhealthy → `dig` จะได้ **แค่ 2 IPs**

  * แสดงว่า Multi-Value ทำงานตามคาด ส่งกลับเฉพาะ Resource ที่ Healthy
* หากต้องการคืนค่า → แก้ Health Check ให้กลับเป็น Healthy

### **สรุป**

* Multi-Value Routing ส่งกลับ **หลาย Resource ที่ Healthy สูงสุด 8 record ต่อ query**
* Health Checks ช่วยให้มั่นใจว่า **ส่ง Resource ที่ใช้งานได้จริง**
* ช่วยให้ลูกค้าสามารถทำ **Client-side Load Balancing** ได้
* **ไม่ได้แทน ELB**
* สามารถทดสอบด้วย `dig` และการปรับ Health Check
