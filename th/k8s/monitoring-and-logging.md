# Kubernetes Monitoring and Logging

## Introduction
การตรวจสอบและบันทึกข้อมูล (Monitoring and Logging) เป็นส่วนสำคัญในการดูแลและรักษาความเสถียรของ Kubernetes Cluster การมอนิเตอร์ช่วยให้คุณสามารถติดตามการทำงานของ Pods, Nodes, และ Services ในขณะที่การบันทึกข้อมูลช่วยให้คุณสามารถวิเคราะห์ข้อผิดพลาดและหาต้นตอของปัญหาที่เกิดขึ้น

ในบทนี้, เราจะเรียนรู้เกี่ยวกับเครื่องมือที่ใช้ในการมอนิเตอร์และบันทึกข้อมูลใน Kubernetes เช่น Prometheus, Grafana, ELK Stack, Fluentd, และเครื่องมืออื่น ๆ ที่ใช้ในการตรวจสอบและจัดการข้อมูลในคลัสเตอร์ Kubernetes

## Key Concepts

1. **Monitoring**:
   - **Monitoring** ใน Kubernetes หมายถึงการตรวจสอบสถานะและการทำงานของแอปพลิเคชัน, Pods, Nodes, และทรัพยากรอื่น ๆ ในคลัสเตอร์
   - เครื่องมือมอนิเตอร์เช่น Prometheus ช่วยให้คุณสามารถเก็บข้อมูลการใช้งานของระบบและสร้างกราฟหรือการแจ้งเตือนเมื่อระบบผิดปกติ

2. **Logging**:
   - **Logging** คือการบันทึกข้อมูลการทำงานของแอปพลิเคชันและระบบภายใน Kubernetes
   - เครื่องมือเช่น ELK Stack (Elasticsearch, Logstash, Kibana) หรือ Fluentd ช่วยในการรวบรวม, วิเคราะห์, และแสดงผลข้อมูลบันทึกจาก Pods, Nodes, และ Containers

3. **Metrics**:
   - **Metrics** คือข้อมูลเชิงสถิติที่รวบรวมจาก Kubernetes เพื่อแสดงสถานะการทำงานของระบบ เช่น CPU, Memory usage, และการทำงานของ Pods
   - ตัวอย่างเช่น Prometheus ใช้ในการเก็บ Metrics และสามารถดึงข้อมูลจาก K8s API server เพื่อติดตามสถานะของ Cluster

4. **Alerts**:
   - **Alerts** ช่วยให้คุณได้รับการแจ้งเตือนเมื่อเกิดปัญหาหรือสถานะที่ผิดปกติ เช่น การใช้งาน CPU หรือ Memory สูงเกินไป
   - เครื่องมือที่ช่วยในการตั้งค่าการแจ้งเตือนเช่น Prometheus Alertmanager หรือ Grafana

## Kubernetes Monitoring with Prometheus and Grafana

### Prometheus

Prometheus เป็นเครื่องมือยอดนิยมสำหรับการมอนิเตอร์ Kubernetes โดยมันสามารถรวบรวม Metrics จาก Kubernetes Cluster และ Pods ได้อย่างง่ายดาย

#### การติดตั้ง Prometheus

Prometheus สามารถติดตั้งได้โดยใช้ Helm Chart หรือ Kubernetes Manifest

**การติดตั้ง Prometheus ด้วย Helm:**
```bash
helm install prometheus prometheus-community/kube-prometheus-stack
```

#### การเก็บ Metrics จาก Kubernetes

Prometheus จะรวบรวมข้อมูลจากหลายแหล่งใน Kubernetes เช่น:
- Metrics ของ Nodes
- Metrics ของ Pods
- Metrics ของ Services
- Metrics จาก API Server, Scheduler, และ Controller Manager

คุณสามารถตรวจสอบข้อมูลได้โดยไปที่ UI ของ Prometheus โดยเข้าไปที่ URL ที่ Prometheus Service เปิดให้บริการ (เช่น `http://prometheus-server:9090`)

### Grafana

Grafana ใช้ในการสร้าง Dashboard สำหรับการแสดงผลข้อมูลจาก Prometheus โดยมันสามารถแสดงข้อมูล Metrics ที่รวบรวมจาก Kubernetes Cluster ได้อย่างสวยงามและใช้งานง่าย

#### การติดตั้ง Grafana

การติดตั้ง Grafana สามารถทำได้ผ่าน Helm:

```bash
helm install grafana grafana/grafana
```

#### การเชื่อมต่อ Grafana กับ Prometheus

1. เข้าไปที่ UI ของ Grafana (โดยปกติจะเป็น `http://grafana-service:3000`)
2. เพิ่ม Prometheus เป็น Data Source ใน Grafana
3. สร้าง Dashboards เพื่อแสดงผล Metrics ที่เก็บรวบรวมจาก Prometheus

## Kubernetes Logging with ELK Stack

### Elasticsearch, Logstash, Kibana (ELK)

ELK Stack เป็นชุดเครื่องมือที่ใช้ในการจัดการ Log Data โดยประกอบไปด้วย:
- **Elasticsearch**: ระบบฐานข้อมูลที่ใช้สำหรับจัดเก็บและค้นหาข้อมูล Logs
- **Logstash**: เครื่องมือในการรวบรวม, แปลง, และส่งข้อมูล Logs ไปยัง Elasticsearch
- **Kibana**: เครื่องมือที่ใช้ในการแสดงผลและวิเคราะห์ข้อมูล Logs ที่เก็บไว้ใน Elasticsearch

### การติดตั้ง ELK Stack

**การติดตั้ง Elasticsearch ด้วย Helm:**
```bash
helm install elasticsearch elastic/elasticsearch
```

**การติดตั้ง Logstash ด้วย Helm:**
```bash
helm install logstash elastic/logstash
```

**การติดตั้ง Kibana ด้วย Helm:**
```bash
helm install kibana elastic/kibana
```

### Fluentd for Log Collection

Fluentd เป็นเครื่องมือที่ใช้ในการรวบรวม Logs และส่งไปยัง Elasticsearch หรือระบบอื่น ๆ โดยสามารถเชื่อมต่อกับ Kubernetes และรวบรวม Logs จาก Containers และ Pods

**การติดตั้ง Fluentd ด้วย Helm:**
```bash
helm install fluentd stable/fluentd
```

Fluentd สามารถกำหนดค่าการรวบรวม Logs จาก Kubernetes โดยใช้ Input Plugin ที่รองรับ เช่น `kubernetes` input plugin ซึ่งช่วยให้สามารถดึงข้อมูล Log จาก Pods และ Nodes ภายใน Kubernetes Cluster ได้

### การเก็บ Logs จาก Kubernetes

- **Pod Logs**: Logs ที่ถูกสร้างขึ้นภายใน Containers ของ Pods
- **Node Logs**: Logs ที่เกี่ยวข้องกับการทำงานของ Kubernetes Nodes เช่น kubelet หรือ container runtime
- **Cluster Logs**: Logs ที่บันทึกโดย Kubernetes API Server, Controller Manager, และ Scheduler

### การวิเคราะห์ Logs ด้วย Kibana

Kibana ช่วยให้คุณสามารถค้นหาข้อมูล Logs ที่เก็บไว้ใน Elasticsearch และแสดงผลในรูปแบบของ Dashboards ที่สามารถกำหนดเองได้

## Best Practices for Kubernetes Monitoring and Logging

1. **Use Centralized Logging**:
   - ใช้เครื่องมือเช่น ELK Stack หรือ Fluentd ในการรวบรวม Logs จากทุก ๆ Pods และ Nodes ใน Cluster เพื่อทำให้การวิเคราะห์ข้อมูล Log เป็นไปได้ง่ายและมีประสิทธิภาพ

2. **Monitor Resource Usage**:
   - ติดตามการใช้งานของทรัพยากร เช่น CPU, Memory, และ Network ใน Kubernetes Cluster โดยใช้ Prometheus และ Grafana

3. **Set Up Alerts**:
   - ใช้ Prometheus และ Grafana ในการตั้งค่าการแจ้งเตือนเมื่อทรัพยากรของระบบเกินขีดจำกัดหรือเมื่อระบบพบปัญหา

4. **Log Retention and Management**:
   - จัดการการเก็บรักษา Logs โดยใช้ ElasticSearch หรือเครื่องมือจัดการ Logs อื่น ๆ เพื่อให้แน่ใจว่า Logs จะไม่เต็มไปหมดและสามารถใช้งานได้ในระยะยาว

5. **Use Labels and Annotations**:
   - ใช้ Labels และ Annotations บน Pods และ Services เพื่อทำให้สามารถกรองและค้นหาข้อมูล Logs ได้ง่ายขึ้น

## Conclusion

การมอนิเตอร์และบันทึกข้อมูลเป็นองค์ประกอบสำคัญในการบริหารจัดการ Kubernetes Cluster การใช้เครื่องมือเช่น Prometheus, Grafana, ELK Stack, และ Fluentd ช่วยให้คุณสามารถตรวจสอบสถานะการทำงานของระบบและวิเคราะห์ปัญหาต่าง ๆ ได้อย่างมีประสิทธิภาพ การตั้งค่า Alerts และการจัดการ Logs อย่างเหมาะสมจะช่วยให้ Kubernetes Cluster ของคุณทำงานได้อย่างราบรื่นและมั่นคง