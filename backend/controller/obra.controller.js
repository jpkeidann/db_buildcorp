const Obra = require('../models/Obra')
const CryptoJS = require('crypto-js')
const CHAVE_SUPER_ULTRA_SECRETA = 'batata'

const cadastrar = async (req,res) => {
    const valores = req.body

    try {
        if(!valores.CNPJ || !valores.nome){
            return res.status(422).json({message: 'preencha todos os campos!'})
        }
        const CNPJ = CryptoJS.AES.encrypt(valores.CNPJ, CHAVE_SUPER_ULTRA_SECRETA).toString();

        await Obra.create({
            nome: valores.nome,
            CNPJ: CNPJ
        })
        return res.status(201).json({message: 'Obra cadastrada com sucesso!',})
    } catch (err) {
        console.error('Houve um problema ao cadastrar a Obra!',err)
        return res.status(500).json({message: 'Houve um problema ao cadastrar a Obra!'})
    }
}

const listar = async (req,res) => {
    try {
        const dados = await Obra.findAll()
        const resultado = []
        dados.forEach(el => {
            const bytes  = CryptoJS.AES.decrypt(el.CNPJ, CHAVE_SUPER_ULTRA_SECRETA);
            const CNPJDescript = bytes.toString(CryptoJS.enc.Utf8);
                                
            const valores ={
                codObra: el.codObra,
                nome: el.nome,
                CNPJ: CNPJDescript
            }
            resultado.push(valores)
        })

        return res.status(200).json(resultado)
    } catch (err) {
        console.error('Houve um problema ao listar a Obra!',err)
        return res.status(500).json({message: 'Houve um problema ao listar a Obra!'})
    }
}

const atualizar = async (req,res) => {
    const valores = req.body
    const id = req.params.id

    try {
        if(!valores.nome || !valores.CNPJ){
            return res.status(422).json({message: 'preencha todos os campos!'})
        }
        
        const dados = await Obra.findByPk(id)
        
        if(!dados){
            return res.status(404).json({message: 'Não foi possível encontrar a Obra!'})
        }
        
        const CNPJ = CryptoJS.AES.encrypt(valores.CNPJ, CHAVE_SUPER_ULTRA_SECRETA).toString();

        await Obra.update({
            nome: valores.nome,
            CNPJ: CNPJ
        },{where: {codObra: id}})
        return res.status(200).json({message: 'Obra atualizado com sucesso!',})
    } catch (err) {
        console.error('Houve um problema ao atualizar a Obra!',err)
        return res.status(500).json({message: 'Houve um problema ao atualizar a Obra!'})
    }
}

const consultar = async (req,res) => {
    const id = req.params.id

    try {
        const dados = await Obra.findByPk(id)
        
        if(!dados){
            return res.status(404).json({message: 'Não foi possível encontrar a Obra!'})
        }
        
        const bytes  = CryptoJS.AES.decrypt(dados.CNPJ, CHAVE_SUPER_ULTRA_SECRETA);
        dados.CNPJ = bytes.toString(CryptoJS.enc.Utf8);

        const resultado = [dados]
        return res.status(200).json(resultado)
    } catch (err) {
        console.error('Houve um problema ao Consultar a Obra!',err)
        return res.status(500).json({message: 'Houve um problema ao Consultar a Obra!'})
    }
}

const consultarNome = async (req,res) => {
    const nome = req.params.nome

    try {
        
        const dados = await Obra.findOne({where: {nome: nome}})
        
        if(!dados){
            return res.status(404).json({message: 'Não foi possível encontrar a Obra!'})
        }
        
        const bytes  = CryptoJS.AES.decrypt(dados.CNPJ, CHAVE_SUPER_ULTRA_SECRETA);
        dados.CNPJ = bytes.toString(CryptoJS.enc.Utf8);

        const resultado = [dados]
        return res.status(200).json(resultado)
    } catch (err) {
        console.error('Houve um problema ao Consultar a Obra!',err)
        return res.status(500).json({message: 'Houve um problema ao Consultar a Obra!'})
    }
}

const apagar = async (req,res) => {
    const id = req.params.id

    try {

        const dados = await Obra.findByPk(id)
        
        if(!dados){
            return res.status(404).json({message: 'Não foi possível encontrar a Obra!'})
        }

        await Obra.destroy({where: {codObra: id}})
        return res.status(200).json({message: 'Obra apagada com sucesso!!'})
    } catch (err) {
        console.error('Houve um problema ao apagar a Obra!',err)
        return res.status(500).json({message: 'Houve um problema ao apagar a Obra!'})
    }
}

module.exports = { cadastrar , listar , atualizar , consultar , consultarNome , apagar }