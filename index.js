import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import routes from './src/routes.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT;

app.use(express.json());

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.use('/api', routes);

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
