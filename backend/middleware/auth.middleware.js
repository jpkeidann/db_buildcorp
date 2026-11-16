const Funcionario = require('../models/Funcionario')
const CryptoJS = require('crypto-js')
const CHAVE_SUPER_ULTRA_SECRETA = 'batata'

function authMiddleware(req,res,next){
    const token = req.headers['authorization']

    try {
        if(!token){
            return res.status(403).json({message: 'não contém token! faça o login!!'})
        }
        
        const bytes  = CryptoJS.AES.decrypt(token, CHAVE_SUPER_ULTRA_SECRETA);
        const tokenDescript = bytes.toString(CryptoJS.enc.Utf8);
        
        if(!tokenDescript){
            return res.status(403).json({message: 'ACESSO NEGADO'})
        }
        
        const payload = JSON.parse(tokenDescript)
        
        if(Date.now() > tokenDescript.expiraEm){
            return res.status(400).json({message: 'tempo de sessão expirado!'})
        }
        
        req.usuario = payload
        
        next()
    } catch (err) {
        console.error('ocorreu um problema ao validar o token!', err)
        return res.status(500).json({message: 'ocorreu um problema ao validar o token!'})
    }
}

module.exports = authMiddleware