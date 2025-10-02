# X-Ray: Instrumentation and Concepts

**Instrumentation** เป็นคำที่อาจใหม่สำหรับบางคน หมายถึงการ **วัดประสิทธิภาพของโปรแกรม, การวินิจฉัยข้อผิดพลาด และการเขียนข้อมูล Trace** โดยถือเป็นสาขาหนึ่งใน Software Engineering ที่เน้นการตรวจสอบและเก็บข้อมูลเชิงลึกของระบบ

เมื่อต้องการทำให้แอปพลิเคชันรองรับการใช้งานกับ **X-Ray** (instrumentation) เราจำเป็นต้องแก้ไขโค้ดเล็กน้อย และใช้ **X-Ray SDK**

ตัวอย่างเช่น ใน Node.js เราสามารถ require X-Ray SDK และเชื่อมเข้ากับ Express app ได้เลย เมื่อทำเช่นนี้ โค้ดจะถูก instrumented หมายถึงข้อมูล Trace จากแอปจะถูกส่งไปยังบริการ **X-Ray**

การใช้งาน SDK มักจะไม่ซับซ้อน บางครั้งแค่ตั้งค่า configuration หรือแก้ไขโค้ดเพียงเล็กน้อยเท่านั้น

ถ้าต้องการปรับแต่ง Trace เพิ่มเติม เช่น การใส่ Annotation หรือเปลี่ยนวิธีที่ X-Ray ส่งข้อมูลไปยัง Express service นักพัฒนาสามารถสร้าง **interceptors, filters, handlers และ middleware** เพื่อปรับแต่งพฤติกรรมของ X-Ray ได้ ซึ่งถือเป็น **ขั้นสูง**

## แนวคิดขั้นสูงของ X-Ray

* **Segment**: คือหน่วยการทำงานหนึ่งใน Request หรือ URL ซึ่งแต่ละแอปหรือบริการจะส่ง Segment ของตัวเองไปยัง X-Ray
* **Subsegment**: ใช้เพื่อเพิ่มรายละเอียดใน Segment (เช่น ระบุการเรียก Database, External API)
* **Trace**: คือการรวมกันของทุก Segment เพื่อให้เห็นภาพ End-to-End ของ API Call หรือ Request หนึ่งครั้ง

## การทำ Trace Sampling

**Sampling** ช่วยลดจำนวน Request ที่ถูกส่งไปยัง X-Ray เพื่อลดค่าใช้จ่าย

โดยค่าเริ่มต้น X-Ray SDK จะบันทึก:

* Request แรกในแต่ละวินาที (เรียกว่า **reservoir**)
* และ **5% ของ Request เพิ่มเติม** (เรียกว่า **rate**)

วิธีนี้ทำให้มั่นใจได้ว่าจะมีอย่างน้อย 1 Trace ต่อวินาทีถ้ามี Request เข้ามา และช่วยจำกัดปริมาณข้อมูลที่ถูกส่งออกไป

## Annotations และ Metadata

* **Annotations**: เป็นคู่ค่า key-value ที่สามารถใส่เข้าไปใน Trace ได้ และ **ถูกจัดทำดัชนี (indexed)** เพื่อใช้ค้นหาผ่าน filter ได้
* **Metadata**: เป็น key-value เช่นกัน แต่ **ไม่ได้ถูกจัดทำดัชนี** และไม่สามารถใช้ค้นหาได้

👉 ดังนั้น **Annotations** จึงสำคัญมากต่อการ Filter และวิเคราะห์ Trace ใน X-Ray

## Cross-Account Trace Sending

X-Ray Daemon Agent สามารถถูกตั้งค่าให้ส่ง Trace ข้าม AWS Account ได้ โดย:

* ต้องตั้งค่า **IAM Permission** ที่ถูกต้อง
* ให้ Agent สามารถ **assume role** ของบัญชีเป้าหมาย

การทำแบบนี้ช่วยให้สามารถทำ **Centralized Logging และ Application Tracing** ข้ามหลายบัญชีได้

## การกำหนด Custom Sampling Rules

สามารถกำหนดกฎ **Sampling** เองได้ โดยไม่ต้องแก้ไขโค้ด เช่น:

* เพิ่ม reservoir size และ rate สำหรับ **POST requests**
* หรือกำหนดให้ส่ง **ทุก Request ไปยัง X-Ray** (เหมาะกับ Debugging แต่ไม่เหมาะกับ Production เพราะมีค่าใช้จ่ายสูง)

ข้อดีคือ หากเปลี่ยน **Sampling Rules ผ่าน X-Ray Console** แอปพลิเคชันไม่ต้อง Restart หรือแก้โค้ดใหม่ เพราะ **Daemon จะอัปเดตเองอัตโนมัติ**

## สรุป

บทนี้ได้อธิบายถึงการ Instrument โค้ดด้วย **X-Ray SDK**, แนวคิดเรื่อง **Segment, Subsegment, Trace**, ความสำคัญของ **Annotations กับ Metadata**, การส่ง Trace ข้ามบัญชี และวิธีควบคุมปริมาณข้อมูลด้วย **Sampling Rules**

## Key Takeaways

* **Instrumentation** คือการวัด Performance, วินิจฉัย Error และเขียน Trace ด้วย X-Ray SDK
* **Segments/Subsegments** ให้รายละเอียดเชิงลึก ส่วน **Trace** รวมข้อมูลเพื่อให้เห็น End-to-End
* **Annotations** เป็น key-value ที่สามารถค้นหาได้ ส่วน **Metadata** ไม่สามารถค้นหาได้
* **Sampling Rules** ช่วยควบคุมปริมาณข้อมูลและค่าใช้จ่าย โดยไม่ต้องแก้ไขโค้ด
