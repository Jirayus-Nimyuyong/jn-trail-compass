# AWS Application Discovery Service Cheat Sheet

**AWS Application Discovery Service** เป็นบริการที่เก็บรวบรวมข้อมูลการใช้งาน พฤติกรรม และการตั้งค่าจากเซิร์ฟเวอร์ในศูนย์ข้อมูล (On-premises) เพื่อช่วยคุณในการวางแผนย้ายระบบ (Migration) ไปยัง AWS
* ข้อมูลที่รวบรวมได้สามารถส่งออกไปยัง Amazon Athena และ Amazon QuickSight เพื่อทำการวิเคราะห์ได้
* ทำงานร่วมกับ **AWS Migration Hub** เพื่อติดตามสถานะการย้ายระบบของแต่ละแอปพลิเคชันจาก Home Region

---

## แนวคิดหลัก (Concepts)

### 1. Discovery Agent
* เป็น Agent ที่ติดตั้งบน Virtual Machines (VMs), EC2 instances และเซิร์ฟเวอร์ On-premises
* รองรับระบบปฏิบัติการ Windows และ Linux
* ก่อนการติดตั้ง Agent จะต้องลงทะเบียนกับ Migration Hub Home Region ก่อน
* **ข้อมูลที่รวบรวม:**
    * การตั้งค่าระบบและประสิทธิภาพ (System configuration & performance)
    * การเชื่อมต่อเครือข่าย (Network connections)
    * กระบวนการที่กำลังทำงานอยู่ (Running processes)
* โดยค่าเริ่มต้น Agent จะถูกตั้งค่าให้อัปเกรดอัตโนมัติเมื่อมีเวอร์ชันใหม่ออกมา
* สามารถสั่งเริ่มหรือหยุดการเก็บข้อมูลได้ผ่าน AWS CLI และ AWS Console

### 2. Agentless Collector
* ติดตั้ง Agentless Collector บน VMware vCenter โดยใช้ไฟล์ Open Virtualization Archive (OVA)
* **โมดูลการเก็บข้อมูลจะรวบรวมสิ่งต่อไปนี้:**
    * รายการทรัพยากร (Inventory)
    * ข้อมูลโปรไฟล์ของเซิร์ฟเวอร์ (Server profile information)
    * มาตรวัดการใช้งานเซิร์ฟเวอร์ (Server utilization metrics)
* **หน้าจอ Dashboard จะแสดง:**
    * สถานะของ Collector
    * ข้อมูลการจัดเก็บจาก VMware VMs

---

## ตารางเปรียบเทียบ: Agentless Collector vs Discovery Agent

| หัวข้อเปรียบเทียบ | Agentless Collector | Discovery Agent |
| :--- | :---: | :---: |
| **ประเภทเซิร์ฟเวอร์ที่รองรับ** | | |
| - VMware virtual machine | รองรับ | รองรับ |
| - Physical server | ไม่รองรับ | รองรับ |
| **การติดตั้ง (Deployment)** | | |
| - ติดตั้งรายเซิร์ฟเวอร์ | ไม่ใช่ | ใช่ |
| - ติดตั้งต่อหนึ่ง vCenter | ใช่ | ไม่ใช่ |
| **ข้อมูลที่รวบรวม** | | |
| - ข้อมูลการตั้งค่าแบบคงที่ (Static config) | ใช่ | ใช่ |
| - มาตรวัดการใช้งาน VM (Utilization) | ใช่ | ไม่ใช่ |
| - ข้อมูลประสิทธิภาพแบบ Time series | ไม่ใช่ | ใช่ (Export เท่านั้น) |
| - การเชื่อมต่อเครือข่าย (Inbound/Outbound) | ไม่ใช่ | ใช่ (Export เท่านั้น) |
| - กระบวนการที่กำลังทำงาน (Running processes) | ไม่ใช่ | ใช่ (Export เท่านั้น) |
| **OS ที่รองรับ** | ทุก OS บน VMware vCenter V5.5+ | ตามเงื่อนไขของ Discovery Agent |

---

## ข้อมูลเพิ่มเติม
* คุณสามารถ**นำเข้าข้อมูล (Import)** เกี่ยวกับเซิร์ฟเวอร์ On-premises เข้าสู่ Migration Hub ได้โดยตรงโดยไม่ต้องใช้ Agent โดยการกรอกข้อมูลลงในเทมเพลต (Import template) แล้วอัปโหลดขึ้น Migration Hub
* ในการ**ส่งออกข้อมูล (Export)** จากเซิร์ฟเวอร์และ VMs สามารถทำได้ผ่าน AWS Console หรือผ่าน API โดยใช้ AWS CLI

---

## การตรวจสอบ (Monitoring)
* ใช้ **AWS CloudTrail** เพื่อบันทึกเหตุการณ์ (Events) ที่เกิดขึ้นจาก AWS Application Discovery Service

---

## ค่าบริการ (Pricing)
* คุณจะถูกเรียกเก็บเงินตามทรัพยากร AWS ที่ถูกจัดเตรียมไว้ (Provisioned) เพื่อใช้ในการจัดเก็บข้อมูลจาก On-premises
