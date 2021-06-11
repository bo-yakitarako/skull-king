import { Server } from 'ws';

const server = new Server({ port: 5001 });

server.on('connection', (webSocket) => {
  webSocket.on('open', () => {
    console.log('双方向通信を開始しちゃうわよ！');
  });

  webSocket.on('message', (message) => {
    server.clients.forEach((client) => {
      client.send(message);
    });
  });

  webSocket.on('close', () => {
    console.log('とじまぁ〜す');
  });
});
