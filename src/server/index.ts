import express from 'express';

const app = express();

const PUBLIC_ROOT = `${__dirname}/../../public`;

app.use(express.static(PUBLIC_ROOT));

app.get('/', (req, res) => {
  res.sendFile(`${PUBLIC_ROOT}/index.html`);
});

app.listen(8080, () => {
  console.log('8080をlistenします！');
});
