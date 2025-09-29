Route 53 – Records TTL (Time To Live)

• High TTL – e.g., 24 hr
• Less traffic on Route 53
• Possibly outdated records

• Low TTL – e.g., 60 sec.
• More traffic on Route 53 ($$)
• Records are outdated for less
time
• Easy to change records

• Except for Alias records,
TTL is mandatory for each
DNS record
---
Route 53 - TTL
Understanding TTL (Time To Live) in DNS
A record TTL is a Time To Live value associated with DNS records. Consider an example where a client accesses DNS Route 53 and a web server. When a DNS request is made for myapp.example.com, the DNS responds with an A record containing the IP address and a TTL value, such as 300 seconds.

The TTL instructs clients to cache this DNS result for the duration specified. For example, with a TTL of 300 seconds, the client caches the response for 300 seconds. During this cache period, if the client requests the same hostname again, it will not query the DNS system because it already has the cached answer.

This caching mechanism reduces the frequency of DNS queries since records typically do not change often. The client uses the cached response to access the web server and perform HTTP requests and responses.

There are two extreme cases regarding TTL values:

High TTL (e.g., 24 hours):

Results in fewer DNS queries to Route 53, reducing traffic.
Clients cache records for a long time, which may cause them to use outdated records if changes occur.
If a record changes, clients may need to wait up to 24 hours to receive the updated record.
Low TTL (e.g., 60 seconds):

Increases DNS query traffic, leading to higher costs since Route 53 charges per request.
Records are outdated for a shorter time, allowing faster propagation of changes.
Easier and quicker to update records overall.
Choosing an appropriate TTL depends on your needs. If you plan to change a record, a common strategy is:

Decrease the TTL to a low value (e.g., 24 hours before the change).
Wait until clients have the new low TTL cached.
Change the record value, which will then propagate quickly.
Increase the TTL again to reduce DNS query traffic.
Note that TTL is mandatory for every DNS record except Alias records, which will be covered in the next lecture.

Demonstration of TTL in the AWS Route 53 Console
Let's create a new DNS record named demo.stephanetheteacher.com pointing to one of the EC2 instances in the eu-central-1 region. We set the TTL to two minutes (120 seconds) by clicking twice on the minute button.

After creating the record, it is an A record pointing to the specified IP address. To verify the record is working, we try to access it using Google Chrome (since Firefox presents issues in this case). Navigating to demo.stephanetheteacher.com directs us to the eu-central-1 instance, confirming the record functions correctly.

Using CloudShell, we can perform DNS queries to verify the record. Running nslookup demo.stephanetheteacher.com returns the correct IP address. Similarly, the dig command shows an answer section with a TTL value (e.g., 115 seconds), indicating the remaining cache time.

If we immediately repeat the dig command, the TTL decreases (e.g., to 98 seconds), showing the cached response is still valid on the client side.

Now, if we quickly update the DNS record to point to a different IP address (e.g., an instance in ap-southeast-1) and save the change, the cached record on the client remains the old IP until the TTL expires.

For example, running the dig command immediately after the update still returns the old IP because the cache has not expired (e.g., 66 seconds remaining). Similarly, refreshing the page in Chrome still directs to the old IP.

Only after the TTL expires will the client query Route 53 again and receive the updated IP address. Waiting for the TTL to expire and then refreshing the browser shows the new IP address and the updated content from the new server.

This demonstrates how TTL controls DNS caching behavior and affects the propagation delay of DNS record changes.

Summary
TTL is a crucial parameter in DNS records that balances between reducing DNS query traffic and ensuring timely propagation of record changes. By adjusting TTL values strategically, you can optimize DNS performance and update responsiveness.

In the next lecture, we will explore Alias records and how they differ from standard DNS records regarding TTL.

Key Takeaways
TTL (Time To Live) in DNS records instructs clients to cache DNS responses for a specified duration.
A higher TTL reduces DNS query traffic but may cause clients to use outdated records longer.
A lower TTL increases DNS query traffic and cost but allows quicker propagation of record changes.
A common strategy is to lower TTL before making changes and then increase it afterward to balance update speed and traffic.