import express from 'express';

import controller from '../controllers/accountController.js';

const app = express();

app.patch('/account/deposit/', controller.deposit);

app.patch('/account/withdraw/', controller.withdraw);

app.get('/account/checkBalance/:agencia/:conta', controller.checkBalance);

app.delete('/account/remove/', controller.remove);

app.patch('/account/transfer/', controller.transfer);

app.get('/account/avgBalance/:agencia', controller.avgBalance);

app.get('/account/topByBalanceLowest/:limit', controller.topByBalanceLowest);

app.get('/account/topByBalanceHighest/:limit', controller.topByBalanceHighest);

app.get('/account/transferToPrivate/', controller.transferToPrivate);

export { app as accountRouter };
