# Beanstalk CLI

## แนะนำ Elastic Beanstalk CLI

Elastic Beanstalk CLI หรือเรียกสั้น ๆ ว่า **EB CLI** เป็นเครื่องมือ CLI ที่ช่วยให้การทำงานกับ Beanstalk ผ่าน command line ง่ายขึ้นมาก

EB CLI มีคำสั่งที่ใช้บ่อย เช่น

* `eb create`
* `eb status`
* `eb health`
* `eb events`
* `eb logs`
* `eb open`
* `eb deploy`
* `eb config`
* `eb terminate`

คำสั่งเหล่านี้ช่วยให้คุณสามารถทำสิ่งเดียวกันกับที่ทำผ่าน Beanstalk Console ได้ แต่ทำจาก command line ได้โดยตรง

การใช้ EB CLI มีประโยชน์มากหากต้องการ **ทำ automation สำหรับ development pipelines**
แต่สำหรับ **Developer Exam ไม่จำเป็นต้องรู้ลึก** เกี่ยวกับคำสั่งเหล่านี้ → ส่วนใหญ่จะเกี่ยวข้องกับ **DevOps Exam** มากกว่า

ถึงแม้ในคอร์สนี้จะไม่ได้มีการทำ hands-on กับ EB CLI แต่สิ่งสำคัญคือ **คุณควรรู้ว่ามันมีอยู่ และช่วยเพิ่มประสิทธิภาพในการทำงานกับ Beanstalk ได้**

## การ Deploy แอปพลิเคชันด้วย Elastic Beanstalk CLI

การ Deploy แอปผ่าน Beanstalk ด้วย EB CLI มีขั้นตอนดังนี้:

1. **อธิบาย dependencies ของแอป**

   * เช่น ใช้ `requirements.txt` สำหรับ Python
   * หรือ `package.json` สำหรับ Node.js

2. **แพ็กโค้ดทั้งหมดลงในไฟล์ zip**

   * รวมทั้งไฟล์ dependencies (requirements.txt / package.json)
   * จากนั้นอัปโหลดไฟล์ zip เข้า Beanstalk → สิ่งนี้จะสร้าง **application version** ใหม่

3. **Deploy application version**

   * ทำได้ทั้งจาก Beanstalk Console หรือ EB CLI
   * EB CLI จะช่วย **อัตโนมัติ** ทั้งการแพ็กโค้ด, อัปโหลด, และ deploy

4. **การจัดเก็บไฟล์**

   * ไฟล์ zip จะถูกเก็บใน **Amazon S3**
   * Beanstalk จะอ้างอิงไฟล์ bundle นี้สำหรับการ deploy

## กระบวนการเบื้องหลังการ Deploy ของ Elastic Beanstalk

เมื่อเริ่มการ Deploy → Beanstalk จะทำงานดังนี้:

1. นำไฟล์ zip ที่อัปโหลดไว้ไปกระจายลงบนทุก EC2 instance
2. แต่ละ instance จะติดตั้ง dependencies ที่ระบุไว้ (เช่น ใน `requirements.txt` หรือ `package.json`)
3. แอปพลิเคชันจะเริ่มรัน

นี่คือภาพรวมเชิงทฤษฎีของ backend process ที่ Beanstalk ทำงานระหว่างการ Deploy

หากอยากลองใช้งานจริง สามารถไปที่ **เอกสารทางการของ AWS** เพื่อติดตั้ง EB CLI และทดลองได้ แต่สำหรับคอร์สและการสอบนี้ **ถือว่าเกินขอบเขต**

สิ่งสำคัญที่สุดคือ **รู้ว่า EB CLI มีอยู่ และเข้าใจว่ามันถูกสร้างมาเพื่อช่วยให้การ Deploy ทำได้ง่ายขึ้นและเร็วขึ้น**

## Key Takeaways

* **EB CLI** คือเครื่องมือที่ช่วยให้จัดการ Elastic Beanstalk ได้ง่ายขึ้นจาก command line
* คำสั่งที่ใช้บ่อย เช่น `eb create`, `eb status`, `eb health`, `eb deploy` ฯลฯ
* การ Deploy ต้องแพ็กโค้ดและ dependencies เป็นไฟล์ zip (เช่น `requirements.txt`, `package.json`)
* EB CLI จะช่วยอัตโนมัติในขั้นตอนแพ็กกิ้ง, อัปโหลด, และ deploy
* มีประโยชน์อย่างยิ่งใน **DevOps workflow** แม้ว่าใน Developer Exam จะไม่เน้นเรื่องนี้
