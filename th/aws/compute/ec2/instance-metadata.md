# AWS EC2 Instance Metadata

**EC2 Instance Metadata Service (IMDS)** เป็นฟีเจอร์ที่ทรงพลังมากของ EC2 แม้ว่าจะมีนักพัฒนาจำนวนไม่มากที่รู้จัก

* ช่วยให้ **EC2 instance รู้จักตัวเอง** โดยไม่ต้องใช้ IAM Role
* EC2 instance สามารถสื่อสารกับ **URL พิเศษ `169.254.169.254`** เพื่อดึงข้อมูล metadata ของตัวเอง

จาก metadata นี้ instance สามารถทราบข้อมูลต่าง ๆ เช่น

* ชื่อ instance
* Public IP และ Private IP
* IAM Role name ที่ผูกกับ instance
* สามารถดึง credential บางส่วนได้ แต่ **policy ของ IAM Role** ไม่สามารถเข้าถึงผ่าน metadata

**Metadata** คือข้อมูลเกี่ยวกับตัว instance เอง แตกต่างจาก **User Data** ซึ่งเป็นสคริปต์ที่ส่งให้ instance ตอนเริ่มต้น

* URL พิเศษนี้สามารถเข้าถึงได้ทั้ง metadata และ user data
* ในหัวข้อนี้เราจะเน้นเฉพาะ **metadata service**

## เวอร์ชันของ IMDS

1. **IMDSv1**

   * เป็นเวอร์ชันดั้งเดิม
   * เข้าถึง URL metadata โดยตรง ทำงานได้ทันที

2. **IMDSv2**

   * เปิดตัวในปี 2023 และ **เปิดใช้งานโดยค่าเริ่มต้น**
   * ปลอดภัยมากขึ้น แต่ต้องทำ **สองขั้นตอน** ในการเข้าถึง:

     1. ส่ง **PUT request** เพื่อขอ session token
     2. ใช้ token เป็น header ใน request ต่อไปเพื่อเข้าถึง metadata
   * เพิ่มความปลอดภัย แต่มีขั้นตอนซับซ้อนกว่า

AWS แนะนำ IMDSv2 เพื่อเพิ่มความปลอดภัย

* Hands-on ต่อไปจะสอนการใช้ IMDSv2 เพื่อให้เข้าใจวิธีใช้งานอย่างถูกต้องและปลอดภัย

## สรุป Key Takeaways

* **IMDS** ช่วยให้ EC2 instance รู้จักตัวเองโดยไม่ต้องใช้ IAM Role
* เข้าถึงผ่าน URL พิเศษ `169.254.169.254` เพื่อดึง metadata เช่น ชื่อ instance, IP, และ IAM Role name
* **IMDSv1** เข้าถึง URL โดยตรง
* **IMDSv2** ต้องขอ session token ผ่าน PUT request เพื่อความปลอดภัยสูงขึ้น
* การเข้าใจทั้งสองเวอร์ชันสำคัญสำหรับการใช้งาน metadata ของ EC2 อย่างปลอดภัยและมีประสิทธิภาพ
