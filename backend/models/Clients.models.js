// Clients.model.js
const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    const Clients = sequelize.define('Clients', {
        clients_name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        clients_prenom: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        clients_civilite: {
            type: DataTypes.STRING,
        },
        clients_tel: {
            type: DataTypes.STRING,
        },
        clients_mail: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
    });

    return Clients;
};