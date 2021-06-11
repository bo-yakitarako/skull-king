import { config } from 'dotenv';
import express, { Request as ExpressRequest } from 'express';
import { getUserIdFromName, register } from './api';
import './webSocket';

config();

const app = express();

const PUBLIC_ROOT = `${__dirname}/../../public`;

app.use(express.static(PUBLIC_ROOT));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

type Request<T> = ExpressRequest<unknown, unknown, T>;

app.get('/', (req, res) => {
  res.sendFile(`${PUBLIC_ROOT}/index.html`);
});

type Register = { userName: string };
app.post('/api/register', async (req: Request<Register>, res) => {
  const { userName } = req.body;
  const userId = await register(userName);
  res.json({ userId });
});

app.post('/api/checkRegistration', async (req: Request<Register>, res) => {
  const { userName } = req.body;
  const userId = await getUserIdFromName(userName);
  res.json({ userId });
});

const SERVER_PORT = parseInt(process.env.SERVER_PORT as string, 10);
app.listen(SERVER_PORT, () => {
  console.log(`${SERVER_PORT}をlistenします！`);
});
