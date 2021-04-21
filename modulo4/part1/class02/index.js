import mongoose from 'mongoose'

const pass = 'mongopass1234'
const db = 'dbteste'
const uri = `mongodb+srv://mongouser:${pass}@googlecloudbr.abil8.mongodb.net/${db}?retryWrites=true&w=majority`
const paramsDb = { useNewUrlParser: true, useUnifiedTopology: true }

try {
  const con = await mongoose.connect(uri, paramsDb)

  const testSchema = mongoose.Schema({
    name: {
      type: String,
      require: true,
    },
  })

  mongoose.model('test', testSchema, 'test')

  const test = mongoose.model('test')

  new test({
    name: 'Paulo Assis',
  })
    .save()
    .then((data) => {
      console.log('document inserted')
      console.log(data)
    })
    .catch((err) => {
      console.log(err)
    })
} catch (err) {
  console.log(err)
}
