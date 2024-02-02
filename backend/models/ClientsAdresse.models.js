// ClientAdresse.model.js
const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    const ClientAdresse = sequelize.define('ClientAdresse', {
        client_adresse_adresse: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        client_adresse_ville: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        client_adresse_codepostal: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    });

    return ClientAdresse;
};