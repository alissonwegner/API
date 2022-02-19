const express = require('express')
//const db = require('./db')
const { MongoClient } = require('mongodb')
const app = express()
const port = 3000

app.listen(port, () => console.log('App running on port ' + port))
app.use(express.json())

//GET
app.get('/', function (req, res) {
  res.status(200).json({ message: 'foi' }) 
})

//POST
app.post('/test', (req, res) => {
  const client = new MongoClient('mongodb://localhost:27017/', {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  let db
  let teste
  client.connect(() => {
    db = client.db('teste') //banco
    teste = db.collection('teste') //tabela
    addData()
  })
  addData = () => {
    const { id, tarefa, descricao } = req.body
    const project = {
      id,
      tarefa,
      descricao
    }
    teste.insertOne(project, err => {
      if (err) return res.json({ mensagem: err })
      return res.json(project)
    })
  }
})
//DELET
app.delete('/:id', (req, res)=>{
  const id = req.params.id
  res.status(200).json({ message: 'deletado'+id})
})