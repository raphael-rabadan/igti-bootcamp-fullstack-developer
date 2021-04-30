const MongoClient = require('mongodb').MongoClient
const uri =
  'mongodb+srv://mongouser:mongopass1234@googlecloudbr.abil8.mongodb.net/dbteste?retryWrites=true&w=majority'
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})

client.connect(async (err) => {
  const collection = client.db('dbteste').collection('test')

  const documents = await collection
    .find({ name: 'raphael rabadan' }, { _id: 0 })
    .toArray()
  console.log(documents)

  const databaselist = await client.db().admin().listDatabases()
  console.log(`Databases:`)
  databaselist.databases.forEach((db) => {
    console.log(`- ${db.name}`)
  })

  // perform actions on the collection object
  client.close()
})
