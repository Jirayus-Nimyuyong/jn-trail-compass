การเรียนรู้การใช้งาน **Stacks** และ **Queues** มีความสำคัญในโครงสร้างข้อมูล ซึ่งทั้งสองมีวิธีการจัดการข้อมูลที่แตกต่างกัน ดังนี้:

## 1. **Stacks**
**Stack** เป็นโครงสร้างข้อมูลที่ใช้หลักการ **LIFO (Last In, First Out)** หรือ "เข้า-ออกจากด้านเดียว" โดยข้อมูลที่ถูกใส่เข้าไปล่าสุดจะถูกดึงออกก่อน

### การใช้งาน Stack
- **Push**: การเพิ่มข้อมูลเข้าไปใน Stack
- **Pop**: การดึงข้อมูลออกจาก Stack
- **Peek/Top**: การดูข้อมูลที่อยู่ด้านบนสุดโดยไม่ดึงออก

### ตัวอย่างการใช้งาน Stack ใน Python

```python
# สร้าง Stack เป็น List
stack = []

# การเพิ่มข้อมูล (Push)
stack.append(10)
stack.append(20)
stack.append(30)

# การดูข้อมูลด้านบนสุด (Peek)
print("Top item:", stack[-1])  # 30

# การดึงข้อมูลออก (Pop)
print("Popped item:", stack.pop())  # 30
print("Popped item:", stack.pop())  # 20
print("Popped item:", stack.pop())  # 10

# ตรวจสอบว่า Stack ว่างหรือไม่
if not stack:
    print("Stack is empty")
```

**ผลลัพธ์:**
```
Top item: 30
Popped item: 30
Popped item: 20
Popped item: 10
Stack is empty
```

## 2. **Queues**
**Queue** เป็นโครงสร้างข้อมูลที่ใช้หลักการ **FIFO (First In, First Out)** หรือ "เข้าจากด้านหลัง, ออกจากด้านหน้า" ซึ่งข้อมูลที่ใส่เข้าไปก่อนจะถูกดึงออกก่อน

### การใช้งาน Queue
- **Enqueue**: การเพิ่มข้อมูลเข้าไปใน Queue
- **Dequeue**: การดึงข้อมูลออกจาก Queue
- **Peek/Front**: การดูข้อมูลที่อยู่ด้านหน้า (Front) โดยไม่ดึงออก

### ตัวอย่างการใช้งาน Queue ใน Python

```python
from collections import deque

# สร้าง Queue โดยใช้ deque
queue = deque()

# การเพิ่มข้อมูล (Enqueue)
queue.append(10)
queue.append(20)
queue.append(30)

# การดูข้อมูลที่หน้า (Front)
print("Front item:", queue[0])  # 10

# การดึงข้อมูลออก (Dequeue)
print("Dequeued item:", queue.popleft())  # 10
print("Dequeued item:", queue.popleft())  # 20
print("Dequeued item:", queue.popleft())  # 30

# ตรวจสอบว่า Queue ว่างหรือไม่
if not queue:
    print("Queue is empty")
```

**ผลลัพธ์:**
```
Front item: 10
Dequeued item: 10
Dequeued item: 20
Dequeued item: 30
Queue is empty
```

## ความแตกต่างระหว่าง Stack และ Queue
| คุณสมบัติ        | Stack (LIFO)               | Queue (FIFO)               |
|------------------|----------------------------|----------------------------|
| การเพิ่มข้อมูล    | เพิ่มที่ด้านบน (Push)       | เพิ่มที่ด้านหลัง (Enqueue) |
| การดึงข้อมูล     | ดึงจากด้านบน (Pop)         | ดึงจากด้านหน้า (Dequeue)  |
| การเข้าถึงข้อมูล | ข้อมูลที่ล่าสุด (Top)      | ข้อมูลที่เข้าแรกสุด (Front)|
| การใช้งาน         | ใช้ในระบบย้อนกลับ เช่น การคำนวณซ้อน (Backtracking) | ใช้ในระบบคิว เช่น การจัดการคิวของงาน |

## 3. **เมื่อใช้ Stacks และ Queues**
- **Stack** ใช้ในกรณีที่ต้องการทำงานกับข้อมูลตามลำดับย้อนกลับ เช่น:
  - การย้อนกลับของคำ (Reverse a string)
  - การประมวลผลสูตรทางคณิตศาสตร์
  - การท่องต้นไม้ (Tree Traversal)
  
- **Queue** ใช้ในกรณีที่ข้อมูลต้องการการประมวลผลตามลำดับที่เข้าไปก่อน เช่น:
  - การจัดการคิวงาน
  - การจำลองการทำงานของโปรเซสในระบบปฏิบัติการ
  - การใช้ในแอปพลิเคชันที่ต้องการการประมวลผลข้อมูลในลำดับที่เพิ่มเข้ามา