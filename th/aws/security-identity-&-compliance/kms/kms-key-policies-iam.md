# KMS Key Policies & IAM Principals

ในการบรรยายนี้ เราจะพูดถึง **KMS Key Policies** พร้อมตัวอย่างหลายกรณี
**Key Policy** ใช้เพื่อกำหนดว่าใครสามารถเข้าถึง **KMS Key** ของคุณได้

* **Default KMS Key Policy** ที่สร้างผ่าน AWS Console จะอนุญาตให้ทุกคนภายในบัญชีของคุณเข้าถึง KMS Key ได้ ตราบใดที่มีสิทธิ์ **IAM** ที่เหมาะสม นี่คือกรณีพิเศษ

## การอนุญาตเฉพาะผู้ใช้ที่ระบุ

หากคุณต้องการอนุญาต **ผู้ใช้เฉพาะ** สามารถเป็น IAM User, IAM Role หรือ Federated User ได้

ตัวอย่าง:

* ระบุว่าอนุญาต **KMS actions** ใดบ้าง เช่น encrypt, decrypt เป็นต้น
* กำหนด principal ในนโยบายอย่างชัดเจน
* ตัวอย่างเช่น federated user ไม่จำเป็นต้องมี IAM Policy เพิ่มเติม เพราะได้รับอนุญาตโดยตรงใน KMS Key Policy

## ประเภทของ Principals ที่อนุญาตใน KMS Key Policies และ IAM

เราสามารถอนุญาต principal ประเภทใดได้บ้างใน KMS Key Policy หรือ IAM Policy

1. **Account และ Root User:**

   * ระบุ principal โดยใช้หมายเลขบัญชี AWS และ root user
   * เช่น ระบุ principal เป็น AWS พร้อมหมายเลขบัญชี + root → ทุก principal ภายในบัญชีได้รับอนุญาต
   * IAM Policies จะทำงานตามนั้น

2. **Specific IAM Role:**

   * อนุญาต IAM Role เฉพาะโดยระบุ ARN ของ Role ใน statement

3. **IAM Role Sessions:**

   * ใช้กับ assumed role หรือ identity ผ่าน federation เช่น Cognito Identity หรือ SAML

4. **IAM Users:**

   * ระบุ IAM User เฉพาะในบัญชีของคุณหรือบัญชีอื่น

5. **Federated User Sessions:**

   * เมื่อมี user federation ใน AWS สามารถระบุ federated user เฉพาะ

6. **AWS Services:**

   * ระบุ service principal เพื่ออนุญาต AWS service เฉพาะใช้ KMS Key

## การอนุญาตให้ทุก Principal

หากต้องการอนุญาต **ทุก principal** และ **ทุก action** สามารถใช้ wildcard `"*"` หรือ `"AWS:*"` เป็น principal

## สรุป

* **KMS Key Policies** กำหนดว่าใครสามารถเข้าถึง KMS Key ของคุณ
* **Default Key Policy** อนุญาตทุกคนในบัญชีที่มี IAM Permissions ที่เหมาะสมเข้าถึง key
* สามารถอนุญาต principal เฉพาะ เช่น IAM Users, Roles, Federated Users หรือ Services ใน KMS Key Policy
* Principal สามารถรวมถึง **root users**, **IAM roles**, **federated user sessions**, และ **AWS services**
