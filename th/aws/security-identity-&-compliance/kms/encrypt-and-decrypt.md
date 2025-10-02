# KMS Encryption Patterns และ Envelope Encryption

AWS Key Management Service (KMS) มี API สำหรับ **encrypt** และ **decrypt** เพื่อจัดการกับข้อมูลขนาดเล็ก (ไม่เกิน 4 KB)

1. เริ่มจาก secret เช่นรหัสผ่าน (password)
2. ส่ง secret ไปยัง KMS ผ่าน SDK หรือ CLI โดยระบุ **Customer Master Key (CMK)**
3. KMS ตรวจสอบสิทธิ์กับ IAM หากอนุญาต จะทำการเข้ารหัสและส่ง secret ที่เข้ารหัสแล้วกลับมา
4. การถอดรหัส ใช้ API **decrypt** โดย KMS จะระบุ CMK ที่ใช้เข้ารหัสและตรวจสอบสิทธิ์กับ IAM หากอนุญาต จะคืนค่าข้อมูลในรูป plain-text

**ข้อจำกัด:** secret ต้องไม่เกิน 4 KB

## Envelope Encryption และ GenerateDataKey API

เมื่อข้อมูลมีขนาดใหญ่กว่า 4 KB เช่น ไฟล์ขนาดหลาย MB เราจะใช้เทคนิค **Envelope Encryption**

1. เรียกใช้ **GenerateDataKey API** ระบุ CMK

2. KMS ตรวจสอบสิทธิ์กับ IAM

3. หากอนุญาต KMS จะสร้าง **Data Encryption Key (DEK)** และส่งกลับ **สองเวอร์ชัน**:

   * DEK แบบ plain-text
   * DEK แบบเข้ารหัส (encrypted)

4. ใช้ DEK แบบ plain-text **เข้ารหัสไฟล์ขนาดใหญ่** client-side

5. สร้าง **envelope** โดยรวมไฟล์ที่เข้ารหัสและ DEK ที่เข้ารหัสอยู่ด้วยกัน

6. ผลลัพธ์คือไฟล์เข้ารหัสพร้อม DEK ใน envelope

เหตุผลที่เรียกว่า envelope encryption เพราะมี **wrapper (envelope)** รอบไฟล์ที่เข้ารหัส ซึ่งเก็บ DEK ที่เข้ารหัส

## การถอดรหัส Envelope Encrypted Data

1. เริ่มจากไฟล์ envelope ที่มีไฟล์เข้ารหัสและ DEK ที่เข้ารหัส
2. เรียกใช้ **decrypt API** ของ KMS เฉพาะ DEK ที่เข้ารหัส (ไม่เกิน 4 KB)
3. KMS ตรวจสอบสิทธิ์กับ IAM และถอดรหัส DEK
4. ใช้ DEK แบบ plain-text client-side ถอดรหัสไฟล์ขนาดใหญ่
5. ได้ข้อมูล original plain-text

**สรุป:** Envelope Encryption ใช้ KMS สำหรับสร้างและจัดการกุญแจ แต่การเข้ารหัส/ถอดรหัสไฟล์ใหญ่เกิดขึ้นที่ client-side

## AWS Encryption SDK

การทำ envelope encryption ด้วยตนเองซับซ้อน AWS จึงมี **Encryption SDK**

* รองรับ CLI และ SDK สำหรับ Java, Python, C, JavaScript และอื่น ๆ
* Implement envelope encryption พร้อม **data key caching**
* ช่วยลดจำนวน API calls ไปยัง KMS → ลดค่าใช้จ่ายและเพิ่มประสิทธิภาพ
* trade-off: DEK เดียวใช้เข้ารหัสหลายไฟล์ อาจมีความเสี่ยงด้านความปลอดภัย
* ใช้ **LocalCryptoMaterialsCache** กำหนดค่า เช่น อายุสูงสุดของ DEK, ขนาดข้อมูลสูงสุด, จำนวนข้อความสูงสุด ก่อนหมุนเวียน DEK ใหม่

## สรุป KMS Symmetric APIs ที่สำคัญสำหรับการสอบ

| API                                 | การใช้งาน                                                                                       |
| ----------------------------------- | -------------------------------------------------------------------------------------------- |
| **Encrypt**                         | เข้ารหัสข้อมูลสูงสุด 4 KB                                                                            |
| **GenerateDataKey**                 | สร้าง DEK แบบ symmetric, คืนทั้ง plain-text และ encrypted DEK, ใช้สำหรับ envelope encryption          |
| **GenerateDataKeyWithoutPlaintext** | สร้าง DEK แบบเข้ารหัส ไม่คืน plain-text ทันที ต้องถอดรหัสทีหลัง                              |
| **Decrypt**                         | ถอดรหัสข้อมูลสูงสุด 4 KB, ใช้ถอดรหัส DEK ใน envelope encryption                              |
| **GenerateRandom**                  | สร้าง byte string แบบสุ่ม                                                                    |

**ข้อสำคัญ:** สำหรับ envelope encryption ใช้ **GenerateDataKey** และถอดรหัส DEK ด้วย **decrypt API**

## Key Takeaways

* KMS encrypt/decrypt API รองรับข้อมูล ≤ 4 KB
* Envelope encryption สำหรับข้อมูล > 4 KB โดยใช้ DEK client-side
* Envelope encryption เก็บ DEK ที่เข้ารหัสร่วมกับไฟล์ที่เข้ารหัส
* AWS Encryption SDK ช่วยทำ envelope encryption ง่ายขึ้น พร้อม **data key caching** เพื่อลด API calls แต่ต้องแลกกับความเสี่ยงด้านความปลอดภัย