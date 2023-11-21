const { sequelize } = require('../db.config'); 
/**
 * Populates the database with predefined roles.
 * @returns {Promise<void>} A promise that resolves when the seeding is complete.
 */
const seedRoles = async () => {
  const roles = ['user', 'commercial', 'admin', 'super-admin'];

  for (const roleName of roles) {
    await sequelize.models.Role.findOrCreate({ where: { name: roleName } });
  }
};
  
  seedRoles();

