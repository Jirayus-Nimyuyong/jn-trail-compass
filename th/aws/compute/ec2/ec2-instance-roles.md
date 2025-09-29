# EC2 Instance Roles

## แนะนำการใช้ IAM Roles กับ EC2 Instances

ในตัวอย่างนี้ เราจะฝึกใช้ **IAM role** สำหรับ **EC2 instance** ของเรา

ก่อนอื่น ผมจะเชื่อมต่อไปยัง EC2 instance ของผม คุณสามารถเชื่อมต่อได้ทั้งแบบ **SSH** หรือใช้ **EC2 Instance Connect** ซึ่งผมจะเลือกใช้ EC2 Instance Connect เพราะสามารถเข้าถึงได้จากเว็บเบราว์เซอร์โดยตรงและง่ายกว่า

ตอนนี้เราได้เชื่อมต่อกับ instance ผ่าน EC2 Instance Connect แล้ว จะเห็นว่าเราล็อกอินในฐานะผู้ใช้ **ec2-user** พร้อมกับ Private IP ที่ถูกกำหนดมาให้ ไม่ว่าคุณจะใช้ EC2 Instance Connect, SSH จาก terminal หรือ PuTTY คุณก็จะเข้าสู่จุดนี้เหมือนกัน

ณ จุดนี้คุณสามารถรันคำสั่ง Linux ได้ เช่น ใช้ `ping google.com` เพื่อทดสอบ หากต้องการหยุดการทำงานของ ping ก็กด **Control + C** ได้ คุณสามารถสั่ง Linux commands อื่น ๆ ได้ตามต้องการ เพราะนี่คือ **Linux terminal บน Cloud** ที่คุณเข้าถึงได้

## การใช้ AWS CLI

ต่อไปเราจะลองรันคำสั่งเกี่ยวกับ **AWS IAM**

Amazon Linux AMI ที่เราใช้อยู่ **มาพร้อม AWS CLI ที่ติดตั้งไว้แล้ว** คุณสามารถตรวจสอบและเริ่มใช้ได้ทันที

เช่น ถ้าเรารันคำสั่ง

```cli
aws iam list-users
```

ระบบจะตอบกลับมาพร้อม error ว่า **ไม่พบ credentials** และแนะนำให้เราตั้งค่า credentials ด้วยคำสั่ง `aws configure`

## ทำไมไม่ควรใส่ Access Key ตรง ๆ

แม้ว่าเราจะสามารถใช้ `aws configure` เพื่อใส่ **Access Key ID**, **Secret Access Key** และ **region** ได้ แต่ **นี่ถือเป็นแนวทางที่ไม่ปลอดภัยอย่างมาก**

เพราะหากคุณใส่ credentials ส่วนตัวลงไปใน EC2 instance แล้วมีใครก็ตามที่เข้าถึง instance ได้ เขาจะสามารถขโมย credentials ไปใช้ได้ ซึ่งเป็นความเสี่ยงร้ายแรงด้านความปลอดภัย

**สรุป: อย่าใส่ IAM Access Key และ Secret Access Key ตรง ๆ บน EC2 instance เด็ดขาด**

## ใช้ IAM Role แทน

สิ่งที่ควรทำคือใช้ **IAM Role**

สมมุติว่าใน AWS Management Console ภายใต้ IAM เราสร้าง IAM role ชื่อ **DemoRoleForEC2** และแนบ policy **IAMReadOnlyAccess** ไว้

จากนั้นเราจะทำการ **Attach IAM Role นี้เข้ากับ EC2 instance** เพื่อให้ instance ได้ credentials อย่างปลอดภัย

1. ไปที่ **Security tab** ของ EC2 instance จะเห็นว่ายังไม่มี IAM Role ถูก attach
2. กลับไปหน้า Instances เลือก instance ของเรา จากนั้นเลือก
   **Actions > Security > Modify IAM role**
3. เลือก role **DemoRoleForEC2** และกด **Save**

หลังจากนั้น ถ้ากลับไปดูที่ Security tab จะเห็นว่า **DemoRoleForEC2** ได้ถูก attach ให้ instance แล้ว

## ทดลองใช้งาน IAM Role

ตอนนี้ลองรันคำสั่งอีกครั้ง:

```cli
aws iam list-users
```

คราวนี้เราจะได้ list ของ IAM users ออกมา โดยไม่ต้องรัน `aws configure` เลย เพราะ instance ได้รับสิทธิ์จาก **IAM Role** ที่แนบไว้

เพื่อพิสูจน์ว่า role มีผลจริง ๆ หากคุณ **ลบ policy IAMReadOnlyAccess ออกจาก role** แล้วรันคำสั่งอีกครั้ง คุณจะได้รับ **Access Denied** แสดงว่า EC2 ใช้ IAM Role ในการควบคุมสิทธิ์จริง ๆ

ถ้าคุณแนบ policy กลับไปใหม่และรันอีกครั้ง อาจต้องรอให้สิทธิ์ **propagate** สักพัก แล้วคำสั่งก็จะทำงานได้อีกครั้ง

## สรุป

การใช้ **IAM Roles กับ EC2 Instances** เป็นสิ่งสำคัญต่อความปลอดภัย

* ห้ามใส่ **Access Key ID และ Secret Access Key** ตรง ๆ ลงไปบน EC2 instance
* ให้ใช้ **IAM Role** เพื่อมอบสิทธิ์อย่างปลอดภัยแทน
* การ Attach IAM Role ช่วยให้ instance สามารถรัน AWS CLI commands ได้ตามสิทธิ์ของ role นั้น
* การเปลี่ยนแปลงสิทธิ์ (policy) ของ role อาจใช้เวลาสักพักกว่าจะมีผล

👉 Key Takeaways

* **ห้ามใส่ Credentials ส่วนตัวลงใน EC2**
* **ใช้ IAM Role เพื่อจัดการสิทธิ์**
* **EC2 ใช้สิทธิ์ตาม IAM Role ที่แนบไว้**
* **การเปลี่ยนแปลง role อาจใช้เวลาในการ propagate**