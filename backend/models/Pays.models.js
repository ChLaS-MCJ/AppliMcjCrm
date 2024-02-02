// Pays.model.js
const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    const Pays = sequelize.define('Pays', {
        pays_name: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
    });

    return Pays;
};