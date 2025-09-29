# EC2 Instances Purchasing Options

## Overview

จนถึงตอนนี้ เราได้ใช้ **On-Demand EC2 Instances** ซึ่งช่วยให้เราสามารถเรียกใช้งานได้ทันที เหมาะสำหรับ **งานระยะสั้น** ให้ราคาที่คาดการณ์ได้ และคิดค่าบริการแบบ **จ่ายตามการใช้งาน (pay per second)**

## การปรับต้นทุนด้วยตัวเลือกการซื้อที่ต่างกัน

หากคุณมีงานหลายปะเภท คุณสามารถเลือกใช้ **วิธีการซื้อที่เหมาะสม** เพื่อปรับลดค่าใช้จ่าย เช่น

* **Reserved Instances** (1 ปี หรือ 3 ปี) เหมาะกับงานระยะยาว เช่น Database ที่ต้องรันต่อเนื่อง
* **Convertible Reserved Instances** ให้ความยืดหยุ่น สามารถเปลี่ยนประเภท instance ได้
* **Savings Plans** (1 ปี หรือ 3 ปี) แบบใหม่กว่า ไม่ได้ผูกกับ instance type แต่ผูกกับการใช้จ่าย (\$/ชั่วโมง)
* **Spot Instances** ราคาถูกที่สุด เหมาะกับงานสั้น ๆ ที่หยุดได้ แต่ไม่เหมาะกับงานที่ critical
* **Dedicated Hosts และ Dedicated Instances** สำหรับความต้องการแยก hardware จริง ๆ
* **Capacity Reservations** จองความจุไว้ล่วงหน้าใน AZ ใด ๆ เพื่อให้แน่ใจว่ามี instance พร้อมใช้งาน

## On-Demand Instances

* จ่ายตามการใช้งานจริง
* Linux/Windows: คิดเงิน **เป็นวินาที** หลังจากนาทีแรก
* OS อื่น: คิดเงิน **รายชั่วโมง**
* ค่าใช้จ่ายสูงที่สุด แต่ไม่มี commitment
* เหมาะกับงานสั้น ๆ ที่ไม่ต่อเนื่อง และพฤติกรรมไม่สามารถคาดเดาได้

## Reserved Instances

* ส่วนลดสูงสุด **72%** เมื่อเทียบกับ On-Demand
* ระบุ attribute ของ instance เช่น **Instance Type, Region, Tenancy, OS**
* เลือก commit 1 ปี หรือ 3 ปี
* วิธีจ่ายเงิน: **All upfront, Partial upfront, No upfront** (จ่าย upfront มากจะได้ส่วนลดมากกว่า)
* Scope: **Regional** หรือ **AZ-specific**
* เหมาะกับงาน **Steady-state** เช่น Database
* สามารถ **ซื้อ-ขายใน Marketplace** ได้หากไม่ต้องการใช้

## Convertible Reserved Instances

* ยืดหยุ่นกว่าปกติ: เปลี่ยนได้ทั้ง **Instance Type, Family, OS, Scope, Tenancy**
* ส่วนลดสูงสุด **66%** (น้อยกว่า Standard RI เพราะมีความยืดหยุ่นมากกว่า)

## Savings Plans

* ส่วนลดใกล้เคียงกับ Reserved (สูงสุด \~70%)
* Commit **จำนวนเงิน/ชั่วโมง** (ไม่ผูกกับ instance type โดยตรง)
* ระยะเวลา 1 หรือ 3 ปี
* ยืดหยุ่น เช่น เปลี่ยน **instance size, OS, tenancy** ได้
* ตัวอย่าง: Lock ไว้กับ **M5 family ใน us-east-1** แต่เปลี่ยนได้จาก m5.xlarge → m5.2xlarge

## Spot Instances

* ส่วนลดสูงสุด **90%** จาก On-Demand
* ผู้ใช้กำหนดราคาสูงสุดที่ยอมจ่าย (Max Price)
* ถ้า Spot Price > Max Price → Instance จะถูก terminate ทันที
* เหมาะกับงานที่ **ทนต่อความล้มเหลวได้ (Fault-tolerant)** เช่น:

  * Batch Jobs
  * Data Analysis
  * Image Processing
  * Distributed workloads
* ไม่เหมาะกับงาน **Critical หรือ Database**

## Dedicated Hosts

* จอง **Physical Server จริง ๆ** สำหรับใช้งาน
* เหมาะกับ

  * Compliance (ข้อกำหนดด้านกฎหมาย/มาตรฐาน)
  * การใช้ License ที่ผูกกับ Hardware (socket, core, VM)
* คิดเงินแบบ **On-Demand (per-second)** หรือ commit 1–3 ปี
* **แพงที่สุด** เพราะคุณเช่าเครื่องทั้งเครื่อง

## Dedicated Instances

* Instance รันบน **Hardware ที่ dedicated ให้คุณเท่านั้น**
* อาจแชร์ Hardware ระหว่าง instances ใน **account เดียวกัน** ได้
* ไม่มีสิทธิ์ควบคุมการวาง instance เหมือน Dedicated Host
* แตกต่างจาก Dedicated Host ตรงที่ Dedicated Host ให้สิทธิ์ระดับ hardware จริง ๆ

## Capacity Reservations

* จองความจุไว้ใน **AZ ที่เลือก** ได้ตามต้องการ
* ไม่มี commitment → ยกเลิกเมื่อไหร่ก็ได้
* **ไม่มีส่วนลด** → คิดราคา On-Demand ไม่ว่าคุณจะใช้จริงหรือไม่
* เหมาะกับงานที่ **ต้องแน่ใจว่ามี Capacity** ใน AZ นั้น

## สรุปเปรียบเทียบ (Analogy)

* **On-demand** → เหมือนรีสอร์ทที่คุณมาเมื่อไรก็ได้ จ่ายเต็มราคา
* **Reserved** → จองล่วงหน้า 1–3 ปี ได้ส่วนลด
* **Savings Plan** → commit จำนวนเงิน/เวลา เปลี่ยน room type ได้
* **Spot Instances** → ส่วนลดห้องว่างนาทีสุดท้าย แต่ถูกเชิญออกได้ถ้ามีคนจ่ายแพงกว่า
* **Dedicated Host** → เช่าอาคารทั้งหลังของรีสอร์ท
* **Capacity Reservation** → จองห้องไว้ล่วงหน้า แม้จะไม่ใช้ก็ยังต้องจ่ายเต็มราคา

## ตัวอย่างราคา (m4.large, us-east-1)

* **On-demand**: \$0.10/ชั่วโมง
* **Spot**: ลดสูงสุด 61%
* **Reserved**: ขึ้นอยู่กับ term & payment
* **Savings Plan**: ส่วนลดคล้าย Reserved
* **Convertible RI**: ส่วนลดน้อยกว่า Standard RI
* **Dedicated Host**: On-Demand หรือ ลดสูงสุด 70% ถ้า Reserve
* **Capacity Reservation**: ราคา On-Demand

## Exam Tips

* ต้องเลือก **ตัวเลือกการซื้อที่เหมาะกับ workload**
* เข้าใจ use case ของแต่ละแบบ → จะเจอโจทย์ในข้อสอบ

## Key Takeaways

* **On-Demand**: ยืดหยุ่น, ไม่มี commitment, ราคาแพงสุด
* **Reserved**: ส่วนลดสูงสุด 72%, commit 1–3 ปี, เหมาะกับ steady-state workloads
* **Savings Plan**: ส่วนลดสูง, ยืดหยุ่นกว่า Reserved (ผูกกับเงิน ไม่ใช่ instance type)
* **Spot Instances**: ส่วนลดสูงสุด 90%, เหมาะกับงาน fault-tolerant
* **Dedicated Host/Instances**: แยก hardware สำหรับ compliance หรือ license
* **Capacity Reservations**: การันตี capacity, ไม่มีส่วนลด
