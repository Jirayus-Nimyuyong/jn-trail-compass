# API Gateway Canary Deployments

## บทนำ: Canary Deployments บน API Gateway

มาพูดถึงวิธีการทำ **Canary Deployment** บน API Gateway กันครับ แนวคิดหลักคือการ **ทดสอบการเปลี่ยนแปลง API Gateway กับปริมาณ Traffic เพียงบางส่วนก่อน** เพื่อให้มั่นใจว่าระบบใหม่ทำงานได้ตามที่ต้องการ

โดยทั่วไป Canary Deployment มักใช้ใน **Production** โดยจะกำหนดสัดส่วน Traffic ที่จะถูกส่งไปยัง **Canary Channel** เช่น 5% เพื่อทดสอบเวอร์ชันใหม่ ขณะที่อีก 95% ยังคงวิ่งไปยังเวอร์ชันปัจจุบันที่เสถียร

## ตัวอย่างสถานการณ์

สมมุติว่าใน Production Stage ตอนนี้ชี้ไปยัง **เวอร์ชัน 1** ของ API และต้องการทดสอบ **เวอร์ชัน 2**

* เราสร้าง **Production Stage Canary** สำหรับเวอร์ชัน 2
* จากนั้นกำหนดให้ **95% ของ Traffic** ยังคงไปที่ Production Stage (เวอร์ชัน 1 ที่มั่นใจว่าใช้งานได้)
* และ **5% ของ Traffic** ถูกส่งไปที่ Canary Stage (เวอร์ชัน 2 ที่กำลังทดสอบ)

ด้วยการตั้งค่านี้ เราสามารถทดสอบการเปลี่ยนแปลงได้จริงใน Production พร้อมทั้งตรวจสอบ **Metrics, Logs, Debug** และยืนยันว่าทุกอย่างทำงานถูกต้อง

หากมั่นใจแล้ว สามารถเปลี่ยนการตั้งค่าเพื่อส่ง **100% ของ Traffic ไปยัง Canary Stage** ได้เลย

นอกจากนี้ **Metrics และ Logs ของ Canary Stage จะถูกแยกออกมา** เพื่อการ Monitoring ที่ชัดเจนขึ้น อีกทั้งยังสามารถ Override ค่า **Stage Variables** เฉพาะ Canary ได้ด้วย

แนวทางนี้ถือว่าเทียบเท่ากับการทำ **Blue/Green Deployment** ระหว่าง Lambda และ API Gateway

## Key Takeaways

* **Canary Deployments** ช่วยให้สามารถทดสอบ API Gateway เวอร์ชันใหม่กับ Traffic เพียงบางส่วนใน Production ได้
* สามารถแบ่ง Traffic เช่น 95% ไป Production Stage เดิม และ 5% ไป Canary Stage ใหม่
* **Metrics และ Logs ของ Canary** ถูกแยกออกมา ทำให้ Monitoring และ Debug ทำได้ง่ายขึ้น
* การใช้ Canary Deployment บน API Gateway + Lambda **มีความเทียบเท่ากับ Blue/Green Deployment**
