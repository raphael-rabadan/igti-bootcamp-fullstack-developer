export default (mongoose) => {
  const schema = mongoose.Schema({
    agencia: {
      type: Number,
      required: true,
    },
    conta: {
      type: Number,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    balance: {
      type: Number,
      required: true,
      min: 0,
    },
  });

  const Account = mongoose.model('accounts', schema);

  return Account;
};
