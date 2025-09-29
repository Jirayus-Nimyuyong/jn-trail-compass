# API Gateway – HTTP API vs REST API

## ภาพรวมของประเภท API ใน API Gateway

ในส่วนนี้เราจะพูดถึงประเภทของ API ที่สามารถสร้างได้ใน API Gateway

* จนถึงตอนนี้ในคอร์สเราใช้ **REST API**
* นอกจากนี้ยังมี **HTTP API** และ **WebSocket API**
* จะอธิบายในระดับสูง เพื่อให้เข้าใจคุณสมบัติพื้นฐาน
* แม้ว่าจะยังไม่ปรากฏบ่อยในข้อสอบ แต่ควรเข้าใจลักษณะพื้นฐาน

## คุณสมบัติของ HTTP API

* ออกแบบให้ **มี Latency ต่ำและค่าใช้จ่ายต่ำ**
* ทำงานเป็น **AWS Lambda proxy** และ **HTTP proxy API**
* รองรับการ Integrate แบบ Private
* ทำงานเป็น **Proxy เต็มรูปแบบ** โดยไม่มีความสามารถในการ map ข้อมูล
* รองรับ Authorization เพียงบางประเภท ได้แก่ **OpenID Connect (OIDC)** และ **OAuth 2.0**
* รองรับ **CORS** ในตัว
* **ไม่รองรับ** Usage Plans หรือ API Keys

**ข้อดี:**

* เป็นตัวเลือกที่ **ประหยัดค่าใช้จ่าย** มากกว่า REST API
* ใหม่กว่าและเรียกชื่อได้สับสนเล็กน้อย แต่ **ใช้ง่ายกว่า REST API**

## คุณสมบัติของ REST API

* REST API มี **ฟีเจอร์ครบถ้วน** ตามที่เรียนในคอร์สนี้
* ยกเว้น **Native OIDC และ OAuth 2.0**
* สามารถดูการเปรียบเทียบรายละเอียดระหว่าง HTTP API และ REST API ได้จากเอกสาร AWS

## ความแตกต่างสำคัญสำหรับข้อสอบ

* HTTP API **ถูกกว่า REST API**
* REST API รองรับ **Resource Policies**
* HTTP API **ไม่รองรับ Resource Policies**
* HTTP API มีฟีเจอร์จำกัดกว่ามาก เช่น **ไม่มี data mapping, usage plans และ API keys**

## สรุป (Key Takeaways)

* API Gateway มี **3 ประเภท API:** REST API, HTTP API, WebSocket API
* HTTP API → Proxy, latency ต่ำ, ค่าใช้จ่ายต่ำ, ฟีเจอร์จำกัด
* HTTP API รองรับ **OIDC และ OAuth 2.0** แต่ไม่มี data mapping, usage plans, API keys
* REST API → ฟีเจอร์ครบกว่า, รองรับ Resource Policies ซึ่ง HTTP API ไม่มี