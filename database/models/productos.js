

module.exports = function (sequelize, DataTypes) {
    let alias = 'productos'

    let cols = {
        id:{
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        nombre:{
            type: DataTypes.STRING
        },
        precio:{
            type: DataTypes.INTEGER
        },
        id_categoria: {
            type: DataTypes.INTEGER,
            primaryKey: true
        }
        
    }
    let config ={
        tableName : "productos",
        timesTamps: false
    }

    let Producto = sequelize.define( alias, cols, config);
    
    
    Producto.associate = function (models) {
        Producto.hasMany(models.categorias,{//preguntar la relacion que tiene que tener
            as: "Categorias",
            foreingKey: "id_productos"
        }),
        Producto.hasMany(models.compra,{
            as: "compra",
            through:"compra",
            foreingKey: "id_producto",
            otherKey:"id_compra",
            timesTamps: false
        })
        
    }

    return Producto
}