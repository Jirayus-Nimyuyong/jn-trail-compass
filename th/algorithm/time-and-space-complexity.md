# Time and Space Complexity

## บทนำ
**Time Complexity** และ **Space Complexity** เป็นเครื่องมือสำคัญในการวิเคราะห์ประสิทธิภาพของอัลกอริทึม โดยช่วยให้เราประเมินการทำงานของอัลกอริทึมในแง่ของทรัพยากรที่ต้องใช้ เช่น เวลาและหน่วยความจำ

---

## Time Complexity
Time Complexity หมายถึง จำนวนขั้นตอนที่อัลกอริทึมต้องใช้ในการทำงาน ซึ่งขึ้นอยู่กับขนาดของอินพุต \( n \)

### การวิเคราะห์ Time Complexity
1. **Best Case:** เวลาที่ใช้ในกรณีที่ดีที่สุด
2. **Worst Case:** เวลาที่ใช้ในกรณีที่เลวร้ายที่สุด
3. **Average Case:** เวลาที่ใช้ในกรณีเฉลี่ย

### การแสดงผลในรูปแบบ Big-O
Big-O ใช้เพื่อแสดงลำดับการเจริญเติบโตของเวลาเมื่อขนาดอินพุตเพิ่มขึ้น เช่น:
- \( O(1) \): Constant Time (เวลาเท่ากันเสมอ)
- \( O(n) \): Linear Time (เพิ่มตามขนาดอินพุต)
- \( O(n^2) \): Quadratic Time (เพิ่มเป็นกำลังสองของอินพุต)

### ตัวอย่าง Time Complexity
#### ตัวอย่างโค้ด (Python):
```python
# การค้นหาแบบ Linear Search
def linear_search(arr, target):
    for i in range(len(arr)):
        if arr[i] == target:
            return i
    return -1

# Time Complexity: O(n)
```

---

## Space Complexity
Space Complexity หมายถึง หน่วยความจำที่อัลกอริทึมต้องใช้ในการทำงาน ซึ่งรวมถึง:
1. **Fixed Part:** หน่วยความจำที่ใช้ไม่เปลี่ยนแปลงตามขนาดอินพุต
2. **Variable Part:** หน่วยความจำที่ขึ้นอยู่กับขนาดอินพุต

### การวิเคราะห์ Space Complexity
ตัวอย่างของ Space Complexity ที่พบบ่อย:
- \( O(1) \): ใช้หน่วยความจำคงที่
- \( O(n) \): ใช้หน่วยความจำที่เพิ่มขึ้นตามขนาดอินพุต

### ตัวอย่าง Space Complexity
#### ตัวอย่างโค้ด (Python):
```python
# การสร้าง Array ใหม่
def create_array(n):
    new_array = [0] * n
    return new_array

# Space Complexity: O(n)
```

---

## เปรียบเทียบตัวอย่าง Time และ Space Complexity
### Bubble Sort
#### โค้ดตัวอย่าง:
```python
# Bubble Sort
def bubble_sort(arr):
    n = len(arr)
    for i in range(n):
        for j in range(0, n-i-1):
            if arr[j] > arr[j+1]:
                arr[j], arr[j+1] = arr[j+1], arr[j]

# Time Complexity: O(n^2)
# Space Complexity: O(1)
```

---

## สรุป
การวิเคราะห์ Time และ Space Complexity เป็นสิ่งสำคัญในการเลือกใช้อัลกอริทึมที่เหมาะสมกับปัญหา การทำความเข้าใจและเปรียบเทียบอัลกอริทึมต่าง ๆ จะช่วยเพิ่มประสิทธิภาพและลดการใช้ทรัพยากรที่ไม่จำเป็น
