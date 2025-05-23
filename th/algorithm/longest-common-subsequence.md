### การทำความเข้าใจเกี่ยวกับ **Longest Common Subsequence (LCS)**

**Longest Common Subsequence (LCS)** เป็นปัญหาที่ใช้ในการค้นหาลำดับที่มีความยาวยาวที่สุดที่สามารถพบได้ในสองลำดับที่ให้มา (เช่น สตริงหรืออาร์เรย์) โดยที่ลำดับย่อยนั้นต้องไม่จำเป็นต้องอยู่ติดกันในลำดับต้นฉบับ แต่ต้องอยู่ในลำดับเดียวกัน

#### ตัวอย่าง:
ให้สองสตริง:
- `X = "AGGTAB"`
- `Y = "GXTXAYB"`

ลำดับที่ยาวที่สุดที่ปรากฏในทั้งสองสตริงคือ `GTAB` ซึ่งมีความยาว 4

---

## **1. แนวคิดพื้นฐานของ LCS**

ในการหาค่าของ **Longest Common Subsequence** (LCS) ระหว่างสองลำดับ (เช่น สตริง) จะมีหลักการทำงานดังนี้:

- หากตัวอักษรที่ตำแหน่ง i ในสตริงแรกตรงกับตัวอักษรที่ตำแหน่ง j ในสตริงที่สอง (i.e., `X[i] == Y[j]`), เราสามารถรวมตัวอักษรนี้เข้าไปใน LCS
- หากตัวอักษรที่ตำแหน่ง i และ j ไม่ตรงกัน (i.e., `X[i] != Y[j]`), LCS จะเป็นค่าที่ได้จากการเลือก LCS ที่ยาวที่สุดจากสองทางเลือก:
  - LCS ของสตริง `X[0..i-1]` และ `Y[0..j]`
  - LCS ของสตริง `X[0..i]` และ `Y[0..j-1]`

### **กฎการทำงานหลัก**:
1. หาก `X[i] == Y[j]`:
   \[
   LCS(i, j) = LCS(i-1, j-1) + 1
   \]
2. หาก `X[i] != Y[j]`:
   \[
   LCS(i, j) = \max(LCS(i-1, j), LCS(i, j-1))
   \]

---

## **2. วิธีการใช้ Dynamic Programming ในการหาค่า LCS**

การคำนวณ **LCS** สามารถทำได้อย่างมีประสิทธิภาพโดยใช้ **Dynamic Programming** เพื่อหลีกเลี่ยงการคำนวณซ้ำในขั้นตอนต่าง ๆ โดยการใช้ **ตาราง DP** เพื่อเก็บค่าผลลัพธ์ที่คำนวณแล้วของแต่ละคู่ `(i, j)` ของสตริงทั้งสอง

### **ขั้นตอนการทำงาน**:
1. สร้างตาราง DP ที่มีขนาด `(m+1) x (n+1)` โดยที่ `m` คือความยาวของสตริง `X` และ `n` คือความยาวของสตริง `Y`
2. กรอกค่าตารางโดยใช้กฎที่กล่าวถึงข้างต้น:
   - เมื่อ `X[i] == Y[j]`, ค่าในตารางที่ตำแหน่ง `(i, j)` จะเป็น `LCS(i-1, j-1) + 1`
   - เมื่อ `X[i] != Y[j]`, ค่าในตารางที่ตำแหน่ง `(i, j)` จะเป็น `max(LCS(i-1, j), LCS(i, j-1))`
3. ค่าในตารางที่มุมขวาล่าง `(m, n)` จะเป็นความยาวของ **Longest Common Subsequence**

---

## **3. ตัวอย่างการคำนวณ LCS**

ให้สองสตริง:
- `X = "AGGTAB"`
- `Y = "GXTXAYB"`

### ขั้นตอนการคำนวณ

1. สร้างตาราง DP ที่ขนาด `(7 x 8)` เพราะความยาวของ `X` คือ 6 และ `Y` คือ 7:
   
   ตาราง DP เริ่มต้นจะเป็น:
   ```
   0 0 0 0 0 0 0 0
   0 0 0 0 0 0 0 0
   0 0 0 0 0 0 0 0
   0 0 0 0 0 0 0 0
   0 0 0 0 0 0 0 0
   0 0 0 0 0 0 0 0
   0 0 0 0 0 0 0 0
   ```

2. เติมค่าในตาราง DP ตามกฎที่กล่าวถึง:
   - สำหรับ `i = 1` และ `j = 1` ถ้า `X[0] == Y[0]` (i.e., `A == G`) จะไม่ตรงกัน ดังนั้น:
     ```
     DP[1][1] = max(DP[0][1], DP[1][0]) = 0
     ```

   - เมื่อ `X[1] == Y[1]` (i.e., `G == G`), เราจะเพิ่ม 1:
     ```
     DP[2][2] = DP[1][1] + 1 = 1
     ```

3. ทำซ้ำขั้นตอนนี้จนกระทั่งตารางเต็ม

ผลลัพธ์สุดท้ายในตาราง DP คือ:
```
  0 0 0 0 0 0 0 0
  0 0 0 0 0 0 0 0
  0 1 1 1 1 1 1 1
  0 1 1 1 1 1 1 1
  0 1 1 2 2 2 2 2
  0 1 1 2 2 2 3 3
  0 1 1 2 3 3 3 3
```

- ค่าในตำแหน่ง `(6, 7)` คือ `LCS(6, 7) = 4` ซึ่งเป็นความยาวของ **Longest Common Subsequence** ที่ยาวที่สุดระหว่าง `X` และ `Y` (ในกรณีนี้คือ "GTAB")

---

## **4. วิธีการคืนค่า LCS**

หลังจากที่เราได้ค่า LCS ในตาราง DP แล้ว ขั้นตอนถัดไปคือการคืนค่าลำดับของ LCS โดยการย้อนกลับจากมุมขวาล่างของตาราง

### **ขั้นตอนการคืนค่า LCS**:
1. เริ่มจากตำแหน่ง `(m, n)` (มุมขวาล่างของตาราง)
2. หาก `X[i] == Y[j]`, ให้เพิ่มตัวอักษร `X[i]` ไปยังลำดับ LCS และลด `i` และ `j` ลง 1
3. หาก `X[i] != Y[j]`, เลือกทางที่มีค่ามากกว่า (ระหว่าง `DP[i-1][j]` หรือ `DP[i][j-1]`)

### **ตัวอย่างโค้ดในการคืนค่า LCS**:
```python
def get_LCS(X, Y):
    m, n = len(X), len(Y)
    # สร้างตาราง DP
    dp = [[0] * (n + 1) for _ in range(m + 1)]

    # เติมค่าตาราง DP
    for i in range(1, m + 1):
        for j in range(1, n + 1):
            if X[i - 1] == Y[j - 1]:
                dp[i][j] = dp[i - 1][j - 1] + 1
            else:
                dp[i][j] = max(dp[i - 1][j], dp[i][j - 1])

    # คืนค่า LCS
    lcs = []
    i, j = m, n
    while i > 0 and j > 0:
        if X[i - 1] == Y[j - 1]:
            lcs.append(X[i - 1])
            i -= 1
            j -= 1
        elif dp[i - 1][j] >= dp[i][j - 1]:
            i -= 1
        else:
            j -= 1

    # กลับลำดับของ LCS
    return ''.join(reversed(lcs))

# ตัวอย่างการใช้งาน
X = "AGGTAB"
Y = "GXTXAYB"
print(get_LCS(X, Y))  # ผลลัพธ์: "GTAB"
```

---

## **5. สรุป**

- **Longest Common Subsequence (LCS)** คือการหาลำดับที่ยาวที่สุดที่มีอยู่ในสองลำดับที่ไม่จำเป็นต้องอยู่ติดกัน
- การคำนวณ LCS สามารถทำได้อย่างมีประสิทธิภาพโดยใช้ **Dynamic Programming** ด้วยการสร้างตาราง DP เพื่อเก็บผลลัพธ์ของการคำนวณ LCS ของแต่ละคู่ `(i, j)`
- **Time Complexity** ของการคำนวณ LCS คือ **O(m * n)** ซึ่ง m และ n คือความยาวของสตริงทั้งสอง
- **Space Complexity** ของการใช้ DP คือ **O(m * n)** ในการเก็บตาราง DP