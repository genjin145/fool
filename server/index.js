const WebSocket = require('ws');
const wsPort = 4001;

const wss = new WebSocket.Server({ port: wsPort });

const chatMessages = [];

wss.on('connection', (ws) => {
  ws.send(JSON.stringify({ type: 'allMessages', data: chatMessages }));

  ws.on('message', (data) => {
    const dataObj = JSON.parse(data);

    if (dataObj.data) {
      chatMessages.push(dataObj.data);
      wss.clients.forEach((client) => {
        if (client.readyState === WebSocket.OPEN) {
          client.send(JSON.stringify({ type: 'message', data: dataObj.data }));
        }
      });
    }
  });
});
