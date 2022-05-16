const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    sequelize.define("tipos",{
        name:{
            type: DataTypes.STRING,
            allowNull: true
        },
        id:{
            type: DataTypes.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true
        }
    })
}