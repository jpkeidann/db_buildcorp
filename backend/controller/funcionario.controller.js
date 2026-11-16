const Funcionario = require('../models/Funcionario')
const CryptoJS = require('crypto-js')
const CHAVE_SUPER_ULTRA_SECRETA = 'batata'

const cadastrar = async (req,res) => {
    const valores = req.body

    try {
        if(!valores.email || !valores.senha || !valores.nome){
            return res.status(422).json({message: 'preencha todos os campos!'})
        }

        const senha = CryptoJS.AES.encrypt(valores.senha, CHAVE_SUPER_ULTRA_SECRETA).toString();

        await Funcionario.create({
            nome: valores.nome,
            email: valores.email,
            senha: senha
        })
        return res.status(201).json({message: 'Funcionário cadastrado com sucesso!',})
    } catch (err) {
        console.error('Houve um problema ao cadastrar o Funcionário!',err)
        return res.status(500).json({message: 'Houve um problema ao cadastrar o Funcionário!'})
    }
}

const listar = async (req,res) => {
    try {
        const dados = await Funcionario.findAll()
        const resultado = []
        dados.forEach(el => {
            const valores ={
                codFuncionario: el.codFuncionario,
                email: el.email,
                nome: el.nome,
            }
            resultado.push(valores)
        })

        return res.status(200).json(resultado)
    } catch (err) {
        console.error('Houve um problema ao listar o Funcionário!',err)
        return res.status(500).json({message: 'Houve um problema ao listar o Funcionário!'})
    }
}

module.exports = { cadastrar , listar }