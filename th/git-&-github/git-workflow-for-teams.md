# Git Workflow สำหรับทีม

## บทนำ

Git Workflow สำหรับทีมคือแนวทางที่ช่วยให้ทีมสามารถทำงานร่วมกันในโปรเจกต์ที่ใช้ Git โดยการตั้งกฎและขั้นตอนที่ชัดเจนสำหรับการทำงานร่วมกัน ซึ่งช่วยให้การจัดการกับการเปลี่ยนแปลง, การตรวจสอบ, และการรวมโค้ดเป็นไปอย่างราบรื่นและมีประสิทธิภาพ

ในบทนี้เราจะเรียนรู้เกี่ยวกับ Git Workflow ที่ใช้ในทีม รวมถึงการตั้งค่าการทำงานในแบบต่าง ๆ เช่น Git Flow, GitHub Flow, และ GitLab Flow

## 1. Git Flow

Git Flow เป็นหนึ่งใน Git workflow ที่ได้รับความนิยมในการจัดการ branches และการทำงานร่วมกันในทีม โดยจะมี branch หลัก ๆ 2 ประเภท คือ `master` และ `develop` และมีอีกหลาย branch สำหรับการจัดการกับฟีเจอร์, การ release, และ hotfix

### 1.1 โครงสร้างของ Git Flow

- **master**: branch หลักที่ใช้เก็บโค้ดที่พร้อมสำหรับการใช้งาน
- **develop**: branch ที่รวมการเปลี่ยนแปลงทั้งหมดก่อนที่จะ merge เข้าสู่ `master`
- **feature branches**: ใช้สำหรับพัฒนาฟีเจอร์ใหม่ ๆ โดยเฉพาะ (ชื่อ branch จะขึ้นต้นด้วย `feature/`)
- **release branches**: ใช้สำหรับเตรียมการ release โดยการรวมการเปลี่ยนแปลงทั้งหมดที่พร้อม
- **hotfix branches**: ใช้สำหรับแก้ไขข้อผิดพลาดที่ต้องการแก้ไขด่วน (ชื่อ branch จะขึ้นต้นด้วย `hotfix/`)

### 1.2 ขั้นตอนใน Git Flow

1. สร้าง branch `develop` จาก `master`
2. สำหรับฟีเจอร์ใหม่ ๆ ให้สร้าง branch ใหม่จาก `develop` และตั้งชื่อเป็น `feature/feature-name`
3. เมื่อฟีเจอร์เสร็จสมบูรณ์ ให้ merge กลับเข้าไปใน `develop`
4. เมื่อถึงเวลาที่จะ release ให้สร้าง branch ใหม่จาก `develop` และตั้งชื่อเป็น `release/release-name`
5. เมื่อ release เสร็จสิ้น ให้ merge กลับเข้า `master` และ `develop`
6. หากพบข้อผิดพลาดในการ release ให้สร้าง `hotfix/hotfix-name` และแก้ไขข้อผิดพลาดใน branch นั้น ๆ

### 1.3 ตัวอย่างคำสั่งใน Git Flow

```bash
# สร้าง feature branch
git checkout -b feature/my-feature develop

# ทำการแก้ไขและ commit
git commit -am "Add new feature"

# Merge กลับเข้ามาใน develop
git checkout develop
git merge feature/my-feature

# Push การเปลี่ยนแปลง
git push origin develop
```

## 2. GitHub Flow

GitHub Flow เป็น workflow ที่ใช้ในการทำงานกับ GitHub ซึ่งเน้นการทำงานบน `master` branch โดยตรง โดยใช้ Pull Requests (PRs) สำหรับการรวมการเปลี่ยนแปลงจาก branch อื่น ๆ

### 2.1 โครงสร้างของ GitHub Flow

- **master**: branch หลักที่ใช้เก็บโค้ดที่พร้อมสำหรับการใช้งาน
- **feature branches**: สร้าง branch ใหม่จาก `master` สำหรับทำงานฟีเจอร์ใหม่

### 2.2 ขั้นตอนใน GitHub Flow

1. สร้าง branch ใหม่จาก `master` สำหรับฟีเจอร์ใหม่
2. ทำการพัฒนาฟีเจอร์ใน branch นั้น
3. เมื่อฟีเจอร์เสร็จสมบูรณ์ ให้ push ไปยัง GitHub และสร้าง Pull Request (PR)
4. ทีมงานจะทำการตรวจสอบและ merge PR เข้าไปใน `master`
5. ตรวจสอบการทำงานใน `master` หลังจาก merge และทำการ deploy

### 2.3 ตัวอย่างคำสั่งใน GitHub Flow

```bash
# สร้าง feature branch จาก master
git checkout -b feature/my-feature master

# ทำการแก้ไขและ commit
git commit -am "Add new feature"

# Push ไปยัง GitHub
git push origin feature/my-feature

# สร้าง Pull Request บน GitHub
```

## 3. GitLab Flow

GitLab Flow เป็น workflow ที่รวม Git Flow และ GitHub Flow เข้าด้วยกัน โดยรองรับการทำงานทั้งในโหมด CI/CD และการทำงานร่วมกันในทีมที่มีหลายคน

### 3.1 โครงสร้างของ GitLab Flow

- **master**: branch หลักที่ใช้เก็บโค้ดที่พร้อมสำหรับการใช้งาน
- **feature branches**: สร้าง branch สำหรับทำงานฟีเจอร์ใหม่
- **release branches**: ใช้สำหรับเตรียมการ release
- **production branches**: ใช้สำหรับโค้ดที่พร้อมสำหรับการ deploy ไปยัง production

### 3.2 ขั้นตอนใน GitLab Flow

1. สร้าง branch ใหม่จาก `master` สำหรับฟีเจอร์ใหม่
2. ทำการพัฒนาฟีเจอร์ใน branch นั้น
3. เมื่อฟีเจอร์เสร็จสมบูรณ์ ให้ push ไปยัง GitLab และสร้าง Merge Request (MR)
4. ทีมงานจะทำการตรวจสอบและ merge MR เข้าไปใน `master`
5. เมื่อถึงเวลาที่จะ release ให้สร้าง release branch และ deploy ไปยัง production

### 3.3 ตัวอย่างคำสั่งใน GitLab Flow

```bash
# สร้าง feature branch จาก master
git checkout -b feature/my-feature master

# ทำการแก้ไขและ commit
git commit -am "Add new feature"

# Push ไปยัง GitLab
git push origin feature/my-feature

# สร้าง Merge Request บน GitLab
```

## 4. การทำงานร่วมกันในทีม

ในการทำงานร่วมกันในทีม, การเลือก Git workflow ที่เหมาะสมกับทีมเป็นสิ่งสำคัญ นอกจากนี้ การตั้งค่า Git hooks, การใช้ Pull Requests/ Merge Requests เพื่อรีวิวโค้ด, และการทำ Continuous Integration (CI) / Continuous Deployment (CD) ยังเป็นส่วนสำคัญที่ช่วยให้การทำงานร่วมกันในทีมมีประสิทธิภาพและไม่มีข้อผิดพลาด

## สรุป

Git Workflow สำหรับทีมช่วยให้การทำงานร่วมกันในทีมมีระเบียบและชัดเจน โดยใช้การตั้ง branch ที่เหมาะสม เช่น `feature`, `develop`, `master`, และ `release` ซึ่งช่วยให้สามารถพัฒนา, ทดสอบ, และ deploy โค้ดได้อย่างราบรื่นและมีประสิทธิภาพ