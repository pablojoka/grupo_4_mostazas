module.exports = function (sequelize, DataTypes) {
    let alias = "compra"

    let cols = {
        id:{
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        id_usuario:{
            type: DataTypes.STRING,
            foreingKey: true
        },
        id_producto: {
            type: DataTypes.INTEGER,
            foreingKey: true
        },
        orden:{
            type: DataTypes.STRING
        },
        precio_total:{
            type: DataTypes.INTEGER
        }
        
        
    }
    let config ={
        tableName : "compra",
        timesTamps: false
    }

    let compra = sequelize.define( alias, cols, config);
    compra.associate = function (models) {
        compra.belongsToMany(models.productos,{
            as: "productos",
            foreingKey: "id_productos"
        
        })
        compra.belongsToMany(models.usuarios,{
            as: "usuarios",
            foreingKey: "id_usuarios"
        
        })
        
    }
    return categoria
}