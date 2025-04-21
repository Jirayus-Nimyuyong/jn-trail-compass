# การใช้ Git กับ CI/CD

## บทนำ

การใช้ Git ร่วมกับ CI/CD (Continuous Integration / Continuous Deployment) เป็นขั้นตอนที่สำคัญในการพัฒนาแอปพลิเคชันแบบอัตโนมัติ โดยการผสมผสาน Git กับ CI/CD ช่วยให้กระบวนการพัฒนาโค้ดรวดเร็วและมีประสิทธิภาพยิ่งขึ้น โดย CI/CD ช่วยให้โค้ดถูกทดสอบ, สร้าง, และนำไปใช้งานได้อัตโนมัติเมื่อมีการเปลี่ยนแปลงใน repository ของ Git

ในบทนี้ เราจะเรียนรู้การตั้งค่า Git ร่วมกับ CI/CD ในขั้นตอนต่าง ๆ

## 1. การตั้งค่า CI/CD Pipeline

CI/CD pipeline คือชุดของกระบวนการที่เกิดขึ้นเมื่อมีการเปลี่ยนแปลงใน repository ของ Git ซึ่งจะทำการทดสอบ, สร้าง, และ deploy โค้ดโดยอัตโนมัติ

### ขั้นตอนการสร้าง CI/CD Pipeline

1. **กำหนด Trigger**: การทำงานของ pipeline จะถูกกระตุ้นเมื่อมีการ push โค้ดใหม่เข้าไปใน repository หรือเมื่อมีการสร้าง pull request
2. **ติดตั้ง Dependencies**: ทดสอบและติดตั้ง dependencies ที่จำเป็นสำหรับโปรเจกต์ เช่น การติดตั้ง package ใน Node.js หรือ Python
3. **ทดสอบโค้ด (Testing)**: การรัน unit tests, integration tests หรือการตรวจสอบความถูกต้องของโค้ด
4. **การสร้างโปรเจกต์ (Build)**: การคอมไพล์โค้ดหรือสร้าง artifact ที่จะใช้งาน
5. **การ deploy**: นำโค้ดที่ผ่านการทดสอบและสร้างแล้วไป deploy ใน environment ที่กำหนด (เช่น production, staging)

## 2. การตั้งค่า CI/CD ด้วย GitHub Actions

GitHub Actions คือบริการ CI/CD ที่ให้บริการใน GitHub โดยตรง ซึ่งสามารถใช้สำหรับการสร้าง pipeline และอัตโนมัติการทดสอบ, สร้าง, และ deploy โค้ด

### ตัวอย่างการตั้งค่า GitHub Actions สำหรับ Node.js Project

1. **สร้างไฟล์ Workflow**

   สร้างไฟล์ `.github/workflows/ci.yml` ใน repository ของคุณเพื่อกำหนด workflow สำหรับการทดสอบโค้ดและสร้างโปรเจกต์

```yaml
name: Node.js CI

on:
  push:
    branches:
      - main
  pull_request:
    branches:
      - main

jobs:
  build:
    runs-on: ubuntu-latest

    steps:
    - name: Checkout code
      uses: actions/checkout@v2

    - name: Set up Node.js
      uses: actions/setup-node@v2
      with:
        node-version: '16'

    - name: Install dependencies
      run: npm install

    - name: Run tests
      run: npm test
```

ในตัวอย่างนี้ เมื่อมีการ push โค้ดหรือสร้าง pull request ไปที่ `main` branch GitHub Actions จะทำการตรวจสอบโค้ด, ติดตั้ง dependencies และรัน tests อัตโนมัติ

2. **ใช้ Secrets สำหรับการจัดการข้อมูลสำคัญ**

   หากคุณต้องการใช้ข้อมูลสำคัญเช่น API keys หรือ credentials ใน pipeline คุณสามารถตั้งค่า secrets ใน GitHub และใช้งานใน workflow ของคุณได้

   ตัวอย่างการใช้งาน secret ใน GitHub Actions:

```yaml
- name: Deploy to Production
  run: |
    echo "Deploying to production server"
  env:
    API_KEY: ${{ secrets.API_KEY }}
```

### 3. การตั้งค่า CI/CD ด้วย GitLab CI

GitLab CI เป็นอีกหนึ่งเครื่องมือที่สามารถใช้ตั้งค่า CI/CD pipeline สำหรับโครงการที่ใช้ GitLab

### ตัวอย่างการตั้งค่า GitLab CI สำหรับ Node.js Project

1. **สร้างไฟล์ `.gitlab-ci.yml`**

   ไฟล์ `.gitlab-ci.yml` จะถูกใช้สำหรับตั้งค่า pipeline ใน GitLab

```yaml
stages:
  - test
  - build
  - deploy

test:
  stage: test
  script:
    - npm install
    - npm test

build:
  stage: build
  script:
    - npm run build

deploy:
  stage: deploy
  script:
    - echo "Deploying to production server"
```

ในตัวอย่างนี้ GitLab CI จะรันสามขั้นตอน คือ `test`, `build`, และ `deploy` ตามลำดับ เมื่อโค้ดถูก push ไปที่ GitLab repository

## 3. การตั้งค่า Continuous Deployment (CD)

Continuous Deployment (CD) เป็นขั้นตอนที่ทำให้โค้ดที่ผ่านการทดสอบและสร้างแล้วถูกนำไป deploy อัตโนมัติใน environment ต่าง ๆ โดยไม่ต้องมีการอนุมัติจากผู้พัฒนา

### ตัวอย่างการตั้งค่า CD โดยใช้ GitHub Actions

หากคุณต้องการ deploy โปรเจกต์ไปยัง environment เช่น AWS, Heroku หรือ Kubernetes หลังจากโค้ดผ่านการทดสอบและสร้างแล้ว คุณสามารถเพิ่มขั้นตอนใน workflow ของ GitHub Actions ได้

```yaml
deploy:
  runs-on: ubuntu-latest
  needs: build

  steps:
  - name: Deploy to AWS
    run: |
      aws s3 sync ./build s3://your-bucket-name --delete
    env:
      AWS_ACCESS_KEY_ID: ${{ secrets.AWS_ACCESS_KEY_ID }}
      AWS_SECRET_ACCESS_KEY: ${{ secrets.AWS_SECRET_ACCESS_KEY }}
      AWS_DEFAULT_REGION: 'us-west-1'
```

ในตัวอย่างนี้, หลังจาก build เสร็จสิ้น โค้ดจะถูก deploy ไปยัง AWS S3 โดยใช้ AWS CLI

## 4. การทดสอบอัตโนมัติและการตรวจสอบคุณภาพ

### การทดสอบอัตโนมัติ

การทดสอบอัตโนมัติใน CI/CD ช่วยให้คุณมั่นใจได้ว่าโค้ดที่ถูกเปลี่ยนแปลงไม่ทำให้เกิดปัญหาหรือบั๊กในโปรเจกต์ โดยการตั้งค่าให้ CI/CD pipeline รัน unit tests, integration tests และ/หรือ end-to-end tests โดยอัตโนมัติ

ตัวอย่างการเพิ่มขั้นตอนการทดสอบใน GitHub Actions:

```yaml
- name: Run linting
  run: npm run lint

- name: Run tests
  run: npm test
```

### การตรวจสอบคุณภาพของโค้ด

คุณสามารถใช้เครื่องมือเช่น `eslint` หรือ `prettier` ในการตรวจสอบคุณภาพของโค้ดใน pipeline เช่น การตั้งค่าให้ตรวจสอบรูปแบบโค้ดหรือการใช้งานที่ผิดปกติในระหว่างขั้นตอน CI/CD

## สรุป

การใช้ Git กับ CI/CD เป็นเครื่องมือที่ช่วยเพิ่มความเร็วและประสิทธิภาพในการพัฒนาแอปพลิเคชัน ด้วยการตั้งค่า pipeline ที่มีการทดสอบ, สร้าง, และ deploy โค้ดอัตโนมัติ การใช้เครื่องมือเช่น GitHub Actions หรือ GitLab CI จะช่วยให้กระบวนการเหล่านี้เป็นไปอย่างราบรื่นและรวดเร็ว