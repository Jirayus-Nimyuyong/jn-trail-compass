CloudFront Caching

• The cache lives at each CloudFront Edge
Location
• CloudFront identifies each object in the cache
using the Cache Key (see next slide)
• You want to maximize the Cache Hit ratio to
minimize requests to the origin
• You can invalidate part of the cache using the
CreateInvalidation API

What is CloudFront Cache Key?

• A unique identifier for every object
in the cache
• By default, consists of hostname +
resource portion of the URL
• If you have an application that
serves up content that varies based
on user, device, language, location…
• You can add other elements
(HTTP headers, cookies, query
strings) to the Cache Key using
CloudFront Cache Policies

CloudFront Policies – Cache Policy

• Cache based on:
• HTTP Headers: None – Whitelist
• Cookies: None – Whitelist – Include All-Except – All
• Query Strings: None – Whitelist – Include All-Except – All
• Control the TTL (0 seconds to 1 year), can be set by the origin using
the Cache-Control header, Expires header…
• Create your own policy or use Predefined Managed Policies
• All HTTP headers, cookies, and query strings that you include in the
Cache Key are automatically included in origin requests

CloudFront Caching – Cache Policy
HTTP Headers

Node
• Don’t include any headers in the Cache Key
(except default)
• Headers are not forwarded (except default)
• Best caching performance

Whitelist:
• only specified headers included in the Cache Key
• Specified headers are also forwarded to Origin

CloudFront Cache – Cache Policy
Query Strings

• None
• Don’t include any query strings in the Cache Key
• Query strings are not forwarded

• Whitelist
• Only specified query strings included in the Cache Key
• Only specified query strings are forwarded

• Include All-Except
• Include all query strings in the Cache Key except the
specified list
• All query strings are forwarded except the specified list

• All
• Include all query strings in the Cache Key
• All query strings are forwarded
• Worst caching performance

CloudFront Policies – Origin Request Policy
• Specify values that you want to include in origin requests without
including them in the Cache Key (no duplicated cached content)
• You can include:
• HTTP headers: None – Whitelist – All viewer headers options
• Cookies: None – Whitelist – All
• Query Strings: None – Whitelist – All
• Ability to add CloudFront HTTP headers and Custom Headers to an
origin request that were not included in the viewer request
• Create your own policy or use Predefined Managed Policies

Cache Policy vs. Origin Request Policy

CloudFront – Cache Invalidations
• In case you update the back-end
origin, CloudFront doesn’t know
about it and will only get the
refreshed content after the TTL has
expired
• However, you can force an entire or
partial cache refresh (thus bypassing
the TTL) by performing a CloudFront
Invalidation
• You can invalidate all files (*) or a
special path (/images/*)

CloudFront – Cache Behaviors
• Configure different settings for a given URL path
pattern
• Example: one specific cache behavior to
images/*.jpg files on your origin web server
• Route to different kind of origins/origin groups
based on the content type or path pattern
• /images/*
• /api/*
• /* (default cache behavior)
• When adding additional Cache Behaviors, the
Default Cache Behavior is always the last to be
processed and is always /*

CloudFront – Cache Behaviors – Sign In Page

CloudFront – Maximize cache hits by
separating static and dynamic distributions

---

CloudFront - Caching & Caching Policies
Understanding CloudFront Caching
Let's take some time to understand how caching works in CloudFront. The cache exists at each CloudFront edge location. Therefore, you will have as many caches as there are edge locations. Each object in the cache is identified by a Cache Key. We will explore what the Cache Key is in the next section.

When a request is made through a CloudFront edge location, the edge location first checks whether the object has been cached. It also verifies if the cached object has expired based on its time to live (TTL). If the object is not in the cache or has expired, the request is forwarded to your origin. The response from the origin is then cached at the edge location so that future requests can return a cached result.

The goal is to maximize the Cache Hit ratio by minimizing requests to the origin. This means you want to cache as much content as possible in your edge locations. Additionally, you can remove items from the cache before they expire by creating an invalidation.

What is a CloudFront Cache Key?
A Cache Key is a unique identifier for each object in the cache. By default, if you do not configure anything, the Cache Key consists of the host name and the resource portion of the URL.

For example, consider the URL mywebsite.com/GET/content/stories/example-story.html. Here, mywebsite.com is the host name, and /GET/content/stories/example-story.html is the resource portion of the URL. Any request with the same host name and resource portion will result in a cache hit if the object is cached.

However, sometimes you want your Cache Key to be more complex because content can vary based on the user, device, language, or location. To handle this, you can enhance the Cache Key by including additional information such as HTTP headers, cookies, or query strings. To define how the Cache Key is created, you use a CloudFront cache policy.

Configuring Cache Policies
A cache policy controls how your Cache Key is created. It can specify which HTTP headers, cookies, and query strings are included in the Cache Key.

HTTP Headers: You can choose to include none, a whitelist of specific headers, or all headers.
Cookies: You can select none, a whitelist, all, or all except certain cookies.
Query Strings: Similarly, you can include none, a whitelist, all except some, or all query strings.
The cache policy also controls the TTL, which can be set from zero seconds up to one year. Additionally, TTL can be influenced by specific headers such as the cache control header or the expires header.

You can create your own cache policies or use predefined managed policies provided by AWS.

Impact of Cache Policy on Request Forwarding
All HTTP headers, cookies, and query strings included in the Cache Key are automatically forwarded to your origin request. For example, if you have a request with a language header set to fr-fr requesting the blog in French:

If the cache policy specifies no headers, then headers are not cached or forwarded to the origin.
If you whitelist the language header, it will be included in the Cache Key and forwarded to the origin, allowing the origin to respond with the correct language version.
This mechanism is similar for query strings. For example, a URL with query strings like ?border=red&size=large can be included or excluded from the Cache Key and forwarded based on the cache policy settings. Including many query strings can reduce caching performance.

Origin Request Policies
Sometimes, you want to include additional information in the request sent to the origin but do not want that information to be part of the Cache Key. In this case, you define an origin request policy.

An origin request policy allows you to forward extra HTTP headers, cookies, or query strings to the origin without including them in the Cache Key. You can also add custom HTTP headers or CloudFront headers to the origin request even if they were not present in the viewer request. For example, you might pass an API key or a secret header.

Like cache policies, you can create your own origin request policies or use predefined managed policies.

Summary: Cache Keys vs Origin Request Policies
To summarize the difference:

The Cache Policy defines how caching works and what parts of the request (host name, resource, headers, cookies, query strings) are used to create the Cache Key.
The Origin Request Policy defines what additional information is forwarded to the origin but does not affect the Cache Key.
For example, you might cache based on the host name, resource, and an authorization header. However, your origin might require additional headers like user-agent, session ID, or certain query strings to properly serve the request. These additional parts are forwarded via the origin request policy but do not influence caching.

This synergy between cache policies and origin request policies allows you to optimize caching while ensuring the origin receives all necessary information.

Conclusion
That concludes our overview of CloudFront caching and caching policies. Understanding how Cache Keys and origin request policies work together is essential for optimizing content delivery and cache efficiency.

Thank you for your attention, and I look forward to seeing you in the next lecture.

Key Takeaways
CloudFront caching occurs at each edge location, identified by a unique Cache Key.
Cache Keys by default include the host name and resource portion of the URL but can be enhanced with headers, cookies, and query strings via cache policies.
Cache policies control what is included in the Cache Key and the time-to-live (TTL) settings.
Origin request policies allow forwarding additional headers, cookies, or query strings to the origin without affecting the Cache Key, enabling flexible request handling.

---

CloudFront - Cache Invalidations
Introduction to Cache Invalidations in CloudFront
CloudFront uses backend origins to serve content. When you update the backend origin, CloudFront edge locations do not immediately become aware of these changes. Instead, they serve cached content until the cache's Time To Live (TTL) expires. This means the updated content from your backend origin is only fetched after the TTL has elapsed.

This default behavior may be undesirable if you want new content to be served as soon as possible. To address this, you can force a full or partial cache refresh, effectively eliminating the existing TTL in your cache. This process is known as a CloudFront invalidation.

To perform an invalidation, you specify the file paths to be invalidated. You can invalidate all files using a wildcard "*", or target specific paths such as /images/.

How Cache Invalidations Work
Consider a CloudFront distribution with two edge locations. Each edge location maintains its own cache containing files like index.html and images fetched directly from your origin, such as an S3 bucket. Suppose the TTL for these files is set to one day, meaning the edge locations will refresh their cache once every 24 hours.

As an administrator, when you update files in the S3 bucket—adding or changing images and modifying the index.html file—you want these updates to be reflected to users via CloudFront as soon as possible.

To achieve this, you perform invalidations on the following paths:

/index.html to invalidate the specific file.
/images/ to invalidate all images in that directory.
CloudFront then instructs the edge locations to remove these files from their caches.

After invalidation, when a user requests index.html, the edge location will detect that the file is no longer in its cache. Consequently, it will forward the request to the origin to retrieve the updated index.html file. This ensures that users receive the latest content promptly.

Summary
Cache invalidations in CloudFront provide a mechanism to refresh cached content immediately, bypassing the TTL. This feature is essential for ensuring that updates to your backend origin are quickly propagated to users accessing content through CloudFront edge locations.

Key Takeaways
CloudFront caches content at edge locations with a set TTL, delaying updates from the origin.
Cache invalidations allow forcing a refresh of cached content before TTL expiry.
You can invalidate specific files or entire paths using CloudFront invalidations.
After invalidation, edge locations fetch updated content from the origin upon the next request.

---

CloudFront - Cache Behaviors
Introduction to Cache Behaviors
Let's discuss cache behaviors in CloudFront. The main idea is that you may want to have different origins or caches for different URL path patterns.

For example, you might want a specific cache behavior for all your JPEG images based on your origin web server. Alternatively, you may want to route different origins or origin groups based on the content type or the path pattern.

For instance, you could configure CloudFront so that requests to /images/ go to an S3 bucket, requests to /api/ go to your origin server, and requests to / go to your default origin. This default origin is also known as the default cache behavior.

Example of Cache Behaviors
In this example of CloudFront, there are two cache behaviors:

/api/ which routes to an application load balancer origin.
/ which is the default cache behavior.
You can also redirect to an S3 bucket as an origin.

Users accessing CloudFront will be routed to the appropriate cache behavior based on the resource they request. When you add additional cache behaviors, the default cache behavior, which always matches /, is processed last. CloudFront first checks for a more specific match, and if none is found, it falls back to the default cache behavior.

Use Case: Gating Access to an S3 Bucket
A common use case is to gate access to an S3 bucket to ensure users are properly signed in through a sign-in page. To achieve this, you define a cache behavior for /login. Users who access the /login page are routed to an EC2 instance.

The EC2 instance generates CloudFront signed cookies, which are sent back to the user. The user then uses these signed cookies to access the default cache behavior, which covers any other URL besides /login, allowing access to S3 bucket files.

If users try to access the default cache behavior without logging in first, the cache behavior can be configured to accept requests only if signed cookies are present. Otherwise, users are redirected to the /login page, ensuring secure access control.

Maximizing Cache Hit
Another reason to use different cache behaviors is to maximize cache hits. For example, static requests can be routed to Amazon S3 without any cache policy involving headers or sessions, maximizing cache hits based solely on the resource requested.

For dynamic content, such as a REST HTTP server behind a load balancer and EC2 instances, you may want to cache based on specific headers and cookies according to the cache policy you have defined.

I hope this explanation clarifies how cache behaviors work in CloudFront. Thank you for your attention, and I look forward to seeing you in the next lecture.

Key Takeaways
Cache behaviors in CloudFront allow routing requests to different origins based on URL path patterns.
The default cache behavior applies to all requests not matched by more specific cache behaviors.
Cache behaviors can be used to gate access, such as requiring signed cookies for protected content.
Different cache behaviors help maximize cache hits by tailoring caching policies for static and dynamic content.

---

CloudFront - Caching & Caching Invalidations - Hands On
Overview of CloudFront Caching Behavior
Let's examine the caching behavior of our CloudFront distribution. We start with the default behavior, which is represented by a wildcard path pattern (*). This default behavior cannot be edited in terms of its path pattern, but other settings can be adjusted.

Scrolling down, we observe options for configuring the cache key and origin request settings. Specifically, we can define a cache policy and optionally an origin request policy to control how requests are handled and cached.

Creating a Cache Policy
Let's create a cache policy named DemoCachePolicy. Within this policy, we have control over the time-to-live (TTL) settings, including the minimum TTL, maximum TTL, and default TTL values. These settings determine how long objects remain cached in CloudFront.

Cache Key Settings
We can specify which headers to include in the cache key by selecting from a predefined list or adding custom headers. Similarly, we can choose which query strings to include—either all or a specified subset. The same applies to cookies, where we can include all or only certain cookies. These selections define the cache key, which CloudFront uses to differentiate cached objects.

Data will be cached based on the selected headers, query strings, and cookies. Importantly, if headers are included in the cache key, they will also be passed to the origin request. However, if we want to pass additional headers, query strings, or cookies to the origin beyond those included in the cache key, we can create an origin request policy.

Creating an Origin Request Policy
We create an origin request policy named DemoOriginPolicy. This policy allows us to specify additional headers, query strings, and cookies to be included in requests sent to the origin. This enhances the request beyond what is included in the cache key, enabling more granular control over origin requests.

Returning to the CloudFront distribution configuration, we see that these cache key and origin request policies provide control over caching and origin request behavior. This setup allows for flexible and efficient content delivery.

Creating Additional Cache Behaviors
Besides the default behavior, we can create additional cache behaviors to override the default for specific path patterns. For example, we can create a behavior for the path pattern /images/ and route requests matching this pattern to a different origin, such as another S3 bucket or an EC2 instance.

Each behavior can have its own cache key and origin request policy. Multiple cache behaviors coexist, and the most specific path pattern is matched first when CloudFront processes requests.

Demonstration of Cache Invalidation
Next, let's observe the effect of TTL settings on caching by modifying an index.html file. We update the title text from "I really love coffee" to "I really love coffee every morning." After updating the file locally, we upload the new version to our S3 bucket. Since versioning is not enabled, this upload replaces the existing file.

Opening the file directly from Amazon S3 shows the updated text "I really love coffee every morning." However, when accessing the file through CloudFront and refreshing the page, the old text "I really love coffee" still appears. This occurs because CloudFront caches the previous version for one day based on the TTL settings and does not request the updated file from S3.

To force CloudFront to fetch the updated file, we use cache invalidation. We navigate to the invalidations tab in CloudFront and create a new invalidation with the path pattern /*, which instructs CloudFront to remove all cached objects. After the invalidation completes, refreshing the CloudFront URL retrieves the updated content from S3.

This demonstration illustrates how caching and invalidations work in CloudFront, enabling efficient content delivery while providing mechanisms to update cached content when necessary.

Key Takeaways
CloudFront cache behaviors can be customized with cache policies and origin request policies.
Cache keys can include specific headers, query strings, and cookies to control caching granularity.
Multiple cache behaviors can coexist, with the most specific path pattern taking precedence.
Cache invalidations force CloudFront to fetch updated content from the origin, bypassing cached versions.