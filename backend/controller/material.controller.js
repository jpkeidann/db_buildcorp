const Material = require('../models/Material')
const CryptoJS = require('crypto-js')
const CHAVE_SUPER_ULTRA_SECRETA = 'batata'

const cadastrar = async (req,res) => {
    const valores = req.body

    try {
        if(!valores.idObra || !valores.descricao || !valores.categoria || !valores.quantidade || !valores.codLote){
            return res.status(422).json({message: 'preencha todos os campos!'})
        }

        const codLote = CryptoJS.AES.encrypt(valores.codLote, CHAVE_SUPER_ULTRA_SECRETA).toString();

        await Material.create({
            idObra: valores.idObra,
            descricao: valores.descricao,
            categoria: valores.categoria,
            quantidade: valores.quantidade,
            codLote: codLote
        })
        return res.status(201).json({message: 'Material cadastrado com sucesso!',})
    } catch (err) {
        console.error('Houve um problema ao cadastrar o Material!',err)
        return res.status(500).json({message: 'Houve um problema ao cadastrar o Material!'})
    }
}

const atualizar = async (req,res) => {
    const valores = req.body
    const id = req.params.id

    try {
        if(!valores.idObra || !valores.descricao || !valores.categoria || !valores.quantidade || !valores.codLote){
            return res.status(422).json({message: 'preencha todos os campos!'})
        }
        
        const dados = await Material.findByPk(id)
        
        if(!dados){
            return res.status(404).json({message: 'Não foi possível encontrar o material!'})
        }
        
        const codLote = CryptoJS.AES.encrypt(valores.codLote, CHAVE_SUPER_ULTRA_SECRETA).toString();

        await Material.update({
            idObra: valores.idObra,
            descricao: valores.descricao,
            categoria: valores.categoria,
            quantidade: valores.quantidade,
            codLote: codLote
        },{where: {codMaterial: id}})
        return res.status(201).json({message: 'Material atualizado com sucesso!',})
    } catch (err) {
        console.error('Houve um problema ao atualizar o Material!',err)
        return res.status(500).json({message: 'Houve um problema ao atualizar o Material!'})
    }
}

const listar = async (req,res) => {
    try {
        const dados = await Material.findAll()

        const resultado = []
        dados.forEach(el => {
            const bytes  = CryptoJS.AES.decrypt(el.codLote, CHAVE_SUPER_ULTRA_SECRETA);
            const codLoteDescript = bytes.toString(CryptoJS.enc.Utf8);
                    
            const valores ={
                codMaterial: el.codMaterial,
                idObra: el.idObra,
                descricao: el.descricao,
                categoria: el.categoria,
                quantidade: el.quantidade,
                codLote: codLoteDescript
            }
            resultado.push(valores)
        })

        return res.status(200).json(resultado)
    } catch (err) {
        console.error('Houve um problema ao listar o Material!',err)
        return res.status(500).json({message: 'Houve um problema ao listar o Material!'})
    }
}

module.exports = { cadastrar ,atualizar , listar }