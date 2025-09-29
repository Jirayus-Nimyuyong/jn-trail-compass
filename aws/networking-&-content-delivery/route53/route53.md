Amazon Route 53
• A highly available, scalable, fully
managed and Authoritative DNS
• Authoritative = the customer (you)
can update the DNS records
• Route 53 is also a Domain Registrar
• Ability to check the health of your
resources
• The only AWS service which
provides 100% availability SLA
• Why Route 53? 53 is a reference to
the traditional DNS port


Route 53 – Records
• How you want to route traffic for a domain
• Each record contains:
• Domain/subdomain Name – e.g., example.com
• Record Type – e.g., A or AAAA
• Value – e.g., 12.34.56.78
• Routing Policy – how Route 53 responds to queries
• TTL – amount of time the record cached at DNS Resolvers
• Route 53 supports the following DNS record types:
• (must know) A / AAAA / CNAME / NS
• (advanced) CAA / DS / MX / NAPTR / PTR / SOA / TXT / SPF / SRV

Route 53 – Record Types
• A – maps a hostname to IPv4
• AAAA – maps a hostname to IPv6
• CNAME – maps a hostname to another hostname
• The target is a domain name which must have an A or AAAA record
• Can’t create a CNAME record for the top node of a DNS namespace (Zone
Apex)
• Example: you can’t create for example.com, but you can create for
www.example.com
• NS – Name Servers for the Hosted Zone
• Control how traffic is routed for a domain

Route 53 – Hosted Zones
• A container for records that define how to route traffic to a domain and
its subdomains
• Public Hosted Zones – contains records that specify how to route
traffic on the Internet (public domain names)
application1.mypublicdomain.com
• Private Hosted Zones – contain records that specify how you route
traffic within one or more VPCs (private domain names)
application1.company.internal
• You pay $0.50 per month per hosted zone


Route 53 – Public vs. Private Hosted Zones

---
Route 53 Overview
Introduction to Amazon Route 53
Now that we understand what DNS is, let's have a look at Amazon Route 53. This is a highly available, scalable, fully managed, and authoritative DNS service.

Being authoritative means that customers can update the DNS records, giving them full control over the DNS.

The idea is that clients want to access your EC2 instance, for example, example.com. However, your EC2 instance only has a public IP address. Therefore, we write DNS records into Amazon Route 53 within a hosted zone. When a client requests example.com, the Route 53 service responds with the IP address, such as 54.22.33.44, allowing the client to connect directly to the EC2 instance.

Route 53 also functions as a domain registrar, enabling registration of domain names like example.com. We will explore this in the hands-on section to get started with the service.

Additionally, Route 53 allows checking the health of resources. It is the only AWS service that provides a 100% availability SLA.

The name Route 53 refers to port 53, the traditional DNS port used by DNS services.

DNS Records in Route 53
In Route 53, you define DNS records that specify how to route traffic to a domain. Each record contains information such as:

The domain or subdomain name (e.g., example.com)
The record type (e.g., A, AAAA)
The value of the record (e.g., 12.34.56.78)
The routing policy, which determines how Route 53 responds to queries
The TTL (Time To Live), which is the duration the record is cached at DNS resolvers
Route 53 supports many DNS record types. The essential ones to know are A, AAAA, CNAME, and NS, which we will explore in the hands-on section. There are also advanced record types, but they are not required for the exam.

Important Record Types
A Record: Maps a hostname to an IPv4 address. For example, example.com points to 1.2.3.4.
AAAA Record: Similar to A record but maps a hostname to an IPv6 address.
CNAME Record: Maps a hostname to another hostname. The target hostname can be an A or AAAA record.
Note: You cannot create CNAME records for the top nodes of a DNS namespace, also known as the Zone Apex. For example, you cannot create a CNAME for example.com but can create one for www.example.com.

NS Record: Specifies the name servers for the hosted zone. These are the DNS names or IP addresses of servers that respond to DNS queries for your hosted zone and control traffic routing.
Hosted Zones
Hosted zones are containers for DNS records and define how to route traffic to a domain and its subdomains. There are two types of hosted zones:

Public Hosted Zones: Used for public domain names, such as mypublicdomain.com. These zones answer queries from public clients.
Private Hosted Zones: Used for private domain names accessible only within your Virtual Private Cloud (VPC). For example, application1.company.internal is a private domain name accessible only within the corporate network.
For any hosted zone created in AWS, there is a charge of 
0.50
p
e
r
m
o
n
t
h
.
D
o
m
a
i
n
r
e
g
i
s
t
r
a
t
i
o
n
c
o
s
t
s
s
t
a
r
t
a
t
0.50permonth.Domainregistrationcostsstartat12 per year. Therefore, Route 53 is not a free service.

Public vs Private Hosted Zones
Public Hosted Zones answer queries from the internet. For example, when a web browser requests example.com, the public hosted zone returns the corresponding IP address.
Private Hosted Zones answer queries only from within your VPC, allowing identification of private resources with private domain names.
For example, you might have:

An EC2 instance identified as webapp.example.internal
Another EC2 instance identified as api.example.internal
A database identified as database.example.internal
When the first EC2 instance requests api.example.internal, the private hosted zone resolves it to a private IP like 10.0.0.10, enabling direct connection.

The public and private hosted zones operate similarly, but public hosted zones allow queries from anyone on the internet, while private hosted zones restrict queries to private resources within your VPC.

Conclusion
This concludes the theory on Amazon Route 53. In the next lecture, we will register a domain and create DNS records to get hands-on experience with the service.

Key Takeaways
Amazon Route 53 is a highly available, scalable, fully managed, and authoritative DNS service.
Route 53 supports various DNS record types including A, AAAA, CNAME, and NS, each serving specific routing purposes.
Hosted zones in Route 53 can be public or private, controlling DNS resolution accessibility.
Using Route 53 incurs costs: 
0.50
p
e
r
h
o
s
t
e
d
z
o
n
e
p
e
r
m
o
n
t
h
a
n
d
d
o
m
a
i
n
r
e
g
i
s
t
r
a
t
i
o
n
s
t
a
r
t
i
n
g
a
t
0.50perhostedzonepermonthanddomainregistrationstartingat12 per year.