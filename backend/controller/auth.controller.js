const Funcionario = require('../models/Funcionario')
const CryptoJS = require('crypto-js')
const CHAVE_SUPER_ULTRA_SECRETA = 'batata'

const login = async (req,res) => {
    const valores = req.body

    try {
        if(!valores.email || !valores.senha ){
            return res.status(422).json({message: 'preencha todos os campos!'})
        }

        const funcionario = await Funcionario.findOne({where: {email: valores.email}})

        if(!funcionario){
            return res.status(400).json({message: 'Email ou Senha incorreto!'})
        }
        
        const bytes  = CryptoJS.AES.decrypt(funcionario.senha, CHAVE_SUPER_ULTRA_SECRETA);
        const senhaDescript = bytes.toString(CryptoJS.enc.Utf8);
        
        if(senhaDescript !== valores.senha){
            return res.status(400).json({message: 'Email ou Senha incorreto!'})
        }

        const tempo = (180 * 60 * 1000) + Date.now()

        const payload = {
            codFuncionario: funcionario.codFuncionario,
            email: funcionario.email,
            expiraEm: tempo
        }

        const token = CryptoJS.AES.encrypt(JSON.stringify(payload), CHAVE_SUPER_ULTRA_SECRETA).toString();

        return res.status(200).json({
            message: 'login realizado com sucesso!',
            token: token,
            nome: funcionario.nome
        })
    } catch (err) {
        console.error('Houve um problema ao fazer o login do Funcionário!',err)
        return res.status(500).json({message: 'Houve um problema ao fazer o login do Funcionário!'})
    }
}

module.exports = { login }