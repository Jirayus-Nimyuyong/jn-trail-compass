# Asymptotic Notations

## บทนำ
Asymptotic Notations เป็นเครื่องมือที่ใช้ในการวิเคราะห์การทำงานของอัลกอริทึม โดยช่วยให้เราแสดงถึงพฤติกรรมของอัลกอริทึมเมื่อขนาดของอินพุต (\(n\)) มีขนาดใหญ่ขึ้น เป็นวิธีที่ใช้ในการเปรียบเทียบประสิทธิภาพของอัลกอริทึมต่าง ๆ อย่างเป็นมาตรฐาน

---

## ประเภทของ Asymptotic Notations

### 1. Big-O Notation (\(O\))
ใช้แสดง **ขอบเขตบน (Upper Bound)** ของอัลกอริทึมในกรณีที่เลวร้ายที่สุด (Worst Case) ซึ่งหมายความว่า เวลาในการทำงานของอัลกอริทึมจะไม่เกินค่าที่กำหนดนี้

#### ตัวอย่าง:
\[
T(n) \in O(f(n)) \text{ ถ้า } T(n) \leq c \cdot f(n) \text{ เมื่อ } n \geq n_0
\]
- **ตัวอย่างในชีวิตจริง:** Bubble Sort มี Time Complexity เป็น \(O(n^2)\)

#### โค้ดตัวอย่าง (Python):
```python
# Bubble Sort (Worst Case: O(n^2))
def bubble_sort(arr):
    n = len(arr)
    for i in range(n):
        for j in range(0, n - i - 1):
            if arr[j] > arr[j + 1]:
                arr[j], arr[j + 1] = arr[j + 1], arr[j]
```

---

### 2. Omega Notation (\(\Omega\))
ใช้แสดง **ขอบเขตล่าง (Lower Bound)** ของอัลกอริทึมในกรณีที่ดีที่สุด (Best Case) ซึ่งหมายความว่า เวลาในการทำงานของอัลกอริทึมจะไม่ต่ำกว่าค่าที่กำหนดนี้

#### ตัวอย่าง:
\[
T(n) \in \Omega(f(n)) \text{ ถ้า } T(n) \geq c \cdot f(n) \text{ เมื่อ } n \geq n_0
\]
- **ตัวอย่างในชีวิตจริง:** การค้นหาแบบ Linear Search มี Time Complexity เป็น \(\Omega(1)\) ในกรณีที่ดีที่สุด

#### โค้ดตัวอย่าง (Python):
```python
# Linear Search (Best Case: Omega(1))
def linear_search(arr, target):
    if arr[0] == target:  # Best Case
        return 0
    for i in range(1, len(arr)):
        if arr[i] == target:
            return i
    return -1
```

---

### 3. Theta Notation (\(\Theta\))
ใช้แสดง **ขอบเขตที่แน่นอน (Tight Bound)** ของอัลกอริทึม ซึ่งหมายความว่า เวลาในการทำงานของอัลกอริทึมจะอยู่ระหว่างขอบเขตบนและขอบเขตล่างของค่าที่กำหนดนี้

#### ตัวอย่าง:
\[
T(n) \in \Theta(f(n)) \text{ ถ้า } c_1 \cdot f(n) \leq T(n) \leq c_2 \cdot f(n) \text{ เมื่อ } n \geq n_0
\]
- **ตัวอย่างในชีวิตจริง:** Merge Sort มี Time Complexity เป็น \(\Theta(n \log n)\)

#### โค้ดตัวอย่าง (Python):
```python
# Merge Sort (Tight Bound: Theta(n log n))
def merge_sort(arr):
    if len(arr) > 1:
        mid = len(arr) // 2
        left_half = arr[:mid]
        right_half = arr[mid:]

        merge_sort(left_half)
        merge_sort(right_half)

        i = j = k = 0

        while i < len(left_half) and j < len(right_half):
            if left_half[i] < right_half[j]:
                arr[k] = left_half[i]
                i += 1
            else:
                arr[k] = right_half[j]
                j += 1
            k += 1

        while i < len(left_half):
            arr[k] = left_half[i]
            i += 1
            k += 1

        while j < len(right_half):
            arr[k] = right_half[j]
            j += 1
            k += 1
```

---

## การนำไปประยุกต์ใช้
1. ใช้เลือกอัลกอริทึมที่เหมาะสมกับปัญหาที่ต้องการแก้ไข
2. เปรียบเทียบอัลกอริทึมหลายแบบเพื่อเลือกวิธีที่มีประสิทธิภาพสูงสุด

---

## สรุป
Asymptotic Notations เป็นพื้นฐานสำคัญในการวิเคราะห์และออกแบบอัลกอริทึม ช่วยให้เข้าใจและประเมินประสิทธิภาพของอัลกอริทึมได้อย่างแม่นยำ และสามารถนำไปใช้ในการพัฒนาซอฟต์แวร์ที่มีประสิทธิภาพสูง
