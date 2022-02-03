const mongoClient = require('mongodb').MongoClient
mongoClient.connect(
  'mongodb://localhost',
  { useUnifiedTopology: true },
  (error, connection) => {
    if (error) return console.log(error)
    global.connection = connection.db('teste')
    console.log('conectado ao banco!')
  }
)
module.exports = {}
