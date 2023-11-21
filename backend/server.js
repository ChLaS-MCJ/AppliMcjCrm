/**
 * Starts the server and connects to a database using Sequelize.
 * It checks the version of Node.js and exits if it is below version 14.0.
 * It then authenticates the database connection and starts the server on the specified port.
 *
 * @param {Object} db - The database configuration.
 * @param {Object} app - The server configuration.
 * @returns {void}
 */
let startServer = (db, app) => {
  const [major, minor] = process.versions.node.split('.').map(parseFloat);
  if (major < 14 || (major === 14 && minor <= 0)) {
    console.log('Veuillez vous rendre sur nodejs.org et télécharger la version 8 ou une version ultérieure. 👌\n ');
    process.exit();
  }

  db.sequelize.authenticate()
    .then(() => {
      app.listen(process.env.SERVER_PORT, () => {
        console.log(`🚀 Express running → On PORT : ${process.env.SERVER_PORT}.⭐️ `);
      });
    })
    .catch(err => {
      console.log(`1. 🔥 Erreur: server.js`);
      console.error(`🚫 Error → : ${err.message}`);
    });
};

startServer(require('./db.config'), require('./app'));