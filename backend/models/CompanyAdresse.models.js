// CompanyAdresse.model.js
const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    const CompanyAdresse = sequelize.define('CompanyAdresse', {
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
    });

    return CompanyAdresse;
};