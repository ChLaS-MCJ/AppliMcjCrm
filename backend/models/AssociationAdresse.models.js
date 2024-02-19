// AssociationAdresse.model.js
const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    const AssociationAdresse = sequelize.define('AssociationAdresse', {
        id: {
            type: DataTypes.INTEGER(10),
            primaryKey: true,
            autoIncrement: true
        },
        association_adresse: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        association_ville: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        association_codepostal: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    });

    return AssociationAdresse;
};