# การตั้งค่าเครือข่าย (Network Configuration) ใน Linux

## บทนำ

การตั้งค่าเครือข่ายใน Linux เป็นหนึ่งในส่วนสำคัญของการดูแลระบบ โดยเฉพาะเมื่อต้องจัดการกับการเชื่อมต่ออินเทอร์เน็ต, เครือข่ายภายในองค์กร, หรือการตั้งค่าฮาร์ดแวร์เครือข่ายต่างๆ เช่น NIC (Network Interface Card) และ IP Address

ในบทนี้, เราจะเรียนรู้เกี่ยวกับการตั้งค่าเครือข่ายใน Linux ด้วยคำสั่งต่างๆ ที่ช่วยในการตั้งค่า IP, DNS, และการเชื่อมต่อเครือข่าย

## 1. การตั้งค่าที่อยู่ IP

### 1.1 การตรวจสอบการตั้งค่า IP (Check IP Configuration)

ใช้คำสั่ง `ip` เพื่อตรวจสอบการตั้งค่า IP ในระบบ:

```bash
ip addr show
```

หรือใช้คำสั่ง `ifconfig` (อาจต้องติดตั้ง):

```bash
ifconfig
```

คำสั่งนี้จะแสดงรายการของการตั้งค่าของแต่ละอินเทอร์เฟซในระบบ เช่น eth0, wlan0, หรือ lo

### 1.2 การตั้งค่า IP Address (Configure IP Address)

ในการตั้งค่า IP Address, คุณสามารถใช้คำสั่ง `ip` ดังนี้:

```bash
sudo ip addr add <IP_ADDRESS>/24 dev <INTERFACE_NAME>
```

ตัวอย่างการตั้งค่า IP Address 192.168.1.100 ให้กับอินเทอร์เฟซ eth0:

```bash
sudo ip addr add 192.168.1.100/24 dev eth0
```

หากต้องการลบ IP Address ออกจากอินเทอร์เฟซ:

```bash
sudo ip addr del 192.168.1.100/24 dev eth0
```

### 1.3 การตั้งค่า Default Gateway

เพื่อกำหนด Default Gateway ใช้คำสั่ง `ip route`:

```bash
sudo ip route add default via <GATEWAY_IP>
```

ตัวอย่างการตั้งค่า Default Gateway เป็น 192.168.1.1:

```bash
sudo ip route add default via 192.168.1.1
```

### 1.4 การตั้งค่าบริการ DHCP

หากคุณต้องการให้เครื่องรับค่า IP Address อัตโนมัติจาก DHCP Server, ใช้คำสั่ง `dhclient`:

```bash
sudo dhclient <INTERFACE_NAME>
```

ตัวอย่าง:

```bash
sudo dhclient eth0
```

## 2. การตั้งค่า DNS

### 2.1 การตั้งค่า DNS Server

เพื่อกำหนด DNS Server ให้ระบบ, คุณสามารถแก้ไขไฟล์ `/etc/resolv.conf` ด้วยคำสั่ง:

```bash
sudo nano /etc/resolv.conf
```

เพิ่มบรรทัดดังนี้:

```bash
nameserver 8.8.8.8
nameserver 8.8.4.4
```

หรือ DNS Server อื่นๆ ที่คุณต้องการ

### 2.2 การใช้ NetworkManager (สำหรับระบบที่ใช้ NetworkManager)

หากระบบใช้ **NetworkManager** ในการจัดการเครือข่าย, คุณสามารถตั้งค่า DNS โดยใช้ `nmcli`:

```bash
sudo nmcli con mod <connection_name> ipv4.dns "8.8.8.8 8.8.4.4"
sudo nmcli con up <connection_name>
```

## 3. การตั้งค่า Wireless Network (Wi-Fi)

### 3.1 การเชื่อมต่อกับ Wi-Fi โดยใช้ `nmcli`

ใช้คำสั่ง `nmcli` เพื่อตรวจสอบและเชื่อมต่อกับเครือข่าย Wi-Fi:

#### ตรวจสอบเครือข่าย Wi-Fi ที่มีอยู่:

```bash
nmcli dev wifi list
```

#### เชื่อมต่อกับเครือข่าย Wi-Fi:

```bash
sudo nmcli dev wifi connect <SSID> password <PASSWORD>
```

ตัวอย่างการเชื่อมต่อกับ Wi-Fi:

```bash
sudo nmcli dev wifi connect MyNetwork password MyPassword
```

### 3.2 การตั้งค่า Wi-Fi โดยใช้ `wpa_supplicant`

สำหรับการตั้งค่า Wi-Fi แบบละเอียด, สามารถใช้ **wpa_supplicant** โดยแก้ไขไฟล์ `wpa_supplicant.conf`:

```bash
sudo nano /etc/wpa_supplicant/wpa_supplicant.conf
```

เพิ่มบรรทัดนี้:

```bash
network={
    ssid="MyNetwork"
    psk="MyPassword"
}
```

แล้วเริ่มบริการ:

```bash
sudo wpa_supplicant -B -i wlan0 -c /etc/wpa_supplicant/wpa_supplicant.conf
```

## 4. การตรวจสอบการเชื่อมต่อเครือข่าย

### 4.1 การตรวจสอบการเชื่อมต่อกับเครื่องอื่น

ใช้คำสั่ง `ping` เพื่อตรวจสอบการเชื่อมต่อ:

```bash
ping <IP_ADDRESS_OR_HOSTNAME>
```

ตัวอย่าง:

```bash
ping 8.8.8.8
```

### 4.2 การตรวจสอบเส้นทางเครือข่าย (Trace Route)

หากต้องการตรวจสอบเส้นทางที่ข้อมูลเดินทางจากเครื่องไปยังปลายทาง, ใช้คำสั่ง `traceroute`:

```bash
traceroute <HOSTNAME_OR_IP>
```

ตัวอย่าง:

```bash
traceroute google.com
```

### 4.3 การตรวจสอบพอร์ตที่เปิดอยู่

ใช้คำสั่ง `netstat` เพื่อตรวจสอบพอร์ตที่เปิดอยู่ในเครื่อง:

```bash
netstat -tuln
```

## 5. การตั้งค่าการเชื่อมต่อเครือข่ายถาวร

ในการตั้งค่าการเชื่อมต่อเครือข่ายอย่างถาวร, แนะนำให้แก้ไขไฟล์คอนฟิกที่เกี่ยวข้อง เช่น `/etc/network/interfaces` (ในบางระบบ) หรือใช้ **NetworkManager** สำหรับระบบที่รองรับ

### 5.1 การตั้งค่า IP แบบ Static ใน `/etc/network/interfaces` (สำหรับระบบที่ไม่ใช้ NetworkManager)

```bash
sudo nano /etc/network/interfaces
```

เพิ่มบรรทัดดังนี้:

```bash
iface eth0 inet static
    address 192.168.1.100
    netmask 255.255.255.0
    gateway 192.168.1.1
    dns-nameservers 8.8.8.8 8.8.4.4
```

## 6. สรุป

การตั้งค่าเครือข่ายใน Linux ครอบคลุมการตั้งค่า IP Address, DNS, การเชื่อมต่อกับ Wi-Fi, และการตรวจสอบการเชื่อมต่อเครือข่าย โดยใช้เครื่องมือและคำสั่งต่างๆ เช่น `ip`, `ifconfig`, `nmcli`, และ `wpa_supplicant` การตั้งค่าเครือข่ายที่เหมาะสมช่วยให้เครื่องสามารถเชื่อมต่อและทำงานได้อย่างมีประสิทธิภาพ