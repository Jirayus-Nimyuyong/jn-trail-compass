### 1. **ทำความเข้าใจเกี่ยวกับ Linked List**
**Linked List** เป็นโครงสร้างข้อมูลที่ประกอบด้วยชุดของโหนด (Nodes) โดยแต่ละโหนดจะมีข้อมูลและการอ้างอิงไปยังโหนดถัดไป (หรือ null ในกรณีที่เป็นโหนดสุดท้าย)

#### โครงสร้างของ Linked List:
```plaintext
Head -> [Data | Next] -> [Data | Next] -> [Data | Next] -> None
```
- **Head**: คือตัวเริ่มต้นของ Linked List
- **Data**: ข้อมูลที่เก็บในแต่ละโหนด
- **Next**: อ้างอิงไปยังโหนดถัดไป

### 2. **การสร้าง Linked List**

#### ตัวอย่างใน Python:
```python
class Node:
    def __init__(self, data=None):
        self.data = data
        self.next = None

class LinkedList:
    def __init__(self):
        self.head = None

    def append(self, data):
        new_node = Node(data)
        if not self.head:
            self.head = new_node
        else:
            last = self.head
            while last.next:
                last = last.next
            last.next = new_node

    def print_list(self):
        temp = self.head
        while temp:
            print(temp.data, end=" -> ")
            temp = temp.next
        print("None")
```

#### การใช้ Linked List:
```python
# สร้าง Linked List ใหม่
linked_list = LinkedList()
linked_list.append("Apple")
linked_list.append("Banana")
linked_list.append("Cherry")

# แสดงผลลัพธ์ของ Linked List
linked_list.print_list()
```

ผลลัพธ์:
```plaintext
Apple -> Banana -> Cherry -> None
```

### 3. **การใช้ Linked List กับ Strings**
Linked List สามารถใช้เพื่อเก็บข้อมูลประเภท **String** เช่น คำหรือประโยค ตัวอย่างเช่น:
```python
linked_list.append("Hello")
linked_list.append("World")
linked_list.print_list()
```

ผลลัพธ์:
```plaintext
Hello -> World -> None
```

