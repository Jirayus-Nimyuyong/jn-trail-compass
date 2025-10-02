# CloudFormation - Capabilities

ในบทเรียนนี้ เราจะพูดถึง **CloudFormation capabilities** ซึ่งเป็นสิ่งที่จำเป็นต้อง **ยอมรับอย่างชัดเจน** เมื่อ CloudFormation template ของคุณจะสร้างหรืออัปเดต **IAM resources**

มี **capabilities หลักสองแบบ** ที่เกี่ยวข้องกับ IAM resources:

* `CAPABILITY_NAMED_IAM`
* `CAPABILITY_IAM`

คุณต้องระบุ capabilities เหล่านี้กับ CloudFormation **ทุกครั้งที่ template ของคุณสร้างหรืออัปเดต IAM resources** เช่น IAM users, roles, groups, policies เป็นต้น

* ใช้ `CAPABILITY_NAMED_IAM` เมื่อ IAM resources ที่คุณสร้าง **มีชื่อกำหนดเอง**
* ใช้ `CAPABILITY_IAM` สำหรับ IAM resources **ที่ไม่มีชื่อกำหนด**

การยอมรับนี้เป็นสิ่งจำเป็นเพราะการสร้าง IAM resources มี **ผลกระทบด้านความปลอดภัย**

## CAPABILITY_AUTO_EXPAND

* ใช้เมื่อ template ของคุณมี **macros หรือ nested stacks** (stack ซ้อนใน stack)
* ช่วยให้ CloudFormation เข้าใจว่า template อาจ **เปลี่ยนแปลงได้ก่อน deployment**

หากพบ **InsufficientCapabilitiesException** ขณะเปิดใช้งาน template → หมายความว่า template ต้องการ capabilities ที่คุณยังไม่ได้ยอมรับ

* วิธีแก้ไข: **อัปโหลดและเปิดใช้งาน template ใหม่พร้อมระบุ capabilities ที่ถูกต้อง**
* ทำได้ทั้งใน **API call** หรือ **ติ๊ก checkbox ใน AWS console**

## ตัวอย่าง: การสร้าง IAM Role แบบ Named Role

สมมติว่าเรามี template `3_capabilities.yaml` ที่สร้าง **IAM role ชื่อกำหนดเอง MyCustomRoleName** โดย role นี้ใช้ managed policy `AmazonEC2FullAccess`

* เนื่องจาก template สร้าง **named IAM role** → ต้องระบุ `CAPABILITY_NAMED_IAM` เมื่อสร้าง stack
* ใน AWS console หลังจากอัปโหลด template และตั้งชื่อ stack เช่น `DemoIAM` → จะเห็น **checkbox acknowledgment**
* Checkbox นี้ยืนยันว่าคุณเข้าใจว่า CloudFormation อาจสร้าง IAM resources **ชื่อกำหนดเอง**
* คุณต้องติ๊ก checkbox นี้ **เพื่อให้ stack creation ดำเนินต่อไป**
* หากไม่ติ๊ก → การ submit จะล้มเหลว

การยอมรับ capability นี้แสดงว่าคุณ **เข้าใจความเสี่ยงและผลกระทบ** ของการสร้าง IAM resources ผ่าน CloudFormation

## สรุป

* CloudFormation ต้องการ **explicit capabilities** ในการสร้างหรืออัปเดต IAM resources
* ใช้ `CAPABILITY_NAMED_IAM` สำหรับ IAM resources **ที่มีชื่อกำหนดเอง**
* ใช้ `CAPABILITY_IAM` สำหรับ IAM resources **ที่ไม่มีชื่อกำหนด**
* ใช้ `CAPABILITY_AUTO_EXPAND` สำหรับ template ที่มี **macros หรือ nested stacks**
* หากไม่ยอมรับ capabilities → จะเกิด **InsufficientCapabilitiesException**
* การยอมรับ capabilities เป็นมาตรการ **ด้านความปลอดภัย** เพื่อยืนยันว่าคุณรับทราบการสร้าง IAM resources

## Key Takeaways

* CloudFormation ต้องการ **explicit capabilities** เพื่อสร้างหรืออัปเดต IAM resources
* ใช้ `CAPABILITY_NAMED_IAM` สำหรับ resources ชื่อกำหนดเอง
* ใช้ `CAPABILITY_IAM` สำหรับ resources ไม่มีชื่อกำหนด
* `CAPABILITY_AUTO_EXPAND` สำหรับ templates ที่มี macros หรือ nested stacks
* ไม่ยอมรับ capabilities → เกิด InsufficientCapabilitiesException
* การยอมรับ capabilities → เป็นมาตรการความปลอดภัยเพื่อยืนยันการรับทราบ
