/* web socket server

for running the server:
>> node index.js

*/

// https://developer.mozilla.org/en-US/docs/Web/API/WebSockets_API
// https://github.com/websockets/ws
import WebSocket, { WebSocketServer } from 'ws';

const wss = new WebSocketServer({ port: 3000 });

wss.on('connection', (ws) => {
  ws.on('message', (message) => {
    const text = JSON.parse(message);

    if (text.type === 'message') {
      wss.clients.forEach((client) => {
        if (client !== ws && client.readyState === WebSocket.OPEN) {
          client.send(JSON.stringify({ type: 'message', data: text.data }));
        }
      });
    }
  });
});
