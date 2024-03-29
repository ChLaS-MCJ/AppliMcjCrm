// CompanyAdresse.model.js
const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    const CompanyAdresse = sequelize.define('CompanyAdresse', {
        id: {
            type: DataTypes.INTEGER(10),
            primaryKey: true,
            autoIncrement: true
        },
        company_adresse: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        company_ville: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        company_codepostal: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    }, { paranoid: true });

    return CompanyAdresse;
};