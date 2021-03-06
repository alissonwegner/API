const express = require('express')
const { MongoClient, ObjectId } = require('mongodb')
const app = express()
const port = 3000
var dayjs = require('dayjs')
//const  = require('./Conect')
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
  lista = () => {

    teste.find({}).toArray(function (err, result) {
      if (err) return res.json({ err });
      return res.json({ result })
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
    project.horario_inicio = dayjs().format()
    
    teste.insertOne(project, err => {
      if (err) return res.json({ mensagem: err })
      return res.json(project)

    })
  }
})
//DELET
app.delete('/:id', (req, res) => {
  const client = new MongoClient('mongodb://localhost:27017/', {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  let db
  let teste
  client.connect(async () => {
    db = client.db('teste') //banco
    teste = db.collection('teste') //tabela
    deleta()


  })
  deleta = async () => {
    const ide = req.params.id
    const Object = ObjectId
    const retorno = await teste.deleteOne({ _id: new Object(ide) });
    console.log(retorno)
    res.status(200).json({ message: 'deletado ' + ide })
  };

})
//PATCH
app.patch('/patch', (req, res) => {
  const client = new MongoClient('mongodb://localhost:27017/', {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  let db
  let teste
  client.connect(() => {
    db = client.db('teste') //banco
    teste = db.collection('teste') //tabela
    atualiza()
  })
  atualiza = () => {
    const { id, tarefa, descricao } = req.body
    const project = {
      id,
      tarefa,
      descricao

    }
    teste.updateOne({ id: project.id }, { $set: { tarefa: project.tarefa, descricao: project.descricao } }

    )
    return res.json(project)
  }
})
//TEMPO TRABALHADO iniciado
app.patch('/data', (req, res) => {
  const client = new MongoClient('mongodb://localhost:27017/', {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  let db
  let teste
  client.connect(() => {
    db = client.db('teste') //banco
    teste = db.collection('teste') //tabela
    addtime()
  })
  addtime = () => {
    const { id, tarefa, descricao } = req.body
    const project = {
      id,
      tarefa,
      descricao
    }
    project.horario_inicio = dayjs().format()
    teste.updateOne({ id: project.id }, { $set: { horario_inicio: project.horario_inicio, tempo_trabalhado: '00:00:00' } })



    return res.json(project)
  }
})


//TEMPO TRABALHADO parar
app.patch('/stop', (req, res) => {
  const client = new MongoClient('mongodb://localhost:27017/', {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  let db
  let teste
  client.connect(() => {
    db = client.db('teste') //banco
    teste = db.collection('teste') //tabela
    timestop()
  })
  timestop = () => {
    const { id, tarefa, descricao } = req.body
    const project = {
      id,
      tarefa,
      descricao
    }
    let time = dayjs()
    time = new Date(time).valueOf()
    let time2 = teste.findOne({ id: project.id}, function(err, result) {
      if (err) throw err;
      return result
    })

    console.log(time2)
    time2 = new Date(time2).valueOf()
   time = time - time2
    project.tempo_trabalhado = dayjs(time).format('hh:mm:ss')
    
    let variavel = time + time2
    teste.updateOne({ id: project.id }, { $set: { tempo_trabalhado:  variavel } })
    return res.json(project)
  }
})