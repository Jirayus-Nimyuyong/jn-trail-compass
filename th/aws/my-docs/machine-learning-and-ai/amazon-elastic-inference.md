# Amazon Elastic Inference Cheat Sheet

**Amazon Elastic Inference** ช่วยให้คุณสามารถเชื่อมต่อระบบเร่งความเร็วการประมวลผล (Inference Acceleration) ด้วย GPU ราคาประหยัดเข้ากับอินสแตนซ์ **EC2**, อินสแตนซ์ **SageMaker** หรือ **ECS Tasks** ได้
* ช่วยลดต้นทุนการประมวลผล Machine Learning (Inference) ได้สูงสุดถึง 75%

### กรณีการใช้งานทั่วไป (Common Use Cases)
* **Computer vision:** การประมวลผลภาพและวิดีโอ
* **Natural language processing:** การประมวลผลภาษาธรรมชาติ
* **Speech recognition:** การจดจำเสียงพูด

---

### แนวคิดหลัก (Concepts)
* **Accelerator:** อุปกรณ์ฮาร์ดแวร์ที่ขับเคลื่อนด้วย GPU ที่ถูกจัดเตรียมไว้
* **เครือข่าย:** อุปกรณ์นี้ไม่ได้เป็นส่วนหนึ่งของฮาร์ดแวร์หลักที่อินสแตนซ์ของคุณโฮสต์อยู่
* **การเชื่อมต่อ:** ใช้บริการ **AWS PrivateLink endpoint** เพื่อเชื่อมต่อ Accelerator เข้ากับอินสแตนซ์ผ่านระบบเครือข่าย
* **ความง่าย:** ต้องการเพียง Endpoint service เดียวในแต่ละ Availability Zone เพื่อเชื่อมต่อ Elastic Inference accelerator เข้ากับอินสแตนซ์ต่างๆ

---

### คุณสมบัติเด่น (Features)
* **รองรับ Framework:** รองรับโมเดลจาก TensorFlow, Apache MXNet, PyTorch และ ONNX
* **ประสิทธิภาพ:** สามารถให้บริการประมวลผลได้ตั้งแต่ 1 ถึง 32 Trillion Floating-point Operations Per Second (TFLOPS) ต่อหนึ่ง Accelerator
* **การปรับขนาด (Auto-scaling):** Accelerator ที่เชื่อมต่อกับแต่ละอินสแตนซ์ใน Auto-scaling group จะปรับขนาดตามความต้องการในการประมวลผลของแอปพลิเคชันคุณโดยอัตโนมัติ

---

### ค่าบริการ (Pricing)
* คุณจะถูกเรียกเก็บเงินตามจำนวนชั่วโมงการใช้งาน Accelerator ที่คุณบริโภคจริง