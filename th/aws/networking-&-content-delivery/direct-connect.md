# AWS Direct Connect

AWS Direct Connect คือบริการที่ช่วยให้สามารถเชื่อมต่อเครือข่ายขององค์กรเข้ากับ AWS ได้โดยตรงผ่านการเชื่อมต่อแบบ private ซึ่งมีความเสถียรและ latency ต่ำกว่าการเชื่อมต่อผ่านอินเทอร์เน็ตสาธารณะ

## Connections

* การเชื่อมต่อทางกายภาพระหว่างศูนย์ข้อมูลของคุณกับ AWS ผ่าน Direct Connect Location
* ความเร็วเริ่มตั้งแต่ 50 Mbps จนถึง 100 Gbps

### แนวทางการใช้งาน:

1. ตรวจสอบว่าศูนย์ข้อมูลของคุณใกล้กับ Direct Connect Location ใด
2. สร้าง Connection ผ่าน AWS Console
3. ติดต่อ AWS Partner หรือ Carrier เพื่อเดินสายเชื่อมต่อ

### แนวทางแก้ปัญหา:

* หากไม่มี Link Up: ตรวจสอบ Router config และ Physical port

## Virtual Interfaces (VIFs)

* เป็น Interface Logic สำหรับแยกประเภทการเชื่อมต่อ เช่น

  * **Private VIF**: สำหรับเชื่อมต่อกับ VPC โดยตรง
  * **Public VIF**: สำหรับเชื่อมต่อกับบริการสาธารณะของ AWS เช่น S3, DynamoDB
  * **Transit VIF**: สำหรับใช้กับ AWS Transit Gateway

### แนวทางการใช้งาน:

1. หลังจาก Connection พร้อม สร้าง VIF ใน Console
2. กำหนด VLAN และ BGP (Border Gateway Protocol)
3. เชื่อมต่อกับ Gateway ที่ต้องการ เช่น VGW หรือ TGW

## LAGs (Link Aggregation Groups)

* ใช้รวมหลาย Direct Connect Connections เข้าด้วยกันเพื่อเพิ่ม bandwidth และ redundancy
* รองรับสูงสุด 4 links ต่อ LAG (100 Gbps)

### แนวทางการใช้งาน:

* เหมาะสำหรับองค์กรที่ต้องการ High Availability หรือ Throughput สูงมาก

### แนวทางแก้ปัญหา:

* หากลิงก์ใดลิงก์หนึ่งล่ม LAG จะยังทำงานต่อด้วยลิงก์ที่เหลืออยู่

## Direct Connect Gateways (DX Gateway)

* ใช้เพื่อเชื่อมต่อหลาย VPC จาก Region ต่าง ๆ ผ่าน Private VIF เพียงชุดเดียว
* ช่วยให้ไม่ต้องสร้างหลาย connection สำหรับแต่ละ VPC/Region

### แนวทางการใช้งาน:

1. สร้าง DX Gateway
2. เชื่อม VIF กับ DX Gateway
3. เชื่อม DX Gateway กับ Virtual Private Gateway (VGW) หรือ Transit Gateway (TGW)

## Virtual Private Gateways (VGWs)

* เป็น Gateway ฝั่ง VPC ใช้สำหรับเชื่อมต่อกับ DX Gateway หรือ VPN
* รองรับ Routing แบบ Static และ Dynamic (ผ่าน BGP)

### แนวทางการใช้งาน:

* ใช้เมื่อคุณเชื่อมต่อ VPC เดียวกับ Direct Connect โดยไม่ต้องใช้ Transit Gateway

## Transit Gateways (TGWs)

* ใช้รวมและควบคุมการเชื่อมต่อหลาย VPC และ VPN เข้าเป็นศูนย์กลาง
* ใช้งานร่วมกับ Direct Connect ได้ผ่าน Transit VIF

### แนวทางการใช้งาน:

1. สร้าง Transit Gateway
2. เชื่อม TGW กับ Direct Connect Gateway
3. สร้าง Transit VIF เชื่อมกับ DX Gateway
