# AWS Agent Squad Cheat Sheet

**AWS Agent Squad** เป็นโอเพนซอร์สเฟรมเวิร์กสำหรับจัดการและส่งต่อคำถามของผู้ใช้ (Orchestration & Routing) ไปยัง "เอเจนท์ AI" เฉพาะทางหลายตัว
* ใช้การจำแนกเจตนา (Intent Classification) ด้วย LLM เพื่อมอบหมายงานให้กับเอเจนท์ที่เหมาะสมที่สุดโดยอัตโนมัติ เช่น โมเดล Amazon Bedrock, Lex bots หรือ AWS Lambda โดยยังคงรักษาบริบทการสนทนา (Context) ให้ต่อเนื่องกันอย่างไร้รอยต่อ

---

### คุณสมบัติเด่น (Key Features)
* **Intelligent Intent Classification:** วิเคราะห์บริบทและเนื้อหาเพื่อส่งต่อคำถามไปยังเอเจนท์ที่เหมาะสมที่สุดแบบไดนามิก
* **Flexible Agent Responses:** รองรับการตอบกลับทั้งแบบ Streaming (มาทีละคำ) และ Non-streaming (มาทั้งบล็อก)
* **Context Management:** จัดเก็บและนำบริบทการสนทนามาใช้ร่วมกันระหว่างเอเจนท์หลายตัว เพื่อให้การคุยโต้ตอบหลายครั้งมีความต่อเนื่อง
* **Extensible Architecture:** การออกแบบที่เป็นโมดูลช่วยให้เพิ่มเอเจนท์ใหม่หรือปรับแต่งตัวที่มีอยู่ได้ง่าย
* **Universal Deployment:** รันได้ทุกที่ ตั้งแต่ AWS Lambda ไปจนถึงเครื่อง Local หรือแพลตฟอร์มคลาวด์อื่นๆ
* **Agent Overlap Analysis:** มีเครื่องมือในตัวเพื่อวิเคราะห์และลดความซ้ำซ้อนของหน้าที่ในแต่ละเอเจนท์
* **Pre-configured Agents:** มีเอเจนท์ที่ตั้งค่าไว้ล่วงหน้าพร้อมใช้งานผ่านโมเดล Amazon Bedrock

---

### กรณีการใช้งาน (Use Cases)
* **Chainlit Chat App:** แอปแชทแบบ Full-stack ที่รองรับการสตรีมแบบเรียลไทม์และการส่งต่อข้อมูลไปยังเอเจนท์เฉพาะทาง (เช่น เอเจนท์ด้านเทคนิค, ท่องเที่ยว, สุขภาพ)
* **E-commerce Simulator:** จำลองระบบสนับสนุนลูกค้าที่มีเอเจนท์แยกตามเรื่อง เช่น การสั่งซื้อ, ข้อมูลสินค้า และการส่งต่อให้พนักงานที่เป็นมนุษย์
* **FastAPI Streaming:** ตัวอย่าง REST API ที่ใช้ Server-Sent Events (SSE) สำหรับการสตรีมข้อความ
* **API Agent:** รูปแบบเอเจนท์ที่ดึงข้อมูลเรียลไทม์จาก REST หรือ GraphQL APIs
* **Ollama Agent/Classifier:** รวม LLM ที่รันในเครื่อง (Local) ผ่าน Ollama เพื่อความเป็นส่วนตัวหรือลดค่าใช้จ่ายคลาวด์

---

### การทำงานของ AWS Agent Squad
กระบวนการทำงานมีขั้นตอนดังนี้:
1. **Input Processing:** รับคำถามและ Metadata ของเซสชัน
2. **Context Retrieval:** ดึงประวัติการสนทนาจากแหล่งจัดเก็บข้อมูล
3. **Intent Classification:** ตัวจำแนก (Classifier) ประเมินคำเข้าและบริบทเพื่อระบุเจตนา
4. **Agent Selection:** ระบุเอเจนท์ที่เหมาะสมที่สุดเพื่อจัดการคำขอนั้น
5. **Request Execution:** ส่งคำถามไปยังเอเจนท์ที่เลือก
6. **Response Generation:** เอเจนท์ประมวลผลและสร้างคำตอบ (แบบสตรีมหรือข้อความ)
7. **Context Update:** บันทึกการโต้ตอบและอัปเดตประวัติการสนทนา
8. **Output Delivery:** ส่งคำตอบสุดท้ายให้ผู้ใช้

---

### เอเจนท์ที่รองรับ (Built-in Agents)
* **Bedrock LLM Agent:** เชื่อมต่อโดยตรงกับ Foundation Models ของ Amazon Bedrock
* **Amazon Bedrock Agent:** ตัวหุ้ม (Wrapper) สำหรับ Amazon Bedrock Agents แบบ Managed
* **Amazon Lex Bot:** อินเทอร์เฟซสำหรับเรียกใช้แชทบอท Amazon Lex
* **Lambda Agent:** เรียกใช้ฟังก์ชัน AWS Lambda เพื่อประมวลผลตรรกะทางธุรกิจที่แน่นอน
* **OpenAI Agent:** เชื่อมต่อกับโมเดลของ OpenAI (เช่น GPT-4)
* **Custom Agents:** คลาสที่ขยายได้สำหรับสร้างเอเจนท์ที่มีตรรกะเฉพาะตัว

---

### แนวคิดหลัก (Core Concepts)
* **Orchestrator:** ส่วนกลางที่ดูแลวงจรชีวิตของการโต้ตอบ ประสานงานระหว่าง Classifier, เอเจนท์ และที่จัดเก็บข้อมูล
* **Classifiers:** ตัววิเคราะห์คำถามเพื่อเลือกเอเจนท์ (รองรับ Bedrock, Anthropic, OpenAI)
* **Conversation Storage:** ชั้นเก็บข้อมูลประวัติการสนทนาเพื่อรักษาบริบท (รองรับ In-Memory, DynamoDB, Redis)
* **Retrievers:** ส่วนประกอบที่ดึงข้อมูลภายนอกมาเสริม (RAG) เพื่อให้ Classifier เลือกเส้นทางได้ดีขึ้น หรือให้ข้อมูลแก่เอเจนท์ก่อนเริ่มงาน

---

### ค่าบริการ (Pricing)
AWS Agent Squad เป็นซอฟต์แวร์โอเพนซอร์สที่ **ใช้งานฟรี** แต่จะมีค่าใช้จ่ายตามบริการของ AWS ที่คุณเรียกใช้:
* **Inference:** จ่ายตามจำนวน Token (Amazon Bedrock ฯลฯ)
* **Compute:** จ่ายตามระยะเวลาที่โฮสต์ระบบ (AWS Lambda, EC2/ECS)
* **Storage:** จ่ายตามความจุ/การจัดเก็บประวัติการสนทนา (Amazon DynamoDB)