import { config } from 'dotenv';
import express from 'express';
// import { register } from './api';
import './webSocket';

config();

const app = express();

const PUBLIC_ROOT = `${__dirname}/../../public`;

app.use(express.static(PUBLIC_ROOT));

app.get('/', (req, res) => {
  res.sendFile(`${PUBLIC_ROOT}/index.html`);
});

app.post<{ userName: string }>('/api/register', async (req, res) => {
  // const userId = await register('そんなにてすとしたいのか？');
  // console.log(userId);
  res.send(req.body);
});

const SERVER_PORT = parseInt(process.env.SERVER_PORT as string, 10);
app.listen(SERVER_PORT, () => {
  console.log(`${SERVER_PORT}をlistenします！`);
});
