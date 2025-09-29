<!-- API Gateway – WebSocket API – Overview

• What’s WebSocket?
• Two-way interactive communication
between a user’s browser and a server
• Server can push information to the client
• This enables stateful application use cases
• WebSocket APIs are often used in real-
time applications such as chat
applications, collaboration platforms,
multiplayer games, and financial trading
platforms.
• Works with AWS Services (Lambda,
DynamoDB) or HTTP endpoints

---

Connecting to the API

WebSocket URL
wss://[some-uniqueid].execute-api.[region].amazonaws.com/[stage-name]

---

Client to Server Messaging
ConnectionID is re-used

WebSocket URL
wss://abcdef.execute-api.us-west-1.amazonaws.com/dev

---

Server to Client Messaging

WebSocket URL
wss://abcdef.execute-api.us-west-1.amazonaws.com/dev

---

Connection URL Operation

---

API Gateway – WebSocket API – Routing

• Incoming JSON messages are routed to
different backend
• If no routes => sent to $default
• You request a route selection expression to
select the field on JSON to route from
• Sample expression: $request.body.action
• The result is evaluated against the route keys
available in your API Gateway
• The route is then connected to the backend
you’ve setup through API Gateway

---

API Gateway WebSocket API
Introduction to WebSocket APIs with API Gateway
WebSocket APIs with API Gateway enable two-way interactive communication between a user's browser and a server. This two-way communication allows the server to push information back to the client without the client making a request to the server.

Use Cases for WebSocket APIs
This enables stateful application use cases. WebSocket APIs are often used in real-time applications such as chat applications, collaboration platforms, multiplayer games, and financial trading platforms.

Persistent Connections and Lifecycle Events
In the context of a chat application, the client connects to a WebSocket API on API Gateway and establishes a persistent connection. There are not multiple connections; the connection remains open and the API Gateway is connected to the clients.

On the first connection, a Lambda function called onConnect is invoked. You can perform actions such as persisting the connection ID into DynamoDB. Whenever the client sends a message over this persistent connection, a new Lambda function called sendMessage can be invoked. When the client wants to disconnect, a message is sent to the Lambda function onDisconnect.

Backend Integrations
API Gateway can integrate with various backends, such as Lambda functions, DynamoDB tables, HTTP endpoints, or any other supported integration. The key idea is that there is a WebSocket API managing the communication.

WebSocket URL Structure
A WebSocket URL starts with wss, indicating an encrypted WebSocket URL. It typically looks like:

wss://<unique-id>.execute-api.<region>.amazonaws.com/<stage-name>
When you deploy your WebSocket API, the client connects to this URL and establishes a persistent connection. This invokes the Lambda function and generates a connection ID, which remains persistent as long as the client is connected.

Storing Connection Metadata
The connection ID can be persisted into Amazon DynamoDB to store metadata, such as information about the user.

Sending Messages and Frames
When the client wants to send messages to the server, it uses the same WebSocket URL and sends messages over the persistent connection. These messages are called frames. Each frame can invoke a new Lambda function, and the connection ID remains the same. The Lambda function can interact with DynamoDB to retrieve user information based on the connection ID and persist messages as needed.

Server-to-Client Communication
The server (API Gateway) can communicate back to the clients without the client making a request. This is done using the same WebSocket URL. There is a connection URL callback that looks like:

https://<unique-id>.execute-api.<region>.amazonaws.com/<stage-name>/@connections/<connectionid>
A Lambda function or other backend can make an HTTP POST, signed using IAM Sig v4, to this connection URL callback, specifying the connection ID of the client. This sends a message from the API Gateway to the client, enabling two-way communication.

Managing Connections via API Gateway
For the /@connections/<connectionid> URL, you can:

POST to send a message from the server to the connected WebSocket client.
GET to retrieve the latest connection status of the connected WebSocket client.
DELETE to disconnect the client from the WebSocket connection.
Routing in WebSocket APIs
WebSocket APIs use routing to determine which Lambda function or backend to invoke. Incoming JSON messages are routed to different backends based on a route selection expression. If no route is specified, the message is sent to the default route.

You can create a route selection expression to select a field in the JSON message to route from. For example, if the incoming data from the client looks like:

{
  "service": "chat",
  "action": "join",
  "data": {"room": "room1234"}
}
You can define a Route Key Table at the API Gateway level with mandatory routes like connect, disconnect, default, and custom routes such as join, quit, delete, etc. If you specify the route selection expression as request.body.action, API Gateway will look at the action field of the incoming data. If the value is join, it will match the join route in the Route Key Table and invoke the corresponding backend.

Default Routing Behavior
If there is no matching route, the message is sent to the default route.

Summary
WebSocket APIs in API Gateway provide two-way communication and use routing to direct messages to specific backends based on the content of incoming data. The connection remains open, and routing is determined by the incoming data message.

Key Takeaways
WebSocket APIs in API Gateway enable two-way, interactive communication between a user's browser and a server.
Connections are persistent, and Lambda functions such as onConnect, sendMessage, and onDisconnect handle connection lifecycle events.
Messages are sent as frames over the persistent connection, and routing expressions determine which backend is invoked.
The API Gateway provides specific operations for managing connections, including sending messages, checking connection status, and disconnecting clients.

--- -->