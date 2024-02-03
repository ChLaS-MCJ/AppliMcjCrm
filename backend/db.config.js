/**
 * Establishes a connection to a MySQL database using the Sequelize library in Node.js.
 * @module database
 */

/************************************/
/*** Import des modules nécessaires */
const { Sequelize } = require('sequelize')
require('dotenv').config();

/************************************/
/*** Connexion à la base de données */
let sequelize = new Sequelize(
    process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASS, {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: 'mysql',
    logging: false
}
);

/*** Mise en place des relations */
const db = {}

db.sequelize = sequelize
db.User = require('./models/Users.models')(sequelize)
db.Role = require('./models/Roles.models')(sequelize)
db.Company = require('./models/Company.models')(sequelize)
db.CompanyAdresse = require('./models/CompanyAdresse.models')(sequelize);
db.Country = require('./models/Country.models')(sequelize);
db.ClientAdresse = require('./models/ClientsAdresse.models')(sequelize);
db.Clients = require('./models/Clients.models')(sequelize);

db.User.belongsTo(db.Role, { foreignKey: 'role_id' });
db.Role.hasMany(db.User, { foreignKey: 'role_id', onDelete: 'NO ACTION' })

db.Clients.hasMany(db.Company, { foreignKey: 'clients_id' })
db.Company.belongsTo(db.Clients, { foreignKey: 'clients_id', onDelete: 'NO ACTION' });

db.Company.hasMany(db.CompanyAdresse, { foreignKey: 'company_id', onDelete: 'cascade' });
db.CompanyAdresse.belongsTo(db.Company, { foreignKey: 'company_id' });

db.Country.hasMany(db.Company, { foreignKey: 'pays_id', onDelete: 'NO ACTION' })
db.Company.belongsTo(db.Country, { foreignKey: 'pays_id' });

db.ClientAdresse.hasMany(db.Clients, { foreignKey: 'clientAdresse_id' })
db.Clients.belongsTo(db.ClientAdresse, { foreignKey: 'clientAdresse_id', onDelete: 'NO ACTION' });
// db.Cocktail.belongsTo(db.User, {foreignKey: 'user_id'})
// db.User.hasMany(db.Cocktail, {foreignKey: 'user_id', onDelete: 'cascade'})
/*********************************/
/*** Synchronisation des modèles */
// sequelize.sync(err => {
//     console.log('2. 🔥 Erreur courante ayant provoqué un problème → : Database Sync Error', err)
// })

db.sequelize.sync({ alter: true })

module.exports = db