# Lambda@Edge & CloudFront Functions

## การปรับแต่งที่ Edge

เรามาพูดถึง **การปรับแต่งที่ Edge** กัน

* ปกติเราจะ deploy ฟังก์ชันและแอปพลิเคชันใน region เฉพาะ แต่บางครั้ง เช่น การใช้ **CloudFront** **Edge Locations** จะกระจายเนื้อหาของเรา
* แอปสมัยใหม่มักต้องการ **logic บางอย่างทำงานที่ Edge ก่อนถึงแอปพลิเคชัน**
* เรียกฟังก์ชันเหล่านี้ว่า **Edge Functions** — คือโค้ดที่คุณเขียนและแนบไปกับ CloudFront distributions
* เป้าหมายคือรันฟังก์ชันใกล้ผู้ใช้เพื่อลด **latency**

CloudFront มีฟังก์ชัน 2 ประเภท:

1. **CloudFront Functions**
2. **Lambda@Edge**

แนวคิดคือเข้าใจว่า **เมื่อไหร่ควรใช้แบบไหน** และความแตกต่าง

* **Edge Functions** = serverless, deploy ทั่วโลก, จ่ายตามการใช้งานจริง
* ใช้ปรับแต่ง **CDN content** จาก CloudFront

## กรณีใช้งาน (Use Cases) ของ Edge Functions

* ความปลอดภัยและความเป็นส่วนตัวของเว็บไซต์
* เว็บแอปแบบ dynamic ที่ Edge
* SEO (Search Engine Optimization)
* Intelligent routing ข้าม origins และ data centers
* Bot mitigation
* การแปลงรูปภาพแบบ real-time
* A/B testing
* การยืนยันตัวตนและสิทธิ์ผู้ใช้ (Authentication & Authorization)
* การจัดลำดับผู้ใช้ (User prioritization)
* การติดตามและวิเคราะห์ผู้ใช้ (User tracking & analytics)

## การทำงานของ CloudFront Request & Response

ลำดับการทำงานปกติ:

1. Client ส่ง **viewer request** ไปยัง CloudFront
2. CloudFront ส่ง **origin request** ไปยัง origin server
3. Origin server ตอบกลับ **origin response**
4. CloudFront ส่ง **viewer response** กลับไปยัง client

**CloudFront Functions**

* เป็นฟังก์ชัน JavaScript ขนาดเล็ก ใช้ปรับแต่ง **viewer request และ viewer response** เท่านั้น
* ใช้สำหรับ **high-scale, latency-sensitive CDN customizations**
* **Startup time ต่ำกว่า 1 ms**
* ปรับขนาดเพื่อรองรับ **ล้าน requests ต่อวินาที**

**Lambda@Edge**

* ยืดหยุ่นกว่า ปรับแต่งได้ทั้ง:

  * Viewer request
  * Origin request
  * Origin response
  * Viewer response
* เขียนได้ **Node.js หรือ Python**
* รองรับ **หลายพัน requests ต่อวินาที**
* Author function ใน **us-east-1** แล้ว CloudFront replicate ไปทั่วโลก

## เปรียบเทียบ CloudFront Functions vs Lambda@Edge

| Feature            | CloudFront Functions      | Lambda@Edge                                                      |
| ------------------ | ------------------------- | ---------------------------------------------------------------- |
| Runtime Support    | JavaScript                | Node.js และ Python                                               |
| Scale              | ล้าน requests/วินาที          | หลายพัน requests/วินาที                                             |
| Trigger Events     | Viewer request & response | Viewer request, origin request, origin response, viewer response |
| Max Execution Time | < 1 ms                    | 5-10 วินาที                                                        |

* CloudFront Functions = ฟังก์ชันสั้นและเร็ว
* Lambda@Edge = ฟังก์ชันซับซ้อนและเวลา execution ยาวกว่า

## กรณีใช้งาน CloudFront Functions

* Cache key normalization
* Manipulate HTTP headers (insert, modify, delete)
* URL rewrite หรือ redirect

* Request authorization (สร้าง/ตรวจสอบ JWT)

**ทั้งหมดทำงาน <1 ms**

## กรณีใช้งาน Lambda@Edge

* รองรับ **execution time ยาวถึง 10 วินาที**
* ปรับ CPU & memory ได้
* ใช้ third-party libraries (เช่น AWS SDK)
* Network access ไปยัง external services
* File system access
* เข้าถึง HTTP request body สำหรับ customization ขั้นสูง

เหมาะกับ **งานซับซ้อนเกินกว่าที่ CloudFront Functions ทำได้**

## สรุป

* **Edge Functions** = รันโค้ดใกล้ผู้ใช้ ลด latency, ไม่ต้อง manage server
* **CloudFront Functions** = JavaScript, high-scale, low-latency, แก้ viewer request/response เท่านั้น
* **Lambda@Edge** = Node.js/ Python, ปรับแต่งทุก request/response event, execution ยาวกว่า, ใช้ resource เพิ่มได้
* Use cases: security, dynamic web apps, SEO, routing, bot mitigation, image transformation, A/B testing, authentication, analytics
