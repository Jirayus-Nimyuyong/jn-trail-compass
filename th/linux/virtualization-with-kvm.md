# การใช้ Virtualization with KVM

## บทนำ

KVM (Kernel-based Virtual Machine) เป็นเทคโนโลยี virtualization ที่ใช้ในระบบปฏิบัติการ Linux โดยการใช้ฟีเจอร์ virtualization ที่มีอยู่ในโปรเซสเซอร์ (เช่น Intel VT-x หรือ AMD-V) KVM ช่วยให้ผู้ใช้สามารถสร้างและจัดการเครื่องเสมือน (Virtual Machine หรือ VM) บน Linux ได้อย่างมีประสิทธิภาพ

ในบทนี้, เราจะเรียนรู้วิธีการติดตั้ง KVM, การสร้างและจัดการเครื่องเสมือน, รวมถึงเครื่องมือที่ใช้ในการจัดการ KVM เช่น `virt-manager`, `virsh`, และ `qemu`.

## 1. การติดตั้ง KVM

### 1.1 การติดตั้ง KVM บน Ubuntu

เพื่อเริ่มต้นใช้งาน KVM บน Ubuntu, ทำตามขั้นตอนดังนี้:

```bash
# อัพเดตฐานข้อมูลแพ็คเกจ
sudo apt update

# ติดตั้ง KVM, QEMU, และ libvirt
sudo apt install qemu-kvm libvirt-bin bridge-utils virt-manager

# ตรวจสอบว่า KVM รองรับในระบบของคุณ
kvm-ok
```

คำสั่ง `kvm-ok` จะบอกว่าโปรเซสเซอร์ของคุณรองรับ KVM หรือไม่

### 1.2 การติดตั้ง KVM บน CentOS

```bash
# ติดตั้ง KVM, QEMU, และ libvirt
sudo yum install qemu-kvm libvirt libvirt-python libguestfs-tools virt-install

# เริ่มต้นและเปิดใช้งานบริการ libvirtd
sudo systemctl start libvirtd
sudo systemctl enable libvirtd
```

## 2. การตรวจสอบว่า KVM พร้อมใช้งาน

หลังจากติดตั้ง KVM เสร็จสิ้น, คุณสามารถตรวจสอบว่า KVM พร้อมใช้งานในระบบหรือไม่ด้วยคำสั่ง:

```bash
# ตรวจสอบสถานะของ libvirtd
sudo systemctl status libvirtd
```

หากแสดงว่า `libvirtd` กำลังทำงานอยู่, คุณก็สามารถเริ่มสร้างเครื่องเสมือนด้วย KVM ได้แล้ว

## 3. การสร้างเครื่องเสมือน (VM) ด้วย KVM

### 3.1 การใช้ `virt-manager` (GUI)

`virt-manager` เป็นเครื่องมือกราฟิกที่ช่วยให้คุณสามารถสร้างและจัดการเครื่องเสมือนด้วย KVM ได้อย่างสะดวกสบาย

1. เปิด `virt-manager` โดยใช้คำสั่ง:
   ```bash
   virt-manager
   ```

2. เลือก "New" เพื่อสร้างเครื่องเสมือนใหม่

3. ทำตามขั้นตอนในกราฟิกอินเตอร์เฟซ เช่น การเลือกแหล่งที่มาของ ISO image และการตั้งค่าพื้นที่ฮาร์ดดิสก์

4. หลังจากการตั้งค่าเสร็จสิ้น, คุณสามารถเริ่มต้นเครื่องเสมือนได้ทันที

### 3.2 การใช้ `virt-install` (Command-line)

`virt-install` เป็นเครื่องมือบรรทัดคำสั่งที่ช่วยให้คุณสร้างเครื่องเสมือนใหม่

ตัวอย่างการสร้างเครื่องเสมือนใหม่:

```bash
sudo virt-install \
  --name ubuntu-vm \
  --ram 2048 \
  --vcpus 2 \
  --disk path=/var/lib/libvirt/images/ubuntu-vm.qcow2,size=20 \
  --cdrom /path/to/ubuntu.iso \
  --os-type linux \
  --os-variant ubuntu20.04 \
  --network bridge=virbr0 \
  --graphics vnc
```

คำอธิบาย:
- `--name` ชื่อเครื่องเสมือน
- `--ram` ขนาด RAM ที่จะมอบให้เครื่องเสมือน
- `--vcpus` จำนวน CPU ที่จะใช้
- `--disk` ขนาดของดิสก์
- `--cdrom` ไฟล์ ISO ที่จะใช้ติดตั้งระบบปฏิบัติการ
- `--os-type` และ `--os-variant` ระบุประเภทของระบบปฏิบัติการ
- `--network` การตั้งค่าเครือข่าย
- `--graphics` ใช้ VNC สำหรับกราฟิก

## 4. การจัดการเครื่องเสมือน (VM)

### 4.1 การใช้ `virsh` (Command-line)

`virsh` เป็นเครื่องมือบรรทัดคำสั่งที่สามารถใช้ในการจัดการเครื่องเสมือนของ KVM ได้ เช่น การเริ่มต้น, หยุด, และดูสถานะของ VM

#### การเริ่มต้นเครื่องเสมือน

```bash
sudo virsh start ubuntu-vm
```

#### การหยุดเครื่องเสมือน

```bash
sudo virsh shutdown ubuntu-vm
```

#### การรีสตาร์ทเครื่องเสมือน

```bash
sudo virsh reboot ubuntu-vm
```

#### การลบเครื่องเสมือน

```bash
sudo virsh undefine ubuntu-vm
```

### 4.2 การตรวจสอบสถานะของเครื่องเสมือน

```bash
sudo virsh list --all
```

## 5. การใช้ QEMU

QEMU เป็นเครื่องมือที่ช่วยให้คุณสามารถรันเครื่องเสมือนใน KVM ได้โดยไม่ต้องใช้เครื่องมือจัดการอื่นๆ เช่น `virt-manager` หรือ `virsh`

ตัวอย่างการใช้ QEMU เพื่อรันเครื่องเสมือน:

```bash
sudo qemu-system-x86_64 -m 2048 -cdrom /path/to/ubuntu.iso -boot d -hda /var/lib/libvirt/images/ubuntu-vm.qcow2
```

## 6. การทำงานกับ Storage และ Networking

### 6.1 การตั้งค่า Storage สำหรับ KVM

การตั้งค่าพื้นที่จัดเก็บของเครื่องเสมือนใน KVM สามารถทำได้โดยใช้คำสั่ง `qemu-img` หรือการใช้ `virt-manager` ในการจัดการพื้นที่เก็บข้อมูล

ตัวอย่างการสร้างดิสก์:

```bash
qemu-img create -f qcow2 /var/lib/libvirt/images/ubuntu-vm.qcow2 20G
```

### 6.2 การตั้งค่าเครือข่ายสำหรับ KVM

KVM สามารถใช้เครือข่ายแบบ `bridge` เพื่อให้เครื่องเสมือนสามารถเชื่อมต่อกับเครือข่ายภายนอกได้

ตัวอย่างการใช้ bridge network:

```bash
# สร้าง bridge network ใหม่
sudo virsh net-create /path/to/bridge-network.xml
```

### 6.3 การทำ Snapshot

คุณสามารถสร้าง Snapshot ของเครื่องเสมือนเพื่อกลับไปยังสถานะก่อนหน้านี้ได้โดยใช้ `virsh` หรือ `virt-manager`

ตัวอย่างการสร้าง Snapshot:

```bash
sudo virsh snapshot-create-as ubuntu-vm snapshot1
```

## 7. การตรวจสอบและแก้ไขปัญหา

### 7.1 การตรวจสอบ Log ของ KVM

การตรวจสอบ log ของ KVM สามารถทำได้จากไฟล์ log ของ libvirt:

```bash
sudo tail -f /var/log/libvirt/qemu/ubuntu-vm.log
```

### 7.2 การตรวจสอบประสิทธิภาพของเครื่องเสมือน

คุณสามารถใช้คำสั่ง `top` หรือ `htop` เพื่อตรวจสอบการใช้ CPU และ RAM ของเครื่องเสมือน

```bash
top -p <pid_of_vm>
```

## สรุป

KVM เป็นเครื่องมือที่มีประสิทธิภาพสำหรับการสร้างและจัดการเครื่องเสมือนบนระบบ Linux โดยใช้ทรัพยากรของฮาร์ดแวร์จริงอย่างมีประสิทธิภาพ การใช้งาน KVM ในการสร้าง VM สามารถทำได้ง่ายผ่านทั้ง GUI (`virt-manager`) และคำสั่งบรรทัดคำสั่ง (`virt-install`, `virsh`) ซึ่งเหมาะสมทั้งสำหรับผู้ใช้ที่ต้องการใช้งานผ่านกราฟิกและผู้ที่ชอบการทำงานในสภาพแวดล้อมคอมมานด์ไลน์