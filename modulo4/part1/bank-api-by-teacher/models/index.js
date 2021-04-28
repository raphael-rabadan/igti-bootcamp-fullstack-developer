import mongoose from 'mongoose';

import accountModel from './accountModel.js';

const db = {};

db.url = process.env.MONGOURL;
db.mongoose = mongoose;
db.account = accountModel(mongoose);

export { db };
