const Express = require('express')
const app = Express()
const cors = require('cors')

const conn = require('./db/conn')

const authController = require('./controller/auth.controller')
const funcionarioController = require('./controller/funcionario.controller')
const materialController = require('./controller/material.controller')
const movimentoController = require('./controller/movimento.controller')
const obraController = require('./controller/obra.controller')
const authMiddleware = require('./middleware/auth.middleware')
const express = require('express')

const hostname = 'localhost'
const PORT = 3000

// ============ midware ===========
app.use(express.urlencoded({extended: true}))
app.use(express.json())
app.use(cors())

// =========== rotas públicas ==========

app.post('/login', authController.login)

app.post('/funcionario', funcionarioController.cadastrar)

app.get('/',(req,res)=>{
    return res.status(200).json({message: 'Aplicação rodando!'})
})

// =========== rotas privadas ==========

app.use(authMiddleware)

app.get('/funcionarios', funcionarioController.listar)

app.post('/obra', obraController.cadastrar)
app.get('/obras', obraController.listar)
app.get('/obra/:id', obraController.consultar)
app.get('/obra/nome/:nome', obraController.consultarNome)
app.put('/obra/:id', obraController.atualizar)
app.delete('/obra/:id', obraController.apagar)

app.post('/material', materialController.cadastrar)
app.get('/materiais', materialController.listar)
app.put('/material/:id', materialController.atualizar)

app.post('/movimento', movimentoController.cadastrar)
app.get('/movimentos', movimentoController.listar)

// =========== server =============

conn.sync()
.then(()=>{
    app.listen(PORT,hostname,()=>{
        console.log(`servidor rodando em: http://${hostname}:${PORT}`)
    })
})
.catch((err)=>{
    console.error('ocorreu um problema ao se conectar com o banco! ', err)
})