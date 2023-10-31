import express from 'express';
import bodyParser from 'body-parser';

const app = express();
const PORT = 3000;

app.use(bodyParser.json());

app.get('/api/test', async (req, res) => {
  const filmes = [
    { id: 1, nome: 'Filme 1' },
    { id: 2, nome: 'Filme 2' },
  ];
  res.status(200).json(filmes);
});

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
