
/**
 * Creates a model for the "Role" table in the database using the Sequelize library.
 * The "Role" table has a single column called "name" of type STRING, which is not allowed to be null and must be unique.
 * The model is configured to enable soft deletion (paranoid mode).
 * @param {object} sequelize - The Sequelize object used to connect to the database.
 * @returns {object} - The created Role model.
 */
const rolesModel = (sequelize) => {
  const { DataTypes } = require('sequelize');

  const Role = sequelize.define('Role', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
  }, { paranoid: true });

  return Role;
};
  
  module.exports = rolesModel;
  