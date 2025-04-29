### การทำความเข้าใจเกี่ยวกับ **Fibonacci Sequence** ด้วย **Dynamic Programming**

**Fibonacci Sequence** เป็นลำดับของตัวเลขที่เริ่มต้นจาก 0 และ 1 จากนั้นแต่ละค่าจะเท่ากับผลรวมของสองค่าก่อนหน้าในลำดับ โดยที่:

- **F(0) = 0**
- **F(1) = 1**
- **F(n) = F(n-1) + F(n-2)** สำหรับ n ≥ 2

การคำนวณลำดับฟีโบนัชชีในแบบดั้งเดิมโดยใช้ **Recursion** นั้นสามารถทำได้ง่าย แต่จะมีประสิทธิภาพต่ำเมื่อ n มีค่ามาก เพราะจะทำการคำนวณซ้ำหลายครั้ง

ในการใช้ **Dynamic Programming** (DP) เราจะใช้วิธีการเก็บผลลัพธ์ของการคำนวณที่ได้แล้ว เพื่อไม่ให้คำนวณซ้ำ (ที่เรียกว่า **Memoization** หรือ **Tabulation**) ซึ่งจะช่วยเพิ่มประสิทธิภาพในการคำนวณ

---

## **1. วิธีการคำนวณ Fibonacci ด้วย Dynamic Programming**

### 1. **Memoization (Top-Down Approach)**

ใน **Memoization** เราจะใช้ **Recursion** ในการคำนวณ Fibonacci แต่จะเก็บผลลัพธ์ที่คำนวณแล้วไว้ในตารางเพื่อไม่ให้คำนวณซ้ำ

#### **ขั้นตอนการทำงาน**:
- เมื่อเราคำนวณ Fibonacci ของค่า n แล้ว เราจะเก็บผลลัพธ์ใน **Memoization Table** เพื่อให้ไม่ต้องคำนวณซ้ำเมื่อเรียกฟังก์ชันซ้ำ
- หากค่าที่เราต้องการคำนวณถูกเก็บไว้ในตารางแล้ว ก็สามารถนำค่าเหล่านั้นมาใช้ได้ทันที

#### **ตัวอย่างโค้ด (Memoization)**:
```python
def fibonacci_memo(n, memo={}):
    # หากค่าของ Fibonacci ถูกคำนวณแล้วใน memo ให้รีเทิร์นค่า
    if n in memo:
        return memo[n]
    
    # กรณีฐานของฟีโบนัชชี
    if n <= 1:
        return n
    
    # คำนวณฟีโบนัชชีและเก็บผลใน memo
    memo[n] = fibonacci_memo(n - 1, memo) + fibonacci_memo(n - 2, memo)
    
    return memo[n]

# ตัวอย่างการใช้งาน
n = 10
print(fibonacci_memo(n))  # ผลลัพธ์: 55
```

### 2. **Tabulation (Bottom-Up Approach)**

ใน **Tabulation** เราจะใช้ **Iteration** ในการคำนวณ Fibonacci โดยเริ่มจากกรณีพื้นฐาน (F(0) และ F(1)) แล้วค่อย ๆ คำนวณ Fibonacci ของค่าที่สูงขึ้นตามลำดับจนถึง n

#### **ขั้นตอนการทำงาน**:
- เริ่มต้นด้วยการสร้างตารางเก็บค่า Fibonacci ของแต่ละค่า
- คำนวณค่า Fibonacci จากกรณีพื้นฐานและทำการอัพเดทตารางจนถึงค่า n
- ในที่สุดจะได้ค่า Fibonacci ของ n จากตารางที่สร้างขึ้น

#### **ตัวอย่างโค้ด (Tabulation)**:
```python
def fibonacci_tab(n):
    if n <= 1:
        return n
    
    # สร้างตารางเก็บค่าของ Fibonacci
    fib = [0] * (n + 1)
    fib[1] = 1
    
    # คำนวณ Fibonacci โดยใช้ Tabulation
    for i in range(2, n + 1):
        fib[i] = fib[i - 1] + fib[i - 2]
    
    return fib[n]

# ตัวอย่างการใช้งาน
n = 10
print(fibonacci_tab(n))  # ผลลัพธ์: 55
```

---

## **2. เปรียบเทียบ Memoization และ Tabulation**

### **Memoization (Top-Down)**:
- ใช้ **Recursion** ในการคำนวณ
- ผลลัพธ์ที่คำนวณแล้วจะถูกเก็บใน **Memoization Table** เพื่อหลีกเลี่ยงการคำนวณซ้ำ
- ความซับซ้อนในการใช้หน่วยความจำขึ้นอยู่กับจำนวนการเรียกฟังก์ชัน (โดยเฉพาะการเรียกฟังก์ชันซ้ำ)
- ประสิทธิภาพดีขึ้นเมื่อมีปัญหาที่ซับซ้อนหรือขนาดใหญ่

### **Tabulation (Bottom-Up)**:
- ใช้ **Iteration** ในการคำนวณ
- ไม่มีการใช้ **Recursion** หรือ **Stack** ซึ่งทำให้ไม่เกิดปัญหาการเรียกฟังก์ชันซ้ำ
- เก็บผลลัพธ์ของ Fibonacci ทั้งหมดในตารางและคำนวณจากล่างขึ้นบน
- ประสิทธิภาพมักจะดีกว่าในแง่ของการใช้พื้นที่หน่วยความจำ

---

## **3. ความซับซ้อนของเวลาและพื้นที่**

### **Time Complexity**:
- ทั้ง **Memoization** และ **Tabulation** มี **Time Complexity** เท่ากับ **O(n)** เพราะเราคำนวณ Fibonacci เพียงครั้งเดียวสำหรับทุกค่าที่ต้องการ โดยการเก็บผลลัพธ์ที่คำนวณแล้วในตาราง

### **Space Complexity**:
- **Memoization** มี **Space Complexity** เท่ากับ **O(n)** เนื่องจากใช้ **Recursion** และ **Memoization Table**
- **Tabulation** มี **Space Complexity** เท่ากับ **O(n)** เนื่องจากต้องใช้ตารางในการเก็บผลลัพธ์

---

## **4. สรุป**

- **Fibonacci Sequence** เป็นปัญหาที่เหมาะสำหรับการใช้ **Dynamic Programming** เพราะมีคุณสมบัติของ **Overlapping Subproblems** และ **Optimal Substructure**.
- **Memoization** (Top-Down) และ **Tabulation** (Bottom-Up) เป็นวิธีที่ใช้ในการแก้ปัญหานี้:
  - **Memoization** ใช้ **Recursion** และเก็บผลลัพธ์ของฟังก์ชันที่คำนวณแล้วในตาราง
  - **Tabulation** ใช้ **Iteration** ในการคำนวณ Fibonacci โดยเริ่มจากกรณีพื้นฐานแล้วค่อย ๆ คำนวณไปจนถึง n
- ทั้งสองวิธีมี **Time Complexity** เท่ากับ **O(n)** และ **Space Complexity** เท่ากับ **O(n)**

การใช้ **Dynamic Programming** ในการคำนวณ **Fibonacci Sequence** จะช่วยลดความซ้ำซ้อนในการคำนวณและทำให้สามารถคำนวณได้เร็วขึ้นเมื่อ n มีค่ามาก