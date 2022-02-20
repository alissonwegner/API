const express = require('express')
const { MongoClient, ObjectId } = require('mongodb')
const app = express()
const port = 3000
//const db = require("../db")
app.listen(port, () => console.log('App running on port ' + port))
app.use(express.json())

//GET
app.get('/get', function (req, res) {
  const client = new MongoClient('mongodb://localhost:27017/', {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  let db
  let teste
  let resposta
  client.connect(() => {
    db = client.db('teste') //banco
    teste = db.collection('teste') //tabela
     lista()
    
  })
  lista = () =>{

    teste.find({}).toArray(function(err, result) {
      if (err)  return res.json({err});
      //console.log(result);
      return res.json({result})
    }); 
  }
 
   
})

//POST
app.post('/teste', (req, res) => {
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
    const client = new MongoClient('mongodb://localhost:27017/', {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  let db
  let teste
  client.connect(async()=> {
    db = client.db('teste') //banco
    teste = db.collection('teste') //tabela
    deleta()
 

  })
  deleta = async() => {
    const ide = req.params.id
   const Object = ObjectId
    const retorno = await teste.deleteOne ({_id: new ObjectID(ide)});
    console.log(retorno)
    res.status(200).json({ message: 'deletado' +ide})
    //teste.deleteOne(id);
  };
  //const id = req.params.id
  //res.status(200).json({ message: 'deletado' +id})
}) 