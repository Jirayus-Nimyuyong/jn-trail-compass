# AWS Amplify Cheat Sheet

**AWS Amplify** เป็นแพลตฟอร์มที่ช่วยให้การสร้างและติดตั้ง (Deploy) แอปพลิเคชันแบบ Full-stack ง่ายขึ้นด้วยส่วนประกอบ UI สำเร็จรูป, ตัวเลือกในการโฮสต์ และการเชื่อมต่อกับบริการต่างๆ ของ AWS ที่ง่ายดาย มีความยืดหยุ่นและขยายขนาดได้ ทำให้เพิ่มฟีเจอร์ใหม่ๆ และปรับตัวตามความต้องการที่เปลี่ยนแปลงได้สะดวก



---

### บริการของ Amplify (Amplify Services)
AWS Amplify มีบริการหลัก 2 ส่วนคือ **Amplify Hosting** และ **Amplify Studio**

#### 1. Amplify Hosting
บริการ CI/CD และ Hosting แบบ Managed เต็มรูปแบบสำหรับ Single-page applications (SPA) โดยใช้ AWS S3 และ AWS CloudFront เพื่อส่งเนื้อหาไปยังผู้ใช้ทั่วโลก Amplify จะดูแลเรื่องการจัดการเซิร์ฟเวอร์, การปรับขนาดโครงสร้างพื้นฐาน และการตั้งค่า DNS ให้คุณ

**คุณสมบัติเด่น:**
* รองรับแอปที่ใช้ **Server-side rendering (SSR)** (สร้างด้วย Next.js 12 ขึ้นไป)
* เชื่อมต่อกับ **Cypress** ได้อย่างล้ำลึก เพื่อรันการทดสอบแบบ End-to-end (E2E)
* รองรับ Repository ภายนอกอย่าง **GitHub, Bitbucket และ GitLab** เพื่อสร้าง CI/CD Pipeline
* สามารถ **Preview (ดูตัวอย่าง)** การเปลี่ยนแปลงระหว่างการรีวิวโค้ดได้
* มีระบบ **Password protection** ป้องกันไม่ให้บุคคลทั่วไปเข้าชมเว็บระหว่างการพัฒนา
* มีระบบ **Instant cache invalidations** เพื่อให้ทุกการเปลี่ยนโค้ดแสดงผลให้ผู้ใช้เห็นทันที
* ตั้งค่าการเขียน URL ใหม่ (Rewrites) และการเปลี่ยนเส้นทาง (Redirects) เพื่อรักษาอันดับ SEO
* รองรับการ Deploy แบบ **Monorepo** และการตั้งค่า **Custom HTTP headers**
* มีระบบ **Build caching** เพื่อลดเวลาในการ Build อย่างมีนัยสำคัญ

#### 2. Amplify Studio
สภาพแวดล้อมการพัฒนาแบบภาพ (Visual Development) สำหรับสร้างเว็บแอปพลิเคชันแบบ Serverless
* มีอินเทอร์เฟซแบบ Drag-and-drop (ลากและวาง) เพื่อสร้าง Backend โดยใช้บริการของ AWS เช่น **Cognito, Lambda, S3, AppSync และ DynamoDB**
* มีเทมเพลตและส่วนประกอบ UI สำเร็จรูปเพื่อเร่งความเร็วในการพัฒนา
* เชื่อมต่อการออกแบบจาก **Figma** ให้เป็นโค้ดได้โดยตรง (Design-to-code)

#### 3. Amplify Gen 2 – Code-First Backend (ใหม่)
* อนุญาตให้สร้าง Backend โดยใช้โค้ด **TypeScript** แทนการใช้ Studio UI
* สร้างขึ้นบน **AWS CDK** ทำให้ปรับแต่งโครงสร้างพื้นฐานได้ลึกขึ้น
* จัดการโครงสร้างพื้นฐาน, ข้อมูล และ API ผ่านโค้ดที่ควบคุมเวอร์ชันได้ (Version-controlled code)
* มีความปลอดภัยด้านประเภทข้อมูล (Type-safety) ที่แข็งแกร่งระหว่างโมเดล Backend และ Frontend

---

### เครื่องมือและ API (Amplify Tools)

* **Amplify CLI:** เครื่องมือบรรทัดคำสั่งสำหรับจัดการโปรเจกต์ (สร้างโปรเจกต์, เพิ่ม Auth/API, Deploy) รองรับการทำ **Local Mocking** เพื่อทดสอบ API และ Storage ในเครื่องคอมพิวเตอร์ของคุณเอง
* **Amplify API:** ใช้ **GraphQL Transformer v2** เพื่อสร้าง Resolver ที่ดีขึ้น และรองรับการอนุญาตสิทธิ์ระดับฟิลด์ (Field-level authorization) ผ่านกฎ `@auth`
* **Amplify Data (ใหม่):** ประสบการณ์การสร้างโมเดลข้อมูลแบบ Code-first พร้อมความปลอดภัยด้านประเภทข้อมูลที่สูงมาก ระบบจะสร้าง Backend (AppSync, DynamoDB ฯลฯ) ให้โดยอัตโนมัติตาม Schema ที่กำหนด

---

### ค่าบริการ (AWS Amplify Pricing)
* **ฟรี:** สำหรับไลบรารีส่วนประกอบ UI (UI component library) และการเชื่อมต่อ Figma (Design-to-code)
* **Pay-as-you-go:** การใช้งานบริการ Backend (Lambda, DynamoDB, S3 ฯลฯ) จะคิดค่าบริการตามการใช้งานจริง