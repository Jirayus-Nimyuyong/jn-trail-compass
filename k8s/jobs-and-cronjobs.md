# Kubernetes Jobs and CronJobs

## Introduction
ใน Kubernetes, **Job** และ **CronJob** เป็น Resource ที่ใช้สำหรับการจัดการการทำงานที่ต้องการให้มีการดำเนินการเฉพาะในช่วงเวลาหนึ่งหรือเมื่อมีการกระทำที่กำหนด ตัวอย่างเช่น การรันงานที่ใช้เวลาไม่นาน, การประมวลผลเป็นชุด ๆ (batch processing), หรือการทำงานที่ต้องทำซ้ำในช่วงเวลาที่กำหนด

- **Job** ใช้สำหรับการรันงานที่ต้องการทำครั้งเดียวหรือแบบจำกัดจำนวน
- **CronJob** ใช้สำหรับการรันงานในช่วงเวลาที่กำหนดตามรูปแบบของ cron expression (เช่น การรันงานทุก ๆ ชั่วโมง, ทุก ๆ วัน เป็นต้น)

ในบทนี้, เราจะเรียนรู้เกี่ยวกับ **Job** และ **CronJob**, การทำงานของมัน, และวิธีการติดตั้งและใช้งานใน Kubernetes Cluster

## Key Concepts

1. **Job**:
   - **Job** คือ Resource ที่ใช้ในการสร้างและรัน Pods ที่ทำงานครั้งเดียวเพื่อดำเนินการงานบางอย่างให้สำเร็จ
   - Job สามารถกำหนดจำนวนการพยายามที่จะทำงานใหม่หากเกิดความล้มเหลว (retries)
   - เมื่อทำงานเสร็จสิ้นหรือสำเร็จ, Job จะหยุดการทำงานโดยอัตโนมัติ

2. **CronJob**:
   - **CronJob** คือ Resource ที่ใช้ในการสร้างงานที่รันตามเวลาที่กำหนด ซึ่งเหมาะสำหรับงานที่ต้องการทำซ้ำในเวลาที่กำหนด เช่น การสำรองข้อมูลหรือการประมวลผลแบบ batch ที่ต้องทำตามช่วงเวลาที่กำหนด
   - CronJob จะใช้รูปแบบ cron expression เพื่อกำหนดเวลาที่งานจะถูกเรียกใช้งาน เช่น `0 12 * * *` สำหรับการรันงานทุกวันตอนเที่ยง

3. **Pods and Jobs**:
   - Job จะสร้าง Pods ที่จะทำงานจนกว่างานจะเสร็จสิ้นและหากมีข้อผิดพลาดหรือ Job ไม่สำเร็จ, จะสามารถกำหนดให้ Kubernetes ทำการ retry งานได้
   - Pods ที่สร้างโดย Job จะถูกจัดการเหมือนกับ Pods อื่น ๆ ใน Kubernetes แต่จะทำงานในลักษณะเฉพาะ (เช่น ทำงานแบบจำกัดเวลาและหากเสร็จสิ้นจะหยุด)

4. **Job Completion**:
   - เมื่อ Job ทำงานสำเร็จ, จะไม่มีการสร้าง Pods เพิ่มเติม
   - Job สามารถกำหนดจำนวนการสำเร็จขั้นต่ำที่ต้องการก่อนที่จะถือว่างานเสร็จสิ้น

## How Jobs Work

Job จะสร้าง Pods ที่ทำงานตามที่คุณกำหนดและสามารถทำการ retry ได้หากเกิดข้อผิดพลาด หากทำงานเสร็จแล้ว, Job จะหยุดการทำงาน

### Example of Job Resource

```yaml
apiVersion: batch/v1
kind: Job
metadata:
  name: my-job
spec:
  completions: 1
  parallelism: 1
  template:
    spec:
      containers:
      - name: my-container
        image: busybox
        command: ["sh", "-c", "echo Hello Kubernetes! && sleep 30"]
      restartPolicy: Never
```

ในตัวอย่างนี้:
- **completions** กำหนดจำนวนการสำเร็จของ Job (ในที่นี้คือ 1 ครั้ง)
- **parallelism** กำหนดจำนวน Pod ที่ทำงานพร้อมกัน (ในที่นี้คือ 1 Pod)
- **restartPolicy** กำหนดว่า Pod จะไม่ถูกรีสตาร์ทหากทำงานเสร็จ

### Key Features of Job

1. **Pod Completion**:
   - Job จะรัน Pod และรอให้ Pod นั้นทำงานเสร็จ (โดยปกติคือการรันคำสั่งที่กำหนด) และจะหยุดการทำงานเมื่อ Pod เสร็จสิ้น

2. **Retries**:
   - คุณสามารถกำหนดจำนวนครั้งที่จะให้ Kubernetes ทำการ retry หาก Pod ล้มเหลว (การกำหนดค่า `backoffLimit`)

3. **Parallelism**:
   - Job สามารถทำงานแบบขนานได้ ซึ่งช่วยให้คุณสามารถรันหลาย Pods พร้อมกันใน Job เดียว

4. **Pod Restart Policy**:
   - `restartPolicy` สามารถตั้งค่าเป็น `Never` หรือ `OnFailure` โดยจะขึ้นอยู่กับว่า Pods ควรถูกรีสตาร์ทเมื่อเกิดข้อผิดพลาดหรือไม่

## CronJob

CronJob คือ Resource ที่ช่วยให้คุณสามารถรัน Job ตามเวลาที่กำหนดไว้ในรูปแบบ cron expression โดยสามารถกำหนดเวลาได้ทุกวัน, ทุกสัปดาห์, หรือทุกเดือนตามที่คุณต้องการ

### Example of CronJob Resource

```yaml
apiVersion: batch/v1
kind: CronJob
metadata:
  name: my-cronjob
spec:
  schedule: "0 12 * * *"  # รันทุกวันตอนเที่ยง
  jobTemplate:
    spec:
      template:
        spec:
          containers:
          - name: my-container
            image: busybox
            command: ["sh", "-c", "echo Hello Kubernetes CronJob!"]
          restartPolicy: Never
```

ในตัวอย่างนี้:
- **schedule** กำหนด cron expression ที่จะทำให้ CronJob รันตามเวลาที่กำหนด (ในที่นี้คือทุกวันตอน 12:00)
- **jobTemplate** ใช้สำหรับการกำหนด Job ที่จะถูกสร้างขึ้นเมื่อ CronJob รัน

### Cron Expression Format

Cron expression ใช้รูปแบบที่มี 5 ช่องต่อไปนี้:
```
* * * * *
| | | | |
| | | | +--- วันของสัปดาห์ (0 - 6) (0 = Sunday)
| | | +----- เดือน (1 - 12)
| | +------- วันในเดือน (1 - 31)
| +--------- ชั่วโมง (0 - 23)
+----------- นาที (0 - 59)
```

ตัวอย่าง:
- `0 12 * * *` จะรันทุกวันตอนเที่ยง
- `0 0 * * 0` จะรันทุกวันอาทิตย์เวลาเที่ยงคืน
- `*/5 * * * *` จะรันทุก ๆ 5 นาที

## Key Features of CronJob

1. **Scheduled Jobs**:
   - CronJob ช่วยให้คุณสามารถรัน Jobs ตามเวลาที่กำหนดได้อัตโนมัติ เช่น ทุกวัน, ทุกสัปดาห์, หรือทุกเดือน

2. **Cron Expression**:
   - สามารถกำหนดเวลาที่จะรัน Jobs โดยใช้ cron expression ซึ่งช่วยให้คุณสามารถตั้งเวลาที่ยืดหยุ่นและตรงตามความต้องการ

3. **Job History Limits**:
   - คุณสามารถกำหนดจำนวนของ Job ที่จะเก็บประวัติไว้ (ผ่าน `successfulJobsHistoryLimit` และ `failedJobsHistoryLimit`)

4. **Concurrency Policy**:
   - CronJob รองรับการตั้งค่า concurrency policy ที่กำหนดว่าให้รัน Job ใหม่ได้ในขณะเดียวกันกับที่ Job ก่อนหน้าเพิ่งเสร็จสิ้นหรือไม่

## Best Practices for Jobs and CronJobs

1. **Monitor Jobs**:
   - ควรตรวจสอบสถานะของ Job และ CronJob เพื่อให้มั่นใจว่า Jobs ทำงานตามที่คาดหวัง

2. **Limit the Number of Concurrent Jobs**:
   - ใช้ **concurrencyPolicy** ใน CronJob เพื่อจำกัดจำนวนของ Jobs ที่จะถูกรันพร้อมกัน

3. **Retry and Backoff**:
   - กำหนดจำนวนการ retry ที่เหมาะสมใน Job เพื่อป้องกันไม่ให้เกิดความผิดพลาดซ้ำ ๆ

4. **Job History Cleanup**:
   - กำหนดการเก็บประวัติของ Job ที่สำเร็จหรือผิดพลาดให้อยู่ในจำนวนที่เหมาะสมเพื่อไม่ให้มีข้อมูลเก่ามากเกินไป

## Conclusion

**Job** และ **CronJob** เป็นเครื่องมือที่มีประโยชน์มากใน Kubernetes สำหรับการจัดการงานที่ต้องทำเฉพาะในช่วงเวลาหรือเมื่อทำเสร็จสิ้น โดย Job ใช้สำหรับงานที่ทำครั้งเดียวหรือจำนวนจำกัด ส่วน CronJob ช่วยให้คุณสามารถรันงานตามเวลาที่กำหนดโดยใช้ cron expression โดยสามารถตั้งค่าให้รองรับความยืดหยุ่นของเวลาในการทำงาน