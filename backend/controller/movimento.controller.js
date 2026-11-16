const Movimento = require('../models/Movimento')

const cadastrar = async (req,res) => {
    const valores = req.body

    try {
        if(!valores.idMaterial || !valores.tipo || !valores.quantidade || !valores.data){
            return res.status(422).json({message: 'preencha todos os campos!'})
        }

        await Movimento.create(valores)
        return res.status(201).json({message: 'Movimento cadastrado com sucesso!',})
    } catch (err) {
        console.error('Houve um problema ao cadastrar o Movimento!',err)
        return res.status(500).json({message: 'Houve um problema ao cadastrar o Movimento!'})
    }
}

const listar = async (req,res) => {
    try {
        const dados = await Movimento.findAll()
        return res.status(200).json(dados)
    } catch (err) {
        console.error('Houve um problema ao listar o Movimento!',err)
        return res.status(500).json({message: 'Houve um problema ao listar o Movimento!'})
    }
}

module.exports = { cadastrar , listar }