import express from 'express';
import { accountRouter } from './routes/accountRouter.js';

import { db } from './models/index.js';

(async () => {
  try {
    console.log('Conectando ao MongoDB... ');
    await db.mongoose.connect('mongodb://localhost:27017/bank', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
    });
    console.log('Conectado com sucesso ao MongoDB');
  } catch (error) {
    console.log('Erro ao conectar no MongoDB. ' + error);
  }
})();

const app = express();

app.use(express.json());
app.use(accountRouter);

app.listen(process.env.PORT || 3000, () => {
  console.log('API Bank Started...');
});
