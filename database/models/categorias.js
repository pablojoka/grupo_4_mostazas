module.exports = function (sequelize, DataTypes) {
    let alias = "Categorias"

    let cols = {
        id:{
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        nombre:{
            type: DataTypes.STRING
        },
        id_categoria: {
            type: DataTypes.INTEGER,
            primaryKey: true
        }
        
    }
    let config ={
        tableName : "categorias",
        timesTamps: false
    }

    let categoria = sequelize.define( alias, cols, config);
    categoria.associate = function (models) {
        categoria.belongsToMany(models.productos,{
            as: "Categorias",
            foreingKey: "id_categorias",
            timesTamps: false
        
        })
        
    }
    return categoria
}