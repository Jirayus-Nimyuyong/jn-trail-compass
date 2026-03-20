# Amazon SageMaker Clarify Cheat Sheet

**Amazon SageMaker Clarify** เป็นฟีเจอร์ของ **SageMaker AI** ที่ใช้สำหรับการตรวจจับความลำเอียง (Bias) และการอธิบายผลการทำนายของโมเดล (Explainability)
* รองรับการวิเคราะห์ความลำเอียงทั้งแบบ **ก่อนการฝึก (Pre-training)** และ **หลังการฝึก (Post-training)**
* ให้ข้อมูล **Feature Attribution** เพื่ออธิบายว่าปัจจัยนำเข้าแต่ละอย่างมีผลต่อการทำนายอย่างไร
* สามารถเฝ้าติดตามโมเดลที่ติดตั้งใช้งานแล้วเพื่อดูการเปลี่ยนแปลงของความลำเอียง (**Bias Drift**) และการเปลี่ยนแปลงความสำคัญของปัจจัย (**Feature Attribution Drift**) เมื่อเวลาผ่านไป

### ขีดความสามารถหลัก (Key Capabilities)

* **การตรวจจับความลำเอียง (Bias Detection):**
    * **Pre-training bias:** วิเคราะห์ชุดข้อมูลก่อนเริ่มการฝึกโมเดล
    * **Post-training bias:** ประเมินผลการทำนายของโมเดลเพื่อดูความยุติธรรมในแต่ละกลุ่ม (Facets)
    * รองรับงานประเภท **Binary, Multiclass** และ **Regression**
* **การตีความพฤติกรรมของโมเดล (Interpreting Model Behavior):**
    * ให้ค่า Feature Attributions ผ่านวิธี **SHAP** (SHapley Additive exPlanations), **Partial Dependence Plots (PDP)** และอื่นๆ
    * อธิบายทั้งการทำนายรายบุคคล (Local) และความสำคัญของปัจจัยในภาพรวม (Global)
    * ใช้งานได้กับทั้งข้อมูลแบบ **ตาราง (Tabular)** และ **ข้อความ (Text)**
* **การเฝ้าติดตาม (Monitoring):**
    * ตรวจจับความลำเอียงที่เปลี่ยนไป (Bias Drift) แบบเรียลไทม์
    * เชื่อมต่อกับ **SageMaker Model Monitor** เพื่อการประเมินผลอย่างต่อเนื่อง

---

### การเชื่อมต่อกับบริการอื่น (Integrations)
* **SageMaker Autopilot:** อธิบายโมเดล AutoML ด้วยหลักการของ Clarify
* **SageMaker Data Wrangler:** ช่วยแก้ไขความลำเอียงที่ตรวจพบผ่านเทคนิคการปรับสมดุลข้อมูล (เช่น Undersampling, Oversampling หรือ SMOTE)

---

### ส่วนประกอบหลักและการตั้งค่า (Core Components)

* **Configuration Objects:**
    * **DataConfig:** ระบุชุดข้อมูลต้นทางและเส้นทางสำหรับเก็บผลลัพธ์
    * **ModelConfig:** ระบุ Container หรือ Endpoint ของโมเดลที่จะถูกประเมิน
    * **BiasConfig:** ข้อมูลกลุ่ม (Facets) และป้ายกำกับ (Labels) สำหรับการวิเคราะห์ความลำเอียง
    * **SHAPConfig:** พารามิเตอร์สำหรับการอธิบายผลด้วยวิธี SHAP
* **การตั้งค่า Job การประมวลผล:**
    * ใช้ `SageMakerClarifyProcessor` ใน SageMaker SDK
    * กำหนด `ProcessingInput` และ `ProcessingOutput` แล้วรันผ่านเมธอด `run()`

---

### ภาพรวมตัวชี้วัดความลำเอียง (Bias Metrics Overview)

* **Pre-training Bias Metrics:**
    * **Class Imbalance:** การกระจายตัวของป้ายกำกับในแต่ละกลุ่ม
    * **Differential Validity:** ความแตกต่างของความแม่นยำระหว่างกลุ่ม
* **Post-training Bias Metrics:**
    * **Disparate Impact:** อัตราส่วนของผลลัพธ์ที่น่าพึงพอใจระหว่างกลุ่ม
    * **Equal Opportunity:** ความเท่าเทียมของอัตราผลบวกจริง (True Positive Rate)
    * **Predictive Parity:** ความเท่าเทียมของค่าพยากรณ์ที่เป็นบวก

---

### การอธิบายผลด้วย SHAP (SHAP Explainability)
* คำนวณ **Local Explanations** สำหรับการทำนายแต่ละครั้ง
* สรุปเป็น **Global Feature Importance** (ความสำคัญของปัจจัยในภาพรวม)
* **ผลลัพธ์ประกอบด้วย:** ค่า SHAP ต่อฟีเจอร์, Summary Plots และการจัดอันดับความสำคัญของฟีเจอร์

---

### แนวคิดเพิ่มเติม (Additional Concepts)
* รองรับการอธิบายผลในรูปแบบ **ข้อความ (Text Explainability)** สำหรับโมเดล NLP (เช่น ดูความสำคัญในระดับ Token)
* รันโมเดล **PDP, ICE และ Global Surrogate** เพื่อความเข้าใจพฤติกรรมโมเดลที่ลึกซึ้งขึ้น
* การเลือกชุดข้อมูลพื้นฐาน (**Baseline/Background Dataset**) มีผลอย่างมากต่อผลลัพธ์ของ SHAP
* ระบบจะสร้าง **รายงาน HTML**, ไฟล์ JSON และรูปภาพประกอบไว้ใน S3 โดยอัตโนมัติ
* เชื่อมต่อกับ **SageMaker Pipelines** เพื่อตรวจสอบความลำเอียงโดยอัตโนมัติก่อนการติดตั้งใช้งานโมเดล