import { Server } from 'ws';
import { WebSocketType } from '../webSocketType';
import { getData } from './api';
import { editScore, registerName } from './webSocketAPI';

const server = new Server({ port: 5001 });

server.on('connection', (webSocket) => {
  webSocket.on('open', () => {
    console.log('双方向通信を開始しちゃうわよ！');
  });

  webSocket.on('message', async (message: string) => {
    const request = JSON.parse(message) as WebSocketType;
    let responseData = '[]';
    switch (request.type) {
      case 'EDIT_SCORE':
        responseData = await editScore(request.payload);
        break;
      case 'REGISTER_NAME':
        responseData = await registerName(request.payload);
        break;
      default:
        responseData = JSON.stringify(await getData());
        break;
    }
    server.clients.forEach((client) => {
      client.send(responseData);
    });
  });

  webSocket.on('close', () => {
    console.log('とじまぁ〜す');
  });
});
