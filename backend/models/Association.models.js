/**
 * Creates a model for the "Association" table in the database using the Sequelize library.
 * The "Association" table has columns for:
 * - Nom (name)
 * - Téléphone (phone)
 * - Numéro SIRET (siretNumber)
 * - Adresse (address)
 * - Pays (country)
 * - Ville (city)
 * - Code postal (postalCode)
 * The model is configured to enable soft deletion (paranoid mode).
 * @param {object} sequelize - The Sequelize object used to connect to the database.
 * @returns {object} - The created Association model.
 */
const associationModel = (sequelize) => {
    const { DataTypes } = require('sequelize');

    return sequelize.define('Association', {
        id: {
            type: DataTypes.INTEGER(10),
            primaryKey: true,
            autoIncrement: true
        },
        association_name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        association_telephone: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        association_num_siret: {
            type: DataTypes.STRING,
            allowNull: true,
            unique: true,
        },
        code_naf: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        code_rna: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    }, { paranoid: true });
};

module.exports = associationModel;