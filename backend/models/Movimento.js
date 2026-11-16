const { DataTypes } = require('sequelize')
const db = require('../db/conn')

const Movimento = db.define('movimento',{
    codMovimento:{
        type: DataTypes.INTEGER,
        primaryKey: true, 
        autoIncrement: true
    },
    idMaterial:{
        type: DataTypes.INTEGER,
        allowNull: false
    },
    tipo:{
        type: DataTypes.ENUM('ENTRADA','SAIDA'),
        allowNull: false
    },
    quantidade:{
        type: DataTypes.INTEGER,
        allowNull: false
    },
    data:{
        type: DataTypes.DATEONLY,
        allowNull: false
    }
},{
    timestamps: false,
    tableName: 'movimentos'
})

module.exports = Movimento