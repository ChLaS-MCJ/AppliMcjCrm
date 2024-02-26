// Clients.model.js
const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    const Clients = sequelize.define('Clients', {
        id: {
            type: DataTypes.INTEGER(10),
            primaryKey: true,
            autoIncrement: true
        },
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
    }, { paranoid: true });

    return Clients;
};