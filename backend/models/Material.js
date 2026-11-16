const { DataTypes } = require('sequelize')
const db = require('../db/conn')

const Material = db.define('material',{
    codMaterial:{
        type: DataTypes.INTEGER,
        primaryKey: true, 
        autoIncrement: true
    },
    idObra:{
        type: DataTypes.INTEGER,
        allowNull: false
    },
    descricao:{
        type: DataTypes.STRING(100),
        allowNull: false
    },
    categoria:{
        type: DataTypes.STRING(50),
        allowNull: false
    },
    quantidade:{
        type: DataTypes.INTEGER,
        allowNull: false
    },
    codLote:{
        type: DataTypes.STRING(250),
        allowNull: false
    },
},{
    timestamps: false,
    tableName: 'materiais'
})

module.exports = Material