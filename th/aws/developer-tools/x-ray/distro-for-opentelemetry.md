# AWS Distro for OpenTelemetry

**AWS Distro for OpenTelemetry (ADOT)** เป็นการแจกจ่าย (distribution) ที่สร้างโดย AWS เพื่อรองรับ **โครงการ OpenTelemetry** โดยออกแบบให้ **ปลอดภัยและพร้อมใช้งานในระบบ production**

## OpenTelemetry คืออะไร?

* OpenTelemetry ให้ **ชุด API, ไลบรารี, agents, และ collector services เดียว** สำหรับเก็บ **distributed traces และ metrics** จากแอปพลิเคชันของคุณ
* ยังช่วยเก็บ **metadata** จากทรัพยากรและบริการ AWS ของคุณ
* คล้ายกับ **AWS X-Ray** แต่เป็น **open-source**
* มี agents ที่สามารถ **auto-instrumented** เพื่อเก็บ traces โดยไม่ต้องแก้ไขโค้ดแอปพลิเคชัน

  * ฟังก์ชันการทำงานคล้ายกับ X-Ray

## การเก็บข้อมูลและการรวมระบบ

* ด้วยความสามารถในการเก็บข้อมูลแบบ **scalable** ภายใน AWS account และแอปพลิเคชัน
* Traces และ Metrics สามารถส่งไปยัง **หลายบริการของ AWS** และ **partner solutions**

  * Traces → X-Ray
  * Metrics → CloudWatch
  * Traces + Metrics → Prometheus

## สภาพแวดล้อมที่รองรับ

* แอปพลิเคชันที่รันบน AWS: **EC2, ECS, EKS, Fargate, Lambda**
* รองรับแอปพลิเคชันที่รัน **on-premises**
* ใช้มาตรฐาน OpenTelemetry ทำให้สามารถส่ง traces และ metrics ไปยัง:

  * บริการ AWS เช่น X-Ray
  * บริการ partner เช่น Datadog

## ความแตกต่างระหว่าง OpenTelemetry กับ X-Ray

* หากต้องการ **มาตรฐานแบบ open-source APIs**
* หากต้องการ **ส่ง trace data ไปหลายปลายทางพร้อมกัน**
* OpenTelemetry รองรับฟีเจอร์เหล่านี้ ในขณะที่ X-Ray จำกัดที่ AWS service

## สรุป

* AWS Distro for OpenTelemetry ใช้เก็บ **traces และ metrics** จากแต่ละ request ของแอป
* เก็บ **contextual data** ของทรัพยากร AWS
* สามารถส่งข้อมูลไปยัง:

  * X-Ray
  * CloudWatch
  * Amazon Managed Service for Prometheus
  * Partner monitoring solutions ที่รองรับ OpenTelemetry

## Key Takeaways

* **ADOT** เป็น distribution ที่ **ปลอดภัยและพร้อมใช้งานใน production**
* OpenTelemetry ให้ **ชุด API, ไลบรารี, agents และ collectors** สำหรับเก็บ traces และ metrics
* รองรับ **auto-instrumentation** เพื่อเก็บ traces โดยไม่ต้องแก้ไขโค้ด
* ข้อมูล telemetry ที่เก็บได้สามารถส่งไปยังหลายบริการพร้อมกัน เช่น **X-Ray, CloudWatch, Prometheus และ partner solutions**
