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

db.User.belongsTo(db.Role, { foreignKey: 'id' });

/*********************************/
/*** Synchronisation des modèles */
// sequelize.sync(err => {
//     console.log('2. 🔥 Erreur courante ayant provoqué un problème → : Database Sync Error', err)
// })

// db.sequelize.sync({alter: true})

module.exports = db