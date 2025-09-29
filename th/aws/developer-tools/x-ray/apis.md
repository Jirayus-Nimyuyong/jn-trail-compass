X-Ray Write APIs (used by the X-Ray daemon)

• PutTraceSegments: Uploads segment
documents to AWS X-Ray
• PutTelemetryRecords: Used by the AWS
X-Ray daemon to upload telemetry.
• SegmentsReceivedCount,
SegmentsRejectedCounts,
BackendConnectionErrors…
• GetSamplingRules: Retrieve all sampling
rules (to know what/when to send)
• GetSamplingTargets &
GetSamplingStatisticSummaries: advanced
• The X-Ray daemon needs to have an IAM
policy authorizing the correct API calls to
function correctly

---
X-Ray Read APIs – continued

• GetServiceGraph: main graph
• BatchGetTraces: Retrieves a list of
traces specified by ID. Each trace is a
collection of segment documents that
originates from a single request.
• GetTraceSummaries: Retrieves IDs
and annotations for traces available for
a specified time frame using an
optional filter. To get the full traces,
pass the trace IDs to BatchGetTraces.
• GetTraceGraph: Retrieves a service
graph for one or more specific trace
IDs.

---

X-Ray APIs
Introduction to X-Ray APIs
Let's discuss the X-Ray APIs. It is important to understand them at a high level and know what they do because the exam may ask you to identify the correct API for specific X-Ray operations.

X-Ray Write API
The Write API is used by the X-Ray daemon to write data into the X-Ray service. This API is governed by a managed policy called X-Ray Write Only Access, which includes five key permissions.

PutTraceSegments
The first permission is PutTraceSegments. As the name indicates, it uploads segment documents into AWS X-Ray. This permission is essential for writing data into X-Ray.

PutTelemetryRecords
Next is PutTelemetryRecords. This allows the X-Ray daemon to upload information about how many segments were received, rejected, and any backend connection errors. This helps in monitoring metrics related to data ingestion.

GetSamplingRules
The Write API also includes some Get operations. One of them is GetSamplingRules. This permission is necessary because when sampling rules are changed in the X-Ray console, all X-Ray daemons are automatically updated to know when to send data. The daemon uses this API to retrieve the current sampling rules.

Additional Sampling APIs
Other related permissions include GetSamplingTargets and GetSamplingStatisticsSummaries. These are advanced APIs also related to sampling rules and help the daemon manage sampling behavior effectively.

Summary of Write API Permissions
To summarize, the X-Ray daemon requires permissions to write data, which include PutTraceSegments and PutTelemetryRecords. Additionally, it needs permissions to retrieve sampling rules via GetSamplingRules and related APIs. These permissions must be authorized through the correct IAM policy assigned to the daemon.

X-Ray Read API
The Read API is more complex and is used to retrieve data from X-Ray. It is governed by a managed policy that includes multiple Get permissions.

GetServiceGraph
GetServiceGraph retrieves the main service graph displayed in the X-Ray console, showing the relationships and interactions between services.

BatchGetTraces
BatchGetTraces retrieves a list of traces specified by their IDs. Each trace is a collection of segment documents originating from a single request.

GetTraceSummary
GetTraceSummary provides the IDs and annotations for traces available within a specified time range. This helps in identifying traces of interest before retrieving full details.

GetTraceGraph
GetTraceGraph retrieves a specific service graph for one or more trace IDs, allowing detailed analysis of the trace's service interactions.

Conclusion
These Read APIs are essential when using the X-Ray console to analyze trace data. Understanding when and why to use each API is important for the exam and practical use. Ensure that the correct IAM policies authorize these API calls for your use case.

Key Takeaways
The X-Ray Write API is used by the X-Ray daemon to upload segment documents and telemetry records into AWS X-Ray.
The Write API includes permissions such as PutTraceSegments, PutTelemetryRecords, and GetSamplingRules to manage data writing and sampling rules.
The Read API consists of multiple Get operations to retrieve service graphs, trace summaries, and trace details for analysis.
Proper IAM policies must be assigned to the X-Ray daemon to authorize these API calls for both writing and reading data.