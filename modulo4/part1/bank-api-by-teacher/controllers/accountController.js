import { db } from '../models/index.js';

const Account = db.account;

// Item 4 - Crie um endpoint para registrar um depósito em uma conta
const deposit = async (req, res) => {
  const account = req.body;

  try {
    let newDeposit = await validateAccount(account);

    newDeposit.balance += account.balance;

    newDeposit = new Account(newDeposit);

    await newDeposit.save();

    res.send(newDeposit);
  } catch (error) {
    res.status(500).send('Erro ao depositar ' + error);
  }
};

// Item 5. Crie um endpoint para registrar um saque em uma conta.
const withdraw = async (req, res) => {
  const account = req.body;

  try {
    let newDrawMoney = await validateAccount(account);

    // valida saldo mais valor do saque antes de efetivar de fato o saque
    newDrawMoney.balance -= account.balance + 1; // valor + taxa de 1;
    if (newDrawMoney.balance < 0) {
      throw new Error('Saldo Insuficiente');
    }

    newDrawMoney = new Account(newDrawMoney);

    await newDrawMoney.save();

    res.send(newDrawMoney);
  } catch (error) {
    res.status(500).send('Erro ao sacar ' + error);
  }
};

// Item 6. Crie um endpoint para consultar o saldo da conta
const checkBalance = async (req, res) => {
  const agencia = req.params.agencia;
  const conta = req.params.conta;

  try {
    const checkBalance = await validateAccount({ agencia, conta });
    res.send(checkBalance);
  } catch (error) {
    res.status(500).send('Erro ao consultar o saldo ' + error);
  }
};

// Item 7. Crie um endpoint para excluir uma conta.
const remove = async (req, res) => {
  const account = req.body;

  try {
    let deleteAccount = await validateAccount(account);

    await Account.findByIdAndRemove({ _id: deleteAccount._id });

    deleteAccount = await Account.find({
      agencia: deleteAccount.agencia,
    }).countDocuments();

    res.send({ totalAccounts: deleteAccount });
  } catch (error) {
    res.status(500).send('Erro ao excluir a conta ' + error);
  }
};

// Item 8. Crie um endpoint para realizar transferências entre contas.
const transfer = async (req, res) => {
  const account = req.body;
  const transferMoney = account.valor;

  try {
    let sourceAccount = await validateAccount({ conta: account.contaOrigem });
    let targetAccount = await validateAccount({ conta: account.contaDestino });

    //Valida cobranca de taxa para transferencia
    if (sourceAccount.agencia !== targetAccount.agencia) {
      sourceAccount.balance -= 8;
    }

    //Subtrai do saldo da conta origem o valor da transferencia
    sourceAccount.balance -= transferMoney;

    //Valida saldo da conta origem antes de concluir transacao
    if (sourceAccount.balance < 0) {
      throw new Error('Saldo insuficiente para efetuar a transferencia');
    }

    //Deposita o valor da tranferencia na conta de destino
    targetAccount.balance += transferMoney;

    //Salva as alteracoes conta origem
    sourceAccount = new Account(sourceAccount);
    await sourceAccount.save();

    //Salva as alteracoes conta destino
    targetAccount = new Account(targetAccount);
    await targetAccount.save();

    //Retorna a conta origem com saldo atualizado
    res.send(sourceAccount);
  } catch (error) {
    res.status(500).send('Erro ao realizar transferencia ' + error);
  }
};

// Item 9. Crie um endpoint obter a media de saldo de uma agencia.
const avgBalance = async (req, res) => {
  const agencia = req.params.agencia;

  try {
    const averageBalance = await Account.aggregate([
      {
        $match: {
          agencia: parseInt(agencia),
        },
      },
      {
        $group: {
          _id: '$agencia',
          media: {
            $avg: '$balance',
          },
        },
      },
      {
        $project: {
          _id: 0,
          media: 1,
        },
      },
    ]);

    if (averageBalance.length === 0) {
      throw new Error('Agencia nao encontrada');
    }
    res.send(averageBalance);
  } catch (error) {
    res.status(500).send('Erro ao obter saldo medio da Agencia ' + error);
  }
};

// Item 10. Crie um endpoint para consultar os clientes com menor saldo.
const topByBalanceLowest = async (req, res) => {
  const limit = req.params.limit;

  try {
    const account = await Account.find(
      {},
      { _id: 0, agencia: 1, conta: 1, balance: 1 }
    )
      .limit(parseInt(limit))
      .sort({ saldo: 1 });
    if (account.length === 0) {
      throw new Error('Nenhum cliente encontrado');
    }
    res.send(account);
  } catch (error) {
    res.status(500).send('Erro ao obter lista de clientes ' + error);
  }
};

// Item 11. Crie um endpoint para consultar os clientes com maior saldo.
const topByBalanceHighest = async (req, res) => {
  const limit = req.params.limit;

  try {
    const account = await Account.find(
      {},
      { _id: 0, agencia: 1, conta: 1, nome: 1, balance: 1 }
    )
      .limit(parseInt(limit))
      .sort({ saldo: -1, nome: 1 });
    if (account.length === 0) {
      throw new Error('Nenhum cliente encontrado');
    }
    res.send(account);
  } catch (error) {
    res.status(500).send('Erro ao obter lista de clientes ' + error);
  }
};

// Item 12. Crie um endpoint que irá transferir o cliente com maior saldo em conta de cada agência para a agência private agencia=99.
const transferToPrivate = async (req, res) => {
  try {
    let transferToPrivates = await Account.aggregate([
      {
        $group: {
          _id: '$agencia',
          balance: { $max: '$balance' },
        },
      },
    ]);

    for (const transferToPrivate of transferToPrivates) {
      const { _id, balance } = transferToPrivate;
      let newAccount = await Account.findOne({
        agencia: _id,
        balance,
      });
      newAccount.agencia = 99;
      newAccount.save();
    }
    transferToPrivates = await Account.find({
      agencia: 99,
    });
    res.send(transferToPrivates);
  } catch (error) {
    res
      .status(500)
      .send('Erro transferir clientes para a conta privada' + error);
  }
};

// valida se agencia/conta existe
const validateAccount = async (account) => {
  //traz apenas a agencia e a conta para consulta no BD;
  const { agencia, conta } = account;
  account = {
    agencia,
    conta,
  };
  try {
    if (typeof account.agencia !== 'undefined') {
      account = await Account.findOne(account);
    } else {
      account = await Account.findOne({ conta: account.conta });
    }
    if (!account) {
      throw new Error(`(${agencia}/${conta}) agencia/conta invalida`);
    }
    return account;
  } catch (error) {
    throw new Error(error.message);
  }
};

export default {
  deposit,
  withdraw,
  checkBalance,
  remove,
  transfer,
  avgBalance,
  topByBalanceLowest,
  topByBalanceHighest,
  transferToPrivate,
};
