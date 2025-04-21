# การใช้ GitHub Actions

GitHub Actions เป็นฟีเจอร์ใน GitHub ที่ช่วยให้นักพัฒนาสามารถสร้าง workflow แบบอัตโนมัติสำหรับโครงการของพวกเขา คุณสามารถใช้ GitHub Actions เพื่อรันการทดสอบ อัปเดตโค้ด และปรับใช้แอปพลิเคชันได้อย่างง่ายดาย โดย workflow จะถูกกำหนดในรูปแบบไฟล์ YAML ซึ่งเก็บไว้ในโฟลเดอร์ `.github/workflows` ของ repository

---

## คุณสมบัติหลักของ GitHub Actions

1. **Workflow**
   - Workflow คือชุดกระบวนการอัตโนมัติที่กำหนดขึ้นในไฟล์ YAML
   - Workflow จะถูกกระตุ้นโดย event ต่างๆ เช่น การ push โค้ด การเปิด pull request หรือการตั้งค่า cron schedule

2. **Jobs**
   - Job คือชุดคำสั่งที่รันในเครื่องเสมือน (runner)
   - Workflow หนึ่งสามารถประกอบด้วยหลาย job ที่รันแบบขนานหรือรันแบบเรียงลำดับก็ได้

3. **Steps**
   - Step คือคำสั่งย่อยใน job หนึ่ง ๆ เช่น การติดตั้ง dependencies หรือการรันสคริปต์

4. **Actions**
   - Actions เป็นชุดคำสั่งสำเร็จรูปที่ใช้ซ้ำได้ เช่น การตั้งค่า Node.js หรือการปรับใช้ Docker container
   - คุณสามารถใช้ Actions จาก GitHub Marketplace หรือสร้าง Actions ของคุณเองได้

5. **Runners**
   - Runner คือเครื่องเสมือนที่ใช้รัน jobs
   - GitHub ให้บริการ runner ฟรีสำหรับระบบปฏิบัติการ Ubuntu, Windows และ macOS หรือคุณสามารถตั้งค่า self-hosted runner ได้

---

## เริ่มต้นใช้งาน GitHub Actions

### 1. **สร้าง Workflow**
   1. สร้างโฟลเดอร์ `.github/workflows` ใน repository ของคุณ
   2. สร้างไฟล์ YAML เช่น `ci.yml` และกำหนด workflow:
      ```yaml
      name: CI Workflow

      on:
        push:
          branches:
            - main

      jobs:
        build:
          runs-on: ubuntu-latest

          steps:
            - name: Checkout code
              uses: actions/checkout@v3

            - name: Setup Node.js
              uses: actions/setup-node@v3
              with:
                node-version: 16

            - name: Install dependencies
              run: npm install

            - name: Run tests
              run: npm test
      ```

### 2. **กระตุ้น Workflow**
   - Workflow จะเริ่มทำงานโดยอัตโนมัติเมื่อ event ที่กำหนดเกิดขึ้น เช่น การ push ไปยัง branch `main`

### 3. **ตรวจสอบผลลัพธ์**
   - ไปที่แท็บ **Actions** ใน repository เพื่อดูผลลัพธ์ของ workflow

---

## การใช้ Actions จาก Marketplace

GitHub Marketplace มี Actions สำเร็จรูปมากมายที่ช่วยลดเวลาและความยุ่งยากในการเขียน workflow เช่น:

- **actions/checkout**: ใช้สำหรับดึงโค้ดจาก repository
- **actions/setup-node**: ตั้งค่า Node.js environment
- **aws-actions/configure-aws-credentials**: ตั้งค่า credentials สำหรับ AWS
- **docker/build-push-action**: สร้างและ push Docker image

### ตัวอย่างการใช้งาน:
```yaml
name: Deploy to AWS

on:
  push:
    branches:
      - main

jobs:
  deploy:
    runs-on: ubuntu-latest

    steps:
      - name: Checkout code
        uses: actions/checkout@v3

      - name: Configure AWS credentials
        uses: aws-actions/configure-aws-credentials@v2
        with:
          aws-access-key-id: ${{ secrets.AWS_ACCESS_KEY_ID }}
          aws-secret-access-key: ${{ secrets.AWS_SECRET_ACCESS_KEY }}
          aws-region: us-east-1

      - name: Deploy application
        run: aws s3 sync ./build s3://my-bucket-name
```

---

## เคล็ดลับและแนวทางปฏิบัติที่ดีที่สุด

1. **จัดการ Secrets อย่างปลอดภัย**
   - ใช้ GitHub Secrets สำหรับเก็บข้อมูลสำคัญ เช่น API keys หรือ AWS credentials

2. **ใช้ Cache เพื่อลดเวลาในการรัน**
   - เพิ่ม Cache ใน workflow เพื่อประหยัดเวลา:
     ```yaml
     - name: Cache Node.js modules
       uses: actions/cache@v3
       with:
         path: node_modules
         key: ${{ runner.os }}-node-${{ hashFiles('**/package-lock.json') }}
         restore-keys: |
           ${{ runner.os }}-node-
     ```

3. **ทดสอบ Workflow ใน branch แยก**
   - ทดสอบ workflow ใหม่ใน branch ที่แยกออกมาก่อน merge เข้าสู่ branch หลัก

4. **แบ่ง Workflow เป็นหลาย Jobs**
   - แยกขั้นตอนต่างๆ ออกเป็น jobs หลาย jobs เพื่อปรับปรุงประสิทธิภาพและการตรวจสอบ

5. **ใช้ Workflow Templates**
   - สร้าง template สำหรับ workflow ที่ใช้บ่อยเพื่อลดการทำงานซ้ำ

---

GitHub Actions เป็นเครื่องมือที่ทรงพลังสำหรับการสร้าง workflow อัตโนมัติที่สามารถปรับแต่งได้อย่างอิสระ เมื่อคุณเข้าใจพื้นฐานและเริ่มใช้งาน คุณจะสามารถเพิ่มประสิทธิภาพในกระบวนการพัฒนาและการปรับใช้งานได้อย่างมาก

