const { DataTypes } = require('sequelize')
const db = require('../db/conn')

const Obra = db.define('obra',{
    codObra:{
        type: DataTypes.INTEGER,
        primaryKey: true, 
        autoIncrement: true
    },
    CNPJ:{
        type: DataTypes.STRING(100),
        allowNull: false
    },
    nome:{
        type: DataTypes.STRING(100),
        allowNull: false
    }
},{
    timestamps: false,
    tableName: 'obras'
})

module.exports = Obra