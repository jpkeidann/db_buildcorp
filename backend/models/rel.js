const Funcionario = require("./Funcionario");
const Material = require("./Material");
const Movimento = require("./Movimento");
const Obra = require("./Obra");

Obra.hasMany(Material,{
    foreignKey: 'idObra',
    as: 'obraMaterial',
    onDelete: 'CASCADE'
})

Material.belongsTo(Obra,{
    foreignKey: 'idObra',
    as: 'materialObra',
    allowNull: false
})

Material.hasMany(Movimento,{
    foreignKey: 'idMaterial',
    as: 'materialMovimento',
    onDelete: 'CASCADE'
})

Movimento.belongsTo(Material,{
    foreignKey: 'idMaterial',
    as: 'movimentoMaterial',
    allowNull: false
})

module.exports = { Obra , Material , Movimento , Funcionario }