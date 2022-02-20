const MongoClient = require("mongodb").MongoClient;
MongoClient.connect("mongo://localhost:27017", {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
module.exports = {}